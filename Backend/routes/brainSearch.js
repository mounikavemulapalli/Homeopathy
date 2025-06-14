/** @format */

const express = require("express");
const router = express.Router();
const { brainData } = require("../utils/brainLogic");
const stringSimilarity = require("string-similarity");

router.get("/search", (req, res) => {
  const query = (req.query.q || "").toLowerCase();

  if (!query) return res.json([]);

  const rubricList = brainData.map((r) => r.rubric);
  const matches = stringSimilarity.findBestMatch(query, rubricList);

  const suggestions = matches.ratings
    .filter((r) => r.rating > 0.3)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5); // Top 5

  res.json(suggestions);
});

module.exports = router;
