import json
import os
import requests

import split_q_and_a

from langchain.embeddings import OpenAIEmbeddings

import time
import sys
sys.path.append("utils")
from local_creds import *
#To do: add logger
embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)

request_url = f"https://{ASTRA_DB_ID}-{ASTRA_DB_REGION}.apps.astra.datastax.com/api/json/v1/{ASTRA_DB_NAMESPACE}/chat"
request_headers = { 'x-cassandra-token': ASTRA_DB_APPLICATION_TOKEN,  'Content-Type': 'application/json'}

def get_input_data():
    scraped_results_file = INPUT_DATA
    with open(scraped_results_file) as f:
        scraped_data = json.load(f)

        faq_scraped_data = []
        for d in scraped_data:
            if "faq" in d["url"].lower():
                faq_scraped_data.append(d)
    return faq_scraped_data

def embed(text_to_embed):
    embedding = list(embeddings.embed_query(text_to_embed))
    return embedding


def main():

    input_data_faq = get_input_data()

    # process faq data
    for webpage in input_data_faq:
        q_and_a_data = split_q_and_a.split(webpage)
        count=0
        for i in range (0,len(q_and_a_data["questions"])):
            document_id = webpage["url"]
            question_id = i + 1
            question = q_and_a_data["questions"][i]
            answer = q_and_a_data["answers"][i]
            text_to_embed = f"{question}"
            embedding = embed(text_to_embed)
            time.sleep(1)
            to_insert = {"insertOne": {"document": {"document_id": document_id, "question_id": question_id, "answer": answer, "question": question, "$vector": embedding}}}
            if (question == " Cluster?") or (question == "?"):
                print("Malformed question. Not adding to vector db.")
            else:
                response = requests.request("POST", request_url, headers=request_headers, data=json.dumps(to_insert))
                print(response.text + "\t Count: "+str(count))
                count+=1


if __name__ == "__main__":
    main()
