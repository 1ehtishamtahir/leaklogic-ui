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


class AnalysisResponse(BaseModel):
    status: str
    total_estimated_leak: float
    findings: list[LeakFinding]
    executive_summary: str
    amd_usage_note: str
