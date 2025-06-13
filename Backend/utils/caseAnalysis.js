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
function analyzeCase(caseInput = {}, toggles = {}) {
    const input = {
      symptoms: "",
      thermal: "",
      cravings: "",
      mentals: "",
      ...caseInput,
    };
  
    const allSymptoms = `${input.symptoms} ${input.thermal} ${input.cravings} ${input.mentals}`.toLowerCase();
    console.log("🧠 allSymptoms received:", allSymptoms);
  
    const match = (...terms) => terms.some(term => allSymptoms.includes(term));
  
    const data = {
      main_remedy: "Unknown",
      analysis: "Insufficient data",
      dosage: "1M once daily",
      pioneer_explanation: "Please provide more detailed symptoms.",
    };
  
    // 🧠 HEADACHE - Bryonia Alba
    if (match("headache", "head pain") && match("motion", "movement")) {
      data.main_remedy = "Bryonia Alba";
      data.analysis = "Psora";
      data.pioneer_explanation = "Selected for bursting headache worse on motion.";
      return data;
    }
  
    // 🧠 SKIN - Sulphur
    if (match("itchy", "itching") && match("skin", "rash")) {
      data.main_remedy = "Sulphur";
      data.analysis = "Psora";
      data.pioneer_explanation = "Dry itchy skin aggravated by heat/washing.";
      return data;
    }
  
    // 🧠 NECK PAIN, HEADACHE, HAND PAIN - Lachesis
    if (match("neck", "cervical") && match("hand", "arm") && match("headache", "head pain")) {
      data.main_remedy = "Lachesis";
      data.analysis = "Syphilitic";
      data.pioneer_explanation =
        "Lachesis selected for chronic pain, neck stiffness with radiation and associated headache. Suits left-sided complaints, intense pressure, aggravation in morning.";
      return data;
    }
  
    // 🧠 NECK STIFFNESS + RADIATING PAIN - Rhus Tox
    if (
      match("neck pain", "cervical pain") &&
      match("stiff", "stiffness") &&
      (match("worse rest") || match("better motion", "better movement"))
    ) {
      data.main_remedy = "Rhus Toxicodendron";
      data.analysis = "Psora-Syphilitic";
      data.pioneer_explanation =
        "Rhus Tox indicated for neck stiffness, pain better with motion, worse at rest or cold.";
      return data;
    }
  
    // 🧠 CHRONIC LEFT-SIDED NECK/HEADACHE - Lachesis again
    if (match("left") && match("neck") && match("headache")) {
      data.main_remedy = "Lachesis";
      data.analysis = "Syphilitic";
      data.pioneer_explanation =
        "Lachesis chosen for left-sided complaints, chronic intensity, radiating nature.";
      return data;
    }
  
    // Fallback
    return data;
  }
  
  module.exports = { analyzeCase };
  