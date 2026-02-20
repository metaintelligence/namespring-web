import { createEngine } from '../api/engine.js';
import { defaultConfig } from '../api/config.js';
const STEM_CODES = ['GAP', 'EUL', 'BYEONG', 'JEONG', 'MU', 'GI', 'GYEONG', 'SIN', 'IM', 'GYE'];
const BRANCH_CODES = ['JA', 'CHUK', 'IN', 'MYO', 'JIN', 'SA', 'O', 'MI', 'SIN', 'YU', 'SUL', 'HAE'];
const OHAENG_CODES = ['WOOD', 'FIRE', 'EARTH', 'METAL', 'WATER'];
const OHAENG_KO_LABEL = {
    WOOD: '목',
    FIRE: '화',
    EARTH: '토',
    METAL: '금',
    WATER: '수',
};
const GYEOKGUK_KO_LABEL = {
    BI_GYEON: '비견격',
    GYEOB_JAE: '겁재격',
    JEONG_GWAN: '정관격',
    PYEON_GWAN: '편관격',
    JEONG_JAE: '정재격',
    PYEON_JAE: '편재격',
    SIK_SIN: '식신격',
    SANG_GWAN: '상관격',
    JEONG_IN: '정인격',
    PYEON_IN: '편인격',
    HUA_QI: '화기격',
    ZHUAN_WANG: '전왕격',
    CONG_GE: '종격',
    CONG_CAI: '종재격',
    CONG_GUAN: '종관격',
    CONG_SHA: '종살격',
    CONG_ER: '종아격',
    CONG_YIN: '종인격',
    CONG_BI: '종비격',
};
const DEFAULT_LATITUDE = 37.5665;
const DEFAULT_LONGITUDE = 126.978;
const DEFAULT_TIMEZONE = 'Asia/Seoul';
const DISTRIBUTION_ROUND_DIGITS = 1;
const DEFICIENT_AVERAGE_RATIO = 0.5;
const EXCESSIVE_AVERAGE_RATIO = 1.7;
const TEN_GOD_ALIASES = {
    GEOB_JAE: 'GYEOB_JAE',
    SIK_SHIN: 'SIK_SIN',
};
const GYEOKGUK_BASE_SIPSEONG_KEYS = new Set([
    'JEONG_GWAN', 'PYEON_GWAN',
    'JEONG_JAE', 'PYEON_JAE',
    'SIK_SIN', 'SANG_GWAN',
    'JEONG_IN', 'PYEON_IN',
    'BI_GYEON', 'GYEOB_JAE',
]);
const JIJI_RELATION_NOTES = {
    CHUNG: '지지 충(沖) 관계',
    HAE: '지지 해(害) 관계',
    PA: '지지 파(破) 관계',
    WONJIN: '지지 원진(怨嗔) 관계',
    HYEONG: '지지 형(刑) 관계',
    HAP: '지지 합(合) 관계',
    SAMHAP: '지지 삼합(三合) 관계',
    BANGHAP: '지지 방합(方合) 관계',
};
const JIJI_RELATION_OUTCOMES = {
    CHUNG: '충(沖)',
    HAE: '해(害)',
    PA: '파(破)',
    WONJIN: '원진(怨嗔)',
    HYEONG: '형(刑)',
    HAP: '합(合)',
    SAMHAP: '삼합(三合)',
    BANGHAP: '방합(方合)',
};
const CHEONGAN_RELATION_NOTES = {
    HAP: '천간 합(合) 관계',
    CHUNG: '천간 충(沖) 관계',
    GEUK: '천간 극(剋) 관계',
};
const PRESET_CONFIGS = {
    KOREAN_MAINSTREAM: {
        dayCutMode: 'YAZA_23_30_TO_01_30_NEXTDAY',
        includeEquationOfTime: false,
        lmtBaselineLongitude: 135,
    },
    TRADITIONAL_CHINESE: {
        dayCutMode: 'YAZA_23_30_TO_01_30_NEXTDAY',
        includeEquationOfTime: false,
        lmtBaselineLongitude: 120,
    },
    MODERN_INTEGRATED: {
        dayCutMode: 'JOJA_SPLIT',
        includeEquationOfTime: true,
        lmtBaselineLongitude: 135,
    },
};
const DEFAULT_TRUE_SOLAR_TIME_ENABLED = false;
const DEFAULT_LONGITUDE_CORRECTION_ENABLED = true;
const DEFAULT_YAZA_ENABLED = false;
const DEFAULT_YAZA_MODE = 'YAZA_23_30_TO_01_30_NEXTDAY';
function toInt(v, fallback) {
    const n = Number(v);
    return Number.isFinite(n) ? Math.trunc(n) : fallback;
}
function clampHour(v) {
    const n = toInt(v, 12);
    return Math.max(0, Math.min(23, n));
}
function clampMinute(v) {
    const n = toInt(v, 0);
    return Math.max(0, Math.min(59, n));
}
function cloneConfig() {
    return JSON.parse(JSON.stringify(defaultConfig));
}
function isObj(v) {
    return !!v && typeof v === 'object' && !Array.isArray(v);
}
function deepMerge(base, patch) {
    if (!isObj(base) || !isObj(patch))
        return base;
    const out = { ...base };
    for (const [k, v] of Object.entries(patch)) {
        const prev = out[k];
        if (isObj(prev) && isObj(v))
            out[k] = deepMerge(prev, v);
        else
            out[k] = v;
    }
    return out;
}
function mapDayCutMode(mode) {
    switch (mode) {
        case 'MIDNIGHT_00':
            return { dayBoundary: 'midnight', dayCutShiftMinutes: 0 };
        case 'JOJA_SPLIT':
            return { dayBoundary: 'midnight', dayCutShiftMinutes: 0 };
        case 'YAZA_23_TO_01_NEXTDAY':
            return { dayBoundary: 'ziSplit23', dayCutShiftMinutes: 0 };
        case 'YAZA_23_30_TO_01_30_NEXTDAY':
            return { dayBoundary: 'ziSplit23', dayCutShiftMinutes: -30 };
        default:
            return { dayBoundary: 'midnight', dayCutShiftMinutes: 0 };
    }
}
function isYazaMode(mode) {
    return mode === 'YAZA_23_TO_01_NEXTDAY' || mode === 'YAZA_23_30_TO_01_30_NEXTDAY';
}
function resolveDayCutMode(legacy) {
    if (typeof legacy.yazaEnabled === 'boolean') {
        if (!legacy.yazaEnabled)
            return 'MIDNIGHT_00';
        if (isYazaMode(legacy.dayCutMode))
            return legacy.dayCutMode;
        if (isYazaMode(legacy.yazaMode))
            return legacy.yazaMode;
        return DEFAULT_YAZA_MODE;
    }
    if (legacy.dayCutMode)
        return legacy.dayCutMode;
    if (DEFAULT_YAZA_ENABLED)
        return DEFAULT_YAZA_MODE;
    return 'MIDNIGHT_00';
}
function parseOffsetToken(token) {
    const s = token.trim().toUpperCase().replace('UTC', 'GMT');
    if (s === 'GMT' || s === 'GMT+0' || s === 'GMT+00' || s === 'GMT+00:00')
        return 0;
    const m = s.match(/GMT([+-])(\d{1,2})(?::?(\d{2}))?$/);
    if (!m)
        return null;
    const sign = m[1] === '-' ? -1 : 1;
    const hh = Number(m[2]);
    const mm = Number(m[3] ?? 0);
    if (!Number.isFinite(hh) || !Number.isFinite(mm))
        return null;
    return sign * (hh * 60 + mm);
}
function offsetAtUtcMs(utcMs, timeZone) {
    try {
        const parts = new Intl.DateTimeFormat('en-US', {
            timeZone,
            timeZoneName: 'shortOffset',
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h23',
        }).formatToParts(new Date(utcMs));
        const zoneName = parts.find((p) => p.type === 'timeZoneName')?.value ?? 'GMT+00:00';
        return parseOffsetToken(zoneName) ?? 540;
    }
    catch {
        return 540;
    }
}
function resolveOffsetMinutes(timeZone, civil) {
    const parsedFromToken = parseOffsetToken(timeZone);
    if (parsedFromToken != null)
        return parsedFromToken;
    const utcGuess = Date.UTC(civil.y, civil.m - 1, civil.d, civil.h, civil.min, 0);
    const first = offsetAtUtcMs(utcGuess, timeZone);
    const correctedUtc = utcGuess - first * 60_000;
    const second = offsetAtUtcMs(correctedUtc, timeZone);
    return second;
}
function formatOffset(minutes) {
    const sign = minutes >= 0 ? '+' : '-';
    const abs = Math.abs(minutes);
    const hh = String(Math.floor(abs / 60)).padStart(2, '0');
    const mm = String(abs % 60).padStart(2, '0');
    return `${sign}${hh}:${mm}`;
}
function addMinutes(civil, deltaMinutes) {
    if (!deltaMinutes)
        return { ...civil };
    const utcMs = Date.UTC(civil.y, civil.m - 1, civil.d, civil.h, civil.min, 0);
    const shifted = new Date(utcMs + deltaMinutes * 60_000);
    return {
        y: shifted.getUTCFullYear(),
        m: shifted.getUTCMonth() + 1,
        d: shifted.getUTCDate(),
        h: shifted.getUTCHours(),
        min: shifted.getUTCMinutes(),
    };
}
function toCivilFromBirthInput(input) {
    return {
        y: toInt(input.birthYear, 0),
        m: toInt(input.birthMonth, 1),
        d: toInt(input.birthDay, 1),
        h: clampHour(input.birthHour),
        min: clampMinute(input.birthMinute),
    };
}
function civilToIsoInstant(civil, offsetMinutes) {
    const y = String(civil.y).padStart(4, '0');
    const m = String(civil.m).padStart(2, '0');
    const d = String(civil.d).padStart(2, '0');
    const h = String(civil.h).padStart(2, '0');
    const min = String(civil.min).padStart(2, '0');
    return `${y}-${m}-${d}T${h}:${min}:00${formatOffset(offsetMinutes)}`;
}
function normalizeTenGod(v) {
    const raw = String(v ?? '');
    if (!raw)
        return '';
    return TEN_GOD_ALIASES[raw] ?? raw;
}
function stemCodeFromIdx(idx) {
    const n = Number(idx);
    const normalized = Number.isFinite(n) ? ((Math.trunc(n) % 10) + 10) % 10 : 0;
    return STEM_CODES[normalized] ?? '';
}
function branchCodeFromIdx(idx) {
    const n = Number(idx);
    const normalized = Number.isFinite(n) ? ((Math.trunc(n) % 12) + 12) % 12 : 0;
    return BRANCH_CODES[normalized] ?? '';
}
function roundTo(value, digits) {
    const n = Number(value);
    if (!Number.isFinite(n))
        return 0;
    const scale = 10 ** digits;
    return Math.round(n * scale) / scale;
}
function scoreDiffConfidence(top, second) {
    if (!Number.isFinite(top) || !Number.isFinite(second))
        return 0.5;
    const diff = top - second;
    if (diff <= 0)
        return 0.35;
    if (diff >= 1)
        return 1;
    return Math.max(0.35, Math.min(1, diff));
}
function confidenceToPoints(confidence) {
    if (!Number.isFinite(confidence))
        return 0;
    const normalized = Math.max(0, Math.min(1, confidence <= 1 ? confidence : confidence / 100));
    return Math.round(normalized * 100);
}
function ohaengKoLabel(code) {
    const normalized = String(code ?? '').trim().toUpperCase();
    const fallback = String(code ?? '').trim();
    return OHAENG_KO_LABEL[normalized] ?? (fallback || '-');
}
function gyeokgukKoLabel(code) {
    const normalized = String(code ?? '').trim().toUpperCase();
    const canonical = TEN_GOD_ALIASES[normalized] ?? normalized;
    return GYEOKGUK_KO_LABEL[canonical] ?? GYEOKGUK_KO_LABEL[normalized] ?? (normalized || '-');
}
function buildYongshinReasoning(rank, entry, topElement) {
    const primaryLabel = ohaengKoLabel(entry.element);
    const topLabel = ohaengKoLabel(topElement || '상위');
    const confidencePoint = confidenceToPoints(Number(entry.score));
    if (rank === 0) {
        return `${primaryLabel} 기운이 가장 강해 용신 1순위입니다 (신뢰도 ${confidencePoint}점).`;
    }
    if (rank === 1) {
        return `${primaryLabel} 기운은 ${topLabel} 기운을 보조하는 희신 후보입니다 (신뢰도 ${confidencePoint}점).`;
    }
    return `${primaryLabel} 기운은 후순위 균형 보완 후보입니다 (신뢰도 ${confidencePoint}점).`;
}
function relationPositionFromBasedOn(v) {
    const raw = String(v ?? '');
    if (raw === 'YEAR_BRANCH')
        return 'YEAR';
    if (raw === 'MONTH_BRANCH')
        return 'MONTH';
    if (raw === 'DAY_BRANCH')
        return 'DAY';
    return 'OTHER';
}
function gradeFromQualityWeight(v) {
    const weight = Number(v);
    if (!Number.isFinite(weight))
        return 'C';
    if (weight >= 0.85)
        return 'A';
    if (weight >= 0.5)
        return 'B';
    return 'C';
}
function topTwo(values) {
    const first = values[0]?.element ?? '';
    const second = values[1]?.element ?? null;
    return [first, second];
}
function deriveGyeokgukBaseSipseong(bestKeyCore) {
    const normalized = String(bestKeyCore ?? '').trim().toUpperCase();
    if (!normalized)
        return null;
    if (!GYEOKGUK_BASE_SIPSEONG_KEYS.has(normalized))
        return null;
    return normalizeTenGod(normalized);
}
function extractGongmangVoidBranches(bundle) {
    const facts = bundle.report?.facts;
    const ruleFacts = facts?.['rules.facts'];
    const pair = Array.isArray(ruleFacts?.shinsal?.gongmang?.day)
        ? ruleFacts.shinsal.gongmang.day
        : [];
    if (pair.length < 2)
        return [];
    return [branchCodeFromIdx(pair[0]), branchCodeFromIdx(pair[1])];
}
function relationNoteForType(type, table) {
    return table[String(type ?? '').toUpperCase()] ?? '';
}
function relationOutcomeForType(type) {
    const normalized = String(type ?? '').toUpperCase();
    return JIJI_RELATION_OUTCOMES[normalized] ?? null;
}
function normalizeLegacyConfig(raw) {
    if (!isObj(raw))
        return {};
    return raw;
}
function pickEngineConfigPatch(legacy) {
    const patch = {};
    if (legacy.schemaVersion && typeof legacy.schemaVersion === 'string')
        patch.schemaVersion = legacy.schemaVersion;
    if (legacy.school && isObj(legacy.school))
        patch.school = legacy.school;
    if (legacy.calendar && isObj(legacy.calendar))
        patch.calendar = legacy.calendar;
    if (legacy.toggles && isObj(legacy.toggles))
        patch.toggles = legacy.toggles;
    if (legacy.weights && isObj(legacy.weights))
        patch.weights = legacy.weights;
    if (legacy.strategies && isObj(legacy.strategies))
        patch.strategies = legacy.strategies;
    if (legacy.extensions && isObj(legacy.extensions))
        patch.extensions = legacy.extensions;
    return patch;
}
function buildEngineConfig(legacy, timeZone) {
    const dayCut = mapDayCutMode(resolveDayCutMode(legacy));
    const trueSolarTimeEnabled = legacy.trueSolarTimeEnabled ?? DEFAULT_TRUE_SOLAR_TIME_ENABLED;
    const includeEquationOfTime = legacy.includeEquationOfTime ?? true;
    let cfg = cloneConfig();
    cfg.calendar.dayBoundary = dayCut.dayBoundary;
    cfg.calendar.trueSolarTime.enabled = trueSolarTimeEnabled;
    cfg.calendar.trueSolarTime.equationOfTime = trueSolarTimeEnabled && includeEquationOfTime ? 'approx' : 'off';
    cfg.calendar.trueSolarTime.applyTo = 'dayAndHour';
    cfg.calendar.solarTerms = {
        method: 'meeus',
        alwaysCompute: false,
    };
    cfg = deepMerge(cfg, pickEngineConfigPatch(legacy));
    return { config: cfg, dayCutShiftMinutes: dayCut.dayCutShiftMinutes };
}
function inferStandardMeridian(offsetMinutes) {
    return (offsetMinutes / 60) * 15;
}
function effectiveLongitudeForLegacyLmt(longitude, baselineLongitude, stdMeridianDeg) {
    if (!Number.isFinite(baselineLongitude))
        return longitude;
    return longitude - (baselineLongitude - stdMeridianDeg);
}
function makeRequest(input, legacy, dayCutShiftMinutes) {
    const standard = toCivilFromBirthInput(input);
    const analysisLocal = addMinutes(standard, dayCutShiftMinutes);
    const timeZone = input.timezone ?? DEFAULT_TIMEZONE;
    const offsetMinutes = resolveOffsetMinutes(timeZone, analysisLocal);
    const stdMeridian = inferStandardMeridian(offsetMinutes);
    const rawLongitude = Number.isFinite(input.longitude) ? Number(input.longitude) : DEFAULT_LONGITUDE;
    const latitude = Number.isFinite(input.latitude) ? Number(input.latitude) : DEFAULT_LATITUDE;
    const longitudeCorrectionEnabled = legacy.longitudeCorrectionEnabled ?? DEFAULT_LONGITUDE_CORRECTION_ENABLED;
    const baselineLongitude = Number.isFinite(legacy.lmtBaselineLongitude)
        ? Number(legacy.lmtBaselineLongitude)
        : stdMeridian;
    const effectiveLongitude = longitudeCorrectionEnabled
        ? effectiveLongitudeForLegacyLmt(rawLongitude, baselineLongitude, stdMeridian)
        : rawLongitude;
    const instant = civilToIsoInstant(analysisLocal, offsetMinutes);
    const sex = input.gender === 'FEMALE' ? 'F' : 'M';
    return {
        request: {
            birth: { instant, calendar: 'gregorian' },
            sex,
            location: {
                lat: latitude,
                lon: effectiveLongitude,
                name: input.name,
            },
        },
        standard,
        analysisLocal,
    };
}
function getSummaryPillars(bundle) {
    return bundle.summary?.pillars ?? {
        year: { stem: { idx: 0 }, branch: { idx: 0 } },
        month: { stem: { idx: 0 }, branch: { idx: 0 } },
        day: { stem: { idx: 0 }, branch: { idx: 0 } },
        hour: { stem: { idx: 0 }, branch: { idx: 0 } },
    };
}
function extractDeficientAndExcessive(distribution) {
    const entries = Object.entries(distribution);
    const total = entries.reduce((sum, [, value]) => sum + Number(value || 0), 0);
    if (total <= 0)
        return { deficientElements: [], excessiveElements: [] };
    const avg = total / 5;
    const deficientElements = [];
    const excessiveElements = [];
    for (const code of OHAENG_CODES) {
        const v = Number(distribution[code] ?? 0);
        if (v === 0 || v <= avg * DEFICIENT_AVERAGE_RATIO)
            deficientElements.push(code);
        else if (v >= avg * EXCESSIVE_AVERAGE_RATIO)
            excessiveElements.push(code);
    }
    return { deficientElements, excessiveElements };
}
function normalizePositionKey(position) {
    if (position === 'year')
        return 'YEAR';
    if (position === 'month')
        return 'MONTH';
    if (position === 'day')
        return 'DAY';
    return 'HOUR';
}
function normalizeLegacyOutput(bundle, standard, daeunCount, saeunStartYear, saeunYearCount) {
    const facts = bundle.report?.facts;
    const correction = (facts?.['time.trueSolarCorrection'] ?? {});
    const adjustedFact = (facts?.['time.solarLocalDateTime'] ?? facts?.['time.localDateTimeForHour'] ?? null);
    const adjusted = adjustedFact?.date && adjustedFact?.time
        ? {
            y: toInt(adjustedFact.date.y, standard.y),
            m: toInt(adjustedFact.date.m, standard.m),
            d: toInt(adjustedFact.date.d, standard.d),
            h: toInt(adjustedFact.time.h, standard.h),
            min: toInt(adjustedFact.time.min, standard.min),
        }
        : addMinutes(standard, Math.round(Number(correction.totalCorrectionMinutes ?? 0)));
    const pillars = getSummaryPillars(bundle);
    const yearStemCode = stemCodeFromIdx(pillars.year.stem.idx);
    const yearBranchCode = branchCodeFromIdx(pillars.year.branch.idx);
    const monthStemCode = stemCodeFromIdx(pillars.month.stem.idx);
    const monthBranchCode = branchCodeFromIdx(pillars.month.branch.idx);
    const dayStemCode = stemCodeFromIdx(pillars.day.stem.idx);
    const dayBranchCode = branchCodeFromIdx(pillars.day.branch.idx);
    const hourStemCode = stemCodeFromIdx(pillars.hour.stem.idx);
    const hourBranchCode = branchCodeFromIdx(pillars.hour.branch.idx);
    const strength = bundle.summary?.strength;
    const strengthIndex = Number(strength?.index ?? 0);
    const support = Number(strength?.support ?? 0);
    const pressure = Number(strength?.pressure ?? 0);
    const components = strength?.components ?? {};
    const strengthLevelCode = strengthIndex >= 0.15 ? 'STRONG' : strengthIndex <= -0.15 ? 'WEAK' : 'BALANCED';
    const strengthLevelKo = strengthLevelCode === 'STRONG' ? '신강' : strengthLevelCode === 'WEAK' ? '신약' : '중화';
    const yongshin = bundle.summary?.yongshin;
    const yongshinRanking = Array.isArray(yongshin?.ranking)
        ? yongshin.ranking.map((item) => ({
            element: String(item?.element ?? ''),
            score: Number(item?.score ?? 0),
        }))
        : [];
    const [topElement, secondElement] = topTwo(yongshinRanking);
    const worst = yongshinRanking.length ? yongshinRanking[yongshinRanking.length - 1]?.element ?? null : null;
    const secondWorst = yongshinRanking.length > 1 ? yongshinRanking[yongshinRanking.length - 2]?.element ?? null : null;
    const topScore = Number(yongshinRanking[0]?.score ?? 0);
    const secondScore = Number(yongshinRanking[1]?.score ?? 0);
    const yongshinConfidence = scoreDiffConfidence(topScore, secondScore);
    const yongshinConfidencePoints = confidenceToPoints(yongshinConfidence);
    const gyeokguk = bundle.summary?.gyeokguk;
    const bestKey = String(gyeokguk?.best ?? '');
    const bestKeyCore = bestKey.replace(/^gyeokguk\./, '');
    const baseSipseong = deriveGyeokgukBaseSipseong(bestKeyCore);
    const bestScore = Number(gyeokguk?.ranking?.[0]?.score ?? 0);
    const isJonggyeok = bestKeyCore.startsWith('CONG_') || bestKeyCore === 'ZHUAN_WANG';
    const totalDistribution = bundle.summary?.elementDistribution?.total ?? {};
    const ohaengDistribution = {
        WOOD: roundTo(totalDistribution.WOOD ?? 0, DISTRIBUTION_ROUND_DIGITS),
        FIRE: roundTo(totalDistribution.FIRE ?? 0, DISTRIBUTION_ROUND_DIGITS),
        EARTH: roundTo(totalDistribution.EARTH ?? 0, DISTRIBUTION_ROUND_DIGITS),
        METAL: roundTo(totalDistribution.METAL ?? 0, DISTRIBUTION_ROUND_DIGITS),
        WATER: roundTo(totalDistribution.WATER ?? 0, DISTRIBUTION_ROUND_DIGITS),
    };
    const { deficientElements, excessiveElements } = extractDeficientAndExcessive(ohaengDistribution);
    const stemRelations = Array.isArray(bundle.summary?.stemRelations) ? bundle.summary.stemRelations : [];
    const cheonganRelations = stemRelations.map((relation) => ({
        type: String(relation?.type ?? ''),
        members: Array.isArray(relation?.members) ? relation.members.map((m) => stemCodeFromIdx(m?.idx)) : [],
        resultOhaeng: relation?.resultElement ? String(relation.resultElement) : null,
        note: relationNoteForType(String(relation?.type ?? ''), CHEONGAN_RELATION_NOTES),
    }));
    const branchRelations = Array.isArray(bundle.summary?.relations) ? bundle.summary.relations : [];
    const jijiRelations = branchRelations.map((relation) => {
        const type = String(relation?.type ?? '');
        const note = relationNoteForType(type, JIJI_RELATION_NOTES);
        return {
            type,
            members: Array.isArray(relation?.members) ? relation.members.map((m) => branchCodeFromIdx(m?.idx)) : [],
            note,
            outcome: relationOutcomeForType(type),
            reasoning: null,
        };
    });
    const tenGods = bundle.summary?.tenGods;
    const hiddenStems = bundle.summary?.hiddenStems;
    const hiddenStemTenGods = bundle.summary?.tenGodsHiddenStems;
    const byPosition = {};
    for (const pos of ['year', 'month', 'day', 'hour']) {
        const key = normalizePositionKey(pos);
        const principalList = Array.isArray(hiddenStemTenGods?.[pos]) ? hiddenStemTenGods[pos] : [];
        const hiddenList = Array.isArray(hiddenStems?.[pos]) ? hiddenStems[pos] : [];
        byPosition[key] = {
            cheonganSipseong: pos === 'year'
                ? normalizeTenGod(tenGods?.yearStem)
                : pos === 'month'
                    ? normalizeTenGod(tenGods?.monthStem)
                    : pos === 'hour'
                        ? normalizeTenGod(tenGods?.hourStem)
                        : 'BI_GYEON',
            jijiPrincipalSipseong: normalizeTenGod(principalList[0]?.tenGod),
            hiddenStems: hiddenList.map((entry) => ({
                stem: stemCodeFromIdx(entry?.stem?.idx),
                ratio: Number(entry?.weight ?? 0),
            })),
            hiddenStemSipseong: principalList.map((entry) => ({
                entry: { stem: stemCodeFromIdx(entry?.stem?.idx) },
                sipseong: normalizeTenGod(entry?.tenGod),
            })),
        };
    }
    const shinsalHitsRaw = Array.isArray(bundle.summary?.shinsalHits) ? bundle.summary.shinsalHits : [];
    const weightedByKey = new Map();
    for (const hit of shinsalHitsRaw) {
        const type = String(hit?.name ?? '');
        const position = relationPositionFromBasedOn(hit?.basedOn);
        const grade = gradeFromQualityWeight(hit?.qualityWeight);
        const qualityWeight = Number(hit?.qualityWeight ?? 0.6);
        const positionMultiplier = 1;
        const baseWeight = Math.max(0, Math.min(100, Math.round(qualityWeight * 100)));
        const weightedScore = baseWeight * positionMultiplier;
        const payload = {
            hit: { type, position, grade },
            baseWeight,
            positionMultiplier,
            weightedScore,
        };
        const dedupeKey = `${type}|${position}`;
        const existing = weightedByKey.get(dedupeKey);
        if (!existing || weightedScore > existing.weightedScore) {
            weightedByKey.set(dedupeKey, payload);
        }
    }
    const weightedShinsalHits = [...weightedByKey.values()];
    const shinsalHits = weightedShinsalHits.map((item) => item.hit);
    const gongmangVoidBranches = extractGongmangVoidBranches(bundle);
    const fortune = bundle.summary?.fortune;
    const decades = Array.isArray(fortune?.decades) ? fortune.decades : [];
    const yearsAll = Array.isArray(fortune?.years) ? fortune.years : [];
    const yearsFiltered = typeof saeunStartYear === 'number'
        ? yearsAll.filter((y) => Number(y?.solarYear) >= saeunStartYear)
        : yearsAll;
    const years = typeof saeunYearCount === 'number' && saeunYearCount > 0
        ? yearsFiltered.slice(0, saeunYearCount)
        : yearsFiltered;
    const daeunPillars = (typeof daeunCount === 'number' && daeunCount > 0 ? decades.slice(0, daeunCount) : decades)
        .map((entry) => ({
        pillar: {
            cheongan: stemCodeFromIdx(entry?.pillar?.stem?.idx),
            jiji: branchCodeFromIdx(entry?.pillar?.branch?.idx),
        },
        startAge: Number(entry?.startAgeYears ?? 0),
        endAge: Number(entry?.endAgeYears ?? 0),
        order: Number(entry?.index ?? 0),
    }));
    const saeunPillars = years.map((entry) => ({
        year: Number(entry?.solarYear ?? 0),
        pillar: {
            cheongan: stemCodeFromIdx(entry?.pillar?.stem?.idx),
            jiji: branchCodeFromIdx(entry?.pillar?.branch?.idx),
        },
    }));
    const traceNodes = Array.isArray(bundle.report?.trace?.nodes) ? bundle.report.trace.nodes : [];
    const trace = traceNodes.map((node) => ({
        key: String(node?.id ?? ''),
        summary: String(node?.formula ?? node?.explain ?? ''),
        evidence: Array.isArray(node?.deps) ? node.deps.map(String) : [],
        citations: [],
        reasoning: node?.explain ? [String(node.explain)] : [],
        confidence: null,
    }));
    return {
        pillars: {
            year: { cheongan: yearStemCode, jiji: yearBranchCode },
            month: { cheongan: monthStemCode, jiji: monthBranchCode },
            day: { cheongan: dayStemCode, jiji: dayBranchCode },
            hour: { cheongan: hourStemCode, jiji: hourBranchCode },
        },
        coreResult: {
            standardYear: standard.y,
            standardMonth: standard.m,
            standardDay: standard.d,
            standardHour: standard.h,
            standardMinute: standard.min,
            adjustedYear: adjusted.y,
            adjustedMonth: adjusted.m,
            adjustedDay: adjusted.d,
            adjustedHour: adjusted.h,
            adjustedMinute: adjusted.min,
            dstCorrectionMinutes: 0,
            longitudeCorrectionMinutes: Number(correction.longitudeCorrectionMinutes ?? 0),
            equationOfTimeMinutes: Number(correction.equationOfTimeMinutes ?? 0),
        },
        strengthResult: {
            dayMasterElement: String(pillars?.day?.stem?.element ?? ''),
            level: strengthLevelCode,
            isStrong: strengthIndex >= 0,
            score: {
                totalSupport: support,
                totalOppose: pressure,
                deukryeong: Number(components.companions ?? 0),
                deukji: Number(components.resources ?? 0),
                deukse: Number(components.companions ?? 0) + Number(components.resources ?? 0),
            },
            details: [
                `강약 판정: ${strengthLevelKo}`,
                `강약 지수: ${strengthIndex.toFixed(3)}`,
                `생조 합: ${support.toFixed(3)}`,
                `극설 합: ${pressure.toFixed(3)}`,
            ],
        },
        yongshinResult: {
            finalYongshin: topElement,
            finalHeesin: secondElement,
            gisin: worst,
            gusin: secondWorst,
            finalConfidence: yongshinConfidencePoints,
            agreement: 'RANKING',
            recommendations: yongshinRanking.slice(0, 3).map((entry, i) => ({
                type: i === 0 ? 'JOHU' : 'RANKING',
                primaryElement: entry.element,
                secondaryElement: yongshinRanking[i + 1]?.element ?? null,
                confidence: confidenceToPoints(Math.max(0, Math.min(1, Number(entry.score)))),
                reasoning: buildYongshinReasoning(i, entry, topElement),
            })),
        },
        gyeokgukResult: {
            type: bestKeyCore,
            category: isJonggyeok ? 'JONGGYEOK' : 'NORMAL',
            baseSipseong,
            confidence: Math.max(0, Math.min(1, bestScore)),
            reasoning: bestKeyCore
                ? `격국 후보 중 ${gyeokgukKoLabel(bestKeyCore)}이(가) 가장 유력합니다.`
                : '격국 후보를 확정하기 어려워 추가 검토가 필요합니다.',
        },
        ohaengDistribution,
        deficientElements,
        excessiveElements,
        cheonganRelations,
        scoredCheonganRelations: [],
        jijiRelations,
        resolvedJijiRelations: [],
        tenGodAnalysis: {
            dayMaster: dayStemCode,
            byPosition,
        },
        shinsalHits,
        weightedShinsalHits,
        shinsalComposites: [],
        gongmangVoidBranches,
        daeunInfo: {
            isForward: String(fortune?.start?.direction ?? 'FORWARD') !== 'BACKWARD',
            firstDaeunStartAge: Number(fortune?.start?.startAgeYears ?? 0),
            firstDaeunStartMonths: Number(fortune?.start?.startAgeParts?.months ?? 0),
            boundaryMode: String(bundle.report?.facts?.['policy.calendar']?.dayBoundary ?? ''),
            warnings: [],
            daeunPillars,
        },
        saeunPillars,
        trace,
    };
}
export function createBirthInput(params) {
    return {
        birthYear: toInt(params.birthYear, 0),
        birthMonth: toInt(params.birthMonth, 1),
        birthDay: toInt(params.birthDay, 1),
        birthHour: clampHour(params.birthHour),
        birthMinute: clampMinute(params.birthMinute),
        gender: params.gender === 'FEMALE' ? 'FEMALE' : 'MALE',
        calendarType: params.calendarType === 'LUNAR' ? 'LUNAR' : 'SOLAR',
        isLeapMonth: params.isLeapMonth,
        timezone: params.timezone ?? DEFAULT_TIMEZONE,
        latitude: Number.isFinite(params.latitude) ? Number(params.latitude) : DEFAULT_LATITUDE,
        longitude: Number.isFinite(params.longitude) ? Number(params.longitude) : DEFAULT_LONGITUDE,
        name: params.name,
    };
}
export function configFromPreset(preset) {
    const key = String(preset ?? '').trim().toUpperCase();
    return { ...(PRESET_CONFIGS[key] ?? PRESET_CONFIGS.KOREAN_MAINSTREAM) };
}
export function analyzeSaju(birthInput, rawConfig, options) {
    const normalizedInput = createBirthInput(birthInput);
    if (normalizedInput.calendarType === 'LUNAR') {
        throw new Error('Legacy lunar input is not supported in the current engine bridge.');
    }
    const legacy = normalizeLegacyConfig(rawConfig);
    const tz = normalizedInput.timezone ?? DEFAULT_TIMEZONE;
    const { config, dayCutShiftMinutes } = buildEngineConfig(legacy, tz);
    const { request, standard } = makeRequest(normalizedInput, legacy, dayCutShiftMinutes);
    const engine = createEngine(config);
    const bundle = engine.analyze(request);
    return normalizeLegacyOutput(bundle, standard, options?.daeunCount, options?.saeunStartYear, options?.saeunYearCount);
}
