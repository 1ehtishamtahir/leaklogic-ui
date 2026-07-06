import pandas as pd

from app.schemas import LeakFinding


def detect_discount_leaks(sales_df: pd.DataFrame) -> list[LeakFinding]:
    required_columns = {"date", "product", "quantity", "unit_price", "discount_amount", "revenue"}

    if not required_columns.issubset(set(sales_df.columns)):
        return []

    sales = sales_df.copy()

    sales["date"] = pd.to_datetime(sales["date"], errors="coerce")
    sales = sales.dropna(subset=["date", "product"])

    if sales.empty:
        return []

    for column in ["quantity", "unit_price", "discount_amount", "revenue"]:
        sales[column] = pd.to_numeric(sales[column], errors="coerce").fillna(0)

    sales["is_discounted"] = sales["discount_amount"] > 0

    findings: list[LeakFinding] = []

    for product in sales["product"].unique():
        product_sales = sales[sales["product"] == product]

        discounted = product_sales[product_sales["is_discounted"]]
        regular = product_sales[~product_sales["is_discounted"]]

        if discounted.empty or regular.empty:
            continue

        regular_avg_revenue_per_unit = (
            regular["revenue"].sum() / regular["quantity"].sum()
            if regular["quantity"].sum() > 0
            else 0
        )

        discounted_avg_revenue_per_unit = (
            discounted["revenue"].sum() / discounted["quantity"].sum()
            if discounted["quantity"].sum() > 0
            else 0
        )

        revenue_loss_per_unit = regular_avg_revenue_per_unit - discounted_avg_revenue_per_unit
        total_discount_cost = discounted["discount_amount"].sum()

        discounted_units = discounted["quantity"].sum()
        regular_units = regular["quantity"].sum()

        if regular_units <= 0:
            continue

        estimated_unit_lift = max(discounted_units - regular_units, 0)

        estimated_incremental_revenue = estimated_unit_lift * discounted_avg_revenue_per_unit

        if total_discount_cost <= estimated_incremental_revenue:
            continue

        net_negative_impact = total_discount_cost - estimated_incremental_revenue

        if net_negative_impact < 100:
            continue

        findings.append(
            LeakFinding(
                category="discount",
                entity=str(product),
                title="Discount campaign may be reducing profit",
                metric_change=f"${revenue_loss_per_unit:.2f} lower revenue per unit during discounts",
                dollar_impact=-round(float(net_negative_impact), 2),
                confidence=0.78,
                time_window="Discounted sales vs regular sales",
                evidence=[
                    f"Total discount cost: ${total_discount_cost:,.2f}",
                    f"Estimated incremental revenue: ${estimated_incremental_revenue:,.2f}",
                    f"Discounted units sold: {discounted_units:,.0f}",
                ],
                likely_cause="The discount reduced revenue per unit more than it generated useful sales lift.",
                suggested_action=f"Review discount depth and campaign targeting for {product}.",
            )
        )

    return findings
