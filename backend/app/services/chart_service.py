"""Builds Recharts-ready data arrays for a chosen chart type and columns."""
from typing import Any, Dict, List, Optional

import pandas as pd

MAX_CATEGORIES = 12
MAX_POINTS = 200


def build_chart_data(
    df: pd.DataFrame, chart_type: str, x_column: str, y_column: Optional[str] = None
) -> Dict[str, Any]:
    chart_type = chart_type.lower()

    if x_column not in df.columns:
        raise ValueError(f"Column '{x_column}' not found in dataset.")
    if y_column and y_column not in df.columns:
        raise ValueError(f"Column '{y_column}' not found in dataset.")

    if chart_type in ("bar", "pie"):
        counts = df[x_column].value_counts().head(MAX_CATEGORIES)
        data: List[Dict[str, Any]] = [
            {"name": str(k), "value": int(v)} for k, v in counts.items()
        ]
        return {"chart_type": chart_type, "x_key": "name", "y_key": "value", "data": data}

    if chart_type == "histogram":
        series = df[x_column].dropna()
        bins = pd.cut(series, bins=10)
        counts = bins.value_counts().sort_index()
        data = [{"name": str(interval), "value": int(v)} for interval, v in counts.items()]
        return {"chart_type": chart_type, "x_key": "name", "y_key": "value", "data": data}

    if chart_type == "line":
        subset = df[[x_column] + ([y_column] if y_column else [])].dropna().head(MAX_POINTS)
        if y_column:
            data = [
                {"name": str(row[x_column]), "value": row[y_column]}
                for _, row in subset.iterrows()
            ]
        else:
            data = [{"name": str(i), "value": v} for i, v in enumerate(subset[x_column])]
        return {"chart_type": chart_type, "x_key": "name", "y_key": "value", "data": data}

    if chart_type == "scatter":
        if not y_column:
            raise ValueError("Scatter charts require a y_column.")
        subset = df[[x_column, y_column]].dropna().head(MAX_POINTS)
        data = [
            {"x": row[x_column], "y": row[y_column]} for _, row in subset.iterrows()
        ]
        return {"chart_type": chart_type, "x_key": "x", "y_key": "y", "data": data}

    if chart_type == "box":
        series = df[x_column].dropna()
        summary = {
            "min": float(series.min()),
            "q1": float(series.quantile(0.25)),
            "median": float(series.median()),
            "q3": float(series.quantile(0.75)),
            "max": float(series.max()),
        }
        data = [{"name": x_column, **summary}]
        return {"chart_type": chart_type, "x_key": "name", "y_key": None, "data": data}

    raise ValueError(f"Unsupported chart type: {chart_type}")
