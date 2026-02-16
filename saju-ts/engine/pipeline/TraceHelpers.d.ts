import { type AnalysisTraceStep } from '../../domain/types.js';
import { type RuleCitation } from '../../interpretation/RuleCitationRegistry.js';
export declare function formatCitation(citation: RuleCitation): string;
export declare function tracedStep(key: string, summary: string, evidence?: readonly string[], reasoning?: readonly string[]): AnalysisTraceStep;
export declare function detectAndTrace<T>(trace: AnalysisTraceStep[], detector: () => T, buildTraceStep: (detected: T) => AnalysisTraceStep): T;
//# sourceMappingURL=TraceHelpers.d.ts.map