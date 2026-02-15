import {
  flattenSignals,
  type CalculatorNode,
  type CalculatorSignal,
} from '../calculator/calculator-graph.js';
import { executeCalculatorNode } from '../calculator/calculator-graph.js';
import { FourFrameCalculator } from '../calculator/frame-calculator.js';
import { HangulCalculator } from '../calculator/hangul-calculator.js';
import { HanjaCalculator } from '../calculator/hanja-calculator.js';
import type { HanjaEntry } from '../database/hanja-repository.js';
import type { ElementKey } from './element-cycle.js';
import {
  ELEMENT_KEYS,
  clamp,
  distributionFromArrangement,
  emptyDistribution,
  isSangGeuk,
  isSangSaeng,
} from './element-cycle.js';
import {
  ELEMENT_ARRAY_BASE_SCORE,
  ELEMENT_ARRAY_SAME_PENALTY,
  ELEMENT_ARRAY_SANG_GEUK_PENALTY,
  ELEMENT_ARRAY_SANG_SAENG_BONUS,
  ELEMENT_BALANCE_BRACKETS,
  ELEMENT_BALANCE_FLOOR,
  ELEMENT_MAX_CONSECUTIVE_SAME,
  ELEMENT_SANG_SAENG_MIN_RATIO,
  FORTUNE_BUCKET_BAD,
  FORTUNE_BUCKET_DEFAULT,
  FORTUNE_BUCKET_GOOD,
  FORTUNE_BUCKET_HIGH,
  FORTUNE_BUCKET_TOP,
  FORTUNE_BUCKET_WORST,
  NODE_ADAPTIVE_MODE_THRESHOLD,
  NODE_ADAPTIVE_THRESHOLD_REDUCTION,
  NODE_ADAPTIVE_TWO_FAILURES_THRESHOLD,
  NODE_ADJACENCY_THRESHOLD_SINGLE_CHAR,
  NODE_ADJACENCY_THRESHOLD_TWO_CHAR,
  NODE_FORTUNE_BUCKET_PASS,
  NODE_FOUR_FRAME_ELEMENT_PASS,
  NODE_MANDATORY_GATE_SCORE,
  NODE_PRIORITY_PENALTY_DIVISOR,
  NODE_PRIORITY_PENALTY_WEIGHT,
  NODE_PRIORITY_SIGNAL_BASE,
  NODE_PRIORITY_SIGNAL_CONFIDENCE,
  NODE_PRONUNCIATION_ELEMENT_PASS,
  NODE_RELAXABLE_WEIGHT_REDUCTION,
  NODE_SAJU_WEIGHT_BOOST,
  NODE_SEVERE_FAILURE_THRESHOLD,
  NODE_STATS_BASE_SCORE,
  NODE_STRICT_PASS_THRESHOLD,
  NODE_STROKE_ELEMENT_PASS,
  POLARITY_BASE_SCORE,
  POLARITY_RATIO_BRACKETS,
  POLARITY_RATIO_FLOOR,
  SAJU_DEFAULT_CONFIDENCE,
} from './constants.js';
import { computeSajuNameScore } from './saju-scorer.js';
import type { SajuOutputSummary } from './saju-scorer.js';

// ====================================================================
// 1. Type Definitions
// ====================================================================

export type EvalFrame =
  | 'SEONGMYEONGHAK'
  | 'SAGYEOK_SURI'
  | 'SAJU_JAWON_BALANCE'
  | 'HOEKSU_EUMYANG'
  | 'BALEUM_OHAENG'
  | 'BALEUM_EUMYANG'
  | 'SAGYEOK_OHAENG'
  | 'HOEKSU_OHAENG'
  | 'JAWON_OHAENG'
  | 'EUMYANG'
  | 'STATISTICS';

export interface FrameInsight {
  frame: EvalFrame;
  score: number;
  isPassed: boolean;
  label: string;
  details: Record<string, unknown>;
}

interface EvaluationPipelineContext {
  surnameLength: number;
  givenLength: number;
  luckyMap: Map<number, string>;
  sajuDistribution: Record<ElementKey, number>;
  sajuDistributionSource: string;
  sajuOutput: SajuOutputSummary | null;
  fourFrameCalculator: FourFrameCalculator;
  hanjaCalculator: HanjaCalculator;
  hangulCalculator: HangulCalculator;
  insights: Partial<Record<EvalFrame, FrameInsight>>;
}

export interface EvaluationResult {
  score: number;
  isPassed: boolean;
  status: 'POSITIVE' | 'NEGATIVE';
  categoryMap: Record<string, FrameInsight>;
  categories: FrameInsight[];
}

type PolarityValue = 'Positive' | 'Negative';

// ====================================================================
// 2. Context Helpers
// ====================================================================

const SIGNAL_WEIGHT_MAJOR = 1.0;
const SIGNAL_WEIGHT_MINOR = 0.6;

function createInsight(
  frame: EvalFrame,
  score: number,
  isPassed: boolean,
  label: string,
  details: Record<string, unknown> = {},
): FrameInsight {
  return { frame, score, isPassed, label, details };
}

function setInsight(ctx: EvaluationPipelineContext, insight: FrameInsight): void {
  ctx.insights[insight.frame] = insight;
}

function mustInsight(ctx: EvaluationPipelineContext, frame: EvalFrame): FrameInsight {
  return ctx.insights[frame] ?? { frame, score: 0, isPassed: false, label: 'MISSING', details: {} };
}

function createSignal(
  frame: EvalFrame,
  insight: FrameInsight,
  weight: number,
): CalculatorSignal {
  return { key: frame, frame, score: insight.score, isPassed: insight.isPassed, weight };
}

function createSajuBaseDistribution(
  partial?: Partial<Record<ElementKey, number>>,
): Record<ElementKey, number> {
  const dist = emptyDistribution();
  if (partial) {
    for (const key of ELEMENT_KEYS) {
      if (partial[key] !== undefined) dist[key] = partial[key]!;
    }
  }
  return dist;
}

// ====================================================================
// 3. Rule Functions
// ====================================================================

function calculateArrayScore(arrangement: readonly ElementKey[], surnameLength = 1): number {
  if (arrangement.length < 2) return 100;
  let sangSaeng = 0;
  let sangGeuk = 0;
  let same = 0;
  for (let i = 0; i < arrangement.length - 1; i++) {
    if (surnameLength === 2 && i === 0) continue;
    const a = arrangement[i];
    const b = arrangement[i + 1];
    if (isSangSaeng(a, b)) sangSaeng++;
    else if (isSangGeuk(a, b)) sangGeuk++;
    else if (a === b) same++;
  }
  return clamp(
    ELEMENT_ARRAY_BASE_SCORE +
      sangSaeng * ELEMENT_ARRAY_SANG_SAENG_BONUS -
      sangGeuk * ELEMENT_ARRAY_SANG_GEUK_PENALTY -
      same * ELEMENT_ARRAY_SAME_PENALTY,
    0,
    100,
  );
}

function calculateBalanceScore(distribution: Readonly<Record<ElementKey, number>>): number {
  const total = ELEMENT_KEYS.reduce((acc, key) => acc + (distribution[key] ?? 0), 0);
  if (total === 0) return 0;
  const avg = total / 5;
  let deviation = 0;
  for (const key of ELEMENT_KEYS) {
    deviation += Math.abs((distribution[key] ?? 0) - avg);
  }
  for (const [threshold, score] of ELEMENT_BALANCE_BRACKETS) {
    if (deviation <= threshold) return score;
  }
  return ELEMENT_BALANCE_FLOOR;
}

function checkElementSangSaeng(arrangement: readonly ElementKey[], surnameLength: number): boolean {
  if (arrangement.length < 2) return true;
  const startIdx = surnameLength === 2 ? 1 : 0;
  for (let i = startIdx; i < arrangement.length - 1; i++) {
    if (isSangGeuk(arrangement[i], arrangement[i + 1])) return false;
  }
  const consecutiveStart = surnameLength === 2 ? 2 : 1;
  let consecutive = 1;
  for (let i = consecutiveStart; i < arrangement.length; i++) {
    if (arrangement[i] === arrangement[i - 1]) {
      consecutive++;
      if (consecutive >= ELEMENT_MAX_CONSECUTIVE_SAME) return false;
    } else {
      consecutive = 1;
    }
  }
  if (!(surnameLength === 2 && arrangement.length === 3)) {
    if (isSangGeuk(arrangement[0], arrangement[arrangement.length - 1])) return false;
  }
  let relationCount = 0;
  let sangSaengCount = 0;
  for (let i = 0; i < arrangement.length - 1; i++) {
    if (surnameLength === 2 && i === 0) continue;
    const a = arrangement[i];
    const b = arrangement[i + 1];
    if (a === b) continue;
    relationCount++;
    if (isSangSaeng(a, b)) sangSaengCount++;
  }
  if (relationCount > 0 && sangSaengCount / relationCount < ELEMENT_SANG_SAENG_MIN_RATIO) return false;
  return true;
}

function checkFourFrameSuriElement(arrangement: readonly ElementKey[], givenNameLength: number): boolean {
  const checked =
    givenNameLength === 1 && arrangement.length === 3
      ? arrangement.slice(0, 2)
      : arrangement.slice();
  if (checked.length < 2) return false;
  for (let i = 0; i < checked.length - 1; i++) {
    if (isSangGeuk(checked[i], checked[i + 1])) return false;
  }
  if (isSangGeuk(checked[checked.length - 1], checked[0])) return false;
  return new Set(checked).size > 1;
}

function countDominant(distribution: Record<ElementKey, number>): boolean {
  const total = ELEMENT_KEYS.reduce((acc, key) => acc + distribution[key], 0);
  const threshold = Math.floor(total / 2) + 1;
  return ELEMENT_KEYS.some((key) => distribution[key] >= threshold);
}

function checkPolarityHarmony(arrangement: readonly PolarityValue[], surnameLength: number): boolean {
  if (arrangement.length < 2) return true;
  const neg = arrangement.filter(v => v === 'Negative').length;
  const pos = arrangement.length - neg;
  if (neg === 0 || pos === 0) return false;
  if (surnameLength === 1 && arrangement[0] === arrangement[arrangement.length - 1]) return false;
  return true;
}

function polarityScore(negCount: number, posCount: number): number {
  const total = Math.max(0, negCount + posCount);
  if (total === 0) return 0;
  const minSide = Math.min(negCount, posCount);
  const ratio = minSide / total;
  let ratioScore = POLARITY_RATIO_FLOOR;
  for (const [threshold, score] of POLARITY_RATIO_BRACKETS) {
    if (ratio >= threshold) {
      ratioScore = score;
      break;
    }
  }
  return POLARITY_BASE_SCORE + ratioScore;
}

function bucketFromFortune(fortune: string): number {
  const f = fortune ?? '';
  if (f.includes('최상운수') || f.includes('최상')) return FORTUNE_BUCKET_TOP;
  if (f.includes('상운수') || f.includes('상')) return FORTUNE_BUCKET_HIGH;
  if (f.includes('양운수') || f.includes('양')) return FORTUNE_BUCKET_GOOD;
  if (f.includes('최흉운수') || f.includes('최흉')) return FORTUNE_BUCKET_WORST;
  if (f.includes('흉운수') || f.includes('흉')) return FORTUNE_BUCKET_BAD;
  return FORTUNE_BUCKET_DEFAULT;
}

function levelToFortune(level: string): string {
  return level;
}

// ====================================================================
// 4. Node Factories
// ====================================================================

// -- Element Node Factory --

function createElementNode(config: {
  id: string;
  frame: EvalFrame;
  signalWeight: number;
  getArrangement: (ctx: EvaluationPipelineContext) => ElementKey[];
  computePass: (
    ctx: EvaluationPipelineContext,
    distribution: Record<ElementKey, number>,
    adjacencyScore: number,
    balanceScore: number,
    score: number,
  ) => boolean;
}): CalculatorNode<EvaluationPipelineContext> {
  return {
    id: config.id,
    visit(ctx) {
      const arrangement = config.getArrangement(ctx);
      const distribution = distributionFromArrangement(arrangement);
      const adjacencyScore = calculateArrayScore(arrangement, ctx.surnameLength);
      const balance = calculateBalanceScore(distribution);
      const score = (balance + adjacencyScore) / 2;
      const isPassed = config.computePass(ctx, distribution, adjacencyScore, balance, score);
      setInsight(ctx, createInsight(config.frame, score, isPassed, arrangement.join('-'), {
        distribution, adjacencyScore, balanceScore: balance,
      }));
    },
    backward(ctx) {
      if (config.signalWeight === 0) return { nodeId: config.id, signals: [] };
      const insight = mustInsight(ctx, config.frame);
      return { nodeId: config.id, signals: [createSignal(config.frame, insight, config.signalWeight)] };
    },
  };
}

// -- Polarity Node Factory --

function createPolarityNode(config: {
  id: string;
  frame: EvalFrame;
  signalWeight: number;
  getArrangement: (ctx: EvaluationPipelineContext) => PolarityValue[];
}): CalculatorNode<EvaluationPipelineContext> {
  return {
    id: config.id,
    visit(ctx) {
      const arrangement = config.getArrangement(ctx);
      const negCount = arrangement.filter(v => v === 'Negative').length;
      const posCount = arrangement.length - negCount;
      const score = polarityScore(negCount, posCount);
      const isPassed = checkPolarityHarmony(arrangement, ctx.surnameLength);
      setInsight(ctx, createInsight(config.frame, score, isPassed, arrangement.join(''), { arrangementList: arrangement }));
    },
    backward(ctx) {
      const insight = mustInsight(ctx, config.frame);
      return { nodeId: config.id, signals: [createSignal(config.frame, insight, config.signalWeight)] };
    },
  };
}

// -- Concrete Nodes --

function createStrokeElementNode(): CalculatorNode<EvaluationPipelineContext> {
  return createElementNode({
    id: 'stroke-element',
    frame: 'HOEKSU_OHAENG',
    signalWeight: 0,
    getArrangement: (ctx) => ctx.hanjaCalculator.getStrokeElementArrangement() as ElementKey[],
    computePass: (_ctx, _dist, _adj, balanceScore) => balanceScore >= NODE_STROKE_ELEMENT_PASS,
  });
}

function createFourFrameElementNode(): CalculatorNode<EvaluationPipelineContext> {
  return createElementNode({
    id: 'four-frame-element',
    frame: 'SAGYEOK_OHAENG',
    signalWeight: SIGNAL_WEIGHT_MINOR,
    getArrangement: (ctx) => ctx.fourFrameCalculator.getCompatibilityElementArrangement() as ElementKey[],
    computePass: (ctx, distribution, adjacencyScore, _balanceScore, score) => {
      const threshold = ctx.surnameLength === 2 ? NODE_ADJACENCY_THRESHOLD_TWO_CHAR : NODE_ADJACENCY_THRESHOLD_SINGLE_CHAR;
      return (
        checkFourFrameSuriElement(ctx.fourFrameCalculator.getCompatibilityElementArrangement() as ElementKey[], ctx.givenLength) &&
        !countDominant(distribution) &&
        adjacencyScore >= threshold &&
        score >= NODE_FOUR_FRAME_ELEMENT_PASS
      );
    },
  });
}

function createPronunciationElementNode(): CalculatorNode<EvaluationPipelineContext> {
  return createElementNode({
    id: 'pronunciation-element',
    frame: 'BALEUM_OHAENG',
    signalWeight: SIGNAL_WEIGHT_MINOR,
    getArrangement: (ctx) => ctx.hangulCalculator.getPronunciationElementArrangement() as ElementKey[],
    computePass: (ctx, distribution, adjacencyScore, _balanceScore, score) => {
      const threshold = ctx.surnameLength === 2 ? NODE_ADJACENCY_THRESHOLD_TWO_CHAR : NODE_ADJACENCY_THRESHOLD_SINGLE_CHAR;
      const arrangement = ctx.hangulCalculator.getPronunciationElementArrangement() as ElementKey[];
      return (
        checkElementSangSaeng(arrangement, ctx.surnameLength) &&
        !countDominant(distribution) &&
        adjacencyScore >= threshold &&
        score >= NODE_PRONUNCIATION_ELEMENT_PASS
      );
    },
  });
}

function createStrokePolarityNode(): CalculatorNode<EvaluationPipelineContext> {
  return createPolarityNode({
    id: 'stroke-polarity',
    frame: 'HOEKSU_EUMYANG',
    signalWeight: SIGNAL_WEIGHT_MINOR,
    getArrangement: (ctx) => ctx.hanjaCalculator.getStrokePolarityArrangement() as PolarityValue[],
  });
}

function createPronunciationPolarityNode(): CalculatorNode<EvaluationPipelineContext> {
  return createPolarityNode({
    id: 'pronunciation-polarity',
    frame: 'BALEUM_EUMYANG',
    signalWeight: SIGNAL_WEIGHT_MINOR,
    getArrangement: (ctx) => ctx.hangulCalculator.getPronunciationPolarityArrangement() as PolarityValue[],
  });
}

// -- Four Frame Number Node --

function createFourFrameNumberNode(): CalculatorNode<EvaluationPipelineContext> {
  return {
    id: 'four-frame-number',
    visit(ctx) {
      const nums = ctx.fourFrameCalculator.getFrameNumbers();
      const getLucky = (num: number) => levelToFortune(ctx.luckyMap.get(num) ?? '');
      const wonF = getLucky(nums.won);
      const hyeongF = getLucky(nums.hyeong);
      const iF = getLucky(nums.i);
      const jeongF = getLucky(nums.jeong);
      const buckets = [bucketFromFortune(wonF), bucketFromFortune(hyeongF)];
      if (ctx.givenLength > 1) buckets.push(bucketFromFortune(iF));
      buckets.push(bucketFromFortune(jeongF));
      const score = buckets.reduce((a, b) => a + b, 0);
      const isPassed = buckets.length > 0 && buckets.every(v => v >= NODE_FORTUNE_BUCKET_PASS);
      setInsight(ctx, createInsight('SAGYEOK_SURI', score, isPassed,
        `${nums.won}/${wonF}-${nums.hyeong}/${hyeongF}-${nums.i}/${iF}-${nums.jeong}/${jeongF}`,
        { won: nums.won, hyeong: nums.hyeong, i: nums.i, jeong: nums.jeong }));
    },
    backward(ctx) {
      const insight = mustInsight(ctx, 'SAGYEOK_SURI');
      return { nodeId: 'four-frame-number', signals: [createSignal('SAGYEOK_SURI', insight, SIGNAL_WEIGHT_MAJOR)] };
    },
  };
}

// -- Saju Balance Node --

function createSajuBalanceNode(): CalculatorNode<EvaluationPipelineContext> {
  return {
    id: 'saju-balance',
    visit(ctx) {
      const rootArr = ctx.hanjaCalculator.getRootElementArrangement() as ElementKey[];
      const rootDist = distributionFromArrangement(rootArr);
      const sajuNameScore = computeSajuNameScore(ctx.sajuDistribution, rootDist, ctx.sajuOutput);
      setInsight(ctx, createInsight('SAJU_JAWON_BALANCE', sajuNameScore.score, sajuNameScore.isPassed, 'SAJU+JAWON', {
        sajuDistribution: ctx.sajuDistribution,
        sajuDistributionSource: ctx.sajuDistributionSource,
        jawonDistribution: rootDist,
        sajuJawonDistribution: sajuNameScore.combined,
        sajuScoring: sajuNameScore.breakdown,
        sajuOutput: ctx.sajuOutput,
      }));
    },
    backward(ctx) {
      const insight = mustInsight(ctx, 'SAJU_JAWON_BALANCE');
      return { nodeId: 'saju-balance', signals: [createSignal('SAJU_JAWON_BALANCE', insight, SIGNAL_WEIGHT_MAJOR)] };
    },
  };
}

// -- Statistics Node (placeholder) --

function createStatisticsNode(): CalculatorNode<EvaluationPipelineContext> {
  return {
    id: 'statistics',
    visit(ctx) {
      setInsight(ctx, createInsight('STATISTICS', NODE_STATS_BASE_SCORE, true, 'stats', { found: false }));
    },
    backward() {
      return { nodeId: 'statistics', signals: [] };
    },
  };
}

// -- Root Node --

type RelaxableFrame = 'SAGYEOK_SURI' | 'HOEKSU_EUMYANG' | 'BALEUM_OHAENG' | 'BALEUM_EUMYANG' | 'SAGYEOK_OHAENG';
const RELAXABLE_FRAMES = new Set<RelaxableFrame>(['SAGYEOK_SURI', 'HOEKSU_EUMYANG', 'BALEUM_OHAENG', 'BALEUM_EUMYANG', 'SAGYEOK_OHAENG']);
const STRICT_FRAMES: EvalFrame[] = ['SAGYEOK_SURI', 'SAJU_JAWON_BALANCE', 'HOEKSU_EUMYANG', 'BALEUM_OHAENG', 'BALEUM_EUMYANG', 'SAGYEOK_OHAENG'];

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function asFiniteNumber(value: unknown, fallback = 0): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function frameWeightMultiplier(frame: string, priority: number): number {
  if (frame === 'SAJU_JAWON_BALANCE') return 1 + priority * NODE_SAJU_WEIGHT_BOOST;
  if (RELAXABLE_FRAMES.has(frame as RelaxableFrame)) return 1 - priority * NODE_RELAXABLE_WEIGHT_REDUCTION;
  return 1;
}

function extractSajuPriority(ctx: EvaluationPipelineContext): number {
  const sajuInsight = ctx.insights.SAJU_JAWON_BALANCE;
  if (!sajuInsight) return 0;
  const details = asRecord(sajuInsight.details);
  const sajuScoring = asRecord(details?.sajuScoring);
  if (!sajuScoring) return 0;
  const balance = asFiniteNumber(sajuScoring.balance, 0);
  const yongshinVal = asFiniteNumber(sajuScoring.yongshin, 0);
  const penalties = asRecord(sajuScoring.penalties);
  const penaltyTotal = asFiniteNumber(penalties?.total, 0);
  const sajuOutput = asRecord(details?.sajuOutput);
  const yongshinOutput = asRecord(sajuOutput?.yongshin);
  const confidence = clamp(asFiniteNumber(yongshinOutput?.finalConfidence, SAJU_DEFAULT_CONFIDENCE), 0, 1);
  const signal = ((balance + yongshinVal) / 200) * (NODE_PRIORITY_SIGNAL_BASE + confidence * NODE_PRIORITY_SIGNAL_CONFIDENCE);
  const penalty = Math.min(1, penaltyTotal / NODE_PRIORITY_PENALTY_DIVISOR) * NODE_PRIORITY_PENALTY_WEIGHT;
  return clamp(signal - penalty, 0, 1);
}

interface AdjustedSignal extends CalculatorSignal { adjustedWeight: number; adjustedWeighted: number; }

function adjustSignals(signals: CalculatorSignal[], sajuPriority: number): AdjustedSignal[] {
  return signals.map(s => {
    const multiplier = frameWeightMultiplier(s.frame, sajuPriority);
    const adjustedWeight = s.weight * multiplier;
    return { ...s, adjustedWeight, adjustedWeighted: s.score * adjustedWeight };
  });
}

function computeWeightedScore(signals: AdjustedSignal[]): number {
  const totalWeight = signals.reduce((acc, s) => acc + s.adjustedWeight, 0);
  return totalWeight > 0 ? signals.reduce((acc, s) => acc + s.adjustedWeighted, 0) / totalWeight : 0;
}

function createRootNode(): CalculatorNode<EvaluationPipelineContext> {
  return {
    id: 'root',
    createChildren(): CalculatorNode<EvaluationPipelineContext>[] {
      return [
        createFourFrameNumberNode(),
        createStrokeElementNode(),
        createFourFrameElementNode(),
        createPronunciationElementNode(),
        createStrokePolarityNode(),
        createPronunciationPolarityNode(),
        createSajuBalanceNode(),
        createStatisticsNode(),
      ];
    },
    backward(ctx, childPackets) {
      const weightedSignals = flattenSignals(childPackets).filter(s => s.weight > 0);
      const sajuPriority = extractSajuPriority(ctx);
      const adjusted = adjustSignals(weightedSignals, sajuPriority);
      const weightedScore = computeWeightedScore(adjusted);

      const adaptiveMode = sajuPriority >= NODE_ADAPTIVE_MODE_THRESHOLD;
      const relaxableFailures = adjusted.filter(s => RELAXABLE_FRAMES.has(s.frame as RelaxableFrame) && !s.isPassed);
      const allowedFailures = adaptiveMode ? (sajuPriority >= NODE_ADAPTIVE_TWO_FAILURES_THRESHOLD ? 2 : 1) : 0;
      const threshold = adaptiveMode ? NODE_STRICT_PASS_THRESHOLD - NODE_ADAPTIVE_THRESHOLD_REDUCTION * sajuPriority : NODE_STRICT_PASS_THRESHOLD;

      let isPassed: boolean;
      if (adaptiveMode) {
        const sajuI = mustInsight(ctx, 'SAJU_JAWON_BALANCE');
        const fourFrameI = mustInsight(ctx, 'SAGYEOK_SURI');
        isPassed = sajuI.isPassed && fourFrameI.score >= NODE_MANDATORY_GATE_SCORE &&
          weightedScore >= threshold &&
          !relaxableFailures.some(s => s.score < NODE_SEVERE_FAILURE_THRESHOLD) &&
          relaxableFailures.length <= allowedFailures;
      } else {
        isPassed = STRICT_FRAMES.every(frame => mustInsight(ctx, frame).isPassed) && weightedScore >= NODE_STRICT_PASS_THRESHOLD;
      }

      setInsight(ctx, createInsight('SEONGMYEONGHAK', weightedScore, isPassed, 'ROOT', {
        contributions: Object.fromEntries(adjusted.map(s => [s.frame, {
          rawScore: s.score, weight: s.weight,
          weightMultiplier: s.weight > 0 ? s.adjustedWeight / s.weight : 1,
          adjustedWeight: s.adjustedWeight, weighted: s.adjustedWeighted, isPassed: s.isPassed,
        }])),
        failedFrames: adjusted.filter(s => !s.isPassed).map(s => s.frame),
        adaptivePolicy: { mode: adaptiveMode ? 'adaptive' : 'strict', sajuPriority, allowedFailures, threshold, relaxableFailures: relaxableFailures.map(s => s.frame) },
      }));

      return { nodeId: 'root', signals: [createSignal('SEONGMYEONGHAK', mustInsight(ctx, 'SEONGMYEONGHAK'), 0)] };
    },
  };
}

// ====================================================================
// 5. NameEvaluator Class
// ====================================================================

const ORDERED_FRAMES: EvalFrame[] = [
  'SEONGMYEONGHAK', 'SAGYEOK_SURI', 'SAJU_JAWON_BALANCE',
  'HOEKSU_EUMYANG', 'BALEUM_OHAENG', 'BALEUM_EUMYANG', 'SAGYEOK_OHAENG',
];

const UNIQUE_FRAMES: EvalFrame[] = [
  'SEONGMYEONGHAK', 'SAGYEOK_SURI', 'SAJU_JAWON_BALANCE',
  'HOEKSU_EUMYANG', 'BALEUM_OHAENG', 'BALEUM_EUMYANG',
  'SAGYEOK_OHAENG', 'HOEKSU_OHAENG', 'STATISTICS',
];

const FRAME_ALIASES: [EvalFrame, EvalFrame][] = [
  ['JAWON_OHAENG', 'HOEKSU_OHAENG'],
  ['EUMYANG', 'HOEKSU_EUMYANG'],
];

export class NameEvaluator {
  private readonly luckyMap: Map<number, string>;
  private readonly sajuFallbackDistribution: Record<ElementKey, number>;

  constructor(
    luckyMap: Map<number, string>,
    sajuBaseDistribution?: Partial<Record<ElementKey, number>>,
  ) {
    this.luckyMap = luckyMap;
    this.sajuFallbackDistribution = createSajuBaseDistribution(sajuBaseDistribution);
  }

  evaluate(
    surnameEntries: HanjaEntry[],
    givenNameEntries: HanjaEntry[],
    sajuDistribution?: Record<ElementKey, number>,
    sajuOutput?: SajuOutputSummary | null,
  ): EvaluationResult {
    const fourFrameCalculator = new FourFrameCalculator(surnameEntries, givenNameEntries);
    const hanjaCalculator = new HanjaCalculator(surnameEntries, givenNameEntries);
    const hangulCalculator = new HangulCalculator(surnameEntries, givenNameEntries);
    fourFrameCalculator.calculate();
    hanjaCalculator.calculate();
    hangulCalculator.calculate();

    const ctx: EvaluationPipelineContext = {
      surnameLength: surnameEntries.length,
      givenLength: givenNameEntries.length,
      luckyMap: this.luckyMap,
      sajuDistribution: sajuDistribution ?? this.sajuFallbackDistribution,
      sajuDistributionSource: sajuDistribution ? 'saju-ts' : 'fallback',
      sajuOutput: sajuOutput ?? null,
      fourFrameCalculator,
      hanjaCalculator,
      hangulCalculator,
      insights: {},
    };

    executeCalculatorNode(createRootNode(), ctx);

    const categoryMap: Record<string, FrameInsight> = {};
    for (const frame of UNIQUE_FRAMES) {
      categoryMap[frame] = mustInsight(ctx, frame);
    }
    for (const [alias, target] of FRAME_ALIASES) {
      categoryMap[alias] = categoryMap[target];
    }

    const seongmyeonghak = categoryMap.SEONGMYEONGHAK;
    const categories = ORDERED_FRAMES.map(frame => categoryMap[frame]);

    return {
      score: seongmyeonghak.score,
      isPassed: seongmyeonghak.isPassed,
      status: seongmyeonghak.isPassed ? 'POSITIVE' : 'NEGATIVE',
      categoryMap,
      categories,
    };
  }
}
