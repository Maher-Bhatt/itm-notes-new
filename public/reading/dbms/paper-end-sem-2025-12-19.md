> **Database Management System (C2311C4) · End-semester examination, Winter 2025 · 19 December 2025 · 100 marks · 10:10 am – 1:10 pm**
> ITM SLS Baroda University · B.Tech Semester III (Regular). Question 1 is compulsory.
> Questions transcribed from the original paper. Solutions are written by CampusLoop; check them against your class notes.

# Q1. Multiple choice questions [20]

**1. Which of the following best describes data independence?**
a) Data is independent of hardware · b) Ability to modify schema without changing application programs · c) Data stored independently in multiple locations · d) None of the above
**Answer: (b).**

**2. Which language is used to define the structure of a database?** a) DML · b) DDL · c) DCL · d) TCL
**Answer: (b) DDL.**

**3. Which of the following is an advantage of using DBMS over file systems?**
a) Data redundancy increases · b) Data isolation increases · c) Improved data sharing and security · d) None of these
**Answer: (c).**

**4. Which of the following is a feature of the ER model?**
a) Supports object encapsulation · b) Represents data as entities and relationships · c) Focuses on network topology · d) Deals with data distribution
**Answer: (b).**

**5. Which model uses records and sets to represent data?**
a) Hierarchical · b) Relational · c) Network · d) Object-oriented
**Answer: (c) Network model** (records linked by owner–member *sets*).

**6. In the relational model, data is organized in:** a) Trees · b) Graphs · c) Tables · d) Hierarchies
**Answer: (c) Tables (relations).**

**7. Which operation in relational algebra combines tuples from two relations?** a) Select · b) Project · c) Join · d) Rename
**Answer: (c) Join.**

**8. Which SQL clause is used to remove duplicate rows from the result set?** a) UNIQUE · b) DISTINCT · c) REMOVE · d) FILTER
**Answer: (b) DISTINCT.**

**9. Which SQL command is used to create a new table?** a) MAKE TABLE · b) NEW TABLE · c) CREATE TABLE · d) DEFINE TABLE
**Answer: (c) CREATE TABLE.**

**10. A relation is in 1NF if:** a) no partial dependencies · b) no multivalued attributes · c) it has a candidate key · d) it has transitive dependencies
**Answer: (b).**

**11. Which normal form removes transitive dependency?** a) 1NF · b) 2NF · c) 3NF · d) BCNF
**Answer: (c) 3NF.**

**12. Armstrong's axioms are used for:** a) SQL query optimization · b) Functional dependency inference · c) Normalization of data · d) Designing ER diagrams
**Answer: (b)** (reflexivity, augmentation, transitivity).

**13. Which of the following is a goal of query optimization?** a) Minimize query result size · b) Minimize execution time · c) Maximize redundancy · d) None of these
**Answer: (b).**

**14. Which operation is most expensive in query processing?** a) Selection · b) Projection · c) Join · d) Rename
**Answer: (c) Join.**

**15. Which of the following determines query equivalence?** a) Same output for all databases · b) Same syntax · c) Same schema · d) Same table names
**Answer: (a)** two expressions are equivalent if they produce the same result on every legal database instance.

**16. Which of the following is NOT an ACID property?** a) Atomicity · b) Consistency · c) Isolation · d) Durability Control
**Answer: (d)** the property is *Durability*, not "Durability Control".

**17. A schedule is serializable if:** a) It has no transactions · b) Its outcome is equivalent to a serial schedule · c) It executes in serial order · d) All transactions use the same lock
**Answer: (b).**

**18. Which type of control uses timestamps for concurrency?** a) Lock-based · b) Optimistic · c) Time-stamp based · d) Serial
**Answer: (c) Timestamp-based protocol.**

**19. Which SQL command is used to grant privileges to a user?** a) PERMIT · b) GRANT · c) ALLOW · d) AUTHORIZE
**Answer: (b) GRANT.**

**20. In PL/SQL, which is used to handle exceptions?** a) ROLLBACK · b) TRY-CATCH · c) EXCEPTION block · d) HANDLE block
**Answer: (c) EXCEPTION block.**

# Q2. Answer any FOUR (out of six) [20]

## Q2.1 Explain the architecture of a DBMS with a neat diagram.

Draw the **three-level ANSI/SPARC architecture**: external level (user views) → conceptual level (whole logical schema) → internal level (physical storage), with external/conceptual and conceptual/internal mappings that give logical and physical data independence. For a 5-mark answer also show the **system components**: users (naive users, programmers, DBA) → query processor (DDL interpreter, DML compiler, query evaluation engine) → storage manager (authorization and integrity manager, transaction manager, file manager, buffer manager) → disk (data files, data dictionary, indexes).
Full explanation: [DBMS CET-1, Q2.1](/library/dbms/paper-cet-1-2025-08-23#q2-1-explain-the-architecture-of-dbms).

## Q2.2 Differentiate between file system and DBMS.

| File system | DBMS |
|---|---|
| Data in separate files per application | Data integrated in one database |
| High redundancy and inconsistency | Controlled redundancy, consistent data |
| Hard to access data (new program for each query) | Easy access with SQL |
| No central security | Authorization and access control |
| No concurrency control | Concurrent access with locks/transactions |
| No backup and recovery | Automatic backup and recovery |
| Integrity rules buried in code | Integrity constraints declared in the schema |
| Cheap, simple | Costly, more complex |

## Q2.3 Five operations of relational algebra with examples.

Using `Student(RollNo, Name, Branch, SPI)` and `Course(RollNo, CourseID)`:
1. **Selection σ:** rows satisfying a condition. σ Branch='CE' (Student).
2. **Projection π:** chosen columns, duplicates removed. π Name, SPI (Student).
3. **Union ∪ / Set difference − / Intersection ∩:** on union-compatible relations. π RollNo (Student) − π RollNo (Course) → students not enrolled.
4. **Cartesian product ×:** every pair of tuples. Student × Course.
5. **Join ⋈:** product followed by selection on matching attributes. Student ⋈ Course (natural join on RollNo).
6. **Rename ρ:** ρ S(Student) gives the relation a new name (needed for self-joins).

## Q2.4 What is serializability? Types of serializability.

A concurrent schedule is **serializable** if its effect equals that of some **serial** schedule of the same transactions; serializable schedules preserve consistency.
- **Conflict serializability:** the schedule can be turned into a serial one by swapping non-conflicting operations. Two operations conflict if they belong to different transactions, access the same item, and at least one is a write (R–W, W–R, W–W). **Test:** draw the **precedence graph** (edge Tᵢ → Tⱼ if an operation of Tᵢ conflicts with and precedes one of Tⱼ); the schedule is conflict serializable **iff the graph has no cycle**.
- **View serializability:** same initial reads, same reads-from relationships and same final writes as a serial schedule. Every conflict-serializable schedule is view serializable, but not vice versa (blind writes).

## Q2.5 Types of data independence with examples.

- **Physical data independence:** change the internal schema without changing the conceptual schema. Example: add an index on `RollNo`, move the table to SSD, change file organisation; queries are unchanged.
- **Logical data independence:** change the conceptual schema without changing external views/application programs. Example: add a column `Email` to `Student` or split a table; existing views still work. Harder to achieve than physical independence.

## Q2.6 Explain DDL and DML commands with examples.

**DDL (Data Definition Language)** defines structure:
```sql
CREATE TABLE Student (RollNo INT PRIMARY KEY, Name VARCHAR(40), SPI DECIMAL(4,2));
ALTER TABLE Student ADD Email VARCHAR(60);
DROP TABLE Student;
TRUNCATE TABLE Student;      -- delete all rows, keep structure
RENAME Student TO Learner;
```
**DML (Data Manipulation Language)** works on the data:
```sql
INSERT INTO Student VALUES (101, 'Raj', 8.2);
UPDATE Student SET SPI = 8.5 WHERE RollNo = 101;
DELETE FROM Student WHERE RollNo = 101;
SELECT Name, SPI FROM Student WHERE SPI > 8;
```
DDL changes are auto-committed; DML changes can be committed or rolled back.

# Q3. Answer any FOUR (out of six) [20]

## Q3.1 Phases of query processing with a neat diagram.

Parsing and translation → (relational algebra) → optimization (using catalog statistics) → execution plan → evaluation engine → result. Full answer with diagram: [DBMS CET-2, Q2.4](/library/dbms/paper-cet-2-2025-10-09#q2-4-discuss-the-steps-of-query-processing-with-a-proper-diagram).

## Q3.2 What is query optimization? Join strategies used for query optimization.

**Query optimization** chooses, among equivalent evaluation plans, the one with the lowest estimated cost (mainly disk I/O), using equivalence rules (push selections/projections down, reorder joins) and statistics (tuple counts, distinct values, indexes).

**Join strategies (for r ⋈ s):**
- **Nested-loop join:** for each tuple of r, scan all of s. Cost ≈ nᵣ·bₛ + bᵣ block transfers. Works for any condition.
- **Block nested-loop join:** for each *block* of r, scan s. Cost ≈ bᵣ·bₛ + bᵣ. Better.
- **Indexed nested-loop join:** use an index on s's join attribute instead of scanning s.
- **Sort-merge join:** sort both on the join attribute, then merge. Cost ≈ bᵣ + bₛ (+ sorting). Equi-joins only.
- **Hash join:** partition both relations with the same hash function, then join matching partitions. Cost ≈ 3(bᵣ + bₛ). Very efficient for equi-joins.

## Q3.3 Explain ACID properties of transactions with examples.

Example transaction T: transfer ₹500 from account A to B: `read(A); A := A − 500; write(A); read(B); B := B + 500; write(B)`.
- **Atomicity:** all or nothing. If the system fails after write(A) but before write(B), the recovery manager undoes write(A).
- **Consistency:** a transaction takes the database from one consistent state to another (A + B is the same before and after).
- **Isolation:** concurrent transactions don't see each other's intermediate results; the result equals some serial order (handled by concurrency control).
- **Durability:** once T commits, the change survives crashes (logs, write-ahead logging).

## Q3.4 Types of concurrency control mechanisms in DBMS.

1. **Lock-based protocols:** shared (S) locks for reading, exclusive (X) locks for writing. **Two-phase locking (2PL):** a growing phase (acquire only) then a shrinking phase (release only) guarantees conflict serializability; **strict 2PL** holds X locks until commit (avoids cascading rollback).
2. **Timestamp-based protocols:** each transaction gets a timestamp TS(T); every item keeps R-timestamp and W-timestamp; operations that would violate timestamp order are rejected and the transaction is rolled back (Thomas' write rule ignores obsolete writes).
3. **Validation (optimistic) protocol:** read phase → validation phase → write phase; conflicts are checked only at commit time. Good when conflicts are rare.
4. **Multiversion schemes:** keep old versions so reads never wait.
Also: **deadlock handling** (wait-for graph detection, wait-die and wound-wait prevention).

## Q3.5 PL/SQL block to find the factorial of a number using a loop.

```sql
DECLARE
  n    NUMBER := 5;
  fact NUMBER := 1;
BEGIN
  FOR i IN 1 .. n LOOP
    fact := fact * i;
  END LOOP;
  DBMS_OUTPUT.PUT_LINE('Factorial of ' || n || ' = ' || fact);   -- 120
END;
/
```
(Run `SET SERVEROUTPUT ON;` first to see the output.)

## Q3.6 Short note on join ordering and its effect on query performance.

For several joins (r₁ ⋈ r₂ ⋈ r₃) the result is the same in any order (join is associative and commutative), but **intermediate result sizes differ hugely**. Example: if `r₂ ⋈ r₃` produces few tuples, compute it first, then join with r₁. The optimizer estimates sizes from statistics and uses **dynamic programming** (left-deep join trees) to choose the cheapest order. A good order: joins with selective conditions first, avoid Cartesian products, use available indexes. A bad order can make a query orders of magnitude slower.

# Q4. Answer any FOUR (out of six) [20]

## Q4.1 PL/SQL block to find whether a number is odd or even.

```sql
DECLARE
  n NUMBER := 17;
BEGIN
  IF MOD(n, 2) = 0 THEN
    DBMS_OUTPUT.PUT_LINE(n || ' is even');
  ELSE
    DBMS_OUTPUT.PUT_LINE(n || ' is odd');
  END IF;
END;
/
```
(For user input use `n NUMBER := &n;` in SQL*Plus.)

## Q4.2 Role of the Database Administrator (DBA) in database security and recovery.

- **Schema definition and storage structure:** creates and modifies the conceptual and physical schema.
- **Security:** creates user accounts, grants/revokes privileges (`GRANT`, `REVOKE`, roles), defines views to hide data, enforces password and audit policies.
- **Integrity:** defines constraints.
- **Backup and recovery:** schedules regular full/incremental backups, maintains logs, plans and tests recovery after failures (redo/undo using logs and checkpoints).
- **Performance monitoring and tuning:** indexes, storage, query tuning.
- **Routine maintenance:** upgrades, disk space, availability.

## Q4.3 SQL queries using aggregate functions for an Employee table.

`Employee(E_ID, E_name, Salary, Dept)`
```sql
SELECT SUM(Salary)  AS total_salary FROM Employee;
SELECT AVG(Salary)  AS avg_salary   FROM Employee;
SELECT COUNT(*)     AS employees    FROM Employee;
SELECT MAX(Salary)  AS highest      FROM Employee;
SELECT MIN(Salary)  AS lowest       FROM Employee;
SELECT Dept, COUNT(*), AVG(Salary) FROM Employee GROUP BY Dept;           -- per department
SELECT Dept, SUM(Salary) FROM Employee GROUP BY Dept HAVING SUM(Salary) > 100000;
```

## Q4.4 Join three tables with INNER JOIN.

`Employee(E_ID, E_name, Salary, D_Name, P_Name)`, `Department(D_ID, D_Name, Branch)`, `Project(P_ID, P_Name, D_Name, E_Name)`:
```sql
SELECT e.E_ID, e.E_name, e.Salary, d.D_Name, d.Branch, p.P_ID, p.P_Name
FROM Employee e
INNER JOIN Department d ON e.D_Name = d.D_Name
INNER JOIN Project    p ON e.P_Name = p.P_Name AND p.D_Name = d.D_Name;
```
Only employees that have a matching department and project appear in the result.

## Q4.5 Transaction control commands (COMMIT, ROLLBACK, SAVEPOINT) with examples.

```sql
UPDATE Account SET balance = balance - 500 WHERE acc_no = 'A';
SAVEPOINT after_debit;
UPDATE Account SET balance = balance + 500 WHERE acc_no = 'B';
ROLLBACK TO after_debit;   -- undo only the credit
COMMIT;                    -- make the remaining changes permanent
```
- **COMMIT:** permanently saves all changes of the current transaction.
- **ROLLBACK:** undoes all uncommitted changes since the last commit.
- **SAVEPOINT name:** marks a point inside a transaction; `ROLLBACK TO name` undoes changes after it only.
(Also `SET TRANSACTION` to set properties like read-only.)

## Q4.6 Database triggers: syntax and example.

A **trigger** is a stored PL/SQL block that runs automatically when an event (INSERT, UPDATE, DELETE) occurs on a table, BEFORE or AFTER it, per row or per statement.
```sql
CREATE OR REPLACE TRIGGER trg_salary_check
BEFORE INSERT OR UPDATE ON Employee
FOR EACH ROW
BEGIN
  IF :NEW.Salary < 0 THEN
    RAISE_APPLICATION_ERROR(-20001, 'Salary cannot be negative');
  END IF;
END;
/
```
Uses: enforce complex constraints, auditing (log changes into an audit table), derive column values, maintain summary tables.

# Q5. Answer any FOUR (out of six) [20]

## Q5.1 What is a lossless-join decomposition? Explain with example.

A decomposition of R into R₁ and R₂ is **lossless** if R₁ ⋈ R₂ = R (no spurious tuples). It is lossless **iff R₁ ∩ R₂ → R₁ or R₁ ∩ R₂ → R₂** (the common attributes are a key of at least one part).

**Example:** `Emp(E_ID, Name, Dept, DeptHead)` with E_ID → Name, Dept and Dept → DeptHead. Decompose into R₁(E_ID, Name, Dept) and R₂(Dept, DeptHead). R₁ ∩ R₂ = Dept, and Dept → DeptHead, so Dept is a key of R₂ → **lossless**. Splitting instead into (E_ID, Name) and (Dept, DeptHead) shares no attribute → the join is a Cartesian product → **lossy**.

## Q5.2 SQL queries: Employee(Id, Name, Salary, D_Name), Department(D_Id, D_Name)

```sql
-- (i) employees with salary greater than 50,000
SELECT * FROM Employee WHERE Salary > 50000;

-- (ii) department-wise average salary
SELECT D_Name, AVG(Salary) AS avg_salary
FROM Employee
GROUP BY D_Name;
```

## Q5.3 ER diagram for a hospital management system.

**Entities:** Patient(patient_id, name, dob, phone), Doctor(doctor_id, name, specialization), Department(dept_id, name), Ward/Room(room_no, type), Appointment(appt_id, date, time), Test(test_id, name, result, date), Bill(bill_id, amount, date).
**Relationships:** Doctor *works in* Department (N:1); Patient *books* Appointment *with* Doctor; Patient *undergoes* Test (1:N); Patient *admitted to* Room (N:1, with admit/discharge dates); Patient *pays* Bill (1:N).
Draw rectangles for entities, ovals for attributes (primary keys underlined), diamonds for relationships with cardinalities. Schema and constraints: see [DBMS CET-1, Q3.2](/library/dbms/paper-cet-1-2025-08-23#q3-2-design-a-database-for-a-hospital-with-patients-doctors-and-a-log-of-tests-e).

## Q5.4 What are integrity constraints? Explain types with examples.

Domain, entity integrity (PK not NULL), referential integrity (FK), key/unique, NOT NULL and CHECK constraints. Full answer: [DBMS CET-1, Q2.3](/library/dbms/paper-cet-1-2025-08-23#q2-3-explain-types-of-integrity-constraints).

## Q5.5 Components of an Entity-Relationship (ER) model.

- **Entity** (rectangle) and **weak entity** (double rectangle).
- **Attributes** (ovals): simple, composite (oval with sub-ovals), multivalued (double oval), derived (dashed oval), key attribute (underlined).
- **Relationship** (diamond); identifying relationship (double diamond).
- **Cardinality:** 1:1, 1:N, M:N; **participation:** total (double line) or partial (single line).
- **Generalization/specialization** (ISA triangle) and **aggregation**.
Draw one small example: `Student —(Enrolls, M:N)— Course` with attributes.

## Q5.6 Compare hierarchical, network and relational data models.

| | Hierarchical | Network | Relational |
|---|---|---|---|
| Structure | Tree (parent–child) | Graph of records and owner–member sets | Tables (relations) |
| Relationships | 1:N only | 1:N and M:N | Any, via keys |
| Access | Navigate from the root | Navigate pointers | Declarative (SQL) |
| Flexibility | Rigid | Better, but complex | Very flexible |
| Data independence | Low | Low | High |
| Example | IBM IMS | IDMS (CODASYL) | Oracle, MySQL, PostgreSQL |
