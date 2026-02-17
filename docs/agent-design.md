# Agent Design — Roles, Boundaries, Escalation

This document describes agents **conceptually** (no prompts, no code).

## Agent roster (example)

### 1) Intake & Scoping Agent
**Purpose:** Convert user intent into a constrained research plan.  
**Responsibilities:**
- confirm jurisdiction/forum constraints
- identify issues and sub-issues
- set time window and authority preferences (binding vs persuasive)
**Decision boundaries:**
- cannot access sources directly
- cannot produce final legal strategy alone
**Escalation triggers:**
- ambiguous jurisdiction
- insufficient scope constraints

### 2) Retrieval Planner Agent
**Purpose:** Decide *what* to retrieve and *from where* within policy limits.  
**Responsibilities:**
- select allowed repositories
- request citations and full text
- prioritize controlling authorities
**Decision boundaries:**
- uses only approved connectors
- must log source provenance
**Escalation triggers:**
- restricted database request
- access-denied patterns

### 3) Case Extractor Agent
**Purpose:** Extract structured facts from cases.  
**Responsibilities:**
- holdings, standards/tests
- fact patterns
- procedural posture
- outcome + reasoning anchors
**Decision boundaries:**
- cannot create new facts
- must link extracted claims to citations
**Escalation triggers:**
- low extraction confidence
- citation mismatch

### 4) Outcome Pattern Agent
**Purpose:** Identify patterns for wins/losses.  
**Responsibilities:**
- cluster cases by rationale
- detect features correlating with outcomes
- quantify “risk drivers”
**Decision boundaries:**
- cannot overclaim causality
- must label uncertainty
**Escalation triggers:**
- insufficient sample size
- contradictory authorities

### 5) Risk & Counterargument Agent
**Purpose:** Enumerate downside risks and opposing arguments.  
**Responsibilities:**
- strongest adverse cases
- common failure modes
- rebuttal options with citations
**Decision boundaries:**
- cannot provide legal advice disclaimers removal
- must include countervailing authority
**Escalation triggers:**
- high-stakes domain flags (regulated topics)
- sensitive client context

### 6) Briefing Composer Agent
**Purpose:** Produce the final executive briefing and strategy options.  
**Responsibilities:**
- concise briefing formats
- structured strategy options
- cite and summarize evidence trail
**Decision boundaries:**
- must pass evaluation gates before output
- must include confidence indicators
**Escalation triggers:**
- evaluation failures
- user requests disallowed content

### 7) Evaluator / Auditor Agent
**Purpose:** Validate outputs for defensibility.  
**Responsibilities:**
- claim–citation alignment checks
- policy compliance checks
- hallucination risk scoring
- formatting completeness
**Decision boundaries:**
- cannot access restricted sources
- can block output
**Escalation triggers:**
- repeated mismatch
- integrity anomalies

## Human-in-the-loop (HITL)

HITL review is required when:
- privileged / confidential repositories are involved
- the query triggers high-risk policy categories
- evaluator score falls below thresholds
- jurisdictional ambiguity remains unresolved

## State & memory model (high level)

- **Short-term memory:** session context (jurisdiction, issue map, constraints)
- **Artifact store:** extracted case cards, rationale clusters, risk flags
- **Audit log:** immutable record of steps, tools, and citations used

## Example escalation rule (plain language)

> If the system cannot tie a material claim to a citation, it must:
> 1) attempt re-extraction
> 2) downgrade confidence
> 3) flag for review or request clarification
> 4) refuse to present the claim as fact without support
