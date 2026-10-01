import React, { useState } from 'react';
import { Network, CheckCircle2, XCircle, AlertOctagon, HelpCircle, Globe, FileText, ArrowRight } from 'lucide-react';
import { EvaluationResult, Claim, ClaimStatus } from '../types';

interface InteractiveEvidenceGraphProps {
  result: EvaluationResult;
  activeClaimId: string | null;
  onSelectClaim: (claimId: string) => void;
}

export const InteractiveEvidenceGraph: React.FC<InteractiveEvidenceGraphProps> = ({
  result,
  activeClaimId,
  onSelectClaim,
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const getStatusColor = (status: ClaimStatus) => {
    switch (status) {
      case 'SUPPORTED':
        return {
          border: 'border-emerald-500',
          bg: 'bg-emerald-950/40',
          text: 'text-emerald-400',
          badgeBg: 'bg-emerald-500',
          line: '#10b981',
        };
      case 'CONTRADICTED':
        return {
          border: 'border-amber-500',
          bg: 'bg-amber-950/40',
          text: 'text-amber-400',
          badgeBg: 'bg-amber-500',
          line: '#f59e0b',
        };
      case 'UNSUPPORTED':
        return {
          border: 'border-rose-500',
          bg: 'bg-rose-950/40',
          text: 'text-rose-400',
          badgeBg: 'bg-rose-500',
          line: '#f43f5e',
        };
      case 'UNCERTAIN':
      default:
        return {
          border: 'border-slate-500',
          bg: 'bg-slate-900/60',
          text: 'text-slate-300',
          badgeBg: 'bg-slate-500',
          line: '#94a3b8',
        };
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono-code uppercase text-sky-400 tracking-wider">
            NLI Proposition Mapping
          </span>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Network className="w-5 h-5 text-sky-400" />
            <span>Interactive Evidence Graph</span>
          </h3>
        </div>
        <div className="text-[11px] font-mono-code text-slate-400">
          Click any claim node to trace reasoning
        </div>
      </div>

      {/* Visual Graph Layout */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[680px] space-y-6">
          {/* Top Level: Question & AI Answer */}
          <div className="grid grid-cols-2 gap-4">
            {/* Question Node */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 space-y-1">
              <span className="text-[10px] font-mono-code uppercase text-sky-400 font-bold block">
                [NODE 01: USER QUERY]
              </span>
              <p className="text-xs text-slate-200 font-medium line-clamp-2">
                &ldquo;{result.question}&rdquo;
              </p>
            </div>

            {/* AI Answer Node */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 space-y-1">
              <span className="text-[10px] font-mono-code uppercase text-purple-400 font-bold block">
                [NODE 02: AI ANSWER TO AUDIT]
              </span>
              <p className="text-xs text-slate-200 font-medium line-clamp-2">
                &ldquo;{result.answer}&rdquo;
              </p>
            </div>
          </div>

          {/* Connecting Arrow Divider */}
          <div className="flex justify-center text-slate-600 text-xs font-mono-code">
            ↓ DECOMPOSED INTO {result.totalClaims} ATOMIC FACTUAL PROPOSITIONS ↓
          </div>

          {/* Middle Level: Claims & Evidence Links */}
          <div className="space-y-4">
            {result.claims.map((claim) => {
              const colors = getStatusColor(claim.status);
              const isSelected = activeClaimId === claim.id;

              return (
                <div
                  key={claim.id}
                  onClick={() => onSelectClaim(claim.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? `${colors.bg} ${colors.border} ring-1 ring-offset-2 ring-offset-slate-950 ring-${colors.line}`
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                        CLAIM 0{claim.claimNumber}
                      </span>
                      <span className="text-xs font-semibold text-slate-100">
                        &ldquo;{claim.text}&rdquo;
                      </span>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span className={`text-[10px] font-mono-code font-bold px-2 py-0.5 rounded border ${colors.border} ${colors.text} bg-slate-950`}>
                        {claim.status}
                      </span>
                      <span className="text-[10px] font-mono-code text-slate-400">
                        {Math.round(claim.confidence * 100)}% conf
                      </span>
                    </div>
                  </div>

                  {/* Flow Trace: Evidence & Verdict */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-800/80 text-xs">
                    {/* Left: Evidence Node */}
                    <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-400 font-mono-code">
                        <Globe className="w-3 h-3 text-sky-400" />
                        <span>SOURCE / EVIDENCE PATH:</span>
                      </div>
                      {claim.status === 'SUPPORTED' ? (
                        <p className="text-emerald-300/90 italic font-mono-code line-clamp-2">
                          &ldquo;{claim.evidenceSnippet || 'Verified in official primary registry.'}&rdquo;
                        </p>
                      ) : claim.status === 'CONTRADICTED' ? (
                        <p className="text-amber-300/90 italic font-mono-code line-clamp-2">
                          &ldquo;{claim.evidenceSnippet || 'Contradictory record identified.'}&rdquo;
                        </p>
                      ) : (
                        <p className="text-rose-400/90 italic font-mono-code">
                          [NO SUFFICIENT EVIDENCE IN AUTHORITATIVE SOURCES]
                        </p>
                      )}
                    </div>

                    {/* Right: Forensic Verdict */}
                    <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] space-y-1">
                      <span className="text-slate-400 font-mono-code block">
                        FORENSIC ENTAILMENT REASON:
                      </span>
                      <p className="text-slate-300 line-clamp-2">
                        {claim.reason}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
