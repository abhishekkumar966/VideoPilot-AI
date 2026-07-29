from dotenv import load_dotenv
import os
import httpx

load_dotenv()

key = os.getenv("MISTRAL_API_KEY")

headers = {
    "Authorization": f"Bearer {key}",
    "Content-Type": "application/json",
}

payload = {
    "model": "mistral-small-latest",
    "messages": [
        {
            "role": "user",
            "content": "Hello"
        }
    ]
}

response = httpx.post(
    "https://api.mistral.ai/v1/chat/completions",
    headers=headers,
    json=payload,
)

print("Status:", response.status_code)
print(response.text)