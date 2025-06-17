/** @format */

// const express = require("express");
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require("dotenv").config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const router = express.Router();

// const generateHomeoSummary = async (caseData) => {
//   try {
//     const prompt = `
// Analyze the patient's face image (if provided) and the following case details.
// Suggest possible health issues visible from the face and recommend homeopathy medicine dosages and instructions.
// Use plain language, avoid special symbols, and keep the summary clear and actionable.

// Patient Details:
// Name: ${caseData.name}
// Age: ${caseData.age}
// Gender: ${caseData.gender}
// Marital Status: ${caseData.maritalStatus}
// Occupation: ${caseData.occupation}
// Address: ${caseData.address}
// Phone: ${caseData.phone}
// Date of Visit: ${caseData.dateOfVisit}

// Chief Complaints:
// ${
//   caseData.chiefComplaints && Array.isArray(caseData.chiefComplaints)
//     ? caseData.chiefComplaints
//         .map(
//           (c, idx) =>
//             `  ${idx + 1}. Complaint: ${c.complaint}, Duration: ${
//               c.duration
//             }, Description: ${c.description}`
//         )
//         .join("\n")
//     : ""
// }

// History of Present Illness: ${caseData.historyPresentIllness}

// Past History:
//   Childhood Diseases: ${caseData.pastHistory?.childhoodDiseases}
//   Surgeries/Injuries: ${caseData.pastHistory?.surgeriesInjuries}
//   Major Illnesses: ${caseData.pastHistory?.majorIllnesses}

// Family History: ${caseData.familyHistory}

// Personal History:
//   Appetite: ${caseData.personalHistory?.appetite}
//   Cravings/Aversions: ${caseData.personalHistory?.cravingsAversions}
//   Thirst: ${caseData.personalHistory?.thirst}
//   Bowel: ${caseData.personalHistory?.bowel}
//   Urine: ${caseData.personalHistory?.urine}
//   Sleep: ${caseData.personalHistory?.sleep}
//   Dreams: ${caseData.personalHistory?.dreams}
//   Sweat: ${caseData.personalHistory?.sweat}
//   Thermal: ${caseData.personalHistory?.thermal}
//   Habits: ${caseData.personalHistory?.habits}
//   Menstrual: ${caseData.personalHistory?.menstrual}

// Mental Symptoms: ${caseData.mentalSymptoms}
// General Remarks: ${caseData.generalRemarks}
// Observations by Doctor: ${caseData.observationsByDoctor}

// Prescription:
// ${
//   caseData.prescription && Array.isArray(caseData.prescription)
//     ? caseData.prescription
//         .map(
//           (p, idx) =>
//             `  ${idx + 1}. Date: ${p.date}, Remedy: ${p.remedyName}, Potency: ${
//               p.potency
//             }, Dose: ${p.dose}, Instructions: ${p.instructions}`
//         )
//         .join("\n")
//     : ""
// }
//     `;

//     // Use Gemini Vision model if image is provided
//     let result;
//     if (caseData.imageBase64) {
//       const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
//       result = await model.generateContent([
//         { text: prompt },
//         { inlineData: { mimeType: "image/jpeg", data: caseData.imageBase64 } }
//       ]);
//     } else {
//       const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
//       result = await model.generateContent(prompt);
//     }
//     const summary = result.response.text();
//     return summary;
//   } catch (error) {
//     console.error("Gemini AI error:", error);
//     throw new Error("Failed to generate homeopathy summary");
//   }
// };

// router.post("/", async (req, res) => {
//   try {
//     const caseData = req.body;
//     console.log("🧾 Incoming caseData:", caseData);  // add this
//     const summary = await generateHomeoSummary(caseData);
//     res.json({ summary });
//   } catch (error) {
//     console.error("Error generating summary:", error);
//     res.status(500).json({ error: "Failed to generate summary" });
//   }
// });

// module.exports = router;
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateHomeoSummary = async (caseData) => {
  try {
    const prompt = `
Analyze the patient's face image (if provided) and the case details below.
Suggest possible health issues visible from the face and recommend homeopathy medicines with dosages and instructions.

Use plain language, avoid symbols, and keep the summary actionable.

Patient Details:
Name: ${caseData.name}
Age: ${caseData.age}
Gender: ${caseData.gender}
Marital Status: ${caseData.maritalStatus}
Occupation: ${caseData.occupation}
Address: ${caseData.address}
Phone: ${caseData.phone}
Date of Visit: ${caseData.dateOfVisit}

Chief Complaints:
${
  Array.isArray(caseData.chiefComplaints)
    ? caseData.chiefComplaints
        .map(
          (c, i) =>
            `${i + 1}. Complaint: ${c.complaint}, Duration: ${c.duration}, Description: ${c.description}`
        )
        .join("\n")
    : ""
}

History of Present Illness: ${caseData.historyPresentIllness}

Past History:
  Childhood: ${caseData.pastHistory?.childhoodDiseases}
  Surgeries/Injuries: ${caseData.pastHistory?.surgeriesInjuries}
  Major Illnesses: ${caseData.pastHistory?.majorIllnesses}

Family History: ${caseData.familyHistory}

Personal History:
  Appetite: ${caseData.personalHistory?.appetite}
  Cravings/Aversions: ${caseData.personalHistory?.cravingsAversions}
  Thirst: ${caseData.personalHistory?.thirst}
  Bowel: ${caseData.personalHistory?.bowel}
  Urine: ${caseData.personalHistory?.urine}
  Sleep: ${caseData.personalHistory?.sleep}
  Dreams: ${caseData.personalHistory?.dreams}
  Sweat: ${caseData.personalHistory?.sweat}
  Thermal: ${caseData.personalHistory?.thermal}
  Habits: ${caseData.personalHistory?.habits}
  Menstrual: ${caseData.personalHistory?.menstrual}

Mental Symptoms: ${caseData.mentalSymptoms}
General Remarks: ${caseData.generalRemarks}
Doctor Observations: ${caseData.observationsByDoctor}

Prescription:
${
  Array.isArray(caseData.prescription)
    ? caseData.prescription
        .map(
          (p, i) =>
            `${i + 1}. Date: ${p.date}, Remedy: ${p.remedyName}, Potency: ${p.potency}, Dose: ${p.dose}, Instructions: ${p.instructions}`
        )
        .join("\n")
    : ""
}
    `;

    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

    let result;
    if (caseData.imageBase64) {
      result = await model.generateContent([
        { text: prompt },
        { inlineData: { mimeType: "image/jpeg", data: caseData.imageBase64 } },
      ]);
    } else {
      result = await model.generateContent(prompt);
    }

    const summary = result.response.text();
    return summary;
  } catch (error) {
    console.error("Gemini AI error:", error);
    throw new Error("Failed to generate homeopathy summary");
  }
};

router.post("/", async (req, res) => {
  try {
    console.log("📥 Received summary request");
    const caseData = req.body;
    const summary = await generateHomeoSummary(caseData);
    res.json({ summary });
  } catch (error) {
    console.error("❌ Summary generation failed:", error);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

module.exports = router;
