const axios = require("axios");

async function generateNarrative(question, data) {
  const formattedData = data.map(item => `Event: ${item.title}, Year: ${item.year}, Summary: ${item.summary}`).join("\n");
  const prompt = `
    Based on the following historical data, answer this question: "${question}".
    Use narrative storytelling and timelines in your response.
    
    ${formattedData}
  `;

  const res = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
    { contents: [{ parts: [{ text: prompt }] }] },
    { params: { key: process.env.GEMINI_API_KEY } }
  );

  return res.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
}

module.exports = { generateNarrative };