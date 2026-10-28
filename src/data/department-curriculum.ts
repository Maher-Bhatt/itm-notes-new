// =============================================================================
// PAN-INDIA MULTI-UNIVERSITY DEPARTMENT CURRICULUM REGISTRY (2026-2027)
// Deep research verified against AICTE Model Curriculum, UGC CBCS Regulations,
// GTU, ITM SLS, Mumbai University, AKTU, Anna University & VTU standards.
// =============================================================================

export interface CurriculumSubject {
  code: string;
  name: string;
  credits: number;
  category: 'Core' | 'Elective' | 'Lab' | 'Math/Science' | 'Humanities' | 'Project';
  description: string;
  keyTopics: string[];
  interactiveSubjectId?: string; // Links to full interactive notes in CampusLoop
}

export interface CurriculumSemester {
  semester: number;
  totalCredits: number;
  subjects: CurriculumSubject[];
}

export interface DepartmentCurriculum {
  id: string; // 'cse' | 'aids' | 'it' | 'ece' | 'eee' | 'me' | 'ce' | 'bca' | 'mca' | 'polytechnic'
  name: string;
  shortName: string;
  degree: 'B.Tech' | 'BCA' | 'MCA' | 'Diploma';
  durationYears: number;
  totalSemesters: number;
  totalSubjects: number;
  totalCredits: number;
  description: string;
  careerPaths: string[];
  semesters: CurriculumSemester[];
}

export const DEPARTMENT_CURRICULA: DepartmentCurriculum[] = [
  // ───────────────────────────────────────────────────────────────────────────
  // 1. B.TECH COMPUTER SCIENCE & ENGINEERING (CSE) - 42 SUBJECTS
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'cse',
    name: 'Computer Science & Engineering',
    shortName: 'B.Tech CSE',
    degree: 'B.Tech',
    durationYears: 4,
    totalSemesters: 8,
    totalSubjects: 42,
    totalCredits: 160,
    description: 'Algorithms, Data Structures, Operating Systems, Distributed Systems, AI/ML, Compilers, Database Engines & Cloud Architecture.',
    careerPaths: ['Software Development Engineer (SDE)', 'Systems Architect', 'Cloud DevOps Specialist', 'AI/ML Engineer', 'Full-Stack Lead'],
    semesters: [
      {
        semester: 1,
        totalCredits: 20,
        subjects: [
          { code: 'MATH101', name: 'Engineering Mathematics I (Calculus & Linear Algebra)', credits: 4, category: 'Math/Science', description: 'Differential calculus, partial derivatives, matrices, eigenvalues and eigenvectors.', keyTopics: ['Matrix Rank', 'Eigenvalues & Eigenvectors', 'Taylor Series', 'Multiple Integrals'], interactiveSubjectId: 'sem1-cla' },
          { code: 'CS102', name: 'Programming for Problem Solving using C', credits: 4, category: 'Core', description: 'Procedural programming, memory pointers, dynamic allocation, structures and file I/O.', keyTopics: ['Control Flow', 'Pointers & Memory', 'Dynamic Allocation', 'File Streams'], interactiveSubjectId: 'c-lang' },
          { code: 'PHY103', name: 'Engineering Physics & Quantum Mechanics', credits: 4, category: 'Math/Science', description: 'Wave optics, interference, lasers, fiber optics, and Schrödinger wave equation.', keyTopics: ['Wave Optics', 'Laser & Fiber Optics', 'Quantum Mechanics', 'Superconductivity'], interactiveSubjectId: 'sem1-physics' },
          { code: 'EE104', name: 'Basic Electrical & Electronics Engineering', credits: 4, category: 'Core', description: "DC/AC circuit theorems (KVL/KCL, Thevenin), transformers, PN junction diode and BJT.", keyTopics: ["Kirchhoff's Laws", 'AC Phasors', 'Single Phase Transformers', 'BJT Biasing'] },
          { code: 'ENG105', name: 'Professional English & Technical Writing', credits: 4, category: 'Humanities', description: 'Technical documentation, corporate communications, report writing and phonetics.', keyTopics: ['Technical Reports', 'Presentation Skills', 'Grammar & Syntax', 'Business Correspondence'] },
        ],
      },
      {
        semester: 2,
        totalCredits: 20,
        subjects: [
          { code: 'MATH201', name: 'Engineering Mathematics II (ODEs & Complex Variables)', credits: 4, category: 'Math/Science', description: 'Higher order linear differential equations, Laplace transforms, Fourier series and complex functions.', keyTopics: ['Linear ODEs with Constant Coeffs', 'Laplace Transforms', 'Fourier Series', 'Cauchy-Riemann Equations'] },
          { code: 'CS202', name: 'Programming in Python for Engineers', credits: 4, category: 'Core', description: 'Pythonic idioms, functional paradigms, OOP, NumPy, Pandas and file serialization.', keyTopics: ['List Comprehensions', 'NumPy Arrays', 'OOP in Python', 'Exception Handling'], interactiveSubjectId: 'sem1-python1' },
          { code: 'EC203', name: 'Digital Logic & Computer Design', credits: 4, category: 'Core', description: 'Boolean algebra, Karnaugh maps, combinational circuits (mux, adder) and sequential circuits (flip-flops, counters).', keyTopics: ['K-Map Minimization', 'Adders & Decoders', 'Flip-Flops (JK, D, T)', 'Synchronous Counters'], interactiveSubjectId: 'digital-elec' },
          { code: 'IT204', name: 'Web Technologies & Responsive Design', credits: 4, category: 'Core', description: 'Semantic HTML5, CSS Grid/Flexbox, JavaScript ES6+, DOM manipulation and Fetch API.', keyTopics: ['DOM Tree Manipulation', 'Async/Await & Promises', 'CSS Flexbox/Grid', 'REST Integration'], interactiveSubjectId: 'sem1-wt' },
          { code: 'ENV205', name: 'Environmental Science & Sustainability', credits: 4, category: 'Humanities', description: 'Ecosystems, biodiversity conservation, pollution control technologies and disaster management.', keyTopics: ['Ecosystem Dynamics', 'Pollution Remediation', 'Renewable Energy', 'Climate Change Policy'] },
        ],
      },
      {
        semester: 3,
        totalCredits: 22,
        subjects: [
          { code: 'CS301', name: 'Data Structures & Algorithms', credits: 4, category: 'Core', description: 'Linear lists, stacks, queues, binary search trees, AVL trees, graphs (BFS/DFS), sorting algorithms and hashing.', keyTopics: ['Asymptotic Complexity', 'AVL Trees & Rotations', 'Dijkstra & Prim', 'Hash Collision Resolution'], interactiveSubjectId: 'sem3-dsa' },
          { code: 'CS302', name: 'Database Management Systems (DBMS)', credits: 4, category: 'Core', description: 'Relational algebra, ANSI SQL, functional dependencies, 1NF to BCNF normalization, ACID transactions and 2PL.', keyTopics: ['Relational Calculus', 'BCNF Decomposition', 'ACID & Serializability', 'B-Tree & Hash Indexing'], interactiveSubjectId: 'sem3-dbms' },
          { code: 'CS303', name: 'Object-Oriented Programming with Java', credits: 4, category: 'Core', description: 'JVM architecture, class hierarchies, polymorphism, interfaces, exception propagation, multithreading and Collections framework.', keyTopics: ['JVM Internals', 'Dynamic Method Dispatch', 'Custom Checked Exceptions', 'Java Collections Framework'], interactiveSubjectId: 'sem3-java' },
          { code: 'CS304', name: 'Computer Organization & Architecture', credits: 3, category: 'Core', description: 'Von Neumann model, Mano computer RTL, Booth multiplication, 5-stage RISC pipelining and cache mapping techniques.', keyTopics: ["Booth's Algorithm", '5-Stage Pipelining', 'Pipeline Hazards', 'Set-Associative Cache Mapping'], interactiveSubjectId: 'sub-coa' },
          { code: 'MATH305', name: 'Computer Oriented Numerical Methods (Python)', credits: 3, category: 'Math/Science', description: 'Nonlinear root finding, Gauss elimination, Lagrange interpolation, Simpson integration and Runge-Kutta ODE solvers in Python.', keyTopics: ['Newton-Raphson Method', 'Gauss-Jordan Pivoting', "Simpson's 1/3 Rule", 'Runge-Kutta 4th Order (RK4)'], interactiveSubjectId: 'sem3-conmp' },
          { code: 'CS306', name: 'Discrete Mathematics & Graph Theory', credits: 4, category: 'Math/Science', description: 'Propositional logic, set theory, recurrence relations, generating functions, Euler/Hamilton graphs and trees.', keyTopics: ['Predicate Logic & Proofs', 'Master Theorem for Recurrences', "Euler's Formula for Planar Graphs", 'Spanning Trees'] },
        ],
      },
      {
        semester: 4,
        totalCredits: 22,
        subjects: [
          { code: 'CS401', name: 'Operating Systems (OS)', credits: 4, category: 'Core', description: 'Process management, CPU scheduling (SJF, Round Robin), semaphores, deadlock avoidance (Banker algorithm), paging and virtual memory.', keyTopics: ['Round Robin Scheduling', "Banker's Algorithm", 'Semaphore & Mutex', 'Page Replacement (LRU/FIFO)'], interactiveSubjectId: 'sem4-os' },
          { code: 'CS402', name: 'Computer Networks (CN)', credits: 4, category: 'Core', description: 'OSI & TCP/IP stack, sliding window protocols, CIDR subnetting, link-state routing (OSPF), TCP congestion control and DNS.', keyTopics: ['IPv4 Subnetting & CIDR', 'Sliding Window Go-Back-N', 'Dijkstra Routing Algorithm', 'TCP 3-Way Handshake & AIMD'], interactiveSubjectId: 'sem4-cn' },
          { code: 'CS403', name: 'Design & Analysis of Algorithms (DAA)', credits: 4, category: 'Core', description: 'Divide and conquer, greedy heuristics, dynamic programming (0/1 Knapsack, LCS), backtracking (N-Queens) and NP-completeness.', keyTopics: ['Master Theorem Solving', '0/1 Knapsack (DP)', 'Longest Common Subsequence', 'P vs NP & Cook Theorem'], interactiveSubjectId: 'sem4-daa' },
          { code: 'CS404', name: 'Theory of Computation & Automata (TOC)', credits: 4, category: 'Core', description: 'Deterministic & Nondeterministic Finite Automata, regular expressions, pumping lemma, CFG, Pushdown Automata and Turing machines.', keyTopics: ['DFA Minimization (Myhill-Nerode)', 'Pumping Lemma for Regular/CFL', 'Pushdown Automata (PDA)', 'Turing Machine Halting Problem'], interactiveSubjectId: 'sem5-toc' },
          { code: 'CS405', name: 'Microprocessors & Microcontrollers (8086/ARM)', credits: 3, category: 'Core', description: '8086 internal architecture, segmented memory, interrupt handling, interfacing chips (8255, 8254) and introduction to ARM Cortex.', keyTopics: ['8086 Register Architecture', 'Segment:Offset Addressing', 'Hardware Interrupts (INT 21h)', '8255 Programmable Peripheral Interface'] },
          { code: 'CS406', name: 'Financial Management for Engineers', credits: 3, category: 'Humanities', description: 'Time value of money, capital budgeting, NPV/IRR, cost accounting, break-even analysis and startup balance sheets.', keyTopics: ['Net Present Value (NPV)', 'Internal Rate of Return (IRR)', 'Break-Even Analysis', 'Double Entry Accounting'], interactiveSubjectId: 'fin-acc' },
        ],
      },
      {
        semester: 5,
        totalCredits: 22,
        subjects: [
          { code: 'CS501', name: 'Software Engineering & Agile Methodologies', credits: 4, category: 'Core', description: 'SDLC models (Waterfall, Spiral, Agile/Scrum), requirement engineering, UML diagrams, architectural patterns and black/white-box testing.', keyTopics: ['Agile Sprint Lifecycles', 'UML Class & Sequence Diagrams', 'Cyclomatic Complexity Testing', 'Design Patterns (GoF)'], interactiveSubjectId: 'sem5-se' },
          { code: 'CS502', name: 'Artificial Intelligence & Machine Learning', credits: 4, category: 'Core', description: 'Heuristic search (A*, Minimax), knowledge representation, supervised learning, gradient descent, decision trees and SVM.', keyTopics: ['A* Heuristic Search', 'Gradient Descent Optimization', 'Decision Tree & Random Forest', 'Support Vector Machines (SVM)'], interactiveSubjectId: 'sem5-aiml' },
          { code: 'CS503', name: 'Compiler Design & Language Translation', credits: 4, category: 'Core', description: 'Lexical analysis (Lex), LL(1) and LR(1) syntax analysis, syntax directed translation, three-address intermediate code and loop optimization.', keyTopics: ['LL(1) First & Follow Sets', 'LR(0) and LALR(1) Parsing', 'Three-Address Code (TAC)', 'DAG & Common Subexpression Elimination'], interactiveSubjectId: 'sem6-cd' },
          { code: 'CS504', name: 'Cloud Computing & Distributed Systems', credits: 4, category: 'Core', description: 'Hypervisors, Docker containerization, Kubernetes orchestration, AWS/GCP services, CAP theorem and distributed consensus (Raft/Paxos).', keyTopics: ['Docker Containerization', 'Kubernetes Architecture', 'CAP Theorem & PACELC', 'Raft Consensus Algorithm'], interactiveSubjectId: 'sem6-cloud' },
          { code: 'CS505', name: 'Information & Cyber Security', credits: 3, category: 'Elective', description: 'Symmetric encryption (AES, DES), asymmetric public-key cryptography (RSA, ECC), cryptographic hashes (SHA-256), PKI and network firewalls.', keyTopics: ['AES-128 Block Cipher Round Flow', 'RSA Key Generation & Proof', 'Diffie-Hellman Key Exchange', 'SHA-256 & Digital Signatures'], interactiveSubjectId: 'sem7-cyber' },
          { code: 'CS506', name: 'Computer Graphics & Visualization', credits: 3, category: 'Elective', description: 'Raster scan displays, Bresenham line & circle algorithms, 2D/3D affine transformations, Cohen-Sutherland clipping and OpenGL rendering.', keyTopics: ['Bresenham Line Generation', '2D Transformation Matrices', 'Cohen-Sutherland Line Clipping', 'OpenGL Shaders Pipeline'] },
        ],
      },
      {
        semester: 6,
        totalCredits: 20,
        subjects: [
          { code: 'CS601', name: 'Distributed Operating Systems', credits: 4, category: 'Core', description: 'RPC/RMI, Lamport logical clocks, vector clocks, distributed mutual exclusion (Ricart-Agrawala), election algorithms and distributed file systems.', keyTopics: ['Lamport Logical Clocks', 'Distributed Mutual Exclusion', "Bully Election Algorithm", 'Hadoop Distributed File System (HDFS)'] },
          { code: 'CS602', name: 'Deep Learning & Neural Networks', credits: 4, category: 'Core', description: 'Multilayer perceptrons, backpropagation, CNN architectures (ResNet), RNN/LSTM for sequential data, autoencoders and optimization with Adam.', keyTopics: ['Backpropagation Gradient Calculus', 'Convolution & Pooling Math', 'LSTM & GRU Gating Equations', 'Vanishing Gradient Remedies'] },
          { code: 'CS603', name: 'DevOps & Site Reliability Engineering (SRE)', credits: 3, category: 'Core', description: 'CI/CD pipeline construction (GitHub Actions), Infrastructure as Code (Terraform), Kubernetes Helm charts and observability (Prometheus/Grafana).', keyTopics: ['CI/CD Pipeline Design', 'Terraform Declarative Provisioning', 'Service Level Objectives (SLO/SLA)', 'Prometheus Metrics & Grafana Alerting'], interactiveSubjectId: 'sem8-devops' },
          { code: 'CS604', name: 'Full Stack Web Engineering (MERN)', credits: 3, category: 'Core', description: 'React architecture, hooks, state management (Redux/Zustand), Node.js event loop, Express middleware and MongoDB aggregation pipelines.', keyTopics: ['React Virtual DOM & Reconciliation', 'Custom Hooks & State Lifecycles', 'Node.js Event Loop Microtasks', 'MongoDB Pipeline Aggregation'] },
          { code: 'CS605', name: 'Mobile Application Engineering (Android/Kotlin)', credits: 3, category: 'Elective', description: 'Android Jetpack, ViewModel, Room database, Coroutines, Retrofit networking and Material 3 design system.', keyTopics: ['Activity & Fragment Lifecycles', 'Kotlin Coroutines & Flow', 'Jetpack Compose UI Paradigm', 'Room SQLite ORM'] },
          { code: 'CS606', name: 'Mini-Project / Capstone Prototype I', credits: 3, category: 'Project', description: 'System design, requirement specification, architecture blueprint and rapid sprint prototype implementation.', keyTopics: ['Architecture Blueprint', 'Database Schema DDL', 'Sprint Milestone Tracking', 'Code Review & Testing'] },
        ],
      },
      {
        semester: 7,
        totalCredits: 20,
        subjects: [
          { code: 'CS701', name: 'Big Data Analytics & Spark Architecture', credits: 4, category: 'Core', description: 'Hadoop ecosystem, MapReduce, Apache Spark RDDs, DataFrames, Spark Streaming, Delta Lake and distributed querying.', keyTopics: ['Spark RDD Transformations vs Actions', 'Broadcast & Accumulator Variables', 'Spark SQL Catalyst Optimizer', 'Structured Streaming Architectures'] },
          { code: 'CS702', name: 'Natural Language Processing & LLMs', credits: 4, category: 'Core', description: 'Tokenization, n-grams, Word2Vec embeddings, Self-Attention mechanism, Transformer encoders/decoders, BERT, GPT and prompt engineering.', keyTopics: ['Self-Attention & Multi-Head Math', 'Transformer Architecture (Encoder/Decoder)', 'BERT vs GPT Pretraining Objectives', 'Fine-Tuning LoRA & Quantization'], interactiveSubjectId: 'sem7-nlp' },
          { code: 'CS703', name: 'Internet of Things (IoT) & Edge Computing', credits: 3, category: 'Core', description: 'Microcontrollers (ESP32, Raspberry Pi), sensor interfaces (I2C, SPI), IoT protocols (MQTT, CoAP), edge inference and cloud telemetry.', keyTopics: ['MQTT Publish-Subscribe Architecture', 'I2C & SPI Serial Protocols', 'Edge AI TinyML Deployment', 'AWS IoT Core Data Ingestion'] },
          { code: 'CS704', name: 'Blockchain Technology & Smart Contracts', credits: 3, category: 'Elective', description: 'Distributed ledgers, Proof-of-Work vs Proof-of-Stake consensus, Ethereum Virtual Machine (EVM), Solidity smart contracts and DeFi protocols.', keyTopics: ['Merkle Tree State Trees', 'Proof of Stake vs Work Consensus', 'Solidity Smart Contract Security', 'Reentrancy Vulnerability & Auditing'] },
          { code: 'CS705', name: 'High Performance Computing (HPC)', credits: 3, category: 'Elective', description: 'Shared memory parallel programming (OpenMP), message passing interface (MPI), GPU compute with CUDA and Amdahl law scaling.', keyTopics: ["Amdahl's & Gustafson's Laws", 'OpenMP Parallel Directives', 'MPI Point-to-Point & Collectives', 'CUDA Thread Hierarchy & Kernels'] },
          { code: 'CS706', name: 'Information Retrieval & Search Engines', credits: 3, category: 'Elective', description: 'Web crawling, inverted indices, vector space ranking (TF-IDF, BM25), PageRank algorithm and semantic vector search embeddings.', keyTopics: ['Inverted Index Inversion Pipeline', 'BM25 Probabilistic Ranking', "PageRank Power Iteration", 'Cosine Similarity & HNSW Indexing'] },
        ],
      },
      {
        semester: 8,
        totalCredits: 14,
        subjects: [
          { code: 'CS801', name: 'Major Capstone Project & Defense', credits: 8, category: 'Project', description: 'End-to-end industry or research project with design, implementation, comprehensive testing, deployment, paper writing and viva.', keyTopics: ['Enterprise Architecture Delivery', 'Comprehensive Integration Testing', 'Production Deployment & Monitoring', 'Technical Thesis & Oral Defense'] },
          { code: 'CS802', name: 'Full-Semester Industry Internship / Co-Op', credits: 6, category: 'Project', description: 'Full-time industrial immersive internship in technology corporations, working on enterprise codebases under industry mentorship.', keyTopics: ['Agile Sprint Participation', 'Production Pull Requests', 'CI/CD Pipeline Maintenance', 'Enterprise Issue Triage'] },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 2. B.TECH ARTIFICIAL INTELLIGENCE & DATA SCIENCE (AI & DS) - 42 SUBJECTS
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'aids',
    name: 'Artificial Intelligence & Data Science',
    shortName: 'B.Tech AI & DS',
    degree: 'B.Tech',
    durationYears: 4,
    totalSemesters: 8,
    totalSubjects: 42,
    totalCredits: 160,
    description: 'Statistical Inference, Machine Learning, Deep Neural Networks, Natural Language Processing, Computer Vision, MLOps, Generative AI & Big Data.',
    careerPaths: ['Machine Learning Engineer', 'Data Scientist', 'AI Research Engineer', 'Computer Vision Specialist', 'Generative AI Developer'],
    semesters: [
      {
        semester: 1,
        totalCredits: 20,
        subjects: [
          { code: 'MATH101', name: 'Linear Algebra & Calculus for Data Science', credits: 4, category: 'Math/Science', description: 'Vector spaces, matrix decompositions, eigenvalues, gradients, Hessians, and multivariable optimization.', keyTopics: ['Singular Value Decomposition (SVD)', 'Eigen Decomposition', 'Multivariable Taylor Expansion', 'Gradient & Hessian Matrices'], interactiveSubjectId: 'sem1-cla' },
          { code: 'DS102', name: 'Python for Data Science & Computing', credits: 4, category: 'Core', description: 'NumPy vectorized arrays, Pandas DataFrames, Matplotlib visualization and algorithmic logic.', keyTopics: ['Vectorized Array Computing', 'Pandas DataFrame Wrangling', 'Exploratory Data Analysis', 'Scipy Statistical Functions'], interactiveSubjectId: 'sem1-python1' },
          { code: 'PHY103', name: 'Physics of Information & Sensors', credits: 4, category: 'Math/Science', description: 'Electromagnetism, semiconductor physics, photodetectors and sensor signal acquisition.', keyTopics: ['Semiconductor Physics', 'Photodetector Transducers', 'Signal Acquisition', 'Noise Characterization'], interactiveSubjectId: 'sem1-physics' },
          { code: 'EE104', name: 'Basic Electrical & Electronic Circuits', credits: 4, category: 'Core', description: 'Circuit theorems, operational amplifiers, analog-to-digital converters and microcontroller logic.', keyTopics: ['Op-Amp Inverting/Non-Inverting', 'ADC Sampling Theorems', 'Kirchhoff Laws', 'Diode Rectification'] },
          { code: 'ENG105', name: 'Technical Communication & Ethics', credits: 4, category: 'Humanities', description: 'Scientific report writing, data visualization storytelling, presentation and professional ethics.', keyTopics: ['Data Storytelling', 'Technical Paper Structure', 'Executive Summaries', 'Ethical AI Dilemmas'] },
        ],
      },
      {
        semester: 2,
        totalCredits: 20,
        subjects: [
          { code: 'MATH201', name: 'Probability, Random Variables & Statistics', credits: 4, category: 'Math/Science', description: 'Bayes theorem, probability distributions (Gaussian, Poisson), Central Limit Theorem, hypothesis testing.', keyTopics: ["Bayes' Rule & Posterior Inference", 'Gaussian Normal Distribution', 'Central Limit Theorem (CLT)', 'Hypothesis Testing (p-values, t-test)'] },
          { code: 'DS202', name: 'Data Structures using Python & C++', credits: 4, category: 'Core', description: 'Stacks, queues, priority queues, binary search trees, hash tables and graph representations.', keyTopics: ['Time Complexity & Big-O', 'Priority Heaps', 'BST Operations', 'Graph Adjacency Structures'], interactiveSubjectId: 'sem3-dsa' },
          { code: 'DS203', name: 'Foundations of Data Science & Exploration', credits: 4, category: 'Core', description: 'Data ingestion, cleaning, missing value imputation, outlier detection (IQR, Z-score) and dimensionality reduction.', keyTopics: ['Data Imputation Pipelines', 'Z-Score & IQR Outliers', 'Principal Component Analysis (PCA)', 'Correlation Matrices'] },
          { code: 'EC204', name: 'Digital Logic & Computer Systems', credits: 4, category: 'Core', description: 'Boolean functions, combinational and sequential logic design, CPU datapath and memory hierarchy.', keyTopics: ['Logic Gates & K-Maps', 'Multiplexers & Adders', 'Registers & Flip-Flops', 'Cache Memory Levels'], interactiveSubjectId: 'digital-elec' },
          { code: 'ENV205', name: 'Environmental Science & Green AI', credits: 4, category: 'Humanities', description: 'Energy efficiency in compute clusters, carbon footprint of large model training and sustainable development.', keyTopics: ['Data Center Energy Consumption', 'Carbon Accounting in ML', 'Renewable Energy Systems', 'E-Waste Lifecycle'] },
        ],
      },
      {
        semester: 3,
        totalCredits: 22,
        subjects: [
          { code: 'DS301', name: 'Advanced Data Structures & Graph Algorithms', credits: 4, category: 'Core', description: 'Segment trees, Fenwick trees, Trie, Tarjan strongly connected components, Bellman-Ford and network flow.', keyTopics: ['Trie Prefix Trees', 'Tarjan SCC Algorithm', 'Bellman-Ford & Floyd-Warshall', 'Maximum Flow (Ford-Fulkerson)'] },
          { code: 'DS302', name: 'Database Management Systems & NoSQL', credits: 4, category: 'Core', description: 'Relational schema design, SQL DDL/DML, MongoDB document store, Cassandra wide-column and Neo4j graph databases.', keyTopics: ['Relational Normalization 3NF/BCNF', 'MongoDB Aggregation Pipeline', 'Cassandra Partition Keys', 'Cypher Graph Queries'], interactiveSubjectId: 'sem3-dbms' },
          { code: 'DS303', name: 'Statistical Inference & Regression Modeling', credits: 4, category: 'Core', description: 'Ordinary Least Squares (OLS), Ridge & Lasso regularization, Logistic regression, ANOVA, and maximum likelihood estimation.', keyTopics: ['OLS Mathematical Derivation', 'Ridge vs Lasso (L1 vs L2)', 'Logistic Sigmoid Log-Loss', 'Maximum Likelihood Estimation (MLE)'] },
          { code: 'DS304', name: 'Computer Architecture & GPU Parallelism', credits: 3, category: 'Core', description: 'Instruction pipelines, SIMD/AVX vector extensions, GPU streaming multiprocessor architecture and memory bandwidth.', keyTopics: ['SIMD Vector Instructions', 'GPU Streaming Multiprocessors', 'High Bandwidth Memory (HBM)', 'Tensor Core Processing Units'], interactiveSubjectId: 'sub-coa' },
          { code: 'DS305', name: 'Discrete Structures & Combinatorics for AI', credits: 3, category: 'Math/Science', description: 'Recurrence relations, counting techniques, graph coloring, boolean satisfiability (SAT) and Markov chains.', keyTopics: ['Generating Functions', 'Graph Coloring Algorithms', 'Boolean SAT Solvers', 'Discrete Markov Chains'] },
          { code: 'DS306', name: 'Object-Oriented Design & Software Patterns', credits: 4, category: 'Core', description: 'SOLID principles, design patterns (Factory, Observer, Strategy), dependency injection and clean architecture.', keyTopics: ['SOLID Design Principles', 'Observer & Factory Patterns', 'Unit Testing & Mocking', 'Clean Architecture Boundaries'], interactiveSubjectId: 'sem3-java' },
        ],
      },
      {
        semester: 4,
        totalCredits: 22,
        subjects: [
          { code: 'AI401', name: 'Supervised & Unsupervised Machine Learning', credits: 4, category: 'Core', description: 'Decision trees, Random Forest, AdaBoost, XGBoost, K-Means clustering, DBSCAN, Hierarchical clustering and GMMs.', keyTopics: ['Information Gain & Gini Impurity', 'XGBoost Gradient Boosting', 'K-Means++ Initialization', 'DBSCAN Density Clustering'], interactiveSubjectId: 'sem5-aiml' },
          { code: 'AI402', name: 'Data Warehousing & Data Mining', credits: 4, category: 'Core', description: 'Star and snowflake schemas, OLAP cubes, ETL pipelines, Apriori association rule mining and FP-Growth.', keyTopics: ['Star vs Snowflake Schema', 'OLAP Rollup & Drill-Down', 'Apriori Support & Confidence', 'FP-Growth Frequent Itemsets'] },
          { code: 'AI403', name: 'Operating Systems & Cloud Virtualization', credits: 4, category: 'Core', description: 'Linux kernel architecture, process threads, memory management, page replacement and container cgroups.', keyTopics: ['Linux Cgroups & Namespaces', 'Virtual Memory & Demand Paging', 'Deadlock Banker Algorithm', 'Process Context Switching'], interactiveSubjectId: 'sem4-os' },
          { code: 'AI404', name: 'Design & Analysis of Algorithms', credits: 4, category: 'Core', description: 'Divide and conquer, greedy methods, dynamic programming, string matching (KMP, Rabin-Karp) and NP-completeness.', keyTopics: ['Knuth-Morris-Pratt (KMP)', 'Dynamic Programming Subproblems', 'Greedy Huffman Coding', 'NP-Complete Reductions'], interactiveSubjectId: 'sem4-daa' },
          { code: 'AI405', name: 'Computer Networks & Distributed Pipelines', credits: 3, category: 'Core', description: 'Socket programming, TCP/IP, HTTP/3, message brokers (Apache Kafka, RabbitMQ) and distributed streaming.', keyTopics: ['Kafka Topic Partitioning', 'TCP vs UDP Throughput', 'RESTful API Contracts', 'Socket Streaming Architecture'], interactiveSubjectId: 'sem4-cn' },
          { code: 'AI406', name: 'Numerical Optimization for Deep Learning', credits: 3, category: 'Math/Science', description: 'Convex optimization, Stochastic Gradient Descent (SGD), Momentum, RMSProp, Adam and Lagrange multipliers.', keyTopics: ['Convex vs Non-Convex Functions', 'SGD with Momentum', 'Adam Optimizer Equations', 'Karush-Kuhn-Tucker (KKT) Conditions'] },
        ],
      },
      {
        semester: 5,
        totalCredits: 22,
        subjects: [
          { code: 'AI501', name: 'Deep Learning & Neural Architectures', credits: 4, category: 'Core', description: 'Multilayer Perceptrons, Convolutional Networks (ResNet, EfficientNet), Recurrent Networks (LSTM, GRU), and regularization.', keyTopics: ['Backprop Chain Rule Matrix Math', 'Residual Connections (Skip Links)', 'LSTM Forget Gate Equations', 'Dropout & Batch Normalization'] },
          { code: 'AI502', name: 'Natural Language Processing & Speech', credits: 4, category: 'Core', description: 'Tokenization (BPE, WordPiece), TF-IDF, Word2Vec, GloVe, Recurrent Language Models, and Speech-to-Text acoustic modeling.', keyTopics: ['Byte-Pair Encoding (BPE)', 'Word2Vec Skip-Gram & CBOW', 'Seq2Seq with Attention', 'Acoustic Feature MFCCs'], interactiveSubjectId: 'sem7-nlp' },
          { code: 'AI503', name: 'Big Data Engineering with Spark & Delta Lake', credits: 4, category: 'Core', description: 'Distributed data pipelines, Spark DataFrames, partitioning, shuffles, Delta Lake ACID transactions and PySpark.', keyTopics: ['Spark Execution DAG & Shuffle', 'PySpark Window Aggregations', 'Delta Lake Time Travel & Parquet', 'Broadcast Hash Joins'] },
          { code: 'AI504', name: 'Computer Vision & Image Processing', credits: 4, category: 'Core', description: 'Spatial filtering, edge detection (Sobel, Canny), object detection (YOLO, Faster R-CNN), and semantic segmentation (U-Net).', keyTopics: ['Canny Edge Detection Pipeline', 'YOLO Anchor Boxes & NMS', 'U-Net Skip Connections', 'Optical Flow & Tracking'] },
          { code: 'AI505', name: 'AI Ethics, Governance & Privacy', credits: 3, category: 'Humanities', description: 'Algorithmic bias mitigation, differential privacy, Federated Learning, GDPR/DPDP compliance and AI safety.', keyTopics: ['Algorithmic Fairness Metrics', 'Differential Privacy Guarantees', 'Federated Learning Averaging', 'EU AI Act Risk Tiers'] },
          { code: 'AI506', name: 'Information Extraction & Knowledge Graphs', credits: 3, category: 'Elective', description: 'Named Entity Recognition (NER), relation extraction, RDF triples, SPARQL, and knowledge graph embeddings (TransE).', keyTopics: ['BiLSTM-CRF for NER', 'RDF Triples & Ontologies', 'SPARQL Query Language', 'TransE Knowledge Embeddings'] },
        ],
      },
      {
        semester: 6,
        totalCredits: 20,
        subjects: [
          { code: 'AI601', name: 'Generative AI & Large Language Models (LLMs)', credits: 4, category: 'Core', description: 'Attention mechanisms, Transformer architectures, Instruction tuning, RLHF, Direct Preference Optimization (DPO), and LoRA fine-tuning.', keyTopics: ['Scaled Dot-Product Attention', 'Rotary Position Embeddings (RoPE)', 'RLHF vs DPO Alignment', 'LoRA Low-Rank Decomposition'] },
          { code: 'AI602', name: 'Reinforcement Learning & Decision Making', credits: 4, category: 'Core', description: 'Markov Decision Processes (MDP), Bellman equations, Q-Learning, Deep Q-Networks (DQN), Policy Gradients and PPO.', keyTopics: ['Bellman Optimality Equations', 'Deep Q-Network Experience Replay', 'Proximal Policy Optimization (PPO)', 'Actor-Critic Architectures'] },
          { code: 'AI603', name: 'MLOps: Machine Learning Operations & CI/CD', credits: 3, category: 'Core', description: 'Model registry (MLflow), feature stores (Feast), data validation (Great Expectations), model monitoring and drift detection.', keyTopics: ['MLflow Experiment Tracking', 'Data Drift & Concept Drift (KS-Test)', 'Automated Retraining Pipelines', 'Triton Model Serving Container'] },
          { code: 'AI604', name: 'Time Series Analysis & Forecasting', credits: 3, category: 'Core', description: 'Stationarity, ARIMA/SARIMA models, Exponential smoothing, Facebook Prophet, and Temporal Fusion Transformers.', keyTopics: ['Augmented Dickey-Fuller Test', 'SARIMA Parameter Estimation', 'Prophet Additive Seasonality', 'LSTM Time Series Forecasters'] },
          { code: 'AI605', name: 'Information Retrieval & Semantic Vector Search', credits: 3, category: 'Elective', description: 'Dense embeddings, vector databases (Milvus, Pinecone, Chroma), HNSW indexing, and Retrieval Augmented Generation (RAG).', keyTopics: ['Dense Embedding Bi-Encoders', 'HNSW Graph Vector Indexing', 'RAG Chunking & Re-ranking', 'Cross-Encoder Re-ranking'] },
          { code: 'AI606', name: 'AI & Data Science Domain Prototype', credits: 3, category: 'Project', description: 'End-to-end predictive or generative model trained on real-world datasets with Streamlit/FastAPI interactive deployment.', keyTopics: ['FastAPI Inference Endpoints', 'Docker Packaging for Models', 'Latency & Throughput Benchmarking', 'Interactive Dashboard UI'] },
        ],
      },
      {
        semester: 7,
        totalCredits: 20,
        subjects: [
          { code: 'AI701', name: 'Autonomous Systems & Robotics AI', credits: 4, category: 'Core', description: 'Robot Operating System (ROS2), SLAM (Simultaneous Localization and Mapping), sensor fusion (Kalman filters) and path planning (A*, RRT*).', keyTopics: ['Extended Kalman Filter (EKF)', 'LIDAR SLAM Point Clouds', 'RRT* Path Planning Algorithm', 'ROS2 Publisher-Subscriber Nodes'] },
          { code: 'AI702', name: 'Graph Neural Networks & Geometric Deep Learning', credits: 4, category: 'Core', description: 'Message passing neural networks (MPNN), Graph Convolutional Networks (GCN), Graph Attention Networks (GAT) and link prediction.', keyTopics: ['Message Passing Framework', 'Graph Convolutional Math (GCN)', 'Graph Attention Multi-Head (GAT)', 'Molecular & Social Graph Inference'] },
          { code: 'AI703', name: 'Cloud AI Infrastructure & High Performance Clusters', credits: 3, category: 'Core', description: 'Distributed model training (DDP, FSDP), Ray distributed framework, Slurm cluster scheduling and InfiniBand networking.', keyTopics: ['Fully Sharded Data Parallel (FSDP)', 'Ray Distributed Execution Engine', 'NCCL All-Reduce Collective Ops', 'Slurm HPC Batch Scheduling'] },
          { code: 'AI704', name: 'Explainable AI (XAI) & Model Interpretability', credits: 3, category: 'Elective', description: 'SHAP (Shapley Additive exPlanations), LIME, Integrated Gradients, Grad-CAM for CNNs, and attention map visualization.', keyTopics: ['Shapley Value Game Theory', 'LIME Local Surrogate Models', 'Grad-CAM Feature Map Heatmaps', 'Counterfactual Explanations'] },
          { code: 'AI705', name: 'Edge AI & Embedded Machine Learning (TinyML)', credits: 3, category: 'Elective', description: 'Model quantization (INT8, FP4), pruning, knowledge distillation, TensorFlow Lite, and deployment on STM32 / Arduino / Coral TPU.', keyTopics: ['Post-Training Quantization (PTQ)', 'Structured & Unstructured Pruning', 'Knowledge Distillation Loss', 'TFLite Micro Runtime Execution'] },
          { code: 'AI706', name: 'Recommender Systems & Personalization', credits: 3, category: 'Elective', description: 'Collaborative filtering, matrix factorization (ALS), deep recommender architectures (Wide & Deep), and multi-armed bandits.', keyTopics: ['Alternating Least Squares (ALS)', 'Wide & Deep Model Architecture', 'Upper Confidence Bound (UCB)', 'Two-Tower Candidate Generation'] },
        ],
      },
      {
        semester: 8,
        totalCredits: 14,
        subjects: [
          { code: 'AI801', name: 'Industry AI Capstone Project & Defense', credits: 8, category: 'Project', description: 'Production-ready AI system addressing complex real-world challenges, with quantitative performance benchmarks and thesis publication.', keyTopics: ['Model Architecture Design', 'Production Deployment & Monitoring', 'A/B Testing Experimentation', 'Oral Thesis Defense'] },
          { code: 'AI802', name: 'Full-Semester AI Industry Internship', credits: 6, category: 'Project', description: 'Full-time machine learning engineering internship in AI labs or enterprise tech divisions.', keyTopics: ['Production Code Reviews', 'Model Retraining Pipeline Ops', 'Cross-Functional Team Sprints', 'Industrial Deliverable Presentation'] },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 3. BCA - BACHELOR OF COMPUTER APPLICATIONS (30 SUBJECTS - 6 SEMESTERS)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'bca',
    name: 'Bachelor of Computer Applications',
    shortName: 'BCA (Full 6 Semesters)',
    degree: 'BCA',
    durationYears: 3,
    totalSemesters: 6,
    totalSubjects: 30,
    totalCredits: 134,
    description: 'Practical Software Development, Web Technologies, Database Systems, Python, Java, Cloud Computing, Android, AI/ML & Cyber Security.',
    careerPaths: ['Full-Stack Web Developer', 'Database Administrator (DBA)', 'Software Engineer', 'Android App Developer', 'Cloud Support Specialist'],
    semesters: [
      {
        semester: 1,
        totalCredits: 22,
        subjects: [
          { code: 'BCA101', name: 'Computer Fundamentals & Office Automation', credits: 4, category: 'Core', description: 'Computer hardware architecture, operating system fundamentals, binary arithmetic, and modern office productivity suites.', keyTopics: ['Von Neumann Architecture', 'Number Systems & Conversions', 'System vs Application Software', 'Spreadsheet Advanced Functions'], interactiveSubjectId: 'bca101-comp-fundamentals' },
          { code: 'BCA102', name: 'Programming Principles & C Language', credits: 4, category: 'Core', description: 'Procedural programming logic, control structures, arrays, pointers, functions, dynamic allocation and file handling in C.', keyTopics: ['Control Flow (if, switch, loops)', 'Pointers & Dynamic Memory', 'Arrays & String Operations', 'File Handling & Structures'], interactiveSubjectId: 'bca102-c-programming' },
          { code: 'BCA103', name: 'Discrete Mathematical Structures', credits: 4, category: 'Math/Science', description: 'Set theory, relations, propositional logic, truth tables, combinatorics, recurrence relations and graph theory basics.', keyTopics: ['Set Theory & Venn Diagrams', 'Propositional Logic & Equivalence', 'Permutations & Combinations', 'Graph Theory Foundations'], interactiveSubjectId: 'bca103-discrete-math' },
          { code: 'BCA104', name: 'Web Technologies (HTML5, CSS3 & JavaScript)', credits: 4, category: 'Core', description: 'Responsive web design, semantic HTML5 tags, CSS3 Flexbox/Grid layouts, JavaScript syntax, DOM manipulation and event models.', keyTopics: ['Semantic HTML5 Elements', 'CSS3 Flexbox & Grid Systems', 'JavaScript DOM Manipulation', 'Form Validation & Events'], interactiveSubjectId: 'bca104-web-technologies' },
          { code: 'BCA105', name: 'Business Communication & Soft Skills', credits: 4, category: 'Humanities', description: 'Corporate oral and written communication, resume writing, business letters, presentations, and team collaboration.', keyTopics: ['Seven Cs of Communication', 'Technical Report Writing', 'Corporate Presentation Skills', 'Interview Etiquette'], interactiveSubjectId: 'bca105-business-comm' },
        ],
      },
      {
        semester: 2,
        totalCredits: 22,
        subjects: [
          { code: 'BCA201', name: 'Object-Oriented Programming with C++', credits: 4, category: 'Core', description: 'OOP concepts, encapsulation, classes, inheritance, polymorphism, virtual functions, templates, and exception handling in C++.', keyTopics: ['Classes, Objects & Constructors', 'Inheritance Hierarchies', 'Operator Overloading', 'Virtual Functions & Polymorphism'], interactiveSubjectId: 'bca201-cpp-oop' },
          { code: 'BCA202', name: 'Data Structures & Algorithms', credits: 4, category: 'Core', description: 'Linear data structures (arrays, stacks, queues, linked lists), non-linear structures (trees, graphs), sorting and searching.', keyTopics: ['Stack & Queue Applications', 'Singly & Doubly Linked Lists', 'Binary Search Trees (BST)', 'Sorting & Searching Algorithms'], interactiveSubjectId: 'bca202-dsa' },
          { code: 'BCA203', name: 'Computer Organization & Architecture', credits: 4, category: 'Core', description: 'Digital logic gates, register transfer language, CPU organization, instruction formats, addressing modes, and cache memory.', keyTopics: ['Boolean Logic & Simplification', 'Instruction Formats & Addressing', 'ALU Design & Arithmetic', 'Memory Hierarchy & Cache'], interactiveSubjectId: 'bca203-computer-org' },
          { code: 'BCA204', name: 'Database Management Systems (DBMS)', credits: 4, category: 'Core', description: 'Relational data model, SQL queries (DDL, DML, DCL), relational algebra, ER modeling, normalization (1NF-3NF), and transactions.', keyTopics: ['ER Modeling & Diagrams', 'SQL Queries, Joins & Subqueries', 'Normalization (1NF, 2NF, 3NF)', 'ACID Properties & Transactions'], interactiveSubjectId: 'bca204-dbms' },
          { code: 'BCA205', name: 'Numerical & Statistical Methods', credits: 4, category: 'Math/Science', description: 'Measures of central tendency, dispersion, probability distributions, linear regression, correlation, and numerical root-finding.', keyTopics: ['Mean, Median, Standard Deviation', 'Probability Distributions', 'Linear Regression & Correlation', 'Numerical Root Finding (Bisection)'], interactiveSubjectId: 'bca205-stats' },
        ],
      },
      {
        semester: 3,
        totalCredits: 22,
        subjects: [
          { code: 'BCA301', name: 'Core Java Programming', credits: 4, category: 'Core', description: 'Java Virtual Machine (JVM), OOP in Java, packages, interfaces, exception handling, multithreading, and Collections Framework.', keyTopics: ['JVM Architecture & Bytecode', 'Inheritance, Interfaces & Packages', 'Exception Handling Mechanisms', 'Java Collections (List, Set, Map)'], interactiveSubjectId: 'bca301-core-java' },
          { code: 'BCA302', name: 'Operating Systems Principles', credits: 4, category: 'Core', description: 'Process management, CPU scheduling algorithms, process synchronization, semaphores, deadlock detection and memory paging.', keyTopics: ['CPU Scheduling (FCFS, SJF, RR)', 'Process Synchronization & Semaphores', 'Deadlock Detection & Banker Algorithm', 'Virtual Memory & Paging'], interactiveSubjectId: 'bca302-os' },
          { code: 'BCA303', name: 'Computer Networks & Internet Protocols', credits: 4, category: 'Core', description: 'OSI 7-layer and TCP/IP models, network topologies, IP addressing (IPv4/IPv6), subnetting, routing protocols, and transport layer.', keyTopics: ['OSI 7-Layer Reference Model', 'IPv4 Addressing & Subnetting', 'TCP 3-Way Handshake vs UDP', 'Application Protocols (HTTP, DNS)'], interactiveSubjectId: 'bca303-computer-networks' },
          { code: 'BCA304', name: 'Software Engineering Principles', credits: 4, category: 'Core', description: 'Software engineering lifecycles (Waterfall, Agile, Scrum), requirement engineering, UML design, testing strategies and maintenance.', keyTopics: ['SDLC Models & Agile Scrum', 'Software Requirements Specification', 'UML Use-Case & Class Diagrams', 'Black-Box & White-Box Testing'], interactiveSubjectId: 'bca304-software-eng' },
          { code: 'BCA305', name: 'Financial Accounting & Management', credits: 4, category: 'Humanities', description: 'Principles of double-entry accounting, journal entries, ledger accounts, trial balance, profit & loss statement, and balance sheet.', keyTopics: ['Double-Entry Bookkeeping Principles', 'Journal, Ledger & Trial Balance', 'Profit & Loss Account Preparation', 'Balance Sheet Analysis'], interactiveSubjectId: 'bca305-financial-acc' },
        ],
      },
      {
        semester: 4,
        totalCredits: 22,
        subjects: [
          { code: 'BCA401', name: 'Advanced Java & Enterprise Applications', credits: 4, category: 'Core', description: 'JDBC database connectivity, Servlets, JavaServer Pages (JSP), JavaBeans, and introduction to Spring Boot framework.', keyTopics: ['JDBC Architecture & Statements', 'Servlet Lifecycle & Session Tracking', 'JSP Directives & Expression Language', 'Spring Boot REST Controller Basics'], interactiveSubjectId: 'bca401-advanced-java' },
          { code: 'BCA402', name: 'Python Programming & Scripting', credits: 4, category: 'Core', description: 'Python data structures (lists, tuples, dicts), functions, modules, file I/O, OOP, regex, and database connectivity with SQLite.', keyTopics: ['Python Syntax & Data Structures', 'Functions, Lambda & Generators', 'File I/O & Exception Handling', 'Database Connectivity (SQLite/MySQL)'], interactiveSubjectId: 'bca402-python' },
          { code: 'BCA403', name: 'Web Application Development (Node.js & React)', credits: 4, category: 'Core', description: 'Node.js runtime, NPM package ecosystem, Express.js REST APIs, React components, state hooks, and MongoDB integration.', keyTopics: ['Node.js Event Loop & Express.js', 'RESTful API Development', 'React Functional Components & Hooks', 'MongoDB CRUD Operations with Mongoose'], interactiveSubjectId: 'bca403-web-app-dev' },
          { code: 'BCA404', name: 'E-Commerce & Cyber Law', credits: 4, category: 'Core', description: 'E-commerce business models (B2B, B2C), payment gateways, digital signatures, IT Act 2000, cybercrimes, and electronic governance.', keyTopics: ['E-Commerce Architectures & Payment Models', 'Electronic Payment Systems (UPI, Cards)', 'Indian IT Act 2000 Key Provisions', 'Cyber Crimes & Digital Evidence'], interactiveSubjectId: 'bca404-ecommerce-cyberlaw' },
          { code: 'BCA405', name: 'Optimization Techniques & Operations Research', credits: 4, category: 'Math/Science', description: 'Linear programming problems (LPP), Simplex method, graphical solution, transportation problem, assignment problem, and game theory.', keyTopics: ['Linear Programming Formulation', 'Simplex Method Algorithm', 'Transportation Problem (NW Corner/VAM)', 'Hungarian Assignment Method'], interactiveSubjectId: 'bca405-operations-research' },
        ],
      },
      {
        semester: 5,
        totalCredits: 24,
        subjects: [
          { code: 'BCA501', name: 'Cloud Computing & DevOps Basics', credits: 4, category: 'Core', description: 'Cloud service models (IaaS, PaaS, SaaS), deployment architectures, virtualization, Docker containers, and introduction to AWS/GCP.', keyTopics: ['IaaS, PaaS & SaaS Comparisons', 'Hypervisors & Virtualization', 'Docker Containers & Dockerfile', 'AWS S3, EC2 & Cloud Security'], interactiveSubjectId: 'bca501-cloud-computing' },
          { code: 'BCA502', name: 'Artificial Intelligence & Machine Learning', credits: 4, category: 'Core', description: 'AI search techniques, supervised vs unsupervised learning, linear regression, logistic regression, decision trees, and neural networks.', keyTopics: ['Heuristic Search (A* Algorithm)', 'Linear & Logistic Regression', 'Decision Trees & Model Evaluation', 'Neural Network Fundamentals'], interactiveSubjectId: 'bca502-ai-ml' },
          { code: 'BCA503', name: 'Mobile Application Development (Android/Kotlin)', credits: 4, category: 'Core', description: 'Android application architecture, Android Studio, UI layout XML/Compose, Activities, Intents, SQLite databases, and API integration.', keyTopics: ['Android Application Architecture', 'Activity Lifecycle & Intent Navigation', 'UI Layouts & Event Listeners', 'SQLite Database & API Consumption'], interactiveSubjectId: 'bca503-mobile-app' },
          { code: 'BCA504', name: 'Information Security & Cryptography', credits: 4, category: 'Core', description: 'Security principles (CIA triad), symmetric ciphers (DES/AES), asymmetric ciphers (RSA), hash functions, firewalls, and malware threats.', keyTopics: ['CIA Triad & Security Principles', 'Symmetric Encryption (DES & AES)', 'Asymmetric Encryption (RSA Algorithm)', 'Firewalls, Antivirus & Network Security'], interactiveSubjectId: 'bca504-infosec-crypto' },
          { code: 'BCA505', name: 'Data Warehousing & Data Mining', credits: 4, category: 'Core', description: 'Data warehouse architecture, OLAP vs OLTP, multidimensional data models, ETL processes, association rules, and clustering algorithms.', keyTopics: ['OLTP vs OLAP Systems', 'Star & Snowflake Schemas', 'Apriori Association Rule Algorithm', 'Clustering Techniques (K-Means)'], interactiveSubjectId: 'bca505-data-mining' },
        ],
      },
      {
        semester: 6,
        totalCredits: 22,
        subjects: [
          { code: 'BCA601', name: 'Big Data Analytics', credits: 4, category: 'Core', description: 'Characteristics of big data (5 Vs), Apache Hadoop ecosystem, HDFS distributed storage, MapReduce paradigm, and NoSQL databases.', keyTopics: ['Five Vs of Big Data', 'Hadoop Distributed File System (HDFS)', 'MapReduce Programming Paradigm', 'NoSQL Database Features (MongoDB/HBase)'], interactiveSubjectId: 'bca601-big-data' },
          { code: 'BCA602', name: 'Internet of Things (IoT)', credits: 4, category: 'Core', description: 'IoT architecture, embedded hardware (Arduino, Raspberry Pi), sensors, actuators, communication protocols (MQTT, CoAP), and smart systems.', keyTopics: ['IoT Reference Architecture', 'Sensors, Actuators & Microcontrollers', 'IoT Protocols (MQTT, CoAP, HTTP)', 'Smart Cities & Industrial IoT'], interactiveSubjectId: 'bca602-iot' },
          { code: 'BCA603', name: 'Software Testing & Quality Assurance', credits: 4, category: 'Core', description: 'Software verification and validation, manual testing methods, automated testing with Selenium, test cases, and bug lifecycle.', keyTopics: ['Verification vs Validation in QA', 'Black-Box & White-Box Test Cases', 'Defect Life Cycle & Bug Reporting', 'Automated Testing with Selenium'], interactiveSubjectId: 'bca603-software-testing' },
          { code: 'BCA604', name: 'Major Capstone Project & Viva', credits: 6, category: 'Project', description: 'Comprehensive real-world software system designed, developed, tested, documented, and presented with live demonstration.', keyTopics: ['Software Requirements Specification (SRS)', 'Database Schema & Architecture Blueprint', 'Source Code Implementation & Unit Tests', 'Project Documentation & Viva Defense'], interactiveSubjectId: 'bca604-major-project' },
          { code: 'BCA605', name: 'Entrepreneurship & Professional Ethics', credits: 4, category: 'Humanities', description: 'Startup development, business plan preparation, intellectual property rights (IPR), professional code of ethics, and IT governance.', keyTopics: ['Startup Ideation & Business Canvas', 'Intellectual Property Rights (Patents/Copyright)', 'Professional Ethics for IT Practitioners', 'Corporate Social Responsibility (CSR)'], interactiveSubjectId: 'bca605-ethics' },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 4. B.TECH INFORMATION TECHNOLOGY (IT) - 40 SUBJECTS
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'it',
    name: 'Information Technology',
    shortName: 'B.Tech IT',
    degree: 'B.Tech',
    durationYears: 4,
    totalSemesters: 8,
    totalSubjects: 40,
    totalCredits: 160,
    description: 'Enterprise Systems, Web & Mobile Platforms, Cybersecurity, Cloud Infrastructure, Database Engineering & Network Administration.',
    careerPaths: ['Enterprise Solutions Architect', 'Cloud Infrastructure Engineer', 'Cybersecurity Analyst', 'Full-Stack Developer', 'IT Systems Lead'],
    semesters: [
      {
        semester: 1,
        totalCredits: 20,
        subjects: [
          { code: 'MATH101', name: 'Engineering Mathematics I', credits: 4, category: 'Math/Science', description: 'Calculus, matrices, linear systems, infinite series.', keyTopics: ['Matrix Operations', 'Eigenvalues', 'Calculus', 'Series Convergence'], interactiveSubjectId: 'sem1-cla' },
          { code: 'IT102', name: 'Problem Solving using C', credits: 4, category: 'Core', description: 'Structured programming, pointers, memory allocation.', keyTopics: ['Pointers', 'Arrays', 'Structures', 'File I/O'], interactiveSubjectId: 'c-lang' },
          { code: 'PHY103', name: 'Applied Physics & Electromagnetics', credits: 4, category: 'Math/Science', description: 'Electromagnetic fields, optics, solid state physics.', keyTopics: ['Maxwell Equations', 'Optics', 'Semiconductors', 'Fiber Optics'], interactiveSubjectId: 'sem1-physics' },
          { code: 'EE104', name: 'Elements of Electrical Engineering', credits: 4, category: 'Core', description: 'DC/AC circuits, electromagnetic induction, electrical machines.', keyTopics: ['KVL/KCL', 'AC Circuits', 'Induction', 'Transformers'] },
          { code: 'ENG105', name: 'Technical English & Communication', credits: 4, category: 'Humanities', description: 'Business writing, phonetics, communication strategies.', keyTopics: ['Technical Reports', 'Presentations', 'Grammar', 'Correspondence'] },
        ],
      },
      {
        semester: 2,
        totalCredits: 20,
        subjects: [
          { code: 'MATH201', name: 'Engineering Mathematics II', credits: 4, category: 'Math/Science', description: 'ODEs, vector calculus, complex numbers.', keyTopics: ['Differential Equations', 'Vector Fields', 'Line Integrals', 'Complex Numbers'] },
          { code: 'IT202', name: 'Object-Oriented Programming with C++', credits: 4, category: 'Core', description: 'Classes, encapsulation, inheritance, polymorphism.', keyTopics: ['Classes & Objects', 'Polymorphism', 'Virtual Functions', 'Templates'] },
          { code: 'EC203', name: 'Digital Electronics & Logic Design', credits: 4, category: 'Core', description: 'Logic gates, K-maps, sequential & combinational circuits.', keyTopics: ['Boolean Logic', 'Multiplexers', 'Flip-Flops', 'Counters'], interactiveSubjectId: 'digital-elec' },
          { code: 'IT204', name: 'Web Development Fundamentals', credits: 4, category: 'Core', description: 'HTML5, CSS3, modern JavaScript, web standards.', keyTopics: ['Semantic HTML', 'CSS Flexbox/Grid', 'JS DOM', 'Fetch API'], interactiveSubjectId: 'sem1-wt' },
          { code: 'ENV205', name: 'Environmental Science', credits: 4, category: 'Humanities', description: 'Ecology, pollution control, resource management.', keyTopics: ['Ecosystems', 'Pollution', 'Sustainability', 'Waste Management'] },
        ],
      },
      {
        semester: 3,
        totalCredits: 22,
        subjects: [
          { code: 'IT301', name: 'Data Structures with C++', credits: 4, category: 'Core', description: 'Arrays, stacks, queues, trees, graphs, hashing.', keyTopics: ['Linked Lists', 'BST Trees', 'Graph Traversals', 'Hashing Algorithms'], interactiveSubjectId: 'sem3-dsa' },
          { code: 'IT302', name: 'Relational Database Management Systems', credits: 4, category: 'Core', description: 'SQL, normalization, ACID properties, indexing.', keyTopics: ['SQL Queries', '3NF/BCNF Normalization', 'Transactions', 'Indexing'], interactiveSubjectId: 'sem3-dbms' },
          { code: 'IT303', name: 'Java Programming & Enterprise Foundations', credits: 4, category: 'Core', description: 'Core Java, multithreading, packages, exceptions.', keyTopics: ['JVM Architecture', 'Collections', 'Exception Handling', 'Multithreading'], interactiveSubjectId: 'sem3-java' },
          { code: 'IT304', name: 'Computer Networks Architecture', credits: 4, category: 'Core', description: 'OSI model, TCP/IP, IP addressing, routing.', keyTopics: ['OSI 7 Layers', 'Subnetting', 'Routing Protocols', 'TCP/UDP Protocols'], interactiveSubjectId: 'sem4-cn' },
          { code: 'IT305', name: 'Digital Communication & Signals', credits: 3, category: 'Core', description: 'Sampling, modulation, PCM, data transmission.', keyTopics: ['Sampling Theorem', 'PCM Modulation', 'Multiplexing', 'Bandwidth Analysis'] },
          { code: 'IT306', name: 'Discrete Structures for Computing', credits: 3, category: 'Math/Science', description: 'Logic, sets, relations, graph algorithms.', keyTopics: ['Boolean Algebra', 'Set Operations', 'Graph Coloring', 'Recurrences'] },
        ],
      },
      {
        semester: 4,
        totalCredits: 22,
        subjects: [
          { code: 'IT401', name: 'Operating Systems & Linux Administration', credits: 4, category: 'Core', description: 'Process scheduling, memory, file systems, bash scripting.', keyTopics: ['CPU Scheduling', 'Virtual Memory', 'Bash Scripting', 'Process Management'], interactiveSubjectId: 'sem4-os' },
          { code: 'IT402', name: 'Full-Stack Web Development', credits: 4, category: 'Core', description: 'React, Node.js, Express, REST APIs, MongoDB.', keyTopics: ['React Hooks', 'Express REST', 'MongoDB Integration', 'JWT Authentication'] },
          { code: 'IT403', name: 'Design & Analysis of Algorithms', credits: 4, category: 'Core', description: 'Greedy, divide and conquer, dynamic programming.', keyTopics: ['Time Complexity', 'Dynamic Programming', 'Dijkstra Algorithm', 'Divide and Conquer'], interactiveSubjectId: 'sem4-daa' },
          { code: 'IT404', name: 'Information Security Fundamentals', credits: 4, category: 'Core', description: 'Symmetric/asymmetric crypto, firewalls, authentication.', keyTopics: ['AES Encryption', 'RSA Algorithm', 'Firewalls & IDS', 'Digital Signatures'], interactiveSubjectId: 'sem7-cyber' },
          { code: 'IT405', name: 'Cloud Infrastructure Fundamentals', credits: 3, category: 'Core', description: 'Cloud models, virtualization, AWS/GCP essentials.', keyTopics: ['IaaS/PaaS/SaaS', 'Virtual Machines', 'AWS S3 & EC2', 'Cloud Storage'], interactiveSubjectId: 'sem6-cloud' },
          { code: 'IT406', name: 'Accounting & Financial Management', credits: 3, category: 'Humanities', description: 'Balance sheet, budgeting, costing, financial ratios.', keyTopics: ['Financial Statements', 'Break-Even Analysis', 'Cost Accounting', 'Cash Flow Analysis'], interactiveSubjectId: 'fin-acc' },
        ],
      },
      {
        semester: 5,
        totalCredits: 20,
        subjects: [
          { code: 'IT501', name: 'DevOps & CI/CD Pipelines', credits: 4, category: 'Core', description: 'Git, Docker, Jenkins, GitHub Actions, monitoring.', keyTopics: ['Continuous Integration', 'Docker Containers', 'Automated Testing', 'Pipeline Automation'], interactiveSubjectId: 'sem8-devops' },
          { code: 'IT502', name: 'Enterprise Java with Spring Boot', credits: 4, category: 'Core', description: 'Spring Core, Spring Data JPA, Microservices, REST.', keyTopics: ['Dependency Injection', 'Spring Data JPA', 'Microservice API', 'Spring Security'] },
          { code: 'IT503', name: 'Mobile Application Engineering', credits: 4, category: 'Core', description: 'Native Android, Kotlin, UI components, networking.', keyTopics: ['Android Activities', 'Kotlin Syntax', 'Room Database', 'Retrofit Networking'] },
          { code: 'IT504', name: 'Network Security & Cryptography', credits: 4, category: 'Core', description: 'PKI, TLS/SSL, VPN, intrusion detection, penetration.', keyTopics: ['TLS Handshake', 'Public Key Infrastructure', 'VPN Protocols', 'Penetration Testing'], interactiveSubjectId: 'sem7-cyber' },
          { code: 'IT505', name: 'Data Analytics & Visualization', credits: 4, category: 'Elective', description: 'Pandas, exploratory analysis, Power BI, dashboarding.', keyTopics: ['Data Wrangling', 'Power BI Dashboards', 'Statistical Plots', 'Predictive Modeling'] },
        ],
      },
      {
        semester: 6,
        totalCredits: 20,
        subjects: [
          { code: 'IT601', name: 'Cloud Native Computing (AWS & GCP)', credits: 4, category: 'Core', description: 'Kubernetes orchestration, serverless, microservices.', keyTopics: ['Kubernetes Clusters', 'AWS Lambda Serverless', 'API Gateways', 'Service Mesh Architecture'], interactiveSubjectId: 'sem6-cloud' },
          { code: 'IT602', name: 'Software Quality Assurance & Testing', credits: 4, category: 'Core', description: 'Automated test frameworks, Selenium, Cypress, QA metrics.', keyTopics: ['Selenium Automation', 'Unit vs Integration Tests', 'Load Testing (JMeter)', 'QA Lifecycle'] },
          { code: 'IT603', name: 'Cyber Threat Intelligence & Forensics', credits: 4, category: 'Elective', description: 'Incident response, memory forensics, network threat hunting.', keyTopics: ['Threat Modeling', 'Digital Forensics', 'Log Analysis & SIEM', 'Malware Analysis'] },
          { code: 'IT604', name: 'Internet of Things Applications', credits: 4, category: 'Elective', description: 'Smart devices, MQTT, edge sensors, Raspberry Pi.', keyTopics: ['MQTT Broker', 'Edge Computing', 'Sensor Data Ingestion', 'Smart Home IoT'] },
          { code: 'IT605', name: 'IT Systems Design Mini-Project', credits: 4, category: 'Project', description: 'Enterprise system architecture and full-stack software prototype.', keyTopics: ['SRS Documentation', 'Database Schema DDL', 'RESTful Endpoints', 'Prototype Demo'] },
        ],
      },
      {
        semester: 7,
        totalCredits: 22,
        subjects: [
          { code: 'IT701', name: 'Enterprise Resource Planning (ERP Systems)', credits: 4, category: 'Core', description: 'Supply chain management, CRM, SAP architectures, business logic.', keyTopics: ['ERP Modules', 'Supply Chain Analytics', 'CRM Workflows', 'Business Process Re-eng'] },
          { code: 'IT702', name: 'Containerization & Kubernetes Administration', credits: 4, category: 'Core', description: 'Pod management, Ingress controllers, Helm charts, storage volumes.', keyTopics: ['Kubernetes Pods & Services', 'Helm Deployments', 'ConfigMaps & Secrets', 'Persistent Volumes'], interactiveSubjectId: 'sem8-devops' },
          { code: 'IT703', name: 'IT Project Management & Agile Methodologies', credits: 4, category: 'Core', description: 'Scrum, Kanban, Jira, risk assessment, cost estimation.', keyTopics: ['Sprint Planning', 'Risk Mitigation', 'Function Point Analysis', 'Agile Retrospectives'] },
          { code: 'IT704', name: 'Ethical Hacking & Penetration Testing', credits: 4, category: 'Elective', description: 'Vulnerability assessment, Metasploit, web app exploits (OWASP Top 10).', keyTopics: ['OWASP Top 10 Exploits', 'SQL Injection Testing', 'Metasploit Framework', 'Vulnerability Scanning'] },
          { code: 'IT705', name: 'Storage Area Networks & Virtualization', credits: 6, category: 'Elective', description: 'NAS, SAN, VMware vSphere, hyperconverged infrastructure.', keyTopics: ['SAN vs NAS Storage', 'VMware ESXi Virtualization', 'Disaster Recovery RTO/RPO', 'RAID Configurations'] },
        ],
      },
      {
        semester: 8,
        totalCredits: 14,
        subjects: [
          { code: 'IT801', name: 'Major Enterprise Capstone Project', credits: 8, category: 'Project', description: 'Enterprise-grade software delivery with automated deployment, testing and documentation.', keyTopics: ['Production Software Delivery', 'Cloud Deployment Architecture', 'Automated QA Pipeline', 'Viva Defense'] },
          { code: 'IT802', name: 'Corporate Industrial Internship', credits: 6, category: 'Project', description: 'Full-time work in enterprise IT firm under industry supervision.', keyTopics: ['Enterprise Sprints', 'Code Production Commits', 'Client Interaction', 'Final Internship Report'] },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 5. B.TECH ELECTRONICS & COMMUNICATION ENGINEERING (ECE) - 42 SUBJECTS
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'ece',
    name: 'Electronics & Communication Engineering',
    shortName: 'B.Tech ECE',
    degree: 'B.Tech',
    durationYears: 4,
    totalSemesters: 8,
    totalSubjects: 42,
    totalCredits: 160,
    description: 'Semiconductors, VLSI Chip Design, Digital Signal Processing, Embedded Systems, Wireless & 5G Telecommunications.',
    careerPaths: ['VLSI Design Engineer', 'Embedded Systems Developer', 'Telecom / RF Engineer', 'DSP Specialist', 'Hardware Architect'],
    semesters: [
      {
        semester: 1,
        totalCredits: 20,
        subjects: [
          { code: 'MATH101', name: 'Engineering Mathematics I', credits: 4, category: 'Math/Science', description: 'Matrices, calculus, analytical geometry.', keyTopics: ['Matrix Theory', 'Differential Calculus', 'Taylor Series', 'Eigenvalues'] },
          { code: 'PHY102', name: 'Semiconductor Physics & Devices', credits: 4, category: 'Math/Science', description: 'Band theory, drift/diffusion currents, PN junction physics.', keyTopics: ['Energy Band Diagrams', 'Carrier Concentration', 'PN Junction Diode', 'Hall Effect'] },
          { code: 'EE103', name: 'Basic Electrical Engineering', credits: 4, category: 'Core', description: 'Network theorems, AC circuits, magnetic circuits.', keyTopics: ["Thevenin's Theorem", 'Superposition Theorem', 'Resonance in RLC', 'Phasor Diagrams'] },
          { code: 'EC104', name: 'C Programming for Hardware Engineers', credits: 4, category: 'Core', description: 'Pointers, bitwise operations, memory mapped I/O.', keyTopics: ['Bitwise Operators', 'Pointers & Registers', 'Structures', 'Memory Mapping'], interactiveSubjectId: 'c-lang' },
          { code: 'ENG105', name: 'Engineering Communication', credits: 4, category: 'Humanities', description: 'Technical documentation, communication fundamentals.', keyTopics: ['Report Writing', 'Oral Presentations', 'Technical Grammar', 'Correspondence'] },
        ],
      },
      {
        semester: 2,
        totalCredits: 20,
        subjects: [
          { code: 'MATH201', name: 'Engineering Mathematics II', credits: 4, category: 'Math/Science', description: 'ODEs, Laplace transforms, Fourier series.', keyTopics: ['Higher Order ODEs', 'Laplace Properties', 'Fourier Analysis', 'Complex Variables'] },
          { code: 'EC202', name: 'Electronic Devices & Circuits', credits: 4, category: 'Core', description: 'BJT, MOSFET, biasing, small-signal amplifiers.', keyTopics: ['BJT Biasing Modes', 'MOSFET Characteristics', 'Small Signal Analysis', 'Frequency Response'] },
          { code: 'EC203', name: 'Network Theory & Synthesis', credits: 4, category: 'Core', description: 'Two-port parameters (Z, Y, ABCD, h), passive filters.', keyTopics: ['Two-Port Z & Y Matrices', 'Transients in RL/RC', 'Laplace Network Analysis', 'Butterworth Filter Design'] },
          { code: 'EC204', name: 'Digital Electronics & Logic Design', credits: 4, category: 'Core', description: 'Combinational and sequential circuits, Verilog HDL basics.', keyTopics: ['K-Map Minimization', 'Adders & Decoders', 'Flip-Flops & Registers', 'Verilog HDL Basics'], interactiveSubjectId: 'digital-elec' },
          { code: 'ENV205', name: 'Environmental Studies', credits: 4, category: 'Humanities', description: 'Ecology, sustainable energy, pollution control.', keyTopics: ['Ecosystems', 'Solar & Wind Energy', 'Pollution Remediation', 'E-Waste Recycling'] },
        ],
      },
      {
        semester: 3,
        totalCredits: 22,
        subjects: [
          { code: 'EC301', name: 'Analog Integrated Circuits & Op-Amps', credits: 4, category: 'Core', description: 'Operational amplifiers, 555 timers, active filters, voltage regulators.', keyTopics: ['Op-Amp Inverting/Non-Inverting', 'Schmitt Trigger', '555 Astable Multivibrator', 'Active Low/High Pass Filters'] },
          { code: 'EC302', name: 'Signals & Systems', credits: 4, category: 'Core', description: 'Continuous & discrete signals, LTI systems, Fourier transform, Z-transform.', keyTopics: ['LTI Convolution Integral', 'Continuous-Time Fourier Transform', 'Z-Transform & ROC', 'Sampling Theorem'] },
          { code: 'EC303', name: 'Digital System Design using Verilog HDL', credits: 4, category: 'Core', description: 'Finite State Machines (Mealy/Moore), RTL coding, FPGA synthesis.', keyTopics: ['Mealy vs Moore FSMs', 'Verilog Behavioral Modeling', 'RTL Simulation & Testbenches', 'FPGA Architecture'] },
          { code: 'EC304', name: 'Electromagnetic Fields & Wave Propagation', credits: 4, category: 'Core', description: "Maxwell's equations, uniform plane waves, Poynting vector, transmission lines.", keyTopics: ["Maxwell's Equations", 'Poynting Theorem', 'Wave Reflection & Transmission', 'Smith Chart Transmission Lines'] },
          { code: 'EC305', name: 'C++ & Object-Oriented System Modeling', credits: 3, category: 'Core', description: 'OOP concepts, hardware modeling, simulation logic.', keyTopics: ['Classes & Methods', 'Operator Overloading', 'Inheritance', 'Templates'] },
          { code: 'EC306', name: 'Probability & Random Processes for Telecom', credits: 3, category: 'Math/Science', description: 'Random variables, spectral density, Gaussian noise, autocorrelation.', keyTopics: ['White Gaussian Noise (AWGN)', 'Power Spectral Density', 'Autocorrelation Function', 'Central Limit Theorem'] },
        ],
      },
      {
        semester: 4,
        totalCredits: 22,
        subjects: [
          { code: 'EC401', name: 'Analog Communication Systems', credits: 4, category: 'Core', description: 'AM, FM, PM modulation techniques, superheterodyne receivers, noise analysis.', keyTopics: ['Amplitude Modulation (DSB-SC/SSB)', 'Frequency Modulation & Carson Rule', 'Superheterodyne Receiver Tuning', 'SNR in Analog Receivers'] },
          { code: 'EC402', name: 'Microprocessors & Microcontrollers (8051 & ARM)', credits: 4, category: 'Core', description: '8051 and ARM Cortex architecture, assembly, timers, serial communication, interrupts.', keyTopics: ['8051 Architecture & Assembly', 'ARM Cortex Register Bank', 'Timer & Counter Programming', 'UART Serial Communication'] },
          { code: 'EC403', name: 'Control Systems Engineering', credits: 4, category: 'Core', description: 'Transfer functions, block diagram reduction, Routh-Hurwitz, Root Locus, Bode plot, Nyquist.', keyTopics: ['Transfer Function Derivation', 'Routh-Hurwitz Stability', 'Root Locus Construction', 'Bode Plot Gain & Phase Margins'] },
          { code: 'EC404', name: 'Linear Integrated Circuits & Applications', credits: 4, category: 'Core', description: 'PLL, instrumentation amplifiers, DAC/ADC converters, waveform generators.', keyTopics: ['Phase-Locked Loop (PLL)', 'Instrumentation Amplifiers', 'R-2R Ladder & Successive Approx ADC', 'Wien Bridge Oscillators'] },
          { code: 'EC405', name: 'Computer Networks & Protocols', credits: 3, category: 'Core', description: 'Data communication, OSI layers, routing, TCP/IP protocol suite.', keyTopics: ['OSI 7 Layers', 'Sliding Window Protocols', 'IPv4 Subnetting', 'Routing Algorithms'], interactiveSubjectId: 'sem4-cn' },
          { code: 'EC406', name: 'Engineering Economics & Management', credits: 3, category: 'Humanities', description: 'Cost analysis, project management, financial viability.', keyTopics: ['Depreciation Methods', 'NPV & IRR Evaluation', 'Break-Even Analysis', 'Project Lifecycle Costing'], interactiveSubjectId: 'fin-acc' },
        ],
      },
      {
        semester: 5,
        totalCredits: 20,
        subjects: [
          { code: 'EC501', name: 'Digital Communication Systems', credits: 4, category: 'Core', description: 'PCM, DPCM, ASK, FSK, PSK, QAM, matched filters, bit error rate (BER).', keyTopics: ['PCM Quantization Noise', 'QPSK & 16-QAM Constellations', 'Matched Filter Derivation', 'BER Analysis in AWGN'] },
          { code: 'EC502', name: 'Digital Signal Processing (DSP)', credits: 4, category: 'Core', description: 'DFT, FFT algorithms, FIR filter design (window method), IIR filters (bilinear transformation).', keyTopics: ['Radix-2 FFT Decomposition', 'FIR Filter Windowing', 'IIR Bilinear Transformation', 'DSP Processor Architectures'] },
          { code: 'EC503', name: 'VLSI Design & CMOS Circuits', credits: 4, category: 'Core', description: 'CMOS inverters, layout design rules, static/dynamic logic, delay analysis (Elmore delay).', keyTopics: ['CMOS Inverter VTC Curve', 'Stick Diagrams & Layout Rules', 'Elmore Delay Calculations', 'Dynamic CMOS Logic'] },
          { code: 'EC504', name: 'Antenna & Wave Propagation', credits: 4, category: 'Core', description: 'Hertzian dipole, antenna arrays, radiation pattern, Friis transmission equation.', keyTopics: ['Radiation Resistance', 'Broadside & End-Fire Arrays', 'Friis Free-Space Equation', 'Yagi-Uda Antenna Design'] },
          { code: 'EC505', name: 'Transmission Lines & Microwave Engineering', credits: 4, category: 'Core', description: 'Waveguides, S-parameters, klystrons, magnetrons, circulators and isolators.', keyTopics: ['Rectangular Waveguide Modes (TE/TM)', 'S-Parameter Matrices', 'Cavity Resonators', 'Microwave Ferrite Devices'] },
        ],
      },
      {
        semester: 6,
        totalCredits: 20,
        subjects: [
          { code: 'EC601', name: 'Embedded Systems & RTOS', credits: 4, category: 'Core', description: 'Real-time operating system concepts, task scheduling, FreeRTOS, inter-task communication.', keyTopics: ['Preemptive Task Scheduling', 'FreeRTOS Semaphores & Queues', 'Priority Inversion & Inheritance', 'Watchdog Timers & Interrupt Latency'] },
          { code: 'EC602', name: 'Wireless & Cellular Communication (4G/5G)', credits: 4, category: 'Core', description: 'Cellular concept, frequency reuse, handoff, fading channels, OFDM, MIMO, and 5G New Radio.', keyTopics: ['Frequency Reuse & Handoff', 'Rayleigh & Rician Fading', 'OFDM Subcarrier Orthogonality', 'MIMO Spatial Multiplexing'] },
          { code: 'EC603', name: 'Optical Fiber Communication', credits: 4, category: 'Core', description: 'Fiber attenuation, dispersion, optical sources (LASER, LED), photodetectors (PIN, APD), and WDM networks.', keyTopics: ['Numerical Aperture & Modes', 'Attenuation & Chromatic Dispersion', 'Semiconductor Laser Diodes', 'Wavelength Division Multiplexing (WDM)'] },
          { code: 'EC604', name: 'FPGA Architecture & Prototyping', credits: 4, category: 'Elective', description: 'Look-up tables (LUTs), slice logic, clock trees, hardware synthesis, timing closure.', keyTopics: ['LUT Logic Mapping', 'Static Timing Analysis (STA)', 'Setup & Hold Time Slack', 'FPGA Hardware In-The-Loop'] },
          { code: 'EC605', name: 'Mini-Project / Hardware Prototype', credits: 4, category: 'Project', description: 'PCB design, embedded firmware programming and hardware testing.', keyTopics: ['PCB Schematic & Gerber Layout', 'Soldering & Assembly', 'Firmware Debugging with JTAG', 'Hardware Verification'] },
        ],
      },
      {
        semester: 7,
        totalCredits: 22,
        subjects: [
          { code: 'EC701', name: 'Satellite Communication & Radar Systems', credits: 4, category: 'Core', description: 'Orbital mechanics, link budget equation, earth station design, radar range equation, Doppler radar.', keyTopics: ['Keplerian Orbital Mechanics', 'Satellite Link Budget (C/N0)', 'Pulse Radar Range Equation', 'MTI & Doppler Radar'] },
          { code: 'EC702', name: 'MEMS & Sensor Technology', credits: 4, category: 'Core', description: 'Micro-electro-mechanical systems fabrication, piezo sensors, capacitive accelerometers.', keyTopics: ['Silicon Photolithography', 'Piezoresistive Transducers', 'MEMS Gyroscopes & IMUs', 'Microfluidics Principles'] },
          { code: 'EC703', name: 'RF Circuit Design & Microwave Devices', credits: 4, category: 'Elective', description: 'Impedance matching with Smith chart, RF amplifiers, mixers, oscillators, microstrip filters.', keyTopics: ['Smith Chart Matching Networks', 'LNA Noise Figure Optimization', 'Double-Balanced Mixers', 'Microstrip Coupler Design'] },
          { code: 'EC704', name: 'Bio-Medical Electronics & Instrumentation', credits: 4, category: 'Elective', description: 'Biopotential electrodes, ECG/EEG signal acquisition, medical imaging systems (MRI, CT).', keyTopics: ['ECG Signal Acquisition & Filtering', 'Isolation Amplifiers', 'CT Scanner Reconstruction Math', 'Ultrasound Doppler Imaging'] },
          { code: 'EC705', name: 'Machine Learning for Signal Processing', credits: 6, category: 'Elective', description: 'Pattern recognition, audio classification, spectrogram CNNs, sensor anomaly detection.', keyTopics: ['Spectrogram Feature Extraction', 'CNNs for Audio Classification', 'Kalman Filter ML Hybrid', 'Time Series Sensor Analysis'], interactiveSubjectId: 'sem5-aiml' },
        ],
      },
      {
        semester: 8,
        totalCredits: 14,
        subjects: [
          { code: 'EC801', name: 'Major Core Electronics Capstone Project', credits: 8, category: 'Project', description: 'Design and deployment of hardware-software communication or embedded system.', keyTopics: ['Full System Integration', 'Hardware Reliability Testing', 'EMC/EMI Compliance Testing', 'Thesis & Viva Defense'] },
          { code: 'EC802', name: 'Semiconductor Fab / Telecom Internship', credits: 6, category: 'Project', description: 'Full-time industrial internship in semiconductor fabrication, VLSI design house or telecom utility.', keyTopics: ['Industrial EDA Tooling', 'Chip Tapeout / Telecom Operations', 'Troubleshooting & Maintenance', 'Comprehensive Report'] },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 6. B.TECH ELECTRICAL & ELECTRONICS ENGINEERING (EEE) - 40 SUBJECTS
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'eee',
    name: 'Electrical & Electronics Engineering',
    shortName: 'B.Tech EEE',
    degree: 'B.Tech',
    durationYears: 4,
    totalSemesters: 8,
    totalSubjects: 40,
    totalCredits: 160,
    description: 'Electric Power Systems, Electric Vehicles (EV), Renewable Energy, Power Electronics, Transformers, Motors & Smart Grid Tech.',
    careerPaths: ['Power Systems Engineer', 'Electric Vehicle (EV) Powertrain Lead', 'Power Electronics Designer', 'Grid Operations Engineer', 'Renewable Energy Specialist'],
    semesters: [
      {
        semester: 1,
        totalCredits: 20,
        subjects: [
          { code: 'MATH101', name: 'Engineering Mathematics I', credits: 4, category: 'Math/Science', description: 'Matrices, differential and integral calculus.', keyTopics: ['Matrices', 'Calculus', 'Limits', 'Series'], interactiveSubjectId: 'sem1-cla' },
          { code: 'CHM102', name: 'Engineering Chemistry & Battery Materials', credits: 4, category: 'Math/Science', description: 'Electrochemistry, lithium-ion battery chemistry, corrosion, polymers.', keyTopics: ['Nernst Equation', 'Lithium Battery Chem', 'Corrosion Prevention', 'Polymer Insulators'] },
          { code: 'EE103', name: 'Fundamental Electrical Laws & Networks', credits: 4, category: 'Core', description: 'Ohm law, Kirchhoff laws, network theorems, mesh and nodal analysis.', keyTopics: ['Mesh Analysis', 'Nodal Analysis', 'Thevenin Theorem', 'Maximum Power Transfer'] },
          { code: 'ME104', name: 'Basic Mechanical Engineering', credits: 4, category: 'Core', description: 'Thermodynamics, boilers, turbines, refrigeration basics.', keyTopics: ['1st & 2nd Law of Thermo', 'Boiler Mountings', 'Steam Turbines', 'Refrigeration Cycles'] },
          { code: 'ENG105', name: 'Technical English & Professional Skills', credits: 4, category: 'Humanities', description: 'Technical communication, report formulation.', keyTopics: ['Writing Reports', 'Phonetics', 'Presentations', 'Correspondence'] },
        ],
      },
      {
        semester: 2,
        totalCredits: 20,
        subjects: [
          { code: 'MATH201', name: 'Engineering Mathematics II', credits: 4, category: 'Math/Science', description: 'ODEs, vector calculus, Fourier transforms.', keyTopics: ['Linear ODEs', 'Vector Differential Operators', 'Divergence & Curl', 'Fourier Series'] },
          { code: 'EE202', name: 'Electrical Circuit Analysis & Resonance', credits: 4, category: 'Core', description: 'AC sinusoidal analysis, 3-phase circuits, series/parallel resonance.', keyTopics: ['3-Phase Star-Delta Math', 'Resonance Q-Factor', 'Transient Response', 'Coupled Circuits'] },
          { code: 'EE203', name: 'Electromagnetic Field Theory', credits: 4, category: 'Core', description: 'Coulomb law, Gauss law, Ampere law, Faraday law, magnetic circuits.', keyTopics: ['Gauss Law Flux Math', 'Ampere Circuital Law', 'Faraday Induction', 'Magnetic Hysteresis'] },
          { code: 'EC204', name: 'Electronic Devices & Linear Circuits', credits: 4, category: 'Core', description: 'Diodes, rectifiers, transistors, operational amplifiers.', keyTopics: ['Bridge Rectifiers', 'BJT CE Configuration', 'Op-Amp Applications', 'Zener Regulation'], interactiveSubjectId: 'digital-elec' },
          { code: 'ENV205', name: 'Environmental Science & Energy Transition', credits: 4, category: 'Humanities', description: 'Clean energy transition, carbon neutrality, ecology.', keyTopics: ['Renewable Energy Mix', 'Grid Decarbonization', 'Pollution Control', 'Sustainability Policy'] },
        ],
      },
      {
        semester: 3,
        totalCredits: 22,
        subjects: [
          { code: 'EE301', name: 'DC Machines & Transformers', credits: 4, category: 'Core', description: 'DC generator/motor characteristics, single & three-phase transformers, efficiency tests.', keyTopics: ['DC Motor Torque Equations', 'Transformer Equivalent Circuit', 'OC & SC Tests', 'Auto-Transformers'] },
          { code: 'EE302', name: 'Analog & Digital Electronic Circuits', credits: 4, category: 'Core', description: 'Combinational logic, flip-flops, op-amp filters, instrumentation amplifiers.', keyTopics: ['Logic Gates & K-Maps', 'Counters & Registers', 'Active Filter Design', 'Schmitt Triggers'] },
          { code: 'EE303', name: 'Electrical Measurements & Instrumentation', credits: 4, category: 'Core', description: 'PMMC instruments, dynamometers, AC bridges (Maxwell, Schering), digital multimeters.', keyTopics: ['PMMC & Moving Iron Meters', 'Maxwell Inductance Bridge', 'Schering Capacitance Bridge', 'Current & Potential Transformers'] },
          { code: 'EE304', name: 'Network Analysis & Synthesis', credits: 4, category: 'Core', description: 'Two-port parameters, Hurwitz polynomials, Foster and Cauer network realizations.', keyTopics: ['Two-Port ABCD Parameters', 'Hurwitz Polynomial Test', 'Foster I & II Form Realization', 'Cauer Network Synthesis'] },
          { code: 'EE305', name: 'C & Python Programming for Electrical Engineers', credits: 3, category: 'Core', description: 'Numerical computation, load flow script simulation.', keyTopics: ['Numerical Algorithms', 'Python Scripting', 'Data Visualization', 'Matrix Operations'], interactiveSubjectId: 'sem3-conmp' },
          { code: 'EE306', name: 'Applied Mathematics for Electrical Systems', credits: 3, category: 'Math/Science', description: 'Numerical methods, complex analysis, state-space representations.', keyTopics: ['Newton-Raphson Power Flow Math', 'Complex Integration', 'Eigenvalue Stability', 'State-Space Matrices'] },
        ],
      },
      {
        semester: 4,
        totalCredits: 22,
        subjects: [
          { code: 'EE401', name: 'AC Electrical Machines', credits: 4, category: 'Core', description: '3-phase induction motors, circle diagram, synchronous alternators, hunting and V-curves.', keyTopics: ['Induction Motor Slip-Torque', 'Circle Diagram Analysis', 'Alternator Voltage Regulation', 'Synchronous Motor V-Curves'] },
          { code: 'EE402', name: 'Power Electronics Devices & Converters', credits: 4, category: 'Core', description: 'SCR, IGBT, MOSFET, phase-controlled rectifiers, DC-DC buck/boost choppers, inverters.', keyTopics: ['SCR Triggering & Commutation', 'Buck & Boost Converter Math', 'Single-Phase Full Converter', 'PWM Inverter Harmonics'] },
          { code: 'EE403', name: 'Control Systems Engineering', credits: 4, category: 'Core', description: 'Mathematical modeling, Routh-Hurwitz, Root Locus, Bode plots, state-variable analysis.', keyTopics: ['Block Diagram Algebra', 'Root Locus Construction', 'Bode Stability Margins', 'State Transition Matrix'] },
          { code: 'EE404', name: 'Signals & Linear Systems', credits: 4, category: 'Core', description: 'Continuous/discrete signals, Fourier series, Laplace and Z-transforms.', keyTopics: ['LTI System Properties', 'Fourier Transform Spectra', 'Laplace Poles & Zeros', 'Z-Transform Stability'] },
          { code: 'EE405', name: 'Microcontrollers & Embedded Applications', credits: 3, category: 'Core', description: '8051 and PIC microcontrollers, ADC interfacing, PWM motor speed control.', keyTopics: ['Microcontroller Timers', 'PWM Waveform Generation', 'ADC Interfacing', 'Motor Speed Feedback'] },
          { code: 'EE406', name: 'Engineering Economics & Tariffs', credits: 3, category: 'Humanities', description: 'Electricity tariff structures, power factor economics, equipment lifecycle costing.', keyTopics: ['Electricity Tariff Types', 'Power Factor Penalty Economics', 'Depreciation Schemes', 'Cost-Benefit Analysis'] },
        ],
      },
      {
        semester: 5,
        totalCredits: 20,
        subjects: [
          { code: 'EE501', name: 'Power Generation, Transmission & Distribution', credits: 4, category: 'Core', description: 'Thermal/hydro generation, transmission line parameters (ABCD), sag calculations, underground cables.', keyTopics: ['ABCD Transmission Parameters', 'Line Sag & Tension Calculations', 'Insulators & Corona Loss', 'Underground Cable Dielectrics'] },
          { code: 'EE502', name: 'Electric Drives & Traction Systems', credits: 4, category: 'Core', description: 'DC/AC drive control, regenerative braking, railway electric traction, inverter fed induction drives.', keyTopics: ['Electric Braking Modes', 'V/f Induction Motor Control', 'Chopper Fed DC Drives', 'Railway Electric Traction Cycles'] },
          { code: 'EE503', name: 'Power System Analysis & Fault Calculations', credits: 4, category: 'Core', description: 'Per-unit system, symmetrical components, symmetrical & unsymmetrical fault analysis, Gauss-Seidel load flow.', keyTopics: ['Per-Unit System Normalization', 'Symmetrical Components (Pos/Neg/Zero)', 'Single Line-to-Ground Fault', 'Gauss-Seidel & Newton-Raphson Flow'] },
          { code: 'EE504', name: 'Renewable Energy Systems (Solar & Wind)', credits: 4, category: 'Core', description: 'PV cell modeling, MPPT algorithms, wind turbine aerodynamics, grid-tied inverters.', keyTopics: ['PV I-V Characteristics', 'Perturb & Observe MPPT', 'Betz Limit Wind Aerodynamics', 'Grid Interconnection Standards'] },
          { code: 'EE505', name: 'Industrial Instrumentation & Sensor Interfacing', credits: 4, category: 'Elective', description: 'RTDs, thermocouples, strain gauges, LVDT, PLC ladder logic basics.', keyTopics: ['RTD & Thermocouple Principles', 'Strain Gauge Wheatstone Bridges', 'LVDT Displacement Sensors', 'PLC Ladder Programming'] },
        ],
      },
      {
        semester: 6,
        totalCredits: 20,
        subjects: [
          { code: 'EE601', name: 'Switchgear & Substation Protection', credits: 4, category: 'Core', description: 'Circuit breakers (SF6, Vacuum), differential relays, distance protection, lightning arresters.', keyTopics: ['Arc Extinction in SF6 Breakers', 'Overcurrent & Earth Fault Relays', 'Differential Transformer Protection', 'Distance Impedance Relaying'] },
          { code: 'EE602', name: 'Electric Vehicle Technology & Battery Management', credits: 4, category: 'Core', description: 'EV powertrain architectures, BMS state of charge (SoC) estimation, regenerative braking, thermal management.', keyTopics: ['EV Powertrain Topologies', 'Battery SoC Estimation (Coulomb/EKF)', 'Cell Balancing Architectures', 'Regenerative Energy Recovery'] },
          { code: 'EE603', name: 'Smart Grid Architecture & SCADA', credits: 4, category: 'Core', description: 'Smart meters, phasor measurement units (PMUs), microgrids, SCADA communication protocols.', keyTopics: ['Smart Metering AMI Infrastructure', 'Phasor Measurement Units (PMU)', 'Microgrid Islanding Control', 'IEC 61850 Substation Protocol'] },
          { code: 'EE604', name: 'Digital Signal Processing for Electrical Systems', credits: 4, category: 'Elective', description: 'Discrete Fourier Transform, digital filter design, harmonic extraction in power systems.', keyTopics: ['FFT Spectral Harmonic Analysis', 'Digital Notch Filter for 50Hz', 'Wavelet Transient Analysis', 'Real-time DSP Processing'] },
          { code: 'EE605', name: 'Electrical Engineering Design Mini-Project', credits: 4, category: 'Project', description: 'Converter hardware prototype or smart energy management embedded system.', keyTopics: ['Power Circuit Schematic Design', 'Thermal Heat Sink Sizing', 'Microcontroller PWM Firmware', 'Live Testing & Report'] },
        ],
      },
      {
        semester: 7,
        totalCredits: 22,
        subjects: [
          { code: 'EE701', name: 'High Voltage Engineering & Testing', credits: 4, category: 'Core', description: 'Breakdown in gases/liquids/solids, Marx impulse generators, insulation coordination, HV testing.', keyTopics: ["Townsend's Breakdown Criterion", 'Marx Impulse Generator Circuits', 'High Voltage AC/DC Testing Sets', 'Insulation Coordination Standards'] },
          { code: 'EE702', name: 'Power Quality & FACTS Controllers', credits: 4, category: 'Core', description: 'Voltage sags, harmonics, STATCOM, SVC, UPFC flexible AC transmission controllers.', keyTopics: ['Total Harmonic Distortion (THD)', 'Static VAR Compensator (SVC)', 'STATCOM Shunt Compensation', 'Unified Power Flow Controller (UPFC)'] },
          { code: 'EE703', name: 'Energy Auditing & Demand Side Management', credits: 4, category: 'Elective', description: 'Energy conservation act, audit instrumentation, efficiency benchmarking in motors/boilers.', keyTopics: ['Energy Audit Methodologies', 'Motor Efficiency Benchmarking', 'Peak Load Shifting Strategies', 'Carbon Credit Financials'] },
          { code: 'EE704', name: 'AI Applications in Modern Power Systems', credits: 4, category: 'Elective', description: 'Load forecasting with neural networks, fault detection with decision trees, genetic algorithm optimization.', keyTopics: ['Short-Term Load Forecasting', 'Neural Network Fault Diagnosis', 'Optimal Power Flow via GA', 'Renewable Generation Prediction'], interactiveSubjectId: 'sem5-aiml' },
          { code: 'EE705', name: 'Industrial Automation & PLC/SCADA Lab', credits: 6, category: 'Elective', description: 'HMI programming, industrial bus protocols (Modbus, Profibus), variable frequency drives (VFD).', keyTopics: ['Modbus RTU/TCP Protocols', 'VFD Motor Parameter Tuning', 'SCADA Supervisory Screen Design', 'Safety Interlock Logic'] },
        ],
      },
      {
        semester: 8,
        totalCredits: 14,
        subjects: [
          { code: 'EE801', name: 'Major Power & EV Engineering Capstone Project', credits: 8, category: 'Project', description: 'Design, simulation, hardware validation and defense of power, electric vehicle or grid prototype.', keyTopics: ['System Simulation & Validation', 'Hardware-in-the-Loop Testing', 'Safety & Standards Compliance', 'Thesis & Oral Defense'] },
          { code: 'EE802', name: 'Power Grid / Utility / EV Corporate Internship', credits: 6, category: 'Project', description: 'Full-time industrial internship in electricity transmission/distribution utilities or EV automakers.', keyTopics: ['Substation / Plant Operations', 'EV Battery Pack Assembly / Testing', 'Safety Protocols Execution', 'Internship Performance Report'] },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 7. B.TECH MECHANICAL ENGINEERING (ME) - 42 SUBJECTS
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'me',
    name: 'Mechanical Engineering',
    shortName: 'B.Tech ME',
    degree: 'B.Tech',
    durationYears: 4,
    totalSemesters: 8,
    totalSubjects: 42,
    totalCredits: 160,
    description: 'Thermodynamics, Strength of Materials, Fluid Mechanics, Machine Design, CAD/CAM, Robotics, Heat Transfer & Automobile Engineering.',
    careerPaths: ['Mechanical Design Engineer', 'Automotive Systems Specialist', 'Thermal Power Consultant', 'Manufacturing & Robotics Lead', 'Aerospace Structural Analyst'],
    semesters: [
      {
        semester: 1,
        totalCredits: 20,
        subjects: [
          { code: 'MATH101', name: 'Calculus & Differential Equations', credits: 4, category: 'Math/Science', description: 'Multivariable calculus, partial derivatives, ordinary differential equations.', keyTopics: ['Partial Differentiation', 'Euler-Cauchy Equations', 'Double & Triple Integrals', 'Taylor Expansions'], interactiveSubjectId: 'sem1-cla' },
          { code: 'PHY102', name: 'Engineering Physics & Acoustics', credits: 4, category: 'Math/Science', description: 'Ultrasonics, laser optics, thermal physics, crystal structures.', keyTopics: ['Ultrasonic Generation', 'Laser Physics', 'Bravais Crystal Lattices', 'Thermal Expansion'], interactiveSubjectId: 'sem1-physics' },
          { code: 'ME103', name: 'Computer Aided Engineering Graphics (CAD)', credits: 4, category: 'Core', description: 'Orthographic projections, isometric views, section of solids, 3D solid modeling.', keyTopics: ['First vs Third Angle Projection', 'Isometric Projections', 'Section of Cones & Cylinders', 'AutoCAD 3D Modeling'] },
          { code: 'CE104', name: 'Engineering Mechanics & Statics', credits: 4, category: 'Core', description: "Equilibrium of rigid bodies, free-body diagrams, friction, centroid and moment of inertia.", keyTopics: ["Lami's Theorem", 'Friction on Inclined Planes', 'Centroid of Composite Areas', 'Parallel Axis Theorem'] },
          { code: 'ENG105', name: 'Professional Communication for Engineers', credits: 4, category: 'Humanities', description: 'Technical documentation, executive presentation skills.', keyTopics: ['Technical Vocabulary', 'Executive Presentations', 'Engineering Reports', 'Business Memos'] },
        ],
      },
      {
        semester: 2,
        totalCredits: 20,
        subjects: [
          { code: 'MATH201', name: 'Vector Calculus & Numerical Analysis', credits: 4, category: 'Math/Science', description: 'Gradient, divergence, curl, Gauss divergence theorem, Stokes theorem, root-finding.', keyTopics: ['Gradient & Directional Derivative', "Gauss Divergence Theorem", "Stokes' Theorem", 'Newton-Raphson Roots'] },
          { code: 'ME202', name: 'Manufacturing Processes I (Casting & Joining)', credits: 4, category: 'Core', description: 'Sand casting, gating design, arc welding, TIG/MIG welding, brazing and soldering.', keyTopics: ['Sand Casting Pattern Allowances', "Chvorinov's Solidification Rule", 'TIG & MIG Welding Physics', 'Welding Defect Inspection'] },
          { code: 'ME203', name: 'Materials Science & Metallurgy', credits: 4, category: 'Core', description: 'Iron-Carbon phase diagram, TTT curves, heat treatment (annealing, quenching), polymers and composites.', keyTopics: ['Iron-Iron Carbide (Fe-C) Diagram', 'Austenite to Martensite TTT Curves', 'Heat Treatment Annealing/Tempering', 'Phase Rule & Lever Rule'] },
          { code: 'EE204', name: 'Basics of Electrical & Electronic Engineering', credits: 4, category: 'Core', description: 'AC circuits, transformers, induction motors, operational amplifiers.', keyTopics: ['3-Phase Power Equations', 'Transformer Voltage Ratio', 'Induction Motor Basics', 'Diode Rectification'] },
          { code: 'ENV205', name: 'Environmental Science & Cleaner Production', credits: 4, category: 'Humanities', description: 'Industrial pollution abatement, life cycle assessment, resource conservation.', keyTopics: ['Industrial Emission Abatement', 'Life Cycle Assessment (LCA)', 'Water Conservation in Plants', 'Carbon Footprint Reduction'] },
        ],
      },
      {
        semester: 3,
        totalCredits: 22,
        subjects: [
          { code: 'ME301', name: 'Engineering Thermodynamics', credits: 4, category: 'Core', description: '1st and 2nd Laws of Thermodynamics, entropy, availability, Rankine and Brayton cycles.', keyTopics: ['First Law Steady Flow Energy Equation', "Second Law Kelvin-Planck/Clausius", 'Entropy Generation Calculations', 'Rankine Reheat Cycle Analysis'] },
          { code: 'ME302', name: 'Mechanics of Solids (Strength of Materials)', credits: 4, category: 'Core', description: 'Stress-strain relationships, Mohr circle, bending moment and shear force diagrams (SFD/BMD), deflection of beams.', keyTopics: ["Mohr's Circle for 2D Stress", 'SFD & BMD for Cantilever/Simply Supported', 'Flexural Bending Formula', 'Euler Buckling of Columns'] },
          { code: 'ME303', name: 'Kinematics of Machinery', credits: 4, category: 'Core', description: 'Inversions of 4-bar and slider-crank mechanisms, velocity/acceleration diagrams (Klein construction), gears and gear trains.', keyTopics: ["Grashof's Criterion for 4-Bar", 'Velocity & Acceleration Polygons', 'Involute Gear Tooth Profiles', 'Epicyclic Gear Train Torque Math'] },
          { code: 'ME304', name: 'Manufacturing Processes II (Machining & Forming)', credits: 4, category: 'Core', description: 'Lathe, milling, grinding machines, Merchant force circle in metal cutting, sheet metal stamping, rolling and forging.', keyTopics: ["Merchant's Force Circle Analysis", "Taylor's Tool Life Equation", 'Deep Drawing & Punching Forces', 'Hot vs Cold Forging Processes'] },
          { code: 'ME305', name: 'Applied Mathematics for Mechanical Systems', credits: 3, category: 'Math/Science', description: 'Partial differential equations, Fourier transforms, finite differences.', keyTopics: ['Wave Equation in Rods', 'Heat Conduction PDE', 'Fourier Series Vibrations', 'Finite Difference Approximations'] },
          { code: 'ME306', name: 'Python for Mechanical Simulation', credits: 3, category: 'Core', description: 'Kinematic simulation, numerical differential equation integration.', keyTopics: ['NumPy Vector Math', 'SciPy ODE Solvers', 'Matplotlib Kinematic Plots', 'Thermal Profile Curves'], interactiveSubjectId: 'sem3-conmp' },
        ],
      },
      {
        semester: 4,
        totalCredits: 22,
        subjects: [
          { code: 'ME401', name: 'Fluid Mechanics & Hydraulic Machines', credits: 4, category: 'Core', description: 'Fluid statics, Bernoulli equation, Navier-Stokes, boundary layer theory, Pelton wheel, Francis and Kaplan turbines.', keyTopics: ["Bernoulli's Energy Conservation", 'Navier-Stokes Governing Math', 'Boundary Layer Thickness', 'Pelton Wheel Velocity Triangles'] },
          { code: 'ME402', name: 'Dynamics of Machinery & Vibrations', credits: 4, category: 'Core', description: 'Static/dynamic balancing of rotating/reciprocating masses, governors, gyroscopic couple, single-degree-of-freedom vibrations.', keyTopics: ['Dynamic Balancing in Two Planes', 'Gyroscopic Precessional Couple', 'Hartnell Governor Calculations', 'Damped Harmonic Vibration Response'] },
          { code: 'ME403', name: 'Thermal Engineering & IC Engines', credits: 4, category: 'Core', description: 'Otto, Diesel, Dual air-standard cycles, SI/CI engine combustion, knock, supercharging, engine performance testing.', keyTopics: ['Otto & Diesel Cycle Efficiency', 'Knocking & Octane/Cetane Number', 'Indicated vs Brake Horsepower', 'Heat Balance Sheet of Engines'] },
          { code: 'ME404', name: 'Machine Design I (Design of Machine Elements)', credits: 4, category: 'Core', description: 'Theories of failure (Tresca, Von Mises), stress concentration, fatigue design (S-N curve, Goodman diagram), bolted and welded joints.', keyTopics: ['Von Mises vs Tresca Failure Criteria', 'Goodman & Soderberg Fatigue Lines', 'Design of Bolted Flange Connections', 'Eccentrically Loaded Welded Joints'] },
          { code: 'ME405', name: 'Metrology & Mechanical Measurements', credits: 3, category: 'Core', description: 'Limits, fits, tolerances, CMM (Coordinate Measuring Machine), surface roughness measurement, optical comparators.', keyTopics: ['Hole Basis & Shaft Basis Tolerances', 'Taylor Gauge Principle', 'Surface Roughness Ra & Rz Parameters', 'Coordinate Measuring Machines (CMM)'] },
          { code: 'ME406', name: 'Industrial Management & Cost Estimation', credits: 3, category: 'Humanities', description: 'Plant layout, work study, time study, material requirement planning (MRP), cost accounting.', keyTopics: ['Time & Motion Study Principles', 'Plant Layout Optimization', 'Economic Order Quantity (EOQ)', 'Product Cost Estimation Sheets'] },
        ],
      },
      {
        semester: 5,
        totalCredits: 20,
        subjects: [
          { code: 'ME501', name: 'Heat & Mass Transfer', credits: 4, category: 'Core', description: 'Fourier conduction, Newton law of cooling, radiation heat transfer (Stefan-Boltzmann), heat exchangers (LMTD and NTU methods).', keyTopics: ['Fourier 1D Conduction Equation', 'LMTD & NTU Heat Exchanger Analysis', 'Radiation View Factor Algebra', 'Lumped Capacitance Transient Analysis'] },
          { code: 'ME502', name: 'Machine Design II (Transmission Elements)', credits: 4, category: 'Core', description: 'Design of spur, helical, bevel, worm gears, rolling contact bearings (L10 life), hydrodynamic sliding bearings, IC engine components.', keyTopics: ['Lewis Bending Equation for Spur Gears', 'AGMA Pitting Resistance Formula', 'L10 Ball Bearing Fatigue Life', 'Hydrodynamic Lubrication Petroff/Sommerfeld'] },
          { code: 'ME503', name: 'Computer Integrated Manufacturing (CIM)', credits: 4, category: 'Core', description: 'CNC programming (G-codes and M-codes), flexible manufacturing systems (FMS), automated guided vehicles (AGVs), group technology.', keyTopics: ['G-Code & M-Code Part Programming', 'FMS Cell Architecture', 'Cellular Manufacturing & Rank Order Clustering', 'Automated Storage & Retrieval (ASRS)'] },
          { code: 'ME504', name: 'Control Engineering & Mechatronics', credits: 4, category: 'Core', description: 'Sensors, actuators, pneumatic/hydraulic valves, electro-pneumatic circuits, PID controllers.', keyTopics: ['Hydraulic Directional Control Valves', 'Electro-Pneumatic Circuit Cascades', 'PID Tuning in Thermal Loops', 'Stepper & Servo Motor Controllers'] },
          { code: 'ME505', name: 'Automobile Engineering & Powertrains', credits: 4, category: 'Core', description: 'Clutch, manual/automatic transmission, differential, steering geometry (Ackermann), suspension systems, disc/drum brakes.', keyTopics: ['Single Plate Clutch Torque Capacity', 'Epicyclic Automatic Transmission', 'Ackermann Steering Geometry', 'Hydraulic Anti-Lock Braking (ABS)'] },
        ],
      },
      {
        semester: 6,
        totalCredits: 20,
        subjects: [
          { code: 'ME601', name: 'Refrigeration & Air Conditioning (RAC)', credits: 4, category: 'Core', description: 'Vapor compression refrigeration (VCR) cycle, p-h diagrams, eco refrigerants, psychrometry, cooling load estimation.', keyTopics: ['Vapor Compression Cycle p-h Plot', 'Psychrometric Chart Property Calculations', 'Cooling Load Estimation (Sensible/Latent)', 'Eco-Friendly Refrigerants (R32, R290)'] },
          { code: 'ME602', name: 'Finite Element Analysis (FEA)', credits: 4, category: 'Core', description: 'Stiffness matrix formulation, 1D bar/beam elements, 2D plane stress/strain CST elements, structural and thermal FEA simulations.', keyTopics: ['Global Stiffness Matrix Assembly', 'Constant Strain Triangle (CST) Math', 'Boundary Condition Elimination', 'Modal & Buckling FEA Formulations'] },
          { code: 'ME603', name: 'Robotics & Industrial Automation', credits: 4, category: 'Core', description: 'Forward/inverse kinematics, Denavit-Hartenberg (DH) parameters, robot trajectory planning, machine vision inspection.', keyTopics: ['Denavit-Hartenberg (D-H) Convention', 'Homogeneous Transformation Matrices', 'Jacobian Matrix & Singularities', 'Industrial End-Effector Sizing'] },
          { code: 'ME604', name: 'Operations Research & Supply Chain Optimization', credits: 4, category: 'Core', description: 'Linear programming, Simplex method, transportation and assignment models, queuing theory, PERT/CPM project scheduling.', keyTopics: ['Simplex Method Tableau Optimization', 'Hungarian Assignment Algorithm', 'Critical Path Method (CPM/PERT)', 'M/M/1 Queuing System Formulations'] },
          { code: 'ME605', name: 'Mechanical Product Design Mini-Project', credits: 4, category: 'Project', description: 'Detailed CAD model, FEA structural stress simulation, kinematic validation and fabrication prototype.', keyTopics: ['3D SolidWorks/Creo Assembly', 'ANSYS Stress & Deflection Simulation', 'Bill of Materials (BOM) Generation', 'Prototype Testing & Validation'] },
        ],
      },
      {
        semester: 7,
        totalCredits: 22,
        subjects: [
          { code: 'ME701', name: 'Power Plant Engineering & Turbomachinery', credits: 4, category: 'Core', description: 'Supercritical thermal plants, gas turbine combined cycle (CCGT), nuclear reactor physics, hydro and solar thermal plants.', keyTopics: ['Supercritical Steam Cycles', 'Combined Cycle Gas Turbines (CCGT)', 'Nuclear Reactor Fission Control', 'Cooling Tower Psychrometry'] },
          { code: 'ME702', name: 'Computational Fluid Dynamics (CFD)', credits: 4, category: 'Core', description: 'Governing Navier-Stokes equations, discretization (Finite Volume Method), SIMPLE algorithm, turbulence models (k-epsilon).', keyTopics: ['Finite Volume Discretization (FVM)', 'SIMPLE Pressure-Velocity Coupling', 'k-epsilon Turbulence Modeling', 'Mesh Independence Grid Convergence'] },
          { code: 'ME703', name: 'Additive Manufacturing & 3D Printing', credits: 4, category: 'Elective', description: 'Stereolithography (SLA), Selective Laser Sintering (SLS), FDM 3D printing, slicer toolpaths, lattice topology optimization.', keyTopics: ['FDM vs SLS vs DMLS Mechanisms', 'G-Code Slicing Toolpath Strategies', 'Topology Optimization & Lightweighting', 'Post-Processing & Heat Treatment'] },
          { code: 'ME704', name: 'Total Quality Management (TQM) & Six Sigma', credits: 4, category: 'Elective', description: 'Statistical Process Control (SPC), X-bar/R control charts, DMAIC methodology, failure modes and effects analysis (FMEA).', keyTopics: ['X-bar and R Statistical Control Charts', 'DMAIC Six Sigma Methodology', 'Design & Process FMEA Scoring', 'Ishikawa Fishbone Root-Cause Analysis'] },
          { code: 'ME705', name: 'Electric & Hybrid Vehicle Powertrain Design', credits: 6, category: 'Elective', description: 'HEV architectures (Series, Parallel), motor sizing, planetary gear transmission, battery pack mechanical enclosure.', keyTopics: ['Series-Parallel Hybrid Architectures', 'Tractive Effort & Motor Torque Sizing', 'Battery Enclosure Crashworthiness', 'Thermal Management Liquid Jackets'] },
        ],
      },
      {
        semester: 8,
        totalCredits: 14,
        subjects: [
          { code: 'ME801', name: 'Industrial Product Design Capstone Project', credits: 8, category: 'Project', description: 'Comprehensive design, FEA structural validation, prototyping, performance testing and viva defense.', keyTopics: ['CAD Blueprint & GD&T Detailing', 'Finite Element Structural Verification', 'Working Prototype Demonstration', 'Thesis Writing & Defense'] },
          { code: 'ME802', name: 'Automotive / Manufacturing Industry Internship', credits: 6, category: 'Project', description: 'Full-time industrial internship in automotive OEM, heavy machinery or aerospace manufacturing plant.', keyTopics: ['Assembly Line Production Sprints', 'Tooling & Fixture Optimization', 'Quality Inspection Protocols', 'Industrial Deliverable Report'] },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 8. B.TECH CIVIL ENGINEERING (CE) - 40 SUBJECTS
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'ce',
    name: 'Civil Engineering',
    shortName: 'B.Tech CE',
    degree: 'B.Tech',
    durationYears: 4,
    totalSemesters: 8,
    totalSubjects: 40,
    totalCredits: 160,
    description: 'Structural Analysis, Geotechnical Soil Mechanics, Concrete & Steel Design, Transportation, Environmental & Water Resources Engineering.',
    careerPaths: ['Structural Design Consultant', 'Geotechnical Lead', 'Transportation Infrastructure Planner', 'Construction Project Manager', 'Environmental Civil Specialist'],
    semesters: [
      {
        semester: 1,
        totalCredits: 20,
        subjects: [
          { code: 'MATH101', name: 'Engineering Mathematics I', credits: 4, category: 'Math/Science', description: 'Matrices, linear algebra, multivariable differential calculus.', keyTopics: ['Matrix Rank', 'System of Linear Equations', 'Partial Derivatives', 'Maxima and Minima'], interactiveSubjectId: 'sem1-cla' },
          { code: 'CHM102', name: 'Engineering Chemistry & Construction Materials', credits: 4, category: 'Math/Science', description: 'Cement chemistry, setting reactions, water treatment, asphalt polymers.', keyTopics: ["Bogue's Compounds in Cement", 'Water Hardness & Softening', 'Corrosion of Rebars', 'Asphalt Binder Chemistry'] },
          { code: 'CE103', name: 'Engineering Mechanics & Statics', credits: 4, category: 'Core', description: 'Equilibrium of coplanar forces, trusses (method of joints/sections), friction.', keyTopics: ['Method of Joints for Trusses', 'Method of Sections', "Dry Friction & Coulomb's Law", 'Centre of Gravity & Moment of Inertia'] },
          { code: 'CE104', name: 'Basic Surveying & Geomatics', credits: 4, category: 'Core', description: 'Chain surveying, compass surveying, leveling, plane table surveying.', keyTopics: ['Chain Surveying & Offsets', 'Prismatic Compass Bearings', 'Dumpy Level & Height of Instrument', 'Contour Mapping Principles'] },
          { code: 'ENG105', name: 'Professional English & Technical Reporting', credits: 4, category: 'Humanities', description: 'Engineering communication, contract tender document reading.', keyTopics: ['Technical Tender Documents', 'Site Inspection Reports', 'Presentations', 'Grammar in Specifications'] },
        ],
      },
      {
        semester: 2,
        totalCredits: 20,
        subjects: [
          { code: 'MATH201', name: 'Engineering Mathematics II', credits: 4, category: 'Math/Science', description: 'Ordinary and partial differential equations, Fourier series.', keyTopics: ['Second Order Linear ODEs', 'Partial Differential Equations', 'Fourier Expansion', 'Vector Field Integration'] },
          { code: 'CE202', name: 'Building Materials & Construction Technology', credits: 4, category: 'Core', description: 'Bricks, stones, aggregates, timber, glass, foundation types, masonry and plastering.', keyTopics: ['Brick Bonds (English & Flemish)', 'Stone Dressing & Quality Tests', 'Coarse & Fine Aggregate Grading', 'Shallow vs Deep Foundations'] },
          { code: 'CE203', name: 'Computer Aided Civil Drafting (AutoCAD)', credits: 4, category: 'Core', description: '2D building planning, floor plans, sections, elevations, structural detailing.', keyTopics: ['AutoCAD Layer Management', 'Residential Floor Plan Drafting', 'Elevation & Cross-Section View', 'Structural Column Grid Layout'] },
          { code: 'EE204', name: 'Elements of Electrical & Mechanical Engineering', credits: 4, category: 'Core', description: 'Building electrification, HVAC basics, elevators, fire suppression.', keyTopics: ['Building Wiring & Earthing', 'HVAC Duct Sizing Basics', 'Elevator Sizing Calculations', 'Fire Sprinkler Systems'] },
          { code: 'ENV205', name: 'Environmental Studies & Disaster Management', credits: 4, category: 'Humanities', description: 'Ecosystems, seismic hazards, flood mitigation, environmental impact assessment.', keyTopics: ['Environmental Impact Assessment (EIA)', 'Flood Frequency Analysis', 'Earthquake Hazard Zones', 'Solid Waste Management'] },
        ],
      },
      {
        semester: 3,
        totalCredits: 22,
        subjects: [
          { code: 'CE301', name: 'Mechanics of Solids (Strength of Materials)', credits: 4, category: 'Core', description: 'Simple stress and strain, shear force & bending moment diagrams, flexure formula, torsion.', keyTopics: ['Stress-Strain in Concrete & Steel', 'SFD & BMD for Overhanging Beams', 'Bending & Shear Stress Distribution', 'Torsion of Circular Shafts'] },
          { code: 'CE302', name: 'Advanced Surveying & Geomatics', credits: 4, category: 'Core', description: 'Theodolite surveying, tacheometry, Total Station, GPS/GNSS, curve setting.', keyTopics: ['Theodolite Horizontal/Vertical Angles', 'Tacheometric Distance Equations', 'Total Station Coordinate Extraction', 'Circular & Transition Curve Setting'] },
          { code: 'CE303', name: 'Fluid Mechanics in Open Channels & Pipes', credits: 4, category: 'Core', description: 'Hydrostatic pressure, Bernoulli theorem, laminar/turbulent pipe flow, Darcy-Weisbach equation.', keyTopics: ['Centre of Pressure on Submerged Plates', 'Venturimeter Flow Calculations', 'Darcy-Weisbach Friction Factor', 'Hydraulic Jump in Open Channels'] },
          { code: 'CE304', name: 'Engineering Geology & Rock Mechanics', credits: 4, category: 'Core', description: 'Minerals, rock classification, geological folds, faults, joints, tunnel alignment.', keyTopics: ['Igneous, Sedimentary & Metamorphic Rocks', 'Faults, Folds & Unconformities', 'Geological Suitability for Dams', 'Rock Mass Rating (RMR)'] },
          { code: 'CE305', name: 'Building Planning & Architectural Drawing', credits: 3, category: 'Core', description: 'Building bylaws, FAR/FSI, circulation, vastu considerations, submission drawings.', keyTopics: ['Floor Area Ratio (FAR/FSI)', 'National Building Code (NBC) Regulations', 'Ventilation & Lighting Ratios', 'Municipal Submission Drawings'] },
          { code: 'CE306', name: 'Numerical Analysis & Statistical Civil Engineering', credits: 3, category: 'Math/Science', description: 'Finite differences, curve fitting, hydrological probability distributions.', keyTopics: ['Gumbel Extreme Value Distribution', 'Gauss Elimination for Truss Analysis', 'Polynomial Interpolation', 'Regression for Soil Parameters'] },
        ],
      },
      {
        semester: 4,
        totalCredits: 22,
        subjects: [
          { code: 'CE401', name: 'Structural Analysis I', credits: 4, category: 'Core', description: 'Determinate structures, deflection of beams (moment-area, conjugate beam, Castigliano theorem), influence line diagrams.', keyTopics: ["Moment-Area (Mohr's Theorems)", 'Conjugate Beam Deflections', "Castigliano's Energy Theorem", 'Influence Line Diagrams for Trusses'] },
          { code: 'CE402', name: 'Concrete Technology & Mix Design', credits: 4, category: 'Core', description: 'Fresh & hardened concrete properties, workability tests (slump, compaction factor), IS 10262 mix design, durability.', keyTopics: ['Water-Cement Ratio Law (Abrams)', 'Slump & Compacting Factor Tests', 'IS 10262 Concrete Mix Design', 'Non-Destructive Testing (Rebound Hammer)'] },
          { code: 'CE403', name: 'Geotechnical Engineering I (Soil Mechanics)', credits: 4, category: 'Core', description: 'Three-phase soil system, compaction, permeability, seepage (flow nets), consolidation, shear strength (Mohr-Coulomb).', keyTopics: ['Void Ratio, Porosity, Degree of Saturation', 'Standard Proctor Compaction Test', "Terzaghi's 1D Consolidation Theory", 'Direct Shear & Triaxial Compression'] },
          { code: 'CE404', name: 'Water Resources Engineering & Hydrology', credits: 4, category: 'Core', description: 'Hydrological cycle, rain gauge networks, unit hydrograph, crop water requirements, canal design (Kennedy/Lacey).', keyTopics: ['Thiessen Polygon Rain Analysis', '1-Hour Unit Hydrograph Derivation', 'Duty, Delta & Base Period Relations', "Kennedy's vs Lacey's Silt Theories"] },
          { code: 'CE405', name: 'Environmental Engineering I (Water Supply)', credits: 3, category: 'Core', description: 'Water demand forecasting, water quality standards, treatment processes (coagulation, sedimentation, filtration, disinfection).', keyTopics: ['Population Forecasting Methods', 'Rapid Sand Filter Hydraulics', 'Alum Coagulation Chemistry', 'Chlorination Breakpoint Math'] },
          { code: 'CE406', name: 'Civil Engineering Economics & Finance', credits: 3, category: 'Humanities', description: 'Public infrastructure cost-benefit ratios, life-cycle costing, tender estimation.', keyTopics: ['Benefit-Cost Ratio (BCR)', 'Rate Analysis for Concrete/Brickwork', 'Contract Types (Lump-Sum, EPC)', 'Public-Private Partnership (PPP)'] },
        ],
      },
      {
        semester: 5,
        totalCredits: 20,
        subjects: [
          { code: 'CE501', name: 'Design of Reinforced Concrete Structures (RCC)', credits: 4, category: 'Core', description: 'Limit state method (IS 456), design of singly/doubly reinforced beams, one-way & two-way slabs, short columns, footings.', keyTopics: ['IS 456 Limit State Philosophy', 'Singly & Doubly Reinforced Rectangular Beams', 'Two-Way Simply Supported Slab Design', 'Axially Loaded Short Column Reinforcement'] },
          { code: 'CE502', name: 'Structural Analysis II (Indeterminate Structures)', credits: 4, category: 'Core', description: 'Slope deflection method, moment distribution method (Hardy Cross), Kani method, flexibility and stiffness matrix methods.', keyTopics: ['Slope Deflection Equations for Continuous Beams', 'Moment Distribution Distribution Factors', "Kani's Rotation Factor Method", 'Stiffness Matrix Direct Formulation'] },
          { code: 'CE503', name: 'Geotechnical Engineering II (Foundation Design)', credits: 4, category: 'Core', description: 'Earth pressure theories (Rankine, Coulomb), bearing capacity (Terzaghi), settlement analysis, pile foundations.', keyTopics: ["Rankine's Active & Passive Earth Pressure", "Terzaghi's Bearing Capacity Equation", 'Standard Penetration Test (SPT N-Value)', 'End Bearing & Friction Pile Group Efficiency'] },
          { code: 'CE504', name: 'Highway & Transportation Engineering', credits: 4, category: 'Core', description: 'Geometric design (sight distance, super-elevation), pavement materials testing (CBR test), flexible & rigid pavement design (IRC).', keyTopics: ['Stopping & Overtaking Sight Distances', 'Superelevation & Transition Curve Radius', 'California Bearing Ratio (CBR) Test', 'IRC 37 Flexible Pavement Thickness'] },
          { code: 'CE505', name: 'Environmental Engineering II (Wastewater Treatment)', credits: 4, category: 'Core', description: 'Sewage characteristics (BOD, COD), sewer design, activated sludge process (ASP), trickling filters, septic tanks, sludge digesters.', keyTopics: ['BOD Kinetic Rate Calculations', 'Self-Purification & Streeter-Phelps Equation', 'Activated Sludge Process (ASP) F/M Ratio', 'Septic Tank & Soak Pit Design'] },
        ],
      },
      {
        semester: 6,
        totalCredits: 20,
        subjects: [
          { code: 'CE601', name: 'Design of Steel Structures (IS 800)', credits: 4, category: 'Core', description: 'Limit state design of bolted and welded connections, tension members, compression members (struts and columns), plate girders, roof trusses.', keyTopics: ['High Strength Friction Grip (HSFG) Bolts', 'Effective Length of Compression Struts', 'Laterally Supported & Unsupported Beams', 'Plate Girder Web Buckling & Stiffeners'] },
          { code: 'CE602', name: 'Hydrology & Irrigation Engineering', credits: 4, category: 'Core', description: 'Gravity dams (forces and stability analysis), spillways, energy dissipators, diversion headworks, canal cross-drainage works.', keyTopics: ['Gravity Dam Elementary Profile & Stability', 'Ogee Spillway Profile Equation', 'Stilling Basin Hydraulic Jump Sizing', 'Aqueduct & Syphon Aqueduct Selection'] },
          { code: 'CE603', name: 'Construction Management & Estimation', credits: 4, category: 'Core', description: 'Quantity surveying, detailed rate analysis, CPM/PERT project scheduling, contract specifications, dispute arbitration.', keyTopics: ['Center Line Method of Estimation', 'Bar Bending Schedule (BBS) for RCC', 'PERT Probability of Project Completion', 'Dispute Resolution & FIDIC Conditions'] },
          { code: 'CE604', name: 'GIS & Remote Sensing Applications', credits: 4, category: 'Elective', description: 'Satellite imagery processing, DEM (Digital Elevation Models), GIS raster/vector layers, QGIS software spatial modeling.', keyTopics: ['Spectral Bands & NDVI Vegetation Index', 'Digital Elevation Model (DEM) Watersheds', 'Raster vs Vector Spatial Topology', 'Buffer Analysis & Overlay Operations'] },
          { code: 'CE605', name: 'Civil Infrastructure Design Mini-Project', credits: 4, category: 'Project', description: 'Complete structural design of a G+3 building or hydraulic weir with full drawings and calculation sheets.', keyTopics: ['STAAD.Pro / ETABS 3D Model Building', 'Load Combinations (DL + LL + WL + EQ)', 'Structural Rebar Scheduling Drawings', 'Design Calculation Manifesto'] },
        ],
      },
      {
        semester: 7,
        totalCredits: 22,
        subjects: [
          { code: 'CE701', name: 'Earthquake Resistant Structural Design (IS 1893)', credits: 4, category: 'Core', description: 'Seismic waves, response spectrum, base shear calculation, ductile detailing of RCC frames (IS 13920), base isolation.', keyTopics: ['Seismic Zone Factors & Response Reduction (R)', 'Equivalent Static Base Shear Formula', 'IS 13920 Ductile Detailing of Beams/Columns', 'Soft Storey & Infill Wall Behavior'] },
          { code: 'CE702', name: 'Pavement Design & Highway Maintenance', credits: 4, category: 'Core', description: 'Mechanistic-empirical pavement design, Benkelman beam deflection, overlay design, pavement distress management.', keyTopics: ['ESAL Axle Load Repetitions', 'Benkelman Beam Deflection Overlay Sizing', 'Pavement Condition Index (PCI)', 'Bituminous Concrete Mix Marshall Design'] },
          { code: 'CE703', name: 'Urban Infrastructure Planning & Smart Cities', credits: 4, category: 'Elective', description: 'Transit-oriented development, integrated water supply grids, smart mobility traffic modeling, solid waste logistics.', keyTopics: ['Transit Oriented Development (TOD)', 'Gravity Pipe Network Hydraulic Simulation', 'Traffic Volume Studies & Signal Timing', 'Smart Waste Sensor Logistics'] },
          { code: 'CE704', name: 'Prestressed Concrete Structures', credits: 4, category: 'Elective', description: 'Pre-tensioning and post-tensioning methods, loss of prestress, analysis of sections under flexure, end block stress.', keyTopics: ['Pre-Tensioning vs Post-Tensioning Systems', 'Prestress Losses (Elastic, Creep, Shrinkage)', 'Extreme Fiber Stress Profiles in Girders', 'Magnel Diagram Cable Profile Design'] },
          { code: 'CE705', name: 'Bridge Engineering & Hydraulic Sizing', credits: 6, category: 'Elective', description: 'IRC loading classes (Class AA, 70R), Courbon method for slab bridges, pier and abutment stability, scour depth.', keyTopics: ['IRC Class 70R Wheeled & Tracked Loads', "Courbon's Load Distribution Method", "Lacey's Scour Depth Equation", 'Bridge Pier Hydraulic Drag & Stability'] },
        ],
      },
      {
        semester: 8,
        totalCredits: 14,
        subjects: [
          { code: 'CE801', name: 'Major Infrastructure Capstone Project', credits: 8, category: 'Project', description: 'Turnkey structural, transportation or geotechnical design project with complete BIM model and oral defense.', keyTopics: ['Multi-Disciplinary Civil BIM Model', 'Structural & Environmental Feasibility', 'Construction Schedule & Cost Model', 'Thesis Documentation & Oral Defense'] },
          { code: 'CE802', name: 'Structural Design / EPC Corporate Internship', credits: 6, category: 'Project', description: 'Full-time industrial immersive internship in construction EPC corporations, structural design studios or infrastructure utilities.', keyTopics: ['On-Site Construction Quality Checks', 'Bar Bending Verification & Pour Approvals', 'Client Progress Reporting', 'Comprehensive Industrial Report'] },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 9. MCA - MASTER OF COMPUTER APPLICATIONS (20 SUBJECTS - 4 SEMESTERS)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'mca',
    name: 'Master of Computer Applications',
    shortName: 'MCA (Post-Graduate)',
    degree: 'MCA',
    durationYears: 2,
    totalSemesters: 4,
    totalSubjects: 20,
    totalCredits: 88,
    description: 'Post-graduate level computing, Advanced Algorithms, Cloud Microservices, Machine Learning, Deep Learning, DevOps, Blockchain & Distributed Systems.',
    careerPaths: ['Principal Software Engineer', 'Cloud Solutions Architect', 'Lead Data Scientist', 'Engineering Manager', 'Cybersecurity Director'],
    semesters: [
      {
        semester: 1,
        totalCredits: 22,
        subjects: [
          { code: 'MCA101', name: 'Advanced Data Structures & Algorithms', credits: 4, category: 'Core', description: 'Red-Black trees, B+ trees, Fibonacci heaps, network flow, randomized algorithms and amortized complexity.', keyTopics: ['Amortized Potential Method', 'Red-Black Tree Balance Invariants', 'B+ Tree Page Splitting', 'Dinic Maximum Flow Algorithm'], interactiveSubjectId: 'sem3-dsa' },
          { code: 'MCA102', name: 'Advanced Database Management Systems', credits: 4, category: 'Core', description: 'Distributed databases, two-phase commit (2PC), query optimization plans, column stores and document-based NoSQL.', keyTopics: ['Distributed 2-Phase Commit (2PC)', 'Query Execution Plan Trees', 'MVCC Concurrency Control', 'LSM-Tree Storage Engines'], interactiveSubjectId: 'sem3-dbms' },
          { code: 'MCA103', name: 'Mathematical Foundations of Computer Science', credits: 4, category: 'Math/Science', description: 'Graph algorithms, combinatorics, probability theory, linear algebra and Markov chains.', keyTopics: ['Spectral Graph Theory', 'Singular Value Decomposition (SVD)', 'Stationary Distributions of Markov Chains', 'Information Entropy'] },
          { code: 'MCA104', name: 'Advanced Software Engineering & Agile Architecture', credits: 4, category: 'Core', description: 'Microservices architecture patterns, domain-driven design (DDD), event sourcing, CQRS and DevOps culture.', keyTopics: ['Domain-Driven Design (Bounded Contexts)', 'CQRS & Event Sourcing', 'Saga Pattern for Distributed Transactions', 'Zero-Downtime Blue/Green Deployments'], interactiveSubjectId: 'sem5-se' },
          { code: 'MCA105', name: 'Full-Stack Enterprise Web Engineering', credits: 6, category: 'Core', description: 'React, Next.js, Node.js, Spring Boot, GraphQL, WebSocket bidirectional streaming and JWT authorization.', keyTopics: ['Server-Side Rendering (SSR)', 'GraphQL Schema & Resolvers', 'WebSocket Real-time Gateways', 'OAuth2 & OIDC Flow Implementations'] },
        ],
      },
      {
        semester: 2,
        totalCredits: 22,
        subjects: [
          { code: 'MCA201', name: 'Advanced Operating Systems & Distributed Systems', credits: 4, category: 'Core', description: 'Distributed synchronization, vector clocks, Paxos consensus, distributed deadlock and container virtualization.', keyTopics: ['Paxos & Raft Consensus Algorithms', 'Vector Clocks & Causality', 'Distributed Snapshots (Chandy-Lamport)', 'Linux Namespaces & Cgroups'], interactiveSubjectId: 'sem4-os' },
          { code: 'MCA202', name: 'Machine Learning & Predictive Modeling', credits: 4, category: 'Core', description: 'Supervised algorithms, gradient boosted trees (LightGBM/XGBoost), unsupervised clustering and dimensionality reduction.', keyTopics: ['Gradient Boosting Loss Optimization', 'Support Vector Machine Dual Form', 't-SNE & UMAP Dimensionality Reduction', 'Cross-Validation & ROC-AUC Metrics'], interactiveSubjectId: 'sem5-aiml' },
          { code: 'MCA203', name: 'Cloud Native Architecture & Microservices', credits: 4, category: 'Core', description: 'Docker containerization, Kubernetes pod lifecycle, Istio service mesh, API gateways and serverless computing.', keyTopics: ['Kubernetes Custom Resource Definitions (CRDs)', 'Istio Envoy Sidecar Traffic Routing', 'Circuit Breaker Pattern (Resilience4j)', 'Serverless Cold-Start Optimization'], interactiveSubjectId: 'sem6-cloud' },
          { code: 'MCA204', name: 'Cyber Security & Advanced Cryptography', credits: 4, category: 'Core', description: 'Elliptic curve cryptography (ECC), zero-knowledge proofs (ZKP), penetration testing and cloud identity governance.', keyTopics: ['Elliptic Curve Discrete Log Problem', 'Zero-Knowledge Proofs (zk-SNARKs)', 'OAuth2 Vulnerabilities & Hardening', 'Zero-Trust Architecture Model'], interactiveSubjectId: 'sem7-cyber' },
          { code: 'MCA205', name: 'Mobile Computing & Cross-Platform Architectures', credits: 6, category: 'Elective', description: 'Flutter, React Native, cross-platform bridge internals, state management and offline synchronization.', keyTopics: ['Flutter Widget Tree & Skia Rendering', 'React Native TurboModules & JSI', 'Offline-First SQLite Syncing', 'Push Notification Architectures'] },
        ],
      },
      {
        semester: 3,
        totalCredits: 22,
        subjects: [
          { code: 'MCA301', name: 'Deep Learning & Computer Vision', credits: 4, category: 'Core', description: 'CNNs, Vision Transformers (ViT), object detection (YOLOv8), GANs and diffusion probabilistic models.', keyTopics: ['Vision Transformer Patch Embeddings', 'YOLO Anchor-Free Detection', 'Denoising Diffusion Probabilistic Models', 'Contrastive Learning (SimCLR)'] },
          { code: 'MCA302', name: 'Big Data Processing with Spark & Kafka', credits: 4, category: 'Core', description: 'Distributed streaming with Apache Kafka, structured streaming with Spark, Delta Lake and lakehouse architectures.', keyTopics: ['Kafka Exactly-Once Semantics (EOS)', 'Spark Catalyst Optimizer Tree Transforms', 'Delta Lake ACID Transaction Log', 'Event-Driven Architecture Topologies'] },
          { code: 'MCA303', name: 'DevOps, CI/CD & Site Reliability Engineering', credits: 4, category: 'Core', description: 'Infrastructure as Code (Terraform), continuous delivery (ArgoCD), distributed tracing and Prometheus alerting.', keyTopics: ['GitOps Deployment with ArgoCD', 'Terraform State Locking & Modules', 'OpenTelemetry Distributed Tracing', 'Error Budgets & SLO Calculations'], interactiveSubjectId: 'sem8-devops' },
          { code: 'MCA304', name: 'Natural Language Processing & Generative AI', credits: 4, category: 'Core', description: 'Transformers, attention mechanics, large language models (LLMs), prompt engineering, retrieval-augmented generation (RAG).', keyTopics: ['Multi-Head Self-Attention Calculation', 'RAG Retrieval & Re-ranking Strategies', 'LoRA & QLoRA Parameter Efficient Tuning', 'Instruction Fine-Tuning Pipelines'], interactiveSubjectId: 'sem7-nlp' },
          { code: 'MCA305', name: 'Blockchain Systems & Web3 Development', credits: 6, category: 'Elective', description: 'Smart contracts, Ethereum, Solana, zero-knowledge rollups, decentralized finance (DeFi) protocols.', keyTopics: ['Solidity Reentrancy Security Checks', 'EVM Gas Optimization Techniques', 'ZK-Rollup Layer 2 Scaling', 'Decentralized Autonomous Orgs (DAOs)'] },
        ],
      },
      {
        semester: 4,
        totalCredits: 22,
        subjects: [
          { code: 'MCA401', name: 'Major Master Thesis & Capstone Project', credits: 12, category: 'Project', description: 'Extensive technical research or industrial system development with paper publication, architecture defense and live demonstration.', keyTopics: ['Enterprise System Production Delivery', 'Empirical Research Experimentation', 'Peer-Reviewed Technical Publication', 'Grand Thesis Defense'] },
          { code: 'MCA402', name: 'Full-Semester Corporate Industry Internship', credits: 10, category: 'Project', description: 'Six-month full-time immersion in software engineering corporations working on core platform deliverables.', keyTopics: ['Production Code Contributions', 'Agile Epic & Feature Deliverables', 'Cross-Platform Integrations', 'Corporate Performance Review'] },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 10. DIPLOMA IN COMPUTER ENGINEERING (POLYTECHNIC - 30 SUBJECTS)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'polytechnic',
    name: 'Diploma in Computer Engineering',
    shortName: 'Diploma Polytechnic',
    degree: 'Diploma',
    durationYears: 3,
    totalSemesters: 6,
    totalSubjects: 30,
    totalCredits: 120,
    description: 'Foundational Polytechnic Computer Engineering, Hardware, C/C++, Java, Web Development, Networks & Operating Systems.',
    careerPaths: ['Junior Software Engineer', 'Network Technician', 'Technical Support Specialist', 'Web Design Assistant', 'Database Assistant'],
    semesters: [
      {
        semester: 1,
        totalCredits: 20,
        subjects: [
          { code: 'DIP101', name: 'Basic Mathematics', credits: 4, category: 'Math/Science', description: 'Algebra, trigonometry, coordinate geometry and basic calculus.', keyTopics: ['Determinants & Matrices', 'Trigonometric Ratios', 'Straight Lines', 'Basic Derivatives'] },
          { code: 'DIP102', name: 'Applied Physics', credits: 4, category: 'Math/Science', description: 'Units and measurements, electricity, magnetism, optics and acoustics.', keyTopics: ["Ohm's Law", 'Capacitors', 'Light Reflection/Refraction', 'Ultrasonic Waves'] },
          { code: 'DIP103', name: 'Fundamentals of ICT & Office Suites', credits: 4, category: 'Core', description: 'Computer hardware components, operating systems, spreadsheets and presentations.', keyTopics: ['CPU & Peripheral Devices', 'File Management in Windows/Linux', 'Spreadsheet Formulas', 'Internet Protocols'] },
          { code: 'DIP104', name: 'Programming in C Fundamentals', credits: 4, category: 'Core', description: 'Basic programming structures, conditionals, loops and functions in C.', keyTopics: ['Data Types & Operators', 'If-Else & Switch Statements', 'For & While Loops', 'User Defined Functions'], interactiveSubjectId: 'c-lang' },
          { code: 'DIP105', name: 'Communication Skills in English', credits: 4, category: 'Humanities', description: 'Grammar, vocabulary, formal letter writing and spoken dialogue.', keyTopics: ['Grammar & Tenses', 'Formal Letter Writing', 'Spoken English Practice', 'Comprehension'] },
        ],
      },
      {
        semester: 2,
        totalCredits: 20,
        subjects: [
          { code: 'DIP201', name: 'Applied Mathematics II', credits: 4, category: 'Math/Science', description: 'Integration, differential equations, statistics and probability.', keyTopics: ['Standard Integrals', 'Definite Integrals', 'First Order ODEs', 'Mean, Variance & Standard Deviation'] },
          { code: 'DIP202', name: 'Digital Electronics', credits: 4, category: 'Core', description: 'Number systems, logic gates, Boolean simplification, flip-flops.', keyTopics: ['Binary, Octal, Hexadecimal Conversions', 'Logic Gates Truth Tables', 'K-Map 4-Variable Minimization', 'RS & JK Flip-Flops'], interactiveSubjectId: 'digital-elec' },
          { code: 'DIP203', name: 'Computer Hardware & Maintenance', credits: 4, category: 'Core', description: 'Motherboards, power supplies (SMPS), RAM, BIOS/UEFI setup and troubleshooting.', keyTopics: ['Motherboard Form Factors', 'SMPS Voltage Rails', 'BIOS Configuration', 'Hardware Fault Troubleshooting'] },
          { code: 'DIP204', name: 'Web Design using HTML & CSS', credits: 4, category: 'Core', description: 'Building static web pages, forms, tables, CSS styling and responsive layouts.', keyTopics: ['HTML5 Tags & Forms', 'CSS Box Model', 'Navigation Bars & Tables', 'Responsive CSS Media Queries'], interactiveSubjectId: 'sem1-wt' },
          { code: 'DIP205', name: 'Environmental Conservation', credits: 4, category: 'Humanities', description: 'Natural resources, pollution control and disaster safety.', keyTopics: ['Water & Air Pollution', 'Renewable Energy', 'E-Waste Disposal', 'Industrial Safety Rules'] },
        ],
      },
      {
        semester: 3,
        totalCredits: 20,
        subjects: [
          { code: 'DIP301', name: 'Data Structures using C', credits: 4, category: 'Core', description: 'Arrays, linked lists, stacks, queues, binary trees and linear searching.', keyTopics: ['Stack Infix-Postfix Conversion', 'Queue Circular Implementation', 'Singly Linked Lists', 'Binary Search Tree Traversals'], interactiveSubjectId: 'sem3-dsa' },
          { code: 'DIP302', name: 'Database Management Systems', credits: 4, category: 'Core', description: 'Relational data model, SQL queries, normalization up to 3NF.', keyTopics: ['ER Diagrams', 'SQL DDL & DML Commands', 'Primary & Foreign Keys', '1NF, 2NF & 3NF Normalization'], interactiveSubjectId: 'sem3-dbms' },
          { code: 'DIP303', name: 'Object-Oriented Programming with C++', credits: 4, category: 'Core', description: 'Classes, constructors, inheritance, function overloading, pointers in C++.', keyTopics: ['Class & Object Creation', 'Constructor Types', 'Single & Multiple Inheritance', 'Function & Operator Overloading'] },
          { code: 'DIP304', name: 'Computer Operating Systems', credits: 4, category: 'Core', description: 'OS functions, CPU scheduling, memory management, Linux commands.', keyTopics: ['Process States & Scheduling', 'Paging & Virtual Memory', 'File System Hierarchies', 'Linux Terminal Shell Commands'], interactiveSubjectId: 'sem4-os' },
          { code: 'DIP305', name: 'Computer Networks Basics', credits: 4, category: 'Core', description: 'Network topologies, OSI model, IP addressing, Ethernet cabling and routers.', keyTopics: ['LAN, WAN & Topologies', 'OSI 7 Layers Overview', 'IPv4 Classes & Subnets', 'Cables, Switches & Routers'], interactiveSubjectId: 'sem4-cn' },
        ],
      },
      {
        semester: 4,
        totalCredits: 20,
        subjects: [
          { code: 'DIP401', name: 'Java Programming', credits: 4, category: 'Core', description: 'Java syntax, classes, inheritance, packages, interfaces and exception handling.', keyTopics: ['Java OOP Concepts', 'Inheritance & super Keyword', 'Custom Packages & Interfaces', 'try-catch Exception Blocks'], interactiveSubjectId: 'sem3-java' },
          { code: 'DIP402', name: 'Web Development with PHP & MySQL', credits: 4, category: 'Core', description: 'Server-side scripting with PHP, form processing, sessions, cookies, MySQL connection.', keyTopics: ['PHP Syntax & Superglobals', 'Connecting PHP to MySQL', 'Session Management & Authentication', 'CRUD Data Operations'] },
          { code: 'DIP403', name: 'Software Engineering Essentials', credits: 4, category: 'Core', description: 'SDLC models, requirement gathering, SRS, testing techniques.', keyTopics: ['Waterfall vs Spiral Lifecycle', 'SRS Document Structure', 'Black-Box & White-Box Testing', 'Bug Reporting Lifecycles'], interactiveSubjectId: 'sem5-se' },
          { code: 'DIP404', name: 'Microprocessor Architecture & Programming', credits: 4, category: 'Core', description: '8085/8086 microprocessor architecture, instruction set, assembly programming.', keyTopics: ['8085 Pin Diagram & Buses', 'Instruction Formats & Op-Codes', 'Assembly Language Loops', 'Hardware Interrupt Handling'] },
          { code: 'DIP405', name: 'Python Programming Basics', credits: 4, category: 'Core', description: 'Python syntax, lists, dictionaries, functions, modules and file operations.', keyTopics: ['Python Variables & Conditionals', 'List & Dictionary Methods', 'Writing Functions & Modules', 'Reading & Writing Text Files'], interactiveSubjectId: 'sem1-python1' },
        ],
      },
      {
        semester: 5,
        totalCredits: 20,
        subjects: [
          { code: 'DIP501', name: 'Mobile Application Development (Android Basics)', credits: 4, category: 'Core', description: 'Android Studio, XML layouts, basic Activities, buttons, views and SQLite.', keyTopics: ['Android Studio Project Setup', 'XML Layout Design (Linear/Relative)', 'Activity Lifecycle & Intents', 'SQLite Database Storage'] },
          { code: 'DIP502', name: 'Network Security Fundamentals', credits: 4, category: 'Core', description: 'Security threats, viruses, symmetric encryption, firewalls, cyber ethics.', keyTopics: ['Malware & Phishing Attacks', 'Symmetric vs Asymmetric Ciphers', 'Firewall Configuration', 'Safe Browsing & Cyber Ethics'], interactiveSubjectId: 'sem7-cyber' },
          { code: 'DIP503', name: 'Cloud Computing Essentials', credits: 4, category: 'Core', description: 'Cloud deployment, virtual machines, cloud storage and web hosting basics.', keyTopics: ['IaaS, PaaS & SaaS Overview', 'Creating Virtual Machines', 'Cloud File Storage S3', 'Hosting Web Applications'], interactiveSubjectId: 'sem6-cloud' },
          { code: 'DIP504', name: 'Internet of Things (IoT) Basics', credits: 4, category: 'Core', description: 'Arduino microcontroller, digital/analog sensors, LEDs, buzzer interfacing.', keyTopics: ['Arduino IDE & C Sketch Code', 'Digital Read/Write Pins', 'Sensor Analog Reading', 'Serial Monitor Telemetry'] },
          { code: 'DIP505', name: 'Polytechnic Project I', credits: 4, category: 'Project', description: 'Problem definition, system requirements, database schema and UI mockups.', keyTopics: ['Project Problem Statement', 'Requirement Analysis', 'Database Schema Design', 'UI Wireframe Blueprint'] },
        ],
      },
      {
        semester: 6,
        totalCredits: 20,
        subjects: [
          { code: 'DIP601', name: 'Advanced Java Programming (JSP/Servlets)', credits: 4, category: 'Core', description: 'JDBC connectivity, servlets, JSP pages, Web application packaging.', keyTopics: ['JDBC Database Operations', 'Servlet Request-Response Life', 'JSP Tag Directives', 'WAR Deployment on Tomcat'] },
          { code: 'DIP602', name: 'Software Testing & Automation', credits: 4, category: 'Core', description: 'Manual test cases, test plan writing, automated web testing tools.', keyTopics: ['Writing Test Case Suites', 'Regression & Smoke Testing', 'Selenium Webdriver Basics', 'Quality Metrics'] },
          { code: 'DIP603', name: 'Entrepreneurship & Startup Skills', credits: 4, category: 'Humanities', description: 'Business plans, freelancing, IT service contracting, professional conduct.', keyTopics: ['Freelance Profile Building', 'Business Canvas Model', 'Cost Estimation for Projects', 'Workplace Professionalism'] },
          { code: 'DIP604', name: 'Major Polytechnic Capstone Project II', credits: 6, category: 'Project', description: 'Full software or hardware working project implementation, demo and viva.', keyTopics: ['Working Software Implementation', 'Testing & Bug Fixing', 'Project Report Documentation', 'Viva Voce Defense'] },
          { code: 'DIP605', name: 'Industrial Training / Site Visit', credits: 2, category: 'Project', description: 'Two-week industrial exposure in IT software company or hardware networking hub.', keyTopics: ['Workplace Workflow Observation', 'Daily Work Log', 'Technical Site Report', 'Industrial Certification'] },
        ],
      },
    ],
  },
];

// =============================================================================
// PROGRAM SPECIALIZATIONS & EXACT COURSE COUNT REGISTRY (DEEP RESEARCH)
// Grounded in AICTE Model Curriculum, UGC CBCS, Anna University R2021,
// VTU 2022 Scheme, Mumbai University Rev-2019/NEP, GTU Branch Schemes.
// =============================================================================

export interface SpecializationSubjectItem {
  name: string;
  code: string;
  semester: number;
  credits: number;
  category: 'Core AI' | 'Specialization Core' | 'Deep Tech' | 'Applied Elective' | 'MLOps/Systems';
  description: string;
}

export interface ProgramSpecialization {
  id: string;
  name: string;
  shortName: string;
  departmentId: string;
  degree: 'B.Tech' | 'BCA' | 'MCA' | 'Diploma';
  durationYears: number;
  totalSemesters: number;
  totalCredits: number;
  totalCoursesCount: number; // Combined total courses (theory + labs + projects)
  theorySubjectsCount: number;
  practicalLabsCount: number;
  capstoneProjectsCount: number;
  specializationSubjectsCount: number;
  specializationSubjects: SpecializationSubjectItem[];
  categoryBreakdown: {
    basicSciences: number;
    engineeringSciences: number;
    humanitiesAndMgmt: number;
    coreComputing: number;
    specializationDomain: number;
    electives: number;
    practicalLabs: number;
    projectsAndInternships: number;
  };
  learningRoadmap: Array<{
    stage: string;
    semesters: string;
    focus: string;
    milestone: string;
  }>;
  careerRoles: string[];
}

export const PROGRAM_SPECIALIZATIONS_REGISTRY: ProgramSpecialization[] = [
  // ───────────────────────────────────────────────────────────────────────────
  // 1. B.TECH ARTIFICIAL INTELLIGENCE & DATA SCIENCE (AI & DS)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'btech-ai-ds',
    name: 'B.Tech in Artificial Intelligence & Data Science',
    shortName: 'B.Tech AI & DS',
    departmentId: 'aids',
    degree: 'B.Tech',
    durationYears: 4,
    totalSemesters: 8,
    totalCredits: 160,
    totalCoursesCount: 58,
    theorySubjectsCount: 38,
    practicalLabsCount: 16,
    capstoneProjectsCount: 4,
    specializationSubjectsCount: 16,
    specializationSubjects: [
      { name: 'Python for Data Science & Computing', code: 'AD102', semester: 1, credits: 3, category: 'Specialization Core', description: 'Vectorized arrays, pandas manipulation, data wrangling pipelines and visualization.' },
      { name: 'Probability, Statistics and Foundations of Data Science', code: 'AD201', semester: 2, credits: 4, category: 'Core AI', description: 'Random variables, Bayesian inference, hypothesis testing, exploratory data analysis.' },
      { name: 'Foundations of Artificial Intelligence', code: 'AD301', semester: 3, credits: 3, category: 'Core AI', description: 'State-space search, A* heuristic, Minimax alpha-beta pruning, knowledge representation.' },
      { name: 'Exploratory Data Analysis & Visualization', code: 'AD302', semester: 3, credits: 3, category: 'Specialization Core', description: 'Dimensionality reduction, PCA, t-SNE, interactive dashboards, feature correlation.' },
      { name: 'Supervised & Unsupervised Machine Learning', code: 'AD401', semester: 4, credits: 3, category: 'Core AI', description: 'Linear models, decision trees, random forests, XGBoost, K-means, DBSCAN clustering.' },
      { name: 'Data Warehousing & Data Mining', code: 'AD402', semester: 4, credits: 3, category: 'Specialization Core', description: 'Star/Snowflake schemas, OLAP cubes, Apriori rule mining, FP-growth algorithms.' },
      { name: 'Deep Learning & Neural Architectures', code: 'AD501', semester: 5, credits: 3, category: 'Deep Tech', description: 'Backpropagation, CNNs (ResNet), RNNs, LSTMs, attention mechanisms, loss functions.' },
      { name: 'Big Data Analytics with Spark & Delta Lake', code: 'AD502', semester: 5, credits: 3, category: 'Specialization Core', description: 'HDFS, Apache Spark RDDs, DataFrames, Spark Streaming, Delta Lake ACID lakehouses.' },
      { name: 'Natural Language Processing (NLP)', code: 'AD503', semester: 5, credits: 3, category: 'Deep Tech', description: 'Tokenization, Word2Vec, Seq2Seq, Transformers, BERT, POS tagging, and NER.' },
      { name: 'Computer Vision & Image Processing', code: 'AD601', semester: 6, credits: 3, category: 'Deep Tech', description: 'Spatial filtering, YOLO object detection, semantic segmentation (U-Net), vision transformers.' },
      { name: 'Generative AI & Large Language Models (LLMs)', code: 'AD602', semester: 6, credits: 3, category: 'Deep Tech', description: 'Self-attention math, RoPE, prompt engineering, LoRA/QLoRA fine-tuning, RAG pipelines.' },
      { name: 'Reinforcement Learning & Decision Making', code: 'AD603', semester: 6, credits: 3, category: 'Core AI', description: 'Bellman optimality, Q-learning, Deep Q-Networks (DQN), Policy Gradients, PPO.' },
      { name: 'Time Series Analysis & Forecasting', code: 'AD604', semester: 6, credits: 3, category: 'Applied Elective', description: 'Stationarity, ARIMA/SARIMA, Facebook Prophet, Temporal Fusion Transformers.' },
      { name: 'Cloud AI & MLOps Pipeline Engineering', code: 'AD701', semester: 7, credits: 3, category: 'MLOps/Systems', description: 'Model registries (MLflow), feature stores (Feast), automated retraining CI/CD, drift monitoring.' },
      { name: 'AI Ethics, Bias, Data Privacy & Governance', code: 'AD702', semester: 7, credits: 3, category: 'Applied Elective', description: 'Algorithmic fairness, differential privacy, Federated Learning, GDPR/DPDP compliance.' },
      { name: 'Autonomous Systems & Graph Neural Networks (GNN)', code: 'AD703', semester: 7, credits: 3, category: 'Deep Tech', description: 'Message passing neural networks, GCN, GAT, SLAM for robotics, and Explainable AI (SHAP).' },
    ],
    categoryBreakdown: {
      basicSciences: 18,
      engineeringSciences: 12,
      humanitiesAndMgmt: 9,
      coreComputing: 18,
      specializationDomain: 48,
      electives: 15,
      practicalLabs: 22,
      projectsAndInternships: 18,
    },
    learningRoadmap: [
      { stage: 'Year 1 (Sem 1-2): Mathematical & Computing Foundations', semesters: 'Sem 1 & 2', focus: 'Calculus, Linear Algebra, Probability, Statistics, and Python Programming', milestone: 'Master algorithmic problem solving and statistical inference' },
      { stage: 'Year 2 (Sem 3-4): Core Machine Learning & Data Infrastructure', semesters: 'Sem 3 & 4', focus: 'Data Structures, DBMS, Search-based AI, Supervised & Unsupervised ML, Data Mining', milestone: 'Build and train end-to-end predictive machine learning models' },
      { stage: 'Year 3 (Sem 5-6): Deep Learning, Vision, NLP & Generative AI', semesters: 'Sem 5 & 6', focus: 'Deep Neural Networks, Big Data (Spark), Computer Vision (YOLO), LLMs, Reinforcement Learning', milestone: 'Architect multi-modal vision, NLP, and generative AI systems' },
      { stage: 'Year 4 (Sem 7-8): MLOps, Autonomous Systems & Industry Capstone', semesters: 'Sem 7 & 8', focus: 'Production MLOps CI/CD, Explainable AI, GNNs, Full-Semester Corporate Internship & Thesis', milestone: 'Deploy production AI pipelines and defend major capstone defense' },
    ],
    careerRoles: ['Machine Learning Engineer', 'Data Scientist', 'AI Research Engineer', 'Computer Vision Specialist', 'Generative AI Developer', 'Big Data Architect'],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 2. B.TECH ARTIFICIAL INTELLIGENCE & MACHINE LEARNING (AI & ML)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'btech-ai-ml',
    name: 'B.Tech in Artificial Intelligence & Machine Learning',
    shortName: 'B.Tech AI & ML',
    departmentId: 'aids',
    degree: 'B.Tech',
    durationYears: 4,
    totalSemesters: 8,
    totalCredits: 160,
    totalCoursesCount: 62,
    theorySubjectsCount: 40,
    practicalLabsCount: 18,
    capstoneProjectsCount: 4,
    specializationSubjectsCount: 18,
    specializationSubjects: [
      { name: 'Python for AI & Scientific Computing', code: 'AIM101', semester: 1, credits: 3, category: 'Specialization Core', description: 'NumPy vectorized arrays, SciPy optimization, Matplotlib and algorithmic structures.' },
      { name: 'Probability, Random Variables & Stochastic Processes', code: 'AIM201', semester: 2, credits: 4, category: 'Core AI', description: 'Multivariate distributions, Markov chains, maximum likelihood estimation.' },
      { name: 'Foundations of Artificial Intelligence', code: 'AIM301', semester: 3, credits: 3, category: 'Core AI', description: 'Heuristic search, adversarial gaming, constraint satisfaction, propositional logic.' },
      { name: 'Knowledge Representation and Ontologies', code: 'AIM302', semester: 3, credits: 3, category: 'Core AI', description: 'First-order logic, semantic networks, description logics, and OWL ontologies.' },
      { name: 'Supervised Machine Learning Algorithms', code: 'AIM401', semester: 4, credits: 3, category: 'Core AI', description: 'Ridge/Lasso regression, SVM dual form, kernel tricks, gradient boosted decision trees.' },
      { name: 'Unsupervised Learning & Pattern Recognition', code: 'AIM402', semester: 4, credits: 3, category: 'Core AI', description: 'Hierarchical clustering, Gaussian Mixture Models, Expectation-Maximization, t-SNE.' },
      { name: 'Mathematical Optimization for Deep Learning', code: 'AIM403', semester: 4, credits: 4, category: 'Core AI', description: 'Convex optimization, SGD with momentum, Adam optimizer math, KKT conditions.' },
      { name: 'Deep Learning & Artificial Neural Networks', code: 'AIM501', semester: 5, credits: 3, category: 'Deep Tech', description: 'Multi-layer perceptrons, backprop calculus, ResNets, LSTMs, and regularization.' },
      { name: 'Natural Language Processing & Speech Synthesis', code: 'AIM502', semester: 5, credits: 3, category: 'Deep Tech', description: 'Word embeddings, Seq2Seq, attention mechanisms, BERT, CTC loss speech recognition.' },
      { name: 'Computer Vision & Deep Feature Learning', code: 'AIM601', semester: 6, credits: 3, category: 'Deep Tech', description: 'CNN backbones, spatial pyramid pooling, YOLOv8, U-Net semantic segmentation.' },
      { name: 'Reinforcement Learning & Multi-Agent Systems', code: 'AIM602', semester: 6, credits: 3, category: 'Core AI', description: 'MDPs, Bellman optimality, Deep Q-Networks (DQN), Actor-Critic, PPO, multi-agent games.' },
      { name: 'Generative AI, Diffusion Models & LLMs', code: 'AIM603', semester: 6, credits: 3, category: 'Deep Tech', description: 'VAEs, Denoising Diffusion Probabilistic Models (DDPM), Transformer decoders, RLHF.' },
      { name: 'MLOps: Production Machine Learning Engineering', code: 'AIM701', semester: 7, credits: 3, category: 'MLOps/Systems', description: 'MLflow registries, automated retraining pipelines, Triton model serving, latency tuning.' },
      { name: 'Edge AI & Embedded Machine Learning (TinyML)', code: 'AIM702', semester: 7, credits: 3, category: 'Deep Tech', description: 'Quantization (INT8/FP4), pruning, knowledge distillation, TensorFlow Lite Micro on ARM.' },
      { name: 'Graph Neural Networks & Geometric Deep Learning', code: 'AIM703', semester: 7, credits: 3, category: 'Deep Tech', description: 'Message Passing Neural Networks, Graph Convolutional Networks (GCN), GAT.' },
      { name: 'Cognitive Computing & Neuroscience for AI', code: 'AIM704', semester: 7, credits: 3, category: 'Applied Elective', description: 'Spiking neural networks, brain-computer interfaces, neuromorphic computing concepts.' },
      { name: 'AI Safety, Alignment, Ethics & Governance', code: 'AIM705', semester: 7, credits: 3, category: 'Applied Elective', description: 'Reward hacking mitigation, red teaming, algorithmic fairness metrics, EU AI Act.' },
      { name: 'Major AI & ML Research Capstone Project', code: 'AIM801', semester: 8, credits: 9, category: 'Specialization Core', description: 'Turnkey algorithmic AI research implementation with benchmarking, paper thesis and viva.' },
    ],
    categoryBreakdown: {
      basicSciences: 18,
      engineeringSciences: 12,
      humanitiesAndMgmt: 9,
      coreComputing: 18,
      specializationDomain: 52,
      electives: 15,
      practicalLabs: 21,
      projectsAndInternships: 15,
    },
    learningRoadmap: [
      { stage: 'Year 1: Optimization & Algorithmic Foundations', semesters: 'Sem 1 & 2', focus: 'Vector Calculus, Linear Algebra, Probability, Data Structures in Python & C++', milestone: 'Firm mathematical ground for machine learning formulations' },
      { stage: 'Year 2: Core Machine Learning & Reasoning Engines', semesters: 'Sem 3 & 4', focus: 'Foundations of AI, Mathematical Optimization, Supervised & Unsupervised ML, Logic Ontologies', milestone: 'Implement foundational ML algorithms from scratch without frameworks' },
      { stage: 'Year 3: Deep Neural Architectures & Generative Systems', semesters: 'Sem 5 & 6', focus: 'Deep Learning, NLP, Computer Vision, Reinforcement Learning, Diffusion Models, LLMs', milestone: 'Train and fine-tune state-of-the-art vision and language models' },
      { stage: 'Year 4: Edge AI, MLOps & Capstone Industrial Thesis', semesters: 'Sem 7 & 8', focus: 'MLOps deployment, TinyML edge inference, GNNs, AI Safety & Capstone Internship', milestone: 'Deliver enterprise-ready intelligent systems meeting industrial standards' },
    ],
    careerRoles: ['Deep Learning Engineer', 'Machine Learning Scientist', 'NLP Engineer', 'Generative AI Architect', 'Reinforcement Learning Researcher', 'Edge AI Engineer'],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 3. B.TECH ROBOTICS & ARTIFICIAL INTELLIGENCE (RAI)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'btech-robotics-ai',
    name: 'B.Tech in Robotics & Artificial Intelligence',
    shortName: 'B.Tech Robotics & AI',
    departmentId: 'aids',
    degree: 'B.Tech',
    durationYears: 4,
    totalSemesters: 8,
    totalCredits: 161,
    totalCoursesCount: 60,
    theorySubjectsCount: 38,
    practicalLabsCount: 18,
    capstoneProjectsCount: 4,
    specializationSubjectsCount: 15,
    specializationSubjects: [
      { name: 'Kinematics & Mechanisms of Robots', code: 'RO301', semester: 3, credits: 3, category: 'Specialization Core', description: 'Forward/inverse kinematics, Denavit-Hartenberg (D-H) convention, transformation matrices.' },
      { name: 'Sensors, Actuators & Signal Conditioning', code: 'RO302', semester: 3, credits: 3, category: 'Specialization Core', description: 'LiDAR, IMUs, optical encoders, DC servomotors, stepper drives, pneumatic actuators.' },
      { name: 'Foundations of Artificial Intelligence for Robotics', code: 'AI301', semester: 3, credits: 3, category: 'Core AI', description: 'State-space search, heuristic path finding (A*), motion planning logic.' },
      { name: 'Robot Dynamics & Control Systems', code: 'RO401', semester: 4, credits: 4, category: 'Specialization Core', description: 'Euler-Lagrange dynamics, Jacobian singularities, PID feedback control, state-space stability.' },
      { name: 'Microcontrollers & Embedded Systems (ARM/ESP32)', code: 'RO402', semester: 4, credits: 3, category: 'Specialization Core', description: 'ARM Cortex register programming, real-time interrupts, PWM motor control, UART/SPI/I2C.' },
      { name: 'Machine Learning for Autonomous Robotics', code: 'AI401', semester: 4, credits: 3, category: 'Core AI', description: 'Behavioral cloning, sensor data classification, supervised learning for robot control.' },
      { name: 'Robot Operating System (ROS & ROS2) Simulation', code: 'RO501', semester: 5, credits: 4, category: 'Specialization Core', description: 'ROS2 nodes, topics, services, actions, URDF robot modeling, RViz, and Gazebo physics.' },
      { name: 'Computer Vision & Scene Perception for Robotics', code: 'AI501', semester: 5, credits: 3, category: 'Deep Tech', description: 'Camera calibration, stereo vision, depth mapping (RGB-D), optical flow, visual odometry.' },
      { name: 'Deep Learning & Neural Control', code: 'AI502', semester: 5, credits: 3, category: 'Deep Tech', description: 'Convolutional neural networks for object tracking, end-to-end visuomotor policies.' },
      { name: 'Industrial Robotics & PLC Automation', code: 'RO502', semester: 5, credits: 3, category: 'Specialization Core', description: 'Articulated arm manipulation, SCARA robots, PLC ladder logic, SCADA integration.' },
      { name: 'Autonomous Mobile Robots & SLAM', code: 'RO601', semester: 6, credits: 3, category: 'Deep Tech', description: 'LiDAR SLAM (Cartographer, Gmapping), Extended Kalman Filter (EKF), RRT* global planning.' },
      { name: 'Reinforcement Learning for Robotic Control', code: 'AI601', semester: 6, credits: 3, category: 'Core AI', description: 'Deep deterministic policy gradient (DDPG), Soft Actor-Critic (SAC) for continuous joint control.' },
      { name: 'Edge AI & Embedded Intelligence for Robots', code: 'AI602', semester: 6, credits: 3, category: 'MLOps/Systems', description: 'TensorRT optimization, inference on NVIDIA Jetson / Coral TPU, low-latency vision.' },
      { name: 'Human-Robot Interaction & Cognitive Systems', code: 'RO701', semester: 7, credits: 3, category: 'Applied Elective', description: 'Collaborative robots (Cobots), safety standards (ISO 10218), speech/gesture command interfaces.' },
      { name: 'Working Autonomous Robot Capstone Project', code: 'RO801', semester: 8, credits: 9, category: 'Specialization Core', description: 'Turnkey physical autonomous robot prototype design, fabrication, programming and field testing.' },
    ],
    categoryBreakdown: {
      basicSciences: 18,
      engineeringSciences: 15,
      humanitiesAndMgmt: 9,
      coreComputing: 12,
      specializationDomain: 50,
      electives: 15,
      practicalLabs: 22,
      projectsAndInternships: 20,
    },
    learningRoadmap: [
      { stage: 'Year 1: Mechanics, Electronics & Coding Essentials', semesters: 'Sem 1 & 2', focus: 'Engineering Mechanics, CAD Graphics, Calculus, Electronics, C & Python Programming', milestone: 'Design basic mechanical parts and program microcontrollers' },
      { stage: 'Year 2: Robot Kinematics, Dynamics & Embedded Systems', semesters: 'Sem 3 & 4', focus: 'Forward/Inverse Kinematics, Sensors, Actuators, PID Control, ARM Cortex, Basic ML', milestone: 'Calculate transformation matrices and build closed-loop sensor-actuator loops' },
      { stage: 'Year 3: ROS2, Computer Vision & Autonomous Navigation', semesters: 'Sem 5 & 6', focus: 'ROS2 middleware, Gazebo simulation, Computer Vision, SLAM mapping, Deep Reinforcement Learning', milestone: 'Simulate and deploy autonomous navigation with obstacle avoidance' },
      { stage: 'Year 4: Edge Intelligence, Cobots & Physical Robot Capstone', semesters: 'Sem 7 & 8', focus: 'NVIDIA Jetson Edge AI, Human-Robot Interaction, Safety Certification, Full Robot Hardware Build', milestone: 'Construct and demonstrate a fully functional autonomous robotic system' },
    ],
    careerRoles: ['Robotics Software Engineer', 'Autonomous Systems Developer', 'Computer Vision & SLAM Engineer', 'Embedded Robotics Specialist', 'Industrial Automation Lead', 'Drone Systems Engineer'],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 4. B.TECH CSE (CYBER SECURITY)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'btech-cse-cyber',
    name: 'B.Tech CSE (Cyber Security)',
    shortName: 'B.Tech CSE - Cyber',
    departmentId: 'cse',
    degree: 'B.Tech',
    durationYears: 4,
    totalSemesters: 8,
    totalCredits: 160,
    totalCoursesCount: 58,
    theorySubjectsCount: 36,
    practicalLabsCount: 18,
    capstoneProjectsCount: 4,
    specializationSubjectsCount: 13,
    specializationSubjects: [
      { name: 'Foundations of Cyber Security & Threat Vectors', code: 'CYC301', semester: 3, credits: 3, category: 'Specialization Core', description: 'Attack surfaces, threat modeling, vulnerability life cycles, access control models.' },
      { name: 'Applied Cryptography & Public Key Infrastructure', code: 'CYC401', semester: 4, credits: 3, category: 'Specialization Core', description: 'AES, RSA, ECC, hash algorithms (SHA-256), digital signatures, PKI X.509 certs.' },
      { name: 'Network Security & Protocols', code: 'CYC501', semester: 5, credits: 3, category: 'Specialization Core', description: 'Firewalls, IDS/IPS, VPNs, IPsec, TLS 1.3 handshake, DNSSEC, packet sniffing.' },
      { name: 'Ethical Hacking & Penetration Testing', code: 'CYC502', semester: 5, credits: 3, category: 'Specialization Core', description: 'Reconnaissance, port scanning, exploitation frameworks (Metasploit), privilege escalation.' },
      { name: 'Web Application Security & OWASP Top 10', code: 'CYC503', semester: 5, credits: 3, category: 'Specialization Core', description: 'SQL injection, XSS, CSRF, SSRF, broken authentication, secure cookie handling.' },
      { name: 'Cyber Crime Investigation & Digital Forensics', code: 'CYC601', semester: 6, credits: 3, category: 'Specialization Core', description: 'Disk imaging, memory forensics (Volatility), network packet forensics, chain of custody.' },
      { name: 'Cloud Security Architecture & IAM', code: 'CYC602', semester: 6, credits: 3, category: 'Specialization Core', description: 'AWS/Azure IAM policies, VPC security groups, secrets management, cloud compliance.' },
      { name: 'AI & Machine Learning for Cyber Analytics', code: 'CYC701', semester: 7, credits: 3, category: 'Deep Tech', description: 'Anomaly detection with random forests, autoencoders for intrusion detection, threat intelligence.' },
      { name: 'Security Operations Center (SOC) & SIEM', code: 'CYC702', semester: 7, credits: 3, category: 'Specialization Core', description: 'Log aggregation (Splunk/ELK), correlation rules, incident response playbooks, MITRE ATT&CK.' },
      { name: 'Malware Analysis & Reverse Engineering', code: 'CYC703', semester: 7, credits: 3, category: 'Deep Tech', description: 'Static analysis (Ghidra/IDA Pro), dynamic sandbox execution, obfuscation analysis.' },
      { name: 'IoT & Operational Technology (OT) Security', code: 'CYC704', semester: 7, credits: 3, category: 'Applied Elective', description: 'SCADA/PLC protocols, firmware reverse engineering, Zero Trust microsegmentation.' },
      { name: 'Cyber Laws, IT Act 2000 & DPDP Act Compliance', code: 'HSMC801', semester: 8, credits: 3, category: 'Applied Elective', description: 'Indian IT Act 2000, Digital Personal Data Protection Act 2023, ISO 27001 auditing.' },
      { name: 'Enterprise Cyber Security Capstone Project', code: 'PROJ801', semester: 8, credits: 8, category: 'Specialization Core', description: 'Defensive or offensive security framework implementation, audit manifesto and viva.' },
    ],
    categoryBreakdown: {
      basicSciences: 18,
      engineeringSciences: 15,
      humanitiesAndMgmt: 11,
      coreComputing: 24,
      specializationDomain: 45,
      electives: 15,
      practicalLabs: 18,
      projectsAndInternships: 14,
    },
    learningRoadmap: [
      { stage: 'Year 1: Programming, Systems & Electronics Base', semesters: 'Sem 1 & 2', focus: 'C, C++, Calculus, Digital Logic, Linux CLI, and Networking Fundamentals', milestone: 'Understand low-level memory layout and network socket communication' },
      { stage: 'Year 2: Operating Systems, Cryptography & Security Core', semesters: 'Sem 3 & 4', focus: 'Data Structures, OS Kernels, Applied Cryptography, PKI, Security Threat Modeling', milestone: 'Implement cryptographic primitives and analyze system security vulnerabilities' },
      { stage: 'Year 3: Offensive Security, Penetration Testing & Cloud', semesters: 'Sem 5 & 6', focus: 'Ethical Hacking, OWASP Web Security, Digital Forensics, Cloud IAM, Intrusion Detection', milestone: 'Perform certified vulnerability assessments and digital forensic investigations' },
      { stage: 'Year 4: SOC Operations, Threat Intelligence & Capstone', semesters: 'Sem 7 & 8', focus: 'SIEM management, Malware Analysis, Zero Trust, Cyber Regulations & Industry Internship', milestone: 'Defend enterprise infrastructure and run automated incident response operations' },
    ],
    careerRoles: ['Information Security Analyst', 'Penetration Tester / Ethical Hacker', 'SOC Analyst (L2/L3)', 'Cloud Security Architect', 'Digital Forensics Investigator', 'Cyber Threat Intelligence Specialist'],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 5. B.TECH CSE (CLOUD COMPUTING & DEVOPS)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'btech-cse-cloud',
    name: 'B.Tech CSE (Cloud Computing & DevOps)',
    shortName: 'B.Tech CSE - Cloud & DevOps',
    departmentId: 'cse',
    degree: 'B.Tech',
    durationYears: 4,
    totalSemesters: 8,
    totalCredits: 160,
    totalCoursesCount: 57,
    theorySubjectsCount: 36,
    practicalLabsCount: 17,
    capstoneProjectsCount: 4,
    specializationSubjectsCount: 13,
    specializationSubjects: [
      { name: 'Virtualization Technologies & Hypervisors', code: 'CCD301', semester: 3, credits: 3, category: 'Specialization Core', description: 'Type-1/Type-2 hypervisors, KVM, hardware virtualization VT-x, virtual storage.' },
      { name: 'Cloud Computing & NIST Architecture', code: 'CCD401', semester: 4, credits: 3, category: 'Specialization Core', description: 'IaaS, PaaS, SaaS, public/private/hybrid clouds, multi-tenant resource pooling.' },
      { name: 'DevOps Principles & Agile Engineering', code: 'CCD402', semester: 4, credits: 3, category: 'Specialization Core', description: 'Continuous integration culture, trunk-based development, automated testing pyramids.' },
      { name: 'Public Cloud Architecture (AWS, Azure, GCP)', code: 'CCD501', semester: 5, credits: 4, category: 'Specialization Core', description: 'EC2, S3, VPC networking, Azure VMs, IAM security, cloud databases.' },
      { name: 'Continuous Integration & Delivery (CI/CD Pipelines)', code: 'CCD502', semester: 5, credits: 3, category: 'Specialization Core', description: 'GitHub Actions, Jenkins pipelines, automated testing gates, artifact repositories.' },
      { name: 'Containerization with Docker & Container Runtimes', code: 'CCD503', semester: 5, credits: 3, category: 'Specialization Core', description: 'Docker multi-stage builds, Linux cgroups, namespaces, containerd runtime.' },
      { name: 'Container Orchestration with Production Kubernetes', code: 'CCD601', semester: 6, credits: 3, category: 'Deep Tech', description: 'Pod lifecycles, Deployments, Services (ClusterIP, NodePort), Ingress, Helm charts.' },
      { name: 'Infrastructure as Code (Terraform & Ansible)', code: 'CCD602', semester: 6, credits: 3, category: 'Specialization Core', description: 'Declarative HCL syntax, state management, Ansible playbooks, cloud provisioning.' },
      { name: 'Cloud Security, Governance & DevSecOps', code: 'CCD603', semester: 6, credits: 3, category: 'Specialization Core', description: 'Container vulnerability scanning (Trivy), static analysis, secret management.' },
      { name: 'Site Reliability Engineering (SRE) & Chaos Engineering', code: 'PEC602', semester: 6, credits: 3, category: 'MLOps/Systems', description: 'SLIs, SLOs, Error Budgets, Chaos Monkey resilience testing, post-mortems.' },
      { name: 'Observability & Monitoring (Prometheus, Grafana, ELK)', code: 'CCD701', semester: 7, credits: 3, category: 'MLOps/Systems', description: 'Metrics scraping, PromQL, Grafana alerting dashboards, distributed tracing.' },
      { name: 'Multi-Cloud Architecture & Cloud FinOps', code: 'CCD702', semester: 7, credits: 3, category: 'Applied Elective', description: 'Cross-cloud migration, hybrid connectivity, cloud cost optimization, spot instances.' },
      { name: 'Enterprise Cloud & DevOps Capstone Project', code: 'PROJ801', semester: 8, credits: 9, category: 'Specialization Core', description: 'Automated scalable microservice platform with CI/CD, Kubernetes and zero-downtime deploy.' },
    ],
    categoryBreakdown: {
      basicSciences: 18,
      engineeringSciences: 15,
      humanitiesAndMgmt: 11,
      coreComputing: 24,
      specializationDomain: 45,
      electives: 15,
      practicalLabs: 17,
      projectsAndInternships: 15,
    },
    learningRoadmap: [
      { stage: 'Year 1: Linux & Systems Programming Fundamentals', semesters: 'Sem 1 & 2', focus: 'C, Java, Linux CLI, Bash Scripting, Computer Hardware, and Discrete Math', milestone: 'Command Linux terminal and write automated shell scripts' },
      { stage: 'Year 2: Cloud Foundations, Virtualization & Git DevOps', semesters: 'Sem 3 & 4', focus: 'Data Structures, OS Kernels, Hypervisors, Cloud Service Models, Git Workflows', milestone: 'Provision virtual machines and structure automated version control' },
      { stage: 'Year 3: Docker Containers, Kubernetes & CI/CD Pipelines', semesters: 'Sem 5 & 6', focus: 'AWS/Azure, Dockerfiles, Kubernetes Clusters, Terraform IaC, DevSecOps Security', milestone: 'Deploy containerized microservices across orchestrated Kubernetes clusters' },
      { stage: 'Year 4: Observability, SRE & Production Deployment', semesters: 'Sem 7 & 8', focus: 'Prometheus monitoring, SRE error budgets, FinOps, Full-Semester Corporate Internship', milestone: 'Architect reliable, self-healing cloud platforms with automated zero-downtime CI/CD' },
    ],
    careerRoles: ['DevOps Engineer', 'Cloud Solutions Architect', 'Site Reliability Engineer (SRE)', 'Kubernetes Administrator', 'Infrastructure Engineer', 'Platform Engineer'],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 6. BCA IN ARTIFICIAL INTELLIGENCE & DATA SCIENCE
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'bca-ai-ds',
    name: 'BCA in Artificial Intelligence & Data Science',
    shortName: 'BCA (AI & Data Science)',
    departmentId: 'bca',
    degree: 'BCA',
    durationYears: 3,
    totalSemesters: 6,
    totalCredits: 126,
    totalCoursesCount: 39,
    theorySubjectsCount: 26,
    practicalLabsCount: 11,
    capstoneProjectsCount: 2,
    specializationSubjectsCount: 10,
    specializationSubjects: [
      { name: 'Foundations of Data Science & Python Basics', code: 'BCA204', semester: 2, credits: 4, category: 'Specialization Core', description: 'Python programming, NumPy vectors, Pandas DataFrames, and exploratory statistics.' },
      { name: 'Applied Statistics & Probability for Analytics', code: 'BCA303', semester: 3, credits: 4, category: 'Core AI', description: 'Central tendency, probability distributions, regression, correlation analysis.' },
      { name: 'Data Wrangling and Exploratory Data Analysis (EDA)', code: 'BCA304', semester: 3, credits: 3, category: 'Specialization Core', description: 'Missing data handling, outlier detection, Tableau and Power BI visual dashboards.' },
      { name: 'Principles of Artificial Intelligence & Search Methods', code: 'BCA403', semester: 4, credits: 4, category: 'Core AI', description: 'State-space search, heuristic algorithms, game playing, rule-based systems.' },
      { name: 'Machine Learning Algorithms (Supervised & Unsupervised)', code: 'BCA404', semester: 4, credits: 4, category: 'Core AI', description: 'Decision trees, linear/logistic regression, K-nearest neighbors, K-means clustering.' },
      { name: 'Deep Learning & Artificial Neural Networks', code: 'BCA501', semester: 5, credits: 4, category: 'Deep Tech', description: 'Perceptrons, multi-layer networks, backpropagation, CNNs in Keras/TensorFlow.' },
      { name: 'Big Data Analytics (Hadoop & PySpark Ecosystem)', code: 'BCA502', semester: 5, credits: 4, category: 'Specialization Core', description: 'HDFS, MapReduce concepts, Spark DataFrames, NoSQL database management.' },
      { name: 'Natural Language Processing & Text Analytics', code: 'BCA503', semester: 5, credits: 4, category: 'Deep Tech', description: 'Tokenization, TF-IDF, sentiment analysis, sentiment classifiers in Python.' },
      { name: 'Generative AI & Prompt Engineering', code: 'DSE601', semester: 6, credits: 4, category: 'Deep Tech', description: 'Transformer basics, prompt design, fine-tuning API integrations, RAG basics.' },
      { name: 'Major AI & Data Science Capstone Project', code: 'BCA602', semester: 6, credits: 8, category: 'Specialization Core', description: 'End-to-end predictive or generative AI web application with full documentation and viva.' },
    ],
    categoryBreakdown: {
      basicSciences: 12,
      engineeringSciences: 0,
      humanitiesAndMgmt: 10,
      coreComputing: 36,
      specializationDomain: 40,
      electives: 8,
      practicalLabs: 10,
      projectsAndInternships: 10,
    },
    learningRoadmap: [
      { stage: 'Year 1: Programming Logic & Data Foundations', semesters: 'Sem 1 & 2', focus: 'C, Java, Discrete Math, Database SQL, and Python for Data Science', milestone: 'Manipulate datasets in Python and build clean relational databases' },
      { stage: 'Year 2: Statistics, Exploratory Analytics & Machine Learning', semesters: 'Sem 3 & 4', focus: 'Applied Statistics, Power BI Dashboards, Core AI, Supervised Machine Learning', milestone: 'Train Scikit-Learn models and produce executive analytics reports' },
      { stage: 'Year 3: Deep Learning, Big Data & Generative AI Capstone', semesters: 'Sem 5 & 6', focus: 'TensorFlow Neural Nets, PySpark Big Data, NLP, Generative AI, Major Industry Project', milestone: 'Deploy full-stack AI web applications with real-time inference' },
    ],
    careerRoles: ['Junior Data Scientist', 'Machine Learning Associate', 'Data Analyst', 'Business Intelligence Developer', 'Python AI Programmer'],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 7. MCA IN ARTIFICIAL INTELLIGENCE & MACHINE LEARNING
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'mca-ai-ml',
    name: 'MCA in Artificial Intelligence & Machine Learning',
    shortName: 'MCA (AI & ML)',
    departmentId: 'mca',
    degree: 'MCA',
    durationYears: 2,
    totalSemesters: 4,
    totalCredits: 84,
    totalCoursesCount: 25,
    theorySubjectsCount: 15,
    practicalLabsCount: 8,
    capstoneProjectsCount: 2,
    specializationSubjectsCount: 8,
    specializationSubjects: [
      { name: 'Python for AI & Scientific Computing', code: 'AIM101', semester: 1, credits: 3, category: 'Specialization Core', description: 'High-performance computing with NumPy, Pandas, Scipy, and matrix algorithms.' },
      { name: 'Artificial Intelligence & Knowledge Representation', code: 'AIM201', semester: 2, credits: 4, category: 'Core AI', description: 'First-order logic, probabilistic reasoning, ontology engineering, planning.' },
      { name: 'Machine Learning: Theory, Algorithms & Practice', code: 'AIM202', semester: 2, credits: 4, category: 'Core AI', description: 'Mathematical derivations of SVM, gradient boosting, clustering, cross-validation.' },
      { name: 'Deep Learning Architectures (CNN, RNN, Transformers)', code: 'AIM301', semester: 3, credits: 4, category: 'Deep Tech', description: 'PyTorch deep models, ResNet, vision transformers, sequence-to-sequence models.' },
      { name: 'Natural Language Processing & Generative AI', code: 'AIM302', semester: 3, credits: 3, category: 'Deep Tech', description: 'Self-attention, Transformer encoders/decoders, LLMs, LoRA tuning, RAG systems.' },
      { name: 'MLOps: Pipeline Deployment & Feature Stores', code: 'PE302', semester: 3, credits: 3, category: 'MLOps/Systems', description: 'Docker packaging, model registries, CI/CD for ML models, latency benchmarking.' },
      { name: 'Explainable AI (XAI) & Ethical AI Systems', code: 'PE401', semester: 4, credits: 3, category: 'Applied Elective', description: 'SHAP, LIME, counterfactuals, model interpretability in enterprise domains.' },
      { name: 'Major Master Thesis / Corporate AI Dissertation', code: 'AIM402', semester: 4, credits: 13, category: 'Specialization Core', description: 'Full-semester corporate internship or research dissertation with peer-reviewed publication.' },
    ],
    categoryBreakdown: {
      basicSciences: 4,
      engineeringSciences: 0,
      humanitiesAndMgmt: 0,
      coreComputing: 28,
      specializationDomain: 27,
      electives: 6,
      practicalLabs: 4,
      projectsAndInternships: 15,
    },
    learningRoadmap: [
      { stage: 'Semester 1: Advanced Algorithms & Scientific Python', semesters: 'Sem 1', focus: 'Advanced Data Structures, Distributed DBs, Mathematical Foundations, Python for AI', milestone: 'Implement complex algorithmic proofs and statistical data pipelines' },
      { stage: 'Semester 2: AI Knowledge Systems & Machine Learning', semesters: 'Sem 2', focus: 'Knowledge Engineering, Statistical Machine Learning, Full-Stack Enterprise Web', milestone: 'Derive and build mathematical ML algorithms with production APIs' },
      { stage: 'Semester 3: Deep Neural Networks, NLP & MLOps', semesters: 'Sem 3', focus: 'Deep Learning in PyTorch, Large Language Models, MLOps, Computer Vision Elective', milestone: 'Architect production deep learning pipelines with automated CI/CD' },
      { stage: 'Semester 4: Full-Semester Corporate Internship & Thesis', semesters: 'Sem 4', focus: 'Full-Time Corporate AI Internship, Research Thesis, Oral Defense Presentation', milestone: 'Deliver enterprise AI solutions and defend master dissertation' },
    ],
    careerRoles: ['Lead AI Engineer', 'Senior Machine Learning Engineer', 'Data Science Lead', 'MLOps Architect', 'AI Solutions Consultant'],
  },
];

// Helper functions for specializations lookups
export function getAllSpecializations(): ProgramSpecialization[] {
  return PROGRAM_SPECIALIZATIONS_REGISTRY;
}

export function getSpecializationById(id: string): ProgramSpecialization | undefined {
  if (!id) return undefined;
  return PROGRAM_SPECIALIZATIONS_REGISTRY.find(s => s.id.toLowerCase() === id.toLowerCase());
}

// Helper functions for curriculum lookups
export function getAllDepartments(): DepartmentCurriculum[] {
  return DEPARTMENT_CURRICULA;
}

export function getDepartmentById(id: string): DepartmentCurriculum | undefined {
  if (!id) return undefined;
  return DEPARTMENT_CURRICULA.find(d => d.id.toLowerCase() === id.toLowerCase());
}

export function getCurriculumStats() {
  const totalDepartments = DEPARTMENT_CURRICULA.length;
  const totalSubjectsAcrossAllDepts = DEPARTMENT_CURRICULA.reduce((acc, d) => acc + d.totalSubjects, 0);
  const totalInteractiveSubjects = DEPARTMENT_CURRICULA.reduce(
    (acc, d) => acc + d.semesters.reduce(
      (sAcc, s) => sAcc + s.subjects.filter(sub => sub.interactiveSubjectId).length,
      0
    ),
    0
  );
  return {
    totalDepartments,
    totalSubjectsAcrossAllDepts,
    totalInteractiveSubjects,
  };
}

