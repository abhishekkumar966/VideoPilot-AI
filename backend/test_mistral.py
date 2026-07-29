from dotenv import load_dotenv
import os
from mistralai import Mistral

load_dotenv()

api_key = os.getenv("MISTRAL_API_KEY")
print("API Key:", api_key)

client = Mistral(api_key=api_key)

response = client.chat.complete(
    model="mistral-small-latest",
    messages=[
        {
            "role": "user",
            "content": "Hello"
        }
    ]
)

print(response)