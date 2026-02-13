import { useEffect } from 'react';
// Import the naming engine from seed-ts library
import { SeedTs } from "@seed/seed";

function App() {
  useEffect(() => {
    // Initialize the engine
    const seed = new SeedTs();
    
    // Test input data
    const testInput = {
      lastName: "이",
      firstName: "봄",
      birthDate: "2026-01-01",
      birthTime: "12:00",
      gender: "female"
    };
    

    // Execute analysis
    const result = seed.analyze(testInput);
    
    console.log("Naming Analysis Result:", result);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">이름봄(NameSpring)</h1>
        <p className="text-gray-500 mb-6">성명학 분석 엔진 연결 테스트 중...</p>
        
        <button 
          className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold active:scale-95 transition-transform"
          onClick={() => alert('엔진 호출은 콘솔(F12)을 확인하세요!')}
        >
          분석 시작하기
        </button>
      </div>
    </div>
  );
}

export default App;