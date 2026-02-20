import type { Element } from './cycle.js';
export interface ElementVector {
    WOOD: number;
    FIRE: number;
    EARTH: number;
    METAL: number;
    WATER: number;
}
export declare const ELEMENT_ORDER: Element[];
export declare function zeroElementVector(): ElementVector;
export declare function cloneElementVector(v: ElementVector): ElementVector;
export declare function addElement(v: ElementVector, e: Element, amount: number): ElementVector;
export declare function addVectors(a: ElementVector, b: ElementVector): ElementVector;
export declare function scaleVector(v: ElementVector, k: number): ElementVector;
