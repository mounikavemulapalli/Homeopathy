/** @format */

// function analyzeCase(caseInput = {}, toggles = {}) {
//     const {
//       symptoms = "",
//       thermal = "",
//       cravings = "",
//       mentals = ""
//     } = caseInput;

//     const allSymptoms = `${symptoms} ${mentals} ${cravings} ${thermal}`.toLowerCase();

//     const data = {
//       main_remedy: "Unknown",
//       analysis: "Insufficient data",
//       dosage: "1M once daily",
//       pioneer_explanation: "Please provide more detailed symptoms."
//     };

//     // 🔍 Example 1: Headache worse with motion → Bryonia Alba
//     if (allSymptoms.includes("headache") && allSymptoms.includes("motion")) {
//       data.main_remedy = "Bryonia Alba";
//       data.analysis = "Psora";
//       data.pioneer_explanation = "Bryonia is chosen due to bursting headache aggravated by slightest motion.";
//       return data;
//     }

//     // 🔍 Example 2: Itchy skin → Sulphur
//     if (allSymptoms.includes("itchy") && allSymptoms.includes("skin")) {
//       data.main_remedy = "Sulphur";
//       data.analysis = "Psora";
//       data.pioneer_explanation = "Sulphur helps in dry, itchy skin aggravated by bathing and heat.";
//       return data;
//     }

//     // 🔍 Example 3: Left-sided neck pain, insult, and radiating pain → Lachesis
//     if (allSymptoms.includes("neck pain") && allSymptoms.includes("left") && allSymptoms.includes("insult")) {
//       data.main_remedy = "Lachesis";
//       data.analysis = "Syphilitic";
//       data.pioneer_explanation = "Lachesis is indicated for left-sided complaints, emotional trauma, and radiating pain.";
//       return data;
//     }

//     // Default fallback
//     return data;
//   }

//   module.exports = { analyzeCase };
// const chiefComplaints = require("./chief_complaints.json");
// const {
//   chiefComplaints,
//   mindSymptoms,
//   physicalGenerals,
//   skinSymptoms,
// } = require("./brainLogic"); // Make sure brainLogic exports these properly

// const rubricGroups = [
//   { label: "Chief Complaints", data: chiefComplaints },
//   { label: "Mind Symptoms", data: mindSymptoms },
//   { label: "Physical Generals", data: physicalGenerals },
//   { label: "Skin Symptoms", data: skinSymptoms },
// ];

// function analyzeCase(caseInput = {}, toggles = {}) {
//   const input = {
//     symptoms: "",
//     thermal: "",
//     cravings: "",
//     mentals: "",
//     ...caseInput,
//   };

//   const allSymptoms =
//     `${input.symptoms} ${input.thermal} ${input.cravings} ${input.mentals}`.toLowerCase();
//   console.log("🧠 All symptoms:", allSymptoms);

//   const data = {
//     main_remedy: "Unknown",
//     analysis: "No matching rubric found.",
//     dosage: "1M once daily",
//     pioneer_explanation: "Please provide more detailed symptoms.",
//   };

//   for (let group of rubricGroups) {
//     for (let entry of group.data) {
//       const matched = entry.rubrics.some((rubric) =>
//         rubric
//           .toLowerCase()
//           .split(/[\s;,]+/)
//           .some((word) => allSymptoms.includes(word))
//       );

//       if (matched) {
//         data.main_remedy = entry.remedies[0];
//         data.analysis = `Matched rubric from ${
//           group.label
//         }: ${entry.rubrics.join(", ")}`;
//         data.pioneer_explanation = `Remedy suggested from ${group.label} based on: ${entry.symptom}`;
//         return data;
//       }
//     }
//   }

//   return data;
// }

// module.exports = { analyzeCase };
const {
  chiefComplaints,
  mindSymptoms,
  physicalGenerals,
  skinSymptoms,
} = require("./brainLogic");

const rubricGroups = [
  { label: "Chief Complaints", data: chiefComplaints },
  { label: "Mind Symptoms", data: mindSymptoms },
  { label: "Physical Generals", data: physicalGenerals },
  { label: "Skin Symptoms", data: skinSymptoms },
];

function analyzeCase(caseInput = {}, toggles = {}) {
  const input = {
    symptoms: "",
    thermal: "",
    cravings: "",
    mentals: "",
    ...caseInput,
  };

  const allSymptoms = `${input.symptoms} ${input.thermal} ${input.cravings} ${input.mentals}`.toLowerCase();
  console.log("🧠 All symptoms:", allSymptoms);

  const result = {
    main_remedy: "Unknown",
    top_matches: [],
    dosage: "1M once daily",
    analysis: "No matching rubric found.",
    pioneer_explanation: "Please provide more detailed symptoms.",
  };

  for (const group of rubricGroups) {
    for (const entry of group.data || []) {
      const rubrics = Array.isArray(entry.rubrics) ? entry.rubrics : [];

      const matched = rubrics.some((rubric) =>
        rubric
          .toLowerCase()
          .split(/[\s;,]+/)
          .some((word) => allSymptoms.includes(word))
      );

      if (matched) {
        const remedy = entry.remedies?.[0] || "N/A";
        result.main_remedy = remedy;
        result.analysis = `Matched rubric from ${group.label}: ${rubrics.join(", ")}`;
        result.pioneer_explanation = `Remedy suggested from ${group.label} based on: ${entry.symptom || "matched text"}`;
        result.top_matches.push({ group: group.label, rubric: rubrics, remedy });
        return result; // If you only want the first match, keep this return.
      }
    }
  }

  return result;
}

module.exports = { analyzeCase };
