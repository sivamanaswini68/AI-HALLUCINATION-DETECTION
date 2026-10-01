[README.md](https://github.com/user-attachments/files/32896672/README.md)# 🔬 VERI-CLAIM: AI Hallucination Detection Benchmark & Reliability Laboratory

> **"AI Can Sound Certain. That Doesn't Make It True."**

VERI-CLAIM is an interactive AI reliability laboratory and benchmarking platform designed to audit Large Language Model (LLM) responses claim-by-claim against explicit ground-truth source evidence.

---

## ✨ Features

- **Streamlined 3-Part Verification Workflow**: Side-by-side Ground Truth & User Prompt inputs, real-time pipeline execution, and clear color-coded claim status badges.
- **Atomic Claim Extraction & Entailment Engine**: Automatically decomposes LLM responses into individual factual claims and cross-references them against source documents using Natural Language Inference (NLI).
- **Claim Status Classifications**:
  - `[Supported]`: Verified by explicit source evidence.
  - `[Unsupported / Hallucination]`: Introduced ungrounded factual assertions or entities.
  - `[Contradicted]`: Directly conflicts with facts stated in the source text.
  - `[Uncertain]`: Insufficient evidence to establish entailment.
- **Interactive Evidence Topology Graph**: SVG node graph mapping Question ➔ Claims ➔ Evidence Nodes.
- **Multi-Dimensional Reliability Profile**: 6-axis Radar Chart measuring Groundedness %, Evidence Support %, Answer Coverage %, Uncertainty Calibration, Non-Contradiction %, and Factual Accuracy %.
- **Document Verification Mode ("Verify My Document")**: Upload research papers, college syllabi, or policies for sentence-level grounding audits.
- **Benchmark Studio & Cross-Model Comparison**: Execute multi-model benchmarks (Gemini 1.5 Pro, GPT-4o, Claude 3.5 Sonnet, Llama 3 70B) across question categories (Factual, Numerical, Temporal, Entity-based, Multi-hop, Unanswerable, Contradiction).
- **Human vs AI Meta-Evaluation**: Evaluate the hallucination detector itself against human expert reviewers to compute Precision, Recall, F1-Score, Accuracy, and Confusion Matrix.
- **Faculty Report Generator**: Export comprehensive PDF/Print or Markdown research reports.
- **3-Minute Guided Faculty Presentation Tour**: Built-in automated presentation tour with step-by-step student scripts for college evaluators and hackathon judges.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Recharts, Lucide Icons
- **AI Pipeline**: Google Generative AI (`@google/generative-ai`), Fallback Rule-Based NLI Engine
- **Build Tool**: Vite 8

---

## 🚀 Quick Start & Installation

```bash
# 1. Clone the repository
git clone <YOUR-GITHUB-REPO-URL>
cd project

# 2. Install dependencies
npm install

# 3. Start the local development server
npm run dev

# 4. Build production bundle
npm run build
```

---

## 👥 Technical Ownership (3-Member Team Architecture)

- **Member 1 (Dataset Engineering & Benchmark Design)**: Taxonomy curation, dataset JSON/CSV schema validator, gold-standard benchmarks (College History, Clinical Pharmacology, Financial SEC Filings).
- **Member 2 (LLM Evaluation & Claim Engine)**: Atomic claim extraction NLP pipeline, NLI entailment classifier, Gemini API integration.
- **Member 3 (Full-Stack Application & Visual Forensics)**: React + TypeScript UI, Interactive Evidence Graph, Reliability Radar Profile, Meta-Evaluation engine, and Report Exporter.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.


