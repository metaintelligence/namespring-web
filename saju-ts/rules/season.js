import { mod } from '../core/mod.js';
export function seasonGroupOfMonthBranch(monthBranch) {
    const b = mod(monthBranch, 12);
    if (b === 2 || b === 3 || b === 4)
        return 'SPRING';
    if (b === 5 || b === 6 || b === 7)
        return 'SUMMER';
    if (b === 8 || b === 9 || b === 10)
        return 'AUTUMN';
    return 'WINTER';
}
export function monthClimateIndices(monthBranch) {
    const b = mod(monthBranch, 12);
    // angle = b*(π/6). Shift temperature so that max at 午(6), min at 子(0).
    const angle = (b * Math.PI) / 6;
    const temperatureIndex = Math.sin(angle - Math.PI / 2);
    // Shift dryness so that max at 酉(9), min at 卯(3).
    const drynessIndex = Math.sin(angle - Math.PI);
    return { temperatureIndex, drynessIndex };
}
