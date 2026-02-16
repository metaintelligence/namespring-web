import { PillarPosition } from '../domain/PillarPosition.js';
import type { SajuAnalysis } from '../domain/SajuAnalysis.js';
import { type CalculationConfig } from '../config/CalculationConfig.js';
export declare function buildPillarInterpretations(a: SajuAnalysis, config: CalculationConfig): Record<PillarPosition, string>;
export declare function buildSinglePillarNarrative(a: SajuAnalysis, pos: PillarPosition, config: CalculationConfig): string;
//# sourceMappingURL=NarrativePillarSection.d.ts.map