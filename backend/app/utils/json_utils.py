"""Helpers for safely parsing JSON returned by the LLM."""
import json
import re
from typing import Any


def extract_json(text: str) -> Any:
    """Strip markdown code fences and parse the first JSON object/array found."""
    cleaned = text.strip()
    cleaned = re.sub(r"^```json|^```|```$", "", cleaned, flags=re.MULTILINE).strip()

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        pass

    match = re.search(r"(\{.*\}|\[.*\])", cleaned, flags=re.DOTALL)
    if match:
        return json.loads(match.group(1))

    raise ValueError(f"Could not parse JSON from LLM response: {text[:200]}")
