/** @format */

// const express = require("express");
// const router = express.Router();
// const analyzeCase = require("../utils/brainLogic");

// router.post("/analyze", (req, res) => {
//   try {
//     const { caseInput, toggles } = req.body; // destructure expected input
//     const result = analyzeCase(caseInput, toggles); // call logic function
//     res.json(result); // respond with analysis
//   } catch (err) {
//     res.status(500).json({ error: "Error analyzing case", details: err.message });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const { analyzeCase,searchRubrics  } = require("../controllers/brainController");

router.post("/analyze", analyzeCase);
router.get("/search", searchRubrics);
module.exports = router;
