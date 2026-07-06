import re

import pandas as pd


COLUMN_ALIASES = {
    "date": ["date", "order_date", "created_at", "transaction_date", "refund_date", "snapshot_date"],
    "product": ["product", "product_name", "item", "item_name"],
    "sku": ["sku", "product_sku", "item_sku"],
    "quantity": ["quantity", "qty", "units", "units_sold"],
    "unit_price": ["unit_price", "price", "sale_price", "selling_price"],
    "revenue": ["revenue", "sales", "gross_sales", "net_sales", "amount"],
    "refund_amount": ["refund_amount", "refund", "return_amount", "amount_refunded"],
    "discount_amount": ["discount_amount", "discount", "promo_discount"],

    # Supplier / COGS columns
    "supplier_name": ["supplier_name", "supplier", "vendor", "vendor_name"],
    "unit_cost": ["unit_cost", "cost", "cogs", "purchase_price"],
    "purchase_volume": ["purchase_volume", "volume", "units_purchased", "quantity_purchased"],

    # Inventory columns
    "stock_level": ["stock_level", "stock", "inventory", "on_hand", "qty_on_hand", "units_in_stock"],
}


def normalize_column_name(name: str) -> str:
    name = name.strip().lower()
    name = re.sub(r"[^a-z0-9]+", "_", name)
    return name.strip("_")


def normalize_columns(df: pd.DataFrame) -> pd.DataFrame:
    renamed = {column: normalize_column_name(column) for column in df.columns}
    return df.rename(columns=renamed)


def apply_simple_schema_mapping(df: pd.DataFrame) -> pd.DataFrame:
    df = normalize_columns(df)

    reverse_aliases = {}

    for canonical, aliases in COLUMN_ALIASES.items():
        for alias in aliases:
            reverse_aliases[normalize_column_name(alias)] = canonical

    rename_map = {}

    for column in df.columns:
        canonical = reverse_aliases.get(column)

        if canonical is None:
            continue

        if canonical in df.columns and column != canonical:
            continue

        rename_map[column] = canonical

    df = df.rename(columns=rename_map)
    df = df.loc[:, ~df.columns.duplicated()]

    return df
