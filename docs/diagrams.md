# Diagram previews

This page provides GitHub-renderable Mermaid previews. Source files remain in [`/diagrams`](../diagrams/).

## System architecture

```mermaid
flowchart LR
  U[Legal Professional / Researcher] -->|Query + Constraints| UI[UI / API Gateway]
  UI --> AUTH[AuthN/AuthZ + Session Policy]
  AUTH --> ORCH[Orchestrator / Workflow Engine]

  ORCH --> A1[Intake & Scoping Agent]
  ORCH --> A2[Retrieval Planner Agent]
  ORCH --> A3[Case Extractor Agent]
  ORCH --> A4[Outcome Pattern Agent]
  ORCH --> A5[Risk & Counterargument Agent]
  ORCH --> A6[Briefing Composer Agent]
  ORCH --> EVAL[Evaluator / Auditor Agent]

  A2 --> TOOLS[Tool Layer]
  A3 --> TOOLS
  TOOLS --> CONN[Retrieval Connectors (Isolated)]
  CONN --> SRC[(Legal Archives / Internal Repos)]

  ORCH --> DATA[(Encrypted Data Store)]
  ORCH --> LOGS[(Immutable Audit Logs)]
  EVAL --> LOGS

  EVAL -->|Pass| UI
  EVAL -->|Block / Escalate| HITL[Human Review]
  HITL --> ORCH
  UI -->|Briefing + Evidence| U
```

## Agent orchestration

```mermaid
sequenceDiagram
  participant User
  participant Orchestrator
  participant Intake
  participant Planner
  participant RetrievalTools
  participant Extractor
  participant Risk
  participant Composer
  participant Evaluator
  participant Human as HITL

  User->>Orchestrator: Submit query + constraints
  Orchestrator->>Intake: Scope + issue map
  Intake-->>Orchestrator: Structured scope

  Orchestrator->>Planner: Build retrieval plan
  Planner-->>Orchestrator: Tool calls requested

  Orchestrator->>RetrievalTools: Retrieve candidate sources
  RetrievalTools-->>Orchestrator: Documents + provenance

  Orchestrator->>Extractor: Extract holdings/tests/facts/outcomes
  Extractor-->>Orchestrator: Case cards + citations

  Orchestrator->>Risk: Identify adverse cases + risks
  Risk-->>Orchestrator: Risk flags + counter map

  Orchestrator->>Composer: Draft briefing + strategy options
  Composer-->>Orchestrator: Draft output

  Orchestrator->>Evaluator: Claim–citation + policy checks
  alt Pass
    Evaluator-->>Orchestrator: Approved + confidence
    Orchestrator-->>User: Final briefing + evidence trail
  else Fail / Sensitive
    Evaluator-->>Orchestrator: Block + reasons
    Orchestrator-->>HITL: Escalate for review
    HITL-->>Orchestrator: Approve/Reject/Adjust scope
    Orchestrator-->>User: Updated output or request clarification
  end
```

## Data flow

```mermaid
flowchart TD
  Q[User Query + Constraints] --> SCOPE[Scope + Issue Map]
  SCOPE --> PLAN[Retrieval Plan]
  PLAN --> RETRIEVE[Retrieve Sources]
  RETRIEVE --> NORM[Normalize / Parse / OCR]
  NORM --> EXTRACT[Extract Case Cards]
  EXTRACT --> CLUSTER[Cluster Rationales + Outcomes]
  CLUSTER --> RISK[Risk & Counterargument Analysis]
  RISK --> SYNTH[Synthesize Briefing + Strategy]
  SYNTH --> EVAL[Evaluate: Claim–Citation + Policy]
  EVAL -->|Approved| OUT[Deliver Briefing + Evidence Trail]
  EVAL -->|Blocked| HITL[Human Review / Clarification]
  HITL --> SCOPE
```

## Trust boundaries

```mermaid
flowchart LR
  subgraph Zone1[Trust Zone 1: User Edge]
    U[User] --> UI[UI / API Gateway]
  end

  subgraph Zone2[Trust Zone 2: Core Runtime]
    UI --> ORCH[Orchestrator]
    ORCH --> AGENTS[Agent Runtime]
    ORCH --> POL[Policy Engine]
    ORCH --> AUD[Audit Logger]
  end

  subgraph Zone3[Trust Zone 3: Tooling]
    AGENTS --> TOOLS[Tool Layer]
    TOOLS --> CONN[Isolated Connectors]
  end

  subgraph Zone4[Trust Zone 4: Data]
    CONN --> SRC[(Legal Archives / Internal Repos)]
    ORCH --> STORE[(Encrypted Artifact Store)]
    AUD --> IMM[(Immutable Logs)]
  end

  POL -.deny by default.-> TOOLS
```
