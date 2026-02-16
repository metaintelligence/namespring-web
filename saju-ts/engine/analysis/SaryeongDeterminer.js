import { CHEONGAN_INFO } from '../../domain/Cheongan.js';
import { JIJI_INFO } from '../../domain/Jiji.js';
import { HiddenStemDayAllocation, HiddenStemRole, HiddenStemTable, HiddenStemVariant, } from '../../domain/HiddenStem.js';
const ROLE_ORDINAL = {
    [HiddenStemRole.YEOGI]: 0,
    [HiddenStemRole.JUNGGI]: 1,
    [HiddenStemRole.JEONGGI]: 2,
};
function roleKorean(role) {
    switch (role) {
        case HiddenStemRole.YEOGI: return '여기';
        case HiddenStemRole.JUNGGI: return '중기';
        case HiddenStemRole.JEONGGI: return '정기';
    }
}
export const SaryeongDeterminer = {
    determine(branch, dayInMonth, variant = HiddenStemVariant.STANDARD, allocation = HiddenStemDayAllocation.YEONHAE_JAPYEONG) {
        if (dayInMonth < 1) {
            throw new Error(`dayInMonth must be >= 1, but was ${dayInMonth}`);
        }
        const entries = orderedEntries(branch, variant, allocation);
        const totalDays = entries.reduce((sum, e) => sum + e.days, 0);
        if (dayInMonth > totalDays) {
            return buildOverflowResult(branch, dayInMonth, entries, totalDays);
        }
        const allPhases = buildPhases(entries, dayInMonth);
        const activePhase = allPhases.find(p => p.isActive);
        const commandingEntry = entries.find(e => e.stem === activePhase.stem && e.role === activePhase.role);
        return {
            branch,
            dayInMonth,
            commandingStem: activePhase.stem,
            commandingRole: activePhase.role,
            commandingEntry,
            allStems: allPhases,
            reasoning: buildReasoning(branch, dayInMonth, activePhase, allPhases),
        };
    },
    phases(branch, variant = HiddenStemVariant.STANDARD, allocation = HiddenStemDayAllocation.YEONHAE_JAPYEONG) {
        return buildPhases(orderedEntries(branch, variant, allocation), null);
    },
    commandingStem(branch, dayInMonth, variant = HiddenStemVariant.STANDARD, allocation = HiddenStemDayAllocation.YEONHAE_JAPYEONG) {
        return SaryeongDeterminer.determine(branch, dayInMonth, variant, allocation).commandingStem;
    },
};
function orderedEntries(branch, variant, allocation) {
    const entries = [...HiddenStemTable.getHiddenStems(branch, variant, allocation)];
    entries.sort((a, b) => ROLE_ORDINAL[a.role] - ROLE_ORDINAL[b.role]);
    return entries;
}
function buildPhases(entries, activeDayInMonth) {
    let currentDay = 1;
    return entries.map(entry => {
        const startDay = currentDay;
        const endDay = currentDay + entry.days - 1;
        currentDay = endDay + 1;
        return {
            stem: entry.stem,
            role: entry.role,
            startDay,
            endDay,
            isActive: activeDayInMonth !== null &&
                activeDayInMonth >= startDay &&
                activeDayInMonth <= endDay,
        };
    });
}
function buildOverflowResult(branch, dayInMonth, entries, totalDays) {
    const lastEntry = entries[entries.length - 1];
    const allPhases = buildPhases(entries, null).map((phase, index) => ({
        ...phase,
        isActive: index === entries.length - 1,
    }));
    return {
        branch,
        dayInMonth,
        commandingStem: lastEntry.stem,
        commandingRole: lastEntry.role,
        commandingEntry: lastEntry,
        allStems: allPhases,
        reasoning: buildOverflowReasoning(branch, dayInMonth, lastEntry, totalDays),
    };
}
function buildReasoning(branch, dayInMonth, activePhase, allPhases) {
    const bi = JIJI_INFO[branch];
    const phaseDescription = allPhases.map(phase => {
        const si = CHEONGAN_INFO[phase.stem];
        return `${si.hangul}(${si.hanja}, ${roleKorean(phase.role)}, ${phase.startDay}-${phase.endDay}일)`;
    }).join(' -> ');
    const roleLabel = roleKorean(activePhase.role);
    const ai = CHEONGAN_INFO[activePhase.stem];
    return `${bi.hangul}(${bi.hanja})월 지장간 사령: ${phaseDescription}. ` +
        `절입 후 ${dayInMonth}일째는 ` +
        `${ai.hangul}(${ai.hanja})의 ` +
        `${roleLabel} 구간(${activePhase.startDay}-${activePhase.endDay}일)에 해당하므로, ` +
        `${ai.hangul}(${ai.hanja})이(가) 사령.`;
}
function buildOverflowReasoning(branch, dayInMonth, lastEntry, totalDays) {
    const bi = JIJI_INFO[branch];
    const si = CHEONGAN_INFO[lastEntry.stem];
    return `${bi.hangul}(${bi.hanja})월 절입 후 ${dayInMonth}일째는 ` +
        `배정된 총 ${totalDays}일을 초과하여, ` +
        `정기 ${si.hangul}(${si.hanja})이(가) 사령으로 판단.`;
}
//# sourceMappingURL=SaryeongDeterminer.js.map