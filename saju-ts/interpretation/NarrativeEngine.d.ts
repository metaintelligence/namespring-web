import { PillarPosition } from '../domain/PillarPosition.js';
import type { SajuAnalysis } from '../domain/SajuAnalysis.js';
import { type CalculationConfig } from '../config/CalculationConfig.js';
export interface SajuNarrative {
    readonly readableSummary: string;
    readonly schoolLabel: string;
    readonly overview: string;
    readonly ohaengDistribution: string;
    readonly coreCharacteristics: string;
    readonly yongshinGuidance: string;
    readonly pillarInterpretations: Record<PillarPosition, string>;
    readonly lifeDomainAnalysis: string;
    readonly specialFeatures: string;
    readonly overallAssessment: string;
    readonly luckCycleOverview: string;
    readonly detailedLuckNarrative: string;
    readonly yearlyFortuneNarrative: string;
    readonly calculationReasoning: string;
    readonly traceOverview: string;
    readonly sourceBibliography: string;
}
export declare function narrativeToFullReport(n: SajuNarrative): string;
export declare function generate(analysis: SajuAnalysis, config?: CalculationConfig, targetYear?: number): SajuNarrative;
export declare const NarrativeEngine: {
    readonly generate: typeof generate;
    readonly narrativeToFullReport: typeof narrativeToFullReport;
};
//# sourceMappingURL=NarrativeEngine.d.ts.map