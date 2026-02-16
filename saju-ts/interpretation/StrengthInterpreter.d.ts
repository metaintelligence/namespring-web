import { StrengthLevel } from '../domain/StrengthResult.js';
export interface StrengthInterpretation {
    readonly level: StrengthLevel;
    readonly summary: string;
    readonly personality: readonly string[];
    readonly advice: string;
}
export declare function interpretStrength(level: StrengthLevel): StrengthInterpretation;
export declare const StrengthInterpreter: {
    readonly interpret: typeof interpretStrength;
};
//# sourceMappingURL=StrengthInterpreter.d.ts.map