export function wrap360(x) {
    return ((x % 360) + 360) % 360;
}
export function norm180(x) {
    const y = wrap360(x);
    return y > 180 ? y - 360 : y;
}
export function toDegrees(radians) {
    return radians * (180 / Math.PI);
}
export function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}
//# sourceMappingURL=Vsop87dFallbackMathUtils.js.map