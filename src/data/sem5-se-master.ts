import { Subject } from './types';

export const sem5SeMaster: Subject = {
  id: "sem5-se",
  name: "Software Engineering & Agile (SE)",
  code: "SE501",
  color: "bg-emerald-600",
  icon: "layers",
  description: "Comprehensive University Syllabus for Software Engineering — SDLC Process Models (Waterfall, Spiral, Agile Scrum), Requirements Engineering (IEEE 830 SRS), GoF Design Patterns, White-Box & Black-Box Testing (Cyclomatic Complexity, Basis Path), and DevOps CI/CD Pipelines.",
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
      id: "se-u4",
      title: "Unit 4: Software Testing & Quality Assurance",
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
    }
  ]
};
