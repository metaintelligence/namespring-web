import { Cheongan } from '../../domain/Cheongan.js';
import { Jiji } from '../../domain/Jiji.js';
import { Ohaeng } from '../../domain/Ohaeng.js';
import { PillarSet } from '../../domain/PillarSet.js';
import { HiddenStemDayAllocation } from '../../domain/HiddenStem.js';
import { HiddenStemScope, SaryeongMode } from '../../config/CalculationConfig.js';
import { type HapHwaEvaluation } from '../../domain/Relations.js';
export declare function scoreDeukryeong(dayMaster: Cheongan, pillars: PillarSet, details: string[], maxScore?: number, saryeongMode?: SaryeongMode, daysSinceJeol?: number | null, allocation?: HiddenStemDayAllocation, proportional?: boolean): number;
export declare function scoreDeukryeongProportional(dayMaster: Cheongan, monthBranch: Jiji, details: string[], maxScore: number, allocation: HiddenStemDayAllocation): number;
export declare function scoreDeukji(dayMaster: Cheongan, pillars: PillarSet, details: string[], scope?: HiddenStemScope, saryeongMode?: SaryeongMode, daysSinceJeol?: number | null, allocation?: HiddenStemDayAllocation, perBranch?: number): number;
export declare function scoreDeukse(dayMaster: Cheongan, pillars: PillarSet, details: string[], hapHwaEvaluations?: readonly HapHwaEvaluation[], bigyeop?: number, inseong?: number): number;
export declare function scoreOhaengSupport(dayMasterOhaeng: Ohaeng, targetOhaeng: Ohaeng, bigyeop?: number, inseong?: number): number;
export declare function ohaengLabel(ohaeng: Ohaeng): string;
//# sourceMappingURL=StrengthScoringHelpers.d.ts.map