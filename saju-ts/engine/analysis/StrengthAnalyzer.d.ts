import { PillarSet } from '../../domain/PillarSet.js';
import { type CalculationConfig } from '../../config/CalculationConfig.js';
import { type StrengthResult } from '../../domain/StrengthResult.js';
import { type HapHwaEvaluation } from '../../domain/Relations.js';
import { determineSipseong, isSupportingSipseong } from './StrengthSipseongSupport.js';
export declare function analyze(pillars: PillarSet, config?: CalculationConfig, daysSinceJeol?: number | null, hapHwaEvaluations?: readonly HapHwaEvaluation[]): StrengthResult;
export declare const StrengthAnalyzer: {
    readonly analyze: typeof analyze;
    readonly determineSipseong: typeof determineSipseong;
    readonly isSupportingSipseong: typeof isSupportingSipseong;
};
//# sourceMappingURL=StrengthAnalyzer.d.ts.map