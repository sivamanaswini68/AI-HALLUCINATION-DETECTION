import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, XCircle, Search, ShieldAlert, Cpu, Layers, GitCompare, RefreshCw, Sparkles, FileText } from 'lucide-react';

interface HeroSectionProps {
  onVerifyClick: () => void;
  onHowItWorksClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onVerifyClick,
  onHowItWorksClick,
}) => {
  // Step state for the interactive animated demo
  const [animStep, setAnimStep] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimStep((prev) => (prev + 1) % 4);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const pipelineStages = [
    { label: 'USER CLAIM', icon: FileText, desc: 'Query Ingestion' },
    { label: 'AI ANSWER', icon: Cpu, desc: 'Model Output' },
    { label: 'CLAIM EXTRACTION', icon: Layers, desc: 'Atomic Split' },
    { label: 'WEB EVIDENCE SEARCH', icon: Search, desc: 'Live Grounding' },
    { label: 'EVIDENCE COMPARISON', icon: GitCompare, desc: 'NLI Entailment' },
    { label: 'VERDICT', icon: ShieldAlert, desc: 'Forensic Scoring' },
    { label: 'CORRECTED ANSWER', icon: RefreshCw, desc: 'Factual Revision' },
  ];

  return (
    <section className="relative overflow-hidden py-14 sm:py-20 border-b border-slate-800">
      {/* Subtle research grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Badges & Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono-code font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic AI Research Laboratory</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            AI Can Sound Confident.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400">
              But Is It Actually Supported by Evidence?
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            Our system investigates AI-generated answers claim-by-claim and verifies them against available evidence from reliable web sources.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onVerifyClick}
              className="px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm tracking-wide flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>VERIFY AN AI ANSWER</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onHowItWorksClick}
              className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-mono-code text-xs font-semibold tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>SEE HOW IT WORKS</span>
            </button>
          </div>
        </div>

        {/* 7-Stage Pipeline Visual Representation */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2 text-xs font-mono-code text-slate-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>System Verification Architecture Pipeline</span>
            </div>
            <span className="text-[11px] font-mono-code text-slate-500">
              Deterministic Closed &amp; Live-Web Grounding
            </span>
          </div>

          {/* Pipeline flow steps */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {pipelineStages.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.label}
                  className="relative p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between text-slate-500 text-[10px] font-mono-code">
                    <span>0{idx + 1}</span>
                    <Icon className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-100 font-mono-code leading-tight">
                      {stage.label}
                    </div>
                    <div className="text-[10px] text-slate-400 font-sans mt-0.5">
                      {stage.desc}
                    </div>
                  </div>
                  {idx < pipelineStages.length - 1 && (
                    <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 text-slate-600 text-xs z-10">
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Animated Educational Demonstration Example (ABC College) */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono-code uppercase text-sky-400 tracking-wider">
                Live Demonstration
              </span>
              <h3 className="text-base font-bold text-white">
                How Atomic Claim Decomposition Detects Hallucinations
              </h3>
            </div>
            <button
              onClick={() => setAnimStep((s) => (s + 1) % 4)}
              className="text-xs font-mono-code px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            >
              Step {animStep + 1}/4 ↻
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1: Raw AI Response */}
            <div className={`p-4 rounded-xl transition-all border ${animStep >= 0 ? 'bg-slate-900/90 border-slate-700' : 'bg-slate-950/40 border-slate-900'}`}>
              <div className="text-[11px] font-mono-code text-slate-400 mb-2">
                1. AI Model Answer (ChatGPT / Gemini / Claude)
              </div>
              <p className="text-sm text-slate-200 font-medium leading-relaxed italic">
                &ldquo;ABC College was founded by <span className="text-rose-400 underline decoration-rose-500 font-semibold">Ravi Kumar</span> in 2008.&rdquo;
              </p>
              <div className="mt-4 text-xs text-slate-400 font-mono-code">
                Sounding confident, plausible, and factual.
              </div>
            </div>

            {/* Step 2: Claim Breakdown */}
            <div className={`p-4 rounded-xl transition-all border ${animStep >= 1 ? 'bg-slate-900/90 border-slate-700' : 'bg-slate-950/40 border-slate-900'}`}>
              <div className="text-[11px] font-mono-code text-slate-400 mb-2">
                2. System Decomposes into Atomic Claims
              </div>
              <div className="space-y-2 text-xs font-mono-code">
                <div className="p-2 rounded bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400">Claim 1: </span>
                  <span className="text-slate-200">&ldquo;ABC College was established in 2008.&rdquo;</span>
                </div>
                <div className="p-2 rounded bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400">Claim 2: </span>
                  <span className="text-slate-200">&ldquo;ABC College was founded by Ravi Kumar.&rdquo;</span>
                </div>
              </div>
            </div>

            {/* Step 3: Evidence Grounding & Verdict */}
            <div className={`p-4 rounded-xl transition-all border ${animStep >= 2 ? 'bg-slate-900/90 border-slate-700' : 'bg-slate-950/40 border-slate-900'}`}>
              <div className="text-[11px] font-mono-code text-slate-400 mb-2">
                3. Web Evidence Grounding &amp; Verdict
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded bg-emerald-950/30 border border-emerald-500/40 flex items-center justify-between">
                  <span className="text-slate-200 font-mono-code">Claim 1 (2008)</span>
                  <span className="font-bold text-emerald-400 font-mono-code flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> SUPPORTED
                  </span>
                </div>
                <div className="p-2 rounded bg-rose-950/30 border border-rose-500/40 flex items-center justify-between">
                  <span className="text-slate-200 font-mono-code">Claim 2 (Ravi Kumar)</span>
                  <span className="font-bold text-rose-400 font-mono-code flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> UNSUPPORTED
                  </span>
                </div>
              </div>
              <div className="text-[11px] text-slate-400 mt-3 font-sans">
                Retrieved official registry contains no record of Ravi Kumar.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
