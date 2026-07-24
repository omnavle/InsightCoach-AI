from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.dataset import Dataset
from app.schemas.dataset import DatasetOut, DatasetOverview
from app.services import ai_service
from app.services.dataset_service import build_overview, get_dataset_or_404, load_dataframe

router = APIRouter(tags=["dataset"])


@router.get("/dataset/{dataset_id}", response_model=DatasetOut)
def get_dataset(dataset_id: int, db: Session = Depends(get_db)):
    return get_dataset_or_404(db, dataset_id)


@router.get("/dataset", response_model=list[DatasetOut])
def list_datasets(db: Session = Depends(get_db)):
    return db.query(Dataset).order_by(Dataset.uploaded_at.desc()).all()


@router.get("/dataset/{dataset_id}/overview", response_model=DatasetOverview)
def dataset_overview(dataset_id: int, db: Session = Depends(get_db)):
    dataset = get_dataset_or_404(db, dataset_id)
    df = load_dataframe(dataset)
    overview = build_overview(df)
    ai_summary = ai_service.generate_dataset_summary(df)

    return DatasetOverview(dataset_id=dataset.id, ai_summary=ai_summary, **overview)
