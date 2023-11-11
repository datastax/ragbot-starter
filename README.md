# RAGBot Starter

## Getting Started with Vercel

1. [Create or sign in](https://astra.datastax.com/register) to your Astra DB account.
2. Create a vector database. Store the database id, region and namespace, and token for later.
3. [Create or sign in](https://platform.openai.com/) to your OpenAI account. Store your OpenAI key for later.
4. Click to deploy the app to Vercel:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/datastax/astra-db-ts-chatbot-starter&env=ASTRA_DB_NAMESPACE,OPENAI_API_KEY,ASTRA_DB_ID,ASTRA_DB_REGION,ASTRA_DB_APPLICATION_TOKEN).

Set your environment variables to the values created in steps 1 and 3.

## Setting up your database and seeding with data
1. Navigate to your IDE, set up the following environment variables:

- ASTRA_DB_NAMESPACE=existing Astra Namespace in a vector enabled DB
- OPENAI_API_KEY=api key for OPENAI
- ASTRA_DB_ID=Astra DB database id
- ASTRA_DB_REGION=Astra DB database region
- ASTRA_DB_APPLICATION_TOKEN=Generate app token for Astra database
2. Install dependencies: `yarn install`
3. Run the data loading script to load the sample data into your database: `ts-node scripts/populateDb.ts`
