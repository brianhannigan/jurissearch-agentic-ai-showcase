# Workflows — End-to-End Behavior (No Prompts)

This document shows **how JurisSearch behaves** as a system.

## Workflow A — Legal terrain + executive briefing

### Inputs
- topic / question
- jurisdiction/forum constraints
- time window
- optional fact pattern (redacted summary)
- user preferences (binding authority first, etc.)

### Steps
1. **Intake & scoping**
   - extract issues and sub-issues
   - confirm jurisdiction, court level, and applicable standards
2. **Retrieval planning**
   - determine repositories and search strategy
   - identify controlling vs persuasive buckets
3. **Source retrieval**
   - pull candidate cases and statutes
   - capture source provenance + metadata
4. **Normalization**
   - parse, OCR if needed
   - standardize citations and headings
5. **Structured extraction**
   - holdings/tests/facts/outcome
   - produce “case cards” with citations
6. **Outcome and rationale clustering**
   - cluster cases by reasoning and outcome drivers
   - identify “winning patterns” and “loss triggers”
7. **Risk analysis**
   - enumerate adverse authorities
   - produce counterargument map
8. **Synthesis**
   - produce executive briefing
   - include strategy options with tradeoffs
9. **Evaluation & audit gating**
   - check claim–citation alignment
   - check policy compliance
   - compute confidence bands
10. **Delivery**
   - final briefing + evidence trail
   - optional export bundle (PDF/Word/JSON in production)

### Outputs
- Executive briefing (1–2 pages)
- Strategy options (A/B/C) + risks
- Case shortlist (wins/losses) with structured notes
- Evidence trail (citations + step lineage)

---

## Workflow B — “Find winning cases” for an argument

### Steps (summary)
1. Scope argument and jurisdiction
2. Retrieve candidate cases
3. Extract outcome + legal test
4. Score alignment to argument criteria
5. Produce top “wins” with rationale and constraints
6. Produce “near misses” and “losses” with risk warnings
7. Evaluate defensibility (citations + consistency)
8. Deliver ranked results + briefing summary

---

## Workflow C — Compliance + governance mode (enterprise)

In enterprise deployments (legal ops + security governance), JurisSearch can run in a stricter mode:
- stronger data controls
- expanded audit logging
- mandatory HITL approvals for restricted sources
- immutable evidence artifacts for audits

### Example governance gates
- “Restricted repository access requires approval”
- “External sharing requires redaction pass”
- “PII detected → mask + notify + restrict output”

---

## Workflow D — Evidence bundle generation (audit-ready)

1. Collect artifacts produced in the workflow (case cards, clusters, briefings)
2. Attach provenance metadata (source IDs, timestamps, tool steps)
3. Run integrity checks (hashing, immutability policy)
4. Produce an “evidence manifest” (what was created, by whom/what, and when)
