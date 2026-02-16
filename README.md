# NameSpring

한국 성명학 + 사주팔자 기반 **작명 분석 서비스**입니다.

이름의 음양오행 조화, 획수 배치, 사격 수리를 분석하고,
생년월일시(사주)에 맞는 최적의 이름을 추천합니다.

---

## 아키텍처

```
namespring/          React UI (Vite + Tailwind)
     │
     │  SpringRequest
     ▼
lib/spring-ts/       통합 엔진 (중재자)
     │
     ├──▶ lib/name-ts/     이름 분석 엔진 (순수 성명학)
     │
     └──▶ lib/saju-ts/     사주 분석 엔진 (git submodule)
```

### 3개 엔진의 역할 분리

| 엔진 | 역할 | 독립성 |
|------|------|--------|
| **name-ts** | 발음 오행 + 획수 오행 + 사격 수리 분석 | saju, spring 모름 |
| **saju-ts** | 생년월일시 → 사주팔자 분석 (용신, 격국, 십성) | name, spring 모름 |
| **spring-ts** | 위 둘을 연결하여 사주에 맞는 이름 점수 산출 | name-ts + saju-ts 의존 |

---

## Spring API

spring-ts는 3개의 메서드로 분석 기능을 제공합니다.

```typescript
const engine = new SpringEngine();
await engine.init();

// 1. 이름만 분석 (사주 무관)
const naming = await engine.getNamingReport(request);
//    → NamingReport { totalScore, scores, analysis, interpretation }

// 2. 사주만 분석
const saju = await engine.getSajuReport(request);
//    → SajuReport { pillars, dayMaster, yongshin, sajuEnabled, ... }

// 3. 이름 추천 (사주 + 이름 통합)
const candidates = await engine.getNameCandidates(request);
//    → SpringReport[] { finalScore, namingReport, sajuReport, sajuCompatibility, rank }

engine.close();
```

---

## 이름 분석의 3가지 축 (name-ts)

| 분석 | 기준 | 예시 |
|------|------|------|
| **발음 오행** | 초성 → 오행, 모음 → 음양 | "김" → ㄱ = 목(Wood), ㅣ = 양 |
| **획수 오행** | 한자 획수 끝자리 → 오행, 홀짝 → 음양 | "金" = 8획 → 금(Metal), 짝수 = 음 |
| **사격 수리** | 성+이름 획수 조합 → 원형이정 4격 길흉 | 원격(초년)·형격(청년)·이격(중년)·정격(말년) |

```
오행 상생 (Generating)          오행 상극 (Overcoming)

     목(Wood)                        목(Wood)
    ↗        ↘                      ╱    ╲
수(Water)    화(Fire)           수(Water) → 화(Fire)
    ↖        ↙                      ╲    ╱
     금(Metal) ← 토(Earth)          금(Metal) ─ 토(Earth)

 목→화→토→금→수→목                목→토, 토→수, 수→화, 화→금, 금→목
```

---

## 프로젝트 구조

```
namesprint-w/
├── namespring/                 React UI
│   ├── src/
│   │   ├── App.jsx               SpringEngine 초기화 + 라우팅
│   │   ├── InputForm.jsx         생년월일·이름 입력 폼
│   │   ├── NamingReport.jsx      분석 결과 상세 리포트
│   │   ├── NamingResultRenderer.jsx  풍경 씬 시각화
│   │   ├── HomePage.jsx          홈 화면
│   │   └── ReportPage.jsx        리포트 화면
│   └── vite.config.js            @spring alias → lib/spring-ts/src
│
├── lib/
│   ├── name-ts/                이름 분석 엔진
│   │   ├── src/
│   │   │   ├── name.ts           진입점 (NameTs.analyze)
│   │   │   ├── calculator/       발음·획수·사격 계산기
│   │   │   ├── model/            오행·음양·에너지 도메인 모델
│   │   │   ├── database/         한자 DB, 사격수 DB (SQLite)
│   │   │   └── utils/            한글 분해, 해석문 생성
│   │   └── config/               점수 규칙, 오행 테이블, 음운 데이터 (JSON)
│   │
│   ├── spring-ts/              통합 엔진 (중재자)
│   │   ├── src/
│   │   │   ├── spring-engine.ts  메인 API (3-메서드 + 레거시)
│   │   │   ├── spring-evaluator.ts  적응형 가중합산
│   │   │   ├── saju-adapter.ts   saju-ts 동적 import + 정규화
│   │   │   ├── saju-calculator.ts  사주↔이름 궁합 점수
│   │   │   └── types.ts          전체 타입 정의
│   │   ├── config/               엔진·평가·사주점수 설정 (JSON)
│   │   └── test/                 통합 테스트 (82개)
│   │
│   ├── saju-ts/                사주 분석 엔진 (git submodule)
│   │
│   ├── API_NAME.md             name-ts API 계약
│   ├── API_SPRING.md           spring-ts API 계약
│   └── API_SAJU.md             saju-ts API 계약
│
├── .gitmodules
└── package.json
```

---

## 시작하기

### 사전 요구사항

- Node.js 18+
- npm

### 설치

```bash
git clone --recurse-submodules <repo-url>
cd namesprint-w
npm install
```

saju-ts 서브모듈이 필요한 경우 (사주 분석 활성화):

```bash
cd lib/saju-ts && npm install && npm run build
```

> saju-ts 없이도 동작합니다. 이름 분석만 수행되며, `sajuEnabled: false`가 반환됩니다.

### 개발 서버

```bash
cd namespring
npm run dev
```

Vite 개발 서버가 `http://localhost:5173`에서 시작됩니다.

### 테스트

```bash
cd lib/spring-ts
npx tsx test/compare-output.ts
```

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| UI | React 19, Vite 8, Tailwind CSS 4 |
| 엔진 | TypeScript (순수, 프레임워크 없음) |
| DB | SQLite (sql.js WASM) — 브라우저에서 직접 실행 |
| 사주 | saju-ts (git submodule, 동적 import) |

---

## API 문서

- [API_NAME.md](lib/API_NAME.md) — name-ts 이름 분석 API
- [API_SPRING.md](lib/API_SPRING.md) — spring-ts 통합 엔진 API
- [API_SAJU.md](lib/API_SAJU.md) — saju-ts 사주 분석 API

각 엔진의 상세 구조는 하위 README 참조:

- [name-ts/README.md](lib/name-ts/README.md)
- [spring-ts/README.md](lib/spring-ts/README.md)
