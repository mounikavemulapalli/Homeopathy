/** @format */
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateHomeoSummary = async (caseData) => {
  try {
    const safe = (val) => val || "Not provided";
    const safeList = (arr) =>
      Array.isArray(arr) && arr.length
        ? arr
            .map(
              (item, i) =>
                `${i + 1}. Complaint: ${safe(item.complaint)}, Duration: ${safe(
                  item.duration
                )}, Description: ${safe(item.description)}`
            )
            .join("\n")
        : "No chief complaints provided.";

    const safePrescription = (arr) =>
      Array.isArray(arr) && arr.length
        ? arr
            .map(
              (p, i) =>
                `${i + 1}. Date: ${safe(p.date)}, Remedy: ${safe(p.remedyName)}, Potency: ${safe(
                  p.potency
                )}, Dose: ${safe(p.dose)}, Instructions: ${safe(p.instructions)}`
            )
            .join("\n")
        : "No prescription history available.";

    const prompt = `
You are a homeopathy assistant.

Analyze the patient's case history and optionally provided face image. Based on the complaints and clinical history, suggest:
- A list of likely homeopathy remedies.
- Dosage instructions.
- Key advice for the patient.

Avoid special symbols. Respond in plain, understandable language.

---

**Patient Details**
- Name: ${safe(caseData.name)}
- Age: ${safe(caseData.age)}
- Gender: ${safe(caseData.gender)}
- Marital Status: ${safe(caseData.maritalStatus)}
- Occupation: ${safe(caseData.occupation)}
- Address: ${safe(caseData.address)}
- Phone: ${safe(caseData.phone)}
- Date of Visit: ${safe(caseData.dateOfVisit)}

**Chief Complaints:**
${safeList(caseData.chiefComplaints)}

**History of Present Illness:**
${safe(caseData.historyPresentIllness)}

**Past History**
- Childhood Diseases: ${safe(caseData.pastHistory?.childhoodDiseases)}
- Surgeries/Injuries: ${safe(caseData.pastHistory?.surgeriesInjuries)}
- Major Illnesses: ${safe(caseData.pastHistory?.majorIllnesses)}

**Family History:** ${safe(caseData.familyHistory)}

**Personal History**
- Appetite: ${safe(caseData.personalHistory?.appetite)}
- Cravings/Aversions: ${safe(caseData.personalHistory?.cravingsAversions)}
- Thirst: ${safe(caseData.personalHistory?.thirst)}
- Bowel: ${safe(caseData.personalHistory?.bowel)}
- Urine: ${safe(caseData.personalHistory?.urine)}
- Sleep: ${safe(caseData.personalHistory?.sleep)}
- Dreams: ${safe(caseData.personalHistory?.dreams)}
- Sweat: ${safe(caseData.personalHistory?.sweat)}
- Thermal: ${safe(caseData.personalHistory?.thermal)}
- Habits: ${safe(caseData.personalHistory?.habits)}
- Menstrual: ${safe(caseData.personalHistory?.menstrual)}

**Mental Symptoms:**
${safe(caseData.mentalSymptoms)}

**General Remarks:**
${safe(caseData.generalRemarks)}

**Doctor Observations:**
${safe(caseData.observationsByDoctor)}

**Prescriptions:**
${safePrescription(caseData.prescriptions)}

Give your summary below:
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
    console.log("📥 AI summary request received");
    const caseData = req.body;
    const summary = await generateHomeoSummary(caseData);
    res.json({ summary });
  } catch (error) {
    console.error("❌ AI Summary Error:", error);
    res.status(500).json({ error: "AI failed to generate summary" });
  }
});

module.exports = router;
