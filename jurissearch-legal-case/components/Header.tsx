
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-6 left-0 right-0 z-[100] px-4">
      <div className="max-w-7xl mx-auto glass rounded-2xl h-14 flex items-center justify-between px-6 shadow-2xl border border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-40 animate-pulse"></div>
            <div className="relative bg-indigo-600 p-1.5 rounded-lg border border-indigo-400/50">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <h1 className="text-lg font-black tracking-tighter text-white">JURIS<span className="text-indigo-400">SEARCH</span></h1>
            <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-slate-500">Core Intelligence</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
          <div className="flex items-center gap-2 text-indigo-400">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"></div>
            Live HUD
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
