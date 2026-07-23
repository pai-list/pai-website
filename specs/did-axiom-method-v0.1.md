---
title: did:axiom DID Method Specification
version: 0.1
status: draft
author: Mohamed Abdelaziz (https://github.com/Moeabdelaziz007)
---

# did:axiom DID Method Specification

## 1. Abstract

The `did:axiom` DID method provides self-sovereign, W3C-compliant decentralized identifiers for humans and AI agents within the AxiomID ecosystem. It uses Pi Network as its primary identity anchor and supports Ed25519 cryptographic keys for signing and verification. This method is designed to work seamlessly with the OpenIdentity manifest format and the AxiomID platform.

## 2. DID Method Name

The namestring that identifies this DID method is: `axiom`

A DID that uses this method MUST begin with the following prefix: `did:axiom:`

Per the W3C DID specification, this prefix MUST be in lowercase. The remainder of the DID, after the prefix, is case-sensitive.

## 3. Target System(s)

The `did:axiom` method operates on the AxiomID platform, which uses:

- **Primary identity anchor:** Pi Network (user authentication and wallet)
- **Cryptographic keys:** Ed25519 keypairs derived deterministically from user identity
- **Resolution:** AxiomID resolver network (API + on-chain registry)
- **Anchoring:** Optional Stellar on-chain anchoring for trust attestation

## 4. DID Scheme

The formal DID scheme for `did:axiom` is:

```
did:axiom:pi:<pi-username>
did:axiom:pi:<pi-uid-hash>
did:axiom:agent:<agent-id>
did:axiom:issuer
```

### 4.1 Human Identity DIDs

```
did:axiom:pi:<pi-username>
```

- `pi-username` is the Pi Network username (URL-encoded if it contains special characters)
- Example: `did:axiom:pi:moeabdelaziz007`

### 4.2 Hashed Identity DIDs (Privacy-Preserving)

```
did:axiom:pi:<sha256-hash-prefix>
```

- The hash is derived from the Pi UID + salt, truncated to 16 hex characters
- Example: `did:axiom:pi:a1b2c3d4e5f6a7b8`

### 4.3 AI Agent DIDs

```
did:axiom:agent:<agent-id>
```

- `agent-id` is a unique identifier assigned during agent creation
- Example: `did:axiom:agent:agt_33d7p`

### 4.4 Issuer DID

```
did:axiom:issuer
```

- A well-known DID for the AxiomID credential issuer
- Used to sign Verifiable Credentials issued by the platform

## 5. DID Document Structure

A `did:axiom` DID document follows the W3C DID Document specification:

```json
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/ed25519-2020/v1"
  ],
  "id": "did:axiom:pi:moeabdelaziz007",
  "verificationMethod": [
    {
      "id": "did:axiom:pi:moeabdelaziz007#key-1",
      "type": "Ed25519VerificationKey2020",
      "controller": "did:axiom:pi:moeabdelaziz007",
      "publicKeyMultibase": "z6Mk..."
    }
  ],
  "authentication": [
    "did:axiom:pi:moeabdelaziz007#key-1"
  ],
  "assertionMethod": [
    "did:axiom:pi:moeabdelaziz007#key-1"
  ],
  "service": [
    {
      "id": "did:axiom:pi:moeabdelaziz007#passport",
      "type": "AxiomIDPassport",
      "serviceEndpoint": "https://axiomid.app/passport/moeabdelaziz007"
    },
    {
      "id": "did:axiom:pi:moeabdelaziz007#trust-score",
      "type": "AxiomIDTrustScore",
      "serviceEndpoint": "https://axiomid.app/api/trust-score?did=did:axiom:pi:moeabdelaziz007"
    }
  ]
}
```

## 6. CRUD Operations

### 6.1 Create (Register)

Creating a `did:axiom` DID happens when a user completes the Pi Network authentication flow on AxiomID:

1. User signs in with Pi Network via the AxiomID app
2. AxiomID derives an Ed25519 keypair from the Pi UID + SOVEREIGN_KEY_SALT
3. A DID is generated: `did:axiom:pi:{piUsername}`
4. The DID and public key are stored in the AxiomID registry
5. A DID document is generated and made resolvable

### 6.2 Read (Resolve)

Resolution is performed via the AxiomID resolver API:

```
GET https://axiomid.app/api/did-document?did=did:axiom:pi:moeabdelaziz007
```

Response: A W3C-compliant DID Document JSON.

The resolver:
1. Parses the DID method-specific identifier
2. Looks up the user/agent in the AxiomID registry (PostgreSQL + D1 edge cache)
3. Constructs the DID document from the stored public key and service endpoints
4. Returns the document

### 6.3 Update

Updating a `did:axiom` DID document requires:
1. Authentication as the DID controller (Pi Network session)
2. The new public key or service endpoint is submitted via the AxiomID API
3. The registry is updated
4. Edge cache is invalidated

Key rotation:
- The controller can request a new keypair derivation
- The old key is marked as revoked
- The DID document is updated with the new verification method

### 6.4 Deactivate

Deactivation requires:
1. Authentication as the DID controller
2. A deactivation request is submitted
3. The DID document is updated to remove verification methods
4. The DID is marked as deactivated in the registry
5. Resolution returns a deactivated DID document (empty verification methods)

## 7. Security Considerations

### 7.1 Key Derivation

Ed25519 keypairs are deterministically derived using HMAC-SHA256:
```
seed = HMAC-SHA256(SOVEREIGN_KEY_SALT, piUid + agentId)
```

The `SOVEREIGN_KEY_SALT` environment variable must be:
- At least 32 bytes of cryptographically random data
- Stored securely (never committed to version control)
- Different between environments (testnet vs mainnet)

### 7.2 Resolution Integrity

- The resolver API is served over HTTPS only
- Responses include caching headers for edge distribution
- DID documents are signed by the AxiomID issuer key
- Clients SHOULD verify the issuer signature on resolved documents

### 7.3 Privacy

- The hashed DID format (`did:axiom:pi:<hash>`) provides privacy by not exposing the username
- The full DID format (`did:axiom:pi:<username>`) is more human-readable but less private
- Users choose their preferred format during identity claim
- DID documents do NOT contain PII beyond the public key and service endpoints

### 7.4 Revocation

- Credentials and stamps linked to a DID can be revoked via the credential-status API
- DID key rotation effectively revokes the old key
- Deactivated DIDs return empty verification methods

## 8. Privacy Considerations

- DID correlation: The `did:axiom:pi:<username>` format is correlatable. Users who need privacy should use the hashed format.
- Service endpoints may reveal the user's passport URL. This is intentional for discoverability.
- The resolver does not log resolution requests beyond rate-limiting purposes.
- No PII is stored in the DID document itself.

## 9. Interoperability

### 9.1 W3C DID Core Specification

`did:axiom` conforms to the [W3C DID Core specification](https://www.w3.org/TR/did-core/).

### 9.2 Verifiable Credentials

DID documents include `assertionMethod` entries for signing Verifiable Credentials.

### 9.3 OpenIdentity Manifest

An OpenIdentity manifest can reference a `did:axiom` DID in its `agent.id` field:

```yaml
agent:
  id: "did:axiom:agent:agt_33d7p"
  name: "Axiom Assistant"
  type: "ai-agent"
```

### 9.4 Pi Network Integration

The primary identity anchor is Pi Network. This means:
- Pi Network authentication is required for human DIDs
- Pi wallet addresses can be included in service endpoints
- Pi payments (via Spend Request) can be authorized by DID controllers

### 9.5 Optional Stellar Anchoring

Stellar on-chain anchoring remains available as an optional trust signal:
- VC hashes can be anchored to Stellar as transaction memos
- This provides an additional layer of tamper evidence
- It is NOT required for DID resolution or verification

## 10. Resolver Reference Implementation

The AxiomID platform provides a reference resolver at:

```
https://axiomid.app/api/did-document?did={did}
```

### Universal Resolver Integration

To add `did:axiom` to a universal resolver:

```javascript
async function resolve(did) {
  const response = await fetch(
    `https://axiomid.app/api/did-document?did=${encodeURIComponent(did)}`
  );
  if (!response.ok) {
    throw new Error(`Resolution failed: ${response.status}`);
  }
  return await response.json();
}
```

### SDK Resolution

Using the `@axiomid/sdk` package:

```typescript
import { AxiomSDK } from "@axiomid/sdk";

const sdk = new AxiomSDK({ network: "mainnet" });
const didDocument = await sdk.resolveDID("did:axiom:pi:moeabdelaziz007");
```

## 11. ABNF Grammar

```abnf
did-axiom = "did:axiom:" method-specific-id
method-specific-id = "pi:" pi-identifier / "agent:" agent-identifier / "issuer"
pi-identifier = pi-username / pi-hash
pi-username = 1*64 (%x21 / %x23-39 / %x3B-7E)  ; URL-encoded
pi-hash = 16HEXDIG
agent-identifier = "agt_" 5*10ALPHA / 5*20(%x21-7E)
```

## 12. Changelog

| Version | Date | Changes |
|---|---|---|
| 0.1 | 2026-07-17 | Initial draft. Pi Network primary anchor, Ed25519 keys, W3C compliance. |

## 13. Arabic Summary | الملخص العربي

مواصفة `did:axiom` هي طريقة DID متوافقة مع معايير W3C لنظام AxiomID. تستخدم Pi Network كمرتكز هوية أساسي ومفاتيح Ed25519 للتوقيع والتحقق. تدعم هويات البشر ووكلاء الذكاء الاصطناعي، وتوفر حل دقة (resolver) عبر API. الربط على Stellar اختياري كطبقة ثقة إضافية.
