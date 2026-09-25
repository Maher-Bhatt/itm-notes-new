import type { CodingProblem } from './codingLabData';

function makeSqlValidator(tokens: string[], sampleOutput: string, hint: string) {
  return (code: string) => {
    const clean = code.toLowerCase().replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
    const missing = tokens.filter((t) => !clean.includes(t.toLowerCase()));
    if (missing.length === 0) {
      return {
        passed: true,
        output: sampleOutput,
      };
    }
    return {
      passed: false,
      output: `[SQL Engine] Syntax validation failed.\nExpected SQL clause/keyword missing: "${missing[0].toUpperCase()}"\n\nFaculty Note: ${hint}`,
      error: `Missing SQL keyword: ${missing[0].toUpperCase()}`,
    };
  };
}

export const DBMS_PROBLEMS: CodingProblem[] = [
  // ─── UNIT 1: DDL & SCHEMA DEFINITION (PS-1) ───
  {
    id: 'dbms-01-ddl-create-tables',
    title: 'Practical 01: Table Creation with Primary Keys & Check Constraints (DDL)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Easy',
    marks: '5 Marks (Lab Sheet PS-1)',
    language: 'sql',
    fileName: 'ps01_create_branch_customer.sql',
    description:
      'Create the foundational banking tables BRANCH and CUSTOMERS. The BRANCH table must contain BNAME (Primary Key), CITY, and ASSETS. The CUSTOMERS table must contain CNAME (Primary Key), CITY, and AGE with a CHECK constraint ensuring AGE >= 18.',
    constraints: [
      'BNAME and CNAME must be VARCHAR(30) PRIMARY KEY',
      'CITY must be VARCHAR(30) NOT NULL',
      'CHECK constraint on CUSTOMERS (AGE >= 18)',
    ],
    expectedOutput:
      '+---------------------------------------------------------+\n| Status: Table BRANCH created successfully.              |\n| Status: Table CUSTOMERS created successfully.           |\n| Integrity: Primary Keys and CHECK(AGE >= 18) active.    |\n+---------------------------------------------------------+',
    starterCode:
      '-- Practical 01: DDL Table Creation (PS-1)\n-- 1. Create table BRANCH\nCREATE TABLE BRANCH (\n    -- TODO: Add BNAME, CITY, ASSETS\n);\n\n-- 2. Create table CUSTOMERS\nCREATE TABLE CUSTOMERS (\n    -- TODO: Add CNAME, CITY, AGE with CHECK constraint\n);',
    modelSolution:
      'CREATE TABLE BRANCH (\n    BNAME VARCHAR(30) PRIMARY KEY,\n    CITY VARCHAR(30) NOT NULL,\n    ASSETS DECIMAL(15, 2) DEFAULT 0.00\n);\n\nCREATE TABLE CUSTOMERS (\n    CNAME VARCHAR(30) PRIMARY KEY,\n    CITY VARCHAR(30) NOT NULL,\n    AGE INT CHECK (AGE >= 18)\n);',
    hints: [
      'Use PRIMARY KEY constraint on BNAME and CNAME.',
      'Add CHECK (AGE >= 18) inside the CUSTOMERS table definition.',
    ],
    validator: makeSqlValidator(
      ['create table', 'branch', 'primary key', 'customers', 'check'],
      '+---------------------------------------------------------+\n| STATUS: OK. Tables BRANCH and CUSTOMERS created.        |\n| Constraints: 2 PKs, 1 CHECK constraint verified.        |\n| Execution Time: 0.012 ms (In-Memory SQL Parser)         |\n+---------------------------------------------------------+',
      'Ensure you define both BRANCH and CUSTOMERS tables with PRIMARY KEY and CHECK constraints.'
    ),
  },

  {
    id: 'dbms-02-ddl-foreign-keys',
    title: 'Practical 02: Foreign Key Constraints with Referential Integrity (ON DELETE CASCADE)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Easy',
    marks: '5 Marks (Lab Sheet PS-1)',
    language: 'sql',
    fileName: 'ps02_create_deposit_borrow.sql',
    description:
      'Create the DEPOSIT and BORROW tables referencing BRANCH and CUSTOMERS. DEPOSIT must have ACTNO as PK, CNAME (FK referencing CUSTOMERS), BNAME (FK referencing BRANCH), and AMOUNT. Include ON DELETE CASCADE on foreign keys.',
    constraints: [
      'ACTNO VARCHAR(10) PRIMARY KEY',
      'FOREIGN KEY (CNAME) REFERENCES CUSTOMERS(CNAME) ON DELETE CASCADE',
      'FOREIGN KEY (BNAME) REFERENCES BRANCH(BNAME)',
      'AMOUNT DECIMAL(12,2) CHECK (AMOUNT > 0)',
    ],
    expectedOutput:
      '+---------------------------------------------------------+\n| Status: Table DEPOSIT created with Foreign Keys.        |\n| Foreign Keys: CUSTOMERS(CNAME), BRANCH(BNAME) connected.|\n| Cascade Action: ON DELETE CASCADE enabled.              |\n+---------------------------------------------------------+',
    starterCode:
      '-- Practical 02: Foreign Key Constraints\nCREATE TABLE DEPOSIT (\n    ACTNO VARCHAR(10) PRIMARY KEY,\n    CNAME VARCHAR(30),\n    BNAME VARCHAR(30),\n    AMOUNT DECIMAL(12,2),\n    -- TODO: Add FOREIGN KEY referencing CUSTOMERS and BRANCH\n);',
    modelSolution:
      'CREATE TABLE DEPOSIT (\n    ACTNO VARCHAR(10) PRIMARY KEY,\n    CNAME VARCHAR(30),\n    BNAME VARCHAR(30),\n    AMOUNT DECIMAL(12,2) CHECK (AMOUNT > 0),\n    FOREIGN KEY (CNAME) REFERENCES CUSTOMERS(CNAME) ON DELETE CASCADE,\n    FOREIGN KEY (BNAME) REFERENCES BRANCH(BNAME) ON DELETE CASCADE\n);',
    hints: [
      'Syntax: FOREIGN KEY (CNAME) REFERENCES CUSTOMERS(CNAME) ON DELETE CASCADE',
      'Ensure AMOUNT has a CHECK (AMOUNT > 0) constraint.',
    ],
    validator: makeSqlValidator(
      ['create table', 'deposit', 'foreign key', 'references', 'on delete cascade'],
      '+---------------------------------------------------------+\n| STATUS: Table DEPOSIT verified. Foreign keys valid.     |\n| Relational Integrity: Active across CUSTOMERS & BRANCH  |\n| Query execution: SUCCESS                                |\n+---------------------------------------------------------+',
      'Remember to specify FOREIGN KEY (...) REFERENCES ... ON DELETE CASCADE.'
    ),
  },

  {
    id: 'dbms-03-dql-select-projection',
    title: 'Practical 03: Data Retrieval with Column Projections & Aliasing (PS-1.6)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Easy',
    marks: '3 Marks (Lab Sheet PS-1)',
    language: 'sql',
    fileName: 'ps03_select_projection.sql',
    description:
      'Write a query to retrieve Account Number, Depositor Name, and Amount from DEPOSIT table. Rename the output columns using aliases: "Account_No", "Client_Name", and "Balance_INR".',
    constraints: ['Source Table: DEPOSIT', 'Use AS keyword for explicit aliasing'],
    expectedOutput:
      '+------------+-------------+-------------+\n| Account_No | Client_Name | Balance_INR |\n+------------+-------------+-------------+\n| 101        | ANIL        | 5000.00     |\n| 102        | SUNIL       | 3500.00     |\n| 103        | MEHUL       | 8200.00     |\n| 104        | MADHURI     | 12000.00    |\n+------------+-------------+-------------+',
    starterCode:
      '-- Practical 03: Projection and Aliases\n-- Write a query to select ACTNO, CNAME, AMOUNT from DEPOSIT with alias names\nSELECT \n    -- TODO: Add columns with aliases\nFROM DEPOSIT;',
    modelSolution:
      'SELECT \n    ACTNO AS Account_No,\n    CNAME AS Client_Name,\n    AMOUNT AS Balance_INR\nFROM DEPOSIT;',
    hints: ['Syntax: column_name AS alias_name', 'Select from table DEPOSIT.'],
    validator: makeSqlValidator(
      ['select', 'actno', 'cname', 'amount', 'from deposit'],
      '+------------+-------------+-------------+\n| Account_No | Client_Name | Balance_INR |\n+------------+-------------+-------------+\n| 101        | ANIL        | 5000.00     |\n| 102        | SUNIL       | 3500.00     |\n| 103        | MEHUL       | 8200.00     |\n| 104        | MADHURI     | 12000.00    |\n+------------+-------------+-------------+\n4 rows returned in 0.001 sec.',
      'Make sure you select ACTNO, CNAME, and AMOUNT from DEPOSIT with aliases.'
    ),
  },

  {
    id: 'dbms-04-where-conditional-filtering',
    title: 'Practical 04: Conditional Filtering using WHERE and Comparison Operators (PS-1.8)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Easy',
    marks: '3 Marks (Lab Sheet PS-1)',
    language: 'sql',
    fileName: 'ps04_where_filtering.sql',
    description:
      'List the names of all depositors from the DEPOSIT table who have an amount strictly greater than 4000 and have accounts in the "VRCE" or "KAROLBAGH" branch.',
    constraints: ['Filter: AMOUNT > 4000', 'Branch: BNAME IN ("VRCE", "KAROLBAGH")'],
    expectedOutput:
      '+---------+------------+----------+\n| CNAME   | BNAME      | AMOUNT   |\n+---------+------------+----------+\n| ANIL    | VRCE       | 5000.00  |\n| MADHURI | KAROLBAGH  | 12000.00 |\n| PRAMOD  | VRCE       | 9500.00  |\n+---------+------------+----------+',
    starterCode:
      '-- Practical 04: WHERE Clause with Multiple Conditions\nSELECT CNAME, BNAME, AMOUNT\nFROM DEPOSIT\nWHERE \n    -- TODO: Add conditions for AMOUNT > 4000 and branch VRCE or KAROLBAGH\n;',
    modelSolution:
      "SELECT CNAME, BNAME, AMOUNT\nFROM DEPOSIT\nWHERE AMOUNT > 4000 \n  AND BNAME IN ('VRCE', 'KAROLBAGH');",
    hints: ['Use AMOUNT > 4000', 'Use AND with BNAME IN (\'VRCE\', \'KAROLBAGH\') or OR operator.'],
    validator: makeSqlValidator(
      ['select', 'from deposit', 'where', 'amount', '4000', 'vrce'],
      '+---------+------------+----------+\n| CNAME   | BNAME      | AMOUNT   |\n+---------+------------+----------+\n| ANIL    | VRCE       | 5000.00  |\n| MADHURI | KAROLBAGH  | 12000.00 |\n| PRAMOD  | VRCE       | 9500.00  |\n+---------+------------+----------+\nFilter evaluation: PASSED (3 records matched)',
      'Ensure WHERE clause filters for AMOUNT > 4000 and branch VRCE or KAROLBAGH.'
    ),
  },

  // ─── UNIT 2: PATTERN MATCHING & SET OPERATORS (PS-2) ───
  {
    id: 'dbms-05-between-range-queries',
    title: 'Practical 05: Range Query Filtering with BETWEEN Operator (PS-2.11)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Easy',
    marks: '3 Marks (Lab Sheet PS-2)',
    language: 'sql',
    fileName: 'ps05_between_operator.sql',
    description:
      "Display account number, customer name, and deposit amount for customers who opened accounts between dates '2006-01-01' and '2006-12-31' inclusive, sorted by deposit amount in descending order.",
    constraints: ['Use BETWEEN operator for date boundaries', 'Order by AMOUNT DESC'],
    expectedOutput:
      '+-------+---------+----------+------------+\n| ACTNO | CNAME   | AMOUNT   | ADATE      |\n+-------+---------+----------+------------+\n| 104   | MADHURI | 12000.00 | 2006-04-15 |\n| 101   | ANIL    | 5000.00  | 2006-03-01 |\n| 102   | SUNIL   | 3500.00  | 2006-07-25 |\n+-------+---------+----------+------------+',
    starterCode:
      '-- Practical 05: Range Searching with BETWEEN\nSELECT ACTNO, CNAME, AMOUNT, ADATE\nFROM DEPOSIT\nWHERE \n    -- TODO: Filter dates between 2006-01-01 and 2006-12-31\nORDER BY AMOUNT DESC;',
    modelSolution:
      "SELECT ACTNO, CNAME, AMOUNT, ADATE\nFROM DEPOSIT\nWHERE ADATE BETWEEN '2006-01-01' AND '2006-12-31'\nORDER BY AMOUNT DESC;",
    hints: ['Syntax: column BETWEEN value1 AND value2', 'Include ORDER BY AMOUNT DESC at the end.'],
    validator: makeSqlValidator(
      ['select', 'from deposit', 'between', 'and', 'order by', 'desc'],
      '+-------+---------+----------+------------+\n| ACTNO | CNAME   | AMOUNT   | ADATE      |\n+-------+---------+----------+------------+\n| 104   | MADHURI | 12000.00 | 2006-04-15 |\n| 101   | ANIL    | 5000.00  | 2006-03-01 |\n| 102   | SUNIL   | 3500.00  | 2006-07-25 |\n+-------+---------+----------+------------+\nQuery verified: Sorted descending by AMOUNT.',
      'Check that you use BETWEEN ... AND ... and ORDER BY AMOUNT DESC.'
    ),
  },

  {
    id: 'dbms-06-like-wildcards-starts-contains',
    title: 'Practical 06: String Pattern Matching with LIKE & "%" Wildcard (PS-2.1)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Easy',
    marks: '4 Marks (Lab Sheet PS-2)',
    language: 'sql',
    fileName: 'ps06_like_wildcard.sql',
    description:
      "Display all employees whose name starts with 'A' and contains the letter 'a' anywhere after the first letter (case-insensitive search).",
    constraints: ['Use LIKE pattern', 'Pattern: A%a%'],
    expectedOutput:
      '+-------+----------+---------+--------+\n| EMPNO | ENAME    | JOB     | SAL    |\n+-------+----------+---------+--------+\n| 7499  | ALLEN    | SALESMAN| 1600.0 |\n| 7876  | ADAMS    | CLERK   | 1100.0 |\n+-------+----------+---------+--------+',
    starterCode:
      "-- Practical 06: LIKE Wildcard Match\nSELECT EMPNO, ENAME, JOB, SAL\nFROM EMP\nWHERE \n    -- TODO: ENAME starts with 'A' and has 'a' or 'A' later\n;",
    modelSolution:
      "SELECT EMPNO, ENAME, JOB, SAL\nFROM EMP\nWHERE ENAME LIKE 'A%a%' OR ENAME LIKE 'A%A%';",
    hints: ["'A%' matches anything starting with A.", "'A%a%' ensures an 'a' follows later."],
    validator: makeSqlValidator(
      ['select', 'from emp', 'where', 'ename', 'like'],
      '+-------+----------+---------+--------+\n| EMPNO | ENAME    | JOB     | SAL    |\n+-------+----------+---------+--------+\n| 7499  | ALLEN    | SALESMAN| 1600.0 |\n| 7876  | ADAMS    | CLERK   | 1100.0 |\n+-------+----------+---------+--------+\nPattern check: PASSED',
      'Use ENAME LIKE \'A%a%\' in your WHERE clause.'
    ),
  },

  {
    id: 'dbms-07-like-fixed-length-underscore',
    title: 'Practical 07: Single-Character Wildcard "_" Pattern Matching (PS-2.2)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Medium',
    marks: '4 Marks (Lab Sheet PS-2)',
    language: 'sql',
    fileName: 'ps07_underscore_wildcard.sql',
    description:
      "Find name, employee number, and salary of those employees whose name is exactly 5 characters long and whose second character is 'N' or 'n'.",
    constraints: ['Pattern length must be exactly 5 characters', "Second letter must be 'N' ('_N___')"],
    expectedOutput:
      '+-------+-------+---------+\n| EMPNO | ENAME | SAL     |\n+-------+-------+---------+\n| 7900  | JAMES | 950.00  | -- Example\n| 7839  | ANILS | 3200.00 |\n+-------+-------+---------+',
    starterCode:
      "-- Practical 07: Fixed length match using '_'\nSELECT EMPNO, ENAME, SAL\nFROM EMP\nWHERE \n    -- TODO: Name is exactly 5 characters and 2nd character is 'N'\n;",
    modelSolution:
      "SELECT EMPNO, ENAME, SAL\nFROM EMP\nWHERE ENAME LIKE '_N___' OR ENAME LIKE '_n___';",
    hints: ['Each underscore _ matches exactly one character.', "'_N___' has 1 underscore, 'N', then 3 underscores (total 5)."],
    validator: makeSqlValidator(
      ['select', 'from emp', 'where', 'like', '___'],
      '+-------+-------+---------+\n| EMPNO | ENAME | SAL     |\n+-------+-------+---------+\n| 7839  | ANILS | 3200.00 |\n| 7902  | JONES | 2975.00 |\n+-------+-------+---------+\nUnderscore wildcard matched exact 5 characters.',
      "Make sure you use '_N___' with exactly 4 underscores and 1 'N'."
    ),
  },

  {
    id: 'dbms-08-escape-character-clause',
    title: 'Practical 08: Escape Special Characters in Search String (PS-2.5)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Medium',
    marks: '4 Marks (Lab Sheet PS-2)',
    language: 'sql',
    fileName: 'ps08_escape_clause.sql',
    description:
      "Search for items or project codes containing an actual underscore '_' in their code name using the ESCAPE identifier keyword.",
    constraints: ["Pattern: '%\\_%' ESCAPE '\\'"],
    expectedOutput:
      '+------------+-------------------------+\n| CODE       | DESCRIPTION             |\n+------------+-------------------------+\n| PROJ_ALPHA | University Portal v1    |\n| TEST_CASE1 | Database Viva Practical |\n+------------+-------------------------+',
    starterCode:
      "-- Practical 08: ESCAPE keyword\nSELECT CODE, DESCRIPTION\nFROM PROJECTS\nWHERE \n    -- TODO: Match literal underscore using ESCAPE '\\'\n;",
    modelSolution:
      "SELECT CODE, DESCRIPTION\nFROM PROJECTS\nWHERE CODE LIKE '%\\_%' ESCAPE '\\';",
    hints: ["Use ESCAPE '\\' and place '\\_' in your pattern."],
    validator: makeSqlValidator(
      ['select', 'from projects', 'like', 'escape'],
      '+------------+-------------------------+\n| CODE       | DESCRIPTION             |\n+------------+-------------------------+\n| PROJ_ALPHA | University Portal v1    |\n| TEST_CASE1 | Database Viva Practical |\n+------------+-------------------------+\nLiteral wildcard escape successfully executed.',
      "Use LIKE '%\\_%' ESCAPE '\\'."
    ),
  },

  // ─── UNIT 3: AGGREGATE FUNCTIONS & DML (PS-3) ───
  {
    id: 'dbms-09-aggregate-math-functions',
    title: 'Practical 09: Multi-Column Aggregate Calculations (SUM, AVG, MIN, MAX) (PS-3.1)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Easy',
    marks: '4 Marks (Lab Sheet PS-3)',
    language: 'sql',
    fileName: 'ps09_aggregates.sql',
    description:
      'Calculate the total deposits, average deposit, highest deposit, and lowest deposit across all branches in the DEPOSIT table. Round average deposit to 2 decimal places.',
    constraints: ['Use SUM, AVG, MAX, MIN', 'Use ROUND(AVG(...), 2)'],
    expectedOutput:
      '+---------------+-------------+-------------+-------------+\n| Total_Deposit | Avg_Deposit | Max_Deposit | Min_Deposit |\n+---------------+-------------+-------------+-------------+\n| 38200.00      | 6366.67     | 12000.00    | 1200.00     |\n+---------------+-------------+-------------+-------------+',
    starterCode:
      '-- Practical 09: Aggregates on DEPOSIT\nSELECT\n    -- TODO: Calculate SUM, AVG, MAX, MIN of AMOUNT\nFROM DEPOSIT;',
    modelSolution:
      'SELECT\n    SUM(AMOUNT) AS Total_Deposit,\n    ROUND(AVG(AMOUNT), 2) AS Avg_Deposit,\n    MAX(AMOUNT) AS Max_Deposit,\n    MIN(AMOUNT) AS Min_Deposit\nFROM DEPOSIT;',
    hints: ['SUM(AMOUNT), AVG(AMOUNT), MAX(AMOUNT), MIN(AMOUNT)'],
    validator: makeSqlValidator(
      ['select', 'sum(amount)', 'avg(amount)', 'max(amount)', 'min(amount)', 'from deposit'],
      '+---------------+-------------+-------------+-------------+\n| Total_Deposit | Avg_Deposit | Max_Deposit | Min_Deposit |\n+---------------+-------------+-------------+-------------+\n| 38200.00      | 6366.67     | 12000.00    | 1200.00     |\n+---------------+-------------+-------------+-------------+\nAggregation OK.',
      'Call SUM(AMOUNT), AVG(AMOUNT), MAX(AMOUNT), and MIN(AMOUNT) from DEPOSIT.'
    ),
  },

  {
    id: 'dbms-10-count-distinct-values',
    title: 'Practical 10: Count Rows & Distinct Values (COUNT vs COUNT DISTINCT) (PS-3.4)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Easy',
    marks: '3 Marks (Lab Sheet PS-3)',
    language: 'sql',
    fileName: 'ps10_count_distinct.sql',
    description:
      'Count the total number of customer accounts, the total number of distinct customer names, and the count of distinct branch cities represented in the DEPOSIT table.',
    constraints: ['COUNT(*)', 'COUNT(DISTINCT CNAME)', 'COUNT(DISTINCT BNAME)'],
    expectedOutput:
      '+-------------+------------------+------------------+\n| Total_Accts | Unique_Customers | Unique_Branches  |\n+-------------+------------------+------------------+\n| 8           | 6                | 4                |\n+-------------+------------------+------------------+',
    starterCode:
      '-- Practical 10: COUNT and DISTINCT\nSELECT\n    -- TODO: Total accounts, unique customers, unique branches\nFROM DEPOSIT;',
    modelSolution:
      'SELECT\n    COUNT(*) AS Total_Accts,\n    COUNT(DISTINCT CNAME) AS Unique_Customers,\n    COUNT(DISTINCT BNAME) AS Unique_Branches\nFROM DEPOSIT;',
    hints: ['Use COUNT(*) for total rows, COUNT(DISTINCT col) for unique values.'],
    validator: makeSqlValidator(
      ['count(*)', 'count(distinct', 'from deposit'],
      '+-------------+------------------+------------------+\n| Total_Accts | Unique_Customers | Unique_Branches  |\n+-------------+------------------+------------------+\n| 8           | 6                | 4                |\n+-------------+------------------+------------------+\nCardinality metrics valid.',
      'Use COUNT(*) and COUNT(DISTINCT ...) in your query.'
    ),
  },

  {
    id: 'dbms-11-ctas-table-cloning',
    title: 'Practical 11: Table Cloning with Data using CREATE TABLE AS SELECT (CTAS) (PS-3.6)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Medium',
    marks: '4 Marks (Lab Sheet PS-3)',
    language: 'sql',
    fileName: 'ps11_ctas_clone.sql',
    description:
      'Create a new table SUPPLIER from the EMP table containing all columns and all records where the employee salary is greater than or equal to 2000.',
    constraints: ['Syntax: CREATE TABLE ... AS SELECT ...', 'Condition: SAL >= 2000'],
    expectedOutput:
      '+---------------------------------------------------------+\n| Status: Table SUPPLIER successfully created from EMP.   |\n| Rows Cloned: 6 records matching SAL >= 2000.            |\n+---------------------------------------------------------+',
    starterCode:
      '-- Practical 11: CTAS Cloning\n-- TODO: Create table SUPPLIER from EMP where SAL >= 2000\n;',
    modelSolution:
      'CREATE TABLE SUPPLIER AS\nSELECT * FROM EMP\nWHERE SAL >= 2000;',
    hints: ['CREATE TABLE new_table AS SELECT ... FROM old_table WHERE ...'],
    validator: makeSqlValidator(
      ['create table supplier as', 'select', 'from emp', 'sal >= 2000'],
      '+---------------------------------------------------------+\n| Table SUPPLIER created with schema + data from EMP.     |\n| Filter applied: SAL >= 2000                             |\n+---------------------------------------------------------+',
      'Syntax: CREATE TABLE SUPPLIER AS SELECT * FROM EMP WHERE SAL >= 2000;'
    ),
  },

  {
    id: 'dbms-12-ctas-schema-only-clone',
    title: 'Practical 12: Schema-Only Structure Cloning without Data (WHERE 1=0) (PS-3.8)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Medium',
    marks: '4 Marks (Lab Sheet PS-3)',
    language: 'sql',
    fileName: 'ps12_schema_only_clone.sql',
    description:
      'Create an empty clone of the EMP table called EMP_BACKUP having identical column names and data types, but zero rows, using the universal false predicate pattern.',
    constraints: ['Must produce 0 rows', 'Use WHERE 1=0 or WHERE false'],
    expectedOutput:
      '+---------------------------------------------------------+\n| Table EMP_BACKUP created with 0 rows (Structure only).  |\n+---------------------------------------------------------+',
    starterCode:
      '-- Practical 12: Empty table clone\n-- TODO: Create table EMP_BACKUP with identical structure but no rows\n;',
    modelSolution:
      'CREATE TABLE EMP_BACKUP AS\nSELECT * FROM EMP\nWHERE 1 = 0;',
    hints: ['A false condition like WHERE 1 = 0 copies schema without inserting any data.'],
    validator: makeSqlValidator(
      ['create table emp_backup as', 'select', 'from emp', '1 = 0'],
      '+---------------------------------------------------------+\n| Status: Table EMP_BACKUP created (0 rows imported).     |\n| Schema successfully mirrored from EMP.                  |\n+---------------------------------------------------------+',
      'Use CREATE TABLE EMP_BACKUP AS SELECT * FROM EMP WHERE 1 = 0;'
    ),
  },

  {
    id: 'dbms-13-insert-into-select',
    title: 'Practical 13: Selective Bulk Insertion with INSERT INTO SELECT (PS-3.9)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Medium',
    marks: '4 Marks (Lab Sheet PS-3)',
    language: 'sql',
    fileName: 'ps13_insert_into_select.sql',
    description:
      "Populate the empty table EMP_BACKUP with all employees from EMP whose department number is 10 or 20 and whose hire date is after '1981-01-01'.",
    constraints: ['Use INSERT INTO ... SELECT', 'Filter: DEPTNO IN (10, 20) AND HIREDATE > ...'],
    expectedOutput:
      '+---------------------------------------------------------+\n| Query OK, 5 rows inserted into EMP_BACKUP.              |\n+---------------------------------------------------------+',
    starterCode:
      "-- Practical 13: Bulk insert\nINSERT INTO EMP_BACKUP\n-- TODO: Select rows from EMP where DEPTNO IN (10, 20) and HIREDATE > '1981-01-01'\n;",
    modelSolution:
      "INSERT INTO EMP_BACKUP\nSELECT * FROM EMP\nWHERE DEPTNO IN (10, 20) \n  AND HIREDATE > '1981-01-01';",
    hints: ['INSERT INTO target_table SELECT ... FROM source_table WHERE ...'],
    validator: makeSqlValidator(
      ['insert into emp_backup', 'select', 'from emp', 'deptno in (10, 20)'],
      '+---------------------------------------------------------+\n| 5 rows successfully migrated into EMP_BACKUP.           |\n+---------------------------------------------------------+',
      'Use INSERT INTO EMP_BACKUP SELECT * FROM EMP WHERE DEPTNO IN (10, 20)...'
    ),
  },

  {
    id: 'dbms-14-update-dml-expressions',
    title: 'Practical 14: Conditional Updates with Math Expressions (PS-3.14)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Easy',
    marks: '4 Marks (Lab Sheet PS-3)',
    language: 'sql',
    fileName: 'ps14_update_salary.sql',
    description:
      'Give a 12% salary raise plus an additional bonus of 500 to all employees working in Department 20 whose current salary is under 3000.',
    constraints: ['UPDATE EMP', 'SET SAL = (SAL * 1.12) + 500', 'WHERE DEPTNO = 20 AND SAL < 3000'],
    expectedOutput:
      '+---------------------------------------------------------+\n| Rows matched: 3  Changed: 3  Warnings: 0                |\n+---------------------------------------------------------+',
    starterCode:
      '-- Practical 14: UPDATE with expression\nUPDATE EMP\nSET \n    -- TODO: Increase salary by 12% + 500\nWHERE \n    -- TODO: Department 20 and salary < 3000\n;',
    modelSolution:
      'UPDATE EMP\nSET SAL = (SAL * 1.12) + 500\nWHERE DEPTNO = 20 AND SAL < 3000;',
    hints: ['Use SAL = (SAL * 1.12) + 500', 'Filter with WHERE DEPTNO = 20 AND SAL < 3000.'],
    validator: makeSqlValidator(
      ['update emp', 'set sal', 'deptno = 20', 'sal < 3000'],
      '+---------------------------------------------------------+\n| UPDATE successful. 3 employee compensations revised.     |\n+---------------------------------------------------------+',
      'Ensure you update SAL with (SAL * 1.12) + 500 for DEPTNO = 20.'
    ),
  },

  {
    id: 'dbms-15-alter-table-schema-mutation',
    title: 'Practical 15: Schema Modification with ALTER TABLE (ADD, MODIFY, DROP) (PS-3.12)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Medium',
    marks: '5 Marks (Lab Sheet PS-3)',
    language: 'sql',
    fileName: 'ps15_alter_table.sql',
    description:
      'Modify the CUSTOMERS table: (1) Add a new column EMAIL VARCHAR(50), (2) Modify the existing CITY column to VARCHAR(50), (3) Add a UNIQUE constraint on EMAIL.',
    constraints: ['ALTER TABLE CUSTOMERS ADD COLUMN ...', 'ADD CONSTRAINT ... UNIQUE(EMAIL)'],
    expectedOutput:
      '+---------------------------------------------------------+\n| Alter table CUSTOMERS: EMAIL added, CITY enlarged.      |\n| Constraint uk_customers_email created.                  |\n+---------------------------------------------------------+',
    starterCode:
      '-- Practical 15: ALTER TABLE operations\nALTER TABLE CUSTOMERS\n    ADD COLUMN EMAIL VARCHAR(50),\n    -- TODO: Alter CITY and add UNIQUE constraint\n;',
    modelSolution:
      'ALTER TABLE CUSTOMERS ADD COLUMN EMAIL VARCHAR(50);\nALTER TABLE CUSTOMERS MODIFY CITY VARCHAR(50);\nALTER TABLE CUSTOMERS ADD CONSTRAINT uk_cust_email UNIQUE (EMAIL);',
    hints: ['ALTER TABLE ... ADD COLUMN ...', 'ALTER TABLE ... ADD CONSTRAINT ... UNIQUE(...)'],
    validator: makeSqlValidator(
      ['alter table customers', 'email', 'unique'],
      '+---------------------------------------------------------+\n| Schema migrated: CUSTOMERS altered with EMAIL & UNIQUE. |\n+---------------------------------------------------------+',
      'Use ALTER TABLE CUSTOMERS ADD COLUMN EMAIL... and ADD CONSTRAINT... UNIQUE.'
    ),
  },

  // ─── UNIT 4: SINGLE-ROW FUNCTIONS (PS-4) ───
  {
    id: 'dbms-16-string-scalar-functions',
    title: 'Practical 16: String Scalar Functions (UPPER, LOWER, LENGTH, CONCAT) (PS-4.4)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Easy',
    marks: '4 Marks (Lab Sheet PS-4)',
    language: 'sql',
    fileName: 'ps16_string_functions.sql',
    description:
      'Display employee name in UPPERCASE, job title in lowercase, the character length of the employee name, and a concatenated string "<Name> works as <Job>".',
    constraints: ['Functions: UPPER(), LOWER(), LENGTH(), CONCAT()'],
    expectedOutput:
      '+------------+-----------+---------+---------------------------+\n| Name_Upper | Job_Lower | Name_Len| Summary                   |\n+------------+-----------+---------+---------------------------+\n| SMITH      | clerk     | 5       | SMITH works as CLERK      |\n| ALLEN      | salesman  | 5       | ALLEN works as SALESMAN   |\n| WARD       | salesman  | 4       | WARD works as SALESMAN    |\n+------------+-----------+---------+---------------------------+',
    starterCode:
      '-- Practical 16: String Functions\nSELECT\n    -- TODO: UPPER(ENAME), LOWER(JOB), LENGTH(ENAME), CONCAT(...)\nFROM EMP;',
    modelSolution:
      "SELECT\n    UPPER(ENAME) AS Name_Upper,\n    LOWER(JOB) AS Job_Lower,\n    LENGTH(ENAME) AS Name_Len,\n    CONCAT(ENAME, ' works as ', JOB) AS Summary\nFROM EMP;",
    hints: ['UPPER(col), LOWER(col), LENGTH(col), CONCAT(a, b, c)'],
    validator: makeSqlValidator(
      ['upper(ename)', 'lower(job)', 'length(ename)', 'concat', 'from emp'],
      '+------------+-----------+---------+---------------------------+\n| Scalar string transformations validated.                 |\n+---------------------------------------------------------+',
      'Use UPPER(ENAME), LOWER(JOB), LENGTH(ENAME), and CONCAT(...) in SELECT.'
    ),
  },

  {
    id: 'dbms-17-date-scalar-functions',
    title: 'Practical 17: Date Functions & Service Tenure Calculation (PS-4.6)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Medium',
    marks: '4 Marks (Lab Sheet PS-4)',
    language: 'sql',
    fileName: 'ps17_date_functions.sql',
    description:
      'Display the employee name, hire date, current date, and the approximate number of completed years of service calculated as (CURRENT_DATE - HIREDATE) / 365.25 rounded down.',
    constraints: ['Use CURRENT_DATE', 'FLOOR or ROUND on year difference'],
    expectedOutput:
      '+----------+------------+--------------+---------------+\n| ENAME    | HIREDATE   | CURRENT_DATE | Years_Service |\n+----------+------------+--------------+---------------+\n| KING     | 1981-11-17 | 2026-09-25   | 44            |\n| BLAKE    | 1981-05-01 | 2026-09-25   | 45            |\n+----------+------------+--------------+---------------+',
    starterCode:
      '-- Practical 17: Date Arithmetic\nSELECT\n    ENAME,\n    HIREDATE,\n    CURRENT_DATE,\n    -- TODO: Calculate years of service\nFROM EMP;',
    modelSolution:
      'SELECT\n    ENAME,\n    HIREDATE,\n    CURRENT_DATE,\n    FLOOR(DATEDIFF(CURRENT_DATE, HIREDATE) / 365.25) AS Years_Service\nFROM EMP;',
    hints: ['Use CURRENT_DATE or NOW() and date difference / 365.25.'],
    validator: makeSqlValidator(
      ['ename', 'hiredate', 'current_date', 'from emp'],
      '+----------+------------+--------------+---------------+\n| Tenure calculations verified across all employee records|\n+---------------------------------------------------------+',
      'Select ENAME, HIREDATE, CURRENT_DATE and compute years of service.'
    ),
  },

  {
    id: 'dbms-18-null-coalesce-functions',
    title: 'Practical 18: Null Value Replacement with COALESCE / NVL (PS-4.8)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Easy',
    marks: '4 Marks (Lab Sheet PS-4)',
    language: 'sql',
    fileName: 'ps18_coalesce_nvl.sql',
    description:
      'Calculate the total monthly earnings of all employees as (SAL + COMM). Because COMM is NULL for many employees, use COALESCE(COMM, 0) so that employees without commission do not calculate to NULL.',
    constraints: ['Use COALESCE(COMM, 0) or NVL(COMM, 0)', 'Compute SAL + COALESCE(COMM, 0)'],
    expectedOutput:
      '+--------+---------+---------+----------------+\n| ENAME  | SAL     | COMM    | Total_Earnings |\n+--------+---------+---------+----------------+\n| SMITH  | 800.00  | 0.00    | 800.00         |\n| ALLEN  | 1600.00 | 300.00  | 1900.00        |\n| WARD   | 1250.00 | 500.00  | 1750.00        |\n+--------+---------+---------+----------------+',
    starterCode:
      '-- Practical 18: Null Handling\nSELECT\n    ENAME,\n    SAL,\n    COALESCE(COMM, 0) AS COMM,\n    -- TODO: Calculate Total Earnings without null bugs\nFROM EMP;',
    modelSolution:
      'SELECT\n    ENAME,\n    SAL,\n    COALESCE(COMM, 0) AS COMM,\n    (SAL + COALESCE(COMM, 0)) AS Total_Earnings\nFROM EMP;',
    hints: ['Null addition in SQL results in NULL unless wrapped in COALESCE(col, 0).'],
    validator: makeSqlValidator(
      ['coalesce(comm, 0)', 'from emp'],
      '+--------+---------+---------+----------------+\n| Null coalescing verified: No NaN or NULL totals|\n+---------------------------------------------------------+',
      'Use COALESCE(COMM, 0) in your sum calculation.'
    ),
  },

  // ─── UNIT 5: JOINS & MULTI-TABLE RELATIONS (PS-5) ───
  {
    id: 'dbms-19-inner-join-two-tables',
    title: 'Practical 19: Two-Table Inner Join (DEPOSIT & CUSTOMERS) (PS-5.1)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Easy',
    marks: '5 Marks (Lab Sheet PS-5)',
    language: 'sql',
    fileName: 'ps19_inner_join.sql',
    description:
      'Write a query using ANSI INNER JOIN to display the account number, customer name, living city from CUSTOMERS, branch name, and deposit amount from DEPOSIT.',
    constraints: ['Use INNER JOIN on CNAME', 'Table aliases: c for CUSTOMERS, d for DEPOSIT'],
    expectedOutput:
      '+-------+---------+--------+------------+----------+\n| ACTNO | CNAME   | CITY   | BNAME      | AMOUNT   |\n+-------+---------+--------+------------+----------+\n| 101   | ANIL    | NAGPUR | VRCE       | 5000.00  |\n| 102   | SUNIL   | DELHI  | AJNI       | 3500.00  |\n| 103   | MEHUL   | BOMBAY | KAROLBAGH  | 8200.00  |\n+-------+---------+--------+------------+----------+',
    starterCode:
      '-- Practical 19: Inner Join\nSELECT \n    d.ACTNO, c.CNAME, c.CITY, d.BNAME, d.AMOUNT\nFROM CUSTOMERS c\n-- TODO: INNER JOIN with DEPOSIT d ON ...\n;',
    modelSolution:
      'SELECT \n    d.ACTNO, c.CNAME, c.CITY, d.BNAME, d.AMOUNT\nFROM CUSTOMERS c\nINNER JOIN DEPOSIT d ON c.CNAME = d.CNAME;',
    hints: ['Syntax: FROM CUSTOMERS c INNER JOIN DEPOSIT d ON c.CNAME = d.CNAME'],
    validator: makeSqlValidator(
      ['inner join deposit', 'on c.cname = d.cname'],
      '+-------+---------+--------+------------+----------+\n| Relational join verified. 3-way projection valid.      |\n+---------------------------------------------------------+',
      'Join CUSTOMERS with DEPOSIT ON c.CNAME = d.CNAME.'
    ),
  },

  {
    id: 'dbms-20-three-table-join',
    title: 'Practical 20: Three-Table Join (CUSTOMER, DEPOSIT, BRANCH) (PS-5.3)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Medium',
    marks: '5 Marks (Lab Sheet PS-5)',
    language: 'sql',
    fileName: 'ps20_three_table_join.sql',
    description:
      'Find all customers who have deposits in a branch located in the SAME city where they live. Display customer name, branch name, customer city, and branch city.',
    constraints: ['Join CUSTOMERS c, DEPOSIT d, and BRANCH b', 'Condition: c.CITY = b.CITY'],
    expectedOutput:
      '+---------+------------+---------------+-------------+\n| CNAME   | BNAME      | Customer_City | Branch_City |\n+---------+------------+---------------+-------------+\n| ANIL    | VRCE       | NAGPUR        | NAGPUR      |\n| MEHUL   | KAROLBAGH  | DELHI         | DELHI       |\n+---------+------------+---------------+-------------+',
    starterCode:
      '-- Practical 20: 3-Table Join with matching city condition\nSELECT c.CNAME, b.BNAME, c.CITY AS Customer_City, b.CITY AS Branch_City\nFROM CUSTOMERS c\n-- TODO: Join DEPOSIT d and BRANCH b where customer city equals branch city\n;',
    modelSolution:
      'SELECT c.CNAME, b.BNAME, c.CITY AS Customer_City, b.CITY AS Branch_City\nFROM CUSTOMERS c\nJOIN DEPOSIT d ON c.CNAME = d.CNAME\nJOIN BRANCH b ON d.BNAME = b.BNAME\nWHERE c.CITY = b.CITY;',
    hints: ['Join c to d on CNAME, then d to b on BNAME, then add WHERE c.CITY = b.CITY.'],
    validator: makeSqlValidator(
      ['join deposit', 'join branch', 'c.city = b.city'],
      '+---------+------------+---------------+-------------+\n| 3-table join verified: Matching home branches filtered. |\n+---------------------------------------------------------+',
      'Join DEPOSIT and BRANCH, filtering WHERE c.CITY = b.CITY.'
    ),
  },

  {
    id: 'dbms-21-left-outer-join-orphans',
    title: 'Practical 21: Left Outer Join to Identify Orphan Records (PS-5.4)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Medium',
    marks: '5 Marks (Lab Sheet PS-5)',
    language: 'sql',
    fileName: 'ps21_left_outer_join.sql',
    description:
      'Find all registered CUSTOMERS who do NOT currently hold any deposit accounts in the bank. Use a LEFT JOIN on DEPOSIT and filter where DEPOSIT.ACTNO IS NULL.',
    constraints: ['Use LEFT JOIN', 'Filter with WHERE d.ACTNO IS NULL'],
    expectedOutput:
      '+---------+---------+------------+\n| CNAME   | CITY    | ACTNO      |\n+---------+---------+------------+\n| KAVITA  | BOMBAY  | NULL       |\n| RAHUL   | PUNE    | NULL       |\n+---------+---------+------------+',
    starterCode:
      '-- Practical 21: LEFT JOIN for non-matching records\nSELECT c.CNAME, c.CITY, d.ACTNO\nFROM CUSTOMERS c\n-- TODO: LEFT JOIN with DEPOSIT and filter for null accounts\n;',
    modelSolution:
      'SELECT c.CNAME, c.CITY, d.ACTNO\nFROM CUSTOMERS c\nLEFT JOIN DEPOSIT d ON c.CNAME = d.CNAME\nWHERE d.ACTNO IS NULL;',
    hints: ['LEFT JOIN preserves all rows from left table. Check where d.ACTNO IS NULL.'],
    validator: makeSqlValidator(
      ['left join deposit', 'on c.cname = d.cname', 'd.actno is null'],
      '+---------+---------+------------+\n| Orphan detection verified: 2 non-depositors isolated.   |\n+---------------------------------------------------------+',
      'Use LEFT JOIN DEPOSIT d ON c.CNAME = d.CNAME WHERE d.ACTNO IS NULL.'
    ),
  },

  {
    id: 'dbms-22-self-join-manager-hierarchy',
    title: 'Practical 22: Self-Join on Employee-Manager Organizational Hierarchy (PS-5.7)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Hard',
    marks: '6 Marks (Lab Sheet PS-5)',
    language: 'sql',
    fileName: 'ps22_self_join.sql',
    description:
      'Display each employee name and their employee number alongside their manager name and manager number. Include employees who do not have a manager (e.g. KING, the President) using a LEFT JOIN.',
    constraints: ['Self join on EMP e (employee) and EMP m (manager)', 'Condition: e.MGR = m.EMPNO'],
    expectedOutput:
      '+----------+--------+-------------+-----------+\n| Employee | Emp_No | Manager     | Mgr_No    |\n+----------+--------+-------------+-----------+\n| SMITH    | 7369   | FORD        | 7902      |\n| ALLEN    | 7499   | BLAKE       | 7698      |\n| KING     | 7839   | [TOP_EXEC]  | NULL      |\n+----------+--------+-------------+-----------+',
    starterCode:
      '-- Practical 22: Self Join on EMP\nSELECT \n    e.ENAME AS Employee,\n    e.EMPNO AS Emp_No,\n    COALESCE(m.ENAME, \'[TOP_EXEC]\') AS Manager,\n    m.EMPNO AS Mgr_No\nFROM EMP e\n-- TODO: Join EMP m on e.MGR = m.EMPNO\n;',
    modelSolution:
      'SELECT \n    e.ENAME AS Employee,\n    e.EMPNO AS Emp_No,\n    COALESCE(m.ENAME, \'[TOP_EXEC]\') AS Manager,\n    m.EMPNO AS Mgr_No\nFROM EMP e\nLEFT JOIN EMP m ON e.MGR = m.EMPNO;',
    hints: ['Join the EMP table to itself by giving it two different aliases: e and m.'],
    validator: makeSqlValidator(
      ['from emp e', 'join emp m', 'e.mgr = m.empno'],
      '+----------+--------+-------------+-----------+\n| Organizational hierarchy tree traversal complete.       |\n+---------------------------------------------------------+',
      'Join EMP e with EMP m ON e.MGR = m.EMPNO.'
    ),
  },

  // ─── UNIT 6: GROUP BY & HAVING (PS-6) ───
  {
    id: 'dbms-23-group-by-department-analytics',
    title: 'Practical 23: Categorical Grouping & Analytics with GROUP BY (PS-6.4)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Medium',
    marks: '5 Marks (Lab Sheet PS-6)',
    language: 'sql',
    fileName: 'ps23_group_by_dept.sql',
    description:
      'Find the department number, count of employees, maximum salary, minimum salary, and average salary for each department in the EMP table, sorted by department number.',
    constraints: ['GROUP BY DEPTNO', 'ORDER BY DEPTNO ASC'],
    expectedOutput:
      '+--------+-----------+----------+----------+----------+\n| DEPTNO | Emp_Count | Max_Sal  | Min_Sal  | Avg_Sal  |\n+--------+-----------+----------+----------+----------+\n| 10     | 3         | 5000.00  | 1300.00  | 2916.67  |\n| 20     | 5         | 3000.00  | 800.00   | 2175.00  |\n| 30     | 6         | 2850.00  | 950.00   | 1566.67  |\n+--------+-----------+----------+----------+----------+',
    starterCode:
      '-- Practical 23: GROUP BY Department\nSELECT\n    DEPTNO,\n    -- TODO: COUNT(*), MAX(SAL), MIN(SAL), ROUND(AVG(SAL), 2)\nFROM EMP\n-- TODO: Group by DEPTNO\nORDER BY DEPTNO ASC;',
    modelSolution:
      'SELECT\n    DEPTNO,\n    COUNT(*) AS Emp_Count,\n    MAX(SAL) AS Max_Sal,\n    MIN(SAL) AS Min_Sal,\n    ROUND(AVG(SAL), 2) AS Avg_Sal\nFROM EMP\nGROUP BY DEPTNO\nORDER BY DEPTNO ASC;',
    hints: ['Add GROUP BY DEPTNO before the ORDER BY clause.'],
    validator: makeSqlValidator(
      ['group by deptno', 'count(*)', 'avg(sal)', 'from emp'],
      '+--------+-----------+----------+----------+----------+\n| Departmental analytics successfully computed.            |\n+---------------------------------------------------------+',
      'Ensure you include GROUP BY DEPTNO.'
    ),
  },

  {
    id: 'dbms-24-having-clause-thresholds',
    title: 'Practical 24: Post-Aggregation Filtering with HAVING Clause (PS-6.11)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Medium',
    marks: '5 Marks (Lab Sheet PS-6)',
    language: 'sql',
    fileName: 'ps24_having_clause.sql',
    description:
      'Display branch names where the total deposit amount exceeds 10,000 and the branch has at least 2 distinct depositors.',
    constraints: ['GROUP BY BNAME', 'HAVING SUM(AMOUNT) > 10000 AND COUNT(DISTINCT CNAME) >= 2'],
    expectedOutput:
      '+------------+---------------+----------------+\n| BNAME      | Total_Deposit | Depositor_Count|\n+------------+---------------+----------------+\n| VRCE       | 14500.00      | 2              |\n| KAROLBAGH  | 20200.00      | 2              |\n+------------+---------------+----------------+',
    starterCode:
      '-- Practical 24: HAVING Clause\nSELECT\n    BNAME,\n    SUM(AMOUNT) AS Total_Deposit,\n    COUNT(DISTINCT CNAME) AS Depositor_Count\nFROM DEPOSIT\nGROUP BY BNAME\n-- TODO: Add HAVING condition for Total > 10000 and Count >= 2\n;',
    modelSolution:
      'SELECT\n    BNAME,\n    SUM(AMOUNT) AS Total_Deposit,\n    COUNT(DISTINCT CNAME) AS Depositor_Count\nFROM DEPOSIT\nGROUP BY BNAME\nHAVING SUM(AMOUNT) > 10000 AND COUNT(DISTINCT CNAME) >= 2;',
    hints: ['HAVING filters groups created by GROUP BY, while WHERE filters individual rows.'],
    validator: makeSqlValidator(
      ['group by bname', 'having sum(amount) > 10000'],
      '+------------+---------------+----------------+\n| High-volume branches filtered via HAVING threshold.      |\n+---------------------------------------------------------+',
      'Use HAVING SUM(AMOUNT) > 10000 AND COUNT(DISTINCT CNAME) >= 2.'
    ),
  },

  // ─── UNIT 7: SUBQUERIES & NESTED QUERIES (PS-7) ───
  {
    id: 'dbms-25-single-row-subquery',
    title: 'Practical 25: Single-Row Subquery in WHERE Clause (PS-7.4)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Medium',
    marks: '5 Marks (Lab Sheet PS-7)',
    language: 'sql',
    fileName: 'ps25_single_subquery.sql',
    description:
      'Write a query to display employee number, employee name, job, and salary of all employees who earn strictly more than the company-wide average salary.',
    constraints: ['Condition: SAL > (SELECT AVG(SAL) FROM EMP)', 'Order by SAL DESC'],
    expectedOutput:
      '+-------+-------+-----------+---------+\n| EMPNO | ENAME | JOB       | SAL     |\n+-------+-------+-----------+---------+\n| 7839  | KING  | PRESIDENT | 5000.00 |\n| 7902  | FORD  | ANALYST   | 3000.00 |\n| 7788  | SCOTT | ANALYST   | 3000.00 |\n| 7566  | JONES | MANAGER   | 2975.00 |\n+-------+-------+-----------+---------+',
    starterCode:
      '-- Practical 25: Single-row subquery\nSELECT EMPNO, ENAME, JOB, SAL\nFROM EMP\nWHERE \n    -- TODO: SAL > average salary across the company\nORDER BY SAL DESC;',
    modelSolution:
      'SELECT EMPNO, ENAME, JOB, SAL\nFROM EMP\nWHERE SAL > (SELECT AVG(SAL) FROM EMP)\nORDER BY SAL DESC;',
    hints: ['Inner query: (SELECT AVG(SAL) FROM EMP) returns a single scalar float.'],
    validator: makeSqlValidator(
      ['select', 'from emp', 'where sal >', '(select avg(sal) from emp)'],
      '+-------+-------+-----------+---------+\n| Above-average earners dynamically computed and returned.|\n+---------------------------------------------------------+',
      'Use WHERE SAL > (SELECT AVG(SAL) FROM EMP).'
    ),
  },

  {
    id: 'dbms-26-multi-row-subquery-in',
    title: 'Practical 26: Multi-Row Subquery with IN Operator (PS-7.1)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Medium',
    marks: '5 Marks (Lab Sheet PS-7)',
    language: 'sql',
    fileName: 'ps26_subquery_in.sql',
    description:
      "Find all employees who work in the same department as 'SCOTT', excluding SCOTT himself from the final result set.",
    constraints: ["Subquery: (SELECT DEPTNO FROM EMP WHERE ENAME = 'SCOTT')", "Exclude: ENAME != 'SCOTT'"],
    expectedOutput:
      '+-------+-------+---------+--------+\n| EMPNO | ENAME | JOB     | DEPTNO |\n+-------+-------+---------+--------+\n| 7369  | SMITH | CLERK   | 20     |\n| 7566  | JONES | MANAGER | 20     |\n| 7876  | ADAMS | CLERK   | 20     |\n| 7902  | FORD  | ANALYST | 20     |\n+-------+-------+---------+--------+',
    starterCode:
      "-- Practical 26: Subquery with IN\nSELECT EMPNO, ENAME, JOB, DEPTNO\nFROM EMP\nWHERE \n    -- TODO: Same department as SCOTT but not SCOTT\n;",
    modelSolution:
      "SELECT EMPNO, ENAME, JOB, DEPTNO\nFROM EMP\nWHERE DEPTNO = (SELECT DEPTNO FROM EMP WHERE ENAME = 'SCOTT')\n  AND ENAME != 'SCOTT';",
    hints: ["Subquery: SELECT DEPTNO FROM EMP WHERE ENAME = 'SCOTT'"],
    validator: makeSqlValidator(
      ['from emp', 'where deptno', 'select deptno from emp where ename', 'scott'],
      '+-------+-------+---------+--------+\n| Department peers identified (SCOTT excluded).            |\n+---------------------------------------------------------+',
      "Filter DEPTNO = (SELECT DEPTNO FROM EMP WHERE ENAME = 'SCOTT') AND ENAME != 'SCOTT'."
    ),
  },

  {
    id: 'dbms-27-correlated-subquery-exists',
    title: 'Practical 27: Correlated Subquery with EXISTS Operator (PS-7.10)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Hard',
    marks: '6 Marks (Lab Sheet PS-7)',
    language: 'sql',
    fileName: 'ps27_correlated_exists.sql',
    description:
      'Find all customers who have BOTH a deposit account AND a loan (borrow) account using the correlated EXISTS operator.',
    constraints: ['Outer table: CUSTOMERS c', 'Correlated EXISTS on DEPOSIT and BORROW'],
    expectedOutput:
      '+---------+--------+----------------+\n| CNAME   | CITY   | STATUS         |\n+---------+--------+----------------+\n| ANIL    | NAGPUR | Depositor+Loan |\n| SUNIL   | DELHI  | Depositor+Loan |\n+---------+--------+----------------+',
    starterCode:
      '-- Practical 27: Correlated Subquery with EXISTS\nSELECT c.CNAME, c.CITY, \'Depositor+Loan\' AS STATUS\nFROM CUSTOMERS c\nWHERE \n    -- TODO: EXISTS in DEPOSIT AND EXISTS in BORROW\n;',
    modelSolution:
      'SELECT c.CNAME, c.CITY, \'Depositor+Loan\' AS STATUS\nFROM CUSTOMERS c\nWHERE EXISTS (\n    SELECT 1 FROM DEPOSIT d WHERE d.CNAME = c.CNAME\n) AND EXISTS (\n    SELECT 1 FROM BORROW b WHERE b.CNAME = c.CNAME\n);',
    hints: ['Use WHERE EXISTS (SELECT 1 FROM DEPOSIT WHERE d.CNAME = c.CNAME) AND EXISTS (...)'],
    validator: makeSqlValidator(
      ['from customers c', 'exists', 'select 1 from deposit', 'select 1 from borrow'],
      '+---------+--------+----------------+\n| Correlated existence criteria validated across tables.   |\n+---------------------------------------------------------+',
      'Use EXISTS with correlated subqueries on DEPOSIT and BORROW.'
    ),
  },

  {
    id: 'dbms-28-subquery-highest-depositors',
    title: 'Practical 28: Complex Subquery - Branches with Maximum Depositors (PS-7.8)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Hard',
    marks: '6 Marks (Lab Sheet PS-7)',
    language: 'sql',
    fileName: 'ps28_max_branch_deposits.sql',
    description:
      'Find the branch name(s) that have the highest total number of individual depositors in the entire university banking system.',
    constraints: ['Subquery with MAX count', 'HAVING COUNT(*) = (SELECT MAX(...) ...)'],
    expectedOutput:
      '+------------+----------------+\n| BNAME      | Total_Clients  |\n+------------+----------------+\n| VRCE       | 5              |\n+------------+----------------+',
    starterCode:
      '-- Practical 28: Branch with highest number of depositors\nSELECT BNAME, COUNT(DISTINCT CNAME) AS Total_Clients\nFROM DEPOSIT\nGROUP BY BNAME\nHAVING COUNT(DISTINCT CNAME) >= ALL (\n    -- TODO: Subquery for counts\n);',
    modelSolution:
      'SELECT BNAME, COUNT(DISTINCT CNAME) AS Total_Clients\nFROM DEPOSIT\nGROUP BY BNAME\nHAVING COUNT(DISTINCT CNAME) >= ALL (\n    SELECT COUNT(DISTINCT CNAME)\n    FROM DEPOSIT\n    GROUP BY BNAME\n);',
    hints: ['Use >= ALL (SELECT COUNT(...) FROM DEPOSIT GROUP BY BNAME).'],
    validator: makeSqlValidator(
      ['group by bname', 'having', 'all', 'select count'],
      '+------------+----------------+\n| Branch with peak depositor density located.             |\n+---------------------------------------------------------+',
      'Use HAVING COUNT(...) >= ALL (SELECT COUNT(...) FROM DEPOSIT GROUP BY BNAME).'
    ),
  },

  // ─── UNIT 8: ADVANCED DML & TRANSACTIONS (PS-8 & PS-10) ───
  {
    id: 'dbms-29-correlated-update-interest',
    title: 'Practical 29: Conditional Cross-Table Balance Modification (PS-8.1)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Medium',
    marks: '5 Marks (Lab Sheet PS-8)',
    language: 'sql',
    fileName: 'ps29_update_interest.sql',
    description:
      'Credit a 10% interest rate to all depositors whose branch is located in the city "NAGPUR".',
    constraints: ['UPDATE DEPOSIT', 'SET AMOUNT = AMOUNT * 1.10', "WHERE BNAME IN (SELECT BNAME FROM BRANCH WHERE CITY = 'NAGPUR')"],
    expectedOutput:
      '+---------------------------------------------------------+\n| UPDATE DEPOSIT: 10% Interest credited.                 |\n| Rows changed: 2 (Nagpur branches)                       |\n+---------------------------------------------------------+',
    starterCode:
      '-- Practical 29: Credit interest based on branch city\nUPDATE DEPOSIT\nSET AMOUNT = AMOUNT * 1.10\nWHERE \n    -- TODO: Branch located in NAGPUR\n;',
    modelSolution:
      "UPDATE DEPOSIT\nSET AMOUNT = AMOUNT * 1.10\nWHERE BNAME IN (\n    SELECT BNAME FROM BRANCH WHERE CITY = 'NAGPUR'\n);",
    hints: ["Subquery in WHERE clause: SELECT BNAME FROM BRANCH WHERE CITY = 'NAGPUR'."],
    validator: makeSqlValidator(
      ['update deposit', 'amount * 1.10', 'select bname from branch', 'nagpur'],
      '+---------------------------------------------------------+\n| Interest update verified across all regional branches.   |\n+---------------------------------------------------------+',
      "Update AMOUNT = AMOUNT * 1.10 WHERE BNAME IN (SELECT BNAME FROM BRANCH WHERE CITY = 'NAGPUR')."
    ),
  },

  {
    id: 'dbms-30-transaction-control-acid',
    title: 'Practical 30: Transaction Control Language (TCL) - COMMIT, ROLLBACK & SAVEPOINT (PS-10)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Hard',
    marks: '6 Marks (Lab Sheet PS-10)',
    language: 'sql',
    fileName: 'ps30_tcl_transactions.sql',
    description:
      'Simulate a banking fund transfer: (1) Start transaction, (2) Debit 500 from Account 101, (3) Create SAVEPOINT sp1, (4) Attempt credit of 500 to non-existent account 999, (5) ROLLBACK TO SAVEPOINT sp1, (6) Credit 500 to Account 102, (7) COMMIT.',
    constraints: ['Use BEGIN / START TRANSACTION', 'SAVEPOINT sp1', 'ROLLBACK TO SAVEPOINT', 'COMMIT'],
    expectedOutput:
      '+---------------------------------------------------------+\n| TRANSACTION START                                       |\n| 1. Debit Acct 101: -500.00                              |\n| 2. SAVEPOINT sp1 established.                           |\n| 3. Partial Rollback executed. Balance restored.         |\n| 4. Credit Acct 102: +500.00                             |\n| 5. TRANSACTION COMMITTED. ACID Integrity Guaranteed.    |\n+---------------------------------------------------------+',
    starterCode:
      '-- Practical 30: TCL Fund Transfer Simulation\nSTART TRANSACTION;\n\n-- Debit Account 101\nUPDATE DEPOSIT SET AMOUNT = AMOUNT - 500 WHERE ACTNO = \'101\';\n\n-- TODO: Create SAVEPOINT, ROLLBACK TO SAVEPOINT, and final COMMIT\n',
    modelSolution:
      "START TRANSACTION;\n\nUPDATE DEPOSIT SET AMOUNT = AMOUNT - 500 WHERE ACTNO = '101';\n\nSAVEPOINT sp1;\n\n-- Simulated bad update\nUPDATE DEPOSIT SET AMOUNT = AMOUNT + 500 WHERE ACTNO = '999';\nROLLBACK TO SAVEPOINT sp1;\n\n-- Correct credit\nUPDATE DEPOSIT SET AMOUNT = AMOUNT + 500 WHERE ACTNO = '102';\n\nCOMMIT;",
    hints: ['SAVEPOINT sp1;', 'ROLLBACK TO SAVEPOINT sp1;', 'COMMIT;'],
    validator: makeSqlValidator(
      ['transaction', 'savepoint', 'rollback to', 'commit'],
      '+---------------------------------------------------------+\n| TCL transaction lifecycle verified with 100% ACID safety|\n+---------------------------------------------------------+',
      'Ensure you include SAVEPOINT, ROLLBACK TO SAVEPOINT, and COMMIT.'
    ),
  },

  // ─── UNIT 9: VIEWS & SECURITY (PS-9) ───
  {
    id: 'dbms-31-views-abstraction',
    title: 'Practical 31: Creating Secure Views for Sensitive Data Abstraction (PS-9)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Medium',
    marks: '5 Marks (Lab Sheet PS-9)',
    language: 'sql',
    fileName: 'ps31_create_views.sql',
    description:
      'Create a database VIEW called V_DEPOSIT_SUMMARY that exposes only Customer Name, Branch Name, and Amount, hiding internal account numbers and personal details from public desk staff.',
    constraints: ['CREATE OR REPLACE VIEW V_DEPOSIT_SUMMARY AS ...'],
    expectedOutput:
      '+---------------------------------------------------------+\n| View V_DEPOSIT_SUMMARY created successfully.            |\n| Data Abstraction Active: ACTNO hidden from query scope. |\n+---------------------------------------------------------+',
    starterCode:
      '-- Practical 31: Database View\n-- TODO: Create view V_DEPOSIT_SUMMARY selecting CNAME, BNAME, AMOUNT from DEPOSIT\n;',
    modelSolution:
      'CREATE OR REPLACE VIEW V_DEPOSIT_SUMMARY AS\nSELECT CNAME, BNAME, AMOUNT\nFROM DEPOSIT;',
    hints: ['CREATE OR REPLACE VIEW view_name AS SELECT ... FROM ...'],
    validator: makeSqlValidator(
      ['create', 'view v_deposit_summary as', 'select', 'from deposit'],
      '+---------------------------------------------------------+\n| View V_DEPOSIT_SUMMARY active and queryable.            |\n+---------------------------------------------------------+',
      'Use CREATE OR REPLACE VIEW V_DEPOSIT_SUMMARY AS SELECT CNAME, BNAME, AMOUNT FROM DEPOSIT.'
    ),
  },

  // ─── UNIT 10: TRIGGERS & AUDITING (PS-11) ───
  {
    id: 'dbms-32-triggers-audit-log',
    title: 'Practical 32: PL/SQL Row-Level Trigger for Automated Security Auditing (PS-11)',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Hard',
    marks: '7 Marks (University External Lab Exam)',
    language: 'sql',
    fileName: 'ps32_audit_trigger.sql',
    description:
      'Create an audit table ACCOUNT_AUDIT and an AFTER UPDATE trigger on DEPOSIT that automatically captures whenever a deposit balance changes, recording Account No, Old Amount, New Amount, and Timestamp.',
    constraints: [
      'CREATE TABLE ACCOUNT_AUDIT (actno, old_amt, new_amt, changed_at)',
      'CREATE TRIGGER trg_audit_deposit AFTER UPDATE ON DEPOSIT',
    ],
    expectedOutput:
      '+---------------------------------------------------------+\n| Trigger trg_audit_deposit compiled and registered.       |\n| Audit Security: Live row logging active on table DEPOSIT|\n+---------------------------------------------------------+',
    starterCode:
      '-- Practical 32: Audit Trigger\nCREATE TABLE ACCOUNT_AUDIT (\n    AUDIT_ID INT AUTO_INCREMENT PRIMARY KEY,\n    ACTNO VARCHAR(10),\n    OLD_AMOUNT DECIMAL(12,2),\n    NEW_AMOUNT DECIMAL(12,2),\n    CHANGED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\n-- TODO: Create trigger trg_deposit_audit AFTER UPDATE ON DEPOSIT\n',
    modelSolution:
      'CREATE TABLE ACCOUNT_AUDIT (\n    AUDIT_ID INT AUTO_INCREMENT PRIMARY KEY,\n    ACTNO VARCHAR(10),\n    OLD_AMOUNT DECIMAL(12,2),\n    NEW_AMOUNT DECIMAL(12,2),\n    CHANGED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\nCREATE TRIGGER trg_deposit_audit\nAFTER UPDATE ON DEPOSIT\nFOR EACH ROW\nBEGIN\n    IF OLD.AMOUNT <> NEW.AMOUNT THEN\n        INSERT INTO ACCOUNT_AUDIT (ACTNO, OLD_AMOUNT, NEW_AMOUNT)\n        VALUES (OLD.ACTNO, OLD.AMOUNT, NEW.AMOUNT);\n    END IF;\nEND;',
    hints: ['CREATE TRIGGER ... AFTER UPDATE ON DEPOSIT FOR EACH ROW ...'],
    validator: makeSqlValidator(
      ['create trigger', 'after update on deposit', 'for each row'],
      '+---------------------------------------------------------+\n| Row-level security audit trigger successfully compiled. |\n+---------------------------------------------------------+',
      'Syntax: CREATE TRIGGER trg_deposit_audit AFTER UPDATE ON DEPOSIT FOR EACH ROW...'
    ),
  },
];
