# 🎥 VideoPilot AI

VideoPilot AI is an AI-powered video analysis platform that transcribes YouTube videos and local files, generates summaries, extracts action items, key decisions, and open questions, and enables RAG-based chat with content.

## Features

- 🎬 YouTube Video Analysis
- 📝 AI Transcription
- 📋 Smart Summaries
- ✅ Action Item Extraction
- 🔑 Key Decisions
- ❓ Open Questions
- 💬 Chat with Video (RAG)
- 🌐 English & Hinglish Support

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS

### Backend
- FastAPI
- Python

### AI Stack
- Whisper
- Sarvam AI
- Mistral AI
- LangChain
- ChromaDB

## Run Locally

### Backend

```bash
cd backend

python -m venv .venv

.venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

## Author

Abhishek Kumar
