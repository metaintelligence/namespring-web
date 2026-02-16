import { type CalculationConfig } from '../../config/CalculationConfig.js';
import { type CheonganInfo } from '../../domain/Cheongan.js';
import { type TenGodAnalysis } from '../../domain/TenGodAnalysis.js';
export declare function buildTenGodTraceStep(dmInfo: CheonganInfo, tenGodAnalysis: TenGodAnalysis): import("../../index.js").AnalysisTraceStep;
export declare function buildHiddenStemTraceStep(tenGodAnalysis: TenGodAnalysis, hiddenStemVariant: CalculationConfig['hiddenStemVariant']): import("../../index.js").AnalysisTraceStep;
//# sourceMappingURL=TenGodAndHiddenStemTraceBuilders.d.ts.map