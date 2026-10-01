import React, { useState } from 'react';
import { BarChart3, CheckCircle2, XCircle, AlertOctagon, HelpCircle, Filter, Upload, Play, RefreshCw } from 'lucide-react';
import { BENCHMARK_QUESTIONS } from '../data/demoPresets';
import { BenchmarkQuestionItem, ClaimStatus } from '../types';

export const BenchmarkSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [questions, setQuestions] = useState<BenchmarkQuestionItem[]>(BENCHMARK_QUESTIONS);
  const [isRunningAll, setIsRunningAll] = useState<boolean>(false);
  const [evaluatedItems, setEvaluatedItems] = useState<Record<string, ClaimStatus>>({
    'bq-1': 'SUPPORTED',
    'bq-2': 'UNSUPPORTED',
    'bq-3': 'CONTRADICTED',
    'bq-4': 'UNSUPPORTED',
    'bq-5': 'SUPPORTED',
    'bq-6': 'SUPPORTED',
    'bq-7': 'CONTRADICTED',
    'bq-8': 'CONTRADICTED',
  });

  const categories = [
    'All',
    'Factual',
    'Numerical',
    'Temporal',
    'Entity',
    'Reasoning',
    'Multi-hop',
    'Unanswerable',
    'Contradiction',
  ];

  const filteredQuestions = selectedCategory === 'All'
    ? questions
    : questions.filter((q) => q.category === selectedCategory);

  const total = Object.keys(evaluatedItems).length;
  const supported = Object.values(evaluatedItems).filter((s) => s === 'SUPPORTED').length;
  const unsupported = Object.values(evaluatedItems).filter((s) => s === 'UNSUPPORTED').length;
  const contradicted = Object.values(evaluatedItems).filter((s) => s === 'CONTRADICTED').length;

  const groundedRate = total > 0 ? Math.round((supported / total) * 100) : 0;
  const hallucinationRate = total > 0 ? Math.round(((unsupported + contradicted) / total) * 100) : 0;

  const handleRunAll = () => {
    setIsRunningAll(true);
    setTimeout(() => {
      setIsRunningAll(false);
    }, 1200);
  };

  const getStatusBadge = (status: ClaimStatus) => {
    switch (status) {
      case 'SUPPORTED':
        return <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono-code font-bold">SUPPORTED</span>;
      case 'CONTRADICTED':
        return <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-mono-code font-bold">CONTRADICTED</span>;
      case 'UNSUPPORTED':
        return <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30 text-[10px] font-mono-code font-bold">UNSUPPORTED</span>;
      case 'UNCERTAIN':
      default:
        return <span className="px-2 py-0.5 rounded bg-slate-700/40 text-slate-300 border border-slate-600 text-[10px] font-mono-code font-bold">UNCERTAIN</span>;
    }
  };

  return (
    <section id="benchmark" className="py-16 bg-[#080d1a] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono-code font-bold uppercase tracking-wider mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Multi-Domain Test Suite</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Standardized Benchmark Mode
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl font-sans">
              Test generative models across 8 distinct stress-test categories, including temporal divergence, entity fabrications, and unanswerable prompts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunAll}
              disabled={isRunningAll}
              className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs font-mono-code flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              {isRunningAll ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>EVALUATING SUITE...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                  <span>EXECUTE BENCHMARK</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Aggregated Benchmark Results Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <span className="text-xs font-mono-code uppercase text-slate-400 font-bold">
              Benchmark Aggregate Performance (8 Domain Taxonomy)
            </span>
            <span className="text-[11px] font-mono-code text-slate-500">
              Curated Research Benchmark Evaluation
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono-code uppercase text-slate-400">Total Evaluated</span>
              <div className="text-3xl font-extrabold text-white font-mono-code">{total}</div>
              <div className="text-[10px] font-mono-code text-slate-500">8 taxonomy dimensions</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono-code uppercase text-emerald-400">Grounded Rate</span>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono-code">{groundedRate}%</div>
              <div className="text-[10px] font-mono-code text-slate-500">{supported} verified statements</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono-code uppercase text-rose-400">Hallucination Rate</span>
              <div className="text-3xl font-extrabold text-rose-400 font-mono-code">{hallucinationRate}%</div>
              <div className="text-[10px] font-mono-code text-slate-500">{unsupported + contradicted} ungrounded</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono-code uppercase text-amber-400">Contradictions</span>
              <div className="text-3xl font-extrabold text-amber-400 font-mono-code">{contradicted}</div>
              <div className="text-[10px] font-mono-code text-slate-500">Direct evidence clashes</div>
            </div>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono-code text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <span>FILTER BY QUESTION CATEGORY:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-sky-500 text-slate-950 font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Questions Table / List */}
        <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
          <div className="divide-y divide-slate-800">
            {filteredQuestions.map((q) => (
              <div key={q.id} className="p-5 hover:bg-slate-900/40 transition-colors space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono-code text-[10px] font-bold">
                      {q.category}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {q.question}
                    </span>
                  </div>
                  <div>{getStatusBadge(evaluatedItems[q.id] || q.expectedStatus)}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
                    <span className="text-[10px] font-mono-code text-slate-400 block mb-1">
                      Tested AI Response:
                    </span>
                    <p className="text-slate-300 italic font-mono-code text-[11px]">
                      &ldquo;{q.aiAnswer}&rdquo;
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
                    <span className="text-[10px] font-mono-code text-slate-400 block mb-1">
                      Retrieved Ground Truth ({q.sourceDomain}):
                    </span>
                    <p className="text-slate-300 italic font-mono-code text-[11px]">
                      &ldquo;{q.evidenceSnippet}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
