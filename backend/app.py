from fastapi import FastAPI
from pydantic import BaseModel
from backend.models.llm_interface import LLMInterface
from contextlib import asynccontextmanager

class LLMRequest(BaseModel):
    query: str
class LLMResponse(BaseModel):
    response: str

@asynccontextmanager
async def lifespan(app: FastAPI):
    llm_interface = LLMInterface()
    app.state.llm_interface = llm_interface
    yield

app = FastAPI(lifespan=lifespan)

@app.post("/inference", response_model=LLMResponse)
async def inference(prompt: LLMRequest):
    llm_interface = app.state.llm_interface
    response = llm_interface.GenerateOutput(prompt.query)
    return {"response": response}


@app.get("/")
async def root():
    return {"message": f"Server is running"}
