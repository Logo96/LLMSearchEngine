def extract_keyphrase_naive(nlp, query):
    doc = nlp(query)
    entities = [ent.text for ent in doc.ents if ent.label_ in {"PERSON", "ORG", "GPE", "EVENT"}]
    if entities:
        return entities
    keywords = [token.text for token in doc if token.pos_ in {"NOUN", "PROPN"} and not token.is_stop]
    return " ".join(keywords) if keywords else query
