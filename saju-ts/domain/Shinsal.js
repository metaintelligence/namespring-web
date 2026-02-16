export var ShinsalGrade;
(function (ShinsalGrade) {
    ShinsalGrade["A"] = "A";
    ShinsalGrade["B"] = "B";
    ShinsalGrade["C"] = "C";
})(ShinsalGrade || (ShinsalGrade = {}));
export var ShinsalType;
(function (ShinsalType) {
    ShinsalType["CHEONUL_GWIIN"] = "CHEONUL_GWIIN";
    ShinsalType["YEOKMA"] = "YEOKMA";
    ShinsalType["DOHWA"] = "DOHWA";
    ShinsalType["HWAGAE"] = "HWAGAE";
    ShinsalType["TAEGUK_GWIIN"] = "TAEGUK_GWIIN";
    ShinsalType["JANGSEONG"] = "JANGSEONG";
    ShinsalType["WONJIN"] = "WONJIN";
    ShinsalType["CHEONDEOK_GWIIN"] = "CHEONDEOK_GWIIN";
    ShinsalType["WOLDEOK_GWIIN"] = "WOLDEOK_GWIIN";
    ShinsalType["MUNCHANG"] = "MUNCHANG";
    ShinsalType["YANGIN"] = "YANGIN";
    ShinsalType["GOEGANG"] = "GOEGANG";
    ShinsalType["HAKDANG"] = "HAKDANG";
    ShinsalType["GEUMYEO"] = "GEUMYEO";
    ShinsalType["GEOPSAL"] = "GEOPSAL";
    ShinsalType["GOSIN"] = "GOSIN";
    ShinsalType["GWASUK"] = "GWASUK";
    ShinsalType["CHEONDEOK_HAP"] = "CHEONDEOK_HAP";
    ShinsalType["WOLDEOK_HAP"] = "WOLDEOK_HAP";
    ShinsalType["CHEONGWAN_GWIIN"] = "CHEONGWAN_GWIIN";
    ShinsalType["BOKSEONG_GWIIN"] = "BOKSEONG_GWIIN";
    ShinsalType["MUNGOK_GWIIN"] = "MUNGOK_GWIIN";
    ShinsalType["GUGIN_GWIIN"] = "GUGIN_GWIIN";
    ShinsalType["BAEKHO"] = "BAEKHO";
    ShinsalType["HONGYEOM"] = "HONGYEOM";
    ShinsalType["AMNOK"] = "AMNOK";
    ShinsalType["CHEONUI"] = "CHEONUI";
    ShinsalType["CHEOLLA_JIMANG"] = "CHEOLLA_JIMANG";
    ShinsalType["JAESAL"] = "JAESAL";
    ShinsalType["GYEOKGAK"] = "GYEOKGAK";
    ShinsalType["CHEONBOK_GWIIN"] = "CHEONBOK_GWIIN";
    ShinsalType["YUKHAESAL"] = "YUKHAESAL";
    ShinsalType["HYEOLINSAL"] = "HYEOLINSAL";
    ShinsalType["GWANBUSAL"] = "GWANBUSAL";
    ShinsalType["SANGMUNSAL"] = "SANGMUNSAL";
    ShinsalType["CHEONSAL"] = "CHEONSAL";
    ShinsalType["JISAL"] = "JISAL";
    ShinsalType["MANGSINSAL"] = "MANGSINSAL";
    ShinsalType["BANANSAL"] = "BANANSAL";
    ShinsalType["CHEONJU_GWIIN"] = "CHEONJU_GWIIN";
    ShinsalType["GORANSAL"] = "GORANSAL";
})(ShinsalType || (ShinsalType = {}));
export const SHINSAL_TYPE_INFO = {
    [ShinsalType.CHEONUL_GWIIN]: { koreanName: '천을귀인', hanja: '天乙貴人', grade: ShinsalGrade.A, description: '귀인의 도움' },
    [ShinsalType.YEOKMA]: { koreanName: '역마', hanja: '驛馬', grade: ShinsalGrade.A, description: '이동/변화' },
    [ShinsalType.DOHWA]: { koreanName: '도화', hanja: '桃花', grade: ShinsalGrade.A, description: '매력/인연' },
    [ShinsalType.HWAGAE]: { koreanName: '화개', hanja: '華蓋', grade: ShinsalGrade.A, description: '학문/예술' },
    [ShinsalType.TAEGUK_GWIIN]: { koreanName: '태극귀인', hanja: '太極貴人', grade: ShinsalGrade.A, description: '귀인/복덕' },
    [ShinsalType.JANGSEONG]: { koreanName: '장성', hanja: '將星', grade: ShinsalGrade.A, description: '리더십/통솔' },
    [ShinsalType.WONJIN]: { koreanName: '원진살', hanja: '怨嗔殺', grade: ShinsalGrade.A, description: '원한/소원' },
    [ShinsalType.CHEONDEOK_GWIIN]: { koreanName: '천덕귀인', hanja: '天德貴人', grade: ShinsalGrade.A, description: '천덕/재앙해소' },
    [ShinsalType.WOLDEOK_GWIIN]: { koreanName: '월덕귀인', hanja: '月德貴人', grade: ShinsalGrade.A, description: '월덕/재앙해소' },
    [ShinsalType.MUNCHANG]: { koreanName: '문창귀인', hanja: '文昌貴人', grade: ShinsalGrade.B, description: '학업/시험' },
    [ShinsalType.YANGIN]: { koreanName: '양인', hanja: '羊刃', grade: ShinsalGrade.B, description: '결단/과격' },
    [ShinsalType.GOEGANG]: { koreanName: '괴강', hanja: '魁罡', grade: ShinsalGrade.B, description: '주관/강직' },
    [ShinsalType.HAKDANG]: { koreanName: '학당귀인', hanja: '學堂貴人', grade: ShinsalGrade.B, description: '학업/총명' },
    [ShinsalType.GEUMYEO]: { koreanName: '금여', hanja: '金輿', grade: ShinsalGrade.B, description: '배우자/귀인' },
    [ShinsalType.GEOPSAL]: { koreanName: '겁살', hanja: '劫殺', grade: ShinsalGrade.B, description: '재난/강탈' },
    [ShinsalType.GOSIN]: { koreanName: '고신살', hanja: '孤辰殺', grade: ShinsalGrade.B, description: '고독/독립' },
    [ShinsalType.GWASUK]: { koreanName: '과숙살', hanja: '寡宿殺', grade: ShinsalGrade.B, description: '고독/독립' },
    [ShinsalType.CHEONDEOK_HAP]: { koreanName: '천덕합', hanja: '天德合', grade: ShinsalGrade.B, description: '천덕합/길사' },
    [ShinsalType.WOLDEOK_HAP]: { koreanName: '월덕합', hanja: '月德合', grade: ShinsalGrade.B, description: '월덕합/길사' },
    [ShinsalType.CHEONGWAN_GWIIN]: { koreanName: '천관귀인', hanja: '天官貴人', grade: ShinsalGrade.B, description: '관직/명예' },
    [ShinsalType.BOKSEONG_GWIIN]: { koreanName: '복성귀인', hanja: '福星貴人', grade: ShinsalGrade.B, description: '복록/장수' },
    [ShinsalType.MUNGOK_GWIIN]: { koreanName: '문곡귀인', hanja: '文曲貴人', grade: ShinsalGrade.B, description: '문예/재능' },
    [ShinsalType.GUGIN_GWIIN]: { koreanName: '국인귀인', hanja: '國印貴人', grade: ShinsalGrade.B, description: '권위/인장' },
    [ShinsalType.BAEKHO]: { koreanName: '백호', hanja: '白虎', grade: ShinsalGrade.C, description: '사고/수술' },
    [ShinsalType.HONGYEOM]: { koreanName: '홍염', hanja: '紅艶', grade: ShinsalGrade.C, description: '이성/매력' },
    [ShinsalType.AMNOK]: { koreanName: '암록', hanja: '暗祿', grade: ShinsalGrade.C, description: '은밀한 복/숨은 도움' },
    [ShinsalType.CHEONUI]: { koreanName: '천의성', hanja: '天醫星', grade: ShinsalGrade.C, description: '의약/치유' },
    [ShinsalType.CHEOLLA_JIMANG]: { koreanName: '천라지망', hanja: '天羅地網', grade: ShinsalGrade.C, description: '구속/장애' },
    [ShinsalType.JAESAL]: { koreanName: '재살', hanja: '災煞', grade: ShinsalGrade.C, description: '재난/재해' },
    [ShinsalType.GYEOKGAK]: { koreanName: '격각', hanja: '隔角', grade: ShinsalGrade.C, description: '격리/분리' },
    [ShinsalType.CHEONBOK_GWIIN]: { koreanName: '천복귀인', hanja: '天福貴人', grade: ShinsalGrade.C, description: '복록/정관복' },
    [ShinsalType.YUKHAESAL]: { koreanName: '육해살', hanja: '六害煞', grade: ShinsalGrade.C, description: '구설/시비' },
    [ShinsalType.HYEOLINSAL]: { koreanName: '혈인살', hanja: '血刃煞', grade: ShinsalGrade.C, description: '혈광/사고' },
    [ShinsalType.GWANBUSAL]: { koreanName: '관부살', hanja: '官符煞', grade: ShinsalGrade.C, description: '송사/관재' },
    [ShinsalType.SANGMUNSAL]: { koreanName: '상문살', hanja: '喪門煞', grade: ShinsalGrade.C, description: '상복/이별' },
    [ShinsalType.CHEONSAL]: { koreanName: '천살', hanja: '天殺', grade: ShinsalGrade.C, description: '천재지변/예측불가' },
    [ShinsalType.JISAL]: { koreanName: '지살', hanja: '地殺', grade: ShinsalGrade.C, description: '현실장애/지체' },
    [ShinsalType.MANGSINSAL]: { koreanName: '망신살', hanja: '亡神殺', grade: ShinsalGrade.C, description: '망신/체면손상' },
    [ShinsalType.BANANSAL]: { koreanName: '반안살', hanja: '攀鞍殺', grade: ShinsalGrade.C, description: '보좌/중간관리' },
    [ShinsalType.CHEONJU_GWIIN]: { koreanName: '천주귀인', hanja: '天廚貴人', grade: ShinsalGrade.C, description: '의식주/복록' },
    [ShinsalType.GORANSAL]: { koreanName: '고란살', hanja: '孤鸞殺', grade: ShinsalGrade.C, description: '혼인지연/고독' },
};
//# sourceMappingURL=Shinsal.js.map