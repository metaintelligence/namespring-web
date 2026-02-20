let calculateSajuPillars = null;
let calLoadError = null;
try {
    // @ts-ignore optional module may not exist until /cal is built.
    const mod = await import('../../cal/dist/src/index.js');
    calculateSajuPillars = mod?.calculateSajuPillars;
}
catch (err) {
    calLoadError = err;
}
function parseSecond(instant) {
    const m = instant.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?(Z|[+-]\d{2}:\d{2})$/);
    if (!m)
        return 0;
    return m[6] ? Number(m[6]) : 0;
}
function toUtcOffsetZone(offsetMinutes) {
    if (offsetMinutes === 0)
        return 'UTC';
    const sign = offsetMinutes >= 0 ? '+' : '-';
    const abs = Math.abs(offsetMinutes);
    const hh = Math.floor(abs / 60);
    const mm = abs % 60;
    return `UTC${sign}${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}
function toCalGender(sex) {
    return sex === 'F' ? 'FEMALE' : 'MALE';
}
function resolveLocation(location) {
    if (location && Number.isFinite(location.lat) && Number.isFinite(location.lon)) {
        return { lat: location.lat, lon: location.lon, name: location.name };
    }
    return null;
}
export function adjustInstantWithCal(input, parsed, opts = {}) {
    if (!calculateSajuPillars) {
        const hint = 'calTimeAdapter requires the optional ./cal package to be built (npm -C cal ci && npm -C cal run build)';
        const cause = (calLoadError instanceof Error)
            ? calLoadError.message
            : (calLoadError ? String(calLoadError) : 'unknown');
        throw new Error(`${hint}. Import error: ${cause}`);
    }
    const mode = opts.solarTimeMode ?? 'LMT';
    if (mode === 'NONE')
        return input.birth.instant;
    const loc = resolveLocation(input.location);
    if (!loc) {
        if (opts.requireLocation ?? true) {
            throw new Error('cal time adapter requires location.lat/lon when solarTimeMode is not NONE');
        }
        // No location: cannot apply LMT/APPARENT; return as-is.
        return input.birth.instant;
    }
    const second = parseSecond(input.birth.instant);
    const zoneId = toUtcOffsetZone(parsed.offsetMinutes);
    const local = parsed.localDateTime;
    const result = calculateSajuPillars({
        year: local.date.y,
        month: local.date.m,
        day: local.date.d,
        hour: local.time.h,
        minute: local.time.min,
        second,
        zoneId,
        latitude: loc.lat,
        longitude: loc.lon,
        gender: toCalGender(input.sex),
        solarTimeMode: mode,
    });
    const adjustedIso = result.normalized.datetime.toISO({ suppressMilliseconds: true });
    if (!adjustedIso) {
        throw new Error('cal time adapter produced empty adjusted datetime');
    }
    return adjustedIso;
}
