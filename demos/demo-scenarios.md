# Demo Scenarios (Redacted / Mocked)

These scenarios demonstrate **system behavior** without exposing private prompts, configs, or customer data.

---

## Scenario 1 — Terrain briefing for a legal issue

**Goal:** Generate a decision-ready briefing that explains:
- the controlling legal tests
- favorable vs adverse authority
- strategy options with risks

**Input (mocked):**
- Issue: “Standard for [LEGAL ISSUE] under [STATUTE/DOCTRINE]”
- Jurisdiction: “Federal / [Circuit]”
- Time window: “Last 10 years”
- Constraints: “Binding authority first; include persuasive split summary.”

**Expected output:**
- Executive summary (bullet points)
- Controlling test(s) with citations
- Winning case patterns (fact pattern highlights)
- Loss triggers and risks
- Strategy options A/B/C + tradeoffs
- Evidence trail (citations + rationale)

---

## Scenario 2 — Identify “winning cases” for an argument

**Goal:** Find cases supporting an argument and explain why they win.

**Input (mocked):**
- Argument: “[ARGUMENT STATEMENT]”
- Jurisdiction: “[STATE] Supreme Court + appellate”
- Constraints: “Prefer published opinions.”

**Expected output:**
- Ranked “wins” list with rationale
- “Near wins” with caveats
- “Losses” with failure mode analysis
- Counterargument map

---

## Scenario 3 — Adverse authority risk extraction

**Goal:** Identify the most dangerous losses and why they matter.

**Input (mocked):**
- Topic: “[TOPIC]”
- Forum: “[Court type]”
- Constraints: “Focus on defense posture.”

**Expected output:**
- Top adverse cases
- Risk themes
- Mitigation approaches with citations
- Confidence labeling + escalation flags if uncertain

---

## Scenario 4 — Governance-triggered HITL review

**Goal:** Demonstrate how Zero Trust gates stop unsafe flows.

**Input (mocked):**
- Request includes restricted repository access

**Expected behavior:**
- policy engine blocks retrieval
- HITL approval required
- full audit log shows: request → block → approval → controlled output
