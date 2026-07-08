import json
import time

from openai import OpenAI

from app.core.config import settings
from app.schemas import LeakFinding


def format_money(value: float) -> str:
    """Format a numeric value as positive currency text."""
    return f"${abs(value):,.2f}"


def generate_fallback_summary(findings: list[LeakFinding]) -> str:
    """Generate a deterministic summary when the LLM is unavailable."""
    if not findings:
        return (
            "Profit Leak Hunter did not detect any major profit leaks "
            "in the uploaded data."
        )

    total_impact = sum(finding.dollar_impact for finding in findings)
    top_findings = findings[:3]

    summary_parts = [
        (
            f"Profit Leak Hunter found {len(findings)} potential profit leak(s), "
            f"with an estimated total impact of {format_money(total_impact)}."
        ),
        "The findings are ranked by estimated dollar impact.",
    ]

    for index, finding in enumerate(top_findings, start=1):
        summary_parts.append(
            f"{index}. {finding.title} - {finding.entity}. "
            f"Impact: {format_money(finding.dollar_impact)}. "
            f"Recommended action: {finding.suggested_action}"
        )

    return " ".join(summary_parts)


def generate_narrative_summary(
    findings: list[LeakFinding],
) -> tuple[str, str]:
    """
    Generate an executive narrative from deterministic leak findings.

    Returns:
        tuple[str, str]:
            - Executive summary text
            - Narrative source: "openrouter" or "fallback"
    """

    fallback = generate_fallback_summary(findings)

    if not findings:
        return fallback, "fallback"

    if not settings.enable_llm_narrative:
        return fallback, "fallback"

    if settings.llm_provider.lower() != "openrouter":
        return fallback, "fallback"

    if not settings.openrouter_api_key:
        return fallback, "fallback"

    total_impact = sum(
        finding.dollar_impact
        for finding in findings
    )

    findings_payload = [
        finding.model_dump()
        for finding in findings[:10]
    ]

    system_prompt = (
        "You are the executive narrative layer for Profit Leak Hunter. "
        "The supplied detector results are the only source of truth. "
        "Do not invent figures, findings, evidence, causes, time periods, "
        "thresholds, recovery amounts, or recommendations that are not "
        "supported by the supplied data. "
        "Explain the largest profit leaks, their supporting evidence, "
        "and the most important actions. "
        "Keep the response between 300 and 450 words. "
        "Avoid markdown tables. "
        "Use short headings and bullet points. "
        "Always complete the summary."
    )

    user_prompt = (
        f"Total estimated profit leak: "
        f"{format_money(total_impact)}\n"
        f"Number of findings: {len(findings)}\n\n"
        f"Structured findings:\n"
        f"{json.dumps(findings_payload, indent=2)}"
    )

    client = OpenAI(
        api_key=settings.openrouter_api_key,
        base_url=settings.openrouter_api_base_url,
        timeout=90.0,
    )

    max_attempts = 2
    last_error: Exception | None = None

    for attempt in range(1, max_attempts + 1):
        try:
            response = client.chat.completions.create(
                model=settings.openrouter_model,
                max_tokens=1100,
                messages=[
                    {
                        "role": "system",
                        "content": system_prompt,
                    },
                    {
                        "role": "user",
                        "content": user_prompt,
                    },
                ],
            )

            if not response:
                raise RuntimeError(
                    "OpenRouter returned no response object."
                )

            if not response.choices:
                raise RuntimeError(
                    "OpenRouter returned no response choices."
                )

            message = response.choices[0].message

            if message is None:
                raise RuntimeError(
                    "OpenRouter returned no response message."
                )

            content = message.content

            if not isinstance(content, str) or not content.strip():
                raise RuntimeError(
                    "OpenRouter returned an empty narrative."
                )

            return content.strip(), "openrouter"

        except Exception as error:
            last_error = error

            print(
                f"OpenRouter narrative attempt "
                f"{attempt}/{max_attempts} failed: {error}"
            )

            if attempt < max_attempts:
                time.sleep(2)

    print(
        "LLM narrative unavailable after retries; "
        f"using fallback: {last_error}"
    )

    return fallback, "fallback"