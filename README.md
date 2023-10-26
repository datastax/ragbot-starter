# Example Chatbot: Astra/Python/React

## Quick deploy to Vercel

You can clone & deploy it to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Anant/astra-chatbot-react-python)

# Environment Variables

When you deploy with Vercel, create envrironment variables via the Vercel UI. When deploying locally, create them using the terminal command.

```
export NAME=VALUE
```

- KEYSPACE=existing Astra keyspace in a vector enables DB
- COLLECTION_NAME=name of a JSON API Astra collection
- OPENAI_API_KEY=api key for OPENAI
- ASTRA_DB_ID=Astra database id
- ASTRA_DB_REGION=Astra database region
- ASTRA_DB_APPLICATION_TOKEN=Generate app token for Astra database


# Local Setup

To install backend deps run the following command

```
pip install -r requirements.txt
```

To install frontend deps run the following command

```
npm install
```

# Start Servers

To start the backend server, in a terminal tab run the following

```
uvicorn api:index:app --reload
```

To start the frontend in a new terminal run the following

```
npm run next-dev
```
