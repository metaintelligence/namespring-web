import { JeolBoundaryTable } from '../../calendar/solar/JeolBoundaryTable.js';
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
const FIRST_DAY_SINCE_BOUNDARY = 1;
function utcDateMs(year, month, day) {
    return Date.UTC(year, month - 1, day);
}
function elapsedDaysBetweenUtcDates(startDateMs, endDateMs) {
    return Math.floor((endDateMs - startDateMs) / MILLISECONDS_PER_DAY);
}
function toOneBasedDayCount(elapsedDays) {
    return Math.max(FIRST_DAY_SINCE_BOUNDARY, elapsedDays + FIRST_DAY_SINCE_BOUNDARY);
}
export function calculateDaysSinceJeol(standardYear, standardMonth, standardDay, standardHour, standardMinute) {
    const boundary = JeolBoundaryTable.previousBoundaryAtOrBefore(standardYear, standardMonth, standardDay, standardHour, standardMinute);
    if (boundary === undefined)
        return null;
    const birthMs = utcDateMs(standardYear, standardMonth, standardDay);
    const boundaryMs = utcDateMs(boundary.year, boundary.month, boundary.day);
    const elapsedDays = elapsedDaysBetweenUtcDates(boundaryMs, birthMs);
    return toOneBasedDayCount(elapsedDays);
}
//# sourceMappingURL=JeolBoundaryHelpers.js.map