import React from 'react';
import { ShieldCheck, Globe, Play, Sparkles, Activity, Layers, BarChart3, Users, HelpCircle } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isLiveWeb: boolean;
  onStartPresentation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  isLiveWeb,
  onStartPresentation,
}) => {
  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'what-is-hallucination', label: 'WHAT IS HALLUCINATION?' },
    { id: 'verify', label: 'VERIFY', highlight: true },
    { id: 'how-it-works', label: 'HOW IT WORKS' },
    { id: 'benchmark', label: 'BENCHMARK' },
    { id: 'model-comparison', label: 'MODEL COMPARISON' },
    { id: 'research', label: 'RESEARCH' },
    { id: 'human-validation', label: 'HUMAN LAB' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#080d1a]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:border-sky-400 transition-colors">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              <span>AI HALLUCINATION DETECTION BENCHMARK</span>
            </div>
            <div className="text-[10px] font-mono-code text-slate-400">
              Forensic Fact-Checking &amp; NLI Evidence Grounding
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-3 py-1.5 text-xs font-mono-code tracking-wide rounded-md transition-all cursor-pointer ${
                item.highlight
                  ? activeSection === item.id
                    ? 'bg-sky-500 text-slate-950 font-bold'
                    : 'bg-sky-500/15 text-sky-400 border border-sky-500/30 hover:bg-sky-500/25'
                  : activeSection === item.id
                  ? 'text-white bg-slate-800/80 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* Grounding Status badge */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono-code">
            <span className={`w-2 h-2 rounded-full ${isLiveWeb ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-slate-300">
              {isLiveWeb ? 'LIVE WEB GROUNDING' : 'CURATED BENCHMARK DEMO'}
            </span>
          </div>

          {/* Presentation Mode button */}
          <button
            onClick={onStartPresentation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-mono-code font-bold transition-all cursor-pointer shadow-sm hover:border-sky-400"
            title="Launch 3-5 minute guided presentation demo"
          >
            <Play className="w-3.5 h-3.5 fill-sky-400 text-sky-400" />
            <span className="hidden md:inline">DEMO MODE</span>
          </button>
        </div>
      </div>
    </header>
  );
};
