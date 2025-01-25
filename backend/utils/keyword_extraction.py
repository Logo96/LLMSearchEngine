from keybert import KeyBERT
def extract_keyphrases(query, similarity_threshold):
    model = KeyBERT('all-MiniLM-L6-v2')
    keywords = model.extract_keywords(query, keyphrase_ngram_range=(1, 3), stop_words='english', top_n=5)
    return [(phrase, score) for phrase, score in keywords if score > similarity_threshold]

