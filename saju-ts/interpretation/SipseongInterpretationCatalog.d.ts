import { Sipseong } from '../domain/Sipseong.js';
import { PillarPosition } from '../domain/PillarPosition.js';
export type SipseongInterpretationAdd = (sipseong: Sipseong, position: PillarPosition, keyword: string, shortDescription: string, positiveTraits: readonly string[], negativeTraits: readonly string[], careerHint: string) => void;
export declare function registerSipseongInterpretationCatalog(add: SipseongInterpretationAdd): void;
//# sourceMappingURL=SipseongInterpretationCatalog.d.ts.map