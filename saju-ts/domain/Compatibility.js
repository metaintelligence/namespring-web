export var CompatibilityGrade;
(function (CompatibilityGrade) {
    CompatibilityGrade["EXCELLENT"] = "EXCELLENT";
    CompatibilityGrade["GOOD"] = "GOOD";
    CompatibilityGrade["AVERAGE"] = "AVERAGE";
    CompatibilityGrade["BELOW_AVERAGE"] = "BELOW_AVERAGE";
    CompatibilityGrade["POOR"] = "POOR";
})(CompatibilityGrade || (CompatibilityGrade = {}));
export const COMPATIBILITY_GRADE_INFO = {
    [CompatibilityGrade.EXCELLENT]: { koreanName: '최상(最上)', stars: '★★★★★' },
    [CompatibilityGrade.GOOD]: { koreanName: '상(上)', stars: '★★★★☆' },
    [CompatibilityGrade.AVERAGE]: { koreanName: '중(中)', stars: '★★★☆☆' },
    [CompatibilityGrade.BELOW_AVERAGE]: { koreanName: '하(下)', stars: '★★☆☆☆' },
    [CompatibilityGrade.POOR]: { koreanName: '최하(最下)', stars: '★☆☆☆☆' },
};
//# sourceMappingURL=Compatibility.js.map