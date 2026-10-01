import React from 'react';
import { Layers, Search, Cpu, GitCompare, ShieldCheck, RefreshCw, FileText, CheckCircle2 } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Query & Response Ingestion',
      icon: FileText,
      detail: 'The user query and full candidate AI response are ingested. If reference context or a source URL is supplied, it is cached as bounded ground truth.',
    },
    {
      num: '02',
      title: 'Atomic Claim Extraction',
      icon: Layers,
      detail: 'The response is tokenized and decomposed into atomic propositional clauses. Compound sentences are split so that single fabricated entities cannot hide within otherwise true paragraphs.',
    },
    {
      num: '03',
      title: 'Web Evidence Retrieval',
      icon: Search,
      detail: 'Targeted Google Search queries are formulated for each proposition. The system crawls authoritative sources, prioritizing .gov, .edu, and accredited scientific registries.',
    },
    {
      num: '04',
      title: 'NLI Entailment Comparison',
      icon: GitCompare,
      detail: 'Natural Language Inference (NLI) checks whether the retrieved evidence premise strictly entails, contradicts, or fails to prove each atomic claim.',
    },
    {
      num: '05',
      title: 'Reliability Metrics Scoring',
      icon: ShieldCheck,
      detail: 'Grounded Claim Rate, Unsupported Rate, and Contradiction Rate are computed across the verification run to quantify hallucination risk.',
    },
    {
      num: '06',
      title: 'Evidence-Backed Revision',
      icon: RefreshCw,
      detail: 'A corrected answer is dynamically generated using only verified evidence, highlighting what assertions were removed, corrected, or added.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-[#080d1a] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono-code font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Verification Pipeline Mechanics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How the Detection Engine Works
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed font-sans">
            Our system does not determine absolute truth. It evaluates whether claims are supported by the evidence available to the verification process.
          </p>
        </div>

        {/* 6-Step Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-code font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30">
                    STEP {s.num}
                  </span>
                  <Icon className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-base font-bold text-white">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {s.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Core Methodology Box */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sky-400 font-mono-code text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>Academic Rigor &amp; Anti-Fabrication Principles</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            The verification engine adheres to a conservative epistemic standard: when authoritative sources cannot be found to corroborate a claim, it is classified as <strong className="text-rose-400 font-mono-code">[UNSUPPORTED]</strong> rather than assuming truth. The system never manufactures citations, generates fake URLs, or claims support without verbatim proof.
          </p>
        </div>
      </div>
    </section>
  );
};
