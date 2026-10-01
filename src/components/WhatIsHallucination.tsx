import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, AlertOctagon, Layers, Compass, ShieldAlert, BookOpen } from 'lucide-react';

export const WhatIsHallucination: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hallucination' | 'grounding' | 'unsupported' | 'contradiction'>('hallucination');

  const concepts = [
    {
      id: 'hallucination' as const,
      title: 'What is an AI Hallucination?',
      short: 'Fabricated or inconsistent assertions',
      definition: 'AI hallucination occurs when a generative AI system produces information that is unsupported, fabricated, or inconsistent with available evidence.',
      details: 'Large Language Models are probabilistic token predictors trained on statistical associations. When asked for facts they do not reliably possess, they tend to generate plausible-sounding confabulations (invented names, nonexistent citations, wrong dates, or false claims) with high linguistic fluency.',
      realWorldRisk: 'In legal filings, medical advice, and financial audits, a fluent hallucination can mislead experts because the grammar and tone appear authoritative.',
    },
    {
      id: 'grounding' as const,
      title: 'What is Grounding?',
      short: 'Anchoring output to verified external sources',
      definition: 'Grounding connects generated responses to external evidence so that claims can be checked against identifiable sources.',
      details: 'Rather than relying solely on frozen parametric weights, a grounded system cross-references claims against external knowledge bases, live web search indices, or authoritative reference documents to corroborate every proposition.',
      realWorldRisk: 'Ungrounded LLMs generate plausible fiction; grounded LLMs provide verifiable audit trails with primary citations.',
    },
    {
      id: 'unsupported' as const,
      title: 'What is an Unsupported Claim?',
      short: 'Lacking sufficient evidence in sources',
      definition: 'A statement for which sufficient supporting evidence was not found.',
      details: 'An unsupported claim is not necessarily provably false in the universe, but within the boundary of available authoritative evidence, no factual corroboration exists. In a strict academic benchmark, unverified assertions are treated as potential hallucinations.',
      realWorldRisk: 'Attributing inventions to real historical figures or claiming unperformed medical trials.',
    },
    {
      id: 'contradiction' as const,
      title: 'What is Contradiction?',
      short: 'Direct clash with authoritative facts',
      definition: 'A claim that conflicts with reliable evidence retrieved during verification.',
      details: 'Contradiction represents an explicit factual clash—for example, asserting that a company was founded in 2012 when certified incorporation documents prove it was incorporated in 2015.',
      realWorldRisk: 'High-severity failure mode where the model directly refutes established, verifiable reality.',
    },
  ];

  const currentConcept = concepts.find((c) => c.id === activeTab) || concepts[0];

  return (
    <section id="what-is-hallucination" className="py-16 border-b border-slate-800 bg-[#080d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-sky-400 text-xs font-mono-code">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Interactive Educational Reference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Understanding AI Factuality &amp; Hallucinations
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Click through core research definitions to understand the mechanics of automated natural language inference (NLI) and claim-level verification.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {concepts.map((concept) => (
            <button
              key={concept.id}
              onClick={() => setActiveTab(concept.id)}
              className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                activeTab === concept.id
                  ? 'bg-slate-900 border-sky-500 shadow-md ring-1 ring-sky-500/30'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-mono-code font-bold text-sky-400 mb-1">
                {concept.title.split('?')[0].replace('What is ', '')}
              </div>
              <div className="text-[11px] text-slate-400 font-sans leading-snug">
                {concept.short}
              </div>
            </button>
          ))}
        </div>

        {/* Active Concept Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto space-y-6">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400 font-mono-code">&gt;</span>
              <span>{currentConcept.title}</span>
            </h3>
            <blockquote className="p-4 rounded-xl bg-slate-950/80 border-l-4 border-sky-400 text-slate-100 text-sm sm:text-base font-medium leading-relaxed">
              &ldquo;{currentConcept.definition}&rdquo;
            </blockquote>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <span className="font-mono-code text-slate-400 font-bold uppercase tracking-wider block">
                Technical Mechanism
              </span>
              <p className="text-slate-300 leading-relaxed">
                {currentConcept.details}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <span className="font-mono-code text-rose-400 font-bold uppercase tracking-wider block">
                Impact &amp; Failure Mode
              </span>
              <p className="text-slate-300 leading-relaxed">
                {currentConcept.realWorldRisk}
              </p>
            </div>
          </div>
        </div>

        {/* 4-Tier Verification Status Taxonomy */}
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-xs font-mono-code text-slate-400 uppercase tracking-wider">
            Verification Status Taxonomy &amp; Color Coding:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* SUPPORTED */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono-code">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>SUPPORTED</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                The proposition directly entails and is corroborated by retrieved reliable evidence.
              </p>
            </div>

            {/* UNSUPPORTED */}
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1.5">
              <div className="flex items-center gap-1.5 text-rose-400 font-bold font-mono-code">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>UNSUPPORTED</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                No reliable evidence could be located to verify the entities, dates, or assertions.
              </p>
            </div>

            {/* CONTRADICTED */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold font-mono-code">
                <AlertOctagon className="w-4 h-4 shrink-0" />
                <span>CONTRADICTED</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Retrieved authoritative sources state facts that directly conflict with the claim.
              </p>
            </div>

            {/* UNCERTAIN */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-300 font-bold font-mono-code">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span>UNCERTAIN</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Available sources are ambiguous, conflicting, or inconclusive to make a determination.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
