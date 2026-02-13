import React, { useState, useEffect } from 'react';

// --- Inline SVG Icons (Replacing lucide-react for stability) ---

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.71 13.14 4H15l-4 9.29H20l-9.14 10.71H9l4-9.29H4Z"/></svg>
);

const HashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);

// --- 1. Models & Types ---

/**
 * Five Elements mapping for naming analysis.
 */
const Element = {
  Wood: { english: 'Wood', korean: '목' },
  Fire: { english: 'Fire', korean: '화' },
  Earth: { english: 'Earth', korean: '토' },
  Metal: { english: 'Metal', korean: '금' },
  Water: { english: 'Water', korean: '수' }
};

/**
 * Yin-Yang polarity mapping.
 */
const Polarity = {
  Positive: { english: 'Positive', korean: '양' },
  Negative: { english: 'Negative', korean: '음' }
};

// --- 2. Base Energy Calculator ---

/**
 * Abstract class for energy calculations.
 * Implements the Visitor pattern for modular calculation logic.
 */
class EnergyCalculator {
  constructor() {
    this.energy = null;
  }

  accept(visitor) {
    visitor.preVisit(this);
    visitor.visit(this);
    visitor.postVisit(this);
  }

  getEnergy() { return this.energy; }
  setEnergy(energy) { this.energy = energy; }
}

// --- 3. FourFrameCalculator ---

/**
 * Calculates Sagyuk (Four Frames) based on strokes.
 */
class FourFrameCalculator extends EnergyCalculator {
  constructor(surnameStrokes, firstNameStrokes) {
    super();
    this.type = "FourFrame";

    const totalSurname = surnameStrokes.reduce((a, b) => a + b, 0);
    const totalFirstName = firstNameStrokes.reduce((a, b) => a + b, 0);
    const firstCharOfName = firstNameStrokes[0] || 0;
    const lastCharOfName = firstNameStrokes[firstNameStrokes.length - 1] || 0;

    this.frames = [
      { type: 'won', strokeSum: totalFirstName, energy: null },
      { type: 'hyung', strokeSum: totalSurname + firstCharOfName, energy: null },
      { type: 'lee', strokeSum: totalSurname + lastCharOfName, energy: null },
      { type: 'jung', strokeSum: totalSurname + totalFirstName, energy: null }
    ];
  }

  calculate() {
    if (this.frames.some(f => f.energy === null)) {
      const visitor = new FourFrameCalculator.CalculationVisitor();
      this.accept(visitor);
    }
  }

  getFrames() { return this.frames; }

  static CalculationVisitor = class {
    preVisit() {}
    visit(calculator) {
      if (calculator.type === "FourFrame") {
        calculator.getFrames().forEach(frame => {
          frame.energy = {
            polarity: frame.strokeSum % 2 === 1 ? Polarity.Positive : Polarity.Negative,
            element: this.calculateElement(frame.strokeSum)
          };
        });
      }
    }
    postVisit() {}

    calculateElement(val) {
      const lastDigit = val % 10;
      if ([1, 2].includes(lastDigit)) return Element.Wood;
      if ([3, 4].includes(lastDigit)) return Element.Fire;
      if ([5, 6].includes(lastDigit)) return Element.Earth;
      if ([7, 8].includes(lastDigit)) return Element.Metal;
      return Element.Water;
    }
  }
}

// --- 4. HangulCalculator ---

/**
 * Calculates Element/Polarity based on Hangul pronunciation and strokes.
 */
class HangulCalculator extends EnergyCalculator {
  constructor(surname, firstName) {
    super();
    this.type = "Hangul";
    const fullText = surname + firstName;
    this.hanguls = fullText.split('').map((char, index) => ({
      char,
      position: index,
      energy: null
    }));
  }

  calculate() {
    if (this.hanguls.some(h => h.energy === null)) {
      const visitor = new HangulCalculator.CalculationVisitor();
      this.accept(visitor);
    }
  }

  getHanguls() { return this.hanguls; }

  static CalculationVisitor = class {
    preVisit() {}
    visit(calculator) {
      if (calculator.type === "Hangul") {
        calculator.getHanguls().forEach(unit => {
          unit.energy = {
            polarity: this.calculatePolarity(unit.char),
            element: this.calculateElement(unit.char)
          };
        });
      }
    }
    postVisit() {}

    calculatePolarity(char) {
      // Dummy mapping for stroke counts of Hangul for polarity determination
      const strokeMap = { 'ㄱ': 2, 'ㄴ': 2, 'ㄷ': 3, 'ㄹ': 5, 'ㅁ': 4, 'ㅂ': 4, 'ㅅ': 2, 'ㅇ': 1 };
      const count = strokeMap[char] || char.charCodeAt(0);
      return count % 2 === 1 ? Polarity.Positive : Polarity.Negative;
    }

    calculateElement(char) {
      const code = char.charCodeAt(0) - 0xAC00;
      if (code < 0 || code > 11171) return Element.Water;
      const initialIdx = Math.floor(code / 588);
      if ([0, 1, 15].includes(initialIdx)) return Element.Wood;
      if ([2, 3, 4, 5, 16].includes(initialIdx)) return Element.Fire;
      if ([11, 18].includes(initialIdx)) return Element.Earth;
      if ([9, 10, 12, 13, 14].includes(initialIdx)) return Element.Metal;
      return Element.Water;
    }
  }
}

// --- 5. HanjaCalculator ---

/**
 * Processes Hanja information including resource elements and stroke counts.
 */
class HanjaCalculator extends EnergyCalculator {
  constructor(surnameData, firstNameData) {
    super();
    this.type = "Hanja";
    const fullData = [...surnameData, ...firstNameData];
    this.hanjas = fullData.map((data, index) => ({
      char: data.char,
      strokeCount: data.strokes,
      resourceElement: data.resourceElement,
      position: index,
      energy: null
    }));
  }

  calculate() {
    if (this.hanjas.some(h => h.energy === null)) {
      const visitor = new HanjaCalculator.CalculationVisitor();
      this.accept(visitor);
    }
  }

  getHanjas() { return this.hanjas; }

  static CalculationVisitor = class {
    preVisit() {}
    visit(calculator) {
      if (calculator.type === "Hanja") {
        calculator.getHanjas().forEach(hanja => {
          hanja.energy = {
            polarity: hanja.strokeCount % 2 === 1 ? Polarity.Positive : Polarity.Negative,
            element: hanja.resourceElement
          };
        });
      }
    }
    postVisit() {}
  }
}

// --- 6. SeedTs Engine ---

/**
 * Main analysis engine that coordinates different calculators.
 */
class SeedTs {
  analyze(userInfo) {
    const { lastName, firstName } = userInfo;
    
    // Generate strokes from character codes for testing
    const surnameStrokes = lastName.split('').map(c => (c.charCodeAt(0) % 10) + 5);
    const firstNameStrokes = firstName.split('').map(c => (c.charCodeAt(0) % 10) + 5);

    // Mock Hanja data since external DB is not available
    const surnameHanja = lastName.split('').map((c, i) => ({ 
      char: c, strokes: surnameStrokes[i], resourceElement: Element.Wood 
    }));
    const firstNameHanja = firstName.split('').map((c, i) => ({ 
      char: c, strokes: firstNameStrokes[i], resourceElement: Element.Fire 
    }));

    const fourFrames = new FourFrameCalculator(surnameStrokes, firstNameStrokes);
    const hangul = new HangulCalculator(lastName, firstName);
    const hanja = new HanjaCalculator(surnameHanja, firstNameHanja);

    // Execute internal calculations
    fourFrames.calculate();
    hangul.calculate();
    hanja.calculate();

    const mainCandidate = {
      lastName,
      firstName,
      totalScore: 95,
      fourFrames,
      hangul,
      hanja,
      interpretation: "This name shows exceptional structural balance and vibrant elemental flow."
    };

    return {
      candidates: [mainCandidate],
      totalCount: 1,
      gender: userInfo.gender
    };
  }
}

// --- 7. Main UI Component ---

export default function App() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    runAnalysis();
  }, []);

  const runAnalysis = () => {
    const seed = new SeedTs();
    const testInput = {
      lastName: "이",
      firstName: "름봄",
      birthDateTime: { year: 1989, month: 10, day: 20, hour: 7, minute: 30 },
      gender: "female"
    };

    const analysisResult = seed.analyze(testInput);
    setResult(analysisResult);
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
        <p className="text-gray-400 font-medium animate-pulse">Initializing Analysis Engine...</p>
      </div>
    );
  }

  const candidate = result.candidates[0];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:p-12 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header section */}
        <header className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                <SearchIcon />
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900">Seed Engine Debug</h1>
                <p className="text-slate-500 font-medium">Naming theory analysis & data verification</p>
              </div>
            </div>
            <button 
              onClick={runAnalysis}
              className="px-8 py-4 bg-slate-900 text-white rounded-2xl hover:bg-black active:scale-95 transition-all font-bold shadow-lg shadow-slate-200"
            >
              Re-analyze
            </button>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-100 flex flex-wrap gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-bold tracking-widest text-[10px]">NAME</span>
              <span className="bg-slate-50 px-3 py-1 rounded-lg font-black text-slate-700">{candidate.lastName}{candidate.firstName}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-bold tracking-widest text-[10px]">GENDER</span>
              <span className="bg-slate-50 px-3 py-1 rounded-lg font-black text-slate-700 uppercase">{result.gender || 'Unknown'}</span>
            </div>
          </div>
        </header>

        {/* Scoring Summary */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-[2rem] border border-slate-200 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700 opacity-50"></div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Total Integrity Score</p>
            <div className="text-8xl font-black text-indigo-600 tabular-nums leading-none tracking-tighter">{candidate.totalScore}</div>
            <div className="mt-8 px-4 py-2 bg-indigo-50 text-indigo-600 text-xs font-black rounded-xl border border-indigo-100 uppercase">Excellent Harmony</div>
          </div>
          
          <div className="lg:col-span-2 bg-white p-10 rounded-[2rem] border border-slate-200 flex flex-col justify-center">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Expert Interpretation</p>
            <p className="text-2xl font-semibold text-slate-700 leading-snug italic max-w-2xl">
              "{candidate.interpretation}"
            </p>
            <div className="mt-10 flex gap-3">
              <span className="w-12 h-1.5 rounded-full bg-indigo-600"></span>
              <span className="w-6 h-1.5 rounded-full bg-indigo-200"></span>
              <span className="w-3 h-1.5 rounded-full bg-indigo-100"></span>
            </div>
          </div>
        </section>

        {/* Detailed Data Tabs/Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Sagyuk Theory (FourFrame) */}
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-8 py-6 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HashIcon />
                <h3 className="font-black text-slate-800 tracking-tight">Four Frame Theory (사격수리)</h3>
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white px-2 py-1 rounded-md border border-slate-200">Structural</span>
            </div>
            <div className="p-8 grid grid-cols-2 gap-5 flex-1">
              {candidate.fourFrames.getFrames().map((frame) => (
                <div key={frame.type} className="p-5 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors group">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{frame.type}</span>
                    <span className="text-xl font-black text-slate-900 group-hover:scale-110 transition-transform">{frame.strokeSum}</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 px-3 py-2.5 bg-white rounded-2xl text-center shadow-sm border border-slate-100">
                      <p className="text-[8px] text-slate-400 font-black leading-none mb-1 uppercase">Element</p>
                      <p className="text-sm font-black text-slate-700">{frame.energy?.element.korean}</p>
                    </div>
                    <div className="flex-1 px-3 py-2.5 bg-white rounded-2xl text-center shadow-sm border border-slate-100">
                      <p className="text-[8px] text-slate-400 font-black leading-none mb-1 uppercase">Polarity</p>
                      <p className="text-sm font-black text-slate-700">{frame.energy?.polarity.korean}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phonetic Theory (Hangul) */}
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-8 py-6 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ZapIcon />
                <h3 className="font-black text-slate-800 tracking-tight">Hangul Phonetics (음령오행)</h3>
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white px-2 py-1 rounded-md border border-slate-200">Acoustic</span>
            </div>
            <div className="p-8 space-y-4 flex-1">
              {candidate.hangul.getHanguls().map((unit, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl border border-slate-100 group hover:bg-slate-100 transition-all">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl font-black text-slate-900 shadow-sm border border-slate-100 group-hover:rotate-6 transition-transform">
                      {unit.char}
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Index 0{unit.position + 1}</div>
                      <div className="text-lg font-black text-slate-700 uppercase">{unit.energy?.element.english}</div>
                    </div>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${unit.energy?.polarity.english === 'Positive' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                    {unit.energy?.polarity.english}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resource Theory (Hanja) */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-8 py-6 bg-slate-50/50 border-b border-slate-100 flex items-center gap-3">
              <InfoIcon />
              <h3 className="font-black text-slate-800 tracking-tight text-lg">Hanja Resource Breakdown (자원오행)</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50/30">
                    <th className="py-5 px-10 text-left">Hanja Character</th>
                    <th className="py-5 px-8 text-center">Stroke Count</th>
                    <th className="py-5 px-8 text-center">Intrinsic Element</th>
                    <th className="py-5 px-8 text-center">Yin-Yang</th>
                    <th className="py-5 px-10 text-right">Final Analysis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {candidate.hanja.getHanjas().map((h, i) => (
                    <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                      <td className="py-8 px-10">
                        <span className="text-4xl font-serif font-black text-slate-900">{h.char}</span>
                      </td>
                      <td className="py-8 px-8 text-center">
                        <span className="text-lg font-black text-slate-500">{h.strokeCount}</span>
                      </td>
                      <td className="py-8 px-8 text-center">
                        <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl">{h.resourceElement.korean}</span>
                      </td>
                      <td className="py-8 px-8 text-center">
                        <span className="text-xs font-black text-purple-600 bg-purple-50 px-4 py-2 rounded-xl">{h.energy?.polarity.korean}</span>
                      </td>
                      <td className="py-8 px-10 text-right">
                        <span className="text-xl font-black text-indigo-600 uppercase tracking-tight">{h.energy?.element.english}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}