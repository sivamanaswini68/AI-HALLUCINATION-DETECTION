AI Hallucination Detector — Documentation
"AI generates the answer. Our system checks the answer against web evidence."
An academic fact-verification and hallucination detection platform. The application investigates AI-generated text claim-by-claim, searches the live web for authoritative evidence using Gemini Google Search grounding, classifies each statement into a strict epistemic taxonomy, and synthesizes evidence-backed corrected responses.
🎯 Core Purpose & Problem Statement
Generative Large Language Models (LLMs) can sound confident and fluent even when generating fabricated names, inaccurate dates, or fictitious events. Holistic passage evaluations often obscure where models diverge from reality.
AI Hallucination Detector addresses this by:
Decomposing compound AI responses into individual atomic propositions.
Formulating targeted search queries for each factual assertion.
Retrieving authoritative web evidence (prioritizing .gov, .edu, and scientific registries).
Comparing claims against evidence using Natural Language Inference (NLI).
Generating a factual revision that removes hallucinations while preserving true information.
🚀 Key Features
Claim-by-Claim Decomposition: Breaks compound statements into discrete propositions so fabrications cannot hide behind true clauses.
Live Web Grounding: Uses Gemini Google Search grounding to retrieve real-time citations and corroborating passages.
4-Tier Forensic Classification:
🟢 SUPPORTED: The proposition is corroborated by authoritative source evidence.
🔴 CONTRADICTED: The proposition directly clashes with verified facts.
🟠 UNSUPPORTED: No reliable evidence could be located to verify the assertion.
⚪ UNCERTAIN: Available evidence is inconclusive or ambiguous.
Corrected Answer Synthesis: When hallucinations or contradictions are detected, the system generates:
Original Answer (with flagged statements)
Corrected Answer (100% grounded in retrieved evidence)
What Was Wrong? (concise explanation of the errors)
Transparent Source Citations: Displays verified source titles, domains, authority tiers, verbatim evidence quotes, and direct [VIEW SOURCE ↗] links.
Curated Demo Mode: Built-in scenarios ready for one-click testing:
The ABC College Case (Classic fabricated founder scenario)
Earth's Moon (Fully grounded scientific baseline)
Corporate Founding Date (Direct temporal & location contradiction)
Unanswerable Question (Testing model refusal on non-existent entities)
Security & Privacy: Production API keys are managed exclusively on the backend (server.ts) and never exposed to client-side bundles.
🔄 Verification Pipeline
code
Text
USER QUESTION
      ↓
AI-GENERATED ANSWER
      ↓
ATOMIC CLAIM EXTRACTION
      ↓
GOOGLE SEARCH WEB GROUNDING
      ↓
NLI EVIDENCE COMPARISON
      ↓
FORENSIC VERDICT (Supported / Contradicted / Unsupported / Uncertain)
      ↓
CORRECTED EVIDENCE-BACKED ANSWER
🛠️ Technology Stack
Frontend:
React 19 / TypeScript
Tailwind CSS (v4)
Lucide React (Forensic & UI icons)
Vite 8
Backend / API Proxy:
Node.js & Express (TypeScript via tsx)
@google/genai (Official Google Gen AI SDK)
Gemini Model: gemini-3.8-flash
Built-in Tool: Google Search Grounding ({ googleSearch: {} })
📁 Project Structure
code
Text
├── README.md                  # Project documentation (root)
├── docs/
│   └── README.md              # Documentation copy
├── server.ts                  # Secure Express server with Gemini Search Grounding
├── src/
│   ├── components/
│   │   └── HallucinationDetectorView.tsx # Main single-page detector workspace
│   ├── data/
│   │   └── demoPresets.ts     # Predefined educational benchmark test cases
│   ├── types/
│   │   └── index.ts           # Claim, Source, and Evaluation TypeScript schemas
│   ├── App.tsx                # Application root
│   ├── index.css              # Tailwind CSS styles & design tokens
│   └── main.tsx               # Client entry point
├── package.json               # Dependencies and build scripts
└── vite.config.ts             # Vite configuration
⚙️ Getting Started
1. Prerequisites
Node.js (v18.0.0 or higher)
npm (v9.0.0 or higher)
2. Installation
code
Bash
npm install
3. Environment Configuration
Create a .env file in the root directory:
code
Env
# Optional: Live Gemini Google Search Grounding
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
Note: If GEMINI_API_KEY is not provided or offline, the application operates in Curated Demo Mode, clearly labeled as demo data.
4. Running the Development Server
code
Bash
npm run dev
Open http://localhost:3000.
5. Production Build
code
Bash
npm run build
npm start
🧪 Forensic Classification Rules
Status	Icon	Rule	Action in Corrected Answer
SUPPORTED	🟢	Corroborated by retrieved primary documentation.	Retained verbatim in verified answer.
CONTRADICTED	🔴	Directly conflicts with reliable evidence.	Replaced with verified fact from source.
UNSUPPORTED	🟠	No proof in retrieved evidence (fabricated entity/metric).	Removed completely from verified answer.
UNCERTAIN	⚪	Evidence is ambiguous or conflicting.	Qualified with epistemic uncertainty.
