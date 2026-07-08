from typing import Any

from pydantic import BaseModel, Field


class LeakFinding(BaseModel):
    category: str
    entity: str
    title: str
    metric_change: str
    dollar_impact: float
    confidence: float = Field(ge=0, le=1)
    time_window: str
    evidence: list[str]
    likely_cause: str | None = None
    suggested_action: str


class ChartData(BaseModel):
    """Aggregated data used by frontend charts."""

    revenue_over_time: list[dict[str, Any]]
    records_by_source: dict[str, int]
    date_range: str


class AnalysisResponse(BaseModel):
    status: str
    total_estimated_leak: float
    findings: list[LeakFinding]
    executive_summary: str
    narrative_source: str
    amd_usage_note: str
    chart_data: ChartData | None = None