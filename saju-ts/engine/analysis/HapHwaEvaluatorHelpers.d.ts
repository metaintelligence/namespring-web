import { Cheongan } from '../../domain/Cheongan.js';
import { Jiji } from '../../domain/Jiji.js';
import { Ohaeng } from '../../domain/Ohaeng.js';
import { PillarPosition } from '../../domain/PillarPosition.js';
import { PillarSet } from '../../domain/PillarSet.js';
import { HapState } from '../../domain/Relations.js';
import { HapHwaStrictness } from '../../config/CalculationConfig.js';
export declare function positionOrdinal(pos: PillarPosition): number;
export declare function checkOpposition(resultOhaeng: Ohaeng, pillars: PillarSet, pos1: PillarPosition, pos2: PillarPosition): boolean;
export declare function computePresenceBonus(resultOhaeng: Ohaeng, pillars: PillarSet, pos1: PillarPosition, pos2: PillarPosition): number;
export declare function determineStateAndConfidence(adjacent: boolean, seasonSupport: boolean, presenceBonus: number, hasOpposition: boolean, strictness?: HapHwaStrictness): {
    state: HapState;
    confidence: number;
};
export declare function buildReasoning(hapName: string, stem1: Cheongan, pos1: PillarPosition, stem2: Cheongan, pos2: PillarPosition, resultOhaeng: Ohaeng, monthBranch: Jiji, state: HapState, adjacent: boolean, seasonSupport: boolean, presenceBonus: number, hasOpposition: boolean): string;
//# sourceMappingURL=HapHwaEvaluatorHelpers.d.ts.map