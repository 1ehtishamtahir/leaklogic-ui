from fastapi import UploadFile
import pandas as pd

from app.schemas import AnalysisResponse, ChartData
from app.services.csv_loader import read_csv_upload
from app.services.schema_mapper import apply_simple_schema_mapping
from app.services.detectors.refunds import detect_refund_leaks
from app.services.detectors.discounts import detect_discount_leaks
from app.services.detectors.suppliers import detect_supplier_margin_leaks
from app.services.detectors.inventory import detect_inventory_leaks
from app.services.narrative import generate_narrative_summary


def calculate_chart_data(
    sales_df: pd.DataFrame,
    refunds_df: pd.DataFrame | None,
    suppliers_df: pd.DataFrame | None,
    inventory_df: pd.DataFrame | None,
) -> ChartData:
    """Calculate aggregated data for frontend charts."""

    revenue_over_time: list[dict[str, object]] = []

    if "date" in sales_df.columns and "revenue" in sales_df.columns:
        try:
            sales_df_copy = sales_df.copy()

            sales_df_copy["date"] = pd.to_datetime(
                sales_df_copy["date"],
                errors="coerce",
            )

            sales_df_copy["revenue"] = pd.to_numeric(
                sales_df_copy["revenue"],
                errors="coerce",
            ).fillna(0)

            sales_df_copy = sales_df_copy.dropna(subset=["date"])

            if not sales_df_copy.empty:
                sales_df_copy["month"] = (
                    sales_df_copy["date"].dt.to_period("M")
                )

                revenue_by_month = (
                    sales_df_copy
                    .groupby("month")["revenue"]
                    .sum()
                    .reset_index()
                )

                revenue_over_time = [
                    {
                        "month": str(row["month"]),
                        "value": float(row["revenue"]),
                    }
                    for _, row in revenue_by_month.iterrows()
                ]

        except Exception as error:
            print(f"Chart revenue calculation failed: {error}")

    records_by_source = {
        "SALES": len(sales_df),
        "REFUNDS": (
            len(refunds_df)
            if refunds_df is not None and not refunds_df.empty
            else 0
        ),
        "SUPPLIERS": (
            len(suppliers_df)
            if suppliers_df is not None and not suppliers_df.empty
            else 0
        ),
        "INVENTORY": (
            len(inventory_df)
            if inventory_df is not None and not inventory_df.empty
            else 0
        ),
    }

    date_range = "Unknown"

    if "date" in sales_df.columns:
        try:
            sales_df_copy = sales_df.copy()

            sales_df_copy["date"] = pd.to_datetime(
                sales_df_copy["date"],
                errors="coerce",
            )

            sales_df_copy = sales_df_copy.dropna(subset=["date"])

            if not sales_df_copy.empty:
                min_date = sales_df_copy["date"].min()
                max_date = sales_df_copy["date"].max()

                date_range = (
                    f"{min_date.strftime('%b %Y')} - "
                    f"{max_date.strftime('%b %Y')}"
                )

        except Exception as error:
            print(f"Chart date range calculation failed: {error}")

    return ChartData(
        revenue_over_time=revenue_over_time,
        records_by_source=records_by_source,
        date_range=date_range,
    )


async def run_analysis(
    sales_file: UploadFile,
    refunds_file: UploadFile | None = None,
    suppliers_file: UploadFile | None = None,
    inventory_file: UploadFile | None = None,
) -> AnalysisResponse:
    sales_df = await read_csv_upload(sales_file)
    sales_df = apply_simple_schema_mapping(sales_df)

    refunds_df = await read_csv_upload(refunds_file)
    suppliers_df = await read_csv_upload(suppliers_file)
    inventory_df = await read_csv_upload(inventory_file)

    if refunds_df is not None:
        refunds_df = apply_simple_schema_mapping(refunds_df)

    if suppliers_df is not None:
        suppliers_df = apply_simple_schema_mapping(suppliers_df)

    if inventory_df is not None:
        inventory_df = apply_simple_schema_mapping(inventory_df)

    findings = []

    findings.extend(
        detect_refund_leaks(
            sales_df,
            refunds_df,
        )
    )

    findings.extend(
        detect_discount_leaks(
            sales_df,
        )
    )

    findings.extend(
        detect_supplier_margin_leaks(
            sales_df,
            suppliers_df,
        )
    )

    findings.extend(
        detect_inventory_leaks(
            sales_df,
            inventory_df,
        )
    )

    findings = sorted(
        findings,
        key=lambda finding: finding.dollar_impact,
    )

    total_estimated_leak = sum(
        finding.dollar_impact
        for finding in findings
    )

    executive_summary, narrative_source = (
        generate_narrative_summary(findings)
    )

    chart_data = calculate_chart_data(
        sales_df,
        refunds_df,
        suppliers_df,
        inventory_df,
    )

    return AnalysisResponse(
        status="success",
        total_estimated_leak=round(
            float(total_estimated_leak),
            2,
        ),
        findings=findings,
        executive_summary=executive_summary,
        narrative_source=narrative_source,
        amd_usage_note=(
            "Leak findings are generated by deterministic Python/pandas "
            "detectors. The executive narrative is generated through "
            "OpenRouter using NVIDIA Nemotron, with a deterministic fallback "
            "if the LLM is unavailable."
        ),
        chart_data=chart_data,
    )