import { SibiUnseong } from '../domain/SibiUnseong.js';
import { PillarPosition } from '../domain/PillarPosition.js';
import { createEnumValueParser } from '../domain/EnumValueParser.js';
import rawSibiUnseongInterpretations from './data/sibiUnseongInterpretations.json';
const SIBI_UNSEONG_INTERPRETATIONS = rawSibiUnseongInterpretations;
const toSibiUnseong = createEnumValueParser('SibiUnseong', 'sibiUnseongInterpretations.json', SibiUnseong);
const toPillarPosition = createEnumValueParser('PillarPosition', 'sibiUnseongInterpretations.json', PillarPosition);
function key(s, p) {
    return `${s}:${p}`;
}
function parseEntryKey(rawKey) {
    const [rawStage, rawPosition, ...rest] = rawKey.split(':');
    if (!rawStage || !rawPosition || rest.length > 0) {
        throw new Error(`Invalid SibiUnseong catalog key: ${rawKey}`);
    }
    return [toSibiUnseong(rawStage), toPillarPosition(rawPosition)];
}
const TABLE = new Map(SIBI_UNSEONG_INTERPRETATIONS.entries.map(([rawKey, interpretation]) => {
    const [stage, position] = parseEntryKey(rawKey);
    return [key(stage, position), { ...interpretation, stage, position }];
}));
export function interpretSibiUnseong(stage, position) {
    const result = TABLE.get(key(stage, position));
    if (!result) {
        throw new Error(`Missing SibiUnseongInterpreter entry: ${stage}+${position}`);
    }
    return result;
}
export const SibiUnseongInterpreter = {
    interpret: interpretSibiUnseong,
};
//# sourceMappingURL=SibiUnseongInterpreter.js.map