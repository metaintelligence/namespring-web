import { Cheongan, CHEONGAN_INFO } from '../../domain/Cheongan.js';
import { JIJI_INFO } from '../../domain/Jiji.js';
import { LuckQuality, LUCK_QUALITY_INFO } from '../../domain/LuckInteraction.js';
import { SIBI_UNSEONG_INFO } from '../../domain/SibiUnseong.js';
import { SIPSEONG_INFO } from '../../domain/Sipseong.js';
import { CHUNG_PAIRS, HAE_PAIRS, HYEONG_PAIRS, PA_PAIRS, YUKHAP_PAIRS, } from '../analysis/RelationCatalog.js';
import { distinct, matchesJijiPair } from './LuckInteractionRelationUtils.js';
const CHEONGAN_HAP_NOTES = new Map([
    [pairKey(Cheongan.GAP, Cheongan.GI), '갑기합'],
    [pairKey(Cheongan.EUL, Cheongan.GYEONG), '을경합'],
    [pairKey(Cheongan.BYEONG, Cheongan.SIN), '병신합'],
    [pairKey(Cheongan.JEONG, Cheongan.IM), '정임합'],
    [pairKey(Cheongan.MU, Cheongan.GYE), '무계합'],
]);
const CHEONGAN_CHUNG_NOTES = new Map([
    [pairKey(Cheongan.GAP, Cheongan.GYEONG), '갑경충'],
    [pairKey(Cheongan.EUL, Cheongan.SIN), '을신충'],
    [pairKey(Cheongan.BYEONG, Cheongan.IM), '병임충'],
    [pairKey(Cheongan.JEONG, Cheongan.GYE), '정계충'],
]);
const JIJI_RELATION_PAIR_TABLES = [
    YUKHAP_PAIRS,
    CHUNG_PAIRS,
    HYEONG_PAIRS,
    PA_PAIRS,
    HAE_PAIRS,
];
function pairKey(a, b) {
    return [a, b].sort().join('-');
}
function normalizeJijiNote(note) {
    return note.replace(/\([^)]*\)/g, '');
}
function matchingJijiPairNotes(luckBranch, otherBranch) {
    const notes = [];
    for (const table of JIJI_RELATION_PAIR_TABLES) {
        for (const pair of table) {
            if (matchesJijiPair(pair, luckBranch, otherBranch)) {
                notes.push(normalizeJijiNote(pair.note));
            }
        }
    }
    return notes;
}
function natalStems(pillars) {
    return [
        pillars.year.cheongan,
        pillars.month.cheongan,
        pillars.day.cheongan,
        pillars.hour.cheongan,
    ];
}
function natalBranches(pillars) {
    return [
        pillars.year.jiji,
        pillars.month.jiji,
        pillars.day.jiji,
        pillars.hour.jiji,
    ];
}
function appendUniqueNote(notes, seen, note) {
    if (!seen.has(note)) {
        seen.add(note);
        notes.push(note);
    }
}
function collectUniqueRelations(targets, noteResolver) {
    const relations = [];
    const seen = new Set();
    for (const target of targets) {
        for (const note of noteResolver(target)) {
            appendUniqueNote(relations, seen, note);
        }
    }
    return relations;
}
function cheonganPairNotes(a, b) {
    if (a === b)
        return [];
    const key = pairKey(a, b);
    const notes = [];
    const hapNote = CHEONGAN_HAP_NOTES.get(key);
    if (hapNote)
        notes.push(hapNote);
    const chungNote = CHEONGAN_CHUNG_NOTES.get(key);
    if (chungNote)
        notes.push(chungNote);
    return notes;
}
export function computeRelationFlags(stemRelations, branchRelations) {
    return {
        hasGoodRelations: stemRelations.some(relation => relation.includes('합')) ||
            branchRelations.some(relation => relation.includes('합')),
        hasBadRelations: stemRelations.some(relation => relation.includes('충')) ||
            branchRelations.some(relation => relation.includes('충') ||
                relation.includes('형') ||
                relation.includes('파') ||
                relation.includes('해')),
    };
}
export function findStemRelations(luckStem, natalPillars) {
    return collectUniqueRelations(natalStems(natalPillars), natalStem => cheonganPairNotes(luckStem, natalStem));
}
export function findBranchRelations(luckBranch, natalPillars) {
    return collectUniqueRelations(natalBranches(natalPillars), natalBranch => matchingJijiPairNotes(luckBranch, natalBranch));
}
export function mergeDaeunRelations(baseAnalysis, saeunPillar, daeunPillar, yongshinElement, gisinElement) {
    const extraStemRelations = cheonganPairNotes(saeunPillar.cheongan, daeunPillar.cheongan);
    const extraBranchRelations = matchingJijiPairNotes(saeunPillar.jiji, daeunPillar.jiji);
    if (extraStemRelations.length === 0 && extraBranchRelations.length === 0) {
        return baseAnalysis;
    }
    const mergedStemRelations = distinct([...baseAnalysis.stemRelations, ...extraStemRelations]);
    const mergedBranchRelations = distinct([...baseAnalysis.branchRelations, ...extraBranchRelations]);
    const { hasGoodRelations, hasBadRelations } = computeRelationFlags(mergedStemRelations, mergedBranchRelations);
    const saeunStemOhaeng = CHEONGAN_INFO[saeunPillar.cheongan].ohaeng;
    const saeunBranchOhaeng = JIJI_INFO[saeunPillar.jiji].ohaeng;
    const quality = determineLuckQualityInternal(saeunStemOhaeng, yongshinElement, gisinElement, hasGoodRelations, hasBadRelations, saeunBranchOhaeng);
    const summary = buildSummary(baseAnalysis.pillar, baseAnalysis.sipseong, baseAnalysis.sibiUnseong, baseAnalysis.isYongshinElement, baseAnalysis.isGisinElement, quality);
    return {
        ...baseAnalysis,
        stemRelations: mergedStemRelations,
        branchRelations: mergedBranchRelations,
        quality,
        summary,
    };
}
export function determineLuckQualityInternal(luckStemOhaeng, yongshinElement, gisinElement, hasGoodRelations, hasBadRelations, luckBranchOhaeng = null) {
    const hasElement = (element) => element != null && (luckStemOhaeng === element || luckBranchOhaeng === element);
    const isYongshin = hasElement(yongshinElement);
    const isGisin = hasElement(gisinElement);
    if (isYongshin && hasGoodRelations)
        return LuckQuality.VERY_FAVORABLE;
    if (isGisin && hasBadRelations)
        return LuckQuality.VERY_UNFAVORABLE;
    if (isYongshin)
        return LuckQuality.FAVORABLE;
    if (!isGisin && hasGoodRelations)
        return LuckQuality.FAVORABLE;
    if (isGisin)
        return LuckQuality.UNFAVORABLE;
    if (hasBadRelations)
        return LuckQuality.UNFAVORABLE;
    return LuckQuality.NEUTRAL;
}
export function buildSummary(pillar, sipseong, sibiUnseong, isYongshin, isGisin, quality) {
    const ci = CHEONGAN_INFO[pillar.cheongan];
    const ji = JIJI_INFO[pillar.jiji];
    const pillarLabel = `${ci.hangul}${ji.hangul}`;
    const qualityDesc = LUCK_QUALITY_INFO[quality].koreanName;
    const sipseongInfo = SIPSEONG_INFO[sipseong];
    const sibiInfo = SIBI_UNSEONG_INFO[sibiUnseong];
    let yongshinDesc = '';
    if (isYongshin) {
        yongshinDesc = ', 용신운';
    }
    else if (isGisin) {
        yongshinDesc = ', 기신운';
    }
    return `${pillarLabel}운: ${sipseongInfo.koreanName}(${sipseongInfo.hanja}) / ${sibiInfo.koreanName}(${sibiInfo.hanja})${yongshinDesc} -- ${qualityDesc}`;
}
//# sourceMappingURL=LuckInteractionAnalyzerHelpers.js.map