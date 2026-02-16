import { Cheongan } from './Cheongan.js';
import { Jiji } from './Jiji.js';
export declare class Pillar {
    readonly cheongan: Cheongan;
    readonly jiji: Jiji;
    constructor(cheongan: Cheongan, jiji: Jiji);
    get label(): string;
    equals(other: Pillar): boolean;
    toString(): string;
}
//# sourceMappingURL=Pillar.d.ts.map