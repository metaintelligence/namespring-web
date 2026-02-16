import { Cheongan } from '../../domain/Cheongan.js';
import { Jiji } from '../../domain/Jiji.js';
import { Ohaeng } from '../../domain/Ohaeng.js';
import { PillarPosition } from '../../domain/PillarPosition.js';
export interface HapTableEntry {
    readonly resultOhaeng: Ohaeng;
    readonly hapName: string;
}
export declare function stemPairKey(a: Cheongan, b: Cheongan): string;
export declare const HAP_TABLE: ReadonlyMap<string, HapTableEntry>;
export declare const SEASON_SUPPORT: ReadonlyMap<Ohaeng, ReadonlySet<Jiji>>;
export declare function pillarKoreanLabel(pos: PillarPosition): string;
export declare function ohaengKoreanName(o: Ohaeng): string;
//# sourceMappingURL=HapHwaCatalog.d.ts.map