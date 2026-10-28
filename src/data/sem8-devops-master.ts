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
    }
  ]
};
