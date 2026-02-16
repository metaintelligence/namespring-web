export function createLunarDate(year, month, day, isLeapMonth = false) {
    if (month < 1 || month > 12) {
        throw new RangeError(`month must be 1-12, was ${month}`);
    }
    if (day < 1 || day > 30) {
        throw new RangeError(`day must be 1-30, was ${day}`);
    }
    return { year, month, day, isLeapMonth };
}
export function formatLunarDate(ld) {
    const leapMarker = ld.isLeapMonth ? '\uc724' : ''; // 윤
    return `\uc74c\ub825 ${ld.year}\ub144 ${leapMarker}${ld.month}\uc6d4 ${ld.day}\uc77c`;
}
export function lunarDateEquals(a, b) {
    return a.year === b.year
        && a.month === b.month
        && a.day === b.day
        && a.isLeapMonth === b.isLeapMonth;
}
//# sourceMappingURL=LunarDate.js.map