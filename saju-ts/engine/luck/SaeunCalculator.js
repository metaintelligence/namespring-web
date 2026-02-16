import { JeolBoundaryTable } from '../../calendar/solar/JeolBoundaryTable.js';
import { GanjiCycle } from '../GanjiCycle.js';
function toSaeunPillar(year) {
    return { year, pillar: GanjiCycle.yearPillarApprox(year) };
}
function toBoundaryMoment(boundary) {
    if (boundary == null)
        return undefined;
    const { year, month, day, hour, minute } = boundary;
    return { year, month, day, hour, minute };
}
export const SaeunCalculator = {
    calculate(startYear, count = 10) {
        return Array.from({ length: count }, (_, offset) => toSaeunPillar(startYear + offset));
    },
    forYear(year) {
        return toSaeunPillar(year);
    },
    sajuMonthIndexAt(year, month, day, hour = 0, minute = 0) {
        return JeolBoundaryTable.previousBoundaryAtOrBefore(year, month, day, hour, minute)?.sajuMonthIndex
            ?? GanjiCycle.sajuMonthIndexByJeolApprox(year, month, day);
    },
    monthlyLuck(year) {
        const yearPillar = GanjiCycle.yearPillarApprox(year);
        const boundaries = JeolBoundaryTable.boundariesForYear(year);
        return Array.from({ length: 12 }, (_, i) => {
            const sajuMonthIndex = i + 1;
            return {
                year,
                sajuMonthIndex,
                pillar: GanjiCycle.monthPillarBySajuMonthIndex(yearPillar.cheongan, sajuMonthIndex),
                boundaryMoment: toBoundaryMoment(boundaries?.get(sajuMonthIndex)),
            };
        });
    },
};
//# sourceMappingURL=SaeunCalculator.js.map