from backend.pipeline.retriever import Retriever
from backend.pipeline.context_generator import Context_Generator
from sentence_transformers import SentenceTransformer
import spacy

class RAG_Interface():
    def __init__(self):
        self.nlp = spacy.load("en_core_web_sm")
        self.retriever = Retriever(self.nlp)
        self.context_generator = Context_Generator(self.nlp)
        self.instructions = f"""
        Using the context provided below, 
        answer the user's question as thoroughly and concisely as possible. 
        Do not include unrelated information, and ensure your response is clear and easy to understand. 
        If the context is insufficient to answer the question, indicate that additional information is required.
        """
    def augment_query(self, user_query, embedding_model):
        embed_model = SentenceTransformer(embedding_model)
        content_sources = self.retriever.search_and_fetch_pages(user_query, embed_model)
        context_as_string = self.context_generator.generate_context(user_query, content_sources, embed_model)
        return self.context_generator.assemble_augmented_query(user_query, context_as_string, self.instructions)

r = RAG_Interface()
print(r.augment_query("Define machine learning and its applications in real-world problems.", "all-MiniLM-L6-v2"))