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
        Using the context provided below, answer the user's question as thoroughly as possible. 
        - Enhance the response using the context to provide rich and informative details.
        - Style the response in Markdown for improved readability:
            - Use headings (e.g., `###`) for structure.
            - Use bullet points or lists where applicable.
            - Highlight key terms in **bold** or `code blocks` for emphasis.
        - Explicitly incorporate all relevant information gathered in the context section.
        - If the context is insufficient to answer the question, indicate that additional information is required.
        """

    def augment_query(self, user_query, embedding_model):
        embed_model = SentenceTransformer(embedding_model)
        content_sources = self.retriever.search_and_fetch_pages(user_query, embed_model)
        context_as_string, sources = self.context_generator.generate_context(user_query, content_sources, embed_model)
        return [self.context_generator.assemble_augmented_query(user_query, context_as_string, self.instructions), sources]
