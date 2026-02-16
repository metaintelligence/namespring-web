export interface RelationSetPairDef<T> {
    readonly pair: ReadonlySet<T>;
    readonly note: string;
}
export interface RelationValuePairDef<T> {
    readonly a: T;
    readonly b: T;
}
export declare function setsEqual<T>(a: ReadonlySet<T>, b: ReadonlySet<T>): boolean;
export declare function findCheonganHap<T>(pair: ReadonlySet<T>, hapPairs: readonly RelationSetPairDef<T>[]): string | undefined;
export declare function findCheonganChung<T>(pair: ReadonlySet<T>, chungPairs: readonly RelationSetPairDef<T>[]): string | undefined;
export declare function matchesJijiPair<T>(pairDef: RelationValuePairDef<T>, a: T, b: T): boolean;
export declare function distinct<T>(arr: readonly T[]): T[];
//# sourceMappingURL=LuckInteractionRelationUtils.d.ts.map