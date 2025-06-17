module.exports = function analyzeFacialEmotion(imageData) {
  return {
    emotion: "sad",
    rubricMatch: ["Mind - sadness", "Mind - weeping - involuntary", "Mind - grief - after shock"]
  };
};
