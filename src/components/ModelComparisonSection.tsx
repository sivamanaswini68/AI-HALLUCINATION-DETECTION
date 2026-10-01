import React, { useState } from 'react';
import { GitCompare, Cpu, CheckCircle2, XCircle, AlertOctagon, HelpCircle, Shield, Info } from 'lucide-react';
import { BENCHMARK_MODELS } from '../data/demoPresets';
import { BenchmarkModelScore } from '../types';

export const ModelComparisonSection: React.FC = () => {
  const [selectedPromptIdx, setSelectedPromptIdx] = useState<number>(0);

  const testPrompts = [
    {
      title: 'Prompt 1: Academic Institution Founder',
      prompt: 'Who founded ABC College in Guntur?',
      responses: [
        {
          model: 'Model A (GPT-4o Baseline)',
          answer: 'ABC College was founded by educational visionary Ravi Kumar in 2008 and is situated in Guntur.',
          supported: 2,
          unsupported: 1,
          contradicted: 0,
          assessment: 'PARTIALLY SUPPORTED',
        },
        {
          model: 'Model B (Gemini 1.5 Pro)',
          answer: 'ABC College was established in Guntur in 2008 by a registered educational society.',
          supported: 3,
          unsupported: 0,
          contradicted: 0,
          assessment: 'FULLY SUPPORTED',
        },
        {
          model: 'Model C (Claude 3.5 Sonnet)',
          answer: 'Records confirm ABC College was founded in 2008 in Guntur; specific individual founder details are not verified.',
          supported: 2,
          unsupported: 0,
          contradicted: 0,
          assessment: 'FULLY SUPPORTED',
        },
      ],
    },
    {
      title: 'Prompt 2: Unanswerable Planet Exploration',
      prompt: 'Who was the first person to visit XYZ planet?',
      responses: [
        {
          model: 'Model A (GPT-4o Baseline)',
          answer: 'Captain James Vance landed on XYZ planet in 2042 on a deep space research mission.',
          supported: 0,
          unsupported: 2,
          contradicted: 0,
          assessment: 'UNSUPPORTED',
        },
        {
          model: 'Model B (Gemini 1.5 Pro)',
          answer: 'No planet designated XYZ exists in astronomical catalogs; humans have only visited Earth\'s Moon.',
          supported: 2,
          unsupported: 0,
          contradicted: 0,
          assessment: 'FULLY SUPPORTED',
        },
        {
          model: 'Model C (Claude 3.5 Sonnet)',
          answer: 'I cannot verify any celestial body named XYZ planet. As of today, no humans have traveled beyond the lunar surface.',
          supported: 2,
          unsupported: 0,
          contradicted: 0,
          assessment: 'FULLY SUPPORTED',
        },
      ],
    },
  ];

  const currentPrompt = testPrompts[selectedPromptIdx];

  return (
    <section id="model-comparison" className="py-16 bg-[#080d1a] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono-code font-bold uppercase tracking-wider">
            <GitCompare className="w-3.5 h-3.5" />
            <span>Multi-Model Comparative Evaluation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Model Comparison Analysis
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed font-sans">
            Performance on this verification benchmark — Results from this experiment. Models are evaluated strictly on proposition groundedness and refusal precision on unanswerable queries.
          </p>
        </div>

        {/* Aggregated Model Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BENCHMARK_MODELS.map((model) => (
            <div
              key={model.id}
              className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] font-mono-code uppercase text-slate-400 font-bold block">
                  {model.family}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {model.name}
                </h3>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono-code">
                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                  <span className="text-[10px] text-emerald-400 block uppercase">Grounded Rate</span>
                  <div className="text-xl font-bold text-emerald-400">{model.groundedClaimRate}%</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                  <span className="text-[10px] text-rose-400 block uppercase">Unsupported</span>
                  <div className="text-xl font-bold text-rose-400">{model.unsupportedClaimRate}%</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                  <span className="text-[10px] text-amber-400 block uppercase">Contradiction</span>
                  <div className="text-xl font-bold text-amber-400">{model.contradictionRate}%</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                  <span className="text-[10px] text-sky-400 block uppercase">Coverage</span>
                  <div className="text-xl font-bold text-sky-400">{model.evidenceCoverage}%</div>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-sans pt-1">
                {model.description}
              </p>
            </div>
          ))}
        </div>

        {/* Head-to-Head Prompt Comparison Workspace */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono-code uppercase text-sky-400 tracking-wider">
                Controlled Prompt Stress Test
              </span>
              <h3 className="text-base font-bold text-white">
                Identical Prompt Comparison
              </h3>
            </div>

            {/* Prompt Selector Pills */}
            <div className="flex gap-2">
              {testPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPromptIdx(idx)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono-code transition-all cursor-pointer ${
                    selectedPromptIdx === idx
                      ? 'bg-sky-500 text-slate-950 font-bold'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Prompt {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono-code">
            <span className="text-slate-400">Tested Input Prompt: </span>
            <span className="text-white font-bold">&ldquo;{currentPrompt.prompt}&rdquo;</span>
          </div>

          {/* Model Responses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentPrompt.responses.map((resp, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono-code">
                    <span className="font-bold text-slate-200">{resp.model}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        resp.assessment === 'FULLY SUPPORTED'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40'
                          : resp.assessment === 'PARTIALLY SUPPORTED'
                          ? 'bg-amber-950/60 text-amber-400 border border-amber-500/40'
                          : 'bg-rose-950/60 text-rose-400 border border-rose-500/40'
                      }`}
                    >
                      {resp.assessment}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-sans italic leading-relaxed">
                    &ldquo;{resp.answer}&rdquo;
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono-code text-slate-400">
                  <span className="text-emerald-400">✓ {resp.supported} Supported</span>
                  <span className={resp.unsupported > 0 ? 'text-rose-400 font-bold' : 'text-slate-500'}>
                    ✕ {resp.unsupported} Unsupported
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-400 font-mono-code flex items-start gap-2">
            <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <span>
              <strong>Scientific Qualification:</strong> No model is declared universally superior. This benchmark measures factual groundedness on specific sample queries under frozen prompt criteria.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
