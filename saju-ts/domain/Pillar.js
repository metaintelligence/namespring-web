import { CHEONGAN_INFO } from './Cheongan.js';
import { JIJI_INFO } from './Jiji.js';
export class Pillar {
    cheongan;
    jiji;
    constructor(cheongan, jiji) {
        this.cheongan = cheongan;
        this.jiji = jiji;
    }
    get label() {
        const ci = CHEONGAN_INFO[this.cheongan];
        const ji = JIJI_INFO[this.jiji];
        return `${ci.hangul}${ci.hanja}${ji.hangul}${ji.hanja}`;
    }
    equals(other) {
        return this.cheongan === other.cheongan && this.jiji === other.jiji;
    }
    toString() {
        return this.label;
    }
}
//# sourceMappingURL=Pillar.js.map