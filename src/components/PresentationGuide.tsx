import React, { useState, useEffect } from 'react';
import { Play, Pause, ChevronRight, ChevronLeft, X, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

interface PresentationGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const PresentationGuide: React.FC<PresentationGuideProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const presentationSteps = [
    {
      step: 1,
      title: 'What Hallucination Means',
      sectionId: 'what-is-hallucination',
      speech: 'AI models can sound fluent and confident, but that does not guarantee factual truth. Hallucination occurs when an LLM invents facts, names, or metrics with zero empirical backing.',
    },
    {
      step: 2,
      title: 'Ingest Candidate AI Answer',
      sectionId: 'verify',
      speech: 'We ingest an AI response, such as: "ABC College was founded by Ravi Kumar in 2008 and is located in Guntur."',
    },
    {
      step: 3,
      title: 'Decompose into Atomic Claims',
      sectionId: 'verify',
      speech: 'Our pipeline splits the compound response into discrete factual assertions: Claim 1 (founded by Ravi Kumar), Claim 2 (established in 2008), Claim 3 (located in Guntur).',
    },
    {
      step: 4,
      title: 'Search Authoritative Web Evidence',
      sectionId: 'verify',
      speech: 'Google Search grounding queries official educational databases (.edu, .gov), prioritizing primary registries over uncontrolled blogs.',
    },
    {
      step: 5,
      title: 'Corroborate Supported Claim',
      sectionId: 'verify',
      speech: 'Claim 2 ("established in 2008") is corroborated by the official institutional charter and marked [SUPPORTED].',
    },
    {
      step: 6,
      title: 'Detect Hallucinated Proposition',
      sectionId: 'verify',
      speech: 'Claim 1 ("founded by Ravi Kumar") has zero evidence in state registries or college records, and is flagged as [UNSUPPORTED / HALLUCINATION].',
    },
    {
      step: 7,
      title: 'Inspect Direct Primary Evidence',
      sectionId: 'verify',
      speech: 'Inspect verbatim quotations and source URLs to give users a fully transparent, verifiable audit trail.',
    },
    {
      step: 8,
      title: 'Synthesize Corrected Answer',
      sectionId: 'verify',
      speech: 'Rather than leaving users with a broken response, the engine generates an evidence-backed revision, stripping out Ravi Kumar and preserving true facts.',
    },
    {
      step: 9,
      title: 'Compute Reliability Metrics',
      sectionId: 'verify',
      speech: 'Calculate Grounded Claim Rate, Unsupported Rate, and Contradiction Rate without relying on vague black-box truth scores.',
    },
    {
      step: 10,
      title: 'Complete Research Architecture',
      sectionId: 'how-it-works',
      speech: 'Our system empowers researchers, educators, and enterprise auditors to systematically benchmark LLM factuality before real-world deployment.',
    },
  ];

  const current = presentationSteps[currentStepIdx];

  // Auto-advance if playing
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const timer = setTimeout(() => {
      if (currentStepIdx < presentationSteps.length - 1) {
        const nextIdx = currentStepIdx + 1;
        setCurrentStepIdx(nextIdx);
        onNavigateSection(presentationSteps[nextIdx].sectionId);
      } else {
        setIsPlaying(false);
      }
    }, 7000);

    return () => clearTimeout(timer);
  }, [isOpen, isPlaying, currentStepIdx]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-lg w-[calc(100vw-3rem)] glass-panel rounded-2xl p-5 border border-sky-500 shadow-2xl animate-fadeIn ring-1 ring-sky-500/50 bg-[#080d1a]/95">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
          <span className="text-xs font-mono-code font-bold text-sky-400 uppercase tracking-wider">
            Presenter Demo Mode ({currentStepIdx + 1}/10)
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title={isPlaying ? 'Pause auto-advance' : 'Resume auto-advance'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-400" />}
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="py-3 space-y-2">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <span>{current.step}. {current.title}</span>
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          {current.speech}
        </p>
      </div>

      {/* Progress & Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs font-mono-code">
        <div className="flex items-center gap-1">
          {presentationSteps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === currentStepIdx
                  ? 'w-5 bg-sky-400'
                  : i < currentStepIdx
                  ? 'w-2 bg-emerald-400'
                  : 'w-2 bg-slate-800'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={currentStepIdx === 0}
            onClick={() => {
              const prev = Math.max(0, currentStepIdx - 1);
              setCurrentStepIdx(prev);
              onNavigateSection(presentationSteps[prev].sectionId);
            }}
            className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            disabled={currentStepIdx === presentationSteps.length - 1}
            onClick={() => {
              const next = Math.min(presentationSteps.length - 1, currentStepIdx + 1);
              setCurrentStepIdx(next);
              onNavigateSection(presentationSteps[next].sectionId);
            }}
            className="p-1 rounded bg-sky-500 text-slate-950 font-bold disabled:opacity-40 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
