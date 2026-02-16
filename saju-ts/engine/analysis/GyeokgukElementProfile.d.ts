import { Cheongan } from '../../domain/Cheongan.js';
import { Ohaeng } from '../../domain/Ohaeng.js';
import { PillarSet } from '../../domain/PillarSet.js';
import { PillarPosition } from '../../domain/PillarPosition.js';
import { HapHwaEvaluation } from '../../domain/Relations.js';
import { ohaengKorean } from './GyeokgukFormationShared.js';
export interface ElementProfile {
    readonly bigyeopCount: number;
    readonly siksangCount: number;
    readonly jaeCount: number;
    readonly gwanCount: number;
    readonly inseongCount: number;
}
export declare function effectiveOhaeng(position: PillarPosition, stem: Cheongan, hapHwaEvaluations: readonly HapHwaEvaluation[]): Ohaeng | null;
export declare function buildElementProfile(dayMaster: Cheongan, pillars: PillarSet, hapHwaEvaluations: readonly HapHwaEvaluation[]): ElementProfile;
export { ohaengKorean };
//# sourceMappingURL=GyeokgukElementProfile.d.ts.map