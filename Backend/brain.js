// brain.js - main case processing logic
const facial = require('./facialAnalysis');
const skin = require('./skinAnalysis');
const labs = require('./labAnalysis');
const teluguConvert = require('./teluguToEnglish');
const intercurrent = require('./intercurrentLogic');

function processCase(input) {
  const mindConverted = teluguConvert(input.mindTelugu || '');
  const facialResult = facial(input.facialImage || '');
  const skinResult = skin(input.skinImage || '');
  const labResult = labs(input.labReport || {});
  const interResult = intercurrent(input.history || {});

  return {
    mindEnglish: mindConverted,
    facial: facialResult,
    skin: skinResult,
    labs: labResult,
    intercurrent: interResult,
    remedy: "Natrum Muriaticum", // placeholder
    comparison: ["Sepia", "Ignatia", "Phosphoric Acid"],
    miasm: "Sycotic",
    explanation: "Case shows grief, skin scalp scaling, craving salt, better in cold, irritable under pain, sycotic background..."
  };
}

module.exports = processCase;
