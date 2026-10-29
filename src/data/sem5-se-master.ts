import { Subject } from './types';

export const sem5SeMaster: Subject = {
  id: "sem5-se",
  name: "Software Engineering & Agile (SE)",
  code: "SE501",
  color: "bg-emerald-600",
  icon: "layers",
  description: "Comprehensive University Syllabus for Software Engineering — SDLC Process Models (Waterfall, Spiral, Agile Scrum), Requirements Engineering (IEEE 830 SRS), UML Modeling, GoF Design Patterns, SOLID Principles, White-Box & Black-Box Testing (Cyclomatic Complexity, Basis Path), Project Estimation (COCOMO, FPA), and DevOps CI/CD Pipelines.",
  semester: 5,
  units: [
    {
      id: "se-u1",
      title: "Unit 1: Software Process Models & Agile Scrum Methodology",
      description: "Classical Waterfall, V-Model, Spiral Model (Risk-Driven), Agile Manifesto Principles, Scrum Framework (Sprints, Product Owner, Scrum Master, Daily Standup, Backlogs, Burndown Charts), and Kanban.",
      topics: [
        {
          id: "se-u1-t1",
          title: "SDLC Process Models Comparison, Spiral Model Risk Analysis, and Agile Scrum Ceremonies",
          simpleExplanation: "Software Development Life Cycle (SDLC) models define structured workflows for building reliable software. Classical Waterfall is linear and sequential, suitable only for frozen, well-understood requirements. Boehm's Spiral Model is risk-driven and iterative, combining waterfall with prototyping. The Agile Methodology prioritizes working software, rapid feedback, and customer collaboration over comprehensive documentation, structured into iterative time-boxed Sprints managed via the Scrum framework.",
          detailedExplanation: `## 1. Comparative Analysis of SDLC Process Models

| Metric | Classical Waterfall | Prototyping Model | Spiral Model (Boehm) | Agile Scrum |
| :--- | :--- | :--- | :--- | :--- |
| **Philosophy** | Linear-Sequential phases | Customer mock evaluation | **Risk-Driven Iterative** | Incremental, Adaptive sprints |
| **Requirement Stability** | Must be **completely frozen upfront** | Highly ambiguous / evolving | High risk / complex domains | Rapidly changing / emergent |
| **Risk Assessment** | Low / non-existent | Moderate | **Explicit in every loop cycle** | Continuous risk mitigation |
| **Customer Involvement** | Only at start (SRS) and delivery | High during prototype review | At each quadrant milestone | **Continuous co-development** |
| **Working Software Delivery** | Only at the very end of project | Prototype thrown away or refined | At the end of each spiral | **At the end of every 2-4 week sprint** |

\`\`\`mermaid
flowchart LR
    subgraph Scrum_Cycle ["Agile Scrum Lifecycle"]
        direction TB
        PB["Product Backlog\n(User Stories)"] --> SB["Sprint Backlog\n(2-4 Week Commitments)"]
        SB --> SPRINT["Active Sprint Cycle\n(Daily Standup 15m)"]
        SPRINT --> SH["Potentially Shippable\nProduct Increment"]
        SH --> REV["Sprint Review &\nRetrospective"]
        REV --> PB
    end
\`\`\`

---

## 2. Boehm's Spiral Model (4 Quadrants)

In each rotational cycle around the spiral:
1. **Quadrant 1: Determine Objectives**: Identify specific project goals, alternative approaches, and operational constraints.
2. **Quadrant 2: Identify and Resolve Risks**: Perform rigorous risk analysis, cost-benefit trade-offs, and construct prototyping simulations to eliminate technical blockers.
3. **Quadrant 3: Develop and Verify Next-Level Product**: Choose an appropriate development model (e.g. Waterfall or Rapid Prototyping) to engineer the subsystem.
4. **Quadrant 4: Review and Plan Next Phase**: Evaluate progress with stakeholders and establish the commitment plan for the subsequent spiral iteration.

---

## 3. Scrum Roles, Artifacts & Ceremonies

- **3 Core Roles**:
  1. **Product Owner**: Defines the product vision, manages and prioritizes items in the **Product Backlog**, and accepts user stories.
  2. **Scrum Master**: Servant leader who facilitates ceremonies, eliminates team blockers/impediments, and protects the team from external distraction.
  3. **Development Team**: Cross-functional, self-organizing engineering team responsible for creating the shippable increment.
- **3 Artifacts**: Product Backlog, Sprint Backlog, Product Increment (Definition of Done).
- **4 Ceremonies**: Sprint Planning, Daily Scrum (15-min standup), Sprint Review, Sprint Retrospective.`,
          shortNotes: "Waterfall is sequential for frozen specs; Spiral is risk-driven; Agile Scrum uses 2-4 week time-boxed sprints with Product Owner, Scrum Master, and Dev Team.",
          examples: [
            {
              title: "Scrum User Story & Acceptance Criteria Specification",
              problem: "Write an industry-standard INVEST user story with Gherkin acceptance criteria for student multi-university registration.",
              explanation: "Follows 'As a... I want to... So that...' format with Given-When-Then test cases.",
              code: `# USER STORY: US-104 (Pan-India University Onboarding)
As a technical engineering student in Gujarat,
I want to select my university and branch from a searchable directory,
So that my dashboard and syllabus reflect my exact institutional curriculum.

# ACCEPTANCE CRITERIA (Gherkin Syntax):
Scenario: Successful university onboarding selection
  Given I am an authenticated user on the /onboarding route
  When I select "ITM (SLS) Baroda University" from the university selector
  And I choose "Computer Science & Engineering" as my branch
  And I click "Launch My Campus Hub"
  Then my profile is updated with university="itm-baroda" and onboarding_completed=true
  And I am redirected to /dashboard within 500ms`,
              output: `Status: READY FOR SPRINT COMMITMENT
Story Points: 3 SP (Fibonacci Scale)
Priority: High (Value = 90, Risk = Low)`
            }
          ],
          keyPoints: [
            "Waterfall is best suited when requirements are strictly stable and well-understood.",
            "Spiral model uniquely incorporates explicit risk analysis in every iteration quadrant.",
            "Agile Scrum operates in 1-4 week Sprints producing a Potentially Shippable Increment.",
            "Scrum Team consists of Product Owner, Scrum Master, and Development Team.",
            "Sprint Burndown charts track remaining work hours vs time across the sprint."
          ],
          theoryQuestions: [
            {
              question: "Explain Boehm's Spiral Model of software development. Why is it considered a risk-driven model?",
              marks: "5 Marks",
              answer: "Boehm's Spiral Model is an evolutionary software process model that couples the iterative nature of prototyping with the controlled aspects of the waterfall model. It is represented as a spiral with four quadrants: 1. Determine objectives and constraints. 2. Identify and resolve risks (via risk analysis and prototyping). 3. Develop and verify product. 4. Plan the next phase. It is considered risk-driven because each loop explicitly requires risk assessment before proceeding. If a major technical risk cannot be resolved, the project can be aborted early before massive capital investment is wasted."
            }
          ],
          mcqs: [
            {
              question: "In the Scrum framework, who is ultimately responsible for maintaining and prioritizing the Product Backlog?",
              options: [
                "Scrum Master",
                "Product Owner",
                "Lead Software Architect",
                "Project Manager"
              ],
              correctIndex: 1,
              explanation: "The Product Owner is the sole person responsible for managing the Product Backlog, including expressing backlog items clearly and ordering items to best achieve goals and missions."
            }
          ]
        }
      ]
    },
    {
      id: "se-u2",
      title: "Unit 2: Requirements Engineering & Unified Modeling Language (UML)",
      description: "Requirements Elicitation, Functional vs Non-Functional Requirements, IEEE 830 SRS Document Standard, Traceability Matrix, and UML 2.0 Diagrams (Use Case, Class, Sequence, State Machine, Activity).",
      topics: [
        {
          id: "se-u2-t1",
          title: "Requirements Engineering, IEEE 830 SRS Standard, and Functional vs Non-Functional Metrics",
          simpleExplanation: "Requirements engineering is the disciplined process of discovering, analyzing, documenting, and validating what a software system should do. Requirements are categorized into Functional Requirements (specific features, calculations, and behaviors the system must perform) and Non-Functional Requirements (quality constraints like performance, security, availability, and usability). The IEEE 830 standard outlines the formal structure of a Software Requirements Specification (SRS) document.",
          detailedExplanation: `## 1. Functional vs Non-Functional Requirements (FURPS+ Framework)

| Category | Definition | Key Verification Metric | Concrete Example |
| :--- | :--- | :--- | :--- |
| **Functional Requirements (FR)** | What the system **must execute** (inputs, processing, outputs, data persistence). | Binary Test Passes (Pass/Fail) | "System shall compute GPA given semester course grades." |
| **Performance (NFR)** | Speed, latency, throughput, and resource limits under peak loads. | Milliseconds / Transactions per Sec | "Login authentication shall complete within 300 ms under 1,000 req/sec." |
| **Reliability (NFR)** | System uptime, Mean Time Between Failures (MTBF), failure recovery. | Percentage Uptime (99.99%) | "System shall maintain 99.9% uptime with MTTR < 15 minutes." |
| **Security (NFR)** | Confidentiality, data integrity, access authorization, audit logging. | Compliance Audits (AES, OWASP) | "All user passwords shall be hashed using bcrypt with work factor 12." |
| **Portability (NFR)** | Cross-platform compatibility, container support, browser matrix. | Environment Certifications | "App shall run without code modifications on Android 10+ and iOS 15+." |

---

## 2. IEEE 830 SRS Document Standard Structure

An official IEEE 830 Software Requirements Specification is organized into three major sections:
1. **Section 1: Introduction**: Purpose, Scope of the Product, Definitions, Acronyms, References, and Overview.
2. **Section 2: Overall Description**: Product Perspective, System Interfaces, User Characteristics, Constraints, Assumptions, and Dependencies.
3. **Section 3: Specific Requirements**:
   - External Interface Requirements (User Interfaces, Hardware Interfaces, Software Interfaces, Communications).
   - Detailed Functional Requirements (organized by use case or feature).
   - Performance Requirements, Design Constraints, Standards Compliance, and Software Quality Attributes.

---

## 3. Requirements Traceability Matrix (RTM)

The **Requirements Traceability Matrix (RTM)** cross-references every high-level business requirement with its technical specification, system design component, code module, and test cases:
\\[
\\text{Business Need} \\longleftrightarrow \\text{SRS Requirement} \\longleftrightarrow \\text{Architecture Module} \\longleftrightarrow \\text{Test Case ID}
\\]
- **Forward Traceability**: Ensures every requirement is fulfilled by at least one test case (prevents missing features).
- **Backward Traceability**: Ensures every code module is justified by a real requirement (prevents scope creep and gold plating).`,
          shortNotes: "Functional requirements describe what the system does; Non-functional requirements describe how well it performs. IEEE 830 specifies standard SRS format. Traceability matrix connects requirements to test cases.",
          examples: [
            {
              title: "Requirements Traceability Matrix (RTM) Schema in JSON",
              problem: "Model an automated requirements traceability pipeline that verifies test case coverage for core academic requirements.",
              explanation: "Maps Requirement ID to Design Class, Code File, and Test Case verification status.",
              code: `const rtmMatrix = [
  {
    reqId: "REQ-AUTH-01",
    description: "Multi-university single-sign-on authentication",
    type: "Functional",
    priority: "P0",
    designClass: "CampusLoopAuthService",
    testCaseId: "TC-AUTH-101",
    status: "Verified",
    coveragePct: 100
  },
  {
    reqId: "REQ-PERF-02",
    description: "Syllabus notes load latency under 200ms",
    type: "Non-Functional",
    priority: "P1",
    designClass: "NotesCacheController",
    testCaseId: "TC-PERF-204",
    status: "Verified",
    coveragePct: 100
  }
];

function auditCoverage(matrix) {
  const unverified = matrix.filter(r => r.status !== "Verified");
  console.log(\`Total Tracked Requirements: \${matrix.length}\`);
  console.log(\`Unverified / Orphaned Requirements: \${unverified.length}\`);
  return unverified.length === 0;
}

auditCoverage(rtmMatrix);`,
              output: `Total Tracked Requirements: 2
Unverified / Orphaned Requirements: 0
RTM Audit: PASSED (100% Traceability Coverage)`
            }
          ],
          keyPoints: [
            "Functional requirements define capabilities; Non-functional requirements enforce constraints.",
            "IEEE 830 standard provides the universal structure for software requirements documentation.",
            "Requirements must be Unambiguous, Testable, Verifiable, Modifiable, and Traceable.",
            "Requirements Traceability Matrix (RTM) prevents scope creep and ensures complete test verification."
          ],
          theoryQuestions: [
            {
              question: "Differentiate between Functional and Non-Functional Requirements with three industry examples each.",
              marks: "5 Marks",
              answer: "Functional Requirements define the specific functions and services the software must deliver (e.g., student course enrollment, GPA calculation, payment processing). Non-Functional Requirements define quality attributes, performance constraints, and operational bounds under which the system operates (e.g., API response time < 200ms, 99.99% availability, AES-256 database encryption at rest). While functional requirements can be tested with standard unit test assertions, non-functional requirements require stress, load, security, and benchmark testing."
            }
          ],
          mcqs: [
            {
              question: "Which of the following is a Non-Functional Requirement (NFR)?",
              options: [
                "The system shall allow students to download semester marksheets in PDF format",
                "The system shall encrypt student passwords using bcrypt before database storage",
                "The system shall allow users to search for university courses by course code",
                "The system shall send email notifications upon exam registration"
              ],
              correctIndex: 1,
              explanation: "Password encryption using bcrypt is a security constraint (Non-Functional Requirement) specifying how data protection is enforced, whereas the others are functional capabilities."
            }
          ]
        },
        {
          id: "se-u2-t2",
          title: "UML 2.0 Structural & Behavioral Modeling: Class, Sequence, and State Machine Diagrams",
          simpleExplanation: "The Unified Modeling Language (UML) is the industry-standard visual notation for designing and communicating software architectures. Structural diagrams (like Class Diagrams) depict the static layout of classes, attributes, methods, and relationships (inheritance, association, aggregation, composition). Behavioral diagrams (like Sequence and State Machine Diagrams) depict dynamic interactions, message passings, lifelines, and state transitions over time.",
          detailedExplanation: `## 1. Class Diagram Relationships & OOP Semantics

\`\`\`mermaid
classDiagram
    University "1" *-- "many" Department : Composition (Strong Whole-Part)
    Department "1" o-- "many" Professor : Aggregation (Weak Whole-Part)
    Professor -- Student : Association (Knows-A)
    Student <|-- GraduateStudent : Generalization (Inherits / Is-A)
    Student ..> ExamPaper : Dependency (Uses-A)
\`\`\`

### Relationship Hierarchy:
1. **Dependency (\`..\`)\`**: Weakest relationship. Class A uses Class B as a parameter or local variable in a method. Changes to B may affect A.
2. **Association (\`--\`)**: Structural connection. Class A holds a reference to Class B as an instance variable.
3. **Aggregation (\`o--\`)**: "Has-A" relationship where child can exist independently of parent (e.g. Professor exists even if Department dissolves).
4. **Composition (\`*--\`)**: Strong ownership. Lifetime of child is bound to parent (e.g. Department cannot exist without University; deleting University destroys Departments).
5. **Generalization (\`<|--\`)**: "Is-A" inheritance relationship between subclass and superclass.

---

## 2. Sequence Diagrams: Dynamic Interaction Over Time

Sequence diagrams model object collaboration arranged in time sequence:
- **Lifelines**: Vertical dashed lines representing object existence during interaction.
- **Activation Boxes**: Thin rectangles showing when an object has execution control.
- **Messages**:
  - *Synchronous Message* (solid line with filled arrowhead): Caller blocks waiting for return.
  - *Asynchronous Message* (solid line with open arrowhead): Caller continues without waiting.
  - *Return Message* (dashed line with open arrowhead): Value returned to caller.

---

## 3. State Machine Diagrams

State machine diagrams capture an object's discrete states and transitions triggered by events:
\\[
\\text{Current State} \\xrightarrow{\\text{Event}[\\text{Guard}] / \\text{Action}} \\text{Next State}
\\]
- Models reactive lifecycles such as Course Registration (Draft $\\to$ Submitted $\\to$ Approved $\\to$ Enrolled $\\to$ Completed).`,
          shortNotes: "UML Class diagrams show static structure; Composition is strong ownership (*), Aggregation is weak (o). Sequence diagrams show dynamic messages over lifelines. State diagrams model object lifecycle transitions.",
          examples: [
            {
              title: "TypeScript Representation of UML Composition vs Aggregation",
              problem: "Demonstrate UML Composition and Aggregation in code by modeling a University, its Departments, and Professors.",
              explanation: "In Composition, departments are created inside University. In Aggregation, professors are passed from outside.",
              code: `// Aggregation: Professor exists independently
class Professor {
  constructor(public name: string, public specialization: string) {}
}

// Composition: Department lifecycle is owned by University
class Department {
  constructor(public name: string, public professors: Professor[] = []) {}
}

class University {
  public departments: Department[] = [];

  constructor(public name: string) {
    // Composition: Departments instantiated internally
    this.departments.push(new Department("Computer Science"));
    this.departments.push(new Department("Artificial Intelligence"));
  }

  // Aggregation: Professor passed into department
  addProfessorToDept(deptName: string, prof: Professor) {
    const dept = this.departments.find(d => d.name === deptName);
    if (dept) dept.professors.push(prof);
  }
}

const profPatel = new Professor("Dr. R. Patel", "Deep Learning");
const itmUniversity = new University("ITM SLS Baroda University");
itmUniversity.addProfessorToDept("Artificial Intelligence", profPatel);
console.log(\`Enrolled Prof \${profPatel.name} in \${itmUniversity.name}\`);`,
              output: `Enrolled Prof Dr. R. Patel in ITM SLS Baroda University`
            }
          ],
          keyPoints: [
            "Composition implies strict lifecycle dependency; Aggregation represents weak containment.",
            "Generalization corresponds directly to object-oriented class inheritance.",
            "Sequence diagrams model time on the vertical axis and objects across the horizontal axis.",
            "State machine transitions require Event, Guard Condition, and Action triggers."
          ],
          theoryQuestions: [
            {
              question: "Differentiate between Aggregation and Composition in UML class diagrams with practical code examples.",
              marks: "7 Marks",
              answer: "Aggregation and Composition are both special forms of association representing whole-part relationships. Aggregation is a weak 'has-a' relationship where child parts can exist independently of the whole (denoted by an open diamond). For example, a Department has Professors; if the Department closes, the Professors continue to exist. Composition is a strong ownership relationship where child parts cannot exist independently of the whole (denoted by a filled solid diamond). For example, a University has Departments; if the University is permanently shut down, its internal Departments cease to exist."
            }
          ],
          mcqs: [
            {
              question: "In a UML Class diagram, what does a solid filled black diamond represent?",
              options: [
                "Generalization (Inheritance)",
                "Weak Aggregation",
                "Strong Composition",
                "Realization of an Interface"
              ],
              correctIndex: 2,
              explanation: "A solid black diamond denotes Composition, representing a strong whole-part relationship where the lifetime of the part is strictly bound to the lifetime of the whole."
            }
          ]
        }
      ]
    },
    {
      id: "se-u3",
      title: "Unit 3: Software Architecture, Design Patterns & SOLID Principles",
      description: "Cohesion and Coupling metrics, Architectural Styles (Layered, Microservices, Event-Driven), Gang of Four (GoF) Design Patterns (Singleton, Factory, Adapter, Observer, Strategy), and SOLID Object-Oriented Principles.",
      topics: [
        {
          id: "se-u3-t1",
          title: "SOLID Principles of Object-Oriented Design and Architectural Modularity Metrics",
          simpleExplanation: "Good software design maximizes maintainability and minimizes fragility when requirements change. The two foundational modularity metrics are Cohesion (how closely related the tasks within a single module are — we want High Cohesion) and Coupling (how strongly dependent separate modules are on each other — we want Low Coupling). The SOLID principles are five design rules that prevent code smells like rigidity and fragility.",
          detailedExplanation: `## 1. Modularity Metrics: Cohesion vs Coupling

- **Cohesion (Goal: High Cohesion)**: Measures the degree to which all elements inside a single module belong together.
  - *Best*: **Functional Cohesion** (every element contributes to a single well-defined task, e.g. calculating tax).
  - *Worst*: **Coincidental Cohesion** (unrelated utilities bundled together arbitrarily, e.g. a 'Miscellaneous' class).
- **Coupling (Goal: Low / Loose Coupling)**: Measures the degree of interdependence between two software modules.
  - *Best*: **Data Coupling** (modules communicate solely by passing primitive parameter data).
  - *Worst*: **Content Coupling** (one module directly modifies internal private data of another module).

---

## 2. The SOLID Principles Deconstructed

\`\`\`mermaid
flowchart TD
    S["S: Single Responsibility Principle (SRP)\nA class should have one, and only one, reason to change."]
    O["O: Open/Closed Principle (OCP)\nSoftware entities should be open for extension, but closed for modification."]
    L["L: Liskov Substitution Principle (LSP)\nSubtypes must be substitutable for their base types without altering correctness."]
    I["I: Interface Segregation Principle (ISP)\nClients should not be forced to depend on interfaces they do not use."]
    D["D: Dependency Inversion Principle (DIP)\nHigh-level modules should depend on abstractions, not on concrete details."]
\`\`\`

### In-Depth Breakdown:
1. **Single Responsibility (SRP)**: Separates concerns. A \`Student\` entity class should not handle database SQL queries or print PDF marksheets.
2. **Open/Closed (OCP)**: Achieved via abstract classes and interfaces. To support new payment gateways (Stripe, UPI), write new implementing classes rather than modifying a central \`switch-case\` statement.
3. **Liskov Substitution (LSP)**: If class $S$ is a subtype of $T$, objects of type $T$ may be replaced with objects of type $S$ without breaking application invariants (e.g. the classic Square-Rectangle violation).
4. **Interface Segregation (ISP)**: Break large, monolithic 'fat' interfaces into smaller, role-specific client interfaces.
5. **Dependency Inversion (DIP)**: High-level business logic should depend on interface abstractions, not concrete database or API drivers.`,
          shortNotes: "High cohesion and loose coupling are primary design goals. SOLID principles (SRP, OCP, LSP, ISP, DIP) ensure extensible, robust object-oriented architectures.",
          examples: [
            {
              title: "Refactoring Violation to SOLID Open/Closed & Dependency Inversion",
              problem: "Demonstrate refactoring an unextensible payment processor into an Open/Closed architecture using TypeScript interfaces.",
              explanation: "Uses Dependency Injection so new payment methods can be added without modifying existing code.",
              code: `// Abstraction (DIP & OCP)
interface PaymentProcessor {
  process(amount: number): boolean;
}

class UpiPaymentProcessor implements PaymentProcessor {
  process(amount: number): boolean {
    console.log(\`Processing ₹\${amount} via NPCI UPI Rail\`);
    return true;
  }
}

class NetBankingProcessor implements PaymentProcessor {
  process(amount: number): boolean {
    console.log(\`Processing ₹\${amount} via Bank IMPS Gateway\`);
    return true;
  }
}

// High-level service depends on abstraction, not concrete class
class FeeCheckoutService {
  constructor(private processor: PaymentProcessor) {}

  completeEnrollment(studentId: string, feeAmount: number) {
    if (this.processor.process(feeAmount)) {
      console.log(\`Enrollment confirmed for student \${studentId}\`);
    }
  }
}

const checkout = new FeeCheckoutService(new UpiPaymentProcessor());
checkout.completeEnrollment("ITM2026-CS-42", 25000);`,
              output: `Processing ₹25000 via NPCI UPI Rail
Enrollment confirmed for student ITM2026-CS-42`
            }
          ],
          keyPoints: [
            "High cohesion means a module focuses exclusively on one functional purpose.",
            "Loose coupling minimizes ripple effects when changing internal module code.",
            "Open/Closed principle allows adding new features without editing tested legacy source code.",
            "Dependency Inversion is the cornerstone of modern dependency injection containers in Spring and Angular."
          ],
          theoryQuestions: [
            {
              question: "Explain the SOLID principles with an architectural example for each principle.",
              marks: "7 Marks",
              answer: "The SOLID principles are five design rules for building maintainable object-oriented software: 1. Single Responsibility (SRP): A class has one reason to change (e.g. separating User entity from UserEmailSender). 2. Open/Closed (OCP): Modules are open for extension but closed for modification via polymorphism. 3. Liskov Substitution (LSP): Derived classes must honor base class contracts without throwing unexpected exceptions. 4. Interface Segregation (ISP): Many small interfaces are better than one fat interface (e.g. Printable vs Serializable). 5. Dependency Inversion (DIP): High-level modules depend on abstractions (interfaces) rather than low-level concrete implementations, decoupled via dependency injection."
            }
          ],
          mcqs: [
            {
              question: "Which SOLID principle is violated if a Square subclass inherits from a Rectangle base class and breaks the invariant that width and height can change independently?",
              options: [
                "Single Responsibility Principle",
                "Open/Closed Principle",
                "Liskov Substitution Principle",
                "Interface Segregation Principle"
              ],
              correctIndex: 2,
              explanation: "The classic Square-Rectangle problem violates the Liskov Substitution Principle (LSP) because replacing a Rectangle with a Square breaks client expectations that width and height can be mutated independently without side effects."
            }
          ]
        },
        {
          id: "se-u3-t2",
          title: "Gang of Four (GoF) Design Patterns: Creational, Structural, and Behavioral",
          simpleExplanation: "Design patterns are proven, reusable solutions to recurring problems in software engineering. Formulated by the 'Gang of Four' (GoF), they are classified into three families: Creational Patterns (deal with object creation mechanics, e.g. Singleton, Factory), Structural Patterns (deal with class composition and interfaces, e.g. Adapter, Decorator), and Behavioral Patterns (deal with communication and dynamic algorithms between objects, e.g. Observer, Strategy).",
          detailedExplanation: `## 1. Classification of GoF Design Patterns

| Category | Primary Purpose | Classic Patterns |
| :--- | :--- | :--- |
| **Creational** | Abstract object instantiation mechanics, decoupling creation from usage. | **Singleton**, **Factory Method**, Abstract Factory, Builder, Prototype |
| **Structural** | Assemble classes and objects into larger, flexible structures. | **Adapter**, **Decorator**, Composite, Facade, Proxy |
| **Behavioral** | Characterize complex control flows, algorithms, and inter-object responsibilities. | **Observer**, **Strategy**, Command, State, Template Method |

---

## 2. Deep Dive: Key Architectural Patterns

### A. Singleton Pattern (Creational)
Guarantees that a class has only **one instance** throughout the entire runtime lifecycle and provides a global access point to it (e.g. Database Connection Pool, Logger). Requires a private constructor and a static getInstance method.

### B. Factory Method Pattern (Creational)
Defines an interface for creating an object, but lets subclasses decide which concrete class to instantiate.

### C. Adapter Pattern (Structural)
Converts the interface of a class into another interface that clients expect. Allows classes with incompatible interfaces to work together (e.g. wrapping a legacy payment API into a modern interface).

### D. Observer Pattern (Behavioral)
Defines a one-to-many dependency between objects so that when one object (Subject) changes state, all its registered dependents (Observers) are notified and updated automatically (the foundation of event-driven UIs and pub/sub message brokers).

### E. Strategy Pattern (Behavioral)
Defines a family of interchangeable algorithms, encapsulates each one, and makes them swappable at runtime without altering client code (e.g. switching sorting algorithms or compression formats dynamically).`,
          shortNotes: "Creational patterns control instantiation (Singleton, Factory). Structural patterns organize class compositions (Adapter, Decorator). Behavioral patterns manage object communication (Observer, Strategy).",
          examples: [
            {
              title: "Thread-Safe Singleton & Strategy Pattern in TypeScript",
              problem: "Implement a thread-safe Singleton DatabaseManager and a Strategy pattern for campus notification delivery.",
              explanation: "Demonstrates private constructor singleton and runtime interchangeable notification strategies.",
              code: `// Singleton Pattern
class DatabaseManager {
  private static instance: DatabaseManager | null = null;
  private constructor() {
    console.log("Database connection pool initialized (Single Instance)");
  }

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }
}

// Strategy Pattern
interface NotificationStrategy {
  send(userId: string, message: string): void;
}

class EmailNotification implements NotificationStrategy {
  send(userId: string, message: string) {
    console.log(\`[EMAIL -> \${userId}]: \${message}\`);
  }
}

class PushNotification implements NotificationStrategy {
  send(userId: string, message: string) {
    console.log(\`[PUSH -> \${userId}]: \${message}\`);
  }
}

const db1 = DatabaseManager.getInstance();
const db2 = DatabaseManager.getInstance();
console.log(\`db1 === db2: \${db1 === db2}\`);

let notifier: NotificationStrategy = new PushNotification();
notifier.send("user-42", "Your semester syllabus notes are updated!");`,
              output: `Database connection pool initialized (Single Instance)
db1 === db2: true
[PUSH -> user-42]: Your semester syllabus notes are updated!`
            }
          ],
          keyPoints: [
            "Singleton restricts a class to exactly one instance with a private constructor.",
            "Factory Method encapsulates object creation logic away from client code.",
            "Adapter pattern acts as a bridge between two incompatible software interfaces.",
            "Observer pattern forms the foundation of modern reactive frameworks like React and RxJS.",
            "Strategy pattern encapsulates algorithms into interchangeable classes."
          ],
          theoryQuestions: [
            {
              question: "Explain the Observer and Strategy behavioral design patterns with real-world software architecture examples.",
              marks: "7 Marks",
              answer: "The Observer Pattern defines a one-to-many subscription mechanism where multiple observer objects watch a central subject; when the subject's state changes, all observers are automatically notified. A real-world example is an online stock trading app where multiple charts and watchlists update immediately upon a stock price shift. The Strategy Pattern defines a family of algorithms, encapsulates each in a separate class, and makes them interchangeable at runtime. A real-world example is a navigation app that calculates routes using different strategies (fastest driving route, walking route, public transit) depending on user preference."
            }
          ],
          mcqs: [
            {
              question: "Which design pattern is best suited when an application needs to switch sorting algorithms (MergeSort, QuickSort, HeapSort) at runtime based on input size?",
              options: [
                "Singleton Pattern",
                "Strategy Pattern",
                "Decorator Pattern",
                "Factory Method Pattern"
              ],
              correctIndex: 1,
              explanation: "The Strategy Pattern encapsulates interchangeable algorithms inside separate classes and enables dynamic runtime swapping without modifying the context class."
            }
          ]
        }
      ]
    },
    {
      id: "se-u4",
      title: "Unit 4: Software Verification, Validation & Automated Testing",
      description: "Verification vs Validation, Black-Box Testing (Equivalence Partitioning, Boundary Value Analysis BVA), White-Box Testing (Control Flow Graphs, Cyclomatic Complexity V(G)), Unit Testing, and Integration Testing.",
      topics: [
        {
          id: "se-u4-t1",
          title: "White-Box Testing, McCabe's Cyclomatic Complexity V(G), and Boundary Value Analysis",
          simpleExplanation: "Software testing evaluates systems to find bugs and verify compliance with requirements. Black-box testing evaluates functionality without looking at internal source code, using techniques like Equivalence Partitioning and Boundary Value Analysis (BVA). White-box testing examines internal program structures, control flows, and code paths. McCabe's Cyclomatic Complexity mathematically computes the number of linearly independent paths through a program's Control Flow Graph, defining the minimum test cases required for complete branch coverage.",
          detailedExplanation: `## 1. McCabe's Cyclomatic Complexity $V(G)$

McCabe's Cyclomatic Complexity quantifies the logical complexity of a program and provides an upper bound on the number of test cases needed for **Basis Path Testing**:

### Three Equivalent Formulations:
1. **Formula 1 (Graph Theory)**:
   \\[
   V(G) = E - N + 2P
   \\]
   where $E$ is the number of edges, $N$ is the number of nodes in the Control Flow Graph (CFG), and $P$ is the number of connected components ($P = 1$ for a single program).
2. **Formula 2 (Predicate Nodes)**:
   \\[
   V(G) = P_{\\text{predicate}} + 1
   \\]
   where $P_{\\text{predicate}}$ is the count of decision nodes (e.g. \`if\`, \`while\`, \`for\`, \`case\` conditions).
3. **Formula 3 (Enclosed Regions)**:
   \\[
   V(G) = R
   \\]
   where $R$ is the number of bounded planar regions in the planar graph plus the unbounded exterior region.

---

## 2. Boundary Value Analysis (BVA)

Empirical software engineering proves that errors cluster disproportionately at the **boundaries** of input ranges rather than at the center:
- For an input domain $[a, b]$, standard BVA generates **5 test points**:
  \\[
  \\{a, \\; a+1, \\; \\text{nominal}, \\; b-1, \\; b\\}
  \\]
- Robust Boundary Value Analysis (Robust BVA) tests **7 points** including out-of-range extremes:
  \\[
  \\{a-1, \\; a, \\; a+1, \\; \\text{nominal}, \\; b-1, \\; b, \\; b+1\\}
  \\]
- For a program with $n$ input variables, standard BVA requires $4n + 1$ test cases; Robust BVA requires $6n + 1$ test cases.`,
          shortNotes: "Cyclomatic Complexity V(G) = E - N + 2P = Predicate nodes + 1. BVA tests extremes {min, min+1, nom, max-1, max}.",
          examples: [
            {
              title: "Python Implementation: Cyclomatic Complexity & CFG Analyzer",
              problem: "Calculate McCabe's Cyclomatic Complexity V(G) for a function containing nested if-else statements.",
              explanation: "Counts predicate decision branching nodes to determine basis path count.",
              code: `def compute_grade(marks, attendance):
    # Predicate 1: marks < 0 or marks > 100
    if marks < 0 or marks > 100:
        return "Invalid"
    # Predicate 2: attendance < 75
    if attendance < 75:
        return "Debarred"
    # Predicate 3: marks >= 85
    if marks >= 85:
        return "A"
    # Predicate 4: marks >= 60
    elif marks >= 60:
        return "B"
    else:
        return "C"

# Decision nodes:
# 1. marks < 0
# 2. marks > 100
# 3. attendance < 75
# 4. marks >= 85
# 5. marks >= 60
predicates = 5
cyclomatic_complexity = predicates + 1
print(f"Predicate Decision Points: {predicates}")
print(f"Cyclomatic Complexity V(G) = P + 1 = {cyclomatic_complexity}")
print(f"Minimum Basis Path Test Cases Required: {cyclomatic_complexity}")`,
              output: `Predicate Decision Points: 5
Cyclomatic Complexity V(G) = P + 1 = 6
Minimum Basis Path Test Cases Required: 6`
            }
          ],
          keyPoints: [
            "Verification asks 'Are we building the product right?'; Validation asks 'Are we building the right product?'.",
            "Cyclomatic complexity V(G) = E - N + 2 = Predicate nodes + 1 = Planar regions.",
            "A complexity V(G) > 10 indicates a high-risk, difficult-to-test module requiring refactoring.",
            "Boundary Value Analysis selects min, min+, nom, max-, max values.",
            "Basis Path Testing guarantees that every statement and branch is executed at least once."
          ],
          theoryQuestions: [
            {
              question: "Explain McCabe's Cyclomatic Complexity with an example. How is it calculated from a Control Flow Graph?",
              marks: "7 Marks",
              answer: "McCabe's Cyclomatic Complexity V(G) is a software metric used to indicate the complexity of a program and define the number of linearly independent paths through the source code. It can be computed in three ways: 1. V(G) = E - N + 2P, where E is the number of edges, N is the number of nodes, and P is connected components. 2. V(G) = Predicate Nodes + 1, where predicate nodes are decision statements (if, while, for). 3. V(G) = Total enclosed planar regions + 1. For example, a function with 3 if-statements has 3 predicate nodes, yielding V(G) = 3 + 1 = 4. This means at least 4 test cases are needed to achieve 100% branch and statement coverage."
            }
          ],
          mcqs: [
            {
              question: "A program's Control Flow Graph has 14 edges and 10 nodes with 1 connected component. What is its McCabe Cyclomatic Complexity V(G)?",
              options: [
                "4",
                "6",
                "5",
                "8"
              ],
              correctIndex: 1,
              explanation: "V(G) = E - N + 2P = 14 - 10 + 2(1) = 4 + 2 = 6."
            }
          ]
        }
      ]
    },
    {
      id: "se-u5",
      title: "Unit 5: Project Estimation, Software Maintenance & DevOps CI/CD",
      description: "Software Project Estimation (COCOMO I & II, Function Point Analysis FPA), Software Maintenance Types, Reverse Engineering, CMMI Levels, ISO 9001, and DevOps CI/CD Automation Pipelines.",
      topics: [
        {
          id: "se-u5-t1",
          title: "COCOMO Project Estimation, Function Point Analysis (FPA), and DevOps CI/CD Pipelines",
          simpleExplanation: "Software project estimation predicts the effort (in person-months), duration (in calendar months), and cost required to engineer a software system. The Constructive Cost Model (COCOMO) developed by Barry Boehm estimates effort based on thousands of delivered lines of code (KLOC) across three project modes: Organic, Semi-Detached, and Embedded. Modern software teams deliver software reliably using DevOps Continuous Integration and Continuous Delivery (CI/CD) pipelines.",
          detailedExplanation: `## 1. Boehm's Basic COCOMO Model

Basic COCOMO estimates effort ($E$) in Person-Months (PM) and project development time ($D$) in calendar months:
\\[
E = a \\cdot (\\text{KLOC})^b, \\quad D = c \\cdot (E)^d
\\]

| Project Mode | Characteristics | $a$ | $b$ | $c$ | $d$ |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Organic** | Small, experienced team working with well-understood, familiar requirements. | 2.4 | 1.05 | 2.5 | 0.38 |
| **Semi-Detached** | Intermediate team size with a mix of experienced and inexperienced members. | 3.0 | 1.12 | 2.5 | 0.35 |
| **Embedded** | Complex, strict hardware and regulatory constraints (e.g. flight avionics, medical robotics). | 3.6 | 1.20 | 2.5 | 0.32 |

---

## 2. Function Point Analysis (FPA)

FPA measures system size from the **user's functional perspective**, completely independent of programming language:
\\[
\\text{FP} = \\text{UFP} \\times \\big(0.65 + 0.01 \\times \\sum_{i=1}^{14} F_i\\big)
\\]
- Evaluates 5 Information Domain Characteristics:
  1. **External Inputs (EI)**: User transaction screens, input forms.
  2. **External Outputs (EO)**: Reports, derived calculated screens.
  3. **External Inquiries (EQ)**: Read-only searches without update.
  4. **Internal Logical Files (ILF)**: Database tables managed by the application.
  5. **External Interface Files (EIF)**: Data files read from external systems.

---

## 3. DevOps CI/CD Automation Architecture

\`\`\`mermaid
flowchart LR
    DEV["Developer Push\n(Git Feature Branch)"] --> CI["CI Build Server\n(GitHub Actions)"]
    CI --> TEST["Automated Testing\n(Unit, Lint, Security Scan)"]
    TEST --> ART["Artifact Build\n(Docker Container Image)"]
    ART --> STAG["Staging Deploy\n(Integration Tests)"]
    STAG --> PROD["Production Rollout\n(Canary / Blue-Green)"]
\`\`\`

- **Continuous Integration (CI)**: Automates compiling, linting, and running unit tests on every Git commit to detect bugs immediately.
- **Continuous Delivery (CD)**: Automatically prepares and tests shippable release candidates for one-click deployment.
- **Continuous Deployment**: Automatically releases passing builds directly to production without manual gatekeepers.`,
          shortNotes: "Basic COCOMO calculates Effort E = a*(KLOC)^b across Organic, Semi-Detached, and Embedded modes. FPA measures functional size independent of code syntax. CI/CD automates build, test, and container deployment.",
          examples: [
            {
              title: "Python Implementation: COCOMO Project Effort & Duration Calculator",
              problem: "Calculate the estimated effort (Person-Months) and duration (Months) for a 50 KLOC project under Organic and Embedded modes.",
              explanation: "Applies standard Basic COCOMO formulas and prints comparison table.",
              code: `def cocomo_basic(kloc, mode="organic"):
    params = {
        "organic": {"a": 2.4, "b": 1.05, "c": 2.5, "d": 0.38},
        "semi-detached": {"a": 3.0, "b": 1.12, "c": 2.5, "d": 0.35},
        "embedded": {"a": 3.6, "b": 1.20, "c": 2.5, "d": 0.32}
    }
    p = params[mode.lower()]
    effort = p["a"] * (kloc ** p["b"])
    time = p["c"] * (effort ** p["d"])
    staff = effort / time
    return effort, time, staff

kloc = 50.0
for mode in ["organic", "semi-detached", "embedded"]:
    e, t, s = cocomo_basic(kloc, mode)
    print(f"[{mode.upper()} MODE]: Effort = {e:.1f} Person-Months | Duration = {t:.1f} Months | Avg Team = {s:.1f} Engrs")`,
              output: `[ORGANIC MODE]: Effort = 145.7 Person-Months | Duration = 16.6 Months | Avg Team = 8.8 Engrs
[SEMI-DETACHED MODE]: Effort = 239.5 Person-Months | Duration = 17.0 Months | Avg Team = 14.1 Engrs
[EMBEDDED MODE]: Effort = 394.0 Person-Months | Duration = 16.9 Months | Avg Team = 23.3 Engrs`
            }
          ],
          keyPoints: [
            "COCOMO Basic Effort formula: E = a * (KLOC)^b in Person-Months.",
            "Organic mode has low complexity; Embedded mode represents tightly constrained systems.",
            "Function Point Analysis is language-independent, unlike raw Lines of Code (LOC).",
            "DevOps CI/CD automates build verification and enables high-frequency, low-risk deployments."
          ],
          theoryQuestions: [
            {
              question: "Explain the three modes of Boehm's COCOMO model. Given a project of 60 KLOC in Semi-Detached mode, calculate Effort and Development Time.",
              marks: "7 Marks",
              answer: "The three modes of the Basic COCOMO model are: 1. Organic Mode (small, experienced teams with flexible requirements, a=2.4, b=1.05). 2. Semi-Detached Mode (medium-sized projects with mixed experience levels, a=3.0, b=1.12, c=2.5, d=0.35). 3. Embedded Mode (strict regulatory/hardware constraints, a=3.6, b=1.20). For a 60 KLOC Semi-Detached project: Effort E = 3.0 * (60)^1.12 ≈ 3.0 * 98.39 = 295.17 Person-Months. Development Time D = 2.5 * (295.17)^0.35 ≈ 2.5 * 7.32 = 18.3 Months. Average staffing needed is 295.17 / 18.3 ≈ 16.1 full-time software engineers."
            }
          ],
          mcqs: [
            {
              question: "In the COCOMO model, which project category represents complex aerospace and embedded operating systems with strict hardware constraints?",
              options: [
                "Organic Mode",
                "Semi-Detached Mode",
                "Embedded Mode",
                "Agile Mode"
              ],
              correctIndex: 2,
              explanation: "Embedded Mode represents complex projects with tight hardware and regulatory constraints, using higher exponent coefficients (a = 3.6, b = 1.20)."
            }
          ]
        }
      ]
    }
  ]
};
