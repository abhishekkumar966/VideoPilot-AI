import os

from dotenv import load_dotenv

from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableLambda, RunnablePassthrough
from langchain_text_splitters import RecursiveCharacterTextSplitter

load_dotenv()


MODEL_NAME = "mistral-small-latest"


def get_llm():
    api_key = os.getenv("MISTRAL_API_KEY")

    if not api_key:
        raise ValueError(
            "❌ MISTRAL_API_KEY not found. Please check your .env file."
        )

    try:
        return ChatMistralAI(
            model=MODEL_NAME,
            api_key=api_key,
            temperature=0.3,
            max_retries=2,
        )
    except Exception as e:
        raise RuntimeError(f"Failed to initialize Mistral LLM: {e}")


def split_transcript(transcript: str):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=3000,
        chunk_overlap=200,
    )
    return splitter.split_text(transcript)


def summarize(transcript: str) -> str:
    if not transcript or not transcript.strip():
        return "Transcript is empty."

    llm = get_llm()

    map_prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "Summarize this portion of a meeting transcript in concise bullet points.",
            ),
            ("human", "{text}"),
        ]
    )

    map_chain = map_prompt | llm | StrOutputParser()

    chunks = split_transcript(transcript)

    summaries = []

    for i, chunk in enumerate(chunks, start=1):
        print(f"Summarizing chunk {i}/{len(chunks)}...")
        summaries.append(map_chain.invoke({"text": chunk}))

    combined = "\n\n".join(summaries)

    final_prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                """You are an expert meeting summarizer.

Combine all partial summaries into one professional summary.

Return:

• Overview
• Key Discussion Points
• Decisions
• Action Items
• Next Steps
""",
            ),
            ("human", "{text}"),
        ]
    )

    final_chain = (
        RunnablePassthrough()
        | RunnableLambda(lambda x: {"text": x})
        | final_prompt
        | llm
        | StrOutputParser()
    )

    return final_chain.invoke(combined)


def generate_title(transcript: str) -> str:
    if not transcript.strip():
        return "Untitled Meeting"

    llm = get_llm()

    title_prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "Generate a professional meeting title (maximum 8 words). Return only the title.",
            ),
            ("human", "{text}"),
        ]
    )

    chain = (
        RunnablePassthrough()
        | RunnableLambda(lambda x: {"text": x})
        | title_prompt
        | llm
        | StrOutputParser()
    )

    return chain.invoke(transcript[:2000]).strip()