"""GET/POST /charts - Lesson 3 (Visualization Coach)."""
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.dataset import ChartData, ChartSuggestion
from app.services import ai_service, chart_service
from app.services.dataset_service import get_dataset_or_404, load_dataframe

router = APIRouter(tags=["charts"])


class ChartRequest(BaseModel):
    chart_type: str
    x_column: str
    y_column: str | None = None


class ChartNLRequest(BaseModel):
    request: str


@router.get("/charts/{dataset_id}/suggestions", response_model=list[ChartSuggestion])
def get_chart_suggestions(dataset_id: int, db: Session = Depends(get_db)):
    dataset = get_dataset_or_404(db, dataset_id)
    df = load_dataframe(dataset)
    suggestions = ai_service.generate_chart_suggestions(df)
    return suggestions[:3]


@router.post("/charts/{dataset_id}/generate", response_model=ChartData)
def generate_chart(dataset_id: int, payload: ChartRequest, db: Session = Depends(get_db)):
    dataset = get_dataset_or_404(db, dataset_id)
    df = load_dataframe(dataset)
    try:
        result = chart_service.build_chart_data(
            df, payload.chart_type, payload.x_column, payload.y_column
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    return result


@router.post("/charts/{dataset_id}/from-text", response_model=ChartData)
def generate_chart_from_text(dataset_id: int, payload: ChartNLRequest, db: Session = Depends(get_db)):
    dataset = get_dataset_or_404(db, dataset_id)
    df = load_dataframe(dataset)

    interpreted = ai_service.interpret_chart_request(df, payload.request)
    try:
        result = chart_service.build_chart_data(
            df,
            interpreted["chart_type"],
            interpreted["x_column"],
            interpreted.get("y_column"),
        )
    except (ValueError, KeyError) as exc:
        raise HTTPException(status_code=400, detail=f"Could not build chart: {exc}")
    return result
