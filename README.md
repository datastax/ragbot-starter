# RAGBot Starter

This project is a starter for creating a chatbot using Astra DB and OpenAI. It's designed to be easy to deploy and use, with a focus on performance and usability.

## Features

- **Astra DB Integration**: Store and retrieve data from your Astra DB database with ease.
- **OpenAI Integration**: Leverage the power of OpenAI to generate intelligent responses.
- **Easy Deployment**: Deploy your chatbot to Vercel with just a few clicks.
- **Customizable**: Modify and extend the chatbot to suit your needs.

## Getting Started

### Prerequisites

- An Astra DB account. You can [create one here](https://astra.datastax.com/register).
    - An Astra Vector Database
- An OpenAI account. You can [create one here](https://platform.openai.com/).

## Deployment

Easily deploy your chatbot to Vercel by clicking the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/datastax/ragbot-starter&integration-ids=oac_HrgeXUSyqANAtm3MAOaTJ43a&env=OPENAI_API_KEY)

Configure the Astra DB integration and add your `OPENAI_API_KEY` environment variable.

Note: Before you deploying to prod, you will want to remove seed script (`npm run seed`) from the build step.

### Local Development

1. Clone this repository to your local machine.
2. Install the dependencies by running `npm install` in your terminal.
3. Set up the following environment variables in your IDE or `.env` file:
    - `OPENAI_API_KEY`: Your API key for OpenAI
    - `ASTRA_DB_API_ENDPOINT`: Your Astra DB vector database endpoint
    - `ASTRA_DB_APPLICATION_TOKEN`: The generated app token for your Astra database
        - To create a new token go to your database's `Connect` tab and click `Generate Token`. (your Application Token begins with `AstraCS:...`)
    - `ASTRA_DB_NAMESPACE`: (Optional) The existing Astra Namespace/Keyspace **_in a vector-enabled DB_**
4. Populate your database with sample data by running `npm run seed` in your terminal.

### Running the Project

To start the development server, run `npm run dev` in your terminal. Open [http://localhost:3000](http://localhost:3000) to view the chatbot in your browser.
