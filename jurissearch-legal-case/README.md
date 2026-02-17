# JurisSearch: Cognitive Legal Intelligence

<div align="center">
  <h3>Next-Generation AI Legal Research & Strategy Platform</h3>
  <p><em>Powered by Gemini 2.0 Flash • Fortified with OWASP Top 10 Defense-in-Depth</em></p>
</div>

---

## 🏛️ What is JurisSearch?

**JurisSearch** is an advanced AI-powered legal intelligence platform designed to assist legal professionals, researchers, and strategists. It serves as a secure, "Zero-Trust" interface to the world's legal archives, using Large Language Models (LLMs) to synthesize complex case law into actionable strategic insights.

Unlike standard search engines, JurisSearch doesn't just list links. It **analyzes** the legal landscape of a specific topic, identifying:
-   **Strategic Wins**: Cases where the primary party secured a favorable judgment.
-   **Critical Risks**: Cases resulting in unfavorable judgments, highlighting potential pitfalls.
-   **Executive Briefings**: AI-synthesized summaries of the overall legal terrain, risk factors, and optimal strategies.

---

## 🚀 Key Features

### 1. Unified Intelligence Dashboard
A futuristic, "Glassmorphism" HUD that presents complex data in a digestible, executive-ready format.

### 2. Precedent Analysis (Wins vs. Losses)
Automatic segmentation of case studies into "Success Benchmarks" (Green) and "Risk Exposures" (Red). Each case card provides:
-   **Citation & Jurisdiction**: Verified metadata.
-   **Confidence Score**: AI-calculated relevance and accuracy metric.
-   **Executive Takeaway**: One-sentence summary for quick scanning.
-   **Strategic Implication**: How this case impacts future litigation.

### 3. Integrated Grounding Network
To combat hallucinations (**OWASP ASI06**), JurisSearch accesses a "Grounding Network" of official, non-paywalled repositories (Justia, CourtListener) to triangulate data points.

### 4. Enterprise-Grade Security
The application is hardened against the **OWASP Top 10 for Agentic AI**:
-   **Chemical Isolation**: Strict input whitelisting preventing Prompt Injection (**ASI01**).
-   **Output Sanitization**: Rigorous scrubbing of XSS vectors and malformed data (**ASI05**).
-   **Secure Audit Logging**: Sanitized error protocols preventing data leakage (**ASI01**).

---

## 🛠️ Installation & Setup

### Prerequisites
-   Node.js (v18+)
-   npm

### Quick Start

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Configure Environment**
    Ensure your `.env` file contains your secure API key:
    ```env
    GEMINI_API_KEY=your_actual_api_key_here
    ```

3.  **Launch the System**
    ```bash
    npm run dev
    ```
    Access the HUD at `http://localhost:3000`.

---

## 📘 User Guide

### How to Conduct Research

1.  **Initiate Protocol**:
    -   On the home screen, locate the **Cognitive Legal Inquiry** bar.
    -   Enter a legal topic (e.g., *"AI Liability Law"*, *"Smart Contract Disputes"*).
    -   *Note: Inputs are strictly limited to alphanumeric characters and basic punctuation (max 200 chars).*

2.  **Scanning Phase**:
    -   The system will display a "Scanner Line" animation.
    -   **Active System Logs** will appear, showing real-time status of the secure uplink (e.g., "Querying Justia...", "Synthesizing briefing...").

3.  **Analysis Review**:
    -   **Executive Briefing**: Read the top-level summary for a landscape overview. Check the "Precedent Strength" and "Risk Factor" gauges.
    -   **Success Benchmarks**: Review the green cards to understand winning arguments.
    -   **Risk Exposures**: Review the red cards to understand common failure points.
    -   **Copy Citations**: Click the copy icon on any card to grab the standard citation for your briefs.

---

## 🛡️ Security Architecture

This application acts as a secure "Air Gap" between the user and the AI agent.

-   **Traceability**: All interactions are logged securely ID.
-   **Guardrails**: The AI operates under a strict "Legal Research Assistant" constitution and cannot be coerced into revealing its system prompt or performing non-legal tasks.
-   **Verification**: See `SECURITY_REPORT.md` for a full audit against OWASP ASI standards.

---

## ⚠ Legal Disclaimer

**AI-Generated Content**: This application uses artificial intelligence to summarize and analyze legal texts. While it employs advanced grounding techniques, it may occasionally produce inaccurate or incomplete information ("hallucinations").

**Not Legal Advice**: The insights provided by JurisSearch are for informational and research purposes only. They should **never** replace the professional judgment of a qualified attorney. Always verify citations and case details with official court records.
