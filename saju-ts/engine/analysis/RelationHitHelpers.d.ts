export interface PairLike<TMember> {
    readonly a: TMember;
    readonly b: TMember;
    readonly note: string;
}
export interface TripleLike<TMember> {
    readonly a: TMember;
    readonly b: TMember;
    readonly c: TMember;
    readonly note: string;
}
export type AddHit<TType, TMember> = (type: TType, members: Set<TMember>, note?: string) => void;
export declare function hasAllMembers<TMember>(present: ReadonlySet<TMember>, ...members: readonly TMember[]): boolean;
export declare function addPairHits<TType, TMember>(type: TType, defs: readonly PairLike<TMember>[], present: ReadonlySet<TMember>, addHit: AddHit<TType, TMember>): void;
export declare function addTripleHits<TType, TMember>(type: TType, defs: readonly TripleLike<TMember>[], present: ReadonlySet<TMember>, addHit: AddHit<TType, TMember>): void;
//# sourceMappingURL=RelationHitHelpers.d.ts.map