import type { AnalysisBundle, EngineConfig, SajuRequest } from './types.js';
export interface Engine {
    config: EngineConfig;
    analyze(request: SajuRequest): AnalysisBundle;
}
export declare function createEngine(config?: Partial<EngineConfig>): Engine;
