import { type ShinsalComposite, type WeightedShinsalHit } from '../../domain/Relations.js';
import { type ShinsalHit } from '../../domain/Shinsal.js';
export declare function buildShinsalTraceStep(shinsalHits: readonly ShinsalHit[], shinsalRefNote: string): import("../../index.js").AnalysisTraceStep;
export declare function buildWeightedShinsalTraceStep(weightedShinsalHits: readonly WeightedShinsalHit[]): import("../../index.js").AnalysisTraceStep;
export declare function buildShinsalCompositesTraceStep(shinsalComposites: readonly ShinsalComposite[]): import("../../index.js").AnalysisTraceStep;
//# sourceMappingURL=ShinsalTraceBuilders.d.ts.map