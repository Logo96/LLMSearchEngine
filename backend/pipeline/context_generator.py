from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

class Context_Generator():
    def __init__(self):
        self.transformer = SentenceTransformer('all-MiniLM-L6-v2')

    def generate_context(self, user_query, chunked_text):
        query_embedding = self.transformer.encode(user_query, convert_to_tensor=True)
        chunk_embeddings = self.transformer.encode(chunked_text, convert_to_tensor=True)

        similarities = cosine_similarity(
        query_embedding.cpu().numpy().reshape(1, -1),
        chunk_embeddings.cpu().numpy())[0]

        relevance_rankings = sorted(
            zip(chunked_text, similarities), 
            key=lambda x: x[1], 
            reverse=True)
        return self.__format_context(relevance_rankings)
    
    def __format_context(self, relevance_rankings):
        return str(relevance_rankings[0][0]).strip()

    def assemble_augmented_query(self, user_query, context, instruction):
        augmented_query = f"""
        ### User Query:
        {str(user_query).strip()}

        ### Context:
        {str(context).strip()}

        ### Instructions:
        {str(instruction).strip()}
        """
        return augmented_query