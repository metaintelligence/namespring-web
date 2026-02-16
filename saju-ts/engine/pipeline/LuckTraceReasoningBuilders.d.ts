import { type CalculationConfig } from '../../config/CalculationConfig.js';
import { type Cheongan } from '../../domain/Cheongan.js';
import { type DaeunInfo } from '../../domain/DaeunInfo.js';
import { Gender } from '../../domain/Gender.js';
import { type Ohaeng } from '../../domain/Ohaeng.js';
import { type PillarSet } from '../../domain/PillarSet.js';
import { type SaeunPillar } from '../../domain/SaeunInfo.js';
import { type YongshinResult } from '../../domain/YongshinResult.js';
export declare function buildYongshinReasoning(yongshin: YongshinResult, yongshinPriority: CalculationConfig['yongshinPriority']): string[];
export declare function buildDaeunReasoning(gender: Gender, yearCheongan: Cheongan, daeun: DaeunInfo, yongshin: YongshinResult, dayMasterOhaeng: Ohaeng): string[];
export declare function buildSaeunReasoning(saeun: readonly SaeunPillar[], pillars: PillarSet, yongshin: YongshinResult): string[];
//# sourceMappingURL=LuckTraceReasoningBuilders.d.ts.map