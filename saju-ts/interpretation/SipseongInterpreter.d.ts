import { Sipseong } from '../domain/Sipseong.js';
import { PillarPosition } from '../domain/PillarPosition.js';
export interface SipseongInterpretation {
    readonly sipseong: Sipseong;
    readonly position: PillarPosition;
    readonly keyword: string;
    readonly shortDescription: string;
    readonly positiveTraits: readonly string[];
    readonly negativeTraits: readonly string[];
    readonly careerHint: string;
}
export declare function interpretSipseong(sipseong: Sipseong, position: PillarPosition): SipseongInterpretation;
export declare const SipseongInterpreter: {
    readonly interpret: typeof interpretSipseong;
};
//# sourceMappingURL=SipseongInterpreter.d.ts.map