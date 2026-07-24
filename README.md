# InsightCoach AI

**Turn Data into Understanding with AI**

InsightCoach AI is a beginner-friendly, full-stack AI learning platform. Upload any CSV
dataset and an AI Data Science Mentor guides you step by step: explaining the dataset in
plain language, recommending a machine learning approach, suggesting visualizations,
generating a practice quiz, and answering follow-up questions in a chat panel.

It's built to feel like an interactive study guide (think Notion / Kaggle Learn), not a
business analytics dashboard.

## Tech Stack

**Frontend:** React (Vite) · TypeScript · Tailwind CSS · React Router · Axios ·
React Hook Form · Recharts

**Backend:** FastAPI · SQLAlchemy · PostgreSQL · Pandas · python-dotenv

**AI:** LangChain · Groq API · Prompt Templates

No authentication, Docker, Redis, Celery, or background workers — kept intentionally
lightweight for a portfolio project.

## Project Structure

```
InsightCoach-AI/
  frontend/          React + Vite + TypeScript app
  backend/app/
    api/             FastAPI route handlers (upload, dataset, mentor, charts, practice, chat)
    ai/              LangChain prompt templates + Groq LLM wrapper
    database/        SQLAlchemy engine/session setup
    models/          SQLAlchemy ORM models
    schemas/         Pydantic request/response schemas
    services/        Business logic (pandas analysis, AI orchestration, chart building)
    utils/           File handling + JSON parsing helpers
  uploads/           Uploaded CSV files live here (metadata only goes to Postgres)
  requirements.txt
```

## The Learning Journey

| Lesson | What it does |
|---|---|
| 0 — Upload Dataset | Upload a CSV, see rows/columns/file size |
| 1 — Understand Your Dataset | Shape, dtypes, missing values, duplicates, preview + AI explanation |
| 2 — Machine Learning Coach | AI identifies the ML problem type and gives prep recommendations |
| 3 — Visualization Coach | AI-suggested charts, "Generate Chart" buttons, and natural-language chart requests |
| 4 — Practice Questions | 5 auto-generated beginner questions, click-to-ask |
| 5 — Ask the Mentor | Chatbot grounded in the uploaded dataset, with Markdown + suggested prompts |

## Getting Started

### 1. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r ../requirements.txt

cp .env.example .env
# then edit .env and set DATABASE_URL and GROQ_API_KEY

# create the database first, e.g.:
# createdb insightcoach

uvicorn app.main:app --reload
```

The API runs at `http://localhost:8000`. Interactive docs at `http://localhost:8000/docs`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` and proxies `/api/*` requests to the backend.

## Environment Variables (backend/.env)

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/insightcoach
GROQ_API_KEY=your_groq_api_key_here
UPLOAD_DIR=../uploads
```

Get a free Groq API key at https://console.groq.com.

## REST API

```
POST /upload                          upload a CSV
GET  /dataset                         list datasets
GET  /dataset/{id}                    dataset metadata
GET  /dataset/{id}/overview           Lesson 1 data + AI summary
GET  /mentor/{id}                     Lesson 2 ML recommendation
GET  /charts/{id}/suggestions         Lesson 3 chart suggestions
POST /charts/{id}/generate            build a specific chart
POST /charts/{id}/from-text           build a chart from a natural-language request
GET  /practice/{id}                   Lesson 4 practice questions
POST /chat                            Lesson 5 mentor chat
```

## Notes

- Only dataset **metadata** is stored in PostgreSQL; the CSV itself stays in `uploads/`.
- AI JSON responses are parsed defensively (`utils/json_utils.py`) since LLMs occasionally
  wrap JSON in markdown fences.
- Chart data is computed server-side with pandas and returned in a shape Recharts can
  render directly — the AI only decides *which* chart and *which* columns.
