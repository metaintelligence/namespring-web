import { Cheongan } from '../../domain/Cheongan.js';
import { Jiji } from '../../domain/Jiji.js';
import { Ohaeng } from '../../domain/Ohaeng.js';
export interface JohuEntry {
    readonly primary: Ohaeng;
    readonly secondary: Ohaeng | null;
    readonly note: string;
}
export declare const JohuTable: {
    readonly lookup: (dayMaster: Cheongan, monthBranch: Jiji) => JohuEntry;
    readonly reasoning: (dayMaster: Cheongan, monthBranch: Jiji) => string;
};
//# sourceMappingURL=JohuTable.d.ts.map