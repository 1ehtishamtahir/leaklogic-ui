export interface Finding {
  category: string;
  entity: string;
  title: string;
  metric_change: string;
  dollar_impact: number;
  confidence: number;
  time_window: string;
  evidence: string[];
  likely_cause: string;
  suggested_action: string;
}

export interface AnalysisResult {
  status: string;
  total_estimated_leak: number;
  findings: Finding[];
  executive_summary: string;
  amd_usage_note: string;
}

export interface UploadedFiles {
  sales: File | null;
  refunds: File | null;
  suppliers: File | null;
  inventory: File | null;
}
