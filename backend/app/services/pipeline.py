from fastapi import UploadFile

from app.schemas import AnalysisResponse
from app.services.csv_loader import read_csv_upload
from app.services.schema_mapper import apply_simple_schema_mapping
from app.services.detectors.refunds import detect_refund_leaks
from app.services.detectors.discounts import detect_discount_leaks
from app.services.detectors.suppliers import detect_supplier_margin_leaks
from app.services.detectors.inventory import detect_inventory_leaks
from app.services.narrative import generate_narrative_summary


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

    findings.extend(detect_refund_leaks(sales_df, refunds_df))
    findings.extend(detect_discount_leaks(sales_df))
    findings.extend(detect_supplier_margin_leaks(sales_df, suppliers_df))
    findings.extend(detect_inventory_leaks(sales_df, inventory_df))

    findings = sorted(findings, key=lambda finding: finding.dollar_impact)

    total_estimated_leak = sum(finding.dollar_impact for finding in findings)

    executive_summary = generate_narrative_summary(findings)

    return AnalysisResponse(
        status="success",
        total_estimated_leak=round(float(total_estimated_leak), 2),
        findings=findings,
        executive_summary=executive_summary,
        amd_usage_note=(
            "Current stage uses deterministic Python/pandas detectors with a safe fallback narrative generator. "
            "Fireworks AI / AMD-supported LLM narrative generation will be added next."
        ),
    )
