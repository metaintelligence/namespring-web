import { CHEONGAN_INFO } from '../../domain/Cheongan.js';
import { HiddenStemTable } from '../../domain/HiddenStem.js';
import { Sipseong } from '../../domain/Sipseong.js';
import { TenGodCalculator } from './TenGodCalculator.js';
export function hasSikSinStrong(p) {
    return p.siksangCount >= 2;
}
export function hasHiddenSangGwan(p) {
    return !p.hasSangGwan && p.hiddenSipseongs.has(Sipseong.SANG_GWAN);
}
export function hasHiddenPyeonIn(p) {
    return !p.hasPyeonIn && p.hiddenSipseongs.has(Sipseong.PYEON_IN);
}
export function hasHiddenGyeobJae(p) {
    return !p.hasGyeobJae && p.hiddenSipseongs.has(Sipseong.GYEOB_JAE);
}
export function buildProfile(pillars, strength) {
    const dayMaster = pillars.day.cheongan;
    const nonDayStems = [
        pillars.year.cheongan,
        pillars.month.cheongan,
        pillars.hour.cheongan,
    ];
    const sipseongList = nonDayStems.map(s => TenGodCalculator.calculate(dayMaster, s));
    const allBranches = [pillars.year.jiji, pillars.month.jiji, pillars.day.jiji, pillars.hour.jiji];
    const hiddenPrincipalSipseongs = new Set();
    for (const branch of allBranches) {
        const principalStem = HiddenStemTable.getPrincipalStem(branch);
        if (principalStem !== dayMaster) {
            hiddenPrincipalSipseongs.add(TenGodCalculator.calculate(dayMaster, principalStem));
        }
    }
    const sipseongSet = new Set(sipseongList);
    const sipseongCountMap = new Map();
    for (const sipseong of sipseongList) {
        sipseongCountMap.set(sipseong, (sipseongCountMap.get(sipseong) ?? 0) + 1);
    }
    const has = (sipseong) => sipseongSet.has(sipseong);
    const countOf = (...targets) => targets.reduce((sum, target) => sum + (sipseongCountMap.get(target) ?? 0), 0);
    const hasBigyeop = has(Sipseong.BI_GYEON) || has(Sipseong.GYEOB_JAE);
    const hasSiksang = has(Sipseong.SIK_SIN) || has(Sipseong.SANG_GWAN);
    const hasJae = has(Sipseong.PYEON_JAE) || has(Sipseong.JEONG_JAE);
    const hasGwan = has(Sipseong.PYEON_GWAN) || has(Sipseong.JEONG_GWAN);
    const hasInseong = has(Sipseong.PYEON_IN) || has(Sipseong.JEONG_IN);
    return {
        dayMasterElement: CHEONGAN_INFO[dayMaster].ohaeng,
        hasBigyeop,
        hasSiksang,
        hasJae,
        hasGwan,
        hasInseong,
        hasSangGwan: has(Sipseong.SANG_GWAN),
        hasSikSin: has(Sipseong.SIK_SIN),
        hasPyeonIn: has(Sipseong.PYEON_IN),
        hasPyeonGwan: has(Sipseong.PYEON_GWAN),
        hasJeongGwan: has(Sipseong.JEONG_GWAN),
        hasPyeonJae: has(Sipseong.PYEON_JAE),
        hasJeongJae: has(Sipseong.JEONG_JAE),
        hasGyeobJae: has(Sipseong.GYEOB_JAE),
        bigyeopCount: countOf(Sipseong.BI_GYEON, Sipseong.GYEOB_JAE),
        siksangCount: countOf(Sipseong.SIK_SIN, Sipseong.SANG_GWAN),
        jaeCount: countOf(Sipseong.PYEON_JAE, Sipseong.JEONG_JAE),
        gwanCount: countOf(Sipseong.PYEON_GWAN, Sipseong.JEONG_GWAN),
        inseongCount: countOf(Sipseong.PYEON_IN, Sipseong.JEONG_IN),
        isStrong: strength.isStrong,
        hiddenSipseongs: hiddenPrincipalSipseongs,
    };
}
//# sourceMappingURL=GyeokgukFormationProfile.js.map