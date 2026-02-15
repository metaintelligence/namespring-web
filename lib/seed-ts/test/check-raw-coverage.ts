/**
 * raw(SajuAnalysis) 전체 키 vs SajuSummary 추출 누락 체크
 * npx tsx test/check-raw-coverage.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '../../../namespring/public/data');
const WASM_PATH = path.resolve(__dirname, '../node_modules/sql.js/dist/sql-wasm.wasm');

const originalFetch = globalThis.fetch;
(globalThis as any).fetch = async (url: string | URL | Request, opts?: any) => {
  const u = typeof url === 'string' ? url : url instanceof URL ? url.toString() : '';
  if (u.startsWith('/data/')) {
    const fp = path.join(DATA_DIR, u.replace('/data/', ''));
    if (!fs.existsSync(fp)) return new Response(null, { status: 404 });
    return new Response(fs.readFileSync(fp), { status: 200 });
  }
  return originalFetch(url as any, opts);
};

import { SeedEngine } from '../src/calculator/engine.js';

const engine = new SeedEngine();
for (const r of [(engine as any).hanjaRepo, (engine as any).fourFrameRepo, (engine as any).nameStatRepo])
  if (r) (r as any).wasmUrl = WASM_PATH;

try {
  const resp = await engine.analyze({
    birth: { year: 1986, month: 4, day: 19, hour: 5, minute: 45, gender: 'male' },
    surname: [{ hangul: '최', hanja: '崔' }],
    givenName: [{ hangul: '성', hanja: '成' }, { hangul: '수', hanja: '秀' }],
    mode: 'evaluate',
  });

  const saju = resp.saju;
  const raw = saju.raw as Record<string, unknown>;

  function typeDesc(v: unknown): string {
    if (v === null) return 'null';
    if (v === undefined) return 'undefined';
    if (Array.isArray(v)) return `array[${v.length}]`;
    if (typeof v === 'object') return `object{${Object.keys(v as any).length}}`;
    return typeof v;
  }

  // ═══ 1. raw 최상위 키 ═══
  console.log('━'.repeat(70));
  console.log('  1. raw (SajuAnalysis) 최상위 키');
  console.log('━'.repeat(70));
  const rawKeys = Object.keys(raw).sort();
  for (const k of rawKeys) console.log(`  ${k.padEnd(35)} ${typeDesc(raw[k])}`);

  // ═══ 2. SajuSummary 키 ═══
  console.log('\n' + '━'.repeat(70));
  console.log('  2. SajuSummary 구조화 키');
  console.log('━'.repeat(70));
  const summaryKeys = Object.keys(saju).filter(k => k !== 'raw').sort();
  for (const k of summaryKeys) console.log(`  ${k.padEnd(35)} ${typeDesc((saju as any)[k])}`);

  // ═══ 3. 매핑 분석 ═══
  console.log('\n' + '━'.repeat(70));
  console.log('  3. raw 키 → SajuSummary 매핑 상태');
  console.log('━'.repeat(70));

  // Known mappings: raw key → where it goes in SajuSummary
  const mapping: Record<string, string | null> = {
    input: null, // 입력 원본, 추출 불필요
    coreResult: 'timeCorrection (adjustedYear/Month/Day/Hour/Minute, dst/lmt/eot 보정)',
    pillars: 'pillars (year/month/day/hour)',
    cheonganRelations: 'cheonganRelations',
    hapHwaEvaluations: 'hapHwaEvaluations',
    scoredCheonganRelations: null, // 체크 필요
    resolvedJijiRelations: 'jijiRelations (우선 소스)',
    jijiRelations: 'jijiRelations (fallback 소스)',
    sibiUnseong: 'sibiUnseong',
    gongmangVoidBranches: 'gongmang',
    strengthResult: 'dayMaster + strength',
    yongshinResult: 'yongshin',
    gyeokgukResult: 'gyeokguk',
    tenGodAnalysis: 'tenGodAnalysis',
    shinsalHits: 'shinsalHits (fallback)',
    weightedShinsalHits: 'shinsalHits (우선 소스, weight 포함)',
    shinsalComposites: 'shinsalComposites',
    palaceAnalysis: 'palaceAnalysis',
    daeunInfo: 'daeunInfo',
    saeunPillars: 'saeunPillars',
    ohaengDistribution: 'ohaengDistribution + deficientElements + excessiveElements',
    trace: 'trace',
    analysisResults: null, // 체크 필요
  };

  for (const k of rawKeys) {
    const m = mapping[k];
    if (m === undefined) {
      console.log(`  ❌ NOT MAPPED  raw.${k}`);
    } else if (m === null) {
      console.log(`  ⏭️  SKIP       raw.${k.padEnd(25)} (입력 원본 또는 중복)`);
    } else {
      console.log(`  ✅ MAPPED     raw.${k.padEnd(25)} → ${m}`);
    }
  }

  // ═══ 4. 매핑되지 않은 raw 키 상세 분석 ═══
  const unmapped = rawKeys.filter(k => mapping[k] === undefined);
  if (unmapped.length > 0) {
    console.log('\n' + '━'.repeat(70));
    console.log('  4. ❌ 매핑 안된 raw 키 상세');
    console.log('━'.repeat(70));
    for (const k of unmapped) {
      console.log(`\n  raw.${k}:`);
      const v = raw[k];
      console.log(JSON.stringify(v, null, 2).split('\n').map(l => '    ' + l).join('\n'));
    }
  }

  // ═══ 5. scoredCheonganRelations 상세 ═══
  const scr = raw.scoredCheonganRelations;
  if (Array.isArray(scr) && scr.length > 0) {
    console.log('\n' + '━'.repeat(70));
    console.log('  5. raw.scoredCheonganRelations — cheonganRelations와 비교');
    console.log('━'.repeat(70));
    console.log(`  scoredCheonganRelations: ${scr.length}건`);
    console.log(`  cheonganRelations (구조화): ${saju.cheonganRelations.length}건`);
    console.log('\n  scoredCheonganRelations[0]:');
    console.log(JSON.stringify(scr[0], null, 2).split('\n').map(l => '    ' + l).join('\n'));

    // 어떤 추가 필드가 있는가?
    const scrKeys = new Set<string>();
    for (const item of scr) for (const k of Object.keys(item as any)) scrKeys.add(k);
    console.log(`\n  scoredCheonganRelations 키: ${[...scrKeys].join(', ')}`);
  }

  // ═══ 6. analysisResults 내부 키 ═══
  const ar = raw.analysisResults;
  if (ar && typeof ar === 'object') {
    console.log('\n' + '━'.repeat(70));
    console.log('  6. raw.analysisResults 내부 키');
    console.log('━'.repeat(70));
    const arKeys = Object.keys(ar as Record<string, unknown>).sort();
    for (const k of arKeys) console.log(`    ${k.padEnd(35)} ${typeDesc((ar as any)[k])}`);

    // analysisResults와 raw 최상위 중복 체크
    console.log('\n  analysisResults 키가 raw 최상위에도 있는가?');
    for (const k of arKeys) {
      const inTop = rawKeys.includes(k) || rawKeys.includes(k + 'Result');
      console.log(`    ${k.padEnd(30)} ${inTop ? '✅ 중복 (이미 최상위에 존재)' : '❌ 최상위에 없음 — 누락 가능!'}`);
    }
  }

  // ═══ 7. coreResult 내부 키 — timeCorrection 추출 완전성 ═══
  const cr = raw.coreResult;
  if (cr && typeof cr === 'object') {
    console.log('\n' + '━'.repeat(70));
    console.log('  7. raw.coreResult 내부 키 vs timeCorrection 추출');
    console.log('━'.repeat(70));
    const crKeys = Object.keys(cr as Record<string, unknown>).sort();
    for (const k of crKeys) console.log(`    ${k.padEnd(35)} ${typeDesc((cr as any)[k])}`);
    console.log('\n  timeCorrection (추출됨):');
    console.log(JSON.stringify(saju.timeCorrection, null, 2).split('\n').map(l => '    ' + l).join('\n'));
  }

  // ═══ 8. strengthResult 내부 키 ═══
  const sr = raw.strengthResult;
  if (sr && typeof sr === 'object') {
    console.log('\n' + '━'.repeat(70));
    console.log('  8. raw.strengthResult 내부 키 vs strength 추출');
    console.log('━'.repeat(70));
    const srKeys = Object.keys(sr as Record<string, unknown>).sort();
    for (const k of srKeys) console.log(`    ${k.padEnd(35)} ${typeDesc((sr as any)[k])}`);
    console.log('\n  strength (추출됨):');
    console.log(JSON.stringify(saju.strength, null, 2).split('\n').map(l => '    ' + l).join('\n'));

    // dayMaster
    console.log('\n  dayMaster (추출됨):');
    console.log(JSON.stringify(saju.dayMaster, null, 2).split('\n').map(l => '    ' + l).join('\n'));

    // raw.strengthResult.dayMaster
    console.log('\n  raw.strengthResult.dayMaster:');
    console.log(`    ${JSON.stringify((sr as any).dayMaster)}`);
  }

  // ═══ 9. yongshinResult 내부 키 ═══
  const yr = raw.yongshinResult;
  if (yr && typeof yr === 'object') {
    console.log('\n' + '━'.repeat(70));
    console.log('  9. raw.yongshinResult 내부 키 vs yongshin 추출');
    console.log('━'.repeat(70));
    const yrKeys = Object.keys(yr as Record<string, unknown>).sort();
    for (const k of yrKeys) console.log(`    ${k.padEnd(35)} ${typeDesc((yr as any)[k])}`);
    console.log('\n  yongshin (추출됨):');
    console.log(JSON.stringify(saju.yongshin, null, 2).split('\n').map(l => '    ' + l).join('\n'));
  }

  console.log('\n' + '━'.repeat(70));
  console.log('  DONE');
  console.log('━'.repeat(70));

} finally {
  engine.close();
}
