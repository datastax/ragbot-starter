# Astra DB Chatbot Starter

## Getting Started with Vercel

1. [Create or sign in](https://astra.datastax.com/register) to your Astra DB account.
2. Create a vector database. Store the database id, region and namespace, and token for later.
3. [Create or sign in](https://platform.openai.com/) to your OpenAI account. Store your OpenAI key for later.
4. Click to deploy the app to Vercel: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdatastax%2Fexample-chatbot-astra-python-react&env=ASTRA_DB_NAMESPACE,OPENAI_API_KEY,ASTRA_DB_ID,ASTRA_DB_REGION,ASTRA_DB_APPLICATION_TOKEN). Set your environment variables to the values created in steps 1 and 3.


## OR Local Setup

### Set up environment variables:
```
export NAME=VALUE
```

- ASTRA_DB_NAMESPACE=existing Astra Namespace in a vector enabled DB
- OPENAI_API_KEY=api key for OPENAI
- ASTRA_DB_ID=Astra DB database id
- ASTRA_DB_REGION=Astra DB database region
- ASTRA_DB_APPLICATION_TOKEN=Generate app token for Astra database

To install backend deps, run the following command

```
pip install -r requirements.txt
```

To install frontend deps, run the following command

```
npm install
```

### Start Servers

To start the backend server in the terminal, run the following:

```
uvicorn api:index:app --reload
```

To start the frontend in the terminal, run the following:

```
npm run next-dev
```
