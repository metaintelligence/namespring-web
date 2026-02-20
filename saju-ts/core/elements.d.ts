import type { Element } from './cycle.js';
/** 五行 相生(生成) 단일 매핑: from → to */
export declare const GENERATES_TO: Record<Element, Element>;
/** 五行 相剋(극) 단일 매핑: from → to */
export declare const CONTROLS_TO: Record<Element, Element>;
/** 相生 reverse: to → from */
export declare const GENERATED_BY: Record<Element, Element>;
/** 相剋 reverse: to → from */
export declare const CONTROLLED_BY: Record<Element, Element>;
export declare function nextGeneratedElement(from: Element): Element;
export declare function prevGeneratedElement(to: Element): Element;
export declare function nextControlledElement(from: Element): Element;
export declare function prevControlledElement(to: Element): Element;
export declare function generates(from: Element, to: Element): boolean;
export declare function controls(from: Element, to: Element): boolean;
export declare function isSameElement(a: Element, b: Element): boolean;
