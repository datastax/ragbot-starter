import {AstraDB} from "@datastax/astra-db-ts";
import 'dotenv/config'
import sampleData from './sample_data.json';

const {ASTRA_DB_TOKEN, ASTRA_DB_ID, ASTRA_DB_REGION } = process.env;

const astraDb = new AstraDB(ASTRA_DB_TOKEN, ASTRA_DB_ID, ASTRA_DB_REGION);

const createCollection = async () => {
  const res = await astraDb.createCollection(process.env.ASTRA_DB_COLLECTION, {
    vector: {
      size : 1536,
      function : "cosine"
    }
  });
  console.log(res);
};

const loadSampleData = async () => {
  for await (const { url, title, content} of sampleData) {
  }
};

// createCollection();
loadSampleData();