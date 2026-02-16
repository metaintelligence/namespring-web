export const SERVICE_TIMEZONE = 'Asia/Seoul';
function readPart(parts, token) {
    const value = parts.find(part => part.type === token)?.value;
    const parsed = value != null ? Number.parseInt(value, 10) : Number.NaN;
    return Number.isFinite(parsed) ? parsed : 0;
}
export function getDatePartsInTimeZone(date, timeZone) {
    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).formatToParts(date);
    return {
        year: readPart(parts, 'year'),
        month: readPart(parts, 'month'),
        day: readPart(parts, 'day'),
        hour: readPart(parts, 'hour'),
        minute: readPart(parts, 'minute'),
    };
}
export function getKoreanDateParts(date = new Date()) {
    return getDatePartsInTimeZone(date, SERVICE_TIMEZONE);
}
//# sourceMappingURL=ServiceDateTime.js.map