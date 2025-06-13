function analyzeCase(caseInput, toggles) {
    const result = {
    main_remedy: "Sulphur",
    analysis: "Psoric miasm with skin affinity",
    };
    
    if (toggles?.showExplanation) {
    result.pioneer_explanation =
    "Sulphur is well indicated in chronic skin conditions with burning and itching.";
    }
    
    return result;
    }
    
    module.exports = analyzeCase;