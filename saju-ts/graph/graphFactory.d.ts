import type { Graph } from './types.js';
import { lifeStageOf } from '../core/lifeStage.js';
export type LifeStageDetail = ReturnType<typeof lifeStageOf>;
export declare function buildGraph(): Graph;
