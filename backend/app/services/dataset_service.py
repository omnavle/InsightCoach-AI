"""Pandas-based helpers for reading and summarizing a dataset."""
from typing import Any, Dict, List

import pandas as pd
from sqlalchemy.orm import Session

from app.models.dataset import Dataset
from app.utils.file_utils import get_dataset_path


def load_dataframe(dataset: Dataset) -> pd.DataFrame:
    path = get_dataset_path(dataset.filename)
    return pd.read_csv(path)


def get_dataset_or_404(db: Session, dataset_id: int) -> Dataset:
    from fastapi import HTTPException

    dataset = db.query(Dataset).filter(Dataset.id == dataset_id).first()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found.")
    return dataset


def build_overview(df: pd.DataFrame) -> Dict[str, Any]:
    """Build the structured (non-AI) part of the dataset overview."""
    columns: List[Dict[str, Any]] = []
    for col in df.columns:
        columns.append(
            {
                "name": col,
                "dtype": str(df[col].dtype),
                "missing_values": int(df[col].isna().sum()),
                "unique_values": int(df[col].nunique()),
            }
        )

    preview = df.head(10).fillna("").to_dict(orient="records")

    return {
        "shape": {"rows": df.shape[0], "columns": df.shape[1]},
        "columns": columns,
        "duplicate_rows": int(df.duplicated().sum()),
        "preview": preview,
    }


def guess_target_column(df: pd.DataFrame) -> str:
    """Very lightweight heuristic used as a fallback if the AI doesn't specify one."""
    common_names = ["target", "label", "class", "outcome", "y", "price", "sales", "churn"]
    for col in df.columns:
        if col.lower() in common_names:
            return col
    return df.columns[-1]
