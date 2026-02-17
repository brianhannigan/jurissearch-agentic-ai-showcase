# Audit Artifacts (Described)

This document describes evidence artifacts that exist in the private production environment.

## Artifact types

### 1) Audit manifest
A machine-readable record of:
- workflow ID
- user/service identity
- timestamps
- tools invoked (IDs)
- source provenance (document IDs/citations)
- evaluator results
- approvals/escalations

### 2) Evidence bundle
A packaged set of:
- extracted case cards
- clustering summaries
- briefing output
- evaluation report
- integrity metadata (hashes, immutability markers)

### 3) Access control evidence
- RBAC/ABAC policies
- access reviews
- approval events for restricted resources

### 4) DLP/redaction reports
- what categories were detected (PII, privileged markers)
- what was masked
- export approvals

## What is not shown here
No customer content, no sensitive logs, no production identifiers.
