import { CHEONGAN_INFO } from '../../domain/Cheongan.js';
import { JIJI_INFO, JIJI_VALUES, jijiOrdinal } from '../../domain/Jiji.js';
import { PillarPosition } from '../../domain/PillarPosition.js';
import { SHINSAL_TYPE_INFO } from '../../domain/Shinsal.js';
import { ShinsalReferenceBranch } from '../../config/CalculationConfig.js';
import { samhapGroupOf } from './ShinsalCatalog.js';
export function indexedPillars(ps) {
    return [
        [PillarPosition.YEAR, ps.year],
        [PillarPosition.MONTH, ps.month],
        [PillarPosition.DAY, ps.day],
        [PillarPosition.HOUR, ps.hour],
    ];
}
export function hangul(c) {
    return CHEONGAN_INFO[c].hangul;
}
export function branchHangul(j) {
    return JIJI_INFO[j].hangul;
}
export function koreanName(type) {
    return SHINSAL_TYPE_INFO[type].koreanName;
}
export function detectByStemTable(pillars, hits, type, table) {
    const dayMaster = pillars.day.cheongan;
    const target = table.get(dayMaster);
    for (const [position, pillar] of indexedPillars(pillars)) {
        if (pillar.jiji === target) {
            hits.push({
                type,
                position,
                referenceBranch: target,
                note: `${hangul(dayMaster)}일간 → ${branchHangul(target)}`,
            });
        }
    }
}
export function detectSamhapShinsal(pillars, hits, type, targetExtractor, refBranch = ShinsalReferenceBranch.DAY_AND_YEAR) {
    const dayBranch = pillars.day.jiji;
    const yearBranch = pillars.year.jiji;
    const targets = new Set();
    if (refBranch === ShinsalReferenceBranch.DAY_ONLY || refBranch === ShinsalReferenceBranch.DAY_AND_YEAR) {
        const group = samhapGroupOf(dayBranch);
        if (group)
            targets.add(targetExtractor(group));
    }
    if (refBranch === ShinsalReferenceBranch.YEAR_ONLY || refBranch === ShinsalReferenceBranch.DAY_AND_YEAR) {
        const group = samhapGroupOf(yearBranch);
        if (group)
            targets.add(targetExtractor(group));
    }
    for (const target of targets) {
        for (const [position, pillar] of indexedPillars(pillars)) {
            if (pillar.jiji === target) {
                hits.push({
                    type,
                    position,
                    referenceBranch: target,
                    note: `${koreanName(type)} ${branchHangul(target)}`,
                });
            }
        }
    }
}
export function detectByMonthMixed(pillars, hits, type, table) {
    const monthBranch = pillars.month.jiji;
    const target = table.get(monthBranch);
    if (!target)
        return;
    for (const [position, pillar] of indexedPillars(pillars)) {
        const matched = target.kind === 'stem'
            ? pillar.cheongan === target.stem
            : pillar.jiji === target.branch;
        if (matched) {
            const matchLabel = target.kind === 'stem'
                ? hangul(target.stem)
                : branchHangul(target.branch);
            hits.push({
                type,
                position,
                referenceBranch: pillar.jiji,
                note: `월지 ${branchHangul(monthBranch)} → ${koreanName(type)} ${matchLabel}`,
            });
        }
    }
}
export function detectByYearBranchOffset(pillars, hits, type, offset) {
    const yearBranch = pillars.year.jiji;
    const targetOrdinal = (jijiOrdinal(yearBranch) + offset) % 12;
    const target = JIJI_VALUES[targetOrdinal];
    for (const [position, pillar] of indexedPillars(pillars)) {
        if (pillar.jiji === target) {
            hits.push({
                type,
                position,
                referenceBranch: target,
                note: `년지 ${branchHangul(yearBranch)} → ${koreanName(type)} ${branchHangul(target)}`,
            });
        }
    }
}
export function detectBidirectionalPairs(pillars, hits, type, pairs, notePrefix) {
    const dayBranch = pillars.day.jiji;
    const yearBranch = pillars.year.jiji;
    const refBranches = new Set([dayBranch, yearBranch]);
    const targets = new Set();
    for (const ref of refBranches) {
        for (const [a, b] of pairs) {
            if (ref === a)
                targets.add(b);
            else if (ref === b)
                targets.add(a);
        }
    }
    for (const target of targets) {
        for (const [position, pillar] of indexedPillars(pillars)) {
            if (pillar.jiji === target) {
                hits.push({
                    type,
                    position,
                    referenceBranch: target,
                    note: `${notePrefix} ${branchHangul(target)}`,
                });
            }
        }
    }
}
//# sourceMappingURL=shinsalHelpers.js.map