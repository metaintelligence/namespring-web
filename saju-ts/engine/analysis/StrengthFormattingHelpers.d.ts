import { SaryeongMode } from '../../config/CalculationConfig.js';
import { StrengthLevel } from '../../domain/StrengthResult.js';
export declare function classifyLevel(totalSupport: number, threshold: number, deukryeongMax: number, deukjiMax?: number, bigyeopMax?: number): StrengthLevel;
export declare function formatScore(score: number): string;
export declare function normalizedDaysSinceJeol(saryeongMode: SaryeongMode, daysSinceJeol: number | null, details: string[], section: string): number | null;
//# sourceMappingURL=StrengthFormattingHelpers.d.ts.map