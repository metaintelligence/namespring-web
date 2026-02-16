import { SibiUnseong } from '../domain/SibiUnseong.js';
import { PillarPosition } from '../domain/PillarPosition.js';
export interface UnseongInterpretation {
    readonly stage: SibiUnseong;
    readonly position: PillarPosition;
    readonly keyword: string;
    readonly description: string;
    readonly energy: string;
}
export declare function interpretSibiUnseong(stage: SibiUnseong, position: PillarPosition): UnseongInterpretation;
export declare const SibiUnseongInterpreter: {
    readonly interpret: typeof interpretSibiUnseong;
};
//# sourceMappingURL=SibiUnseongInterpreter.d.ts.map