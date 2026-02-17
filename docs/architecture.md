# Architecture (No Code) — JurisSearch

## High-level components

JurisSearch is structured as a layered system:

1. **Interface Layer**
   - Web/UI and API gateway
   - Authentication, session controls, rate limiting
   - Query intake + scope constraints (jurisdiction, forum, time window)

2. **Orchestration Layer**
   - Workflow engine (state machine / DAG)
   - Task routing to agents
   - Policy gating & approvals (human-in-the-loop when required)

3. **Agent Layer**
   - Specialized agents with defined responsibilities
   - Each agent operates within a limited toolset
   - Escalation rules for uncertainty, policy triggers, or low confidence

4. **Tool Layer**
   - Retrieval tools (legal databases, internal archives)
   - Normalization (OCR, parsing, metadata enrichment)
   - Citation verification
   - Redaction & data loss prevention (DLP)
   - Evaluation tools (consistency checks, claim–citation alignment)

5. **LLM Layer**
   - Model routing (different models for summarization vs. analysis)
   - Prompt templates (private)
   - Safety filters and output constraints

6. **Data Layer**
   - Encrypted storage for:
     - session context
     - intermediate artifacts
     - audit logs
     - evidence bundles
   - Retrieval index with strict access controls

7. **Governance & Security Layer**
   - Zero Trust controls, secrets management
   - RBAC/ABAC policies
   - Full audit trail + immutable logging
   - Compliance mapping and evidence generation

## Key architectural principles

### Zero Trust by design
- Every request is authenticated and authorized
- No implicit trust across services
- Least privilege for tools and data

### Separation of concerns
- Retrieval and reasoning are separated to reduce hallucination risk
- Agents are constrained to small roles (reduce blast radius)

### Traceability
- Every major claim should map to:
  - citations
  - agent step
  - timestamped decision record

### Guardrailed execution
- Policy checks before:
  - retrieving restricted sources
  - summarizing sensitive materials
  - generating strategy recommendations

## Deployment shape (conceptual)

- **Edge:** WAF + API gateway + auth
- **Core:** orchestrator + agent runtime
- **Tools:** isolated connectors + retrieval services
- **Data:** encrypted DB + vector index + immutable logs
- **Observability:** metrics, traces, audit logging

## Diagram references

See:
- `../diagrams/system-architecture.mmd`
- `../diagrams/data-flow.mmd`
- `../diagrams/trust-boundary.mmd`
