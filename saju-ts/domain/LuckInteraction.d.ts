import { DaeunPillar } from './DaeunInfo.js';
import { Pillar } from './Pillar.js';
import { SibiUnseong } from './SibiUnseong.js';
import { Sipseong } from './Sipseong.js';
export declare enum LuckQuality {
    VERY_FAVORABLE = "VERY_FAVORABLE",
    FAVORABLE = "FAVORABLE",
    NEUTRAL = "NEUTRAL",
    UNFAVORABLE = "UNFAVORABLE",
    VERY_UNFAVORABLE = "VERY_UNFAVORABLE"
}
export declare const LUCK_QUALITY_INFO: Record<LuckQuality, {
    koreanName: string;
}>;
export interface LuckPillarAnalysis {
    readonly pillar: Pillar;
    readonly sipseong: Sipseong;
    readonly sibiUnseong: SibiUnseong;
    readonly isYongshinElement: boolean;
    readonly isGisinElement: boolean;
    readonly stemRelations: readonly string[];
    readonly branchRelations: readonly string[];
    readonly quality: LuckQuality;
    readonly summary: string;
}
export interface DaeunAnalysis {
    readonly daeunPillar: DaeunPillar;
    readonly analysis: LuckPillarAnalysis;
    readonly isTransitionPeriod: boolean;
}
//# sourceMappingURL=LuckInteraction.d.ts.map