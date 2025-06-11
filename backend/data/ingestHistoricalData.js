const { MongoClient } = require("mongodb");
const axios = require("axios");
const fs = require("fs");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const dbName = "historiai";
const collectionName = "events";

async function getEmbedding(text) {
  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedText",
    { content: text },
    { params: { key: process.env.GEMINI_API_KEY } }
  );
  return response.data.embedding.values;
}

async function ingestData() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  const rawData = JSON.parse(fs.readFileSync("./trade_routes.json"));
  const documents = [];

  for (const event of rawData) {
    const text = `${event.title} ${event.summary}`;
    const embedding = await getEmbedding(text);
    documents.push({
      title: event.title,
      year: event.year,
      location: event.location,
      summary: event.summary,
      embedding
    });
  }

  await collection.insertMany(documents);
  console.log(`Inserted ${documents.length} documents.`);
  await client.close();
}

ingestData().catch(console.error);