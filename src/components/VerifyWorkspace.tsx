import React, { useState } from 'react';
import {
  Search,
  Globe,
  FileText,
  Trash2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  AlertOctagon,
  HelpCircle,
  Link,
  Layers,
  BarChart2,
  RefreshCw,
} from 'lucide-react';
import { DEMO_PRESETS } from '../data/demoPresets';
import { EvaluationResult, Claim, ClaimStatus, SourceAuthority } from '../types';
import { InteractiveEvidenceGraph } from './InteractiveEvidenceGraph';
import { CorrectedAnswerView } from './CorrectedAnswerView';

interface VerifyWorkspaceProps {
  onVerificationComplete?: (res: EvaluationResult) => void;
}

export const VerifyWorkspace: React.FC<VerifyWorkspaceProps> = () => {
  // Input states
  const [question, setQuestion] = useState<string>(DEMO_PRESETS[0].question);
  const [aiAnswer, setAiAnswer] = useState<string>(DEMO_PRESETS[0].simulatedAnswer);
  const [contextText, setContextText] = useState<string>(DEMO_PRESETS[0].context || '');
  const [sourceUrl, setSourceUrl] = useState<string>(DEMO_PRESETS[0].sourceUrl || '');
  const [showOptionalContext, setShowOptionalContext] = useState<boolean>(true);

  // Verification state & investigation pipeline
  const [isInvestigating, setIsInvestigating] = useState<boolean>(false);
  const [investigationStep, setInvestigationStep] = useState<number>(0);
  const [investigationMessage, setInvestigationMessage] = useState<string>('');
  const [evalResult, setEvalResult] = useState<EvaluationResult | null>(null);
  const [activeClaimId, setActiveClaimId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 9 Investigation Steps
  const investigationSteps = [
    'Reading AI response and tokenizing propositions...',
    'Extracting factual claims into atomic clauses...',
    'Generating verification search queries...',
    'Searching the web for authoritative evidence...',
    'Retrieving and ranking relevant sources...',
    'Comparing extracted claims with retrieved evidence...',
    'Checking for factual contradictions and entity mismatches...',
    'Calculating reliability metrics and groundedness...',
    'Generating final forensic verdict & corrected response...',
  ];

  // Load Preset
  const handleLoadPreset = (presetId: string) => {
    const preset = DEMO_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    setQuestion(preset.question);
    setAiAnswer(preset.simulatedAnswer);
    setContextText(preset.context || '');
    setSourceUrl(preset.sourceUrl || '');
    setErrorMsg(null);
  };

  const handleClear = () => {
    setQuestion('');
    setAiAnswer('');
    setContextText('');
    setSourceUrl('');
    setEvalResult(null);
    setErrorMsg(null);
  };

  // Run Investigation
  const runInvestigation = async (verifyWithWeb: boolean) => {
    if (!question.trim()) {
      setErrorMsg('Step 1 Required: Please enter the question or query.');
      return;
    }
    if (!aiAnswer.trim()) {
      setErrorMsg('Step 2 Required: Please paste the AI-generated answer to audit.');
      return;
    }

    setIsInvestigating(true);
    setErrorMsg(null);
    setEvalResult(null);
    setInvestigationStep(0);
    setInvestigationMessage(investigationSteps[0]);

    // Animate the 9-step investigation process
    let currentStep = 0;
    const stepInterval = setInterval(() => {
      currentStep++;
      if (currentStep < investigationSteps.length) {
        setInvestigationStep(currentStep);
        setInvestigationMessage(investigationSteps[currentStep]);
      }
    }, 450);

    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question.trim(),
          answer: aiAnswer.trim(),
          context: contextText.trim() ? contextText.trim() : undefined,
          sourceUrl: sourceUrl.trim() ? sourceUrl.trim() : undefined,
          verifyWithWeb,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data: EvaluationResult = await response.json();

      // Ensure animation finishes smoothly before revealing results
      clearInterval(stepInterval);
      setInvestigationStep(8);
      setInvestigationMessage('Finalizing verification report...');

      setTimeout(() => {
        setIsInvestigating(false);
        setEvalResult(data);
        if (data.claims && data.claims.length > 0) {
          const firstHallucinated = data.claims.find(
            (c) => c.status === 'UNSUPPORTED' || c.status === 'CONTRADICTED'
          );
          setActiveClaimId(firstHallucinated ? firstHallucinated.id : data.claims[0].id);
        }
      }, 500);
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsInvestigating(false);
      console.error('Investigation error:', err);
      setErrorMsg('Verification could not be completed. Please check your network connection.');
    }
  };

  // Helper for source authority badge
  const renderSourceAuthorityBadge = (authority: SourceAuthority) => {
    switch (authority) {
      case 'HIGH_AUTHORITY':
        return (
          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono-code font-bold">
            HIGH AUTHORITY
          </span>
        );
      case 'REPUTABLE':
        return (
          <span className="px-2 py-0.5 rounded bg-sky-500/15 text-sky-400 border border-sky-500/30 text-[10px] font-mono-code font-bold">
            REPUTABLE
          </span>
        );
      case 'SECONDARY':
        return (
          <span className="px-2 py-0.5 rounded bg-slate-700/40 text-slate-300 border border-slate-600/40 text-[10px] font-mono-code font-bold">
            SECONDARY
          </span>
        );
      case 'LOW_CONFIDENCE':
      default:
        return (
          <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-mono-code font-bold">
            LOW CONFIDENCE
          </span>
        );
    }
  };

  const getStatusBadge = (status: ClaimStatus) => {
    switch (status) {
      case 'SUPPORTED':
        return {
          label: 'SUPPORTED',
          border: 'border-emerald-500',
          bg: 'bg-emerald-950/40 text-emerald-400',
          icon: CheckCircle2,
        };
      case 'CONTRADICTED':
        return {
          label: 'CONTRADICTED',
          border: 'border-amber-500',
          bg: 'bg-amber-950/40 text-amber-400',
          icon: AlertOctagon,
        };
      case 'UNSUPPORTED':
        return {
          label: 'UNSUPPORTED',
          border: 'border-rose-500',
          bg: 'bg-rose-950/40 text-rose-400',
          icon: XCircle,
        };
      case 'UNCERTAIN':
      default:
        return {
          label: 'UNCERTAIN',
          border: 'border-slate-500',
          bg: 'bg-slate-800/80 text-slate-300',
          icon: HelpCircle,
        };
    }
  };

  return (
    <section id="verify" className="py-16 bg-[#080d1a] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono-code font-bold tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Verification Workspace</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Investigate an AI Answer
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Decompose generated statements into atomic claims, query authoritative web sources, and audit factual reliability.
            </p>
          </div>

          {/* Quick Preset Buttons */}
          <div className="space-y-1.5 self-start md:self-end">
            <span className="text-[11px] font-mono-code text-slate-400 block">
              Try Preset Example:
            </span>
            <div className="flex flex-wrap gap-2">
              {DEMO_PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleLoadPreset(p.id)}
                  className="px-2.5 py-1 text-xs rounded-lg font-mono-code bg-slate-900 border border-slate-700/80 hover:border-sky-500 text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  {p.title.split('(')[0].trim()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* WORKSPACE INPUT FORM */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          {/* Step 1: Enter Question */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="step-question"
                className="text-xs font-mono-code uppercase font-bold text-slate-200 flex items-center gap-2"
              >
                <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/40 flex items-center justify-center text-[10px]">
                  1
                </span>
                <span>Enter Question / Prompt</span>
              </label>
              <span className="text-[10px] font-mono-code text-slate-500">
                What did the user ask the AI?
              </span>
            </div>
            <textarea
              id="step-question"
              rows={2}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., 'Who founded ABC College and when was it established?' or 'Who was the first person to visit XYZ planet?'"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-500 transition-all font-sans leading-relaxed resize-y"
            />
          </div>

          {/* Step 2: Paste AI Response */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="step-ai-answer"
                className="text-xs font-mono-code uppercase font-bold text-slate-200 flex items-center gap-2"
              >
                <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/40 flex items-center justify-center text-[10px]">
                  2
                </span>
                <span>Paste AI-Generated Response</span>
              </label>
              <span className="text-[10px] font-mono-code text-slate-500">
                From ChatGPT, Gemini, Claude, Copilot, or any other LLM
              </span>
            </div>
            <textarea
              id="step-ai-answer"
              rows={4}
              value={aiAnswer}
              onChange={(e) => setAiAnswer(e.target.value)}
              placeholder="Paste the answer generated by ChatGPT, Gemini, Claude, Copilot, or any other AI model..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-500 transition-all font-sans leading-relaxed resize-y"
            />
          </div>

          {/* Step 3 (Optional): Add Context */}
          <div className="pt-2 border-t border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowOptionalContext(!showOptionalContext)}
                className="text-xs font-mono-code font-bold uppercase text-slate-400 hover:text-slate-200 flex items-center gap-2 cursor-pointer"
              >
                <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center justify-center text-[10px]">
                  3
                </span>
                <span>Optional Step 3 — Add Context, Reference Document, or URL</span>
                <span className="text-[10px] text-sky-400">
                  {showOptionalContext ? '▲ Collapse' : '▼ Expand'}
                </span>
              </button>
            </div>

            {showOptionalContext && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 animate-fadeIn">
                {/* Optional Document Text */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono-code text-slate-400 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-sky-400" />
                    <span>Reference Document Text (Optional Ground Truth)</span>
                  </span>
                  <textarea
                    rows={3}
                    value={contextText}
                    onChange={(e) => setContextText(e.target.value)}
                    placeholder="Paste reference text, official registry extract, contract clause, or database record..."
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-500 transition-all resize-y"
                  />
                </div>

                {/* Optional URL */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono-code text-slate-400 flex items-center gap-1.5">
                    <Link className="w-3.5 h-3.5 text-sky-400" />
                    <span>Source Website URL (Optional)</span>
                  </span>
                  <input
                    type="url"
                    value={sourceUrl}
                    onChange={(e) => setSourceUrl(e.target.value)}
                    placeholder="https://abccollege.edu.in/about or https://sos.texas.gov/corp"
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-500 transition-all font-mono-code"
                  />
                  <p className="text-[10px] text-slate-500 font-mono-code">
                    TruthEngine will verify claims against this source if provided.
                  </p>
                </div>
              </div>
            )}
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono-code flex items-center gap-2">
              <XCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800">
            <button
              onClick={handleClear}
              className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 text-xs font-mono-code flex items-center gap-2 transition-all cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>CLEAR</span>
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => runInvestigation(false)}
                disabled={isInvestigating}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-mono-code text-xs font-semibold tracking-wider flex items-center gap-2 transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-sky-400" />
                <span>VERIFY AGAINST PROVIDED CONTEXT</span>
              </button>

              <button
                onClick={() => runInvestigation(true)}
                disabled={isInvestigating}
                className={`px-7 py-3 rounded-xl font-bold text-xs tracking-wider font-mono-code flex items-center gap-2 transition-all shadow-lg cursor-pointer ${
                  isInvestigating
                    ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed'
                    : 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-sky-500/20'
                }`}
              >
                {isInvestigating ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                    <span>INVESTIGATING...</span>
                  </>
                ) : (
                  <>
                    <Globe className="w-3.5 h-3.5 text-slate-950" />
                    <span>VERIFY WITH WEB</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* LIVE INVESTIGATION PROCESS INDICATOR */}
        {isInvestigating && (
          <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono-code text-sky-400 uppercase tracking-wider">
                <div className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
                <span>Live Automated Investigation in Progress</span>
              </div>
              <span className="text-[11px] font-mono-code text-slate-400">
                Step {investigationStep + 1} of 9
              </span>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-sky-400 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((investigationStep + 1) / 9) * 100}%` }}
                />
              </div>
              <div className="text-sm font-mono-code text-slate-200 font-semibold flex items-center gap-2">
                <span className="text-sky-400">&gt;</span>
                <span>{investigationMessage}</span>
              </div>
            </div>

            {/* 9 steps visual checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-[11px] font-mono-code">
              {investigationSteps.map((stepText, idx) => {
                const isPassed = idx < investigationStep;
                const isCurrent = idx === investigationStep;
                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                      isPassed
                        ? 'bg-slate-900/40 border-emerald-500/30 text-emerald-400'
                        : isCurrent
                        ? 'bg-sky-500/10 border-sky-500 text-sky-300 ring-1 ring-sky-500/40'
                        : 'bg-slate-950/40 border-slate-900 text-slate-600'
                    }`}
                  >
                    <span className="font-bold">0{idx + 1}.</span>
                    <span className="truncate">{stepText.split('...')[0]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* RESULTS SECTION */}
        {evalResult && !isInvestigating && (
          <div className="space-y-10 animate-fadeIn">
            {/* Top Level Assessment Card */}
            <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl border-slate-700/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono-code uppercase text-slate-400 tracking-wider">
                    Investigation Verdict
                  </span>
                  <h3 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
                    <span>VERIFICATION COMPLETE</span>
                  </h3>
                </div>

                {/* Overall Assessment Badge */}
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1.5 rounded-lg font-mono-code font-bold text-xs border ${
                      evalResult.overallAssessment === 'FULLY_SUPPORTED'
                        ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40'
                        : evalResult.overallAssessment === 'PARTIALLY_SUPPORTED'
                        ? 'bg-amber-950/60 text-amber-400 border-amber-500/40'
                        : evalResult.overallAssessment === 'CONTRADICTED'
                        ? 'bg-rose-950/60 text-rose-400 border-rose-500/40'
                        : 'bg-slate-900 text-slate-300 border-slate-700'
                    }`}
                  >
                    {evalResult.overallAssessment.replace('_', ' ')}
                  </span>

                  <span className="text-[10px] font-mono-code px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
                    {evalResult.modeLabel}
                  </span>
                </div>
              </div>

              {/* Forensic Metrics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Grounded Claim Rate */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono-code uppercase text-emerald-400 font-bold">
                    Grounded Claim Rate
                  </span>
                  <div className="text-3xl font-extrabold text-emerald-400 font-mono-code">
                    {evalResult.groundedClaimRate}%
                  </div>
                  <div className="text-[11px] font-mono-code text-slate-400">
                    {evalResult.supportedCount} of {evalResult.totalClaims} claims supported
                  </div>
                </div>

                {/* Unsupported Claim Rate */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono-code uppercase text-rose-400 font-bold">
                    Unsupported Claim Rate
                  </span>
                  <div className="text-3xl font-extrabold text-rose-400 font-mono-code">
                    {evalResult.unsupportedClaimRate}%
                  </div>
                  <div className="text-[11px] font-mono-code text-slate-400">
                    {evalResult.unsupportedCount} unproven assertion(s)
                  </div>
                </div>

                {/* Contradiction Rate */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono-code uppercase text-amber-400 font-bold">
                    Contradiction Rate
                  </span>
                  <div className="text-3xl font-extrabold text-amber-400 font-mono-code">
                    {evalResult.contradictionRate}%
                  </div>
                  <div className="text-[11px] font-mono-code text-slate-400">
                    {evalResult.contradictedCount} direct clash(es)
                  </div>
                </div>

                {/* Evidence Coverage */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono-code uppercase text-sky-400 font-bold">
                    Evidence Coverage
                  </span>
                  <div className="text-3xl font-extrabold text-sky-400 font-mono-code">
                    {evalResult.evidenceCoverage}%
                  </div>
                  <div className="text-[11px] font-mono-code text-slate-400">
                    Propositions with source data
                  </div>
                </div>
              </div>

              {/* Visual Claim Distribution Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden flex border border-slate-800">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${evalResult.groundedClaimRate}%` }}
                    title={`Supported: ${evalResult.supportedCount}`}
                  />
                  <div
                    className="bg-amber-500 h-full transition-all duration-300"
                    style={{ width: `${evalResult.contradictionRate}%` }}
                    title={`Contradicted: ${evalResult.contradictedCount}`}
                  />
                  <div
                    className="bg-rose-500 h-full transition-all duration-300"
                    style={{ width: `${evalResult.unsupportedClaimRate}%` }}
                    title={`Unsupported: ${evalResult.unsupportedCount}`}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono-code text-slate-500">
                  <span>Supported ({evalResult.supportedCount})</span>
                  <span>Contradicted ({evalResult.contradictedCount})</span>
                  <span>Unsupported ({evalResult.unsupportedCount})</span>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-slate-400 font-mono-code bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 leading-relaxed">
                <strong className="text-slate-300">Methodology Note:</strong> These metrics describe this specific verification run and do not represent absolute factuality. Grounding evaluates proposition entailment against available evidence.
              </p>
            </div>

            {/* CLAIM FORENSICS BREAKDOWN CARDS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-mono-code uppercase text-sky-400 tracking-wider">
                    Claim-by-Claim Forensics
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    Individual Proposition Audit Cards
                  </h3>
                </div>
                <span className="text-xs font-mono-code text-slate-400">
                  {evalResult.totalClaims} discrete assertion(s) analyzed
                </span>
              </div>

              <div className="space-y-4">
                {evalResult.claims.map((claim) => {
                  const badge = getStatusBadge(claim.status);
                  const Icon = badge.icon;
                  const isSelected = activeClaimId === claim.id;

                  return (
                    <div
                      key={claim.id}
                      onClick={() => setActiveClaimId(claim.id)}
                      className={`glass-panel rounded-2xl p-6 border transition-all cursor-pointer space-y-4 ${
                        isSelected
                          ? `border-sky-500 ring-1 ring-sky-500/40 bg-slate-900/90`
                          : `hover:border-slate-700`
                      }`}
                    >
                      {/* Top Header Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-mono-code font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            CLAIM 0{claim.claimNumber}
                          </span>
                          <span className={`text-xs font-mono-code font-bold px-2.5 py-0.5 rounded border flex items-center gap-1.5 ${badge.border} ${badge.bg}`}>
                            <Icon className="w-3.5 h-3.5" />
                            <span>{badge.label}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs font-mono-code text-slate-400">
                          <span>Confidence: <strong>{Math.round(claim.confidence * 100)}%</strong></span>
                        </div>
                      </div>

                      {/* Claim Text */}
                      <div className="text-base text-slate-100 font-semibold leading-relaxed">
                        &ldquo;{claim.text}&rdquo;
                      </div>

                      {/* Forensic Reason & Evidence */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        {/* Reason */}
                        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                          <span className="font-mono-code text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
                            Forensic Reason
                          </span>
                          <p className="text-slate-300 leading-relaxed font-sans">
                            {claim.reason}
                          </p>
                        </div>

                        {/* Evidence Snippet */}
                        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                          <span className="font-mono-code text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
                            Retrieved Evidence Snippet
                          </span>
                          {claim.evidenceSnippet ? (
                            <p className="text-emerald-300/90 italic font-mono-code text-[11px] leading-relaxed">
                              &ldquo;{claim.evidenceSnippet}&rdquo;
                            </p>
                          ) : (
                            <p className="text-rose-400 italic font-mono-code text-[11px]">
                              No corroborating evidence located in verified repositories.
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Source Citation & Quality Indicator */}
                      {claim.source && (
                        <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-sky-400 shrink-0" />
                            <div>
                              <span className="font-bold text-slate-200 mr-2">
                                {claim.source.title}
                              </span>
                              <span className="font-mono-code text-[11px] text-slate-400">
                                ({claim.source.domain})
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {renderSourceAuthorityBadge(claim.source.authority)}
                            {claim.source.url && claim.source.url !== '#' && (
                              <a
                                href={claim.source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-mono-code text-sky-400 hover:text-sky-300 hover:underline"
                              >
                                <span>VIEW SOURCE</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* INTERACTIVE EVIDENCE GRAPH */}
            <InteractiveEvidenceGraph
              result={evalResult}
              activeClaimId={activeClaimId}
              onSelectClaim={(id) => setActiveClaimId(id)}
            />

            {/* CORRECTED ANSWER SECTION */}
            <CorrectedAnswerView
              originalAnswer={evalResult.answer}
              claims={evalResult.claims}
              correctedData={evalResult.correctedAnswer}
            />
          </div>
        )}
      </div>
    </section>
  );
};
