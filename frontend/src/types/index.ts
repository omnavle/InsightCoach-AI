export interface Dataset {
  id: number;
  filename: string;
  original_filename: string;
  rows: number;
  columns: number;
  file_size: number;
  uploaded_at: string;
  target_column?: string | null;
  ml_problem?: string | null;
}

export interface ColumnInfo {
  name: string;
  dtype: string;
  missing_values: number;
  unique_values: number;
}

export interface DatasetOverview {
  dataset_id: number;
  shape: { rows: number; columns: number };
  columns: ColumnInfo[];
  duplicate_rows: number;
  preview: Record<string, unknown>[];
  ai_summary: string;
}

export interface MLRecommendation {
  dataset_id: number;
  ml_problem: string;
  suggested_algorithms: string[];
  data_cleaning_steps: string[];
  feature_engineering_ideas: string[];
  missing_value_handling: string[];
  encoding_techniques: string[];
  feature_scaling: string[];
  explanation: string;
}

export interface ChartSuggestion {
  chart_type: string;
  columns: string[];
  reason: string;
  insight: string;
}

export interface ChartData {
  chart_type: string;
  x_key: string;
  y_key: string | null;
  data: Record<string, unknown>[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
