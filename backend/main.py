from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

WORDS = [
    "grape","house","light","sweep","crisp","flame","brick","ocean","proud","table"
]

class Guess(BaseModel):
    word: str
    guess: str

@app.get("/new")
def new_word():
    return {"word": random.choice(WORDS)}

@app.post("/guess")
def check_guess(data: Guess):
    result = []
    for i, ch in enumerate(data.guess):
        if ch == data.word[i]:
            result.append("green")
        elif ch in data.word:
            result.append("yellow")
        else:
            result.append("gray")
    return {"result": result}
