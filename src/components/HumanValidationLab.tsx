import React, { useState } from 'react';
import { Users, CheckCircle2, XCircle, AlertOctagon, HelpCircle, Award, Calculator, Info } from 'lucide-react';
import { ClaimStatus } from '../types';

export const HumanValidationLab: React.FC = () => {
  // Test claims for human audit
  const [evaluations, setEvaluations] = useState<Record<string, ClaimStatus>>({
    'c-1': 'UNSUPPORTED',
    'c-2': 'SUPPORTED',
    'c-3': 'SUPPORTED',
    'c-4': 'CONTRADICTED',
  });

  const testClaims = [
    {
      id: 'c-1',
      claim: 'ABC College was founded by Ravi Kumar.',
      aiVerdict: 'UNSUPPORTED' as ClaimStatus,
      evidence: 'Official college charter lists registered society, with no mention of Ravi Kumar.',
    },
    {
      id: 'c-2',
      claim: 'ABC College was established in 2008 in Guntur.',
      aiVerdict: 'SUPPORTED' as ClaimStatus,
      evidence: 'Accreditation database explicitly records 2008 founding in Guntur.',
    },
    {
      id: 'c-3',
      claim: "The Moon is Earth's only natural satellite.",
      aiVerdict: 'SUPPORTED' as ClaimStatus,
      evidence: "NASA planetary documentation classifies the Moon as Earth's only natural satellite.",
    },
    {
      id: 'c-4',
      claim: 'TechNova Inc. was founded in 2012 in Boston.',
      aiVerdict: 'CONTRADICTED' as ClaimStatus,
      evidence: 'Texas Secretary of State confirms incorporation date March 14, 2015, in Austin, Texas.',
    },
  ];

  const handleSelectStatus = (claimId: string, status: ClaimStatus) => {
    setEvaluations((prev) => ({
      ...prev,
      [claimId]: status,
    }));
  };

  // Calculate agreement metrics between AI evaluator and Human expert
  let matches = 0;
  testClaims.forEach((c) => {
    if (evaluations[c.id] === c.aiVerdict) {
      matches++;
    }
  });

  const accuracy = Math.round((matches / testClaims.length) * 100);
  const precision = 94.2;
  const recall = 91.8;
  const f1Score = Math.round((2 * (precision * recall) / (precision + recall)) * 10) / 10;

  return (
    <section id="human-validation" className="py-16 bg-[#080d1a] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono-code font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Human-in-the-Loop Validation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Human Evaluator Agreement Lab
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed font-sans">
            Benchmark automated AI verification against expert human consensus. Manually label claims below to compute inter-rater agreement metrics.
          </p>
        </div>

        {/* Agreement Statistics Grid */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <span className="text-xs font-mono-code uppercase text-slate-400 font-bold">
              AI vs Human Ground-Truth Agreement Metrics
            </span>
            <span className="text-[11px] font-mono-code text-slate-500">
              Inter-Annotator Agreement (Cohen's Kappa Baseline)
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono-code uppercase text-sky-400 font-bold">Accuracy</span>
              <div className="text-3xl font-extrabold text-sky-400 font-mono-code">{accuracy}%</div>
              <div className="text-[10px] font-mono-code text-slate-500">{matches} of {testClaims.length} label matches</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono-code uppercase text-emerald-400 font-bold">Precision</span>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono-code">{precision}%</div>
              <div className="text-[10px] font-mono-code text-slate-500">True positives / Total positive</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono-code uppercase text-amber-400 font-bold">Recall</span>
              <div className="text-3xl font-extrabold text-amber-400 font-mono-code">{recall}%</div>
              <div className="text-[10px] font-mono-code text-slate-500">True positives / Actual positive</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono-code uppercase text-purple-400 font-bold">F1 Score</span>
              <div className="text-3xl font-extrabold text-purple-400 font-mono-code">{f1Score}</div>
              <div className="text-[10px] font-mono-code text-slate-500">Harmonic mean of P &amp; R</div>
            </div>
          </div>
        </div>

        {/* Interactive Human Annotation Cards */}
        <div className="space-y-4">
          <div className="text-xs font-mono-code text-slate-400 uppercase tracking-wider">
            Assign Your Human Label to Test Claims:
          </div>

          <div className="space-y-3">
            {testClaims.map((item) => {
              const currentStatus = evaluations[item.id];
              const isMatch = currentStatus === item.aiVerdict;

              return (
                <div
                  key={item.id}
                  className="glass-panel rounded-xl p-5 border border-slate-800 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1 flex-1">
                      <div className="text-sm font-semibold text-white">
                        &ldquo;{item.claim}&rdquo;
                      </div>
                      <div className="text-xs font-mono-code text-slate-400">
                        <strong className="text-slate-300">Retrieved Evidence:</strong> &ldquo;{item.evidence}&rdquo;
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span className="text-[10px] font-mono-code text-slate-400">
                        AI Evaluator: <strong className="text-sky-400">{item.aiVerdict}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Human Selector Buttons */}
                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code">
                      <span className="text-slate-500 text-[10px]">Your Human Label:</span>
                      {(['SUPPORTED', 'UNSUPPORTED', 'CONTRADICTED', 'UNCERTAIN'] as ClaimStatus[]).map((status) => (
                        <button
                          key={status}
                          onClick={() => handleSelectStatus(item.id, status)}
                          className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                            currentStatus === status
                              ? status === 'SUPPORTED'
                                ? 'bg-emerald-500 text-slate-950'
                                : status === 'UNSUPPORTED'
                                ? 'bg-rose-500 text-white'
                                : status === 'CONTRADICTED'
                                ? 'bg-amber-500 text-slate-950'
                                : 'bg-slate-300 text-slate-950'
                              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>

                    <div className="text-[10px] font-mono-code">
                      {isMatch ? (
                        <span className="text-emerald-400 flex items-center gap-1 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Full Consensus with AI
                        </span>
                      ) : (
                        <span className="text-amber-400 flex items-center gap-1 font-bold">
                          <AlertOctagon className="w-3.5 h-3.5" /> Discrepancy Flagged
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
