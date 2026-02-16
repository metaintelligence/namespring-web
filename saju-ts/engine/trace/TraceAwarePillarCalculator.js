import { CHEONGAN_INFO } from '../../domain/Cheongan.js';
import { JIJI_INFO } from '../../domain/Jiji.js';
import { GanjiCycle } from '../GanjiCycle.js';
import { JeolBoundaryTable } from '../../calendar/solar/JeolBoundaryTable.js';
import { TraceCategory } from './CalculationTrace.js';
function formatHangulHanja(pillar) {
    const ci = CHEONGAN_INFO[pillar.cheongan];
    const ji = JIJI_INFO[pillar.jiji];
    return `${ci.hangul}${ji.hangul}(${ci.hanja}${ji.hanja})`;
}
function signedMinutes(minutes) {
    return minutes >= 0 ? `+${minutes}분` : `${minutes}분`;
}
function computeYearPillar(year, month, day, hour, minute) {
    const ipchun = JeolBoundaryTable.ipchunOf(year);
    if (ipchun) {
        const momentKey = year * 100_000_000 + month * 1_000_000 +
            day * 10_000 + hour * 100 + minute;
        const ipchunKey = ipchun.year * 100_000_000 + ipchun.month * 1_000_000 +
            ipchun.day * 10_000 + ipchun.hour * 100 + ipchun.minute;
        const effectiveYear = momentKey <= ipchunKey ? year - 1 : year;
        return GanjiCycle.yearPillarApprox(effectiveYear);
    }
    return GanjiCycle.yearPillarByIpchunApprox(year, month, day);
}
function computeMonthPillar(yearStem, year, month, day, hour, minute) {
    const monthIndex = JeolBoundaryTable.sajuMonthIndexAt(year, month, day, hour, minute);
    if (monthIndex !== undefined) {
        return GanjiCycle.monthPillarBySajuMonthIndex(yearStem, monthIndex);
    }
    return GanjiCycle.monthPillarByJeolApprox(yearStem, year, month, day);
}
export const TraceAwarePillarCalculator = {
    traceYearPillar(year, month, day, hour, minute, tracer) {
        const pillar = computeYearPillar(year, month, day, hour, minute);
        const calendarYearPillar = GanjiCycle.yearPillarApprox(year);
        const alternatives = [];
        if (!calendarYearPillar.equals(pillar)) {
            alternatives.push({
                schoolName: '양력 1/1 기준',
                decision: `년주 = ${formatHangulHanja(calendarYearPillar)}`,
                reasoning: '양력 1월 1일을 년주 경계로 사용하는 유파',
            });
        }
        const usesExactTable = JeolBoundaryTable.isSupportedYear(year);
        const methodNote = usesExactTable ? '정밀 입춘 시각표' : '근사 입춘 날짜';
        const reasoning = `${methodNote} 기준으로 ${year}년 간지 ` +
            `${CHEONGAN_INFO[pillar.cheongan].hangul}${JIJI_INFO[pillar.jiji].hangul} 적용`;
        tracer.addEntry({
            step: 'year_pillar',
            category: TraceCategory.YEAR_PILLAR,
            decision: `년주 = ${formatHangulHanja(pillar)}`,
            reasoning,
            rule: '입춘(立春, 태양황경 315도) 기준 년주 결정',
            alternatives,
            configKey: 'yearBoundary',
        });
        return pillar;
    },
    traceMonthPillar(yearStem, year, month, day, hour, minute, tracer) {
        const pillar = computeMonthPillar(yearStem, year, month, day, hour, minute);
        const usesExactTable = JeolBoundaryTable.isSupportedYear(year);
        const tableNote = usesExactTable ? '정밀 절기표 적용' : '근사 절기 경계 적용';
        tracer.addEntry({
            step: 'month_pillar',
            category: TraceCategory.MONTH_PILLAR,
            decision: `월주 = ${formatHangulHanja(pillar)}`,
            reasoning: `절기 경계 기준 월주 결정 (오호둔월법), ${tableNote}`,
            rule: '절기 경계 + 오호둔월법(五虎遁月法)',
            confidence: usesExactTable ? 1.0 : 0.85,
        });
        return pillar;
    },
    traceDayPillar(year, month, day, hour, config, tracer) {
        const pillar = GanjiCycle.dayPillarByJdn(year, month, day);
        const alternatives = [];
        if (hour >= 23) {
            alternatives.push({
                schoolName: '야자시(夜子時) 학파',
                decision: `23시 이후 다음날 일주 적용 (현재 모드: ${config.dayCutMode})`,
                reasoning: '23시~01시 사이 일주 전환 시점은 유파마다 다름',
            });
        }
        tracer.addEntry({
            step: 'day_pillar',
            category: TraceCategory.DAY_PILLAR,
            decision: `일주 = ${formatHangulHanja(pillar)}`,
            reasoning: 'JDN 공식: ((JDN + 49) mod 60) -> 간지 인덱스',
            rule: '율리우스 일수(JDN) 기반 일주 계산',
            alternatives,
            configKey: hour >= 23 ? 'dayCutMode' : null,
        });
        return pillar;
    },
    traceHourPillar(dayStem, hour, tracer) {
        const pillar = GanjiCycle.hourPillar(dayStem, hour);
        tracer.addEntry({
            step: 'hour_pillar',
            category: TraceCategory.HOUR_PILLAR,
            decision: `시주 = ${formatHangulHanja(pillar)}`,
            reasoning: `시각 ${hour}시 -> ${JIJI_INFO[pillar.jiji].hangul}시 (오서둔시법)`,
            rule: '오서둔시법(五鼠遁時法)',
        });
        return pillar;
    },
    traceTimeAdjustment(originalHour, adjustedHour, dstMinutes, lmtMinutes, eotMinutes, tracer) {
        const parts = [];
        if (dstMinutes !== 0)
            parts.push(`DST 보정 ${signedMinutes(dstMinutes)}`);
        if (lmtMinutes !== 0)
            parts.push(`LMT 보정 ${signedMinutes(lmtMinutes)}`);
        if (eotMinutes !== 0)
            parts.push(`균시차 보정 ${signedMinutes(eotMinutes)}`);
        const reasoning = parts.length === 0 ? '보정 없음' : parts.join(', ');
        tracer.addEntry({
            step: 'time_adjustment',
            category: TraceCategory.TIME_ADJUSTMENT,
            decision: `시각 보정: ${originalHour}시 -> ${adjustedHour}시`,
            reasoning,
            rule: '진태양시(LMT) 보정',
            alternatives: [
                {
                    schoolName: '표준시 그대로 사용',
                    decision: `보정 없이 ${originalHour}시 사용`,
                    reasoning: '일부 유파는 진태양시 보정을 하지 않음',
                },
            ],
            configKey: 'includeEquationOfTime',
        });
    },
};
export const traceYearPillar = TraceAwarePillarCalculator.traceYearPillar;
export const traceMonthPillar = TraceAwarePillarCalculator.traceMonthPillar;
export const traceDayPillar = TraceAwarePillarCalculator.traceDayPillar;
export const traceHourPillar = TraceAwarePillarCalculator.traceHourPillar;
export const traceTimeAdjustment = TraceAwarePillarCalculator.traceTimeAdjustment;
//# sourceMappingURL=TraceAwarePillarCalculator.js.map