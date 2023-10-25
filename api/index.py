from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from api.chatbot_utils import *
import json

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Query(BaseModel):
    prompt: str


@app.post("/api/chat")
async def fill_and_send_prompt(query: Query):
    docs, url = build_full_prompt(query.prompt)
    return json.dumps({"text": send_to_openai(docs), "url" : url})
