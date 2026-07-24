from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.dataset import Dataset
from app.schemas.dataset import UploadResponse
from app.services.dataset_service import guess_target_column
from app.utils.file_utils import save_upload_file

import pandas as pd

router = APIRouter(tags=["upload"])


@router.post("/upload", response_model=UploadResponse)
def upload_dataset(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are supported.")

    stored_filename, file_path, file_size = save_upload_file(file)

    try:
        df = pd.read_csv(file_path)
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Could not parse CSV: {exc}")

    if df.empty:
        raise HTTPException(status_code=400, detail="The uploaded CSV is empty.")

    target_column = guess_target_column(df)

    dataset = Dataset(
        filename=stored_filename,
        original_filename=file.filename,
        rows=df.shape[0],
        columns=df.shape[1],
        file_size=file_size,
        target_column=target_column,
        ml_problem=None,
    )
    db.add(dataset)
    db.commit()
    db.refresh(dataset)

    return UploadResponse(dataset=dataset)
