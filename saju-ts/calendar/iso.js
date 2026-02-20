/**
 * Parse ISO-8601 string with explicit offset (or 'Z').
 * - Minutes are required.
 */
export function parseIsoInstant(instant) {
    const m = instant.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?(Z|[+-]\d{2}:\d{2})$/);
    if (!m) {
        throw new Error(`Invalid ISO instant (requires offset and minutes): ${instant}`);
    }
    const y = Number(m[1]);
    const mo = Number(m[2]);
    const d = Number(m[3]);
    const h = Number(m[4]);
    const min = Number(m[5]);
    const tz = m[8];
    const offsetMinutes = tz === 'Z' ? 0 : parseOffsetMinutes(tz);
    const utcMs = Date.parse(instant);
    if (!Number.isFinite(utcMs)) {
        throw new Error(`Unable to parse Date from ISO: ${instant}`);
    }
    return {
        utcMs,
        offsetMinutes,
        localDateTime: {
            date: { y, m: mo, d },
            time: { h, min },
            offsetMinutes,
        },
    };
}
function parseOffsetMinutes(tz) {
    const m = tz.match(/^([+-])(\d{2}):(\d{2})$/);
    if (!m)
        throw new Error(`Invalid offset: ${tz}`);
    const sign = m[1] === '-' ? -1 : 1;
    const hh = Number(m[2]);
    const mm = Number(m[3]);
    return sign * (hh * 60 + mm);
}
