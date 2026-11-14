> **Database Management System (C2311C4) · Mid-semester term examination · October 2026 · 60 marks · 2 hours (10:10 am – 12:10 pm)**
> ITM SLS Baroda University · B.Tech (CSE/IT/AI/CSN) · Semester III · Academic year 2026–27. (The exact day is blurred in the scan; it reads as 06-10-2026.)
> All ten parts of Q1 are compulsory; Q2: any three of four (3 marks each); Q3: any four of five (5 marks each); Q4: any three of four (7 marks each).
> Questions transcribed from the original paper. Solutions are written by CampusLoop; check them against your class notes.

# Q1. Answer all (1 mark each) [10]

**1.1 Which of the following is not a feature of DBMS?** A) Minimum duplication and redundancy of data · B) High level of security · C) Single-user access only · D) Support ACID property
**Answer: (C) Single-user access only.** A DBMS supports concurrent multi-user access.

**1.2 Which of the following is known as a set of entities of the same type that share the same properties or attributes?** A) Relation set · B) Tuples · C) Entity set · D) Entity relation model
**Answer: (C) Entity set.**

**1.3 The ability to query data, as well as insert, delete and alter tuples, is offered by:** A) TCL · B) DCL · C) DDL · D) DML
**Answer: (D) DML.**

**1.4 ______ is a set of one or more attributes taken collectively to uniquely identify a record.** A) Primary key · B) Foreign key · C) Super key · D) Candidate key
**Answer: (C) Super key.**

**1.5 Which is used to denote the selection operation in relational algebra?** A) Pi · B) Sigma · C) Lambda · D) Omega
**Answer: (B) Sigma (σ).**

**1.6 The closure of an attribute set X is represented as:** A) X⁻ · B) X⁺ · C) X* · D) X′
**Answer: (B) X⁺.**

**1.7 Given F = {A → B, B → C}, what is A⁺?** A) {A} · B) {A, B} · C) {A, C} · D) {A, B, C}
**Answer: (D) {A, B, C}** (A → B, then B → C).

**1.8 A relation is in 1NF if:** A) It has no foreign key · B) All attributes contain atomic values · C) It has no candidate key · D) All attributes are prime
**Answer: (B).**

**1.9 Which normal form removes transitive dependency?** A) 1NF · B) 2NF · C) 3NF · D) 4NF
**Answer: (C) 3NF.**

**1.10 Which of the following is NOT a database anomaly?** A) Insertion · B) Update · C) Deletion · D) Compilation anomaly
**Answer: (D).**

# Q2. Attempt any three (3 marks each) [9]

## 2(a) Draw and explain the 3-level architecture of DBMS.

External level (user views) → conceptual level (logical schema of the whole database) → internal level (physical storage), linked by two mappings that provide logical and physical data independence. Full answer: [DBMS CET-1, Q2.1](/library/dbms/paper-cet-1-2025-08-23#q2-1-explain-the-architecture-of-dbms).

## 2(b) Explain different data models in databases.

- **Hierarchical model:** tree of records, parent–child (1:N). Example: IBM IMS.
- **Network model:** records connected by owner–member sets; supports M:N. Example: IDMS.
- **Relational model:** data in tables (relations) linked by keys; queried with SQL. Most widely used.
- **Entity-Relationship model:** conceptual design with entities, attributes, relationships.
- **Object-oriented / object-relational model:** objects with attributes and methods, inheritance.
- **Semi-structured (e.g. XML/JSON documents)** for flexible schemas.

## 2(c) Define super key, primary key, candidate key and alternate key.

- **Super key:** any attribute set that uniquely identifies a tuple, e.g. {RollNo}, {RollNo, Name}.
- **Candidate key:** a minimal super key, e.g. {RollNo}, {EnrolNo}.
- **Primary key:** the candidate key chosen as the main identifier; unique and NOT NULL, e.g. RollNo.
- **Alternate key:** a candidate key not chosen as primary key, e.g. EnrolNo.

## 2(d) R = (A, B, C, G, H, I), F = {A → B, A → C, CG → H, CG → I, B → H}. Prove AG → I holds.

Using Armstrong's axioms:
1. A → C (given).
2. AG → CG (augmentation of step 1 with G).
3. CG → I (given).
4. **AG → I** (transitivity of steps 2 and 3). ∎

Check with closure: AG⁺ = {A, G} → (A → B, C) {A, B, C, G} → (CG → H, I) {A, B, C, G, H, I}, which contains I.

# Q3. Attempt any four (5 marks each) [20]

## 3(a) Closure for R(A, B, C, D, E), F = {A → BC, CD → E, B → D, E → A}; list the candidate keys.

A⁺ = E⁺ = CD⁺ = BC⁺ = {A, B, C, D, E}; B⁺ = {B, D}, C⁺ = {C}, D⁺ = {D}. **Candidate keys: A, E, CD, BC.** Full working: [DBMS CET-2, Q3.3](/library/dbms/paper-cet-2-2025-10-09#q3-3-closure-for-r-a-b-c-d-e-f-a-bc-cd-e-b-d-e-a).

## 3(b) Explain different aggregate functions with example.

COUNT, SUM, AVG, MIN, MAX, used with GROUP BY and HAVING. Full answer: [DBMS CET-2, Q2.1](/library/dbms/paper-cet-2-2025-10-09#q2-1-explain-different-aggregate-functions-with-example).

## 3(c) R = (A, B, C, D, E, H), F = {A → B, BC → D, E → C, D → A}. What are the candidate keys of R?

- **E and H never appear on a right side**, so every key must contain **E and H**.
- EH⁺ = {E, H} → (E → C) {C, E, H}. C alone does not give more, so EH is not a key; add one more attribute:
  - AEH⁺: A → B; E → C; BC → D → **{A, B, C, D, E, H}** ✓
  - BEH⁺: E → C; BC → D; D → A → **{A, B, C, D, E, H}** ✓
  - DEH⁺: D → A; A → B; E → C → **{A, B, C, D, E, H}** ✓
  - CEH⁺ = {C, E, H} ✗
- **Candidate keys: AEH, BEH, DEH** (each minimal: no two-attribute subset is a key).

## 3(d) Explain mapping cardinalities with example.

Mapping cardinality is the number of entities to which another entity can be associated via a relationship:
- **One-to-one (1:1):** each entity of A relates to at most one of B and vice versa. Person — has — Passport.
- **One-to-many (1:N):** one A relates to many B, each B to one A. Department — has — Employees.
- **Many-to-one (N:1):** many A relate to one B. Students — belong to — Branch.
- **Many-to-many (M:N):** Students — enroll in — Courses.
In ER diagrams, show them with 1/N/M labels (or arrows) on the relationship lines; also mention total vs partial participation.

## 3(e) R(A, B, C, D), F = {C → D, C → A, B → C}. Candidate key(s) and best normal form.

- B⁺ = {B} → (B → C) {B, C} → (C → D, C → A) **{A, B, C, D}**. B never appears on a right side, so it must be in every key → **candidate key: B** (only one).
- Prime attribute: B. Non-prime: A, C, D.
- **2NF:** the key has a single attribute, so there are no partial dependencies → in 2NF.
- **3NF:** C → D and C → A have C (not a super key) determining non-prime attributes: B → C → D and B → C → A are **transitive dependencies** → not in 3NF.
- **Best normal form: 2NF.** (To reach BCNF: decompose into R₁(C, D, A) and R₂(B, C).)

# Q4. Attempt any three (7 marks each) [21]

## 4(a) Explain each normalization form with example.

Start with `Enrol(RollNo, Name, Course, Instructor, InstructorPhone)` where a student can take many courses.
- **1NF:** no multivalued attributes. If Course held "DBMS, OS", split into one course per row. Key: (RollNo, Course).
- **2NF:** no partial dependency. RollNo → Name depends on part of the key → move to `Student(RollNo, Name)`; keep `Enrol(RollNo, Course)`, `Course(Course, Instructor, InstructorPhone)`.
- **3NF:** no transitive dependency. In `Course`, Course → Instructor → InstructorPhone is transitive → split into `Course(Course, Instructor)` and `Instructor(Instructor, InstructorPhone)`.
- **BCNF:** every determinant must be a candidate key. Example: `Teach(Student, Subject, Teacher)` with Teacher → Subject: Teacher is not a key → decompose into `(Teacher, Subject)` and `(Student, Teacher)`.
- **4NF:** no non-trivial multivalued dependency (Student →→ Hobby independent of Student →→ Course → split).
Worked example with real data: [DBMS CET-2, Q3.5](/library/dbms/paper-cet-2-2025-10-09#q3-5-normalize-the-student-table-1nf-2nf-3nf-bcnf).

## 4(b) Define E-R diagram. Draw an E-R diagram for a Library Management System.

An **E-R diagram** is a graphical representation of the entities, their attributes and the relationships among them, used for conceptual database design.

**Entities and attributes:**
- `Member(member_id, name, phone, email, join_date)`
- `Book(book_id, title, isbn, publisher, year)` with multivalued `author` (double oval)
- `Copy(copy_no, status)`: weak entity of Book (double rectangle, partial key copy_no)
- `Librarian(staff_id, name)`
- `Category(cat_id, name)`

**Relationships:**
- Book *has* Copy (1:N, identifying, double diamond; total participation of Copy).
- Member *borrows* Copy (M:N over time) with attributes `issue_date`, `due_date`, `return_date`, `fine` (derived, dashed oval).
- Librarian *issues* the loan (1:N).
- Book *belongs to* Category (N:1).

Draw rectangles for entities, ovals for attributes (keys underlined), diamonds for relationships, with cardinality labels.

## 4(c) Relational algebra on Student, Department, Academic, Guide and Faculty

Relations: Student(Rno, Sname, Address, City, Mobile), Department(Did, Dname), Academic(Rno, Did, SPI, CPI, Backlog), Guide(Rno, PName, Fid), Faculty(Fid, Fname, Subject, Did, Salary).

1. **Students with their department names who have no backlog:**
   π Sname, Dname (σ Backlog = 0 (Student ⋈ Academic ⋈ Department))
2. **Faculty names with department names and salary, salary > ₹25,000 and in CE:**
   π Fname, Dname, Salary (σ Salary > 25000 ∧ Dname = 'CE' (Faculty ⋈ Department))
3. **Faculty from CE and ME whose salary is more than ₹50,000:**
   π Fname (σ Salary > 50000 ∧ (Dname = 'CE' ∨ Dname = 'ME') (Faculty ⋈ Department))
4. **Student names with project names, CE students whose guide is "Z.Z. Patel":**
   π Sname, PName (σ Dname = 'CE' ∧ Fname = 'Z.Z. Patel' (Student ⋈ Academic ⋈ Department ⋈ Guide ⋈ ρ F(Fid, Fname, Subject, FDid, Salary) (Faculty)))
   (Renaming Faculty's Did avoids accidentally joining the student's department with the guide's department.)
5. **Faculty names with department names, in CE, teaching "CPU", salary > ₹25,000:**
   π Fname, Dname (σ Dname = 'CE' ∧ Subject = 'CPU' ∧ Salary > 25000 (Faculty ⋈ Department))

## 4(d) SQL queries on the student table

Table `Students(Rno, Sname, City, Branch, CPI, Backlog)` with 8 rows (101 Rahul … 108 Jay).

1. **Names and CPI of students with CPI > 8:**
```sql
SELECT Sname, CPI FROM Students WHERE CPI > 8;
```
Result: Rahul 8.5, Priya 9.1, Raj 8.7, Riya 9.3.

2. **Details of CE students with Backlog = 0:**
```sql
SELECT * FROM Students WHERE Branch = 'CE' AND Backlog = 0;
```
Result: 101 Rahul, 103 Priya, 105 Raj, 107 Riya.

3. **Minimum CPI in the CE branch:**
```sql
SELECT MIN(CPI) FROM Students WHERE Branch = 'CE';
```
Result: 8.5.

4. **Branches having an average CPI greater than 8:**
```sql
SELECT Branch, AVG(CPI) FROM Students GROUP BY Branch HAVING AVG(CPI) > 8;
```
Result: CE (8.9). IT averages 7.5 and ME 7.15.

5. **Total number of students:**
```sql
SELECT COUNT(*) FROM Students;
```
Result: 8.
