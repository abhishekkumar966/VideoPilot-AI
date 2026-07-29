from dotenv import load_dotenv
import os

from langchain_mistralai import ChatMistralAI

load_dotenv()

api_key = os.getenv("MISTRAL_API_KEY")
print("Key:", api_key[:8] + "...")

llm = ChatMistralAI(
    model="mistral-small-latest",
    api_key=api_key,
    temperature=0,
)

response = llm.invoke("Hello")

print(response.content)