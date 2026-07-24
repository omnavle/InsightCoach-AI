from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import chat, charts, dataset, mentor, upload
from app.database.database import init_db

app = FastAPI(
    title="InsightCoach AI",
    description="Turn Data into Understanding with AI",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    init_db()


@app.get("/")
def root():
    return {"message": "InsightCoach AI backend is running."}


app.include_router(upload.router)
app.include_router(dataset.router)
app.include_router(mentor.router)
app.include_router(charts.router)
app.include_router(chat.router)
