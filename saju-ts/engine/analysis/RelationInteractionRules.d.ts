import { Jiji } from '../../domain/Jiji.js';
import { InteractionOutcome, JijiRelationHit, JijiRelationType } from '../../domain/Relations.js';
interface InteractionResult {
    readonly outcomeForTarget: InteractionOutcome;
    readonly reason: string;
}
export declare function evaluateInteraction(target: JijiRelationHit, other: JijiRelationHit, branchPositions: ReadonlyMap<Jiji, readonly number[]>, priorityOf: (type: JijiRelationType) => number): InteractionResult | null;
export {};
//# sourceMappingURL=RelationInteractionRules.d.ts.map