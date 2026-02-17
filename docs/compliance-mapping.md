# Compliance Mapping (Conceptual)

This is a **high-level mapping** to show enterprise readiness posture.  
Exact control implementations and evidence are maintained privately.

## Coverage goals

JurisSearch is commonly aligned to:
- **SOC 2** (Security, Availability, Confidentiality)
- **NIST 800-53** (selected control families)
- **ISO 27001** (ISMS-aligned controls)

## Example mapping table (illustrative)

| Framework | Domain | JurisSearch Control Theme | Evidence Artifact Type |
|---|---|---|---|
| SOC 2 | Security | Access control + least privilege | Access review logs, RBAC policy docs |
| SOC 2 | Confidentiality | DLP/redaction + export gating | Redaction reports, export approvals |
| NIST 800-53 | AC | Account management & session scoping | Auth logs, policy configs (private) |
| NIST 800-53 | AU | Audit logging & monitoring | Audit manifests, SIEM summaries |
| NIST 800-53 | SC | Segmentation & secure communications | Network diagrams, TLS config attestations |
| ISO 27001 | A.5/A.8 | Info security policies + asset mgmt | Policy docs, asset inventory (private) |

## What “evidence” looks like (described)

- Audit manifests (what happened, when, by whom/what)
- Change management summaries
- Access reviews and approvals
- Connector allowlists and repository access attestations
- DLP/redaction logs (metadata only)
- Evaluation reports (claim–citation alignment scores)

## Notes on limitations

- This public repo does not include live audit data, secrets, or customer artifacts.
- Control operation details remain private to prevent misuse.
