## Unit-2

## Data Models

 Looping Outline

- Basic concept of E-R diagram
- Types of Attributes
- Mapping Cardinality
- Weak Entity Sets
- Extended E-R features
- Generalization and Specialization
- Constraints on Specialization and Generalization
- Aggregation
- E-R diagram of Hospital Management System
- Reduction to E-R Database Schema
- Database Models
- Integrity Constraints

![Page 3](/reading/dbms/img/u2-data-models-er-p003.webp)

### Basic concepts

What is Database Design?

Database Design is a collection of processes that facilitate the designing, development, implementation and maintenance of enterprise database management systems.

What is E-R diagram?

E-R diagram: (Entity-Relationship diagram)

It is graphical (pictorial) representation of database.

It uses different types of symbols to represent different objects of database.

### Entity

An entity is a person, a place or an object.

Entity Name An entity is represented by a rectangle which contains the name of an entity.

Entities of a college database are:

Symbol Student Professor/Faculty Course Department Student Faculty Course Result Class Subject

Exercise Write down the different entities of bank database.

Exercise Write down the different entities of hospital database.

### Entity Set

It is a set (group) of entities of same type. Examples:

All persons having an account in a bank All the students studying in a college All the professors working in a college Set of all accounts in a bank

### Attributes

Attribute is properties or details about an entity.

Attribute Name An attribute is represented by an oval containing name of an attribute.

Attributes of Student are:

Symbol Roll No Student Name RollNo Name Branch Semester Address Student Mobile No Age SPI Backlogs

Exercise Write down the different attributes of Faculty entity.

Exercise Write down the different attributes of Account entity.

### Relationship

Relationship is an association (connection) between several entities.

It should be placed between two entities and a line connecting it to an entity. A relationship is represented by a diamond containing relationship's name.

Relationship Name

Symbol

Student Issue Book

### E-R Diagram of a Library System

Primary Key Primary Key Attributes RollNo Name BookNo Name Relationship

Student Issue Book

Branch Sem Entities Author Price

![Figure](/reading/dbms/img/u2-data-models-er-p009-373.webp)

Each and every entity must have one primary key attribute. Relationship between 2 entities is called binary relationship.

### Ternary Relationship

Project Name ProjectID

Project

FacID Name RollNo Name

Faculty Guide Student

Branch Technology Branch Sem

Relationship between 3 entities is called ternary relationship.

### Exercise

Draw an E-R diagram of following pair of entities Customer & Account Customer & Loan Doctor & Patient Student & Project Student & Teacher

- Note: Take four attributes per entity with one primary key attribute. Keep proper relationship between two entities.

![Page 12](/reading/dbms/img/u2-data-models-er-p012.webp)

### Types of Attributes

Simple Attribute Composite Attribute

Cannot be divided into subparts Can be divided into subparts E.g. RollNo, CPI E.g. Name (first name, middle name, last name) Address (street, road, city)

Symbol Symbol Name

First name Roll No Last name

Middle name

### Types of Attributes

Single-valued Attribute Multi-valued Attribute

Has single value Has multiple (more than one) value E.g. RollNo, CPI E.g. PhoneNo (person may have multiple phone nos) EmailID (person may have multiple emails) Symbol Symbol

Roll No Phone No

### Types of Attributes

Stored Attribute Derived Attribute It’s value is derived or calculated from It’s value is stored manually in database other attributes E.g. Birthdate E.g. Age (can be calculated using current date and birthdate)

Symbol Symbol Birthdate Age

### Entity with all types of Attributes

Middle Name First Name Last Name Single Simple Value Composite RollNo Name Apartment Derived Composite

Age Student Address Street

Multiple Stored Value Phone No Birth Date Area

### Exercise

Draw an E-R diagram of Banking Management System. Draw an E-R diagram of Hospital Management System. Draw an E-R diagram of College Management System. Take only 2 entities Keep proper relationship between two entities Use all types of attributes

### Descriptive Attribute

Attributes of the relationship is called descriptive attribute.

Descriptive Attribute

Issue Name Name RollNo Date BookNo

Student Issue Book

Branch Sem Author Price

### Role

Roles are indicated by labeling the lines that connect diamonds (relationship) to rectangles (entity).

The labels “Coordinator” and “Head” are called roles; they specify Faculty entities interact with whom via Reports_To relationship set.

Role labels are optional, and are used to clarify semantics (meaning) of the relationship.

Name EmpID

Coordinator Faculty Reports_To Head

Branch Experience

### Recursive Relationship Set

The same entity participates in a relationship set more than once then it is called recursive relationship set.

DName FacID FName DeptID

Faculty Works Department

Recursive Post Relationship FName Post Set DName Ajay Professor Computer Prof.

Haresh Professor Civil Ramesh HOD Mechanical

![Page 21](/reading/dbms/img/u2-data-models-er-p021.webp)

### Mapping Cardinality (Cardinality Constraints)

It represents the number of entities of another entity set which are connected to an entity using a relationship set.

It is most useful in describing binary relationship sets.

For a binary relationship set the mapping cardinality must be one of the following types:

One to One One to Many Many to One Many to Many

### One-to-One relationship (1 – 1)

An entity in A is associated with only one entity in B and an entity in B is associated with only one entity in A.

customer borrow loan A1 B1 C1 L1 A2 B2 C2 L2

C3 L3 A B

Example: A customer is connected with only one loan using the relationship borrower and a loan is connected with only one customer using borrower.

### One-to-Many relationship (1 – N)

An entity in A is associated with more than one entities in B and an entity in B is associated with only one entity in A.

customer borrow loan A1 B1 C1 L1 A2 B2 C2 L2

C3 L3 A B L4

Example: A loan is connected with only one customer using borrower and a customer is connected with more than one loans using borrower.

### Many-to-One relationship (N – 1)

An entity in A is associated with only one entity in B and an entity in B is associated with more than one entities in A.

customer borrow loan A1 B1 C1 L1 A2 B2 C2 L2

C3 L3 A B C4

Example: A loan is connected with more than one customer using borrower and a customer is connected with only one loan using borrower.

### Many-to-Many relationship (N – N)

An entity in A is associated with more than one entities in B and an entity in B is associated with more than one entities in A.

customer borrow loan A1 B1 C1 L1 A2 B2 C2 L2

C3 L3 A B C4 L4

Example: A customer is connected with more than one loan using borrower and a loan is connected with more than one customer using borrower.

### Mapping Cardinality (Cardinality Constraints) [Exercise]

Draw an E-R diagram and specify which type of mapping cardinality will be there in the following examples:

Each customer has only one account in the bank and each account is held by only one customer. [single account] Each customer has only one account in the bank but an account can be held by more than one customer. [joint account] A customer may have more than one account in the bank but each account is held by only one customer. [multiple accounts] A customer may have more than one account in the bank and each account is held by more than one customer. [join account as well as multiple accounts] A student can work in more than one project and a project can be done by more than one student.

A student can issue more than one book but a book is issued to only one student.

A subject is taught by more than one faculty and a faculty can teach more than one subject.

![Page 28](/reading/dbms/img/u2-data-models-er-p028.webp)

### Participation Constraints

It specifies the participation of an entity set in a relationship set.

There are two types participation constraints Total participation Partial participation

Partial participation Total participation

- some entities in the entity set may not participate in
- every entity in the entity set participates in at least any relationship in the relationship set.

one relationship in the relationship set.

- indicated by single line
- indicated by double line

customer borrow loan

C1 L1 Each customer has C2 L2 maximum one loan

C3

![Page 30](/reading/dbms/img/u2-data-models-er-p030.webp)

### Weak Entity Set

An entity set that does not have a primary key is called weak entity set.

Payment-date

loan-no amount payment-no Payment-amount

loan L_P payment

Strong Entity Weak Entity Weak Entity Set Relationship Set

![Figure](/reading/dbms/img/u2-data-models-er-p031-395.webp)

- Weak entity set is indicated by double rectangle.
- Weak entity relationship set is indicated by double diamond.

### Weak Entity Set

The existence of a weak entity set depends on the existence of a strong entity set.

The discriminator (partial key) of a weak entity set is the set of attributes that distinguishes all the entities of a weak entity set.

The primary key of a weak entity set is created by combining the primary key of the strong entity set on which the weak entity set is existence dependent and the weak entity set’s discriminator.

We underline the discriminator attribute of a weak entity set with a dashed line.

Payment entity has payment-no which is discriminator.

Loan entity has loan-no as primary key.

So primary key for payment is (loan-no, payment-no).

![Page 33](/reading/dbms/img/u2-data-models-er-p033.webp)

### Superclass v/s Subclass

Super Class Sub Class A superclass is an entity from which another A subclass is an entity that is derived from entities can be derived.

another entity.

E.g, E.g, an entity account has two subsets saving_account and current_account entities saving_account and current_account are derived from entity account.

So an account is superclass.

So saving_account and current_account are subclass.

Super Class Account

Saving_Account Current_Account

Sub Class

![Page 35](/reading/dbms/img/u2-data-models-er-p035.webp)

### Generalization v/s Specialization

Generalization Specialization It extracts the common features of multiple It splits an entity to form multiple new entities entities to form a new entity.

that inherit some feature of the splitting entity.

Name Address Name Address

SPI Salary Person Person Name Name ISA ISA Address Address

Student Faculty Student Faculty Bottom-up approach SPI Salary SPI Salary

### Generalization v/s Specialization

Generalization Specialization The process of creation of group from various The process of creation of sub-groups within entities is called generalization.

an entity is called specialization.

It is Bottom-up approach.

It is Top-down approach.

The process of taking the union of two or more The process of taking a sub set of higher level lower level entity sets to produce a higher level entity set to form a lower level entity set. entity set.

It starts from the number of entity sets and It starts from a single entity set and creates creates high level entity set using some different low level entity sets using some common features.

different features.

### Generalization & Specialization example

Name Address

PID City Person

ISA

Salary Employee Customer Balance

ISA

Full Time Part Time

Days Worked Hour Worked

### Exercise

Give the examples of Generalization/Specialization in the following E-R diagram: Hospital Management System.

College Management System.

Bank Management System.

Insurance Company.

![Page 40](/reading/dbms/img/u2-data-models-er-p040.webp)

### Constraints on Specialization and Generalization

Constraints

Disjoint Participation

Partial Non-disjoint Total Disjoint (Overlapping)

(Mandatory)

(Optional)

### Disjoint Constraint

It describes relationship between members of the superclass and subclass and indicates whether member of a superclass can be a member of one, or more than one subclass.

Types of disjoint constraints Disjoint Constraint Non-disjoint (Overlapping) Constraint

### Disjoint Constraint

It specifies that the entity of a super class can belong to only one lower-level entity set (sub class).

Specified by ‘d’ or by writing disjoint near to the ISA triangle.

Employee (Super class)

Cricketer (Super class)

Disjoint Batsman Bowler ISA (Sub class)

(Sub class)

Full-time Part-time (Sub class)

(Sub class)

All the players are associated with only one sub class either (Batsman or Bowler).

### Non-disjoint (Overlapping) Constraint

It specifies that an entity of a super class can belong to more than one lower-level entity set (sub class).

Specified by ‘o’ or by writing overlapping near to the ISA triangle.

Employee (Super class)

Cricketer (Super class)

Non-disjoint Batsman Bowler ISA (Sub class)

(Sub class)

Faculty Head (Sub class)

(Sub class)

One player (Yuvraj singh) is associated with more than one sub class.

### Constraints on Specialization and Generalization

Constraints

Disjoint Participation

Partial Non-disjoint Total Disjoint (Overlapping)

(Mandatory)

(Optional)

### Participation (Completeness) Constraint

It determines whether every member of super class must participate as a member of subclass or not.

Types of participation (Completeness) Constraint Total (Mandatory) participation Partial (Optional) participation

### Total (Mandatory) Participation

Total participation specifies that every entity in the superclass must be a member of some subclass in the specialization.

Specified by a double line in E-R diagram.

Employee (Super class)

Cricketer (Super class)

Batsman Bowler ISA (Sub class)

(Sub class)

Professor Head (Sub class)

(Sub class)

All the players are associated with minimum one sub class either (Batsman or Bowler).

### Partial (Optional) Participation

Partial participation specifies that every entity in the super class does not belong to any of the subclass of specialization.

Specified by a single line in E-R diagram.

Employee (Super class)

Cricketer (Super class)

Batsman Bowler Not associated with ISA any sub class (Sub class)

(Sub class)

Professor Head (Sub class)

(Sub class)

![Page 49](/reading/dbms/img/u2-data-models-er-p049.webp)

### Limitation of E-R diagram

In E-R model we cannot express relationships between two relationships.

Relation 1 Relation Relation 2

Entity 1 Relation Entity 2

### Limitation of E-R diagram

Customer Company

Employee Works Department Customer Can not connect two relationship

Borrow Borrow

Loan Loan

Process of creating an entity by combining various components of E-R diagram is called aggregation.

![Page 52](/reading/dbms/img/u2-data-models-er-p052.webp)

### E-R diagram of Hospital Management System

MRID Name Name PatID HosID

Admitted Medical Record Has Patient Hospital

Report Name ISA Has

Indoor Outdoor Doctor RoomNo IPDID OPDID DrID Dr Name Charge

![Page 54](/reading/dbms/img/u2-data-models-er-p054.webp)

### Reduce the E-R diagram to database schema

Step 1: Reduce Entities and Simple Attributes:

Name PersonID An entity of an ER diagram is turned into a table.

Each attribute (except multi-valued attribute) turns into a column (attribute) in the table.

Person Table name can be same as entity name.

Address City Key attribute of the entity is the primary key of the table which is usually underlined.

PhoneNo It is highly recommended that every table should start with its primary key attribute conventionally named as TablenameID.

Person (PersonID, Name, Address, City)

### Reduce the E-R diagram to database schema

Step 2: Reduce Multi-valued Attributes:

PersonID PhoneNo

Multi-value attribute is turned into a new table.

Person Add the primary key column into multi-value attribute’s table.

PhoneNo (PhoneID, PersonID, PhoneNo) Add the primary key column of the parent entity’s table as a foreign key within the new (multi-value Person (T1)

attribute’s) table.

Foreign Key Then make a 1:N relationship between the Person Having table and PhoneNo table.

PhoneNo (T2)

### Reduce the E-R diagram to database schema

WifeID WName Step 3: Reduce 1:1 Mapping Cardinality:

Convert both entities in to table with proper attribute.

Wife Place the primary key of any one table in to the Having another table as a foreign key.

Place the primary key of the Wife table WifeID in the Person table Persons as Foreign key.

OR PersonID PName Place the primary key of the Person table PersonID in the table Wife as Foreign key.

Person (PersonID, PName) Wife (WifeID, Wname, PersonID)

Wife (WifeID, Wname) Person (PersonID, Pname, WifeID)

### Reduce the E-R diagram to database schema

HouseID HName Step 4: Reduce 1:N Mapping Cardinality:

Convert both entities in to table with proper attribute.

House Place the primary key of table having 1 mapping in to Having the another table having many cardinality as a Foreign key.

Person Place the primary key of the Person table PersonID in the table House as Foreign key.

PersonID PName

Person (PersonID, PName) House (HouseID, Hname, PersonID)

### Reduce the E-R diagram to database schema

ActNo Balance Step 5: Reduce N:N Mapping Cardinality:

Convert both entities in to table with proper attribute.

Account Create a separate table for relationship.

Has_Acct Place the primary key of both entities table into the relationship’s table as foreign key.

Customer Place the primary key of the Customer table CID and Account table Ano in the table Has_Acct as Foreign CID CName key.

Customer (CID, CName) Account (ActNo, Balance) Has_Acct (HasAcctID, CID, ActNo)

### Summery of Symbols used in E-R diagram

Customer Name Hold Entity Attribute Relationship

EmpID Age PhoneNo Primary Key Derived Multi Valued Attribute Attribute Attribute

Payment PymtID Issue Discriminating Weak Entity Weak Entity Attribute Relationship Role Name E R E R ISA

Total Role Specialization/ Indicator Participation Generalization

### Summery of Symbols used in E-R diagram

Disjoint E R E ISA ISA One to One Total Disjoint Specialization/ Specialization/ Generalization E R E Generalization One to Many

E R E Overlapping Many to One ISA ISA Partial Overlapping E R E Specialization/ Specialization/ Many to Many Generalization Generalization

![Page 62](/reading/dbms/img/u2-data-models-er-p062.webp)

### What is a Database Models?

A database model is a type of data model that defines the logical structure of a database. It determine how data can be stored, accessed and updated in a database management system.

The most popular example of a database model is the relational model, which uses a table- based format.

### Type of Database Models

### Hierarchical Model

### Network Model

### Entity-relationship Model

### Relational Model

### Object-oriented database Model

### Hierarchical Model

The hierarchical model organizes data into a tree-like structure, where each record has a single parent or root.

Department

Student Professor

The hierarchy starts from the Root data, and expands like a tree, adding child nodes to the parent nodes.

In hierarchical model, data is organized into tree-like structure with one-to-many relationship between two different types of data, for example, one department can have many professors and many students.

### Network Model

This is an extension of the hierarchical model, allowing many-to-many relationships in a tree- like structure that allows multiple parents.

A

B C

D E F

### Entity-relationship Model

In this database model, relationships are created by dividing object of interest into entity and its characteristics into attributes.

Attributes Name Name RollNo BookNo Relationship

Student Issue Book

Branch Entities Author Sem Price

### Relational Model

In this model, data is organized in two-dimensional tables and the relationship is maintained by storing a common attribute.

Rno Student_Name Age SubID Subject_Name Teacher 101 Raj Patel DBMS Doshi 102 Meet Shah DS Vyash Foreign Key Foreign Key

ResID Rno SubID Marks

### Object-oriented database Model

This data model is another method of representing real world objects.

It considers each object in the world as objects and isolates it from each other.

It groups its related functionalities together and allows inheriting its functionality to other related sub-groups.

![Figure](/reading/dbms/img/u2-data-models-er-p069-220.webp)

![Page 70](/reading/dbms/img/u2-data-models-er-p070.webp)

### Integrity Constraints

Integrity constraints are a set of rules. It is used to maintain the quality of information.

Integrity constraints ensure that the data insertion, updating, and other processes have to be performed in such a way that data integrity is not affected.

Thus, integrity constraint is used to guard against accidental damage to the database.

Various Integrity Constraints are:

Check Not null Unique Primary key Foreign key

### Integrity Constraints

Check This constraint defines a business rule on a column. All the rows in that column must satisfy this rule. Limits the data values of variables to a specific set, range, or list of values.

The constraint can be applied for a single column or a group of columns.

E.g. value of SPI should be between 0 to 10.

Not null This constraint ensures all rows in the table contain a definite value for the column which is specified as not null. Which means a null value is not allowed.

E.g. name column should have some value.

Unique This constraint ensures that a column or a group of columns in each row have a distinct (unique) value. A column(s) can have a null value but the values cannot be duplicated.

E.g. enrollmentno column should have unique value.

### Integrity Constraints

Primary key This constraint defines a column or combination of columns which uniquely identifies each row in the table. Primary key = Unique key + Not null E.g. enrollmentno column should have unique value as well as can’t be null.

Foreign key (referential integrity constraint)

A referential integrity constraint (foreign key) is specified between two tables.

In the referential integrity constraints, if a foreign key column in table 1 refers to the primary key column of table 2, then every value of the foreign key column in table 1 must be null or be available in primary key column of table 2.

Foreign Key

RollNo Student_Name DeptID DeptID Dept_Name HOD Computer Doshi Raj Patel Meet Shah IT Vyash

Example:

Example:

1.CREATE TABLE EMPLOYEES ( EMPID INTEGER NOT NULL, EName VARCHAR2(10) NOT NULL, DOJ DATE );

2. CREATE TABLE Orders ( order_id number(10), amount number(10) CHECK (amount > 0) );

3. CREATE TABLE Colleges ( college_id number(5) UNIQUE, college_code VARCHAR(20) UNIQUE, college_name VARCHAR(50)

);

4. CREATE TABLE Orders ( OrderID number(10), OrderNumber number(10), PersonID number(10), FOREIGN KEY (PersonID) REFERENCES Persons(PersonID) );

### data manipulation operations.

The structured query language (SQL) commands deal with the manipulation of data present in the database that belongs to the DML or Data Manipulation Language. This includes most of the SQL statements.

Examples of DML The examples of DML in the Database Management System (DBMS) are as follows − SELECT − Retrieve data from the database.

INSERT − Insert data into a table.

UPDATE − Update existing data within a table.

DELETE − Delete records from a database table.

### Questions asked

1. Write a note on mapping cardinality in E-R diagram.

2. Explain the difference between a weak and a strong entity set.

3. Explain the difference between generalization and specialization. OR Explain specialization and generalization concept in E-R diagram with suitable example.

4. Write a note on constraints on specialization and generalization.

5. Explain aggregation in E-R diagram with example.

6. What do you mean by integrity constraints? Discuss various integrity constraints.

### Questions asked [E-R diagrams]

7. Draw E-R diagram for Bank Management System.

8. Define E-R diagram. Draw an E-R diagram for Library Management System. Assume relevant entities and attributes for the given system.

9. Construct an E-R diagram for a car-insurance company whose customers own one or more cars each. Each car has associated with it zero to any number of recorded accidents.

10. Design a generalization–specialization hierarchy for a motor-vehicle sales company. The company sells motorcycles, passenger cars, vans, and buses. Justify your placement of attributes at each level of the hierarchy. Explain why they should not be placed at a higher or lower level.

### Questions asked [E-R diagrams and Database]

11. Design a database for an airline. The database must keep track of customers and their reservations, flights and their status, seat assignments on individual flights, and the schedule and routing of future flights. Your design should include an E-R diagram, a set of relational schemas, and a list of constraints, including primary-key and foreign-key constraints.

12. Design a database for a hospital with a set of patients and a set of medical doctors. Associate with each patient a log of the various tests and examinations conducted. Your design should include an E-R diagram, a set of relational schemas, and a list of constraints, including primary-key and foreign-key constraints.
