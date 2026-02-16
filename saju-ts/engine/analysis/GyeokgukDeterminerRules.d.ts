import { Cheongan } from '../../domain/Cheongan.js';
import { GyeokgukResult, GyeokgukType } from '../../domain/Gyeokguk.js';
import { PillarSet } from '../../domain/PillarSet.js';
import { StrengthResult } from '../../domain/StrengthResult.js';
import { HapHwaEvaluation } from '../../domain/Relations.js';
import { CalculationConfig } from '../../config/CalculationConfig.js';
export declare function checkHwagyeok(hapHwaEvaluations: readonly HapHwaEvaluation[]): GyeokgukResult | null;
export declare function checkJongGang(dayMaster: Cheongan, pillars: PillarSet, strength: StrengthResult, distanceFromThreshold: number, hapHwaEvaluations: readonly HapHwaEvaluation[]): GyeokgukResult | null;
export declare function buildJongResult(type: GyeokgukType, strength: StrengthResult, reasoning: string, distanceFromThreshold: number): GyeokgukResult;
export declare function checkWeakJong(dayMaster: Cheongan, pillars: PillarSet, strength: StrengthResult, distanceFromThreshold: number, hapHwaEvaluations: readonly HapHwaEvaluation[]): GyeokgukResult | null;
export declare function checkJongGyeok(pillars: PillarSet, dayMaster: Cheongan, strength: StrengthResult, config: CalculationConfig, hapHwaEvaluations: readonly HapHwaEvaluation[]): GyeokgukResult | null;
export declare function checkIlhaengDeukgi(pillars: PillarSet, dayMaster: Cheongan, hapHwaEvaluations: readonly HapHwaEvaluation[]): GyeokgukResult | null;
//# sourceMappingURL=GyeokgukDeterminerRules.d.ts.map