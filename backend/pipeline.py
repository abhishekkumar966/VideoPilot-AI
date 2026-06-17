from utils.audio_processor import process_input

from core.transcriber import transcribe_all

from core.summarize import (
    summarize,
    generate_title
)

from core.extractor import (
    extract_action_items,
    extract_key_decisions,
    extract_questions
)

from core.rag_engine import build_rag_chain


# Store latest RAG chain globally
CURRENT_RAG_CHAIN = None


def run_pipeline(source, language="english"):
    global CURRENT_RAG_CHAIN

    print("🎬 Starting Video Analysis...")

    # Audio Processing
    chunks = process_input(source)

    # Transcription
    transcript = transcribe_all(
        chunks,
        language
    )

    print("✅ Transcript Generated")

    # Title
    title = generate_title(transcript)

    # Summary
    summary = summarize(transcript)

    # Action Items
    action_items = extract_action_items(
        transcript
    )

    # Key Decisions
    decisions = extract_key_decisions(
        transcript
    )

    # Open Questions
    questions = extract_questions(
        transcript
    )

    # Build RAG Chain
    CURRENT_RAG_CHAIN = build_rag_chain(
        transcript
    )

    print("✅ RAG Chain Created")

    return {
        "title": title,
        "transcript": transcript,
        "summary": summary,
        "action_items": action_items,
        "key_decisions": decisions,
        "open_questions": questions
    }


def get_rag_chain():
    return CURRENT_RAG_CHAIN