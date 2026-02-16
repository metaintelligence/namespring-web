import { Cheongan } from '../../domain/Cheongan.js';
import { Jiji } from '../../domain/Jiji.js';
export type StemOrBranch = {
    kind: 'stem';
    stem: Cheongan;
} | {
    kind: 'branch';
    branch: Jiji;
};
export interface SamhapGroup {
    readonly members: ReadonlySet<Jiji>;
    readonly yeokma: Jiji;
    readonly dohwa: Jiji;
    readonly hwagae: Jiji;
    readonly jangseong: Jiji;
    readonly geopsal: Jiji;
    readonly jaesal: Jiji;
    readonly cheonsal: Jiji;
    readonly jisal: Jiji;
    readonly mangsin: Jiji;
    readonly banan: Jiji;
}
export declare function samhapGroupOf(branch: Jiji): SamhapGroup | undefined;
export interface GosinGwasukEntry {
    readonly gosin: Jiji;
    readonly gwasuk: Jiji;
}
export declare function banghapGroupOf(branch: Jiji): GosinGwasukEntry | undefined;
export declare function pillarKey(stem: Cheongan, branch: Jiji): string;
export declare const GOEGANG_PILLARS: ReadonlySet<string>;
export declare const GORANSAL_PILLARS: ReadonlySet<string>;
//# sourceMappingURL=ShinsalCatalogCore.d.ts.map