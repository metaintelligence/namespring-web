import { type CompatibilityResult } from '../domain/Compatibility.js';
import { type SajuAnalysis } from '../domain/SajuAnalysis.js';
export declare function analyzeCompatibility(person1: SajuAnalysis, person2: SajuAnalysis): CompatibilityResult;
export declare const CompatibilityInterpreter: {
    readonly analyze: typeof analyzeCompatibility;
};
//# sourceMappingURL=CompatibilityInterpreter.d.ts.map