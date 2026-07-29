import os

from dotenv import load_dotenv

from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough, RunnableLambda

from core.vector_store import (
    build_vector_store,
    load_vector_store,
    get_retriever,
)

# Load environment variables
load_dotenv()

MODEL_NAME = "mistral-small-latest"


def get_llm():
    """Initialize Mistral LLM."""

    api_key = os.getenv("MISTRAL_API_KEY")

    if not api_key:
        raise ValueError("❌ MISTRAL_API_KEY not found in .env")

    return ChatMistralAI(
        model=MODEL_NAME,
        api_key=api_key,
        temperature=0.3,
        max_retries=2,
    )


def format_docs(docs):
    """Convert retrieved documents into a single context string."""
    return "\n\n".join(doc.page_content for doc in docs)


def build_rag_chain(transcript: str):
    """Build a RAG chain from a transcript."""

    print("Building vector store...")

    vector_store = build_vector_store(transcript)

    retriever = get_retriever(vector_store, k=4)

    llm = get_llm()

    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                """
You are an expert meeting assistant.

Answer ONLY using the meeting transcript context below.

If the answer is not available in the transcript, reply:

"I could not find this information in the meeting transcript."

Keep answers concise and professional.

Meeting Context:
{context}
""",
            ),
            ("human", "{question}"),
        ]
    )

    rag_chain = (
        {
            "context": retriever | RunnableLambda(format_docs),
            "question": RunnablePassthrough(),
        }
        | prompt
        | llm
        | StrOutputParser()
    )

    return rag_chain


def load_rag_chain():
    """Load existing vector database."""

    print("Loading existing vector database...")

    vector_store = load_vector_store()

    retriever = get_retriever(vector_store, k=4)

    llm = get_llm()

    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                """
You are an expert meeting assistant.

Answer ONLY using the meeting transcript context below.

If the answer is not available in the transcript, reply:

"I could not find this information in the meeting transcript."

Keep answers concise and professional.

Meeting Context:
{context}
""",
            ),
            ("human", "{question}"),
        ]
    )

    rag_chain = (
        {
            "context": retriever | RunnableLambda(format_docs),
            "question": RunnablePassthrough(),
        }
        | prompt
        | llm
        | StrOutputParser()
    )

    return rag_chain


def ask_question(rag_chain, question: str) -> str:
    """Ask a question using the RAG chain."""

    print(f"\nQuestion: {question}")

    answer = rag_chain.invoke(question)

    print(f"\nAnswer:\n{answer}")

    return answer