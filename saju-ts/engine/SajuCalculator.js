import { PillarSet } from '../domain/PillarSet.js';
import { DayCutMode } from '../calendar/time/DayCutMode.js';
import { adjustSolarTime, standardMeridianDegrees } from '../calendar/time/SolarTimeAdjuster.js';
import { JeolBoundaryTable } from '../calendar/solar/JeolBoundaryTable.js';
import { GanjiCycle } from './GanjiCycle.js';
import { DEFAULT_CONFIG } from '../config/CalculationConfig.js';
function nextUtcDate(year, month, day) {
    const date = new Date(Date.UTC(year, month - 1, day + 1));
    return {
        year: date.getUTCFullYear(),
        month: date.getUTCMonth() + 1,
        day: date.getUTCDate(),
    };
}
function shouldShiftDayByCut(mode, hour, minute) {
    switch (mode) {
        case DayCutMode.MIDNIGHT_00:
            return false;
        case DayCutMode.YAZA_23_TO_01_NEXTDAY:
            return hour === 23;
        case DayCutMode.YAZA_23_30_TO_01_30_NEXTDAY:
            return hour === 23 && minute >= 30;
        case DayCutMode.JOJA_SPLIT:
            return false;
    }
}
function buildMinuteMomentKey(moment) {
    return moment.year * 100_000_000
        + moment.month * 1_000_000
        + moment.day * 10_000
        + moment.hour * 100
        + moment.minute;
}
function applyDayCut(adjustedMoment, mode) {
    if (!shouldShiftDayByCut(mode, adjustedMoment.hour, adjustedMoment.minute)) {
        return {
            year: adjustedMoment.year,
            month: adjustedMoment.month,
            day: adjustedMoment.day,
        };
    }
    return nextUtcDate(adjustedMoment.year, adjustedMoment.month, adjustedMoment.day);
}
function adjustmentMoment(adjusted, kind) {
    if (kind === 'standard') {
        return {
            year: adjusted.standardYear,
            month: adjusted.standardMonth,
            day: adjusted.standardDay,
            hour: adjusted.standardHour,
            minute: adjusted.standardMinute,
        };
    }
    return {
        year: adjusted.adjustedYear,
        month: adjusted.adjustedMonth,
        day: adjusted.adjustedDay,
        hour: adjusted.adjustedHour,
        minute: adjusted.adjustedMinute,
    };
}
export function calculatePillars(input, config = DEFAULT_CONFIG) {
    const lmtOverride = config.lmtBaselineLongitude !== standardMeridianDegrees(input.timezone)
        ? config.lmtBaselineLongitude
        : undefined;
    const adjusted = adjustSolarTime({
        year: input.birthYear,
        month: input.birthMonth,
        day: input.birthDay,
        hour: input.birthHour,
        minute: input.birthMinute,
        timezone: input.timezone,
        longitudeDeg: input.longitude,
        applyDstHistory: config.applyDstHistory,
        includeEquationOfTime: config.includeEquationOfTime,
        lmtBaselineOverride: lmtOverride,
    });
    const standard = adjustmentMoment(adjusted, 'standard');
    const adjustedSolar = adjustmentMoment(adjusted, 'adjusted');
    const yearPillar = calculateYearPillar(standard);
    const monthPillar = calculateMonthPillar(yearPillar.cheongan, standard);
    const dayBase = applyDayCut(adjustedSolar, config.dayCutMode);
    const dayPillar = GanjiCycle.dayPillarByJdn(dayBase.year, dayBase.month, dayBase.day);
    const hourPillar = GanjiCycle.hourPillar(dayPillar.cheongan, adjustedSolar.hour);
    return {
        input,
        pillars: new PillarSet(yearPillar, monthPillar, dayPillar, hourPillar),
        ...adjusted,
    };
}
function calculateYearPillar(standardMoment) {
    const ipchun = JeolBoundaryTable.ipchunOf(standardMoment.year);
    if (ipchun) {
        const momentKey = buildMinuteMomentKey(standardMoment);
        const ipchunKey = buildMinuteMomentKey(ipchun);
        const effectiveYear = momentKey <= ipchunKey
            ? standardMoment.year - 1
            : standardMoment.year;
        return GanjiCycle.yearPillarApprox(effectiveYear);
    }
    return GanjiCycle.yearPillarByIpchunApprox(standardMoment.year, standardMoment.month, standardMoment.day);
}
function calculateMonthPillar(yearStem, standardMoment) {
    const monthIndex = JeolBoundaryTable.sajuMonthIndexAt(standardMoment.year, standardMoment.month, standardMoment.day, standardMoment.hour, standardMoment.minute);
    if (monthIndex !== undefined) {
        return GanjiCycle.monthPillarBySajuMonthIndex(yearStem, monthIndex);
    }
    return GanjiCycle.monthPillarByJeolApprox(yearStem, standardMoment.year, standardMoment.month, standardMoment.day);
}
//# sourceMappingURL=SajuCalculator.js.map