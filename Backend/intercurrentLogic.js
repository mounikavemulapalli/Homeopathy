module.exports = function checkIntercurrentNeeds(history) {
  const result = { needed: false, remedy: null, reason: "" };

  if (history.pastSuppression) {
    result.needed = true;
    result.remedy = "Sulphur";
    result.reason = "Suppressed skin conditions in past.";
  } else if (history.familyHistory?.includes("tuberculosis")) {
    result.needed = true;
    result.remedy = "Tuberculinum";
    result.reason = "Tubercular family history.";
  }

  return result;
};
