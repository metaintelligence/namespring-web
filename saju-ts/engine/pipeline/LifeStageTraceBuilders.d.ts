import { type CalculationConfig } from '../../config/CalculationConfig.js';
import { type CheonganInfo } from '../../domain/Cheongan.js';
import { type PillarPosition } from '../../domain/PillarPosition.js';
import { type PillarSet } from '../../domain/PillarSet.js';
import { type SibiUnseong } from '../../domain/SibiUnseong.js';
export declare function buildSibiUnseongTraceStep(sibiUnseong: ReadonlyMap<PillarPosition, SibiUnseong>, pillars: PillarSet, dmInfo: CheonganInfo, config: CalculationConfig): import("../../index.js").AnalysisTraceStep;
//# sourceMappingURL=LifeStageTraceBuilders.d.ts.map