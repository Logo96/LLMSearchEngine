from vllm import LLM, SamplingParams

class LLMInterface():
    def __init__(self, device="cpu"):
        self.device = device

    def generate_output(self, query, model, temperature, top_p, top_k, max_tokens):
        llm = LLM(model=model, device=self.device)
        sampling_params = SamplingParams(temperature=temperature, top_p=top_p, top_k=top_k, max_tokens=max_tokens)
        output = llm.generate(query, sampling_params)
        result = output[0].outputs[0].text
        return result
    
    