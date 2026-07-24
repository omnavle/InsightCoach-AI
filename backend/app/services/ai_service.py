from typing import Any, Dict, List

import pandas as pd

from app.ai.llm import ask_llm
from app.ai.prompts import (
    CHART_NL_PROMPT,
    CHART_SUGGESTION_PROMPT,
    CHAT_SYSTEM_PROMPT,
    DATASET_SUMMARY_PROMPT,
    ML_RECOMMENDATION_PROMPT,
)
from app.utils.json_utils import extract_json


def generate_dataset_summary(df: pd.DataFrame) -> str:
    prompt = DATASET_SUMMARY_PROMPT.format(
        shape=f"{df.shape[0]} rows x {df.shape[1]} columns",
        columns=", ".join(df.columns),
        dtypes=str(df.dtypes.astype(str).to_dict()),
        missing=str(df.isna().sum().to_dict()),
        preview=df.head(5).fillna("").to_dict(orient="records"),
    )
    return ask_llm(prompt, temperature=0.4)


def generate_ml_recommendation(df: pd.DataFrame, target_column: str) -> Dict[str, Any]:
    prompt = ML_RECOMMENDATION_PROMPT.format(
        shape=f"{df.shape[0]} rows x {df.shape[1]} columns",
        columns=", ".join(df.columns),
        dtypes=str(df.dtypes.astype(str).to_dict()),
        target_column=target_column,
    )
    raw = ask_llm(prompt, temperature=0.3)
    return extract_json(raw)


def generate_chart_suggestions(df: pd.DataFrame) -> List[Dict[str, Any]]:
    prompt = CHART_SUGGESTION_PROMPT.format(
        columns=", ".join(df.columns),
        dtypes=str(df.dtypes.astype(str).to_dict()),
    )
    raw = ask_llm(prompt, temperature=0.4)
    return extract_json(raw)


def interpret_chart_request(df: pd.DataFrame, user_request: str) -> Dict[str, Any]:
    prompt = CHART_NL_PROMPT.format(
        columns=", ".join(df.columns),
        dtypes=str(df.dtypes.astype(str).to_dict()),
        user_request=user_request,
    )
    raw = ask_llm(prompt, temperature=0.2)
    return extract_json(raw)


def generate_chat_reply(dataset_context: str, history: List[Dict[str, str]], question: str) -> str:
    history_text = "\n".join(f"{m['role']}: {m['content']}" for m in history) or "(no messages yet)"
    prompt = CHAT_SYSTEM_PROMPT.format(
        dataset_context=dataset_context,
        history=history_text,
        question=question,
    )
    return ask_llm(prompt, temperature=0.4)
