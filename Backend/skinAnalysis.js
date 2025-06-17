module.exports = function analyzeSkinImage(imageData) {
  return {
    diagnosis: "Psoriasis",
    rubricMatch: ["Skin - eruptions - scaly", "Skin - itching - winter - agg", "Skin - eruptions - scalp"],
    remedyHint: ["Ars Alb", "Graphites", "Lycopodium"]
  };
};
