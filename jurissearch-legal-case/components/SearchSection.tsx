
import React, { useState } from 'react';

interface SearchSectionProps {
  onSearch: (topic: string) => void;
  isLoading: boolean;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateInput = (input: string): boolean => {
    // [ASI01: Agent Goal Hijack] Frontend validation acts as the first line of defense.
    // By filtering inputs at the UI layer, we reduce the load on the backend and provide immediate feedback.
    if (input.length > 200) {
      setValidationError("Query too long (max 200 chars).");
      return false;
    }
    // [ASI02: Tool Misuse] Prevent unambiguous or script-like inputs.
    // We block characters like <, >, {, } to prevent XSS and potential template injection attacks.
    if (/[<>{}]/g.test(input)) {
      setValidationError("Invalid characters detected.");
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      if (validateInput(topic)) {
        onSearch(topic);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
    if (validationError) setValidationError(null); // Clear error on type
  };

  const suggestions = [
    "AI Liability Law",
    "Discrimination in Smart Contracts",
    "Digital Identity Rights",
    "Neural Privacy Acts"
  ];

  return (
    <div className="pt-32 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center relative">
        {/* Visual Glow behind search */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/10 blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 space-y-4 mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            Cognitive <span className="dichroic-text">Legal Inquiry</span>
          </h2>
          <p className="text-slate-400 font-medium tracking-tight max-w-xl mx-auto md:text-lg">
            {/* [ASI09] Disclaimer about AI capability */}
            Scan global public archives for outcome-specific legal precedents.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-focus-within:opacity-60"></div>

          <div className={`relative flex items-center bg-black/40 backdrop-blur-3xl rounded-xl border ${validationError ? 'border-rose-500' : 'border-white/10'} shadow-2xl overflow-hidden group-focus-within:border-white/30 transition-all`}>
            <div className="pl-6 text-slate-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <input
              type="text"
              className="w-full bg-transparent text-white px-6 py-6 outline-none text-xl font-light placeholder:text-slate-600 tracking-wide"
              placeholder="Query any legal domain..."
              value={topic}
              onChange={handleInputChange}
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading || !topic.trim() || !!validationError}
              className="mr-3 bg-white text-black px-8 py-4 rounded-lg font-black text-sm uppercase tracking-widest hover:bg-indigo-400 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>Analyze <span className="hidden sm:inline">Stream</span></>
              )}
            </button>
          </div>
          {/* [ASI01] Display validation feedback */}
          {validationError && (
            <div className="absolute -bottom-8 left-0 right-0 text-center text-rose-400 text-xs font-bold tracking-widest uppercase">
              Security Alert: {validationError}
            </div>
          )}
        </form>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setTopic(s);
                setValidationError(null);
              }}
              className="text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full bg-white/5 border border-white/5 hover:border-indigo-500/50 hover:bg-white/10 transition-all text-slate-500 hover:text-white"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
