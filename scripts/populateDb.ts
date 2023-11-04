import {AstraDB} from "@datastax/astra-db-ts";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import 'dotenv/config'
import sampleData from './sample_data.json';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const {ASTRA_DB_TOKEN, ASTRA_DB_ID, ASTRA_DB_REGION, ASTRA_DB_COLLECTION } = process.env;

const astraDb = new AstraDB(ASTRA_DB_TOKEN, ASTRA_DB_ID, ASTRA_DB_REGION);

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const createCollection = async () => {
  const res = await astraDb.createCollection(ASTRA_DB_COLLECTION, {
    vector: {
      size: 1536,
      function: "cosine"
    }
  });
  console.log(res);
};

const loadSampleData = async () => {
  const collection = await astraDb.collection(ASTRA_DB_COLLECTION);
  for await (const { url, title, content} of sampleData) {
    const chunks = await splitter.splitText(content);
    let i = 0;
    for await (const chunk of chunks) {
      const {data} = await openai.embeddings.create({input: chunk, model: 'text-embedding-ada-002'});

      const res = await collection.insertOne({
        document_id: `${url}-${i}`,
        $vector: data[0]?.embedding,
        url,
        title,
        content: chunk
      });
      i++;
    }
  }
};

createCollection().then(() => loadSampleData());
