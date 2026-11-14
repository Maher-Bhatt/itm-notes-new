> Everything here is taken from the COA Complete Study Guide: for each unit, what examiners ask, what to write, the common mistakes and quick self-checks, followed by the last-night revision sheet.

# Fundamentals: Architecture, Functional Units, Buses, Registers

### Part 0 — Check yourself

1. Which bus is unidirectional? What does its width decide?

2. Which arbitration method is fastest? Which is cheapest?

3. What does the PC hold? the IR?

4. A CPU has 20 address lines. Maximum memory?

Answers: 1) Address bus; maximum memory size. 2) Independent request; daisy chain. 3) Address of next instruction; the current instruction. 4) 2²⁰ = 1 M locations.

# Data Representation, Register Transfer and Micro-operations

### Part 1 — Check yourself

1. 2’s complement of 01101000? 2. Range of 8-bit 2’s complement? 3. Write RTL for “if T₁ is 1, copy PC into AR”. 4. 8 registers, 32 bits each — how many MUXes, of what size, how many select lines? 5. Arithmetic shift right of 10010100?

Answers: 1) 10011000. 2) −128 to +127. 3) T₁: AR ← PC. 4) 32 MUXes of 8×1, 3 select lines. 5) 11001010.

# Computer Arithmetic: Adders, Multiplication, Division, Floating Point

### Part 2 — Check yourself

1. Write Sum and Carry of a full adder. 2. What are Pᵢ and Gᵢ? 3. In Booth’s, what do you do for Q₀Q₋₁ = 10? 4. 9 + 5 in BCD? Answers: 1) A⊕B⊕C; AB + BC + AC. 2) Pᵢ = Aᵢ ⊕ Bᵢ, Gᵢ = AᵢBᵢ. 3) A ← A − M, then ASHR. 4) 1001 + 0101 = 1110 > 9 → + 0110 = 1 0100 → 14.

# Basic Computer Organization and Design (Mano’s Basic Computer)

### Part 3 — Check yourself

1. Why is AR 12 bits? 2. Write the fetch micro-operations. 3. M[300] = 1350, instruction “ADD I 300”. What is the effective address? 4. What does BSA store and where?

Answers: 1) Memory has 4096 = 2¹² words. 2) T₀: AR ← PC; T₁: IR ← M[AR], PC ← PC + 1; T₂: decode, AR ← IR(0–11), I ← IR(15). 3) 1350. 4) The return address (PC) into M[AR] — the first word of the subroutine.

# Programming the Basic Computer

### Part 4 — Check yourself

1. What does ORG 100 do? 2. Why does the assembler need two passes? 3. How does the loop counter work with ISZ? 4. How is a subroutine called and how does it return? Answers: 1) Places the next instruction at location 100. 2) Labels may be used before they’re defined. 3) Start at −N; ISZ adds 1; at 0 it skips the branch. 4) BSA saves the return address and jumps; BUN … I returns.

# Microprogrammed Control

### Part 5 — Check yourself

1. Define microinstruction and microprogram. 2. What does MAP do? 3. Why is horizontal faster? 4. A control memory of 256 words, 20 control signals, 8 flags — horizontal word length? Answers: 1) Control word in control memory; sequence of microinstructions. 2) Loads CAR with the start address of the routine for the opcode. 3) No decoding; many signals at once. 4) 20 + 3 + 8 = 31 bits.

# Central Processing Unit

### Part 6 — Check yourself

1. Control word for R5 ← R1 ∨ R2? 2. In a memory stack growing downward, what are PUSH micro-operations? 3. PC = 200, address field 500 (two-word instruction). EA in relative mode? 4. Three differences between RISC and CISC. Answers: 1) 001 010 101 01010. 2) SP ← SP − 1; M[SP] ← DR. 3) 702. 4) See table.

# Pipeline and Vector Processing

### Part 7 — Check yourself

1. k = 5, n = 20, t_p = 10 ns. Pipeline time? 2. Maximum speedup of a k-segment pipeline?

3. Name the three pipeline hazards. 4. Reservation table row with X at times 1, 3, 4 — forbidden latencies? Answers: 1) (5 + 19) × 10 = 240 ns. 2) k. 3) Resource, data, branch.

4) 2, 3, 1.

# Input-Output Organization

### Part 8 — Check yourself

1. Why can’t the strobe method confirm data receipt? 2. Difference between burst mode and cycle stealing? 3. In daisy chaining, who has the highest priority? 4. What three registers does a DMA controller have? Answers: 1) It uses only one line — no

acknowledgement. 2) Whole block vs one word at a time. 3) The device closest to the CPU. 4) Address, word count, control.

# Memory Organization

### Part 9 — Check yourself

1. Why does a memory hierarchy work? 2. Cache 0.95 hit ratio, 20 ns cache, 200 ns memory → average (using h·t_c + (1−h)·t_m)? 3. In direct mapping, what is the index used for? 4. What happens on a page fault? Answers: 1) Locality of reference. 2) 0.95×20 + 0.05×200 = 29 ns. 3) To select the cache location. 4) The OS loads the page from disk (replacing one if memory is full) and updates the page table.

# Last-Night Revision Sheet (COA)

Architecture = what (ISA, visible); organization = how (circuits).

Buses: data (bidirectional), address (unidirectional, width → 2ⁿ locations), control. Arbitration: daisy chain (position priority), polling, independent request (fastest).

Registers: PC (next instruction), IR (current), MAR, MDR, AC, PSW (S, Z, C, V).

2’s complement = flip + 1; range −2ⁿ⁻¹…2ⁿ⁻¹−1; overflow when carry-in ≠ carry-out of sign bit. IEEE 754: single 1 + 8 (bias 127) + 23; double 1 + 11 (bias 1023) + 52; hidden 1.

RTL: P: R2 ← R1 . Bus with MUX: n MUXes of k×1 for k registers of n bits.

Arithmetic circuit D = A + Y + Cin (Y = B, B′, 0, 1). Shifts: logical (0 enters), circular, arithmetic right (sign kept).

Full adder: S = A⊕B⊕C, Cout = AB + BC + AC. CLA: Gᵢ = AᵢBᵢ, Pᵢ = Aᵢ⊕Bᵢ, Cᵢ₊₁ = Gᵢ + PᵢCᵢ. Booth: 10 → A − M, 01 → A + M, then ASHR. Restoring division: shift, A − M, negative → Q₀ = 0 & restore.

Basic computer: 4096×16 memory; 12-bit address; I | opcode(3) | address(12). Fetch: T₀ AR ← PC; T₁ IR ← M[AR], PC ← PC+1; T₂ decode.

MRIs: AND, ADD, LDA, STA, BUN, BSA, ISZ. Interrupt cycle stores PC in M[0], jumps to 1. Assembler: two passes (symbol table, then translation). ORG, END, DEC, HEX.

Microinstruction: F1 F2 F3 CD BR AD (3,3,3,2,2,7). Horizontal (1 bit/signal, fast, long) vs vertical (encoded, short, slow). Hardwired fast/inflexible vs microprogrammed slow/flexible. Control word SELA SELB SELD OPR. Stack PUSH: SP ← SP+1, M[SP] ← DR (register stack). Addressing: immediate, register, register indirect, auto inc/dec, direct, indirect, relative (PC + A), indexed (XR + A), base.

RISC: few simple fixed-length instructions, load/store, hardwired, pipelined. CISC: many complex variable-length, microprogrammed.

Flynn: SISD, SIMD, MISD, MIMD. Pipeline time (k+n−1)t_p, speedup n·t_n / (k+n−1)t_p → k. Hazards: resource, data, branch.

Reservation table → forbidden latencies → collision vector → state diagram → MAL. I/O: strobe vs handshake; programmed, interrupt, DMA (burst / cycle stealing); daisy chain & parallel priority; IOP.

Memory: hierarchy & locality; RAM/ROM; associative memory (argument, key, match registers); cache mapping (associative, direct, set-associative); write-through vs write-back; virtual memory, page table, page fault, FIFO/LRU/OPT.
