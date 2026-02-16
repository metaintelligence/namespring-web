import { CHEONGAN_INFO } from '../../domain/Cheongan.js';
import { Eumyang } from '../../domain/Eumyang.js';
import { Gender } from '../../domain/Gender.js';
import { cheonganOrdinal } from '../../domain/Cheongan.js';
import { jijiOrdinal } from '../../domain/Jiji.js';
import { boundaryDistance } from './DaeunBoundaryHelpers.js';
import { buildDaeunInfo, toTotalDaeunMonths } from './DaeunBuildHelpers.js';
const MONTHS_PER_YEAR = 12;
const MIN_DAEUN_START_AGE = 1;
function deriveDaeunStartTiming(totalDaeunMonths) {
    const startAgeRaw = Math.floor(totalDaeunMonths / MONTHS_PER_YEAR);
    return {
        startAge: Math.max(MIN_DAEUN_START_AGE, startAgeRaw),
        startMonths: startAgeRaw >= MIN_DAEUN_START_AGE ? (totalDaeunMonths % MONTHS_PER_YEAR) : 0,
    };
}
function deriveBoundaryTiming(birthYear, birthMonth, birthDay, birthHour, birthMinute, isForward) {
    const boundary = boundaryDistance(birthYear, birthMonth, birthDay, birthHour, birthMinute, isForward);
    const totalDaeunMonths = toTotalDaeunMonths(boundary.totalMinutes);
    const { startAge, startMonths } = deriveDaeunStartTiming(totalDaeunMonths);
    return { boundary, startAge, startMonths };
}
function warningsFromBoundaryWarning(warning) {
    return warning === undefined ? [] : [warning];
}
export function isForward(yearStem, gender) {
    const genderPolarity = gender === Gender.MALE ? Eumyang.YANG : Eumyang.YIN;
    return CHEONGAN_INFO[yearStem].eumyang === genderPolarity;
}
export function sexagenaryIndex(pillar) {
    const s = cheonganOrdinal(pillar.cheongan);
    const b = jijiOrdinal(pillar.jiji);
    let i = s;
    while (i < 60) {
        if (i % 12 === b)
            return i;
        i += 10;
    }
    throw new Error(`Invalid ganji combination: ${pillar.cheongan}(${s}) + ${pillar.jiji}(${b})`);
}
export function calculate(pillars, gender, birthYear, birthMonth, birthDay, birthHour = 0, birthMinute = 0, daeunCount = 8) {
    const forward = isForward(pillars.year.cheongan, gender);
    const { boundary, startAge, startMonths } = deriveBoundaryTiming(birthYear, birthMonth, birthDay, birthHour, birthMinute, forward);
    const warnings = warningsFromBoundaryWarning(boundary.warning);
    return buildDaeunInfo(pillars.month, forward, startAge, daeunCount, sexagenaryIndex, boundary.mode, warnings, startMonths);
}
export function calculateWithStartAge(pillars, gender, firstDaeunStartAge, daeunCount = 8) {
    const forward = isForward(pillars.year.cheongan, gender);
    return buildDaeunInfo(pillars.month, forward, firstDaeunStartAge, daeunCount, sexagenaryIndex);
}
export function calculateStartAge(birthYear, birthMonth, birthDay, birthHour, birthMinute, isForward) {
    return deriveBoundaryTiming(birthYear, birthMonth, birthDay, birthHour, birthMinute, isForward).startAge;
}
export const DaeunCalculator = {
    isForward,
    sexagenaryIndex,
    calculate,
    calculateWithStartAge,
    calculateStartAge,
};
//# sourceMappingURL=DaeunCalculator.js.map