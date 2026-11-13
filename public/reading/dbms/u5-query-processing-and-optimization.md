## Unit-5

## Query Processing

## and Optimization

 Looping Outline

- Steps in query processing
- Measures of query cost
- Selection operation
- Evaluation of expressions
- Query optimization
- Transformation of relational expressions
- Sorting and join

![Page 3](/reading/dbms/img/u5-query-processing-and-optimization-p003.jpg)

### Steps in Query Processing

Parser checks the syntax of Translator translates the query and verifies attribute query into its internal name and relation name form (relational algebra)

Parser and Relational algebra Query translator expression

Choose best execution plan Optimizer Execute the query-evaluation plan and returns output Evaluation Query output Execution plan engine

Database Catalog Data Statistics about Data

![Page 5](/reading/dbms/img/u5-query-processing-and-optimization-p005.jpg)

### Measures of Query Cost

Cost is generally measured as the total time required to execute a statement/query.

Factors contribute to time cost Disk accesses (time to process a data request and retrieve the required data from the storage device) CPU time to execute a query Network communication cost Disk access is the predominant (major) cost, since disk access is slow as compared to in- memory operation.

Cost to write a block is greater than cost to read a block because data is read back after being written to ensure that the write was successful.

![Page 7](/reading/dbms/img/u5-query-processing-and-optimization-p007.jpg)

### Selection Operator

### Symbol: σ (Sigma)

### Notation: σ condition (Relation)

Operation: Selects tuples from a relation that satisfy a given condition.

Operators: =, <>, <, >, <=, >=, Λ (AND), V (OR)

### Answer σBranch=‘CE’ (Student)

Example Display the detail of students belongs to “CE” Branch.

| Student |  |  |  |
|---|---|---|---|
| RollNo | Name | Branch | SPI |
| 101 | ravi | CE | 8 |
| 102 | Mitesh | ME | 9 |
| 103 | Nilesh | CI | 9 |
| 104 | Meet | CE | 9 |

| Output |  |  |  |
|---|---|---|---|
| RollNo | Name | Branch | SPI |
| 101 | ravi | CE | 8 |
| 104 | Meet | CE | 9 |

### Search algorithm for selection operation

Linear search (A1)

Binary search (A2)

### Linear search (A1)

It scans each blocks and tests all records to see whether they satisfy the selection condition. Cost of linear search (worst case) = br br denotes number of blocks containing records from relation r If the selection condition is there on a (primary) key attribute, then system can stop searching if the required record is found.

cost of linear search (best case) = (br /2)

If the selection is on non (primary) key attribute then multiple block may contains required records, then the cost of scanning such blocks need to be added to the cost estimate.

Linear search can be applied regardless of selection condition or ordering of records in the file (relation)

This algorithm is slower than binary search algorithm.

### Binary search (A2)

Generally, this algorithm is used if selection is an equality comparison on the (primary) key attribute and file (relation) is ordered (sorted) on (primary) key attribute.

cost of binary search = [log2(br)] br denotes number of blocks containing records from relation r This algorithm is faster than linear search algorithm.

![Page 12](/reading/dbms/img/u5-query-processing-and-optimization-p012.jpg)

### Evaluation of expressions

Expression may contain more than one operations, solving expression will be difficult

### ΠCust_Name

if it contains more than one operations.

### ΠCust_Name ( σBalance<2500 (account) (customer) )

To evaluate such expression we need to Execution Bottom to top evaluate each operations one by one in appropriate order.

### σBalance<2500

(customer) Two methods for evaluating an expression carrying multiple operations are:

Materialization (account)

Pipelining

### Materialization

Materialization evaluates the expression tree of the relational algebra operation from the bottom and performs the innermost or leaf-level operations first.

The intermediate result of each operation is materialized (store in temporary relation) and becomes input for subsequent (next) operations.

The cost of materialization is the sum of the individual operations plus the cost of writing the intermediate results to disk.

The problem with materialization is that it creates lots of temporary relations it performs lots of I/O operations

### Pipelining

In pipelining, operations form a queue, and results are passed from one operation to another as they are calculated.

To reduce number of intermediate temporary relations, we pass results of one operation to the next operation in the pipelines.

Combining operations into a pipeline eliminates the cost of reading and writing temporary relations.

Pipelines can be executed in two ways:

Demand driven (System makes repeated requests for tuples from the operation at the top of pipeline) Producer driven (Operations do not wait for request to produce tuples, but generate the tuples eagerly.)

![Page 16](/reading/dbms/img/u5-query-processing-and-optimization-p016.jpg)

### Query optimization

It is a process of selecting the most efficient query evaluation plan from the available possible plans.

### ΠCust_Name ( σBalance<2500 (account) (customer) )

Customer Account CID ANO Name ANO Balance Efficient plan C01 A01 Raj A01 3000 2 records 4 records C02 A02 Meet A02 1000 C03 A03 Jay A03 2000

### ΠCust_Name ( σBalance<2500 (account customer) )

C04 A04 Ram A04 4000

4 records 4 records

### Approaches to Query Optimization

Exhaustive Search Optimization Generates all possible query plans and then the best plan is selected.

It provides best solution.

Heuristic Based Optimization Heuristic based optimization uses rule-based optimization approaches for query optimization.

Performs select and project operations before join operations. This is done by moving the select and project operations down the query tree. This reduces the number of tuples available for join.

Avoid cross-product operation because they result in very large-sized intermediate tables.

This algorithms do not necessarily produce the best query plan.

![Page 19](/reading/dbms/img/u5-query-processing-and-optimization-p019.jpg)

### Transformation of relational expressions

Two relational algebra expressions are said to be equivalent if the two expressions generate the same set of tuples.

Example:

Customer Account CID ANO Name ANO Balance C01 A01 Raj A01 3000 C02 A02 Meet A02 1000 C03 A03 Jay A03 2000 C04 A04 Ram A04 4000

### ΠName ( σBalance<2500 (Account) (Customer) )

### ΠName ( σBalance<2500 (Account Customer) )

Customer Name Meet Jay

### Transformation of relational expressions

Combined selection operation can be divided into sequence of individual selections. This transformation is called cascade of σ.

Example:

Customer CID ANO Name Balance

### σANO<3 Λ Balance<2000 (Customer)

Output C01 Raj 3000 CID ANO Name Balance C02 Meet 1000 OUTPUT C02 Meet 1000 C03 Jay 2000

### σANO<3 (σBalance<2000 (Customer))

C04 Ram 4000

### σθ1Λθ2 (E) = σθ1 (σθ2 (E))

### Transformation of relational expressions

Selection operations are commutative.

Example:

Customer CID ANO Name Balance

### σANO<3 (σBalance<2000 (Customer))

Output C01 Raj 3000 CID ANO Name Balance C02 Meet 1000 OUTPUT C02 Meet 1000 C03 Jay 2000

### σBalance<2000 (σANO<3 (Customer))

C04 Ram 4000

### σθ1 (σθ2 (E)) = σθ2 (σθ1 (E))

### Transformation of relational expressions

If more than one projection operation is used in expression then only the outer projection operation is required. So skip all the other inner projection operation.

Example:

Customer Customer CID ANO Name Balance Name

### ΠName (ΠANO, Name (Customer))

C01 Raj 3000 Raj C02 Meet 1000 OUTPUT Meet C03 Jay 2000 Jay

### ΠName (Customer)

C04 Ram 4000 Ram

### ΠL1 (ΠL2 (…(Π Ln (E))…)) = ΠL1 (E)

### Transformation of relational expressions

Selection operation can be joined with Cartesian product and theta join. Example:

| Customer |  |  |  |  | Account |  |  |  |  |  |  |  |  |  |  |  |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| CID C01 | ANO 1 |  | Name Raj |  | ANO 1 | Balance 3000 |  |  | (Customer Account) σANO<3 |  |  | Output CID ANO |  |  | Name | Balance |
| C02 | 2 |  | Meet |  | 2 | 1000 |  |  |  |  | OUTPUT | C01 | 1 |  | Raj | 3000 |
| C03 | 3 |  | Jay |  | 3 | 2000 |  |  |  |  |  | C02 | 2 |  | Meet | 1000 |
| C04 | 4 |  | Ram |  | 4 | 4000 |  |  | (Customer) (Account) σANO<3 |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  | (E1 E2)) σθ |  |  | = E1 θE2 |  |  |  |  |  |  |
|  |  |  |  |  |  | (E1 E2)) σθ1 θ2 |  |  |  | = E1 E2 θ1Λ θ2 |  |  |  |  |  |  |

### Transformation of relational expressions

Theta operations are commutative.

Example:

| Customer |  |  |  |  | Account |  |  |  |  |  |  |  |  |  |  |  |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| CID C01 | ANO 1 |  | Name Raj |  | ANO 1 | Balance 3000 |  |  | (Account) (Customer) σANO<3 |  |  | Output CID ANO |  |  | Name | Balance |
| C02 | 2 |  | Meet |  | 2 | 1000 |  |  |  |  | OUTPUT | C01 | 1 |  | Raj | 3000 |
| C03 | 3 |  | Jay |  | 3 | 2000 |  |  |  |  |  | C02 | 2 |  | Meet | 1000 |
| C04 | 4 |  | Ram |  | 4 | 4000 |  |  | (Customer) (Account) σANO<3 |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  | E1 E2 = E2 E1 σθ σθ |  |  |  |  |  |  |  |  |  |

### Transformation of relational expressions

Natural join operations are associative.

### (E1 E2) E3 = E1 (E2 E3)

Selection operation distribute over theta join operation under the following condition When all the attributes in the selection condition θ0 involves only the attributes of the one of the expression (says E1) being joined.

### σθ0 (E1 θ E2) = (σθ0 (E1)) θ E2

When the selection condition θ1 involves only the attributes of E1 and θ2 involves only the attributes of E2.

### σθ1Λθ2 (E1 θ E2) = (σθ1(E1) θ (σθ2 (E2)))

### Transformation of relational expressions

Set operations union and intersection are commutative.

Output Customer Employee Customer U Employee Name Cst_Name Emp_Name Raj Raj Meet OUTPUT Meet Meet Suresh Suresh Employee U Customer

Customer Employee Customer ∩ Employee Output Cst_Name Emp_Name Name Raj Meet OUTPUT Meet Meet Suresh Employee ∩ Customer

### E1 U E2 = E2 U E1 & E1 ∩ E2 = E2 ∩ E1

Set difference is not commutative

### Transformation of relational expressions

Set operations union and intersection are associative.

Output Customer Employee Student (Customer U Employee) U Student Name Cst_Name Emp_Name Stu_Name Raj Raj Meet Raj OUTPUT Meet Meet Suresh Meet Suresh Customer U (Employee U Student)

Customer Employee Student (Customer ∩ Employee) ∩ Student Output Cst_Name Emp_Name Stu_Name Name Raj Meet Raj OUTPUT Meet Meet Suresh Meet Customer ∩ (Employee ∩ Student)

### (E1 U E2) U E3 = E1 U (E2 U E3) & (E1 ∩ E2) ∩ E3 = E1 ∩ (E2 ∩ E3)

### Transformation of relational expressions

Selection operation distributes over U, ∩ and –.

### σθ(E1 U E2) = σθ(E1) U σθ(E2)

### σθ(E1 ∩ E2) = σθ(E1) ∩ σθ(E2)

### σθ(E1 – E2) = σθ(E1) – σθ(E2)

![Page 30](/reading/dbms/img/u5-query-processing-and-optimization-p030.jpg)

### Sorting

Several of the relational operations, such as joins, can be implemented efficiently if the input relations are first sorted.

We can sort a relation by building an index on the relation and then using that index to read the relation in sorted order.

Such a process orders the relation only logically rather than physically.

Hence reading of tuples in the sorted order may lead to disk access for each record, which can be very expensive.

So it is desirable to order the records physically.

Sorting of relation that fit into main memory, standard sorting techniques such as quick-sort can be used.

Sorting of relations that do not fit in main memory is called external sorting.

Most commonly used algorithm for this type of sorting is external sort merge algorithm.

### External Sort-Merge (Example)

Blocks=3

create merge merge runs pass-1 pass-2

initial relation runs sorted output runs

### External Sort-Merge (Algorithm)

Let M denote memory size (in pages).

1. Create sorted runs. Let i be 0 initially.

Repeatedly do the following till the end of the relation:

1) Read M blocks of relation into memory

2) Sort the in-memory blocks

3) Write sorted data to run Ri; then increment i.

Let the final value of i be N

2. Merge the runs (N-way merge). We assume (for now) that N < M.

Use N blocks of memory to buffer input runs, and 1 block to buffer output. Read the first block of each run into its buffer page repeat Select the first record (in sort order) among all buffer pages Write the record to the output buffer. If the output buffer is full write it to disk.

Delete the record from its input buffer page.

- If the buffer page becomes empty then read the next block (if any) of the run into the buffer.

until all input buffer pages are empty:

### External Sort-Merge (Algorithm)

If N  M, several merge passes are required.

In each pass, contiguous groups of M - 1 runs are merged.

A pass reduces the number of runs by a factor of M -1, and creates runs longer by the same factor.

- E.g. If M=11, and there are 90 runs, one pass reduces the number of runs to 9, each 10 times the size of the initial runs Repeated passes are performed till all runs have been merged into one.

### Sum (Nested loop join)

Assuming worst case memory availability and the following given statistics for the relations customer and depositor Number of records of customer: 10,000 (ncustomer)

Number of records of depositor: 5,000 (ndepositor)

Number of blocks of customer: 400 (bcustomer)

Number of blocks of depositor: 100 (bdepositor)

Estimate the cost

1. with depositor as outer relation

2. with customer as outer relation

### Sum (Nested loop join)

Assuming worst case memory availability and the following given statistics for the relations customer and depositor Number of records of customer: 10,000 (ncustomer)

Number of records of depositor: 5,000 (ndepositor)

Number of blocks of customer: 400 (bcustomer)

Number of blocks of depositor: 100 (bdepositor)

Estimate the cost

1. with depositor as outer relation No. of blocks access = ndepositor * bcustomer + bdepositor = 5000 * 400 + 100 = 2000100

### Sum (Nested loop join)

Assuming worst case memory availability and the following given statistics for the relations customer and depositor Number of records of customer: 10,000 (ncustomer)

Number of records of depositor: 5,000 (ndepositor)

Number of blocks of customer: 400 (bcustomer)

Number of blocks of depositor: 100 (bdepositor)

Estimate the cost

1. with customer as outer relation No. of blocks access = ncustomer * bdepositor + bcustomer = 10000 * 100 + 400 = 1000400

### Sum (Nested loop join)

Assuming best case memory availability and the following given statistics for the relations customer and depositor Number of records of customer: 10,000 (ncustomer)

Number of records of depositor: 5,000 (ndepositor)

Number of blocks of customer: 400 (bcustomer)

Number of blocks of depositor: 100 (bdepositor)

Estimate the cost

1. with customer as outer relation No. of blocks access = bdepositor + bcustomer = 100 + 400 = 500

### Join Operations

There are several different algorithms that can be used to implement joins Nested-Loop Join Block Nested-Loop Join Index Nested-Loop Join Sort-Merge Join Hash-Join

### Cost of computing for all joins

R is the outer and S is the inner relation of the join.

Number of records of R: (NR)

Number of records of S: (NS)

Number of blocks of R: (BR)

Number of blocks of S: (BS)

Join Worst Case Best Case

Nested-Loop Join BR + NR ∗ BS BR + BS Block Nested-Loop Join BR + BR ∗ BS BR + BS Index Nested-Loop Join BR + NR ∗ c Merge Join BR + BS Hash-Join 3 ∗ (BR + BS)

- c is the cost of a single selection on S using the join condition.

### Questions asked

1. Explain query processing steps. OR Discuss various steps of query processing with proper diagram.

2. Explain Heuristics in optimization.

3. Explain the purpose of sorting with example with reference to query optimization.

4. Explain the measures of finding out the cost of a query in query processing.
