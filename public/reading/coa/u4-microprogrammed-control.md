### Unit-4 Microprogrammed Control

### 

**Looping**

**Outline**

**Control Memory**

**Address Sequencing**

**Microinstruction Code Format**

**Questions asked in exam**

### Control Memory

- Section - 1

### Microprogrammed Control Organization

- Next-address generator (Sequencer)
- Control address register
- Control memory
- (ROM)
- Control
- data
- register
- Next-address information
- Control
- word
- External
- input

### Control Memory

- A computer that employs a microprogrammed control unit will have two separate memories: a main memory and a control memory.
- The control memory holds a fixed microprogram that can not be altered by the occasional user.
- The microprogram consists of microinstructions that specify various internal control signals for execution of register microoperation.
- Microinstructions generates the microoperations to fetch instruction from main memory; to evaluate the effective address, to execute the operation specified by the instruction, and to return control to the fetch of next instruction.

### Address Sequencing

- Section - 2

### Address Sequencing (cont.)

- Microinstructions are stored in control memory in groups, with each group specifying a routine.
- The transformation from the instruction code bits to an address in control memory where the routine is located is referred to as a mapping process.
- The address sequencing capabilities required in a control memory are:
  - Incrementing of the control address register.
  - Unconditional branch or conditional branch, depending on status bit conditions.
  - A mapping process from the bits of the instruction to an address for control memory.
  - A facility for subroutine call and return.

### Address Sequencing (cont.)

- Instruction code
- Mapping
- logic
- Multiplexer
- Control address register
- (CAR)
- Control memory
- Branch
- logic
- Subroutine
- register
- (SBR)
- Incrementer
- Mux
- select
- Status
- bits
- Clock
- Select a status bit
- Branch address
- Microoperations

### Micro instruction Code Format

- Section - 3

### Microinstruction Code Format

- F1, F2, F3: Microoperation fields
- CD: Condition for branching
- BR: Branch field
- AD: Address field

**F1**

**F2**

**F3**

**CD**

**BR**

**AD**

### Symbols & Binary Code for Microinstruction Fields

| F1 | Microoperation | Symbol |
|---|---|---|
| 000 | None | NOP |
| 001 | AC AC + DR | ADD |
| 010 | AC 0 | CLRAC |
| 011 | AC AC + 1 | INCAC |
| 100 | AC DR | DRTAC |
| 101 | AR DR(0-10) | DRTAR |
| 110 | AR PC | PCTAR |
| 111 | M[AR] DR | WRITE |

| F2 | Microoperation | Symbol |
|---|---|---|
| 000 | None | NOP |
| 001 | AC AC - DR | SUB |
| 010 | AC AC DR | OR |
| 011 | AC AC DR | AND |
| 100 | DR M[AR] | READ |
| 101 | DR AC | ACTDR |
| 110 | DR DR + 1 | INCDR |
| 111 | DR(0-10) PC | PCTDR |

### Symbols & Binary Code for Microinstruction Fields (cont.)

| F3 | Microoperation | Symbol |
|---|---|---|
| 000 | None | NOP |
| 001 | AC AC + DR | XOR |
| 010 | AC AC’ | COM |
| 011 | AC shl AC | SHL |
| 100 | AC shr AC | SHR |
| 101 | PC PC + 1 | INCPC |
| 110 | PC AR | ARTPC |
| 111 | Reserved |  |

| CD | Symbol | Comments |
|---|---|---|
| 00 | U - 1 | Unconditional branch |
| 01 | I - DR(15) | Indirect address bit |
| 10 | S - AC(15) | Sign bit of AC |
| 11 | Z - AC = 0 | Zero value in AC |

| BR | Symbol | Function |
|---|---|---|
| 00 | JMP | CAR AD if condition = 1, CAR CAR+1 if condition = 0 |
| 01 | CALL | CAR AD, SBR CAR+1 if condition=1, CAR CAR+1 if condition=0 |
| 10 | RET | CAR SBR (Return from subroutine) |
| 11 | MAP | CAR(2-5) DR(11-14), CAR(0,1,6) 0 |
