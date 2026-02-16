import { Cheongan } from '../domain/Cheongan.js';
import { Jiji } from '../domain/Jiji.js';
import { Ohaeng } from '../domain/Ohaeng.js';
import type { Pillar } from '../domain/Pillar.js';
import { PillarPosition } from '../domain/PillarPosition.js';
import type { PillarSet } from '../domain/PillarSet.js';
import { StrengthLevel } from '../domain/StrengthResult.js';
export declare function formatPillar(p: Pillar): string;
export declare function stemKorean(c: Cheongan): string;
export declare function branchKorean(j: Jiji): string;
export declare function ohaengKorean(oh: Ohaeng): string;
export declare function positionKorean(pos: PillarPosition): string;
export declare function pillarAt(ps: PillarSet, pos: PillarPosition): Pillar;
export declare function strengthLevelKorean(level: StrengthLevel): string;
export declare function ohaengRelationNote(source: Ohaeng, target: Ohaeng): string;
//# sourceMappingURL=NarrativeFormatting.d.ts.map