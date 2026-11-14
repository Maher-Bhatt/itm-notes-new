> **Computer Architecture (C2310C2) · Mid-semester term examination · 3 October 2026 · 60 marks · 2 hours (10:10 am – 12:10 pm)**
> ITM SLS Baroda University · B.Tech (CSE/IT/AI/CSN) · Semester III · Academic year 2026–27.
> All ten parts of Q1 are compulsory; Q2: any three of four (3 marks each); Q3: any four of five (5 marks each); Q4: any three of four (7 marks each).
> Questions transcribed from the original paper. Solutions are written by CampusLoop; check them against your class notes.

# Q1. Answer all (1 mark each) [10]

**1.1 The Instruction Register primarily stores:** A) Address of the next instruction · B) Current instruction · C) Data being transferred · D) Result of an ALU operation
**Answer: (B) Current instruction.**

**1.2 Which register is generally used to hold the memory address currently being accessed?** A) AR · B) IR · C) PC · D) AC
**Answer: (A) AR** (address register, which drives the memory address lines).

**1.3 A memory-reference instruction generally contains:** A) Only opcode · B) Opcode and address field · C) Only address · D) Register and flag fields only
**Answer: (B).** (Plus the I bit for direct/indirect.)

**1.4 The program that translates assembly language into machine language is called:** A) Compiler · B) Interpreter · C) Assembler · D) Loader
**Answer: (C) Assembler.**

**1.5 Which of the following is an advantage of using a subroutine?** A) It always increases program size · B) It avoids code repetition · C) It removes the need for registers · D) It eliminates memory access
**Answer: (B).**

**1.6 The main function of address sequencing in a microprogrammed control unit is to:** A) Select the next microinstruction · B) Increase RAM capacity · C) Perform arithmetic operations · D) Store program data
**Answer: (A).**

**1.7 Which statement correctly describes RISC?** A) Large number of complex instructions · B) Simple instructions with emphasis on efficient execution · C) Every instruction must access memory · D) Instructions always have variable formats
**Answer: (B).**

**1.8 If an instruction has a 5-bit opcode, how many different opcode combinations are possible?** A) 16 · B) 25 · C) 32 · D) 64
**Answer: (C) 32** (2⁵).

**1.9 A stack initially contains 5 elements. After 3 PUSH and 2 POP operations, how many elements remain?** A) 4 · B) 5 · C) 6 · D) 7
**Answer: (C) 6** (5 + 3 − 2).

**1.10 An instruction contains a 4-bit opcode and a 12-bit address field. What is the total instruction length?** A) 8 bits · B) 12 bits · C) 16 bits · D) 20 bits
**Answer: (C) 16 bits.**

# Q2. Attempt any three (3 marks each) [9]

## 2(a) Compare hardwired control and microprogrammed control on any three characteristics.

| Characteristic | Hardwired control | Microprogrammed control |
|---|---|---|
| Implementation | logic gates, decoders, flip-flops, sequence counter | control memory holding microinstructions |
| Speed | **faster** (signals generated directly) | slower (control-memory read each step) |
| Flexibility | changing the design means rewiring | change the microprogram (memory contents) |
| Complexity of instruction set | suits small, simple sets (RISC) | suits large, complex sets (CISC) |
| Cost / design effort | complex to design for large sets | systematic, easier to design and debug |
| Example | basic computer control unit, most RISC CPUs | many CISC CPUs (e.g. classic x86) |

## 2(b) Distinguish between hardware and software interrupts.

| | Hardware interrupt | Software interrupt |
|---|---|---|
| Source | an **external device** signal on an interrupt line (keyboard, timer, disk, printer) | an **instruction in the program** (e.g. `INT 21h`, `SVC`/system call, trap) |
| Timing | **asynchronous**: can arrive at any time | **synchronous**: occurs exactly when the instruction executes |
| Purpose | tell the CPU an I/O device is ready or an event happened | request an OS service, or handle an exceptional condition |
| Maskable? | often maskable (IEN / interrupt flag); NMI cannot be masked | not masked by the interrupt-enable flag |
| Example | timer tick for multitasking; key press | program calls the OS to read a file |

In both cases the CPU finishes the current instruction, saves the return address (and status), jumps to the service routine, and returns afterwards. Hardware interrupts in the basic computer: [COA CET-1 2025, Q2(d)](/library/coa/paper-cet-1-2025-08-21#q2d-describe-the-interrupt-cycle-in-simple-terms).

## 2(c) Discuss zero-address and one-address instruction formats with examples.

- **One-address (accumulator organization):** the instruction names one memory operand; the other operand and the result are in the **accumulator**. `ADD X` means AC ← AC + M[X].
  X = (A + B) × C: `LOAD A ; ADD B ; MUL C ; STORE X`.
- **Zero-address (stack organization):** no address field for arithmetic; operands are taken from the **top of the stack** and the result is pushed back. Only PUSH/POP name memory. The expression is evaluated in postfix (A B + C ×):
  `PUSH A ; PUSH B ; ADD ; PUSH C ; MUL ; POP X`.

One-address instructions are short and simple but need many loads/stores; zero-address instructions are the shortest but programs are longer. More formats: [COA CET-2 2025, Q3.4](/library/coa/paper-cet-2-2025-10-07#q3-4-explain-different-instruction-formats-with-examples).

## 2(d) A 4-bit register contains 1011. Find the result after (a) logical left shift (b) logical right shift (c) arithmetic right shift.

| Operation | Rule | Result |
|---|---|---|
| (a) Logical shift left (shl) | shift bits left, 0 enters the LSB | **0110** (the MSB 1 is lost) |
| (b) Logical shift right (shr) | shift bits right, 0 enters the MSB | **0101** |
| (c) Arithmetic shift right (ashr) | shift right, **sign bit is copied** | **1101** (−5 → −3, i.e. ⌊−5/2⌋) |

# Q3. Attempt any four (5 marks each) [20]

## 3(a) Explain RTL and the organization of a common bus system with a diagram and RTL statements.

**Register Transfer Language (RTL)** describes the micro-operations of a digital system symbolically:
- `R2 ← R1`: copy R1 into R2 (in one clock, when the load of R2 is enabled).
- `P: R2 ← R1`: the transfer happens only if control function P = 1.
- `T2: R2 ← R1, R1 ← R2`: simultaneous transfers (exchange) in the same clock.
- `DR ← M[AR]`: memory read; `M[AR] ← R1`: memory write.

**Common bus:** instead of a separate path between every pair of registers, all registers share one set of lines. For k registers of n bits, **n multiplexers of k × 1** select which register drives the bus; select lines S₁S₀ (for 4 registers) choose the source, and the **load (LD)** input of the destination register picks the receiver. So `R2 ← R1` becomes: S₁S₀ = select(R1), LD(R2) = 1.

Diagram: registers A, B, C, D → bit i of each into MUX i → 4-line bus → inputs of all registers; select lines into every MUX; separate LD lines. Further detail: [COA CET-1 2025, Q4(d)](/library/coa/paper-cet-1-2025-08-21#q4d-design-a-common-bus-system-using-registers) and [COA end-sem 2025, Q3.1](/library/coa/paper-end-sem-2025-12-17#q3-1-define-rtl-and-explain-its-importance).

## 3(b) Design the common bus system of the basic computer with AC, DR and IR, and show how they transfer data.

The basic computer has a **16-bit common bus** shared by memory (4096 × 16) and registers **AR (12), PC (12), DR (16), AC (16), IR (16), TR (16)**, plus INPR/OUTR (8). Select lines **S₂S₁S₀** choose the source:

| S₂S₁S₀ | Source on bus |
|---|---|
| 000 | none |
| 001 | AR |
| 010 | PC |
| 011 | DR |
| 100 | AC |
| 101 | IR |
| 110 | TR |
| 111 | Memory (read) |

- Each register has **LD** (load), and AR, PC, DR, AC, TR also have **INR** (increment) and **CLR** (clear).
- **AC is not loaded from the bus directly**: its input comes from the **adder and logic circuit**, whose inputs are AC, DR and INPR. Its output goes onto the bus (code 100).
- **DR** receives memory words and supplies the second ALU operand.
- **IR** is loaded from the bus with the fetched instruction.
- Memory write takes its data from the bus and its address from AR.

Examples:
- Fetch `IR ← M[AR]`: S₂S₁S₀ = 111, memory read, LD(IR).
- `DR ← M[AR]`: S = 111, LD(DR); then `AC ← AC + DR`: ALU add, LD(AC) (no bus needed).
- `M[AR] ← AC` (STA): S = 100, memory write.

## 3(c) Describe the interrupt cycle of the basic computer and the need for interrupts.

**Need:** without interrupts the CPU must keep testing device flags (**programmed I/O / polling**), wasting time because devices are much slower than the CPU. With interrupts, the CPU runs other work and the device signals when it is ready; this enables efficient I/O, timers and multitasking.

**Sequence:**
1. At the end of each instruction (T3 of the execute phase, when no other operation), if **IEN = 1** and **FGI = 1 or FGO = 1**, set **R ← 1**.
2. On the next cycle, since R = 1, the CPU enters the interrupt cycle instead of fetch:
   - RT0: AR ← 0, TR ← PC
   - RT1: M[AR] ← TR, PC ← 0 (return address saved in location 0)
   - RT2: PC ← PC + 1, IEN ← 0, R ← 0, SC ← 0
3. Location 1 holds `BUN` to the **interrupt service routine**, which saves registers, services the device, restores registers, executes `ION` and returns with **`BUN 0 I`**.

Flowchart: R = 0 → fetch/decode/execute; if IEN and a flag are set, R ← 1; R = 1 → store return address in 0, jump to 1, clear IEN.

## 3(d) R1 = 10110111, R2 = 01111011. Find (a) R1 + R2 (b) R1 − R2 by 2's complement (c) R1 AND R2 (d) R1 XOR R2.

**(a) R1 + R2**
```
  1011 0111   (183)
+ 0111 1011   (123)
-----------
1 0011 0010
```
8-bit result **0011 0010**, carry out = 1 (unsigned overflow: 306 does not fit in 8 bits).

**(b) R1 − R2 = R1 + (2's complement of R2)**
2's complement of R2 = 1000 0100 + 1 = **1000 0101**.
```
  1011 0111
+ 1000 0101
-----------
1 0011 1100
```
Discard the end carry → **0011 1100** (= 60 = 183 − 123 ✓).

**(c) R1 AND R2** = 1011 0111 ∧ 0111 1011 = **0011 0011**

**(d) R1 XOR R2** = 1011 0111 ⊕ 0111 1011 = **1100 1100**

## 3(e) Illustrate the memory-reference instructions BSA, NBR, LDA, STA, BUN with examples.

(Assume AR holds the effective address after decoding.)
- **BSA (branch and save return address):** D5T4: M[AR] ← PC, AR ← AR + 1; D5T5: PC ← AR. Example: at address 20, `BSA 135` stores 21 in M[135] and continues at 136; the subroutine returns with `BUN 135 I`.
- **LDA (load to AC):** D2T4: DR ← M[AR]; D2T5: AC ← DR. Example: `LDA 500` with M[500] = 0025h → AC = 0025h.
- **STA (store AC):** D3T4: M[AR] ← AC. Example: `STA 501` copies AC into M[501].
- **BUN (branch unconditionally):** D4T4: PC ← AR. Example: `BUN 300` makes the next instruction come from 300.
- **"NBR"** is not one of the seven basic-computer memory-reference instructions (AND, ADD, LDA, STA, BUN, BSA, ISZ); it is probably a misprint. If your class used it for a conditional branch, describe it as: if the condition holds, PC ← AR; otherwise continue. The remaining standard one is **ISZ**: DR ← M[AR]; DR ← DR + 1; M[AR] ← DR, and if DR = 0 then PC ← PC + 1 (used as a loop counter).

# Q4. Attempt any three (7 marks each) [21]

## 4(a) R1 = 10101101, R2 = 01010111. Perform the operations and name the micro-operation type.

**(a) R3 ← R1 + R2** (arithmetic)
```
  1010 1101   (173)
+ 0101 0111   ( 87)
-----------
1 0000 0100
```
**R3 = 0000 0100**, carry out 1 (260 − 256 = 4). As signed numbers: −83 + 87 = +4, no overflow.

**(b) R4 ← R1 − R2 by 2's complement** (arithmetic)
2's complement of R2 = 1010 1000 + 1 = 1010 1001.
```
  1010 1101
+ 1010 1001
-----------
1 0101 0110
```
Discard the carry → **R4 = 0101 0110** (= 86 = 173 − 87 ✓). (Signed: −83 − 87 = −170 is out of range, so the signed result overflows.)

**(c) R5 ← R1 AND R2** (logic): 1010 1101 ∧ 0101 0111 = **0000 0101**

**(d) Logical left shift of R1 by 2** (shift): 1010 1101 → 0101 1010 → **1011 0100** (two 0s enter from the right; the leading 1 and 0 are lost).

**(e) Arithmetic right shift of R2 by 2** (shift): 0101 0111 → 0010 1011 → **0001 0101** (sign bit 0 is copied in; equals ⌊87/4⌋ = 21).

| Part | Result | Micro-operation type |
|---|---|---|
| R1 + R2 | 0000 0100 (carry 1) | arithmetic |
| R1 − R2 | 0101 0110 | arithmetic |
| R1 AND R2 | 0000 0101 | logic |
| shl R1 ×2 | 1011 0100 | shift (logical) |
| ashr R2 ×2 | 0001 0101 | shift (arithmetic) |

## 4(b) Compare register stack and memory stack; describe stack operations with algorithms, overflow and underflow.

| | Register stack | Memory stack |
|---|---|---|
| Organization | a small set of CPU registers (e.g. 64 words) with a 6-bit SP | a region of main memory addressed by SP |
| Speed | very fast (no memory access) | slower (memory read/write each push/pop) |
| Capacity | small, fixed | large, limited only by the allotted memory |
| Cost | expensive (extra registers on chip) | cheap |
| Implementation | SP wraps around; FULL and EMTY flip-flops | SP plus limit registers to detect bounds |

**Register stack (64 words):**
- **PUSH:** SP ← SP + 1; M[SP] ← DR; if SP = 0 then FULL ← 1; EMTY ← 0.
- **POP:** DR ← M[SP]; SP ← SP − 1; if SP = 0 then EMTY ← 1; FULL ← 0.
- **Overflow:** PUSH when FULL = 1. **Underflow:** POP when EMTY = 1.

**Memory stack (grows towards lower addresses, e.g. from 4000 down to 3000):**
- **PUSH:** SP ← SP − 1; M[SP] ← DR.
- **POP:** DR ← M[SP]; SP ← SP + 1.
- **Overflow:** SP goes below the lower limit (3000). **Underflow:** SP goes above the upper limit (4001) on a POP.

Uses: evaluating postfix expressions, subroutine return addresses, interrupts. Comparison in more detail: [COA end-sem 2025, Q2.4](/library/coa/paper-end-sem-2025-12-17#q2-4-stack-organization-in-a-cpu-register-stack-vs-memory-stack).

## 4(c) Common bus system using multiplexers; data transfer and selection signals.

Four 4-bit registers A, B, C, D share a 4-bit bus built from **four 4 × 1 multiplexers** (one per bit position):

| S₁ | S₀ | Register on bus |
|---|---|---|
| 0 | 0 | A |
| 0 | 1 | B |
| 1 | 0 | C |
| 1 | 1 | D |

- MUX 0 receives A₀, B₀, C₀, D₀; MUX 1 receives A₁…D₁; and so on. All MUXes share S₁S₀, so the same register is placed on every bus line.
- The bus outputs go back to the inputs of all registers; only the register whose **LD** is 1 is loaded at the clock edge.

Transfer examples:
- **C ← A:** S₁S₀ = 00, LD(C) = 1.
- **A ← D:** S₁S₀ = 11, LD(A) = 1.
- **B ← C, D ← C** at once: S₁S₀ = 10, LD(B) = LD(D) = 1 (one source, many destinations).

General rule: k registers × n bits → n multiplexers of size k × 1, with log₂k select lines. Diagram as in [COA CET-1 2025, Q4(d)](/library/coa/paper-cet-1-2025-08-21#q4d-design-a-common-bus-system-using-registers).

## 4(d) General register organization; control sequence for R3 ← R1 + R2.

**Structure:** seven registers **R1–R7** connected through two multiplexers to an ALU:
- **MUX A** (selected by **SELA**) puts one register (or external input) on **bus A**.
- **MUX B** (selected by **SELB**) puts one register on **bus B**.
- The **ALU** performs the operation chosen by **OPR** on A and B.
- The result goes to all registers; a **3 × 8 decoder** driven by **SELD** enables the load of the destination register.

**Control word (14 bits):** `| SELA (3) | SELB (3) | SELD (3) | OPR (5) |`

Register codes: 000 = input, 001 = R1, 010 = R2, 011 = R3, …, 111 = R7. OPR examples: 00000 TSFA, 00010 ADD, 00101 SUB, 01000 AND, 01010 OR, 01100 XOR.

**R3 ← R1 + R2:**
1. **SELA = 001** → R1 on bus A (source 1).
2. **SELB = 010** → R2 on bus B (source 2).
3. **OPR = 00010** → ALU performs A + B.
4. **SELD = 011** → result is loaded into R3 (destination) at the clock.

Control word: **001 010 011 00010**. All of this happens in one clock cycle.
