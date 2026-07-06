import pandas as pd

from app.schemas import LeakFinding


def detect_refund_leaks(sales_df: pd.DataFrame, refunds_df: pd.DataFrame | None) -> list[LeakFinding]:
    if refunds_df is None:
        return []

    required_sales_columns = {"date", "product", "revenue"}
    required_refund_columns = {"date", "product", "refund_amount"}

    if not required_sales_columns.issubset(set(sales_df.columns)):
        return []

    if not required_refund_columns.issubset(set(refunds_df.columns)):
        return []

    sales = sales_df.copy()
    refunds = refunds_df.copy()

    sales["date"] = pd.to_datetime(sales["date"], errors="coerce")
    refunds["date"] = pd.to_datetime(refunds["date"], errors="coerce")

    sales = sales.dropna(subset=["date", "product", "revenue"])
    refunds = refunds.dropna(subset=["date", "product", "refund_amount"])

    if sales.empty or refunds.empty:
        return []

    sales["revenue"] = pd.to_numeric(sales["revenue"], errors="coerce").fillna(0)
    refunds["refund_amount"] = pd.to_numeric(refunds["refund_amount"], errors="coerce").fillna(0)

    min_date = sales["date"].min()
    max_date = sales["date"].max()
    midpoint = min_date + (max_date - min_date) / 2

    early_sales = sales[sales["date"] <= midpoint]
    recent_sales = sales[sales["date"] > midpoint]

    early_refunds = refunds[refunds["date"] <= midpoint]
    recent_refunds = refunds[refunds["date"] > midpoint]

    findings: list[LeakFinding] = []

    for product in recent_sales["product"].unique():
        early_revenue = early_sales.loc[early_sales["product"] == product, "revenue"].sum()
        recent_revenue = recent_sales.loc[recent_sales["product"] == product, "revenue"].sum()

        early_refund_amount = early_refunds.loc[
            early_refunds["product"] == product, "refund_amount"
        ].sum()

        recent_refund_amount = recent_refunds.loc[
            recent_refunds["product"] == product, "refund_amount"
        ].sum()

        if recent_revenue <= 0:
            continue

        early_refund_rate = early_refund_amount / early_revenue if early_revenue > 0 else 0
        recent_refund_rate = recent_refund_amount / recent_revenue

        rate_increase = recent_refund_rate - early_refund_rate

        if rate_increase < 0.05:
            continue

        excess_refund_amount = rate_increase * recent_revenue

        if excess_refund_amount < 100:
            continue

        findings.append(
            LeakFinding(
                category="refund",
                entity=str(product),
                title="Refund rate increased",
                metric_change=f"+{rate_increase * 100:.1f} percentage points",
                dollar_impact=-round(float(excess_refund_amount), 2),
                confidence=0.86,
                time_window="Recent period vs earlier period",
                evidence=[
                    f"Earlier refund rate: {early_refund_rate * 100:.1f}%",
                    f"Recent refund rate: {recent_refund_rate * 100:.1f}%",
                    f"Recent refund amount: ${recent_refund_amount:,.2f}",
                ],
                likely_cause="Refunds increased faster than product revenue in the recent period.",
                suggested_action=f"Investigate quality, fulfillment, pricing, or customer-expectation issues for {product}.",
            )
        )

    return findings
