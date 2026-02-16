import { Ohaeng } from '../domain/Ohaeng.js';
import { createEnumValueParser } from '../domain/EnumValueParser.js';
import rawOhaengPracticalGuides from './data/ohaengPracticalGuides.json';
const OHAENG_PRACTICAL_GUIDES = rawOhaengPracticalGuides;
const toOhaeng = createEnumValueParser('Ohaeng', 'ohaengPracticalGuides.json', Ohaeng);
const TABLE = new Map(OHAENG_PRACTICAL_GUIDES.entries.map(([element, guide]) => {
    const parsedElement = toOhaeng(element);
    return [parsedElement, { ...guide, element: parsedElement }];
}));
function requireGuide(ohaeng) {
    const guide = TABLE.get(ohaeng);
    if (!guide) {
        throw new Error(`Missing OhaengPracticalGuide entry: ${ohaeng}`);
    }
    return guide;
}
export const OhaengPracticalGuide = {
    guide(ohaeng) {
        return requireGuide(ohaeng);
    },
    avoidanceNote(gisin) {
        const g = requireGuide(gisin);
        return `${g.colors[0]} 계열 색상, ${g.direction}쪽 방향, ${g.taste} 음식의 과다 섭취를 줄이세요.`;
    },
};
//# sourceMappingURL=OhaengPracticalGuide.js.map