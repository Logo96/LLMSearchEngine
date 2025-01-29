from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from backend.models.llm_interface import LLMInterface
from backend.pipeline.rag_interface import RAG_Interface
from contextlib import asynccontextmanager
import asyncio

class LLMInferenceRequest(BaseModel):
    query: str
    llm_model: str
    embedding_model: str 
    temperature: float
    top_k: int
    top_p: float
    max_tokens: int

class LLMInferenceResponse(BaseModel):
    model_output_basic: str
    model_query_basic: str
    model_output_RAG: str
    model_query_RAG: str
    model_RAG_sources: list

@asynccontextmanager
async def lifespan(app: FastAPI):
    llm_interface = LLMInterface()
    rag_interface = RAG_Interface()
    app.state.llm_interface = llm_interface
    app.state.rag_interface = rag_interface
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)
@app.post("/testing", response_model=LLMInferenceResponse)
async def test(payload: LLMInferenceRequest):
    print(payload)
    await asyncio.sleep(10)
    return {
        "model_output_basic": "This is a basic response",
        "model_query_basic": "This is a basic query",
        "model_output_RAG": "This is a RAG response",
        "model_query_RAG": "This is a RAG query",
        "model_RAG_sources": ["Source 1", "Source 2"]
    }
@app.post("/inference", response_model=LLMInferenceResponse)
async def inference(payload: LLMInferenceRequest):
    llm_interface = app.state.llm_interface
    rag_interface = app.state.rag_interface
    model_output_basic = llm_interface.generate_output(payload.query, payload.llm_model, 
                            payload.temperature, payload.top_p, payload.top_k, payload.max_tokens)
    augmented_query, model_RAG_sources = rag_interface.augment_query(payload.query, payload.embedding_model)
    model_output_RAG = llm_interface.generate_output(augmented_query, payload.llm_model, 
                            payload.temperature, payload.top_p, payload.top_k, payload.max_tokens)
    print(model_RAG_sources)
    return {
        "model_output_basic": model_output_basic,
        "model_query_basic": payload.query,
        "model_output_RAG": model_output_RAG,
        "model_query_RAG": augmented_query,
        "model_RAG_sources": model_RAG_sources
        }

@app.get("/")
async def root():
    return {"message": f"Server is running"}
