import wikipediaapi
import requests
import os
from dotenv import load_dotenv
from pathlib import Path
from backend.utils.keyword_extraction import extract_keyphrase_naive

class Retriever:
    def __init__(self, nlp, language='en'):
        load_dotenv(Path(__file__).resolve().parents[2] / ".env")
        user_agent = os.getenv("WIKIPEDIA_USER_AGENT")
        self.wiki = wikipediaapi.Wikipedia(user_agent, language=language)
        self.nlp = nlp

    def search_and_fetch_pages(self, query, top_k=1):
        keyphrase_query = extract_keyphrase_naive(self.nlp, query)
        wiki_pages = self.__search_wikipedia(keyphrase_query, top_k)
        return {
            "Wikipedia": wiki_pages,
            "Google": None,
            "News": None
        }

    # Returns a list of wiki-pages in json format
    def __search_wikipedia(self, keyphrase_query, limit, keyphrase_count=3):
        url = "https://en.wikipedia.org/w/api.php"
        pages = []
        for query_topic in keyphrase_query[0:keyphrase_count]:
            print("Current Query Topic: ", query_topic)
            params = {
                "action": "opensearch",
                "format": "json",
                "search": query_topic,
                "limit": limit
            }
            valid_articles = (requests.get(url, params=params)).json()[1][0:limit]
            for valid_article in valid_articles:
                cur_page = self.wiki.page(valid_article)
                if cur_page.exists():
                    pages.append(
                        {
                        "title": cur_page.title,
                        "summary": cur_page.summary,
                        "content": cur_page.text,
                        "url": cur_page.fullurl    
                        }
                    )
        return pages

        
   

