from pydantic import BaseModel, Field
from typing import Any


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
    """Data for frontend charts"""
    revenue_over_time: list[dict[str, Any]]  # [{"month": "2024-01", "revenue": 5000}, ...]
    records_by_source: dict[str, int]        # {"sales": 120, "refunds": 45, ...}
    date_range: str                           # "Jan 2024 - Mar 2024"


class AnalysisResponse(BaseModel):
    status: str
    total_estimated_leak: float
    findings: list[LeakFinding]
    executive_summary: str
    amd_usage_note: str
    chart_data: ChartData | None = None

