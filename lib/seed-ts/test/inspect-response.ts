/**
 * 전체 SeedResponse 딥 인스펙션 스크립트
 * - 실제 request → response 전체 출력
 * - null/undefined/빈문자열/하드코딩 의심값 탐지
 *
 * npx tsx test/inspect-response.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '../../../namespring/public/data');
const SEED_TS_DIR = path.resolve(__dirname, '..');
const WASM_PATH = path.resolve(SEED_TS_DIR, 'node_modules/sql.js/dist/sql-wasm.wasm');

// ── Patch fetch() for Node.js ──
const originalFetch = globalThis.fetch;
(globalThis as any).fetch = async (url: string | URL | Request, options?: any) => {
  const urlStr = typeof url === 'string' ? url : url instanceof URL ? url.toString() : '';
  if (urlStr.startsWith('/data/')) {
    const filePath = path.join(DATA_DIR, urlStr.replace('/data/', ''));
    if (!fs.existsSync(filePath)) {
      return new Response(null, { status: 404, statusText: `Not found: ${filePath}` });
    }
    const data = fs.readFileSync(filePath);
    return new Response(data, { status: 200, headers: { 'Content-Type': 'application/octet-stream' } });
  }
  return originalFetch(url as any, options);
};

import { SeedEngine } from '../src/calculator/engine.js';

// ── Deep inspection utilities ──
interface Issue {
  path: string;
  type: 'null' | 'undefined' | 'empty_string' | 'empty_array' | 'empty_object' | 'zero' | 'suspect_default';
  value: unknown;
}

function deepInspect(obj: unknown, prefix: string, issues: Issue[]): void {
  if (obj === null) {
    issues.push({ path: prefix, type: 'null', value: obj });
    return;
  }
  if (obj === undefined) {
    issues.push({ path: prefix, type: 'undefined', value: obj });
    return;
  }
  if (typeof obj === 'string') {
    if (obj === '') issues.push({ path: prefix, type: 'empty_string', value: obj });
    return;
  }
  if (typeof obj === 'number') {
    if (obj === 0) issues.push({ path: prefix, type: 'zero', value: obj });
    return;
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) issues.push({ path: prefix, type: 'empty_array', value: obj });
    for (let i = 0; i < obj.length; i++) {
      deepInspect(obj[i], `${prefix}[${i}]`, issues);
    }
    return;
  }
  if (typeof obj === 'object') {
    const keys = Object.keys(obj as Record<string, unknown>);
    if (keys.length === 0) issues.push({ path: prefix, type: 'empty_object', value: obj });
    for (const k of keys) {
      deepInspect((obj as any)[k], `${prefix}.${k}`, issues);
    }
  }
}

// ── Main ──
const engine = new SeedEngine();
const repos = [
  (engine as any).hanjaRepo,
  (engine as any).fourFrameRepo,
  (engine as any).nameStatRepo,
];
for (const repo of repos) {
  if (repo && typeof repo === 'object') {
    (repo as any).wasmUrl = WASM_PATH;
  }
}

try {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 1. evaluate 모드 — 최성수
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('━'.repeat(70));
  console.log('  1. EVALUATE: 최성수 (1986-04-19 05:45 male)');
  console.log('━'.repeat(70));

  const evalResp = await engine.analyze({
    birth: { year: 1986, month: 4, day: 19, hour: 5, minute: 45, gender: 'male' },
    surname: [{ hangul: '최', hanja: '崔' }],
    givenName: [{ hangul: '성', hanja: '成' }, { hangul: '수', hanja: '秀' }],
    mode: 'evaluate',
  });

  // ── SajuSummary 전체 출력 ──
  console.log('\n[A] SajuSummary 전체:');
  console.log(JSON.stringify(evalResp.saju, null, 2));

  // ── Candidate 전체 출력 ──
  if (evalResp.candidates.length > 0) {
    const c = evalResp.candidates[0];
    console.log('\n[B] Candidate (최성수) 전체:');
    console.log(JSON.stringify(c, null, 2));
  }

  // ── Meta 출력 ──
  console.log('\n[C] Meta:');
  console.log(JSON.stringify(evalResp.meta, null, 2));
  console.log(`mode: ${evalResp.mode}, totalCount: ${evalResp.totalCount}`);

  // ── Deep inspection: SajuSummary ──
  console.log('\n' + '─'.repeat(70));
  console.log('  DEEP INSPECTION: SajuSummary');
  console.log('─'.repeat(70));
  const sajuIssues: Issue[] = [];
  deepInspect(evalResp.saju, 'saju', sajuIssues);

  // null은 saju-ts에서 선택적 필드일 수 있으므로 정보 제공 레벨
  const sajuNulls = sajuIssues.filter(i => i.type === 'null');
  const sajuUndefs = sajuIssues.filter(i => i.type === 'undefined');
  const sajuEmpties = sajuIssues.filter(i => ['empty_string', 'empty_array', 'empty_object'].includes(i.type));
  const sajuZeros = sajuIssues.filter(i => i.type === 'zero');

  if (sajuUndefs.length) {
    console.log(`\n⚠️  UNDEFINED (${sajuUndefs.length}):`);
    sajuUndefs.forEach(i => console.log(`    ${i.path}`));
  }
  if (sajuNulls.length) {
    console.log(`\nℹ️  NULL (${sajuNulls.length}) — saju-ts 선택 필드 가능:`);
    sajuNulls.forEach(i => console.log(`    ${i.path}`));
  }
  if (sajuEmpties.length) {
    console.log(`\n⚠️  EMPTY (${sajuEmpties.length}):`);
    sajuEmpties.forEach(i => console.log(`    ${i.path} [${i.type}]`));
  }
  if (sajuZeros.length) {
    console.log(`\nℹ️  ZERO (${sajuZeros.length}):`);
    sajuZeros.forEach(i => console.log(`    ${i.path}`));
  }
  if (!sajuUndefs.length && !sajuEmpties.length) {
    console.log('\n✅ SajuSummary — undefined/empty 없음');
  }

  // ── Deep inspection: Candidate ──
  if (evalResp.candidates.length > 0) {
    console.log('\n' + '─'.repeat(70));
    console.log('  DEEP INSPECTION: Candidate[0]');
    console.log('─'.repeat(70));
    const candIssues: Issue[] = [];
    deepInspect(evalResp.candidates[0], 'candidate', candIssues);

    const candUndefs = candIssues.filter(i => i.type === 'undefined');
    const candNulls = candIssues.filter(i => i.type === 'null');
    const candEmpties = candIssues.filter(i => ['empty_string', 'empty_array', 'empty_object'].includes(i.type));
    const candZeros = candIssues.filter(i => i.type === 'zero');

    if (candUndefs.length) {
      console.log(`\n⚠️  UNDEFINED (${candUndefs.length}):`);
      candUndefs.forEach(i => console.log(`    ${i.path}`));
    }
    if (candNulls.length) {
      console.log(`\nℹ️  NULL (${candNulls.length}):`);
      candNulls.forEach(i => console.log(`    ${i.path}`));
    }
    if (candEmpties.length) {
      console.log(`\n⚠️  EMPTY (${candEmpties.length}):`);
      candEmpties.forEach(i => console.log(`    ${i.path} [${i.type}]`));
    }
    if (candZeros.length) {
      console.log(`\nℹ️  ZERO (${candZeros.length}):`);
      candZeros.forEach(i => console.log(`    ${i.path}`));
    }
    if (!candUndefs.length && !candEmpties.length) {
      console.log('\n✅ Candidate — undefined/empty 없음');
    }
  }

  // ── Saju 핵심 필드 존재 여부 직접 체크 ──
  console.log('\n' + '─'.repeat(70));
  console.log('  SAJU KEY FIELD CHECK');
  console.log('─'.repeat(70));
  const s = evalResp.saju;
  const checks: [string, unknown][] = [
    ['pillars.year.stem.code', s.pillars?.year?.stem?.code],
    ['pillars.year.branch.code', s.pillars?.year?.branch?.code],
    ['pillars.month.stem.code', s.pillars?.month?.stem?.code],
    ['pillars.day.stem.code', s.pillars?.day?.stem?.code],
    ['pillars.hour.stem.code', s.pillars?.hour?.stem?.code],
    ['dayMaster.stem', s.dayMaster?.stem],
    ['dayMaster.element', s.dayMaster?.element],
    ['strength.level', s.strength?.level],
    ['strength.isStrong', s.strength?.isStrong],
    ['strength.totalSupport', s.strength?.totalSupport],
    ['strength.totalOppose', s.strength?.totalOppose],
    ['yongshin.element', s.yongshin?.element],
    ['yongshin.heeshin', s.yongshin?.heeshin],
    ['yongshin.confidence', s.yongshin?.confidence],
    ['yongshin.recommendations.length', s.yongshin?.recommendations?.length],
    ['gyeokguk.type', s.gyeokguk?.type],
    ['gyeokguk.category', s.gyeokguk?.category],
    ['ohaengDistribution keys', s.ohaengDistribution ? Object.keys(s.ohaengDistribution).join(',') : 'MISSING'],
    ['deficientElements', s.deficientElements],
    ['excessiveElements', s.excessiveElements],
    ['timeCorrection.adjustedYear', s.timeCorrection?.adjustedYear],
    ['cheonganRelations.length', s.cheonganRelations?.length],
    ['hapHwaEvaluations.length', s.hapHwaEvaluations?.length],
    ['jijiRelations.length', s.jijiRelations?.length],
    ['sibiUnseong', s.sibiUnseong ? Object.keys(s.sibiUnseong).join(',') : 'null/missing'],
    ['gongmang', s.gongmang],
    ['tenGodAnalysis.dayMaster', s.tenGodAnalysis?.dayMaster],
    ['tenGodAnalysis.byPosition keys', s.tenGodAnalysis?.byPosition ? Object.keys(s.tenGodAnalysis.byPosition).join(',') : 'null/missing'],
    ['shinsalHits.length', s.shinsalHits?.length],
    ['shinsalComposites.length', s.shinsalComposites?.length],
    ['palaceAnalysis keys', s.palaceAnalysis ? Object.keys(s.palaceAnalysis).join(',') : 'null/missing'],
    ['daeunInfo.isForward', s.daeunInfo?.isForward],
    ['daeunInfo.pillars.length', s.daeunInfo?.pillars?.length],
    ['saeunPillars.length', s.saeunPillars?.length],
    ['trace.length', s.trace?.length],
    ['raw keys count', s.raw ? Object.keys(s.raw).length : 'null/missing'],
  ];

  for (const [label, val] of checks) {
    const status = val === undefined ? '❌ UNDEF' :
                   val === null ? '⚠️ null ' :
                   val === '' ? '⚠️ empty' :
                   (Array.isArray(val) && val.length === 0) ? '⚠️ []   ' :
                   '✅      ';
    console.log(`  ${status}  ${label} = ${JSON.stringify(val)}`);
  }

  // ── Candidate 핵심 필드 체크 ──
  if (evalResp.candidates.length > 0) {
    console.log('\n' + '─'.repeat(70));
    console.log('  CANDIDATE KEY FIELD CHECK');
    console.log('─'.repeat(70));
    const c = evalResp.candidates[0];
    const cChecks: [string, unknown][] = [
      ['name.fullHangul', c.name.fullHangul],
      ['name.fullHanja', c.name.fullHanja],
      ['name.surname[0].hangul', c.name.surname[0]?.hangul],
      ['name.surname[0].element', c.name.surname[0]?.element],
      ['name.surname[0].meaning', c.name.surname[0]?.meaning],
      ['name.givenName[0].hangul', c.name.givenName[0]?.hangul],
      ['name.givenName[0].element', c.name.givenName[0]?.element],
      ['scores.total', c.scores.total],
      ['scores.hangul', c.scores.hangul],
      ['scores.hanja', c.scores.hanja],
      ['scores.fourFrame', c.scores.fourFrame],
      ['scores.saju', c.scores.saju],
      ['analysis.hangul.blocks.length', c.analysis.hangul.blocks.length],
      ['analysis.hangul.polarityScore', c.analysis.hangul.polarityScore],
      ['analysis.hangul.elementScore', c.analysis.hangul.elementScore],
      ['analysis.hanja.blocks.length', c.analysis.hanja.blocks.length],
      ['analysis.fourFrame.frames.length', c.analysis.fourFrame.frames.length],
      ['analysis.fourFrame.frames[0].type', c.analysis.fourFrame.frames[0]?.type],
      ['analysis.fourFrame.frames[0].luckyLevel', c.analysis.fourFrame.frames[0]?.luckyLevel],
      ['analysis.saju.yongshinElement', c.analysis.saju.yongshinElement],
      ['analysis.saju.nameElements', c.analysis.saju.nameElements],
      ['analysis.saju.affinityScore', c.analysis.saju.affinityScore],
      ['interpretation', c.interpretation?.substring(0, 60)],
      ['rank', c.rank],
    ];

    for (const [label, val] of cChecks) {
      const status = val === undefined ? '❌ UNDEF' :
                     val === null ? '⚠️ null ' :
                     val === '' ? '⚠️ empty' :
                     '✅      ';
      console.log(`  ${status}  ${label} = ${JSON.stringify(val)}`);
    }
  }

  // ── emptySaju() 패턴 감지 ──
  console.log('\n' + '─'.repeat(70));
  console.log('  emptySaju() FALLBACK 감지');
  console.log('─'.repeat(70));
  const allPillarCodes = [
    s.pillars?.year?.stem?.code,
    s.pillars?.year?.branch?.code,
    s.pillars?.month?.stem?.code,
    s.pillars?.day?.stem?.code,
    s.pillars?.hour?.stem?.code,
  ];
  const allEmpty = allPillarCodes.every(c => c === '');
  if (allEmpty) {
    console.log('  ❌ ALL pillar codes are empty string — saju-ts 미연결 (emptySaju fallback)');
  } else {
    console.log('  ✅ Pillar codes populated — saju-ts 연결 정상');
    console.log(`     pillar codes: ${allPillarCodes.join(', ')}`);
  }

  const isDefaultStrength = s.strength?.level === '' && s.strength?.totalSupport === 0 && s.strength?.totalOppose === 0;
  if (isDefaultStrength) {
    console.log('  ❌ Strength appears to be emptySaju() default');
  } else {
    console.log(`  ✅ Strength populated — level: ${s.strength?.level}, support: ${s.strength?.totalSupport}, oppose: ${s.strength?.totalOppose}`);
  }

  const isDefaultYongshin = s.yongshin?.element === '' && s.yongshin?.confidence === 0;
  if (isDefaultYongshin) {
    console.log('  ❌ Yongshin appears to be emptySaju() default');
  } else {
    console.log(`  ✅ Yongshin populated — element: ${s.yongshin?.element}, confidence: ${s.yongshin?.confidence}`);
  }

  console.log('\n━'.repeat(70));
  console.log('  DONE');
  console.log('━'.repeat(70));

} finally {
  engine.close();
}
