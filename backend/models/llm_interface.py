import os
import requests
from vllm import LLM, SamplingParams
from dotenv import load_dotenv
from pathlib import Path

class LLMInterface():
    def __init__(self, device="cpu"):
        self.device = device

    def generate_output(self, query, model, temperature, top_p, top_k, max_tokens):
        if (model.startswith("gpt")):
            return self.generate_output_nonlocal(model, query, temperature, top_p, max_tokens)
        else:
            llm = LLM(model=model, device=self.device)
            sampling_params = SamplingParams(temperature=temperature, top_p=top_p, top_k=top_k, max_tokens=max_tokens)
            output = llm.generate(query, sampling_params)
            result = output[0].outputs[0].text
            return result
    def generate_output_nonlocal(self, model, query, temperature, top_p, max_tokens):
        load_dotenv(Path(__file__).resolve().parents[2] / ".env")
        openai_api_key = os.getenv("OPENAI_API_KEY")
        url = "https://api.openai.com/v1/chat/completions"
        payload = {
            "model": model,
            "messages": [{"role": "user", "content": query}],
            "temperature": temperature,
            "top_p": top_p,
            "max_tokens": max_tokens
        }
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {openai_api_key}"
        }
        try:
            response = requests.post(url, json=payload, headers=headers)
            response.raise_for_status()
            data = response.json()
            return data["choices"][0]["message"]["content"]  
        except requests.exceptions.RequestException as e:
            print(f"API Request failed: {e}")
            return None



    
    