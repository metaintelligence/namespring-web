import { DEFAULT_CONFIG, } from '../../config/CalculationConfig.js';
import { detectorsForScope } from './shinsalGradeDetectors.js';
function runDetectors(pillars, grade = null, config = DEFAULT_CONFIG) {
    const hits = [];
    const detectors = detectorsForScope(grade, config.gwiiinTable, config.shinsalReferenceBranch);
    for (const detector of detectors) {
        detector(pillars, hits);
    }
    return hits;
}
export const ShinsalDetector = {
    detect: runDetectors,
    detectAll(pillars, config = DEFAULT_CONFIG) {
        return runDetectors(pillars, null, config);
    },
};
//# sourceMappingURL=ShinsalDetector.js.map