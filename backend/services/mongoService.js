const { MongoClient } = require("mongodb");
const axios = require("axios");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const dbName = "historiai";
const collectionName = "events";

async function searchHistoricalData(query) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  const embedding = await getEmbedding(query);

  const results = await collection.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector: embedding,
        numCandidates: 100,
        limit: 10
      }
    }
  ]).toArray();

  await client.close();
  return results;
}

async function getEmbedding(text) {
  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedText",
    { content: text },
    { params: { key: process.env.GEMINI_API_KEY } }
  );
  return response.data.embedding.values;
}

module.exports = { searchHistoricalData };