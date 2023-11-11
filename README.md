# RAGBot Starter

This project is a starter for creating a chatbot using Astra DB and OpenAI. 

## Getting Started with Vercel

Follow these steps to deploy the app to Vercel:

1. [Create or sign in](https://astra.datastax.com/register) to your Astra DB account.
2. Create a vector database. Make sure to save the database id, region, namespace, and token for later use.
3. [Create or sign in](https://platform.openai.com/) to your OpenAI account. Keep your OpenAI key handy for later use.
4. Click the button below to deploy the app to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/datastax/astra-db-ts-chatbot-starter&env=ASTRA_DB_NAMESPACE,OPENAI_API_KEY,ASTRA_DB_ID,ASTRA_DB_REGION,ASTRA_DB_APPLICATION_TOKEN).

Remember to set your environment variables to the values obtained in steps 1 and 3.

## Setting up your database and seeding with data

1. In your IDE, set up the following environment variables:

- ASTRA_DB_NAMESPACE: The existing Astra Namespace in a vector-enabled DB
- OPENAI_API_KEY: Your API key for OpenAI. You can [create an API key here](https://platform.openai.com/api-keys).
- ASTRA_DB_ID: Your Astra DB database id
- ASTRA_DB_REGION: Your Astra DB database region
- ASTRA_DB_APPLICATION_TOKEN: The generated app token for your Astra database

2. Install dependencies by running `yarn install` in your terminal.
3. Populate your database with sample data by running `ts-node scripts/populateDb.ts` in your terminal.
