import { Jiji } from '../../domain/Jiji.js';
export interface PairDef {
    readonly a: Jiji;
    readonly b: Jiji;
    readonly note: string;
}
export interface TripleDef {
    readonly a: Jiji;
    readonly b: Jiji;
    readonly c: Jiji;
    readonly note: string;
}
export interface BanhapDef {
    readonly a: Jiji;
    readonly b: Jiji;
    readonly missing: Jiji;
    readonly note: string;
}
export declare const YUKHAP_PAIRS: readonly PairDef[];
export declare const SAMHAP_TRIPLES: readonly TripleDef[];
export declare const BANGHAP_TRIPLES: readonly TripleDef[];
export declare const CHUNG_PAIRS: readonly PairDef[];
export declare const HYEONG_TRIPLES: readonly TripleDef[];
export declare const HYEONG_PAIRS: readonly PairDef[];
export declare const BANHAP_DEFS: readonly BanhapDef[];
export declare const SELF_HYEONG_BRANCHES: ReadonlySet<Jiji>;
export declare const PA_PAIRS: readonly PairDef[];
export declare const HAE_PAIRS: readonly PairDef[];
export declare const WONJIN_PAIRS: readonly PairDef[];
//# sourceMappingURL=RelationCatalog.d.ts.map