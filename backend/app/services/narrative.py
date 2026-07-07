import json

from openai import OpenAI

from app.core.config import settings
from app.schemas import LeakFinding


def format_money(value: float) -> str:
    return f"${abs(value):,.2f}"


def generate_fallback_summary(findings: list[LeakFinding]) -> str:
    if not findings:
        return (
            "Profit Leak Hunter did not detect any major profit leaks in the uploaded data."
        )

    total_impact = sum(finding.dollar_impact for finding in findings)
    top_findings = findings[:3]

    summary_parts = [
        f"Profit Leak Hunter found {len(findings)} potential profit leak(s), "
        f"with an estimated total impact of {format_money(total_impact)}.",
        "The findings are ranked by estimated dollar impact.",
    ]

    for index, finding in enumerate(top_findings, start=1):
        summary_parts.append(
            f"{index}. {finding.title} - {finding.entity}. "
            f"Impact: {format_money(finding.dollar_impact)}. "
            f"Recommended action: {finding.suggested_action}"
        )

    return " ".join(summary_parts)


def generate_narrative_summary(findings: list[LeakFinding]) -> str:
    fallback = generate_fallback_summary(findings)

    if (
        not findings
        or not settings.enable_llm_narrative
        or settings.llm_provider.lower() != "openrouter"
        or not settings.openrouter_api_key
    ):
        return fallback

    total_impact = sum(finding.dollar_impact for finding in findings)

    findings_payload = [
        finding.model_dump()
        for finding in findings[:10]
    ]

    try:
        client = OpenAI(
            api_key=settings.openrouter_api_key,
            base_url=settings.openrouter_api_base_url,
            timeout=90.0,
        )

        response = client.chat.completions.create(
            model=settings.openrouter_model,
            max_tokens=700,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are the executive narrative layer for Profit Leak Hunter. "
                        "The supplied detector results are the source of truth. "
                        "Do not invent figures, causes, evidence, or findings. "
                        "Write a concise business executive summary explaining the "
                        "largest profit leaks, their evidence, and the most important actions."
                    ),
                },
                {
                    "role": "user",
                    "content": (
                        f"Total estimated profit leak: {format_money(total_impact)}\n"
                        f"Number of findings: {len(findings)}\n\n"
                        f"Structured findings:\n{json.dumps(findings_payload, indent=2)}"
                    ),
                },
            ],
        )

        content = response.choices[0].message.content

        if not content:
            return fallback

        return content.strip()

    except Exception as error:
        print(f"LLM narrative unavailable; using fallback: {error}")
        return fallback
