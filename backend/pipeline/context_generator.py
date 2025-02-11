import torch.nn.functional as F

class Context_Generator():
    def __init__(self, nlp):
        self.nlp = nlp
    
    def generate_context(self, user_query, content_sources, embedding_model):
        context_list= []
        title_url_pairs = []
        query_embedding = embedding_model.encode(user_query, convert_to_tensor=True)
        for text in content_sources["Wikipedia"]:
            chunked_text = self.__chunk_content(text["content"])
            if (chunked_text):
                chunk_embeddings = embedding_model.encode(chunked_text, convert_to_tensor=True, batch_size=16)
                similarities = F.cosine_similarity(query_embedding, chunk_embeddings, dim=1).cpu().numpy()
                relevance_rankings = sorted(
                zip(chunked_text, similarities), 
                    key=lambda x: x[1], 
                    reverse=True
                    )[:10]
                context_list.append(f"**{text['title']}**: {self.__format_context(relevance_rankings)}")
                title_url_pairs.append((text['title'], text['url']))
        return ["\n\n".join(context_list), title_url_pairs]
    
    #Need to hyperparameter tune step_size
    def __chunk_content(self, content_text, min_window_size=1, max_window_size=5, step_size=1):
        sentences = [sent.text for sent in self.nlp(content_text).sents]
        chunks = []
        n = len(sentences)
        for window_size in range(min_window_size, max_window_size + 1):
            for i in range(0, n - window_size + 1, step_size):
                chunks.append(" ".join(sentences[i:i + window_size]))
        return chunks
    
    def __format_context(self, relevance_rankings):
        return "\n".join([str(rank[0]).strip() for rank in relevance_rankings])

    
    def assemble_augmented_query(self, user_query, context, instruction):
        augmented_query = f"### Instructions: \n {instruction.strip()} \n ### Context: \n {context.strip()} \n ### User Query: \n {user_query.strip()}"
        return augmented_query