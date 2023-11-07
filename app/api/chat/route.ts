import OpenAI from 'openai';
import {AIStream, OpenAIStream, StreamingTextResponse} from 'ai';
import {AstraDB} from "@datastax/astra-db-ts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const astraDb = new AstraDB(process.env.ASTRA_DB_TOKEN, process.env.ASTRA_DB_ID, process.env.ASTRA_DB_REGION);

export async function POST(req: Request) {
  try {
    const {messages} = await req.json();

    const latestMessage = messages[messages?.length - 1]?.content;
    const {data} = await openai.embeddings.create({input: latestMessage, model: 'text-embedding-ada-002'});

    const collection = await astraDb.collection("chat");
    const {documents} = collection.find({
      sort: {
        "$vector": data[0]?.embedding,
      },
      options: {
        limit: 5,
      }
    });
    const ragPrompt = [
      {
        role: 'assistant',
        content: `You are an AI assistant answering questions about Cassandra and Astra DB.
        START CONTEXT
      ${documents.join("\n")}
      END CONTEXT
      If the answer is not provided in the context, the AI assistant will say, "I'm sorry, I don't know the answer".
      `,
      },
    ]

    const assistant = await openai.beta.assistants.create({
      name: "Cassandra Assistant",
      instructions: `You are an AI assistant answering questions about Cassandra and Astra DB.
        START CONTEXT
      ${documents.join("\n")}
      END CONTEXT
      If the answer is not provided in the context, the AI assistant will say, "I'm sorry, I don't know the answer".
      `,
      model: "gpt-4-1106-preview"
    });

    const { thread_id } = await openai.beta.threads.createAndRun({
      assistant_id: assistant?.id,
      thread: {
        messages: [...messages],
      },
    });

    const thread = await openai.beta.threads.messages.list(thread_id, {
      stream: true,
    });
    const res = thread?.data?.map(item => {
      return {
        role: item?.role,
        // @ts-ignore
        content: item?.content[0]?.text?.value,
      };
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [...ragPrompt, ...messages],
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (e) {
    throw e;
  }
}
