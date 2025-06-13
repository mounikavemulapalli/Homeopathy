const analyzeCase = (req, res) => {
    const caseData = req.body;
    // Process the caseData here
    res.json({ remedy: "Sulphur", analysis: "Strong psoric miasm with skin affinity." });
  };
  
  module.exports = { analyzeCase };
  