from app.schemas import LeakFinding


def format_money(value: float) -> str:
    return f"${abs(value):,.2f}"


def generate_narrative_summary(findings: list[LeakFinding]) -> str:
    """
    Safe fallback narrative generator.

    This does not call an LLM yet.
    It converts structured detector findings into a business-friendly audit summary.
    """

    if not findings:
        return (
            "Profit Leak Hunter did not detect any major profit leaks in the uploaded data. "
            "Try uploading richer sales, refund, supplier, and inventory files for a deeper audit."
        )

    total_impact = sum(finding.dollar_impact for finding in findings)
    top_findings = findings[:3]

    summary_parts = [
        f"Profit Leak Hunter found {len(findings)} potential profit leak(s), "
        f"with an estimated total impact of {format_money(total_impact)}.",
        "The findings below are ranked by estimated dollar impact.",
    ]

    for index, finding in enumerate(top_findings, start=1):
        evidence_text = " ".join(finding.evidence[:2])

        summary_parts.append(
            f"{index}. {finding.title} - {finding.entity}. "
            f"Estimated impact: {format_money(finding.dollar_impact)}. "
            f"Key evidence: {evidence_text}. "
            f"Recommended action: {finding.suggested_action}"
        )

    return " ".join(summary_parts)
