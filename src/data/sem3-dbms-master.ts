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
          detailedExplanation: `### Introduction to Database Management Systems

A Database Management System (DBMS) is a specialized software application designed to manage, store, retrieve, and manipulate data in a structured and efficient manner. Before the advent of DBMS, data was typically stored in flat files. This traditional File System approach had numerous drawbacks, including data redundancy (storing the same data in multiple places), data inconsistency (updating data in one place but not another), difficulty in accessing data, and lack of security.

### Advantages of DBMS over File Systems

1. **Reduction of Data Redundancy and Inconsistency:** In file systems, duplicate data often exists in multiple files. A DBMS centralizes data, minimizing redundancy and ensuring that data remains consistent across the database.
2. **Data Sharing:** A DBMS allows multiple users and applications to share the same database simultaneously, with appropriate access controls.
3. **Data Integrity:** DBMS enforces integrity constraints to ensure that the data stored is accurate and valid. For example, a student's age cannot be negative.
4. **Data Security:** DBMS provides robust security mechanisms, such as user authentication and authorization, to restrict unauthorized access to sensitive data.
5. **Concurrent Access and Crash Recovery:** DBMS handles concurrent access by multiple users without data corruption and provides mechanisms to recover data in case of system failures.
6. **Data Independence:** DBMS separates the data from the applications that use it. This means you can change the underlying storage structure without modifying the applications.

### Core Components of a DBMS

*   **Hardware:** The physical devices where data is stored (servers, hard drives).
*   **Software:** The DBMS software itself (e.g., MySQL, Oracle, PostgreSQL).
*   **Data:** The actual information being stored.
*   **Procedures:** The rules and instructions that govern the design and use of the database.
*   **Users:** The people interacting with the database (Database Administrators, Application Programmers, End Users).`,
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
          detailedExplanation: `### Database Architecture Overview

Database architecture establishes the framework for how a database system is structured, how users interact with it, and how components communicate. The architecture is broadly classified into single-tier, two-tier, and three-tier models, depending on the separation between the user interface, business logic, and database management.

### 1-Tier Architecture

In a 1-tier architecture, the database and the application are tightly coupled and reside on the same machine. The user interacts directly with the database without any intermediate layers.
*   **Use Cases:** Local applications, development environments, and simple desktop software (e.g., MS Access, SQLite).
*   **Pros:** Easy to set up, minimal latency.
*   **Cons:** Not scalable, lacks security, cannot be shared easily among multiple users over a network.

### 2-Tier Architecture (Client-Server)

In a 2-tier architecture, the system is divided into two parts: the client application and the database server. The client application contains the user interface and the business logic, and it communicates directly with the database server using APIs like ODBC or JDBC.
*   **Use Cases:** Internal corporate networks, desktop applications requiring a centralized database.
*   **Pros:** Better scalability than 1-tier, improved security, centralized data management.
*   **Cons:** Business logic is on the client, making updates difficult (fat client). Heavy network traffic if the client requests large datasets.

### 3-Tier Architecture

This is the most common architecture for modern web applications. It introduces a middle tier (application server) between the client and the database.
1.  **Presentation Tier (Client):** The user interface (e.g., a web browser or mobile app).
2.  **Application Tier (Business Logic):** An intermediate server (e.g., Node.js, Django, Spring Boot) that processes user inputs, enforces business rules, and communicates with the database.
3.  **Data Tier (Database Server):** The DBMS that stores and manages the data.
*   **Use Cases:** Web applications, large-scale enterprise systems.
*   **Pros:** High scalability, strong security (client never touches the DB), easy to maintain and update business logic.
*   **Cons:** More complex to design and implement, potential latency due to multiple hops.`,
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
          detailedExplanation: `### Entity-Relationship (ER) Model

The ER model is a high-level conceptual data model used to design and represent the logical structure of a database. It allows database designers to sketch out the database architecture before implementing it in a specific DBMS.

### Core Components

1. **Entity:** An entity is a real-world object or concept that can be distinctly identified. Examples include a Student, Course, or Employee. In an ER diagram, entities are represented by **rectangles**.
   * **Weak Entity:** An entity that cannot be uniquely identified by its own attributes and relies on a related strong entity (e.g., a Dependent relies on an Employee). Represented by a double rectangle.

2. **Attribute:** Attributes describe the properties or characteristics of an entity. Examples for a Student entity include Roll_Number, Name, and Age. Represented by **ovals**.
   * **Key Attribute:** Uniquely identifies an entity (e.g., Roll_Number). Represented by an oval with underlined text.
   * **Composite Attribute:** An attribute that can be divided into smaller sub-parts (e.g., Name can be First_Name and Last_Name).
   * **Multivalued Attribute:** An attribute that can have multiple values (e.g., Phone_Number). Represented by a double oval.
   * **Derived Attribute:** An attribute whose value is calculated from other attributes (e.g., Age derived from Date_of_Birth). Represented by a dashed oval.

3. **Relationship:** A relationship illustrates how two or more entities are associated with each other. For example, a Student "Enrolls" in a Course. Represented by **diamonds**.

### Cardinality Ratios

Cardinality defines the maximum number of relationship instances an entity can participate in.
*   **One-to-One (1:1):** One instance of entity A is associated with one instance of entity B (e.g., a Manager manages one Department).
*   **One-to-Many (1:N):** One instance of entity A is associated with multiple instances of entity B (e.g., a Department has many Employees).
*   **Many-to-One (N:1):** Multiple instances of entity A are associated with one instance of entity B (e.g., many Students enroll in one Course).
*   **Many-to-Many (M:N):** Multiple instances of entity A are associated with multiple instances of entity B (e.g., many Students enroll in many Courses).`,
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
          detailedExplanation: `### Data Manipulation Language (DML)

DML allows users to interact with the data stored in a relational database. The core commands are SELECT (to retrieve data), INSERT (to add new rows), UPDATE (to modify existing data), and DELETE (to remove rows).

### 1. SELECT Statement

The \`SELECT\` statement is the most frequently used SQL command. It retrieves data from one or more tables.
*   **Syntax:** \`SELECT column1, column2 FROM table_name WHERE condition;\`
*   You can use \`*\` to select all columns.
*   The \`WHERE\` clause filters the results based on a condition.

### 2. INSERT Statement

The \`INSERT INTO\` statement is used to add new records (rows) to a table.
*   **Syntax (specifying columns):** \`INSERT INTO table_name (column1, column2) VALUES (value1, value2);\`
*   **Syntax (all columns):** \`INSERT INTO table_name VALUES (value1, value2, ...);\`

### 3. UPDATE Statement

The \`UPDATE\` statement modifies existing records in a table.
*   **Syntax:** \`UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;\`
*   **CRITICAL WARNING:** Always use a \`WHERE\` clause with \`UPDATE\`. If you omit it, ALL records in the table will be updated!

### 4. DELETE Statement

The \`DELETE\` statement removes existing records from a table.
*   **Syntax:** \`DELETE FROM table_name WHERE condition;\`
*   **CRITICAL WARNING:** Similar to UPDATE, if you omit the \`WHERE\` clause, ALL records in the table will be deleted.`,
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
          detailedExplanation: `### Understanding SQL Joins

In relational databases, data is often normalized and split across multiple tables to reduce redundancy. To view a complete picture, you need to combine data from these tables. SQL \`JOIN\` clauses allow you to link tables together based on common columns (usually Primary Key - Foreign Key relationships).

### Types of Joins

1.  **INNER JOIN:** Returns records that have matching values in **both** tables. If a row in Table A has no match in Table B, it is omitted.
    *   *Analogy:* The intersection of two Venn diagram circles.

2.  **LEFT (OUTER) JOIN:** Returns **all** records from the left table (Table A), and the matched records from the right table (Table B). The result is NULL from the right side if there is no match.
    *   *Analogy:* The entire left circle, plus the intersection.

3.  **RIGHT (OUTER) JOIN:** Returns **all** records from the right table (Table B), and the matched records from the left table (Table A). The result is NULL from the left side when there is no match.
    *   *Analogy:* The entire right circle, plus the intersection.

4.  **FULL (OUTER) JOIN:** Returns all records when there is a match in either left or right table. Unmatched rows will contain NULL for the columns of the table that lacked a match.
    *   *Analogy:* Both circles completely.

5.  **CROSS JOIN:** Returns the Cartesian product of the two tables. If Table A has 3 rows and Table B has 4 rows, the result will have 12 rows. Usually used without an ON clause.`,
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
          detailedExplanation: `### Database Normalization

Normalization is the process of structuring a relational database in accordance with a series of so-called normal forms in order to reduce data redundancy and improve data integrity. It involves dividing large tables into smaller, less redundant tables and defining relationships between them.

### First Normal Form (1NF)

*   **Rule:** A table is in 1NF if it contains only atomic (indivisible) values. There can be no repeating groups or arrays.
*   **Action:** If a column has multiple values (e.g., a student with multiple phone numbers in one cell), separate them into multiple rows or create a new table.

### Second Normal Form (2NF)

*   **Rule:** A table is in 2NF if it is in 1NF AND every non-prime attribute is fully functionally dependent on the primary key.
*   **Action:** This applies primarily to tables with composite primary keys. If an attribute depends on only part of the primary key (Partial Dependency), move it to a new table.

### Third Normal Form (3NF)

*   **Rule:** A table is in 3NF if it is in 2NF AND there are no transitive dependencies.
*   **Action:** A transitive dependency occurs when a non-prime attribute depends on another non-prime attribute (A -> B and B -> C, so A -> C). Move the transitively dependent attributes to a new table.

### Boyce-Codd Normal Form (BCNF)

*   **Rule:** BCNF is a stronger version of 3NF. A table is in BCNF if for every non-trivial functional dependency X -> Y, X is a superkey.
*   **Action:** It addresses situations where a table is in 3NF but still has anomalies, typically when there are multiple overlapping candidate keys.`,
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
          detailedExplanation: `### ACID Properties in DBMS

A transaction is a single logical unit of work that accesses and possibly modifies the contents of a database. To maintain data integrity, database transactions must adhere to four key properties, known collectively by the acronym ACID.

### 1. Atomicity (The All-or-Nothing Rule)

Atomicity ensures that all operations within a transaction are completed successfully. If any operation fails, the entire transaction is aborted, and the database is rolled back to its previous state prior to the transaction.
*   *Example:* Transferring money from Account A to Account B involves deducting from A and adding to B. If deducting succeeds but adding fails, the money must be refunded to A.

### 2. Consistency

Consistency ensures that a transaction takes the database from one valid state to another valid state. The database must satisfy all predefined rules, constraints, and triggers before and after the transaction.
*   *Example:* If a column has a rule that account balance cannot be negative, a transaction attempting to withdraw more than the balance will violate consistency and be rolled back.

### 3. Isolation

Isolation ensures that the concurrent execution of multiple transactions leaves the database in the same state as if the transactions were executed sequentially.
*   *Example:* If User 1 and User 2 both try to buy the last seat on a flight at the exact same time, isolation ensures only one succeeds, and the other sees the seat as unavailable.

### 4. Durability

Durability guarantees that once a transaction has been committed, it will remain committed even in the event of a system failure (e.g., power loss, crash). The database writes the committed data to non-volatile memory.
*   *Example:* Once you receive confirmation of a successful bank transfer, the money is transferred, even if the bank's server crashes immediately after.`,
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
          detailedExplanation: `### Database Indexing

Indexing is a data structure technique used to quickly locate and access the data in a database. Without an index, a DBMS has to scan the entire table to find the relevant rows (known as a full table scan), which is extremely slow for large datasets.

### Types of Indexes

1.  **Primary Index:** Based on the primary key of the table. The primary index defines the physical order of the data in the table. Because data can only be sorted in one physical order, a table can have only ONE primary (clustered) index.
2.  **Secondary Index (Non-Clustered):** Based on non-primary key columns that are frequently used in search queries. A secondary index contains a pointer (or row ID) to the actual physical location of the data. A table can have multiple secondary indexes.
3.  **Dense Index:** Contains an index record for *every* search key value in the data file. Faster for lookups but takes up more space.
4.  **Sparse Index:** Contains index records for only *some* search key values. Usually used when the data file itself is sequentially ordered.

### B-Trees and B+ Trees

Modern relational databases primarily use B-Tree (Balanced Tree) or B+ Tree data structures to implement indexes.
*   **B-Tree:** A self-balancing tree data structure that keeps data sorted and allows searches, sequential access, insertions, and deletions in logarithmic time. Data is stored in both internal nodes and leaf nodes.
*   **B+ Tree:** A variation of the B-Tree where all data pointers are stored ONLY at the leaf nodes. Internal nodes only store keys to guide the search. Leaf nodes are linked together in a linked list format. This is highly preferred for database systems because it makes sequential scanning (range queries like \`BETWEEN 10 AND 50\`) extremely fast.`,
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
