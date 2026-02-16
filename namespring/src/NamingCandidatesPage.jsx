import React, { useEffect, useMemo, useState } from 'react';
import { NameStatRepository } from '@seed/database/name-stat-repository';

function mergeYearlyRankBuckets(yearlyRank) {
  const source = yearlyRank || {};
  const totalBucket = source?.전체;
  if (totalBucket && typeof totalBucket === 'object' && !Array.isArray(totalBucket)) {
    return Object.entries(totalBucket)
      .map(([year, rank]) => ({ year: Number(year), rank: Number(rank) }))
      .filter((item) => !Number.isNaN(item.year) && !Number.isNaN(item.rank))
      .sort((a, b) => a.year - b.year);
  }

  const byYear = {};
  for (const [key, bucket] of Object.entries(source)) {
    const flatYear = Number(key);
    const flatValue = Number(bucket);
    if (!Number.isNaN(flatYear) && !Number.isNaN(flatValue)) {
      byYear[flatYear] = byYear[flatYear] || [];
      byYear[flatYear].push(flatValue);
      continue;
    }
    if (!bucket || typeof bucket !== 'object' || Array.isArray(bucket)) continue;
    for (const [year, value] of Object.entries(bucket)) {
      const y = Number(year);
      const v = Number(value);
      if (Number.isNaN(y) || Number.isNaN(v)) continue;
      byYear[y] = byYear[y] || [];
      byYear[y].push(v);
    }
  }
  return Object.entries(byYear)
    .map(([year, values]) => {
      const list = Array.isArray(values) ? values : [];
      const avg = list.length ? list.reduce((sum, value) => sum + value, 0) / list.length : 0;
      return { year: Number(year), rank: avg };
    })
    .sort((a, b) => a.year - b.year);
}

function getGivenHangul(candidate) {
  return candidate?.namingReport?.name?.givenName?.map((char) => char.hangul).join('') || '';
}

function getDisplayName(candidate) {
  const fullHangul = candidate?.namingReport?.name?.fullHangul || '-';
  const fullHanja = candidate?.namingReport?.name?.fullHanja || '-';
  return `${fullHangul} (${fullHanja})`;
}

function formatScore(value) {
  const score = Number(value);
  if (!Number.isFinite(score)) return '0.0';
  return score.toFixed(1);
}

function NamingCandidatesPage({ entryUserInfo, onRecommendAsync, onBackHome }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortMode, setSortMode] = useState('score');
  const [candidates, setCandidates] = useState([]);
  const [isPopularityLoading, setIsPopularityLoading] = useState(false);
  const [popularityRankByName, setPopularityRankByName] = useState({});
  const [nameStatRepo] = useState(() => new NameStatRepository());

  useEffect(() => {
    return () => {
      nameStatRepo.close();
    };
  }, [nameStatRepo]);

  useEffect(() => {
    let cancelled = false;

    const loadPopularityRanks = async (sourceCandidates) => {
      if (!sourceCandidates.length) {
        setPopularityRankByName({});
        return;
      }

      setIsPopularityLoading(true);
      try {
        await nameStatRepo.init();
        const names = [...new Set(sourceCandidates.map(getGivenHangul).filter(Boolean))];
        const pairs = await Promise.all(names.map(async (name) => {
          const stat = await nameStatRepo.findByName(name);
          const rankSeries = mergeYearlyRankBuckets(stat?.yearly_rank || {});
          const latest = rankSeries.length ? rankSeries[rankSeries.length - 1].rank : null;
          return [name, latest];
        }));

        if (cancelled) return;

        const next = {};
        for (const [name, rank] of pairs) {
          if (rank === null || !Number.isFinite(Number(rank))) continue;
          next[name] = Number(rank);
        }
        setPopularityRankByName(next);
      } catch {
        if (!cancelled) {
          setPopularityRankByName({});
        }
      } finally {
        if (!cancelled) {
          setIsPopularityLoading(false);
        }
      }
    };

    const run = async () => {
      if (!entryUserInfo || !onRecommendAsync) {
        setCandidates([]);
        setError('입력한 정보가 없어 추천을 진행할 수 없습니다.');
        setIsLoading(false);
        return;
      }

      setSortMode('score');
      setError('');
      setCandidates([]);
      setPopularityRankByName({});
      setIsLoading(true);

      try {
        const reports = await onRecommendAsync(entryUserInfo);
        if (cancelled) return;
        const safeReports = Array.isArray(reports) ? reports : [];
        setCandidates(safeReports);
        if (!safeReports.length) {
          setError('추천 결과가 없습니다.');
        }
        void loadPopularityRanks(safeReports);
      } catch {
        if (!cancelled) {
          setError('작명 결과를 불러오지 못했습니다.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [entryUserInfo, onRecommendAsync, nameStatRepo]);

  const sortedCandidates = useMemo(() => {
    return [...candidates].sort((a, b) => {
      if (sortMode === 'popularity') {
        const aRank = popularityRankByName[getGivenHangul(a)];
        const bRank = popularityRankByName[getGivenHangul(b)];
        const safeA = Number.isFinite(aRank) ? aRank : Number.POSITIVE_INFINITY;
        const safeB = Number.isFinite(bRank) ? bRank : Number.POSITIVE_INFINITY;
        if (safeA !== safeB) return safeA - safeB;
      }
      return Number(b?.finalScore ?? 0) - Number(a?.finalScore ?? 0);
    });
  }, [candidates, sortMode, popularityRankByName]);

  return (
    <div className="min-h-screen flex flex-col items-center p-3 font-sans text-[var(--ns-text)]">
      <div className="bg-[var(--ns-surface)] p-5 rounded-[2rem] shadow-2xl border border-[var(--ns-border)] w-full max-w-2xl overflow-hidden">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-[var(--ns-accent-text)]">작명 추천 결과</h1>
          </div>
          <button
            onClick={onBackHome}
            aria-label="홈으로"
            title="홈으로"
            className="w-10 h-10 rounded-2xl border border-[var(--ns-border)] bg-[var(--ns-surface-soft)] text-[var(--ns-muted)] font-bold inline-flex items-center justify-center"
          >
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
              <path d="M3 9.5L10 4L17 9.5V16.5H12.5V12H7.5V16.5H3V9.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </header>

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-black text-[var(--ns-muted)]">총 {candidates.length}개 후보</p>
            <div className="flex items-center gap-2">
              <label htmlFor="candidate-sort" className="text-xs font-black text-[var(--ns-muted)]">정렬</label>
              <select
                id="candidate-sort"
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value)}
                className="px-3 py-2 rounded-xl border border-[var(--ns-border)] bg-[var(--ns-surface-soft)] text-sm font-bold text-[var(--ns-text)]"
              >
                <option value="score">점수순</option>
                <option value="popularity">인기도순</option>
              </select>
            </div>
          </div>

          {isLoading && (
            <div className="h-40 rounded-xl border border-[var(--ns-border)] bg-[var(--ns-surface-soft)] flex flex-col items-center justify-center gap-3">
              <div className="h-12 w-12 rounded-full border-4 border-[var(--ns-primary)] border-t-transparent animate-spin" />
              <p className="text-sm font-bold text-[var(--ns-muted)]">작명 중입니다. 잠시만 기다려주세요.</p>
            </div>
          )}

          {!isLoading && error && (
            <div className="h-24 rounded-xl border border-[var(--ns-border)] bg-[var(--ns-surface-soft)] flex items-center justify-center px-4">
              <p className="text-sm font-bold text-[var(--ns-muted)] text-center">{error}</p>
            </div>
          )}

          {!isLoading && !error && (
            <ul className="max-h-[66vh] overflow-y-auto space-y-2 pr-1">
              {sortedCandidates.map((candidate, index) => {
                const popularityRank = popularityRankByName[getGivenHangul(candidate)];
                return (
                  <li key={`${candidate?.rank ?? index}-${candidate?.namingReport?.name?.fullHanja ?? index}`} className="rounded-xl border border-[var(--ns-border)] bg-[var(--ns-surface-soft)] px-4 py-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm md:text-base font-black text-[var(--ns-accent-text)] break-keep whitespace-normal">
                        {getDisplayName(candidate)}
                      </p>
                      <p className="text-sm font-black text-[var(--ns-text)]">
                        최종 점수 {formatScore(candidate?.finalScore)}
                      </p>
                    </div>
                    <div className="mt-1 text-xs font-semibold text-[var(--ns-muted)] flex justify-end">
                      {sortMode === 'popularity' && isPopularityLoading
                        ? '인기도 정보를 불러오는 중...'
                        : `인기도 ${Number.isFinite(popularityRank) ? `${Math.round(popularityRank).toLocaleString()}위` : '-'}`
                      }
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default NamingCandidatesPage;
