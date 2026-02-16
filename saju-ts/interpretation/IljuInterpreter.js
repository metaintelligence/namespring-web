import { Pillar } from '../domain/Pillar.js';
import { registerIljuCatalog } from './IljuInterpretationCatalog.js';
function key(c, j) {
    return `${c}:${j}`;
}
const TABLE = new Map();
function add(c, j, nickname, personality, relationships, career, health, lifePath) {
    TABLE.set(key(c, j), {
        pillar: new Pillar(c, j),
        nickname, personality, relationships, career, health, lifePath,
    });
}
registerIljuCatalog(add);
export function interpretIlju(pillar) {
    const result = TABLE.get(key(pillar.cheongan, pillar.jiji));
    if (!result) {
        throw new Error(`Invalid day pillar: ${pillar.cheongan}${pillar.jiji} -- not one of 60 valid combinations`);
    }
    return result;
}
export const IljuInterpreter = {
    interpret: interpretIlju,
};
//# sourceMappingURL=IljuInterpreter.js.map