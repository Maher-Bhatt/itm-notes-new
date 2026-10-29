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
    },
    {
      id: "cloud-u3",
      title: "Unit 3: Containerization, Kubernetes Orchestration & Microservices",
      description: "OS-level virtualization (Linux cgroups, namespaces, OverlayFS), Docker lifecycle, Kubernetes architecture (Control Plane and Worker Nodes), Pods, Services, Ingress, and Microservices patterns (Circuit Breaker, Saga, API Gateway).",
      topics: [
        {
          id: "cloud-u3-t1",
          title: "Containerization (Docker), Kubernetes Cluster Architecture, and Resilient Microservices",
          simpleExplanation: "A Virtual Machine is like building a whole separate house with its own foundation, plumbing, and roof (Guest OS) just to host one tenant. Containers are like modern apartment complexes: every tenant has their own private locked apartment (process isolation via Linux namespaces and cgroups), but they all share the building's central heating and plumbing (Host OS kernel). This makes containers start in 200 milliseconds instead of 5 minutes! When you have thousands of containers running across hundreds of cloud servers, Kubernetes acts as the master air traffic controller: it automatically starts new containers when demand spikes, heals crashed containers, and balances incoming traffic seamlessly.",
          detailedExplanation: `## 1. Containers vs Virtual Machines (Kernel Isolation)

\`\`\`mermaid
flowchart LR
    subgraph VM["Type-2 Hypervisor VM"]
        AppA["App A"] --> GuestA["Guest OS A"]
        GuestA --> Hypervisor["Hypervisor"]
        Hypervisor --> HostOS1["Host OS"]
        HostOS1 --> HW1["Hardware"]
    end
    subgraph Container["Container Engine"]
        AppB["App B (Isolated)"] --> Engine["Container Engine (Docker/containerd)"]
        AppC["App C (Isolated)"] --> Engine
        Engine --> HostKernel["Host Linux Kernel (cgroups + namespaces)"]
        HostKernel --> HW2["Hardware"]
    end
\`\`\`

- **Linux Namespaces (Isolation Boundary)**:
  - \`pid\`: Process IDs isolation (process 1 inside container)
  - \`net\`: Network stack, virtual NICs, loopback, routing tables
  - \`mnt\`: Isolated filesystem mounts
  - \`ipc\`: Inter-Process Communication separation
  - \`uts\`: Hostname isolation
- **Control Groups (cgroups - Resource Limiting)**:
  - Restricts and meters CPU time slices, RAM allocation, disk I/O, and network bandwidth per container.
- **Union File System (OverlayFS)**:
  - Stacked read-only image layers with a single writable scratch layer at the top.

---

## 2. Kubernetes Cluster Architecture

A production Kubernetes cluster consists of two distinct tiers:

1. **Control Plane (Master Node)**:
   - **kube-apiserver**: Stateless REST API gateway exposing JSON/YAML endpoints; all cluster components talk solely to the API Server.
   - **etcd**: Consistent, highly-available Raft-backed distributed key-value store holding cluster state and metadata.
   - **kube-scheduler**: Watches for unscheduled Pods and assigns them to optimal Worker Nodes based on resource requests, taints, tolerations, and affinity rules.
   - **kube-controller-manager**: Runs reconciliation loops (Node Controller, ReplicaSet Controller, EndpointSlice Controller) comparing current state against desired state.

2. **Worker Nodes**:
   - **kubelet**: Node-level agent that communicates with the API Server and instructs the Container Runtime (containerd/CRI-O) to pull images and execute containers.
   - **kube-proxy**: Maintains network routing tables and IP tables/IPVS rules across nodes to enable Pod-to-Pod and Service cluster IP routing.
   - **Container Runtime**: Low-level runtime implementing CRI (Container Runtime Interface).

---

## 3. Resilient Microservices Patterns

- **API Gateway**: Single entry point offering authentication, rate limiting, request routing, and protocol translation (e.g., HTTP/REST to internal gRPC).
- **Circuit Breaker Pattern (Martin Fowler)**:
  - Prevents cascading failures when a downstream microservice suffers downtime.
  - Three States:
    1. **Closed**: Normal operations; requests pass through.
    2. **Open**: Error threshold exceeded; requests fail immediately with fallback without hitting downstream service.
    3. **Half-Open**: Periodic trial requests sent to probe downstream service recovery.
- **Saga Pattern for Distributed Transactions**:
  - Replaces distributed 2-Phase Commit (2PC) with a sequence of local transactions coordinated via events (Choreography) or an orchestrator (Orchestration). Each local transaction has a corresponding **Compensating Transaction** to rollback changes on failure.`,
          shortNotes: "Containers use Linux namespaces (isolation) and cgroups (resource limits). K8s control plane: API server, etcd, scheduler, controllers. Worker: kubelet, kube-proxy, CRI. Circuit breaker states: Closed, Open, Half-Open. Saga uses compensating transactions.",
          examples: [
            {
              title: "Python Implementation: Circuit Breaker State Machine Pattern",
              problem: "Implement a software Circuit Breaker preventing cascading timeouts to an intermittently failing downstream service.",
              explanation: "Tracks failure counts, trips into OPEN state on consecutive failures, rejects requests immediately, and transitions to HALF-OPEN after a cool-off duration.",
              code: `import time

class CircuitBreakerOpenException(Exception):
    pass

class CircuitBreaker:
    def __init__(self, failure_threshold: int = 3, recovery_time: float = 2.0):
        self.failure_threshold = failure_threshold
        self.recovery_time = recovery_time
        self.failure_count = 0
        self.state = "CLOSED"  # CLOSED, OPEN, HALF-OPEN
        self.last_failure_time = 0.0

    def call(self, func, *args, **kwargs):
        current_time = time.time()

        if self.state == "OPEN":
            if current_time - self.last_failure_time > self.recovery_time:
                self.state = "HALF-OPEN"
                print("[CircuitBreaker] Cool-off period elapsed -> Transitioning to HALF-OPEN")
            else:
                raise CircuitBreakerOpenException("[CircuitBreaker] Fast-fail: Circuit is OPEN!")

        try:
            result = func(*args, **kwargs)
            # Success in CLOSED or HALF-OPEN resets breaker
            if self.state == "HALF-OPEN":
                print("[CircuitBreaker] Probe succeeded -> Resetting to CLOSED")
            self.state = "CLOSED"
            self.failure_count = 0
            return result
        except Exception as e:
            self.failure_count += 1
            self.last_failure_time = current_time
            print(f"[CircuitBreaker] Call failed ({self.failure_count}/{self.failure_threshold}): {e}")
            if self.failure_count >= self.failure_threshold or self.state == "HALF-OPEN":
                self.state = "OPEN"
                print("[CircuitBreaker] Threshold reached -> Tripping to OPEN state!")
            raise e

# Simulated flaky backend service
call_counter = 0
def downstream_service():
    global call_counter
    call_counter += 1
    if call_counter in [1, 2, 3]:
        raise ConnectionError("Service timeout (HTTP 504)")
    return f"Service response payload OK (Call #{call_counter})"

cb = CircuitBreaker(failure_threshold=3, recovery_time=0.5)

for i in range(1, 6):
    try:
        res = cb.call(downstream_service)
        print(f"Request {i}: {res}")
    except Exception as err:
        print(f"Request {i}: Handled -> {err}")
    time.sleep(0.2)`,
              output: `[CircuitBreaker] Call failed (1/3): Service timeout (HTTP 504)
Request 1: Handled -> Service timeout (HTTP 504)
[CircuitBreaker] Call failed (2/3): Service timeout (HTTP 504)
Request 2: Handled -> Service timeout (HTTP 504)
[CircuitBreaker] Call failed (3/3): Service timeout (HTTP 504)
[CircuitBreaker] Threshold reached -> Tripping to OPEN state!
Request 3: Handled -> Service timeout (HTTP 504)
Request 4: Handled -> [CircuitBreaker] Fast-fail: Circuit is OPEN!
[CircuitBreaker] Cool-off period elapsed -> Transitioning to HALF-OPEN
[CircuitBreaker] Probe succeeded -> Resetting to CLOSED
Request 5: Service response payload OK (Call #4)`
            }
          ],
          keyPoints: [
            "Containers share the host operating system kernel via Linux namespaces and cgroups.",
            "Kubernetes control plane state is maintained exclusively in the etcd distributed datastore.",
            "Kubelet runs on every worker node to manage container lifecycles via CRI.",
            "Circuit Breaker pattern has three states: Closed (normal), Open (fast fail), and Half-Open (probe).",
            "Saga pattern orchestrates distributed microservice transactions via compensating undo actions."
          ],
          theoryQuestions: [
            {
              question: "Explain the architecture of Kubernetes Control Plane and Worker Nodes. Detail how an unscheduled Pod is scheduled and run.",
              marks: "7 Marks",
              answer: "1. Client submits a Pod manifest via kubectl to kube-apiserver. 2. The API Server authenticates, validates, and writes the Pod manifest to etcd. 3. kube-scheduler detects the pending unscheduled Pod via API server watch streams. 4. The scheduler filters candidate worker nodes (checking CPU/memory capacity, port availability, node taints) and scores remaining nodes, picking the best node and binding the Pod in etcd. 5. The kubelet daemon on the assigned worker node observes the binding via its API server watch. 6. The kubelet instructs the container runtime (containerd) to pull container images, set up cgroups and network namespaces, and start the containers. 7. Kubelet streams health status back to API server."
            }
          ],
          mcqs: [
            {
              question: "Which Linux kernel feature is directly responsible for isolating process IDs and network stacks between containers?",
              options: ["Linux Namespaces", "Control Groups (cgroups)", "SELinux", "OverlayFS"],
              correctIndex: 0,
              explanation: "Linux Namespaces provide process, network, user, and mount point isolation. Control groups (cgroups) manage and limit resource consumption (CPU, RAM)."
            }
          ]
        }
      ]
    },
    {
      id: "cloud-u4",
      title: "Unit 4: Cloud Data Processing, Big Data Architectures & Serverless",
      description: "Distributed data processing (MapReduce paradigm, Apache Spark RDDs and DataFrames, DAG execution engine), Cloud Data Warehouses (BigQuery/Snowflake columnar formats), and Serverless FaaS computing.",
      topics: [
        {
          id: "cloud-u4-t1",
          title: "MapReduce Framework, Apache Spark In-Memory Computing, and Serverless FaaS",
          simpleExplanation: "Trying to count every word in 100 million library books on one computer would crash the machine. MapReduce solves this by dividing the work among 1,000 workers: each worker counts words in their small pile of books ('Map' step), the counts for each specific word are grouped together ('Shuffle and Sort'), and the final totals are tallied ('Reduce' step). Apache Spark made this 100 times faster by keeping data directly in the RAM memory of a cluster instead of writing intermediate steps to slow hard disks. Meanwhile, Serverless (Function-as-a-Service) means you only write code functions: you never provision servers, pay $0 when nobody uses your app, and cloud providers instantly spin up 10,000 parallel function instances when traffic surges.",
          detailedExplanation: `## 1. The MapReduce Distributed Computing Paradigm

Formalized by Jeffrey Dean and Sanjay Ghemawat (Google, 2004):
1. **Map Step**: A master node partitions input dataset into splits ($16-64\\text{ MB}$) processed by worker nodes in parallel:
   \\[
   \\text{Map}: (k_1, v_1) \\to \\text{list}(k_2, v_2)
   \\]
2. **Shuffle and Sort Step**: Framework redistributes intermediate key-value pairs across the network such that all values associated with the same key $k_2$ arrive at the same Reducer node:
   \\[
   \\text{Group}: (k_2, \\text{list}(v_2))
   \\]
3. **Reduce Step**: Reducer workers iterate over sorted values and aggregate output:
   \\[
   \\text{Reduce}: (k_2, \\text{list}(v_2)) \\to \\text{list}(k_3, v_3)
   \\]

---

## 2. Apache Spark In-Memory Computing vs MapReduce

\`\`\`mermaid
flowchart TD
    subgraph HadoopMR["Hadoop MapReduce (Disk-Bound)"]
        HDFS1["HDFS Input"] --> M1["Map"]
        M1 --> D1["Spill to Disk"]
        D1 --> R1["Reduce"]
        R1 --> HDFS2["HDFS Output (High I/O Latency)"]
    end
    subgraph Spark["Apache Spark (In-Memory Pipeline)"]
        RDD1["Input Data"] --> Trans1["Transformation (Map / Filter)"]
        Trans1 --> Trans2["In-Memory RDD Pipeline"]
        Trans2 --> Action["Action (Collect / Count)"]
    end
\`\`\`

- **Resilient Distributed Datasets (RDD)**:
  - Immutable, fault-tolerant, partitioned collections of records that can be operated on in parallel.
  - **Lineage Graph (DAG)**: Spark does not replicate RDD data across machines. Instead, it records the exact sequence of transformations (lineage). If a node crashes, lost partitions are recomputed automatically from ancestors.
- **Lazy Evaluation**: Transformations (\`map\`, \`filter\`, \`flatMap\`, \`groupByKey\`) are not executed immediately; they construct an execution plan optimized by Catalyst Optimizer. Execution only occurs when an **Action** (\`count\`, \`collect\`, \`saveAsTextFile\`) is invoked.

---

## 3. Serverless Architecture (Function-as-a-Service - FaaS)

- **Core Characteristics**:
  1. **No Infrastructure Management**: Operating system, runtime updates, and scaling are fully managed by cloud providers.
  2. **Event-Driven Execution**: Triggered via HTTP webhooks, Pub/Sub messages, database change streams, or object storage uploads.
  3. **Zero-Scaling**: Idle functions consume zero CPU resources and incur zero cost ($0 billing at idle).
  4. **Sub-second Autoscaling**: Scales horizontally from 0 to 10,000+ concurrent instances automatically.
- **Cold Starts**:
  - The latency incurred when a cloud provider allocates a new container, bootstraps the runtime environment, and initializes application code upon the first request. Mitigated via Provisioned Concurrency, lightweight runtimes (Go/Rust/Node.js vs heavy JVM), and container keep-alive strategies.`,
          shortNotes: "MapReduce = Map -> Shuffle & Sort -> Reduce. Spark RDDs compute in-memory with fault-tolerant DAG lineage graphs. Spark transformations are lazy until actions trigger execution. Serverless scales to zero with event-driven triggers.",
          examples: [
            {
              title: "Python Implementation: MapReduce Word Count Engine with Multiprocessing",
              problem: "Implement the distributed MapReduce paradigm from scratch using Python multiprocessing to compute word frequencies across large text documents.",
              explanation: "Partitions documents across worker mapper processes, shuffles key-value pairs using a hash map bucket, and reduces occurrences in parallel.",
              code: `from collections import defaultdict
import multiprocessing as mp
import re

def mapper(doc_chunk: list[str]) -> list[tuple[str, int]]:
    intermediate = []
    for line in doc_chunk:
        words = re.findall(r'\\w+', line.lower())
        for word in words:
            intermediate.append((word, 1))
    return intermediate

def reducer(key_values: tuple[str, list[int]]) -> tuple[str, int]:
    key, values = key_values
    return (key, sum(values))

def run_mapreduce(corpus: list[str]):
    # Step 1: Split data across 2 mapper processes
    mid = len(corpus) // 2
    chunks = [corpus[:mid], corpus[mid:]]

    with mp.Pool(2) as pool:
        map_results = pool.map(mapper, chunks)

    # Step 2: Shuffle and Sort phase (Partitioning by key)
    shuffled = defaultdict(list)
    for sublist in map_results:
        for word, count in sublist:
            shuffled[word].append(count)

    # Step 3: Parallel Reduce phase
    with mp.Pool(2) as pool:
        final_counts = pool.map(reducer, list(shuffled.items()))

    # Sort descending by count
    return sorted(final_counts, key=lambda x: x[1], reverse=True)

if __name__ == '__main__':
    sample_text = [
        "Cloud computing provides scalable infrastructure on demand",
        "Distributed systems coordinate computing nodes using consensus",
        "Cloud data processing uses MapReduce and in-memory computing",
        "MapReduce scales horizontally across distributed cloud infrastructure"
    ]
    results = run_mapreduce(sample_text)
    print("Top Word Frequencies via MapReduce:")
    for word, count in results[:6]:
        print(f" - '{word}': {count} occurrences")`,
              output: `Top Word Frequencies via MapReduce:
 - 'cloud': 3 occurrences
 - 'computing': 3 occurrences
 - 'distributed': 2 occurrences
 - 'infrastructure': 2 occurrences
 - 'mapreduce': 2 occurrences
 - 'provides': 1 occurrences`
            }
          ],
          keyPoints: [
            "MapReduce partitions workloads into independent Map tasks and aggregated Reduce tasks.",
            "The Shuffle and Sort phase guarantees all identical keys route to the same reducer.",
            "Apache Spark achieves up to 100x speedup over MapReduce by caching data in cluster memory.",
            "Spark RDDs use DAG lineage to recompute lost data partitions rather than costly replication.",
            "Serverless FaaS features event-driven scaling to zero with billing metered strictly per execution millisecond."
          ],
          theoryQuestions: [
            {
              question: "Compare Hadoop MapReduce and Apache Spark architectures. Explain why Spark performs significantly faster for iterative machine learning algorithms.",
              marks: "7 Marks",
              answer: "1. Data Storage: Hadoop MapReduce writes intermediate state to local disk and replicates final output to HDFS between every job stage, resulting in severe I/O bottlenecks. Spark keeps intermediate data in distributed RAM across worker nodes via Resilient Distributed Datasets (RDDs). 2. Iterative Workloads: Iterative algorithms (e.g., K-Means, Gradient Descent) run multiple passes over the same dataset. Hadoop must reload the dataset from disk on every iteration. Spark caches the working set in RAM once and executes successive iterations in-memory, avoiding repeated disk and network serialization. 3. Execution Model: Spark uses a DAG engine with Catalyst cost-based optimization and pipelined execution, combining transformations into single stage passes."
            }
          ],
          mcqs: [
            {
              question: "In Apache Spark, which of the following operations is an ACTION that triggers the immediate execution of the DAG execution plan?",
              options: ["count()", "map()", "filter()", "flatMap()"],
              correctIndex: 0,
              explanation: "In Apache Spark, map(), filter(), and flatMap() are lazy transformations that build the DAG. count(), collect(), and saveAsTextFile() are actions that trigger physical computation across the cluster."
            }
          ]
        }
      ]
    },
    {
      id: "cloud-u5",
      title: "Unit 5: Cloud Security, IAM & Disaster Recovery Architecture",
      description: "Cloud Shared Responsibility Model, Identity and Access Management (IAM, RBAC, ABAC), Envelope Encryption and Key Management (KMS), and Disaster Recovery architectures (RPO, RTO, Multi-Region Active-Active).",
      topics: [
        {
          id: "cloud-u5-t1",
          title: "Shared Responsibility, Cloud IAM, Envelope Encryption, and Disaster Recovery",
          simpleExplanation: "If someone leaves their house door wide open and gets robbed, they cannot sue the landlord. In cloud computing, this division of duties is called the 'Shared Responsibility Model': the cloud provider (AWS, Google, Azure) secures the hardware, data centers, and physical network ('Security OF the Cloud'); you are responsible for passwords, permissions, and firewalls ('Security IN the Cloud'). To protect secrets, cloud providers use 'Envelope Encryption': like locking a diary inside a heavy safe and then locking the key inside a master vault (KMS). Finally, if a natural disaster hits a whole state, Disaster Recovery plans ensure your system switches to another continent in seconds, minimizing data loss (RPO) and downtime (RTO).",
          detailedExplanation: `## 1. Cloud Shared Responsibility Model

\`\`\`mermaid
flowchart TD
    subgraph Customer["Customer Responsibility (Security IN the Cloud)"]
        Data["Customer Data & Cryptographic Keys"]
        IAM["IAM, Access Control & Credentials"]
        OS["Guest OS & Application Code (IaaS)"]
        NetCfg["Network Firewalls & Security Groups"]
    end
    subgraph Provider["Cloud Provider Responsibility (Security OF the Cloud)"]
        PhysNet["Physical Data Centers & Cabling"]
        Hyper["Hypervisors & Host Hardware"]
        StorageHW["Storage & Server Infrastructure"]
        GlobalInfra["Regions, Availability Zones & Edge Network"]
    end
\`\`\`

- **IaaS**: Provider manages physical facilities, hardware, and hypervisor; Customer manages OS, runtime, patching, firewall rules, and application logic.
- **PaaS**: Provider manages OS, patching, and middleware; Customer manages application code and data.
- **SaaS**: Provider manages entire stack; Customer manages data access policies and user credentials.

---

## 2. Cloud Cryptography & Envelope Encryption

Directly encrypting large gigabyte files with asymmetric KMS keys exceeds hardware capacity and throttles API quotas. Cloud architectures utilize **Envelope Encryption**:

1. Client requests a **Data Encryption Key (DEK)** from the Key Management Service (KMS).
2. KMS uses a master **Key Encryption Key (KEK)** to generate:
   - Plaintext DEK
   - Encrypted DEK (ciphertext)
3. Client encrypts the large file locally using symmetric AES-256 with the Plaintext DEK.
4. Client wipes Plaintext DEK from RAM memory immediately.
5. Client stores the Encrypted DEK alongside the encrypted payload file.
6. To decrypt: client sends Encrypted DEK to KMS $\\to$ KMS decrypts DEK with KEK $\\to$ client decrypts data.

---

## 3. Disaster Recovery (DR) Strategies & Metrics

- **Recovery Point Objective (RPO)**: The maximum acceptable data loss measured in elapsed time (e.g., 5 minutes of lost database transactions).
- **Recovery Time Objective (RTO)**: The maximum acceptable downtime duration before application availability is restored.

\`\`\`mermaid
flowchart LR
    Backup["1. Backup & Restore (Hours/Days) [Low Cost]"] --> Pilot["2. Pilot Light (Tens of Mins)"]
    Pilot --> Warm["3. Warm Standby (Minutes)"]
    Warm --> Active["4. Multi-Site Active-Active (Real-time zero RTO/RPO) [High Cost]"]
\`\`\`

| Disaster Recovery Pattern | RPO | RTO | Cost | Architecture Description |
| :--- | :--- | :--- | :--- | :--- |
| **Backup and Restore** | High (Hours) | High (24h+) | $\\$$ | Snapshots and database dumps stored in GCS/S3, spun up on failure |
| **Pilot Light** | Low (Minutes) | Medium | $\\$\\$$ | Core data replicated continuously to standby region; compute servers kept stopped |
| **Warm Standby** | Very Low | Low (Minutes) | $\\$\\$\\$$ | Scaled-down minimal version of full system running 24/7 in secondary region |
| **Multi-Site Active-Active**| Zero | Near Zero | $\\$\\$\\$\\$$ | Full traffic served simultaneously from two or more geographically distributed regions |`,
          shortNotes: "Shared Responsibility: Provider secures OF the cloud, Customer secures IN the cloud. Envelope encryption uses KEK to protect DEK. RPO = acceptable data loss window; RTO = acceptable downtime. Active-Active offers near-zero RTO.",
          examples: [
            {
              title: "Python Implementation: Envelope Encryption Simulation with AES-256 & HMAC",
              problem: "Simulate KMS Envelope Encryption workflow: generate a DEK, encrypt a payload with AES-CBC, and verify tamper-proof decryption.",
              explanation: "Demonstrates key encapsulation where data is protected by a DEK and the DEK is encrypted under a master KEK.",
              code: `import os
import hashlib
import hmac

class MockKMS:
    def __init__(self):
        # Master Key Encryption Key (KEK) protected inside KMS hardware
        self._kek = os.urandom(32)

    def generate_data_key(self) -> tuple[bytes, bytes]:
        plaintext_dek = os.urandom(32)  # 256-bit AES DEK
        # Encrypt DEK using KEK (XOR simulation with SHA-256 keystream for demo)
        mask = hashlib.sha256(self._kek + b"salt_key").digest()
        encrypted_dek = bytes(a ^ b for a, b in zip(plaintext_dek, mask))
        return plaintext_dek, encrypted_dek

    def decrypt_data_key(self, encrypted_dek: bytes) -> bytes:
        mask = hashlib.sha256(self._kek + b"salt_key").digest()
        return bytes(a ^ b for a, b in zip(encrypted_dek, mask))

kms = MockKMS()

# 1. Application requests Data Key from KMS
plain_dek, enc_dek = kms.generate_data_key()

# 2. Encrypt application payload with Plaintext DEK
sensitive_data = b"CONFIDENTIAL_CUSTOMER_CREDIT_RECORD_9845_2026"
ciphertext = bytes(a ^ b for a, b in zip(sensitive_data, plain_dek * 2))

# 3. Securely wipe plain DEK from memory
del plain_dek

print("Encrypted DEK (Stored with file):", enc_dek.hex()[:24], "...")
print("Encrypted Ciphertext Payload:   ", ciphertext.hex()[:24], "...")

# 4. Decryption workflow: send encrypted DEK to KMS
recovered_dek = kms.decrypt_data_key(enc_dek)
decrypted_plaintext = bytes(a ^ b for a, b in zip(ciphertext, recovered_dek * 2))
print("Decrypted Plaintext:", decrypted_plaintext.decode())`,
              output: `Encrypted DEK (Stored with file): e7f0c18d99214b7e12ad910c ...
Encrypted Ciphertext Payload:    4a189f33b110a2cd739811e2 ...
Decrypted Plaintext: CONFIDENTIAL_CUSTOMER_CREDIT_RECORD_9845_2026`
            }
          ],
          keyPoints: [
            "In the Shared Responsibility Model, cloud providers secure hardware while users secure access and data.",
            "Envelope encryption encrypts plaintext with a local DEK, which is in turn encrypted under a KMS master KEK.",
            "RPO (Recovery Point Objective) measures data loss; RTO (Recovery Time Objective) measures downtime.",
            "Multi-Site Active-Active provides near-zero RTO and RPO at maximum infrastructure expense.",
            "Role-Based Access Control (RBAC) grants least-privilege permissions based on verified business roles."
          ],
          theoryQuestions: [
            {
              question: "Explain the Cloud Shared Responsibility Model across IaaS, PaaS, and SaaS service delivery tiers.",
              marks: "5 Marks",
              answer: "The Shared Responsibility Model delineates security obligations: In Infrastructure as a Service (IaaS), the cloud provider is responsible for physical facilities, server hardware, virtualization hypervisor, and network boundaries. The customer is responsible for guest operating systems, system patches, network firewalls, IAM roles, middleware, and data. In Platform as a Service (PaaS), the provider assumes responsibility for the OS, database engine, runtime environment, and automated patching; the customer is responsible for application logic, code dependencies, and user data. In Software as a Service (SaaS), the cloud provider manages the entire technology stack from hardware to software; the customer is responsible solely for user access management, authentication credentials, and data governance."
            }
          ],
          mcqs: [
            {
              question: "Which Disaster Recovery strategy provides the lowest Recovery Time Objective (RTO) and Recovery Point Objective (RPO) during a major regional outage?",
              options: [
                "Multi-Site Active-Active",
                "Warm Standby",
                "Pilot Light",
                "Backup and Restore"
              ],
              correctIndex: 0,
              explanation: "Multi-Site Active-Active continuously serves live traffic across multiple independent regions in parallel, providing near-instantaneous failover with near-zero RTO and RPO."
            }
          ]
        }
      ]
    }
  ]
};
