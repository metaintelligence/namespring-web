import { CompositeInteractionType, type ShinsalComposite } from '../../domain/Relations.js';
import { ShinsalHit, ShinsalType } from '../../domain/Shinsal.js';
interface CompositeRule {
    readonly type1: ShinsalType;
    readonly type2: ShinsalType;
    readonly patternName: string;
    readonly interactionType: CompositeInteractionType;
    readonly interpretation: string;
    readonly baseBonusScore: number;
}
export declare const COMPOSITE_RULES: readonly CompositeRule[];
export declare const ShinsalCompositeInterpreter: {
    readonly detect: (hits: readonly ShinsalHit[]) => ShinsalComposite[];
};
export {};
//# sourceMappingURL=ShinsalCompositeInterpreter.d.ts.map