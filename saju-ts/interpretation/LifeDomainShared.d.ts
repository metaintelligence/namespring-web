import { Ohaeng } from '../domain/Ohaeng.js';
import { PillarPosition } from '../domain/PillarPosition.js';
import { Sipseong } from '../domain/Sipseong.js';
import { ShinsalType } from '../domain/Shinsal.js';
import type { SajuAnalysis } from '../domain/SajuAnalysis.js';
import type { WeightedShinsalHit } from '../domain/Relations.js';
export interface DomainReading {
    readonly domain: string;
    readonly icon: string;
    readonly overview: string;
    readonly details: readonly string[];
    readonly advice: string;
}
export declare const WEALTH_STARS: Set<Sipseong>;
export declare const OFFICIAL_STARS: Set<Sipseong>;
export declare const EXPRESSION_STARS: Set<Sipseong>;
export declare function ohaengKr(oh: Ohaeng): string;
export declare function collectSipseongHits(analysis: SajuAnalysis, targetSet: ReadonlySet<Sipseong>): Array<{
    position: PillarPosition;
    sipseong: Sipseong;
}>;
export declare function deduplicateByType(hits: readonly WeightedShinsalHit[], types: ReadonlySet<ShinsalType>): WeightedShinsalHit[];
type ShinsalNoteTemplate = string | ((hit: WeightedShinsalHit) => string);
export declare function appendShinsalNotes(details: string[], hits: readonly WeightedShinsalHit[], noteByType: Readonly<Partial<Record<ShinsalType, ShinsalNoteTemplate>>>): void;
export {};
//# sourceMappingURL=LifeDomainShared.d.ts.map