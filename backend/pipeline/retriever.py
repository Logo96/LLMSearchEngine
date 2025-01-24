import wikipediaapi
import requests
import spacy
import os
from dotenv import load_dotenv
from pathlib import Path
from backend.utils.keyword_extraction import extract_keyphrase_naive

class Retriever:
    def __init__(self, language='en'):
        load_dotenv(Path(__file__).resolve().parents[2] / ".env")
        user_agent = os.getenv("WIKIPEDIA_USER_AGENT")
        self.wiki = wikipediaapi.Wikipedia(user_agent, language=language)
        self.nlp = spacy.load("en_core_web_sm")

    def search_and_fetch_pages(self, query, top_k=1):
        keyphrase_query = extract_keyphrase_naive(self.nlp, query)
        print(keyphrase_query)
        search_results = self.__search_wikipedia(keyphrase_query)[1]
        if not search_results:
            return {"error": "No matching pages found."}
        # Fetch the top_k search results
        best_match = search_results[0]
        page = self.wiki.page(best_match)

        if page.exists():
            return {
                "title": page.title,
                "summary": page.summary,
                "content": page.text,
                "content_chunked": self.__chunk_content(page.text),
                "url": page.fullurl
            }
        else:
            return {"error": "Page does not exist."}
        
    def __search_wikipedia(self, query, limit=5):
        url = "https://en.wikipedia.org/w/api.php"
        params = {
            "action": "opensearch",
            "format": "json",
            "search": query,
            "limit": limit
        }
        response = requests.get(url, params=params)
        return response.json()
    
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

# Retriever.py
# Step 1: Get User Prompt Input
# Step 2: Retrieve top k content pieces
# Step 3: Chunk the content
# Context_Generator.py
# Step 4: Rank chunks by semantic relevance to user prompt
# Step 5: Assemble into augmented prompt and feed to LLM