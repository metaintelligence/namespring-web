import { PillarPosition } from '../../domain/PillarPosition.js';
import { CompositeInteractionType, type ShinsalComposite, type WeightedShinsalHit } from '../../domain/Relations.js';
import { ShinsalHit, ShinsalType } from '../../domain/Shinsal.js';
export { CompositeInteractionType };
export type { ShinsalComposite, WeightedShinsalHit };
export declare const COMPOSITE_INTERACTION_KOREAN: Record<CompositeInteractionType, string>;
declare function positionMultiplierFor(position: PillarPosition): number;
export declare const ShinsalWeightCalculator: {
    readonly weight: (hit: ShinsalHit) => WeightedShinsalHit;
    readonly weightAll: (hits: readonly ShinsalHit[]) => WeightedShinsalHit[];
    readonly baseWeightFor: (type: ShinsalType) => number;
    readonly positionMultiplierFor: typeof positionMultiplierFor;
};
export declare const weightShinsalHit: (hit: ShinsalHit) => WeightedShinsalHit;
export declare const weightAllShinsalHits: (hits: readonly ShinsalHit[]) => WeightedShinsalHit[];
export declare const baseShinsalWeightFor: (type: ShinsalType) => number;
export declare const shinsalPositionMultiplierFor: typeof positionMultiplierFor;
//# sourceMappingURL=ShinsalWeightModel.d.ts.map