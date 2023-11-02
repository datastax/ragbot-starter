import json
import requests

import sys
sys.path.append('utils')
from local_creds import *

url = f"https://{ASTRA_DB_ID}-{ASTRA_DB_REGION}.apps.astra.datastax.com/api/json/v1/{ASTRA_DB_NAMESPACE}"
print(url)

payload = json.dumps({"createCollection": {
    "name": "chat",
    "options" : {
        "vector" : {
            "size" : 1536,
            "function" : "cosine"}}}})

headers = {
    'x-cassandra-token': ASTRA_DB_APPLICATION_TOKEN,
    'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
