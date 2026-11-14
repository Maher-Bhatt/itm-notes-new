> Everything here is taken from the DBMS Complete Study Guide: for each unit, what examiners ask, what to write, the common mistakes and quick self-checks, followed by the last-night revision sheet.

# Database System Architecture

## Unit 1 — Questions asked in exam

1. List and explain the advantages of DBMS over file-based systems (or disadvantages of file systems).

2. Draw and explain the 3-level (ANSI/SPARC) architecture of DBMS.

3. Explain data abstraction and data independence (physical vs logical).

4. List and explain types of database users.

5. List and explain duties of the DBA.

6. Explain the overall DBMS (database system) architecture with a block diagram.

7. Differentiate DDL and DML; schema and instance.

### Unit 1 — Check yourself

1. Name three problems of the file system. 2. Which level of the 3-level architecture describes indexes? 3. Adding a column without changing users’ views is which

independence? 4. Two duties of a DBA.

Answers: 1) Redundancy, inconsistency, concurrent-access anomalies (also isolation, integrity,

atomicity, security). 2) Internal. 3) Logical. 4) Schema definition, granting authorisation (also

backup/recovery, tuning).

# Data Models

## Unit 2 — Questions asked in exam

1. Explain the components/symbols of an E-R diagram. Types of attributes with examples.

2. Explain mapping cardinalities and participation constraints.

3. What is a weak entity set? Explain with example.

4. Explain specialisation, generalisation and their constraints; aggregation.

5. Draw an E-R diagram for a hospital / library / university / bank system.

6. Explain the reduction of E-R diagram to tables.

7. Compare hierarchical, network, relational and object-oriented models.

8. What is a constraint? Explain types of integrity constraints.

### Unit 2 — Common mistakes

Putting the FK on the “1” side of a 1:N relationship (it goes on the N side).

Forgetting a separate table for an M:N relationship or a multivalued attribute.

Weak entity drawn with a single rectangle/diamond.

### Unit 2 — Check yourself

1. Symbol for a derived attribute? 2. PK of weak entity PAYMENT (discriminator

PaymentNo) owned by LOAN (LoanNo)? 3. How is an M:N relationship converted to tables?

Answers: 1) Dashed ellipse. 2) (LoanNo, PaymentNo). 3) A new table with the PKs of both entities (+ relationship attributes).

# Relational Query Languages

## Unit 3 — Questions asked in exam

1. Define super key, primary key, candidate key and alternate key (and foreign key).

2. Explain relational algebra operations with examples: selection, projection, cartesian product, joins (natural, outer), set operations, division, rename.

3. Explain aggregate functions with examples.

4. Write relational-algebra expressions for given queries on a given schema (practice table above).

5. Explain tuple and domain relational calculus with examples.

### Unit 3 — Check yourself

1. R has 3 rows, S has 4 → rows in R × S? 2. Which operator answers “for all” queries? 3. Write RA for names of students in branch ‘CE’.

Answers: 1) 12. 2) Division ÷. 3) π_Name(σ_Branch=‘CE’(STUDENT)).

# Relational Database Design

## Unit 4 — Questions asked in exam

1. Define functional dependency; explain types (trivial, full, partial, transitive).

2. State Armstrong’s axioms; prove union/decomposition/pseudo-transitivity rules.

3. Compute closure of an attribute set; find candidate keys.

4. Find the canonical cover of a given FD set.

5. What is decomposition? Explain lossless join and dependency preservation with examples.

6. Explain anomalies (insertion, deletion, update).

7. Explain 1NF, 2NF, 3NF, BCNF (and 4NF, 5NF) with examples; difference between 3NF and BCNF.

8. Normalise a given relation up to BCNF.

### Unit 4 — Common mistakes

Saying a table is in 2NF when the key is a single attribute but forgetting to check 1NF. Confusing 3NF and BCNF: 3NF allows X → A if A is prime; BCNF does not.

Computing closure but stopping too early (keep looping until nothing changes).

### Unit 4 — Check yourself

1. R(A, B, C), F = {A → B, B → C}. Key? Highest NF? 2. Is R(A,B,C) → R1(A,B), R2(B,C) lossless if B → C?

Answers: 1) A; 2NF (B → C is transitive) — decompose into (A, B), (B, C) for 3NF/BCNF. 2) Yes (common attribute B → R2).

# Query Processing and Query Optimisation

## Unit 5 — Questions asked in exam

1. Explain the steps in query processing with a diagram.

2. Explain measures of query cost.

3. Explain selection algorithms (linear search, binary search, index-based).

4. Explain join algorithms; compute nested-loop / block nested-loop costs for given statistics.

5. Differentiate materialisation and pipelining.

6. What is query optimisation? Explain heuristic optimisation with a query tree.

7. List equivalence rules for transforming relational-algebra expressions.

### Unit 5 — Check yourself

1. Which costs dominate query evaluation? 2. Why push selections down the tree? 3. Block nested-loop cost with b_R = 100, b_S = 400 (R outer)?

Answers: 1) Disk block transfers and seeks. 2) Fewer tuples to join. 3) 100 × 400 + 100 = 40,100.

# Transaction Processing, Concurrency, Recovery, Security

## Unit 6 — Questions asked in exam

1. Define transaction. Explain the states of a transaction with a diagram.

2. Explain ACID properties with an example.

3. What is a schedule? Explain serial vs concurrent schedules; problems of concurrency.

4. Explain conflict serializability with precedence graph; view serializability; differences.

5. Write a note on the two-phase locking protocol (and its variants).

6. Explain the timestamp-ordering protocol and Thomas’ write rule.

7. Explain multiversion and optimistic (validation-based) concurrency control.

8. What is deadlock? Explain prevention and detection.

9. What is log-based recovery? Explain deferred and immediate database modification; checkpoints; shadow paging.

10. Explain the two-phase commit protocol.

11. Explain authorisation and access control (DAC, MAC, RBAC). Difference between data security and data integrity.

### Unit 6 — Common mistakes

Drawing precedence edges for read–read pairs (they never conflict).

Saying 2PL prevents deadlock (basic 2PL doesn’t).

Mixing up deferred (redo only) and immediate (undo + redo) modification.

### Unit 6 — Check yourself

1. Which ACID properties does the recovery manager ensure? 2. What makes a schedule not conflict serializable? 3. In 2PL, can a transaction lock a new item after releasing one?

4. In the immediate-modification log, T1 has start but no commit — undo or redo?

Answers: 1) Atomicity and durability. 2) A cycle in the precedence graph. 3) No. 4) Undo.

# SQL Concepts and PL/SQL (25% of the paper)

## Unit 7 — Questions asked in exam

1. Explain DDL, DML, DCL, TCL commands with examples. Difference between DELETE, TRUNCATE, DROP.

2. Explain constraints (PK, FK, UNIQUE, NOT NULL, CHECK) with syntax.

3. Explain aggregate, numeric, string and date functions with examples.

4. Write SQL queries for a given schema (joins, GROUP BY/HAVING, sub-queries, correlated, EXISTS, ANY/ALL, set operations).

5. What is a view? Types; advantages.

6. Write PL/SQL blocks: sum 1–100; prime check; even/odd tables.

7. Explain cursors (implicit, explicit) with example; cursor attributes.

8. Explain stored procedures with example; procedure vs function.

9. What are triggers? Types, need/advantages, example.

### Unit 7 — Common mistakes

Using WHERE with an aggregate ( WHERE AVG(Sal) > … ) — must be HAVING.

Writing = NULL instead of IS NULL .

Selecting a non-aggregated column that isn’t in GROUP BY.

Forgetting EXIT WHEN cur%NOTFOUND in a cursor loop (infinite loop).

### Unit 7 — Check yourself

1. Delete all rows but keep the table, fastest way? 2. Query: departments with average salary above 40000. 3. Difference between procedure and function? 4. Which cursor attribute gives the number of rows affected?

Answers: 1) TRUNCATE. 2) SELECT DeptNo FROM EMP GROUP BY DeptNo HAVING AVG(Salary) > 40000; 3) Function must return one value and can be used in SQL; procedure returns via OUT

parameters and is called as a statement. 4) %ROWCOUNT.

# Last-Night Revision Sheet (DBMS)

U1 DBMS = software to manage related data efficiently + securely. File-system problems = redundancy, inconsistency, isolation, integrity, atomicity, concurrency, security. 3 levels: internal (how stored) / conceptual (what) / external (views). Physical independence = change storage without changing logical schema; logical independence = change logical schema without changing views (harder). Query processor (DDL interpreter, DML compiler, evaluation engine) + storage manager (authorization, transaction, file, buffer managers).

U2 Rectangle entity, ellipse attribute, diamond relationship, double rectangle weak entity, double diamond identifying relationship, double ellipse multivalued, dashed ellipse derived, double line total participation. Cardinality 1:1, 1:N, M:N. Weak entity PK = owner PK + discriminator. Specialisation (top-down) / generalisation (bottom-up); constraints: disjoint/overlapping, total/partial, condition/user-defined. Aggregation = relationship treated as entity. M:N → separate table. Integrity: domain, entity (PK not null), referential (FK matches or NULL).

U3 σ rows, π columns, × all pairs (n₁n₂ rows, d₁+d₂ cols), ∪ ∩ − need union compatibility, ⋈ natural join, ÷ “for all”, ρ rename, 𝒢 aggregate. TRC {t | P(t)}, DRC {⟨x…⟩ | P}. SQL order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.

U4 X → Y. Armstrong: reflexivity, augmentation, transitivity (+ union, decomposition, pseudo- transitivity). X⁺ algorithm → super key if X⁺ = R. Canonical cover: split RHS, remove extraneous LHS attrs, remove redundant FDs. Lossless if R₁∩R₂ → R₁ or R₂. 1NF atomic; 2NF no partial; 3NF no transitive (X super key or A prime); BCNF every determinant super key; 4NF no MVD; 5NF no join dependency.

U5 Parse/translate → optimise → evaluate. Cost = block transfers + seeks. A1 linear b_r, A2 binary ⌈log₂ b_r⌉. Joins: nested n_R·b_S + b_R; block nested b_R·b_S + b_R; merge b_R + b_S; hash 3(b_R + b_S); smaller relation outside. Materialisation (temp tables) vs pipelining (pass tuples). Heuristic: push σ and π down.

U6 ACID (atomicity & durability → recovery; isolation → concurrency control). States: active → partially committed → committed; failed → aborted. Conflict = different txns, same item, ≥1 write. Precedence graph acyclic ⇒ conflict serializable. View serializable: initial read, read-from, final write. 2PL: growing then shrinking; strict 2PL holds X locks till commit. Timestamp: reject if TS(T) < W-ts (read) or < R-ts/W-ts (write); Thomas rule ignores obsolete writes. MVCC: reads never wait. Optimistic: read → validate → write. Deferred modification: redo only; immediate: undo + redo. Checkpoint shortens recovery. 2PC: prepare/vote, then commit/abort. DAC (GRANT/REVOKE), MAC (labels, no read up/no write down), RBAC (roles).

U7 DDL/DML/DCL/TCL. Constraints PK, FK, UNIQUE, NOT NULL, CHECK, DEFAULT. WHERE vs HAVING. Joins inner/outer/self/cross. ANY = vs at least one, ALL = vs every. Correlated sub- query runs per outer row. EXISTS tests non-empty. View = virtual table (simple updatable / complex). PL/SQL block DECLARE-BEGIN-EXCEPTION-END. Cursor: implicit

(SQL%ROWCOUNT) / explicit (DECLARE-OPEN-FETCH-CLOSE). Procedure (IN/OUT/IN OUT) vs function (RETURN). Trigger: BEFORE/AFTER/INSTEAD OF, row/statement, :NEW/:OLD.
