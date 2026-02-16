import { ShinsalReferenceBranch } from '../../config/CalculationConfig.js';
import { ShinsalCompositeInterpreter } from '../analysis/ShinsalCompositeInterpreter.js';
import { ShinsalWeightCalculator } from '../analysis/ShinsalWeightModel.js';
import { ShinsalDetector } from '../analysis/ShinsalDetector.js';
export function analyzeShinsalBundle(pillars, config) {
    const shinsalHits = ShinsalDetector.detectAll(pillars, config);
    const shinsalReferenceNote = config.shinsalReferenceBranch === ShinsalReferenceBranch.DAY_ONLY
        ? '일지(日支)만'
        : config.shinsalReferenceBranch === ShinsalReferenceBranch.YEAR_ONLY
            ? '연지(年支)만'
            : '일지+연지 모두';
    const weightedShinsalHits = ShinsalWeightCalculator.weightAll(shinsalHits);
    const shinsalComposites = ShinsalCompositeInterpreter.detect(shinsalHits);
    return {
        shinsalHits,
        weightedShinsalHits,
        shinsalComposites,
        shinsalReferenceNote,
    };
}
//# sourceMappingURL=ShinsalAnalysisHelpers.js.map