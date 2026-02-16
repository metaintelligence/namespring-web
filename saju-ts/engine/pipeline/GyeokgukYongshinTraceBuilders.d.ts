import { type CalculationConfig } from '../../config/CalculationConfig.js';
import { type GyeokgukResult } from '../../domain/Gyeokguk.js';
import { type YongshinResult } from '../../domain/YongshinResult.js';
export declare function buildGyeokgukTraceStep(gyeokguk: GyeokgukResult): import("../../index.js").AnalysisTraceStep;
export declare function buildYongshinTraceStep(yongshin: YongshinResult, yongshinPriority: CalculationConfig['yongshinPriority']): import("../../index.js").AnalysisTraceStep;
//# sourceMappingURL=GyeokgukYongshinTraceBuilders.d.ts.map