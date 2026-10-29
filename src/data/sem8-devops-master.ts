import { Subject } from './types';

export const sem8DevopsMaster: Subject = {
  id: "sem8-devops",
  name: "DevOps & Site Reliability Engineering (SRE)",
  code: "DO801",
  color: "bg-teal-600",
  icon: "terminal",
  description: "Comprehensive University Syllabus for DevOps & Site Reliability Engineering — Continuous Integration and Continuous Deployment (CI/CD Pipelines, GitHub Actions, Jenkins), Infrastructure as Code (Terraform, Ansible), Container Orchestration (Kubernetes Pods, Services, Ingress, Deployments, StatefulSets), Observability (Prometheus, Grafana, OpenTelemetry), and SRE Reliability Principles (SLI, SLO, SLA, Error Budgets).",
  semester: 8,
  units: [
    {
      id: "devops-u1",
      title: "Unit 1: CI/CD Automation & Infrastructure as Code (IaC)",
      description: "DevOps cultural movement, Git branching workflows (GitFlow, Trunk-Based), GitHub Actions / Jenkins automated pipelines, and Declarative Infrastructure with Terraform.",
      topics: [
        {
          id: "devops-u1-t1",
          title: "Trunk-Based Development, CI/CD Pipeline Automation, and Terraform Declarative Infrastructure",
          simpleExplanation: "DevOps bridges the gap between software development and IT operations to shorten the systems development life cycle and deliver features, fixes, and updates reliably. Continuous Integration automatically tests every code commit; Continuous Delivery automatically packages and stages releases; Continuous Deployment deploys verified code directly to production without manual gatekeepers. Infrastructure as Code (IaC) manages cloud servers declaratively using version-controlled configuration files.",
          detailedExplanation: `## 1. Modern CI/CD Pipeline Stages

\`\`\`mermaid
flowchart LR
    DEV["Developer Push\nGit Commit"] --> TEST["1. Continuous Integration\nLint, Unit Tests, SAST Security"]
    TEST --> BUILD["2. Build & Package\nDocker Multi-Stage Build"]
    BUILD --> SCAN["3. Vulnerability Scan\nTrivy Image Security"]
    SCAN --> STAGE["4. Staging Deploy\nEphemeral Test Cluster"]
    STAGE --> E2E["5. End-to-End Tests\nCypress / Playwright Tests"]
    E2E --> PROD["6. Continuous Deployment\nArgoCD Canary Rollout"]
\`\`\`

---

## 2. Trunk-Based Development vs GitFlow
- **GitFlow**: Features long-lived branches (\`develop\`, \`release\`, \`feature\`, \`hotfix\`). Introduces painful merge conflicts and delays integration feedback.
- **Trunk-Based Development**: Developers merge short-lived branches (lived $< 1$ day) directly into \`main\` (trunk) multiple times daily, guarded by automated CI test suites and Feature Flags. This is the industry-standard high-performing DevOps practice.

---

## 3. Declarative vs Imperative Infrastructure (Terraform)
- **Imperative (Bash / AWS CLI)**: Specify *how* to achieve a state through ordered execution commands (e.g. \`aws ec2 run-instances...\`). Not idempotent; re-running creates duplicate resources.
- **Declarative (Terraform HCL)**: Specify *what* the desired end-state should be. Terraform inspects existing state (\`terraform.tfstate\`), computes differential graph (\`terraform plan\`), and executes minimal modifications (\`terraform apply\`).`,
          shortNotes: "Trunk-based development merges small commits frequently into main. CI/CD automates test, build, and deploy. Terraform manages cloud infrastructure declaratively with state files.",
          examples: [
            {
              title: "Production GitHub Actions CI/CD Pipeline Workflow",
              problem: "Write a GitHub Actions workflow to run linting, unit tests, Docker container builds, and security scanning on pull requests.",
              explanation: "Runs automated matrix tests and pushes verified Docker images to container registry.",
              code: `name: CampusLoop CI/CD Production Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Setup Node.js Environment
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Static Type Checking
        run: npx tsc --noEmit

      - name: Run Test Suite
        run: npm test -- --coverage

  docker-build:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build and Push Docker Image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: false
          tags: campusloop/api:latest`
            }
          ],
          keyPoints: [
            "Continuous Integration requires tests to run automatically on every single pull request.",
            "Trunk-based development reduces merge conflicts and accelerates lead time for changes.",
            "Terraform uses state files to track provisioned cloud resources and detect configuration drift.",
            "Immutable infrastructure replaces modified servers entirely with newly baked machine images rather than updating in-place."
          ],
          theoryQuestions: [
            {
              question: "Differentiate between Continuous Delivery and Continuous Deployment, and explain the role of automated test pyramids.",
              marks: "7 Marks",
              answer: "In Continuous Delivery, every code change that passes automated tests is automatically built, packaged, and staged into a production-ready artifact, but the final deployment to production requires manual human approval. In Continuous Deployment, there is zero manual intervention: any code that passes all automated pipeline gates is deployed directly to live production users. The Test Pyramid (Unit Tests at base, Integration Tests in middle, End-to-End Tests at apex) provides fast execution and high test fidelity."
            }
          ],
          mcqs: [
            {
              question: "Which branching strategy is recommended by DORA (DevOps Research and Assessment) for high-performing engineering teams?",
              options: ["Trunk-Based Development", "GitFlow with 6-month release branches", "Forking Workflow without CI", "Subversion centralized locking"],
              correctIndex: 0,
              explanation: "DORA research shows that Trunk-Based Development, where developers integrate small batches into trunk daily, correlates with highest software delivery performance."
            }
          ]
        }
      ]
    },
    {
      id: "devops-u2",
      title: "Unit 2: Kubernetes Orchestration & SRE Reliability Metrics",
      description: "Kubernetes control plane architecture (API Server, etcd, Scheduler, Kubelet), Pods, Services (ClusterIP, NodePort, LoadBalancer), Deployments, Ingress Controllers, and SRE Metrics (SLI, SLO, SLA, Error Budgets).",
      topics: [
        {
          id: "devops-u2-t1",
          title: "Kubernetes Cluster Architecture, Pod Lifecycle, Ingress Routing, and SRE Error Budgets",
          simpleExplanation: "Kubernetes (K8s) is an open-source container orchestration platform that automates the deployment, scaling, self-healing, and networking of containerized applications across compute clusters. Site Reliability Engineering (SRE) applies software engineering practices to operations, balancing feature velocity against platform reliability using Service Level Objectives (SLOs) and Error Budgets.",
          detailedExplanation: `## 1. Kubernetes Master & Worker Architecture

\`\`\`mermaid
flowchart TD
    subgraph Control_Plane ["Kubernetes Control Plane (Master Node)"]
        direction TB
        API["kube-apiserver\n(REST API Gateway)"]
        ETCD[("etcd\n(Distributed Raft Key-Value Store)")]
        SCHED["kube-scheduler\n(Assigns Pods to Nodes)"]
        CM["kube-controller-manager\n(Replication, Node, Endpoint Controllers)"]
        API --- ETCD & SCHED & CM
    end

    subgraph Worker_Node ["Worker Node"]
        direction TB
        KUBELET["kubelet\n(Node Agent)"]
        PROXY["kube-proxy\n(IPtables Networking)"]
        CRI["Container Runtime\n(containerd)"]
        POD1["Pod A (App Container)"]
        POD2["Pod B (App Container)"]
        KUBELET --> CRI --> POD1 & POD2
        PROXY --> POD1 & POD2
    end

    API <==> KUBELET & PROXY
\`\`\`

---

## 2. Kubernetes Networking: Services & Ingress
- **ClusterIP**: Default internal service type. Assigns a virtual IP accessible only within the cluster.
- **NodePort**: Exposes the service on each node's IP at a static port (typically $30000 - 32767$).
- **LoadBalancer**: Provisions an external cloud load balancer (e.g. AWS NLB, GCP Load Balancer) that forwards traffic to NodePort.
- **Ingress Controller (NGINX/Traefik)**: Layer 7 reverse proxy routing external HTTP/HTTPS traffic to internal services based on hostname and URI paths.

---

## 3. Site Reliability Engineering (SRE) Framework
- **SLI (Service Level Indicator)**: Quantitative measurement of service performance (e.g., *99.2% of HTTP requests return status 200 within 250ms*).
- **SLO (Service Level Objective)**: Target reliability goal agreed upon by engineering team (e.g., *99.9% uptime over a 30-day rolling window*).
- **SLA (Service Level Agreement)**: Legally binding contract with customers with financial penalties if breached (e.g., *99.5% uptime; refund 10% credit if missed*).
- **Error Budget**: The acceptable unreliability margin ($100\% - \text{SLO}$). For a 99.9% SLO, the error budget is 0.1% (43 minutes of downtime per month). If the budget is exhausted, all new feature releases are halted in favor of reliability fixes.`,
          shortNotes: "K8s controls containers via apiserver, etcd, scheduler, and kubelet. SRE balances velocity and reliability using SLIs, SLOs, and Error Budgets.",
          examples: [
            {
              title: "Kubernetes Production Deployment & ClusterIP Service Manifest",
              problem: "Write a complete Kubernetes YAML manifest for an auto-healing deployment with readiness/liveness probes and resource limits.",
              explanation: "Configures pod replicas, rolling update strategy, health checks, and service discovery.",
              code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: campusloop-backend
  labels:
    app: campusloop-api
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: campusloop-api
  template:
    metadata:
      labels:
        app: campusloop-api
    spec:
      containers:
      - name: api
        image: campusloop/api:v1.2.0
        ports:
        - containerPort: 8080
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "100m"
            memory: "128Mi"
        livenessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 15
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: campusloop-backend-svc
spec:
  type: ClusterIP
  selector:
    app: campusloop-api
  ports:
  - port: 80
    targetPort: 8080`
            }
          ],
          keyPoints: [
            "etcd is a consistent, highly available key-value store holding the complete state of the Kubernetes cluster.",
            "Liveness probes restart hung containers; readiness probes control whether traffic should be routed to the pod.",
            "Rolling update with maxUnavailable: 0 guarantees zero-downtime deployments.",
            "Error Budgets eliminate friction between product teams wanting speed and ops teams wanting stability."
          ],
          theoryQuestions: [
            {
              question: "Explain the four Golden Signals of SRE monitoring and how Error Budgets govern feature release velocity.",
              marks: "7 Marks",
              answer: "The 4 Golden Signals defined by Google SRE are: 1. Latency: time taken to service a request (differentiating successes from failures). 2. Traffic: demand placed on system (HTTP req/sec, concurrent connections). 3. Errors: rate of requests that fail (explicit 5xx errors or implicit wrong content). 4. Saturation: fraction of constrained system resource in use (CPU, memory, disk I/O). The Error Budget (100% - SLO) acts as an objective policy: when the error budget is positive, devs release features rapidly; when the budget is spent due to outages or regressions, feature releases are frozen and developers must focus on bug fixes, performance, and infrastructure stability."
            }
          ],
          mcqs: [
            {
              question: "If a web application commits to a 99.9% monthly SLO, approximately how much downtime is permitted in its Error Budget per 30-day month?",
              options: ["4.3 minutes", "43.2 minutes", "7.2 hours", "24 hours"],
              correctIndex: 1,
              explanation: "30 days * 24 hours * 60 minutes = 43,200 minutes. 100% - 99.9% = 0.1% error budget. 43,200 * 0.001 = 43.2 minutes permitted downtime."
            }
          ]
        }
      ]
    },
    {
      id: "devops-u3",
      title: "Unit 3: Service Mesh, Ingress Controllers & Zero-Trust Networking",
      description: "Service Mesh architecture (Istio Envoy sidecars, Control Plane Istiod), mTLS zero-trust communication, traffic shifting (Canary deployments), Ingress Controllers vs Gateway API, and Kubernetes NetworkPolicies.",
      topics: [
        {
          id: "devops-u3-t1",
          title: "Service Mesh (Istio / Envoy), Canary Traffic Shifting, and Zero-Trust mTLS",
          simpleExplanation: "In a microservices world with 500 services, how do you make sure Service A can talk safely to Service B without every developer writing custom encryption and retry code? A Service Mesh deploys a tiny 'sidecar' copilot (Envoy proxy) right next to every single container. Like two diplomats speaking through encrypted phones, the sidecars automatically handle mutual TLS encryption (mTLS), inject tracing headers, retry failed network calls, and allow DevOps engineers to do Canary Deployments: sending 95% of users to version 1 and 5% to version 2 with a simple configuration switch, without touching application code!",
          detailedExplanation: `## 1. Service Mesh Architecture: Data Plane vs Control Plane

\`\`\`mermaid
flowchart TD
    subgraph ControlPlane["Control Plane (Istiod)"]
        CA["Citadel / CA (mTLS Certs)"]
        Pilot["Pilot (Traffic Routing Configs)"]
        Galley["Galley (Validation)"]
    end
    subgraph PodA["Kubernetes Pod A"]
        AppA["Microservice App A"] <-->|localhost:8080| EnvoyA["Envoy Sidecar Proxy"]
    end
    subgraph PodB["Kubernetes Pod B"]
        AppB["Microservice App B"] <-->|localhost:8080| EnvoyB["Envoy Sidecar Proxy"]
    end
    ControlPlane -.->|xDS gRPC API Streaming| EnvoyA
    ControlPlane -.->|xDS gRPC API Streaming| EnvoyB
    EnvoyA ===|mTLS Encrypted Wire (Port 15001)| EnvoyB
\`\`\`

- **Data Plane (Envoy Proxy)**:
  - High-performance C++ L4/L7 proxy injected as a sidecar container in every Pod.
  - Intercepts all inbound and outbound TCP traffic via Linux \`iptables\` PREROUTING rules.
- **Control Plane (Istiod)**:
  - Translates declarative YAML rules (VirtualServices, DestinationRules) into low-level Envoy configurations via Envoy's **xDS APIs** (LDS, RDS, CDS, EDS).
  - Acts as a Certificate Authority (CA) issuing short-lived X.509 certificates to each Pod for automated **mTLS (Mutual TLS)** zero-trust communication.

---

## 2. Canary Deployment Traffic Shifting via Istio VirtualService

Allows progressive rollout by splitting traffic by percentage weights:

\`\`\`yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: payment-routing
spec:
  hosts:
  - payment-service
  http:
  - route:
    - destination:
        host: payment-service
        subset: v1
      weight: 90
    - destination:
        host: payment-service
        subset: v2-canary
      weight: 10
\`\`\`

---

## 3. Kubernetes NetworkPolicies & CNI Plugins

By default, Kubernetes networking is flat: **every Pod can communicate with every other Pod** across all namespaces.
A **NetworkPolicy** acts as an in-cluster distributed firewall enforced by CNI plugins (Calico, Cilium using Linux eBPF):

\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-isolate-policy
spec:
  podSelector:
    matchLabels:
      role: database
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          role: backend-api  # Only backend API can talk to DB
    ports:
    - protocol: TCP
      port: 5432
\`\`\``,
          shortNotes: "Service mesh separates Data Plane (Envoy sidecars) from Control Plane (Istiod). mTLS provides zero-trust encryption between pods. Istio VirtualServices enable weight-based canary routing. NetworkPolicies isolate pod traffic via CNI eBPF/iptables.",
          examples: [
            {
              title: "Python Implementation: Canary Traffic Router Simulation with Weighted Random Split",
              problem: "Simulate Istio Envoy sidecar proxy traffic shifting routing requests between v1 (stable) and v2 (canary) by exact percentage weights.",
              explanation: "Generates 1,000 requests, applies weighted random routing, and verifies canary distribution accuracy within statistical bounds.",
              code: `import random
from collections import Counter

class EnvoyCanaryRouter:
    def __init__(self, routes: dict[str, int]):
        self.routes = routes  # e.g., {"v1": 90, "v2": 10}
        self.versions = list(routes.keys())
        self.weights = list(routes.values())

    def route_request(self) -> str:
        # Weighted random choice matching Envoy proxy route table
        return random.choices(self.versions, weights=self.weights, k=1)[0]

# Simulate 90/10 Canary Split for Payment Microservice
router = EnvoyCanaryRouter({"v1.0.0-stable": 90, "v2.0.0-canary": 10})

random.seed(42)
request_count = 1000
traffic_log = [router.route_request() for _ in range(request_count)]
distribution = Counter(traffic_log)

print("=== Istio VirtualService Canary Routing Simulation ===")
print(f"Total Requests Dispatched: {request_count}")
for version, count in distribution.items():
    pct = (count / request_count) * 100
    print(f"Version: {version:15} -> {count:4} requests ({pct:.1f}%)")`,
              output: `=== Istio VirtualService Canary Routing Simulation ===
Total Requests Dispatched: 1000
Version: v1.0.0-stable  ->  897 requests (89.7%)
Version: v2.0.0-canary  ->  103 requests (10.3%)`
            }
          ],
          keyPoints: [
            "Envoy sidecar proxies intercept all Pod network traffic using Linux iptables.",
            "Istiod delivers zero-trust security by automatically rotating X.509 mTLS certificates.",
            "Canary deployments route small traffic fractions (e.g. 5-10%) to test new versions in production.",
            "By default, Kubernetes network traffic is completely open and unpartitioned.",
            "NetworkPolicies enforce ingress and egress firewalls via eBPF-powered CNI plugins like Cilium."
          ],
          theoryQuestions: [
            {
              question: "Explain the architecture of a Service Mesh (e.g., Istio). Differentiate between the responsibilities of the Data Plane and Control Plane.",
              marks: "7 Marks",
              answer: "A Service Mesh is a dedicated infrastructure layer for managing service-to-service communication transparently. 1. Data Plane: Composed of lightweight Envoy proxies deployed as sidecar containers alongside application pods. The Data Plane intercepts all network traffic entering or leaving the pod. Responsibilities include: mutual TLS encryption/decryption, circuit breaking, automatic retries with exponential backoff, rate limiting, and collecting telemetry spans. 2. Control Plane (Istiod): Centralized management component that compiles high-level human-readable YAML configurations (VirtualService, Gateway, DestinationRule) into concrete Envoy configuration models and streams them down to sidecars via gRPC xDS protocols. It also includes Citadel, which acts as a dynamic Certificate Authority that issues and rotates short-lived cryptographic identity certificates (SPIFFE IDs) for every pod."
            }
          ],
          mcqs: [
            {
              question: "In an Istio Service Mesh, which component acts as the high-performance Data Plane proxy running as a sidecar container?",
              options: ["Envoy", "Istiod", "CoreDNS", "Flannel"],
              correctIndex: 0,
              explanation: "Envoy is the high-performance C++ proxy running as a sidecar inside every application Pod in the Data Plane."
            }
          ]
        }
      ]
    },
    {
      id: "devops-u4",
      title: "Unit 4: Full-Stack Observability, Tracing & Chaos Engineering",
      description: "The Three Pillars of Observability (Metrics via Prometheus/Grafana, Structured Logs via Loki/ELK, Distributed Tracing via OpenTelemetry/Jaeger), and Chaos Engineering (Fault Injection, Blast Radius, LitmusChaos).",
      topics: [
        {
          id: "devops-u4-t1",
          title: "The Three Pillars of Observability (Prometheus, OpenTelemetry, Loki) and Chaos Engineering",
          simpleExplanation: "When your cloud system goes down at 3 AM, looking at CPU percentage alone won't tell you which customer order got lost. The Three Pillars of Observability give you 360-degree vision: 1. Metrics (Prometheus) show you numerical trends like a car dashboard speedometer (HTTP 500 error spikes). 2. Logs (Loki / ELK) are the plane's black box recorder with detailed error printouts. 3. Distributed Tracing (OpenTelemetry) follows a single user request like a parcel tracking number through 15 different microservices, showing you down to the millisecond exactly which database query slowed everything down! Chaos Engineering intentionally injects controlled failures (like randomly killing servers) during the day to ensure the system self-heals before disasters strike at night.",
          detailedExplanation: `## 1. The Three Pillars of Modern Observability

\`\`\`mermaid
flowchart TD
    subgraph Pillars["The Observability Triad"]
        Metrics["1. Metrics (Aggregatable Time-Series) - Prometheus, PromQL"]
        Logs["2. Logs (Context-Rich Discrete Events) - Loki, Elasticsearch"]
        Traces["3. Traces (End-to-End Request Journey) - OpenTelemetry, Jaeger"]
    end
\`\`\`

1. **Metrics (Time-Series Data)**:
   - Numerical measurements recorded over time: \`http_requests_total{status="500", handler="/checkout"}\`.
   - **Prometheus Pull Model**: The Prometheus server scrapes \`/metrics\` HTTP endpoints exposed by target pods at periodic intervals (\`scrape_interval: 15s\`).
   - Four Metric Types: Counter (monotonically increasing), Gauge (fluctuating value), Histogram (buckets for latency calculations), Summary.
2. **Logs (Event Records)**:
   - Structured JSON logs with timestamp, log level, trace ID, and stack trace.
   - Centralized aggregation via Grafana Loki: indexes metadata labels rather than full text, slashing storage costs by $80\\%$.
3. **Distributed Tracing (OpenTelemetry - OTel)**:
   - Solves the microservices debugging mystery by tracking a single user request across distributed boundaries.
   - **Trace**: Represents an entire request journey from frontend to backend.
   - **Span**: A single unit of work (e.g., executing an SQL query or calling an external Stripe API). Contains \`SpanID\`, \`TraceID\`, start time, duration, and key-value tags.
   - **W3C TraceContext**: Propagates HTTP headers across network hops: \`traceparent: 00-{trace-id}-{parent-id}-{trace-flags}\`.

---

## 2. Chaos Engineering (Principles & Blast Radius)

Pioneered by Netflix (Chaos Monkey) and formalized in the *Principles of Chaos Engineering*:
1. **Hypothesize Steady State**: Define measurable system behavior under normal conditions (e.g., 99.9% checkout success rate).
2. **Vary Real-World Events**: Simulate realistic cloud failures:
   - Terminate random Kubernetes pods (\`pod-delete\`).
   - Inject network latency or packet corruption (\`tc qdisc add dev eth0 root netem delay 200ms\`).
   - Simulate regional availability zone blackouts.
3. **Verify Steady State**: Confirm that circuit breakers, automatic scaling, and pod rescheduling absorb the failure without user disruption.
4. **Minimize Blast Radius**: Always test in small isolated canary segments with automated kill switches before expanding experiments.`,
          shortNotes: "Observability = Metrics (Prometheus pull model) + Logs (Loki structured JSON) + Traces (OTel traceparent context propagation). Chaos engineering verifies steady-state resilience by injecting real-world faults within limited blast radii.",
          examples: [
            {
              title: "Python Implementation: OpenTelemetry Distributed Trace Context Propagator",
              problem: "Implement W3C TraceContext generation, propagation across simulated microservices, and latency span tracing.",
              explanation: "Generates 128-bit trace IDs, passes W3C traceparent headers, and records execution spans with child parent-id relationships.",
              code: `import os
import time

class TraceContext:
    @staticmethod
    def generate_traceparent(trace_id=None, parent_id=None) -> str:
        # W3C TraceContext standard format: 00-{trace_id}-{span_id}-{flags}
        t_id = trace_id or os.urandom(16).hex()
        s_id = parent_id or os.urandom(8).hex()
        return f"00-{t_id}-{s_id}-01"

    @staticmethod
    def parse_traceparent(header: str):
        parts = header.split("-")
        return parts[1], parts[2]  # trace_id, span_id

def service_frontend():
    traceparent = TraceContext.generate_traceparent()
    trace_id, span_id = TraceContext.parse_traceparent(traceparent)
    print(f"[Frontend] Initiated Request -> TraceID: {trace_id} | SpanID: {span_id}")
    time.sleep(0.05)
    # Propagate traceparent in HTTP Header to Backend
    service_backend(traceparent)

def service_backend(incoming_header: str):
    trace_id, parent_span_id = TraceContext.parse_traceparent(incoming_header)
    child_span_id = os.urandom(8).hex()
    print(f"[Backend]  Received TraceID: {trace_id} | ParentSpan: {parent_span_id} | NewSpan: {child_span_id}")
    time.sleep(0.08)
    # Propagate to Database
    service_database(f"00-{trace_id}-{child_span_id}-01")

def service_database(incoming_header: str):
    trace_id, parent_span_id = TraceContext.parse_traceparent(incoming_header)
    db_span_id = os.urandom(8).hex()
    print(f"[Database] Executing Query   | TraceID: {trace_id} | ParentSpan: {parent_span_id} | DBSpan: {db_span_id}")
    time.sleep(0.03)
    print("[Database] Query completed in 30ms -> HTTP 200 OK")

print("=== OpenTelemetry Distributed Trace Traversal ===")
service_frontend()`,
              output: `=== OpenTelemetry Distributed Trace Traversal ===
[Frontend] Initiated Request -> TraceID: 7a82b9841f3d4ef28d9c240984a10e7b | SpanID: 5a28b9d4e1f7c041
[Backend]  Received TraceID: 7a82b9841f3d4ef28d9c240984a10e7b | ParentSpan: 5a28b9d4e1f7c041 | NewSpan: 91c4f01e8b7a4209
[Database] Executing Query   | TraceID: 7a82b9841f3d4ef28d9c240984a10e7b | ParentSpan: 91c4f01e8b7a4209 | DBSpan: 3d18a09f82bc71e4
[Database] Query completed in 30ms -> HTTP 200 OK`
            }
          ],
          keyPoints: [
            "Prometheus operates on a pull-based model, scraping metrics endpoints at configured intervals.",
            "Distributed tracing connects fragmented microservice logs into a unified timeline using Trace IDs.",
            "W3C TraceContext standardizes cross-service header propagation format 00-{trace}-{span}-{flags}.",
            "Loki reduces log indexing costs by indexing metadata labels rather than full raw text.",
            "Chaos Engineering tests system resilience by proactively injecting failures within a constrained blast radius."
          ],
          theoryQuestions: [
            {
              question: "Explain the Three Pillars of Observability. How does Distributed Tracing resolve the limitations of traditional centralized logging in microservices architectures?",
              marks: "7 Marks",
              answer: "The Three Pillars of Observability are: 1. Metrics: Time-series numeric measurements (counters, gauges, histograms) optimal for alerting on high-level anomalies (e.g. CPU spikes, error rates). 2. Logs: Discrete, timestamped event records containing rich local stack traces. 3. Distributed Traces: End-to-end representations of request flows across network boundaries. Limitation of traditional logging: In a microservices architecture, a single user checkout might fan out across 20 distinct services (Auth, Catalog, Cart, Payment, Inventory, Notifications). Centralized logging collects millions of disjointed log lines from different servers. Correlating which error in the Inventory service caused a timeout in the Payment service is virtually impossible. Distributed Tracing resolves this by attaching a globally unique Trace ID to the incoming request header (W3C traceparent). Every downstream service inherits the Trace ID and logs its own sub-tasks as Spans with start and end timestamps. An engineer can visualize the complete hierarchical span tree in Jaeger or Datadog, pinpointing exact bottlenecks in seconds."
            }
          ],
          mcqs: [
            {
              question: "In the W3C TraceContext standard header 'traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01', which component represents the globally unique 128-bit Trace ID?",
              options: [
                "4bf92f3577b34da6a3ce929d0e0e4736",
                "00f067aa0ba902b7",
                "00",
                "01"
              ],
              correctIndex: 0,
              explanation: "The W3C TraceContext specification defines the format as: version (00) - trace-id (32 hex chars / 128-bit) - parent-id/span-id (16 hex chars / 64-bit) - trace-flags (01)."
            }
          ]
        }
      ]
    },
    {
      id: "devops-u5",
      title: "Unit 5: DevSecOps, Secrets Management (Vault) & GitOps",
      description: "Shift-left DevSecOps pipeline integration (SAST, DAST, SCA, Secret Scanning), HashiCorp Vault dynamic secrets, and GitOps automation with ArgoCD reconciliation loops.",
      topics: [
        {
          id: "devops-u5-t1",
          title: "DevSecOps 'Shift-Left' Pipelines, HashiCorp Vault, and GitOps Continuous Delivery",
          simpleExplanation: "In the old days, software was built and then handed off to a separate security team who would find 50 critical vulnerabilities right before the deadline. DevSecOps 'shifts security left'—integrating automated security scanners directly into git commits and pull requests so security bugs are caught within seconds while coding. Never hardcode database passwords in code: HashiCorp Vault generates temporary, self-destructing passwords on demand. Finally, GitOps is the gold standard for deploying applications: Git is the single source of truth. When you push a change to a YAML file in Git, an automated robot (ArgoCD) watches the repository and updates your production Kubernetes cluster automatically!",
          detailedExplanation: `## 1. DevSecOps: 'Shift-Left' Security in CI/CD Pipelines

Security testing is shifted leftward toward early developer feedback loops:

\`\`\`mermaid
flowchart LR
    Dev["Developer Laptop (Pre-Commit: Gitleaks)"] --> Push["Git Push (SCA: Dependabot / Trivy)"]
    Push --> CI["CI Build (SAST: SonarQube / Semgrep)"]
    CI --> CD["Staging Deploy (DAST: OWASP ZAP)"]
    CD --> Prod["Production Runtime (Falco, Vault KMS)"]
\`\`\`

1. **Pre-Commit / Secret Scanning**:
   - Detects accidentally staged API keys, private keys, and passwords using tools like **Gitleaks** and **Trufflehog** before code ever leaves the local workstation.
2. **Static Application Security Testing (SAST)**:
   - Analyzes source code without executing it (e.g., SonarQube, Semgrep) to find code patterns vulnerable to SQLi, XSS, or buffer overflows.
3. **Software Composition Analysis (SCA)**:
   - Scans third-party open-source libraries (\`package.json\`, \`requirements.txt\`, container base images) for known CVEs (Common Vulnerabilities and Exposures) using tools like **Trivy** and **Snyk**.
4. **Dynamic Application Security Testing (DAST)**:
   - Black-box scanning of running applications in staging environments using tools like **OWASP ZAP** to find runtime authorization flaws and misconfigurations.

---

## 2. Secrets Management with HashiCorp Vault

Storing secrets in plaintext environment variables or plain Kubernetes Secrets (which are merely base64-encoded strings) is a critical security vulnerability.

### HashiCorp Vault Dynamic Secrets Architecture:
- Vault does not store static long-lived credentials.
- When an application requests database access, Vault uses its privileged admin account to generate a **unique, temporary SQL user** with a 1-hour Time-To-Live (TTL):
  \`\`\`sql
  CREATE USER 'v-token-xyz'@'%' IDENTIFIED BY 'temp-pass-123';
  GRANT SELECT, INSERT ON app_db.* TO 'v-token-xyz'@'%';
  \`\`\`
- After 1 hour, Vault automatically drops the user, instantly revoking leaked credentials.
- **Shamir's Secret Sharing**: Unsealing Vault requires $M$-of-$N$ threshold key shares to reconstruct the master encryption key.

---

## 3. The GitOps Operating Paradigm (ArgoCD / Flux)

GitOps applies Git developer workflows to operations and cloud infrastructure management:
- **Four GitOps Principles (OpenGitOps Standard)**:
  1. **Declarative**: The entire system state is described declaratively in YAML/JSON.
  2. **Versioned and Immutable**: The desired state is stored in Git, maintaining full change history and auditability.
  3. **Pulled Automatically**: Software agents (ArgoCD / Flux) automatically pull desired state from Git (no push-based CI credentials inside cluster).
  4. **Continuously Reconciled**: Software agents continuously observe live cluster state; if **Configuration Drift** occurs (e.g., an engineer manually edits a pod with \`kubectl edit\`), the agent automatically resets cluster state back to match the Git commit!`,
          shortNotes: "DevSecOps shifts security left: Secret scanning (Gitleaks) -> SAST (SonarQube) -> SCA (Trivy) -> DAST (OWASP ZAP). Vault provides ephemeral dynamic secrets with TTL. GitOps (ArgoCD) uses Git as single source of truth with automated drift reconciliation.",
          examples: [
            {
              title: "Python Implementation: GitOps Automated Drift Detection & Reconciliation Loop",
              problem: "Simulate a GitOps reconciliation engine (like ArgoCD) comparing Git desired state against live cluster state and correcting configuration drift.",
              explanation: "Compares replica count and image versions, detects unauthorized drift, and applies automated self-healing reconciliation.",
              code: `class GitOpsController:
    def __init__(self, git_desired_state: dict):
        self.git_desired_state = git_desired_state
        self.cluster_live_state = dict(git_desired_state)

    def simulate_manual_drift(self, component: str, key: str, rogue_value):
        print(f"[MANUAL ACTION] Unauthorized engineer ran 'kubectl edit' modifying {component}.{key} = {rogue_value}")
        self.cluster_live_state[key] = rogue_value

    def reconcile_loop(self):
        print("\\n[GitOps Engine] Scanning for Configuration Drift...")
        drift_detected = False

        for key, desired_val in self.git_desired_state.items():
            live_val = self.cluster_live_state.get(key)
            if live_val != desired_val:
                drift_detected = True
                print(f"[DRIFT DETECTED] Property '{key}': Live={live_val} != Desired Git={desired_val}")
                # Auto-sync reconciliation
                self.cluster_live_state[key] = desired_val
                print(f"[AUTO-HEALED] Reconciled '{key}' back to Git source of truth: {desired_val}")

        if not drift_detected:
            print("[STATUS IN-SYNC] Live cluster state perfectly matches Git repository.")

git_repo_state = {
    "image": "campusloop/api:v2.4.0",
    "replicas": 5,
    "cpu_limit": "500m"
}

argocd = GitOpsController(git_repo_state)
argocd.reconcile_loop()

# Simulate unauthorized manual change directly inside cluster
argocd.simulate_manual_drift("api-deployment", "replicas", 1)

# GitOps reconciliation run
argocd.reconcile_loop()`,
              output: `[GitOps Engine] Scanning for Configuration Drift...
[STATUS IN-SYNC] Live cluster state perfectly matches Git repository.

[MANUAL ACTION] Unauthorized engineer ran 'kubectl edit' modifying api-deployment.replicas = 1

[GitOps Engine] Scanning for Configuration Drift...
[DRIFT DETECTED] Property 'replicas': Live=1 != Desired Git=5
[AUTO-HEALED] Reconciled 'replicas' back to Git source of truth: 5`
            }
          ],
          keyPoints: [
            "DevSecOps integrates security automation into every stage of the software delivery lifecycle.",
            "SAST analyzes source code syntax; DAST probes running applications dynamically for vulnerabilities.",
            "SCA identifies vulnerable third-party dependencies against public CVE vulnerability databases.",
            "HashiCorp Vault creates short-lived dynamic credentials that self-destruct after their TTL expires.",
            "GitOps enforces Git as the sole source of truth with automated drift reconciliation via ArgoCD."
          ],
          theoryQuestions: [
            {
              question: "Differentiate between Static Application Security Testing (SAST) and Dynamic Application Security Testing (DAST). Explain how GitOps improves system security.",
              marks: "7 Marks",
              answer: "1. SAST vs DAST: SAST (Static Application Security Testing) is white-box testing that inspects application source code, byte code, or ASTs at compile/build time without running the application (e.g. SonarQube, Semgrep). It identifies coding bugs like unsanitized SQL inputs, hardcoded credentials, and race conditions with exact line-number references. DAST (Dynamic Application Security Testing) is black-box testing that interacts with a live running application over HTTP/S (e.g. OWASP ZAP). It probes endpoints with malformed payloads to discover runtime authentication vulnerabilities, session handling errors, and server misconfigurations without needing source code access. 2. GitOps Security Advantages: GitOps mandates that Git is the sole source of truth. Engineers do not have direct access or credentials to production Kubernetes clusters (no kubectl push access). Developers submit Pull Requests; code reviews and branch protection rules enforce separation of duties. ArgoCD pulls configurations from Git and automatically reverts unauthorized cluster tampering, completely neutralizing insider threats and manual drift."
            }
          ],
          mcqs: [
            {
              question: "Which of the following security scanning approaches is specifically designed to analyze third-party open-source libraries for known CVE vulnerabilities?",
              options: [
                "Software Composition Analysis (SCA)",
                "Dynamic Application Security Testing (DAST)",
                "Static Application Security Testing (SAST)",
                "Fuzz Testing"
              ],
              correctIndex: 0,
              explanation: "Software Composition Analysis (SCA) specifically scans dependency manifests (npm, pip, maven) and container image layers against known Common Vulnerabilities and Exposures (CVE) databases."
            }
          ]
        }
      ]
    }
  ]
};
