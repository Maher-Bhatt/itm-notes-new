> **Computer Architecture (C2310C2) · End-semester examination, Winter 2025 · 17 December 2025 · 100 marks · 10:10 am – 1:10 pm**
> ITM SLS Baroda University · B.Tech Semester III (Regular/Remedial). Question 1 is compulsory.
> Questions transcribed from the original paper. Solutions are written by CampusLoop; check them against your class notes.

# Q1. Multiple choice questions [20]

**1. The memory-accessing unit between the CPU and main memory is called:**
(a) Auxiliary Memory · (b) Virtual Memory · (c) Cache Memory · (d) Associative Memory

**Answer: (c) Cache memory.**

**2. Which micro-operation is used to clear a register?**
(a) Arithmetic · (b) Logic · (c) Shift · (d) Bus transfer

**Answer: (b) Logic micro-operation** (clear = AND with 0s / R ← 0).

**3. The control unit uses a sequence of microinstructions to perform:**
(a) Hardwired Control · (b) Instruction Pipelining · (c) Microprogrammed Control · (d) Data Transfer

**Answer: (c) Microprogrammed control.**

**4. The time required to complete the fetch and decode phases of an instruction is a part of the:**
(a) Memory Cycle · (b) Instruction Cycle · (c) Register Transfer · (d) Execution Cycle

**Answer: (b) Instruction cycle.**

**5. Which addressing mode computes the effective address by adding the address part of the instruction to the content of the Program Counter (PC)?**
(a) Register Indirect · (b) Relative Address · (c) Indexed · (d) Direct

**Answer: (b) Relative addressing** (EA = PC + address field).

**6. Booth's algorithm is used for:**
(a) Addition and Subtraction · (b) Division · (c) Multiplication · (d) Floating Point Operations

**Answer: (c) Multiplication** (of signed 2's-complement numbers).

**7. A major characteristic of RISC architecture is:**
(a) Complex instructions · (b) Many addressing modes · (c) Fixed-length instructions · (d) Large number of clock cycles per instruction

**Answer: (c) Fixed-length instructions.**

**8. Which mechanism bypasses the CPU for data transfer between I/O devices and main memory?**
(a) Program Control · (b) Priority Interrupt · (c) DMA · (d) Asynchronous Data Transfer

**Answer: (c) DMA (Direct Memory Access).**

**9. If a cache has a miss rate of 10% and the miss penalty is 50 clock cycles, what is the average memory access time (AMAT) if the hit time is 1 clock cycle?**
(a) 5.0 cycles · (b) 6.0 cycles · (c) 5.9 cycles · (d) 4.9 cycles

**Answer: (b) 6.0 cycles.** AMAT = hit time + miss rate × miss penalty = 1 + 0.10 × 50 = 6.

**10. Which of the following is an example of a Memory-Reference Instruction?**
(a) Increment Accumulator · (b) Store Accumulator · (c) Clear Register · (d) Shift Left

**Answer: (b) Store accumulator (STA).** The others are register-reference instructions.

**11. Flynn's taxonomy classifies computer architectures based on:**
(a) Type of memory · (b) Number of instruction streams and data streams · (c) Addressing modes · (d) Pipelining stages

**Answer: (b)** (SISD, SIMD, MISD, MIMD).

**12. The data structure used for implementing a Stack Organization in a CPU is typically a:**
(a) Queue · (b) Array · (c) Pointer-based structure · (d) Tree

**Answer: (b) Array** (registers or a memory region addressed by the stack pointer).

**13. Which unit is responsible for sequencing the microinstructions in a control memory?**
(a) ALU · (b) General Register Organization · (c) Address Sequencing · (d) Instruction Pipeline

**Answer: (c) Address sequencing** (the microprogram sequencer).

**14. The condition I = 0 in the instruction format of a Basic Computer typically indicates:**
(a) Direct addressing mode · (b) Indirect · (c) Immediate · (d) Relative

**Answer: (a) Direct addressing** (I = 1 means indirect).

**15. Virtual memory is a technique that uses:**
(a) Main memory only · (b) Cache only · (c) Main memory and auxiliary memory (hard disk) · (d) Only registers

**Answer: (c).**

**16. The mechanism that determines which device gains access to the CPU when multiple devices request an interrupt simultaneously is called:**
(a) DMA · (b) Asynchronous Data Transfer · (c) I/O Interface · (d) Priority Interrupt

**Answer: (d) Priority interrupt.**

**17. The primary goal of using an instruction pipeline is to:**
(a) Reduce the size of the computer · (b) Decrease the clock cycle time · (c) Increase the instruction throughput · (d) Simplify the instruction set

**Answer: (c) Increase instruction throughput.**

**18. In floating-point arithmetic, the initial step before addition/subtraction is:**
(a) Normalization of the result · (b) Rounding · (c) Alignment of exponents · (d) Converting to 2's complement

**Answer: (c) Alignment of exponents.**

**19. Which memory is accessed by content rather than by address?**
(a) Main · (b) Auxiliary · (c) Associative · (d) Virtual

**Answer: (c) Associative memory (CAM).**

**20. A microprogram example is used to demonstrate the design of the:**
(a) General Register Organization · (b) Data Transfer and Manipulation · (c) Control Unit · (d) Arithmetic logical shift unit

**Answer: (c) Control unit.**

# Q2. Answer any FOUR (out of six) [20]

## Q2.1 Design and draw the logic circuit of a full adder using basic logic gates.

A full adder adds three bits A, B and carry-in Cᵢₙ.

| A | B | Cᵢₙ | S | Cₒᵤₜ |
|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 | 1 |

**S = A ⊕ B ⊕ Cᵢₙ**, **Cₒᵤₜ = AB + Cᵢₙ(A ⊕ B)** (equivalently AB + BCᵢₙ + ACᵢₙ).
Circuit: two XOR gates in series give S; one AND for AB, one AND for Cᵢₙ·(A⊕B), and an OR gate combining them gives Cₒᵤₜ. (Equivalently: two half adders plus an OR gate.)

## Q2.2 Memory hierarchy and the three factors (speed, size, cost).

Levels from fastest to slowest: **registers → cache → main memory (RAM) → auxiliary memory (magnetic disk/SSD) → backup (tape, optical)**.
- **Speed:** the CPU needs data in a few nanoseconds; only small, expensive memories are that fast.
- **Size:** programs and data need gigabytes to terabytes; large memories are slow.
- **Cost per bit:** fast memory (SRAM) is costly; slow memory (disk) is cheap.

No single technology is fast, large and cheap at once, so a hierarchy combines them. **Locality of reference** (temporal and spatial) ensures most accesses hit the small fast levels, so the system runs close to cache speed at close to disk cost.

## Q2.3 Types of address sequencing in a microprogrammed control unit.

The control address register (CAR) gets its next address in one of four ways:
1. **Incrementing:** CAR ← CAR + 1 (next microinstruction in sequence).
2. **Conditional / unconditional branch:** load an address from the microinstruction, depending on status bits (e.g. if the sign bit is 1).
3. **Mapping:** map the opcode of the machine instruction to the starting address of its microroutine (e.g. `0 opcode 00`).
4. **Subroutine call and return:** save the return address in a subroutine register (SBR) and restore it later.

Draw the block diagram: control memory, CAR, incrementer, multiplexer selecting among increment/branch/mapping/SBR, status-bit test logic.

## Q2.4 Stack organization in a CPU; register stack vs memory stack.

A stack is LIFO storage accessed through a **stack pointer (SP)**. PUSH: `SP ← SP + 1, M[SP] ← DR`; POP: `DR ← M[SP], SP ← SP − 1`. Flags FULL and EMTY signal overflow/underflow. It is used for subroutine return addresses, interrupts and evaluating postfix (RPN) expressions with zero-address instructions.

| Register stack | Memory stack |
|---|---|
| A small set of fast CPU registers (e.g. 64 words) | A region of main memory |
| Very fast | Slower (memory access) |
| Fixed, small size | Large, limited by memory |
| SP is a 6-bit register for 64 words | SP holds a memory address, bounded by limit registers |

## Q2.5 Assembly program to compute the sum of an arithmetic series (hypothetical instruction set).

Sum of N terms with first term A and difference D, using a simple accumulator machine:
```
        LDA  ZERO      ; AC ← 0
        STA  SUM
        LDA  A
        STA  TERM      ; TERM ← first term
LOOP,   LDA  SUM
        ADD  TERM
        STA  SUM       ; SUM ← SUM + TERM
        LDA  TERM
        ADD  D
        STA  TERM      ; TERM ← TERM + D
        ISZ  COUNT     ; COUNT starts at −N; skip when it reaches 0
        BUN  LOOP
        HLT
A,      DEC 2
D,      DEC 3
COUNT,  DEC -5         ; N = 5 terms: 2, 5, 8, 11, 14 → SUM = 40
SUM,    DEC 0
TERM,   DEC 0
ZERO,   DEC 0
        END
```

## Q2.6 Design of a 4-bit arithmetic circuit (addition and subtraction).

Use a **4-bit parallel adder** whose B inputs pass through 4:1 multiplexers controlled by S₁S₀, with input carry Cᵢₙ:

| S₁ | S₀ | Y (adder input) | Cᵢₙ = 0 | Cᵢₙ = 1 |
|---|---|---|---|---|
| 0 | 0 | B | A + B (add) | A + B + 1 |
| 0 | 1 | B̄ | A + B̄ | **A − B** (subtract, 2's complement) |
| 1 | 0 | 0 | A (transfer) | A + 1 (increment) |
| 1 | 1 | 1s (−1) | A − 1 (decrement) | A (transfer) |

Block diagram: four MUXes feeding four full adders in a ripple chain; Cᵢₙ into the first adder; outputs D₀–D₃ and Cₒᵤₜ.

# Q3. Answer any FOUR (out of six) [20]

## Q3.1 Define RTL and explain its importance.

**Register Transfer Language** is a symbolic notation for describing micro-operations between registers, e.g. `R2 ← R1`, `P: R2 ← R1` (conditional on control function P), `AR ← PC`, `AC ← AC + DR`.
**Importance:** describes hardware behaviour precisely and concisely; bridges the instruction set and the circuit design; specifies the control functions the control unit must generate; standard way to document the data path.

## Q3.2 Instruction cycle with flowchart (fetch, decode, execute).

1. **Fetch:** `T0: AR ← PC`; `T1: IR ← M[AR], PC ← PC + 1`.
2. **Decode:** `T2: D0–D7 ← decode IR(12–14), AR ← IR(0–11), I ← IR(15)`.
3. **Fetch effective address (if indirect):** `T3: AR ← M[AR]` when I = 1.
4. **Execute:** carry out the operation (memory-reference, register-reference or I/O), then return to fetch.
Flowchart: Start → fetch → decode → D7? (register/I-O vs memory-reference) → I? (direct/indirect) → execute → check interrupt flag → back to fetch.

## Q3.3 Micro-operations vs macro-operations; four categories of micro-operations.

A **macro-operation** is a machine instruction (e.g. `ADD X`) that the programmer sees; it is carried out by a sequence of elementary **micro-operations** on registers in one clock pulse each.
1. **Register transfer:** `R1 ← R2`.
2. **Arithmetic:** `R3 ← R1 + R2`, `R1 ← R1 + 1`.
3. **Logic:** `R1 ← R1 ∧ R2`, `R1 ← R1 ⊕ R2`.
4. **Shift:** `R1 ← shl R1`, `R1 ← ashr R1`.

## Q3.4 Assembly program to find the factorial of N (hypothetical instruction set).

The basic computer has no multiply instruction, so multiply by repeated addition:
```
        LDA  N
        STA  I          ; I ← N
        LDA  ONE
        STA  FACT       ; FACT ← 1
OUTER,  LDA  I
        SZA             ; skip next if AC = 0
        BUN  BODY
        HLT             ; done: result in FACT
BODY,   LDA  FACT
        STA  MCAND      ; multiply FACT × I by adding FACT, I times
        CLA
        STA  PROD
        LDA  I
        CMA
        INC
        STA  CNT        ; CNT ← −I
MUL,    LDA  PROD
        ADD  MCAND
        STA  PROD
        ISZ  CNT
        BUN  MUL
        LDA  PROD
        STA  FACT       ; FACT ← FACT × I
        LDA  I
        ADD  MONE
        STA  I          ; I ← I − 1
        BUN  OUTER
N,      DEC 5
ONE,    DEC 1
MONE,   DEC -1
I,      DEC 0
FACT,   DEC 0
MCAND,  DEC 0
PROD,   DEC 0
CNT,    DEC 0
        END
```
(With a machine that has `MUL`, the loop is simply FACT ← FACT × I, I ← I − 1 until I = 0.)

## Q3.5 Characteristics of CISC vs RISC.

| CISC | RISC |
|---|---|
| Large number of complex instructions | Small set of simple instructions |
| Variable-length instructions | Fixed-length instructions |
| Many addressing modes | Few addressing modes |
| Memory operands in many instructions | Only LOAD/STORE access memory |
| Multi-cycle instructions | Mostly one instruction per cycle |
| Microprogrammed control | Hardwired control |
| Fewer registers | Many registers (register windows) |
| Shorter programs, complex hardware | Longer programs, simpler hardware, easy pipelining |
| e.g. Intel x86 | e.g. ARM, MIPS |

## Q3.6 Four program control instructions: branch, skip, call, return.

- **Branch (jump):** `PC ← address` (unconditional `BUN`, conditional on status bits).
- **Skip:** `PC ← PC + 1` if a condition holds (e.g. `SZA`, `ISZ`), skipping the next instruction.
- **Call subroutine:** save the return address (stack or memory, e.g. `BSA`: `M[AR] ← PC, PC ← AR + 1`), then jump.
- **Return:** restore PC from the stack/memory (`PC ← M[SP], SP ← SP − 1`, or `BUN` indirect).
Also compare/test instructions that set status flags (C, S, Z, V) used by conditional branches.

# Q4. Answer any FOUR (out of six) [20]

## Q4.1 Set-associative cache mapping, compared with direct and associative mapping.

In **k-way set-associative** mapping the cache is divided into sets of k lines; a block maps to exactly one set (set = block number mod number of sets) but may sit in any line of that set. The address is split into **tag | set | word**; the k tags of the set are compared in parallel.

| | Direct | Fully associative | Set-associative |
|---|---|---|---|
| Where a block can go | One fixed line | Any line | Any line in one set |
| Comparators | 1 | One per line (expensive) | k |
| Hit rate | Lowest (conflict misses) | Highest | Close to associative |
| Complexity / cost | Simplest | Most complex | Moderate |
| Replacement policy | Not needed | Needed (LRU, FIFO) | Needed within a set |

## Q4.2 Three modes of transfer: programmed I/O, interrupt-initiated I/O, DMA.

- **Programmed I/O:** the CPU repeatedly checks the device status flag (busy-wait), then moves each word itself. Simple but wastes CPU time.
- **Interrupt-initiated I/O:** the device interrupts the CPU when ready; the CPU saves its state, runs the service routine, transfers data, returns. No busy waiting.
- **DMA:** a DMA controller takes the buses (bus request/bus grant) and transfers a whole block directly between the device and memory; the CPU only sets it up and is interrupted at the end. Best for high-speed devices (disk).

## Q4.3 Pipelining and its impact on throughput; four-segment instruction pipeline.

Pipelining splits instruction processing into stages that work on different instructions at the same time, like an assembly line. Four segments: **FI** (fetch instruction), **DA** (decode and calculate address), **FO** (fetch operand), **EX** (execute).

| Clock → | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|
| I1 | FI | DA | FO | EX | | | |
| I2 | | FI | DA | FO | EX | | |
| I3 | | | FI | DA | FO | EX | |
| I4 | | | | FI | DA | FO | EX |

n tasks on a k-segment pipeline take **k + n − 1** cycles instead of n·k: speedup S = n·k / (k + n − 1) → k for large n. Throughput approaches one instruction per cycle; hazards (data, control, structural) reduce it.

## Q4.4 Computational circuit for a status register with Z, S, C, V.

From an 8-bit ALU output F₇…F₀ and carries C₇, C₈:
- **C (carry)** = C₈ (carry out of the MSB).
- **S (sign)** = F₇.
- **Z (zero)** = NOR of all output bits: Z = (F₇ + F₆ + … + F₀)′.
- **V (overflow)** = C₇ ⊕ C₈ (carry into the MSB XOR carry out).
Draw the ALU with these four signals feeding the 4-bit status register.

## Q4.5 Bus and memory transfers in RTL; common bus with tri-state buffers.

- **Bus transfer:** `BUS ← R1, R2 ← BUS` (written `R2 ← R1`); the bus select lines S₁S₀ choose which register drives the bus.
- **Memory transfer:** read `DR ← M[AR]`; write `M[AR] ← R1`.
- **Common bus with tri-state buffers:** each register's output goes through a tri-state buffer; a decoder driven by the select lines enables exactly one buffer at a time (the others are in the high-impedance state), so only one register drives the bus. With 4 registers of n bits: n groups of 4 buffers and a 2-to-4 decoder.

## Q4.6 Multiply (−9) × (+5) using Booth's algorithm, showing all steps.

Use 5-bit registers: **M = −9 = 10111**, −M = 01001, **Q = +5 = 00101**, A = 00000, Q₋₁ = 0. Rule on (Q₀, Q₋₁): 10 → A ← A − M; 01 → A ← A + M; 00/11 → nothing; then arithmetic shift right of A, Q, Q₋₁.

| Step | Operation | A | Q | Q₋₁ |
|---|---|---|---|---|
| 0 | Initial | 00000 | 00101 | 0 |
| 1 | Q₀Q₋₁ = 10: A ← A − M | 01001 | 00101 | 0 |
| 1 | ASHR | 00100 | 10010 | 1 |
| 2 | Q₀Q₋₁ = 01: A ← A + M | 11011 | 10010 | 1 |
| 2 | ASHR | 11101 | 11001 | 0 |
| 3 | Q₀Q₋₁ = 10: A ← A − M | 00110 | 11001 | 0 |
| 3 | ASHR | 00011 | 01100 | 1 |
| 4 | Q₀Q₋₁ = 01: A ← A + M | 11010 | 01100 | 1 |
| 4 | ASHR | 11101 | 00110 | 0 |
| 5 | Q₀Q₋₁ = 00: no operation; ASHR | 11110 | 10011 | 0 |

**Result A:Q = 11110 10011** = 2's complement of 0000101101 (45) → **−45** ✓.

# Q5. Answer any FOUR (out of six) [20]

## Q5.1 Structure and operation of a 9-bit associative memory (CAM). How is a word selected and compared?

Components: **argument register A** (holds the search key, 9 bits), **key register K** (mask: 1s mark which bits take part), the **m × 9 memory array**, and a **match register M** (one bit per word).
Each cell compares its bit with Aⱼ wherever Kⱼ = 1; word i matches when all unmasked bits agree: Mᵢ = ∏ⱼ (Aⱼ Fᵢⱼ + A′ⱼ F′ᵢⱼ + K′ⱼ). All words are compared **in parallel**; matching words set their Mᵢ bit, then a read outputs those words. Fast search by content, but costly hardware.

## Q5.2 Virtual memory; paging vs segmentation.

Virtual memory gives programs a large **logical address space** while only part of the program is in main memory; the rest stays on disk and is brought in on demand. A **page table** (with TLB) maps virtual to physical addresses; a missing page causes a **page fault** and replacement (FIFO, LRU).

| Paging | Segmentation |
|---|---|
| Fixed-size pages and frames | Variable-size logical segments (code, data, stack) |
| Invisible to the programmer | Visible: matches program structure |
| Internal fragmentation | External fragmentation |
| Address = page no. + offset | Address = segment no. + offset (checked against limit) |
| Page table | Segment table (base, limit) |

## Q5.3 Data hazards in an instruction pipeline and a mitigation technique.

A data hazard occurs when an instruction depends on the result of an earlier instruction still in the pipeline.
- **RAW (read after write, true dependency):** `ADD R1,R2,R3` then `SUB R4,R1,R5`; SUB reads R1 before ADD writes it. The most common.
- **WAR (write after read, anti-dependency):** a later instruction writes a register before an earlier one reads it (with out-of-order execution).
- **WAW (write after write, output dependency):** two writes to the same register complete in the wrong order.
**Mitigation:** **operand forwarding (bypassing)**: route the ALU result directly to the next instruction's input instead of waiting for write-back. Others: hardware interlocks (stall/bubble), delayed load, compiler reordering.

## Q5.4 Role and communication between the CPU and an Input-Output Processor (IOP).

An IOP is a processor with direct memory access that executes **I/O programs (commands)** independently, freeing the CPU.
Communication sequence: the CPU tests the IOP path (status) → sends an *start I/O* instruction with the address of the IOP program in memory → the IOP fetches and runs its commands, transferring data between devices and memory → when done, the IOP interrupts the CPU → the CPU checks the IOP status word. Draw: CPU and IOP both connected to the memory bus; the IOP connects to peripheral devices through the I/O bus.

## Q5.5 Steps of floating-point addition; add (0.5625 × 10³) + (0.75 × 10²).

Steps: (1) check for zeros; (2) **align the mantissas** (shift the smaller exponent's mantissa right until exponents are equal); (3) **add the mantissas**; (4) **normalise** the result (and check overflow/underflow); (5) round.

- Align: 0.75 × 10² = **0.075 × 10³**.
- Add: 0.5625 + 0.0750 = **0.6375**.
- Result: **0.6375 × 10³** (= 637.5). Already normalised (first digit after the point is non-zero).

## Q5.6 Design a 16-to-1 multiplexer using two 8-to-1 multiplexers and one 2-to-1 multiplexer.

Select lines S₃S₂S₁S₀. Inputs I₀–I₇ go to MUX-A and I₈–I₁₅ to MUX-B; **S₂S₁S₀** drive the select lines of both 8-to-1 MUXes. Their outputs feed a **2-to-1 MUX** whose select line is **S₃**: S₃ = 0 passes MUX-A (I₀–I₇), S₃ = 1 passes MUX-B (I₈–I₁₅). Output Y = Iₖ where k = (S₃S₂S₁S₀)₂.
