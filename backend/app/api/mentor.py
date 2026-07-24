from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.dataset import MLRecommendation
from app.services import ai_service
from app.services.dataset_service import get_dataset_or_404, load_dataframe

router = APIRouter(tags=["mentor"])


@router.get("/mentor/{dataset_id}", response_model=MLRecommendation)
def get_ml_recommendation(dataset_id: int, db: Session = Depends(get_db)):
    dataset = get_dataset_or_404(db, dataset_id)
    df = load_dataframe(dataset)

    result = ai_service.generate_ml_recommendation(df, dataset.target_column or df.columns[-1])

    if result.get("ml_problem") and result["ml_problem"] != dataset.ml_problem:
        dataset.ml_problem = result["ml_problem"]
        db.commit()

    return MLRecommendation(dataset_id=dataset.id, **result)
