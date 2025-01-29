import wikipediaapi
import requests
import os
from dotenv import load_dotenv
from pathlib import Path
from backend.utils.keyword_extraction import extract_keyphrases

class Retriever:
    def __init__(self, nlp, language='en', similariy_threshold=.55):
        load_dotenv(Path(__file__).resolve().parents[2] / ".env")
        user_agent = os.getenv("WIKIPEDIA_USER_AGENT")
        self.wiki = wikipediaapi.Wikipedia(user_agent, language=language)
        self.nlp = nlp
        self.similarity_threshold = similariy_threshold

    def search_and_fetch_pages(self, query, embedding_model, search_depth=3):
        #Needs to be changed to show cosine similarities
        keyphrase_query = [keyword_sim_pair[0] for keyword_sim_pair in extract_keyphrases(query, self.similarity_threshold)]
        print("keyphrases:", keyphrase_query)
        wiki_pages = self.__search_wikipedia(keyphrase_query, search_depth)
        return {
            "Wikipedia": wiki_pages,
            "Google": None,
            "News": None
        }

    # Returns a list of wiki-pages in json format
    def __search_wikipedia(self, keyphrase_query, search_depth):
        url = "https://en.wikipedia.org/w/api.php"
        pages = []
        for query_topic in keyphrase_query:
            print("Current Query Topic: ", query_topic)
            params = {
                "action": "opensearch",
                "format": "json",
                "search": query_topic,
                "limit": search_depth
            }
            valid_articles = (requests.get(url, params=params)).json()[1][0:search_depth]
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

        
   

