import { Subject } from './types';

export const sem3DbmsMaster: Subject = {
  id: 'sem3-dbms',
  name: 'Database Management Systems (DBMS)',
  code: 'DBMS302',
  color: 'bg-orange-600',
  icon: 'server',
  description: 'Comprehensive study of Database Management Systems covering architecture, relational model, SQL, normalization, transactions, and indexing.',
  semester: 3,
  units: [
    {
      id: 'unit-1',
      title: 'Introduction to DBMS',
      description: 'Basic concepts, architecture, and ER modeling.',
      topics: [
        {
          id: 'intro-dbms',
          title: 'What is DBMS, advantages over file system',
          simpleExplanation: 'A DBMS is a software that helps you store, manage, and retrieve data efficiently, unlike traditional file systems which are messy and redundant.',
          detailedExplanation: `### Three-Tier Client-Server Architecture
\`\`\`mermaid
flowchart TD
    CLIENT["Client Tier (Presentation)\nWeb Browser / Mobile App / GUI"] <-->|"Network Request (HTTPS/API)"| APP["Application Server (Logic Tier)\nNode.js / Spring Boot / Python Backend"]
    APP <-->|"Database Protocol (JDBC / SQL)"| DB["Database Server (Data Tier)\nPostgreSQL / Oracle / MySQL"]
\`\`\`
### Introduction to Database Management Systems

> [!IMPORTANT] **MEMORIZE:**
> **DBMS (Database Management System):** A specialized software application used to create, manage, and manipulate databases efficiently and securely.

Before the advent of DBMS, data was typically stored in flat files. This traditional File System approach had numerous drawbacks, including data redundancy (storing the same data in multiple places), data inconsistency (updating data in one place but not another), difficulty in accessing data, and lack of security.

> [!NOTE] **DEV BRAIN:**
> Think of a File System like keeping all your app data in a bunch of .txt or .csv files scattered across folders. A DBMS is like having a dedicated API (like Prisma or Mongoose) that handles all the reading/writing, validation, and concurrency for you.

### Advantages of DBMS over File Systems

1. **Reduction of Data Redundancy and Inconsistency:** In file systems, duplicate data often exists in multiple files. A DBMS centralizes data, minimizing redundancy and ensuring that data remains consistent across the database.
2. **Data Sharing:** A DBMS allows multiple users and applications to share the same database simultaneously, with appropriate access controls.
3. **Data Integrity:** DBMS enforces integrity constraints to ensure that the data stored is accurate and valid. For example, a student's age cannot be negative.
4. **Data Security:** DBMS provides robust security mechanisms, such as user authentication and authorization, to restrict unauthorized access to sensitive data.
5. **Concurrent Access and Crash Recovery:** DBMS handles concurrent access by multiple users without data corruption and provides mechanisms to recover data in case of system failures.
6. **Data Independence:** DBMS separates the data from the applications that use it. This means you can change the underlying storage structure without modifying the applications.

> [!WARNING] **TRAP:**
> Students often write "DBMS completely removes redundancy". This is FALSE. DBMS *minimizes* or *controls* redundancy, it doesn't always completely eliminate it (sometimes controlled redundancy is needed for performance, like in indexing).

### Core Components of a DBMS

*   **Hardware:** The physical devices where data is stored (servers, hard drives).
*   **Software:** The DBMS software itself (e.g., MySQL, Oracle, PostgreSQL).
*   **Data:** The actual information being stored.
*   **Procedures:** The rules and instructions that govern the design and use of the database.
*   **Users:** The people interacting with the database (Database Administrators, Application Programmers, End Users).

### Comparison: DBMS vs File System

| Feature | File System | DBMS |
| :--- | :--- | :--- |
| **Redundancy** | High (Duplicate data) | Low (Controlled) |
| **Data Access** | Difficult (Needs custom programs) | Easy (Uses SQL queries) |
| **Security** | Weak (OS level only) | Strong (User roles, passwords) |
| **Crash Recovery**| None/Manual | Automatic (Logs & Checkpoints) |
| **Concurrency** | Very limited | Highly supported |

> [!TIP] **EXAM TIP:**
> If asked for "Advantages of DBMS", always draw the comparison table. It gives a structured look and guarantees full marks!\`,
          richContent: \`### Visualizing DBMS Architecture
Here is how DBMS conceptually sits between the user and the data:
User -> Application -> DBMS -> Database

In a file system, it's just:
User -> Application -> File`,
          shortNotes: 'DBMS manages data, prevents redundancy, ensures security and integrity compared to file systems.',
          examples: [
            {
              title: 'File System vs DBMS',
              description: 'In a file system, a university might have a Students file and a Library file, both containing the student\'s name and address. In a DBMS, the student details are stored once in a Students table, and the library system references it via a StudentID.',
              code: 'N/A'
            }
          ],
          keyPoints: [
            'DBMS centralizes data storage.',
            'Eliminates data redundancy and inconsistency.',
            'Provides data security and integrity.',
            'Supports concurrent access and crash recovery.'
          ],
          mcqs: [
            {
              question: 'Which of the following is NOT an advantage of a DBMS over a file system?',
              options: ['Data redundancy', 'Data integrity', 'Data security', 'Concurrent access'],
              correctIndex: 0,
              explanation: 'DBMS reduces data redundancy, it is not an advantage to have it.'
            },
            {
              question: 'Data independence in DBMS means:',
              options: ['Data is independent of the hardware', 'Data can be accessed without a network', 'Programs are immune to changes in the physical storage structure', 'Data cannot be shared'],
              correctIndex: 2,
              explanation: 'Data independence means the application logic is decoupled from physical data storage details.'
            },
            {
              question: 'Which component of DBMS is responsible for enforcing security?',
              options: ['Hardware', 'Software', 'Data', 'Procedures'],
              correctIndex: 1,
              explanation: 'The DBMS software enforces security, user access, and authorization.'
            }
          ]
        },
        {
          id: 'db-arch',
          title: 'Database Architecture (1-tier, 2-tier, 3-tier)',
          simpleExplanation: 'Database architecture describes how users connect to the database. It can be direct (1-tier), through an application (2-tier), or through an application server and web server (3-tier).',
          detailedExplanation: `### Three-Schema ANSI/SPARC Architecture (Data Independence)
\`\`\`mermaid
flowchart TD
    subgraph External["External Level (User Views)"]
        V1["View 1 (Student Portal)"]
        V2["View 2 (Faculty Portal)"]
        V3["View 3 (Registrar / Admin)"]
    end

    subgraph Conceptual["Conceptual Level (Logical Schema)"]
        CS["Entities, Attributes, Relationships, Constraints\n(Logical Data Independence)"]
    end

    subgraph Internal["Internal Level (Physical Schema)"]
        IS["Data Storage, Indexing, File Structures, B-Trees\n(Physical Data Independence)"]
    end

    V1 & V2 & V3 <-->|"External / Conceptual Mapping"| CS
    CS <-->|"Conceptual / Internal Mapping"| IS
\`\`\`
### Database Architecture Overview

Database architecture establishes the framework for how a database system is structured, how users interact with it, and how components communicate. The architecture is broadly classified into single-tier, two-tier, and three-tier models, depending on the separation between the user interface, business logic, and database management.

> [!IMPORTANT] **MEMORIZE:**
> **Tier:** A physical or logical separation of components in a system. 
> - 1-Tier: Everything on 1 machine.
> - 2-Tier: Client machine + DB Server machine.
> - 3-Tier: Client + App Server + DB Server.

### 1-Tier Architecture

In a 1-tier architecture, the database and the application are tightly coupled and reside on the same machine. The user interacts directly with the database without any intermediate layers.
*   **Use Cases:** Local applications, development environments, and simple desktop software (e.g., MS Access, SQLite).
*   **Pros:** Easy to set up, minimal latency.
*   **Cons:** Not scalable, lacks security, cannot be shared easily among multiple users over a network.

### 2-Tier Architecture (Client-Server)

In a 2-tier architecture, the system is divided into two parts: the client application and the database server. The client application contains the user interface and the business logic, and it communicates directly with the database server using APIs like ODBC or JDBC.

> [!NOTE] **DEV BRAIN:**
> 2-Tier is like a React Native mobile app (Client) talking directly to a Firebase database (DB Server). The app contains all the logic, and directly queries the database. 

*   **Use Cases:** Internal corporate networks, desktop applications requiring a centralized database.
*   **Pros:** Better scalability than 1-tier, improved security, centralized data management.
*   **Cons:** Business logic is on the client, making updates difficult (fat client). Heavy network traffic if the client requests large datasets.

> [!WARNING] **TRAP:**
> Don't confuse "Tier" with "Schema Architecture" (like Internal, Conceptual, External schemas). Tiers refer to physical/network deployment, while Schemas refer to data abstraction levels!

### 3-Tier Architecture

This is the most common architecture for modern web applications. It introduces a middle tier (application server) between the client and the database.
1.  **Presentation Tier (Client):** The user interface (e.g., a web browser or mobile app).
2.  **Application Tier (Business Logic):** An intermediate server (e.g., Node.js, Django, Spring Boot) that processes user inputs, enforces business rules, and communicates with the database.
3.  **Data Tier (Database Server):** The DBMS that stores and manages the data.

> [!TIP] **EXAM TIP:**
> Always draw a simple block diagram for 3-tier architecture: \`Client [UI] <--> App Server [Logic] <--> DB Server [Data]\`. This visual representation is crucial for full marks.

*   **Use Cases:** Web applications, large-scale enterprise systems.
*   **Pros:** High scalability, strong security (client never touches the DB), easy to maintain and update business logic.
*   **Cons:** More complex to design and implement, potential latency due to multiple hops.

### Comparison Table

| Architecture | Components | Security | Scalability | Best For |
| :--- | :--- | :--- | :--- | :--- |
| **1-Tier** | App + DB on same machine | Very Low | None | Local dev, desktop tools |
| **2-Tier** | Client App + DB Server | Medium | Moderate | Internal corporate tools |
| **3-Tier** | Client + App Server + DB Server | High | Very High | Web Apps, Enterprise Apps |
\`,
          richContent: \`### Step-by-Step Request Trace in 3-Tier Architecture
1. **Client (Tier 1):** User clicks "Login" on a webpage. Browser sends an HTTP POST request with credentials.
2. **App Server (Tier 2):** Node.js receives the request. It validates the input format. It constructs a SQL query: \`SELECT * FROM Users WHERE username = '...'\`
3. **Database (Tier 3):** MySQL receives the query, executes it, and returns the user record to the App Server.
4. **App Server (Tier 2):** Checks password hash. Generates a session token and sends it back in an HTTP response.
5. **Client (Tier 1):** Browser saves the token and redirects to the dashboard.`,
          shortNotes: '1-tier: direct access. 2-tier: client + DB server. 3-tier: client + app server + DB server.',
          examples: [
            {
              title: '3-Tier Example',
              description: 'A student portal: The web browser is the presentation tier. The university\'s Java backend is the application tier. The Oracle database is the data tier.',
              code: ''
            }
          ],
          keyPoints: [
            '1-tier is for local, simple apps.',
            '2-tier is client-server, where client has business logic.',
            '3-tier separates UI, business logic, and data.',
            '3-tier is standard for web apps for security and scalability.'
          ],
          theoryQuestions: [
            {
              question: 'Explain the Three-Schema ANSI/SPARC Database Architecture with a diagram. Distinguish between Physical and Logical Data Independence.',
              marks: '7 Marks',
              answer: 'The ANSI/SPARC architecture divides a database system into three levels:\n1. **External Level (Views):** How individual end-users perceive the data. Different views for different user roles.\n2. **Conceptual Level (Logical Schema):** The global logical structure of the entire database (entities, attributes, relationships, constraints). Independent of physical storage.\n3. **Internal Level (Physical Schema):** The physical representation of the database on disk (file organization, indexes, compression, B-Trees).\n\n**Data Independence:**\n- **Logical Data Independence:** The capacity to change the conceptual schema without altering external views or application programs (e.g., adding a new attribute or table).\n- **Physical Data Independence:** The capacity to change the physical storage structures (e.g., creating a B-Tree index or moving to SSD) without altering the conceptual schema.',
              keyPoints: ['External, Conceptual, Internal levels.', 'External-Conceptual and Conceptual-Internal mappings.', 'Physical vs Logical data independence definitions.']
            },
          ],
          mcqs: [
            {
              question: 'Which architecture has an intermediate application server?',
              options: ['1-tier', '2-tier', '3-tier', 'N-tier'],
              correctIndex: 2,
              explanation: '3-tier architecture places an application server between the client and the database.'
            },
            {
              question: 'In a 2-tier architecture, where does the business logic usually reside?',
              options: ['Database Server', 'Client Application', 'Application Server', 'Web Server'],
              correctIndex: 1,
              explanation: 'In 2-tier, the client application (fat client) typically contains the business logic and UI.'
            },
            {
              question: 'Which architecture is least secure for a public-facing application?',
              options: ['1-tier', '2-tier', '3-tier', 'They are equally secure'],
              correctIndex: 0,
              explanation: '1-tier directly exposes the database to the user application, making it unsuitable for public networks.'
            }
          ]
        },
        {
          id: 'er-model',
          title: 'ER Model (Entity, Attributes, Relationships)',
          simpleExplanation: 'The ER model is a blueprint for your database. It uses Entities (things), Attributes (details about things), and Relationships (how things connect).',
          detailedExplanation: `### Complete Entity-Relationship (ER) Diagram
\`\`\`mermaid
erDiagram
    STUDENT ||--o{ ENROLLMENT : places
    COURSE ||--o{ ENROLLMENT : contains
    DEPARTMENT ||--|{ STUDENT : belongs_to
    DEPARTMENT ||--|{ PROFESSOR : employs

    STUDENT {
        int student_id PK
        string name
        string email
        date dob
    }
    COURSE {
        string course_code PK
        string title
        int credits
    }
    ENROLLMENT {
        int enrollment_id PK
        int student_id FK
        string course_code FK
        string grade
        date term
    }
    DEPARTMENT {
        int dept_id PK
        string dept_name
    }
    PROFESSOR {
        int prof_id PK
        string name
        string rank
    }
\`\`\`
### Entity-Relationship (ER) Model

The ER model is a high-level conceptual data model used to design and represent the logical structure of a database. It allows database designers to sketch out the database architecture before implementing it in a specific DBMS.

> [!IMPORTANT] **MEMORIZE:**
> **ER Diagram Notations:**
> - Rectangle = Entity
> - Oval = Attribute
> - Diamond = Relationship
> - Double Rectangle = Weak Entity
> - Dashed Oval = Derived Attribute

### Core Components

1. **Entity:** An entity is a real-world object or concept that can be distinctly identified. Examples include a Student, Course, or Employee. 
   * **Weak Entity:** An entity that cannot be uniquely identified by its own attributes and relies on a related strong entity (e.g., a Dependent relies on an Employee). 

> [!NOTE] **DEV BRAIN:**
> An Entity is like a Class in Object-Oriented Programming (e.g., \`class User\`). An Attribute is like a property of that class (e.g., \`User.name\`). A Relationship is like a reference between classes (e.g., \`User.posts\`).

2. **Attribute:** Attributes describe the properties or characteristics of an entity. 
   * **Key Attribute:** Uniquely identifies an entity (e.g., Roll_Number). Represented by an oval with underlined text.
   * **Composite Attribute:** An attribute that can be divided into smaller sub-parts (e.g., Name can be First_Name and Last_Name).
   * **Multivalued Attribute:** An attribute that can have multiple values (e.g., Phone_Number). Represented by a double oval.
   * **Derived Attribute:** An attribute whose value is calculated from other attributes (e.g., Age derived from Date_of_Birth). 

> [!WARNING] **TRAP:**
> Do NOT store derived attributes physically in a database table! Since Age changes every year, if you store it, you have to update it constantly. Store Date_of_Birth and calculate Age dynamically.

3. **Relationship:** A relationship illustrates how two or more entities are associated with each other. For example, a Student "Enrolls" in a Course. Represented by **diamonds**.

### Cardinality Ratios

Cardinality defines the maximum number of relationship instances an entity can participate in.
*   **One-to-One (1:1):** One instance of entity A is associated with one instance of entity B (e.g., a Manager manages one Department).
*   **One-to-Many (1:N):** One instance of entity A is associated with multiple instances of entity B (e.g., a Department has many Employees).
*   **Many-to-One (N:1):** Multiple instances of entity A are associated with one instance of entity B (e.g., many Students enroll in one Course).
*   **Many-to-Many (M:N):** Multiple instances of entity A are associated with multiple instances of entity B (e.g., many Students enroll in many Courses).

> [!TIP] **EXAM TIP:**
> When asked to draw an ER Diagram for a system (like Hospital or Library), always clearly mark Primary Keys with an underline and label the cardinalities (1, M, N) on the relationship lines!\`,
          richContent: \`### Step-by-Step: Converting ER to Relational Tables
Let's convert an ER model to actual tables:
1. **Strong Entities:** Create a table for each strong entity. (e.g., \`Student(RollNo, Name)\`)
2. **Weak Entities:** Create a table, include the primary key of the strong entity as a foreign key. (e.g., \`Dependent(Dep_ID, Name, Emp_ID)\`)
3. **1:M Relationships:** The primary key of the '1' side goes into the 'M' side table as a foreign key. (e.g., Department(1) to Employee(M) -> add \`Dept_ID\` to Employee table).
4. **M:N Relationships:** Create a NEW junction table containing the primary keys of both participating entities. (e.g., \`Student_Course(RollNo, CourseID)\`)`,
          shortNotes: 'Entities are objects. Attributes are properties. Relationships are associations. ER diagrams visualize this.',
          examples: [
            {
              title: 'Student-Course ER Example',
              description: 'Entity: Student (Attributes: RollNo, Name)\nEntity: Course (Attributes: CourseID, CourseName)\nRelationship: Enrolls (M:N cardinality, as a student can take many courses and a course has many students)',
              code: ''
            }
          ],
          keyPoints: [
            'Entities are represented by rectangles.',
            'Attributes are ovals; key attributes are underlined.',
            'Relationships are diamonds.',
            'Cardinality defines numerical constraints of relationships.'
          ],
          mcqs: [
            {
              question: 'In an ER diagram, a derived attribute is represented by:',
              options: ['Solid oval', 'Dashed oval', 'Double oval', 'Rectangle'],
              correctIndex: 1,
              explanation: 'Dashed ovals represent derived attributes, such as age calculated from birthdate.'
            },
            {
              question: 'Which cardinality ratio describes a scenario where one employee belongs to one department, and a department can have many employees?',
              options: ['1:1', '1:N', 'M:N', 'N:N'],
              correctIndex: 1,
              explanation: 'One department has many employees, so it is a One-to-Many (1:N) relationship.'
            },
            {
              question: 'What symbol is used for a weak entity?',
              options: ['Diamond', 'Double diamond', 'Double rectangle', 'Oval'],
              correctIndex: 2,
              explanation: 'A weak entity is represented by a double rectangle in an ER diagram.'
            }
          ]
        }
      ]
    },
    {
      id: 'unit-2',
      title: 'Relational Model & SQL',
      description: 'Deep dive into relational algebra and Structured Query Language (SQL).',
      topics: [
        {
          id: 'sql-dml',
          title: 'SQL DML (SELECT, INSERT, UPDATE, DELETE)',
          simpleExplanation: 'Data Manipulation Language (DML) is used to add, change, remove, or fetch data from your database tables.',
          detailedExplanation: `### Query Processing & Relational Optimization Pipeline
\`\`\`mermaid
flowchart TD
    SQL["SQL Query Text\n'SELECT name FROM Student WHERE gpa > 3.5'"] --> PARSE["Parser & Translator\n(Syntax & Semantic Validation)"]
    PARSE --> TREE["Relational Algebra Tree\n(σ_gpa > 3.5 (π_name (Student)))"]
    TREE --> OPTIM["Query Optimizer\n(Pushes selections down, picks index scan vs full scan)"]
    OPTIM --> PLAN["Optimized Execution Plan"]
    PLAN --> ENGINE["Execution Engine\nAccesses DB Storage Engine & Buffers"]
    ENGINE --> RESULT["Output Result Set"]
\`\`\`
### Data Manipulation Language (DML)

DML allows users to interact with the data stored in a relational database. The core commands are SELECT (to retrieve data), INSERT (to add new rows), UPDATE (to modify existing data), and DELETE (to remove rows).

> [!IMPORTANT] **MEMORIZE:**
> **DML vs DDL:**
> DML (Data Manipulation) = SELECT, INSERT, UPDATE, DELETE. Operates on the *rows* / *data*.
> DDL (Data Definition) = CREATE, ALTER, DROP, TRUNCATE. Operates on the *tables* / *schema*.

### 1. SELECT Statement

The \`SELECT\` statement is the most frequently used SQL command. It retrieves data from one or more tables.
*   **Syntax:** \`SELECT column1, column2 FROM table_name WHERE condition;\`
*   You can use \`*\` to select all columns.
*   The \`WHERE\` clause filters the results based on a condition.

> [!NOTE] **DEV BRAIN:**
> Think of \`SELECT\` as an HTTP GET request or an \`Array.filter()\` and \`Array.map()\` in JavaScript. You are fetching data without modifying the source.

### 2. INSERT Statement

The \`INSERT INTO\` statement is used to add new records (rows) to a table.
*   **Syntax (specifying columns):** \`INSERT INTO table_name (column1, column2) VALUES (value1, value2);\`
*   **Syntax (all columns):** \`INSERT INTO table_name VALUES (value1, value2, ...);\`

### 3. UPDATE Statement

The \`UPDATE\` statement modifies existing records in a table.
*   **Syntax:** \`UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;\`

> [!WARNING] **TRAP:**
> **THE MISSING WHERE CLAUSE TRAP:**
> Always use a \`WHERE\` clause with \`UPDATE\` and \`DELETE\`. If you run \`UPDATE Employees SET Salary = 90000;\`, it will update the salary for EVERY SINGLE EMPLOYEE in the database! Always double-check!

### 4. DELETE Statement

The \`DELETE\` statement removes existing records from a table.
*   **Syntax:** \`DELETE FROM table_name WHERE condition;\`

> [!TIP] **EXAM TIP:**
> Be prepared to write simple SQL queries in the exam. Always capitalize SQL keywords (\`SELECT\`, \`FROM\`, \`WHERE\`) to make your answer easy to read for the examiner.\`,
          richContent: \`### Query Execution Step-by-Step
Consider the query: 
\`SELECT Name, Salary FROM Employees WHERE Department = 'IT' ORDER BY Salary DESC;\`
Here is the logical order of execution by the database engine:
1. **FROM:** The DBMS identifies the \`Employees\` table.
2. **WHERE:** It filters out all rows where Department is not 'IT'.
3. **SELECT:** It projects (extracts) only the \`Name\` and \`Salary\` columns.
4. **ORDER BY:** It sorts the final result set by \`Salary\` in descending order.`,
          shortNotes: 'SELECT reads data. INSERT adds data. UPDATE modifies data. DELETE removes data.',
          examples: [
            {
              title: 'Basic DML Operations',
              description: 'Examples of inserting, updating, fetching, and deleting a student record.',
              code: `-- Insert a new student
INSERT INTO Students (ID, Name, Age) VALUES (1, 'Alice', 20);

-- Retrieve the student
SELECT * FROM Students WHERE Name = 'Alice';

-- Update the student's age
UPDATE Students SET Age = 21 WHERE ID = 1;

-- Delete the student
DELETE FROM Students WHERE ID = 1;`
            }
          ],
          keyPoints: [
            'DML deals with data manipulation, not structure.',
            'Always use WHERE with UPDATE and DELETE to prevent accidental data loss.',
            'SELECT can retrieve specific columns or all columns using *.'
          ],
          mcqs: [
            {
              question: 'Which SQL statement is used to modify existing data in a database?',
              options: ['MODIFY', 'CHANGE', 'UPDATE', 'ALTER'],
              correctIndex: 2,
              explanation: 'UPDATE is the standard DML command to modify existing records.'
            },
            {
              question: 'What happens if you run a DELETE statement without a WHERE clause?',
              options: ['An error is thrown', 'The first row is deleted', 'All rows in the table are deleted', 'The table structure is dropped'],
              correctIndex: 2,
              explanation: 'Without a WHERE clause, the DELETE command applies to all rows in the table.'
            },
            {
              question: 'Which command is NOT a DML command?',
              options: ['INSERT', 'CREATE', 'SELECT', 'DELETE'],
              correctIndex: 1,
              explanation: 'CREATE is a Data Definition Language (DDL) command.'
            }
          ]
        },
        {
          id: 'sql-joins',
          title: 'SQL Joins (INNER, LEFT, RIGHT, FULL)',
          simpleExplanation: 'Joins are used to combine rows from two or more tables based on a related column between them.',
          detailedExplanation: `### SQL Joins Venn Diagram
\`\`\`mermaid
flowchart TD
    subgraph Joins["Relational Join Operations"]
        INNER["1. INNER JOIN\nReturns only matching rows in both tables."]
        LEFT["2. LEFT JOIN\nAll rows from left table + matched rows from right (NULL if no match)."]
        RIGHT["3. RIGHT JOIN\nAll rows from right table + matched rows from left (NULL if no match)."]
        FULL["4. FULL OUTER JOIN\nAll rows when there is a match in either left or right table."]
        CROSS["5. CROSS JOIN\nCartesian product (m x n combinations)."]
    end
\`\`\`
### Understanding SQL Joins

In relational databases, data is often normalized and split across multiple tables to reduce redundancy. To view a complete picture, you need to combine data from these tables. SQL \`JOIN\` clauses allow you to link tables together based on common columns (usually Primary Key - Foreign Key relationships).

> [!IMPORTANT] **MEMORIZE:**
> **Types of Joins:**
> - INNER: Intersection (matches only)
> - LEFT: All left + matches
> - RIGHT: All right + matches
> - FULL: Union (everything from both)

### Types of Joins

1.  **INNER JOIN:** Returns records that have matching values in **both** tables. If a row in Table A has no match in Table B, it is omitted.
    *   *Analogy:* The intersection of two Venn diagram circles.

2.  **LEFT (OUTER) JOIN:** Returns **all** records from the left table (Table A), and the matched records from the right table (Table B). The result is NULL from the right side if there is no match.

> [!NOTE] **DEV BRAIN:**
> Think of a LEFT JOIN like calling \`map\` on an array of Users, and finding their matching Profile. Even if a User doesn't have a Profile, they still stay in the array, but their \`profile\` property is \`null\`.

3.  **RIGHT (OUTER) JOIN:** Returns **all** records from the right table (Table B), and the matched records from the left table (Table A). The result is NULL from the left side when there is no match.

4.  **FULL (OUTER) JOIN:** Returns all records when there is a match in either left or right table. Unmatched rows will contain NULL for the columns of the table that lacked a match.

5.  **CROSS JOIN:** Returns the Cartesian product of the two tables. If Table A has 3 rows and Table B has 4 rows, the result will have 12 rows. Usually used without an ON clause.

> [!WARNING] **TRAP:**
> Forgetting the \`ON\` clause! If you do \`SELECT * FROM A JOIN B\`, many databases will throw an error, but some will treat it as a CROSS JOIN, resulting in millions of rows and crashing your query!

### Joins Comparison

| Join Type | Left Table Unmatched | Right Table Unmatched | Result Set Size (usually) |
| :--- | :--- | :--- | :--- |
| **INNER** | Dropped | Dropped | Smallest |
| **LEFT** | Kept (NULLs on right) | Dropped | Medium |
| **RIGHT** | Dropped | Kept (NULLs on left) | Medium |
| **FULL** | Kept | Kept | Largest |

> [!TIP] **EXAM TIP:**
> When writing a JOIN query in an exam, always clearly specify the table names or use aliases for columns (e.g., \`SELECT E.Name, D.DeptName FROM Employees E JOIN Departments D ON E.DeptID = D.ID\`). It shows the examiner you understand column ambiguity.\`,
          richContent: \`### Step-by-Step Join Execution
Let's trace a LEFT JOIN:
\`Table A (Students)\`: (1, 'Alice'), (2, 'Bob'), (3, 'Charlie')
\`Table B (Grades)\`: (1, 'A'), (2, 'B')

**Query:** \`SELECT Students.Name, Grades.Grade FROM Students LEFT JOIN Grades ON Students.ID = Grades.StudentID\`

**Trace:**
1. Read first row of A: (1, 'Alice'). Match found in B? Yes, (1, 'A'). Result: \`('Alice', 'A')\`
2. Read second row of A: (2, 'Bob'). Match found in B? Yes, (2, 'B'). Result: \`('Bob', 'B')\`
3. Read third row of A: (3, 'Charlie'). Match found in B? No. Output NULL for B's columns. Result: \`('Charlie', NULL)\`

**Final Output:**
- Alice, A
- Bob, B
- Charlie, NULL`,
          shortNotes: 'INNER: Match only. LEFT: All left + match. RIGHT: All right + match. FULL: All rows with nulls where missing.',
          examples: [
            {
              title: 'INNER JOIN Example',
              description: 'Fetch student names and their enrolled courses.',
              code: `SELECT Students.Name, Courses.CourseName
FROM Students
INNER JOIN Enrollments ON Students.ID = Enrollments.StudentID
INNER JOIN Courses ON Enrollments.CourseID = Courses.ID;`
            }
          ],
          keyPoints: [
            'Joins combine tables based on a common key.',
            'INNER JOIN is the most common and strict join type.',
            'LEFT JOIN ensures no records from the primary (left) table are lost.'
          ],
          mcqs: [
            {
              question: 'Which join returns all rows from both tables, with NULLs where there is no match?',
              options: ['INNER JOIN', 'LEFT JOIN', 'CROSS JOIN', 'FULL OUTER JOIN'],
              correctIndex: 3,
              explanation: 'FULL OUTER JOIN combines the results of both LEFT and RIGHT joins.'
            },
            {
              question: 'If Table A has 5 rows and Table B has 10 rows, a CROSS JOIN will result in how many rows?',
              options: ['15', '50', '5', '10'],
              correctIndex: 1,
              explanation: 'A CROSS JOIN produces a Cartesian product: 5 * 10 = 50 rows.'
            },
            {
              question: 'Which join is used to find records in the left table that have NO match in the right table?',
              options: ['INNER JOIN', 'LEFT JOIN with a WHERE clause checking for NULL', 'RIGHT JOIN', 'NATURAL JOIN'],
              correctIndex: 1,
              explanation: 'You use a LEFT JOIN and add a WHERE right_table.id IS NULL to find unmatched left rows.'
            }
          ]
        }
      ]
    },
    {
      id: 'unit-3',
      title: 'Normalization',
      description: 'Database normalization and functional dependencies.',
      topics: [
        {
          id: 'normalization-forms',
          title: '1NF, 2NF, 3NF, BCNF',
          simpleExplanation: 'Normalization is a step-by-step process to organize data in a database to reduce redundancy and improve data integrity.',
          detailedExplanation: `### Normalization Roadmap (1NF to BCNF)
\`\`\`mermaid
flowchart TD
    UNF["Unnormalized Table\n(Multi-valued attributes, repeating groups)"] -->|"Remove multi-valued attributes / Make atomic"| NF1["1st Normal Form (1NF)\nEvery column contains atomic values"]

    NF1 -->|"Remove Partial Dependencies\n(Non-prime attribute depends on part of composite PK)"| NF2["2nd Normal Form (2NF)\nFull functional dependency on candidate key"]

    NF2 -->|"Remove Transitive Dependencies\n(X -> Y and Y -> Z where Z is non-prime)"| NF3["3rd Normal Form (3NF)\nFor every X -> Y: X is superkey OR Y is prime attribute"]

    NF3 -->|"Strict Superkey Rule\n(Remove anomalies from overlapping candidate keys)"| BCNF["Boyce-Codd Normal Form (BCNF)\nFor every X -> Y: X MUST be a Superkey!"]
\`\`\`
### Database Normalization

Normalization is the process of structuring a relational database in accordance with a series of normal forms to reduce data redundancy and improve data integrity. It divides large tables into smaller, less redundant tables and defines relationships between them.

> [!IMPORTANT] **MEMORIZE:**
> **The Normal Forms:**
> - 1NF: Atomic values only.
> - 2NF: 1NF + No Partial Dependencies.
> - 3NF: 2NF + No Transitive Dependencies.
> - BCNF: 3NF + Every determinant is a candidate key.

### First Normal Form (1NF)

*   **Rule:** A table is in 1NF if it contains only atomic (indivisible) values. There can be no repeating groups or arrays.
*   **Action:** If a column has multiple values (e.g., a student with multiple phone numbers in one cell), separate them into multiple rows or create a new table.

> [!NOTE] **DEV BRAIN:**
> In NoSQL or JSON, storing arrays (like \`tags: ["tech", "coding"]\`) is perfectly fine. But in a strictly relational SQL database, this violates 1NF! You'd need a separate \`Tags\` table.

### Second Normal Form (2NF)

*   **Rule:** A table is in 2NF if it is in 1NF AND every non-prime attribute is fully functionally dependent on the primary key.
*   **Action:** This applies primarily to tables with **composite primary keys**. If an attribute depends on only part of the primary key (Partial Dependency), move it to a new table.

### Third Normal Form (3NF)

*   **Rule:** A table is in 3NF if it is in 2NF AND there are no transitive dependencies.
*   **Action:** A transitive dependency occurs when a non-prime attribute depends on another non-prime attribute (A -> B and B -> C, so A -> C). Move the transitively dependent attributes to a new table.

> [!WARNING] **TRAP:**
> Do not confuse 2NF and 3NF. 
> 2NF deals with partial dependency on a **Primary Key**. 
> 3NF deals with dependencies on **Non-Key Attributes**.

### Boyce-Codd Normal Form (BCNF)

*   **Rule:** BCNF is a stronger version of 3NF. A table is in BCNF if for every non-trivial functional dependency X -> Y, X is a superkey.
*   **Action:** It addresses situations where a table is in 3NF but still has anomalies, typically when there are multiple overlapping candidate keys.

> [!TIP] **EXAM TIP:**
> When asked to normalize a table in the exam, clearly write down the Functional Dependencies (FDs) first. Then, identify the Primary Key. Without finding the PK, you cannot check for 2NF or 3NF!\`,
          richContent: \`### Normalization Step-by-Step Trace
**Given Table:** \`Orders(OrderID, ProductID, ProductName, CustomerID, CustomerCity)\`
**Primary Key:** \`(OrderID, ProductID)\`

**Step 1: Check 1NF**
Are all values atomic? Yes. It is in 1NF.

**Step 2: Check 2NF**
Are there partial dependencies? 
Yes! \`ProductName\` depends ONLY on \`ProductID\`, not on the full \`(OrderID, ProductID)\` key.
*Fix:* Split into two tables:
- \`OrderDetails(OrderID, ProductID, CustomerID, CustomerCity)\`
- \`Products(ProductID, ProductName)\`

**Step 3: Check 3NF**
Look at \`OrderDetails\`. Are there transitive dependencies?
Yes! \`CustomerCity\` depends on \`CustomerID\`, and \`CustomerID\` depends on \`OrderID\`. 
*Fix:* Split again:
- \`Orders(OrderID, CustomerID)\`
- \`Customers(CustomerID, CustomerCity)\`
- \`OrderItems(OrderID, ProductID)\`

Now the schema is fully normalized in 3NF.`,
          shortNotes: '1NF: Atomic values. 2NF: No partial dependency. 3NF: No transitive dependency. BCNF: Stricter 3NF.',
          examples: [
            {
              title: '1NF Conversion',
              description: 'Before 1NF: Student(ID, Name, Subjects: [Math, Physics])\nAfter 1NF:\nRow 1: (1, Bob, Math)\nRow 2: (1, Bob, Physics)',
              code: ''
            }
          ],
          keyPoints: [
            'Normalization reduces data redundancy.',
            'Higher normal forms are more strict.',
            '3NF is typically the standard goal for business databases.'
          ],
          theoryQuestions: [
            {
              question: 'Define 1NF, 2NF, 3NF, and BCNF with functional dependencies and real-world table decomposition examples.',
              marks: '7 Marks',
              answer: '1. **1NF:** A relation is in 1NF if and only if all attribute values are atomic (no repeating groups, multi-valued attributes, or nested tables).\n2. **2NF:** A relation is in 2NF if it is in 1NF and **no non-prime attribute is partially dependent** on any candidate key. Every non-prime attribute must depend on the whole candidate key.\n3. **3NF:** A relation is in 3NF if it is in 2NF and **no non-prime attribute is transitively dependent** on a candidate key. For every functional dependency $X \\rightarrow Y$, either $X$ is a superkey or $Y$ is a prime attribute.\n4. **BCNF:** A relation is in BCNF if for every non-trivial functional dependency $X \\rightarrow Y$, $X$ must be a **Superkey**.',
              keyPoints: ['1NF: Atomic values.', '2NF: No partial dependency.', '3NF: No transitive dependency.', 'BCNF: Every determinant is a superkey.']
            },
          ],
          mcqs: [
            {
              question: 'Which normal form prohibits partial dependencies?',
              options: ['1NF', '2NF', '3NF', 'BCNF'],
              correctIndex: 1,
              explanation: '2NF requires that all non-key attributes are fully dependent on the entire primary key.'
            },
            {
              question: 'A table is in 3NF if it is in 2NF and has no:',
              options: ['Atomic values', 'Partial dependencies', 'Transitive dependencies', 'Multi-valued dependencies'],
              correctIndex: 2,
              explanation: '3NF specifically eliminates transitive dependencies (non-key depending on non-key).'
            },
            {
              question: 'Which form ensures that every determinant is a candidate key?',
              options: ['1NF', '2NF', '3NF', 'BCNF'],
              correctIndex: 3,
              explanation: 'BCNF states that for every functional dependency X -> Y, X must be a superkey (or candidate key).'
            }
          ]
        }
      ]
    },
    {
      id: 'unit-4',
      title: 'Transaction Management',
      description: 'ACID properties, concurrency control, and deadlocks.',
      topics: [
        {
          id: 'acid-props',
          title: 'ACID Properties',
          simpleExplanation: 'ACID guarantees that database transactions are processed reliably, even in the event of errors, power failures, or crashes.',
          detailedExplanation: `### Transaction State Transition Diagram
\`\`\`mermaid
flowchart TD
    ACTIVE["Active\n(Initial state; transaction executes read/write)"] --> PART_COMM["Partially Committed\n(Final statement executed, changes in buffer)"]

    PART_COMM -->|"Hardware write-ahead log flushed to disk"| COMMITTED(["Committed\n(Transaction permanently successful)"])

    ACTIVE -->|"Error or Abort detected"| FAILED["Failed\n(Transaction encountered error or crash)"]
    PART_COMM -->|"I/O failure during disk flush"| FAILED

    FAILED -->|"Rollback micro-operations executed"| ABORTED(["Aborted\n(Database restored to clean prior state)"])

    ABORTED -->|"Restart or Kill"| TERMINATED(["Terminated / Restarted"])
\`\`\`
### ACID Properties in DBMS

A transaction is a single logical unit of work that accesses and possibly modifies the contents of a database. To maintain data integrity, database transactions must adhere to four key properties, known collectively by the acronym ACID.

> [!IMPORTANT] **MEMORIZE:**
> **ACID stands for:**
> **A**tomicity
> **C**onsistency
> **I**solation
> **D**urability

### 1. Atomicity (The All-or-Nothing Rule)

Atomicity ensures that all operations within a transaction are completed successfully. If any operation fails, the entire transaction is aborted, and the database is rolled back to its previous state prior to the transaction.
*   *Example:* Transferring money from Account A to Account B involves deducting from A and adding to B. If deducting succeeds but adding fails, the money must be refunded to A.

> [!NOTE] **DEV BRAIN:**
> Atomicity is like wrapping multiple API calls in a single \`try...catch\` block where if anything throws, you manually revert all previous changes. In a DBMS, the engine handles the reverting (Rollback) for you automatically.

### 2. Consistency

Consistency ensures that a transaction takes the database from one valid state to another valid state. The database must satisfy all predefined rules, constraints, and triggers before and after the transaction.
*   *Example:* If a column has a rule that account balance cannot be negative, a transaction attempting to withdraw more than the balance will violate consistency and be rolled back.

### 3. Isolation

Isolation ensures that the concurrent execution of multiple transactions leaves the database in the same state as if the transactions were executed sequentially.
*   *Example:* If User 1 and User 2 both try to buy the last seat on a flight at the exact same time, isolation ensures only one succeeds, and the other sees the seat as unavailable.

> [!WARNING] **TRAP:**
> Students often confuse Consistency with Isolation. Consistency is about business rules and constraints (e.g., age > 0). Isolation is strictly about handling multiple users accessing the data at the EXACT same time.

### 4. Durability

Durability guarantees that once a transaction has been committed, it will remain committed even in the event of a system failure (e.g., power loss, crash). The database writes the committed data to non-volatile memory.
*   *Example:* Once you receive confirmation of a successful bank transfer, the money is transferred, even if the bank's server crashes immediately after.

> [!TIP] **EXAM TIP:**
> For ACID properties, ALWAYS use the Bank Transfer example. Examiners look for this specific example because it perfectly illustrates all four properties.\`,
          richContent: \`### Transaction States Trace
When a transaction executes, it passes through various states:
1. **Active:** The initial state. The transaction stays here while executing.
2. **Partially Committed:** After the final statement has been executed, but before actual disk writes are confirmed.
3. **Failed:** If a check fails or the system crashes before committing.
4. **Aborted:** After the transaction has been rolled back and the DB is restored to its prior state.
5. **Committed:** After successful execution and data is permanently saved to disk.`,
          shortNotes: 'Atomicity (All or nothing), Consistency (Valid state), Isolation (Concurrent safety), Durability (Permanent changes).',
          examples: [
            {
              title: 'Bank Transfer Transaction',
              description: 'A classic example showcasing all ACID properties.',
              code: `BEGIN TRANSACTION;
UPDATE Accounts SET Balance = Balance - 100 WHERE ID = 1;
UPDATE Accounts SET Balance = Balance + 100 WHERE ID = 2;
COMMIT;`
            }
          ],
          keyPoints: [
            'ACID stands for Atomicity, Consistency, Isolation, Durability.',
            'Essential for critical systems like banking and e-commerce.',
            'Implemented by the DBMS transaction manager and recovery manager.'
          ],
          theoryQuestions: [
            {
              question: 'Explain the ACID properties of database transactions in detail. How does DBMS guarantee each property?',
              marks: '7 Marks',
              answer: 'ACID Properties guarantee transaction reliability:\n1. **Atomicity (All or Nothing):** The entire transaction executes to completion, or none of its effects remain in the database. Guaranteed by the **Recovery Manager using Write-Ahead Logging (WAL)** and rollback.\n2. **Consistency (Preserving Invariants):** Execution of a transaction in isolation preserves database integrity constraints. Guaranteed by application code and DBMS constraint checking.\n3. **Isolation (Independent Execution):** Concurrent transactions execute without interfering with one another. Guaranteed by the **Concurrency Control Manager using Two-Phase Locking (2PL) or Timestamp Ordering**.\n4. **Durability (Permanence):** Once a transaction commits, its updates persist permanently, even in the event of a system crash. Guaranteed by the Recovery Manager through flushing transaction logs to non-volatile storage.',
              keyPoints: ['Atomicity: Recovery manager / WAL.', 'Consistency: Integrity constraints.', 'Isolation: Concurrency control / 2PL.', 'Durability: Non-volatile log flush.']
            },
          ],
          mcqs: [
            {
              question: 'Which property ensures that a transaction is completely executed or completely rolled back?',
              options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
              correctIndex: 0,
              explanation: 'Atomicity is the all-or-nothing property.'
            },
            {
              question: 'Which property ensures that changes made by committed transactions are permanent?',
              options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
              correctIndex: 3,
              explanation: 'Durability ensures data survives system crashes once committed.'
            },
            {
              question: 'If two users modify the same record simultaneously, which property prevents data corruption?',
              options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
              correctIndex: 2,
              explanation: 'Isolation handles concurrent access control.'
            }
          ]
        }
      ]
    },
    {
      id: 'unit-5',
      title: 'File Organization & Indexing',
      description: 'How data is stored physically and accessed quickly using indexes.',
      topics: [
        {
          id: 'indexing-basics',
          title: 'Indexing (Primary, Secondary, B-Trees)',
          simpleExplanation: 'An index is like a book\'s table of contents. It helps the database find data quickly without reading every single row (a full table scan).',
          detailedExplanation: `### B+ Tree Indexing Hierarchy
\`\`\`mermaid
flowchart TD
    subgraph BPlusTree["B+ Tree Index Structure"]
        ROOT["Root Index Node: [ K20 | K50 ]"]
        I1["Internal Node: [ K10 ]"]
        I2["Internal Node: [ K30 | K40 ]"]
        I3["Internal Node: [ K60 | K70 ]"]

        ROOT --> I1 & I2 & I3

        L1["Leaf: [ 5, 10 ]"]
        L2["Leaf: [ 15, 20 ]"]
        L3["Leaf: [ 25, 30 ]"]
        L4["Leaf: [ 35, 40, 50 ]"]
        L5["Leaf: [ 55, 60 ]"]
        L6["Leaf: [ 65, 70, 80 ]"]

        I1 --> L1 & L2
        I2 --> L3 & L4
        I3 --> L5 & L6

        L1 <==>|"Sequential Linked List"| L2
        L2 <==>|"Range Scan"| L3
        L3 <==>|"Fast"| L4
        L4 <==>|"Traversal"| L5
        L5 <==>|"Pointers"| L6
    end
\`\`\`
### Database Indexing

Indexing is a data structure technique used to quickly locate and access the data in a database. Without an index, a DBMS has to scan the entire table to find the relevant rows (known as a full table scan), which is extremely slow for large datasets.

> [!IMPORTANT] **MEMORIZE:**
> **Index:** A data structure (usually a B-Tree) that improves the speed of data retrieval operations on a database table at the cost of additional writes and storage space.

### Types of Indexes

1.  **Primary Index:** Based on the primary key of the table. The primary index defines the physical order of the data in the table. Because data can only be sorted in one physical order, a table can have only ONE primary (clustered) index.
2.  **Secondary Index (Non-Clustered):** Based on non-primary key columns that are frequently used in search queries. A secondary index contains a pointer (or row ID) to the actual physical location of the data. A table can have multiple secondary indexes.
3.  **Dense Index:** Contains an index record for *every* search key value in the data file. Faster for lookups but takes up more space.
4.  **Sparse Index:** Contains index records for only *some* search key values. Usually used when the data file itself is sequentially ordered.

> [!NOTE] **DEV BRAIN:**
> Think of an Index like a Hash Map (Object/Dict) or a Binary Search Tree in memory. If you search an array of 1 million items linearly \`.find()\`, it's slow (O(N)). An index turns that search into O(log N) or O(1).

### B-Trees and B+ Trees

Modern relational databases primarily use B-Tree (Balanced Tree) or B+ Tree data structures to implement indexes.

*   **B-Tree:** A self-balancing tree data structure that keeps data sorted and allows searches, sequential access, insertions, and deletions in logarithmic time. Data is stored in both internal nodes and leaf nodes.
*   **B+ Tree:** A variation of the B-Tree where all data pointers are stored ONLY at the leaf nodes. Internal nodes only store keys to guide the search. Leaf nodes are linked together in a linked list format. This is highly preferred for database systems because it makes sequential scanning (range queries like \`BETWEEN 10 AND 50\`) extremely fast.

> [!WARNING] **TRAP:**
> More indexes do NOT mean better performance! While they speed up \`SELECT\` queries, every time you \`INSERT\`, \`UPDATE\`, or \`DELETE\`, the DBMS must also update all related indexes. Too many indexes will make your write operations painfully slow.

> [!TIP] **EXAM TIP:**
> Always highlight the difference between B-Tree and B+ Tree: "In B+ Trees, data pointers are ONLY at the leaf nodes, and leaves are linked." This is the core distinction examiners look for.\`,
          richContent: \`### Step-by-Step Index Lookup
**Scenario:** Looking for Employee ID = 45 in a B+ Tree index.
1. **Root Node:** Contains keys [20, 40, 60]. 45 is between 40 and 60, so follow the middle pointer.
2. **Internal Node:** Contains keys [42, 48]. 45 is between 42 and 48, so follow the left pointer.
3. **Leaf Node:** Contains [43, 44, 45]. Match found! 
4. **Data Fetch:** Read the memory address pointer attached to 45 in the leaf node and fetch the full row from the disk.`,
          shortNotes: 'Indexes speed up read queries but slow down write queries. B+ Trees are standard for DB indexes.',
          examples: [
            {
              title: 'Creating an Index',
              description: 'How to create a basic index on a column to speed up searches.',
              code: `-- Create a secondary index on the 'Email' column
CREATE INDEX idx_student_email ON Students(Email);

-- The DBMS will now use the index for this query instead of scanning the whole table
SELECT * FROM Students WHERE Email = 'test@example.com';`
            }
          ],
          keyPoints: [
            'Indexes improve read performance drastically.',
            'Indexes consume storage space and degrade write (INSERT/UPDATE/DELETE) performance.',
            'B+ Trees are the most common structure due to fast range query support.'
          ],
          mcqs: [
            {
              question: 'How many clustered (primary) indexes can a table have?',
              options: ['0', '1', 'Many', 'Depends on the DBMS'],
              correctIndex: 1,
              explanation: 'Data can only be physically sorted in one way, so a table can have only 1 clustered index.'
            },
            {
              question: 'In which tree structure are data records stored ONLY in the leaf nodes?',
              options: ['Binary Search Tree', 'B-Tree', 'B+ Tree', 'AVL Tree'],
              correctIndex: 2,
              explanation: 'B+ Trees store all actual data pointers in leaf nodes and link them for fast sequential access.'
            },
            {
              question: 'What is the main disadvantage of having too many indexes on a table?',
              options: ['Slows down SELECT queries', 'Slows down INSERT/UPDATE/DELETE operations', 'Causes data corruption', 'Violates ACID properties'],
              correctIndex: 1,
              explanation: 'Every time data is modified, all relevant indexes must also be updated, which slows down write operations.'
            }
          ]
        }
      ]
    }
  ]
};
