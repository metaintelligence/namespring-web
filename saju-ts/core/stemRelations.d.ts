import type { Element, StemIdx } from './cycle.js';
export type StemRelationType = 'HAP' | 'CHUNG';
export interface StemRelation {
    type: StemRelationType;
    members: [StemIdx, StemIdx];
    /** For HAP (天干合), traditional resulting element.
     * Some schools apply additional “化” conditions; we only report the classical mapping here.
     */
    resultElement?: Element;
}
export declare function stemHapPartner(i: StemIdx): StemIdx;
export declare function stemHapResultElement(a: StemIdx, b: StemIdx): Element | undefined;
export declare function isStemChung(a: StemIdx, b: StemIdx): boolean;
export declare function detectStemRelations(stems: StemIdx[]): StemRelation[];
