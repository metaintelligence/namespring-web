// Engine (main entry points)
export { SeedEngine } from './engine.js';
export { SeedTs } from './seed.js';

// Stable API types
export type {
  SeedRequest, SeedResponse, SeedCandidate, SeedOptions,
  BirthInfo, NameCharInput, ScoreWeights,
  SajuSummary, PillarSummary, CharDetail,
  HangulAnalysis, HanjaAnalysis, FourFrameAnalysis, SajuCompatibility,
} from './types.js';

// Backward-compat types
export type { UserInfo, NamingResult, SeedResult, Gender, BirthDateTime } from './types.js';

// Database (used directly by UI)
export { HanjaRepository } from './database/hanja-repository.js';
export type { HanjaEntry } from './database/hanja-repository.js';
export { FourframeRepository } from './database/fourframe-repository.js';
export type { FourframeMeaningEntry } from './database/fourframe-repository.js';
export { NameStatRepository } from './database/name-stat-repository.js';
export type { NameStatEntry } from './database/name-stat-repository.js';

// Calculator (advanced usage — keep existing exports)
export { EnergyCalculator } from './calculator/energy-calculator.js';
export type { AnalysisDetail } from './calculator/energy-calculator.js';
export { FourFrameCalculator, Frame } from './calculator/frame-calculator.js';
export { HangulCalculator, HangulNameBlock } from './calculator/hangul-calculator.js';
export { HanjaCalculator, HanjaNameBlock } from './calculator/hanja-calculator.js';
export { SajuCalculator } from './calculator/saju-calculator.js';
export type { SajuContext } from './calculator/saju-calculator.js';

// Calculator graph
export { executeCalculatorNode, flattenSignals } from './calculator/calculator-graph.js';
export type { CalculatorNode, CalculatorSignal, CalculatorPacket } from './calculator/calculator-graph.js';

// Evaluator (advanced usage — minimal surface from new structure)
export { NameEvaluator } from './evaluator/evaluator.js';
export type { EvaluationResult, EvalFrame, FrameInsight } from './evaluator/evaluator.js';
export type { ElementKey } from './evaluator/element-cycle.js';
export type { SajuNameScoreResult, SajuOutputSummary } from './evaluator/saju-scorer.js';

// Search
export { FourFrameOptimizer } from './evaluator/search.js';
export { MinHeap } from './evaluator/search.js';

// Model
export { Element } from './model/element.js';
export { Energy } from './model/energy.js';
export { Polarity } from './model/polarity.js';
