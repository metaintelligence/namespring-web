import { JEOL_BOUNDARY_DATA } from './JeolBoundaryData.js';
import { findFirstBoundaryByKey, findLastBoundaryByKey, momentKey, } from './JeolBoundarySearch.js';
let boundaries = null;
let boundariesByYear = null;
function ensureLoaded() {
    if (boundaries != null)
        return boundaries;
    boundaries = JEOL_BOUNDARY_DATA.map(row => ({
        year: row[0],
        month: row[1],
        day: row[2],
        hour: row[3],
        minute: row[4],
        solarLongitude: row[5],
        sajuMonthIndex: row[6],
        branch: row[7],
    }));
    return boundaries;
}
function ensureByYear() {
    if (boundariesByYear != null)
        return boundariesByYear;
    boundariesByYear = new Map();
    for (const boundary of ensureLoaded()) {
        const current = boundariesByYear.get(boundary.year);
        if (current) {
            current.push(boundary);
            continue;
        }
        boundariesByYear.set(boundary.year, [boundary]);
    }
    return boundariesByYear;
}
export function isSupportedYear(year) {
    return ensureByYear().has(year);
}
export function ipchunOf(year) {
    return ensureByYear().get(year)?.find(boundary => boundary.sajuMonthIndex === 1);
}
export function sajuMonthIndexAt(year, month, day, hour, minute) {
    const key = momentKey(year, month, day, hour, minute);
    return findLastBoundaryByKey(ensureLoaded(), key, false)?.sajuMonthIndex;
}
export function nextBoundaryAfter(year, month, day, hour, minute) {
    const key = momentKey(year, month, day, hour, minute);
    return findFirstBoundaryByKey(ensureLoaded(), key, false);
}
export function previousBoundaryAtOrBefore(year, month, day, hour, minute) {
    const key = momentKey(year, month, day, hour, minute);
    return findLastBoundaryByKey(ensureLoaded(), key, true);
}
export function boundariesForYear(year) {
    const entries = ensureByYear().get(year);
    if (!entries)
        return undefined;
    return new Map(entries.map(boundary => [boundary.sajuMonthIndex, boundary]));
}
export const JeolBoundaryTable = {
    isSupportedYear,
    ipchunOf,
    sajuMonthIndexAt,
    nextBoundaryAfter,
    previousBoundaryAtOrBefore,
    boundariesForYear,
};
//# sourceMappingURL=JeolBoundaryTable.js.map