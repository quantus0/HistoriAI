const express = require("express");
const router = express.Router();
const { searchHistoricalData } = require("../services/mongoService");
const { generateNarrative } = require("../services/aiService");

router.post("/", async (req, res) => {
  const { question } = req.body;
  try {
    const searchResults = await searchHistoricalData(question);
    const narrative = await generateNarrative(question, searchResults);
    res.json({ searchResults, narrative });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;