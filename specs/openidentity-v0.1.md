---
title: OpenIdentity Specification
version: 0.1
status: draft
format: openidentity.md
creator: https://github.com/Moeabdelaziz007
---
# OpenIdentity v0.1 Specification

## 1. Purpose

OpenIdentity is a portable identity manifest for AI agents. It combines identity, human verification, roles, skills, MCP tools, A2A metadata, memory discovery links, wallet references, and authorization pointers into one secure, shareable file.

Short form: **OpenIdentity is the discovery layer for AI agent identity.**

## Founder and creator

OpenIdentity was founded and created by [Moe Abdelaziz](https://github.com/Moeabdelaziz007).

## 1. Purpose and non-goals
USB metaphor: **Like a USB descriptor for an AI agent, OpenIdentity lets any compatible platform understand what the agent is, who controls it, what it can do, and where its approved memory and tools live.**

## 2. Canonical File Name

The recommended canonical file name is:

```text
openidentity.md
```

An OpenIdentity file SHOULD contain structured YAML front matter followed by a human-readable Markdown body.

### YAML front matter

The YAML front matter SHOULD begin and end with `---`. It SHOULD include `version: 0.1` for this draft and MAY include fields such as:

```yaml
---
version: 0.1
id: agent.example.assistant
name: Example Assistant
description: An AI agent that helps with research and workflow automation.
owners:
  - type: organization
    name: Example Labs
    url: https://example.com
verification:
  - type: signed-claim
    url: https://example.com/.well-known/openidentity/example-assistant.json
skills:
  - research
  - summarization
tools:
  - type: mcp
    name: example-tools
    url: https://mcp.example.com
memory:
  - type: index
    name: public-knowledge-index
    url: https://example.com/memory/public
wallets:
  - type: payment-link
    url: https://pay.example.com/example-assistant
auth:
  authorization_url: https://auth.example.com/oauth/authorize
  scopes:
    - read:public-profile
    - request:tool-access
---
```

The exact schema MAY evolve after v0.1. Implementations SHOULD ignore unknown fields and preserve fields they do not understand when editing the file.

### Markdown body

The Markdown body SHOULD explain the structured metadata in prose. It MAY include sections such as:

- Overview
- Operator or owner
- Capabilities and limitations
- Tools and integrations
- Memory and data sources
- Authorization and consent
- Verification and signed claims
- Contact, support, or revocation instructions

The body SHOULD be safe to display to humans and safe for LLMs to consume as context.

## 5. Security model

OpenIdentity is a discovery and verification aid, not a secret store or standalone access-control system.

### Avoid embedding secrets

An OpenIdentity manifest MUST NOT contain private keys, passwords, bearer tokens, API keys, wallet seed phrases, session cookies, recovery codes, or other secrets.

### Use links

A manifest SHOULD link to authoritative resources instead of copying sensitive or frequently changing data. Linked resources can be protected, updated, revoked, or replaced without rewriting every copy of the manifest.

### Use signed claims

Claims about ownership, authorization, domains, wallets, credentials, or human verification SHOULD be signed or otherwise verifiable when they affect trust decisions. A manifest MAY link to signed claim documents, verifiable credentials, transparency logs, or `.well-known` endpoints.

### Use scoped access

Access references SHOULD use narrow scopes and purpose-specific authorization flows. A manifest SHOULD describe requested scopes clearly enough that a human or policy engine can understand what access is being requested.

### Support revocation

Any linked credential, claim, tool authorization, memory grant, or wallet association SHOULD have a revocation or rotation path. The manifest SHOULD include enough information for verifiers to check whether a claim is still valid.

### Verify before trusting

Consumers MUST NOT treat a manifest's claims as true solely because they appear in the file. Consumers SHOULD verify signatures, domains, issuer trust, organization membership, consent, and runtime behavior before granting access or relying on sensitive claims.

## 6. Versioning

OpenIdentity starts with:

```yaml
version: 0.1
```

The `version` field identifies the manifest format version, not the agent's product version. Consumers SHOULD use the `version` field to select parsing and validation behavior.

For v0.1:

- The manifest format is draft and subject to change.
- Unknown fields SHOULD be ignored by readers.
- Unknown fields SHOULD be preserved by editors when possible.
- Breaking schema changes SHOULD use a new version number.
- Human-readable Markdown SHOULD remain a first-class part of the format.

Future versions may define a stricter schema, recommended field registry, validation profile, signing profile, or compatibility rules.

## 7. OpenIdentity positioning for AxiomID

OpenIdentity is also intended to support AxiomID and compatible AI-agent platforms as a portable discovery descriptor.

### Native DID Method: `did:axiom`

OpenIdentity agents can use the [`did:axiom`](./did-axiom-method-v0.1.md) DID method, which provides W3C-compliant DIDs anchored to Pi Network with Ed25519 keys. See the full [did:axiom DID Method Specification](./did-axiom-method-v0.1.md) for CRUD operations, DID document structure, resolver reference, and security model.

Example:

```yaml
agent:
  id: "did:axiom:agent:agt_33d7p"
  name: "Axiom Assistant"
  type: "ai-agent"
```

The `did:axiom` resolver is available at `https://axiomid.app/api/did-document?did={did}`.

Suggested project message:

> OpenIdentity is a portable identity manifest for AI agents. It combines identity, human verification, roles, skills, MCP tools, A2A metadata, memory discovery links, wallet references, and authorization pointers into one secure, shareable file.

Short version:

> OpenIdentity is the discovery layer for AI agent identity.

USB metaphor:

> Like a USB descriptor for an AI agent, OpenIdentity lets any compatible platform understand what the agent is, who controls it, what it can do, and where its approved memory and tools live.

### AxiomID compatibility notes

An AxiomID-compatible OpenIdentity manifest SHOULD make the following references explicit when available:

- Human or organization controller verification.
- Roles and skills approved for the agent.
- MCP tool references and allowed scopes.
- A2A agent-card or communication metadata.
- Approved memory discovery links.
- Wallet references, without private keys or seed phrases.
- Authorization URLs, scopes, policies, revocation, or consent pointers.

## 8. Arabic summary | ملخص عربي

OpenIdentity هو ملف هوية محمول لوكلاء الذكاء الاصطناعي. يجمع الهوية، التحقق البشري، الأدوار، المهارات، أدوات MCP، بيانات A2A، روابط اكتشاف الذاكرة، مراجع المحافظ، ومؤشرات التفويض في ملف واحد آمن وقابل للمشاركة.

النسخة المختصرة: OpenIdentity هي طبقة الاكتشاف لهوية وكلاء الذكاء الاصطناعي.

مثل واصف USB لوكيل ذكاء اصطناعي، يتيح OpenIdentity لأي منصة متوافقة فهم ماهية الوكيل، ومن يتحكم به، وما يمكنه فعله، وأين توجد ذاكرته وأدواته المعتمدة.
## 3. Required Fields

| Field | Type | Description |
|---|---|---|
| `openidentity` | string | Manifest version, starting with `0.1`. |
| `agent.id` | string | Stable identifier for the AI agent. |
| `agent.name` | string | Human-readable agent name. |
| `agent.type` | string | Agent type, usually `ai-agent`. |
| `controller` | object | Human, organization, or system controlling the agent. |
| `capabilities.roles` | array | Approved high-level roles. |
| `capabilities.skills` | array | Approved skills or skill families. |

## 4. Recommended Optional Fields

| Field | Type | Description |
|---|---|---|
| `verification` | object | Domain, human, wallet, or signature verification references. |
| `mcp_tools` | array | Approved MCP server and tool references. |
| `a2a` | object | Agent-to-agent metadata and endpoints. |
| `discovery.memory` | array | Approved memory discovery links. |
| `wallets` | array | Wallet references, not private keys. |
| `authorization` | object | Policy, grant, scope, and delegation pointers. |
| `links` | object | Homepage, repository, support, or AxiomID profile links. |

## 5. Security Requirements

- Private keys, secrets, tokens, and private memory content MUST NOT be embedded in the manifest.
- Memory entries SHOULD be references with access labels and policy pointers.
- Controllers SHOULD publish verification references.
- Platforms SHOULD treat unsigned manifests as discovery hints, not final proof of authority.
- Authorization pointers SHOULD include expiration, revocation, or policy URLs when available.

## 6. Arabic Summary | ملخص عربي

OpenIdentity هو ملف هوية محمول لوكلاء الذكاء الاصطناعي. يجمع الهوية، التحقق البشري، الأدوار، المهارات، أدوات MCP، بيانات A2A، روابط اكتشاف الذاكرة، مراجع المحافظ، ومؤشرات التفويض في ملف واحد آمن وقابل للمشاركة.
