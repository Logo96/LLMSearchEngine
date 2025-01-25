from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from backend.models.llm_interface import LLMInterface
from backend.pipeline.rag_interface import RAG_Interface
from contextlib import asynccontextmanager

class LLMInferenceRequest(BaseModel):
    query: str
    llm_model: str
    embedding_model: str 
    temperature: float
    top_k: int
    top_p: float
    max_tokens: int

class LLMInferenceResponse(BaseModel):
    response: str

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
    allow_origins=["*"],  # Replace "*" with specific origins for production
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.post("/inference", response_model=LLMInferenceResponse)
async def inference(payload: LLMInferenceRequest):
    llm_interface = app.state.llm_interface
    response = llm_interface.generate_output(payload.query, payload.llm_model, 
                            payload.temperature, payload.top_p, payload.top_k, payload.max_tokens)
    return {"response": response}

@app.post("/inference/rag", response_model=LLMInferenceResponse)
async def inference_rag(payload: LLMInferenceRequest):
    llm_interface = app.state.llm_interface
    rag_interface = app.state.rag_interface
    augmented_query = rag_interface.augment_query(payload.query, payload.embedding_model)
    llm_output = llm_interface.generate_output(augmented_query, payload.llm_model, 
                            payload.temperature, payload.top_p, payload.top_k, payload.max_tokens)
    print(llm_output)
    return {"response": llm_output}

@app.get("/")
async def root():
    return {"message": f"Server is running"}
