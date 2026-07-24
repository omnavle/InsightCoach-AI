"""SQLAlchemy model for dataset metadata."""
from sqlalchemy import Column, Integer, String, DateTime, BigInteger
from sqlalchemy.sql import func

from app.database.database import Base


class Dataset(Base):
    __tablename__ = "datasets"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    original_filename = Column(String, nullable=False)
    rows = Column(Integer, nullable=False)
    columns = Column(Integer, nullable=False)
    file_size = Column(BigInteger, nullable=False)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    target_column = Column(String, nullable=True)
    ml_problem = Column(String, nullable=True)
