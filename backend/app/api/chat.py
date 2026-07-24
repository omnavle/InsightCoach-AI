from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.chat import ChatRequest, ChatResponse
from app.services import ai_service
from app.services.dataset_service import get_dataset_or_404, load_dataframe

router = APIRouter(tags=["chat"])


@router.post("/chat", response_model=ChatResponse)
def chat_with_mentor(payload: ChatRequest, db: Session = Depends(get_db)):
    dataset = get_dataset_or_404(db, payload.dataset_id)
    df = load_dataframe(dataset)

    dataset_context = (
        f"Filename: {dataset.original_filename}\n"
        f"Shape: {df.shape[0]} rows x {df.shape[1]} columns\n"
        f"Columns: {', '.join(df.columns)}\n"
        f"Target column: {dataset.target_column}\n"
        f"ML problem: {dataset.ml_problem}\n"
        f"Sample rows: {df.head(3).to_dict(orient='records')}"
    )

    history = [m.model_dump() for m in (payload.history or [])]
    reply = ai_service.generate_chat_reply(dataset_context, history, payload.message)

    return ChatResponse(reply=reply)
