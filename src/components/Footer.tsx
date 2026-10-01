import React from 'react';
import { ShieldCheck, BookOpen, GitBranch, ExternalLink, Globe } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#050811] border-t border-slate-800/80 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-slate-800/80 pb-8">
          <div className="space-y-2 max-w-md">
            <div className="flex items-center gap-2.5 text-white font-bold text-sm tracking-tight">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
              <span>AI Hallucination Detection Benchmark</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed font-sans">
              &ldquo;Investigating whether AI-generated information can be supported by evidence.&rdquo;
            </p>
            <div className="text-[11px] font-mono-code text-slate-400">
              Built as an academic AI evaluation project.
            </div>
          </div>

          {/* Navigation links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono-code text-xs">
            <div className="space-y-2">
              <span className="text-white font-bold block text-[10px] uppercase tracking-wider">
                Investigation
              </span>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <button onClick={() => onNavigate('verify')} className="hover:text-sky-400 cursor-pointer">
                    Verify AI Answer
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('benchmark')} className="hover:text-sky-400 cursor-pointer">
                    Benchmark Suite
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('model-comparison')} className="hover:text-sky-400 cursor-pointer">
                    Model Comparison
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-white font-bold block text-[10px] uppercase tracking-wider">
                Research
              </span>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <button onClick={() => onNavigate('what-is-hallucination')} className="hover:text-sky-400 cursor-pointer">
                    Hallucination Theory
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('how-it-works')} className="hover:text-sky-400 cursor-pointer">
                    NLI Architecture
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('research')} className="hover:text-sky-400 cursor-pointer">
                    Error Analytics
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-white font-bold block text-[10px] uppercase tracking-wider">
                Validation
              </span>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <button onClick={() => onNavigate('human-validation')} className="hover:text-sky-400 cursor-pointer">
                    Human Agreement Lab
                  </button>
                </li>
                <li>
                  <span className="text-slate-500">Live Web Grounding</span>
                </li>
                <li>
                  <span className="text-slate-500">Google Search Tools</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-mono-code text-slate-500">
          <div>
            AI Hallucination Detection Benchmark &copy; 2026. Academic Research &amp; Evaluation Project.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Deterministic Entailment</span>
            <span>•</span>
            <span>Google Search Grounding</span>
            <span>•</span>
            <span>Zero Hallucination Tolerance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
