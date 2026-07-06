import pandas as pd

from app.schemas import LeakFinding


def detect_supplier_margin_leaks(
    sales_df: pd.DataFrame,
    suppliers_df: pd.DataFrame | None,
) -> list[LeakFinding]:
    if suppliers_df is None:
        return []

    required_sales_columns = {"date", "product", "quantity", "unit_price"}
    required_supplier_columns = {"date", "supplier_name", "product", "unit_cost"}

    if not required_sales_columns.issubset(set(sales_df.columns)):
        return []

    if not required_supplier_columns.issubset(set(suppliers_df.columns)):
        return []

    sales = sales_df.copy()
    suppliers = suppliers_df.copy()

    sales["date"] = pd.to_datetime(sales["date"], errors="coerce")
    suppliers["date"] = pd.to_datetime(suppliers["date"], errors="coerce")

    sales = sales.dropna(subset=["date", "product"])
    suppliers = suppliers.dropna(subset=["date", "product", "supplier_name"])

    if sales.empty or suppliers.empty:
        return []

    sales["quantity"] = pd.to_numeric(sales["quantity"], errors="coerce").fillna(0)
    sales["unit_price"] = pd.to_numeric(sales["unit_price"], errors="coerce").fillna(0)
    suppliers["unit_cost"] = pd.to_numeric(suppliers["unit_cost"], errors="coerce").fillna(0)

    min_date = suppliers["date"].min()
    max_date = suppliers["date"].max()
    midpoint = min_date + (max_date - min_date) / 2

    early_supplier = suppliers[suppliers["date"] <= midpoint]
    recent_supplier = suppliers[suppliers["date"] > midpoint]

    findings: list[LeakFinding] = []

    for product in recent_supplier["product"].unique():
        early_rows = early_supplier[early_supplier["product"] == product]
        recent_rows = recent_supplier[recent_supplier["product"] == product]

        if early_rows.empty or recent_rows.empty:
            continue

        early_unit_cost = early_rows["unit_cost"].mean()
        recent_unit_cost = recent_rows["unit_cost"].mean()

        if early_unit_cost <= 0:
            continue

        cost_increase = recent_unit_cost - early_unit_cost
        cost_increase_pct = cost_increase / early_unit_cost

        if cost_increase_pct < 0.10:
            continue

        recent_sales = sales[(sales["product"] == product) & (sales["date"] > midpoint)]

        if recent_sales.empty:
            continue

        recent_units_sold = recent_sales["quantity"].sum()
        avg_recent_price = recent_sales["unit_price"].mean()
        estimated_margin_loss = cost_increase * recent_units_sold

        if estimated_margin_loss < 100:
            continue

        supplier_name = str(recent_rows["supplier_name"].mode().iloc[0])

        findings.append(
            LeakFinding(
                category="supplier",
                entity=f"{supplier_name} / {product}",
                title="Supplier cost increased without matching price adjustment",
                metric_change=f"+{cost_increase_pct * 100:.1f}% unit cost increase",
                dollar_impact=-round(float(estimated_margin_loss), 2),
                confidence=0.82,
                time_window="Recent supplier costs vs earlier supplier costs",
                evidence=[
                    f"Earlier unit cost: ${early_unit_cost:,.2f}",
                    f"Recent unit cost: ${recent_unit_cost:,.2f}",
                    f"Average recent selling price: ${avg_recent_price:,.2f}",
                    f"Recent units sold: {recent_units_sold:,.0f}",
                ],
                likely_cause="Supplier cost increased while the product selling price did not rise enough to protect margin.",
                suggested_action=f"Renegotiate pricing with {supplier_name} or review selling price for {product}.",
            )
        )

    return findings
