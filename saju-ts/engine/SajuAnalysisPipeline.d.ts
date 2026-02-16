import { type BirthInput } from '../domain/types.js';
import { type CalculationConfig } from '../config/CalculationConfig.js';
import { type SajuAnalysis } from '../domain/SajuAnalysis.js';
export interface SajuAnalysisOptions {
    readonly daeunCount: number;
    readonly saeunStartYear: number | null;
    readonly saeunYearCount: number;
}
export declare function analyzeSaju(input: BirthInput, config?: CalculationConfig, options?: Partial<SajuAnalysisOptions>): SajuAnalysis;
export declare class SajuAnalysisPipeline {
    private readonly config;
    constructor(config?: CalculationConfig);
    analyze(input: BirthInput, saeunStartYear?: number | null, saeunCount?: number, daeunCount?: number): SajuAnalysis;
}
//# sourceMappingURL=SajuAnalysisPipeline.d.ts.map