import { JijiRelationType } from '../domain/Relations.js';
export declare enum PositionPair {
    YEAR_MONTH = "YEAR_MONTH",
    YEAR_DAY = "YEAR_DAY",
    YEAR_HOUR = "YEAR_HOUR",
    MONTH_DAY = "MONTH_DAY",
    MONTH_HOUR = "MONTH_HOUR",
    DAY_HOUR = "DAY_HOUR"
}
export interface PositionPairInfo {
    readonly label: string;
    readonly baseDomains: readonly string[];
    readonly ageWindow: string;
}
export interface SignificanceEntry {
    readonly positionPairLabel: string;
    readonly affectedDomains: readonly string[];
    readonly meaning: string;
    readonly ageWindow: string;
    readonly isPositive: boolean;
}
export declare function tableKey(type: JijiRelationType, pair: PositionPair): string;
export declare function normalizeCatalogPairKey<Left extends string, Right extends string>(rawKey: string, sourceName: string, toLeft: (raw: string) => Left, toRight: (raw: string) => Right, keyBuilder: (left: Left, right: Right) => string): string;
export declare const POSITION_PAIR_INFO: Record<PositionPair, PositionPairInfo>;
export declare const SIGNIFICANCE_TABLE: ReadonlyMap<string, SignificanceEntry>;
//# sourceMappingURL=RelationSignificanceData.d.ts.map