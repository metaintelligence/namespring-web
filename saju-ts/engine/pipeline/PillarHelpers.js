import { PillarPosition } from '../../domain/PillarPosition.js';
const PILLAR_SELECTORS = {
    [PillarPosition.YEAR]: (pillars) => pillars.year,
    [PillarPosition.MONTH]: (pillars) => pillars.month,
    [PillarPosition.DAY]: (pillars) => pillars.day,
    [PillarPosition.HOUR]: (pillars) => pillars.hour,
};
export function pillarOf(pillars, pos) {
    return PILLAR_SELECTORS[pos](pillars);
}
//# sourceMappingURL=PillarHelpers.js.map