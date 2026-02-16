import { Jiji } from '../../domain/Jiji.js';
import { Pillar } from '../../domain/Pillar.js';
import { PillarPosition } from '../../domain/PillarPosition.js';
import { PillarSet } from '../../domain/PillarSet.js';
export interface GongmangHit {
    readonly position: PillarPosition;
    readonly branch: Jiji;
    readonly isRestored: boolean;
    readonly restorationNote: string;
}
export interface GongmangResult {
    readonly voidBranches: readonly [Jiji, Jiji];
    readonly affectedPositions: readonly GongmangHit[];
}
export declare function sexagenaryIndex(pillar: Pillar): number;
export declare function voidBranchesOf(dayPillar: Pillar): readonly [Jiji, Jiji];
export declare function calculateGongmang(pillars: PillarSet): GongmangResult;
//# sourceMappingURL=GongmangCalculator.d.ts.map