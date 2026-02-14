import React from 'react';
import logoPng from './assets/logo.png';
import companyLogo from './assets/logo_2025_rev01.svg';

function SplashScreen({ visible }) {
  return (
    <div className={`relative min-h-screen overflow-hidden bg-[#F9F8F6] text-slate-900 transition-opacity duration-300 dark:bg-gradient-to-b dark:from-slate-950 dark:via-emerald-950 dark:to-slate-900 dark:text-slate-100 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-green-50/60 to-transparent dark:from-emerald-900/20 dark:to-transparent" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-between py-24">
        <div />

        <div className="flex flex-col items-center gap-4">
          <img
            src={logoPng}
            alt="NameSpring leaf logo"
            className="h-20 w-20 md:h-24 md:w-24 select-none"
            draggable="false"
          />
          <h1 className="text-5xl font-black tracking-tight text-[#102847] dark:text-slate-100">이름봄</h1>
        </div>

        <div className="text-center">
          <p className="text-[20px] font-black uppercase tracking-[0.24em] text-green-600/60 dark:text-emerald-300">
            Namespring
          </p>
          <p className="mt-1 text-[17px] font-medium italic text-slate-400 dark:text-slate-300">새로운 인생의 시작</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex items-center justify-center gap-2 text-[15px] text-slate-400 dark:text-slate-500">
        <img src={companyLogo} alt="MetaIntelligence logo" className="h-[18px] w-[24px] opacity-45 grayscale" draggable="false" />
        <span className="tracking-wide">~ MetaIntelligence Inc.</span>
      </div>
    </div>
  );
}

export default SplashScreen;
