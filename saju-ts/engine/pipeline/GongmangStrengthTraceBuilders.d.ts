import { type CalculationConfig } from '../../config/CalculationConfig.js';
import { type CheonganInfo } from '../../domain/Cheongan.js';
import { type PillarSet } from '../../domain/PillarSet.js';
import { type StrengthResult } from '../../domain/StrengthResult.js';
import { type GongmangResult } from '../analysis/GongmangCalculator.js';
export declare function buildGongmangTraceStep(gongmang: GongmangResult, pillars: PillarSet): import("../../index.js").AnalysisTraceStep;
export declare function buildStrengthTraceStep(strength: StrengthResult, dmInfo: CheonganInfo, strengthThreshold: CalculationConfig['strengthThreshold']): import("../../index.js").AnalysisTraceStep;
//# sourceMappingURL=GongmangStrengthTraceBuilders.d.ts.map