from fastapi import APIRouter
from pydantic import BaseModel

from pipeline import get_rag_chain
from core.rag_engine import ask_question

router = APIRouter()


class ChatRequest(BaseModel):
    question: str


@router.post("/chat")
def chat(data: ChatRequest):

    try:
        rag_chain = get_rag_chain()

        print("RAG CHAIN:", rag_chain)

        if rag_chain is None:
            return {
                "answer": "Please analyze a video first."
            }

        answer = ask_question(
            rag_chain,
            data.question
        )

        print("ANSWER:", answer)

        return {
            "answer": answer
        }

    except Exception as e:
        print("CHAT ERROR:", str(e))

        return {
            "answer": f"Error: {str(e)}"
        }