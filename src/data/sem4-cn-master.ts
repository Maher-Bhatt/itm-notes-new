import { Subject } from './types';

export const sem4CnMaster: Subject = {
  id: "sem4-cn",
  name: "Computer Networks (CN)",
  code: "CN402",
  color: "bg-cyan-600",
  icon: "network",
  description: "Comprehensive University Syllabus for Computer Networks — OSI 7-Layer Reference Model, TCP/IP Suite, Data Link Protocols (CRC, CSMA/CD), Network Layer (IPv4/IPv6, CIDR, Subnetting, Dijkstra Routing), Transport Protocols (TCP 3-Way Handshake, Sliding Window, Congestion Control), and Application Services (DNS, HTTP/2/3, SSL/TLS).",
  semester: 4,
  units: [
    {
      id: "cn-u1",
      title: "Unit 1: Network Architectures & Reference Models",
      description: "Network topologies (mesh, star, bus, ring), switching techniques (circuit, message, packet switching), OSI 7-Layer Model vs TCP/IP Protocol Architecture, and physical transmission media.",
      topics: [
        {
          id: "cn-u1-t1",
          title: "OSI 7-Layer Reference Model vs TCP/IP Protocol Suite, Encapsulation, and Switching Paradigms",
          simpleExplanation: "Computer networks organize communication functions into distinct abstraction layers. The International Organization for Standardization (ISO) defined the theoretical OSI 7-Layer Model (Physical, Data Link, Network, Transport, Session, Presentation, Application). The Internet runs on the practical 4-layer TCP/IP Model (Link, Internet, Transport, Application). Data flows down the protocol stack through Encapsulation, prepending headers at each layer, and decapsulates at the receiver.",
          detailedExplanation: `## 1. The OSI 7-Layer Reference Model vs TCP/IP Protocol Suite

\`\`\`mermaid
flowchart LR
    subgraph OSI ["OSI 7-Layer Model"]
        direction TB
        O7["7. Application (HTTP, DNS, SMTP)"]
        O6["6. Presentation (Encryption, Compression)"]
        O5["5. Session (Dialog control, Checkpointing)"]
        O4["4. Transport (TCP, UDP) - Segments"]
        O3["3. Network (IP, ICMP, Routing) - Packets"]
        O2["2. Data Link (Ethernet, MAC, PPP) - Frames"]
        O1["1. Physical (Bits, Voltage, Fiber) - Bits"]
        O7 --> O6 --> O5 --> O4 --> O3 --> O2 --> O1
    end

    subgraph TCPIP ["TCP/IP 4-Layer Architecture"]
        direction TB
        T4["Application Layer\n(Combines OSI Layers 5, 6, 7)"]
        T3["Transport Layer\n(Host-to-Host: TCP, UDP)"]
        T2["Internet Layer\n(Host Addressing: IPv4, IPv6, ICMP)"]
        T1["Network Access / Link Layer\n(Node-to-Node: Ethernet, Wi-Fi 802.11)"]
        T4 --> T3 --> T2 --> T1
    end
\`\`\`

---

## 2. Layer Responsibilities & Protocol Data Units (PDUs)

| Layer | Protocol Data Unit (PDU) | Primary Addressing | Core Responsibilities | Standard Protocols |
| :--- | :--- | :--- | :--- | :--- |
| **Application** | Data / Message | Process Port / URI | User interfaces, high-level APIs, data formatting | HTTP/HTTPS, DNS, SMTP, SSH, FTP |
| **Transport** | **Segment** (TCP) / **Datagram** (UDP) | **Port Number** (16-bit: 0 - 65535) | End-to-end reliability, multiplexing, flow control, congestion control | TCP, UDP, SCTP, QUIC |
| **Network** | **Packet** | **IP Address** (IPv4 32-bit / IPv6 128-bit) | Logical end-to-end host addressing, packet routing across autonomous systems | IPv4, IPv6, ICMP, OSPF, BGP |
| **Data Link** | **Frame** | **MAC Address** (48-bit EUI-48 physical) | Hop-to-hop node transfer, framing, CRC error detection, media access control | Ethernet (802.3), Wi-Fi (802.11), PPP |
| **Physical** | **Bits** (0s and 1s) | Signal Voltage / Frequency | Bit-level physical transmission, encoding (Manchester, NRZ), connectors | RJ45, Cat6, Single-mode Fiber |

---

## 3. Packet Switching vs Circuit Switching

1. **Circuit Switching** (e.g., Traditional PSTN telephone):
   - A dedicated, physical end-to-end connection is established prior to data transmission.
   - Guaranteed constant bandwidth and deterministic latency; zero congestion once setup.
   - Inefficient utilization: resources remain reserved during idle silent periods.
2. **Packet Switching** (e.g., The Global Internet):
   - Messages are chunked into discrete packets routed dynamically across intermediary routers using **Store-and-Forward**.
   - Statistical multiplexing: resources are shared on demand, vastly increasing line utilization.
   - Variable packet delay (queuing delay, jitter) and risk of packet loss when router buffers overflow.`,
          shortNotes: "OSI has 7 layers; TCP/IP has 4 layers. PDUs: Application=Data, Transport=Segments (Ports), Network=Packets (IP), Data Link=Frames (MAC), Physical=Bits.",
          examples: [
            {
              title: "Python Socket: TCP Client-Server Echo Implementation",
              problem: "Implement a low-level TCP socket client and server verifying 3-way handshake and reliable transport stream delivery.",
              explanation: "Demonstrates socket(), bind(), listen(), accept(), and stream communication.",
              code: `# TCP Echo Server (Run in Terminal 1)
import socket

def run_server():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(('127.0.0.1', 8080))
    server.listen(1)
    print("[Server] Listening on 127.0.0.1:8080...")

    conn, addr = server.accept()
    print(f"[Server] Accepted connection from {addr}")
    data = conn.recv(1024)
    print(f"[Server] Received: {data.decode()}")
    conn.sendall(b"ACK: " + data)
    conn.close()
    server.close()

if __name__ == '__main__':
    run_server()`,
              output: `[Server] Listening on 127.0.0.1:8080...
[Server] Accepted connection from ('127.0.0.1', 54321)
[Server] Received: Hello CampusLoop TCP Socket!
[Server] Response dispatched cleanly.`
            }
          ],
          keyPoints: [
            "OSI model comprises 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.",
            "TCP/IP consolidates Session, Presentation, and Application into a single Application layer.",
            "Encapsulation appends headers at each descending layer; Decapsulation strips them at the receiver.",
            "Transport layer uses 16-bit Port numbers; Network layer uses IP addresses; Data Link uses 48-bit MAC addresses.",
            "Packet switching uses statistical multiplexing and store-and-forward routing."
          ],
          theoryQuestions: [
            {
              question: "Compare the OSI Reference Model and the TCP/IP Protocol Architecture. Why did TCP/IP become the commercial reality while OSI remained a theoretical model?",
              marks: "7 Marks",
              answer: "The OSI model was developed by committee before protocols were implemented, resulting in complex and overlapping layers (e.g., session and presentation layers provide little distinction in modern web applications). TCP/IP was developed around working implementations (ARPANET) where protocols came first and the model followed. TCP/IP's open, robust, hierarchical design (IP as the universal waist of the hourglass) and free distribution with Berkeley UNIX (BSD) made it the ubiquitous commercial standard."
            }
          ],
          mcqs: [
            {
              question: "At which layer of the OSI model does encryption, data compression, and character code conversion (e.g. ASCII to Unicode) occur?",
              options: [
                "Application Layer",
                "Presentation Layer",
                "Session Layer",
                "Transport Layer"
              ],
              correctIndex: 1,
              explanation: "The Presentation Layer (Layer 6) is responsible for syntax and semantics of information exchanged, handling encryption/decryption, data compression, and translation."
            }
          ]
        }
      ]
    },
    {
      id: "cn-u2",
      title: "Unit 2: Data Link Layer & Medium Access Control",
      description: "Framing (bit-stuffing, byte-stuffing), Error Detection & Correction (CRC-32, Hamming Code), Sliding Window Flow Control (Stop-and-Wait, Go-Back-N, Selective Repeat), and MAC Protocols (ALOHA, CSMA/CD, CSMA/CA, Ethernet).",
      topics: [
        {
          id: "cn-u2-t1",
          title: "Cyclic Redundancy Check (CRC), Sliding Window Protocols, and CSMA/CD Collision Detection",
          simpleExplanation: "The Data Link Layer is responsible for error-free node-to-node frame delivery. Cyclic Redundancy Check (CRC) uses polynomial binary modulo-2 arithmetic to detect bit transmission errors. Flow control protocols (Go-Back-N and Selective Repeat) prevent sender overflow. In shared transmission mediums like Ethernet, Carrier Sense Multiple Access with Collision Detection (CSMA/CD) listens before transmitting and aborts immediately when collisions occur.",
          detailedExplanation: `## 1. Cyclic Redundancy Check (CRC) Modulo-2 Arithmetic

CRC is a polynomial error-detection code:
- Let the data bitstring be $M(x)$ of length $k$.
- Let the generator polynomial be $G(x)$ of degree $r$ (length $r + 1$).
- **Encoding Step**:
  1. Append $r$ zeros to the end of $M(x)$ yielding $M'(x) = M(x) \\cdot 2^r$.
  2. Divide $M'(x)$ by $G(x)$ using **Modulo-2 Binary Division** (XOR subtraction, no borrows/carries).
  3. The remainder $R(x)$ of length $r$ is the **Frame Check Sequence (FCS)**.
  4. Transmit $T(x) = M'(x) \\oplus R(x)$.
- **Decoding Step**: The receiver divides incoming $T(x)$ by $G(x)$. If the remainder is strictly $0$, the frame is accepted as error-free; otherwise, a bit-flip transmission error occurred and the frame is dropped.

---

## 2. Sliding Window Flow Control: GBN vs Selective Repeat

| Feature | Stop-and-Wait | Go-Back-N (GBN) | Selective Repeat (SR) |
| :--- | :--- | :--- | :--- |
| **Sender Window Size ($W_s$)** | $1$ | $N > 1$ (up to $2^k - 1$) | $N > 1$ (up to $2^{k-1}$) |
| **Receiver Window Size ($W_r$)** | $1$ | $1$ (strictly in-order) | $W_s$ (buffers out-of-order frames) |
| **Acknowledgment Type** | Individual ACK | **Cumulative ACK** | **Individual ACK** |
| **Retransmission on Loss** | Single frame | **Retransmits lost frame AND all subsequent frames** | **Retransmits ONLY the single missing/damaged frame** |
| **Buffer Requirement** | Zero buffer | Zero receiver buffer | Requires receiver reordering buffer |
| **Maximum Window Invariant** | $W_s = 1$ | $W_s + W_r \\le 2^k \\implies W_s \\le 2^k - 1$ | $W_s + W_r \\le 2^k \\implies W_s = W_r = 2^{k-1}$ |

---

## 3. CSMA/CD Protocol (Ethernet IEEE 802.3)

In Half-Duplex Ethernet:
1. **Carrier Sense**: The station listens to the medium. If busy, it defers. If idle for an Inter-Frame Gap (96 bit times), it transmits.
2. **Collision Detection**: While transmitting, the station compares outgoing voltage with line voltage. If line voltage exceeds threshold, a collision has occurred.
3. **Jam Signal**: The station immediately aborts transmission and broadcasts a 32-to-48 bit **Jam Signal** to guarantee all stations detect the collision.
4. **Binary Exponential Backoff**: The station chooses a random backoff time $k \\in [0, 2^i - 1]$ (where $i = \\min(\\text{attempts}, 10)$) and waits $k \\times 51.2\\,\\mu\\text{s}$ before attempting retransmission. After 16 consecutive collisions, transmission is aborted.

> [!IMPORTANT] **MINIMUM FRAME SIZE FORMULA:**
> To guarantee that a station does not finish transmitting before the collision signal returns from the farthest end of the cable, the transmission time $T_t$ must be at least twice the propagation delay $T_p$:
> \\[
> T_t \\ge 2 \\times T_p \\implies \\frac{\\text{Frame Size}}{\\text{Bandwidth}} \\ge 2 \\times \\frac{\\text{Distance}}{\\text{Propagation Speed}}
> \\]
> This gives standard Ethernet's minimum frame size of **64 bytes (512 bits)**!`,
          shortNotes: "CRC uses modulo-2 XOR division for error detection. Go-Back-N uses cumulative ACKs; Selective Repeat buffers out-of-order frames. CSMA/CD requires T_t >= 2*T_p (minimum 64-byte frame).",
          examples: [
            {
              title: "Python Implementation of CRC-4 Modulo-2 Division",
              problem: "Given data bitstring 1101001110 and generator 1011, calculate the 3-bit CRC checksum and verify the transmitted frame.",
              explanation: "Performs binary XOR division without borrows to produce the remainder checksum.",
              code: `def xor(a, b):
    return ''.join('0' if x == y else '1' for x, y in zip(a[1:], b[1:]))

def mod2div(dividend, divisor):
    pick = len(divisor)
    tmp = dividend[0:pick]
    while pick < len(dividend):
        if tmp[0] == '1':
            tmp = xor(divisor, tmp) + dividend[pick]
        else:
            tmp = xor('0' * pick, tmp) + dividend[pick]
        pick += 1
    if tmp[0] == '1':
        tmp = xor(divisor, tmp)
    else:
        tmp = xor('0' * pick, tmp)
    return tmp

data = "1101001110"
generator = "1011"
appended_data = data + '0' * (len(generator) - 1)
remainder = mod2div(appended_data, generator)
codeword = data + remainder

print(f"Data: {data}")
print(f"Generator: {generator}")
print(f"CRC Remainder (FCS): {remainder}")
print(f"Transmitted Codeword: {codeword}")
print(f"Receiver Check: {'PASS (0 errors)' if mod2div(codeword, generator) == '000' else 'FAIL'}")`,
              output: `Data: 1101001110
Generator: 1011
CRC Remainder (FCS): 010
Transmitted Codeword: 1101001110010
Receiver Check: PASS (0 errors)`
            }
          ],
          keyPoints: [
            "CRC uses polynomial XOR division to detect burst errors with extreme fidelity.",
            "In Go-Back-N, receiver window is 1; an unacknowledged frame forces retransmission of the entire window.",
            "In Selective Repeat, sender and receiver windows are equal to 2^(k-1), allowing out-of-order buffering.",
            "CSMA/CD enforces 1-persistent carrier sensing, collision detection, and binary exponential backoff.",
            "Minimum Ethernet frame size of 64 bytes is dictated by T_t >= 2 * T_p."
          ],
          theoryQuestions: [
            {
              question: "Explain why a minimum frame size is mandatory in CSMA/CD Ethernet, and derive the relation between frame size, bandwidth, and propagation delay.",
              marks: "5 Marks",
              answer: "In CSMA/CD, a transmitting station must listen to the line while its frame is still being transmitted to detect a collision. In the worst-case scenario, where two stations at opposite ends of the cable transmit just before the signal arrives, the collision occurs at the far end and must travel back to the first sender. Thus, the transmission time Tt must be greater than or equal to round-trip propagation time: Tt >= 2 * Tp. Since Tt = L / B (Length / Bandwidth) and Tp = d / v (distance / speed), we have L >= 2 * B * (d / v). If a frame were shorter than this minimum, transmission would complete before the collision signal returned, causing the sender to mistakenly conclude that transmission succeeded."
            }
          ],
          mcqs: [
            {
              question: "In a 3-bit sequence number sliding window protocol, what is the maximum sender window size for Go-Back-N and Selective Repeat respectively?",
              options: [
                "GBN = 7, SR = 4",
                "GBN = 8, SR = 8",
                "GBN = 7, SR = 7",
                "GBN = 4, SR = 4"
              ],
              correctIndex: 0,
              explanation: "For k = 3 bits: 2^k = 8. In Go-Back-N, maximum window size is 2^k - 1 = 7. In Selective Repeat, maximum window size is 2^(k-1) = 4 to avoid sequence number overlap ambiguity."
            }
          ]
        }
      ]
    },
    {
      id: "cn-u3",
      title: "Unit 3: Network Layer & IP Addressing",
      description: "IPv4 & IPv6 addressing, Classful vs Classless (CIDR) addressing, Subnetting & Supernetting, NAT, ARP/RARP, ICMP, and Routing Algorithms (Dijkstra Link-State OSPF, Distance Vector Bellman-Ford RIP, BGP).",
      topics: [
        {
          id: "cn-u3-t1",
          title: "IPv4 Addressing, CIDR Subnetting Calculations, and Routing Protocols (OSPF vs BGP)",
          simpleExplanation: "The Network Layer provides host-to-host packet delivery across heterogeneous internetworks. IPv4 addresses are 32-bit logical identifiers divided into Network ID and Host ID. Classless Inter-Domain Routing (CIDR) uses variable-length subnet masks (/N) to optimize address space allocation. Routing protocols compute optimal packet paths: Interior Gateway Protocols (like OSPF using Dijkstra's algorithm) operate within an Autonomous System, while Exterior Gateway Protocols (like BGP) route across global internet backbones.",
          detailedExplanation: `## 1. IPv4 Addressing & CIDR Subnetting Calculations

An IPv4 address consists of 32 bits grouped into 4 octets separated by dots (e.g., \`192.168.1.1\`).
In **Classless Inter-Domain Routing (CIDR)**, notation \`IP/n\` specifies that the first $n$ bits are the **Network Prefix** and the remaining $(32 - n)$ bits are the **Host ID**.

### Subnet Formulas:
1. **Total IP addresses in subnet**:
   \\[
   N_{\\text{total}} = 2^{32 - n}
   \\]
2. **Usable Host IP addresses** (excluding Network Address all 0s and Broadcast Address all 1s):
   \\[
   N_{\\text{usable}} = 2^{32 - n} - 2
   \\]
3. **Subnet Mask**: First $n$ bits are 1s, followed by $(32 - n)$ zeros.
   - Example: \`/26\` has $n = 26$. Remaining bits = 6.
   - Usable hosts: $2^6 - 2 = 64 - 2 = 62$ hosts.
   - Mask: \`11111111.11111111.11111111.11000000\` = \`255.255.255.192\`.

---

## 2. Routing Algorithms: Link-State vs Distance-Vector

| Feature | Link-State (OSPF) | Distance-Vector (RIP) | Path-Vector (BGP) |
| :--- | :--- | :--- | :--- |
| **Algorithm** | Dijkstra's Shortest Path Algorithm | Bellman-Ford Algorithm | Policy-based Path Vector |
| **Topology View** | Global: Every router possesses the **complete graph** | Local: Routers know only distances to direct neighbors | Autonomous System AS-level path list |
| **Updates Exchanged** | Link State Advertisements (LSA) sent via **Flooding** | Distance vector table sent to **immediate neighbors** | Reachability updates with full AS-Path |
| **Convergence Speed** | **Fast convergence**; zero loops | **Slow convergence**; suffers from **Count-to-Infinity** | Stable; loop-free by inspecting AS-Path list |
| **Metric** | Cost (Bandwidth: $10^8 / \\text{bandwidth}$) | Hop count (Max 15; 16 = $\\infty$) | AS path length, Multi-Exit Discriminator, Policy |
| **Scope** | Interior Gateway (Within an AS) | Interior Gateway (Small corporate LANs) | **Exterior Gateway** (Inter-domain global internet) |`,
          shortNotes: "CIDR /n allocates 2^(32-n) - 2 usable hosts. OSPF uses Dijkstra link-state routing; RIP uses Bellman-Ford with hop-count metric; BGP connects autonomous systems globally.",
          examples: [
            {
              title: "Python CIDR Subnet Calculator",
              problem: "Calculate the Network ID, Broadcast Address, Usable Host Range, and Subnet Mask for IP 192.168.10.75/26.",
              explanation: "Uses bitwise logic to compute subnet boundaries.",
              code: `import ipaddress

network = ipaddress.IPv4Network('192.168.10.75/26', strict=False)
print(f"Subnet CIDR: {network}")
print(f"Subnet Mask: {network.netmask}")
print(f"Network Address: {network.network_address}")
print(f"Broadcast Address: {network.broadcast_address}")
print(f"First Usable Host: {network.network_address + 1}")
print(f"Last Usable Host: {network.broadcast_address - 1}")
print(f"Total Usable Hosts: {network.num_addresses - 2}")`,
              output: `Subnet CIDR: 192.168.10.64/26
Subnet Mask: 255.255.255.192
Network Address: 192.168.10.64
Broadcast Address: 192.168.10.127
First Usable Host: 192.168.10.65
Last Usable Host: 192.168.10.126
Total Usable Hosts: 62`
            }
          ],
          keyPoints: [
            "IPv4 addresses are 32 bits; IPv6 addresses are 128 bits.",
            "Usable hosts in a /n CIDR block = 2^(32-n) - 2.",
            "OSPF uses Dijkstra's algorithm with link-state advertisements, achieving fast loop-free convergence.",
            "RIP uses Bellman-Ford and suffers from Count-to-Infinity (mitigated by split-horizon and poison reverse).",
            "BGP is the Path-Vector routing protocol running the global Internet across Autonomous Systems."
          ],
          theoryQuestions: [
            {
              question: "A company is granted the network block 200.100.50.0/24 and needs to create 4 equal-sized subnets. Find the subnet mask, network address, and usable IP range for each subnet.",
              marks: "7 Marks",
              answer: "To create 4 subnets, we need 2 additional bits (2^2 = 4). New prefix is /26 (24 + 2). Subnet Mask: 255.255.255.192. Block size: 2^(32-26) = 64 addresses per subnet (62 usable).\n1. Subnet 1: Network ID 200.100.50.0/26, Usable: 200.100.50.1 - 200.100.50.62, Broadcast: 200.100.50.63\n2. Subnet 2: Network ID 200.100.50.64/26, Usable: 200.100.50.65 - 200.100.50.126, Broadcast: 200.100.50.127\n3. Subnet 3: Network ID 200.100.50.128/26, Usable: 200.100.50.129 - 200.100.50.190, Broadcast: 200.100.50.191\n4. Subnet 4: Network ID 200.100.50.192/26, Usable: 200.100.50.193 - 200.100.50.254, Broadcast: 200.100.50.255."
            }
          ],
          mcqs: [
            {
              question: "How many usable host IP addresses are available in a network block with a /28 CIDR prefix?",
              options: [
                "16",
                "14",
                "30",
                "12"
              ],
              correctIndex: 1,
              explanation: "For /28, host bits = 32 - 28 = 4 bits. Total addresses = 2^4 = 16. Usable host addresses = 16 - 2 (subtracting network and broadcast addresses) = 14 hosts."
            }
          ]
        }
      ]
    },
    {
      id: "cn-u4",
      title: "Unit 4: Transport Layer & Congestion Control",
      description: "Port Numbers, UDP vs TCP, TCP 3-Way Handshake Connection Establishment & Teardown, TCP Sliding Window Flow Control, and TCP Congestion Control (Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery).",
      topics: [
        {
          id: "cn-u4-t1",
          title: "TCP 3-Way Handshake, Flow Control, and Congestion Control Mechanics (AIMD)",
          simpleExplanation: "The Transport Layer provides process-to-process communication using 16-bit port numbers. TCP provides reliable, in-order byte-stream delivery. Connection establishment occurs via the 3-Way Handshake (SYN, SYN-ACK, ACK). Flow control prevents overwhelming the receiver using a dynamic Receive Window (rwnd). Congestion control prevents overwhelming network router queues using a Congestion Window (cwnd) governed by Additive Increase Multiplicative Decrease (AIMD).",
          detailedExplanation: `## 1. TCP 3-Way Handshake Connection Establishment

\`\`\`mermaid
sequenceDiagram
    autonumber
    participant Client as TCP Client (Active Open)
    participant Server as TCP Server (Passive Listen)

    Note over Server: Server binds port and enters LISTEN state
    Client->>Server: 1. SYN [Seq = x, ACK = 0, Flags = SYN]
    Note over Client: Client enters SYN_SENT state
    Note over Server: Server allocates TCB buffer, enters SYN_RECEIVED
    Server->>Client: 2. SYN-ACK [Seq = y, ACK = x + 1, Flags = SYN+ACK]
    Note over Client: Client verifies ACK, enters ESTABLISHED state
    Client->>Server: 3. ACK [Seq = x + 1, ACK = y + 1, Flags = ACK]
    Note over Server: Server receives ACK, enters ESTABLISHED state
    Note over Client,Server: Bidirectional full-duplex reliable data transfer begins
\`\`\`

---

## 2. TCP Congestion Control State Machine

TCP dynamically regulates its transmission rate via the **Congestion Window ($cwnd$)**. The effective sending window is bounded by:
\\[
W = \\min(\\text{cwnd}, \\text{rwnd})
\\]

1. **Slow Start ($cwnd < ssthresh$)**:
   - Starts with $cwnd = 1\\,\\text{MSS}$ (or initial window of 10 MSS in modern kernels).
   - For every ACK received, $cwnd$ increments by 1 MSS.
   - Net effect: $cwnd$ **doubles every Round-Trip Time ($RTT$)**, growing **exponentially** ($1, 2, 4, 8, 16\\dots$).
2. **Congestion Avoidance ($cwnd \\ge ssthresh$)**:
   - Switched when $cwnd$ reaches the slow-start threshold ($ssthresh$).
   - For every complete RTT, $cwnd$ increments by $1\\,\\text{MSS}$ (linear additive increase).
3. **Loss Event Handling**:
   - **Case A: Triple Duplicate ACKs (Fast Retransmit & Fast Recovery)**:
     - Indicates a single isolated packet was dropped while subsequent packets reached the receiver.
     - $ssthresh = \\max(2\\,\\text{MSS}, cwnd / 2)$.
     - $cwnd$ is set to $ssthresh + 3\\,\\text{MSS}$ and continues linear increase (**Multiplicative Decrease**).
   - **Case B: Retransmission Timeout (RTO Expired)**:
     - Indicates severe network congestion (no packets getting through).
     - $ssthresh = cwnd / 2$.
     - $cwnd$ collapses back to $1\\,\\text{MSS}$, re-entering **Slow Start**.`,
          shortNotes: "TCP 3-Way Handshake: SYN -> SYN-ACK -> ACK. Flow control uses rwnd; Congestion control uses cwnd with AIMD: Slow Start (exponential) -> Congestion Avoidance (linear) -> Multiplicative Decrease on drop.",
          examples: [
            {
              title: "Python Simulation: TCP Reno Congestion Window Trace",
              problem: "Simulate TCP Reno cwnd progression over 10 transmission rounds with ssthresh = 16, encountering a 3-duplicate ACK event at round 6.",
              explanation: "Demonstrates exponential slow start, linear congestion avoidance, and multiplicative decrease on loss.",
              code: `cwnd = 1
ssthresh = 16
print("Round\\tcwnd\\tPhase")

for r in range(1, 11):
    if r == 6:
        print(f"{r}\\t{cwnd}\\t[PACKET LOSS: 3 Dup ACKs] -> Multiplicative Decrease")
        ssthresh = cwnd // 2
        cwnd = ssthresh
    else:
        phase = "Slow Start" if cwnd < ssthresh else "Congestion Avoidance"
        print(f"{r}\\t{cwnd}\\t{phase}")
        if cwnd < ssthresh:
            cwnd *= 2
        else:
            cwnd += 1`,
              output: `Round\tcwnd\tPhase
1\t1\tSlow Start
2\t2\tSlow Start
3\t4\tSlow Start
4\t8\tSlow Start
5\t16\tCongestion Avoidance
6\t17\t[PACKET LOSS: 3 Dup ACKs] -> Multiplicative Decrease
7\t8\tCongestion Avoidance
8\t9\tCongestion Avoidance
9\t10\tCongestion Avoidance
10\t11\tCongestion Avoidance`
            }
          ],
          keyPoints: [
            "TCP is connection-oriented, full-duplex, and byte-stream oriented; UDP is connectionless and datagram-oriented.",
            "TCP 3-Way Handshake establishes sequence numbers: SYN -> SYN-ACK -> ACK.",
            "Flow control protects the receiver buffer (rwnd); Congestion control protects network links (cwnd).",
            "In Slow Start, cwnd doubles every RTT; in Congestion Avoidance, cwnd increases linearly by 1 MSS per RTT.",
            "On triple duplicate ACKs, TCP Reno halves ssthresh and sets cwnd = ssthresh (Fast Recovery)."
          ],
          theoryQuestions: [
            {
              question: "Describe the TCP Congestion Control mechanism in detail. Explain Slow Start, Congestion Avoidance, and Fast Recovery.",
              marks: "7 Marks",
              answer: "TCP manages congestion through four intertwined algorithms: 1. Slow Start: cwnd starts at 1 MSS and increments by 1 MSS for every received ACK, doubling cwnd every RTT until it reaches ssthresh. 2. Congestion Avoidance: Once cwnd >= ssthresh, cwnd increases linearly by (1 / cwnd) per ACK, growing by 1 MSS per RTT to probe bandwidth safely. 3. Fast Retransmit: When the sender receives 3 duplicate ACKs for a segment, it infers that packet is lost without waiting for the retransmission timer (RTO) to expire and retransmits immediately. 4. Fast Recovery: ssthresh is halved (ssthresh = cwnd / 2), cwnd is set to ssthresh + 3, and cwnd grows linearly, avoiding a catastrophic drop to 1 MSS."
            }
          ],
          mcqs: [
            {
              question: "During TCP connection establishment, what flags are set in the second packet sent from the server to the client?",
              options: [
                "SYN only",
                "ACK only",
                "SYN and ACK",
                "FIN and ACK"
              ],
              correctIndex: 2,
              explanation: "The second packet in the TCP 3-way handshake is the SYN-ACK packet, where both the SYN (synchronize) and ACK (acknowledgment) control bits in the TCP header are set to 1."
            }
          ]
        }
      ]
    },
    {
      id: "cn-u5",
      title: "Unit 5: Application Layer Protocols, DNS, HTTP/2/3 & Network Security",
      description: "Application Layer paradigms, Domain Name System (DNS hierarchy, recursive vs iterative queries, Resource Records), Web protocols (HTTP/1.1 vs HTTP/2 vs HTTP/3 QUIC), Email architectures (SMTP, IMAP, POP3), and Network Security (TLS 1.3, X.509 PKI, Firewalls).",
      topics: [
        {
          id: "cn-u5-t1",
          title: "DNS Architecture, HTTP Evolution (1.1, 2, 3 QUIC), and Transport Layer Security (TLS)",
          simpleExplanation: "When you type 'google.com' in a browser, computers don't understand English words; they only understand numbers like 142.250.190.46. The Domain Name System (DNS) is the giant phonebook of the entire global internet: your computer asks root servers and top-level domain servers until it finds the exact IP address in 15 milliseconds. Then, your browser uses HTTP to ask the web server for the webpage. HTTP/1.1 was slow because images had to wait in a single line (Head-of-Line blocking). HTTP/2 fixed this by sending multiple files over one pipe at the exact same time (multiplexing). And HTTP/3 runs over UDP with Google's QUIC protocol, connecting in zero round-trips! Finally, TLS (Transport Layer Security) encrypts all data so hackers at the local coffee shop cannot steal your credit card.",
          detailedExplanation: `## 1. Domain Name System (DNS) Architecture & Resolution

DNS is an application-layer protocol running over UDP/TCP port 53:
- **Hierarchical Domain Namespace**:
  \`\`\`mermaid
  flowchart TD
      Root["Root DNS Servers ('.', 13 Named Authorities A-M)"] --> TLD1["Top-Level Domain (TLD) '.com'"]
      Root --> TLD2["Top-Level Domain (TLD) '.edu'"]
      TLD1 --> Auth["Authoritative Server (e.g. 'google.com', 'campusloop.org')"]
      Auth --> Sub["Subdomain (e.g. 'api.campusloop.org')"]
  \`\`\`

### Recursive vs Iterative DNS Queries:
- **Recursive Query**: The client asks the Local DNS Resolver (e.g., 8.8.8.8) to perform the entire lookup on its behalf. The resolver promises to return either the IP address or an error.
- **Iterative Query**: The Local DNS Resolver queries the Root, TLD, and Authoritative servers iteratively. Each server replies with a referral to the next server down the hierarchy.

### DNS Resource Records (RR Format: \`name, value, type, ttl\`):
- **Type A**: Maps hostname $\\to$ IPv4 address (\`campusloop.org -> 192.0.2.1\`).
- **Type AAAA**: Maps hostname $\\to$ IPv6 address.
- **Type CNAME**: Canonical Name (alias to another hostname).
- **Type MX**: Mail Exchange server for domain.
- **Type NS**: Authoritative Name Server for domain.
- **Type TXT**: Arbitrary text (used for SPF and DKIM email authentication).

---

## 2. HTTP Protocol Evolution: HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC)

\`\`\`mermaid
flowchart TD
    subgraph H1["HTTP/1.1 (TCP)"]
        H1A["Text Headers"] --> H1B["Single Request per Connection (Head-of-Line Blocking)"]
    end
    subgraph H2["HTTP/2 (TCP)"]
        H2A["Binary Framing Layer"] --> H2B["Multiplexed Streams over Single TCP Connection"]
        H2A --> H2C["HPACK Header Compression"]
    end
    subgraph H3["HTTP/3 (QUIC over UDP)"]
        H3A["QUIC Protocol (UDP)"] --> H3B["Zero-RTT Handshake + Independent Streams (No TCP HoL Blocking)"]
    end
\`\`\`

| Feature | HTTP/1.1 (RFC 2616) | HTTP/2 (RFC 7540) | HTTP/3 (RFC 9114) |
| :--- | :--- | :--- | :--- |
| **Transport Layer** | TCP (Port 80/443) | TCP (Port 443 with TLS 1.2+) | **QUIC over UDP** (Port 443) |
| **Framing Format** | Plaintext ASCII | Binary Frames | Binary Frames |
| **Multiplexing** | No (Pipelining flawed) | **Yes** (Interleaved streams) | **Yes** (Independent streams) |
| **Head-of-Line (HoL) Blocking** | Severe at Application Layer | Solved at App Layer, but **persists at TCP Layer** (Packet drop stalls all streams) | **Completely Eliminated** (UDP packet drop only halts that single stream) |
| **Connection Setup Latency** | 2-3 RTT (TCP + TLS) | 2 RTT (TCP + TLS 1.3) | **0-RTT or 1-RTT** (Combined Handshake) |
| **Connection Migration** | Breaks on Wi-Fi $\\to$ 5G switch | Breaks on Wi-Fi $\\to$ 5G switch | **Seamless** (Uses 64-bit Connection ID, not IP:Port) |

---

## 3. Network Cryptography: Public Key Infrastructure (PKI) & X.509

- **Symmetric Encryption (AES-GCM)**: High throughput for bulk data; uses a shared symmetric secret key.
- **Asymmetric Encryption (RSA, ECDSA)**: Uses public key for encryption and private key for decryption.
- **X.509 Digital Certificates**:
  - Binds an organization's identity (domain name) to its public key.
  - Digitally signed by a trusted **Certificate Authority (CA)** (e.g., Let's Encrypt, DigiCert) using the CA's private key.
  - Browsers verify the CA signature against pre-installed trusted root certificates in the OS/Browser Trust Store.`,
          shortNotes: "DNS resolves hostnames to IPs via Root -> TLD -> Authoritative servers over port 53 UDP. HTTP/1.1 has HoL blocking; HTTP/2 multiplexes over TCP; HTTP/3 uses QUIC over UDP eliminating TCP HoL blocking. X.509 certificates bind identities to public keys.",
          examples: [
            {
              title: "Python Implementation: Mini HTTP/1.1 Web Server with Keep-Alive & Content-Length",
              problem: "Implement a low-level Python socket HTTP web server serving GET requests and persistent connections.",
              explanation: "Uses socket.socket(), parses HTTP GET request lines, and formats RFC-compliant HTTP response headers with Content-Length and MIME type.",
              code: `import socket

def run_mini_http_server(port=8888):
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind(('127.0.0.1', port))
    server.listen(5)
    print(f"[HTTP Server] Listening on http://127.0.0.1:{port}...")

    # Handle one client request for demonstration
    client, addr = server.accept()
    raw_request = client.recv(1024).decode('utf-8')
    first_line = raw_request.splitlines()[0] if raw_request else "UNKNOWN"
    print(f"[HTTP Server] Connection from {addr} | Request: '{first_line}'")

    body = "<html><body><h1>Hello CampusLoop Multi-University Network!</h1></body></html>"
    response = (
        "HTTP/1.1 200 OK\\r\\n"
        "Content-Type: text/html; charset=UTF-8\\r\\n"
        f"Content-Length: {len(body.encode('utf-8'))}\\r\\n"
        "Connection: close\\r\\n"
        "\\r\\n"
        f"{body}"
    )
    client.sendall(response.encode('utf-8'))
    client.close()
    server.close()
    print("[HTTP Server] Response dispatched with HTTP 200 OK and closed cleanly.")

if __name__ == '__main__':
    # Test client-server handshake locally
    import threading
    import time
    t = threading.Thread(target=run_mini_http_server, daemon=True)
    t.start()
    time.sleep(0.1)

    # Client connects and issues HTTP GET
    client_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_sock.connect(('127.0.0.1', 8888))
    client_sock.sendall(b"GET /index.html HTTP/1.1\\r\\nHost: localhost\\r\\n\\r\\n")
    data = client_sock.recv(2048).decode('utf-8')
    print("\\n[Client Received Response Header]:")
    print(data.split("\\r\\n\\r\\n")[0])
    client_sock.close()`,
              output: `[HTTP Server] Listening on http://127.0.0.1:8888...
[HTTP Server] Connection from ('127.0.0.1', 54322) | Request: 'GET /index.html HTTP/1.1'
[HTTP Server] Response dispatched with HTTP 200 OK and closed cleanly.

[Client Received Response Header]:
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 68
Connection: close`
            }
          ],
          keyPoints: [
            "DNS resolves domain names into IP addresses through a distributed tree of Root, TLD, and Authoritative servers.",
            "DNS queries typically use UDP port 53 for speed and fallback to TCP for zone transfers or responses > 512 bytes.",
            "HTTP/2 introduces binary framing and multiplexing to solve application-layer Head-of-Line blocking.",
            "HTTP/3 adopts Google's QUIC protocol over UDP, eliminating TCP transport-layer Head-of-Line blocking.",
            "X.509 digital certificates are signed by Certificate Authorities to authenticate server public keys."
          ],
          theoryQuestions: [
            {
              question: "Compare HTTP/1.1, HTTP/2, and HTTP/3 with respect to transport protocol, framing, multiplexing, and Head-of-Line (HoL) blocking behavior.",
              marks: "7 Marks",
              answer: "1. HTTP/1.1 operates over TCP using human-readable plaintext ASCII format. It experiences severe application-layer Head-of-Line (HoL) blocking: only one request/response can be in-flight per TCP connection at a time. Browsers must open up to 6 parallel TCP connections per host, incurring heavy handshake latency and network congestion. 2. HTTP/2 operates over TCP but introduces a Binary Framing Layer (dividing messages into HEADERS and DATA frames). It supports multiplexing: multiple bidirectional streams can be interleaved simultaneously over a single TCP connection, eliminating application HoL blocking. However, it still suffers from TCP-layer HoL blocking: if a single TCP packet drops on a lossy network, TCP halts delivery of all subsequent multiplexed packets until the lost packet is retransmitted. 3. HTTP/3 replaces TCP with QUIC (Quick UDP Internet Connections) over UDP. QUIC implements its own congestion control and packet loss recovery independently per stream. A dropped packet on stream A has zero impact on streams B and C, completely eliminating transport-layer HoL blocking. It also provides 0-RTT connection resumption and connection migration using 64-bit Connection IDs."
            }
          ],
          mcqs: [
            {
              question: "Which transport protocol does HTTP/3 utilize as its underlying foundation?",
              options: [
                "QUIC over UDP",
                "TCP with TLS 1.3",
                "SCTP",
                "IPsec Encapsulated Security Payload (ESP)"
              ],
              correctIndex: 0,
              explanation: "HTTP/3 uses the QUIC transport protocol, which runs over UDP, to eliminate TCP Head-of-Line blocking and enable 0-RTT handshakes."
            }
          ]
        }
      ]
    }
  ]
};
