import { Cheongan } from '../../domain/Cheongan.js';
import { Jiji } from '../../domain/Jiji.js';
import type { LuckPillarAnalysis } from '../../domain/LuckInteraction.js';
import { LuckQuality } from '../../domain/LuckInteraction.js';
import { Ohaeng } from '../../domain/Ohaeng.js';
import { Pillar } from '../../domain/Pillar.js';
import { PillarSet } from '../../domain/PillarSet.js';
import { SibiUnseong } from '../../domain/SibiUnseong.js';
import { Sipseong } from '../../domain/Sipseong.js';
export interface RelationFlags {
    readonly hasGoodRelations: boolean;
    readonly hasBadRelations: boolean;
}
export declare function computeRelationFlags(stemRelations: readonly string[], branchRelations: readonly string[]): RelationFlags;
export declare function findStemRelations(luckStem: Cheongan, natalPillars: PillarSet): string[];
export declare function findBranchRelations(luckBranch: Jiji, natalPillars: PillarSet): string[];
export declare function mergeDaeunRelations(baseAnalysis: LuckPillarAnalysis, saeunPillar: Pillar, daeunPillar: Pillar, yongshinElement: Ohaeng | null, gisinElement: Ohaeng | null): LuckPillarAnalysis;
export declare function determineLuckQualityInternal(luckStemOhaeng: Ohaeng, yongshinElement: Ohaeng | null, gisinElement: Ohaeng | null, hasGoodRelations: boolean, hasBadRelations: boolean, luckBranchOhaeng?: Ohaeng | null): LuckQuality;
export declare function buildSummary(pillar: Pillar, sipseong: Sipseong, sibiUnseong: SibiUnseong, isYongshin: boolean, isGisin: boolean, quality: LuckQuality): string;
//# sourceMappingURL=LuckInteractionAnalyzerHelpers.d.ts.map