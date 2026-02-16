import { type CalculationConfig } from '../../config/CalculationConfig.js';
import type { PillarSet } from '../../domain/PillarSet.js';
import type { ShinsalComposite, WeightedShinsalHit } from '../../domain/Relations.js';
import type { ShinsalHit } from '../../domain/Shinsal.js';
export interface ShinsalAnalysisBundle {
    readonly shinsalHits: ShinsalHit[];
    readonly weightedShinsalHits: WeightedShinsalHit[];
    readonly shinsalComposites: ShinsalComposite[];
    readonly shinsalReferenceNote: string;
}
export declare function analyzeShinsalBundle(pillars: PillarSet, config: CalculationConfig): ShinsalAnalysisBundle;
//# sourceMappingURL=ShinsalAnalysisHelpers.d.ts.map