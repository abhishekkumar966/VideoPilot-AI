from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pipeline import run_pipeline
import traceback

router = APIRouter()


class AnalyzeRequest(BaseModel):
    source: str
    language: str = "english"


@router.post("/analyze")
async def analyze(data: AnalyzeRequest):
    try:
        result = run_pipeline(
            data.source,
            data.language
        )

        return {
            "success": True,
            "data": {
                "title": result["title"],
                "summary": result["summary"],
                "transcript": result["transcript"],
                "action_items": result["action_items"],
                "key_decisions": result["key_decisions"],
                "open_questions": result["open_questions"],
            }
        }

    except Exception as e:
        print("\n========== ANALYZE ERROR ==========")
        traceback.print_exc()
        print("===================================\n")

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )