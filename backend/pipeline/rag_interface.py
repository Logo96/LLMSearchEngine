from retriever import Retriever
from context_generator import Context_Generator

class RAG_Interface():
    def __init__(self):
        self.retriever = Retriever()
        self.context_generator = Context_Generator()
        self.instructions = f"""
        Using the context provided below, 
        answer the user's question as thoroughly and concisely as possible. 
        Do not include unrelated information, and ensure your response is clear and easy to understand. 
        If the context is insufficient to answer the question, indicate that additional information is required.
        """
    def augment_query(self, user_query):
        chunked_content = self.retriever.search_and_fetch_pages(user_query)["content_chunked"]
        context_as_string = self.context_generator.generate_context(user_query, chunked_content)
        return self.context_generator.assemble_augmented_query(user_query, context_as_string, self.instructions)

r = RAG_Interface()
print(r.augment_query("What does Steve Jobs do?"))
