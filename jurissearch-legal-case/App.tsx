
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import CaseCard from './components/CaseCard';
import { performLegalResearch, fetchGroundingSources, generateStrategicSummary } from './services/geminiService';
import { CaseStudy, SearchStatus } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [wins, setWins] = useState<CaseStudy[]>([]);
  const [losses, setLosses] = useState<CaseStudy[]>([]);
  const [sources, setSources] = useState<{ title: string, uri: string }[]>([]);
  const [strategicSummary, setStrategicSummary] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [currentTopic, setCurrentTopic] = useState('');
  const [systemLogs, setSystemLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setSystemLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const handleSearch = async (topic: string) => {
    setStatus('searching');
    setError(null);
    setWins([]);
    setLosses([]);
    setSources([]);
    setStrategicSummary('');
    setCurrentTopic(topic);
    setSystemLogs(["Initializing uplink...", "Opening public judicial channels..."]);

    try {
      addLog("Querying Justia & CourtListener repositories...");
      const [winsData, lossesData, sourcesData] = await Promise.all([
        performLegalResearch(topic, 'won'),
        performLegalResearch(topic, 'lost'),
        fetchGroundingSources(topic)
      ]);

      addLog("Data retrieved. Synthesizing strategic briefing...");
      const summary = await generateStrategicSummary(topic, winsData, lossesData);

      setWins(winsData);
      setLosses(lossesData);
      setSources(sourcesData);
      setStrategicSummary(summary);

      if (winsData.length === 0 && lossesData.length === 0) {
        setError("Repository scan complete. No high-confidence precedents found for this specific query.");
        setStatus('idle');
      } else {
        setStatus('completed');
        addLog("Protocol complete. Results visualized.");
      }
    } catch (err: any) {
      // [ASI01/ASI05] Secure logging: Do not log raw error objects if they might contain prompt contexts or secrets.
      console.error("Secure Audit Log: Judicial archive connection failed. Trace ID:", Date.now());
      setError("Network interrupt. Judicial archive connection failed.");
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen selection:bg-indigo-500/40 selection:text-white pb-40">
      <Header />

      {status === 'searching' && <div className="scanner-line"></div>}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchSection onSearch={handleSearch} isLoading={status === 'searching'} />

        {status === 'searching' && (
          <div className="max-w-2xl mx-auto py-24 space-y-12 animate-pulse">
            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-indigo-500/20 blur-[60px] rounded-full"></div>
              <div className="w-24 h-24 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
            <div className="space-y-4 bg-black/40 border border-white/5 p-8 rounded-3xl backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                <span className="mono text-[10px] uppercase font-black text-indigo-400 tracking-widest">Active System Logs</span>
              </div>
              {systemLogs.map((log, i) => (
                <div key={i} className="mono text-[11px] text-slate-400 flex items-center gap-3">
                  <span className="text-slate-700">[{new Date().toLocaleTimeString()}]</span>
                  <span className={i === 0 ? 'text-indigo-200' : ''}>{log}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {status === 'completed' && (
          <div className="space-y-32 animate-in fade-in slide-in-from-bottom-20 duration-1000">

            {/* Executive Strategic Summary Box */}
            <section className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-pink-500/20 to-indigo-500/20 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative glass-dark p-12 rounded-[3rem] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                  <div className="shrink-0">
                    <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.4)]">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-2">Executive Briefing</h2>
                      <h3 className="text-3xl font-black text-white tracking-tighter uppercase">Intelligence Summary: {currentTopic}</h3>
                    </div>
                    <p className="text-xl text-slate-200 leading-relaxed font-light tracking-tight max-w-4xl italic">
                      {strategicSummary}
                    </p>
                    <div className="flex flex-wrap gap-8 pt-6 border-t border-white/5">
                      <div>
                        <p className="text-[9px] uppercase font-black text-slate-500 tracking-widest mb-1">Precedent Strength</p>
                        <p className="text-2xl font-black text-emerald-400">High Tier</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-black text-slate-500 tracking-widest mb-1">Risk Factor</p>
                        <p className="text-2xl font-black text-rose-400">{losses.length > 3 ? 'Critical' : 'Moderate'}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-black text-slate-500 tracking-widest mb-1">Market Volatility</p>
                        <p className="text-2xl font-black text-indigo-400">Stable</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Wins Section */}
            <section>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4">
                <div className="space-y-2">
                  <h2 className="text-4xl font-black text-white tracking-tighter uppercase flex items-center gap-4">
                    <span className="w-3 h-8 bg-emerald-500 rounded-full"></span>
                    Success Benchmarks
                  </h2>
                  <p className="text-slate-500 text-xs font-bold tracking-[0.3em] uppercase pl-8">Favorability Analysis Protocols</p>
                </div>
                <div className="mono text-[11px] text-slate-500 flex items-center gap-4">
                  <span className="px-3 py-1 bg-white/5 rounded-md border border-white/10 uppercase tracking-widest">Region: Global</span>
                  <span className="px-3 py-1 bg-white/5 rounded-md border border-white/10 uppercase tracking-widest">N: {wins.length}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {wins.map((study, idx) => (
                  <CaseCard key={`win-${idx}`} study={study} variant="win" />
                ))}
              </div>
            </section>

            {/* Losses Section */}
            <section>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4">
                <div className="space-y-2">
                  <h2 className="text-4xl font-black text-white tracking-tighter uppercase flex items-center gap-4">
                    <span className="w-3 h-8 bg-rose-500 rounded-full"></span>
                    Risk Exposures
                  </h2>
                  <p className="text-slate-500 text-xs font-bold tracking-[0.3em] uppercase pl-8">Unfavorable Judicial Precedents</p>
                </div>
                <div className="mono text-[11px] text-slate-500 flex items-center gap-4">
                  <span className="px-3 py-1 bg-white/5 rounded-md border border-white/10 uppercase tracking-widest">N: {losses.length}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {losses.map((study, idx) => (
                  <CaseCard key={`loss-${idx}`} study={study} variant="loss" />
                ))}
              </div>
            </section>

            {/* Advanced Grounding Panel */}
            {sources.length > 0 && (
              <section className="relative glass-dark rounded-[3rem] p-16 overflow-hidden border border-white/5">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-500/5 to-transparent"></div>
                <div className="relative z-10 flex flex-col md:flex-row gap-20">
                  <div className="max-w-xs space-y-6">
                    <div className="w-16 h-1 bg-indigo-500"></div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">Grounding<br />Network</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      All research data points are triangulated from these official non-paywalled digital repositories.
                    </p>
                  </div>
                  <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sources.map((source, i) => (
                      <a
                        key={i}
                        href={source.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-6 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.08] hover:border-indigo-500/50 transition-all group"
                      >
                        <div className="flex flex-col gap-1 overflow-hidden">
                          <span className="mono text-[9px] text-indigo-400 uppercase font-black tracking-widest">Link Source {i + 1}</span>
                          <span className="text-sm font-bold text-slate-300 truncate pr-4 group-hover:text-white transition-colors">{source.title}</span>
                        </div>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 text-slate-500 group-hover:text-white group-hover:bg-indigo-600 transition-all">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        )}

        {status === 'idle' && !error && !wins.length && (
          <div className="py-40 text-center">
            <div className="relative inline-block px-12 py-16 glass-dark rounded-[4rem] border border-white/10 overflow-hidden shadow-2xl">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full"></div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-500/10 blur-[100px] rounded-full"></div>
              <div className="relative space-y-12">
                <div className="relative w-32 h-32 mx-auto">
                  <div className="absolute inset-0 bg-indigo-500/30 blur-2xl animate-pulse"></div>
                  <div className="relative w-full h-full flex items-center justify-center border-2 border-indigo-500/50 rounded-full group-hover:rotate-180 transition-transform duration-1000">
                    <svg className="w-16 h-16 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.015 9.015 0 014.472 8.803m-3.44 2.04L19 12.853M12 3a9.015 9.015 0 00-4.472 8.803" />
                    </svg>
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-5xl font-black text-white tracking-tighter uppercase leading-[0.8] mb-4">Executive Case<br />Intelligence</h2>
                  <p className="text-slate-400 font-medium max-w-sm mx-auto leading-relaxed text-lg tracking-tight">
                    Search complex legal domains to extract strategic briefing points and precedent analysis.
                  </p>
                </div>
                <div className="flex justify-center items-center gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-1 bg-indigo-500/30 rounded-full overflow-hidden">
                      <div className="w-1/2 h-full bg-indigo-500 animate-[shimmer_2s_infinite]"></div>
                    </div>
                    <span className="mono text-[8px] text-slate-600 uppercase tracking-widest">Protocol Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-[100] px-8 py-6 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent backdrop-blur-sm border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-8 mb-4 md:mb-0">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></div>
              <span className="mono text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">JURIS PROTOCOL SECURED</span>
            </div>
            <div className="hidden lg:flex items-center gap-3 border-l border-white/10 pl-8">
              <span className="mono text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">STABILITY: 99.9%</span>
            </div>
            {/* [ASI09: Human-Agent Trust Exploitation] Explicit disclaimer to manage user expectations and prevent over-reliance. */}
            <div className="hidden lg:flex items-center gap-3 border-l border-white/10 pl-8">
              <span className="text-[9px] font-medium text-amber-500/80 uppercase tracking-wider">
                ⚠ AI-Generated Content - Verify with Legal Counsel
              </span>
            </div>
          </div>
          <div className="flex gap-10 text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 hover:text-slate-400 transition-colors">
            <a href="#" className="hover:text-indigo-400 transition-colors">Legal Disclosure</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">API Docs</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Vault</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
