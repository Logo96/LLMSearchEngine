from vllm import LLM, SamplingParams

class LLMInterface():
    def __init__(self, model="Qwen/Qwen2.5-0.5B", device="cpu"):
        self.llm = LLM(model=model, device=device)

    def generate_output(self, prompt, temperature=0, top_p=1, max_tokens=50):
        sampling_params = SamplingParams(temperature=temperature, top_p=top_p, max_tokens=max_tokens)
        print("Prompt received:", prompt)
        print("LLM ID:", id(self.llm))
        output = self.llm.generate(prompt, sampling_params)
        result = output[0].outputs[0].text
        print("Generated output:", result)
        return result
    
    