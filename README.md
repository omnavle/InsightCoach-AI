<div align="center">

# 📊 InsightCoach AI

### **Turn Data into Understanding with AI**

An AI-powered learning platform that helps users understand datasets through guided analysis, machine learning recommendations, intelligent visualizations, practice questions, and conversational AI.

<p>
  <img src="https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi"/>
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql"/>
  <img src="https://img.shields.io/badge/LangChain-AI-black?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Groq-API-red?style=for-the-badge"/>
</p>

<p>
  <strong>React • FastAPI • PostgreSQL • LangChain • Groq API • Pandas</strong>
</p>

</div>

---

# 🚀 Overview

InsightCoach AI is a full-stack AI learning platform that transforms raw CSV datasets into interactive learning experiences. Instead of focusing on business analytics dashboards, the platform acts as an AI Data Science Mentor by explaining datasets in simple language, recommending machine learning approaches, suggesting visualizations, generating practice questions, and answering follow-up questions through an AI chat interface.

---

# ✨ Features

- 📂 Upload CSV datasets
- 📊 Automatic dataset profiling
- 🤖 AI-generated dataset explanation
- 🧠 Machine Learning recommendation
- 📈 AI-powered visualization suggestions
- 💬 Natural language chart generation
- ❓ AI-generated practice questions
- 💡 Context-aware AI Mentor Chat
- ⚡ Responsive React interface
- 📝 Markdown-supported chat responses

---

# 🏗️ Tech Stack

| Frontend | Backend | AI | Database |
|-----------|-----------|-----------|-----------|
| React (Vite) | FastAPI | LangChain | PostgreSQL |
| TypeScript | SQLAlchemy | Groq API | |
| Tailwind CSS | Pandas | Prompt Engineering | |
| React Router | Python | | |
| Axios | python-dotenv | | |
| Recharts | | | |

---

# 🏛️ System Architecture

```text
                    CSV Upload
                         │
                         ▼
               Pandas Data Analysis
                         │
                         ▼
              LangChain Prompt Layer
                         │
                         ▼
                    Groq LLM
                         │
      ┌──────────────────┼──────────────────┐
      ▼                  ▼                  ▼
Dataset Summary    ML Recommendation    Chart Suggestions
      │                  │                  │
      └──────────────────┼──────────────────┘
                         ▼
                Practice Questions
                         │
                         ▼
                  AI Mentor Chat
```

---

# 📸 Screenshots


## 🏠 Home Page

<img src="./docs/images/home.png" width="1000" alt="Home"/>

---

## 📊 Dataset Overview

![Overview](docs/images/overview.png)

---

## 📈 Visualization Coach

![Charts](docs/images/charts.png)

---

## 💬 AI Mentor Chat

![Chat](docs/images/chat.png)

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/InsightCoach-AI.git

cd InsightCoach-AI
```

---

## 2️⃣ Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux / macOS
source venv/bin/activate

pip install -r ../requirements.txt
```

### Create `.env`

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/insightcoach
GROQ_API_KEY=your_groq_api_key
UPLOAD_DIR=../uploads
```

### Run Backend

```bash
uvicorn app.main:app --reload
```

Backend API

```
http://localhost:8000
```

Swagger Documentation

```
http://localhost:8000/docs
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend

```
http://localhost:5173
```

---


# 🧠 AI Workflow

```text
User Uploads CSV
        │
        ▼
Pandas Dataset Analysis
        │
        ▼
LangChain Prompt Engineering
        │
        ▼
      Groq API
        │
        ├──────── Dataset Explanation
        ├──────── ML Recommendation
        ├──────── Visualization Suggestions
        ├──────── Practice Question Generator
        └──────── AI Mentor Chat
```

