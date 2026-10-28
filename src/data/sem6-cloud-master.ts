import { Subject } from './types';

export const sem6CloudMaster: Subject = {
  id: "sem6-cloud",
  name: "Cloud Computing & Distributed Systems",
  code: "CC602",
  color: "bg-sky-600",
  icon: "cloud",
  description: "Comprehensive University Syllabus for Cloud Computing — Cloud Service Models (IaaS, PaaS, SaaS), Virtualization (Type-1/Type-2 Hypervisors, KVM, Docker Containers), Distributed Consensus (CAP Theorem, PACELC, Raft, Paxos), Cloud Storage Architectures (S3 Object Storage, Block vs File), and Serverless Microservices.",
  semester: 6,
  units: [
    {
      id: "cloud-u1",
      title: "Unit 1: Cloud Architecture, Service Models & Virtualization",
      description: "NIST Cloud Characteristics, Service Models (IaaS, PaaS, SaaS), Deployment Models (Public, Private, Hybrid, Multi-Cloud), Full vs Para-Virtualization, and Containerization (Docker vs VMs).",
      topics: [
        {
          id: "cloud-u1-t1",
          title: "NIST Cloud Definition, Service Models (SPI), Hypervisor Virtualization vs Containerization",
          simpleExplanation: "Cloud computing is the on-demand delivery of IT resources (compute, database, storage) over the internet with pay-as-you-go pricing. The NIST standard specifies 5 essential characteristics (On-demand self-service, Broad network access, Resource pooling, Rapid elasticity, Measured service), 3 service models (IaaS, PaaS, SaaS), and 4 deployment models. Virtualization decouples software from physical hardware, while Containers package application code and dependencies to run uniformly across environments.",
          detailedExplanation: `## 1. The SPI Cloud Service Model Breakdown

\`\`\`mermaid
flowchart TD
    subgraph SaaS ["Software as a Service (SaaS)"]
        direction TB
        S1["User Manages: NONE (Data only)"]
        S2["Vendor Manages: Application, Runtime, OS, Hardware"]
        S3["Examples: Google Workspace, Microsoft 365, Salesforce"]
    end

    subgraph PaaS ["Platform as a Service (PaaS)"]
        direction TB
        P1["User Manages: Application Code & Data"]
        P2["Vendor Manages: Runtime, Middleware, OS, Hardware"]
        P3["Examples: AWS Elastic Beanstalk, Heroku, Google App Engine"]
    end

    subgraph IaaS ["Infrastructure as a Service (IaaS)"]
        direction TB
        I1["User Manages: OS, Middleware, Runtime, Application"]
        I2["Vendor Manages: Virtualization, Servers, Storage, Networking"]
        I3["Examples: AWS EC2, Google Compute Engine (GCE), Azure VMs"]
    end
\`\`\`

---

## 2. Virtual Machines (Type-1 & Type-2) vs Docker Containers

| Architectural Dimension | Type-1 Bare-Metal Hypervisor | Type-2 Hosted Hypervisor | Docker Containerization |
| :--- | :--- | :--- | :--- |
| **Underlying Layer** | Physical Server Hardware | Host Operating System | Host OS Kernel via **cgroups & namespaces** |
| **Guest OS Overhead** | Complete Guest OS per VM (GBs) | Complete Guest OS per VM (GBs) | **No Guest OS** (Shared host kernel, MBs) |
| **Startup Latency** | 30 - 90 seconds (Full boot) | 45 - 120 seconds | **Sub-second (10 - 200 ms)** |
| **Resource Isolation** | Hardware-level VT-x/AMD-V isolation | Software isolation | Kernel namespace isolation |
| **Representative Tech** | VMware ESXi, KVM, Xen | VirtualBox, VMware Workstation | Docker, Podman, containerd |`,
          shortNotes: "IaaS gives raw VMs; PaaS manages runtime and OS; SaaS provides ready software. Containers share host kernel using namespaces and cgroups, booting in milliseconds with minimal overhead.",
          examples: [
            {
              title: "Multi-Stage Dockerfile for High-Performance Production Microservice",
              problem: "Write an optimized, secure multi-stage Dockerfile that packages a Node.js/Go backend into an unprivileged scratch/alpine image.",
              explanation: "Multi-stage builds compile code in a heavy build image and copy only the compiled binary to a tiny runtime image.",
              code: `# Stage 1: Build & Compile
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o server .

# Stage 2: Minimal Distroless / Scratch Runtime
FROM alpine:3.19
RUN adduser -D -u 10001 nonroot
USER nonroot
WORKDIR /app
COPY --from=builder /app/server .
EXPOSE 8080
ENTRYPOINT ["./server"]`
            }
          ],
          keyPoints: [
            "NIST defines 5 essential cloud characteristics: On-demand self-service, broad network access, resource pooling, rapid elasticity, and measured service.",
            "Type-1 hypervisors execute directly on physical bare metal, providing highest efficiency.",
            "Linux cgroups throttle CPU/RAM quotas while namespaces provide isolated process/network views.",
            "Shared responsibility model: Cloud provider secures 'of the cloud' while customer secures 'in the cloud'."
          ],
          theoryQuestions: [
            {
              question: "Differentiate between IaaS, PaaS, and SaaS under the Cloud Shared Responsibility Model.",
              marks: "7 Marks",
              answer: "In IaaS, provider manages physical hardware, networking, and virtualization; tenant manages OS, patches, middleware, runtime, and app. In PaaS, provider manages OS, runtime, and patching; tenant focuses solely on application logic and data. In SaaS, provider manages end-to-end stack including application; user simply consumes software interface and manages user access."
            }
          ],
          mcqs: [
            {
              question: "Which Linux kernel feature enables Docker containers to enforce memory and CPU usage limits?",
              options: ["Namespaces", "Control Groups (cgroups)", "Chroot", "Netfilter iptables"],
              correctIndex: 1,
              explanation: "Control Groups (cgroups) allocate and limit hardware resource utilization (CPU, memory, disk I/O, network bandwidth) among process trees."
            }
          ]
        }
      ]
    },
    {
      id: "cloud-u2",
      title: "Unit 2: Distributed Consensus & Distributed Storage Systems",
      description: "CAP Theorem, PACELC Theorem, Raft Consensus Algorithm, DynamoDB distributed key-value model, and Amazon S3 Object Storage.",
      topics: [
        {
          id: "cloud-u2-t1",
          title: "The CAP & PACELC Theorems, Raft Consensus State Machine, and Object Storage (S3)",
          simpleExplanation: "In distributed systems spanning multiple servers, hardware and network partitions are inevitable. The CAP Theorem states that during a network partition, a system can choose either Consistency (all nodes see identical data) or Availability (every request receives a response), but cannot guarantee both. Raft is an understandable consensus algorithm that maintains an identical replicated log across servers using leader election and heartbeats.",
          detailedExplanation: `## 1. CAP Theorem & PACELC Framework

\`\`\`mermaid
flowchart TD
    CAP["CAP Theorem Under Partition (P)"] --> CP["CP (Consistency + Partition Tolerance)"]
    CAP --> AP["AP (Availability + Partition Tolerance)"]
    
    CP --> CP_EX["Returns Error if consistency cannot be verified\nExamples: Google Spanner, MongoDB, ZooKeeper, etcd"]
    AP --> AP_EX["Returns Stale data rather than failing\nExamples: Amazon DynamoDB, Apache Cassandra, CouchDB"]
\`\`\`

### PACELC Theorem:
- **If there is a Partition (P)**: How does the system trade off **Availability (A)** vs **Consistency (C)**?
- **Else (E)** (normal operation): How does the system trade off **Latency (L)** vs **Consistency (C)**?

---

## 2. Raft Consensus Algorithm (3 Roles & Phases)
1. **Leader**: Manages all client interactions, writes log entries, and sends periodic heartbeats (\`AppendEntries\`).
2. **Follower**: Passive state responding to RPCs from candidates and leaders.
3. **Candidate**: State entered when heartbeat timer expires, requesting votes (\`RequestVote\`) from peers.

### Consensus Flow:
- Leader receives client command $\to$ appends entry to local log.
- Leader broadcasts \`AppendEntries\` RPC to all followers.
- When majority ($> N/2$) acknowledge entry, leader commits and applies to local state machine.
- Leader informs followers of commit in next heartbeat.`,
          shortNotes: "CAP theorem forces choice between Consistency (CP) and Availability (AP) during partitions. Raft achieves distributed consensus via leader election and replicated log quorums.",
          examples: [
            {
              title: "Amazon S3 Multipart Upload Strategy for Large Datasets",
              problem: "Implement a reliable multipart upload in Node.js/Python to stream multi-gigabyte datasets into Amazon S3 with checksum validation.",
              explanation: "Splits file into 5MB-5GB chunks, uploads concurrently, and finalizes with ETag assembly.",
              code: `import boto3
from botocore.config import Config

s3 = boto3.client('s3', config=Config(s3={'addressing_style': 'virtual'}))

# Upload using TransferConfig for automated parallel multi-part chunking
from boto3.s3.transfer import TransferConfig

GB = 1024 ** 3
config = TransferConfig(
    multipart_threshold=64 * (1024 ** 2), # 64MB threshold
    max_concurrency=10,
    multipart_chunksize=16 * (1024 ** 2),  # 16MB part size
    use_threads=True
)

s3.upload_file(
    Filename='dataset.parquet',
    Bucket='campusloop-university-analytics',
    Key='raw/dataset.parquet',
    Config=config
)`
            }
          ],
          keyPoints: [
            "Network partitions cannot be avoided in real distributed networks, making CA systems impossible in WANs.",
            "Quorum voting requires at least floor(N/2) + 1 nodes to agree before committing any state change.",
            "Object storage (S3) stores data as flat blobs with metadata and unique keys, scaling indefinitely compared to POSIX file systems.",
            "Eventual consistency allows high write throughput while background anti-entropy resolves replica discrepancies."
          ],
          theoryQuestions: [
            {
              question: "Explain why a distributed system cannot achieve Consistency, Availability, and Partition Tolerance (CAP) simultaneously.",
              marks: "7 Marks",
              answer: "When a network partition (P) divides nodes into isolated subnets, a write request arriving at Node A cannot be communicated to Node B. If the system accepts the write on Node A, Node B will return stale data (violating Consistency). If the system rejects or delays the write until the partition heals, it fails to respond (violating Availability). Thus, under partition, a system must choose between C and A."
            }
          ],
          mcqs: [
            {
              question: "In the Raft consensus algorithm, how many node approvals are needed to commit an entry in a 5-node cluster?",
              options: ["2", "3", "4", "5"],
              correctIndex: 1,
              explanation: "A majority quorum in an N-node cluster requires floor(N/2) + 1 nodes. For N = 5, quorum = floor(2.5) + 1 = 3 nodes."
            }
          ]
        }
      ]
    }
  ]
};
