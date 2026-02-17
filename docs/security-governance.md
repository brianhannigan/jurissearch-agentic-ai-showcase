# Security & Governance — Zero Trust, Guardrails, Auditability

## Threat model (high level)

JurisSearch is designed with an assumption of:
- high-value targets (legal strategy, privileged materials)
- insider risk (misuse by authorized accounts)
- prompt injection and retrieval poisoning attempts
- data exfiltration attempts via model outputs
- supply-chain risks in connectors and dependencies

## Zero Trust controls

### Identity & access
- SSO + MFA
- Role-based and attribute-based access (RBAC/ABAC)
- Least privilege tool permissions
- Session scoping (jurisdiction, repository restrictions)

### Network segmentation
- separate zones for:
  - interface/API gateway
  - agent runtime
  - retrieval connectors
  - data stores
- deny-by-default policies between zones

### Secrets management
- no secrets in code or config checked into public repos
- short-lived tokens where possible
- rotation and revocation support

## Guardrails & policy enforcement

### Policy gates
Before certain actions, the orchestrator enforces policy:
- retrieving from restricted sources
- processing privileged or regulated documents
- exporting or sharing outputs externally

### Output controls
- structured output schemas
- citation requirement for material claims
- “uncertainty labeling” when confidence is low
- redaction/DLP pass for sensitive content

## Audit logging (defensibility)

JurisSearch produces audit-ready logs including:
- user identity (or service principal)
- request scope (jurisdiction, time window)
- tools invoked (connector IDs, not secrets)
- source provenance (document IDs, citations)
- evaluation results (alignment checks, confidence)
- escalation events (HITL approvals, rejections)

## Human-in-the-loop governance

HITL can be required for:
- restricted sources
- low confidence outputs
- high-stakes usage categories
- export/sharing actions

## Secure SDLC posture (publicly describable)

- dependency scanning and pinning
- secrets scanning (pre-commit + CI)
- code review enforcement (private repo)
- environment isolation (dev/stage/prod)
- least-privileged runtime policies

