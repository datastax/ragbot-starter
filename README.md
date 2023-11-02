# Astra DB Chatbot Starter

## Quick deploy to Vercel

You can clone & deploy it to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdatastax%2Fexample-chatbot-astra-python-react&env=KEYSPACE,COLLECTION_NAME,OPENAI_API_KEY,ASTRA_DB_ID,ASTRA_DB_REGION,ASTRA_DB_APPLICATION_TOKEN)

# Environment Variables

When you deploy with Vercel, create envrironment variables via the Vercel UI. When deploying locally, create them in your terminal.

```
export NAME=VALUE
```

- KEYSPACE=existing Astra keyspace in a vector enabled DB
- COLLECTION_NAME=name of a JSON API Astra collection
- OPENAI_API_KEY=api key for OPENAI
- ASTRA_DB_ID=Astra DB database id
- ASTRA_DB_REGION=Astra DB database region
- ASTRA_DB_APPLICATION_TOKEN=Generate app token for Astra database


# Local Setup

To install backend deps, run the following command

```
pip install -r requirements.txt
```

To install frontend deps, run the following command

```
npm install
```

# Start Servers

To start the backend server in the terminal, run the following:

```
uvicorn api:index:app --reload
```

To start the frontend in the terminal, run the following:

```
npm run next-dev
```
