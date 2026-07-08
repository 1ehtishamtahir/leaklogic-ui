import pandas as pd

from app.schemas import LeakFinding


def detect_inventory_leaks(
    sales_df: pd.DataFrame,
    inventory_df: pd.DataFrame | None,
) -> list[LeakFinding]:
    if inventory_df is None:
        return []

    required_inventory_columns = {
        "date",
        "product",
        "stock_level",
        "unit_cost",
    }

    if not required_inventory_columns.issubset(inventory_df.columns):
        return []

    inventory = inventory_df.copy()
    sales = sales_df.copy()

    inventory["date"] = pd.to_datetime(
        inventory["date"],
        errors="coerce",
    )
    inventory = inventory.dropna(subset=["date", "product"])

    if inventory.empty:
        return []

    inventory["stock_level"] = pd.to_numeric(
        inventory["stock_level"],
        errors="coerce",
    ).fillna(0)

    inventory["unit_cost"] = pd.to_numeric(
        inventory["unit_cost"],
        errors="coerce",
    ).fillna(0)

    if "date" in sales.columns:
        sales["date"] = pd.to_datetime(
            sales["date"],
            errors="coerce",
        )

    if "quantity" in sales.columns:
        sales["quantity"] = pd.to_numeric(
            sales["quantity"],
            errors="coerce",
        ).fillna(0)
    else:
        sales["quantity"] = 0

    min_date = inventory["date"].min()
    max_date = inventory["date"].max()
    midpoint = min_date + (max_date - min_date) / 2

    early_inventory = inventory[inventory["date"] <= midpoint]
    recent_inventory = inventory[inventory["date"] > midpoint]

    findings: list[LeakFinding] = []

    for product in recent_inventory["product"].unique():
        early_rows = early_inventory[
            early_inventory["product"] == product
        ]
        recent_rows = recent_inventory[
            recent_inventory["product"] == product
        ]

        if early_rows.empty or recent_rows.empty:
            continue

        early_record = early_rows.sort_values("date").iloc[-1]
        recent_record = recent_rows.sort_values("date").iloc[-1]

        early_stock = float(early_record["stock_level"])
        recent_stock = float(recent_record["stock_level"])
        recent_unit_cost = float(recent_record["unit_cost"])

        if early_stock <= 0 or recent_stock <= 0:
            continue

        stock_reduction = early_stock - recent_stock
        movement_rate = stock_reduction / early_stock
        stock_change_rate = (recent_stock - early_stock) / early_stock

        product_sales = (
            sales[sales["product"] == product]
            if "product" in sales.columns
            else pd.DataFrame()
        )

        units_sold = (
            float(product_sales["quantity"].sum())
            if not product_sales.empty
            else 0
        )

        cash_tied_up = recent_stock * recent_unit_cost

        # More than 10% stock reduction is treated as healthy movement.
        if movement_rate > 0.10:
            continue

        if cash_tied_up < 500:
            continue

        if stock_change_rate > 0:
            title = "Inventory increased and is tying up cash"
            metric_change = (
                f"Inventory increased by "
                f"{stock_change_rate * 100:.1f}%"
            )
            likely_cause = (
                "Recent inventory increased compared with the earlier "
                "snapshot, which may indicate over-purchasing or weak demand."
            )
            suggested_action = (
                f"Pause or reduce reorders and review demand forecasts "
                f"for {product}."
            )
        else:
            title = "Slow-moving inventory tying up cash"
            metric_change = (
                f"Only {movement_rate * 100:.1f}% stock reduction"
            )
            likely_cause = (
                "Inventory has shown limited reduction between snapshots, "
                "which may indicate slow-moving or excess stock."
            )
            suggested_action = (
                f"Reduce reorders, bundle, discount, or liquidate "
                f"slow-moving stock for {product}."
            )

        findings.append(
            LeakFinding(
                category="inventory",
                entity=str(product),
                title=title,
                metric_change=metric_change,
                dollar_impact=-round(cash_tied_up, 2),
                confidence=0.80,
                time_window=(
                    "Latest inventory snapshot vs earlier snapshot"
                ),
                evidence=[
                    (
                        f"Earlier stock level: "
                        f"{early_stock:,.0f} units"
                    ),
                    (
                        f"Recent stock level: "
                        f"{recent_stock:,.0f} units"
                    ),
                    (
                        f"Estimated cash tied up: "
                        f"${cash_tied_up:,.2f}"
                    ),
                    (
                        f"Units sold in sales file: "
                        f"{units_sold:,.0f}"
                    ),
                ],
                likely_cause=likely_cause,
                suggested_action=suggested_action,
            )
        )

    return findings