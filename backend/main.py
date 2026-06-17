from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from routes.analyze import router as analyze_router
from routes.chat import router as chat_router

load_dotenv()

app = FastAPI(
    title="VideoPilot AI",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routes
app.include_router(analyze_router)
app.include_router(chat_router)

@app.get("/")
def home():
    return {
        "message": "🚀 VideoPilot AI API Running"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }