export const ELEMENT_ORDER = ['WOOD', 'FIRE', 'EARTH', 'METAL', 'WATER'];
export function zeroElementVector() {
    return { WOOD: 0, FIRE: 0, EARTH: 0, METAL: 0, WATER: 0 };
}
export function cloneElementVector(v) {
    return { WOOD: v.WOOD, FIRE: v.FIRE, EARTH: v.EARTH, METAL: v.METAL, WATER: v.WATER };
}
export function addElement(v, e, amount) {
    v[e] += amount;
    return v;
}
export function addVectors(a, b) {
    return {
        WOOD: a.WOOD + b.WOOD,
        FIRE: a.FIRE + b.FIRE,
        EARTH: a.EARTH + b.EARTH,
        METAL: a.METAL + b.METAL,
        WATER: a.WATER + b.WATER,
    };
}
export function scaleVector(v, k) {
    return {
        WOOD: v.WOOD * k,
        FIRE: v.FIRE * k,
        EARTH: v.EARTH * k,
        METAL: v.METAL * k,
        WATER: v.WATER * k,
    };
}
