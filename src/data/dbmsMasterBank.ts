/**
 * ITM University - Master Solved Question Bank: Database Management Systems (DBMS)
 * Subject Code: C2311C4 / DBMS302 · Semester 3
 * 
 * Modeled strictly after the 30-Page University Master Standard:
 * - Part A: 5 Predict SQL Output & Relational Algebra Traces
 * - Part B: 15 5-Mark Database Design & SQL Implementations with Schemas, Queries, Output & Viva Traps
 * - Part C: 18 3-Mark Theory Answers with Comparative Matrices (3+ Rows) and ER/Relational Diagrams
 * - Part D: University Exam Blueprint, 6 Fatal Mistakes, 16-Row Quick Revision Matrix & 10 Quick MCQs
 */

import {
  PredictOutputItem,
  LongAnswerQuestion,
  TheoryQuestion,
  McqRevisionItem,
  QuickMcq,
} from './oopjQuestionBank';

// ─────────────────────────────────────────────────────────────────────────────
// PART A: PREDICT SQL OUTPUT & EXECUTION TRACES (5 Questions)
// ─────────────────────────────────────────────────────────────────────────────
export const DBMS_PREDICT_OUTPUT: PredictOutputItem[] = [
  {
    id: 'dbms-pred-1',
    programNumber: 1,
    title: 'Three-Valued Logic, NULL Comparisons & Aggregate COUNT(*) vs COUNT(col)',
    code: `-- Database Table Setup:
CREATE TABLE Employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(30),
    department VARCHAR(20),
    commission INT
);

INSERT INTO Employees VALUES 
(1, 'Aarav', 'Sales', 500),
(2, 'Diya',  'Sales', NULL),
(3, 'Kabir', 'Tech',  0),
(4, 'Meera', 'Sales', NULL);

-- Queries to Predict:
-- Query 1:
SELECT COUNT(*), COUNT(commission), AVG(commission) FROM Employees;

-- Query 2:
SELECT name FROM Employees WHERE commission = NULL;

-- Query 3:
SELECT name FROM Employees WHERE commission IS NULL;

-- Query 4:
SELECT name FROM Employees WHERE commission != 500;`,
    output: `-- Query 1 Output:
-- COUNT(*) | COUNT(commission) | AVG(commission)
--    4     |        2          |      250

-- Query 2 Output:
-- (0 rows returned - Empty Result Set!)

-- Query 3 Output:
-- name
-- Diya
-- Meera

-- Query 4 Output:
-- name
-- Kabir`,
    steps: [
      { step: 1, action: "Query 1: COUNT(*) counts ALL 4 rows in the table. COUNT(commission) ignores NULLs, counting only rows 1 (500) and 3 (0) = 2 rows. AVG(commission) divides by non-null count: (500 + 0) / 2 = 250." },
      { step: 2, action: "Query 2: In SQL, 'commission = NULL' evaluates to UNKNOWN (Three-Valued Logic), never TRUE. Zero rows are returned!" },
      { step: 3, action: "Query 3: 'commission IS NULL' is the correct ANSI SQL predicate to test for missing data, returning Diya and Meera." },
      { step: 4, action: "Query 4: 'commission != 500' evaluates for Aarav (False), Kabir (0 != 500 -> True). For Diya and Meera, NULL != 500 evaluates to UNKNOWN, so they are NOT included!" }
    ],
    rule: "NULL represents missing/unknown data. Comparisons with NULL using standard operators (=, !=, <, >) always evaluate to UNKNOWN. Only IS NULL and IS NOT NULL resolve to TRUE or FALSE.",
    concept: "Three-Valued Logic & Aggregate NULL Behavior",
    callStack: [
      { label: "Query 1", detail: "COUNT(*) = 4 | COUNT(col) = 2 | AVG = (500+0)/2 = 250" },
      { label: "Query 2", detail: "commission = NULL -> UNKNOWN (0 rows)" },
      { label: "Query 4", detail: "NULL != 500 is UNKNOWN; only Kabir returned" }
    ]
  },
  {
    id: 'dbms-pred-2',
    programNumber: 2,
    title: 'The Dangerous NOT IN with Subquery Containing NULL Trap',
    code: `-- Database Table Setup:
CREATE TABLE Departments (dept_id INT, dept_name VARCHAR(20));
CREATE TABLE Staff (staff_id INT, name VARCHAR(20), dept_id INT);

INSERT INTO Departments VALUES (10, 'HR'), (20, 'Engineering'), (30, 'Finance');
INSERT INTO Staff VALUES (1, 'Rohan', 10), (2, 'Priya', NULL);

-- Target: Find departments that currently have NO staff assigned:
-- Candidate Query A (Using NOT IN):
SELECT dept_name FROM Departments 
WHERE dept_id NOT IN (SELECT dept_id FROM Staff);

-- Candidate Query B (Using NOT EXISTS):
SELECT dept_name FROM Departments d
WHERE NOT EXISTS (SELECT 1 FROM Staff s WHERE s.dept_id = d.dept_id);`,
    output: `-- Query A (NOT IN) Output:
-- (0 rows returned - Completely Empty!)

-- Query B (NOT EXISTS) Output:
-- dept_name
-- Engineering
-- Finance`,
    steps: [
      { step: 1, action: "Subquery (SELECT dept_id FROM Staff) produces the set: {10, NULL}." },
      { step: 2, action: "Query A tests: dept_id NOT IN (10, NULL) -> (dept_id != 10) AND (dept_id != NULL)." },
      { step: 3, action: "Since 'dept_id != NULL' is UNKNOWN, the entire conjunction FALSE AND UNKNOWN / TRUE AND UNKNOWN evaluates to UNKNOWN. No rows qualify!" },
      { step: 4, action: "Query B uses correlated NOT EXISTS. For Engineering (20), no staff has dept_id=20. Subquery returns 0 rows, so NOT EXISTS is TRUE." },
      { step: 5, action: "Departments 20 (Engineering) and 30 (Finance) are correctly returned by Query B." }
    ],
    rule: "CRITICAL SQL TRAP: If a subquery passed to NOT IN contains even a SINGLE NULL value, the entire outer query ALWAYS returns 0 rows! In production SQL, ALWAYS use NOT EXISTS or ensure subquery filters WHERE col IS NOT NULL.",
    concept: "Subquery NOT IN vs NOT EXISTS with NULL Values",
    callStack: [
      { label: "Subquery Set", detail: "{ 10, NULL }" },
      { label: "NOT IN Expansion", detail: "(dept_id != 10) AND (dept_id != NULL) -> UNKNOWN" },
      { label: "NOT EXISTS Fix", detail: "Row-by-row correlation correctly isolates Engineering and Finance" }
    ]
  },
  {
    id: 'dbms-pred-3',
    programNumber: 3,
    title: 'Self-Join on Hierarchical Employee-Manager Relationship',
    code: `-- Database Table Setup:
CREATE TABLE EmpHierarchy (
    emp_id INT PRIMARY KEY,
    name VARCHAR(20),
    manager_id INT
);

INSERT INTO EmpHierarchy VALUES 
(1, 'CEO Vikram', NULL),
(2, 'VP Ananya',  1),
(3, 'Dev Sanjay', 2),
(4, 'Dev Tanya',  2);

-- Query 1: Inner Self-Join
SELECT e.name AS Employee, m.name AS Manager
FROM EmpHierarchy e
JOIN EmpHierarchy m ON e.manager_id = m.emp_id;

-- Query 2: Left Outer Self-Join
SELECT e.name AS Employee, COALESCE(m.name, 'TOP EXECUTIVE') AS Manager
FROM EmpHierarchy e
LEFT JOIN EmpHierarchy m ON e.manager_id = m.emp_id;`,
    output: `-- Query 1 (INNER JOIN) Output:
-- Employee    | Manager
-- VP Ananya   | CEO Vikram
-- Dev Sanjay  | VP Ananya
-- Dev Tanya   | VP Ananya

-- Query 2 (LEFT JOIN) Output:
-- Employee    | Manager
-- CEO Vikram  | TOP EXECUTIVE
-- VP Ananya   | CEO Vikram
-- Dev Sanjay  | VP Ananya
-- Dev Tanya   | VP Ananya`,
    steps: [
      { step: 1, action: "Table EmpHierarchy references itself via foreign key manager_id pointing to emp_id." },
      { step: 2, action: "Inner Join matches rows where e.manager_id = m.emp_id. For CEO Vikram, manager_id is NULL, so Vikram is excluded!" },
      { step: 3, action: "Left Outer Join retains all rows from left table (e). When CEO Vikram has manager_id = NULL, right columns (m.*) are NULL." },
      { step: 4, action: "COALESCE(m.name, 'TOP EXECUTIVE') catches the NULL manager and replaces it with 'TOP EXECUTIVE'." }
    ],
    rule: "A Self-Join aliases the same physical table twice (e for employees, m for managers). Use LEFT JOIN whenever the root of the hierarchy (e.g. CEO) must be preserved.",
    concept: "Recursive Self-Joins and Hierarchical Trees",
    callStack: [
      { label: "Inner Join", detail: "Excludes CEO Vikram (NULL != any id)" },
      { label: "Left Join", detail: "Preserves CEO Vikram with NULL manager" },
      { label: "COALESCE", detail: "Substitutes 'TOP EXECUTIVE' for NULL" }
    ]
  },
  {
    id: 'dbms-pred-4',
    programNumber: 4,
    title: 'SQL Clause Execution Order: WHERE vs HAVING with Aggregate Grouping',
    code: `-- Database Table Setup:
CREATE TABLE Orders (
    order_id INT,
    customer VARCHAR(20),
    category VARCHAR(20),
    amount INT
);

INSERT INTO Orders VALUES
(1, 'TechCorp',  'Electronics', 800),
(2, 'TechCorp',  'Furniture',   200),
(3, 'TechCorp',  'Electronics', 1200),
(4, 'BioLab',    'Electronics', 400),
(5, 'BioLab',    'Furniture',   700),
(6, 'GlobalNet', 'Electronics', 1500);

-- Query Execution Sequence Test:
SELECT customer, SUM(amount) AS total_electronics
FROM Orders
WHERE category = 'Electronics'
GROUP BY customer
HAVING SUM(amount) > 1000
ORDER BY total_electronics DESC;`,
    output: `-- Query Result:
-- customer   | total_electronics
-- TechCorp   | 2000
-- GlobalNet  | 1500`,
    steps: [
      { step: 1, action: "Phase 1 (FROM Orders): Loads 6 raw rows." },
      { step: 2, action: "Phase 2 (WHERE category = 'Electronics'): Filters out rows 2 and 5 (Furniture). Remaining rows: 1 ($800), 3 ($1200), 4 ($400), 6 ($1500)." },
      { step: 3, action: "Phase 3 (GROUP BY customer): Groups rows: TechCorp (800+1200=2000), BioLab (400), GlobalNet (1500)." },
      { step: 4, action: "Phase 4 (HAVING SUM(amount) > 1000): Filters grouped totals. BioLab ($400) is discarded because 400 is not > 1000." },
      { step: 5, action: "Phase 5 (SELECT): Constructs columns customer and total_electronics." },
      { step: 6, action: "Phase 6 (ORDER BY): Sorts descending: TechCorp ($2000) then GlobalNet ($1500)." }
    ],
    rule: "SQL Logical Execution Sequence: (1) FROM, (2) WHERE, (3) GROUP BY, (4) HAVING, (5) SELECT, (6) DISTINCT, (7) ORDER BY, (8) LIMIT. WHERE filters rows before aggregation; HAVING filters groups after aggregation.",
    concept: "Logical Query Processing Pipeline",
    callStack: [
      { label: "FROM & WHERE", detail: "Filtered to 4 Electronics rows" },
      { label: "GROUP BY", detail: "TechCorp: 2000, BioLab: 400, GlobalNet: 1500" },
      { label: "HAVING", detail: "Keeps TechCorp and GlobalNet (> 1000)" },
      { label: "ORDER BY", detail: "TechCorp (2000) -> GlobalNet (1500)" }
    ]
  },
  {
    id: 'dbms-pred-5',
    programNumber: 5,
    title: 'Transaction Concurrency Conflict Equivalence & Precedence Graph Serialization',
    code: `// Schedule S of two concurrent transactions T1 and T2:
// Time | Transaction | Operation
// t1   | T1          | Read(A)
// t2   | T2          | Read(A)
// t3   | T1          | Write(A)
// t4   | T2          | Write(A)
// t5   | T1          | Read(B)
// t6   | T2          | Write(B)

// Conflict Analysis:
// Two operations conflict if:
// 1. They belong to different transactions, AND
// 2. They operate on the same data item (A or B), AND
// 3. At least one of them is a WRITE operation.

// Conflict Pairs in Schedule S:
// Pair 1: t2 (T2 Read A) and t3 (T1 Write A) -> Edge T2 -> T1 ? (Read before Write)
// Pair 2: t3 (T1 Write A) and t4 (T2 Write A) -> Edge T1 -> T2 (Write before Write)`,
    output: `Precedence (Serialization) Graph Construction:
Edge 1: Conflict between T2:Read(A) and T1:Write(A) creates directed edge: T2 -> T1
Edge 2: Conflict between T1:Write(A) and T2:Write(A) creates directed edge: T1 -> T2

Graph Topology: T1 <=======> T2  (CYCLE DETECTED: T1 -> T2 -> T1!)
Verdict       : Schedule S is NOT Conflict Serializable!
Risk          : Causes lost updates and inconsistent database states.`,
    steps: [
      { step: 1, action: "Identify all conflicting pairs operating on item A: (R2(A), W1(A)) where R2 precedes W1 -> creates edge T2 -> T1." },
      { step: 2, action: "Identify write-write conflict on item A: (W1(A), W2(A)) where W1 precedes W2 -> creates edge T1 -> T2." },
      { step: 3, action: "Analyze Precedence Graph: Node T1 points to Node T2, and Node T2 points to Node T1." },
      { step: 4, action: "By Serialization Theorem: A schedule S is conflict serializable if and only if its precedence graph contains NO cycles." },
      { step: 5, action: "Since a 2-node cycle exists, no equivalent serial schedule (neither T1 then T2, nor T2 then T1) can reproduce this execution." }
    ],
    rule: "Conflict Serializable Schedule: Must have an Acyclic Precedence Graph. A cycle signifies contradictory execution orders that cannot be serialized without violating transaction isolation.",
    concept: "Conflict Serializability and Precedence Graphs",
    callStack: [
      { label: "Conflict 1", detail: "R2(A) before W1(A) -> Edge T2 -> T1" },
      { label: "Conflict 2", detail: "W1(A) before W2(A) -> Edge T1 -> T2" },
      { label: "Cycle Check", detail: "Cycle T1 <-> T2 detected -> Non-serializable" }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// PART B: 15 5-MARK DATABASE DESIGN & SQL PROGRAMMING IMPLEMENTATIONS
// ─────────────────────────────────────────────────────────────────────────────
export const DBMS_LONG_QUESTIONS: LongAnswerQuestion[] = [
  {
    id: 'dbms-long-1',
    qNumber: 'Q1',
    title: 'ER-to-Relational Mapping: Strong & Weak Entities, 1:1, 1:N, and M:N Relationships',
    marks: 5,
    category: 'classes',
    concept: 'Entity-Relationship (ER) diagrams represent conceptual enterprise models. Mapping rules translate entity sets, composite/multivalued attributes, and relationships into normalized relational tables with primary and foreign keys.',
    requirements: [
      'Map Strong Entity (Student with roll_no, name, DOB)',
      'Map Weak Entity (Dependent of Employee identifying owner foreign key)',
      'Map 1:N Relationship (Department to Employees using foreign key on N-side)',
      'Map M:N Relationship (Students to Courses using junction table with composite PK)',
      'Map Multivalued Attribute (Phone numbers into separate child table)'
    ],
    code: `-- 1. STRONG ENTITY -> Standard Table
CREATE TABLE Student (
    roll_no INT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30),
    dob DATE
);

-- 2. MULTIVALUED ATTRIBUTE -> Child Table with Composite PK
CREATE TABLE Student_Phone (
    roll_no INT,
    phone_number VARCHAR(15),
    PRIMARY KEY (roll_no, phone_number),
    FOREIGN KEY (roll_no) REFERENCES Student(roll_no) ON DELETE CASCADE
);

-- 3. 1:N RELATIONSHIP -> Foreign Key on the N-side (Employee side)
CREATE TABLE Department (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL
);

CREATE TABLE Employee (
    emp_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    dept_id INT, -- Foreign key referencing 1-side
    FOREIGN KEY (dept_id) REFERENCES Department(dept_id)
);

-- 4. WEAK ENTITY -> Includes Owner PK in Composite PK
CREATE TABLE Employee_Dependent (
    emp_id INT,
    dep_name VARCHAR(50),
    relationship VARCHAR(30),
    PRIMARY KEY (emp_id, dep_name),
    FOREIGN KEY (emp_id) REFERENCES Employee(emp_id) ON DELETE CASCADE
);

-- 5. M:N RELATIONSHIP -> Separate Junction / Cross-Reference Table
CREATE TABLE Course (
    course_id VARCHAR(10) PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    credits INT
);

CREATE TABLE Enrollment (
    roll_no INT,
    course_id VARCHAR(10),
    semester VARCHAR(10),
    grade CHAR(2),
    PRIMARY KEY (roll_no, course_id),
    FOREIGN KEY (roll_no) REFERENCES Student(roll_no),
    FOREIGN KEY (course_id) REFERENCES Course(course_id)
);`,
    output: `Tables Generated:
1. Student (roll_no [PK], first_name, last_name, dob)
2. Student_Phone (roll_no [FK], phone_number [PK is (roll_no, phone_number)])
3. Department (dept_id [PK], dept_name)
4. Employee (emp_id [PK], name, dept_id [FK])
5. Employee_Dependent (emp_id [FK], dep_name [PK is (emp_id, dep_name)])
6. Course (course_id [PK], title, credits)
7. Enrollment (roll_no [FK], course_id [FK], semester, grade [PK is (roll_no, course_id)])`,
    explanationPoints: [
      'Strong Entity: Directly translates to a table where simple attributes become columns and key attribute becomes Primary Key.',
      'Weak Entity: Has no independent primary key; must inherit the owner strong entity primary key as a foreign key, combining it with its partial discriminator key.',
      '1:N Relationship: The primary key of the "1" side is imported as a foreign key column into the "N" side table.',
      'M:N Relationship: Cannot be represented with single foreign keys without duplication; requires a dedicated junction table holding both foreign keys as a composite primary key.'
    ],
    traceTable: {
      headers: ['ER Construct', 'Relational Mapping Rule', 'Primary Key Strategy'],
      rows: [
        ['Strong Entity', 'Create distinct relation', 'Primary Key of entity'],
        ['Weak Entity', 'Create relation with owner foreign key', 'Composite: {Owner PK + Partial Key}'],
        ['1:N Relationship', 'Add Foreign Key to N-side relation', 'Retains N-side original PK'],
        ['M:N Relationship', 'Create independent Junction Table', 'Composite: {PK of Entity 1 + PK of Entity 2}'],
        ['Multivalued Attribute', 'Create separate child table', 'Composite: {Entity PK + Attribute Value}']
      ]
    },
    examNote: 'Always remember: Never put the foreign key on the "1" side of a 1:N relationship! Placing it on the 1-side violates 1NF by creating multivalued columns.',
    vivaTrap: 'Viva Trap: "What is the difference between ON DELETE CASCADE and ON DELETE SET NULL?" Answer: ON DELETE CASCADE automatically deletes all dependent child rows when the parent is deleted. ON DELETE SET NULL preserves child rows but sets their foreign key column to NULL (requires column to be nullable).'
  },
  {
    id: 'dbms-long-2',
    qNumber: 'Q2',
    title: 'Complete Normalization Journey: Unnormalized -> 1NF -> 2NF -> 3NF -> BCNF',
    marks: 5,
    category: 'classes',
    concept: 'Normalization is the systematic process of decomposing database relations to eliminate data redundancy, update anomalies, insertion anomalies, and deletion anomalies while guaranteeing lossless-join and dependency preservation.',
    requirements: [
      'Define 1NF: Atomic attributes, elimination of repeating groups',
      'Define 2NF: 1NF + No Partial Functional Dependencies (Full functional dependency on candidate key)',
      'Define 3NF: 2NF + No Transitive Functional Dependencies (X -> Y requires X is superkey or Y is prime)',
      'Define BCNF: For every FD X -> Y, X must strictly be a Super Key',
      'Step-by-step decomposition of student-course-advisor relation'
    ],
    code: `-- Unnormalized Form (UNF):
-- Student_Record (roll_no, name, courses_taken, advisor_id, advisor_name, advisor_room)
-- Problem: courses_taken is a comma-separated repeating group (e.g. "DSA, DBMS, CA")

-- STEP 1: 1NF (ATOMICITY)
-- Decompose repeating groups into atomic rows:
-- Table: Student_Course_1NF (roll_no, course_id, name, advisor_id, advisor_name, advisor_room)
-- Candidate Key: (roll_no, course_id)
-- Functional Dependencies:
-- FD1: (roll_no, course_id) -> all attributes
-- FD2: roll_no -> name, advisor_id (PARTIAL DEPENDENCY on subset of PK!)
-- FD3: advisor_id -> advisor_name, advisor_room (TRANSITIVE DEPENDENCY!)

-- STEP 2: 2NF (ELIMINATE PARTIAL DEPENDENCIES)
-- Decompose into tables where non-prime attributes depend on the WHOLE candidate key:
CREATE TABLE Student_2NF (
    roll_no INT PRIMARY KEY,
    name VARCHAR(30),
    advisor_id INT
);

CREATE TABLE Student_Course_2NF (
    roll_no INT,
    course_id VARCHAR(10),
    PRIMARY KEY (roll_no, course_id),
    FOREIGN KEY (roll_no) REFERENCES Student_2NF(roll_no)
);

-- STEP 3: 3NF (ELIMINATE TRANSITIVE DEPENDENCY)
-- In Student_2NF, roll_no -> advisor_id, and advisor_id -> advisor_name, advisor_room.
-- This is a transitive dependency (roll_no -> advisor_name).
-- Decompose into Advisor and Student tables:
CREATE TABLE Advisor_3NF (
    advisor_id INT PRIMARY KEY,
    advisor_name VARCHAR(30),
    advisor_room VARCHAR(10)
);

CREATE TABLE Student_3NF (
    roll_no INT PRIMARY KEY,
    name VARCHAR(30),
    advisor_id INT,
    FOREIGN KEY (advisor_id) REFERENCES Advisor_3NF(advisor_id)
);

-- STEP 4: BCNF (BOYCE-CODD NORMAL FORM)
-- Condition: For every functional dependency X -> Y, X must be a SUPERKEY.
-- If a table has FD: advisor_room -> advisor_id where advisor_room is NOT a superkey,
-- it must be decomposed so left hand side is always a superkey.`,
    output: `Decomposition Summary:
1NF: Flattened multi-valued attributes into atomic tuples.
2NF: Split into Student_2NF and Student_Course_2NF (Removed Partial Dependency).
3NF: Split Advisor details into Advisor_3NF (Removed Transitive Dependency).
Final Normalized Schema: Zero redundancy, zero update/deletion anomalies!`,
    explanationPoints: [
      'Insertion Anomaly in UNF: Cannot record a new advisor unless at least one student enrolls.',
      'Deletion Anomaly in UNF: Deleting the last student enrolled under an advisor accidentally erases all advisor contact information from the database.',
      'Update Anomaly in UNF: If an advisor changes rooms, dozens of redundant student rows must be updated; missing one creates inconsistent states.',
      'Lossless Join: Guarantees that applying a natural join (R1 JOIN R2) reconstructs the original relation without introducing spurious tuples.'
    ],
    traceTable: {
      headers: ['Normal Form', 'Violation Removed', 'Mathematical Condition'],
      rows: [
        ['1NF', 'Repeating groups, composite/multivalued columns', 'All attribute domains contain only atomic scalar values'],
        ['2NF', 'Partial Functional Dependencies', 'Every non-prime attribute is fully functionally dependent on whole PK'],
        ['3NF', 'Transitive Functional Dependencies', 'For X -> Y, X is a Superkey OR Y is a Prime attribute'],
        ['BCNF', 'Non-superkey determinants', 'For X -> Y, X MUST strictly be a Superkey in all cases']
      ]
    },
    examNote: 'In exams, always define Prime vs Non-Prime attributes: A Prime attribute is any attribute that is a member of ANY candidate key; Non-prime attributes belong to no candidate key.',
    vivaTrap: 'Viva Trap: "Can a table be in 3NF but NOT in BCNF?" Answer: Yes! When a relation has multiple overlapping composite candidate keys where a determinant is a prime attribute but not a superkey (e.g. R(A, B, C) with FDs AB -> C and C -> B), it is in 3NF but violates BCNF.'
  },
  {
    id: 'dbms-long-3',
    qNumber: 'Q3',
    title: 'Advanced SQL Joins: Inner, Left Outer, Right Outer, Full Outer & Cross Joins',
    marks: 5,
    category: 'classes',
    concept: 'SQL Joins combine columns from one or more tables based on a related column between them. Outer joins preserve unmatched rows from one or both tables by padding missing values with NULL.',
    requirements: [
      'Create Students and Registrations sample tables with unmatched keys',
      'Demonstrate INNER JOIN (intersection of matching keys)',
      'Demonstrate LEFT OUTER JOIN (all left rows preserved)',
      'Demonstrate RIGHT OUTER JOIN and FULL OUTER JOIN',
      'Demonstrate CROSS JOIN (Cartesian product N * M)'
    ],
    code: `-- Setup Tables:
CREATE TABLE Students (id INT PRIMARY KEY, name VARCHAR(20));
CREATE TABLE Clubs (club_id INT PRIMARY KEY, club_name VARCHAR(20), president_id INT);

INSERT INTO Students VALUES (1, 'Kavya'), (2, 'Dev'), (3, 'Sahil'), (4, 'Ananya');
INSERT INTO Clubs VALUES (101, 'Robotics', 1), (102, 'Coding', 2), (103, 'Debate', 99); -- 99 does not exist

-- 1. INNER JOIN (Only matching IDs)
SELECT s.name, c.club_name 
FROM Students s 
INNER JOIN Clubs c ON s.id = c.president_id;

-- 2. LEFT OUTER JOIN (All students, even if not president)
SELECT s.name, COALESCE(c.club_name, 'No Club') AS club_lead
FROM Students s 
LEFT JOIN Clubs c ON s.id = c.president_id;

-- 3. RIGHT OUTER JOIN (All clubs, even if president unknown)
SELECT COALESCE(s.name, 'VACANT') AS president, c.club_name
FROM Students s 
RIGHT JOIN Clubs c ON s.id = c.president_id;

-- 4. FULL OUTER JOIN (All students AND all clubs)
SELECT s.name, c.club_name
FROM Students s 
FULL OUTER JOIN Clubs c ON s.id = c.president_id;

-- 5. CROSS JOIN (Cartesian Product 4 * 3 = 12 combinations)
SELECT s.name, c.club_name FROM Students s CROSS JOIN Clubs c;`,
    output: `-- 1. INNER JOIN Output:
-- Kavya  | Robotics
-- Dev    | Coding

-- 2. LEFT OUTER JOIN Output:
-- Kavya  | Robotics
-- Dev    | Coding
-- Sahil  | No Club
-- Ananya | No Club

-- 3. RIGHT OUTER JOIN Output:
-- Kavya  | Robotics
-- Dev    | Coding
-- VACANT | Debate

-- 4. FULL OUTER JOIN Output:
-- Kavya  | Robotics
-- Dev    | Coding
-- Sahil  | NULL
-- Ananya | NULL
-- NULL   | Debate`,
    explanationPoints: [
      'Inner Join: Produces intersection; discards students without clubs and clubs with invalid presidents.',
      'Left Join: Guarantees every student appears at least once; unassigned students get NULL club columns.',
      'Right Join: Guarantees every club appears; clubs with president_id=99 get NULL student columns.',
      'Full Outer Join: Union of Left and Right outer joins, ensuring zero dropped records from either table.',
      'Cross Join: Produces all possible combinations (4 students * 3 clubs = 12 tuples).'
    ],
    examNote: 'MySQL does not support standard FULL OUTER JOIN keyword directly! In MySQL, full outer join is simulated via: (SELECT ... LEFT JOIN ...) UNION (SELECT ... RIGHT JOIN ...).',
    vivaTrap: 'Viva Trap: "What happens if a CROSS JOIN is run on two tables with 10,000 rows each without a WHERE clause?" Answer: The database attempts to produce 10,000 * 10,000 = 100,000,000 (100 million) tuples, causing massive memory buffer saturation and query timeout!'
  },
  {
    id: 'dbms-long-4',
    qNumber: 'Q4',
    title: 'SQL Window Functions: ROW_NUMBER(), RANK(), DENSE_RANK(), and LEAD() / LAG()',
    marks: 5,
    category: 'classes',
    concept: 'Window functions perform calculations across a set of table rows that are related to the current row without collapsing the rows into a single summary tuple (unlike GROUP BY).',
    requirements: [
      'Explain PARTITION BY and ORDER BY within OVER() clause',
      'Demonstrate ROW_NUMBER() (strict sequential increment 1, 2, 3, 4)',
      'Demonstrate RANK() (gaps on ties: 1, 2, 2, 4)',
      'Demonstrate DENSE_RANK() (no gaps on ties: 1, 2, 2, 3)',
      'Demonstrate LAG() / LEAD() to calculate month-over-month salary delta'
    ],
    code: `-- Employee Salaries Table:
CREATE TABLE StaffSalary (
    emp_id INT,
    name VARCHAR(20),
    department VARCHAR(20),
    salary INT
);

INSERT INTO StaffSalary VALUES
(1, 'Rohan', 'IT', 90000),
(2, 'Aditi', 'IT', 90000),
(3, 'Kunal', 'IT', 80000),
(4, 'Priya', 'HR', 75000),
(5, 'Amit',  'HR', 75000),
(6, 'Sneha', 'HR', 60000);

-- Query 1: Ranking Functions Comparison
SELECT 
    name, department, salary,
    ROW_NUMBER() OVER(PARTITION BY department ORDER BY salary DESC) AS row_num,
    RANK()       OVER(PARTITION BY department ORDER BY salary DESC) AS rnk,
    DENSE_RANK() OVER(PARTITION BY department ORDER BY salary DESC) AS dense_rnk
FROM StaffSalary;

-- Query 2: Finding 2nd Highest Salary per Department using CTE
WITH RankedSalaries AS (
    SELECT name, department, salary,
           DENSE_RANK() OVER(PARTITION BY department ORDER BY salary DESC) as drank
    FROM StaffSalary
)
SELECT name, department, salary 
FROM RankedSalaries 
WHERE drank = 2;`,
    output: `-- Query 1 Output:
-- name  | dept | salary | row_num | rnk | dense_rnk
-- Rohan | IT   | 90000  |    1    |  1  |     1
-- Aditi | IT   | 90000  |    2    |  1  |     1    <-- Ties get same rank!
-- Kunal | IT   | 80000  |    3    |  3  |     2    <-- RANK skips to 3; DENSE_RANK is 2!
-- Priya | HR   | 75000  |    1    |  1  |     1
-- Amit  | HR   | 75000  |    2    |  1  |     1
-- Sneha | HR   | 60000  |    3    |  3  |     2

-- Query 2 Output (2nd Highest Salary):
-- name  | dept | salary
-- Kunal | IT   | 80000
-- Sneha | HR   | 60000`,
    explanationPoints: [
      'ROW_NUMBER(): Assigns unique sequential integers (1, 2, 3, ...) arbitrarily breaking ties.',
      'RANK(): Assigns identical rank numbers to tied values, but skips subsequent rank positions (1, 1, 3).',
      'DENSE_RANK(): Assigns identical rank numbers to tied values without skipping any integers (1, 1, 2).',
      'PARTITION BY: Resets the ranking calculation independently within each department partition.'
    ],
    examNote: 'When finding the Nth highest salary in SQL interviews and exams, ALWAYS use DENSE_RANK() rather than LIMIT/OFFSET, because duplicate top salaries cause OFFSET to fail.',
    vivaTrap: 'Viva Trap: "What is the difference between GROUP BY and Window Functions?" Answer: GROUP BY collapses multiple rows into a single aggregated row. Window functions calculate aggregate/ranking values while preserving all original individual detail rows.'
  },
  {
    id: 'dbms-long-5',
    qNumber: 'Q5',
    title: 'Transaction Management: ACID Properties & Concurrency Anomalies',
    marks: 5,
    category: 'classes',
    concept: 'A Transaction is a logical unit of database processing that includes one or more database access operations. To maintain data integrity across failures and concurrency, the DBMS guarantees ACID properties.',
    requirements: [
      'Atomicity (All-or-Nothing via WAL / Undo logging)',
      'Consistency (Preservation of schema constraints and invariants)',
      'Isolation (Transactions appear to execute sequentially without interference)',
      'Durability (Committed updates persist permanently despite crashes)',
      'Explain 3 Concurrency Anomalies: Dirty Read, Non-Repeatable Read, Phantom Read'
    ],
    code: `-- Demonstrating ACID Transaction with Savepoint:
CREATE TABLE BankAccounts (acc_no INT PRIMARY KEY, holder VARCHAR(20), balance DECIMAL(10,2));
INSERT INTO BankAccounts VALUES (101, 'Aarav', 5000.00), (102, 'Diya', 2000.00);

-- Fund Transfer Transaction: Transfer 1500 from Aarav to Diya
BEGIN TRANSACTION;

-- Step 1: Deduct from Aarav
UPDATE BankAccounts SET balance = balance - 1500 WHERE acc_no = 101;

SAVEPOINT DebitDone;

-- Step 2: Add to Diya
UPDATE BankAccounts SET balance = balance + 1500 WHERE acc_no = 102;

-- Check constraint: Ensure Aarav balance is not negative
-- If system detects error: ROLLBACK TO DebitDone; or full ROLLBACK;
-- If successful:
COMMIT;

SELECT * FROM BankAccounts;`,
    output: `-- BankAccounts after successful COMMIT:
-- acc_no | holder | balance
--   101  | Aarav  | 3500.00
--   102  | Diya   | 3500.00
-- Total Money Invariant Preserved: $7000.00 before and after transaction!`,
    explanationPoints: [
      'Atomicity: Either both debit and credit succeed, or both are aborted. If system crashes after Step 1, the recovery manager uses Undo logs to roll back the debit.',
      'Consistency: Sum of balances ($7000) remains constant; foreign key and check constraints are verified.',
      'Isolation: Concurrent transactions cannot observe the intermediate state where $1500 was deducted from Aarav but not yet credited to Diya.',
      'Durability: Once COMMIT executes, updates reside in non-volatile write-ahead log files on disk.'
    ],
    traceTable: {
      headers: ['Concurrency Anomaly', 'Description', 'SQL Isolation Level Preventing It'],
      rows: [
        ['Dirty Read', 'T2 reads uncommitted modifications made by T1 (which may abort)', 'Read Committed'],
        ['Non-Repeatable Read', 'T1 re-reads the same row and discovers values were modified by T2', 'Repeatable Read'],
        ['Phantom Read', 'T1 re-executes range query and discovers newly inserted rows', 'Serializable']
      ]
    },
    examNote: 'Write down the 4 SQL Isolation Levels in ascending order of strictness: (1) Read Uncommitted, (2) Read Committed, (3) Repeatable Read, (4) Serializable.',
    vivaTrap: 'Viva Trap: "Why is Serializable isolation not used by default in all production databases?" Answer: Serializable isolation requires heavy lock contention or optimistic aborts, drastically reducing database concurrency and transaction throughput.'
  },
  {
    id: 'dbms-long-6',
    qNumber: 'Q6',
    title: 'Two-Phase Locking (2PL) Concurrency Protocol: Basic, Strict & Rigorous 2PL',
    marks: 5,
    category: 'classes',
    concept: 'Two-Phase Locking (2PL) is a concurrency control protocol that guarantees conflict serializability. A transaction must acquire locks in a Growing Phase and release locks in a Shrinking Phase without acquiring any new locks after its first release.',
    requirements: [
      'Explain Phase 1 (Growing Phase: acquiring Shared (S) and Exclusive (X) locks)',
      'Explain Lock Point (the exact moment maximum locks are held)',
      'Explain Phase 2 (Shrinking Phase: releasing locks)',
      'Differentiate Basic 2PL vs Strict 2PL vs Rigorous 2PL',
      'Explain cascading rollbacks under Basic 2PL'
    ],
    code: `// Two-Phase Locking (2PL) Protocol Rules:
//
// 1. BASIC 2PL:
// - Growing Phase: Transaction may obtain locks, but may not release any lock.
// - Shrinking Phase: Transaction may release locks, but may not obtain any new lock.
// - Problem: Can suffer from Cascading Aborts (Cascading Rollbacks)!
//
// 2. STRICT 2PL:
// - Growing Phase: Same as Basic 2PL.
// - Shrinking Phase: All EXCLUSIVE (X) locks held by transaction must be retained 
//   until the transaction COMMITS or ABORTS!
// - Benefit: Completely eliminates Cascading Rollbacks!
//
// 3. RIGOROUS 2PL:
// - All locks (Both Shared S-locks AND Exclusive X-locks) must be retained 
//   until the transaction COMMITS or ABORTS.
// - Benefit: Serializability order matches exact transaction commit order.`,
    output: `Basic 2PL: Guarantees Conflict Serializability, but vulnerable to Cascading Aborts
Strict 2PL: Guarantees Conflict Serializability + Strictness (No Cascading Aborts)
Rigorous 2PL: Industry standard in enterprise relational databases`,
    explanationPoints: [
      'Lock Compatibility Matrix: Shared locks (S) are compatible with other S-locks (multiple readers). Exclusive locks (X) are mutually exclusive with all other locks (single writer).',
      'Lock Point: The moment when a transaction obtains its last lock. The serialization order of transactions in 2PL corresponds exactly to their lock points.',
      'Cascading Abort in Basic 2PL: If T1 releases an X-lock early and then aborts, any transaction T2 that read T1 uncommitted data must also be forcibly aborted.',
      'Deadlock Vulnerability: 2PL does NOT prevent deadlocks! Two transactions can easily enter a cyclic wait while acquiring locks during their growing phase.'
    ],
    traceTable: {
      headers: ['Lock Requested', 'Held Lock: Shared (S)', 'Held Lock: Exclusive (X)'],
      rows: [
        ['Shared (S) Lock', 'GRANTED (Concurrent reads permitted)', 'WAIT (Writer holds exclusive access)'],
        ['Exclusive (X) Lock', 'WAIT (Readers currently active)', 'WAIT (Writer currently active)']
      ]
    },
    examNote: 'Always state in exams: 2PL guarantees Conflict Serializability, but does NOT guarantee deadlock-free execution!',
    vivaTrap: 'Viva Trap: "Does 2PL prevent deadlocks?" Answer: No! 2PL guarantees serializability, but deadlocks can and do occur. Deadlocks must be handled separately via timeout, Wait-For-Graphs, or Wait-Die schemes.'
  },
  {
    id: 'dbms-long-7',
    qNumber: 'Q7',
    title: 'PL/SQL Stored Procedures & Functions with Explicit Cursor Loops and Exceptions',
    marks: 5,
    category: 'classes',
    concept: 'PL/SQL (Procedural Language/SQL) combines the declarative power of SQL with procedural programming constructs (loops, conditions, variables, exception handling). Explicit cursors manage row-by-row query processing.',
    requirements: [
      'Declare explicit cursor with SELECT query',
      'Cursor lifecycle: OPEN, FETCH ... INTO, %NOTFOUND check, CLOSE',
      'Implement business logic (salary bonus adjustment)',
      'Exception block handling NO_DATA_FOUND and OTHERS'
    ],
    code: `-- PL/SQL Stored Procedure with Explicit Cursor:
CREATE OR REPLACE PROCEDURE ProcessDepartmentBonus (
    p_dept_id IN INT,
    p_bonus_percent IN DECIMAL
) 
IS
    -- 1. Declare Cursor and Local Variables
    CURSOR emp_cursor IS 
        SELECT emp_id, name, salary 
        FROM Employees 
        WHERE dept_id = p_dept_id;

    v_emp_id   Employees.emp_id%TYPE;
    v_name     Employees.name%TYPE;
    v_salary   Employees.salary%TYPE;
    v_new_sal  Employees.salary%TYPE;
    v_count    INT := 0;

BEGIN
    -- 2. Open Cursor
    OPEN emp_cursor;
    DBMS_OUTPUT.PUT_LINE('Starting Bonus Processing for Dept ' || p_dept_id);

    -- 3. Loop and Fetch Rows
    LOOP
        FETCH emp_cursor INTO v_emp_id, v_name, v_salary;
        EXIT WHEN emp_cursor%NOTFOUND;

        v_new_sal := v_salary + (v_salary * (p_bonus_percent / 100));

        UPDATE Employees 
        SET salary = v_new_sal 
        WHERE emp_id = v_emp_id;

        DBMS_OUTPUT.PUT_LINE('Updated ' || v_name || ': ' || v_salary || ' -> ' || v_new_sal);
        v_count := v_count + 1;
    END LOOP;

    -- 4. Close Cursor
    CLOSE emp_cursor;
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Completed. Total Employees Updated: ' || v_count);

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Error: Department has no employee records.');
        IF emp_cursor%ISOPEN THEN CLOSE emp_cursor; END IF;
        ROLLBACK;
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Unexpected Error: ' || SQLERRM);
        IF emp_cursor%ISOPEN THEN CLOSE emp_cursor; END IF;
        ROLLBACK;
END ProcessDepartmentBonus;
/`,
    output: `Procedure created successfully.
Execution:
EXEC ProcessDepartmentBonus(10, 10.0);
Starting Bonus Processing for Dept 10
Updated Aarav: 50000 -> 55000
Updated Meera: 60000 -> 66000
Completed. Total Employees Updated: 2`,
    explanationPoints: [
      'Explicit Cursor Lifecycle: (1) DECLARE cursor, (2) OPEN cursor (allocates private SQL memory work area), (3) FETCH row into variables, (4) EXIT WHEN %NOTFOUND, (5) CLOSE cursor (frees memory).',
      '%TYPE Anchor: Inherits the exact data type and precision from database table column at runtime, preventing type mismatch bugs if schema alters.',
      'Exception Handling: Guarantees that unhandled database errors trigger an explicit ROLLBACK and close open cursor handles to prevent memory leaks.'
    ],
    examNote: 'Remember cursor attributes for exams: %FOUND, %NOTFOUND, %ROWCOUNT, and %ISOPEN.',
    vivaTrap: 'Viva Trap: "What is the difference between a Stored Procedure and a Function?" Answer: A Function MUST return a value using the RETURN keyword and can be called directly inside a SQL SELECT statement; a Procedure does not require a return value and is executed as an independent standalone statement.'
  },
  {
    id: 'dbms-long-8',
    qNumber: 'Q8',
    title: 'PL/SQL Database Triggers: Row-Level BEFORE UPDATE Audit Log Tracking',
    marks: 5,
    category: 'classes',
    concept: 'A Trigger is a compiled PL/SQL block that is automatically executed (fired) by the DBMS in response to specific events (INSERT, UPDATE, DELETE) on a table. Row-level triggers use :OLD and :NEW pseudorecords.',
    requirements: [
      'Create EmployeeAudit audit history table',
      'Create BEFORE UPDATE trigger FOR EACH ROW',
      'Prevent salary reduction via RAISE_APPLICATION_ERROR',
      'Log user, timestamp, old salary, and new salary into audit table'
    ],
    code: `-- Audit Log Table Setup:
CREATE TABLE SalaryAuditLog (
    audit_id INT AUTO_INCREMENT PRIMARY KEY,
    emp_id INT,
    old_salary DECIMAL(10,2),
    new_salary DECIMAL(10,2),
    changed_by VARCHAR(50),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Row-Level BEFORE UPDATE Trigger:
CREATE OR REPLACE TRIGGER trg_AuditEmployeeSalary
BEFORE UPDATE OF salary ON Employees
FOR EACH ROW
BEGIN
    -- Business Rule: Salary cannot be decreased!
    IF :NEW.salary < :OLD.salary THEN
        RAISE_APPLICATION_ERROR(-20001, 'Violation: Employee salary cannot be decreased!');
    END IF;

    -- Record Audit Trail
    INSERT INTO SalaryAuditLog (emp_id, old_salary, new_salary, changed_by, changed_at)
    VALUES (:OLD.emp_id, :OLD.salary, :NEW.salary, USER, SYSDATE);
END;
/`,
    output: `-- Test 1: Legal Salary Raise
UPDATE Employees SET salary = 75000 WHERE emp_id = 1;
-- Output: 1 row updated.
-- Audit log captures: emp_id=1, old_salary=50000, new_salary=75000

-- Test 2: Illegal Salary Cut
UPDATE Employees SET salary = 40000 WHERE emp_id = 1;
-- Output: ORA-20001: Violation: Employee salary cannot be decreased!
-- Transaction rolled back automatically!`,
    explanationPoints: [
      'BEFORE vs AFTER: BEFORE triggers execute before data is written to disk, permitting validation and aborting before table mutation. AFTER triggers are used when dependent table references need written data.',
      ':OLD and :NEW: :OLD references values prior to modification; :NEW references incoming proposed values.',
      'FOR EACH ROW: Ensures the trigger fires once for every individual modified row (Row-level Trigger). Without this clause, it fires only once per SQL statement (Statement-level Trigger).'
    ],
    examNote: 'State in exams: In an INSERT trigger, :OLD is NULL. In a DELETE trigger, :NEW is NULL. In an UPDATE trigger, both :OLD and :NEW are available.',
    vivaTrap: 'Viva Trap: "What is a Mutating Table error in PL/SQL triggers?" Answer: Occurs when a row-level trigger attempts to query or update the very same table that is currently undergoing modification by the triggering statement. The table is in a state of flux, so Oracle raises ORA-04091 to prevent reading inconsistent data.'
  },
  {
    id: 'dbms-long-9',
    qNumber: 'Q9',
    title: 'B-Tree vs B+ Tree Indexing Architecture & Search/Insert Splitting Mechanism',
    marks: 5,
    category: 'classes',
    concept: 'B-Trees and B+ Trees are self-balancing multi-way search trees designed specifically for block storage systems (disks and SSDs). A B+ Tree stores all actual data records strictly in leaf nodes linked as a sequential linked list, keeping internal nodes solely as routing routers.',
    requirements: [
      'Explain B-Tree node structure (stores keys AND data pointers at all levels)',
      'Explain B+ Tree node structure (internal nodes store only search keys; leaf nodes store data and next leaf pointer)',
      'Explain node splitting on insertion overflow (exceeding M - 1 keys)',
      'Compare range query efficiency (B+ Tree linked list leaf scan vs B-Tree tree traversals)'
    ],
    code: `// B+ Tree Specifications of Order M = 4:
// - Every node has at most M = 4 children.
// - Every internal node (except root) has at least ceil(M / 2) = 2 children.
// - Root has at least 2 children (if not a leaf).
// - All leaves appear at the EXACT same depth (perfect balance).

// Leaf Node Structure:
// [ Key 10 | Key 20 | Key 30 ] -> NextLeafPointer ---> [ Key 40 | Key 50 | Key 60 ]

// Range Query: Find all salaries between 25000 and 80000:
// 1. Search root and internal nodes to locate leaf containing 25000 (O(log M N)).
// 2. Traversal does NOT backtrack up the tree! It simply follows NextLeafPointer 
//    sequentially along the bottom linked list until 80000 is reached!`,
    output: `B-Tree: Data pointers stored at root, internal, and leaf levels.
B+ Tree: Internal nodes store ONLY keys -> Far higher fanout (higher M) -> Lower tree height!
Leaf Level: Doubly linked list enables lightning-fast range scans ($O(\\log N + K)$).`,
    explanationPoints: [
      'High Fanout: Because internal nodes in B+ Trees do not store bulky data pointers, hundreds of keys fit in a single 4KB disk page (Fanout M > 100). Tree height rarely exceeds 3 or 4 levels even for millions of records.',
      'Consistent Search Time: In B-Trees, search time varies (can hit at root). In B+ Trees, EVERY search must traverse from root to leaf, providing completely predictable latency.',
      'Range Query Superiority: B-Trees require expensive recursive Inorder traversals across disk pages. B+ Trees simply walk the horizontal leaf linked list like an array.',
      'Node Split: When an internal node overflows (contains M keys), the middle key is promoted upward to the parent node, splitting the node into two halves.'
    ],
    traceTable: {
      headers: ['Feature', 'B-Tree', 'B+ Tree'],
      rows: [
        ['Data Pointer Location', 'Stored in all nodes (Root, Internal, Leaves)', 'Stored EXCLUSIVELY in Leaf nodes'],
        ['Internal Node Capacity', 'Lower (wastes space on data pointers)', 'Maximum (stores only keys and child pointers)'],
        ['Tree Height', 'Taller for identical record counts', 'Shallow / Flat (typically 3-4 levels)'],
        ['Leaf Node Interconnect', 'Leaves are independent nodes', 'Leaves are linked as a continuous linked list'],
        ['Range Queries', 'Slow (requires tree traversal with disk seeks)', 'Ultra-fast (linear traversal of leaf linked list)']
      ]
    },
    examNote: 'Always state in exams why virtually ALL database storage engines (MySQL InnoDB, PostgreSQL, SQLite, Oracle) use B+ Trees rather than standard B-Trees: Range queries and shallow tree height.',
    vivaTrap: 'Viva Trap: "Why is a Binary Search Tree (BST) not used for database indexing instead of B+ Trees?" Answer: A BST has a fanout of only 2. For 1 million records, a BST height is log2(1,000,000) ~ 20 levels (requiring 20 separate disk I/O seeks!). A B+ tree with fanout 100 has height log100(1,000,000) = 3 levels (requiring only 3 disk I/O seeks!).'
  },
  {
    id: 'dbms-long-10',
    qNumber: 'Q10',
    title: 'Database Recovery: Write-Ahead Logging (WAL), Checkpoints & ARIES Undo/Redo',
    marks: 5,
    category: 'classes',
    concept: 'Database recovery restores a database to a consistent state following hardware, system, or software crashes. Write-Ahead Logging (WAL) ensures that log records are flushed to non-volatile storage before corresponding dirty data pages are written to disk.',
    requirements: [
      'Explain Write-Ahead Logging (WAL) protocol: Log written to disk BEFORE data pages',
      'Explain Log Record format: <T, X, Old_Val, New_Val>',
      'Explain Checkpointing mechanism to bound recovery log scanning',
      'Explain Analysis, Redo, and Undo phases of the ARIES recovery algorithm'
    ],
    code: `// Write-Ahead Logging (WAL) Rules:
// 1. Before a data page in RAM buffer pool is flushed to disk, 
//    all log records describing updates to that page must be on non-volatile disk.
// 2. Before a transaction commits, all its log records must be on disk.

// Sample Crash Log:
// <T1, start>
// <T1, A, 100, 200>
// <T1, commit>
// <T2, start>
// <T2, B, 50, 80>
// <CHECKPOINT (Active: T2)>
// <T2, C, 70, 90>
// <T3, start>
// <T3, D, 30, 40>
// *** SYSTEM CRASH OCCURS HERE! ***

// Recovery Analysis:
// 1. T1: Committed before crash -> REDO (Value A remains 200)
// 2. T2: Active at crash (no commit) -> UNDO (Rollback C=70, B=50)
// 3. T3: Active at crash (no commit) -> UNDO (Rollback D=30)`,
    output: `Recovery Execution:
1. Analysis Phase: Identifies active uncommitted transactions (T2, T3) and dirty pages.
2. Redo Phase: Replays all updates forward from checkpoint to reconstruct crash state.
3. Undo Phase: Scans backward, undoing uncommitted transactions (T3, T2) to restore consistency.`,
    explanationPoints: [
      'Checkpoints: Without checkpoints, the recovery manager would have to scan the entire log file from the beginning of time. A checkpoint flushes dirty buffers and records active transactions, allowing recovery to safely ignore logs before the checkpoint.',
      'Redo (Repeat History): Ensures Durability. Re-applies changes of committed transactions that were still sitting in volatile RAM buffers during the crash.',
      'Undo: Ensures Atomicity. Reverts partial modifications of in-flight transactions that aborted due to the crash by restoring Old_Val.'
    ],
    examNote: 'Write down the WAL rule in exams: "Never write dirty data to disk before the log is flushed, and never commit before the commit log record is flushed."',
    vivaTrap: 'Viva Trap: "What is an Idempotent recovery operation?" Answer: An operation that produces the exact same outcome whether executed once or executed multiple times. Redo and Undo operations must be idempotent so that if the system crashes AGAIN during recovery, restarting recovery does not corrupt the database.'
  },
  {
    id: 'dbms-long-11',
    qNumber: 'Q11',
    title: 'Deadlock Detection (Wait-For-Graph) and Deadlock Prevention (Wait-Die vs Wound-Wait)',
    marks: 5,
    category: 'classes',
    concept: 'A Deadlock occurs when two or more transactions are in a simultaneous circular wait, each holding a lock that the other requires to proceed. Deadlocks can be prevented using timestamps or detected via Wait-For-Graphs.',
    requirements: [
      'Construct Wait-For-Graph (WFG) where directed edge Ti -> Tj means Ti waits for lock held by Tj',
      'Explain Deadlock Detection: Periodic cycle detection algorithm in WFG',
      'Explain Deadlock Prevention: Wait-Die scheme (Non-preemptive based on timestamps)',
      'Explain Deadlock Prevention: Wound-Wait scheme (Preemptive based on timestamps)'
    ],
    code: `// Deadlock Prevention Schemes based on Transaction Timestamps TS(T):
// (Older transaction has SMALLER timestamp: TS(T_old) < TS(T_new))
//
// 1. WAIT-DIE SCHEME (Non-Preemptive):
// When Ti requests a data item currently locked by Tj:
// - If TS(Ti) < TS(Tj) [Ti is OLDER]: Ti is allowed to WAIT.
// - If TS(Ti) > TS(Tj) [Ti is YOUNGER]: Ti DIES (aborts and restarts with original TS).
// "Old waits for young; Young dies if it challenges old."
//
// 2. WOUND-WAIT SCHEME (Preemptive):
// When Ti requests a data item currently locked by Tj:
// - If TS(Ti) < TS(Tj) [Ti is OLDER]: Ti WOUNDS Tj! (Tj is preempted/aborted and releases lock).
// - If TS(Ti) > TS(Tj) [Ti is YOUNGER]: Ti is allowed to WAIT.
// "Old wounds young; Young waits for old."`,
    output: `Wait-For-Graph Detection: Cyclic graph indicates deadlock -> Victim selection based on rollback cost.
Wait-Die: Older transactions wait; younger abort -> Higher abort count.
Wound-Wait: Older transactions preempt; younger wait -> Lower abort count, fewer restarts.`,
    explanationPoints: [
      'Wait-For-Graph Cycle: If T1 waits for T2, T2 waits for T3, and T3 waits for T1, a cycle T1 -> T2 -> T3 -> T1 exists. The DBMS must pick a "Victim" transaction to abort and roll back.',
      'Victim Selection Criteria: Pick transaction with minimum CPU time consumed, fewest rows modified, and lowest rollback cost.',
      'Starvation Prevention: When a transaction is aborted and rolled back by Wait-Die or Wound-Wait, it must retain its ORIGINAL timestamp so it gradually becomes the oldest transaction and is guaranteed to complete.'
    ],
    traceTable: {
      headers: ['Scheme', 'Older Transaction Requests Locked Item', 'Younger Transaction Requests Locked Item'],
      rows: [
        ['Wait-Die (Non-preemptive)', 'Ti (Old) WAITS for Tj (Young)', 'Ti (Young) DIES (Aborts)'],
        ['Wound-Wait (Preemptive)', 'Ti (Old) WOUNDS Tj (Young preempted)', 'Ti (Young) WAITS for Tj (Old)']
      ]
    },
    examNote: 'Wound-Wait generally outperforms Wait-Die in real databases because older transactions preempt younger ones immediately rather than dying repeatedly.',
    vivaTrap: 'Viva Trap: "Why does assigning a NEW timestamp to a restarted transaction cause starvation?" Answer: If a transaction gets a new timestamp upon aborting, it will always remain the "youngest" transaction, causing it to be repeatedly killed by newer transactions and never finish!'
  },
  {
    id: 'dbms-long-12',
    qNumber: 'Q12',
    title: 'Database Security & Authorization: SQL GRANT and REVOKE with Cascading Effects',
    marks: 5,
    category: 'classes',
    concept: 'Database security enforces Access Control to ensure only authenticated users can perform authorized actions on specific database tables and views. Privileges are granted and revoked using SQL DCL commands.',
    requirements: [
      'Explain System Privileges (CREATE TABLE, ALTER DATABASE) vs Object Privileges (SELECT, UPDATE, DELETE)',
      'Explain WITH GRANT OPTION (delegation of authorization rights)',
      'Demonstrate cascading revocation when privileges are revoked from an intermediate grantor',
      'Explain Role-Based Access Control (RBAC)'
    ],
    code: `-- 1. DBA creates user and grants table creation privilege
CREATE USER 'analyst_rohit'@'localhost' IDENTIFIED BY 'Pass123';
GRANT CREATE SESSION, CREATE TABLE TO 'analyst_rohit'@'localhost';

-- 2. Granting Object Privileges with Delegation Capability
GRANT SELECT, INSERT ON Employees TO 'analyst_rohit'@'localhost' 
WITH GRANT OPTION;

-- 3. Rohit grants privilege to Junior Intern Sneha:
-- (Executed by Rohit)
GRANT SELECT ON Employees TO 'intern_sneha'@'localhost';

-- 4. Revoking privilege from Rohit:
-- (Executed by DBA)
REVOKE SELECT ON Employees FROM 'analyst_rohit'@'localhost' CASCADE;

-- Consequence of CASCADE:
-- Because Rohit's privilege was revoked, all privileges that Rohit granted 
-- to intern_sneha are AUTOMATICALLY revoked as well!`,
    output: `Privilege Hierarchy:
DBA ===(WITH GRANT OPTION)===> Rohit ===(GRANT)===> Sneha
When DBA revokes from Rohit with CASCADE:
Rohit LOSES privilege. Sneha LOSES privilege automatically!`,
    explanationPoints: [
      'Object Privileges: Control operations on specific database relations: SELECT, INSERT, UPDATE, DELETE, REFERENCES.',
      'WITH GRANT OPTION: Bestows the recipient the authority to pass the privilege on to third-party users.',
      'Cascading Revoke (CASCADE): Avoids orphaned permissions. When User A loses a privilege, all users who derived that privilege from A lose it recursively.',
      'RESTRICT Option: Rejects the REVOKE statement if revoking would cause cascading revocations to other users.'
    ],
    examNote: 'Write down the Role-Based Access Control (RBAC) syntax: CREATE ROLE Manager; GRANT SELECT, UPDATE ON Accounts TO Manager; GRANT Manager TO User1, User2.',
    vivaTrap: 'Viva Trap: "What happens if User B received SELECT from User A, but ALSO received SELECT from User C, and User A privilege is revoked?" Answer: User B RETAINS the SELECT privilege! The privilege is only revoked if ALL derivation paths in the authorization graph are eliminated.'
  },
  {
    id: 'dbms-long-13',
    qNumber: 'Q13',
    title: 'Relational Algebra Formal Operations: Selection, Projection, Cartesian Product, Join & Division',
    marks: 5,
    category: 'classes',
    concept: 'Relational Algebra is a procedural formal query language providing the theoretical mathematical foundation for relational databases and SQL query execution plans.',
    requirements: [
      'Selection (sigma): Horizontal filtering of tuples satisfying predicate',
      'Projection (pi): Vertical extraction of specified attribute columns (eliminates duplicates)',
      'Cartesian Product (X) and Natural Join (bowtie)',
      'Set Operations: Union (cup), Intersection (cap), Set Difference (-)',
      'Division Operator (div): Finding items related to ALL elements of a set'
    ],
    code: `// Relational Algebra Mathematical Expressions:
//
// 1. SELECTION (sigma):
// Query: Find all employees in Department 10 with Salary > 50000:
// sigma_{dept_id = 10 AND salary > 50000}(Employees)
// SQL: SELECT * FROM Employees WHERE dept_id = 10 AND salary > 50000;
//
// 2. PROJECTION (pi):
// Query: List names and salaries of all employees:
// pi_{name, salary}(Employees)
// SQL: SELECT DISTINCT name, salary FROM Employees; (Relational algebra removes duplicates!)
//
// 3. NATURAL JOIN (bowtie):
// Employees bowtie_{dept_id = dept_id} Departments
// SQL: SELECT * FROM Employees NATURAL JOIN Departments;
//
// 4. DIVISION (div):
// Query: Find students who have taken ALL courses offered by Computer Science:
// Let R = pi_{roll_no, course_id}(Enrollment)
// Let S = pi_{course_id}(sigma_{dept = 'CS'}(Course))
// Result = R div S`,
    output: `Relational Algebra -> SQL Equivalence:
sigma (Selection)    <===> WHERE clause
pi (Projection)      <===> SELECT DISTINCT clause
bowtie (Natural Join)<===> INNER JOIN ... ON
div (Division)       <===> NOT EXISTS (correlated nested subqueries)`,
    explanationPoints: [
      'Fundamental Operators: The 5 core operators are Selection, Projection, Cartesian Product, Union, and Set Difference. All other operators (Join, Intersection, Division) can be derived from these 5.',
      'Closure Property: Every relational algebra operator takes one or more relations as input and produces a NEW relation as output, enabling nested query composition.',
      'Division Semantics: Used for "for-all" queries (e.g., customers who bought ALL products, pilots certified for ALL aircraft).'
    ],
    examNote: 'Remember: Relational Algebra is a PURE SET language. Projections AUTOMATICALLY remove duplicate tuples, whereas standard SQL SELECT retains duplicates unless DISTINCT is explicitly stated.',
    vivaTrap: 'Viva Trap: "Why does SQL SELECT allow duplicates while Relational Algebra projection does not?" Answer: Eliminating duplicates requires sorting or hashing, which is computationally expensive (O(n log n)). SQL defaults to multiset (bag) semantics for performance.'
  },
  {
    id: 'dbms-long-14',
    qNumber: 'Q14',
    title: 'Query Optimization & Heuristic Relational Algebra Expression Tree Transformation',
    marks: 5,
    category: 'classes',
    concept: 'A Query Optimizer parses SQL queries into relational algebra trees and applies equivalence transformation rules to find an execution plan that minimizes disk I/O, memory consumption, and intermediate tuple generation.',
    requirements: [
      'Rule 1: Push Selections (sigma) down the query tree as deep as possible',
      'Rule 2: Push Projections (pi) down to discard unused attributes early',
      'Rule 3: Replace Cartesian Products followed by Selection with Joins',
      'Demonstrate cost reduction on unoptimized vs optimized query tree'
    ],
    code: `-- Unoptimized SQL:
SELECT e.name, d.dept_name
FROM Employees e, Departments d
WHERE e.dept_id = d.dept_id AND e.salary > 80000 AND d.location = 'Baroda';

-- Unoptimized Execution Tree:
-- 1. Full Cartesian Product: Employees (100,000 rows) X Departments (100 rows) 
--    = 10,000,000 intermediate tuples!
-- 2. Filter e.salary > 80000 AND d.location = 'Baroda'
-- 3. Filter e.dept_id = d.dept_id
-- 4. Project name, dept_name

-- HEURISTICALLY OPTIMIZED EXECUTION TREE:
-- 1. Push Selection: Filter Employees: sigma_{salary > 80000}(Employees) -> 1,000 rows
-- 2. Push Selection: Filter Departments: sigma_{location = 'Baroda'}(Departments) -> 5 rows
-- 3. Join the small filtered subsets: (1,000 rows) JOIN (5 rows) = 50 rows!
-- 4. Intermediate tuples created: Only 50 rows instead of 10,000,000 rows!
-- Speedup: Over 1000x reduction in memory and disk buffer cost!`,
    output: `Unoptimized Intermediate Rows: 10,000,000 tuples
Optimized Intermediate Rows: 50 tuples
Performance Gain: 200,000x reduction in intermediate data materialization!`,
    explanationPoints: [
      'Selection Pushdown: Performing selections before joins reduces the cardinalities of inputs to join operators, slashing join comparison costs.',
      'Projection Pushdown: Eliminating unneeded columns reduces row width and disk buffer footprint.',
      'Join Ordering: Join smallest relations first to keep intermediate results small.',
      'Cost-Based Optimization (CBO): Modern engines use database catalog statistics (histograms, table row counts) to pick between Hash Join, Nested Loop Join, and Merge Join.'
    ],
    examNote: 'Draw both Relational Algebra Trees in exams: Unoptimized has Cartesian Product at base; Optimized has Selections applied directly above base relations.',
    vivaTrap: 'Viva Trap: "When would a Nested Loop Join be faster than a Hash Join?" Answer: When one relation is extremely small (e.g. 5 rows) and the inner relation has an index on the join key, Nested Loop Join executes in O(1) time without the memory allocation overhead of building a hash table.'
  },
  {
    id: 'dbms-long-15',
    qNumber: 'Q15',
    title: 'Correlated Subqueries vs Non-Correlated Subqueries with EXISTS and IN',
    marks: 5,
    category: 'classes',
    concept: 'A Non-Correlated subquery executes exactly once independently of the outer query. A Correlated Subquery references columns from the outer query, evaluating repeatedly for every candidate row processed by the outer query.',
    requirements: [
      'Explain Non-Correlated Subquery with IN',
      'Explain Correlated Subquery with EXISTS',
      'Query: Find employees earning more than the average salary of their own department',
      'Performance comparison and optimizer unnesting'
    ],
    code: `-- 1. NON-CORRELATED SUBQUERY:
-- Subquery executes ONCE and returns a static set of department IDs:
SELECT name, salary 
FROM Employees 
WHERE dept_id IN (SELECT dept_id FROM Departments WHERE location = 'Vadodara');

-- 2. CORRELATED SUBQUERY:
-- Subquery references outer table column 'e.dept_id' and executes per outer row:
SELECT e.name, e.department, e.salary
FROM Employees e
WHERE e.salary > (
    SELECT AVG(sub.salary)
    FROM Employees sub
    WHERE sub.department = e.department -- Correlation link!
);`,
    output: `-- Correlated Query Result:
-- Displays employees who are top earners within their SPECIFIC departmental peer group:
-- name    | department | salary
-- Vikram  | Tech       | 95000 (Dept Tech Avg was 72000)
-- Sneha   | Sales      | 85000 (Dept Sales Avg was 61000)`,
    explanationPoints: [
      'Non-Correlated Execution: Evaluated once up front; results are cached in an internal temporary table or hash set.',
      'Correlated Execution: Evaluated N times (once for each of the N rows of the outer query). If outer table has 10,000 rows, subquery runs 10,000 times unless unnested.',
      'EXISTS Optimization: Returns TRUE as soon as the FIRST matching row is discovered, short-circuiting without scanning the rest of the table.',
      'Query Unnesting: Modern query optimizers automatically rewrite correlated subqueries into equivalent window functions or JOINs for single-pass execution.'
    ],
    examNote: 'Always state in exams: EXISTS tests for the existence of rows and stops on the first match; IN compares against the full set of returned values.',
    vivaTrap: 'Viva Trap: "Why is SELECT 1 preferred over SELECT * inside an EXISTS subquery?" Answer: Although modern optimizers optimize both identically, SELECT 1 emphasizes that the projection list is completely ignored by EXISTS; it checks solely for row presence.'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// PART C: 18 3-MARK THEORY QUESTIONS WITH COMPARISON TABLES & DIAGRAMS
// ─────────────────────────────────────────────────────────────────────────────
export const DBMS_THEORY_QUESTIONS: TheoryQuestion[] = [
  {
    id: 'dbms-th-1',
    qNumber: 1,
    title: 'DBMS vs Traditional File Processing System',
    marks: 3,
    category: 'Architecture',
    definition: 'A File Processing System stores data in independent operating system files managed by application programs. A DBMS is a centralized software system coordinating access, integrity, security, and concurrency across shared data.',
    usesOrRules: [
      { title: 'Redundancy', explanation: 'File systems suffer from duplicate data across files. DBMS enforces centralized single-source storage.' },
      { title: 'Crash Recovery', explanation: 'File systems leave data corrupted if a power outage occurs during write. DBMS guarantees ACID rollback.' }
    ],
    comparisonTable: {
      headers: ['Dimension', 'File Processing System', 'Database Management System (DBMS)'],
      rows: [
        ['Data Redundancy', 'High (same customer details duplicated across files)', 'Minimal (centralized normalized storage)'],
        ['Data Independence', 'None (file structure changes break application code)', 'High (Physical and Logical data independence)'],
        ['Concurrent Access', 'Poor (causes lost updates and file locks)', 'Robust (Multi-user ACID concurrency control)'],
        ['Data Integrity', 'Hardcoded in program logic (easily bypassed)', 'Enforced by engine constraints (PK, FK, CHECK)'],
        ['Security & Recovery', 'Basic OS file permissions; no crash recovery', 'Fine-grained SQL GRANT/REVOKE; WAL recovery']
      ]
    },
    examTip: 'Cite the 3 main anomalies of file systems: Data Redundancy, Data Inconsistency, and Program-Data Dependence.',
    diagram: `File System: [App 1] -> [File A] | [App 2] -> [File B] (Data duplicated!)
DBMS:        [App 1] & [App 2] ===> [DBMS Engine] ===> [Central Database]`
  },
  {
    id: 'dbms-th-2',
    qNumber: 2,
    title: 'Physical Data Independence vs Logical Data Independence',
    marks: 3,
    category: 'Three-Schema Architecture',
    definition: 'Data Independence is the ability to modify schema definitions at one level without altering the schema at the next higher level in the ANSI/SPARC 3-schema architecture.',
    usesOrRules: [
      { title: 'Logical Independence', explanation: 'Modifying conceptual schema (adding columns/tables) without breaking external user views.' },
      { title: 'Physical Independence', explanation: 'Modifying physical storage (adding indexes, moving to SSD) without altering conceptual tables.' }
    ],
    comparisonTable: {
      headers: ['Feature', 'Physical Data Independence', 'Logical Data Independence'],
      rows: [
        ['Schema Levels Involved', 'Between Internal (Physical) and Conceptual levels', 'Between Conceptual and External (View) levels'],
        ['Modifications Allowed', 'Changing storage devices, B+ tree indexes, hashing', 'Adding new attributes, decomposing tables'],
        ['Impact on Queries', 'Zero impact on application SQL queries', 'Zero impact on existing user views / reports'],
        ['Implementation Difficulty', 'Easier to achieve (standard DBMS feature)', 'Extremely difficult to achieve in practice']
      ]
    },
    examTip: 'Logical data independence is harder to achieve because changing entity relationships often necessitates updates to existing application views.',
    diagram: `[External Views] 
       ^ (Logical Data Independence)
[Conceptual Schema: Tables & Relations]
       ^ (Physical Data Independence)
[Internal Schema: B+ Trees, Storage Blocks, Disk]`
  },
  {
    id: 'dbms-th-3',
    qNumber: 3,
    title: 'Primary Key vs Candidate Key vs Super Key vs Unique Key',
    marks: 3,
    category: 'Relational Model',
    definition: 'Keys are attribute sets that uniquely identify tuples in a relation.',
    usesOrRules: [
      { title: 'Super Key', explanation: 'Any set of attributes that uniquely identifies a row (may contain redundant attributes).' },
      { title: 'Candidate Key', explanation: 'A minimal Super Key (no proper subset can uniquely identify the tuple).' },
      { title: 'Primary Key', explanation: 'The single candidate key chosen by the database designer to uniquely identify rows.' },
      { title: 'Unique Key', explanation: 'Enforces uniqueness but allows a single NULL value.' }
    ],
    comparisonTable: {
      headers: ['Key Type', 'Definition', 'NULL Permitted?', 'Count per Table'],
      rows: [
        ['Super Key', 'Any attribute set that uniquely identifies a row', 'Allowed (as long as row is unique)', 'Multiple'],
        ['Candidate Key', 'Minimal Super Key with zero redundant attributes', 'Cannot contain NULL if chosen as PK', 'One or more'],
        ['Primary Key', 'Selected candidate key representing entity', 'Strictly NOT NULL', 'Exactly ONE'],
        ['Unique Key', 'Alternate candidate key constraint', 'Allows exactly ONE NULL value in SQL', 'Multiple']
      ]
    },
    examTip: 'Every Candidate Key is a Super Key, but not every Super Key is a Candidate Key!',
    diagram: `[ Super Keys (Broadest set: {ID}, {ID, Name}, {ID, Email}) ]
     v
[ Candidate Keys (Minimal: {ID}, {Email}) ]
     v
[ Primary Key (Selected: {ID}) ]`
  },
  {
    id: 'dbms-th-4',
    qNumber: 4,
    title: 'DDL vs DML vs DCL vs TCL Commands in SQL',
    marks: 3,
    category: 'SQL Architecture',
    definition: 'SQL statements are categorized into 4 sub-languages based on whether they define structure, manipulate data, control permissions, or manage transactions.',
    usesOrRules: [
      { title: 'DDL', explanation: 'Data Definition Language defines schema structure (CREATE, ALTER, DROP, TRUNCATE).' },
      { title: 'DML', explanation: 'Data Manipulation Language manages rows (SELECT, INSERT, UPDATE, DELETE).' },
      { title: 'DCL', explanation: 'Data Control Language manages user permissions (GRANT, REVOKE).' },
      { title: 'TCL', explanation: 'Transaction Control Language manages atomic commits (COMMIT, ROLLBACK, SAVEPOINT).' }
    ],
    comparisonTable: {
      headers: ['Category', 'Full Name', 'Core Commands', 'Auto-Commit?'],
      rows: [
        ['DDL', 'Data Definition Language', 'CREATE, ALTER, DROP, TRUNCATE, RENAME', 'Yes (Implicitly commits transaction)'],
        ['DML', 'Data Manipulation Language', 'SELECT, INSERT, UPDATE, DELETE, MERGE', 'No (Requires explicit COMMIT)'],
        ['DCL', 'Data Control Language', 'GRANT, REVOKE', 'Yes (In most database engines)'],
        ['TCL', 'Transaction Control Language', 'COMMIT, ROLLBACK, SAVEPOINT, SET TRANSACTION', 'Manages commits explicitly']
      ]
    },
    examTip: 'Remember: DDL commands cannot be rolled back in most relational databases because they execute an implicit COMMIT!',
    diagram: `DDL: Shapes the table container
DML: Puts water/data into the container
DCL: Decides who can drink from the container
TCL: Confirms if pouring was successful`
  },
  {
    id: 'dbms-th-5',
    qNumber: 5,
    title: 'DROP vs TRUNCATE vs DELETE Commands',
    marks: 3,
    category: 'SQL Commands',
    definition: 'All three commands remove data, but operate at fundamentally different structural and transaction logging levels.',
    usesOrRules: [
      { title: 'DELETE', explanation: 'DML statement that deletes rows one-by-one, firing triggers and recording individual undo logs.' },
      { title: 'TRUNCATE', explanation: 'DDL statement that deallocates entire table data pages instantly; cannot be filtered with WHERE.' },
      { title: 'DROP', explanation: 'DDL statement that completely destroys both table data AND the table schema from the catalog.' }
    ],
    comparisonTable: {
      headers: ['Feature', 'DELETE', 'TRUNCATE', 'DROP'],
      rows: [
        ['Language Type', 'DML (Data Manipulation)', 'DDL (Data Definition)', 'DDL (Data Definition)'],
        ['WHERE Clause', 'Supported (can delete specific rows)', 'Not Supported (deletes ALL rows)', 'Not Supported (removes whole table)'],
        ['Execution Speed', 'Slow (logs row-by-row deletions)', 'Extremely fast (deallocates pages)', 'Instant (removes catalog entry)'],
        ['Triggers Fired?', 'Yes (fires row-level DELETE triggers)', 'No (bypasses triggers)', 'No'],
        ['Table Structure', 'Preserved (table remains intact)', 'Preserved (empty table remains)', 'Destroyed (table no longer exists)']
      ]
    },
    examTip: 'TRUNCATE resets identity / AUTO_INCREMENT seed values back to 1; DELETE leaves the auto-increment counter where it was.',
    diagram: `DELETE:   Erases individual lines from notebook with eraser (Slow)
TRUNCATE: Tears out all written pages from notebook (Fast)
DROP:     Throws the entire notebook into the fire! (Destroys structure)`
  },
  {
    id: 'dbms-th-6',
    qNumber: 6,
    title: '3NF vs BCNF (Boyce-Codd Normal Form)',
    marks: 3,
    category: 'Normalization',
    definition: 'Both normal forms eliminate transitive functional dependencies. 3NF allows exceptions when the right-hand side is a prime attribute. BCNF strictly enforces that every determinant MUST be a superkey.',
    usesOrRules: [
      { title: '3NF Condition', explanation: 'For every FD X -> Y, either X is a superkey OR Y is a prime attribute.' },
      { title: 'BCNF Condition', explanation: 'For every FD X -> Y, X MUST be a superkey (no exceptions).' }
    ],
    comparisonTable: {
      headers: ['Criterion', 'Third Normal Form (3NF)', 'Boyce-Codd Normal Form (BCNF)'],
      rows: [
        ['Condition on X -> Y', 'X is Superkey OR Y is Prime Attribute', 'X MUST strictly be a Superkey in all cases'],
        ['Handling Overlapping Keys', 'Permits anomalies with overlapping composite keys', 'Eliminates all anomalies with overlapping keys'],
        ['Lossless Join Guarantee', 'Guaranteed', 'Guaranteed'],
        ['Dependency Preservation', 'Always achievable in 3NF', 'Not always achievable in BCNF (tradeoff!)']
      ]
    },
    examTip: 'The classic trade-off: 3NF guarantees dependency preservation; BCNF may lose dependency preservation during decomposition.',
    diagram: `3NF:  X -> Y allowed if Y is part of a candidate key
BCNF: X -> Y STRICTLY requires X to be a superkey`
  },
  {
    id: 'dbms-th-7',
    qNumber: 7,
    title: 'Dense Index vs Sparse Index',
    marks: 3,
    category: 'Indexing',
    definition: 'A Dense Index has an index entry for EVERY single search key value in the database. A Sparse Index has index entries only for some search keys (typically one entry per disk block).',
    usesOrRules: [
      { title: 'Storage Overhead', explanation: 'Dense indexes take more disk space; sparse indexes take significantly less space.' },
      { title: 'Search Speed', explanation: 'Dense index can verify record existence without touching data blocks; sparse requires reading data blocks.' }
    ],
    comparisonTable: {
      headers: ['Attribute', 'Dense Index', 'Sparse Index'],
      rows: [
        ['Index Entry Count', 'One entry for every search key value in table', 'One entry per disk block / cluster'],
        ['Index Storage Space', 'High (larger index file)', 'Low (fits easily in RAM memory)'],
        ['Applicability', 'Can be built on sorted or unsorted tables', 'Requires data file to be strictly SORTED on key'],
        ['Lookup Time', 'Faster direct search', 'Slightly slower (searches block after reaching it)']
      ]
    },
    examTip: 'Sparse indexes can ONLY be constructed on files that are physically sorted on the search key.',
    diagram: `Dense:  [Key 1] -> Rec 1 | [Key 2] -> Rec 2 | [Key 3] -> Rec 3
Sparse: [Key 1] -> Block 1 [Rec 1, Rec 2] | [Key 3] -> Block 2 [Rec 3, Rec 4]`
  },
  {
    id: 'dbms-th-8',
    qNumber: 8,
    title: 'Primary Index vs Clustered Index vs Secondary Index',
    marks: 3,
    category: 'Indexing',
    definition: 'Indexes dictate how data records are ordered and addressed on physical disk blocks.',
    usesOrRules: [
      { title: 'Primary Index', explanation: 'Constructed on an ordered data file using the primary key field.' },
      { title: 'Clustered Index', explanation: 'Constructed on an ordered data file using a non-key (duplicate-allowed) clustering field.' },
      { title: 'Secondary Index', explanation: 'Constructed on an unordered data file or alternate key (points to record pointers).' }
    ],
    comparisonTable: {
      headers: ['Index Type', 'Data File Ordering', 'Indexing Key Unique?', 'Number per Table'],
      rows: [
        ['Primary Index', 'Physically ordered on Key field', 'Yes (Primary Key is unique)', 'At most ONE'],
        ['Clustered Index', 'Physically ordered on Non-Key field', 'No (Can contain duplicate values)', 'At most ONE'],
        ['Secondary Index', 'Data file can be in any arbitrary order', 'Can be Unique or Non-Unique', 'Multiple allowed']
      ]
    },
    examTip: 'A table can have only ONE Clustered/Primary Index because physical disk records can only be sorted in one physical sequence on disk!',
    diagram: `Clustered: Physically determines the exact order of rows on disk
Secondary: Separate lookup index pointing to disk addresses`
  },
  {
    id: 'dbms-th-9',
    qNumber: 9,
    title: 'Conflict Serializability vs View Serializability',
    marks: 3,
    category: 'Transactions',
    definition: 'Both test whether a concurrent schedule is equivalent to a serial schedule. Conflict serializability is based on swapping non-conflicting operations; View serializability is based on identical read/write view relationships.',
    usesOrRules: [
      { title: 'Computational Complexity', explanation: 'Testing Conflict Serializability takes O(V + E) time via cycle detection. Testing View Serializability is NP-Complete.' },
      { title: 'Blind Writes', explanation: 'View serializability permits blind writes (writing without reading first); conflict serializability prohibits them.' }
    ],
    comparisonTable: {
      headers: ['Feature', 'Conflict Serializability', 'View Serializability'],
      rows: [
        ['Equivalence Condition', 'Can transform to serial schedule by swapping non-conflicting ops', 'Same initial read, same final write, same intermediate reads'],
        ['Computational Complexity', 'Polynomial time O(V + E) via Precedence Graph', 'NP-Complete problem'],
        ['Permissiveness', 'Stricter subset of view serializable schedules', 'More permissive (allows blind writes)'],
        ['DBMS Implementation', 'Practical standard (enforced via 2PL)', 'Too complex to enforce in real-time DBMS engines']
      ]
    },
    examTip: 'Every conflict serializable schedule is view serializable, but NOT every view serializable schedule is conflict serializable.',
    diagram: `[ View Serializable Schedules (Contains Blind Writes) ]
       v
[ Conflict Serializable Schedules (Enforced via 2PL) ]`
  },
  {
    id: 'dbms-th-10',
    qNumber: 10,
    title: 'Shared Lock (S-Lock) vs Exclusive Lock (X-Lock)',
    marks: 3,
    category: 'Concurrency Control',
    definition: 'Shared Locks allow multiple transactions to read a data item concurrently. Exclusive Locks grant sole ownership to a single transaction to modify (write) a data item.',
    usesOrRules: [
      { title: 'Compatibility', explanation: 'S-locks are compatible with S-locks. X-locks conflict with both S-locks and other X-locks.' },
      { title: 'Lock Conversion', explanation: 'Upgrading from S to X lock occurs during growing phase; downgrading from X to S occurs in shrinking phase.' }
    ],
    comparisonTable: {
      headers: ['Lock Type', 'Operation Allowed', 'Compatibility with Other Locks', 'Multiple Concurrent Holders?'],
      rows: [
        ['Shared Lock (S)', 'Read Only (no modifications permitted)', 'Compatible with other Shared (S) locks', 'Yes (many readers simultaneously)'],
        ['Exclusive Lock (X)', 'Read AND Write / Modify', 'Incompatible with ALL locks (both S and X)', 'No (strictly one writer at a time)']
      ]
    },
    examTip: 'Draw the 2x2 Lock Compatibility Matrix in your exam paper for instant full marks.',
    diagram: `S-Lock + S-Lock = GRANTED (Parallel Reads)
S-Lock + X-Lock = REJECTED / WAIT (Lock Conflict)
X-Lock + X-Lock = REJECTED / WAIT (Mutually Exclusive)`
  },
  {
    id: 'dbms-th-11',
    qNumber: 11,
    title: 'Theta Join vs Equi Join vs Natural Join',
    marks: 3,
    category: 'Relational Algebra',
    definition: 'Joins combine tuples from two relations based on condition predicates.',
    usesOrRules: [
      { title: 'Theta Join', explanation: 'Uses any general comparison operator (<, <=, =, !=, >, >=).' },
      { title: 'Equi Join', explanation: 'A theta join restricted strictly to equality (=) comparisons.' },
      { title: 'Natural Join', explanation: 'An equi-join over all identically named attributes, automatically projecting out duplicate columns.' }
    ],
    comparisonTable: {
      headers: ['Join Type', 'Operator Used', 'Join Predicate Condition', 'Duplicate Columns Output'],
      rows: [
        ['Theta Join (bowtie_theta)', 'Any comparison (<, <=, =, !=, >, >=)', 'Arbitrary conditional expressions', 'Retains both columns'],
        ['Equi Join', 'Strictly equality (=)', 'Equality on specified attributes', 'Retains both columns'],
        ['Natural Join (bowtie)', 'Implicit equality on common names', 'All identically named columns must match', 'Removes duplicate column automatically']
      ]
    },
    examTip: 'In Natural Join, if two tables have no common attribute names, the natural join degenerates into a Cartesian Product!',
    diagram: `Theta Join:   R.A > S.B (General comparisons)
Equi Join:    R.dept_id = S.dept_id (Both dept_id columns output)
Natural Join: Automatically matches common column name, outputs it ONCE`
  },
  {
    id: 'dbms-th-12',
    qNumber: 12,
    title: 'Static Hashing vs Dynamic Hashing (Extendible Hashing)',
    marks: 3,
    category: 'File Organization',
    definition: 'Static Hashing uses a fixed number of buckets determined in advance by hash function h(k) = k % M. Dynamic (Extendible) Hashing grows and shrinks bucket allocations dynamically using a global directory and local bucket depths.',
    usesOrRules: [
      { title: 'Overflow Buckets', explanation: 'Static hashing degrades into long overflow chains when table expands. Extendible hashing doubles directory size.' },
      { title: 'Directory Depth', explanation: 'Global Depth d determines directory bit count; Local Depth p determines bucket bit count.' }
    ],
    comparisonTable: {
      headers: ['Feature', 'Static Hashing', 'Dynamic / Extendible Hashing'],
      rows: [
        ['Bucket Allocation', 'Fixed number of buckets allocated at creation', 'Buckets allocated on demand dynamically'],
        ['Performance on Growth', 'Degrades (forms long overflow linked chains)', 'Consistent O(1) performance using directory'],
        ['Directory Required?', 'No directory needed', 'Yes (Global Directory of pointers to buckets)'],
        ['Space Utilization', 'Poor (either wasted empty slots or overflow)', 'High (adapts directly to database size)']
      ]
    },
    examTip: 'In Extendible Hashing, when a bucket with Local Depth == Global Depth overflows, the directory doubles in size (Global Depth increments by 1).',
    diagram: `Static:     Bucket[0] -> [Bucket 0 Overflow] -> [Bucket 0 Overflow] (Degrades)
Extendible: Directory [00, 01, 10, 11] -> Splits individual overflowing bucket`
  },
  {
    id: 'dbms-th-13',
    qNumber: 13,
    title: 'Specialization vs Generalization vs Aggregation in ER Modeling',
    marks: 3,
    category: 'Extended ER Modeling',
    definition: 'Enhanced ER (EER) modeling captures object-oriented relationships in database design.',
    usesOrRules: [
      { title: 'Generalization', explanation: 'Bottom-up process combining multiple entity sets with common features into a higher-level entity (Car and Truck generalized to Vehicle).' },
      { title: 'Specialization', explanation: 'Top-down process partitioning a high-level entity into specialized sub-entities (Employee specialized to Engineer and Manager).' },
      { title: 'Aggregation', explanation: 'Treats a relationship between two entities as a higher-level composite entity to participate in further relationships.' }
    ],
    comparisonTable: {
      headers: ['Concept', 'Design Direction', 'Inheritance Structure', 'Primary Motivation'],
      rows: [
        ['Generalization', 'Bottom-Up synthesis', 'Superclass inherits shared attributes', 'Eliminate redundant attribute declarations'],
        ['Specialization', 'Top-Down breakdown', 'Subclasses inherit superclass attributes', 'Model specific subtype attributes'],
        ['Aggregation', 'Relationship Abstraction', 'Relationship treated as an entity', 'Attach another relationship to a relationship']
      ]
    },
    examTip: 'Draw the ISA triangle for Generalization/Specialization and the rectangular bounding box around a relationship for Aggregation.',
    diagram: `Generalization: [Car] & [Truck] =====> [ISA] =====> [Vehicle] (Bottom-Up)
Specialization: [Employee] =====> [ISA] =====> [Engineer] & [Manager] (Top-Down)
Aggregation:    [ (Doctor) ---- Examines ---- (Patient) ] <==== Assigned ====> (Room)`
  },
  {
    id: 'dbms-th-14',
    qNumber: 14,
    title: 'Centralized vs Distributed Database Systems',
    marks: 3,
    category: 'Distributed Databases',
    definition: 'A Centralized DBMS locates all database data and processing on a single server node. A Distributed DBMS stores data across multiple geographically dispersed nodes connected via a computer network.',
    usesOrRules: [
      { title: 'Availability', explanation: 'Centralized has single point of failure; distributed survives node outages via data replication.' },
      { title: 'Consensus Cost', explanation: 'Distributed databases require complex commit protocols (Two-Phase Commit 2PC).' }
    ],
    comparisonTable: {
      headers: ['Feature', 'Centralized DBMS', 'Distributed DBMS'],
      rows: [
        ['Data Location', 'Single physical server site', 'Geographically dispersed server sites'],
        ['Fault Tolerance', 'Low (Single Point of Failure crashes all)', 'High (Node failure isolated via replica failover)'],
        ['Communication Cost', 'Zero network latency for queries', 'Network latency and bandwidth costs'],
        ['Transaction Commit', 'Single local log write', 'Requires distributed consensus (Two-Phase Commit 2PC)'],
        ['Design Complexity', 'Simple schema management', 'Complex fragmentation, replication, and routing']
      ]
    },
    examTip: 'Cite the CAP Theorem for distributed systems: A distributed database can provide at most TWO of Consistency, Availability, and Partition Tolerance.',
    diagram: `Centralized: [Clients] ===> [Single Server Node] ===> [Storage]
Distributed: [Site 1: Mumbai] <=== High Speed Network ===> [Site 2: Singapore]`
  },
  {
    id: 'dbms-th-15',
    qNumber: 15,
    title: 'Two-Tier vs Three-Tier DBMS Client-Server Architecture',
    marks: 3,
    category: 'Architecture',
    definition: 'Two-Tier architecture connects client user interfaces directly to database servers via ODBC/JDBC. Three-Tier architecture places an intermediate Application Server (Business Logic Layer) between client browsers and the database.',
    usesOrRules: [
      { title: 'Security', explanation: 'Two-tier exposes direct database credentials to clients; three-tier hides database behind application server APIs.' },
      { title: 'Scalability', explanation: 'Three-tier enables connection pooling and web caching across millions of concurrent users.' }
    ],
    comparisonTable: {
      headers: ['Feature', 'Two-Tier Architecture', 'Three-Tier Architecture'],
      rows: [
        ['Layers', 'Client Layer + Database Server Layer', 'Client UI + Application Server + Database Server'],
        ['Business Logic', 'Buried in Client (Fat Client) or Stored Procs', 'Centralized in Application Server (Thin Client)'],
        ['Security', 'Lower (Clients establish direct DB connections)', 'High (Database isolated in private network VPC)'],
        ['Scalability', 'Poor (Connection limit bounded by DB threads)', 'Massive (Connection pooling and load balancing)'],
        ['Primary Usage', 'Legacy desktop internal business apps', 'Modern Web & Mobile applications']
      ]
    },
    examTip: 'Draw the 3 tiers: Presentation Tier (Browser) -> Application Tier (Node/Java backend) -> Data Tier (PostgreSQL/Oracle).',
    diagram: `2-Tier: [Fat Client + App Logic] <====== Direct JDBC ======> [Database Server]
3-Tier: [Thin Web Browser] <== HTTP ==> [App Server] <== Private Pool ==> [Database]`
  },
  {
    id: 'dbms-th-16',
    qNumber: 16,
    title: 'Lossless-Join Decomposition vs Dependency Preservation',
    marks: 3,
    category: 'Normalization Theory',
    definition: 'When decomposing a relation R into R1 and R2: Lossless-Join guarantees that natural join R1 bowtie R2 reconstructs original R without spurious tuples. Dependency Preservation guarantees all original FDs can be verified without joining tables.',
    usesOrRules: [
      { title: 'Lossless-Join Test', explanation: 'R1 cap R2 -> (R1 - R2) OR R1 cap R2 -> (R2 - R1) must hold (common attributes must form a superkey of at least one relation).' },
      { title: 'Spurious Tuples', explanation: 'Decomposition that is not lossless creates false hallucinated records when tables are joined back.' }
    ],
    comparisonTable: {
      headers: ['Property', 'Lossless-Join Decomposition', 'Dependency Preservation'],
      rows: [
        ['Primary Goal', 'Prevent creation of spurious / phantom tuples', 'Ensure FDs can be enforced without expensive joins'],
        ['Mathematical Test', 'Common attributes (R1 cap R2) must be superkey of R1 or R2', '(F1 cup F2)+ must equal original F+'],
        ['Mandatory in Normalization?', 'YES! Mandatory for 1NF, 2NF, 3NF, BCNF', 'Mandatory for 3NF; sometimes sacrificed in BCNF'],
        ['Consequence of Failure', 'Data corruption (false data generated on join)', 'Slow verification (must join tables to check constraints)']
      ]
    },
    examTip: 'A decomposition MUST ALWAYS be lossless; losing lossless-join means the decomposition is mathematically invalid!',
    diagram: `Lossless: R1 JOIN R2 == Original Relation R (Exact match!)
Lossy:    R1 JOIN R2 == Original Relation R + [SPURIOUS PHANTOM TUPLES!]`
  },
  {
    id: 'dbms-th-17',
    qNumber: 17,
    title: 'Two-Phase Commit Protocol (2PC) in Distributed Databases',
    marks: 3,
    category: 'Distributed Transactions',
    definition: 'Two-Phase Commit (2PC) is a consensus protocol ensuring that a distributed transaction committing across multiple participating database sites either commits at ALL sites or aborts at ALL sites.',
    usesOrRules: [
      { title: 'Phase 1: Prepare Phase', explanation: 'Coordinator sends PREPARE message; participants reply VOTE_COMMIT or VOTE_ABORT.' },
      { title: 'Phase 2: Commit Phase', explanation: 'If all vote commit, coordinator broadcasts GLOBAL_COMMIT. If any vote abort, coordinator broadcasts GLOBAL_ABORT.' }
    ],
    comparisonTable: {
      headers: ['Phase', 'Coordinator Action', 'Participant Action', 'Failure Reaction'],
      rows: [
        ['Phase 1: Prepare Phase', 'Sends "Prepare" message to all participants', 'Flushes log to disk; replies "Ready" or "Abort"', 'Any single "Abort" vote causes transaction abort'],
        ['Phase 2: Commit Phase', 'Broadcasts "Global-Commit" or "Global-Abort"', 'Executes commit/abort; replies "Acknowledged"', 'Participants must wait for coordinator decision']
      ]
    },
    examTip: 'The major weakness of 2PC is that it is a BLOCKING protocol: if the coordinator crashes during Phase 2, participants remain blocked holding locks.',
    diagram: `Coordinator                Participant 1            Participant 2
   |---- Prepare -------------->|------------------------>|
   |<--- VOTE_COMMIT -----------|<--- VOTE_COMMIT --------|
   |---- GLOBAL_COMMIT -------->|------------------------>|`
  },
  {
    id: 'dbms-th-18',
    qNumber: 18,
    title: 'Database Catalog / Data Dictionary & Metadata',
    marks: 3,
    category: 'Database Architecture',
    definition: 'The System Catalog (Data Dictionary) is a collection of relational tables maintained internally by the DBMS that stores metadata (data describing the database schema, security, and statistics).',
    usesOrRules: [
      { title: 'Self-Describing Nature', explanation: 'Enables DBMS to discover table columns, data types, indexes, and constraints dynamically at runtime.' },
      { title: 'Information Schema', explanation: 'Accessible via standard SQL queries (e.g. SELECT * FROM INFORMATION_SCHEMA.TABLES).' }
    ],
    comparisonTable: {
      headers: ['Catalog Component', 'Information Stored', 'Used By'],
      rows: [
        ['Schema Metadata', 'Table names, column data types, primary & foreign keys', 'Query Parser & Semantic Analyzer'],
        ['Security Metadata', 'User accounts, encrypted passwords, granted privileges', 'Authorization & Access Controller'],
        ['Physical Storage Metadata', 'Page locations, extent sizes, B+ tree root pointers', 'Buffer Manager & Storage Engine'],
        ['Statistical Metadata', 'Table cardinality, histogram distributions, index depth', 'Cost-Based Query Optimizer']
      ]
    },
    examTip: 'The presence of the System Catalog is what distinguishes a database system from a simple file storage system (the database is self-describing).',
    diagram: `[User Query] -> [Query Optimizer]
                        ^ (Reads table statistics & index metadata)
                 [SYSTEM CATALOG / DATA DICTIONARY]`
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// PART D: EXAM STRATEGY, 6 FATAL MISTAKES, REVISION TABLE & 10 QUICK MCQS
// ─────────────────────────────────────────────────────────────────────────────
export const DBMS_EXAM_STRATEGY = [
  {
    part: 'Part A (SQL Output & Relational Algebra Traces)',
    marks: '10 Marks',
    timeAllocation: '15 Minutes',
    strategy: 'Watch out for NULL traps, aggregate function behavior (COUNT(*) vs COUNT(col)), and precedence graph cycles. Draw intermediate tables neatly.'
  },
  {
    part: 'Part B (5-Mark Database Design & SQL Implementations)',
    marks: '25 Marks',
    timeAllocation: '60 Minutes',
    strategy: 'Follow the 4-tier answer blueprint: (1) Core Concept & Rule [1 mark], (2) ANSI SQL DDL/DML Code with proper data types [2.5 marks], (3) Formatted Output Table [1 mark], (4) Examiner Viva Trap [0.5 mark].'
  },
  {
    part: 'Part C (3-Mark Comparative Theory)',
    marks: '25 Marks',
    timeAllocation: '35 Minutes',
    strategy: 'Always provide a minimum of 4 comparison rows in a markdown-style table plus an ASCII architecture or ER diagram.'
  },
  {
    part: 'Part D (Final Review & Invariant Checks)',
    marks: '10 Marks',
    timeAllocation: '10 Minutes',
    strategy: 'Verify foreign key cascade rules, primary key uniqueness constraints, and functional dependency arrow directions.'
  }
];

export const DBMS_FATAL_MISTAKES = [
  {
    mistake: 'Using WHERE commission = NULL instead of WHERE commission IS NULL.',
    consequence: 'Query returns 0 rows! In SQL, NULL = NULL evaluates to UNKNOWN, never TRUE.',
    remedy: 'Always use IS NULL and IS NOT NULL operators for missing data queries.'
  },
  {
    mistake: 'Using NOT IN with a subquery that returns one or more NULL rows.',
    consequence: 'Outer query silently returns 0 rows due to 3-valued logic (condition AND NULL evaluates to UNKNOWN).',
    remedy: 'Always use NOT EXISTS or add WHERE col IS NOT NULL to subqueries.'
  },
  {
    mistake: 'Placing Foreign Key on the "1" side of a 1:N relationship.',
    consequence: 'Creates multivalued repeating columns, violating 1NF and corrupting database design.',
    remedy: 'Always place the Foreign Key on the "N" (Many) side table pointing to the "1" side table.'
  },
  {
    mistake: 'Assuming that Two-Phase Locking (2PL) prevents deadlocks.',
    consequence: 'Deduction of marks in concurrency control theory.',
    remedy: 'Explicitly state: 2PL guarantees Conflict Serializability, but does NOT prevent deadlocks!'
  },
  {
    mistake: 'Using LIMIT/OFFSET to find the Nth highest salary in the presence of duplicate salaries.',
    consequence: 'Fails when multiple employees share identical top salaries.',
    remedy: 'Always use DENSE_RANK() OVER (ORDER BY salary DESC) in a Common Table Expression (CTE).'
  },
  {
    mistake: 'Thinking that TRUNCATE can be filtered with a WHERE clause.',
    consequence: 'TRUNCATE is a DDL command that deallocates all pages; it does not support WHERE clauses.',
    remedy: 'Use DELETE FROM table WHERE condition; when conditional row removal is needed.'
  }
];

export const DBMS_REVISION_TABLE: McqRevisionItem[] = [
  { topic: 'NULL Comparisons', remember: 'NULL = NULL evaluates to UNKNOWN; must use IS NULL' },
  { topic: 'COUNT(*) vs COUNT(col)', remember: 'COUNT(*) counts all rows; COUNT(col) ignores NULLs' },
  { topic: '1NF Requirement', remember: 'All attribute domains must contain strictly atomic scalar values' },
  { topic: '2NF Requirement', remember: '1NF + No Partial Functional Dependencies (No non-prime on subset of PK)' },
  { topic: '3NF Requirement', remember: '2NF + No Transitive Functional Dependencies (X is superkey OR Y is prime)' },
  { topic: 'BCNF Requirement', remember: 'For every FD X -> Y, X must strictly be a Superkey' },
  { topic: 'Two-Phase Locking', remember: 'Growing phase acquires locks; Shrinking phase releases locks; no new locks after release' },
  { topic: 'B+ Tree Structure', remember: 'Internal nodes store only keys; leaves store data and next leaf pointer' },
  { topic: 'Write-Ahead Logging (WAL)', remember: 'Log records flushed to disk before dirty data pages are written' },
  { topic: 'Wait-For-Graph', remember: 'Directed graph where cycles indicate deadlock' },
  { topic: 'Wait-Die Scheme', remember: 'Old waits for young; young dies if it challenges old (Non-preemptive)' },
  { topic: 'Wound-Wait Scheme', remember: 'Old wounds young; young waits for old (Preemptive)' },
  { topic: 'Dirty Read', remember: 'Transaction reads uncommitted data written by another transaction' },
  { topic: 'TRUNCATE vs DELETE', remember: 'TRUNCATE is DDL (fast, resets auto-increment); DELETE is DML (slow, row-by-row)' },
  { topic: 'Relational Algebra Projection', remember: 'Automatically eliminates duplicate tuples (pure set semantics)' },
  { topic: 'Query Optimization Rule', remember: 'Push selections and projections down the query tree as early as possible' }
];

export const DBMS_QUICK_MCQS: QuickMcq[] = [
  {
    question: 'What does the SQL expression (NULL = NULL) evaluate to in three-valued logic?',
    answer: 'UNKNOWN',
    explanation: 'In ANSI SQL, NULL represents an unknown value, so comparing two unknown values evaluates to UNKNOWN.'
  },
  {
    question: 'Which Normal Form eliminates Partial Functional Dependencies on composite primary keys?',
    answer: 'Second Normal Form (2NF)',
    explanation: '2NF mandates that all non-prime attributes must depend on the whole candidate key, not a partial subset.'
  },
  {
    question: 'What is the primary architectural advantage of a B+ Tree over a standard B-Tree?',
    answer: 'Leaf nodes form a linked list enabling ultra-fast sequential range scans',
    explanation: 'B+ trees store all data in linked leaves, allowing range queries without traversing internal tree nodes.'
  },
  {
    question: 'Which SQL command permanently deallocates table pages and resets auto-increment counters without logging row deletions?',
    answer: 'TRUNCATE TABLE',
    explanation: 'TRUNCATE is a DDL operation that unlinks data pages rather than deleting rows individually.'
  },
  {
    question: 'In the Two-Phase Locking (2PL) protocol, what is the rule governing the Shrinking Phase?',
    answer: 'A transaction may release locks, but cannot acquire any new locks',
    explanation: 'Once the first lock is released, the shrinking phase begins and no further locks can be requested.'
  },
  {
    question: 'Which concurrency anomaly is prevented by the SQL REPEATABLE READ isolation level?',
    answer: 'Non-Repeatable Read (and Dirty Read)',
    explanation: 'Guarantees that re-reading the same row within a transaction produces the exact same data values.'
  },
  {
    question: 'What happens in the Wound-Wait deadlock prevention scheme when an older transaction requests a lock held by a younger one?',
    answer: 'The older transaction wounds (preempts/aborts) the younger transaction',
    explanation: 'Wound-Wait preempts the younger transaction to prevent deadlock, letting the older transaction proceed immediately.'
  },
  {
    question: 'How is a Many-to-Many (M:N) relationship mapped into relational tables?',
    answer: 'Using a separate Junction / Cross-Reference table with a composite primary key',
    explanation: 'The junction table imports the primary keys of both participating entities as foreign keys.'
  },
  {
    question: 'What does the Write-Ahead Logging (WAL) protocol mandate?',
    answer: 'Log records must be written to disk before corresponding dirty data pages are flushed',
    explanation: 'Ensures that the recovery manager can always undo or redo changes after an unexpected crash.'
  },
  {
    question: 'Which window function assigns identical ranks to ties without leaving any gaps in the ranking sequence?',
    answer: 'DENSE_RANK()',
    explanation: 'DENSE_RANK() assigns sequential ranks (1, 1, 2, 3), whereas RANK() leaves gaps (1, 1, 3, 4).'
  }
];
