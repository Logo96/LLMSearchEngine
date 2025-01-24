from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

class Context_Generator():
    def __init__(self, nlp):
        self.transformer = SentenceTransformer('all-MiniLM-L6-v2')
        self.nlp = nlp
    
    def generate_context(self, user_query, content_sources):
        context_list= []
        for text in content_sources["Wikipedia"]:
            chunked_text = self.__chunk_content(text["content"])
            query_embedding = self.transformer.encode(user_query, convert_to_tensor=True)
            chunk_embeddings = self.transformer.encode(chunked_text, convert_to_tensor=True)

            similarities = cosine_similarity(
            query_embedding.cpu().numpy().reshape(1, -1),
            chunk_embeddings.cpu().numpy())[0]

            relevance_rankings = sorted(
                zip(chunked_text, similarities), 
                key=lambda x: x[1], 
                reverse=True)
            context_list.append(f"{text['title']}: {self.__format_context(relevance_rankings)}")
        return "\n\n".join(context_list)
    
    def __chunk_content(self, content_text, chunk_sentence_len=3):
        doc = self.nlp(content_text)
        # Might need to clean Latex/Other expressions
        sentences = [sent.text for sent in doc.sents]
        chunks = []
        cur_chunk = []
        for sent in sentences:
            cur_chunk.append(sent)
            if len(cur_chunk) == chunk_sentence_len:
                chunks.append("".join(cur_chunk))
                cur_chunk = []
        if cur_chunk:
            chunks.append("".join(cur_chunk))
        return chunks
    
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