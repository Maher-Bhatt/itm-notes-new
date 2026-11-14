Database Management Systems (DBMS)

## Unit-1

## Database system

## Architecture

 Looping Outline

- Introduction of DBMS
- Applications of DBMS
- Advantages of DBMS
- Three levels ANSI SPARC database system
- Data Abstraction in DBMS
- Mappings and data independence
- Database users and DBA
- Database system architecture

![Page 3](/reading/dbms/img/u1-database-system-architecture-p003.webp)

### What is Database Management System (DBMS)?

Data - Fact that can be recorded or stored e.g. Person Name, Age, Gender and Weight etc.

Database - Collection of logically related data e.g. Books Database in Library, Student Database in University etc.

Management - Manipulation, Searching and Security of data e.g. Viewing result in GTU website, Searching exam papers in GTU website etc.

System - Programs or tools used to manage database e.g. SQL Server Studio Express, Oracle etc.

DBMS - A Database Management System is a software for creating and managing databases.

Database Management System (DBMS) is a software designed to define, manipulate, retrieve and manage data in a database.

e.g. MS SQL Server, Oracle, My SQL, SQLite, MongoDB etc.

![Page 5](/reading/dbms/img/u1-database-system-architecture-p005.webp)

### Applications of DBMS

DBMS is a computerized record-keeping system.

DBMS is required where ever data need to be stored.

E-Commerce (Flikart, Amazon, Shopclues, eBay etc...)

Online Television Streaming (Hotstar, Amazon Prime etc...) Social Media (WhatsApp, Facebook, Twitter, LinkedIn etc...) Banking & Insurance Airline & Railway Universities and Colleges/Schools Library Management System Human Resource Department Hospitals and Medical Stores Government Organizations

Exercise Write down any five applications of DBMS other than above.

![Page 7](/reading/dbms/img/u1-database-system-architecture-p007.webp)

### Reduce data redundancy (duplication)

Computer Civil

Emp_Name Address Mobile Subject Emp_Name Address Mobile Subject Newyor Newyor Prof. john wick 1234 DBMS Prof. john wick 1234 DBMS k k Database management system Same data is stored at can remove such data four different places.

redundancy by storing data centrally.

Emp_Name Address Mobile Subject Emp_Name Address Mobile Subject Newyor Newyor Prof. john wick 1234 DBMS Prof. john wick 1234 DBMS k k Electrical Mechanical

### Remove data inconsistency

Computer Civil

Emp_Name Address Mobile Subject Emp_Name Address Mobile Subject Newyor 6789 Newyor Prof. john wick 1234 DBMS Prof. john wick 1234 DBMS k k Same data having Database management different state (values) system can keep data in consistent state.

Mobile no is changed

Emp_Name Address Mobile Subject Emp_Name Address Mobile Subject Newyor 6789 Newyor Prof. john wick 1234 DBMS Prof. john wick 1234 DBMS k k Electrical Mechanical

### Data isolation

Data are scattered in various files.

File - 1 Files may be in different formats.

Emp_Name Address Mobile Subject Difficult to retrieve the appropriate data.

Newyor Prof. john wick 1234 DBMS k

File - 2 DBMS allow us to access (retrieve) appropriate data easily.

Emp_Name Post Salary Load

![Figure](/reading/dbms/img/u1-database-system-architecture-p010-287.webp)

Prof. john wick Lecturer 50,000 Data isolation is a property that determines when and how changes made by one operation become visible to other File - 3 concurrent users and systems.

This issue occurs in a concurrency situation.

Emp_Name Teaching Knowledge Rating Prof. john wick Good Excellent

### Guaranteed atomicity

Atomicity: Either transaction execute 0% or 100%.

Sum of both account before transfer is 3000

Person A Person B Transfer 500 Account A Account B Bal : 2000 Bal : 1000 Step 1 : Debit 500 from Account A Step 2 : Credit 500 into Account B Transaction Sum of both is failed Sum of both account account is 2500 after transfer is 3000 so inconsistent

### Allow to implement integrity constraints

Emp_Name Address Mobile_No Subject Newyor Prof. john wick 9876543210 DBMS k Should contain exact 10 digits

Student_Name Branch Backlog SPI Newyor Nirav Patel 8.5 k Should be between 0 to 10

DBMS allows us to implement such business rules in our database..

### Sharing of data among multiple users

Want to access Computer Civil

Emp_Name Address Mobile Subject Emp_Name Address Mobile Subject Newyor Newyor Prof. john wick 1234 DBMS Prof. john wick 1234 DBMS k k

Database management system Want to access allows more than one user to access same data simultaneously.

Emp_Name Address Mobile Subject Emp_Name Address Mobile Subject Newyor Newyor Prof. john wick 1234 DBMS Prof. john wick 1234 DBMS k k Electrical Mechanical

### Restricting unauthorized access to data

File - 1 Emp_Name Address Mobile Subject Newyor Prof. john wick 1234 DBMS k Wants to access Faculty File - 2 of other Emp_Name Post Salary Load college Prof. john wick Lecturer 50,000 Wants to access ITM File - 3 Faculty Emp_Name Teaching Knowledge Rating Prof. john wick Good Excellent

DBMS prevents unauthorized user to access data.

### Providing backup and recovery services

![Figure](/reading/dbms/img/u1-database-system-architecture-p015-108.webp)

Provides facilities to backup and restore the database in case of failure.

### Advantages of DBMS (Summary)

Reduce data redundancy (duplication)

Avoids unnecessary duplication of data by storing data centrally. Remove data inconsistency By eliminating redundancy, data inconsistency can be removed. Data isolation A user can easily retrieve proper data as per his/her requirement. Guaranteed atomicity Either transaction executes 0% or 100%.

### Advantages of DBMS (Summary)

Allow implementing integrity constraints Business rules can be implemented such as do not allow to store amount less than Rs. 0 in balance.

Sharing of data among multiple users More than one users can access same data at the same time.

Restricting unauthorized access to data A user can only access data which is authorized to him/her.

Providing backup and recovery services Can take a regular auto or manual backup and use it to restore the database if it corrupts.

![Page 18](/reading/dbms/img/u1-database-system-architecture-p018.webp)

![Page 19](/reading/dbms/img/u1-database-system-architecture-p019.webp)

![Page 20](/reading/dbms/img/u1-database-system-architecture-p020.webp)

### Basic terms

Data Data is raw, unorganized facts that need to be processed.

Example: Marks of students Student_1 = 50/100, Student_2 = 25/100.

Information When data is processed, organized, structured or presented in a given context so as to make it useful, it is called information.

Example: Result of students (Pass or Fail)

Student_1 = Pass, Student_2 = Fail.

### Basic terms (cont…)

Metadata Metadata is data about data.

Data such as table name, column name, data type, authorized user and user access privileges for any table is called metadata for that table.

Faculty Emp_Name Address Mobile_No Subject Newyor Prof. john wick 9876543210 DBMS k Metadata of above table is:

- Table name such as Faculty
- Column name such as Emp_Name, Address, Mobile_No, Subject
- Datatype such as Varchar, Decimal
- Access privileges such as Read, Write (Update)

### Basic terms (cont…)

Data dictionary A data dictionary is an information repository which contains metadata.

- Table Name – Faculty
- Column Name – EmpName, Address, Mob, Subject, Salary
- Datatype – Varchar, Decimal
- Access Privileges – Read, Write (Update)

Data warehouse A data warehouse is an information repository which stores data.

Faculty Emp_Name Address Mobile_No Subject Newyor Prof. john wick 9876543210 DBMS k Prof. Ajay Patel Surat 0123456789 DBMS

Exercise Why data dictionary and data warehouse are stored in the different places?

### Basic terms (cont…)

Field A field is a character or group of characters that have a specific meaning.

E.g, the value of Emp_Name, Address, Mobile_No etc are all fields of Faculty table.

Faculty Emp_Name Address Mobile_No Subject Fields Newyor Prof. john wick 9876543210 DBMS Prof. john wick Newyork 9876543210 k Prof. Ajay Patel Surat 0123456789 DBMS Record / Tuple A record is a collection of logically related fields.

E.g, the collection of fields (Emp_Name, Address, Mobile_No, Subject) forms a record for the Faculty.

Newyor Prof. john wick 9876543210 DBMS Record / Tuple k Prof. Ajay Patel Surat 0123456789 DBMS

![Page 25](/reading/dbms/img/u1-database-system-architecture-p025.webp)

### 3 Levels Database System

User 1 User 3 User 2 How data are viewed View View 1 View 2 View 3 by each users?

Level

What data are stored and Conceptual Logical What relationships exist?

Level Level

How the data are actually Internal Physical stored on storage devices?

Level Level

Database

### 3 Levels ANSI SPARC Database System

Internal level (Physical level)

It describes how a data is stored on the storage device.

Deals with physical storage of data.

- Structure of records on disk - files, pages, blocks and indexes and ordering of records Internal view is described by the internal schema.

Conceptual level (Logical level)

What data are stored and what relationships exist among those data?

It hides low level complexities of physical storage.

For Example, STUDENT database may contain STUDENT and COURSE tables which will be visible to users but users are unaware about their storage.

Database administrator works at this level to determine what data to keep in the database.

External level (View level)

It describes only part of the entire database that an end user concern or how data are viewed by each user. Different user needs different views of the database, so there can be many views in a view level abstraction of the database. Used by end users and application programmers.

End users need to access only part of the database rather than the entire database.

### 3 Levels ANSI SPARC Database System: Example

We are storing student information in a student table.

User 1 User 3 User 2 User just interact with system with the help of GUI.

View View 1 View 2 View 3 Users are not aware of how and what the data is stored.

Level

Records can be described as fields and attributes along with their data types, their relationship among each other Conceptual Logical can be logically implemented.

Level Level Programmers generally work at this level.

Records can be described as blocks of storage (bytes, Internal Physical gigabytes, terabytes etc.) in memory.

Level Level These details are often hidden from the programmers.

Database

### Data Abstraction in DBMS

Database systems are made-up of complex data structures.

To ease the user interaction with database, the developers hide internal irrelevant details from users.

This process of hiding irrelevant details from user is called data abstraction.

### Mapping and Data Independence

Want to access some data

User 1 User 3 User 2 View View 1 View 2 View 3 Level

![Figure](/reading/dbms/img/u1-database-system-architecture-p030-212.webp)

Request Process of transforming requests and results between the Logical three levels is called mapping.

Conceptual Level Level

![Figure](/reading/dbms/img/u1-database-system-architecture-p030-323.webp)

Ability to modify a schema definition in one level without Internal Physical affecting a schema definition in the next higher level.

Level Level

Result

Database

### Types of Data Independence

Physical Data Independence Physical Data Independence is the ability to modify the physical schema without requiring any change in logical (conceptual) schema and application programs.

Modifications at the internal levels are occasionally necessary to improve performance.

Possible modifications at internal levels are changes in file structures, compression techniques, hashing algorithms, storage devices, etc.

Logical Data Independence Logical data independence is the ability to modify the conceptual schema without requiring any change in application programs.

Modification at the logical levels is necessary whenever the logical structure of the database is changed. Application programs are heavily dependent on logical structures of the data they access. So any change in logical structure also requires programs to change.

![Page 32](/reading/dbms/img/u1-database-system-architecture-p032.webp)

### Types of Database Users

Naive Users (End Users)

Unsophisticated users who have zero knowledge of database system End user interacts to database via sophisticated software or tools e.g. Clerk in bank Application Programmers Programmers who write software using tools such as Java, .Net, PHP etc… e.g. Software developers Sophisticated Users Interact with database system without using an application program Use query tools like SQL e.g. Analyst Specialized Users (DBA)

User write specialized database applications program Use administration tools e.g. Database Administrator

![Page 34](/reading/dbms/img/u1-database-system-architecture-p034.webp)

### Role of DBA

Schema Definition DBA defines the logical schema of the database.

Storage Structure and Access Method Definition DBA decides how the data is to be represented in the database & how to access it. Defining Security and Integrity Constraints DBA decides on various security and integrity constraints.

Granting of Authorization for Data Access DBA determines which user needs access to which part of the database.

Liaison with Users DBA provide necessary data to the user.

### Role of DBA

Assisting Application Programmer DBA provides assistance to application programmers to develop application programs.

Monitoring Performance DBA ensures that better performance is maintained by making a change in the physical or logical schema if required.

Backup and Recovery DBA backing up the database on some storage devices such as DVD, CD or magnetic tape or remote servers and recover the system in case of failures, such as flood or virus attack from this backup.

![Page 37](/reading/dbms/img/u1-database-system-architecture-p037.webp)

### Database System Architecture

Naive Application Sophisticated Database user programmer user administrator uses write uses uses

Application Application Query Administration interfaces program tool tool

Translates DML Interprets DDL Compiler DML DDL statements into statements into a Deals with and linker queries interpreter Executes low level low level set of tables Application execution of DDL instructions instructions that containing DML compiler and DML program generated by DML the query and organizer statements metadata object code compiler. Query evaluation evaluation engine engine Query processor understands

Buffer File Authorization and Transaction manager manager integrity manager manager Storage manager Manages allocation Fetches data from of space on disk disk storage to Preserves atomicity Provides interface Checks the authority memory for being storage between low-level and controls of users to access Data dictionary used Indices data stored and concurrency To provide faster Disk storage data and integrity access to data items Data application program Statistical data To store statistical constraints To store user data To store metadata or queries information about the data

### Questions asked in Exam

1. List and explain the advantages of DBMS over file based system. OR Explain disadvantages of files based system.

2. Draw and explain 3 level architecture of DBMS.

3. List and explain different categories/types of database users.

4. List and explain different tasks/roles/functions/duties of DBA (Database Administrator).

5. Explain DBMS architecture with block diagram. OR Explain Database System architecture with block diagram.
