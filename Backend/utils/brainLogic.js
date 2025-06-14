/** @format */

// function analyzeCase(caseInput, toggles) {
//     const symptoms = caseInput.symptoms?.toLowerCase() || "";
//     const thermal = caseInput.thermal?.toLowerCase() || "";
//     const cravings = caseInput.cravings?.toLowerCase() || "";
//     const mentals = caseInput.mentals?.toLowerCase() || "";

//     let result = {
//       main_remedy: "Unknown",
//       analysis: "Insufficient data to determine remedy.",
//     };

//     if (
//       symptoms.includes("itch") &&
//       symptoms.includes("scaly") &&
//       symptoms.includes("winter") &&
//       thermal.includes("hot")
//     ) {
//       result = {
//         main_remedy: "Sulphur",
//         analysis: "Strong psoric miasm with skin affinity, worse by warmth and bathing.",
//       };
//     } else if (
//       symptoms.includes("migraine") &&
//       symptoms.includes("constipation") &&
//       symptoms.includes("sun exposure") &&
//       cravings.includes("salt")
//     ) {
//       result = {
//         main_remedy: "Natrum Muriaticum",
//         analysis:
//           "Migraine with photophobia, aggravated by sun, suppressed grief, and salt craving. Psoro-sycotic.",
//       };
//     }

//     if (toggles?.showExplanation) {
//       if (result.main_remedy === "Sulphur") {
//         result.pioneer_explanation =
//           "Sulphur is suited for chronic skin conditions with itching and burning, worse by warmth.";
//       } else if (result.main_remedy === "Natrum Muriaticum") {
//         result.pioneer_explanation =
//           "Natrum Mur is suited for migraines from grief, worse by sun, with craving for salt.";
//       } else {
//         result.pioneer_explanation = "No remedy-specific explanation available.";
//       }
//     }

//     return result;
//   }

//   module.exports = analyzeCase;

// utils/brainLogic.js
// utils/brainLogic.js
const fs = require("fs");
const path = require("path");

const brainPath = path.join(
  __dirname,
  "brain",
  "brain_v2_tagged_full_FULL_1000.json"
);

let brainData = [];

try {
  const raw = fs.readFileSync(brainPath, "utf-8");
  brainData = JSON.parse(raw);
  console.log("✅ Brain loaded:", brainData.length, "rubrics");
} catch (err) {
  console.error("❌ Failed to load brain:", err);
}

module.exports = {
  brainData,
};
