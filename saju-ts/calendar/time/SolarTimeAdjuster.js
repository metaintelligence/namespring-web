import { koreanDstOffsetMinutes } from './KoreanDstPeriod.js';
function addMinutes(dt, minutes) {
    const d = new Date(dt.year, dt.month - 1, dt.day, dt.hour, dt.minute);
    d.setMinutes(d.getMinutes() + minutes);
    return {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate(),
        hour: d.getHours(),
        minute: d.getMinutes(),
    };
}
const DEFAULT_STANDARD_MERIDIAN = 135.0;
const MINUTES_PER_LONGITUDE_DEGREE = 4.0;
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const TIMEZONE_STANDARD_MERIDIANS = {
    'Asia/Seoul': 135.0, // UTC+9
    'Asia/Tokyo': 135.0, // UTC+9
    'Asia/Shanghai': 120.0, // UTC+8
    'Asia/Hong_Kong': 120.0, // UTC+8
    'America/New_York': -75.0, // UTC-5
    'America/Los_Angeles': -120.0, // UTC-8
    'America/Argentina/Buenos_Aires': -45.0, // UTC-3
    'Europe/London': 0.0, // UTC+0
    'Europe/Berlin': 15.0, // UTC+1
    'Africa/Johannesburg': 30.0, // UTC+2
    'Atlantic/Reykjavik': 0.0, // UTC+0
    'Australia/Sydney': 150.0, // UTC+10
    'Pacific/Honolulu': -150.0, // UTC-10
    'UTC': 0.0,
};
export function standardMeridianDegrees(timezone) {
    return TIMEZONE_STANDARD_MERIDIANS[timezone] ?? DEFAULT_STANDARD_MERIDIAN;
}
export function lmtOffsetMinutes(longitudeDeg, standardMeridian) {
    return Math.round((longitudeDeg - standardMeridian) * MINUTES_PER_LONGITUDE_DEGREE);
}
export function equationOfTimeMinutes(dayOfYear) {
    const b = 2.0 * Math.PI * (dayOfYear - 81.0) / 364.0;
    const eot = 9.87 * Math.sin(2.0 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
    return Math.round(eot);
}
function getDayOfYear(year, month, day) {
    const d = new Date(year, month - 1, day);
    const start = new Date(year, 0, 0);
    const diff = d.getTime() - start.getTime();
    return Math.floor(diff / MS_PER_DAY);
}
function dstCorrectionMinutes(moment, applyDstHistory) {
    if (!applyDstHistory)
        return 0;
    return koreanDstOffsetMinutes(moment.year, moment.month, moment.day);
}
function longitudeCorrectionMinutes(context) {
    const standardMeridian = context.lmtBaselineOverride ?? standardMeridianDegrees(context.timezone);
    return lmtOffsetMinutes(context.longitudeDeg, standardMeridian);
}
function eotCorrectionMinutes(standard, includeEquationOfTime) {
    if (!includeEquationOfTime)
        return 0;
    return equationOfTimeMinutes(getDayOfYear(standard.year, standard.month, standard.day));
}
function solarTimeCorrections(standard, meridianContext, includeEquationOfTime) {
    return {
        longitudeCorrectionMinutes: longitudeCorrectionMinutes(meridianContext),
        equationOfTimeMinutes: eotCorrectionMinutes(standard, includeEquationOfTime),
    };
}
export function adjustSolarTime(params) {
    const { year, month, day, hour, minute, timezone, longitudeDeg, applyDstHistory, includeEquationOfTime, lmtBaselineOverride, } = params;
    const local = { year, month, day, hour, minute };
    const dstCorrection = dstCorrectionMinutes(local, applyDstHistory);
    const standard = addMinutes(local, -dstCorrection);
    const corrections = solarTimeCorrections(standard, { timezone, longitudeDeg, lmtBaselineOverride }, includeEquationOfTime);
    const adjusted = addMinutes(standard, corrections.longitudeCorrectionMinutes + corrections.equationOfTimeMinutes);
    return toSolarTimeAdjustment(standard, adjusted, {
        dstCorrectionMinutes: dstCorrection,
        ...corrections,
    });
}
function toSolarTimeAdjustment(standard, adjusted, corrections) {
    return {
        standardYear: standard.year,
        standardMonth: standard.month,
        standardDay: standard.day,
        standardHour: standard.hour,
        standardMinute: standard.minute,
        adjustedYear: adjusted.year,
        adjustedMonth: adjusted.month,
        adjustedDay: adjusted.day,
        adjustedHour: adjusted.hour,
        adjustedMinute: adjusted.minute,
        ...corrections,
    };
}
//# sourceMappingURL=SolarTimeAdjuster.js.map