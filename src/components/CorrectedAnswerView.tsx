import React from 'react';
import { RefreshCw, CheckCircle2, AlertTriangle, MinusCircle, PlusCircle, Check } from 'lucide-react';
import { CorrectedAnswerDiff, Claim } from '../types';

interface CorrectedAnswerViewProps {
  originalAnswer: string;
  claims: Claim[];
  correctedData: CorrectedAnswerDiff;
}

export const CorrectedAnswerView: React.FC<CorrectedAnswerViewProps> = ({
  originalAnswer,
  claims,
  correctedData,
}) => {
  // Identify unsupported and contradicted claims
  const hallucinatedClaims = claims.filter(
    (c) => c.status === 'UNSUPPORTED' || c.status === 'CONTRADICTED'
  );

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono-code uppercase text-emerald-400 tracking-wider">
            Evidence-Backed Synthesis
          </span>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-emerald-400" />
            <span>Factual Revision &amp; Corrected Response</span>
          </h3>
        </div>
        <span className="text-[11px] font-mono-code px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
          Strict Evidence Adherence
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original AI Answer with highlights */}
        <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code uppercase text-slate-400 font-bold">
              Original AI Model Answer
            </span>
            <span className="text-[10px] font-mono-code text-rose-400">
              {hallucinatedClaims.length} flagged assertion(s)
            </span>
          </div>

          <div className="text-sm text-slate-200 leading-relaxed font-sans p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
            {originalAnswer}
          </div>

          {hallucinatedClaims.length > 0 && (
            <div className="text-[11px] font-mono-code text-rose-400 bg-rose-950/20 p-2.5 rounded border border-rose-500/30 flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>
                Highlighted assertions were identified as unproven or contradicted by verified evidence.
              </span>
            </div>
          )}
        </div>

        {/* Verified Corrected Answer */}
        <div className="p-5 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-3 ring-1 ring-emerald-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code uppercase text-emerald-400 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Evidence-Backed Answer</span>
            </span>
            <span className="text-[10px] font-mono-code text-emerald-400 font-bold">
              100% Grounded
            </span>
          </div>

          <div className="text-sm text-emerald-100 leading-relaxed font-medium p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30">
            &ldquo;{correctedData.verifiedAnswer}&rdquo;
          </div>

          <div className="text-[11px] font-mono-code text-emerald-400/90 flex items-center gap-1.5">
            <Check className="w-3 h-3" />
            <span>Retains only propositions supported by authoritative citations.</span>
          </div>
        </div>
      </div>

      {/* WHAT CHANGED DIFF BREAKDOWN */}
      <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="text-xs font-mono-code uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
          <span>WHAT CHANGED? (FORENSIC AUDIT DIFF)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono-code">
          {/* Removed Claims */}
          <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-rose-400 font-bold flex items-center gap-1.5 text-[11px]">
              <MinusCircle className="w-3.5 h-3.5" />
              <span>REMOVED (UNSUPPORTED):</span>
            </span>
            {correctedData.diff.removed && correctedData.diff.removed.length > 0 ? (
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                {correctedData.diff.removed.map((item, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-rose-400">•</span>
                    <span className="line-through opacity-80">&ldquo;{item}&rdquo;</span>
                  </li>
                ))}
              </ul>
            ) : (
              <span className="text-slate-500 text-[11px]">No unproven claims removed.</span>
            )}
          </div>

          {/* Corrected Statements */}
          <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-amber-400 font-bold flex items-center gap-1.5 text-[11px]">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>CORRECTED (CONTRADICTIONS):</span>
            </span>
            {correctedData.diff.corrected && correctedData.diff.corrected.length > 0 ? (
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                {correctedData.diff.corrected.map((item, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-amber-400">⚡</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <span className="text-slate-500 text-[11px]">No factual contradictions found.</span>
            )}
          </div>

          {/* Added Information */}
          <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-[11px]">
              <PlusCircle className="w-3.5 h-3.5" />
              <span>ADDED (GROUNDED CONTEXT):</span>
            </span>
            {correctedData.diff.added && correctedData.diff.added.length > 0 ? (
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                {correctedData.diff.added.map((item, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-emerald-400">+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <span className="text-slate-500 text-[11px]">Direct factual alignment achieved.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
