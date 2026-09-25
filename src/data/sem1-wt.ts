import type { Subject } from './types';

export const sem1WtSubject: Subject = {
  id: "sem1-wt",
  name: "Web Technology",
  code: "WT102",
  color: "bg-blue-600",
  icon: "globe",
  description: "Comprehensive University Syllabus for Web Technology — WWW & Internet Protocols, HTML5 Semantic Markup, Forms, CSS3 Box Model & Flexbox, JavaScript DOM, and Form Validation",
  semester: 1,
  units: [
    {
      id: "wt-u1",
      title: "Unit 1: World Wide Web & Internet Architecture",
      description: "Foundations of web systems, historical evolution, client-server paradigm, HTTP/HTTPS protocols, TLS encryption, and DNS resolution lifecycle.",
      topics: [
        {
          id: "wt-u1-t1",
          title: "Internet vs World Wide Web, History & Client-Server Request-Response Architecture",
          simpleExplanation: "The Internet is the massive physical network of connected computers, routers, and undersea cables across the globe. The World Wide Web (WWW) is an information-sharing service that runs on top of the internet using websites and hyperlinks. In the client-server model, your browser (the client) asks for a webpage, and a remote computer (the server) delivers it.",
          detailedExplanation: `## 1. Introduction: Highway vs Traffic Analogy

To understand modern web technology, you must never confuse the **Internet** with the **World Wide Web (WWW)**. 

A popular mental model is the **Highway and Vehicle** analogy:
- **The Internet is the Highway System**: It consists of physical roads, bridges, wires, fiber-optic cables, routers, satellites, and rules of the road (TCP/IP). It provides the raw transport infrastructure.
- **The World Wide Web is the Traffic**: The cars, trucks, and buses driving on that highway are services like websites, web pages, videos, and documents linked together by hyperlinks. Other vehicles on the same highway include Email (SMTP/IMAP), File Transfer (FTP), and Video Calling (VoIP).

\`\`\`mermaid
flowchart TD
    subgraph The_Internet_Infrastructure ["The Internet (Global Hardware Infrastructure: TCP/IP)"]
        WWW["World Wide Web (HTTP/HTTPS)"]
        EMAIL["Email Systems (SMTP / IMAP / POP3)"]
        STREAM["Streaming / Gaming (UDP / RTP)"]
        FTP["File Transfer (SFTP / FTP)"]
    end
\`\`\`

---

## 2. Historical Milestones of Web Evolution

1. **1969 - ARPANET**: Created by the US Department of Defense (DARPA), ARPANET was the first packet-switching network connecting four university computer labs. It laid the technological foundation for the Internet.
2. **1983 - Adoption of TCP/IP**: The standardized Transmission Control Protocol/Internet Protocol (TCP/IP) became the universal communication language of the internet on January 1, 1983.
3. **1989 - Tim Berners-Lee Invents the WWW**: While working at CERN (the European Organization for Nuclear Research in Switzerland), Sir Tim Berners-Lee wrote a proposal titled *"Information Management: A Proposal"*. He wanted scientists around the world to easily share research documents.
4. **1990 - The Holy Trinity of Web Technology**: Berners-Lee implemented the three foundational pillars that power the web to this day:
   - **HTML (HyperText Markup Language)**: The document formatting language.
   - **URI/URL (Uniform Resource Identifier)**: The unique address system for locating resources.
   - **HTTP (HyperText Transfer Protocol)**: The communication protocol to request and receive hypermedia.
5. **1993 - NCSA Mosaic Browser**: The first graphical web browser that displayed images inline with text, sparking the commercial internet boom.

---

## 3. The Client-Server Architecture

The Web operates on a distributed computing architecture known as the **Client-Server Request-Response Model**.

\`\`\`mermaid
sequenceDiagram
    autonumber
    actor User as User / Browser (Client)
    participant DNS as DNS Server
    participant WebServer as Web Server (Apache / Nginx)
    participant AppServer as Backend Server (Node.js / Python)
    participant DB as Database (MySQL / PostgreSQL)

    User->>DNS: 1. Lookup IP for www.itmuniversity.ac.in
    DNS-->>User: Returns IP: 142.250.190.46
    User->>WebServer: 2. TCP Handshake + HTTP GET /courses
    WebServer->>AppServer: 3. Forward request to App Logic
    AppServer->>DB: 4. SQL Query: SELECT * FROM courses
    DB-->>AppServer: 5. Return result rows
    AppServer-->>WebServer: 6. Return generated HTML / JSON payload
    WebServer-->>User: 7. HTTP/1.1 200 OK + Payload
    Note over User: Browser parses HTML, fetches CSS/JS, and renders DOM
\`\`\`

### Role of the Client (User Agent)
- The client is almost always a web browser (Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge) or a mobile application.
- It is responsible for:
  1. Translating user actions (typing a URL, clicking a button) into standardized HTTP requests.
  2. Sending requests over TCP sockets to the target server.
  3. Receiving the server's HTTP response.
  4. Parsing HTML, constructing the DOM tree, computing CSS styles, executing JavaScript, and painting pixels to the display.

### Role of the Server (Host)
- A server is a computer program running on a host machine that continuously listens for incoming network connections on specified ports (Port 80 for HTTP, Port 443 for HTTPS).
- Prominent web server software includes **Nginx**, **Apache HTTP Server**, **Microsoft IIS**, and **Node.js/Express**.
- The server processes the request, checks permissions, retrieves data from filesystems or databases, generates an HTTP response packet with appropriate status codes and MIME types, and transmits it back.

---

## 4. Multi-Tier Web Architectures

University exams frequently ask for structural differentiation between tiers:
- **1-Tier Architecture**: Client interface, business logic, and database all run on a single machine (e.g., a standalone desktop application or local development environment).
- **2-Tier Architecture**: The client (presentation tier) speaks directly to a database server (data tier). Lacks scalability and introduces security risks since database credentials sit on the client.
- **3-Tier Architecture (Industry Standard)**:
  1. **Presentation Tier (Client)**: User interface rendered in the browser (HTML/CSS/JS or React/Vue).
  2. **Application Tier (Logic)**: Business logic, authentication, and routing executed on application servers (Node.js, Java Spring, Django).
  3. **Data Tier (Storage)**: Relational or NoSQL databases (PostgreSQL, MongoDB, MySQL).

---

> [!IMPORTANT] **MEMORIZE:**
> - **The Internet** = Hardware infrastructure & TCP/IP protocols (1969/1983).
> - **The Web (WWW)** = Software service of hyperlinked documents invented by **Tim Berners-Lee** at **CERN in 1989**.
> - The web relies on the **Client-Server model**: The client initiates requests; the server passively listens, processes, and returns responses.

> [!NOTE] **DEV BRAIN:**
> When you type \`localhost:3000\` while developing a React or Express application, your local laptop acts as **both** the client (your browser tab) and the server (your Node.js process listening on port 3000).

> [!WARNING] **TRAP:**
> Do NOT say the Internet and the Web are the same thing in an exam! If the Web is turned off, email servers and multiplayer online game servers still run over the Internet.

> [!TIP] **EXAM TIP:**
> Always draw the 3-Tier diagram in 5-mark and 7-mark questions. Label Presentation Tier (Browser), Application Tier (Server Logic), and Data Tier (Database).

---

## 5. Detailed Comparison Table

| Attribute | The Internet | The World Wide Web (WWW) |
| :--- | :--- | :--- |
| **Fundamental Nature** | Physical network of hardware and networks | Information system of hyperlinked software resources |
| **Origin & Year** | ARPANET (1969), standardized in 1983 | Proposed by Tim Berners-Lee at CERN in 1989 |
| **Governing Protocols** | IP, TCP, UDP, BGP, ICMP | HTTP, HTTPS, WebSocket |
| **Physical Medium** | Copper wires, fiber-optic cables, wireless radio | Electronic documents, multimedia, APIs |
| **Dependency** | Independent (existed 20 years before the Web) | Totally dependent on the Internet to transmit its data |
| **Addressing System** | IP Addresses (e.g., \`192.168.1.1\` or IPv6) | URLs / URIs (e.g., \`https://example.com/index.html\`) |`,
          shortNotes: "Internet = Global hardware network (TCP/IP). WWW = Software service of linked hypermedia (HTTP/HTML) created by Tim Berners-Lee in 1989. Client requests, Server responds.",
          examples: [
            {
              title: "Simulating a Basic Node.js Client-Server Web Server",
              problem: "Demonstrate how a minimal server listens for client requests on a port and returns an HTML response.",
              explanation: "Node.js built-in http module creates a server listening on port 8080. When a client visits the address, the server reads the request and returns an HTTP 200 OK header with an HTML document.",
              code: `const http = require('http');

// 1. Create Web Server instance
const server = http.createServer((req, res) => {
  console.log(\`Received \${req.method} request for: \${req.url}\`);

  // 2. Set HTTP Response Headers
  res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });

  // 3. Write HTML payload and close connection
  res.end('<h1>Welcome to ITM University Web Technology</h1><p>Client-Server communication successful!</p>');
});

// 4. Bind server to listen on port 8080
server.listen(8080, () => {
  console.log('Web Server running at http://localhost:8080/');
});`,
              output: "Web Server running at http://localhost:8080/\nReceived GET request for: /\nHTTP/1.1 200 OK rendered in browser as rendered HTML text."
            }
          ],
          keyPoints: [
            "The Internet is a global network of interconnected computers communicating via TCP/IP.",
            "The World Wide Web (WWW) is an information-sharing service built on top of the Internet by Tim Berners-Lee in 1989.",
            "The Web operates on a Client-Server request-response paradigm.",
            "The client (browser) formulates HTTP requests and parses HTML/CSS/JS to render the UI.",
            "Modern enterprise web systems follow a 3-tier architecture: Presentation, Application, and Data."
          ],
          theoryQuestions: [
            {
              question: "Differentiate between the Internet and the World Wide Web. Provide historical context and explain why the Web cannot exist without the Internet.",
              marks: "5 Marks",
              answer: `1. **Definition & Scope:** The Internet is the worldwide physical infrastructure of computers, routers, fiber-optic lines, and satellite links operating on the TCP/IP protocol suite (ARPANET 1969). In contrast, the World Wide Web (WWW) is an application service created by Tim Berners-Lee in 1989 at CERN that allows hypermedia documents to be linked and retrieved using HTTP and URLs.
2. **Protocol Differences:** The Internet functions at network and transport layers (IP, TCP, UDP), whereas the Web functions at the application layer (HTTP, HTTPS).
3. **Dependency:** The Web is a passenger traveling on the Internet highway. Without the physical routing and IP packet delivery provided by the Internet, HTTP packets cannot be transported between client and server. However, if the Web ceases to exist, other internet services like email (SMTP) and file transfer (FTP) continue to operate.`,
              keyPoints: [
                "Internet is hardware/network; Web is software/service.",
                "Tim Berners-Lee at CERN (1989).",
                "Protocol layers comparison.",
                "Dependency explanation."
              ]
            },
            {
              question: "Explain the Client-Server architecture of the Web with an annotated sequence diagram and describe the responsibilities of both parties.",
              marks: "5 Marks",
              answer: `The Web operates strictly on the Client-Server Request-Response model:
1. **Client (User Agent / Web Browser):** Formulates standardized HTTP requests triggered by user actions, establishes TCP connections, transmits requests, parses incoming HTTP responses, builds DOM/CSSOM trees, executes JavaScript, and paints the webpage.
2. **Server (Web Server / Host):** Binds to network sockets (ports 80/443), continuously listens for connections, parses incoming HTTP headers, processes application logic, retrieves database records, and generates an HTTP response packet with status code, MIME headers, and body content.
3. **Request-Response Cycle:** The client initiates every communication cycle; the server never spontaneously sends web documents unless initiated by client request (or upgraded via WebSockets).`,
              keyPoints: [
                "Request-Response sequence.",
                "Browser duties: parsing, DOM, JS execution.",
                "Server duties: listening, routing, response creation.",
                "Client initiates communication."
              ]
            },
            {
              question: "Explain the 3-Tier Web Application Architecture and describe the purpose of each tier.",
              marks: "3 Marks",
              answer: `The 3-tier architecture divides a web application into three distinct layers:
1. **Presentation Tier (Client):** The user interface layer rendered in the browser using HTML5, CSS3, and JavaScript.
2. **Application Tier (Business Logic):** Processes business rules, authentication, and calculations (running on Node.js, Python Django, or Java Spring).
3. **Data Tier (Storage):** Relational (MySQL, PostgreSQL) or NoSQL (MongoDB) databases that safely store and query persistent information.`,
              keyPoints: [
                "Presentation Tier (Browser UI).",
                "Application Tier (Backend Logic).",
                "Data Tier (Database persistence)."
              ]
            }
          ],
          mcqs: [
            {
              question: "Who invented the World Wide Web, and in which year was the initial proposal drafted?",
              options: [
              "Alan Turing in 1950",
              "Tim Berners-Lee in 1989",
              "Vint Cerf in 1973",
              "Dennis Ritchie in 1972"
              ],
              correctIndex: 1,
              explanation: "Sir Tim Berners-Lee invented the World Wide Web in 1989 while working at CERN in Switzerland."
            },
            {
              question: "Which of the following statements correctly describes the relationship between the Internet and the Web?",
              options: [
              "The Internet is an application running on top of the World Wide Web",
              "The World Wide Web is an application service running on the physical infrastructure of the Internet",
              "They are completely synonymous terms coined simultaneously in 1983",
              "The Web is exclusively used for email, while the Internet is used for web pages"
              ],
              correctIndex: 1,
              explanation: "The Internet is the underlying hardware and network transport layer; the World Wide Web is a software service running on top of it."
            },
            {
              question: "In the Client-Server model of the World Wide Web, which entity initiates the communication cycle?",
              options: [
              "The Web Server sending unsolicited HTML pages",
              "The Database Server triggering an event",
              "The Client (Browser) dispatching an HTTP Request",
              "The DNS root server broadcasting IP packets"
              ],
              correctIndex: 2,
              explanation: "In the standard HTTP client-server architecture, the client initiates the request; the server listens passively and responds."
            },
            {
              question: "Which tier in a 3-tier web architecture handles business logic and authentication rules?",
              options: [
              "Presentation Tier",
              "Application Tier",
              "Data Tier",
              "Client Browser Cache"
              ],
              correctIndex: 1,
              explanation: "The Application Tier (Middleware / Backend) executes business logic, processing, and security checks."
            }
          ]
        },
        {
          id: "wt-u1-t2",
          title: "Protocols: HTTP vs HTTPS (TLS/SSL encryption), Port Numbers (80 vs 443), and DNS Resolution Lifecycle",
          simpleExplanation: "HTTP sends information across the web in open, unencrypted plain text, meaning anyone on your local network could intercept your passwords. HTTPS fixes this by encrypting all traffic inside a secure TLS/SSL tunnel. DNS (Domain Name System) is the internet phonebook that translates human names like google.com into computer-readable IP addresses.",
          detailedExplanation: `## 1. Network Protocols in Web Technology

A **Protocol** is a strictly defined set of rules and standards that determine how data is packaged, transmitted, verified, and received between computers over a network.

At the application layer of the Internet, the two most critical web protocols are:
- **HTTP (HyperText Transfer Protocol)**
- **HTTPS (HyperText Transfer Protocol Secure)**

---

## 2. HTTP vs HTTPS: Security & Cryptography

### HTTP (Unencrypted Plaintext)
- Operates on **TCP Port 80** by default.
- Transmits all request headers, URLs, cookies, form data, and response payloads in **cleartext ASCII**.
- **The Packet Sniffing Danger**: If a user submits a credit card or password over HTTP at a public Wi-Fi hotspot, any attacker running a network packet sniffer (like Wireshark) can capture the raw credentials in plain text.
- Vulnerable to **Man-in-the-Middle (MITM)** attacks and tampering.

### HTTPS (Encrypted TLS/SSL Tunnel)
- Operates on **TCP Port 443** by default.
- Wraps regular HTTP communication inside an encrypted **TLS (Transport Layer Security)** cryptographic channel (historically called SSL - Secure Sockets Layer).
- HTTPS guarantees the **Security Triad (CIA)**:
  1. **Confidentiality (Encryption)**: No eavesdropper can inspect the data payload. An eavesdropper only sees scrambled, pseudorandom bytes.
  2. **Integrity (Data Hashing)**: Cryptographic checksums ensure that data cannot be altered or injected in transit without immediate detection.
  3. **Authentication (Identity Verification)**: Digital Certificates issued by trusted Certificate Authorities (CAs) prove the user is communicating with the legitimate domain owner, not an impostor.

\`\`\`mermaid
flowchart LR
    subgraph HTTP_Flow ["HTTP (Insecure Port 80)"]
        Browser1["Browser"] -->|"Plaintext: password=secret123"| Hacker["Eavesdropper / Sniffer"]
        Hacker --> Server1["Web Server"]
    end

    subgraph HTTPS_Flow ["HTTPS (Secure Port 443)"]
        Browser2["Browser"] -->|"Encrypted: 0x9f8b4c2d8e..."| TLS_Tunnel["Encrypted TLS Tunnel"]
        TLS_Tunnel --> Server2["Web Server"]
    end
\`\`\`

---

## 3. How the TLS/SSL Handshake Works

Before a single byte of HTTP data is transmitted over HTTPS, the browser and server perform an initial **TLS Handshake** to establish identity and generate session keys:

1. **Client Hello**: Browser contacts the server, sends supported TLS versions, and a list of supported cryptographic Cipher Suites, plus a random client number.
2. **Server Hello & Certificate**: Server chooses the strongest mutual cipher suite, sends its digital SSL Certificate (signed by a Certificate Authority like DigiCert or Let's Encrypt), its public encryption key, and a random server number.
3. **Certificate Verification**: Browser checks the certificate against built-in trusted Root CAs installed in the OS or browser. It verifies domain name validity, expiration dates, and revocation status.
4. **Key Exchange (Pre-Master Secret)**:
   - The browser creates a random *Pre-Master Secret*, encrypts it with the server's public key, and sends it to the server.
   - Only the server can decrypt this secret using its private key (Asymmetric Encryption).
5. **Session Key Derivation**: Both client and server independently compute identical **Symmetric Session Keys** using the exchanged secrets.
6. **Encrypted Communication**: All subsequent HTTP requests and responses are encrypted using the fast symmetric session key.

---

## 4. Standard Internet Port Numbers

A **Port Number** is a 16-bit numerical identifier (0 to 65535) used by the operating system to route network packets to the exact software application listening on that machine.

| Port Number | Protocol | Purpose / Default Application |
| :--- | :--- | :--- |
| **80** | **HTTP** | Standard unencrypted World Wide Web traffic |
| **443** | **HTTPS** | Encrypted TLS/SSL World Wide Web traffic |
| **53** | **DNS** | Domain Name System name resolution queries |
| **21** | **FTP** | File Transfer Protocol (control connection) |
| **22** | **SSH / SFTP** | Secure Shell remote server terminal login |
| **25** | **SMTP** | Simple Mail Transfer Protocol (email transmission) |
| **8080** | **HTTP-Alt** | Commonly used for local web development servers (Node.js/Tomcat) |

---

## 5. The DNS Resolution Lifecycle (Step-by-Step)

Humans remember names like \`www.google.com\`, but internet routing hardware only understands numeric IP addresses like \`142.250.190.46\` (IPv4) or \`2607:f8b0:4005:808::200e\` (IPv6).

The **Domain Name System (DNS)** is the distributed hierarchical database that maps domain names to IP addresses.

\`\`\`mermaid
sequenceDiagram
    autonumber
    actor User as Browser
    participant OS as OS Resolver / Hosts File
    participant Resolver as Recursive DNS Resolver (ISP / 8.8.8.8)
    participant Root as Root Nameserver (.)
    participant TLD as TLD Nameserver (.com / .in)
    participant Auth as Authoritative Nameserver (ns1.google.com)

    User->>OS: 1. Check local browser cache & hosts file
    OS->>Resolver: 2. Query not cached! Forward to Recursive Resolver
    Resolver->>Root: 3. What is IP for google.com?
    Root-->>Resolver: 4. Don't know, ask .com TLD server at IP: 192.5.6.30
    Resolver->>TLD: 5. What is IP for google.com?
    TLD-->>Resolver: 6. Don't know, ask Authoritative Server at IP: 216.239.32.10
    Resolver->>Auth: 7. What is IP for google.com?
    Auth-->>Resolver: 8. A Record: 142.250.190.46 (TTL: 300s)
    Resolver-->>OS: 9. Store in cache & return IP
    OS-->>User: 10. Hand IP to browser to initiate TCP socket
\`\`\`

### The 4 DNS Server Types:
1. **Recursive Resolver**: Usually maintained by your ISP or public DNS (like Google 8.8.8.8 or Cloudflare 1.1.1.1). It hunts down the IP across the world on behalf of the client.
2. **Root Nameserver**: 13 logical root server clusters located worldwide (labeled \`a.root-servers.net\` through \`m.root-servers.net\`). They point to Top-Level Domains.
3. **TLD (Top-Level Domain) Server**: Manages domain extensions like \`.com\`, \`.org\`, \`.edu\`, \`.in\`.
4. **Authoritative Nameserver**: The ultimate source of truth holding the official DNS records (A, AAAA, CNAME, MX) configured by the domain owner.

---

> [!IMPORTANT] **MEMORIZE:**
> - HTTP uses **Port 80** (plaintext, insecure).
> - HTTPS uses **Port 443** (encrypted with TLS/SSL).
> - DNS resolves domain names to IP addresses over **Port 53**.
> - The 4 DNS servers in order: **Recursive Resolver -> Root (.) -> TLD (.com) -> Authoritative Nameserver**.

> [!NOTE] **DEV BRAIN:**
> In web development, you often see self-signed SSL certificate warnings when developing locally on \`https://localhost\`. This occurs because your local machine's self-generated certificate was not signed by a trusted root CA.

> [!WARNING] **TRAP:**
> Students often think HTTPS encrypts the domain name in DNS lookups. Normal DNS lookups on port 53 are unencrypted unless you specifically use modern **DoH (DNS over HTTPS)** or **DoT (DNS over TLS)**!

> [!TIP] **EXAM TIP:**
> If asked how HTTPS works in an exam, break your answer into:
> 1. Asymmetric Encryption (TLS handshake to exchange keys).
> 2. Symmetric Encryption (fast data transfer using the shared session key).
> 3. Hashing/MAC for integrity.`,
          shortNotes: "HTTP (port 80) is plaintext. HTTPS (port 443) uses TLS encryption for privacy, integrity, and authenticity. DNS maps domain names to IP addresses via Root, TLD, and Authoritative servers.",
          examples: [
            {
              title: "Performing a DNS Lookup and Inspecting SSL Handshake via Terminal",
              problem: "How do network administrators verify DNS resolution and inspect HTTPS certificate parameters?",
              explanation: "Using standard command-line tools nslookup and curl to inspect DNS A records and TLS certificate details.",
              code: `# 1. Perform DNS lookup for domain name
$ nslookup google.com
Server:  192.168.1.1
Address: 192.168.1.1#53

Non-authoritative answer:
Name:    google.com
Address: 142.250.190.46

# 2. Inspect HTTPS TLS Handshake details with cURL
$ curl -Iv https://www.google.com:443
* Connected to www.google.com (142.250.190.46) port 443
* ALPN: offers h2, http/1.1
* Server certificate:
*  subject: CN=www.google.com
*  issuer: C=US; O=Google Trust Services; CN=GTS CA 1C3
* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384`,
              output: "Connected via Port 443 with TLSv1.3 encryption verified by trusted Certificate Authority."
            }
          ],
          keyPoints: [
            "HTTP transmits unencrypted plaintext over TCP port 80.",
            "HTTPS encrypts web traffic using TLS/SSL cryptography over TCP port 443.",
            "The TLS handshake establishes symmetric session keys using asymmetric public/private keys.",
            "DNS translates human-readable domain names into numerical IP addresses.",
            "DNS resolution cascades through Recursive, Root, TLD, and Authoritative nameservers."
          ],
          theoryQuestions: [
            {
              question: "Differentiate between HTTP and HTTPS in terms of security, port numbers, performance, and underlying cryptographic architecture.",
              marks: "5 Marks",
              answer: `1. **Security & Encryption:** HTTP operates in cleartext and is vulnerable to packet sniffing, tampering, and Man-in-the-Middle (MITM) attacks. HTTPS encrypts all communication using TLS (Transport Layer Security), ensuring Confidentiality, Integrity, and Authentication.
2. **Default Ports:** HTTP uses TCP port 80; HTTPS uses TCP port 443.
3. **Cryptographic Architecture:** HTTPS uses a hybrid cryptographic model: Asymmetric cryptography (Public/Private key pair) during the initial TLS handshake to securely negotiate keys, followed by Symmetric cryptography (shared session key) for fast bulk data encryption.
4. **Trust & Certificates:** HTTPS requires a digital certificate signed by a trusted Certificate Authority (CA) verifying the identity of the domain owner.`,
              keyPoints: [
                "Plaintext vs TLS encrypted.",
                "Port 80 vs Port 443.",
                "Asymmetric handshake + Symmetric session keys.",
                "Certificate Authority verification."
              ]
            },
            {
              question: "Explain the DNS Resolution Lifecycle from the moment a user types a URL into their browser until the IP address is returned.",
              marks: "7 Marks",
              answer: `The complete DNS resolution steps are as follows:
1. **Local Caches Check:** The browser inspects its internal DNS cache. If not found, it queries the Operating System DNS cache and local hosts file.
2. **Recursive DNS Resolver:** If the record is missing locally, the OS queries the Recursive Resolver (provided by the ISP or a public provider like 8.8.8.8).
3. **Root Nameserver (.):** If the recursive resolver lacks the cached record, it contacts one of the 13 global Root Nameservers. The Root server directs the resolver to the appropriate TLD nameserver.
4. **TLD Nameserver (.com, .org, .in):** The resolver queries the TLD server, which returns the IP address of the Authoritative Nameserver responsible for that domain.
5. **Authoritative Nameserver:** The resolver queries the domain authoritative server, which holds the definitive record (A/AAAA record).
6. **Response & Caching:** The Authoritative server returns the IP address along with a Time-To-Live (TTL). The recursive resolver caches this mapping and delivers the IP to the client browser to initiate the TCP handshake.`,
              keyPoints: [
                "Browser & OS cache check.",
                "Recursive resolver role.",
                "Root nameserver pointing to TLD.",
                "TLD nameserver pointing to Authoritative.",
                "Authoritative server returning A record with TTL."
              ]
            },
            {
              question: "What are port numbers in web networking? State the default port numbers for HTTP, HTTPS, DNS, and SSH.",
              marks: "3 Marks",
              answer: `A port number is a 16-bit integer (ranging from 0 to 65535) that uniquely identifies a specific process or network service running on a host computer.
- **HTTP:** Port 80
- **HTTPS:** Port 443
- **DNS:** Port 53
- **SSH:** Port 22`,
              keyPoints: [
                "Definition of 16-bit port identifier.",
                "List of ports: 80, 443, 53, 22."
              ]
            }
          ],
          mcqs: [
            {
              question: "What is the default TCP port number used for secure HTTPS web traffic?",
              options: [
              "Port 80",
              "Port 21",
              "Port 443",
              "Port 53"
              ],
              correctIndex: 2,
              explanation: "HTTPS operates over TCP port 443 by default, whereas unencrypted HTTP uses port 80."
            },
            {
              question: "Which server holds the definitive, official IP address record for a specific registered domain name?",
              options: [
              "Root Nameserver",
              "Top-Level Domain (TLD) Nameserver",
              "Authoritative Nameserver",
              "Local Browser Cache"
              ],
              correctIndex: 2,
              explanation: "The Authoritative Nameserver is the final authority holding the actual DNS records (A, CNAME, MX) configured by the domain owner."
            },
            {
              question: "Why does the TLS/SSL handshake use asymmetric encryption initially and switch to symmetric encryption for data transfer?",
              options: [
              "Symmetric encryption cannot be decrypted by computers",
              "Asymmetric encryption is computationally expensive, so it is only used to exchange a fast symmetric session key",
              "Asymmetric encryption does not require keys",
              "Symmetric encryption provides digital certificates while asymmetric does not"
              ],
              correctIndex: 1,
              explanation: "Asymmetric encryption is secure for public key exchange but computationally heavy. Once a shared secret is negotiated, symmetric encryption is used because it is hundreds of times faster."
            },
            {
              question: "Which protocol is responsible for translating human-readable domain names (like itmuniversity.ac.in) into machine IP addresses?",
              options: [
              "DHCP",
              "DNS",
              "FTP",
              "SMTP"
              ],
              correctIndex: 1,
              explanation: "The Domain Name System (DNS) acts as the phonebook of the Internet, translating hostnames to IP addresses."
            }
          ]
        },
        {
          id: "wt-u1-t3",
          title: "Anatomy of an HTTP Request & Response (Methods: GET, POST, PUT, DELETE, Headers, and Status Code Ranges 1xx-5xx)",
          simpleExplanation: "Every web communication is a conversation: the browser sends an HTTP Request, and the server replies with an HTTP Response. The request specifies what to do using an HTTP method (like GET to read or POST to submit), and the response includes a 3-digit status code (like 200 for success or 404 for not found) along with headers and data.",
          detailedExplanation: `## 1. The Anatomy of an HTTP Request

An HTTP request is an ASCII formatted message sent by the client to instruct the server to execute an action on a specific resource. It consists of four distinct components:

\`\`\`
[ Request Method ] [ Request-URI ] [ HTTP Version ]   <-- Request Line
[ Header Name ]: [ Header Value ]                     <-- Request Headers
...
[ Blank Line (CRLF: \\r\\n) ]
[ Optional Request Message Body / Payload ]          <-- Request Body
\`\`\`

### Example Raw HTTP Request:
\`\`\`http
POST /api/v1/students HTTP/1.1
Host: api.itmuniversity.ac.in
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Content-Type: application/json
Content-Length: 52
Authorization: Bearer eyJhbGciOiJIUzI1Ni...
Accept: application/json

{"name": "Aarav Sharma", "rollNumber": "ITM2026WT01"}
\`\`\`

---

## 2. Core HTTP Methods (Verbs)

HTTP defines a set of request methods to indicate the desired action to be performed on the identified resource:

| Method | Primary Purpose | Safe? | Idempotent? | Carries Body? | Typical Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | Retrieve data | **Yes** | **Yes** | No | Fetching web pages, articles, search queries |
| **POST** | Create new resource / Submit data | **No** | **No** | **Yes** | Submitting registration forms, publishing comments |
| **PUT** | Replace/Update entire resource | **No** | **Yes** | **Yes** | Updating complete student profile |
| **PATCH** | Partially update resource | **No** | **No** | **Yes** | Updating only a user email address |
| **DELETE** | Remove resource | **No** | **Yes** | Rare | Deleting a record from database |
| **HEAD** | Same as GET, returns headers only | **Yes** | **Yes** | No | Checking if a resource changed or exists |
| **OPTIONS**| Describe communication options | **Yes** | **Yes** | No | CORS preflight checks in browsers |

### Key Definitions:
- **Safe Methods**: Operations that do not alter the server state (read-only). \`GET\` and \`HEAD\` are safe.
- **Idempotent Methods**: Making the identical request multiple times produces the exact same server state as making it once. \`GET\`, \`PUT\`, and \`DELETE\` are idempotent (\`DELETE /item/5\` leaves item 5 deleted regardless of whether called once or 10 times). \`POST\` is **NOT** idempotent (submitting twice creates two records).

---

## 3. The Anatomy of an HTTP Response

When the server finishes processing the request, it transmits an HTTP response packet structured as follows:

\`\`\`
[ HTTP Version ] [ Status Code ] [ Reason Phrase ]    <-- Status Line
[ Header Name ]: [ Header Value ]                     <-- Response Headers
...
[ Blank Line (CRLF: \\r\\n) ]
[ Response Body (HTML, CSS, JSON, Image binary) ]     <-- Response Body
\`\`\`

### Example Raw HTTP Response:
\`\`\`http
HTTP/1.1 200 OK
Date: Fri, 25 Sep 2026 12:00:00 GMT
Server: Apache/2.4.52 (Ubuntu)
Content-Type: text/html; charset=UTF-8
Content-Length: 128
Cache-Control: max-age=3600
Set-Cookie: session_id=xyz789; HttpOnly; Secure

<!DOCTYPE html>
<html>
<head><title>Success</title></head>
<body><h1>Registration Complete</h1></body>
</html>
\`\`\`

---

## 4. HTTP Status Code Classifications (1xx - 5xx)

HTTP status codes are 3-digit integers categorized into five logical ranges:

\`\`\`mermaid
flowchart TD
    SC["HTTP Status Code Families"]
    SC --> R1["1xx: Informational
(Request received, continuing)"]
    SC --> R2["2xx: Success
(Action received & accepted)"]
    SC --> R3["3xx: Redirection
(Further action needed)"]
    SC --> R4["4xx: Client Error
(Fault on the browser side)"]
    SC --> R5["5xx: Server Error
(Server failed valid request)"]

    R1 --> E1["100 Continue
101 Switching Protocols"]
    R2 --> E2["200 OK
201 Created
204 No Content"]
    R3 --> E3["301 Moved Permanently
302 Found
304 Not Modified"]
    R4 --> E4["400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found"]
    R5 --> E5["500 Internal Error
502 Bad Gateway
503 Service Unavailable"]
\`\`\`

### 1xx: Informational
- **100 Continue**: The server has received the request headers and the client should proceed to send the request body.
- **101 Switching Protocols**: Upgrade request approved (e.g., upgrading HTTP to WebSocket).

### 2xx: Success
- **200 OK**: Standard response for successful HTTP requests.
- **201 Created**: Request succeeded and a new resource was created (common response for \`POST\`).
- **204 No Content**: Request succeeded, but the server is intentionally returning no body (common for \`DELETE\`).

### 3xx: Redirection
- **301 Moved Permanently**: The requested resource has been assigned a new permanent URI (browsers cache this redirect).
- **302 Found (Temporary Redirect)**: The resource resides temporarily under a different URI.
- **304 Not Modified**: The client's cached copy of the resource is still valid; no body is sent, saving bandwidth.

### 4xx: Client Errors
- **400 Bad Request**: The server cannot process the request due to malformed syntax or bad parameters.
- **401 Unauthorized**: Authentication is required (missing or invalid credentials/token).
- **403 Forbidden**: The server understands who you are, but refuses authorization (insufficient permissions).
- **404 Not Found**: The requested resource could not be found on the server.
- **405 Method Not Allowed**: The HTTP verb used is not supported for this endpoint (e.g., \`POST\` to a static file).

### 5xx: Server Errors
- **500 Internal Server Error**: The server encountered an unexpected crash or uncaught exception.
- **502 Bad Gateway**: The reverse proxy (e.g., Nginx) received an invalid response from upstream application server.
- **503 Service Unavailable**: The server is temporarily overloaded or undergoing maintenance.
- **504 Gateway Timeout**: The proxy did not receive a timely response from the backend server.

---

> [!IMPORTANT] **MEMORIZE:**
> - **2xx** = Success (\`200 OK\`, \`201 Created\`)
> - **3xx** = Redirection (\`301 Permanent\`, \`304 Not Modified\`)
> - **4xx** = Client Error (\`400 Bad Request\`, \`401 Unauthorized\`, \`403 Forbidden\`, \`404 Not Found\`)
> - **5xx** = Server Error (\`500 Internal Error\`, \`502 Bad Gateway\`, \`503 Service Unavailable\`)
> - **GET** is safe & idempotent; **POST** is non-idempotent.

> [!NOTE] **DEV BRAIN:**
> In REST API design, do not return \`200 OK\` with an error message in the JSON body like \`{"error": "User not found"}\`. Always return appropriate semantic HTTP status codes like \`404 Not Found\` or \`400 Bad Request\`.

> [!WARNING] **TRAP:**
> Students often confuse \`401 Unauthorized\` and \`403 Forbidden\`.
> - **401 Unauthorized**: You are not logged in (Authentication issue).
> - **403 Forbidden**: You are logged in, but you lack permission to view this page (Authorization issue).

> [!TIP] **EXAM TIP:**
> In questions asking to compare **GET vs POST**, draw a 5-column table comparing: URL visibility, bookmarkability, caching, payload capacity, and idempotency.`,
          shortNotes: "HTTP Request = Method + URI + Headers + Body. HTTP Response = Status Code + Headers + Body. 2xx=Success, 3xx=Redirect, 4xx=Client Error, 5xx=Server Error. GET is safe; POST creates.",
          examples: [
            {
              title: "Making HTTP Requests with JavaScript Fetch API and Handling Status Codes",
              problem: "How do frontend developers dispatch HTTP GET and POST requests and inspect response status codes in JavaScript?",
              explanation: "Demonstrating the Fetch API with async/await, request headers, body serialization, and status code handling.",
              code: `async function fetchStudentData(studentId) {
  try {
    // 1. HTTP GET Request
    const response = await fetch(\`https://api.itmuniversity.ac.in/students/\${studentId}\`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer sample_token_123'
      }
    });

    // 2. Inspect HTTP Status Code
    console.log(\`Status: \${response.status} \${response.statusText}\`);

    if (response.status === 200) {
      const data = await response.json();
      console.log('Student record retrieved:', data);
    } else if (response.status === 404) {
      console.error('Error 404: Student record does not exist');
    } else {
      console.error(\`Unexpected HTTP status: \${response.status}\`);
    }
  } catch (err) {
    console.error('Network failure or DNS error:', err.message);
  }
}`,
              output: "Status: 200 OK\nStudent record retrieved: { id: 101, name: \"Aarav Sharma\", major: \"Computer Science\" }"
            }
          ],
          keyPoints: [
            "An HTTP request consists of a Request Line, Request Headers, and an optional Body.",
            "An HTTP response consists of a Status Line (status code + reason), Response Headers, and a Body.",
            "GET retrieves data and is safe and idempotent; POST creates data and is non-idempotent.",
            "Idempotent methods can be executed multiple times producing the exact same state on the server.",
            "Status codes are grouped: 1xx (Info), 2xx (Success), 3xx (Redirect), 4xx (Client Error), 5xx (Server Error)."
          ],
          theoryQuestions: [
            {
              question: "Explain the structure of an HTTP Request and HTTP Response packet with neat format diagrams.",
              marks: "5 Marks",
              answer: `1. **HTTP Request Structure:**
   - **Request Line:** Contains Method (GET, POST), Request URI (/index.html), and HTTP Version (HTTP/1.1).
   - **Request Headers:** Key-value pairs providing metadata (Host, User-Agent, Accept, Content-Type, Cookie).
   - **Empty Line (CRLF):** Critical delimiter separating headers from the body.
   - **Message Body:** Payload containing form parameters or JSON data (used in POST/PUT).
2. **HTTP Response Structure:**
   - **Status Line:** Contains HTTP Version, 3-digit Status Code (200), and Reason Phrase (OK).
   - **Response Headers:** Metadata about the payload (Content-Type, Content-Length, Set-Cookie, Cache-Control).
   - **Empty Line (CRLF):** Delimiter.
   - **Message Body:** The actual resource content (HTML, CSS, images, JSON).`,
              keyPoints: [
                "Request line components.",
                "Response status line components.",
                "Headers and role of blank CRLF line.",
                "Message body."
              ]
            },
            {
              question: "Compare GET and POST HTTP methods across parameters: URL visibility, caching, data size limits, idempotency, and security.",
              marks: "5 Marks",
              answer: `| Parameter | GET Method | POST Method |
| :--- | :--- | :--- |
| **Data Transmission** | Appended to URL as query string (\`?key=value\`) | Sent inside the HTTP message body |
| **Visibility** | Visible in browser address bar, history, and logs | Not visible in URL or browser history |
| **Caching** | Cached by browsers and proxy servers | Never cached by default |
| **Data Limit** | Restricted by URL length (~2048 characters) | Virtually unlimited payload size |
| **Idempotency** | Yes (repeat calls do not alter server state) | No (submitting twice creates duplicate entries) |
| **Security** | Insecure for sensitive data (passwords, PINs) | More secure (especially over HTTPS) |`,
              keyPoints: [
                "URL query string vs Request body.",
                "Caching and browser history.",
                "Size limits.",
                "Idempotency.",
                "Security for passwords."
              ]
            },
            {
              question: "Classify HTTP status codes into their five numerical families. Give two specific status codes with explanations for each category.",
              marks: "7 Marks",
              answer: `HTTP status codes are divided into five categories based on their first digit:
1. **1xx (Informational):** Request received and continuing. Examples: \`100 Continue\` (proceed with body), \`101 Switching Protocols\` (upgrading to WebSocket).
2. **2xx (Success):** Action successfully received and accepted. Examples: \`200 OK\` (standard success), \`201 Created\` (new resource created via POST).
3. **3xx (Redirection):** Further action needed to complete request. Examples: \`301 Moved Permanently\` (URL changed forever), \`304 Not Modified\` (cached copy valid).
4. **4xx (Client Error):** The request contains bad syntax or cannot be fulfilled. Examples: \`400 Bad Request\` (malformed input), \`404 Not Found\` (resource does not exist).
5. **5xx (Server Error):** The server failed to fulfill an apparently valid request. Examples: \`500 Internal Server Error\` (server crash), \`503 Service Unavailable\` (overload or maintenance).`,
              keyPoints: [
                "1xx Informational (100, 101).",
                "2xx Success (200, 201).",
                "3xx Redirection (301, 304).",
                "4xx Client Error (400, 404).",
                "5xx Server Error (500, 503)."
              ]
            }
          ],
          mcqs: [
            {
              question: "Which HTTP status code indicates that the requested resource has been permanently moved to a new URI?",
              options: [
              "200 OK",
              "301 Moved Permanently",
              "404 Not Found",
              "503 Service Unavailable"
              ],
              correctIndex: 1,
              explanation: "301 indicates a permanent redirection; search engines update their indexes to the new URL."
            },
            {
              question: "What does it mean for an HTTP method to be \"idempotent\"?",
              options: [
              "It can only be executed by administrators",
              "Executing the same request multiple times produces the exact same result on the server as executing it once",
              "It cannot transmit data in the body",
              "It automatically encrypts the data using SSL"
              ],
              correctIndex: 1,
              explanation: "Idempotency means that multiple identical requests will leave the server in the identical state as a single request (e.g., GET, PUT, DELETE)."
            },
            {
              question: "Which HTTP header is used by the client to indicate the media type of the body being transmitted to the server?",
              options: [
              "Accept",
              "User-Agent",
              "Content-Type",
              "Host"
              ],
              correctIndex: 2,
              explanation: "Content-Type specifies the MIME type of the payload (e.g. application/json, text/html) contained in the request or response body."
            },
            {
              question: "What is the primary difference between HTTP 401 and HTTP 403 status codes?",
              options: [
              "401 is a server error, while 403 is a client error",
              "401 indicates lack of valid authentication credentials, while 403 indicates authentication succeeded but authorization/permission is denied",
              "401 is for GET requests only, while 403 is for POST requests",
              "401 is temporary, while 403 is permanent"
              ],
              correctIndex: 1,
              explanation: "401 Unauthorized means \"you are unauthenticated (log in)\", while 403 Forbidden means \"you are recognized, but forbidden to access this resource\"."
            }
          ]
        }
      ]
    },
    {
      id: "wt-u2",
      title: "Unit 2: HTML5 Semantic Markup & Tables",
      description: "Document architecture, modern HTML5 doctype declaration, viewport configuration, semantic markup structure, accessibility and SEO benefits, and advanced tabular data structures.",
      topics: [
        {
          id: "wt-u2-t1",
          title: "Structure of a Modern HTML5 Document (<!DOCTYPE html>, meta viewport, head, body)",
          simpleExplanation: "HTML is the skeleton that holds every webpage together. An HTML5 document begins with <!DOCTYPE html> to tell the browser to run in modern standards mode. The <head> contains hidden instructions like the title, character encoding, and mobile viewport settings, while the <body> holds everything the user actually sees.",
          detailedExplanation: `## 1. Introduction: The Skeleton of the Web

HyperText Markup Language (HTML) is the standard markup language used to structure content on the World Wide Web. While CSS provides aesthetic styling and JavaScript provides interactive behavior, HTML defines the raw semantic architecture of every page.

HTML5 represents the major modern revision standardized by the W3C (World Wide Web Consortium) and WHATWG (Web Hypertext Application Technology Working Group).

\`\`\`mermaid
flowchart TD
    DOC["&lt;!DOCTYPE html&gt; (Preamble)"] --> HTML["&lt;html lang='en'&gt; (Root Element)"]
    HTML --> HEAD["&lt;head&gt; (Metadata Container)"]
    HTML --> BODY["&lt;body&gt; (Visible Content Container)"]

    HEAD --> M1["&lt;meta charset='UTF-8'&gt;"]
    HEAD --> M2["&lt;meta name='viewport' content='...'&gt;"]
    HEAD --> T["&lt;title&gt;Page Title&lt;/title&gt;"]
    HEAD --> L["&lt;link rel='stylesheet' href='...'&gt;"]

    BODY --> H["&lt;header&gt; Banner & Nav &lt;/header&gt;"]
    BODY --> M["&lt;main&gt; Core Page Content &lt;/main&gt;"]
    BODY --> F["&lt;footer&gt; Copyright & Links &lt;/footer&gt;"]
\`\`\`

---

## 2. Anatomy of the Modern HTML5 Boilerplate

Here is the complete canonical blueprint for an industry-standard HTML5 document:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- 1. Character Encoding -->
    <meta charset="UTF-8">

    <!-- 2. Mobile Responsive Viewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- 3. Internet Explorer Compatibility -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- 4. Search Engine & Social Metadata -->
    <meta name="description" content="Official Syllabus and Notes for Web Technology 102">
    <meta name="author" content="ITM University Department of Computer Science">

    <!-- 5. Document Tab Title & Favicon -->
    <title>Web Technology 102 | University Notes</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">

    <!-- 6. External Stylesheets -->
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>Welcome to Web Technology</h1>
    <p>This is the visible viewport content rendered by the browser engine.</p>

    <!-- 7. Scripts deferred to avoid blocking HTML parsing -->
    <script src="app.js" defer></script>
  </body>
</html>
\`\`\`

---

## 3. Detailed Component Breakdown

### 1. \`<!DOCTYPE html>\` (Document Type Declaration)
- In legacy HTML (HTML 4.01), doctype declarations were complex, multi-line SGML references pointing to external DTD (Document Type Definition) files.
- In HTML5, it is simply \`<!DOCTYPE html>\`.
- **Purpose**: It is **not** an HTML tag; it is an instruction to the web browser. Without it, browsers fall back into **"Quirks Mode"** (emulating bugs from 1990s Netscape Navigator and Internet Explorer 5). With it, browsers activate **"Standards Mode"**, rendering layouts strictly according to modern W3C standards.

### 2. The Root \`<html lang="en">\` Tag
- Wraps all elements of the document.
- The \`lang="en"\` attribute informs screen readers which language synthesizer to use for speech output, and informs search engines for localized indexing.

### 3. The \`<head>\` Section: Metadata Engine
The \`<head>\` contains metadata—data *about* the document that is never directly displayed in the browser viewport window:
- **\`<meta charset="UTF-8">\`**: Tells the browser how to decode incoming bytes into characters. UTF-8 supports nearly every written language, mathematical symbol, and emoji on Earth. If omitted, special characters render as broken glyphs known as *mojibake* (e.g., \`â€™\`).
- **\`<meta name="viewport" content="width=device-width, initial-scale=1.0">\`**:
  - \`width=device-width\`: Sets the virtual viewport width to match the physical screen width of the device (mobile, tablet, desktop).
  - \`initial-scale=1.0\`: Prevents mobile browsers from automatically zooming out to fit a full 980px desktop canvas. Essential for CSS Media Queries to work properly.
- **\`<title>\`**: Sets the name of the browser tab, bookmark label, and the headline shown in Google search engine result pages (SERPs).

### 4. The \`<body>\` Section: Rendered Canvas
Contains all text, structural tags, images, media, tables, and forms displayed to the user.

---

## 4. Void Elements vs Container Elements

HTML elements are divided structurally into two categories:
1. **Container (Normal) Elements**: Have both an opening tag and a closing tag. They wrap text or child elements.
   - Example: \`<p>Hello World</p>\`, \`<div>...</div>\`, \`<h1>Heading</h1>\`.
2. **Void (Self-Closing) Elements**: Cannot contain child nodes or inner text. They do NOT require a closing tag (\`</...>\`) in HTML5.
   - Example: \`<img>\`, \`<input>\`, \`<br>\`, \`<hr>\`, \`<meta>\`, \`<link>\`.

---

> [!IMPORTANT] **MEMORIZE:**
> - \`<!DOCTYPE html>\` triggers **Standards Mode** in browsers.
> - \`<meta charset="UTF-8">\` enables international character and emoji support.
> - \`<meta name="viewport" content="width=device-width, initial-scale=1.0">\` is required for mobile responsiveness.
> - Container tags have opening and closing pairs (\`<p>...</p>\`); Void tags do not (\`<img>\`, \`<input>\`, \`<br>\`).

> [!NOTE] **DEV BRAIN:**
> Always place your \`<script>\` tags at the bottom of \`<body>\` or use the \`defer\` attribute in the \`<head>\`. If you place regular scripts in the head without \`defer\`, HTML parsing pauses until the script downloads and executes, causing severe page load lag!

> [!WARNING] **TRAP:**
> Don't write self-closing XML slashes like \`<br />\` or \`<img />\` unless you are writing XHTML. While valid HTML5 tolerates trailing slashes on void elements, they are completely unnecessary.

> [!TIP] **EXAM TIP:**
> When asked to draw the HTML document structure in an exam, draw a hierarchical tree showing \`html\` splitting into \`head\` and \`body\`, with \`meta\`, \`title\`, \`h1\`, \`p\` hanging from their respective parents.`,
          shortNotes: "<!DOCTYPE html> enables Standards Mode. <head> holds metadata (UTF-8, viewport, title); <body> contains displayable content. Void tags (img, br, input) have no closing tag.",
          examples: [
            {
              title: "Complete HTML5 Web Document Template",
              problem: "Write a valid, standards-compliant HTML5 document containing metadata, a header, and responsive styling.",
              explanation: "Demonstrating clean indentation, meta charset, viewport definition, external stylesheet linking, and semantic layout structure.",
              code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ITM University - Web Technology Portal</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; background: #f8fafc; color: #1e293b; }
    header { border-bottom: 2px solid #2563eb; padding-bottom: 1rem; }
    .badge { background: #2563eb; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; }
  </style>
</head>
<body>
  <header>
    <span class="badge">Semester 1</span>
    <h1>Web Technology (WT102)</h1>
    <p>Comprehensive Modern Web Foundations</p>
  </header>
  <main>
    <h2>Module 1: Document Structure</h2>
    <p>Standards mode successfully activated via &lt;!DOCTYPE html&gt;.</p>
  </main>
</body>
</html>`,
              output: "Rendered in Chrome/Firefox with clean typography, blue accent border, and Semester 1 badge."
            }
          ],
          keyPoints: [
            "<!DOCTYPE html> tells the browser to parse the document in modern Standards Mode rather than Quirks Mode.",
            "The <meta charset=\"UTF-8\"> tag ensures full character and emoji decoding support.",
            "The <meta name=\"viewport\"> tag configures page dimensions for responsive mobile displays.",
            "The <head> section houses non-visual metadata, links, and title; <body> contains visible user content.",
            "Void elements like <img>, <br>, and <input> do not accept inner content or closing tags."
          ],
          theoryQuestions: [
            {
              question: "What is <!DOCTYPE html>? Explain what happens when a browser encounters a webpage missing this declaration.",
              marks: "5 Marks",
              answer: `1. **Definition & Purpose:** \`<!DOCTYPE html>\` is a document type declaration placed at the very top of an HTML document (line 1). It is not an HTML tag, but an instruction to the web browser rendering engine.
2. **Standards Mode vs Quirks Mode:**
   - **Standards Mode (With DOCTYPE):** The browser renders the page strictly following modern W3C HTML5 and CSS specifications.
   - **Quirks Mode (Without DOCTYPE):** When the doctype is omitted, modern browsers assume the page was authored in the late 1990s. The engine falls back to legacy Quirks Mode, emulating non-standard rendering bugs from Internet Explorer 5 and Netscape 4. This results in incorrect CSS Box Model calculations (padding being absorbed into width), broken font inheritance, and unpredictable layout rendering.`,
              keyPoints: [
                "Document type declaration.",
                "Triggers Standards Mode.",
                "Absence triggers Quirks Mode (IE5/Netscape emulation).",
                "Box model and CSS breakage in Quirks Mode."
              ]
            },
            {
              question: "Explain the purpose of the <meta name=\"viewport\"> tag and describe each parameter in content=\"width=device-width, initial-scale=1.0\".",
              marks: "5 Marks",
              answer: `The viewport meta tag instructs mobile browser layout engines how to scale and size the visible window area.
1. **The Problem:** By default, mobile browsers assume desktop pages are 980px wide. They render the page off-screen and zoom out, making text unreadably tiny.
2. **width=device-width:** Forces the virtual screen width to equal the physical device pixel width (e.g., 390px on an iPhone), allowing responsive CSS media queries to calculate correctly.
3. **initial-scale=1.0:** Sets the initial zoom magnification ratio to 1:1 when the page first loads, preventing automatic zoom-out.`,
              keyPoints: [
                "Solves 980px default mobile zoom-out.",
                "width=device-width binds virtual canvas to physical device.",
                "initial-scale=1.0 maintains 100% zoom."
              ]
            },
            {
              question: "Differentiate between Container Elements and Void Elements in HTML with three examples of each.",
              marks: "3 Marks",
              answer: `1. **Container Elements:** Elements that contain content or other child elements between an opening tag and a closing tag. Examples: \`<p>Paragraph</p>\`, \`<div>Container</div>\`, \`<button>Click Me</button>\`.
2. **Void Elements:** Elements that cannot enclose any text or child elements. They do not have a closing tag in HTML5. Examples: \`<img>\`, \`<input>\`, \`<br>\`.`,
              keyPoints: [
                "Container has opening/closing tags and inner content.",
                "Void has no closing tag and cannot contain inner nodes.",
                "Examples for both."
              ]
            }
          ],
          mcqs: [
            {
              question: "What is the primary function of the <!DOCTYPE html> declaration at the beginning of an HTML file?",
              options: [
              "To load external CSS stylesheets",
              "To tell the browser rendering engine to run in modern Standards Mode",
              "To import JavaScript libraries from a CDN",
              "To connect the webpage to a backend database"
              ],
              correctIndex: 1,
              explanation: "<!DOCTYPE html> instructs the browser to render the page following modern W3C standards rather than legacy Quirks Mode."
            },
            {
              question: "Which meta tag is mandatory for mobile responsive web design to adapt layout to screen width?",
              options: [
              "<meta name=\"robots\" content=\"index,follow\">",
              "<meta http-equiv=\"refresh\" content=\"30\">",
              "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
              "<meta name=\"generator\" content=\"HTML5\">"
              ],
              correctIndex: 2,
              explanation: "The viewport meta tag establishes the virtual viewport width matching the physical device width and sets the 1:1 scale."
            },
            {
              question: "Which of the following is a Void (self-closing) element in HTML5?",
              options: [
              "<p>",
              "<section>",
              "<input>",
              "<span>"
              ],
              correctIndex: 2,
              explanation: "<input> is a void element; it cannot contain child nodes or closing tags in HTML5."
            },
            {
              question: "Where is metadata like character encoding and title placed inside an HTML5 document?",
              options: [
              "Inside the <body> section",
              "Inside the <head> section",
              "Directly before <!DOCTYPE html>",
              "Inside the <footer> section"
              ],
              correctIndex: 1,
              explanation: "All non-visual document metadata belongs inside the <head> element."
            }
          ]
        },
        {
          id: "wt-u2-t2",
          title: "Semantic Elements: <header>, <nav>, <main>, <article>, <section>, <aside>, <footer> (SEO & Accessibility Benefits)",
          simpleExplanation: "In older HTML, developers built layouts using endless generic <div> tags with IDs like <div id=\"nav\">. HTML5 introduced semantic elements like <header>, <nav>, <main>, <article>, and <footer> that clearly describe their meaning to screen readers and search engines, vastly improving accessibility and Google ranking.",
          detailedExplanation: `## 1. What is Semantic Markup?

The word **"Semantics"** refers to *meaning*. In computer science, **Semantic HTML** means writing code tags that describe the meaning and purpose of the content they contain, rather than how that content visually looks.

For example:
- **Non-Semantic Elements**: \`<div>\` and \`<span>\` provide zero hints about their content. A \`<div>\` could be a navigation bar, a popup, an advertisement, or a comment box.
- **Semantic Elements**: \`<nav>\`, \`<header>\`, \`<article>\`, \`<footer>\` unambiguously announce their structural role to both humans and machine algorithms.

---

## 2. The HTML4 "Div Soup" Problem vs Modern HTML5

Prior to HTML5, developers suffered from an anti-pattern known as **"Div Soup"**:

\`\`\`html
<!-- Legacy HTML4 Div Soup (Zero Semantic Meaning) -->
<div id="header">
  <div id="nav">...</div>
</div>
<div id="content">
  <div class="post">...</div>
  <div class="sidebar">...</div>
</div>
<div id="footer">...</div>
\`\`\`

HTML5 replaced this meaningless nesting with clean, semantic landmark tags:

\`\`\`mermaid
flowchart TD
    PAGE["Semantic Layout Blueprint"]
    PAGE --> HDR["&lt;header&gt; (Branding, Logo, Search)"]
    HDR --> NAV["&lt;nav&gt; (Primary Navigation Bar)"]
    PAGE --> MAIN["&lt;main&gt; (Unique Core Content)"]

    MAIN --> ART["&lt;article&gt; (Self-contained post / news)"]
    MAIN --> SEC["&lt;section&gt; (Thematic chapter with &lt;h2&gt;)"]
    MAIN --> ASD["&lt;aside&gt; (Related sidebar / glossary)"]

    PAGE --> FTR["&lt;footer&gt; (Copyright, Legal, Sitemap)"]
\`\`\`

---

## 3. Comprehensive Breakdown of HTML5 Semantic Landmark Elements

### 1. \`<header>\`
- Represents introductory content for its nearest ancestor section or the entire page.
- Typically contains the site logo, company heading, author byline, or search bar.
- Note: A page can have **multiple** \`<header>\` elements (e.g., one page-level header, and one header inside each \`<article>\`).

### 2. \`<nav>\`
- Designates a block of major navigational links (e.g., site menu, pagination controls, table of contents).
- Note: Do NOT wrap every single link on a page in a \`<nav>\`; reserve it for primary site navigation.

### 3. \`<main>\`
- Represents the dominant, central content unique to this specific document.
- **Strict Rule**: There must only be **ONE visible \`<main>\` element per page**. It should NOT contain content repeated across multiple pages (like global headers, navigation, or footers).

### 4. \`<article>\`
- Represents a self-contained, independent composition that makes complete sense if taken out of context and syndicated or republished on another website.
- Examples: A blog post, a newspaper article, a forum comment, a product card in an e-commerce catalog.

### 5. \`<section>\`
- Represents a standalone thematic grouping of content, typically with a heading (\`<h2>\` to \`<h6>\`).
- If an element does not represent a clear thematic section with a heading, use a generic \`<div>\` instead.

### 6. \`<aside>\`
- Represents content that is tangentially related to the main content.
- Examples: Sidebars, callout definition boxes, related article links, author biography summaries, advertisements.

### 7. \`<footer>\`
- Represents the footer for its parent section or page.
- Typically contains copyright notices, links to privacy policies, contact information, and back-to-top buttons.

---

## 4. Key Benefits of Semantic HTML

### 1. Accessibility (a11y) & Screen Readers
- Visually impaired users rely on assistive software (screen readers like NVDA, JAWS, VoiceOver).
- Semantic elements automatically map to **WAI-ARIA Landmark Roles**:
  - \`<nav>\` = \`role="navigation"\`
  - \`<main>\` = \`role="main"\`
  - \`<header>\` = \`role="banner"\`
  - \`<footer>\` = \`role="contentinfo"\`
- Screen readers allow blind users to press hotkeys (like \`M\` for main or \`N\` for navigation) to instantly skip repetitive menus and jump straight to the content.

### 2. Search Engine Optimization (SEO)
- Search engine web crawlers (like Googlebot) analyze semantic tags to determine which text represents the core authoritative content (\`<article>\` and \`<main>\`) versus auxiliary navigation or footer boilerplate.
- Semantic pages score higher relevance in keyword indexing.

### 3. Maintainability & Code Readability
- Teams of developers can understand a codebase in seconds when looking at \`<article>\` and \`<nav>\` instead of 20 nested \`<div class="box">\` tags.

---

## 5. Summary Matrix: \`<article>\` vs \`<section>\` vs \`<div>\`

| Element | Semantic Meaning | Requires Heading? | Can Stand Alone? | When to Use |
| :--- | :--- | :--- | :--- | :--- |
| **\`<article>\`** | High (Self-contained item) | Recommended | **Yes** | Blog post, news story, comment |
| **\`<section>\`** | Medium (Thematic sub-group) | **Yes** | No | Chapter, feature highlight section |
| **\`<div>\`** | None (Pure styling hook) | No | No | Flexbox wrapper, CSS animation container |

---

> [!IMPORTANT] **MEMORIZE:**
> - Only **ONE** \`<main>\` element per webpage!
> - An \`<article>\` makes sense on its own if shared via RSS or social media.
> - A \`<section>\` is a thematic subsection requiring its own heading.
> - Use \`<div>\` only when no semantic tag fits (e.g., pure CSS styling wrapper).

> [!NOTE] **DEV BRAIN:**
> Screen readers give users a "Landmark List" menu. If your page is built entirely out of \`<div>\` tags, that menu is empty, rendering your website hostile to disabled users and violating ADA / Section 508 legal compliance.

> [!WARNING] **TRAP:**
> Do NOT confuse \`<header>\` with \`<head>\` or \`<h1>\`:
> - \`<head>\`: Container for metadata (invisible).
> - \`<header>\`: Visual container for top banners/logos.
> - \`<h1>\`: The most important text heading.

> [!TIP] **EXAM TIP:**
> In exams, you are frequently asked to "Convert a given HTML4 div layout into modern HTML5 semantic elements". Replace \`<div id="nav">\` with \`<nav>\`, \`<div id="header">\` with \`<header>\`, and \`<div id="footer">\` with \`<footer>\`.`,
          shortNotes: "Semantic tags (<header>, <nav>, <main>, <article>, <section>, <aside>, <footer>) give structural meaning to web content, dramatically boosting SEO and screen-reader accessibility.",
          examples: [
            {
              title: "Complete HTML5 Semantic News Article Layout",
              problem: "Construct a semantic blog post layout demonstrating header, nav, main, article, section, aside, and footer.",
              explanation: "Using semantic landmarks to create an accessible, search-engine-friendly article layout without unnecessary div tags.",
              code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ITM Tech Chronicle</title>
</head>
<body>
  <!-- Top Banner & Site Navigation -->
  <header>
    <h1>ITM Tech Chronicle</h1>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#articles">Articles</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <!-- Main Unique Content Area -->
  <main>
    <article>
      <header>
        <h2>The Rise of Web Standards & HTML5</h2>
        <p>Published on <time datetime="2026-09-25">Sept 25, 2026</time> by Prof. Bhatt</p>
      </header>

      <section>
        <h3>1. Why Semantics Matter</h3>
        <p>Semantic markup transforms the web from a chaotic visual canvas into structured machine-readable knowledge.</p>
      </section>

      <section>
        <h3>2. Screen Reader Navigation</h3>
        <p>Assistive technologies map landmark elements directly to ARIA roles.</p>
      </section>
    </article>

    <aside>
      <h3>Related Topics</h3>
      <ul>
        <li><a href="#css">CSS3 Flexbox Guide</a></li>
        <li><a href="#js">JavaScript DOM Basics</a></li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>&copy; 2026 ITM University. All Rights Reserved.</p>
  </footer>
</body>
</html>`,
              output: "A semantically structured document tree with clear landmarks readable by search crawlers and screen readers."
            }
          ],
          keyPoints: [
            "Semantic HTML elements clearly communicate their purpose to browsers, developers, and assistive devices.",
            "Core landmarks include <header>, <nav>, <main>, <article>, <section>, <aside>, and <footer>.",
            "A webpage must contain exactly one dominant <main> element.",
            "<article> represents an independently distributable piece of content; <section> represents a thematic chapter.",
            "Semantic tags improve SEO by giving search engines rich context and enhance accessibility by providing ARIA landmarks."
          ],
          theoryQuestions: [
            {
              question: "What is semantic markup? Explain six HTML5 semantic elements and their structural layout functions.",
              marks: "7 Marks",
              answer: `Semantic markup refers to the practice of using HTML tags that convey the actual structural meaning and role of content rather than its presentation.
1. **<header>:** Represents introductory content, branding logos, search forms, and titles for a page or article.
2. **<nav>:** Wraps major navigational links allowing users and screen readers to find site menus.
3. **<main>:** Encloses the unique, central core content of the document (strictly one per page).
4. **<article>:** Encloses a self-contained, independent composition suitable for standalone syndication (e.g. blog post, product card).
5. **<section>:** Groups thematically related content together, typically introduced with a heading.
6. **<aside>:** Contains tangentially related auxiliary content such as sidebars, related links, or advertisements.
7. **<footer>:** Contains metadata, copyright, legal disclaimers, and contact details for the document or enclosing section.`,
              keyPoints: [
                "Definition of semantic markup.",
                "Detailed explanation of 6 elements.",
                "Distinction between main, article, and section."
              ]
            },
            {
              question: "Differentiate between <article>, <section>, and <div> in HTML5. Provide examples of when to use each.",
              marks: "5 Marks",
              answer: `1. **<article>:** Used for self-contained, independent items that make sense in isolation (e.g., a single news article, a forum post, an e-commerce product card). It could be extracted and syndicated on RSS or social media.
2. **<section>:** Used to represent a thematic subsection of a document, such as a chapter, tabbed panel, or feature breakdown. It must have a heading (\`<h2>\`-\`<h6>\`).
3. **<div>:** Has zero semantic meaning. It should only be used when no semantic element applies—primarily as a styling hook for CSS Flexbox/Grid wrappers, backgrounds, or JavaScript animation triggers.`,
              keyPoints: [
                "<article> is standalone/syndicated.",
                "<section> is a thematic sub-unit with heading.",
                "<div> has zero semantic meaning, used for CSS wrappers."
              ]
            },
            {
              question: "Explain how HTML5 semantic elements improve Search Engine Optimization (SEO) and web accessibility.",
              marks: "5 Marks",
              answer: `1. **SEO Benefits:** Web crawlers like Googlebot parse HTML to determine content hierarchy. Semantic tags like \`<main>\` and \`<article>\` tell crawlers which text is primary content and which is repetitive navigation or footer boilerplate. This ensures search engines index authoritative keywords accurately, raising page rankings.
2. **Accessibility Benefits:** Visually impaired users using screen readers navigate via landmark roles. HTML5 tags automatically provide ARIA landmark roles (\`<nav>\` = navigation, \`<main>\` = main). Users can use screen reader shortcut keys to jump directly into the main article, bypassing hundreds of menu links.`,
              keyPoints: [
                "Search crawler hierarchy analysis.",
                "Distinguishing core content from boilerplate.",
                "Screen reader landmark navigation and ARIA role mapping."
              ]
            }
          ],
          mcqs: [
            {
              question: "How many visible <main> elements are permitted per HTML5 document?",
              options: [
              "As many as needed for each section",
              "Exactly one",
              "Up to three",
              "None, it is deprecated"
              ],
              correctIndex: 1,
              explanation: "W3C specifications mandate that an HTML document must have only one visible <main> element representing the primary topic of the page."
            },
            {
              question: "Which HTML5 element represents content that is tangentially related to the content around it, such as a sidebar or pull quote?",
              options: [
              "<section>",
              "<aside>",
              "<article>",
              "<nav>"
              ],
              correctIndex: 1,
              explanation: "<aside> is designated for secondary or tangentially related content like sidebars, callouts, and author bios."
            },
            {
              question: "Which tag is most appropriate for enclosing a self-contained blog post that could be republished on another site via RSS?",
              options: [
              "<div>",
              "<section>",
              "<article>",
              "<aside>"
              ],
              correctIndex: 2,
              explanation: "<article> is specifically designed for self-contained compositions that can stand independently in syndication."
            },
            {
              question: "Which of the following elements has NO semantic meaning and should only be used for CSS styling purposes?",
              options: [
              "<nav>",
              "<div>",
              "<footer>",
              "<header>"
              ],
              correctIndex: 1,
              explanation: "<div> has no semantic meaning whatsoever; it is a generic container for styling and scripting."
            }
          ]
        },
        {
          id: "wt-u2-t3",
          title: "HTML Tables: <table>, <tr>, <th>, <td>, <thead>, <tbody>, <tfoot>, rowspan, colspan, and table formatting",
          simpleExplanation: "HTML tables display structured data in rows and columns. You build a table using <tr> for rows, <th> for bold header cells, and <td> for data cells. When a cell needs to stretch across multiple columns or rows, you use colspan and rowspan.",
          detailedExplanation: `## 1. Introduction: Tabular Data vs Page Layout

An HTML table is designed specifically for displaying **two-dimensional tabular data**—data that naturally belongs in a grid of rows and columns (such as grade sheets, timetables, financial balance sheets, and sports statistics).

> [!WARNING] **TRAP:**
> **Never use HTML tables for website page layouts!** In the late 1990s, developers used nested tables to arrange columns and sidebars. Today, doing so causes catastrophic accessibility failures for screen readers and breaks responsive mobile views. Page layouts must always be built using **CSS Flexbox or CSS Grid**!

---

## 2. Structural Hierarchy of an HTML Table

A modern, accessible HTML table consists of semantic structural containers:

\`\`\`mermaid
flowchart TD
    TABLE["&lt;table&gt; (Container)"]
    TABLE --> CAP["&lt;caption&gt; Student Academic Records &lt;/caption&gt;"]
    TABLE --> THEAD["&lt;thead&gt; (Header Row Group)"]
    TABLE --> TBODY["&lt;tbody&gt; (Body Data Rows)"]
    TABLE --> TFOOT["&lt;tfoot&gt; (Summary / Totals)"]

    THEAD --> TR1["&lt;tr&gt; (Header Row)"]
    TR1 --> TH1["&lt;th scope='col'&gt; Subject &lt;/th&gt;"]
    TR1 --> TH2["&lt;th scope='col'&gt; Marks &lt;/th&gt;"]

    TBODY --> TR2["&lt;tr&gt; (Data Row 1)"]
    TR2 --> TD1["&lt;td&gt; Web Technology &lt;/td&gt;"]
    TR2 --> TD2["&lt;td&gt; 92 &lt;/td&gt;"]

    TFOOT --> TR3["&lt;tr&gt; (Footer Row)"]
    TR3 --> TD3["&lt;td colspan='2'&gt; Total: 92 &lt;/td&gt;"]
\`\`\`

### Core Table Elements:
1. **\`<table>\`**: The outer wrapper for the entire table.
2. **\`<caption>\`**: Placed immediately after \`<table>\`; gives an accessible title to the table for screen readers.
3. **\`<thead>\`**: Groups the header rows containing column labels.
4. **\`<tbody>\`**: Contains the primary data records.
5. **\`<tfoot>\`**: Groups summary rows (such as totals, averages, or footnotes).
6. **\`<tr>\` (Table Row)**: Defines an individual horizontal row.
7. **\`<th>\` (Table Header)**: Defines a header cell. Content is **bold** and **centered** by default. Supports the \`scope="col"\` or \`scope="row"\` attribute for accessibility.
8. **\`<td>\` (Table Data)**: Defines a standard data cell. Content is regular weight and left-aligned by default.

---

## 3. Merging Cells: \`colspan\` and \`rowspan\`

One of the most heavily tested topics in university examinations is merging adjacent table cells:

### 1. \`colspan="n"\` (Horizontal Column Merging)
- Causes a single cell to expand horizontally across \`n\` columns.
- **Rule**: If you merge 2 columns with \`colspan="2"\`, you must **delete 1 \`<td>\`** in that row so the row total remains balanced!

### 2. \`rowspan="n"\` (Vertical Row Merging)
- Causes a single cell to stretch vertically downward across \`n\` rows.
- **Rule**: In the subsequent row(s) below, you must **omit one \`<td>\`** because the cell above is occupying that slot!

\`\`\`
Row 1: [ Cell A: rowspan="2" ] [ Cell B ] [ Cell C ]
Row 2:                         [ Cell D ] [ Cell E ]  <-- Note: Only 2 cells written here!
\`\`\`

---

## 4. Professional CSS Table Formatting

Raw HTML tables render without borders or spacing. Modern websites style tables using clean CSS:

\`\`\`css
/* 1. Essential: Eliminate double borders */
table {
  width: 100%;
  border-collapse: collapse; /* Merges adjacent cell borders into a single clean line */
  font-family: system-ui, sans-serif;
  margin: 1rem 0;
}

/* 2. Cell Padding and Subtle Borders */
th, td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

/* 3. Header Styling */
thead th {
  background-color: #1e293b;
  color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
}

/* 4. Zebra Striping for Easy Reading */
tbody tr:nth-child(even) {
  background-color: #f8fafc;
}

/* 5. Interactive Row Hover */
tbody tr:hover {
  background-color: #f1f5f9;
}
\`\`\`

---

> [!IMPORTANT] **MEMORIZE:**
> - \`border-collapse: collapse;\` is mandatory in CSS to prevent ugly double borders.
> - \`colspan\` merges horizontally (affects columns in the same row).
> - \`rowspan\` merges vertically (affects rows below).
> - Always use \`<thead>\`, \`<tbody>\`, and \`<tfoot>\` for clean separation of concerns.

> [!NOTE] **DEV BRAIN:**
> On mobile devices, wide tables break horizontal layouts. Always wrap your \`<table>\` in a \`<div class="table-container">\` with \`overflow-x: auto;\` to provide smooth touch scrolling on smartphones.

> [!WARNING] **TRAP:**
> When using \`rowspan="2"\` in row 1, remember NOT to declare that column's cell in row 2! Declaring it will push an extra cell outside the table grid and destroy alignment.

> [!TIP] **EXAM TIP:**
> In university exams, you will almost certainly be given a hand-drawn grid and asked to "Write the HTML code to generate this table". Count the total columns in the widest row first; then every row's cells (including \`colspan\` counts) must equal that exact number!`,
          shortNotes: "<table> displays tabular data using <tr> (row), <th> (header), and <td> (cell). Use thead/tbody/tfoot for semantic structure. colspan merges across columns; rowspan merges across rows.",
          examples: [
            {
              title: "Student Marksheet with Rowspan, Colspan, and Thead/Tbody",
              problem: "Create a complete marksheet table demonstrating thead, tbody, tfoot, rowspan for student names, and colspan for semester totals.",
              explanation: "Demonstrates cell merging, scope attributes for accessibility, and semantic group elements.",
              code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Semester Marksheet</title>
  <style>
    table { width: 100%; border-collapse: collapse; font-family: sans-serif; }
    th, td { border: 1px solid #94a3b8; padding: 10px; text-align: center; }
    th { background: #334155; color: white; }
    tfoot { font-weight: bold; background: #e2e8f0; }
  </style>
</head>
<body>
  <table>
    <caption>Department of Computer Science - Semester 1 Grade Sheet</caption>
    <thead>
      <tr>
        <th scope="col" rowspan="2">Roll No</th>
        <th scope="col" rowspan="2">Student Name</th>
        <th scope="col" colspan="2">Theory Marks</th>
        <th scope="col" rowspan="2">Practical</th>
        <th scope="col" rowspan="2">Total</th>
      </tr>
      <tr>
        <th scope="col">Web Tech</th>
        <th scope="col">Python</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>101</td>
        <td>Aarav Sharma</td>
        <td>88</td>
        <td>92</td>
        <td>48</td>
        <td>228</td>
      </tr>
      <tr>
        <td>102</td>
        <td>Diya Patel</td>
        <td>95</td>
        <td>90</td>
        <td>49</td>
        <td>234</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="5">Class Average Total Marks</td>
        <td>231</td>
      </tr>
    </tfoot>
  </table>
</body>
</html>`,
              output: "A perfectly formatted grid table where header columns span vertically and the footer spans horizontally across 5 columns."
            }
          ],
          keyPoints: [
            "HTML tables should only be used for tabular data, never for general page layouts.",
            "<thead>, <tbody>, and <tfoot> semantically group header, body, and summary rows.",
            "<th> defines header cells (bold, centered), while <td> defines data cells.",
            "colspan=\"n\" merges n horizontal columns; rowspan=\"n\" merges n vertical rows.",
            "The CSS property border-collapse: collapse combines separated cell borders into a single border."
          ],
          theoryQuestions: [
            {
              question: "Explain the complete structural hierarchy of an HTML table using thead, tbody, tfoot, tr, th, and td. Why is this structure preferred?",
              marks: "5 Marks",
              answer: `1. **Table Hierarchy:**
   - \`<table>\`: Container for the entire tabular structure.
   - \`<caption>\`: Describes the table purpose for accessibility.
   - \`<thead>\`: Encapsulates the header rows defining column titles (\`<th>\`).
   - \`<tbody>\`: Contains all content data rows (\`<tr>\`, \`<td>\`). Multiple tbodies are permitted for chunking data.
   - \`<tfoot>\`: Encapsulates summary, calculation, and footer rows.
2. **Advantages:**
   - **Printing & Scrolling:** When printing long tables across multiple pages, browsers automatically repeat the \`<thead>\` and \`<tfoot>\` on every printed page.
   - **Accessibility:** Screen readers can navigate cell by cell while reading the parent header name using \`scope="col"\`.
   - **CSS Targetability:** Enables distinct styling of headers and totals independently of data rows.`,
              keyPoints: [
                "Hierarchy of table components.",
                "Role of thead, tbody, and tfoot.",
                "Repeated headers during printing.",
                "Accessibility advantages."
              ]
            },
            {
              question: "Explain the difference between rowspan and colspan with neat diagrams and code snippets.",
              marks: "5 Marks",
              answer: `1. **colspan (Column Span):**
   - Merges multiple columns horizontally within the same row.
   - Syntax: \`<th colspan="2">Theory Marks</th>\`.
   - Affects only the current \`<tr>\`. The total number of declared \`<td>\` elements in that row must be reduced accordingly.
2. **rowspan (Row Span):**
   - Merges multiple rows vertically down a single column.
   - Syntax: \`<td rowspan="2">Roll No</td>\`.
   - Affects the current row AND subsequent rows. The rows beneath this cell must omit their respective column entry to avoid overflow.`,
              keyPoints: [
                "colspan is horizontal merging within same row.",
                "rowspan is vertical merging across downstream rows.",
                "Adjusting cell counts to maintain grid balance."
              ]
            },
            {
              question: "Why should HTML tables never be used for website layout design? Explain two modern CSS alternatives.",
              marks: "3 Marks",
              answer: `1. **Why Table Layouts Are Bad:**
   - **Accessibility:** Screen readers interpret table layouts as tabular data, reading contents row by row out of logical reading order.
   - **Performance:** Browsers must calculate the width of every nested cell before rendering anything, causing severe layout reflow lag.
   - **Responsiveness:** Tables cannot naturally wrap onto smaller smartphone screens.
2. **Modern Alternatives:** CSS Flexbox (1-dimensional layout for rows/columns) and CSS Grid (2-dimensional layout system).`,
              keyPoints: [
                "Accessibility barrier for screen readers.",
                "Slow rendering performance.",
                "Lack of responsive behavior on mobile.",
                "Modern alternatives: Flexbox & Grid."
              ]
            }
          ],
          mcqs: [
            {
              question: "Which HTML attribute allows a single table cell to span horizontally across three columns?",
              options: [
              "rowspan=\"3\"",
              "colspan=\"3\"",
              "span=\"3\"",
              "colwidth=\"3\""
              ],
              correctIndex: 1,
              explanation: "colspan=\"3\" merges the cell horizontally across 3 columns."
            },
            {
              question: "Which CSS property is essential to eliminate the default double border gap between adjacent table cells?",
              options: [
              "border-spacing: collapse",
              "border-collapse: collapse",
              "cell-spacing: 0",
              "border-style: merged"
              ],
              correctIndex: 1,
              explanation: "border-collapse: collapse merges neighboring cell borders into a single clean border."
            },
            {
              question: "What is the default text alignment and font weight of content inside a <th> element?",
              options: [
              "Left-aligned and normal weight",
              "Centered and bold",
              "Right-aligned and italic",
              "Justified and bold"
              ],
              correctIndex: 1,
              explanation: "By default, browser user agent styles render <th> content as bold and centered."
            },
            {
              question: "Which tag provides an accessible title or caption for an HTML table and must appear immediately following the <table> tag?",
              options: [
              "<title>",
              "<legend>",
              "<caption>",
              "<summary>"
              ],
              correctIndex: 2,
              explanation: "The <caption> element provides an accessible title describing the table content for screen readers and visual users."
            }
          ]
        }
      ]
    },
    {
      id: "wt-u3",
      title: "Unit 3: HTML Forms, Controls & Multimedia",
      description: "Two-way user interaction architectures, form serialization, GET vs POST transfer, enctype multipart encodings, HTML5 input controls, native audio/video streaming, sandboxed iframes, and canvas graphics.",
      topics: [
        {
          id: "wt-u3-t1",
          title: "HTML Forms Architecture: <form action=\"...\" method=\"...\"> (GET vs POST), enctype=\"multipart/form-data\"",
          simpleExplanation: "Forms are the primary way users send data to a web server—whether signing up, logging in, or uploading a file. The action attribute specifies the destination URL, the method defines how data travels (visible in the URL with GET, or hidden in the request body with POST), and enctype controls how the data is packaged (especially when uploading files).",
          detailedExplanation: `## 1. The Role of Forms in Web Architecture

While standard HTML documents allow servers to deliver information *down* to users, **HTML Forms** create the two-way bridge that allows users to send structured data *up* to the server.

Whenever you type an email, authenticate with a password, search on Google, or purchase a product, an HTML form captures your input, serializes it into key-value pairs, and dispatches it across the internet via an HTTP request.

\`\`\`mermaid
sequenceDiagram
    autonumber
    actor User as User
    participant Browser as Web Browser (DOM)
    participant Server as Backend Server (/submit-endpoint)

    User->>Browser: Types name & password in &lt;input&gt;
    User->>Browser: Clicks &lt;button type="submit"&gt;
    Note over Browser: Browser serializes inputs: username=aarav&pass=secret
    Browser->>Server: HTTP POST /submit-endpoint (Data in Body)
    Server-->>Browser: HTTP 302 Redirect or HTTP 200 OK
    Note over Browser: Browser renders response or redirects to dashboard
\`\`\`

---

## 2. Anatomy of the \`<form>\` Element

The \`<form>\` container accepts several critical attributes that govern its network behavior:

\`\`\`html
<form action="/api/v1/register" method="POST" enctype="multipart/form-data" novalidate target="_self">
  <!-- Form input elements go here -->
</form>
\`\`\`

### Key Attributes:
1. **\`action="URL"\`**:
   - The destination URI where the collected form data will be transmitted.
   - If omitted or set to \`action=""\`, the form automatically submits to the **current page URL**.
2. **\`method="GET | POST"\`**:
   - The HTTP method used to dispatch the data.
   - Defaults to **\`GET\`** if omitted.
3. **\`enctype="MIME_TYPE"\`**:
   - The encoding mechanism used to serialize the form data before sending it over HTTP.
4. **\`target="_blank | _self"\`**:
   - Where to render the server's response (e.g., in a new tab or in the same window).
5. **\`novalidate\`**:
   - A boolean attribute that disables the browser's built-in HTML5 validation popups, allowing full custom validation via JavaScript.

---

## 3. Deep Dive: \`GET\` vs \`POST\` in Forms

Choosing between \`GET\` and \`POST\` is one of the most critical decisions in web development and a favorite university examination question.

\`\`\`mermaid
flowchart TD
    SUB["Form Submission Decision"]
    SUB -->|"Is data sensitive (passwords, banking) OR modifies server data?"| POST["Use method='POST'"]
    SUB -->|"Is it an idempotent search query with no side effects?"| GET["Use method='GET'"]

    POST --> P1["Data placed in HTTP Request Body"]
    POST --> P2["No length limits; Supports file uploads"]
    POST --> P3["Cannot be bookmarked or cached"]

    GET --> G1["Data appended to URL: ?query=keyword"]
    GET --> G2["Length limit (~2048 chars); No file uploads"]
    GET --> G3["Bookmarkable & cached in browser history"]
\`\`\`

### Form Submission with \`method="GET"\`
- Data is appended directly to the action URL as a **Query String**:
  \`https://www.google.com/search?q=web+technology&lang=en\`
- Characters are percent-encoded (spaces become \`+\` or \`%20\`).
- **Use Cases**: Search bars, filter controls, pagination (where bookmarking and sharing the resulting URL is desirable).
- **Security Vulnerability**: Passwords submitted via GET will appear in plain sight in browser history, web server logs, proxy caches, and shoulder-surfing. **NEVER use GET for authentication or sensitive data!**

### Form Submission with \`method="POST"\`
- Data is packaged inside the **HTTP Request Message Body**.
- The URL remains clean: \`https://example.com/login\`.
- **Use Cases**: Account registration, password changes, credit card payments, sending messages, deleting data.
- Not cached by browsers; bookmarking the URL will not re-send the payload.

---

## 4. Understanding \`enctype\` (Encoding Types)

The \`enctype\` attribute dictates how form data is encoded when using **\`method="POST"\`**. It supports three standard values:

### 1. \`application/x-www-form-urlencoded\` (The Default)
- All characters are URL-encoded: keys and values are joined with \`=\`, and pairs are separated by \`&\`.
- Example payload: \`name=Aarav+Sharma&dept=CSE&year=1\`.
- Highly efficient for short text inputs, but cannot handle binary files.

### 2. \`multipart/form-data\` (Mandatory for File Uploads)
- When a form includes an \`<input type="file">\`, you **MUST** specify \`enctype="multipart/form-data"\`.
- Instead of URL-encoding, the browser splits each form field and binary file into separate "parts" divided by a unique boundary string delimiter.
- Without this attribute, the browser sends only the filename as plain text rather than the actual file bytes!

### 3. \`text/plain\`
- Form data is sent as raw text without encoding.
- Rare and not recommended for production applications.

---

> [!IMPORTANT] **MEMORIZE:**
> - \`method="GET"\` places data in the URL query string; \`method="POST"\` places data in the HTTP body.
> - Default method is \`GET\`; default enctype is \`application/x-www-form-urlencoded\`.
> - **File uploads always require TWO things**: \`method="POST"\` and \`enctype="multipart/form-data"\`.

> [!NOTE] **DEV BRAIN:**
> If a student comes to you with a bug: *"My backend only receives the file name 'photo.jpg' instead of the uploaded image file"*, 99% of the time they forgot to add \`enctype="multipart/form-data"\` to their \`<form>\` tag!

> [!WARNING] **TRAP:**
> Never use \`GET\` for passwords, and never try to upload files with \`method="GET"\`. \`GET\` requests cannot send binary payloads in the URL.

> [!TIP] **EXAM TIP:**
> When asked to compare GET vs POST in forms, draw a clear comparison table covering: Data Location, URL Visibility, Payload Size Limit, File Upload Support, and Browser History Caching.`,
          shortNotes: "Forms submit data via GET (in URL query string) or POST (in HTTP body). File uploads strictly require method=\"POST\" and enctype=\"multipart/form-data\".",
          examples: [
            {
              title: "Complete File Upload Form with POST and Multipart Encoding",
              problem: "Write an HTML form that allows a student to enter their name, roll number, and upload their resume document to a backend server.",
              explanation: "Demonstrating method=\"POST\", enctype=\"multipart/form-data\", proper label associations, and input field types.",
              code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Student Document Upload</title>
</head>
<body>
  <h2>Student Portal: Resume Submission</h2>
  <form action="/upload-resume" method="POST" enctype="multipart/form-data">
    <div>
      <label for="fullName">Full Name:</label>
      <input type="text" id="fullName" name="fullName" required>
    </div>
    <br>
    <div>
      <label for="rollNo">Roll Number:</label>
      <input type="text" id="rollNo" name="rollNo" required>
    </div>
    <br>
    <div>
      <label for="resume">Upload Resume (PDF only):</label>
      <input type="file" id="resume" name="resumeFile" accept=".pdf" required>
    </div>
    <br>
    <button type="submit">Submit Application</button>
  </form>
</body>
</html>`,
              output: "A functional web form that packages student details and binary PDF bytes into an HTTP multipart POST request."
            }
          ],
          keyPoints: [
            "The <form> element encapsulates controls and sends user inputs to a server.",
            "The action attribute dictates the destination endpoint; method dictates the HTTP verb.",
            "GET appends form fields to the URL query string; POST carries them inside the request payload body.",
            "GET must never be used for sensitive credentials or destructive server operations.",
            "Uploading files requires method=\"POST\" and enctype=\"multipart/form-data\"."
          ],
          theoryQuestions: [
            {
              question: "Differentiate between GET and POST methods in HTML forms. When is each method preferred?",
              marks: "5 Marks",
              answer: `1. **Data Placement:** In \`method="GET"\`, form data is appended to the URL as a query string (e.g. \`?user=aarav&age=20\`). In \`method="POST"\`, data is placed inside the HTTP request body.
2. **Security:** GET exposes user data in the browser address bar, browser history, and server access logs. POST keeps data hidden from the URL.
3. **Payload Capacity:** GET is limited by maximum URL length (~2048 characters). POST has no theoretical limit, making it capable of transferring large forms and files.
4. **Caching & Bookmarking:** GET requests are cached and can be bookmarked. POST requests cannot be safely bookmarked and browsers warn upon reload.
5. **Use Cases:** Use GET for search queries and filtering. Use POST for logins, registrations, financial transactions, and uploads.`,
              keyPoints: [
                "Query string vs HTTP body.",
                "Security and visibility.",
                "Size restrictions.",
                "Caching behavior.",
                "Appropriate use cases."
              ]
            },
            {
              question: "What is the enctype attribute in an HTML form? Explain why multipart/form-data is required for file uploads.",
              marks: "5 Marks",
              answer: `1. **Definition:** The \`enctype\` (encoding type) attribute specifies how the browser converts form field data into bytes before sending it via an HTTP POST request.
2. **The Default (application/x-www-form-urlencoded):** Encodes all data as key-value pairs separated by \`&\`, converting characters into ASCII percent codes. This encoding cannot represent complex binary data like images or PDFs.
3. **Why multipart/form-data is Required:** When uploading files via \`<input type="file">\`, the browser must transmit both ASCII text (like names) and raw binary data (image/PDF bytes). \`multipart/form-data\` divides the HTTP body into distinct chunks separated by a unique delimiter boundary string. Each chunk includes its own content headers (Content-Disposition, Content-Type) and raw binary payload.`,
              keyPoints: [
                "Definition of enctype.",
                "Flaw of default urlencoded format for binaries.",
                "How multipart/form-data splits fields using boundary strings."
              ]
            },
            {
              question: "What happens when a form submission has an empty action attribute (action=\"\")?",
              marks: "2 Marks",
              answer: `When \`action=""\` or the \`action\` attribute is omitted entirely, the form submits its data back to the exact same URL of the current webpage that hosts the form.`,
              keyPoints: [
                "Submits to the current page URL.",
                "Default behavior."
              ]
            }
          ],
          mcqs: [
            {
              question: "Which method should strictly NEVER be used when submitting a form containing passwords or credit card numbers?",
              options: [
              "POST",
              "PUT",
              "GET",
              "PATCH"
              ],
              correctIndex: 2,
              explanation: "GET places submitted data in the URL query string, exposing sensitive credentials in browser history and server logs."
            },
            {
              question: "Which enctype attribute value is mandatory when uploading images or documents using <input type=\"file\">?",
              options: [
              "application/x-www-form-urlencoded",
              "multipart/form-data",
              "text/plain",
              "application/octet-stream"
              ],
              correctIndex: 1,
              explanation: "multipart/form-data allows binary files to be streamed in chunks separated by boundary delimiters."
            },
            {
              question: "What is the default HTTP submission method used by an HTML <form> if the method attribute is omitted?",
              options: [
              "POST",
              "GET",
              "PUT",
              "FETCH"
              ],
              correctIndex: 1,
              explanation: "If no method attribute is explicitly defined on the <form> tag, the browser defaults to GET."
            },
            {
              question: "Which boolean attribute prevents the browser from running its native HTML5 validation popups upon submission?",
              options: [
              "disabled",
              "autocomplete=\"off\"",
              "novalidate",
              "readonly"
              ],
              correctIndex: 2,
              explanation: "The novalidate attribute tells the browser to skip client-side HTML5 constraint checks and submit directly."
            }
          ]
        },
        {
          id: "wt-u3-t2",
          title: "HTML5 Form Input Types & Controls (text, password, email, number, date, radio, checkbox, select, textarea, submit)",
          simpleExplanation: "HTML5 introduced smart form inputs that do more than just accept typing. Setting type=\"email\" automatically validates email syntax, type=\"date\" displays a calendar picker, and type=\"number\" opens a numeric keypad on smartphones. Supporting controls like radio buttons, checkboxes, dropdowns, and textareas handle every type of user response.",
          detailedExplanation: `## 1. Evolution of Form Controls in HTML5

In legacy HTML4, developers had only one generic text input (\`<input type="text">\`). If you wanted a user to enter an email, phone number, or date, you had to write complex JavaScript code to validate the input and install third-party calendar plugins.

**HTML5 revolutionized form design** by introducing specialized input types that provide:
1. **Native Client-Side Validation**: The browser automatically rejects invalid inputs without writing a single line of JavaScript.
2. **Context-Aware Mobile Keyboards**: On smartphones, \`type="email"\` displays the \`@\` and \`.com\` keys; \`type="number"\` or \`type="tel"\` pulls up a numeric keypad.
3. **Built-in Native UI Pickers**: Native date pickers, color wheels, and sliders.

---

## 2. Comprehensive Inventory of Modern Form Controls

\`\`\`mermaid
flowchart TD
    CONTROLS["HTML Form Controls"]
    CONTROLS --> TEXT["Textual Inputs
(text, password, email, url, tel)"]
    CONTROLS --> NUM["Quantitative & Pickers
(number, range, date, time, color)"]
    CONTROLS --> SELECT["Choice Controls
(radio, checkbox, select/option)"]
    CONTROLS --> MULTI["Multi-Line & Actions
(textarea, file, submit, reset)"]
\`\`\`

### 1. Textual Controls
- **\`<input type="text">\`**: General single-line text input.
- **\`<input type="password">\`**: Masks entered characters into black dots or asterisks for privacy.
- **\`<input type="email">\`**: Verifies that the string contains an \`@\` symbol and valid domain before allowing submission.
- **\`<input type="tel">\`**: For telephone numbers; triggers a telephone dial pad on mobile devices.
- **\`<input type="url">\`**: Requires a valid protocol and domain format (e.g. \`https://...\`).

### 2. Quantitative, Date & Special Controls
- **\`<input type="number" min="1" max="100" step="5">\`**: Restricts input to numeric digits with increment/decrement steppers.
- **\`<input type="range" min="0" max="100">\`**: Visual slider bar for qualitative or bounded ranges.
- **\`<input type="date">\`**: Native drop-down calendar for year, month, and day selection.
- **\`<input type="time">\`**: Native time clock picker (HH:MM AM/PM).
- **\`<input type="color">\`**: Opens a native OS color palette picker, returning a hex color code (e.g. \`#2563eb\`).

### 3. Selection & Choice Controls
- **\`<input type="radio">\`**:
  - Used when the user must choose **exactly ONE option** from a list of mutually exclusive options.
  - **Critical Rule**: All related radio buttons must share the **EXACT SAME \`name\` attribute**!
- **\`<input type="checkbox">\`**:
  - Used for independent binary toggles (Agree to terms) or allowing users to select **MULTIPLE options** from a group.
- **\`<select>\` and \`<option>\`**:
  - Creates a compact drop-down selection menu. Can group items using \`<optgroup label="...">\`.
  - Adding the \`multiple\` attribute transforms it into a multi-select box.

### 4. Multi-Line Text & Structural Tags
- **\`<textarea rows="4" cols="50">\`**: Multi-line expandable text input for comments or descriptions. Does not use the \`value\` attribute; content is placed between opening and closing tags.
- **\`<label for="id">\`**:
  - Associates descriptive text with an input field.
  - Clicking the label automatically focuses or toggles the input (vital for checkboxes and mobile taps!).
- **\`<fieldset>\` & \`<legend>\`**:
  - Groups related fields together with a visual bordered box and title.

---

## 3. Critical Form Attributes for Validation & UX

| Attribute | Applies To | Purpose / Behavior |
| :--- | :--- | :--- |
| **\`required\`** | Most inputs | Browser prevents submission if the field is left empty |
| **\`placeholder\`** | Textual inputs | Faint instructional hint displayed when field is empty |
| **\`pattern\`** | Textual inputs | Regular expression the input must match to be valid |
| **\`min / max\`** | Number, date, range | Sets lower and upper boundaries |
| **\`minlength / maxlength\`** | Textual inputs | Restricts character count |
| **\`disabled\`** | All controls | Greys out control; field value is **NOT** submitted |
| **\`readonly\`** | Textual inputs | Prevents user editing; field value **IS** submitted |
| **\`autofocus\`** | Single input | Automatically places keyboard cursor upon page load |

---

> [!IMPORTANT] **MEMORIZE:**
> - Radio buttons require the **SAME \`name\`** attribute to form a mutually exclusive group!
> - The \`<label for="inputId">\` attribute must match the input's \`id="..."\` attribute.
> - \`disabled\` fields are **not** sent to the server; \`readonly\` fields **are** sent.
> - \`<textarea>\` does NOT use a \`value\` attribute; its content is placed between \`<textarea>...</textarea>\`.

> [!NOTE] **DEV BRAIN:**
> Always wrap inputs in a \`<label>\` or connect them with \`for\` and \`id\`. If you don't, mobile users will have a terrible time tapping tiny radio buttons, and screen readers will announce *"edit text"* without telling the blind user what to type!

> [!WARNING] **TRAP:**
> If you give different \`name\` attributes to radio buttons (e.g. \`name="gender1"\` and \`name="gender2"\`), the user will be able to select both at the same time, defeating the entire purpose of a radio button!

> [!TIP] **EXAM TIP:**
> When asked to design a student registration form in an exam, include: \`text\` (name), \`email\`, \`password\`, \`radio\` (gender), \`checkbox\` (interests), \`date\` (DOB), \`select\` (branch), \`textarea\` (address), and \`submit\` button.`,
          shortNotes: "HTML5 inputs (email, number, date, radio, checkbox, textarea, select) provide built-in validation and mobile keyboards. Group radio buttons using the same name attribute.",
          examples: [
            {
              title: "Comprehensive University Admission Registration Form",
              problem: "Construct a complete admission registration form featuring text, email, password, radio buttons, checkboxes, select dropdown, textarea, and validation attributes.",
              explanation: "Demonstrating label pairing, fieldsets, required attributes, min/max limits, and semantic form grouping.",
              code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>University Admission Form</title>
</head>
<body>
  <h2>ITM University - Student Registration</h2>
  <form action="/submit-registration" method="POST">
    <fieldset>
      <legend>Personal Information</legend>

      <p>
        <label for="fullName">Full Name:</label>
        <input type="text" id="fullName" name="fullName" placeholder="e.g. Aarav Sharma" required minlength="3">
      </p>

      <p>
        <label for="email">College Email:</label>
        <input type="email" id="email" name="email" placeholder="name@itmuniversity.ac.in" required>
      </p>

      <p>
        <label for="dob">Date of Birth:</label>
        <input type="date" id="dob" name="dob" required>
      </p>

      <p>
        <span>Gender:</span>
        <!-- Note: Same name="gender" forms the radio group -->
        <input type="radio" id="male" name="gender" value="male" required>
        <label for="male">Male</label>
        <input type="radio" id="female" name="gender" value="female">
        <label for="female">Female</label>
        <input type="radio" id="other" name="gender" value="other">
        <label for="other">Other</label>
      </p>
    </fieldset>

    <fieldset>
      <legend>Academic Preferences</legend>

      <p>
        <label for="course">Select Degree:</label>
        <select id="course" name="course" required>
          <option value="">-- Choose a Program --</option>
          <option value="btech_cse">B.Tech Computer Science</option>
          <option value="bca">Bachelor of Computer Applications</option>
          <option value="mca">Master of Computer Applications</option>
        </select>
      </p>

      <p>
        <label for="address">Permanent Address:</label><br>
        <textarea id="address" name="address" rows="3" cols="40" placeholder="Street, City, Pincode"></textarea>
      </p>

      <p>
        <input type="checkbox" id="terms" name="terms" required>
        <label for="terms">I declare all information provided is true and accurate</label>
      </p>
    </fieldset>

    <br>
    <button type="submit">Submit Registration</button>
    <button type="reset">Reset Form</button>
  </form>
</body>
</html>`,
              output: "A fully validated HTML5 registration form with grouped fieldsets, radio selection, and dropdowns."
            }
          ],
          keyPoints: [
            "HTML5 inputs provide native client-side validation and context-specific mobile keyboards.",
            "Radio buttons require identical name attributes to enforce mutually exclusive single selection.",
            "Checkboxes allow zero, one, or multiple independent selections.",
            "The <label for=\"id\"> tag binds text to inputs, significantly improving accessibility and click target size.",
            "Disabled inputs are omitted from submission payloads; readonly inputs are included."
          ],
          theoryQuestions: [
            {
              question: "Explain any five HTML5 input types with their syntax, validation rules, and mobile user experience benefits.",
              marks: "5 Marks",
              answer: `1. **type="email":** Validates that input conforms to an email format (containing \`@\` and domain). On mobile devices, it displays a specialized keyboard featuring the \`@\` symbol and \`.com\`.
2. **type="number":** Restricts input to numeric characters and supports \`min\`, \`max\`, and \`step\` attributes. Triggers a numeric keypad on mobile.
3. **type="date":** Invokes a native browser calendar picker, preventing invalid date formatting issues across different international locales.
4. **type="password":** Masks entered text characters into bullets to prevent onlookers from viewing credentials.
5. **type="range":** Presents an accessible slider control for selecting a quantitative value within bounded limits (\`min\` and \`max\`).`,
              keyPoints: [
                "Five distinct types.",
                "Validation rules.",
                "Mobile keyboard optimization."
              ]
            },
            {
              question: "Differentiate between Radio Buttons and Checkboxes in HTML forms. Write code demonstrating both.",
              marks: "5 Marks",
              answer: `1. **Radio Buttons (\`<input type="radio">\`):** Used when the user must select exactly ONE option from a group of mutually exclusive choices. All buttons in the set must share the identical \`name\` attribute.
\`\`\`html
<input type="radio" name="plan" value="basic" id="b"><label for="b">Basic</label>
<input type="radio" name="plan" value="pro" id="p"><label for="p">Pro</label>
\`\`\`
2. **Checkboxes (\`<input type="checkbox">\`):** Used for independent binary decisions (agreeing to terms) or allowing users to select multiple options simultaneously. Each checkbox operates independently, even if they share a common name for array processing.
\`\`\`html
<input type="checkbox" name="skills" value="html" id="h"><label for="h">HTML</label>
<input type="checkbox" name="skills" value="css" id="c"><label for="c">CSS</label>
\`\`\``,
              keyPoints: [
                "Mutually exclusive vs multi-selection.",
                "Role of identical name attribute in radio buttons.",
                "Code demonstrations."
              ]
            },
            {
              question: "What is the role of the <label> element and the \"for\" attribute in web accessibility and user experience?",
              marks: "3 Marks",
              answer: `The \`<label>\` element provides a programmatic text caption for an input control.
1. **Accessibility:** Screen readers announce the label text when the input field receives focus, ensuring visually impaired users know what data is requested.
2. **Usability (Click Target):** Setting \`<label for="elementId">\` links the label to the input with matching \`id\`. When a user clicks or taps anywhere on the label text, the associated input control is automatically focused or checked, greatly expanding the hit area on mobile screens.`,
              keyPoints: [
                "Screen reader announcement.",
                "Expanding clickable touch target.",
                "Linking via for and id."
              ]
            }
          ],
          mcqs: [
            {
              question: "How do you ensure that only one radio button in a group can be selected at a time?",
              options: [
              "By assigning them the same id attribute",
              "By assigning them the same name attribute",
              "By wrapping them inside a <div>",
              "By adding the single=\"true\" attribute"
              ],
              correctIndex: 1,
              explanation: "Radio buttons that share the exact same name attribute form a mutually exclusive group where selecting one unchecks all others."
            },
            {
              question: "Which HTML form attribute prevents user modification while still submitting the field value to the server?",
              options: [
              "disabled",
              "readonly",
              "hidden",
              "novalidate"
              ],
              correctIndex: 1,
              explanation: "readonly fields cannot be edited by the user, but their values are still submitted with the form. disabled fields are not submitted."
            },
            {
              question: "How is default text placed inside a multi-line <textarea> element?",
              options: [
              "Using the value=\"Default text\" attribute",
              "Between the opening <textarea> and closing </textarea> tags",
              "Using the placeholder attribute only",
              "Using the content attribute"
              ],
              correctIndex: 1,
              explanation: "<textarea> does not use a value attribute; initial text must be placed between the opening and closing tags."
            },
            {
              question: "Which HTML5 input type automatically restricts input to numeric digits and opens a numeric keypad on mobile devices?",
              options: [
              "type=\"digit\"",
              "type=\"number\"",
              "type=\"integer\"",
              "type=\"numeric\""
              ],
              correctIndex: 1,
              explanation: "<input type=\"number\"> restricts input to valid numbers and invokes the numeric keyboard on mobile devices."
            }
          ]
        },
        {
          id: "wt-u3-t3",
          title: "Multimedia & Embedded Content: <audio>, <video> with native controls, <iframe>, and <canvas> introduction",
          simpleExplanation: "Before HTML5, playing audio or video required buggy third-party plugins like Adobe Flash. HTML5 introduced native <audio> and <video> tags that stream media smoothly with built-in controls. Meanwhile, <iframe> embeds external content like YouTube videos or Google Maps, and <canvas> provides a 2D drawing surface for animations and games powered by JavaScript.",
          detailedExplanation: `## 1. The Death of Flash and Rise of Native HTML5 Media

In the early decades of the World Wide Web, web browsers had no native ability to stream sound or video. To watch a video or play an interactive animation, users had to install third-party browser plugins like **Adobe Flash Player**, Microsoft Silverlight, or Apple QuickTime.

These plugins were notorious for:
- Severe security exploits and malware vulnerabilities.
- Battery drain and browser crashes.
- Complete incompatibility with smartphones (spearheaded by Steve Jobs' famous 2010 essay *"Thoughts on Flash"*).

HTML5 permanently replaced plugins by integrating multimedia as **first-class citizens** directly into the DOM via the \`<video>\`, \`<audio>\`, and \`<canvas>\` elements.

---

## 2. The HTML5 \`<video>\` Element

The \`<video>\` tag allows native video playback inside modern browsers without external software.

\`\`\`html
<video width="640" height="360" controls poster="thumbnail.jpg" preload="metadata">
  <source src="lecture.mp4" type="video/mp4">
  <source src="lecture.webm" type="video/webm">
  <track kind="subtitles" src="subtitles_en.vtt" srclang="en" label="English">
  <p>Your browser does not support HTML5 video. <a href="lecture.mp4">Download video instead</a>.</p>
</video>
\`\`\`

\`\`\`mermaid
flowchart TD
    V["&lt;video&gt; Element"]
    V --> S1["&lt;source src='video.mp4' type='video/mp4'&gt; (H.264 - Universal)"]
    V --> S2["&lt;source src='video.webm' type='video/webm'&gt; (VP9 - Open Source)"]
    V --> TRK["&lt;track src='subtitles.vtt'&gt; (Captions / a11y)"]
    V --> FB["Fallback HTML (Shown only if HTML5 video is unsupported)"]
\`\`\`

### Key Video Attributes:
- **\`controls\`**: Displays native browser UI controls (play/pause button, seeker bar, volume, fullscreen).
- **\`autoplay\`**: Starts playback automatically upon page load. (Modern browsers block autoplay with sound; it must be paired with \`muted\`).
- **\`muted\`**: Mutes audio by default.
- **\`loop\`**: Automatically restarts video playback from the beginning when it finishes.
- **\`poster="image.jpg"\`**: Displays a still image placeholder before the video is played.
- **\`preload\`**: Hints to the browser how to load media: \`none\` (do not preload), \`metadata\` (fetch duration/dimensions only), or \`auto\` (preload entire video).
- **\`<source>\` Multi-Codec Strategy**: Browsers try sources from top to bottom and play the first format they support (MP4 is universally supported; WebM provides higher compression).

---

## 3. The HTML5 \`<audio>\` Element

Similar to video, the \`<audio>\` element handles sound files, podcasts, and music streams:

\`\`\`html
<audio controls preload="auto">
  <source src="lecture.mp3" type="audio/mpeg">
  <source src="lecture.ogg" type="audio/ogg">
  Your browser does not support the audio element.
</audio>
\`\`\`

Supported Audio Codecs:
- **MP3 (\`audio/mpeg\`)**: Universally supported across all browsers.
- **WAV (\`audio/wav\`)**: Uncompressed, high-fidelity, large file sizes.
- **Ogg Vorbis (\`audio/ogg\`)**: Open-source alternative with high compression efficiency.

---

## 4. The \`<iframe>\` (Inline Frame) Element

An **Inline Frame (\`<iframe>\`)** embeds another independent HTML document inside the current webpage.

\`\`\`html
<iframe 
  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
  width="560" 
  height="315" 
  title="Educational Lecture Video"
  loading="lazy"
  allowfullscreen
  sandbox="allow-scripts allow-same-origin">
</iframe>
\`\`\`

### Common Use Cases:
- Embedding YouTube or Vimeo videos.
- Embedding interactive Google Maps.
- Embedding third-party payment gateways (Stripe, Razorpay) to isolate sensitive card inputs.

### Security Risks & The \`sandbox\` Attribute:
If you embed an external site via an iframe, that page could theoretically run malicious scripts, steal cookies, or trick the user.
The **\`sandbox\`** attribute applies strict security restrictions:
- \`sandbox\` (empty): Enables maximum lockdown (disables JavaScript, form submissions, popups, and access to the parent DOM).
- \`sandbox="allow-scripts"\`: Re-enables JavaScript execution inside the iframe.
- \`sandbox="allow-forms"\`: Re-enables form submission inside the iframe.
- \`sandbox="allow-same-origin"\`: Allows the iframe document to access its own cookies.

---

## 5. Introduction to the \`<canvas>\` Element

The \`<canvas>\` element provides an empty rectangular resolution-dependent bitmap canvas on which JavaScript can programmatically draw 2D and 3D shapes, charts, graphs, and game sprites.

- The HTML defines only the dimensions: \`<canvas id="gameCanvas" width="400" height="200"></canvas>\`.
- All drawing is performed via the JavaScript **Canvas 2D Context API**:
  \`\`\`javascript
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#2563eb';
  ctx.fillRect(20, 20, 150, 100); // Draws a blue rectangle at (20,20)
  \`\`\`

### Canvas vs SVG (Scalable Vector Graphics):
- **Canvas**: Pixel/Bitmap based (Raster). Fast for thousands of moving game objects; loses sharpness when scaled up.
- **SVG**: XML/Math based (Vector). Infinitely scalable with zero pixelation; elements live in the DOM tree.

---

> [!IMPORTANT] **MEMORIZE:**
> - \`<video>\` and \`<audio>\` provide native media playback without plugins.
> - Always include the \`controls\` attribute so users can pause or adjust volume.
> - \`<iframe>\` embeds another webpage; use \`sandbox\` to protect against malicious third-party scripts.
> - \`<canvas>\` is a pixel bitmap drawn dynamically via JavaScript.

> [!NOTE] **DEV BRAIN:**
> Always add \`loading="lazy"\` to your \`<iframe>\` elements! If your page has 5 embedded YouTube videos or Google Maps, lazy loading stops them from downloading until the user actually scrolls down to them, saving megabytes of bandwidth.

> [!WARNING] **TRAP:**
> Modern web browsers will automatically **block video autoplay** if the audio is enabled. If you want a video to autoplay on landing, you MUST add both attributes: \`autoplay muted\`!

> [!TIP] **EXAM TIP:**
> In exams, when asked about multimedia, draw the multi-source fallback structure of \`<video>\` with \`<source>\` tags and explain why having both MP4 and WebM is best practice.`,
          shortNotes: "<video> and <audio> provide plugin-free media playback. Use <source> for codec fallbacks. <iframe> embeds external pages (use sandbox for security); <canvas> draws 2D graphics via JS.",
          examples: [
            {
              title: "HTML5 Video Player with Fallbacks and Embedded Map Frame",
              problem: "Write HTML code showing a native video player with multi-codec fallbacks and a sandboxed embedded map.",
              explanation: "Demonstrates video controls, source MIME types, track captions, and iframe security.",
              code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Multimedia Demonstration</title>
</head>
<body>
  <h2>Department Lecture Video</h2>
  <!-- Native HTML5 Video Player -->
  <video width="640" height="360" controls poster="cover.jpg">
    <source src="lecture.mp4" type="video/mp4">
    <source src="lecture.webm" type="video/webm">
    <p>Your browser does not support HTML5 video.</p>
  </video>

  <h2>Campus Location</h2>
  <!-- Sandboxed Embedded Google Map -->
  <iframe
    src="https://maps.google.com/maps?q=vadodara&t=&z=13&ie=UTF8&iwloc=&output=embed"
    width="600"
    height="300"
    title="ITM Campus Map"
    loading="lazy"
    sandbox="allow-scripts allow-same-origin">
  </iframe>
</body>
</html>`,
              output: "Renders an interactive native video player alongside a responsive embedded map frame."
            }
          ],
          keyPoints: [
            "HTML5 eliminated third-party plugins (like Flash) by providing native <video> and <audio> elements.",
            "The <source> element allows specifying multiple video/audio formats for cross-browser fallback.",
            "Modern browsers require the muted attribute alongside autoplay for automatic video playback.",
            "The <iframe> element embeds external web documents and can be restricted using the sandbox attribute.",
            "The <canvas> element provides a programmable pixel bitmap canvas manipulated through JavaScript 2D/WebGL APIs."
          ],
          theoryQuestions: [
            {
              question: "Explain the attributes and fallback structure of the HTML5 <video> element. Why are multiple <source> tags recommended?",
              marks: "5 Marks",
              answer: `1. **Core Video Attributes:**
   - \`controls\`: Displays native browser playback controls (play, pause, volume, seeker).
   - \`poster="img.jpg"\`: Displays a thumbnail image before playback begins.
   - \`autoplay\` and \`muted\`: Autoplays video (muted is required by modern browser autoplay policies).
   - \`loop\`: Automatically repeats playback.
2. **Multi-Source Fallback Structure:** Different web browsers historically supported different video codecs. By listing multiple \`<source>\` tags inside the \`<video>\` container (e.g. \`type="video/mp4"\` with H.264, and \`type="video/webm"\` with VP9), the browser iterates sequentially through the list and plays the first codec it natively supports. If none are supported, the inner fallback HTML paragraph is shown.`,
              keyPoints: [
                "Video attributes (controls, poster, muted, autoplay).",
                "Multi-source codec fallback mechanism.",
                "Cross-browser compatibility."
              ]
            },
            {
              question: "What is an <iframe>? What security vulnerabilities does it introduce, and how does the sandbox attribute mitigate them?",
              marks: "5 Marks",
              answer: `1. **Definition:** An \`<iframe>\` (Inline Frame) embeds an external HTML document inside the current webpage.
2. **Security Vulnerabilities:** Untrusted external websites embedded in an iframe can execute malicious JavaScript, launch phishing popups, attempt clickjacking attacks, or steal sensitive data from the parent window if same-origin policies are not enforced.
3. **The \`sandbox\` Attribute:** Adding \`sandbox\` puts the iframe into an ultra-restricted mode that disables scripts, blocks form submissions, prohibits popup windows, and treats the content as being from an entirely unique origin. Permissions can be selectively re-enabled as needed (e.g. \`sandbox="allow-scripts allow-forms"\`).`,
              keyPoints: [
                "Definition and embedding use cases.",
                "Security risks (scripts, phishing, clickjacking).",
                "How sandbox enforces lockdown and selective permission re-granting."
              ]
            },
            {
              question: "Differentiate between HTML5 <canvas> and Scalable Vector Graphics (SVG).",
              marks: "3 Marks",
              answer: `1. **<canvas>:** Raster / pixel-based bitmap drawn procedurally via JavaScript. Does not create DOM nodes for drawn shapes. High performance for games and thousands of animated particles, but loses resolution when scaled.
2. **SVG:** Vector-based graphics defined using XML markup tags (\`<circle>\`, \`<rect>\`). Every SVG element is a real node in the DOM tree, supports CSS styling and click events, and scales infinitely without pixelation.`,
              keyPoints: [
                "Raster (pixel) vs Vector (XML).",
                "JavaScript procedural drawing vs DOM nodes.",
                "Scalability difference."
              ]
            }
          ],
          mcqs: [
            {
              question: "Why must the \"muted\" attribute be included alongside \"autoplay\" in modern HTML5 video elements?",
              options: [
              "Because videos without sound consume less bandwidth",
              "Modern browsers block autoplay with sound to prevent disruptive user experiences",
              "The HTML5 validator will throw a fatal error",
              "To enable subtitle track rendering"
              ],
              correctIndex: 1,
              explanation: "Modern browser security policies strictly block autoplaying media with sound to protect users from unexpected noise."
            },
            {
              question: "Which HTML attribute provides strong security sandboxing by restricting JavaScript and form submissions inside an <iframe>?",
              options: [
              "secure",
              "isolated",
              "sandbox",
              "crossorigin"
              ],
              correctIndex: 2,
              explanation: "The sandbox attribute restricts scripts, form submission, and external navigation inside an iframe."
            },
            {
              question: "Which element is used to draw dynamic 2D shapes, animations, and game graphics programmatically via JavaScript?",
              options: [
              "<graphics>",
              "<video>",
              "<canvas>",
              "<picture>"
              ],
              correctIndex: 2,
              explanation: "<canvas> provides a scriptable 2D pixel bitmap surface manipulated via JavaScript context APIs."
            },
            {
              question: "Which element should be placed inside <video> or <audio> to supply captions or subtitles for accessibility?",
              options: [
              "<caption>",
              "<track>",
              "<label>",
              "<subtitle>"
              ],
              correctIndex: 1,
              explanation: "<track> specifies timed text tracks (subtitles, captions, descriptions) using WebVTT format."
            }
          ]
        }
      ]
    },
    {
      id: "wt-u4",
      title: "Unit 4: CSS3 Styling, Box Model & Modern Flexbox",
      description: "Cascading Style Sheets architecture, selector specificity hierarchy, the CSS Box Model calculations, positioning schemes, stacking contexts, and modern 1-dimensional Flexbox layout design.",
      topics: [
        {
          id: "wt-u4-t1",
          title: "CSS Inclusion (Inline, Internal, External) & Selector Types (Element, Class, ID, Grouping, Pseudo-classes :hover, :focus)",
          simpleExplanation: "CSS (Cascading Style Sheets) gives visual style, colors, fonts, and layout to plain HTML. You can attach CSS in three ways: right on the tag (inline), inside a <style> block in the head (internal), or in a separate .css file (external, which is best practice). Selectors tell the browser exactly which HTML elements you want to style.",
          detailedExplanation: `## 1. Introduction: The Presentation Layer of the Web

HTML provides the raw skeleton of a webpage, but **CSS (Cascading Style Sheets)** provides the presentation layer—typography, color schemes, spacing, responsive layouts, and visual transitions.

The word **"Cascading"** is the fundamental principle of CSS: when multiple conflicting style rules target the same HTML element, the browser resolves the conflict using a strict hierarchy of **Specificity**, **Inheritance**, and **Source Order**.

---

## 2. The Three Methods of Including CSS

\`\`\`mermaid
flowchart TD
    CSS_METHODS["CSS Inclusion Strategies"]
    CSS_METHODS --> INLINE["1. Inline CSS
(style attribute on HTML tag)
Priority: Very High (1000)
Maintainability: Terrible"]
    CSS_METHODS --> INTERNAL["2. Internal / Embedded CSS
(&lt;style&gt; tag in &lt;head&gt;)
Priority: Moderate (10)
Scope: Single Document"]
    CSS_METHODS --> EXTERNAL["3. External CSS
(&lt;link rel='stylesheet' href='...'&gt;)
Priority: Standard (10)
Industry Best Practice"]
\`\`\`

### 1. Inline CSS
- Written directly inside the HTML element using the \`style\` attribute.
- Example: \`<h1 style="color: #2563eb; font-size: 24px;">Hello</h1>\`
- **Disadvantages**: Violates the fundamental separation of concerns (mixing structure and styling), duplicates code across pages, bloats HTML file size, and makes site-wide redesigns an administrative nightmare.

### 2. Internal (Embedded) CSS
- Written inside a \`<style>\` element placed inside the document's \`<head>\`.
- Example:
  \`\`\`html
  <head>
    <style>
      body { background-color: #f8fafc; }
      p { color: #334155; line-height: 1.6; }
    </style>
  </head>
  \`\`\`
- **Use Cases**: Useful for single, standalone web pages, email newsletters, or rapid prototyping.

### 3. External CSS (The Golden Industry Standard)
- Written in a dedicated \`.css\` file (e.g., \`styles.css\`) and linked inside the HTML \`<head>\` using the \`<link>\` tag:
  \`\`\`html
  <link rel="stylesheet" href="styles.css">
  \`\`\`
- **Advantages**:
  1. **Complete Separation of Concerns**: HTML handles content; CSS handles presentation.
  2. **Site-Wide Reusability**: A single CSS file styles hundreds of pages across an entire domain.
  3. **Browser Caching**: Browsers cache the \`.css\` file after the first page load, dramatically accelerating subsequent page loads.

---

## 3. Core CSS Selector Types

A CSS selector targets specific nodes in the DOM tree:

| Selector Type | Syntax | Specificity | Example | Matches |
| :--- | :--- | :--- | :--- | :--- |
| **Universal** | \`*\` | 0 | \`* { margin: 0; }\` | Every element in the DOM |
| **Element / Type** | \`tag\` | 1 | \`p { color: blue; }\` | All \`<p>\` elements |
| **Class** | \`.className\` | 10 | \`.card { padding: 16px; }\` | Any element with \`class="card"\` |
| **ID** | \`#idName\` | 100 | \`#nav { height: 60px; }\` | The single element with \`id="nav"\` |
| **Grouping** | \`s1, s2\` | Matches each | \`h1, h2, h3 { font-family: sans-serif; }\` | All h1, h2, AND h3 elements |
| **Descendant** | \`A B\` | Sum of parts | \`.nav a { color: white; }\` | Any \`<a>\` nested anywhere inside \`.nav\` |
| **Child (Direct)** | \`A > B\` | Sum of parts | \`ul > li { list-style: square; }\` | Only \`<li>\` that are immediate children of \`<ul>\` |

---

## 4. Pseudo-Classes: Styling Interactive States

A **Pseudo-class** is a keyword added to a selector that specifies a special temporary state of the targeted element:

- **\`:hover\`**: Applied when the user hovers over an element with a pointing device (mouse pointer).
  \`\`\`css
  .button:hover { background-color: #1d4ed8; cursor: pointer; }
  \`\`\`
- **\`:focus\`**: Applied when an element gains keyboard or touch focus (crucial for accessibility on text inputs).
  \`\`\`css
  input:focus { outline: 2px solid #2563eb; border-color: transparent; }
  \`\`\`
- **\`:active\`**: Applied during the physical mouse-down / click duration.
- **\`:nth-child(n)\`**: Matches elements based on their numerical index among siblings (e.g., \`tr:nth-child(even)\` for zebra tables).
- **\`:visited\`**: Styles links that the user has already clicked.

---

## 5. The CSS Specificity Hierarchy

When conflicting rules target the same element, the browser calculates a **4-part Specificity Score \`(a, b, c, d)\`**:

1. **\`a\` = Inline Styles**: Defined in HTML \`style="..."\` (Score: \`1,0,0,0\`).
2. **\`b\` = IDs**: Count of \`#id\` selectors (Score: \`0,1,0,0\`).
3. **\`c\` = Classes, Pseudo-classes, Attributes**: Count of \`.class\`, \`:hover\`, \`[type="text"]\` (Score: \`0,0,1,0\`).
4. **\`d\` = Elements & Pseudo-elements**: Count of \`p\`, \`div\`, \`::before\` (Score: \`0,0,0,1\`).

> [!WARNING] **The \`!important\` Nuclear Option**:
> Adding \`!important\` to a CSS rule (e.g. \`color: red !important;\`) overrides all specificity calculations. Overusing \`!important\` creates unmaintainable spaghetti stylesheets and is considered an amateur code smell.

---

> [!IMPORTANT] **MEMORIZE:**
> - Specificity hierarchy: **Inline (1000) > ID (100) > Class (10) > Element (1)**.
> - External CSS via \`<link>\` is the standard for modern web architecture.
> - \`:hover\` triggers on cursor mouse-over; \`:focus\` triggers on input keyboard focus.
> - Commas group selectors (\`h1, h2\`); spaces mean descendant (\`div p\`).

> [!NOTE] **DEV BRAIN:**
> Never use IDs for CSS styling! While \`#header\` is valid, its high specificity score of 100 makes it very hard to override later. Professional frontend engineers style almost exclusively using classes (\`.header\`).

> [!WARNING] **TRAP:**
> Don't confuse **pseudo-classes** (\`:hover\`, \`:focus\`, \`:first-child\`) with **pseudo-elements** (\`::before\`, \`::after\`, \`::placeholder\`). Pseudo-classes represent states (one colon); pseudo-elements represent virtual sub-parts of the DOM (two colons).

> [!TIP] **EXAM TIP:**
> Practice calculating specificity scores in exams!
> - \`p\` = 0,0,0,1
> - \`.btn\` = 0,0,1,0
> - \`div.container p\` = 0,0,1,2
> - \`#main .card p:hover\` = 0,1,2,1`,
          shortNotes: "CSS can be Inline, Internal, or External (best practice). Selectors target DOM nodes; specificity order: Inline (1000) > ID (100) > Class (10) > Element (1). Pseudo-classes handle states (:hover, :focus).",
          examples: [
            {
              title: "Demonstrating Selectors, Specificity and Pseudo-Classes",
              problem: "Write CSS demonstrating class selectors, child combinators, hover effects, and focus rings on an interactive card.",
              explanation: "Demonstrates clear separation of concerns, pseudo-classes, and clean visual styling.",
              code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSS Selectors Demo</title>
  <style>
    /* 1. Element Selector */
    body { font-family: system-ui, sans-serif; padding: 2rem; background: #f1f5f9; }

    /* 2. Class Selector */
    .card {
      background: white;
      border-radius: 8px;
      padding: 24px;
      max-width: 320px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    /* 3. Pseudo-class :hover on Container */
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    }

    /* 4. Child Combinator */
    .card > h2 { color: #0f172a; margin-top: 0; }

    /* 5. Pseudo-class :focus on Interactive Input */
    .search-input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      box-sizing: border-box;
    }
    .search-input:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
    }
  </style>
</head>
<body>
  <div class="card">
    <h2>Interactive Card</h2>
    <p>Hover over this card or click inside the input field below.</p>
    <input type="text" class="search-input" placeholder="Type here...">
  </div>
</body>
</html>`,
              output: "A card that smoothly elevates on hover and an input field that glows blue when focused."
            }
          ],
          keyPoints: [
            "CSS controls layout, formatting, typography, and presentation across the web.",
            "External CSS linked via <link> is superior because it enables browser caching and site-wide reusability.",
            "Specificity determines which conflicting style rule applies: Inline (1000) > ID (100) > Class (10) > Element (1).",
            "Pseudo-classes like :hover and :focus style elements during user interaction.",
            "The !important rule overrides standard specificity and should be used sparingly."
          ],
          theoryQuestions: [
            {
              question: "Compare Inline, Internal, and External CSS with respect to syntax, advantages, disadvantages, and ideal use cases.",
              marks: "5 Marks",
              answer: `1. **Inline CSS:** Applied directly to an element via \`style="color: red;"\`. Advantage: Highest specificity without !important, useful for quick debugging or dynamic styling via JS. Disadvantage: Mixes structure with design, cannot be cached, high maintenance.
2. **Internal CSS:** Defined inside a \`<style>\` block within the document \`<head>\`. Advantage: Styles a single standalone document without external HTTP requests. Disadvantage: Cannot be shared across multiple pages.
3. **External CSS:** Defined in a \`.css\` file linked via \`<link rel="stylesheet" href="style.css">\`. Advantage: Industry standard, clean separation of concerns, single file styles entire website, cached by browser for faster loads. Disadvantage: Requires an additional HTTP request on initial page load.`,
              keyPoints: [
                "Syntax for all three.",
                "Advantages and disadvantages of each.",
                "Browser caching advantage of external CSS."
              ]
            },
            {
              question: "Explain CSS Specificity. Calculate and compare the specificity score of the following four CSS selectors.",
              marks: "5 Marks",
              answer: `CSS Specificity is the algorithm browsers use to determine which CSS rule applies to an element when multiple conflicting rules match.
It is calculated as a 4-tuple \`(a, b, c, d)\`:
- \`a\`: Inline styles (1,0,0,0)
- \`b\`: ID selectors (0,1,0,0)
- \`c\`: Class, pseudo-class, and attribute selectors (0,0,1,0)
- \`d\`: Element and pseudo-element selectors (0,0,0,1)

**Selector Calculations:**
1. \`p\` = 1 element -> **(0, 0, 0, 1)**
2. \`.navbar .nav-link\` = 2 classes -> **(0, 0, 2, 0)**
3. \`#sidebar div.widget p\` = 1 ID, 1 class, 2 elements -> **(0, 1, 1, 2)**
4. \`body #main .card:hover a\` = 1 ID, 1 class, 1 pseudo-class, 2 elements -> **(0, 1, 2, 2)** (Wins highest priority).`,
              keyPoints: [
                "Definition of 4-tuple specificity formula.",
                "Scoring rules for inline, ID, class, and element.",
                "Step-by-step calculation of examples."
              ]
            },
            {
              question: "What are pseudo-classes in CSS? Explain :hover, :focus, and :nth-child() with practical examples.",
              marks: "5 Marks",
              answer: `A pseudo-class is a keyword prefixed with a single colon (\`:\`) added to a CSS selector that targets an element only when it is in a specific interactive or positional state.
1. **\`:hover\`:** Activates when the user points to an element with a mouse. Example: \`a:hover { text-decoration: underline; }\`.
2. **\`:focus\`:** Activates when an input element is selected via keyboard tab or mouse click. Example: \`input:focus { border: 2px solid blue; }\`.
3. **\`:nth-child(n)\`:** Targets elements based on their numeric sibling index. Example: \`li:nth-child(2)\` targets the second list item; \`tr:nth-child(even)\` creates alternating zebra stripes in tables.`,
              keyPoints: [
                "Definition of state-based pseudo-classes.",
                "Explanation and code for :hover, :focus, :nth-child()."
              ]
            }
          ],
          mcqs: [
            {
              question: "Which method of including CSS enables web browser caching and provides site-wide design consistency?",
              options: [
              "Inline CSS",
              "Internal CSS in <head>",
              "External CSS linked via <link>",
              "Imported CSS via JavaScript eval"
              ],
              correctIndex: 2,
              explanation: "External stylesheets are saved in the browser cache, ensuring fast loading across all linked pages."
            },
            {
              question: "Which selector carries the HIGHEST specificity score among the following?",
              options: [
              "div.container p",
              "#main-header",
              ".nav-item:hover",
              "header nav ul li a"
              ],
              correctIndex: 1,
              explanation: "#main-header has an ID selector with a specificity score of 0,1,0,0 (100), beating classes (10) and elements (1)."
            },
            {
              question: "Which pseudo-class is applied when an input element receives keyboard focus or mouse selection?",
              options: [
              ":active",
              ":target",
              ":focus",
              ":hover"
              ],
              correctIndex: 2,
              explanation: ":focus styles an interactive element when it is actively ready to accept keyboard or touch input."
            },
            {
              question: "What does the CSS child combinator selector \"div > p\" target?",
              options: [
              "All <p> elements nested anywhere inside a <div>",
              "Only <p> elements that are direct immediate children of a <div>",
              "The first <div> that follows a <p>",
              "All <div> elements containing text"
              ],
              correctIndex: 1,
              explanation: "The child combinator (>) strictly targets direct immediate children, unlike the descendant space selector."
            }
          ]
        },
        {
          id: "wt-u4-t2",
          title: "The CSS Box Model: Content, Padding, Border, Margin & box-sizing: border-box vs content-box",
          simpleExplanation: "In CSS, every single element is a rectangular box. That box has four layers: the Content in the middle, Padding (cushion inside), Border (the outline), and Margin (empty space outside that pushes other elements away). Changing box-sizing to border-box keeps your defined width exact, so padding does not accidentally expand your layout.",
          detailedExplanation: `## 1. Introduction: The Universal Rectangular Box

In CSS, the browser treats every single HTML element—from a heading \`<h1>\` to an image \`<img>\` to a \`<div>\`—as a rectangular box.

The **CSS Box Model** is the core geometric framework that dictates how an element's width, height, internal spacing, borders, and external margins interact to determine the total space that element occupies on the screen.

\`\`\`
+-------------------------------------------------------+
|                    MARGIN (Outer)                     |
|  +-------------------------------------------------+  |
|  |                 BORDER (Stroke)                 |  |
|  |  +-------------------------------------------+  |  |
|  |  |              PADDING (Cushion)            |  |  |
|  |  |  +-------------------------------------+  |  |  |
|  |  |  |           CONTENT AREA              |  |  |  |
|  |  |  |      (Text, Images, Children)       |  |  |  |
|  |  |  |             Width x Height          |  |  |  |
|  |  |  +-------------------------------------+  |  |  |
|  |  +-------------------------------------------+  |  |
|  +-------------------------------------------------+  |
+-------------------------------------------------------+
\`\`\`

---

## 2. The Four Concentric Box Layers

Starting from the center and moving outward:

### 1. Content Area
- The actual payload where text, images, or nested elements render.
- Sized explicitly via CSS \`width\` and \`height\`.

### 2. Padding (Internal Cushion)
- The transparent spacing between the content and the border.
- **Rule**: Padding adopts the **background color or background image** of the element!
- Shorthand syntax:
  - \`padding: 10px;\` (All 4 sides)
  - \`padding: 10px 20px;\` (Top/Bottom, Left/Right)
  - \`padding: 10px 20px 15px 5px;\` (Top, Right, Bottom, Left — Clockwise!)

### 3. Border
- The decorative line wrapping around the padding and content.
- Sized via \`border: 2px solid #2563eb;\`.

### 4. Margin (External Separation)
- The completely transparent buffer zone outside the border that pushes adjacent neighboring elements away.
- Margins do **not** take on the element's background color; they show the parent container's background.
- \`margin: 0 auto;\` is the classic technique to horizontally center a block element with a declared width.

---

## 3. The Classic Problem: \`box-sizing: content-box\` (Default)

In the default W3C box model (\`box-sizing: content-box\`):
When you declare \`width: 300px\`, that width applies **ONLY to the content area**. Any added padding and borders are **added on top of your width**!

\`\`\`
Total Rendered Width = width + padding-left + padding-right + border-left + border-right
\`\`\`

### The Mathematical Trap:
Suppose you want two cards to sit side-by-side, each with \`width: 50%\`.
You add \`padding: 20px\` and \`border: 2px solid black\`.
- Card 1 actual width = \`50% + 40px + 4px\`
- Card 2 actual width = \`50% + 40px + 4px\`
- Total Width = \`100% + 88px\`!
- **Result**: The cards exceed 100% of the screen width and Card 2 breaks violently onto the next line!

---

## 4. The Modern Solution: \`box-sizing: border-box\`

With \`box-sizing: border-box\`:
When you declare \`width: 300px\`, the **total rendered width** of the box (including padding and borders) is guaranteed to stay exactly 300px.
The browser automatically shrinks the internal content area to absorb your padding and borders!

\`\`\`mermaid
flowchart TD
    subgraph Content_Box ["box-sizing: content-box (Old Default)"]
        CB_W["Declared width = 300px"] --> CB_TOT["Total Screen Width = 300px + 40px padding + 4px border = 344px!
(Layout Breaks)"]
    end

    subgraph Border_Box ["box-sizing: border-box (Modern Standard)"]
        BB_W["Declared width = 300px"] --> BB_TOT["Total Screen Width = Exactly 300px!
(Content Area shrinks to 256px to fit padding/border)"]
    end
\`\`\`

### Universal CSS Reset (Industry Standard):
Every professional frontend project begins with this universal box-sizing reset:
\`\`\`css
*, *::before, *::after {
  box-sizing: border-box;
}
\`\`\`

---

## 5. Margin Collapsing

A unique quirk of CSS is **Margin Collapsing**:
When two vertical margins of adjacent block elements touch, they do **not** add together. Instead, they collapse into a single margin equal to the **largest** of the two margins.

Example:
- Element A has \`margin-bottom: 30px;\`
- Element B has \`margin-top: 20px;\`
- The vertical distance between them on the screen is **30px**, NOT 50px!
*(Note: Horizontal margins never collapse; Flexbox and Grid items do not collapse margins).*

---

> [!IMPORTANT] **MEMORIZE:**
> - The Box Model layers (inside out): **Content -> Padding -> Border -> Margin**.
> - Default \`content-box\`: \`Total Width = width + padding + border\`.
> - Modern \`border-box\`: \`Total Width = width\` (padding and border are absorbed).
> - Padding adopts the background color; margins are always transparent.

> [!NOTE] **DEV BRAIN:**
> Inspect elements in Chrome DevTools by pressing \`F12\`. The computed tab displays an interactive, color-coded visual diagram of the Box Model showing exact pixel dimensions for content (blue), padding (green), border (yellow), and margin (orange).

> [!WARNING] **TRAP:**
> In exams, when calculating the total width of an element with \`content-box\`, remember to add padding and borders for **BOTH sides** (left AND right). Forgetting to double them is the #1 student exam error!

> [!TIP] **EXAM TIP:**
> When asked to draw the CSS Box Model in an exam, draw four concentric rectangles with clear labels: Margin, Border, Padding, and Content. Write out the formula for both \`content-box\` and \`border-box\`.`,
          shortNotes: "CSS Box Model = Content + Padding + Border + Margin. Default content-box expands total dimensions by adding padding/border. box-sizing: border-box locks total width to the declared value.",
          examples: [
            {
              title: "Direct Comparison: content-box vs border-box Behavior",
              problem: "Write HTML and CSS displaying two identical 300px boxes—one with content-box and one with border-box—to prove how box dimensions behave.",
              explanation: "Visually shows that content-box expands to 344px wide while border-box stays locked at 300px.",
              code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Box Model Demonstration</title>
  <style>
    .demo-box {
      width: 300px;
      padding: 20px;
      border: 2px solid #2563eb;
      background-color: #dbeafe;
      margin-bottom: 20px;
      font-family: sans-serif;
    }
    .content-box-mode {
      box-sizing: content-box; /* Total width = 300 + 40 + 4 = 344px */
    }
    .border-box-mode {
      box-sizing: border-box; /* Total width = Exactly 300px */
      background-color: #dcfce7;
      border-color: #16a34a;
    }
  </style>
</head>
<body>
  <div class="demo-box content-box-mode">
    <strong>box-sizing: content-box</strong><br>
    Declared width: 300px<br>
    Actual rendered width on screen: 344px
  </div>

  <div class="demo-box border-box-mode">
    <strong>box-sizing: border-box</strong><br>
    Declared width: 300px<br>
    Actual rendered width on screen: 300px
  </div>
</body>
</html>`,
              output: "The green box-sizing: border-box is visibly 44px narrower than the blue content-box despite both having width: 300px."
            }
          ],
          keyPoints: [
            "Every HTML element is rendered as a rectangular box consisting of Content, Padding, Border, and Margin.",
            "Padding creates space inside the border and displays the background color.",
            "Margin creates space outside the border separating adjacent elements.",
            "In content-box (default), padding and borders expand the total element dimensions beyond declared width.",
            "In border-box, the declared width represents the total outer width, absorbing padding and border inward."
          ],
          theoryQuestions: [
            {
              question: "Explain the CSS Box Model with an annotated diagram and formulas for calculating total element dimensions.",
              marks: "5 Marks",
              answer: `The CSS Box Model is the structural basis for layout rendering in web browsers. It consists of four concentric rectangular layers:
1. **Content:** The innermost area displaying text, images, or child elements, sized by \`width\` and \`height\`.
2. **Padding:** Transparent spacing surrounding the content inside the border. It shares the element background.
3. **Border:** A visible outline wrapping the padding and content.
4. **Margin:** Transparent spacing outside the border separating the element from sibling elements.

**Calculation Formulas:**
- **In \`box-sizing: content-box\`:**
  \`Total Width = width + padding-left + padding-right + border-left + border-right\`
  \`Total Height = height + padding-top + padding-bottom + border-top + border-bottom\`
- **In \`box-sizing: border-box\`:**
  \`Total Width = width\` (Padding and border are absorbed inside the declared width).`,
              keyPoints: [
                "Concentric box diagram.",
                "Definitions of content, padding, border, margin.",
                "Calculation formulas for both box-sizing modes."
              ]
            },
            {
              question: "A div has width: 250px, padding: 15px, and border: 5px solid black. Calculate its total rendered width in content-box mode and border-box mode.",
              marks: "5 Marks",
              answer: `Given:
- Declared Width = 250px
- Horizontal Padding = 15px (left) + 15px (right) = 30px
- Horizontal Border = 5px (left) + 5px (right) = 10px

1. **In \`box-sizing: content-box\` mode:**
   \`Total Rendered Width = Declared Width + Padding + Border\`
   \`Total Rendered Width = 250px + 30px + 10px = 290px\`
2. **In \`box-sizing: border-box\` mode:**
   \`Total Rendered Width = Declared Width = 250px\`
   (The internal content width shrinks to: \`250 - 30 - 10 = 210px\`).`,
              keyPoints: [
                "Step-by-step arithmetic calculation.",
                "Formula application.",
                "Content-box result: 290px.",
                "Border-box result: 250px."
              ]
            },
            {
              question: "What is Margin Collapsing in CSS? When does it happen and how can it be prevented?",
              marks: "3 Marks",
              answer: `1. **Definition:** Margin collapsing occurs when the top and bottom margins of adjacent block-level elements touch. Instead of adding together, they collapse into a single margin equal to the larger of the two margins.
2. **When it happens:** Between adjacent block siblings in normal document flow, or between parent and first/last child when no border or padding separates them.
3. **How to prevent:** Use CSS Flexbox or CSS Grid, add a 1px border or padding to the container, or declare \`overflow: auto\` to establish a new block formatting context.`,
              keyPoints: [
                "Definition: largest margin wins, no summation.",
                "Vertical adjacent block elements.",
                "Prevention strategies (flexbox, padding, overflow)."
              ]
            }
          ],
          mcqs: [
            {
              question: "Which layer of the CSS Box Model is enclosed by the border and shares the background color of the element?",
              options: [
              "Margin",
              "Padding",
              "Outline",
              "Viewport"
              ],
              correctIndex: 1,
              explanation: "Padding sits inside the border and inherits the background styling of the element."
            },
            {
              question: "Under default \"box-sizing: content-box\", what is the total rendered width of an element with width: 200px, padding: 20px, and border: 4px?",
              options: [
              "200px",
              "224px",
              "248px",
              "240px"
              ],
              correctIndex: 2,
              explanation: "Total Width = 200 + (20 * 2) + (4 * 2) = 200 + 40 + 8 = 248px."
            },
            {
              question: "Why is \"box-sizing: border-box\" universally adopted as the standard CSS reset?",
              options: [
              "It automatically rounds all border corners",
              "It makes sure padding and borders do not increase the total declared width of an element",
              "It centers text vertically",
              "It enables 3D GPU animations"
              ],
              correctIndex: 1,
              explanation: "border-box guarantees that declared dimensions remain fixed, absorbing padding and border inwards and preventing layout overflow."
            },
            {
              question: "In the shorthand CSS declaration \"padding: 10px 20px 15px 5px;\", which side receives 20px of padding?",
              options: [
              "Top",
              "Right",
              "Bottom",
              "Left"
              ],
              correctIndex: 1,
              explanation: "Four-value shorthand follows a clockwise order: Top (10px), Right (20px), Bottom (15px), Left (5px)."
            }
          ]
        },
        {
          id: "wt-u4-t3",
          title: "CSS Positioning Schemes: static, relative, absolute, fixed, sticky & z-index stacking",
          simpleExplanation: "CSS positioning determines where an element sits on the screen and how it reacts to scrolling. Static is the normal default flow. Relative moves an element slightly without disturbing its neighbors. Absolute removes an element from normal flow to position it precisely inside a relative parent. Fixed pins an element to the screen even when you scroll, and sticky scrolls until it hits a threshold and then sticks.",
          detailedExplanation: `## 1. Introduction: Normal Document Flow

By default, web browsers arrange elements in what is called the **Normal Document Flow**:
- **Block Elements** (\`<div>\`, \`<p>\`, \`<h1>\`): Start on a new line and stretch horizontally to fill 100% of their parent's width.
- **Inline Elements** (\`<span>\`, \`<a>\`, \`<strong>\`): Flow horizontally from left to right, wrapping onto new lines only when space runs out.

The CSS **\`position\`** property allows developers to break out of this normal flow to create floating buttons, sticky navigation bars, tooltips, and modal dialogs.

---

## 2. The Five CSS Positioning Schemes

\`\`\`mermaid
flowchart TD
    POS["CSS position Property"]
    POS --> STATIC["static (Default)
Normal flow; top/left/z-index IGNORED"]
    POS --> RELATIVE["relative
Normal flow preserved; offset from own original spot;
Anchor for absolute children"]
    POS --> ABSOLUTE["absolute
Removed from flow; positioned relative to nearest
non-static ancestor"]
    POS --> FIXED["fixed
Removed from flow; pinned relative to viewport;
Never moves on scroll"]
    POS --> STICKY["sticky
Hybrid: flows normally until scroll threshold,
then sticks like fixed"]
\`\`\`

### 1. \`position: static\` (The Default)
- Every element starts with \`position: static\`.
- Follows the normal document flow.
- The offset properties (\`top\`, \`bottom\`, \`left\`, \`right\`) and \`z-index\` have **ZERO effect** on static elements.

### 2. \`position: relative\`
- The element remains in the normal document flow.
- The offset properties (\`top: 10px; left: 20px;\`) move the element relative to **where it would normally have been**.
- **Crucial Rule**: The space the element originally occupied is **preserved** like an invisible ghost; neighboring elements do NOT shift to fill the gap!
- **Primary Modern Use**: Acts as the positioning coordinate anchor (\`0, 0\`) for nested child elements with \`position: absolute\`.

### 3. \`position: absolute\`
- The element is **completely removed from the normal document flow**.
- It leaves zero physical footprint; surrounding elements behave as if it does not exist.
- Sized and positioned via \`top\`, \`right\`, \`bottom\`, \`left\` relative to its **nearest ancestor element whose position is NOT static** (usually a parent with \`position: relative\`).
- If no positioned ancestor exists, it positions itself relative to the initial containing block (\`<html>\`).

### 4. \`position: fixed\`
- Completely removed from the normal document flow.
- Positioned relative to the **browser viewport** (the visible screen window).
- **Does not move when the user scrolls the page!**
- Common use cases: Floating navigation headers, persistent back-to-top buttons, floating WhatsApp chat widgets.

### 5. \`position: sticky\`
- A hybrid of \`relative\` and \`fixed\`.
- Behaves like \`position: relative\` while scrolling within its container until the user scrolls past a specified threshold (e.g. \`top: 0\`), at which point it pins itself in place like \`fixed\`.
- **Constraint**: It only stays sticky while scrolling inside its direct parent container!

---

## 3. The Classic "Relative Parent, Absolute Child" Pattern

This is the most common positioning pattern used in professional frontend engineering:

\`\`\`html
<div class="card" style="position: relative;">
  <span class="badge" style="position: absolute; top: 10px; right: 10px;">New</span>
  <img src="product.jpg">
  <h3>Smart Watch</h3>
</div>
\`\`\`
Because the parent \`.card\` has \`position: relative\`, the child's \`top: 10px; right: 10px;\` pins the badge precisely to the top-right corner of that specific card, regardless of where the card moves!

---

## 4. Layering with \`z-index\` & Stacking Context

When elements overlap on a 2D screen, CSS uses the **Z-Axis** (pointing out of the screen toward your eyes) to determine which element renders on top.

\`\`\`mermaid
flowchart LR
    ZNEG["z-index: -1
(Behind normal content)"] --> Z0["Normal Flow (z-index: auto / 0)"]
    Z0 --> Z10["z-index: 10
(Dropdowns, Tooltips)"]
    Z10 --> Z100["z-index: 100
(Sticky Headers)"]
    Z100 --> Z1000["z-index: 1000
(Modal Dialog Overlays)"]
\`\`\`

### Rules of \`z-index\`:
1. **Requires Positioning**: \`z-index\` only works on elements that have a \`position\` other than \`static\` (\`relative\`, \`absolute\`, \`fixed\`, \`sticky\`) or Flex/Grid items.
2. **Higher Number Wins**: An element with \`z-index: 10\` appears in front of an element with \`z-index: 5\`.
3. **Stacking Context**: If parent A has \`z-index: 1\`, its child with \`z-index: 9999\` will **still render behind** parent B with \`z-index: 2\`! A child can never escape the stacking context of its parent.

---

> [!IMPORTANT] **MEMORIZE:**
> - \`static\`: Default flow, ignores top/left/z-index.
> - \`relative\`: Leaves space occupied, offsets from self.
> - \`absolute\`: Removed from flow, offsets from nearest non-static ancestor.
> - \`fixed\`: Pinned to viewport, stays during scroll.
> - \`z-index\` only works on positioned elements (\`position != static\`).

> [!NOTE] **DEV BRAIN:**
> If you set \`position: sticky; top: 0;\` and it refuses to stick, check its parent container. If any parent has \`overflow: hidden;\`, \`overflow: auto;\`, or if the parent has no defined height, \`position: sticky\` will break!

> [!WARNING] **TRAP:**
> Never try to use \`z-index\` on an element with default \`position: static\`. It will do nothing! Add \`position: relative;\` first to activate \`z-index\`.

> [!TIP] **EXAM TIP:**
> When asked to compare CSS positioning schemes in an exam, create a structured matrix comparing: Normal Flow Status, Reference Coordinate Origin, and Scroll Reaction.`,
          shortNotes: "Position values: static (default), relative (offset from self), absolute (offset from positioned ancestor), fixed (pinned to viewport), sticky (scrolls then pins). z-index controls 3D depth.",
          examples: [
            {
              title: "Fixed Header and Relative Parent with Absolute Notification Badge",
              problem: "Create a fixed top navigation bar and a product card with an absolute notification badge in the top-right corner.",
              explanation: "Demonstrates fixed viewport pinning and the classic relative-parent absolute-child pattern.",
              code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSS Positioning Schemes</title>
  <style>
    body { margin: 0; padding-top: 70px; font-family: sans-serif; background: #f8fafc; height: 1500px; }

    /* 1. Fixed Header: Pinned to viewport top */
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 60px;
      background: #1e293b;
      color: white;
      display: flex;
      align-items: center;
      padding: 0 20px;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    /* 2. Relative Container */
    .card {
      position: relative;
      width: 260px;
      padding: 20px;
      margin: 40px auto;
      background: white;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
    }

    /* 3. Absolute Badge: Positioned relative to .card */
    .badge {
      position: absolute;
      top: -10px;
      right: -10px;
      background: #ef4444;
      color: white;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <nav class="navbar">ITM University Portal (Stays fixed while scrolling)</nav>

  <div class="card">
    <span class="badge">Sale</span>
    <h3>Course Textbook</h3>
    <p>Web Technology Fundamentals (1st Edition)</p>
  </div>
</body>
</html>`,
              output: "A header that remains permanently anchored to the screen upon scrolling, and a card badge pinned precisely to its top-right corner."
            }
          ],
          keyPoints: [
            "Normal document flow stacks block elements vertically and inline elements horizontally.",
            "position: static is the default and does not accept top/left/right/bottom or z-index.",
            "position: relative offsets an element while retaining its original footprint in the document layout.",
            "position: absolute removes an element from document flow and positions it relative to its nearest positioned ancestor.",
            "position: fixed pins an element to the viewport; position: sticky scrolls until a threshold is reached.",
            "z-index manages the layering stack order along the Z-axis for non-static positioned elements."
          ],
          theoryQuestions: [
            {
              question: "Compare the five CSS positioning values (static, relative, absolute, fixed, sticky) in terms of document flow, offset reference, and scroll behavior.",
              marks: "7 Marks",
              answer: `1. **static (Default):** Remains in normal document flow. Offsets (\`top\`, \`left\`) and \`z-index\` have no effect. Scrolls naturally with the page.
2. **relative:** Remains in normal document flow. Offsets shift the visual display relative to its original position without disturbing neighboring elements. Acts as an anchor coordinate frame for absolute descendants.
3. **absolute:** Completely removed from normal document flow (occupies zero space). Positioned relative to its closest non-static ancestor (or \`<html>\`). Moves along with page scrolling.
4. **fixed:** Completely removed from document flow. Positioned relative to the browser viewport window. Remains permanently anchored to the visible screen during page scrolling.
5. **sticky:** Flows normally in document flow until a scroll threshold is met, after which it behaves like \`fixed\` within the bounds of its parent container.`,
              keyPoints: [
                "Comparison table or structured list.",
                "Document flow status.",
                "Coordinate reference origins.",
                "Scrolling behavior."
              ]
            },
            {
              question: "Explain the \"Relative Parent, Absolute Child\" design pattern. Why is it essential in modern web user interfaces?",
              marks: "5 Marks",
              answer: `1. **The Architecture:** An outer container element is set to \`position: relative;\`, while an inner child element is set to \`position: absolute;\` with coordinate offsets like \`top: 0; right: 0;\`.
2. **Why it works:** When an element is \`position: absolute\`, the browser climbs up the DOM tree looking for the nearest ancestor whose position is NOT static. Setting the parent to \`relative\` turns that parent into the origin \`(0, 0)\` coordinate boundary for the child.
3. **Why it is essential:** It allows developers to attach notification badges, close modal icons (\`X\`), tooltips, and overlay captions precisely to a specific component regardless of where that component moves or flexes on the page.`,
              keyPoints: [
                "Ancestor positioning lookup rules.",
                "Origin coordinate binding.",
                "Practical UI use cases (badges, modals, tooltips)."
              ]
            },
            {
              question: "What is z-index in CSS? What is a stacking context and why does a child with z-index: 9999 sometimes appear behind an element with z-index: 2?",
              marks: "5 Marks",
              answer: `1. **z-index:** Controls the 3-dimensional stacking order of overlapping elements along the Z-axis (depth). Only applies to positioned elements (\`position != static\`).
2. **Stacking Context:** A stacking context is an isolated 3D layering hierarchy created by specific CSS properties (e.g. \`position: relative\` with \`z-index\`, \`opacity < 1\`, or \`transform\`).
3. **Why 9999 loses to 2:** Stacking contexts are hierarchical. If Parent A has \`z-index: 1\` and Parent B has \`z-index: 2\`, Parent B is on top. Even if Parent A contains a child with \`z-index: 9999\`, that child is scoped entirely within Parent A context and cannot render higher than Parent B.`,
              keyPoints: [
                "Definition and requirement of non-static position.",
                "Concept of stacking context.",
                "Hierarchical isolation explanation."
              ]
            }
          ],
          mcqs: [
            {
              question: "Which CSS position value removes an element from normal flow and pins it relative to the browser viewport so it never moves when scrolled?",
              options: [
              "position: relative",
              "position: sticky",
              "position: fixed",
              "position: absolute"
              ],
              correctIndex: 2,
              explanation: "position: fixed anchors an element relative to the browser window viewport."
            },
            {
              question: "On an element with default \"position: static\", what happens if you apply \"top: 20px; z-index: 10;\"?",
              options: [
              "The element moves down 20px and appears in front",
              "The properties have completely zero effect",
              "The browser throws a CSS parsing error",
              "The element switches automatically to absolute"
              ],
              correctIndex: 1,
              explanation: "On static elements, offset properties (top/left/right/bottom) and z-index are completely ignored."
            },
            {
              question: "To position an absolute child element relative to its direct parent container, what position property must be applied to the parent?",
              options: [
              "position: static",
              "position: relative",
              "position: inherit",
              "position: initial"
              ],
              correctIndex: 1,
              explanation: "Setting the parent to position: relative establishes it as the positioned coordinate container for the absolute child."
            },
            {
              question: "Which position value acts like relative in normal flow until a scroll threshold is met, after which it pins in place within its parent container?",
              options: [
              "fixed",
              "sticky",
              "absolute",
              "static"
              ],
              correctIndex: 1,
              explanation: "position: sticky toggles between relative and fixed behavior based on the scroll position within its parent container."
            }
          ]
        },
        {
          id: "wt-u4-t4",
          title: "CSS Flexbox Architecture: Flex container, flex-direction, justify-content (main axis), align-items (cross axis), flex-wrap",
          simpleExplanation: "Flexbox (Flexible Box Layout) is a modern CSS system for arranging elements in a single row or column. By applying display: flex to a parent container, you gain superpowers to evenly distribute space, align items on the main axis (justify-content), align items on the cross axis (align-items), and achieve perfect horizontal and vertical centering in just 3 lines of code.",
          detailedExplanation: `## 1. Introduction: The Death of Float Hacks

Before CSS Flexbox was introduced in CSS3, building responsive multi-column layouts was notoriously frustrating. Developers had to use:
- \`float: left;\` and \`float: right;\` (which were originally designed only for wrapping text around magazine images).
- Ugly "clearfix" hacks (\`.clearfix::after { content: ""; display: table; clear: both; }\`) to prevent parent containers from collapsing.
- Vertical centering required bizarre table-cell hacks or negative margins.

**CSS Flexbox (Flexible Box Module)** solved all of these problems by providing a 1-dimensional layout model optimized for distributing space and aligning items dynamically along an axis.

---

## 2. Flexbox Architecture: The Two Axes

Flexbox is governed by two fundamental entities and two perpendicular axes:

\`\`\`mermaid
flowchart LR
    subgraph Flexbox_Axes ["Flexbox Coordinate System"]
        direction LR
        MA["MAIN AXIS (Direction items flow)
Controlled by: justify-content"]
        CA["CROSS AXIS (Perpendicular to Main Axis)
Controlled by: align-items"]
    end
\`\`\`

1. **Flex Container (Parent)**: The outer element with \`display: flex;\` or \`display: inline-flex;\`.
2. **Flex Items (Children)**: All direct child elements inside the flex container automatically become flex items.
3. **The Main Axis**: The primary axis along which flex items are laid out. Sized and directed by \`flex-direction\`.
4. **The Cross Axis**: The axis perpendicular to the main axis.

---

## 3. Flex Container (Parent) Properties

### 1. \`flex-direction\` (Sets the Main Axis)
- **\`row\` (Default)**: Items flow horizontally from left to right.
- **\`row-reverse\`**: Items flow horizontally from right to left.
- **\`column\`**: Items flow vertically from top to bottom (Main axis becomes vertical!).
- **\`column-reverse\`**: Items flow vertically from bottom to top.

### 2. \`justify-content\` (Aligns Items along the MAIN AXIS)
- **\`flex-start\` (Default)**: Items packed flush against the start of the main axis.
- **\`flex-end\`**: Items packed flush against the end of the main axis.
- **\`center\`**: Items centered along the main axis.
- **\`space-between\`**: First item at start, last item at end; remaining space distributed equally between items.
- **\`space-around\`**: Equal space around each item (outer edges have half the space of inner gaps).
- **\`space-evenly\`**: Perfectly equal spacing between all items and both outer edges.

### 3. \`align-items\` (Aligns Items along the CROSS AXIS)
- **\`stretch\` (Default)**: Items stretch to fill the full height (or width) of the container.
- **\`flex-start\`**: Items aligned to the top/start of the cross axis.
- **\`flex-end\`**: Items aligned to the bottom/end of the cross axis.
- **\`center\`**: Items centered along the cross axis.
- **\`baseline\`**: Items aligned according to their text baselines.

### 4. \`flex-wrap\` (Multi-Line Wrapping)
- **\`nowrap\` (Default)**: All flex items are forced onto a single line, shrinking if necessary even if they overflow.
- **\`wrap\`**: Flex items break onto multiple lines from top to bottom when space runs out.
- **\`wrap-reverse\`**: Items wrap onto multiple lines in reverse order.

### 5. \`gap\` (Modern Spacing)
- Defines space between flex items without needing ugly margins: \`gap: 16px;\` or \`gap: 10px 20px;\` (row-gap, col-gap).

---

## 4. The Holy Grail of Web Development: Centering Anything

For over 15 years, centering an element both horizontally and vertically was considered one of the hardest puzzles in CSS. 

With Flexbox, it is accomplished in **exactly 3 lines of code**:

\`\`\`css
.center-container {
  display: flex;
  justify-content: center; /* Centers horizontally on main axis */
  align-items: center;     /* Centers vertically on cross axis */
  height: 100vh;           /* Full viewport height */
}
\`\`\`

---

## 5. Flex Item (Child) Properties

Individual child items inside a flex container can be fine-tuned:

1. **\`flex-grow\`**: Defines the ability of a flex item to expand and consume leftover space. \`flex-grow: 1\` means it absorbs proportional remaining space.
2. **\`flex-shrink\`**: Defines the ability of an item to shrink when space is insufficient. (Default is \`1\`).
3. **\`flex-basis\`**: Sets the initial default size of an item before growing or shrinking (e.g., \`flex-basis: 250px;\`).
4. **Shorthand \`flex\`**: Combines grow, shrink, and basis:
   \`\`\`css
   flex: 1 1 0%; /* Shorthand: flex: 1; */
   \`\`\`
5. **\`align-self\`**: Allows a single child item to override the parent container's \`align-items\` setting.

---

> [!IMPORTANT] **MEMORIZE:**
> - \`justify-content\` controls the **Main Axis**; \`align-items\` controls the **Cross Axis**.
> - If \`flex-direction: column\`, the Main Axis becomes **Vertical** and the Cross Axis becomes **Horizontal**!
> - Perfect centering: \`display: flex; justify-content: center; align-items: center;\`.
> - Use \`gap\` instead of margins to space flex items.

> [!NOTE] **DEV BRAIN:**
> When building responsive navigation bars, set the container to \`display: flex; justify-content: space-between; align-items: center;\`. This automatically pins your company logo to the far left and the navigation menu links to the far right.

> [!WARNING] **TRAP:**
> Remember that changing \`flex-direction: column\` flips the axes! In column mode, \`justify-content: center\` centers elements vertically, while \`align-items: center\` centers them horizontally.

> [!TIP] **EXAM TIP:**
> In exams, you will often be asked to describe \`justify-content\` values. Always draw horizontal boxes showing the visual difference between \`space-between\` (touching the edges) and \`space-around\` (half gaps at the edges).`,
          shortNotes: "Flexbox is a 1D layout model. justify-content aligns items on the main axis; align-items aligns on the cross axis. flex-direction: column switches axes. Centering requires 3 lines: display: flex; justify-content: center; align-items: center.",
          examples: [
            {
              title: "Responsive Flexbox Navigation Bar and Centered Hero Section",
              problem: "Build a responsive navigation header with brand on left and links on right, followed by a vertically and horizontally centered hero banner.",
              explanation: "Demonstrates display: flex, justify-content: space-between, gap, and absolute centering.",
              code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Flexbox Architecture</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; background: #f8fafc; }

    /* 1. Flex Navigation Bar */
    .navbar {
      display: flex;
      justify-content: space-between; /* Brand on left, links on right */
      align-items: center;            /* Center vertically */
      padding: 16px 32px;
      background: #1e293b;
      color: white;
    }
    .nav-links {
      display: flex;
      gap: 20px;                      /* Clean spacing without margins */
      list-style: none;
    }
    .nav-links a { color: #94a3b8; text-decoration: none; font-weight: 500; }
    .nav-links a:hover { color: white; }

    /* 2. Perfectly Centered Hero Container */
    .hero {
      display: flex;
      justify-content: center;        /* Center on Main Axis */
      align-items: center;            /* Center on Cross Axis */
      height: 70vh;
      text-align: center;
    }
    .hero-card {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.08);
      max-width: 450px;
    }
  </style>
</head>
<body>
  <nav class="navbar">
    <h2>ITM Portal</h2>
    <ul class="nav-links">
      <li><a href="#courses">Courses</a></li>
      <li><a href="#admissions">Admissions</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>

  <section class="hero">
    <div class="hero-card">
      <h1>Master Web Technology</h1>
      <p>Clean responsive layouts built with modern CSS3 Flexbox architecture.</p>
    </div>
  </section>
</body>
</html>`,
              output: "A modern flex navigation bar with spaced links and an hero card floating in exact horizontal and vertical center."
            }
          ],
          keyPoints: [
            "Flexbox is a 1-dimensional layout system designed for distributing space and aligning items in rows or columns.",
            "display: flex initiates a flex container and turns direct children into flex items.",
            "justify-content aligns items along the Main Axis (flex-start, center, flex-end, space-between, space-around).",
            "align-items aligns items along the Cross Axis (stretch, flex-start, center, flex-end).",
            "Changing flex-direction to column flips the main and cross axes 90 degrees."
          ],
          theoryQuestions: [
            {
              question: "Explain the CSS Flexbox model. Detail the difference between the Main Axis and Cross Axis and how flex-direction affects them.",
              marks: "5 Marks",
              answer: `1. **Flexbox Overview:** The Flexible Box Layout (Flexbox) is a 1D CSS layout module that arranges elements dynamically along a single axis (either row or column).
2. **The Main Axis:** The primary axis along which flex items are placed sequentially. It is governed by \`justify-content\`.
3. **The Cross Axis:** The axis running perpendicular (90 degrees) to the main axis. It is governed by \`align-items\`.
4. **Impact of \`flex-direction\`:**
   - When \`flex-direction: row\` (default), the Main Axis is horizontal (left to right) and the Cross Axis is vertical (top to bottom).
   - When \`flex-direction: column\`, the axes flip: the Main Axis becomes vertical (top to bottom) and the Cross Axis becomes horizontal (left to right). Consequently, \`justify-content\` aligns vertically and \`align-items\` aligns horizontally.`,
              keyPoints: [
                "Definition of 1D layout model.",
                "Main axis vs cross axis.",
                "Role of justify-content and align-items.",
                "How flex-direction flips axes."
              ]
            },
            {
              question: "Explain the various values of the justify-content property with neat diagrams showing item placement.",
              marks: "5 Marks",
              answer: `The \`justify-content\` property aligns flex items along the Main Axis:
1. **\`flex-start\`:** Items pack flush to the beginning of the container.
2. **\`flex-end\`:** Items pack flush to the end of the container.
3. **\`center\`:** Items pack tightly in the center of the main axis.
4. **\`space-between\`:** The first item touches the start edge, the last item touches the end edge, and remaining space is divided equally between items.
5. **\`space-around\`:** Items are distributed with equal space around them. The space between two inner items is double the space between an edge item and the container wall.
6. **\`space-evenly\`:** Items are distributed so that the spacing between any two items and between the edges is exactly identical.`,
              keyPoints: [
                "Explanation of all 6 values.",
                "Distinction between space-between, space-around, and space-evenly."
              ]
            },
            {
              question: "Write CSS code to center a <div> both horizontally and vertically inside its parent container using Flexbox.",
              marks: "3 Marks",
              answer: `\`\`\`css
.parent-container {
  display: flex;
  justify-content: center; /* Horizontally centers on main axis */
  align-items: center;     /* Vertically centers on cross axis */
  height: 100vh;           /* Ensure container has height */
}
\`\`\``,
              keyPoints: [
                "display: flex.",
                "justify-content: center.",
                "align-items: center.",
                "Container height requirement."
              ]
            }
          ],
          mcqs: [
            {
              question: "Which CSS property aligns flex items along the MAIN axis of a flex container?",
              options: [
              "align-items",
              "justify-content",
              "align-content",
              "flex-wrap"
              ],
              correctIndex: 1,
              explanation: "justify-content aligns items along the main axis, while align-items aligns items along the cross axis."
            },
            {
              question: "If \"flex-direction: column\" is applied to a flex container, what happens to the main axis?",
              options: [
              "It disappears completely",
              "It becomes vertical (top to bottom)",
              "It becomes diagonal",
              "It remains horizontal"
              ],
              correctIndex: 1,
              explanation: "flex-direction: column turns the main axis into a vertical axis from top to bottom."
            },
            {
              question: "Which justify-content value places the first item at the start edge and the last item at the end edge with remaining space distributed equally between items?",
              options: [
              "space-around",
              "space-evenly",
              "space-between",
              "center"
              ],
              correctIndex: 2,
              explanation: "space-between forces the outer items against the edges and spaces the interior items evenly."
            },
            {
              question: "Which property allows a SINGLE flex item to override the container align-items value on the cross axis?",
              options: [
              "align-self",
              "flex-grow",
              "order",
              "justify-self"
              ],
              correctIndex: 0,
              explanation: "align-self is applied to an individual flex item to override the parent align-items setting."
            }
          ]
        }
      ]
    },
    {
      id: "wt-u5",
      title: "Unit 5: Client-Side JavaScript, DOM & Events",
      description: "ECMAScript execution fundamentals, scoping nuances of var vs let vs const, DOM tree nodes, element querying, dynamic tree mutations, event propagation lifecycle, and delegation patterns.",
      topics: [
        {
          id: "wt-u5-t1",
          title: "JavaScript Fundamentals: Variables (var vs let vs const), Primitive Types, Type Coercion, and Strict Equality (== vs ===)",
          simpleExplanation: "JavaScript is the programming language that makes websites interactive and alive. let and const are modern variable declarations with block scope, while var is old and function-scoped. JavaScript also converts data types automatically (type coercion), which is why you should always use strict equality (===) instead of loose equality (==) to prevent unexpected bugs.",
          detailedExplanation: `## 1. Introduction: The Behavior Layer of the Web

If HTML is the skeleton and CSS is the skin and clothing of a website, **JavaScript (JS)** is the muscular and nervous system. It makes static pages dynamic, responsive to user actions, and capable of real-time server communication without reloading the browser.

JavaScript is an **interpreted, single-threaded, dynamically typed, multi-paradigm language** with a non-blocking event-driven concurrency model powered by browser engines like Google's V8 (Chrome/Node.js) and Mozilla's SpiderMonkey (Firefox).

---

## 2. Variable Declarations: \`var\` vs \`let\` vs \`const\`

Prior to ECMAScript 2015 (ES6), JavaScript had only one keyword to declare variables: \`var\`. ES6 revolutionized the language by introducing \`let\` and \`const\`.

\`\`\`mermaid
flowchart TD
    VAR_DEC["Variable Declaration in Modern JS"]
    VAR_DEC --> CONST["const (Default Choice)
Block-scoped, Cannot be reassigned,
Immutable binding"]
    VAR_DEC --> LET["let (Use when reassigning)
Block-scoped, Can be updated,
No re-declaration in scope"]
    VAR_DEC --> VAR["var (Legacy / Avoid)
Function-scoped, Hoisted with undefined,
Leans to subtle bugs"]
\`\`\`

### Deep Architectural Comparison:

| Feature | \`var\` (Legacy ES5) | \`let\` (Modern ES6) | \`const\` (Modern ES6) |
| :--- | :--- | :--- | :--- |
| **Scope** | **Function Scoped** (ignores \`if/for\` blocks) | **Block Scoped** (\`{ ... }\`) | **Block Scoped** (\`{ ... }\`) |
| **Hoisting** | Hoisted and initialized with \`undefined\` | Hoisted into **Temporal Dead Zone (TDZ)** | Hoisted into **Temporal Dead Zone (TDZ)** |
| **Re-declaration** | Allowed in same scope | **SyntaxError** if re-declared | **SyntaxError** if re-declared |
| **Reassignment** | Can be reassigned | Can be reassigned | **TypeError** if reassigned |
| **Initialization** | Optional | Optional | **Mandatory** at declaration |

### Why \`var\` Causes Serious Bugs (The Scope Trap):
\`\`\`javascript
if (true) {
  var role = "admin";
  let secret = "classified";
}
console.log(role);   // Outputs: "admin" (var leaked outside the if block!)
console.log(secret); // ReferenceError: secret is not defined (let stayed inside!)
\`\`\`

---

## 3. Data Types: Primitives vs Reference Types

JavaScript data types are strictly divided into two categories:

### 1. Primitive Types (Stored Directly on Stack by Value)
Primitives are immutable (their values cannot be altered, only replaced):
- **\`number\`**: IEEE 754 64-bit floating-point numbers (e.g., \`42\`, \`3.14159\`).
- **\`string\`**: Sequence of characters wrapped in \`""\`, \`''\`, or template literals \`\` \`\`.
- **\`boolean\`**: \`true\` or \`false\`.
- **\`undefined\`**: Automatically assigned to a declared variable that has not yet been assigned a value.
- **\`null\`**: An intentional assignment representing "no value" or "empty object reference".
- **\`symbol\`**: Unique, immutable identifier (ES6).
- **\`bigint\`**: Arbitrary precision integers for numbers larger than (2^{53} - 1).

### 2. Reference Types (Stored on Heap by Reference)
- **\`Object\`**, **\`Array\`**, **\`Function\`**.
- When assigning an object to another variable, only the memory address (pointer) is copied, NOT the underlying data!

---

## 4. Type Coercion: Implicit vs Explicit

JavaScript is **dynamically typed**, meaning variables do not hold fixed data types. Furthermore, JavaScript automatically converts data types behind the scenes—a behavior called **Implicit Type Coercion**.

### The Plus Operator (\`+\`) vs Other Operators:
- The \`+\` operator triggers **String Concatenation** if either operand is a string:
  \`"5" + 2 === "52"\`
- The mathematical operators (\`-\`, \`*\`, \`/\`, \`%\`) trigger **Numeric Conversion**:
  \`"5" - 2 === 3\`
  \`"10" * "2" === 20\`

### Truthy vs Falsy Values:
In boolean conditionals (\`if (value)\`), JavaScript coerces values into booleans.
There are exactly **SIX Falsy Values** in JavaScript:
1. \`false\`
2. \`0\` (and \`-0\`)
3. \`""\` (empty string)
4. \`null\`
5. \`undefined\`
6. \`NaN\` (Not-a-Number)
*Everything else in JavaScript is **Truthy** (including empty arrays \`[]\` and empty objects \`{}\`)!*

---

## 5. Loose Equality (\`==\`) vs Strict Equality (\`===\`)

This is one of the most critical exam questions in university curricula:

\`\`\`mermaid
flowchart TD
    EQ["Equality Comparison"]
    EQ --> LOOSE["Loose Equality ( == )
Performs Implicit Type Coercion FIRST,
then compares values.
Dangerous & unpredictable!"]
    EQ --> STRICT["Strict Equality ( === )
Compares BOTH Value AND Data Type.
Never coerces types.
Industry Best Practice!"]

    LOOSE --> L_EX["'5' == 5 --> true
0 == false --> true
null == undefined --> true"]
    STRICT --> S_EX["'5' === 5 --> false (string !== number)
0 === false --> false (number !== boolean)
null === undefined --> false"]
\`\`\`

- **Loose Equality (\`==\`)**: Converts the operands to a common type before comparison.
- **Strict Equality (\`===\`)**: Evaluates to true **only** if both operands share the **exact same data type** and have the **exact same value**.

---

> [!IMPORTANT] **MEMORIZE:**
> - Rule of Thumb: Use **\`const\`** by default; use **\`let\`** only if you need to reassign; never use **\`var\`**.
> - Always use **\`===\`** (strict equality). Never use \`==\`.
> - Six Falsy values: \`false\`, \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`.
> - \`typeof null\` returns \`"object"\` (a famous 30-year-old bug in JavaScript engine history!).

> [!NOTE] **DEV BRAIN:**
> Even though \`const\` prevents reassignment of the variable binding, it does NOT make objects or arrays immutable! You can still push items into a \`const arr = []\` or mutate \`const user = { name: "Aarav" }; user.name = "Diya"\`.

> [!WARNING] **TRAP:**
> Watch out for \`NaN === NaN\`. In JavaScript, \`NaN\` is the only value in the entire language that is NOT equal to itself! Always use \`Number.isNaN(val)\` to test for NaN.

> [!TIP] **EXAM TIP:**
> When asked why \`"5" + 2\` is \`"52"\` but \`"5" - 2\` is \`3\`, explain that the \`+\` operator is overloaded for string concatenation, whereas the \`-\` operator only exists for numeric subtraction, forcing implicit numeric coercion of the string.`,
          shortNotes: "Use const by default, let for reassignments; avoid var. === checks both type and value without coercion. Falsy values: false, 0, \"\", null, undefined, NaN.",
          examples: [
            {
              title: "Demonstrating var vs let Scope, Coercion, and Strict Equality",
              problem: "Write a JavaScript program illustrating block scoping differences between var and let, implicit type coercion, and strict equality.",
              explanation: "Shows variable leakage with var, string vs numeric coercion, and strict equality comparisons.",
              code: `// 1. Scoping Demonstration
function scopeDemo() {
  if (true) {
    var functionScoped = 'I leak past if blocks';
    let blockScoped = 'I am safely confined to this block';
  }
  console.log(functionScoped); // Works!
  // console.log(blockScoped); // Would throw ReferenceError
}
scopeDemo();

// 2. Type Coercion Quirks
console.log('5' + 2);        // "52" (String concatenation)
console.log('5' - 2);        // 3    (Numeric coercion)
console.log('10' * '3');     // 30   (Numeric coercion)

// 3. Loose (==) vs Strict (===) Equality
console.log('5' == 5);       // true  (Coerced '5' to 5)
console.log('5' === 5);      // false (Different data types)
console.log(0 == false);     // true  (Both coerced to 0)
console.log(0 === false);    // false (number !== boolean)`,
              output: "I leak past if blocks\n52\n3\n30\ntrue\nfalse\ntrue\nfalse"
            }
          ],
          keyPoints: [
            "var is function-scoped and hoisted with undefined; let and const are block-scoped and live in the Temporal Dead Zone.",
            "const creates an immutable variable binding and requires immediate initialization.",
            "JavaScript primitive types include number, string, boolean, null, undefined, symbol, and bigint.",
            "Implicit type coercion automatically converts operand types during evaluation.",
            "Loose equality (==) coerces types before comparing; strict equality (===) requires identical types and values."
          ],
          theoryQuestions: [
            {
              question: "Differentiate between var, let, and const in JavaScript with respect to scope, hoisting, re-declaration, and reassignment.",
              marks: "5 Marks",
              answer: `1. **Scope:** \`var\` is function-scoped (visible throughout the entire enclosing function). \`let\` and \`const\` are block-scoped (visible only within the immediate curly braces \`{ ... }\`).
2. **Hoisting:** \`var\` is hoisted to the top of its scope and initialized with \`undefined\`. \`let\` and \`const\` are hoisted but remain in the "Temporal Dead Zone" (TDZ) until their declaration line is executed; accessing them earlier throws a \`ReferenceError\`.
3. **Re-declaration:** \`var\` allows re-declaring the same variable within the same scope. \`let\` and \`const\` throw a \`SyntaxError\`.
4. **Reassignment:** \`var\` and \`let\` can have their values reassigned. \`const\` creates an immutable binding that throws a \`TypeError\` if reassigned.`,
              keyPoints: [
                "Function scope vs block scope.",
                "Hoisting and Temporal Dead Zone.",
                "Re-declaration rules.",
                "Reassignment rules."
              ]
            },
            {
              question: "Explain Type Coercion in JavaScript. Why is strict equality (===) strongly preferred over loose equality (==)?",
              marks: "5 Marks",
              answer: `1. **Type Coercion:** The automatic or implicit conversion of values from one data type to another by JavaScript (e.g. converting a string to a number when evaluating \`"10" - 2 = 8\`).
2. **Loose Equality (\`==\`):** Compares two values after performing implicit type conversion if the types differ. This creates counterintuitive bugs, such as \`"0" == false\` evaluating to \`true\`, and \`"" == 0\` evaluating to \`true\`.
3. **Strict Equality (\`===\`):** Compares both value and type without coercion. If the operands have different types (like \`"5"\` and \`5\`), it returns \`false\` immediately. Strict equality is preferred because it eliminates silent type-conversion bugs and makes code predictable and maintainable.`,
              keyPoints: [
                "Definition of implicit type coercion.",
                "Flaws of loose equality (==).",
                "Predictability of strict equality (===).",
                "Concrete examples."
              ]
            },
            {
              question: "List all primitive data types in JavaScript and identify the six falsy values.",
              marks: "3 Marks",
              answer: `1. **Seven Primitive Types:** \`number\`, \`string\`, \`boolean\`, \`null\`, \`undefined\`, \`symbol\`, and \`bigint\`.
2. **The Six Falsy Values:** Values that evaluate to \`false\` in a boolean context: \`false\`, \`0\`, \`""\` (empty string), \`null\`, \`undefined\`, and \`NaN\`.`,
              keyPoints: [
                "List 7 primitives.",
                "List 6 falsy values."
              ]
            }
          ],
          mcqs: [
            {
              question: "What is the output of the expression: typeof null in JavaScript?",
              options: [
              "\"null\"",
              "\"undefined\"",
              "\"object\"",
              "\"boolean\""
              ],
              correctIndex: 2,
              explanation: "In JavaScript, typeof null returns \"object\" due to a historical legacy bug in the original 1995 JS engine implementation."
            },
            {
              question: "Which of the following comparisons evaluates to FALSE?",
              options: [
              "\"5\" == 5",
              "0 == false",
              "null == undefined",
              "null === undefined"
              ],
              correctIndex: 3,
              explanation: "null === undefined evaluates to false because their data types are distinct (object/null vs undefined)."
            },
            {
              question: "What is the scope of a variable declared with the \"let\" keyword?",
              options: [
              "Global scope only",
              "Function scope",
              "Block scope ({ ... })",
              "Document scope"
              ],
              correctIndex: 2,
              explanation: "Variables declared with let and const are strictly scoped to the nearest enclosing block { ... }."
            },
            {
              question: "What is the output of console.log(\"10\" - 4 + \"2\") in JavaScript?",
              options: [
              "\"1042\"",
              "\"62\"",
              "8",
              "NaN"
              ],
              correctIndex: 1,
              explanation: "\"10\" - 4 evaluates to numeric 6 (subtraction forces number). Then 6 + \"2\" performs string concatenation, resulting in the string \"62\"."
            }
          ]
        },
        {
          id: "wt-u5-t2",
          title: "Document Object Model (DOM) Tree Architecture & Querying (getElementById, querySelector, querySelectorAll)",
          simpleExplanation: "When a browser loads an HTML page, it parses the tags into an interactive family tree of JavaScript objects called the Document Object Model (DOM). JavaScript uses DOM querying methods like getElementById to find specific tags and querySelector to select elements using familiar CSS selectors.",
          detailedExplanation: `## 1. What is the Document Object Model (DOM)?

The **Document Object Model (DOM)** is a platform- and language-neutral programming interface (API) standardized by the W3C. 

When a web browser downloads an HTML file, the browser's HTML parser transforms the raw text into an in-memory **hierarchical tree of interconnected Node objects**. 

The DOM is **not** the HTML file itself, nor is it the raw page source. It is the live, programmable object representation of the document that JavaScript inspects and modifies in real time.

\`\`\`mermaid
flowchart TD
    DOC["window.document (Root Object)"]
    DOC --> HTML["&lt;html&gt; Element Node"]
    HTML --> HEAD["&lt;head&gt; Element Node"]
    HTML --> BODY["&lt;body&gt; Element Node"]

    HEAD --> TITLE["&lt;title&gt; Node"]
    TITLE --> TTXT["Text: 'University Portal'"]

    BODY --> H1["&lt;h1 id='title'&gt; Node"]
    H1 --> H1TXT["Text: 'Web Technology'"]

    BODY --> UL["&lt;ul class='list'&gt; Node"]
    UL --> LI1["&lt;li&gt; Node"]
    LI1 --> L1TXT["Text: 'HTML5'"]
    UL --> LI2["&lt;li&gt; Node"]
    LI2 --> L2TXT["Text: 'CSS3'"]
\`\`\`

---

## 2. The Core Node Hierarchy

Everything in the DOM is a **Node**. The DOM defines several specific Node types:
1. **Document Node**: The root entry point (\`window.document\`).
2. **Element Node**: Any HTML tag (\`<div>\`, \`<p>\`, \`<a>\`). (Node type 1).
3. **Text Node**: The actual plain text enclosed within an element. (Node type 3).
4. **Attribute Node**: Metadata attributes like \`href\` or \`class\` (historically Node type 2).
5. **Comment Node**: HTML comments \`<!-- ... -->\`.

---

## 3. Traditional DOM Querying Methods (Legacy DOM Level 1 & 2)

Prior to modern CSS selector APIs, developers queried elements using specialized method calls:

### 1. \`document.getElementById('idString')\`
- **Returns**: A single Element reference matching the given ID, or \`null\` if not found.
- **Performance**: The fastest DOM lookup method in the browser because engines maintain an internal hash table mapping IDs directly to node pointers.
- Example: \`const heading = document.getElementById('main-title');\`

### 2. \`document.getElementsByClassName('className')\`
- **Returns**: A live **\`HTMLCollection\`** of all matching elements.
- **Drawback**: Does not support the Array \`.forEach()\` method natively!

### 3. \`document.getElementsByTagName('tagName')\`
- **Returns**: A live **\`HTMLCollection\`** of all elements matching the tag (e.g. \`'p'\`, \`'button'\`).

---

## 4. Modern DOM Querying: The Selectors API (DOM Level 3)

Modern JavaScript uses CSS-style selectors to find elements. This is the industry standard approach:

### 1. \`document.querySelector('cssSelector')\`
- **Returns**: The **FIRST** element within the document that matches the specified CSS selector string. If no matches are found, it returns \`null\`.
- Supports any valid CSS selector, including combinators and pseudo-classes:
  \`\`\`javascript
  const primaryBtn = document.querySelector('.btn-primary');
  const firstItem = document.querySelector('ul.menu > li:first-child');
  \`\`\`

### 2. \`document.querySelectorAll('cssSelector')\`
- **Returns**: A static **\`NodeList\`** containing **ALL** elements matching the selector.
- **Key Advantage**: Natively supports the \`.forEach()\` method for clean looping!
  \`\`\`javascript
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    console.log(\`Card \${index}:\`, card);
  });
  \`\`\`

---

## 5. Critical Distinction: \`HTMLCollection\` vs \`NodeList\`

This comparison is a classic university examination question:

| Feature | \`HTMLCollection\` | \`NodeList\` |
| :--- | :--- | :--- |
| **Returned By** | \`getElementsByClassName\`, \`getElementsByTagName\` | \`querySelectorAll\`, \`element.childNodes\` |
| **Liveness** | **Live**: Updates dynamically when DOM changes | **Static Snapshot** (from \`querySelectorAll\`) |
| **Allowed Nodes** | Element Nodes only | Can contain Elements, Text, Comments |
| **Iteration** | No native \`.forEach\` (must convert with \`Array.from\`) | Has built-in \`.forEach()\` support |

---

> [!IMPORTANT] **MEMORIZE:**
> - \`getElementById\` is the fastest lookup for a single element.
> - \`querySelector\` returns the **first** match; \`querySelectorAll\` returns all matches in a \`NodeList\`.
> - \`HTMLCollection\` is **live**; \`querySelectorAll\` returns a **static snapshot**.
> - Always pass valid CSS selector syntax to \`querySelector\` (e.g. include the dot for classes: \`querySelector('.btn')\`).

> [!NOTE] **DEV BRAIN:**
> Don't forget the selector prefix! A very common student mistake is writing \`document.querySelector('myButton')\` instead of \`document.querySelector('#myButton')\` or \`document.querySelector('.myButton')\`. Without a prefix, it searches for a non-existent \`<mybutton>\` HTML element!

> [!WARNING] **TRAP:**
> Because \`HTMLCollection\` is live, modifying the DOM while iterating through it with a \`for\` loop can cause infinite loops or skipped elements as the collection size shifts in real time!

> [!TIP] **EXAM TIP:**
> When asked to compare DOM query methods, contrast \`getElementById\` (fast, single, ID only) against \`querySelector\` (flexible, first match, any CSS selector) and explain the difference between static and live collections.`,
          shortNotes: "DOM represents HTML as a tree of objects. getElementById fetches a single ID fast; querySelector gets the first CSS match; querySelectorAll returns a static NodeList of all matches.",
          examples: [
            {
              title: "Querying and Iterating DOM Elements using querySelectorAll",
              problem: "Write a JavaScript script that queries all active course cards on a webpage and logs their names.",
              explanation: "Demonstrating querySelector, querySelectorAll, and iterating through a NodeList with forEach.",
              code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DOM Querying Demo</title>
</head>
<body>
  <h1 id="dept-title">Computer Science & Engineering</h1>
  <ul id="course-list">
    <li class="course-item active">Web Technology 102</li>
    <li class="course-item active">Data Structures 301</li>
    <li class="course-item">Operating Systems 401</li>
  </ul>

  <script>
    // 1. Query single element by ID
    const title = document.getElementById('dept-title');
    console.log('Department:', title.textContent);

    // 2. Query first active course using CSS selector
    const firstActive = document.querySelector('.course-item.active');
    console.log('First Active Course:', firstActive.textContent);

    // 3. Query all active courses into a NodeList
    const allActive = document.querySelectorAll('#course-list .active');
    console.log(\`Found \${allActive.length} active courses:\`);

    allActive.forEach((item, index) => {
      console.log(\`\${index + 1}. \${item.textContent}\`);
    });
  </script>
</body>
</html>`,
              output: "Department: Computer Science & Engineering\nFirst Active Course: Web Technology 102\nFound 2 active courses:\n1. Web Technology 102\n2. Data Structures 301"
            }
          ],
          keyPoints: [
            "The DOM is a tree-like object representation of the HTML document constructed by the browser.",
            "getElementById retrieves a single element by its ID attribute with the fastest execution speed.",
            "querySelector returns the first DOM element matching any valid CSS selector string.",
            "querySelectorAll returns a static NodeList of all matching elements.",
            "HTMLCollections are live structures, whereas querySelectorAll NodeLists are static snapshots."
          ],
          theoryQuestions: [
            {
              question: "What is the Document Object Model (DOM)? Explain the DOM tree structure with a neat hierarchical diagram.",
              marks: "5 Marks",
              answer: `1. **Definition:** The Document Object Model (DOM) is a language-neutral W3C standard API that represents an HTML or XML document as an interactive tree of objects. It connects web pages to programming languages like JavaScript.
2. **Structure:**
   - At the root is the \`window.document\` node.
   - Beneath the document is the root element node \`<html>\`.
   - \`<html>\` branches into \`<head>\` and \`<body>\` child nodes.
   - Each HTML tag becomes an **Element Node**.
   - Text inside tags becomes **Text Nodes** (leaf nodes).
   - Tag attributes (\`id\`, \`class\`, \`href\`) represent **Attribute properties** attached to element nodes.
3. **Purpose:** Enables JavaScript to inspect, manipulate, create, and delete HTML elements and CSS styles dynamically in response to user interaction.`,
              keyPoints: [
                "Definition of DOM API.",
                "Tree hierarchy: Document -> html -> head/body -> elements -> text.",
                "Dynamic manipulation capabilities."
              ]
            },
            {
              question: "Compare getElementById vs querySelector, and getElementsByClassName vs querySelectorAll.",
              marks: "5 Marks",
              answer: `1. **getElementById vs querySelector:**
   - \`getElementById("header")\`: Takes an ID string without prefix. Extremely fast direct hash lookup. Returns single Element or null.
   - \`querySelector("#header")\`: Accepts any CSS selector syntax (ID, class, attribute, combinator). Returns the first matching element. Highly versatile but slightly slower.
2. **getElementsByClassName vs querySelectorAll:**
   - \`getElementsByClassName("card")\`: Returns a **live HTMLCollection**. Automatically reflects subsequent DOM additions/deletions. Does not have a native \`.forEach()\` method.
   - \`querySelectorAll(".card")\`: Returns a **static NodeList** snapshot. Does not automatically change if DOM nodes are added later. Directly supports \`.forEach()\`.`,
              keyPoints: [
                "ID syntax vs CSS selector syntax.",
                "Single element return behavior.",
                "Live HTMLCollection vs static NodeList.",
                "Array method support."
              ]
            },
            {
              question: "What is the difference between a \"Live\" DOM collection and a \"Static\" DOM collection?",
              marks: "3 Marks",
              answer: `1. **Live DOM Collection (e.g. HTMLCollection):** Maintains an active real-time connection to the DOM. If JavaScript adds or removes an element matching the collection query, the collection automatically updates its length and indices immediately.
2. **Static DOM Collection (e.g. querySelectorAll NodeList):** Represents a fixed snapshot of matching elements at the exact millisecond the query was executed. Future DOM additions or deletions do not affect the contents of a static NodeList.`,
              keyPoints: [
                "Live reflects changes dynamically.",
                "Static is a fixed historical snapshot.",
                "Examples of each."
              ]
            }
          ],
          mcqs: [
            {
              question: "Which DOM method returns the FIRST element that matches a specified CSS selector string?",
              options: [
              "getElementById()",
              "querySelectorAll()",
              "querySelector()",
              "getElementsByTagName()"
              ],
              correctIndex: 2,
              explanation: "querySelector() evaluates any valid CSS selector and returns only the first matching Element (or null)."
            },
            {
              question: "What does document.querySelectorAll() return?",
              options: [
              "A live HTMLCollection",
              "A static NodeList",
              "A single DOM element",
              "A JavaScript Array"
              ],
              correctIndex: 1,
              explanation: "querySelectorAll() returns a static NodeList representing a snapshot of all matched DOM nodes."
            },
            {
              question: "Which DOM query method provides the fastest execution performance for finding an element by unique ID?",
              options: [
              "document.querySelector(\"#id\")",
              "document.getElementById(\"id\")",
              "document.querySelectorAll(\"#id\")[0]",
              "document.getElementsByName(\"id\")"
              ],
              correctIndex: 1,
              explanation: "getElementById() uses direct internal browser hash maps, providing the fastest lookup speed."
            },
            {
              question: "What happens if no matching element is found by document.querySelector(\".missing-card\")?",
              options: [
              "It throws an exception",
              "It returns undefined",
              "It returns null",
              "It returns an empty NodeList"
              ],
              correctIndex: 2,
              explanation: "querySelector() returns null if no matching elements exist in the document."
            }
          ]
        },
        {
          id: "wt-u5-t3",
          title: "DOM Modification: textContent vs innerHTML, setAttribute(), and style manipulation",
          simpleExplanation: "Once JavaScript finds an HTML element, it can modify it. You use textContent to safely change words, innerHTML to inject new HTML markup, setAttribute to change attributes like image sources or links, and classList or style to dynamically alter CSS formatting.",
          detailedExplanation: `## 1. Introduction: Mutating the DOM

After locating an element in the DOM tree, JavaScript can dynamically alter its contents, attributes, inline styles, or class memberships.

These mutations allow developers to build rich single-page applications (SPAs) where user interfaces update instantaneously without full page reloads.

---

## 2. Modifying Content: \`textContent\` vs \`innerText\` vs \`innerHTML\`

One of the most heavily scrutinized areas of web security and performance is how text and markup are injected into the DOM:

\`\`\`mermaid
flowchart TD
    MOD["DOM Content Injection Methods"]
    MOD --> TC["textContent (Best Practice for Text)
Parses pure text; Fast; Escapes HTML;
Completely safe against XSS attacks"]
    MOD --> IT["innerText (Avoid unless needed)
Considers CSS layout/hidden styles;
Triggers costly layout reflow"]
    MOD --> IH["innerHTML (High Risk)
Parses raw HTML tags;
CRITICAL: Causes XSS if used with user input!"]
\`\`\`

### 1. \`element.textContent\` (Recommended for Text)
- Retrieves or sets the text content of the node and all its descendants.
- Treats all inputs as **pure plain text**. If you pass \`"<b>Hello</b>"\`, it literally renders the angle brackets on screen as visible text, never executing them as markup.
- **Fast and Secure**: Completely impervious to **Cross-Site Scripting (XSS)** vulnerabilities!

### 2. \`element.innerText\`
- Returns the "rendered" visible text, respecting CSS (ignores elements hidden via \`display: none\`).
- Triggers expensive layout recalculations (browser reflow).

### 3. \`element.innerHTML\` (Use with Extreme Caution)
- Parses the provided string as raw HTML markup and constructs new DOM nodes.
- **The Critical XSS Vulnerability**: If you inject untrusted user input using \`innerHTML\`, an attacker can inject malicious \`<script>\` or \`<img src=x onerror="...">\` tags to steal session cookies or hijack accounts!

\`\`\`javascript
// DANGEROUS: XSS Attack Vector!
const userInput = '<img src="x" onerror="alert(document.cookie)">';
card.innerHTML = userInput; // Executes malicious script!

// SAFE: Pure Plain Text
card.textContent = userInput; // Safely displays text without executing!
\`\`\`

---

## 3. Attribute Manipulation

JavaScript provides standard DOM methods to manage HTML attributes:

1. **\`element.getAttribute('attrName')\`**: Reads the current value of an attribute.
2. **\`element.setAttribute('attrName', 'value')\`**: Sets or overwrites an attribute.
   \`\`\`javascript
   const avatar = document.querySelector('#avatar');
   avatar.setAttribute('src', 'profiles/user101.jpg');
   avatar.setAttribute('alt', 'User Profile Photo');
   \`\`\`
3. **\`element.removeAttribute('attrName')\`**: Deletes the attribute entirely.
4. **\`element.hasAttribute('attrName')\`**: Returns \`true\` if the attribute exists.

---

## 4. Manipulating CSS Styles: Inline Styles vs \`classList\`

### 1. Direct Style Manipulation (\`element.style\`)
- Modifies **inline styles** directly on the element's \`style\` attribute.
- CSS property names with hyphens (kebab-case) are converted to **camelCase** in JavaScript:
  - \`background-color\` -> \`element.style.backgroundColor = '#2563eb'\`
  - \`font-size\` -> \`element.style.fontSize = '18px'\`
  - \`margin-top\` -> \`element.style.marginTop = '10px'\`

### 2. The \`classList\` API (Industry Best Practice)
Directly writing inline styles with JS is messy and violates separation of concerns. Instead, define CSS classes in your stylesheet and toggle them using **\`classList\`**:

\`\`\`javascript
const modal = document.querySelector('#modal');

modal.classList.add('active');       // Adds class
modal.classList.remove('hidden');    // Removes class
modal.classList.toggle('dark-mode'); // Toggles class on/off like a light switch
modal.classList.contains('active');  // Returns boolean true/false
\`\`\`

---

## 5. Creating and Appending New DOM Elements

To dynamically build UI components, follow the three-step lifecycle:
1. **Create**: \`const newDiv = document.createElement('div');\`
2. **Configure**: Add classes, text, and attributes:
   \`\`\`javascript
   newDiv.classList.add('notification');
   newDiv.textContent = 'Registration submitted successfully!';
   \`\`\`
3. **Append**: Mount it into the existing DOM tree:
   \`\`\`javascript
   document.body.appendChild(newDiv);
   // Or modern: parent.append(newDiv);
   \`\`\`

---

> [!IMPORTANT] **MEMORIZE:**
> - Use **\`textContent\`** for inserting text safely without XSS risk.
> - Never use **\`innerHTML\`** with untrusted user input!
> - CSS hyphenated properties become **camelCase** in JS (\`backgroundColor\`).
> - Use **\`classList.add()\` / \`classList.toggle()\`** instead of hardcoding inline styles.

> [!NOTE] **DEV BRAIN:**
> If you need to insert multiple elements at once, use a **\`DocumentFragment\`** (\`document.createDocumentFragment()\`). Appending 100 elements one-by-one to \`document.body\` causes 100 browser reflows; appending them to a fragment and mounting the fragment causes only ONE reflow!

> [!WARNING] **TRAP:**
> When setting numerical CSS values via \`element.style\`, remember to include the unit string! Setting \`element.style.width = 300\` will fail silently in standards mode; you MUST write \`element.style.width = '300px'\`.

> [!TIP] **EXAM TIP:**
> When asked about DOM manipulation security in exams, highlight **Cross-Site Scripting (XSS)** as the primary danger of \`innerHTML\` and explain how \`textContent\` safely escapes HTML entities.`,
          shortNotes: "Use textContent for safe text injection (prevents XSS); innerHTML parses markup. Manipulate attributes via setAttribute(). Toggle classes cleanly using classList (add, remove, toggle).",
          examples: [
            {
              title: "Dynamic Element Creation, ClassList Toggling, and Safe Text Mutation",
              problem: "Write a JavaScript application that creates an alert badge, configures its style using classList, and safely updates text content.",
              explanation: "Demonstrates createElement, textContent, classList.toggle, and mounting nodes with appendChild.",
              code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DOM Mutation Demo</title>
  <style>
    .alert-box { padding: 12px 20px; border-radius: 6px; margin: 10px 0; font-family: sans-serif; }
    .success { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }
    .dark-theme { background: #0f172a; color: white; }
  </style>
</head>
<body>
  <div id="container"></div>
  <button id="toggle-btn">Toggle Dark Theme</button>

  <script>
    // 1. Create a new DOM element
    const alertBox = document.createElement('div');

    // 2. Configure classes and safe text
    alertBox.classList.add('alert-box', 'success');
    alertBox.textContent = 'Operation completed: Student record saved successfully!';

    // 3. Mount to container
    const container = document.getElementById('container');
    container.appendChild(alertBox);

    // 4. Toggle theme on button click
    const btn = document.getElementById('toggle-btn');
    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
    });
  </script>
</body>
</html>`,
              output: "A green alert message created dynamically in the DOM with a functional theme toggle button."
            }
          ],
          keyPoints: [
            "textContent safely sets text content without evaluating HTML markup, neutralizing XSS attacks.",
            "innerHTML parses strings into HTML DOM nodes but poses severe security risks if used with user input.",
            "setAttribute() and getAttribute() allow programmatic control over HTML attributes.",
            "The classList API (add, remove, toggle, contains) provides the cleanest way to alter element styling.",
            "CSS properties in element.style use camelCase notation (e.g. fontSize, backgroundColor)."
          ],
          theoryQuestions: [
            {
              question: "Differentiate between textContent, innerText, and innerHTML. Explain the security risks associated with innerHTML.",
              marks: "5 Marks",
              answer: `1. **textContent:** Returns or sets the complete textual content of a node and all descendants, treating input as raw literal text. It does not parse HTML tags and does not trigger browser reflow. It is fast and secure against Cross-Site Scripting (XSS).
2. **innerText:** Returns visible rendered text, taking into account CSS styles (e.g., skips text hidden with \`display: none\`). It triggers expensive layout reflows.
3. **innerHTML:** Sets or returns the HTML markup contained inside an element. It parses the string into live DOM nodes.
4. **Security Risk (XSS):** If untrusted user input (from forms, URL parameters, or databases) is inserted via \`innerHTML\`, malicious actors can inject \`<script>\` or \`<img onerror="...">\` tags that execute arbitrary JavaScript, stealing user credentials and authentication tokens.`,
              keyPoints: [
                "Comparison of all three properties.",
                "Reflow and performance differences.",
                "XSS security explanation and exploitation vector."
              ]
            },
            {
              question: "Explain the classList API and its core methods. Why is classList preferred over directly modifying element.style?",
              marks: "5 Marks",
              answer: `1. **The classList API:** Provides methods to manipulate the classes assigned to an element without manually parsing the \`class\` attribute string.
2. **Core Methods:**
   - \`classList.add("className")\`: Adds one or more classes.
   - \`classList.remove("className")\`: Removes one or more classes.
   - \`classList.toggle("className")\`: Adds the class if absent, removes it if present.
   - \`classList.contains("className")\`: Returns boolean true if class is present.
3. **Why Preferred Over \`element.style\`:**
   - **Separation of Concerns:** Keeps visual design rules inside CSS stylesheets rather than scattering inline styles across JavaScript.
   - **Performance:** Modifying a class triggers fewer recalculations than setting 10 individual inline styles.
   - **Cleanliness:** Easy to toggle complex multi-rule state themes with a single method call.`,
              keyPoints: [
                "Explanation of 4 methods: add, remove, toggle, contains.",
                "Separation of concerns advantage.",
                "Maintainability and performance."
              ]
            },
            {
              question: "Write JavaScript code to dynamically create an unordered list (<ul>) with three list items (<li>) and mount it to document.body.",
              marks: "3 Marks",
              answer: `\`\`\`javascript
const ul = document.createElement("ul");
const subjects = ["HTML5", "CSS3", "JavaScript"];

subjects.forEach(subject => {
  const li = document.createElement("li");
  li.textContent = subject;
  ul.appendChild(li);
});

document.body.appendChild(ul);
\`\`\``,
              keyPoints: [
                "document.createElement.",
                "Setting textContent.",
                "appendChild in loop.",
                "Mounting to document.body."
              ]
            }
          ],
          mcqs: [
            {
              question: "Which property should be used to safely insert text into an element to prevent Cross-Site Scripting (XSS) attacks?",
              options: [
              "innerHTML",
              "textContent",
              "outerHTML",
              "document.write"
              ],
              correctIndex: 1,
              explanation: "textContent treats all input strictly as plain text, escaping any HTML tags and neutralizing XSS vulnerabilities."
            },
            {
              question: "How is the CSS property \"background-color\" represented when accessed via the JavaScript element.style object?",
              options: [
              "element.style.background-color",
              "element.style.backgroundColor",
              "element.style.background_color",
              "element.style[\"background-color-css\"]"
              ],
              correctIndex: 1,
              explanation: "CSS properties with hyphens are accessed in JavaScript using camelCase: element.style.backgroundColor."
            },
            {
              question: "Which classList method adds a class if it is missing, or removes it if it is already present?",
              options: [
              "classList.switch()",
              "classList.replace()",
              "classList.toggle()",
              "classList.alter()"
              ],
              correctIndex: 2,
              explanation: "classList.toggle() inverts the presence of a class, acting like a light switch."
            },
            {
              question: "What is the correct syntax to create a new paragraph element in JavaScript?",
              options: [
              "document.makeElement(\"p\")",
              "document.createElement(\"p\")",
              "new Element(\"p\")",
              "document.append(\"p\")"
              ],
              correctIndex: 1,
              explanation: "document.createElement(\"tagName\") is the standard W3C DOM method to instantiate new element nodes."
            }
          ]
        },
        {
          id: "wt-u5-t4",
          title: "Event Handling: addEventListener, Event Propagation (Bubbling vs Capturing), and event.preventDefault()",
          simpleExplanation: "Events are signals that something happened on a webpage—like a click, scroll, or keystroke. addEventListener is the modern way to listen for events. When an event fires, it trickles down through the DOM tree (capturing) and bubbles back up (bubbling). event.preventDefault() stops default browser actions like form reloads.",
          detailedExplanation: `## 1. Introduction: The Event-Driven Web

JavaScript in the browser is **event-driven**. Rather than running from top to bottom and quitting, the browser stays alive inside an **Event Loop**, waiting for asynchronous events triggered by the user (mouse clicks, key presses, scrolling) or the system (image loaded, timer expired, network response arrived).

When an event occurs, the browser creates an **Event Object** and dispatches it through the DOM tree to any registered listener functions.

---

## 2. Registering Event Handlers

There are three ways to listen for events in JavaScript history:

### 1. Inline HTML Attributes (Legacy Anti-Pattern - Avoid)
\`\`\`html
<button onclick="alert('Clicked!')">Click Me</button>
\`\`\`
- Violates separation of concerns and executes code in global scope.

### 2. DOM Property Handlers (Outdated)
\`\`\`javascript
btn.onclick = function() { console.log('Handler 1'); };
btn.onclick = function() { console.log('Handler 2'); }; // Overwrites Handler 1!
\`\`\`
- Cannot attach multiple listeners to the same event.

### 3. \`addEventListener()\` (The Modern Standard)
\`\`\`javascript
element.addEventListener(eventType, handlerFunction, useCaptureOrOptions);
\`\`\`
- Allows attaching **multiple independent listeners** to the same event.
- Supports fine-grained control over event capturing, passive scrolling, and one-time listeners (\`{ once: true }\`).
- Easily cleaned up using \`element.removeEventListener()\`.

---

## 3. The Three Phases of Event Propagation

When you click a button nested deep inside several \`<div>\` containers, the event does not merely fire on the button. It travels through the entire DOM tree in **three distinct phases**:

\`\`\`mermaid
flowchart TD
    WINDOW["window / Document"] -->|"1. Capturing Phase (Trickling down)"| PARENT["&lt;div class='container'&gt;"]
    PARENT -->|"1. Capturing Phase"| TARGET["&lt;button id='btn'&gt; (TARGET)"]
    TARGET -->|"2. Target Phase"| TARGET
    TARGET -->|"3. Bubbling Phase (Bubbling UP)"| PARENT
    PARENT -->|"3. Bubbling Phase"| WINDOW
\`\`\`

### Phase 1: Capturing Phase (Trickling Down)
- The event begins at the \`window\` and descends down the DOM hierarchy through ancestors until it reaches the parent of the target.
- Listeners registered with \`addEventListener('click', fn, true)\` or \`{ capture: true }\` fire during this phase. (Rarely used in app code).

### Phase 2: Target Phase
- The event reaches the actual element that was clicked (\`e.target\`).

### Phase 3: Bubbling Phase (Bubbling Up - The Default)
- The event "bubbles" upward from the target element through all its ancestor parent nodes until it reaches the \`window\`.
- **Standard behavior**: By default, \`addEventListener('click', fn)\` listens during the **Bubbling Phase** (\`useCapture = false\`).

---

## 4. The Event Object & Critical Methods

When an event handler executes, the browser automatically passes an **Event Object (\`e\` or \`event\`)** as the first argument:

### 1. \`e.target\` vs \`e.currentTarget\`
- **\`e.target\`**: The actual innermost DOM element that initiated or triggered the event (the button you physically clicked).
- **\`e.currentTarget\`**: The element to which the event listener was actually attached.

### 2. \`e.preventDefault()\`
- Cancels the browser's default native action associated with that event:
  - Form submission (\`submit\`): Stops the browser from reloading the page or navigating away.
  - Anchor tag (\`click\`): Stops the link from following the \`href\` URL.
  - Checkbox (\`click\`): Stops the checkbox from being checked.

### 3. \`e.stopPropagation()\`
- Prevents the event from traveling further up (bubbling) or down (capturing) the DOM tree.
- Sibling listeners on the same element still run, but ancestor containers will never know the event occurred.

---

## 5. Architectural Pattern: Event Delegation

Instead of attaching 500 event listeners to 500 individual list items (which consumes massive browser memory), **Event Delegation** attaches a **single event listener** to a common parent element, leveraging the bubbling phase:

\`\`\`javascript
const list = document.querySelector('#todo-list');

// Single listener on parent UL handles clicks for all LI children!
list.addEventListener('click', (e) => {
  if (e.target && e.target.nodeName === 'LI') {
    e.target.classList.toggle('completed');
  }
});
\`\`\`

### Advantages of Event Delegation:
1. **Memory Optimization**: 1 listener instead of hundreds.
2. **Dynamic Elements**: Automatically handles newly created list items added in the future without needing to re-attach listeners!

---

> [!IMPORTANT] **MEMORIZE:**
> - Event phases: **Capturing (Down) -> Target -> Bubbling (Up)**.
> - Default \`addEventListener\` listens during **Bubbling**.
> - \`e.preventDefault()\` cancels default browser behavior (e.g. form reload).
> - \`e.stopPropagation()\` stops bubbling up the DOM tree.
> - **Event Delegation** uses bubbling on a parent to manage events for all children.

> [!NOTE] **DEV BRAIN:**
> When building Single Page Applications (React, Vue, vanilla JS), the very first line of your form submit handler is almost always \`e.preventDefault();\`. This stops the browser from refreshing the page so your JavaScript can submit form data via the Fetch API instead!

> [!WARNING] **TRAP:**
> Don't confuse \`e.preventDefault()\` with \`e.stopPropagation()\`:
> - \`e.preventDefault()\`: "Don't submit the form / Don't follow the link."
> - \`e.stopPropagation()\`: "Don't let my parent containers know I was clicked."

> [!TIP] **EXAM TIP:**
> When asked about Event Propagation in exams, always draw a diagram showing a parent container and a child button with arrows traveling down for "Capturing / Trickling" and arrows traveling up for "Bubbling".`,
          shortNotes: "addEventListener attaches listeners. Event flow: Capturing (down) -> Target -> Bubbling (up). e.preventDefault() stops browser default behavior; e.stopPropagation() halts bubbling. Delegation attaches 1 listener to parent.",
          examples: [
            {
              title: "Event Delegation and Form Submit Interception with preventDefault",
              problem: "Write a program intercepting form submission to prevent page reload, and using event delegation to handle clicks on dynamically generated list items.",
              explanation: "Demonstrates e.preventDefault(), dynamic element creation, and event delegation using e.target.",
              code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Event Handling Demo</title>
</head>
<body>
  <form id="item-form">
    <input type="text" id="item-input" placeholder="New Task" required>
    <button type="submit">Add Task</button>
  </form>

  <ul id="task-list"></ul>

  <script>
    const form = document.getElementById('item-form');
    const input = document.getElementById('item-input');
    const list = document.getElementById('task-list');

    // 1. Intercept form submit and cancel page reload
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevents page refresh!
      
      const li = document.createElement('li');
      li.textContent = input.value;
      list.appendChild(li);
      input.value = '';
    });

    // 2. Event Delegation: Single listener on parent <ul>
    list.addEventListener('click', (e) => {
      if (e.target && e.target.nodeName === 'LI') {
        e.target.style.textDecoration = 'line-through';
        console.log('Completed task:', e.target.textContent);
      }
    });
  </script>
</body>
</html>`,
              output: "Submitting the form adds tasks without page reload, and clicking any task strikes it through via event delegation."
            }
          ],
          keyPoints: [
            "addEventListener is the modern standard for binding events, supporting multiple listeners and bubbling control.",
            "Event propagation travels in three phases: Capturing (down), Target, and Bubbling (up).",
            "e.target identifies the element that initiated the event; e.currentTarget identifies where the listener is bound.",
            "e.preventDefault() cancels native browser behaviors like page reloads on form submissions.",
            "Event delegation exploits event bubbling to manage events for multiple children via a single parent listener."
          ],
          theoryQuestions: [
            {
              question: "Explain Event Propagation in JavaScript. Detail the differences between the Capturing Phase and the Bubbling Phase with an architectural diagram.",
              marks: "7 Marks",
              answer: `1. **Event Propagation:** The lifecycle process through which an event travels through the DOM tree from the window to the target element and back.
2. **The Three Phases:**
   - **Phase 1: Capturing Phase (Trickling):** The event originates at \`window\`, passes through \`document\`, \`<html>\`, \`<body>\`, and descends down through ancestral parent elements toward the target element.
   - **Phase 2: Target Phase:** The event arrives at the innermost target node that was clicked (\`e.target\`).
   - **Phase 3: Bubbling Phase:** The event reverses direction and travels upward from the target element through all ancestral parents back to \`window\`.
3. **Default Behavior:** \`element.addEventListener("click", fn)\` listens during the **Bubbling Phase** by default. To listen during Capturing, set the third parameter to \`true\` (\`{ capture: true }\`).`,
              keyPoints: [
                "Definition of event propagation.",
                "Capturing vs Bubbling direction.",
                "Target phase.",
                "Default bubbling in addEventListener."
              ]
            },
            {
              question: "What is Event Delegation in JavaScript? Explain its advantages and write code demonstrating its implementation.",
              marks: "5 Marks",
              answer: `1. **Definition:** Event Delegation is a programming pattern where instead of attaching event listeners to multiple child elements individually, a single event listener is attached to their common parent container. It leverages the event bubbling phase.
2. **How it works:** When a child is clicked, the event bubbles up to the parent. The parent inspects \`e.target\` to identify which child was clicked and executes appropriate logic.
3. **Advantages:**
   - **Memory Efficiency:** Avoids creating dozens or hundreds of listener closures in browser memory.
   - **Dynamic Nodes:** Automatically handles elements added to the DOM dynamically in the future without needing to attach new listeners.
4. **Code Snippet:**
\`\`\`javascript
document.getElementById("parent-list").addEventListener("click", function(e) {
  if (e.target && e.target.nodeName === "LI") {
    console.log("Clicked item:", e.target.textContent);
  }
});
\`\`\``,
              keyPoints: [
                "Definition and relationship to bubbling.",
                "Memory benefits and dynamic node handling.",
                "e.target checking code."
              ]
            },
            {
              question: "Differentiate between e.preventDefault() and e.stopPropagation() with clear examples of each.",
              marks: "5 Marks",
              answer: `1. **\`e.preventDefault()\`:** Cancels the default browser action that would normally accompany the event. It does NOT stop the event from bubbling up the DOM tree.
   - *Example:* On a form submit event (\`<form>\`), calling \`e.preventDefault()\` stops the browser from submitting an HTTP request and refreshing the page.
2. **\`e.stopPropagation()\`:** Prevents the event from continuing its journey along the propagation path (stops it from bubbling up to parent ancestors or capturing down).
   - *Example:* Inside a nested popup card (\`<div class="card">\`) with a close button (\`<button>\`), clicking the button closes the card and calls \`e.stopPropagation()\` so that an outer container click event is not accidentally triggered.`,
              keyPoints: [
                "Canceling native behavior vs halting DOM tree traversal.",
                "Form reload example for preventDefault.",
                "Nested container click example for stopPropagation."
              ]
            }
          ],
          mcqs: [
            {
              question: "During which event phase do standard addEventListener() listeners execute by default?",
              options: [
              "Capturing Phase",
              "Target Phase only",
              "Bubbling Phase",
              "Compilation Phase"
              ],
              correctIndex: 2,
              explanation: "By default (unless useCapture is set to true), addEventListener registers listeners for the Bubbling phase."
            },
            {
              question: "Which method prevents the browser from executing its native default action (such as following a hyperlink or refreshing on form submit)?",
              options: [
              "e.stopPropagation()",
              "e.preventDefault()",
              "e.stopImmediatePropagation()",
              "e.cancelBubble()"
              ],
              correctIndex: 1,
              explanation: "e.preventDefault() cancels the default browser behavior associated with the event."
            },
            {
              question: "What is the primary architectural benefit of utilizing Event Delegation?",
              options: [
              "It enables multi-threaded execution",
              "It allows a single parent listener to handle events for all current and future children, conserving memory",
              "It prevents all network requests",
              "It forces synchronous layout rendering"
              ],
              correctIndex: 1,
              explanation: "Event delegation reduces memory overhead by binding one listener to a common ancestor and automatically handles dynamically inserted children."
            },
            {
              question: "In an event handler, what is the difference between e.target and e.currentTarget?",
              options: [
              "e.target is the element that fired the event; e.currentTarget is the element the listener is attached to",
              "e.target is always window; e.currentTarget is the document",
              "They are identical aliases for the same object",
              "e.target only works on mobile devices"
              ],
              correctIndex: 0,
              explanation: "e.target is the actual innermost element clicked, whereas e.currentTarget is the element holding the listener."
            }
          ]
        }
      ]
    },
    {
      id: "wt-u6",
      title: "Unit 6: Form Validation, Regular Expressions & JSON",
      description: "Multi-layer validation architecture, HTML5 constraint API, regular expressions pattern matching, input sanitization, and JSON serialization/deserialization standards.",
      topics: [
        {
          id: "wt-u6-t1",
          title: "Client-Side vs Server-Side Validation, HTML5 Constraint Validation (required, pattern, min, max)",
          simpleExplanation: "Form validation ensures that user input is correct, safe, and complete before saving it. Client-side validation happens instantly inside the user browser for great UX, but it can be bypassed by hackers. Server-side validation happens on the backend and is mandatory for security. HTML5 provides built-in validation attributes like required, min, max, and pattern.",
          detailedExplanation: `## 1. Introduction: Why Web Applications Must Validate Data

Every interactive website receives data from human users. Humans make honest mistakes: they mistype email addresses, leave required fields blank, or enter negative ages. 

Worse, malicious actors deliberately submit dangerous payloads designed to attack the system, such as:
- **SQL Injection (SQLi)**: Submitting \`' OR '1'='1\` into login fields to bypass authentication.
- **Cross-Site Scripting (XSS)**: Submitting \`<script>stealCookies()</script>\` into comment forms.

To defend web systems, engineering teams implement **Data Validation** at multiple layers of the application stack.

---

## 2. Client-Side vs Server-Side Validation

The relationship between client-side and server-side validation is one of the most critical security concepts in computer science.

\`\`\`mermaid
flowchart TD
    INPUT["User Fills Out Web Form"] --> CLIENT["1. Client-Side Validation (Browser)
- Instant feedback
- Saves network bandwidth
- EASILY BYPASSED (Disable JS / cURL)"]
    CLIENT -->|"Passes Browser Checks"| NET["Network HTTP POST Request"]
    NET --> SERVER["2. Server-Side Validation (Backend API)
- Checks DB constraints
- Sanitizes SQL & XSS injection
- CANNOT BE BYPASSED (Authoritative Defense)"]
    SERVER -->|"Valid"| DB[("Database Save")]
    SERVER -->|"Invalid"| ERR["HTTP 400 Bad Request Response"]
\`\`\`

### 1. Client-Side Validation (Runs in the Browser)
- Executed on the user's computer via HTML5 constraint attributes or JavaScript before any network transmission occurs.
- **Advantages**:
  - **Instant Feedback**: Users are warned immediately if their password is too short without waiting for a server round-trip.
  - **Bandwidth Reduction**: Prevents garbage requests from clogging the web server.
- **The Fatal Flaw**: **Client-side validation provides ZERO security!** Anyone can bypass client validation by:
  - Disabling JavaScript in browser settings.
  - Editing the DOM using Chrome DevTools (deleting the \`required\` attribute).
  - Submitting data directly to the server API using cURL, Postman, or Python scripts.

### 2. Server-Side Validation (Runs on Backend Servers)
- Executed on the backend (Node.js, Python Django, Java Spring, PHP) before data touches the database.
- **The Golden Rule of Software Security**: **NEVER TRUST USER INPUT.**
- Authoritative, tamper-proof, and mandatory for every production application.

### The Strategy: Defense in Depth
Modern web development uses **BOTH**:
- **Client-Side** for **User Experience (UX)**.
- **Server-Side** for **Security and Integrity**.

---

## 3. HTML5 Constraint Validation API

HTML5 introduced native declarative validation attributes that eliminate the need for complex JavaScript for basic input validation:

| Attribute | Applies To | Validation Behavior |
| :--- | :--- | :--- |
| **\`required\`** | text, email, select, checkbox | Browser blocks submission if field is empty |
| **\`pattern="regex"\`** | text, search, tel, url, email | Requires input to strictly match a regular expression |
| **\`min / max\`** | number, range, date | Restricts numeric value or date limits |
| **\`minlength / maxlength\`** | text, textarea | Restricts string character length |
| **\`type="email"\`** | email | Enforces standard RFC email syntax (requires \`@\` and domain) |
| **\`type="url"\`** | url | Requires valid URI scheme (\`http://\` or \`https://\`) |
| **\`step\`** | number, range | Enforces numeric increments (e.g. \`step="0.01"\` for currency) |

---

## 4. Styling Valid & Invalid States via CSS

Modern CSS provides pseudo-classes that automatically style inputs based on their real-time validation status:

\`\`\`css
/* Glow red when invalid after typing */
input:invalid {
  border-color: #ef4444;
  background-color: #fef2f2;
}

/* Glow green when valid */
input:valid {
  border-color: #22c55e;
  background-color: #f0fdf4;
}

/* Add an asterisk or indicator to required fields */
input:required {
  border-left: 4px solid #2563eb;
}
\`\`\`

---

## 5. JavaScript Constraint Validation Methods

For advanced logic, developers interact with the native HTML5 validation engine using JavaScript methods:
- **\`input.checkValidity()\`**: Returns \`true\` if the element meets all its validation constraints; otherwise \`false\`.
- **\`input.reportValidity()\`**: Evaluates constraints and displays the browser's native error bubble popup if invalid.
- **\`input.validationMessage\`**: Returns a localized string explaining why the input failed validation (e.g. *"Please fill out this field"*).
- **\`input.setCustomValidity('Custom error message')\`**: Sets a customized validation message. Setting it to an empty string (\`""\`) marks the field as valid.

---

> [!IMPORTANT] **MEMORIZE:**
> - Client-side validation is for **UX**; Server-side validation is for **Security**.
> - Client-side validation can be completely bypassed by disabling JavaScript or using cURL.
> - Never trust the client: **always validate again on the server!**
> - HTML5 constraint attributes: \`required\`, \`pattern\`, \`min\`, \`max\`, \`minlength\`, \`maxlength\`.

> [!NOTE] **DEV BRAIN:**
> Add the \`novalidate\` attribute to your \`<form>\` tag during testing or when using custom JavaScript error UI. This disables the default browser popup bubbles so you can render beautiful custom error alerts beneath your inputs!

> [!WARNING] **TRAP:**
> Never believe that setting \`maxlength="10"\` on an HTML input prevents a user from submitting a 5000-character payload to your database. A hacker using Postman ignores HTML attributes completely!

> [!TIP] **EXAM TIP:**
> In exams, when asked "Why is client-side validation alone insufficient?", list 3 ways to bypass it: (1) Disabling browser JS, (2) Inspecting and deleting attributes in DevTools, and (3) Sending direct HTTP requests via Postman/cURL.`,
          shortNotes: "Client validation provides instant user feedback; server validation is mandatory for security because client checks can be easily bypassed. HTML5 offers required, pattern, min, and max.",
          examples: [
            {
              title: "HTML5 Form with Native Constraint Validation and CSS Status Indicators",
              problem: "Create a registration form utilizing required, pattern, min/max limits, and CSS :valid/:invalid pseudo-classes.",
              explanation: "Demonstrates declarative validation rules without custom JavaScript, showing green/red borders on validity.",
              code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Constraint Validation Demo</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }
    .form-group { margin-bottom: 1rem; }
    label { display: block; margin-bottom: 4px; font-weight: 600; }
    input { width: 300px; padding: 8px 12px; border: 2px solid #cbd5e1; border-radius: 6px; }
    
    /* CSS Constraint Validation Pseudo-classes */
    input:focus:invalid { border-color: #ef4444; }
    input:focus:valid { border-color: #22c55e; }
  </style>
</head>
<body>
  <h2>Student Registration</h2>
  <form action="/register" method="POST">
    <div class="form-group">
      <label for="username">Roll Number (ITM + 4 digits):</label>
      <input type="text" id="username" name="username" pattern="^ITM\\d{4}$" placeholder="e.g. ITM2026" required>
    </div>

    <div class="form-group">
      <label for="age">Age (Must be 17 to 30):</label>
      <input type="number" id="age" name="age" min="17" max="30" required>
    </div>

    <button type="submit">Submit</button>
  </form>
</body>
</html>`,
              output: "Inputs dynamically show green borders when meeting constraints and red borders when syntax or boundaries are violated."
            }
          ],
          keyPoints: [
            "Client-side validation runs in the browser for instant user guidance and bandwidth reduction.",
            "Server-side validation is non-negotiable for security and data integrity because client checks are easily bypassed.",
            "HTML5 constraint attributes include required, pattern, min, max, minlength, and maxlength.",
            "CSS pseudo-classes :valid and :invalid automatically reflect constraint status.",
            "JavaScript Constraint Validation APIs allow programmatic inspection via checkValidity() and setCustomValidity()."
          ],
          theoryQuestions: [
            {
              question: "Compare Client-Side Validation and Server-Side Validation across security, user experience, speed, and bypassability.",
              marks: "5 Marks",
              answer: `1. **Security:** Client-side validation offers zero real security because it can be entirely bypassed by attackers using command-line tools or disabling browser scripts. Server-side validation is secure and tamper-proof.
2. **User Experience & Feedback:** Client-side provides instant interactive feedback without page reloads or network latency. Server-side feedback requires a full HTTP network round-trip.
3. **Network & Server Load:** Client-side intercepts invalid data before transmission, conserving server processing and bandwidth. Server-side consumes server compute cycles for validation.
4. **Bypassability:** Client-side can be bypassed via DevTools, cURL, or Postman. Server-side code executes on the backend and cannot be bypassed by clients.
5. **Conclusion:** Both are essential: Client-side for UX, Server-side for security (Defense in Depth).`,
              keyPoints: [
                "Comparison across 4 parameters.",
                "UX advantages of client.",
                "Security supremacy of server.",
                "Defense in depth philosophy."
              ]
            },
            {
              question: "Explain five HTML5 Constraint Validation attributes with code syntax and validation rules.",
              marks: "5 Marks",
              answer: `1. **required:** Blocks submission if the field is empty. Syntax: \`<input type="text" required>\`.
2. **pattern="regex":** Enforces that the entered string strictly matches a regular expression. Syntax: \`<input type="text" pattern="[A-Z]{5}">\`.
3. **min and max:** Defines numeric or calendar boundary limits. Syntax: \`<input type="number" min="1" max="100">\` or \`<input type="date" min="2026-01-01">\`.
4. **minlength and maxlength:** Sets the minimum and maximum character count permitted in textual inputs. Syntax: \`<input type="password" minlength="8">\`.
5. **type="email":** Leverages native browser parser to verify standard email format containing \`@\` and valid domain syntax.`,
              keyPoints: [
                "Explanation of 5 distinct attributes.",
                "Code examples for each.",
                "Validation mechanics."
              ]
            },
            {
              question: "Why is client-side validation alone never sufficient for securing a web application? Give three specific technical reasons.",
              marks: "3 Marks",
              answer: `Client-side validation is completely insufficient for security because:
1. **DevTools DOM Modification:** Users can open browser developer tools and delete the \`required\` or \`pattern\` attributes from the HTML DOM in two clicks.
2. **Disabling JavaScript:** Users can disable JavaScript execution in browser settings, neutralizing all JS validation scripts.
3. **Direct API Calls:** Attackers do not use browsers; they send raw HTTP POST requests directly to backend endpoints using tools like Postman, cURL, or custom Python scripts, bypassing the browser entirely.`,
              keyPoints: [
                "DOM attribute deletion via DevTools.",
                "Disabling JavaScript in browser.",
                "Direct HTTP transmission via cURL/Postman."
              ]
            }
          ],
          mcqs: [
            {
              question: "What is the primary reason why server-side validation is mandatory even if thorough client-side validation exists?",
              options: [
              "Client-side validation is too slow",
              "Client-side validation can be easily bypassed by disabling JavaScript or using tools like cURL",
              "Server-side validation uses less CPU power",
              "HTML5 is not supported on mobile devices"
              ],
              correctIndex: 1,
              explanation: "Client-side validation runs in an untrusted environment controlled by the user; attackers can easily bypass it."
            },
            {
              question: "Which HTML5 attribute allows developers to enforce custom input formats using regular expressions?",
              options: [
              "validate",
              "pattern",
              "regex",
              "format"
              ],
              correctIndex: 1,
              explanation: "The pattern attribute defines a regular expression against which the input value is checked during form validation."
            },
            {
              question: "Which CSS pseudo-class matches a form input that currently meets all its declared validation constraints?",
              options: [
              ":checked",
              ":valid",
              ":success",
              ":enabled"
              ],
              correctIndex: 1,
              explanation: ":valid targets form elements whose content meets all constraint validation requirements."
            },
            {
              question: "What is the purpose of the form attribute \"novalidate\"?",
              options: [
              "It clears all form inputs automatically",
              "It disables native browser HTML5 validation checks upon form submission",
              "It prevents the form from being submitted over HTTPS",
              "It encrypts form values with AES-256"
              ],
              correctIndex: 1,
              explanation: "novalidate instructs the browser to bypass native HTML5 constraint checks, allowing custom JavaScript validation."
            }
          ]
        },
        {
          id: "wt-u6-t2",
          title: "JavaScript Form Validation & Regular Expressions (RegExp for Email, Phone Number, Password Strength)",
          simpleExplanation: "Regular Expressions (RegEx) are special search patterns used to check if text matches an exact format. With JavaScript and RegEx, you can verify that an email address has a valid domain, a phone number contains exactly 10 digits starting with 6-9, and a password has a strong combination of uppercase letters, numbers, and symbols.",
          detailedExplanation: `## 1. Introduction: What is a Regular Expression (RegExp)?

A **Regular Expression (RegExp or regex)** is an extremely powerful sequence of characters that forms a search pattern. 

In web technology, regular expressions are universally used for:
1. **Input Validation**: Verifying that user input adheres to strict formats (email, phone, credit card, postal code).
2. **Text Parsing & Scraping**: Extracting specific data patterns from large documents.
3. **Search & Replace**: Sanitizing bad words or reformatting dates.

In JavaScript, a RegExp can be created in two ways:
- **RegExp Literal (Preferred)**: \`const regex = /pattern/flags;\`
- **RegExp Constructor**: \`const regex = new RegExp('pattern', 'flags');\`

---

## 2. Core Regular Expression Syntax & Metacharacters

\`\`\`mermaid
flowchart LR
    REGEX["RegExp Building Blocks"]
    REGEX --> ANCHORS["Anchors
^ (Start of string)
$ (End of string)"]
    REGEX --> CHAR["Character Classes
\\d (Digit 0-9)
\\w (Word char [a-zA-Z0-9_])
\\s (Whitespace)"]
    REGEX --> QUANT["Quantifiers
+ (1 or more)
* (0 or more)
? (0 or 1 optional)
{min,max} (Range)"]
    REGEX --> GROUPS["Groups & Sets
[A-Z] (Uppercase set)
(abc) (Capturing group)
(?=...) (Lookahead)"]
\`\`\`

### Metacharacter Reference Guide:
- **\`^\`**: Asserts the **start** of a string (\`^A\` matches strings starting with 'A').
- **\`$\`**: Asserts the **end** of a string (\`Z$\` matches strings ending with 'Z').
- **\`\\d\`**: Matches any digit from \`0\` to \`9\` (equivalent to \`[0-9]\`).
- **\`\\D\`**: Matches any non-digit character.
- **\`\\w\`**: Matches any word character (letters, numbers, underscores: \`[a-zA-Z0-9_]\`).
- **\`\\s\`**: Matches whitespace (space, tab, newline).
- **\`.\` (Dot)**: Matches any single character except newlines.
- **\`[abc]\`**: Matches any single character enclosed in the brackets.
- **\`[^abc]\`**: Negated character set (matches anything EXCEPT a, b, or c).

### Quantifiers:
- **\`+\`**: 1 or more occurrences.
- **\`*\`**: 0 or more occurrences.
- **\`?\`**: 0 or 1 occurrence (optional).
- **\`{n}\`**: Exactly \`n\` occurrences (e.g., \`\\d{4}\` matches exactly 4 digits).
- **\`{min,max}\`**: Between \`min\` and \`max\` occurrences (e.g., \`\\w{3,8}\`).

---

## 3. The Three Universal Web Validation Patterns

University exams routinely require writing regular expressions for mobile numbers, email addresses, and passwords:

### 1. 10-Digit Mobile Number (Indian Telecom Standard)
\`\`\`javascript
const phoneRegex = /^[6-9]\\d{9}$/;
\`\`\`
- \`^\`: String must start here.
- \`[6-9]\`: The first digit must be 6, 7, 8, or 9 (standard Indian mobile prefixes).
- \`\\d{9}\`: Followed by exactly 9 numeric digits.
- \`$\`: String must end here (ensures exactly 10 digits total, no trailing letters).

### 2. Standard Email Address Validation
\`\`\`javascript
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
\`\`\`
- \`^[a-zA-Z0-9._%+-]+\`: Username portion (letters, digits, dots, hyphens).
- \`@\`: Mandatory at-symbol separator.
- \`[a-zA-Z0-9.-]+\`: Mail server domain name (e.g. \`gmail\`, \`itmuniversity\`).
- \`\\.\`: Literal dot (escaped with backslash).
- \`[a-zA-Z]{2,}$\`: Top-level domain (TLD) of at least 2 letters (e.g. \`com\`, \`in\`, \`org\`).

### 3. High-Security Password Strength (Lookahead Assertions)
To enforce a strong password (minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number, 1 special character), we use **Positive Lookaheads \`(?=...)\`**:
\`\`\`javascript
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;
\`\`\`
- \`(?=.*[a-z])\`: Must contain at least one lowercase letter.
- \`(?=.*[A-Z])\`: Must contain at least one uppercase letter.
- \`(?=.*\\d)\`: Must contain at least one digit.
- \`(?=.*[@$!%*?&])\`: Must contain at least one special symbol.
- \`{8,}\`: Total length must be at least 8 characters.

---

## 4. JavaScript RegExp Methods

JavaScript offers built-in methods to execute regular expressions:

### 1. \`regex.test(str)\` (Best for Validation)
- Returns **\`true\`** if the string matches the pattern; otherwise **\`false\`**.
\`\`\`javascript
const isValidPhone = /^[6-9]\\d{9}$/.test("9876543210"); // true
\`\`\`

### 2. \`str.match(regex)\`
- Returns an Array of matches or \`null\` if no match is found.

### 3. \`str.replace(regex, replacement)\`
- Replaces matches with a replacement string.

---

> [!IMPORTANT] **MEMORIZE:**
> - Mobile pattern: \`/^[6-9]\\d{9}$/\`.
> - Always wrap validation regexes in \`^\` (start) and \`$\` (end) so extra characters cannot bypass checks.
> - \`regex.test(string)\` returns a boolean \`true\` or \`false\`.
> - Escaped \`\\d\` represents digits \`[0-9]\`; \`\\w\` represents word characters.

> [!NOTE] **DEV BRAIN:**
> Never try to validate emails with a 500-character RFC 5322 regex. In the real world, the best email validation is simple regex syntax checking followed by sending an actual verification email with an activation link!

> [!WARNING] **TRAP:**
> Forgetting \`^\` and \`$\` is the most common student error! Without them, \`/\\d{10}/\` will return \`true\` for \`"abc1234567890xyz"\` because 10 digits exist somewhere in the middle!

> [!TIP] **EXAM TIP:**
> When asked to write a JavaScript form validation script in an exam, follow the clean 4-step structure:
> 1. Get input values with \`document.getElementById\`.
> 2. Test values against \`regex.test()\`.
> 3. Display an inline error message in a \`<span>\` if false.
> 4. Call \`e.preventDefault()\` to halt submission.`,
          shortNotes: "RegEx defines search patterns. Mobile: /^[6-9]\\d{9}$/. Email: /^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$/. regex.test(str) returns true if valid. Use ^ and $ to anchor full string.",
          examples: [
            {
              title: "Complete Client-Side Form Validation Script with RegEx",
              problem: "Write an interactive JavaScript validation program that verifies a 10-digit mobile number, email, and strong password upon submission.",
              explanation: "Demonstrates submit interception, RegExp testing, dynamic error messages, and form blocking.",
              code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>RegEx Validation Demo</title>
  <style>
    .error { color: #ef4444; font-size: 0.85rem; display: block; margin-top: 4px; }
    .form-row { margin-bottom: 15px; }
  </style>
</head>
<body>
  <h2>User Account Registration</h2>
  <form id="reg-form">
    <div class="form-row">
      <label for="email">Email Address:</label><br>
      <input type="text" id="email">
      <span id="email-error" class="error"></span>
    </div>

    <div class="form-row">
      <label for="phone">Indian Mobile Number:</label><br>
      <input type="text" id="phone">
      <span id="phone-error" class="error"></span>
    </div>

    <button type="submit">Register</button>
  </form>

  <script>
    const form = document.getElementById('reg-form');

    form.addEventListener('submit', (e) => {
      let isValid = true;

      // 1. Regular Expressions
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
      const phoneRegex = /^[6-9]\\d{9}$/;

      // 2. Validate Email
      const emailVal = document.getElementById('email').value.trim();
      const emailErr = document.getElementById('email-error');
      if (!emailRegex.test(emailVal)) {
        emailErr.textContent = 'Please enter a valid email address (e.g. user@domain.com)';
        isValid = false;
      } else {
        emailErr.textContent = '';
      }

      // 3. Validate Phone Number
      const phoneVal = document.getElementById('phone').value.trim();
      const phoneErr = document.getElementById('phone-error');
      if (!phoneRegex.test(phoneVal)) {
        phoneErr.textContent = 'Mobile must be 10 digits starting with 6, 7, 8, or 9';
        isValid = false;
      } else {
        phoneErr.textContent = '';
      }

      // 4. Halt submission if invalid
      if (!isValid) {
        e.preventDefault();
      } else {
        alert('Validation Successful! Form submitting...');
      }
    });
  </script>
</body>
</html>`,
              output: "Displays clear red error messages underneath fields that fail regex tests and prevents submission until all fields are valid."
            }
          ],
          keyPoints: [
            "Regular expressions provide pattern-matching syntax for text validation and extraction.",
            "Anchors ^ (beginning) and $ (end) ensure the entire string is validated rather than a substring.",
            "Metacharacters \\d (digits) and \\w (word characters) streamline pattern definitions.",
            "regex.test(str) returns true if the string matches the pattern, making it ideal for conditionals.",
            "Password strength validation leverages positive lookaheads (?=...) to enforce character variety."
          ],
          theoryQuestions: [
            {
              question: "What is a Regular Expression? Explain common metacharacters (^, $, \\d, \\w, +, *) with practical examples.",
              marks: "5 Marks",
              answer: `1. **Definition:** A Regular Expression (RegExp) is a standardized string of characters that defines a search pattern, used in web applications for form validation, string matching, and text manipulation.
2. **Metacharacters:**
   - \`^\` (Caret): Asserts the start of the string. Example: \`^A\` matches "Apple", not "Banana".
   - \`$\` (Dollar): Asserts the end of the string. Example: \`end$\` matches "the end", not "endless".
   - \`\\d\`: Matches any digit from 0 to 9 (\`[0-9]\`). Example: \`\\d{3}\` matches "123".
   - \`\\w\`: Matches any alphanumeric word character and underscore (\`[a-zA-Z0-9_]\`).
   - \`+\` (Plus Quantifier): Matches 1 or more occurrences of the preceding element. Example: \`a+\` matches "a", "aaa".
   - \`*\` (Asterisk Quantifier): Matches 0 or more occurrences. Example: \`ab*c\` matches "ac", "abc", "abbbc".`,
              keyPoints: [
                "Definition of RegExp.",
                "Explanation of ^, $, \\d, \\w, +, * with examples."
              ]
            },
            {
              question: "Write a JavaScript validation function that validates an Indian mobile number and an email address using Regular Expressions.",
              marks: "5 Marks",
              answer: `\`\`\`javascript
function validateInputs(email, phone) {
  // 1. Indian Mobile: Starts with 6-9, followed by 9 digits (10 digits total)
  const phonePattern = /^[6-9]\\d{9}$/;
  
  // 2. Email: user @ domain . tld
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;

  const isPhoneValid = phonePattern.test(phone);
  const isEmailValid = emailPattern.test(email);

  if (!isPhoneValid) {
    console.error("Invalid Mobile: Must be 10 digits starting with 6-9");
  }
  if (!isEmailValid) {
    console.error("Invalid Email: Check @ and domain format");
  }

  return isPhoneValid && isEmailValid;
}
\`\`\``,
              keyPoints: [
                "Mobile regex pattern /^[6-9]\\d{9}$/.",
                "Email regex pattern.",
                "Usage of .test() method.",
                "Boolean validation check."
              ]
            },
            {
              question: "Explain how positive lookaheads (?=...) work in Regular Expressions with respect to strong password validation.",
              marks: "3 Marks",
              answer: `A positive lookahead \`(?=pattern)\` inspects characters ahead in the string without consuming them or moving the matching cursor. In password validation:
- \`(?=.*[A-Z])\` asserts: "Look ahead from start, ensure there is at least one uppercase letter."
- \`(?=.*\\d)\` asserts: "Look ahead from start, ensure there is at least one digit."
By chaining multiple lookaheads together at the start of a regex (\`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$\`), we enforce multiple independent criteria regardless of the order in which the characters appear.`,
              keyPoints: [
                "Definition of non-consuming lookahead assertion.",
                "Chaining lookaheads for password rules.",
                "Enforcing uppercase, lowercase, and digits."
              ]
            }
          ],
          mcqs: [
            {
              question: "Which JavaScript RegExp method returns a boolean true or false indicating if a string matches a pattern?",
              options: [
              "regex.exec()",
              "regex.test()",
              "str.search()",
              "str.validate()"
              ],
              correctIndex: 1,
              explanation: "regex.test(str) returns true if there is a match between the regular expression and the specified string."
            },
            {
              question: "What does the regular expression /^[6-9]\\d{9}$/ validate?",
              options: [
              "A 9-digit postal code",
              "A 10-digit Indian mobile number starting with 6, 7, 8, or 9",
              "A 10-character alphanumeric password",
              "Any number greater than 69"
              ],
              correctIndex: 1,
              explanation: "It validates an exact 10-digit number starting with 6, 7, 8, or 9."
            },
            {
              question: "Which metacharacter matches any alphanumeric character or underscore (equivalent to [a-zA-Z0-9_])?",
              options: [
              "\\d",
              "\\s",
              "\\w",
              "\\b"
              ],
              correctIndex: 2,
              explanation: "\\w represents word characters: letters, digits, and underscores."
            },
            {
              question: "Why are the anchors ^ and $ essential when writing regular expressions for form validation?",
              options: [
              "They convert the string to uppercase",
              "They ensure the pattern matches the ENTIRE input string rather than just finding a substring inside it",
              "They enable multiline GPU acceleration",
              "They are required by the JavaScript compiler to prevent syntax errors"
              ],
              correctIndex: 1,
              explanation: "^ asserts the beginning and $ asserts the end; without them, invalid strings containing partial matches would pass validation."
            }
          ]
        },
        {
          id: "wt-u6-t3",
          title: "JSON (JavaScript Object Notation): Serialization via JSON.stringify() and Deserialization via JSON.parse()",
          simpleExplanation: "JSON (JavaScript Object Notation) is the universal text format used by web browsers and servers to exchange data. Because network cables can only send raw text, you convert JavaScript objects into JSON text using JSON.stringify() (serialization), and convert JSON text back into real JavaScript objects using JSON.parse() (deserialization).",
          detailedExplanation: `## 1. What is JSON (JavaScript Object Notation)?

**JSON (JavaScript Object Notation)** is a lightweight, text-based, language-independent data interchange format standardized under **RFC 8259** and **ECMA-404**.

Whenever a client browser communicates with a modern backend REST API (via \`fetch\` or \`axios\`), data is almost universally transmitted as a JSON string.

\`\`\`mermaid
flowchart LR
    JS_OBJ["JavaScript Object / State
{ name: 'Aarav', sem: 1 }"]
    JSON_STR["JSON String Payload
'{"name":"Aarav","sem":1}'"]
    SERVER["Backend Server
(Database / API)"]

    JS_OBJ -->|"JSON.stringify() (Serialization)"| JSON_STR
    JSON_STR -->|"HTTP POST /api/students"| SERVER
    SERVER -->|"HTTP 200 JSON Response"| JSON_STR
    JSON_STR -->|"JSON.parse() (Deserialization)"| JS_OBJ
\`\`\`

---

## 2. Why JSON Replaced XML

In the early 2000s, **XML (eXtensible Markup Language)** was the dominant data exchange format across the web (as in "AJAX"). Today, JSON has almost completely supplanted XML because:

| Feature | JSON | XML |
| :--- | :--- | :--- |
| **Syntax Verbosity** | Minimalist, clean, compact | Heavy closing tags (\`<name>...</name>\`) |
| **Parsing Speed** | Native browser engine parsing (Very Fast) | Requires complex XML DOM Parsers (Slow) |
| **Data Types** | Supports Strings, Numbers, Booleans, Arrays, Null | Everything is initially treated as plain text strings |
| **Human Readability** | Highly intuitive | Cluttered by tags and namespaces |
| **JavaScript Integration**| Direct, native 1:1 language mapping | Requires traversal via \`getElementsByTagName\` |

---

## 3. Strict JSON Syntax Rules

While JSON syntax looks nearly identical to a JavaScript object literal, JSON enforces **very strict formatting rules**:

1. **Keys MUST be enclosed in DOUBLE QUOTES**:
   - Valid: \`{"name": "Aarav"}\`
   - Invalid: \`{name: "Aarav"}\` (Missing quotes)
   - Invalid: \`{'name': 'Aarav'}\` (Single quotes are **ILLEGAL** in JSON!)
2. **Strings MUST use DOUBLE QUOTES**: Single quotes (\`'value'\`) cause a fatal syntax error.
3. **NO Trailing Commas**: In JavaScript objects, \`{ a: 1, b: 2, }\` is allowed. In JSON, trailing commas after the last item throw a fatal \`SyntaxError\`.
4. **Permitted Data Types in JSON**:
   - **String** (in double quotes)
   - **Number** (integers or floating-point)
   - **Boolean** (\`true\` or \`false\`)
   - **Array** (\`[ ... ]\`)
   - **Object** (\`{ ... }\`)
   - **null**
5. **FORBIDDEN Data Types in JSON**:
   - **Functions / Methods**: Cannot be represented in JSON.
   - **\`undefined\`**: Omitted or ignored.
   - **Date Objects**: Converted into ISO-8601 strings.
   - **Symbols & BigInt**: Cannot be serialized directly.

---

## 4. Serialization: \`JSON.stringify()\`

**Serialization** is the process of converting an in-memory runtime data structure or object into a standardized string of bytes suitable for network transmission or disk storage.

\`\`\`javascript
JSON.stringify(value, replacer, space)
\`\`\`

- **\`value\`**: The JavaScript object or array to convert.
- **\`replacer\`**: (Optional) An array of properties to include, or a transform function.
- **\`space\`**: (Optional) Number of indentation spaces for human-readable pretty-printing!

\`\`\`javascript
const student = {
  id: 101,
  name: "Diya Patel",
  courses: ["Web Tech", "DSA"],
  active: true,
  secretKey: undefined // Will be silently stripped out!
};

// Compact serialization for network transmission
const payload = JSON.stringify(student);
// Output: '{"id":101,"name":"Diya Patel","courses":["Web Tech","DSA"],"active":true}'

// Pretty-printed JSON with 2-space indentation
const formatted = JSON.stringify(student, null, 2);
\`\`\`

---

## 5. Deserialization: \`JSON.parse()\`

**Deserialization** (or Parsing) is the reverse process: taking a raw JSON string received from an API or local storage and converting it back into a live JavaScript object.

\`\`\`javascript
const jsonString = '{"id":101,"name":"Diya Patel","active":true}';
const userObj = JSON.parse(jsonString);

console.log(userObj.name); // "Diya Patel" (Now a real JS object!)
\`\`\`

### The Vital Safety Rule: Always Use \`try...catch\`!
If incoming JSON text is malformed (e.g. missing a quote, unexpected token, or server returned an HTML 500 error page instead of JSON), \`JSON.parse()\` throws a fatal **\`SyntaxError\`** that will crash your entire application if uncaught!

\`\`\`javascript
function safeParse(jsonStr) {
  try {
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error("Failed to parse JSON payload:", err.message);
    return null;
  }
}
\`\`\`

---

## 6. The Deep Clone Trick

A popular interview question is using JSON to perform a deep clone of a nested object:
\`\`\`javascript
const original = { user: { name: "Aarav" }, tags: [1, 2] };
const deepCopy = JSON.parse(JSON.stringify(original));
\`\`\`
*(Limitation: Loses functions, \`undefined\`, and converts Dates to strings).*

---

> [!IMPORTANT] **MEMORIZE:**
> - JSON keys and strings **MUST use double quotes** (\`"key": "value"\`). Single quotes are forbidden!
> - No trailing commas allowed in JSON.
> - \`JSON.stringify()\` serializes JS objects into JSON strings.
> - \`JSON.parse()\` deserializes JSON strings into JS objects.
> - Always wrap \`JSON.parse()\` in \`try...catch\` to prevent crashes.

> [!NOTE] **DEV BRAIN:**
> When inspecting API responses in the browser console, use \`console.log(JSON.stringify(data, null, 2))\` to pretty-print massive, deeply nested objects with clean indentation.

> [!WARNING] **TRAP:**
> Students often forget that \`localStorage\` in browsers can ONLY store strings! If you write \`localStorage.setItem('user', userObj)\`, it will literally save the useless string \`"[object Object]"\`. You MUST write \`localStorage.setItem('user', JSON.stringify(userObj))\`!

> [!TIP] **EXAM TIP:**
> When asked to differentiate between JSON and XML in an exam, draw a side-by-side comparison table highlighting syntax, file size, parsing mechanism, data types, and readability.`,
          shortNotes: "JSON is lightweight data interchange text. Keys/strings require double quotes; no trailing commas. JSON.stringify() converts objects to strings; JSON.parse() converts strings to objects (wrap in try-catch).",
          examples: [
            {
              title: "Serialization, Deserialization, and LocalStorage Persistence",
              problem: "Demonstrate serializing a student record into JSON, storing it in localStorage, retrieving it, and safely parsing it with try-catch.",
              explanation: "Demonstrates JSON.stringify with pretty-printing, localStorage integration, and safe JSON.parse handling.",
              code: `// 1. In-memory JavaScript Object
const studentProfile = {
  rollNo: "ITM102",
  name: "Aarav Sharma",
  semester: 1,
  grades: { "Web Tech": "A+", "Python": "A" },
  enrolled: true
};

// 2. Serialization: Convert object to JSON string
const serializedData = JSON.stringify(studentProfile);
console.log('Serialized JSON:', serializedData);

// 3. Storing in browser storage
localStorage.setItem('student_data', serializedData);

// 4. Deserialization: Retrieve string and convert back to Object
const retrievedString = localStorage.getItem('student_data');

try {
  const parsedStudent = JSON.parse(retrievedString);
  console.log('Deserialization Successful!');
  console.log('Student Name:', parsedStudent.name);
  console.log('Web Tech Grade:', parsedStudent.grades["Web Tech"]);
} catch (error) {
  console.error('JSON parsing failed:', error.message);
}`,
              output: "Serialized JSON: {\"rollNo\":\"ITM102\",\"name\":\"Aarav Sharma\",\"semester\":1,\"grades\":{\"Web Tech\":\"A+\",\"Python\":\"A\"},\"enrolled\":true}\nDeserialization Successful!\nStudent Name: Aarav Sharma\nWeb Tech Grade: A+"
            }
          ],
          keyPoints: [
            "JSON is a text-based, language-independent data format widely used in REST APIs and web services.",
            "JSON syntax strictly requires double quotes for all property keys and string values.",
            "JSON does not support functions, undefined, or trailing commas.",
            "JSON.stringify() converts JavaScript data structures into formatted JSON strings.",
            "JSON.parse() deserializes JSON strings back into JavaScript objects and should be safeguarded with try...catch."
          ],
          theoryQuestions: [
            {
              question: "What is JSON? Explain its syntax rules and compare it with XML as a data interchange format.",
              marks: "5 Marks",
              answer: `1. **Definition:** JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format based on a subset of JavaScript object literal syntax. It is language-independent and universally supported across modern web frameworks.
2. **Syntax Rules:**
   - Keys must be strings enclosed in double quotes (\`"key": value\`).
   - String values must use double quotes; single quotes are invalid.
   - Data elements are separated by commas, but trailing commas are strictly prohibited.
   - Supports: string, number, boolean, array, object, and null.
3. **Comparison with XML:**
   - **Verbosity:** JSON has no end tags, making it significantly more compact and saving bandwidth compared to XML.
   - **Parsing Speed:** JSON is parsed natively by browser JavaScript engines, whereas XML requires slow DOM parser trees.
   - **Data Types:** JSON supports native typed data (numbers, booleans); XML represents all values as strings.`,
              keyPoints: [
                "Definition and RFC standard.",
                "Syntax rules (double quotes, no trailing commas).",
                "Comparison with XML: verbosity, parsing speed, data types."
              ]
            },
            {
              question: "Explain JSON.stringify() and JSON.parse(). What parameters do they accept and why should JSON.parse() be enclosed in a try-catch block?",
              marks: "5 Marks",
              answer: `1. **\`JSON.stringify(value, replacer, space)\`:** Serializes a JavaScript value to a JSON string. \`replacer\` optionally filters keys or modifies values. \`space\` adds indentation spaces for pretty-printing.
2. **\`JSON.parse(text, reviver)\`:** Deserializes a JSON string into a native JavaScript object or array. \`reviver\` optionally transforms individual parsed values before returning.
3. **Why \`try...catch\` is Mandatory:** If the input string passed to \`JSON.parse()\` is malformed JSON (e.g. contains single quotes, unquoted keys, trailing commas, or is an HTML error response from an API), JavaScript immediately throws an uncaught \`SyntaxError\`. Wrapping the call inside a \`try...catch\` block prevents application crashes and allows graceful error recovery.`,
              keyPoints: [
                "Parameters for JSON.stringify.",
                "Parameters for JSON.parse.",
                "SyntaxError crash prevention via try-catch."
              ]
            },
            {
              question: "What data types are NOT permitted in JSON, and what happens to them when processed by JSON.stringify()?",
              marks: "3 Marks",
              answer: `1. **Not Permitted in JSON:** Functions, \`undefined\`, \`Symbol\`, and circular object references.
2. **Behavior during \`JSON.stringify()\`:**
   - Object properties whose values are functions, \`undefined\`, or Symbols are **silently omitted** from the serialized output.
   - In an array, they are converted to \`null\`.
   - Passing an object with circular references throws a \`TypeError: Converting circular structure to JSON\`.`,
              keyPoints: [
                "Forbidden types (functions, undefined, Symbol, circular references).",
                "Omission in objects vs null in arrays.",
                "Circular reference TypeError."
              ]
            }
          ],
          mcqs: [
            {
              question: "Which of the following is a VALID JSON string snippet?",
              options: [
              "{ 'name': 'Aarav', 'age': 20 }",
              "{ \"name\": \"Aarav\", \"age\": 20, }",
              "{ \"name\": \"Aarav\", \"age\": 20 }",
              "{ name: \"Aarav\", age: 20 }"
              ],
              correctIndex: 2,
              explanation: "JSON strictly requires double quotes for all keys and strings, and forbids trailing commas."
            },
            {
              question: "What method converts a JavaScript object into a JSON string?",
              options: [
              "JSON.parse()",
              "JSON.stringify()",
              "JSON.serialize()",
              "JSON.toString()"
              ],
              correctIndex: 1,
              explanation: "JSON.stringify() serializes JavaScript objects into valid JSON formatted text."
            },
            {
              question: "What happens if you execute JSON.parse() on a string containing invalid JSON syntax without a try-catch block?",
              options: [
              "It returns null",
              "It returns undefined",
              "It throws a fatal SyntaxError exception that halts code execution",
              "It returns an empty object {}"
              ],
              correctIndex: 2,
              explanation: "Malformed JSON strings cause JSON.parse() to throw a SyntaxError exception."
            },
            {
              question: "Which of the following data types is completely omitted when an object is serialized using JSON.stringify()?",
              options: [
              "boolean",
              "number",
              "undefined",
              "null"
              ],
              correctIndex: 2,
              explanation: "Properties with undefined values (as well as functions and symbols) are omitted during JSON.stringify() serialization."
            }
          ]
        }
      ]
    }
  ]
};
