import { StrengthLevel } from '../domain/StrengthResult.js';
import { createEnumValueParser } from '../domain/EnumValueParser.js';
import rawStrengthInterpretations from './data/strengthInterpretations.json';
const STRENGTH_INTERPRETATIONS = rawStrengthInterpretations;
const toStrengthLevel = createEnumValueParser('StrengthLevel', 'strengthInterpretations.json', StrengthLevel);
const TABLE = new Map(STRENGTH_INTERPRETATIONS.entries.map(([level, interpretation]) => {
    const parsedLevel = toStrengthLevel(level);
    return [parsedLevel, { ...interpretation, level: parsedLevel }];
}));
export function interpretStrength(level) {
    const result = TABLE.get(level);
    if (!result) {
        throw new Error(`Missing StrengthInterpreter entry: ${level}`);
    }
    return result;
}
export const StrengthInterpreter = {
    interpret: interpretStrength,
};
//# sourceMappingURL=StrengthInterpreter.js.map