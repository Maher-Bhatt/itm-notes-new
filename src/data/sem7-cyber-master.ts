import { Subject } from './types';

export const sem7CyberMaster: Subject = {
  id: "sem7-cyber",
  name: "Cybersecurity & Cryptography",
  code: "CS701",
  color: "bg-red-600",
  icon: "shield",
  description: "Comprehensive University Syllabus for Cybersecurity & Cryptography — Symmetric Ciphers (DES, AES, Cipher Modes CBC/GCM), Asymmetric Public-Key Cryptosystems (RSA, Diffie-Hellman Key Exchange, Elliptic Curve Cryptography ECC), Cryptographic Hash Functions (SHA-256, HMAC), Digital Signatures, PKI, Network Security (SSL/TLS 1.3, IPSec), and Web Application Penetration Testing (OWASP Top 10).",
  semester: 7,
  units: [
    {
      id: "cyber-u1",
      title: "Unit 1: Classical Ciphers & Modern Symmetric Cryptography",
      description: "CIA Triad, Attacks taxonomy, Substitution & Transposition ciphers, Feistel cipher structure, DES, AES-128/192/256 internal rounds, and block cipher operational modes (ECB, CBC, CTR, GCM).",
      topics: [
        {
          id: "cyber-u1-t1",
          title: "CIA Triad, Feistel Cipher Network, AES Round Transformations, and Block Cipher Modes",
          simpleExplanation: "Cybersecurity safeguards computing assets from unauthorized access and tampering. Modern cryptography encrypts plain text into unreadable cipher text using mathematical keys. Symmetric cryptography uses one secret key for both encryption and decryption. The Advanced Encryption Standard (AES) processes 128-bit blocks through multiple rounds of byte substitution, row shifting, column mixing, and round key addition.",
          detailedExplanation: `## 1. The CIA Triad & Threat Model
- **Confidentiality**: Ensuring data is accessible only to authorized entities (achieved via Encryption).
- **Integrity**: Guaranteeing data has not been modified or corrupted in transit (achieved via Hash Functions & MACs).
- **Availability**: Ensuring timely, reliable access to systems for authorized users (mitigated via DDoS defense & redundancy).

---

## 2. Advanced Encryption Standard (AES) Architecture
AES is a non-Feistel Substitution-Permutation Network (SPN) operating on a $4 \times 4$ byte matrix (**State Matrix**).

\`\`\`mermaid
flowchart TD
    PT["128-bit Plaintext"] --> ARK0["Initial AddRoundKey (K0)"]
    ARK0 --> R1["Round 1 to (Nr - 1):\n1. SubBytes (S-Box non-linear substitution)\n2. ShiftRows (Cyclic row permutations)\n3. MixColumns (Matrix multiplication in GF(2^8))\n4. AddRoundKey (XOR with expanded round key)"]
    R1 --> RLAST["Final Round (Nr):\n1. SubBytes\n2. ShiftRows\n3. AddRoundKey (NO MixColumns)"]
    RLAST --> CT["128-bit Ciphertext"]
\`\`\`

| Key Size | Block Size | Number of Rounds ($N_r$) |
| :--- | :--- | :--- |
| **AES-128** | 128 bits | **10 Rounds** |
| **AES-192** | 128 bits | **12 Rounds** |
| **AES-256** | 128 bits | **14 Rounds** |

---

## 3. Block Cipher Modes of Operation
1. **ECB (Electronic Codebook)**: Encrypts each 16-byte block independently with the same key. **Insecure** because identical plaintext blocks produce identical ciphertext blocks (leaks patterns).
2. **CBC (Cipher Block Chaining)**: XORs each plaintext block with the preceding ciphertext block before encryption (uses random Initialization Vector $IV$).
3. **CTR (Counter)**: Encrypts successive counter values and XORs the result with plaintext. Converts block cipher into stream cipher (supports parallel computation).
4. **GCM (Galois/Counter Mode)**: Combines CTR mode with Galois field MAC authentication. Provides **Authenticated Encryption with Associated Data (AEAD)**.`,
          shortNotes: "AES operates on 128-bit blocks using 10, 12, or 14 rounds of SubBytes, ShiftRows, MixColumns, and AddRoundKey. GCM mode is preferred because it provides both confidentiality and data authenticity.",
          examples: [
            {
              title: "AES-256-GCM Authenticated Encryption in Python (Cryptography Library)",
              problem: "Implement AES-256-GCM encryption with a cryptographically secure 96-bit nonce and authentication tag.",
              explanation: "GCM prevents chosen-ciphertext attacks by verifying tag before decrypting payload.",
              code: `import os
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

# Generate cryptographically secure random 256-bit key
key = AESGCM.generate_key(bit_length=256)
aesgcm = AESGCM(key)

nonce = os.urandom(12) # 96-bit recommended nonce for GCM
plaintext = b"CampusLoop Secure Student Credential Payload"
aad = b"university=ITM_SLS_BARODA" # Authenticated Additional Data

# Encrypt: produces ciphertext + 16-byte authentication tag
ciphertext = aesgcm.encrypt(nonce, plaintext, aad)
print(f"Encrypted size: {len(ciphertext)} bytes")

# Decrypt and authenticate
decrypted = aesgcm.decrypt(nonce, ciphertext, aad)
assert decrypted == plaintext
print("Decryption and MAC verification successful!")`
            }
          ],
          keyPoints: [
            "ECB mode leaks patterns and should never be used in production.",
            "SubBytes provides non-linear confusion; ShiftRows and MixColumns provide linear diffusion.",
            "MixColumns is omitted in the final round of AES to reduce hardware gate complexity.",
            "AES-GCM is the required cipher suite for modern TLS 1.3 connections."
          ],
          theoryQuestions: [
            {
              question: "Explain the four transformation functions in an AES encryption round with matrix equations.",
              marks: "7 Marks",
              answer: "1. SubBytes: Non-linear byte substitution using 8-bit S-Box derived from multiplicative inverses in GF(2^8). 2. ShiftRows: Left-rotates row 0 by 0, row 1 by 1, row 2 by 2, and row 3 by 3 bytes. 3. MixColumns: Multiplies each column by a fixed polynomial matrix in GF(2^8) modulo (x^4 + 1). 4. AddRoundKey: Bitwise XORs the 128-bit state matrix with the 128-bit round subkey generated from key expansion schedule."
            }
          ],
          mcqs: [
            {
              question: "Why is Electronic Codebook (ECB) mode considered cryptographically insecure?",
              options: [
                "It uses weak 64-bit keys",
                "Identical plaintext blocks produce identical ciphertext blocks",
                "It cannot be decrypted without internet access",
                "It requires prime numbers for block sizes"
              ],
              correctIndex: 1,
              explanation: "Because ECB encrypts each block independently without chaining or IVs, patterns in plaintext remain visible in ciphertext (as demonstrated by the ECB Penguin image)."
            }
          ]
        }
      ]
    },
    {
      id: "cyber-u2",
      title: "Unit 2: Asymmetric Cryptography, Hash Functions & Public Key Infrastructure (PKI)",
      description: "RSA Algorithm, Diffie-Hellman Key Exchange, Man-in-the-Middle attacks, SHA-256, HMAC, Digital Signatures, X.509 Certificates, and TLS 1.3 Handshake.",
      topics: [
        {
          id: "cyber-u2-t1",
          title: "RSA Mathematical Foundations, Diffie-Hellman Exchange, SHA-256 Hash Digest, and TLS 1.3",
          simpleExplanation: "Asymmetric cryptography solves the key-distribution problem by providing each user with a Public Key (freely shared) and a Private Key (kept secret). RSA relies on the mathematical difficulty of factoring large composite semiprimes. Digital signatures ensure non-repudiation and authenticity by encrypting a hash digest with the sender's private key.",
          detailedExplanation: `## 1. The RSA Cryptosystem Mathematical Derivation
1. **Choose two distinct large prime numbers**: $p$ and $q$.
2. **Compute modulus**: $n = p \cdot q$.
3. **Compute Euler's Totient function**: $\phi(n) = (p - 1)(q - 1)$.
4. **Choose public exponent** $e$ such that $1 < e < \phi(n)$ and $\gcd(e, \phi(n)) = 1$ (commonly $65537$).
5. **Compute private key** $d$ using Extended Euclidean Algorithm:
   $$d \equiv e^{-1} \pmod{\phi(n)} \iff e \cdot d \equiv 1 \pmod{\phi(n)}$$
6. **Public Key**: $(e, n)$; **Private Key**: $(d, n)$.
- **Encryption**: $C = M^e \pmod n$.
- **Decryption**: $M = C^d \pmod n$ (guaranteed by Euler's Totient Theorem: $M^{\phi(n)} \equiv 1 \pmod n$).

---

## 2. Diffie-Hellman Key Exchange Flow
Enables two parties (Alice and Bob) to establish a shared secret over an insecure channel:
1. Agree on public prime $p$ and primitive root $g \pmod p$.
2. Alice picks private $a$, sends public $A = g^a \pmod p$.
3. Bob picks private $b$, sends public $B = g^b \pmod p$.
4. Shared secret: $K = B^a \pmod p = (g^b)^a \pmod p = g^{ab} \pmod p = A^b \pmod p$.

---

## 3. TLS 1.3 Accelerated Handshake (1-RTT)
TLS 1.3 deprecates insecure algorithms (MD5, SHA-1, RC4, RSA key exchange) and mandates **Ephemeral Diffie-Hellman (ECDHE)** for Perfect Forward Secrecy (PFS).

\`\`\`mermaid
sequenceDiagram
    participant Client
    participant Server
    Client->>Server: ClientHello (Supported Ciphers + KeyShare ECDHE)
    Server->>Client: ServerHello (Selected Cipher + Server KeyShare)
    Server->>Client: {EncryptedExtensions, Certificate, CertVerify, Finished}
    Note over Client,Server: Handshake complete in 1 Round-Trip Time (1-RTT)!
    Client->>Server: {Finished, Encrypted Application Data}
    Server->>Client: {Encrypted Application Data}
\`\`\``,
          shortNotes: "RSA derives security from prime factorization hardness; Diffie-Hellman enables shared secret derivation via discrete logarithms; TLS 1.3 uses 1-RTT ECDHE for Perfect Forward Secrecy.",
          examples: [
            {
              title: "Step-by-Step RSA Key Generation & Encryption Proof",
              problem: "Given small primes p = 61 and q = 53, compute RSA keys and encrypt message M = 65.",
              explanation: "Demonstrates modular exponentiation and decryption verification.",
              code: `# 1. Modulus and Totient
p, q = 61, 53
n = p * q # 3233
phi = (p - 1) * (q - 1) # 60 * 52 = 3120

# 2. Exponent e (coprime to 3120)
e = 17

# 3. Private key d: (e * d) % phi == 1
# Using Extended Euclidean Algorithm:
d = pow(e, -1, phi) # 2753

print(f"Public Key: (e={e}, n={n})")
print(f"Private Key: (d={d}, n={n})")

# 4. Encrypt M = 65
M = 65
C = pow(M, e, n) # (65^17) % 3233 = 2790
print(f"Ciphertext: {C}")

# 5. Decrypt C = 2790
decrypted_M = pow(C, d, n) # (2790^2753) % 3233 = 65
assert decrypted_M == M
print(f"Decrypted: {decrypted_M}")`
            }
          ],
          keyPoints: [
            "Euler's theorem guarantees that M^(e*d) = M mod n.",
            "Diffie-Hellman without authentication is vulnerable to Man-in-the-Middle (MitM) attacks.",
            "SHA-256 produces a fixed 256-bit digest resistant to preimage, second-preimage, and collision attacks.",
            "Perfect Forward Secrecy (PFS) ensures past session traffic remains secure even if long-term server private keys are later compromised."
          ],
          theoryQuestions: [
            {
              question: "Explain how Digital Signatures provide Non-Repudiation, Integrity, and Authentication.",
              marks: "7 Marks",
              answer: "The sender hashes the message to produce a fixed-size digest, then encrypts the digest with their private key to create the signature. The recipient decrypts the signature using the sender's public key to extract the digest, and compares it to their own re-computed hash of the message. If the hashes match: 1. Integrity is proven (no tampering occurred). 2. Authentication is confirmed (only the sender holds the private key). 3. Non-repudiation is established (the sender cannot deny creating the message)."
            }
          ],
          mcqs: [
            {
              question: "What cryptographic property ensures that a compromise of the server's long-term private key will not compromise past recorded session keys?",
              options: ["Zero-Knowledge Proof", "Perfect Forward Secrecy (PFS)", "Collision Resistance", "Symmetric Padding"],
              correctIndex: 1,
              explanation: "Perfect Forward Secrecy (achieved via Ephemeral Diffie-Hellman ECDHE) generates unique ephemeral keys for each session that are discarded immediately after session termination."
            }
          ]
        }
      ]
    }
  ]
};
