import { FourFrameCalculator } from './calculator/frame-calculator.js';
import { HangulCalculator } from './calculator/hangul-calculator.js';
import { HanjaCalculator } from './calculator/hanja-calculator.js';
import { SeedEngine } from './engine.js';
import type { UserInfo, NamingResult, SeedResult, SeedRequest, SeedResponse } from './types.js';

/** Score-to-interpretation thresholds (descending). */
const TOTAL_BANDS: [number, string][] = [
  [85, '종합적으로 매우 우수한 이름입니다.'],
  [70, '종합적으로 좋은 이름입니다.'],
  [55, '보통 수준의 이름입니다.'],
  [0,  '개선 여지가 있는 이름입니다.'],
];

const SUB_HINTS: [string, number, string, number, string][] = [
  ['hangul',    80, '음령오행(발음) 조화가 뛰어납니다.',           50, '음령오행의 음양 균형을 점검해 보세요.'],
  ['hanja',     80, '자원오행(한자) 배합이 우수합니다.',           50, '자원오행의 상생/상극 관계를 확인해 보세요.'],
  ['fourFrame', 80, '사격수리 배치가 길합니다.',                   50, '사격수리에서 흉수가 포함되어 있습니다.'],
];

function interpret(scores: Record<string, number>): string {
  const parts = [TOTAL_BANDS.find(([min]) => scores.total >= min)![1]];
  for (const [key, hi, good, lo, warn] of SUB_HINTS) {
    if (scores[key] >= hi) parts.push(good);
    else if (scores[key] < lo) parts.push(warn);
  }
  return parts.join(' ');
}

/**
 * SeedTs -- Backward-compatible wrapper for the existing UI.
 *
 * - analyze()      : synchronous, uses calculators directly (no DB lookups).
 * - analyzeAsync() : async bridge to the full SeedEngine evaluator pipeline.
 */
export class SeedTs {
  /** Synchronous analysis for existing UI compatibility. */
  analyze(userInfo: UserInfo): SeedResult {
    const { lastName, firstName } = userInfo;

    const calcs = [
      new HangulCalculator(lastName, firstName),
      new HanjaCalculator(lastName, firstName),
      new FourFrameCalculator(lastName, firstName),
    ] as const;
    for (const c of calcs) c.calculate();
    const [hangul, hanja, fourFrame] = calcs.map(c => c.getScore());
    const total = (hangul + hanja + fourFrame) / 3;

    const result: NamingResult = {
      lastName,
      firstName,
      totalScore: Math.round(total * 10) / 10,
      hangul: calcs[0],
      hanja: calcs[1],
      fourFrames: calcs[2],
      interpretation: interpret({ total, hangul, hanja, fourFrame }),
    };
    return { candidates: [result], totalCount: 1 };
  }

  /** Async bridge to SeedEngine for the full evaluator pipeline. */
  async analyzeAsync(request: SeedRequest): Promise<SeedResponse> {
    const engine = new SeedEngine();
    try { return await engine.analyze(request); }
    finally { engine.close(); }
  }
}
