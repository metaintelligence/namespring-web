import { Cheongan } from '../../domain/Cheongan.js';
import type { DaeunInfo } from '../../domain/DaeunInfo.js';
import type { DaeunAnalysis, LuckPillarAnalysis } from '../../domain/LuckInteraction.js';
import { Ohaeng } from '../../domain/Ohaeng.js';
import { Pillar } from '../../domain/Pillar.js';
import { PillarSet } from '../../domain/PillarSet.js';
import type { SaeunPillar } from '../../domain/SaeunInfo.js';
import { determineLuckQualityInternal } from './LuckInteractionAnalyzerHelpers.js';
declare function analyzeLuckPillar(luckPillar: Pillar, natalPillars: PillarSet, dayMaster: Cheongan, yongshinElement: Ohaeng | null, gisinElement: Ohaeng | null): LuckPillarAnalysis;
declare function analyzeAllDaeun(daeunInfo: DaeunInfo, natalPillars: PillarSet, dayMaster: Cheongan, yongshinElement: Ohaeng | null, gisinElement: Ohaeng | null): DaeunAnalysis[];
declare function analyzeSaeun(saeunPillars: readonly SaeunPillar[], natalPillars: PillarSet, currentDaeunPillar: Pillar | null, dayMaster: Cheongan, yongshinElement: Ohaeng | null, gisinElement: Ohaeng | null): LuckPillarAnalysis[];
export declare const LuckInteractionAnalyzer: {
    readonly analyzeLuckPillar: typeof analyzeLuckPillar;
    readonly analyzeAllDaeun: typeof analyzeAllDaeun;
    readonly analyzeSaeun: typeof analyzeSaeun;
    readonly determineLuckQuality: typeof determineLuckQualityInternal;
};
export {};
//# sourceMappingURL=LuckInteractionAnalyzer.d.ts.map