
import React, { useState } from 'react';
import { CaseStudy } from '../types';

interface CaseCardProps {
  study: CaseStudy;
  variant: 'win' | 'loss';
}

const CaseCard: React.FC<CaseCardProps> = ({ study, variant }) => {
  const isWin = variant === 'win';
  const [copied, setCopied] = useState(false);

  const copyCitation = () => {
    const text = study.citation || `${study.name} (${study.year})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="group relative flex flex-col h-full perspective-1000">
      {/* Background Glow */}
      <div className={`absolute -inset-[2px] rounded-3xl bg-gradient-to-br ${
        isWin ? 'from-emerald-500/40 to-indigo-500/40' : 'from-rose-500/40 to-orange-500/40'
      } opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl group-hover:blur-2xl`}></div>
      
      <div className="relative flex flex-col h-full bg-[#0a0f1d]/80 backdrop-blur-3xl rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:bg-[#0f172a]/90">
        {/* Animated Scanning Bar on Card */}
        <div className="absolute top-0 left-0 w-full h-1 overflow-hidden opacity-30">
          <div className={`h-full w-1/3 bg-gradient-to-r from-transparent ${isWin ? 'via-emerald-400' : 'via-rose-400'} to-transparent animate-[shimmer_2s_infinite]`}></div>
        </div>

        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-2">
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-[0.2em] shadow-lg ${
                  isWin ? 'bg-emerald-500 text-black' : 'bg-rose-500 text-white'
                }`}>
                  {isWin ? 'Strategic Win' : 'Critical Risk'}
                </span>
                <span className="bg-slate-800 border border-white/5 px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest text-slate-400">
                  REF-{study.year}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${isWin ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                    style={{ width: `${study.confidenceScore}%` }}
                  ></div>
                </div>
                <span className="mono text-[8px] text-slate-500 uppercase tracking-tighter">Acc: {study.confidenceScore}%</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={copyCitation}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-indigo-500/20 hover:border-indigo-500/50 transition-all group/btn"
              >
                {copied ? <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_#34d399]"></div> : (
                  <svg className="w-4 h-4 text-slate-400 group-hover/btn:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                )}
              </button>
              <a 
                href={study.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-indigo-500/20 hover:border-indigo-500/50 transition-all group/btn"
              >
                <svg className="w-4 h-4 text-slate-400 group-hover/btn:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          <h3 className="text-2xl font-black text-white leading-[1.1] mb-2 tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-indigo-400 transition-all">
            {study.name}
          </h3>
          
          <div className="mono text-[10px] text-indigo-400/60 mb-8 flex flex-col gap-1 uppercase tracking-tight">
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>
              JUR: {study.jurisdiction}
            </span>
            {study.citation && (
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>
                CIT: {study.citation}
              </span>
            )}
          </div>

          <div className="relative flex-grow group-hover:text-slate-300 transition-colors">
            <p className="text-sm text-slate-400 leading-relaxed italic mb-8 border-l border-indigo-500/20 pl-4">
              "{study.summary}"
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/[0.08] transition-all">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Briefing</h4>
              </div>
              <p className="text-sm text-slate-300 font-medium">
                {study.takeaway}
              </p>
            </div>

            <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-5 group-hover:border-indigo-500/30 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Strategy Implication</h4>
              </div>
              <p className="text-xs text-indigo-100/80 leading-relaxed font-medium">
                {study.strategicImplication}
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
};

export default CaseCard;
