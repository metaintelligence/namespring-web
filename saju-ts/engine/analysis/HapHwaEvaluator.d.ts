import { Cheongan } from '../../domain/Cheongan.js';
import { Jiji } from '../../domain/Jiji.js';
import { Ohaeng } from '../../domain/Ohaeng.js';
import { PillarPosition } from '../../domain/PillarPosition.js';
import { PillarSet } from '../../domain/PillarSet.js';
import { type HapHwaEvaluation } from '../../domain/Relations.js';
import { HapHwaStrictness } from '../../config/CalculationConfig.js';
export declare const HapHwaEvaluator: {
    readonly evaluate: (pillars: PillarSet, strictness?: HapHwaStrictness, dayMasterNeverHapGeo?: boolean) => HapHwaEvaluation[];
    readonly evaluatePair: (stem1: Cheongan, pos1: PillarPosition, stem2: Cheongan, pos2: PillarPosition, monthBranch: Jiji, pillars: PillarSet, strictness?: HapHwaStrictness, dayMasterNeverHapGeo?: boolean) => HapHwaEvaluation | null;
    readonly isSeasonSupporting: (monthBranch: Jiji, targetElement: Ohaeng) => boolean;
    readonly areAdjacent: (pos1: PillarPosition, pos2: PillarPosition) => boolean;
};
export declare const evaluateHapHwa: (pillars: PillarSet, strictness?: HapHwaStrictness, dayMasterNeverHapGeo?: boolean) => HapHwaEvaluation[];
export declare const evaluateHapHwaPair: (stem1: Cheongan, pos1: PillarPosition, stem2: Cheongan, pos2: PillarPosition, monthBranch: Jiji, pillars: PillarSet, strictness?: HapHwaStrictness, dayMasterNeverHapGeo?: boolean) => HapHwaEvaluation | null;
export declare const isSeasonSupportingHapHwa: (monthBranch: Jiji, targetElement: Ohaeng) => boolean;
export declare const arePillarPositionsAdjacentForHapHwa: (pos1: PillarPosition, pos2: PillarPosition) => boolean;
//# sourceMappingURL=HapHwaEvaluator.d.ts.map