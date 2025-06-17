/** @format */

// /** @format */

// // const analyzeCase = (req, res) => {
// //     const caseData = req.body;
// //     // Process the caseData here
// //     res.json({ remedy: "Sulphur", analysis: "Strong psoric miasm with skin affinity." });
// //   };

// //   module.exports = { analyzeCase };
// // const { brainData } = require('../utils/brainLogic');
// const stringSimilarity = require("string-similarity");

// function extractRubricsFromCase(caseInput) {
//   const text = Object.values(caseInput || {})
//     .join(" ")
//     .toLowerCase();
//   const words = text
//     .split(/[,.;\n]/)
//     .map((s) => s.trim())
//     .filter(Boolean);

//   const allRubrics = brainData.map((entry) => entry.rubric);
//   const matches = new Set();

//   words.forEach((userPhrase) => {
//     const bestMatch = stringSimilarity.findBestMatch(userPhrase, allRubrics);
//     bestMatch.ratings.forEach((match) => {
//       if (match.rating > 0.4) {
//         matches.add(match.target);
//       }
//     });
//   });

//   return Array.from(matches);
// }

// exports.analyzeCase = (req, res) => {
//   const { rubrics, caseInput } = req.body;

//   let finalRubrics = rubrics || [];

//   if ((!finalRubrics || !finalRubrics.length) && caseInput) {
//     finalRubrics = extractRubricsFromCase(caseInput);
//   }

//   if (!finalRubrics.length) {
//     return res
//       .status(400)
//       .json({ error: "No rubrics or valid caseInput found." });
//   }

//   const remedyScore = {};

//   brainData.forEach((entry) => {
//     if (finalRubrics.includes(entry.rubric)) {
//       entry.remedies.forEach(({ name, grade }) => {
//         if (!remedyScore[name]) remedyScore[name] = 0;
//         remedyScore[name] += grade;
//       });
//     }
//   });

//   const sorted = Object.entries(remedyScore)
//     .sort((a, b) => b[1] - a[1])
//     .map(([name, score]) => ({ name, score }));

//   res.json({
//     inputRubrics: finalRubrics,
//     topRemedies: sorted.slice(0, 10),
//   });
// };
// const { brainData } = require("../utils/brainLogic");
// const stringSimilarity = require("string-similarity");

// function extractRubricsFromCase(caseInput) {
//   const text = Object.values(caseInput || {})
//     .join(" ")
//     .toLowerCase();
//   const words = text
//     .split(/[,.;\n]/)
//     .map((s) => s.trim())
//     .filter(Boolean);

//   const allRubrics = brainData.map((entry) => entry.rubric);
//   const matches = new Set();

//   words.forEach((userPhrase) => {
//     const bestMatch = stringSimilarity.findBestMatch(userPhrase, allRubrics);
//     bestMatch.ratings.forEach((match) => {
//       if (match.rating > 0.3) {
//         // 🎯 lowered threshold from 0.4 → 0.35
//         matches.add(match.target);
//       }
//     });
//   });

//   return Array.from(matches);
// }

// exports.analyzeCase = (req, res) => {
//   const { rubrics, caseInput } = req.body;
//   console.log("✅ req.body =", req.body);
//   console.log("✅ rubrics =", req.body.rubrics);
//   console.log("✅ caseInput =", req.body.caseInput);
//   let finalRubrics = rubrics || [];

//   if ((!finalRubrics || !finalRubrics.length) && caseInput) {
//     finalRubrics = extractRubricsFromCase(caseInput);
//   }

//   console.log("📩 Incoming caseInput:", caseInput);
//   console.log("🔍 Rubrics used:", finalRubrics);

//   if (!finalRubrics.length) {
//     return res
//       .status(400)
//       .json({ error: "No rubrics or valid caseInput found." });
//   }

//   const remedyScore = {};

//   brainData.forEach((entry) => {
//     if (finalRubrics.includes(entry.rubric)) {
//       if (entry.remedies && Array.isArray(entry.remedies)) {
//         entry.remedies.forEach(({ name, grade }) => {
//           if (!remedyScore[name]) remedyScore[name] = 0;
//           remedyScore[name] += grade;
//         });
//       }
//     }
//   });

//   const sorted = Object.entries(remedyScore)
//     .sort((a, b) => b[1] - a[1])
//     .map(([name, score]) => ({ name, score }));

//   console.log("🏁 Final remedies:", sorted.slice(0, 10));

//   res.json({
//     inputRubrics: finalRubrics,
//     topRemedies: sorted.slice(0, 10),
//     main_remedy: sorted[0]?.name || "N/A",
//     dosage: "1M once daily",
//     analysis: "Based on dominant mind and physical rubrics",
//     pioneer_explanation: `Selected based on rubric match: ${finalRubrics
//       .slice(0, 3)
//       .join(", ")}`,
//   });
// };
const { brainData } = require("../utils/brainLogic");
const stringSimilarity = require("string-similarity");

function extractRubricsFromCase(caseInput) {
  if (!brainData || !Array.isArray(brainData)) {
    console.error("❌ brainData is not loaded or not an array");
    return [];
  }

  const text = Object.values(caseInput || {})
    .join(" ")
    .toLowerCase();

  const words = text
    .split(/[,.;\n]/)
    .map((s) => s.trim())
    .filter(Boolean);

  const allRubrics = brainData
    .map((entry) => entry.rubric)
    .filter((r) => typeof r === "string" && r.trim() !== "");

  const matches = new Set();

  words.forEach((userPhrase) => {
    const bestMatch = stringSimilarity.findBestMatch(userPhrase, allRubrics);
    bestMatch.ratings.forEach((match) => {
      if (match.rating > 0.3) {
        matches.add(match.target);
      }
    });
  });

  return Array.from(matches);
}


exports.analyzeCase = (req, res) => {
  const { rubrics, caseInput } = req.body;
  console.log("✅ req.body =", req.body);
  console.log("✅ rubrics =", req.body.rubrics);
  console.log("✅ caseInput =", req.body.caseInput);

  let finalRubrics = rubrics || [];

  if ((!finalRubrics || !finalRubrics.length) && caseInput) {
    finalRubrics = extractRubricsFromCase(caseInput);
  }

  console.log("📩 Incoming caseInput:", caseInput);
  console.log("🔍 Rubrics used:", finalRubrics);

  if (!finalRubrics.length) {
    return res
      .status(400)
      .json({ error: "No rubrics or valid caseInput found." });
  }

  if (!brainData || !Array.isArray(brainData)) {
    console.error("❌ brainData is not properly loaded");
    return res
      .status(500)
      .json({ error: "Internal error: brain data not available." });
  }

  const remedyScore = {};

  brainData.forEach((entry) => {
    if (finalRubrics.includes(entry.rubric)) {
      if (entry.remedies && Array.isArray(entry.remedies)) {
        entry.remedies.forEach(({ name, grade }) => {
          if (!remedyScore[name]) remedyScore[name] = 0;
          remedyScore[name] += grade;
        });
      }
    }
  });

  const sorted = Object.entries(remedyScore)
    .sort((a, b) => b[1] - a[1])
    .map(([name, score]) => ({ name, score }));

  console.log("🏁 Final remedies:", sorted.slice(0, 10));

  res.json({
    inputRubrics: finalRubrics,
    topRemedies: sorted.slice(0, 10),
    main_remedy: sorted[0]?.name || "N/A",
    dosage: "1M once daily",
    analysis: "Based on dominant mind and physical rubrics",
    pioneer_explanation: `Selected based on rubric match: ${finalRubrics
      .slice(0, 3)
      .join(", ")}`,
  });
};
exports.searchRubrics = (req, res) => {
  const query = req.query.q?.toLowerCase() || "";
  const matches = brainData
    .map((entry) => entry.rubric)
    .filter((rubric) => rubric.toLowerCase().includes(query));
  res.json({ results: matches });
};