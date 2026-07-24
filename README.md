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

# 📂 Project Structure

```text
InsightCoach-AI/
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── backend/
│   └── app/
│       ├── api/
│       ├── ai/
│       ├── database/
│       ├── models/
│       ├── schemas/
│       ├── services/
│       ├── utils/
│       └── main.py
│
├── uploads/
├── requirements.txt
└── README.md
```

---

# 📸 Screenshots

> Replace these placeholders with your application screenshots.

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

# 📡 REST API

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/upload` | Upload CSV Dataset |
| GET | `/dataset` | List Uploaded Datasets |
| GET | `/dataset/{id}` | Dataset Metadata |
| GET | `/dataset/{id}/overview` | Dataset Analysis |
| GET | `/mentor/{id}` | ML Recommendation |
| GET | `/charts/{id}/suggestions` | Visualization Suggestions |
| POST | `/charts/{id}/generate` | Generate Chart |
| POST | `/charts/{id}/from-text` | Generate Chart using Natural Language |
| GET | `/practice/{id}` | Practice Questions |
| POST | `/chat` | AI Mentor Chat |

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

---

# 🌟 Highlights

- Full-Stack AI Application
- Modular FastAPI Architecture
- AI-Powered Learning Workflow
- Interactive Dataset Exploration
- Natural Language Chart Generation
- Context-Aware Conversational Assistant
- Clean & Scalable Project Structure
- Beginner-Friendly AI Data Science Mentor
- Recruiter-Friendly Portfolio Project

---

# 🔮 Future Improvements

- PDF Report Export
- Data Cleaning Recommendations
- Dataset Comparison
- Feature Engineering Suggestions
- More Interactive Charts
- Explain Individual Columns
- Download AI Summary Report

---

# 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

### ⭐ If you found this project useful, please consider giving it a Star!

**Built with ❤️ using React, FastAPI, PostgreSQL, LangChain, and Groq API**

</div>
