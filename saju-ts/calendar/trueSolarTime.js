import { addDays } from './pillars.js';
const MS_PER_DAY = 86_400_000;
/**
 * NOAA-style approximation of equation of time (minutes).
 * Good enough for “hour pillar boundary” use cases.
 */
export function equationOfTimeMinutesApprox(utcMs) {
    const d = new Date(utcMs);
    const year = d.getUTCFullYear();
    const dayStartUtc = Date.UTC(year, d.getUTCMonth(), d.getUTCDate());
    const yearStartUtc = Date.UTC(year, 0, 1);
    const doy = Math.floor((dayStartUtc - yearStartUtc) / MS_PER_DAY) + 1;
    const hour = d.getUTCHours() +
        d.getUTCMinutes() / 60 +
        d.getUTCSeconds() / 3600 +
        d.getUTCMilliseconds() / 3_600_000;
    const gamma = (2 * Math.PI / 365) * (doy - 1 + (hour - 12) / 24);
    const eot = 229.18 *
        (0.000075 +
            0.001868 * Math.cos(gamma) -
            0.032077 * Math.sin(gamma) -
            0.014615 * Math.cos(2 * gamma) -
            0.040849 * Math.sin(2 * gamma));
    return eot;
}
/**
 * Longitude correction (minutes) converting local standard time (given by utcOffset)
 * to local mean solar time.
 *
 * LST = UTC + offsetHours
 * LMST = UTC + lon/15
 * LMST - LST = lon/15 - offsetHours = 4*(lon - 15*offsetHours) minutes
 */
export function longitudeCorrectionMinutes(offsetMinutes, longitudeDeg) {
    const standardMeridianDeg = (offsetMinutes / 60) * 15;
    return 4 * (longitudeDeg - standardMeridianDeg);
}
export function computeTrueSolarTimeCorrection(args) {
    const { utcMs, offsetMinutes, location, policy } = args;
    if (!policy?.enabled) {
        return {
            enabled: false,
            applied: false,
            method: 'none',
            totalCorrectionMinutes: 0,
            reason: 'disabled',
            formula: 'Δ = 0 (trueSolarTime.disabled)',
        };
    }
    const lon = location?.lon;
    if (typeof lon !== 'number' || !Number.isFinite(lon)) {
        return {
            enabled: true,
            applied: false,
            method: 'none',
            totalCorrectionMinutes: 0,
            reason: 'location.lon missing',
            formula: 'Δ = 0 (no longitude)',
        };
    }
    const stdMer = (offsetMinutes / 60) * 15;
    const lonCorr = longitudeCorrectionMinutes(offsetMinutes, lon);
    const eot = policy.equationOfTime === 'approx'
        ? equationOfTimeMinutesApprox(utcMs)
        : 0;
    const total = lonCorr + eot;
    return {
        enabled: true,
        applied: true,
        method: policy.equationOfTime === 'approx' ? 'approx' : 'none',
        longitudeDeg: lon,
        standardMeridianDeg: stdMer,
        longitudeCorrectionMinutes: lonCorr,
        equationOfTimeMinutes: eot,
        totalCorrectionMinutes: total,
        formula: 'T_solar = T_civil + 4*(lon-stdMeridian) + EoT',
    };
}
/**
 * Apply a minute offset to a LocalDateTime (used for true solar time representation).
 *
 * This does NOT change the underlying instant; it only adjusts the local “clock reading”
 * used for pillar boundary classification.
 */
export function applyMinuteOffsetToLocalDateTime(ldt, deltaMinutes) {
    const total = ldt.time.h * 60 + ldt.time.min + deltaMinutes;
    // Math.floor works as desired for negative totals (e.g. -10 min => -1 day).
    const dayDelta = Math.floor(total / 1440);
    const rem = total - dayDelta * 1440; // in [0,1440)
    const hh = Math.floor(rem / 60);
    const mm = Math.floor(rem - hh * 60);
    return {
        date: addDays(ldt.date, dayDelta),
        time: { h: hh, min: mm },
        offsetMinutes: ldt.offsetMinutes,
    };
}
