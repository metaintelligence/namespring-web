export function computeTotalScore(dayMaster, dayBranch, ohaeng, sipseong, shinsal) {
    return Math.floor((dayMaster.score * 25 +
        dayBranch.score * 25 +
        ohaeng.score * 20 +
        sipseong.score * 20 +
        shinsal.score * 10) / 100);
}
//# sourceMappingURL=CompatibilityScoring.js.map