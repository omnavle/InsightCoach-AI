"""Helpers for saving uploaded files and locating them on disk."""
import os
import uuid

from fastapi import UploadFile

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "../uploads")


def ensure_upload_dir() -> None:
    os.makedirs(UPLOAD_DIR, exist_ok=True)


def save_upload_file(file: UploadFile) -> tuple[str, str, int]:
    """Save an uploaded CSV to disk and return (stored_filename, path, size_bytes)."""
    ensure_upload_dir()

    ext = os.path.splitext(file.filename)[1] or ".csv"
    stored_filename = f"{uuid.uuid4().hex}{ext}"
    file_path = os.path.join(UPLOAD_DIR, stored_filename)

    contents = file.file.read()
    with open(file_path, "wb") as f:
        f.write(contents)

    return stored_filename, file_path, len(contents)


def get_dataset_path(stored_filename: str) -> str:
    return os.path.join(UPLOAD_DIR, stored_filename)
