from datetime import datetime
from typing import Optional, List, Any, Dict

from pydantic import BaseModel


class DatasetOut(BaseModel):
    id: int
    filename: str
    original_filename: str
    rows: int
    columns: int
    file_size: int
    uploaded_at: datetime
    target_column: Optional[str] = None
    ml_problem: Optional[str] = None

    class Config:
        from_attributes = True


class UploadResponse(BaseModel):
    dataset: DatasetOut
    message: str = "Dataset uploaded successfully."


class ColumnInfo(BaseModel):
    name: str
    dtype: str
    missing_values: int
    unique_values: int


class DatasetOverview(BaseModel):
    dataset_id: int
    shape: Dict[str, int]
    columns: List[ColumnInfo]
    duplicate_rows: int
    preview: List[Dict[str, Any]]
    ai_summary: str


class MLRecommendation(BaseModel):
    dataset_id: int
    ml_problem: str
    suggested_algorithms: List[str]
    data_cleaning_steps: List[str]
    feature_engineering_ideas: List[str]
    missing_value_handling: List[str]
    encoding_techniques: List[str]
    feature_scaling: List[str]
    explanation: str


class ChartSuggestion(BaseModel):
    chart_type: str
    columns: List[str]
    reason: str
    insight: str


class ChartData(BaseModel):
    chart_type: str
    x_key: str
    y_key: Optional[str] = None
    data: List[Dict[str, Any]]

