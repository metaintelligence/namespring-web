const KST_OFFSET_SEC = 9 * 3600;
const SECONDS_PER_DAY = 86400;
const KST_OFFSET_DAY_FRACTION = KST_OFFSET_SEC / SECONDS_PER_DAY;
const GREGORIAN_REFORM_JD_BOUNDARY = 2299161;
const DAYS_IN_MONTH = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const CUMULATIVE_DAYS_AT_MONTH_START = [
    0, // unused
    0, // Jan
    31, // Feb
    59, // Mar
    90, // Apr
    120, // May
    151, // Jun
    181, // Jul
    212, // Aug
    243, // Sep
    273, // Oct
    304, // Nov
    334, // Dec
];
export function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
export function dayOfYear(year, month, day) {
    const base = CUMULATIVE_DAYS_AT_MONTH_START[month] ?? 0;
    const leapAdjustment = month > 2 && isLeapYear(year) ? 1 : 0;
    return base + leapAdjustment + day;
}
export function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}
function daysInMonth(year, month) {
    const base = DAYS_IN_MONTH[month] ?? 31;
    return month === 2 && isLeapYear(year) ? base + 1 : base;
}
function incrementOneMinute(cal) {
    let { year, month, day, hour, minute } = cal;
    minute += 1;
    if (minute < 60)
        return { year, month, day, hour, minute };
    minute = 0;
    hour += 1;
    if (hour < 24)
        return { year, month, day, hour, minute };
    hour = 0;
    day += 1;
    if (day <= daysInMonth(year, month))
        return { year, month, day, hour, minute };
    day = 1;
    month += 1;
    if (month <= 12)
        return { year, month, day, hour, minute };
    return { year: year + 1, month: 1, day, hour, minute };
}
export function datetimeToJdUtc(year, month, day, hour, minute, second) {
    let y = year;
    let m = month;
    if (m <= 2) {
        y -= 1;
        m += 12;
    }
    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 4);
    const jd = Math.floor(365.25 * (y + 4716))
        + Math.floor(30.6001 * (m + 1))
        + day + B - 1524.5
        + (hour + minute / 60 + second / 3600) / 24;
    return jd;
}
export function kstToJdUtc(year, month, day, hour, minute, second) {
    const kstJd = datetimeToJdUtc(year, month, day, hour, minute, second);
    return kstJd - KST_OFFSET_DAY_FRACTION;
}
export function jdUtcToKst(jd) {
    const jdKst = jd + KST_OFFSET_DAY_FRACTION;
    return jdToCalendar(jdKst);
}
export function jdToCalendar(jd) {
    const z = Math.floor(jd + 0.5);
    const f = jd + 0.5 - z;
    let a;
    if (z < GREGORIAN_REFORM_JD_BOUNDARY) {
        a = z;
    }
    else {
        const alpha = Math.floor((z - 1867216.25) / 36524.25);
        a = z + 1 + alpha - Math.floor(alpha / 4);
    }
    const b = a + 1524;
    const c = Math.floor((b - 122.1) / 365.25);
    const d = Math.floor(365.25 * c);
    const e = Math.floor((b - d) / 30.6001);
    const day = b - d - Math.floor(30.6001 * e);
    const month = e < 14 ? e - 1 : e - 13;
    const year = month > 2 ? c - 4716 : c - 4715;
    const totalHours = f * 24;
    const hour = Math.floor(totalHours);
    const totalMinutes = (totalHours - hour) * 60;
    const minute = Math.floor(totalMinutes);
    const second = (totalMinutes - minute) * 60;
    return { year, month, day, hour, minute, second };
}
export function roundToNearestMinute(cal) {
    const rounded = {
        year: cal.year,
        month: cal.month,
        day: cal.day,
        hour: cal.hour,
        minute: cal.minute,
    };
    if (cal.second >= 30) {
        return incrementOneMinute(rounded);
    }
    return rounded;
}
//# sourceMappingURL=Vsop87dFallbackTimeUtils.js.map