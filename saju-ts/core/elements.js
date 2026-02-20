/** 五行 相生(生成) 단일 매핑: from → to */
export const GENERATES_TO = {
    WOOD: 'FIRE',
    FIRE: 'EARTH',
    EARTH: 'METAL',
    METAL: 'WATER',
    WATER: 'WOOD',
};
/** 五行 相剋(극) 단일 매핑: from → to */
export const CONTROLS_TO = {
    WOOD: 'EARTH',
    EARTH: 'WATER',
    WATER: 'FIRE',
    FIRE: 'METAL',
    METAL: 'WOOD',
};
/** 相生 reverse: to → from */
export const GENERATED_BY = {
    WOOD: 'WATER',
    FIRE: 'WOOD',
    EARTH: 'FIRE',
    METAL: 'EARTH',
    WATER: 'METAL',
};
/** 相剋 reverse: to → from */
export const CONTROLLED_BY = {
    WOOD: 'METAL',
    FIRE: 'WATER',
    EARTH: 'WOOD',
    METAL: 'FIRE',
    WATER: 'EARTH',
};
export function nextGeneratedElement(from) {
    return GENERATES_TO[from];
}
export function prevGeneratedElement(to) {
    return GENERATED_BY[to];
}
export function nextControlledElement(from) {
    return CONTROLS_TO[from];
}
export function prevControlledElement(to) {
    return CONTROLLED_BY[to];
}
export function generates(from, to) {
    return GENERATES_TO[from] === to;
}
export function controls(from, to) {
    return CONTROLS_TO[from] === to;
}
export function isSameElement(a, b) {
    return a === b;
}
