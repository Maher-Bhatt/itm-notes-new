### Unit-6 Pipeline & Vector Processing

### 

**Looping**

**Outline**

**Flynn's taxonomy**

**Parallel Processing**

**Pipelining**

**Arithmetic Pipeline**

**Instruction Pipeline**

**RISC Pipeline**

**Vector Processing**

**Array Processors**

### Flynn's taxonomy

- Section - 1

### Flynn's taxonomy (cont.)

- Data Stream
- Instruction Stream

**SISD**

**SIMD**

- Single
- Multiple
- Single
- Multiple

**MISD**

**MIMD**

### Single Instruction Single Data & Single Instruction Multiple Data

- Single Instruction Single Data (SISD)
- SISD represents the organization of a single computer containing a control unit, a processor unit, and a memory unit.
- Instructions are executed sequentially and the system may or may not have internal parallel processing capabilities.
- Single Instruction Multiple Data (SIMD)
- SIMD represents an organization that includes many processing units under the supervision of a common control unit.
- All processors receive the same instruction from the control unit but operate on different items of data.

### Multiple Instruction Single Data & Multiple Instruction Multiple Data

- Multiple Instruction Single Data (MISD)
- There is no computer at present that can be classified as MISD.
- MISD structure is only of theoretical interest since no practical system has been constructed using this organization.
- Multiple Instruction Multiple Data (MIMD)
- MIMD organization refers to a computer system capable of processing several programs at the same time.
- Most multiprocessor and multicomputer systems can be classified in this category.
- Contains multiple processing units.
- Execution of multiple instructions on multiple data.

### Parallel Processing

- Section - 2

### Parallel Processing (cont.)

- Parallel processing is a term used to denote a large class of techniques that are used to provide simultaneous data-processing tasks for the purpose of increasing the computational speed of a computer system.
- Purpose of parallel processing is to speed up the computer processing capability and increase its throughput.
- Throughput:
- The amount of processing that can be accomplished during a given interval of time.

### Pipelining

- Section - 3

### Pipelining (cont.)

- Pipeline is a technique of decomposing a sequential process into sub operations, with each sub process being executed in a special dedicated segment that operates concurrently with all other segments.
- A pipeline can be visualized as a collection of processing segments through which binary information flows.
- Each segment performs partial processing dictated by the way the task is partitioned.
- The result obtained from the computation in each segment is transferred to the next segment in the pipeline.
- The registers provide isolation between each segment.
- The technique is efficient for those applications that need to repeat the same task many times with different sets of data.

### Pipelining example

- R1
- R2
- Multiplier
- R3
- R4
- Adder
- R5

### Pipelining

- General structure of four segment pipeline
- S1
- R1
- S2
- R2
- S3
- R3
- S4
- R4
- Clock
- Input

### Space-time Diagram

- Clock cycles
- Segment
- Segment

**Non Pipelined Architecture**

**Pipelined Architecture**

### Speedup

### Arithmetic Pipeline

- Section - 4

### Arithmetic Pipeline (cont.)

### Example of Arithmetic Pipeline

- Consider the two normalized floating-point numbers:
- X = 0.9504 x 103 Y = 0.8200 x 102
- Segment-1: The larger exponent is chosen as the exponent of result.
- Segment-2: Aligning the mantissa numbers
- X = 0.9504 x 103 Y = 0.0820 x 103
- Segment-3: Addition of the two mantissas produces the sum
- Z = 1.0324 x 103
- Segment-4: Normalize the result
- Z = 0.10324 x 104
- The sub-operations that are performed in the four segments are:
  - Compare the exponents
  - Align the mantissas
  - Add or subtract the mantissas
  - Normalize the result

### Slide 18

- R
- Compare exponents by subtraction
- R
- Choose exponent
- R
- Adjust exponent
- R
- Exponents
- a
- b
- R
- Align mantissas
- R
- Mantissas
- A
- B
- Difference
- Add or subtract mantissas
- R
- Normalize result
- R
- Segment 1:
- Segment 2:
- Segment 3:
- Segment 4:

### Instruction Pipeline

- Section - 5

### Instruction Pipeline (cont.)

- In the most general case, the computer needs to process each instruction with the following sequence of steps
  - Fetch the instruction from memory.
  - Decode the instruction.
  - Calculate the effective address.
  - Fetch the operands from memory.
  - Execute the instruction.
  - Store the result in the proper place.
- Different segments may take different times to operate on the incoming information.
- Some segments are skipped for certain operations.
- The design of an instruction pipeline will be most efficient if the instruction cycle is divided into segments of equal duration.

### Instruction Pipeline (cont.)

- Assume that the decoding of the instruction can be combined with the calculation of the effective address into one segment.
- Assume further that most of the instructions place the result into a processor registers so that the instruction execution and storing of the result can be combined into one segment.
- This reduces the instruction pipeline into four segments.
  - FI: Fetch an instruction from memory
  - DA: Decode the instruction and calculate the effective address of the operand
  - FO: Fetch the operand
  - EX: Execute the operation

### Four segment CPU pipeline

- Fetch instruction from memory
- Decode instruction & calculate effective address
- Branch?
- Fetch operand from memory
- Execute instruction
- Interrupt?
- Interrupt handling
- Update PC
- Empty pipe
- Segment1:
- Segment2:
- Segment3:
- Segment4:
- yes
- yes
- no
- no

### Space-time Diagram

| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FI | DA | FO | EX |  |  |  |  |  |  |  |  |  |
|  | FI | DA | FO | EX |  |  |  |  |  |  |  |  |
|  |  | FI | DA | FO | EX |  |  |  |  |  |  |  |
|  |  |  | FI | DA | FO | EX |  |  |  |  |  |  |
|  |  |  |  | FI | DA | FO | EX |  |  |  |  |  |
|  |  |  |  |  | FI | DA | FO | EX |  |  |  |  |
|  |  |  |  |  |  | FI | DA | FO | EX |  |  |  |

- Step:
- Instruction 1

### Space-time Diagram (cont.)

| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FI | DA | FO | EX |  |  |  |  |  |  |  |  |  |
|  | FI | DA | FO | EX |  |  |  |  |  |  |  |  |
|  |  | FI | DA | FO | EX |  |  |  |  |  |  |  |
|  |  |  | FI | - | - | FI | DA | FO | EX |  |  |  |
|  |  |  |  | - | - | - | FI | DA | FO | EX |  |  |
|  |  |  |  |  |  |  |  | FI | DA | FO | EX |  |
|  |  |  |  |  |  |  |  |  | FI | DA | FO | EX |

- (Branch)
- Step:
- Instruction 1

### Pipeline Conflict & Data Dependency

**Pipeline Conflict**

- There are three major difficulties that cause the instruction pipeline conflicts.
  - Resource conflicts caused by access to memory by two segments at the same time. Most of these conflicts can be resolved by using separate instruction and data memories.
  - Data dependency conflicts arise when an instruction depends on the result of a previous instruction, but this result is not yet available.
  - Branch difficulties arise from branch and other instructions that change the value of PC.

**Data Dependency**

- Data dependency occurs when an instruction needs data that are not yet available.
- Pipelined computers deal with such conflicts between data dependencies in a variety of ways as follows:
  - Hardware Interlocks
  - Operand forwarding
  - Delayed load

### Handling Branch Instructions

- The branch instruction breaks the normal sequence of the instruction stream, causing difficulties in the operation of the instruction pipeline.
- Hardware techniques available to minimize the performance degradation caused by instruction branching are as follows:
  - Pre-fetch target
  - Branch target buffer
  - Loop buffer
  - Branch prediction
  - Delayed branch

### RISC Pipeline

- Section - 6

### RISC Pipeline (Three segment instruction pipeline)

- Because of the fixed-length instruction format, the decoding of the operation can occur at the same time as the register selection.
- Since all the operands are in registers, there is no need for calculating an effective address or fetching of operands from memory.
- RISC has main two facilities:
  - Single-cycle instruction execution
  - Compiler support
- Mainly three types of instructions in RISC:
  - Data manipulation instructions
  - Data transfer instructions
  - Program control instructions
- The instruction cycle can be divided into three sub-operations and implemented in three segments:
  - I : Instruction fetch
  - A : ALU operation
  - E : Execute instruction

### Delayed Load

| 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|
| I | A | E |  |  |  |
|  | I | A | E |  |  |
|  |  | I | A | E |  |
|  |  |  | I | A | E |

- Clock cycles:
- Load R1
- Load R2
- Add R1+R2
- Store R3

**Pipeline timing with data conflict**

| 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|
| I | A | E |  |  |  |  |
|  | I | A | E |  |  |  |
|  |  | I | A | E |  |  |
|  |  |  | I | A | E |  |
|  |  |  |  | I | A | E |

- Clock cycles:
- Load R1
- Load R2
- Add R1+R2
- Store R3
- No-operation

**Pipeline timing with delayed load**

### Delayed Branch

| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|
| I | A | E |  |  |  |  |  |  |  |
|  | I | A | E |  |  |  |  |  |  |
|  |  | I | A | E |  |  |  |  |  |
|  |  |  | I | A | E |  |  |  |  |
|  |  |  |  | I | A | E |  |  |  |
|  |  |  |  |  | I | A | E |  |  |
|  |  |  |  |  |  | I | A | E |  |
|  |  |  |  |  |  |  | I | A | E |

- Clock cycle:
- Load R1
- Increment R2
- Add R3+R4
- Subtract R6-R5
- Branch to X
- No operation
- No operation
- Instruction in X
- Using no-operation instructions

### Delayed Branch (cont.)

| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|
| I | A | E |  |  |  |  |  |
|  | I | A | E |  |  |  |  |
|  |  | I | A | E |  |  |  |
|  |  |  | I | A | E |  |  |
|  |  |  |  | I | A | E |  |
|  |  |  |  |  | I | A | E |

- Clock cycle:
- Load R1
- Increment R2
- Add R3+R4
- Subtract R6-R5
- Branch to X
- Instruction in X
- Rearranging the instructions

### Vector Processing

- Section - 7

### Vector Processing (cont.)

- In many science and engineering applications, the problems can be formulated in terms of vectors and matrices that lend themselves to vector processing.
- Applications of Vector processing
  - Long-range weather forecasting
  - Petroleum explorations
  - Seismic data analysis
  - Medical diagnosis
  - Aerodynamics and space flight simulations
  - Artificial intelligence and expert systems
  - Mapping the human genome
  - Image processing
- Matrix Multiplication
- Matrix multiplication is one of the most computational intensive operations performed in computers with vector processors.

### Vector Processing (cont.)

- Source A
- Source B

|  |  |  |  |
|---|---|---|---|

|  |  |  |  |
|---|---|---|---|

- Multiplier Pipeline
- Adder Pipeline

### Memory Interleaving

- AR
- Memory array
- DR
- AR
- Memory array
- DR
- AR
- Memory array
- DR
- AR
- Memory array
- DR
- Address bus
- Data bus

### Array Processors

- Section - 8

### Array Processors (cont.)

- An array processor is a processor that performs computations on large arrays of data.
- Two different types of processors
  - Attached array processor: It is an auxiliary processor attached to a general-purpose computer.
  - SIMD array processor: It is a processor that has a single-instruction multiple-data organization.
- Attached array processor:
- General-purpose computer
- Main memory
- Attached array processor
- Local memory
- Input-output interface
- High-speed memory to memory bus

### SIMD Array Processor

- Master control unit
- Main memory
- PE1
- M1
- PE2
- M2
- PE3
- M3
- PEn
- Mn
