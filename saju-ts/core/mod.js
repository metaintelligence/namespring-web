export function mod(n, m) {
    return ((n % m) + m) % m;
}
export function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
}
