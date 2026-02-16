import { Cheongan } from '../domain/Cheongan.js';
import { Jiji } from '../domain/Jiji.js';
export type IljuAdd = (c: Cheongan, j: Jiji, nickname: string, personality: string, relationships: string, career: string, health: string, lifePath: string) => void;
export declare function registerIljuCatalog(add: IljuAdd): void;
//# sourceMappingURL=IljuInterpretationCatalog.d.ts.map