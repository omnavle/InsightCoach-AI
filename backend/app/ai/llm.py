"""Thin wrapper around the Groq LLM via LangChain."""
import os
from functools import lru_cache

from dotenv import load_dotenv
from langchain_groq import ChatGroq

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.1-70b-versatile")


@lru_cache
def get_llm(temperature: float = 0.3) -> ChatGroq:
    """Return a cached ChatGroq client instance."""
    if not GROQ_API_KEY:
        raise RuntimeError(
            "GROQ_API_KEY is not set. Add it to backend/.env before using AI features."
        )
    return ChatGroq(
        api_key=GROQ_API_KEY,
        model=GROQ_MODEL,
        temperature=temperature,
    )


def ask_llm(prompt: str, temperature: float = 0.3) -> str:
    """Send a prompt to the LLM and return the plain text response."""
    llm = get_llm(temperature=temperature)
    response = llm.invoke(prompt)
    return response.content
