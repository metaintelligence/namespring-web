import { Sipseong } from '../domain/Sipseong.js';
import { StrengthLevel } from '../domain/StrengthResult.js';
export declare enum Favorability {
    FAVORABLE = "FAVORABLE",
    UNFAVORABLE = "UNFAVORABLE",
    NEUTRAL = "NEUTRAL"
}
export declare const FAVORABILITY_INFO: Record<Favorability, {
    koreanLabel: string;
}>;
export interface StrengthAwareReading {
    readonly sipseong: Sipseong;
    readonly isStrong: boolean;
    readonly favorability: Favorability;
    readonly commentary: string;
    readonly advice: string;
}
export declare const StrengthAwareSipseongInterpreter: {
    readonly interpret: (sipseong: Sipseong, strengthLevel: StrengthLevel) => StrengthAwareReading;
};
//# sourceMappingURL=StrengthAwareSipseongInterpreter.d.ts.map