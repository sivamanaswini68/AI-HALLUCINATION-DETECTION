export type ClaimStatus = 'SUPPORTED' | 'UNSUPPORTED' | 'CONTRADICTED' | 'UNCERTAIN';

export type SourceAuthority = 'HIGH_AUTHORITY' | 'REPUTABLE' | 'SECONDARY' | 'LOW_CONFIDENCE';

export interface SourceCitation {
  id: string;
  title: string;
  domain: string;
  url: string;
  authority: SourceAuthority;
  authorityReason: string;
  snippet: string;
}

export interface Claim {
  id: string;
  claimNumber: number;
  text: string;
  status: ClaimStatus;
  reason: string;
  evidenceSnippet?: string;
  highlightText?: string;
  confidence: number;
  source?: SourceCitation;
}

export interface CorrectedAnswerDiff {
  originalAnswer: string;
  verifiedAnswer: string;
  diff: {
    removed: string[];
    corrected: string[];
    added: string[];
  };
}

export interface EvaluationResult {
  question: string;
  context?: string;
  sourceUrl?: string;
  answer: string;
  claims: Claim[];
  totalClaims: number;
  supportedCount: number;
  unsupportedCount: number;
  contradictedCount: number;
  uncertainCount: number;
  // Specific research metrics
  unsupportedClaimRate: number; // percentage
  contradictionRate: number; // percentage
  evidenceCoverage: number; // percentage
  groundedClaimRate: number; // percentage
  groundednessScore?: number; // alias
  hallucinationRate?: number; // alias
  overallAssessment: 'FULLY_SUPPORTED' | 'PARTIALLY_SUPPORTED' | 'CONTRADICTED' | 'UNSUPPORTED' | 'UNCERTAIN';
  isHallucinated: boolean;
  explanation: string;
  sources: SourceCitation[];
  searchQueries?: string[];
  correctedAnswer: CorrectedAnswerDiff;
  isLiveWeb: boolean;
  modeLabel: 'LIVE_WEB_GROUNDING' | 'CONTEXT_VERIFIED' | 'CURATED_BENCHMARK_DEMO';
  modelName?: string;
  timestamp?: string;
}

export interface DemoPreset {
  id: string;
  title: string;
  badge: string;
  category: string;
  question: string;
  context?: string;
  sourceUrl?: string;
  simulatedAnswer: string;
  explanation: string;
  expectedAssessment: 'FULLY_SUPPORTED' | 'PARTIALLY_SUPPORTED' | 'CONTRADICTED' | 'UNSUPPORTED' | 'UNCERTAIN';
  claims: Omit<Claim, 'id'>[];
  sources: SourceCitation[];
  correctedAnswer: CorrectedAnswerDiff;
}

export interface BenchmarkModelScore {
  id: string;
  name: string;
  family: string;
  evaluatedResponses: number;
  groundedClaimRate: number;
  unsupportedClaimRate: number;
  contradictionRate: number;
  evidenceCoverage: number;
  groundednessScore?: number;
  hallucinationRate?: number;
  unsupportedPercentage?: number;
  contradictionPercentage?: number;
  supportedPercentage?: number;
  avgLatencyMs: number;
  description: string;
}

export interface BenchmarkQuestionItem {
  id: string;
  question: string;
  category: 'Factual' | 'Numerical' | 'Temporal' | 'Entity' | 'Reasoning' | 'Multi-hop' | 'Unanswerable' | 'Contradiction';
  aiAnswer: string;
  expectedStatus: ClaimStatus;
  evidenceSnippet: string;
  sourceDomain: string;
}

export interface HumanAgreementStats {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  totalEvaluated: number;
}
