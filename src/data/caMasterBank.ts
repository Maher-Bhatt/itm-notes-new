/**
 * ITM University - Master Solved Question Bank: Computer Architecture (CA)
 * Subject Code: C2310C2 / CS401 · Semester 3
 * 
 * Modeled strictly after the 30-Page University Master Standard:
 * - Part A: 5 Predict-Register Value & RTL Execution Traces
 * - Part B: 15 5-Mark Hardware Implementations with Concept, RTL Logic, Output & Viva Traps
 * - Part C: 18 3-Mark Theory Answers with Comparative Matrices (3+ Rows) and Architectural Diagrams
 * - Part D: University Exam Blueprint, 6 Fatal Mistakes, 16-Row Quick Revision Matrix & 10 Quick MCQs
 */

import {
  PredictOutputItem,
  LongAnswerQuestion,
  TheoryQuestion,
  McqRevisionItem,
  QuickMcq,
} from './oopjQuestionBank';

// ─────────────────────────────────────────────────────────────────────────────
// PART A: PREDICT THE REGISTER VALUES & RTL EXECUTION TRACES (5 Questions)
// ─────────────────────────────────────────────────────────────────────────────
export const CA_PREDICT_OUTPUT: PredictOutputItem[] = [
  {
    id: 'ca-pred-1',
    programNumber: 1,
    title: 'Instruction Cycle RTL Timing Trace (Fetch, Decode & Memory Read)',
    code: `// Initial Hardware State:
// PC = 0x021, AR = 0x000, IR = 0x0000, AC = 0x0050, E = 0
// Memory Content:
// M[0x021] = 0x2035  (LDA 0x035 direct, Opcode 010, I = 0)
// M[0x035] = 0x0ABC

// RTL Execution Sequence:
// Clock T0: AR <- PC
// Clock T1: IR <- M[AR], PC <- PC + 1
// Clock T2: D0..D7 <- Decode IR(12-14), AR <- IR(0-11), I <- IR(15)
// Clock T3: Direct Addressing (I=0) -> Nothing (AR remains 0x035)
// Clock T4: DR <- M[AR]
// Clock T5: AC <- DR, SC <- 0`,
    output: `After Clock T1: AR = 0x021, IR = 0x2035, PC = 0x022
After Clock T2: Decoded Opcode D2 (LDA), AR = 0x035, I = 0
After Clock T4: DR = 0x0ABC
After Clock T5: AC = 0x0ABC, SC = 0, PC = 0x022`,
    steps: [
      { step: 1, action: "T0: PC (0x021) transfers onto the common bus and loads into AR (AR <- 0x021)." },
      { step: 2, action: "T1: Memory at M[0x021] placed on bus to IR (IR <- 0x2035), PC increments to 0x022." },
      { step: 3, action: "T2: 3-to-8 decoder asserts D2 (LDA opcode 010). Address bits IR(0-11) load into AR (AR <- 0x035). Mode bit IR(15)=0 so I <- 0." },
      { step: 4, action: "T3: Since I = 0, effective address is already in AR (no indirect memory read needed)." },
      { step: 5, action: "T4: Operand fetched from M[0x035] into Data Register (DR <- 0x0ABC)." },
      { step: 6, action: "T5: AC loaded with DR (AC <- 0x0ABC), Sequence Counter SC clears to 0 to conclude cycle." }
    ],
    rule: "The Basic Computer instruction cycle requires 2 clock cycles for Fetch (T0, T1), 1 clock cycle for Decode/Address check (T2, T3), and execution cycles (T4..T6) dependent on decoded instruction D.",
    concept: "Instruction Cycle Timing and Bus Microoperations",
    callStack: [
      { label: "Fetch Phase", detail: "T0: AR<-PC (0x021) | T1: IR<-M[0x021], PC<-0x022" },
      { label: "Decode Phase", detail: "T2: AR<-0x035, Opcode D2, I=0" },
      { label: "Execute Phase", detail: "T4: DR<-M[0x035] (0x0ABC) | T5: AC<-DR" }
    ]
  },
  {
    id: 'ca-pred-2',
    programNumber: 2,
    title: 'Subroutine Call (BSA) and Return (BUN) Address Pointer Trace',
    code: `// Initial Hardware State:
// PC = 0x015, Memory:
// M[0x015] = 0x5100  (BSA 0x100, Opcode 101, Subroutine at 0x100)
// M[0x100] = 0x0000  (Reserved return slot)
// M[0x101] = ...     (Subroutine body instructions)
// M[0x105] = 0x8100  (BUN 0x100 indirect, I=1, Opcode 100)

// RTL for BSA:
// T4: M[AR] <- PC, AR <- AR + 1
// T5: PC <- AR, SC <- 0

// RTL for BUN (Indirect):
// T3: AR <- M[AR]  (Dereference return address)
// T4: PC <- AR, SC <- 0`,
    output: `After BSA (Clock T5):
M[0x100] stores return address: 0x016
PC jumps to first instruction: 0x101
After Subroutine Return (Clock T4 of BUN):
AR loads dereferenced address M[0x100] = 0x016
PC resumes at main program: 0x016`,
    steps: [
      { step: 1, action: "BSA at 0x015 fetches instruction 0x5100. PC increments to 0x016 (return address)." },
      { step: 2, action: "Clock T4: AR contains 0x100. PC (0x016) is saved into memory at M[0x100]. AR increments to 0x101." },
      { step: 3, action: "Clock T5: PC is loaded with AR (PC <- 0x101). Subroutine execution begins at 0x101." },
      { step: 4, action: "At end of subroutine (0x105), instruction is BUN 0x100 Indirect (I=1, Opcode 100)." },
      { step: 5, action: "Clock T3: Memory at M[0x100] is read, loading AR with the saved return address 0x016." },
      { step: 6, action: "Clock T4: PC <- AR (0x016). Program execution resumes directly after the original BSA call." }
    ],
    rule: "In the Mano Basic Computer, the return address is stored in the FIRST word of the subroutine itself (M[Subroutine_Address]), and return is executed via indirect branch BUN to that address.",
    concept: "Subroutine Linkage via Self-Modifying Memory Slots",
    callStack: [
      { label: "Main Program", detail: "0x015: BSA 0x100 -> Return address 0x016 saved at M[0x100]" },
      { label: "Subroutine Body", detail: "0x101 to 0x104 executed sequentially" },
      { label: "Subroutine Exit", detail: "0x105: BUN 0x100 (Indirect) -> Resumes at 0x016" }
    ]
  },
  {
    id: 'ca-pred-3',
    programNumber: 3,
    title: "Booth's Signed 2's Complement Multiplication Trace: (+7) * (-3)",
    code: `// Multiplicand (M) = +7  = 00111 (5-bit)
// -M (2's complement)  = 11001
// Multiplier (Q)   = -3  = 11101 (5-bit)
// Initial Registers:
// A = 00000, Q = 11101, Q_-1 = 0, Count = 5

// Cycle Rule:
// Q_0 Q_-1 == 10 -> A <- A - M, then Arithmetic Shift Right (ashr A, Q, Q_-1)
// Q_0 Q_-1 == 01 -> A <- A + M, then Arithmetic Shift Right (ashr A, Q, Q_-1)
// Q_0 Q_-1 == 00 or 11 -> Only Arithmetic Shift Right`,
    output: `Cycle 1 (Q0 Q-1 = 10): A = A - M = 11001 -> ashr -> A=11100, Q=11110, Q-1=1
Cycle 2 (Q0 Q-1 = 01): A = A + M = 00011 -> ashr -> A=00001, Q=11111, Q-1=0
Cycle 3 (Q0 Q-1 = 10): A = A - M = 11010 -> ashr -> A=11101, Q=01111, Q-1=1
Cycle 4 (Q0 Q-1 = 11): No operation      -> ashr -> A=11110, Q=10111, Q-1=1
Cycle 5 (Q0 Q-1 = 11): No operation      -> ashr -> A=11111, Q=01011, Q-1=1

Final Product (A Q) = 11111 01011 (10-bit)
Decimal Verification: 2's complement of 11111 01011 = -(00000 10101) = -21`,
    steps: [
      { step: 1, action: "Initialization: A = 00000, Q = 11101, Q_-1 = 0, Count = 5, M = 00111, -M = 11001." },
      { step: 2, action: "Cycle 1: Q0=1, Q-1=0 (10) -> A = A + (-M) = 00000 + 11001 = 11001. ashr(A, Q, Q-1): A=11100, Q=11110, Q-1=1." },
      { step: 3, action: "Cycle 2: Q0=0, Q-1=1 (01) -> A = A + M = 11100 + 00111 = 00011. ashr: A=00001, Q=11111, Q-1=0." },
      { step: 4, action: "Cycle 3: Q0=1, Q-1=0 (10) -> A = A - M = 00001 + 11001 = 11010. ashr: A=11101, Q=01111, Q-1=1." },
      { step: 5, action: "Cycle 4: Q0=1, Q-1=1 (11) -> Only ashr: A=11110, Q=10111, Q-1=1." },
      { step: 6, action: "Cycle 5: Q0=1, Q-1=1 (11) -> Only ashr: A=11111, Q=01011, Q-1=1. Counter reaches 0." }
    ],
    rule: "Booth's algorithm preserves the sign bit during Arithmetic Shift Right (ashr: MSB of A duplicates itself into MSB of A, and old LSB of A shifts into MSB of Q). Result is 2's complement -21.",
    concept: "Booth's 2's Complement Multiplier",
    callStack: [
      { label: "Cycle 1", detail: "Op: A - M | Result: A=11100, Q=11110, Q-1=1" },
      { label: "Cycle 2", detail: "Op: A + M | Result: A=00001, Q=11111, Q-1=0" },
      { label: "Cycle 3", detail: "Op: A - M | Result: A=11101, Q=01111, Q-1=1" },
      { label: "Cycle 4 & 5", detail: "Op: ashr only | Final: 1111101011 (-21)" }
    ]
  },
  {
    id: 'ca-pred-4',
    programNumber: 4,
    title: 'Register-Reference Bitwise Instructions & Skip Logic (CLA, CMA, INC, SPA)',
    code: `// Initial State:
// AC = 0x000F  (binary 0000 0000 0000 1111), E = 0, PC = 0x100
// Instructions Executed in Order:
// 1. 0x7200 -> CMA  (Complement AC: AC <- ~AC)
// 2. 0x7020 -> INC  (Increment AC:  AC <- AC + 1)
// 3. 0x7010 -> SPA  (Skip if Positive: if (AC(15) == 0) PC <- PC + 1)
// 4. 0x7008 -> SNA  (Skip if Negative: if (AC(15) == 1) PC <- PC + 1)`,
    output: `After CMA : AC = 0xFFF0 (1111 1111 1111 0000), PC = 0x101
After INC : AC = 0xFFF1 (2's complement of 0x000F = -15), PC = 0x102
After SPA : AC(15) is 1 (Negative) -> Condition False! PC does NOT skip, PC = 0x103
After SNA : AC(15) is 1 (Negative) -> Condition True!  PC skips next: PC = 0x105`,
    steps: [
      { step: 1, action: "CMA (7200): Bitwise 1's complement: 0x000F becomes 0xFFF0. PC advances to 0x101." },
      { step: 2, action: "INC (7020): AC increments: 0xFFF0 + 1 = 0xFFF1 (representing -15 in 2's complement). PC advances to 0x102." },
      { step: 3, action: "SPA (7010): Checks if AC is positive (MSB AC(15) == 0). Since AC(15) is 1, condition fails. No skip occurs. PC advances normally to 0x103." },
      { step: 4, action: "SNA (7008): Checks if AC is negative (MSB AC(15) == 1). Condition is TRUE. PC increments twice (PC <- PC + 1 from fetch, then PC <- PC + 1 from skip = 0x105)." }
    ],
    rule: "CMA followed by INC computes the 2's complement negation (negative value) of AC. Register skip instructions (SPA, SNA, SZA, SZE) implement conditional branching in the Basic Computer.",
    concept: "Register-Reference Instructions and Conditional Skips",
    callStack: [
      { label: "Step 1: CMA", detail: "AC: 0x000F -> 0xFFF0" },
      { label: "Step 2: INC", detail: "AC: 0xFFF0 -> 0xFFF1 (-15 decimal)" },
      { label: "Step 3: SPA", detail: "MSB=1 (Negative) -> No skip, PC=0x103" },
      { label: "Step 4: SNA", detail: "MSB=1 (Negative) -> Skip taken! PC=0x105" }
    ]
  },
  {
    id: 'ca-pred-5',
    programNumber: 5,
    title: 'Direct-Mapped Cache Address Translation (Tag, Index, Word Offset)',
    code: `// Hardware Cache Specification:
// Main Memory Size = 64 KB = 2^16 bytes -> 16-bit physical address
// Cache Capacity   = 1 KB = 1024 bytes
// Cache Block Size = 16 bytes = 2^4 bytes

// Address Breakdown Calculations:
// 1. Word / Byte Offset = log2(Block Size) = log2(16) = 4 bits
// 2. Number of Cache Lines = Cache Capacity / Block Size = 1024 / 16 = 64 lines = 2^6
// 3. Cache Line Index = log2(64) = 6 bits
// 4. Tag Bits = Total Address (16) - Line Index (6) - Word Offset (4) = 6 bits

// Problem: Translate Memory Address 0x7E4A into Tag, Line Index, and Offset:
// Hex 0x7E4A in Binary: 0111 1110 0100 1010`,
    output: `Binary Address:  [0111 11]  [10 0100]  [1010]
Field Splits:     Tag (6b)   Index (6b)  Offset (4b)
Tag Value       : 011111 (Binary) = 31 (Decimal) = 0x1F
Line Index      : 100100 (Binary) = 36 (Decimal)
Word Offset     : 1010   (Binary) = 10 (Decimal)`,
    steps: [
      { step: 1, action: "Identify total address bits: 64 KB main memory requires log2(65536) = 16 bits." },
      { step: 2, action: "Calculate block offset: Block size is 16 bytes -> log2(16) = 4 bits (bits 0 to 3)." },
      { step: 3, action: "Calculate cache line count: 1024 bytes / 16 bytes per block = 64 lines -> log2(64) = 6 bits (bits 4 to 9)." },
      { step: 4, action: "Calculate tag bits: 16 - (6 + 4) = 6 bits (bits 10 to 15)." },
      { step: 5, action: "Parse 0x7E4A (0111 1110 0100 1010): Offset = bits 0-3 = 1010 (10), Index = bits 4-9 = 100100 (36), Tag = bits 10-15 = 011111 (31)." }
    ],
    rule: "In Direct-Mapped Cache, every memory block maps to exactly ONE specific cache line determined by: Line = (Block_Number) % (Total_Cache_Lines). Conflict misses occur when two distinct blocks hash to identical line indices.",
    concept: "Direct-Mapped Cache Address Decomposition",
    callStack: [
      { label: "Address Split", detail: "Bits [15:10] = Tag (6b) | Bits [9:4] = Index (6b) | Bits [3:0] = Offset (4b)" },
      { label: "Cache Mapping", detail: "Block maps directly to Line #36" },
      { label: "Hit Check", detail: "Compare Tag 31 with Tag stored in Cache Line #36" }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// PART B: 15 5-MARK HARDWARE & ARCHITECTURE QUESTIONS WITH RTL & DIAGRAMS
// ─────────────────────────────────────────────────────────────────────────────
export const CA_LONG_QUESTIONS: LongAnswerQuestion[] = [
  {
    id: 'ca-long-1',
    qNumber: 'Q1',
    title: 'Common Bus Architecture of the Basic Computer (16-Bit Bus, 7 Registers & 3-State Buffers)',
    marks: 5,
    category: 'classes',
    concept: 'A Common Bus System provides an efficient interconnection scheme connecting multiple registers and memory without requiring an explosive O(N^2) dedicated point-to-point wires. A 16-bit common bus uses a 3-to-8 multiplexer / 3-state bus buffers to select 1 transmitting unit at a time.',
    requirements: [
      'List all 7 registers with bit-widths (AR, PC, DR, AC, IR, TR, INPR, OUTR)',
      'Explain 3-to-8 line multiplexer selection table (S2, S1, S0)',
      'Describe memory read/write interfacing with common bus',
      'Explain control inputs: Load (LD), Increment (INR), and Clear (CLR)'
    ],
    code: `// Basic Computer Register Organization:
// Register  Bits  Description
// AR        12    Address Register (holds memory address)
// PC        12    Program Counter (holds address of next instruction)
// DR        16    Data Register (holds memory operand read)
// AC        16    Accumulator (processor register for computations)
// IR        16    Instruction Register (holds fetched opcode and address)
// TR        16    Temporary Register (scratchpad storage)
// INPR      8     Input Register (receives 8-bit character from keyboard)
// OUTR      8     Output Register (sends 8-bit character to display)

// Common Bus Selection Table:
// S2  S1  S0  Selected Source onto Common Bus
// 0   0   0   None (High Impedance)
// 0   0   1   AR  (Address Register)
// 0   1   0   PC  (Program Counter)
// 0   1   1   DR  (Data Register)
// 1   0   0   AC  (Accumulator)
// 1   0   1   IR  (Instruction Register)
// 1   1   0   TR  (Temporary Register)
// 1   1   1   Memory Unit (M[AR] with Read=1)`,
    output: `Bus Width: 16 bits
Multiplexer Inputs: 7 Register outputs + 1 Memory Read = 8 sources
Register Loading: Bus lines connect to all register inputs simultaneously;
Only register with active LD control signal latches the 16-bit bus word.`,
    explanationPoints: [
      'Multiplexer Selection: S2 S1 S0 determines which register places its content onto the 16-bit bus lines.',
      'Destination Control: The bus is connected to the inputs of all registers. When S2 S1 S0 = 010 (PC), activating LD of AR transfers PC -> AR.',
      'Memory Transfer: When S2 S1 S0 = 111 and Read signal is pulsed, M[AR] is placed on the bus.',
      'Dedicated AC Adder/Logic Unit: AC does not receive data directly from the bus; it receives data from the ALU (Adder & Logic circuit), which takes inputs from AC, DR, and INPR.'
    ],
    traceTable: {
      headers: ['Microoperation', 'S2 S1 S0 (Source)', 'Active LD (Dest)', 'Active Memory Signal'],
      rows: [
        ['AR <- PC', '0 1 0 (PC)', 'LD(AR)', 'None'],
        ['IR <- M[AR]', '1 1 1 (Memory)', 'LD(IR)', 'Read = 1'],
        ['M[AR] <- TR', '1 1 0 (TR)', 'None', 'Write = 1'],
        ['DR <- AC', '1 0 0 (AC)', 'LD(DR)', 'None']
      ]
    },
    examNote: 'Always mention in exams why AR and PC are 12 bits while the bus is 16 bits: Memory size is 4096 words (4K), requiring 2^12 = 12 address bits. When AR or PC outputs to the bus, 4 leading zeros (0000) are automatically padded on the bus lines.',
    vivaTrap: 'Viva Trap: "Can two registers output to the common bus at the exact same clock pulse?" Answer: Absolutely NOT! This would cause electrical contention (short circuit). The 3-to-8 decoder guarantees strictly mutually exclusive one-hot selection.'
  },
  {
    id: 'ca-long-2',
    qNumber: 'Q2',
    title: 'Complete Instruction Cycle Flowchart (Fetch, Decode, Effective Address & Execution)',
    marks: 5,
    category: 'classes',
    concept: 'The instruction cycle is the master state machine governing computer processing. It repeatedly cycles through 4 phases: (1) Fetch instruction from memory, (2) Decode instruction and read indirect address if needed, (3) Execute instruction microoperations, and (4) Check for interrupt requests.',
    requirements: [
      'Draw timing sequence T0..T6 flowchart',
      'Detail T0 (AR <- PC) and T1 (IR <- M[AR], PC <- PC + 1)',
      'Detail T2 (Decode D0..D7, AR <- IR(0-11), I <- IR(15))',
      'Detail T3 indirect address dereference (AR <- M[AR])',
      'Show Sequence Counter SC <- 0 clearing at end of execution'
    ],
    code: `// Mano Machine Instruction Cycle RTL:
//
// PHASE 1: FETCH
// T0: AR <- PC
// T1: IR <- M[AR], PC <- PC + 1
//
// PHASE 2: DECODE
// T2: D0..D7 <- Decode IR(12-14), AR <- IR(0-11), I <- IR(15)
//
// PHASE 3: EFFECTIVE ADDRESS EVALUATION
// T3: 
//   - If D7' I: AR <- M[AR]  (Memory Reference, Indirect Addressing)
//   - If D7' I': Nothing      (Memory Reference, Direct Addressing)
//   - If D7 I': Execute Register-Reference Instruction (SC <- 0)
//   - If D7 I:  Execute Input-Output Instruction (SC <- 0)
//
// PHASE 4: EXECUTE (Memory-Reference Instructions D0..D6)
// T4..T6: Specific microoperations for AND, ADD, LDA, STA, BUN, BSA, ISZ
// Concludes with SC <- 0`,
    output: `Fetch Phase: Exactly 2 Clock Pulses (T0, T1)
Decode Phase: Exactly 1 Clock Pulse (T2)
Indirect Resolution: Exactly 1 Clock Pulse (T3)
Execution: 1 to 3 Clock Pulses (T4..T6)
Total Execution Time: 4 to 8 Clock Cycles per instruction`,
    explanationPoints: [
      'Sequence Counter (SC): Driven by clock and cleared to 0 by SC <- 0 upon completing execution.',
      'D7 Flag: If D7=0, opcode is 000..110 (Memory-Reference). If D7=1, opcode is 111 (Register or I/O).',
      'I Bit: Determines Direct (I=0) vs Indirect (I=1) memory addressing mode.',
      'Incrementing PC at T1: Done concurrently with instruction fetch, preparing PC for next sequential instruction.'
    ],
    examNote: 'In exams, draw the standard Mano decision diamond at T3: test D7=0 vs D7=1, and within each branch test I=0 vs I=1.',
    vivaTrap: 'Viva Trap: "Why can the instruction register IR not be directly loaded with operand data during execution?" Answer: IR must hold the opcode bits for the entire instruction cycle to keep the decoders and control logic active. Operands are routed through Data Register (DR).'
  },
  {
    id: 'ca-long-3',
    qNumber: 'Q3',
    title: 'Hardwired Control Unit vs Microprogrammed Control Unit Design',
    marks: 5,
    category: 'classes',
    concept: 'The Control Unit coordinates all hardware microoperations. Hardwired control implements logic using fixed gates, flip-flops, and decoders for maximum speed. Microprogrammed control stores control words (microinstructions) in a Read-Only Control Memory (ROM) for design flexibility.',
    requirements: [
      'Block diagram of Hardwired Control (Instruction register, 3-to-8 decoder, 4-bit sequence counter, control logic gates)',
      'Block diagram of Microprogrammed Control (Control Address Register, Control Memory ROM, Microinstruction Next-Address Logic)',
      'Comparative table of Speed, Flexibility, Cost, and Modification',
      'Explain Control Word field format'
    ],
    code: `// Microprogrammed Control Word Bit Fields:
// -------------------------------------------------------------
// | F1 (3 bits) | F2 (3 bits) | F3 (3 bits) | CD (2 bits) | BR (2 bits) | AD (7 bits) |
// -------------------------------------------------------------
// F1, F2, F3 : Microoperation fields (ALU operations, Bus transfers)
// CD         : Condition for branching (00: Always 1, 01: Zero flag, 10: Sign flag, 11: Carry)
// BR         : Branch field (JMP, CALL, RET, MAP)
// AD         : Address field (Next microinstruction address in Control ROM)`,
    output: `Hardwired: Pure combinational silicon logic gates -> Nanosecond speed, zero firmware
Microprogrammed: Microprogram stored in ROM -> Emulation flexibility, slower clock rate`,
    explanationPoints: [
      'Hardwired Speed: Signals propagate through gate delays in silicon; no memory access cycle overhead.',
      'Microprogrammed Flexibility: Modifying or adding new machine instructions requires editing ROM microcode rather than resynthesizing hardware chip layouts.',
      'Control Sequencer: In microprogrammed control, the Control Address Register (CAR) acts like a micro-program counter, stepping through micro-routines.',
      'Modern Hybrid: High-performance CISC chips (e.g. Intel x86) hardwire common instructions and microcode rare/complex instructions.'
    ],
    traceTable: {
      headers: ['Feature', 'Hardwired Control', 'Microprogrammed Control'],
      rows: [
        ['Execution Speed', 'Extremely Fast (combinational logic)', 'Slower (bounded by ROM access time)'],
        ['Flexibility', 'Rigid (requires chip redesign)', 'Highly flexible (reprogram microcode ROM)'],
        ['Instruction Set Style', 'Ideal for RISC (simple, uniform format)', 'Ideal for CISC (complex instructions)'],
        ['Chip Area Overhead', 'Large for complex instruction sets', 'Compact and regular silicon floorplan'],
        ['Design Complexity', 'Difficult to debug and verify', 'Systematic, structured microprogramming']
      ]
    },
    examNote: 'Remember to draw both block diagrams: Hardwired has 4-bit Sequence Counter + Decoders + Combinational Logic. Microprogrammed has CAR + Control Memory ROM + Next Address Sequencer.',
    vivaTrap: 'Viva Trap: "Why do modern RISC processors use Hardwired control exclusively?" Answer: RISC instructions are simple and single-cycle. A ROM lookup would add an unnecessary memory latency penalty, whereas hardwired logic can execute the instruction in a single clock cycle.'
  },
  {
    id: 'ca-long-4',
    qNumber: 'Q4',
    title: "Booth's Signed 2's Complement Multiplication Algorithm & Flowchart",
    marks: 5,
    category: 'classes',
    concept: "Booth's algorithm multiplies two signed binary numbers in 2's complement representation. It accelerates multiplication by skipping across continuous runs of 1s (evaluating 2^k + 2^(k-1) + ... + 2^m as 2^(k+1) - 2^m), treating strings of 0s and 1s efficiently.",
    requirements: [
      'Registers used: A (Accumulator initialized to 0), Q (Multiplier), Q_-1 (Flip-flop initialized to 0), M (Multiplicand)',
      'Decision logic on Q_0 Q_-1 bits: 10 -> A = A - M; 01 -> A = A + M; 00 or 11 -> No operation',
      'Arithmetic Shift Right (ashr A, Q, Q_-1) preserving sign bit',
      'Complete flowchart and step table trace'
    ],
    code: `#include <stdio.h>

void boothsMultiply(int multiplicand, int multiplier) {
    int A = 0;
    int Q = multiplier & 0x1F;      // 5-bit multiplier
    int M = multiplicand & 0x1F;    // 5-bit multiplicand
    int Q_minus_1 = 0;
    int count = 5;

    printf("Count |   A   |   Q   | Q-1 | Action\\n");
    printf("-------------------------------------------\\n");

    while (count > 0) {
        int Q0 = Q & 1;
        if (Q0 == 1 && Q_minus_1 == 0) {
            A = (A - M) & 0x1F; // A = A - M
            printf("  %d   | %05b | %05b |  %d  | A <- A - M\\n", count, A, Q, Q_minus_1);
        } else if (Q0 == 0 && Q_minus_1 == 1) {
            A = (A + M) & 0x1F; // A = A + M
            printf("  %d   | %05b | %05b |  %d  | A <- A + M\\n", count, A, Q, Q_minus_1);
        }

        // Arithmetic Shift Right (ashr)
        int signA = (A & 0x10);
        Q_minus_1 = Q & 1;
        Q = ((Q >> 1) | ((A & 1) << 4)) & 0x1F;
        A = ((A >> 1) | signA) & 0x1F;

        printf(" Shift| %05b | %05b |  %d  | ashr (Count=%d)\\n", A, Q, Q_minus_1, count - 1);
        count--;
    }
}

int main() {
    printf("Booth Multiplication: (+7) * (-3)\\n");
    boothsMultiply(7, -3);
    return 0;
}`,
    output: `Booth Multiplication: (+7) * (-3)
Count |   A   |   Q   | Q-1 | Action
-------------------------------------------
  5   | 11001 | 11101 |  0  | A <- A - M (A = 00000 + 11001 = 11001)
 Shift| 11100 | 11110 |  1  | ashr (Count=4)
  4   | 00011 | 11110 |  1  | A <- A + M (A = 11100 + 00111 = 00011)
 Shift| 00001 | 11111 |  0  | ashr (Count=3)
  3   | 11010 | 11111 |  0  | A <- A - M (A = 00001 + 11001 = 11010)
 Shift| 11101 | 01111 |  1  | ashr (Count=2)
 Shift| 11110 | 10111 |  1  | ashr (Count=1)
 Shift| 11111 | 01011 |  1  | ashr (Count=0)
Final Result in (A Q) = 11111 01011 = -21 Decimal`,
    explanationPoints: [
      'Bit Pairing Analysis: Q_0 Q_-1 indicates whether a block of 1s is starting (10: subtract M), ending (01: add M), or continuing (11 or 00: do nothing).',
      'Arithmetic Shift Right: Preserves sign bit of A (MSB does not change; copies itself into next bit).',
      'Double Word Result: Output spans both A and Q registers (product bit length = 2 * n).',
      'No Sign Conversion Required: Works directly on positive, negative, or mixed signed numbers without separate sign-magnitude pre-processing.'
    ],
    examNote: 'Always state in exams that standard binary shift-and-add multiplication fails for negative 2s complement multipliers without sign-extension to 2n bits. Booths algorithm natively solves this.',
    vivaTrap: 'Viva Trap: "What is the worst-case pattern for Booths algorithm?" Answer: An alternating sequence of 0s and 1s (e.g., 01010101). Here, every single cycle requires both an addition/subtraction AND a shift, eliminating any skipping advantage.'
  },
  {
    id: 'ca-long-5',
    qNumber: 'Q5',
    title: '4-Stage Instruction Pipeline (FI, DA, FO, EX) with Space-Time Diagram & Hazards',
    marks: 5,
    category: 'classes',
    concept: 'Pipelining is an implementation technique where multiple instructions are overlapped in execution. A 4-stage pipeline partitions instruction processing into: Fetch Instruction (FI), Decode & Address (DA), Fetch Operand (FO), and Execute (EX).',
    requirements: [
      'Draw Space-Time diagram showing 6 instructions across 9 clock cycles',
      'Derive Speedup formula: S = (n * k) / (k + n - 1)',
      'Explain Structural Hazards (Resource contention)',
      'Explain Data Hazards (RAW dependencies)',
      'Explain Control Hazards (Branch penalties & branch prediction)'
    ],
    code: `// Space-Time Diagram for 4-Stage Pipeline (k = 4 stages, n = 6 instructions):
// Clock Cycles:   1   2   3   4   5   6   7   8   9
// Inst 1:        FI  DA  FO  EX
// Inst 2:            FI  DA  FO  EX
// Inst 3:                FI  DA  FO  EX
// Inst 4:                    FI  DA  FO  EX
// Inst 5:                        FI  DA  FO  EX
// Inst 6:                            FI  DA  FO  EX

// Theoretical Speedup Calculation:
// Non-pipelined time for n instructions = n * k * clock_cycle
// Pipelined time for n instructions     = (k + n - 1) * clock_cycle
// Speedup S = (n * k) / (k + n - 1)
// As n -> infinity, Speedup S -> k (Ideal speedup equals stage count!)`,
    output: `Number of Stages (k): 4
Number of Instructions (n): 6
Clock Cycles Required: k + n - 1 = 4 + 6 - 1 = 9 clock cycles
Non-pipelined Cycles: n * k = 6 * 4 = 24 clock cycles
Speedup Factor: 24 / 9 = 2.67x (Approaches 4x as n increases)`,
    explanationPoints: [
      'Throughput: Once the pipeline is full (after k - 1 cycles), one instruction completes every single clock cycle.',
      'Structural Hazard: When two stages require the identical hardware resource simultaneously (e.g., FI fetching instruction from memory while FO fetches data operand from the same single-port memory). Fix: Separate Harvard L1 caches (I-Cache and D-Cache).',
      'Data Hazard (RAW): When an instruction depends on the result of a previous instruction still in the pipeline. Fix: Operand forwarding / bypassing and compiler bubble insertion.',
      'Control Hazard: Conditional branch instructions alter PC, invalidating instructions already fetched behind it. Fix: Branch prediction, branch target buffers (BTB), and delayed branching.'
    ],
    examNote: 'Write down the three Data Hazard categories in exams: Read-After-Write (RAW - true dependence), Write-After-Read (WAR - anti-dependence), and Write-After-Write (WAW - output dependence).',
    vivaTrap: 'Viva Trap: "Why can real-world pipelines never achieve the theoretical maximum speedup k?" Answer: Due to pipeline hazards (structural, data, and branch stalls), pipeline register latch delays, and clock skew between unbalanced stage execution times.'
  },
  {
    id: 'ca-long-6',
    qNumber: 'Q6',
    title: 'Cache Memory Mapping Architectures: Direct, Fully Associative & Set-Associative',
    marks: 5,
    category: 'classes',
    concept: 'Cache memory bridges the speed mismatch between ultra-fast CPUs and slow DRAM. Cache mapping policies determine how main memory blocks are positioned and located within cache lines.',
    requirements: [
      'Direct Mapping: Line = (Block) % (Cache_Lines). Pros & Cons (Conflict misses)',
      'Fully Associative: Block can occupy any arbitrary line. Requires associative Content Addressable Memory (CAM)',
      'K-Way Set Associative: Block maps to set = (Block) % (Total_Sets), can occupy any of K lines in that set',
      'Numerical comparison of Tag, Set, and Word Offset bit fields'
    ],
    code: `// Problem Specification:
// Main Memory = 4 GB = 2^32 bytes -> 32-bit physical address
// Cache Size  = 512 KB = 2^19 bytes
// Block Size  = 64 bytes = 2^6 bytes -> Offset = 6 bits
// Number of Cache Lines = 512 KB / 64 B = 8192 lines = 2^13 lines

// 1. DIRECT MAPPING:
// Offset = 6 bits
// Index  = log2(8192) = 13 bits
// Tag    = 32 - 13 - 6 = 13 bits

// 2. 4-WAY SET ASSOCIATIVE:
// Sets   = 8192 lines / 4 lines per set = 2048 sets = 2^11 sets
// Offset = 6 bits
// Set    = log2(2048) = 11 bits
// Tag    = 32 - 11 - 6 = 15 bits

// 3. FULLY ASSOCIATIVE:
// Offset = 6 bits
// Index  = 0 bits (no fixed line index)
// Tag    = 32 - 6 = 26 bits`,
    output: `Direct Mapped:      [ Tag: 13b ] [ Index: 13b ] [ Offset: 6b ] -> 1 Comparator
4-Way Set Assoc:    [ Tag: 15b ] [ Set:   11b ] [ Offset: 6b ] -> 4 Comparators in parallel
Fully Associative:  [ Tag: 26b ] [ Offset: 6b ]                -> 8192 Comparators in parallel`,
    explanationPoints: [
      'Direct Mapping: Simplest hardware; only 1 tag comparator required. High conflict misses (thrashing when two memory blocks compete for the same line index).',
      'Fully Associative: Zero conflict misses; any block can go anywhere. Extremely expensive because it requires comparing tags against all 8192 lines simultaneously using associative hardware.',
      'Set Associative: Industry sweet-spot (compromise). An N-way set associative cache searches only N lines in parallel, drastically reducing conflict misses at reasonable hardware cost.',
      'Replacement Algorithms: Direct mapping requires NO replacement logic (new block evicts the occupant). Set-associative and fully associative require replacement policies (LRU, FIFO, LFU).'
    ],
    examNote: 'In exams, always write down the three types of cache misses (The 3 Cs): Compulsory (Cold) misses, Capacity misses, and Conflict (Collision) misses.',
    vivaTrap: 'Viva Trap: "Does increasing cache associativity improve hit time?" Answer: No! Increasing associativity improves HIT RATE (reduces misses), but slightly worsens HIT TIME due to multiplexer and parallel tag comparator delay.'
  },
  {
    id: 'ca-long-7',
    qNumber: 'Q7',
    title: 'Page Replacement Algorithms: FIFO, LRU & Optimal (Page Fault Trace)',
    marks: 5,
    category: 'classes',
    concept: 'Virtual memory systems transfer fixed-size blocks (Pages) from disk to physical memory (Frames). When a requested page is not in RAM (Page Fault), a page replacement algorithm chooses which victim page to evict.',
    requirements: [
      'Reference String: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2',
      'Given 3 physical frames in RAM',
      'Trace First-In First-Out (FIFO) and calculate page faults',
      'Trace Least Recently Used (LRU) and calculate page faults',
      'Trace Optimal (OPT) and demonstrate Belady Anomaly'
    ],
    code: `// Reference String: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2
// Physical Frames = 3

// 1. FIFO (Evicts oldest loaded page):
// Ref: 7 -> [7,  ,  ] Fault
// Ref: 0 -> [7, 0,  ] Fault
// Ref: 1 -> [7, 0, 1] Fault
// Ref: 2 -> [2, 0, 1] Fault (7 oldest, evicted)
// Ref: 0 -> [2, 0, 1] Hit
// Ref: 3 -> [2, 3, 1] Fault (0 oldest, evicted)
// Ref: 0 -> [2, 3, 0] Fault (1 oldest, evicted)
// Ref: 4 -> [4, 3, 0] Fault (2 oldest, evicted)
// Ref: 2 -> [4, 2, 0] Fault (3 oldest, evicted)
// Ref: 3 -> [4, 2, 3] Fault (0 oldest, evicted)
// Ref: 0 -> [0, 2, 3] Fault (4 oldest, evicted)
// Ref: 3 -> [0, 2, 3] Hit
// Ref: 2 -> [0, 2, 3] Hit
// Total FIFO Faults = 10

// 2. LRU (Evicts page least recently referenced in past):
// Total LRU Faults  = 8

// 3. OPTIMAL (Evicts page that will not be used for longest time in future):
// Total OPT Faults  = 6`,
    output: `Algorithm Comparison for 3 Frames:
Optimal Algorithm (OPT) : 6 Faults (Benchmark Ideal)
Least Recently Used (LRU): 8 Faults (Practical High Performance)
First In First Out (FIFO): 10 Faults (Suffers from Belady's Anomaly)`,
    explanationPoints: [
      'FIFO: Simplest queue implementation. Oldest page evicted regardless of how frequently it is accessed.',
      'Belady Anomaly: For certain reference strings under FIFO, increasing the number of physical frames causes MORE page faults rather than fewer.',
      'LRU: Approximates Optimal by looking backward in time based on the Principle of Temporal Locality. Hardware uses counters or stack.',
      'Optimal: Theoretical benchmark requiring clairvoyant knowledge of future memory accesses; impossible to implement in real OS.'
    ],
    examNote: 'Always state in exams that LRU is a "Stack Algorithm" and therefore is mathematically immune to Belady Anomaly.',
    vivaTrap: 'Viva Trap: "Why can the Optimal page replacement algorithm not be implemented in real operating systems?" Answer: It requires knowing the future stream of memory references, which is non-deterministic and unknown to the processor in advance.'
  },
  {
    id: 'ca-long-8',
    qNumber: 'Q8',
    title: 'Direct Memory Access (DMA) Controller Architecture, Cycle Stealing & Burst Transfer',
    marks: 5,
    category: 'classes',
    concept: 'Direct Memory Access (DMA) allows high-speed peripheral devices (disks, network cards, graphics adapters) to transfer data directly to and from main RAM without burdening the CPU with programmed I/O loops.',
    requirements: [
      'Block diagram of DMA Controller (Address Register, Word Count Register, Control Register, Data Buffer)',
      'Bus Request (BR) and Bus Grant (BG) handshake mechanism',
      'Explain Cycle Stealing vs Burst (Block) Transfer modes',
      'Explain DMA Interrupt at transfer completion (Word Count = 0)'
    ],
    code: `// DMA Transfer Steps:
// 1. CPU initializes DMA Controller:
//    - Writes starting memory address into DMA Address Register
//    - Writes number of bytes to transfer into Word Count (WC) Register
//    - Writes transfer direction (Read from disk to RAM / Write to disk) in Control Register
//    - CPU resumes executing other application threads!

// 2. DMA Controller executes hardware transfer:
//    - Asserts Bus Request (BR) line to CPU
//    - CPU completes current bus cycle, puts bus in High-Impedance, asserts Bus Grant (BG)
//    - DMA takes control of System Address Bus, Data Bus, and Control Bus
//    - Direct transfer between I/O device and RAM at full memory bus speed!
//    - DMA increments Address Register, decrements Word Count Register

// 3. Completion:
//    - When Word Count == 0, DMA de-asserts BR (releases bus back to CPU)
//    - DMA raises hardware Interrupt Request to signal CPU that I/O is complete.`,
    output: `CPU Overhead: Only ~1% (Initialization and Final Interrupt)
Transfer Speed: Bounded only by RAM bandwidth (up to multiple GB/sec)
Burst Mode: DMA holds bus for entire data block (e.g. 4KB sector)
Cycle Stealing: DMA steals single memory cycles between CPU instruction phases`,
    explanationPoints: [
      'Burst Transfer: Entire block of words transferred continuously. Fastest transfer rate, but CPU is suspended from accessing system RAM during the burst.',
      'Cycle Stealing: DMA takes control of the bus for exactly 1 bus cycle to transfer 1 word, then yields the bus back to the CPU. CPU is barely slowed down.',
      'Transparent DMA: DMA transfers data only during clock phases when the CPU is performing internal operations (e.g. ALU execution) and not using the bus.',
      'DMA Channel: Modern systems have multi-channel DMACs handling simultaneous transfers for NVMe SSD, Gigabit Ethernet, and audio.'
    ],
    examNote: 'Draw the 4 signals connecting CPU and DMA Controller in exams: Bus Request (BR), Bus Grant (BG), Interrupt (INT), and Read/Write control lines.',
    vivaTrap: 'Viva Trap: "Does the CPU stop completely during DMA cycle stealing?" Answer: No! The CPU continues executing instructions stored inside its internal Cache or registers; it only stalls if it needs to access external Main Memory RAM while DMA is holding the bus.'
  },
  {
    id: 'ca-long-9',
    qNumber: 'Q9',
    title: 'Programmed I/O vs Interrupt-Driven I/O vs Direct Memory Access (DMA)',
    marks: 5,
    category: 'classes',
    concept: 'Input-Output subsystems manage data exchange between external devices and CPU/RAM. The three primary communication techniques exhibit vastly different CPU utilization and latency characteristics.',
    requirements: [
      'Describe Programmed I/O (Busy-waiting polling loop)',
      'Describe Interrupt-Driven I/O (Hardware signaling, ISR execution)',
      'Describe Direct Memory Access (Hardware autonomous bulk transfer)',
      'Comparative matrix of CPU overhead, hardware cost, and throughput'
    ],
    code: `// 1. PROGRAMMED I/O (CPU Busy-Waiting / Polling):
// while (readStatusFlag(DEV_STATUS) != READY) {
//     // 100% CPU time burned in useless spinning!
// }
// data = readData(DEV_DATA);
// M[ptr++] = data;

// 2. INTERRUPT-DRIVEN I/O:
// CPU issues read command to device, switches to other programs.
// Device becomes ready -> Asserts INT hardware pin.
// CPU saves state, executes Interrupt Service Routine (ISR):
// M[ptr++] = in(DEV_DATA);
// CPU returns (IRET) to interrupted program.

// 3. DMA (DIRECT MEMORY ACCESS):
// CPU configures DMA Controller once.
// DMA hardware handles all transfers directly to RAM.
// Raises single interrupt ONLY after entire 1 MB buffer is transferred!`,
    output: `Programmed I/O: 100% CPU wasted in polling | Suitable for simple keyboards
Interrupt-Driven: Moderate CPU overhead (context switch per byte) | Suitable for UART
DMA: Minimal CPU overhead (<1%) | Mandatory for High-Speed NVMe, GPUs, Gigabit NICs`,
    explanationPoints: [
      'Polling Wastage: In programmed I/O, a 3 GHz CPU wastes billions of clock cycles waiting for a slow 10 ms disk seek or 50 ms keyboard stroke.',
      'Context Switch Cost: Interrupt-driven I/O saves CPU waiting, but handling an interrupt for every single byte incurs register push/pop overhead.',
      'DMA Scalability: Transfers thousands of bytes directly into RAM using dedicated address incrementers, interrupting the CPU once per bulk block.'
    ],
    traceTable: {
      headers: ['Parameter', 'Programmed I/O', 'Interrupt-Driven I/O', 'Direct Memory Access (DMA)'],
      rows: [
        ['Data Transfer Agent', 'CPU executes explicit in/out instructions', 'CPU executes ISR instructions per byte', 'Dedicated DMAC hardware controller'],
        ['CPU Involvemennt', '100% busy-waiting polling', 'Involved only during interrupt servicing', 'Only during setup and final completion'],
        ['Hardware Complexity', 'Minimal (standard I/O ports)', 'Moderate (Interrupt Controller, PIC)', 'High (DMA Controller, Bus arbitration)'],
        ['Data Transfer Rate', 'Very Slow (processor bounded)', 'Moderate (bounded by ISR latency)', 'Maximum (bounded only by RAM bus speed)']
      ]
    },
    examNote: 'Always state in exams that DMA is the only viable method for high-bandwidth devices (hard disks, Ethernet, 4K displays).',
    vivaTrap: 'Viva Trap: "Why is interrupt-driven I/O inefficient for gigabit network cards?" Answer: At 1 Gbps, a packet arrives every few microseconds. Generating a CPU hardware interrupt for every packet causes "Interrupt Livelock", where the CPU spends 100% of its time switching contexts in ISRs and cannot process any actual application data!'
  },
  {
    id: 'ca-long-10',
    qNumber: 'Q10',
    title: 'RISC vs CISC Architectural Philosophies & Design Tradeoffs',
    marks: 5,
    category: 'classes',
    concept: 'Reduced Instruction Set Computer (RISC) and Complex Instruction Set Computer (CISC) represent two opposing design philosophies in computer architecture regarding instruction set complexity, pipelining, and silicon allocation.',
    requirements: [
      'Explain RISC philosophy: Simple, fixed-length instructions, single-cycle execution, load-store architecture, large register file',
      'Explain CISC philosophy: Variable-length instructions, rich addressing modes, memory-to-memory operations, microcode control',
      'Explain Iron Law of Processor Performance: Time = (Instructions / Program) * (Cycles / Instruction) * (Clock Cycle Time)',
      'Comparative matrix across 6 architectural dimensions'
    ],
    code: `// The Iron Law of Computer Performance:
// CPU Time = (Instruction Count) * (CPI) * (Clock Cycle Time)
//
// CISC Strategy (Intel x86):
// - Minimize Instruction Count by creating powerful instructions (e.g., MULT M[addr1], M[addr2])
// - Accepts higher CPI (Cycles Per Instruction = 4 to 10 cycles)
// - Slower clock rate due to complex decode logic
//
// RISC Strategy (ARM, RISC-V, Apple M-Series):
// - Maximize instruction throughput: Goal is CPI = 1.0 via deep pipelines
// - Simplifies instructions: Only LOAD and STORE access memory
// - Arithmetics operate strictly on registers (ADD R1, R2, R3)
// - Enables higher clock frequency and energy efficiency`,
    output: `RISC: High Clock Freq, CPI ~ 1, Load/Store only, Large Register File (32-64 regs)
CISC: Dense code, Variable length (1-15 bytes), Small Register File (8-16 regs)`,
    explanationPoints: [
      'Load-Store Architecture: In RISC, arithmetic instructions (ADD, SUB, AND) can ONLY operate on CPU registers. Memory can only be touched by explicit LOAD and STORE instructions.',
      'Silicon Efficiency: CISC devotes huge chip area to microcode ROM and complex multi-mode decoders. RISC repurposes this silicon space for massive register files and large on-chip L1/L2 caches.',
      'Pipelining Synergy: Fixed 32-bit instruction length in RISC makes instruction fetch and decode trivial, enabling smooth multi-stage pipelining without stalls.',
      'Modern Convergence: Modern x86 CISC processors internally decode complex x86 instructions into simple RISC-like micro-operations (uops) executed on an out-of-order superscalar RISC core.'
    ],
    traceTable: {
      headers: ['Dimension', 'RISC (e.g. ARM, RISC-V)', 'CISC (e.g. Intel x86)'],
      rows: [
        ['Instruction Length', 'Fixed (strictly 32-bit words)', 'Variable (1 byte up to 15 bytes)'],
        ['Memory Access', 'Load/Store Architecture only', 'Many instructions can access memory directly'],
        ['Addressing Modes', 'Few simple modes (register, base-offset)', 'Many complex modes (indirect, indexed, scaled)'],
        ['Control Unit', 'Hardwired (Single-cycle execution)', 'Microprogrammed (Microcode ROM)'],
        ['Register Count', 'Large (32, 64, or more registers)', 'Small (8 general registers in legacy x86)'],
        ['Compiler Role', 'Complex (relies on optimizing compiler)', 'Simpler (hardware handles complex operations)']
      ]
    },
    examNote: 'Write down the Iron Law equation in your exam: CPU Time = IC * CPI * Tau. Show how CISC reduces IC while RISC reduces CPI and Tau.',
    vivaTrap: 'Viva Trap: "Is modern Intel Core i9 or AMD Ryzen a pure CISC processor?" Answer: No! It is a hybrid: the external interface is CISC (x86 instruction set compatibility), but internal hardware decoders translate x86 instructions into RISC-like uops executed on an underlying high-performance RISC pipeline.'
  },
  {
    id: 'ca-long-11',
    qNumber: 'Q11',
    title: 'Restoring and Non-Restoring Division Algorithms with Step Trace',
    marks: 5,
    category: 'classes',
    concept: 'Binary integer division computes Quotient (Q) and Remainder (A) from Dividend and Divisor (M). Restoring division restores register A if a trial subtraction yields a negative result. Non-restoring division avoids restoration by adjusting the next cycle operation.',
    requirements: [
      'Registers used: A (initialized to 0), Q (Dividend), M (Divisor)',
      'Explain Restoring Division: Shift Left (A, Q), A = A - M. If A < 0, Q0 = 0 and A = A + M (Restore). If A >= 0, Q0 = 1',
      'Explain Non-Restoring Division rule (no restoration cycle)',
      'Step trace for Dividend = 11 (1011), Divisor = 3 (0011)'
    ],
    code: `// Restoring Division Algorithm for 4-bit Dividend = 11 (1011), Divisor M = 3 (0011):
// Initial: A = 0000, Q = 1011, M = 0011, Count = 4

// Cycle 1:
// Shift Left (A, Q) -> A = 0001, Q = 011_
// A = A - M = 0001 - 0011 = 1110 (Negative!)
// Restore A = A + M = 0001, set Q0 = 0 -> Q = 0110

// Cycle 2:
// Shift Left (A, Q) -> A = 0010, Q = 110_
// A = A - M = 0010 - 0011 = 1111 (Negative!)
// Restore A = A + M = 0010, set Q0 = 0 -> Q = 1100

// Cycle 3:
// Shift Left (A, Q) -> A = 0101, Q = 100_
// A = A - M = 0101 - 0011 = 0010 (Positive!)
// No restore, set Q0 = 1 -> Q = 1001

// Cycle 4:
// Shift Left (A, Q) -> A = 0101, Q = 001_
// A = A - M = 0101 - 0011 = 0010 (Positive!)
// No restore, set Q0 = 1 -> Q = 0011

// Result: Quotient Q = 0011 (3 decimal), Remainder A = 0010 (2 decimal)
// Verification: 11 / 3 = Quotient 3 with Remainder 2 (11 = 3 * 3 + 2). Correct!`,
    output: `Dividend = 11 (1011), Divisor = 3 (0011)
Quotient (Q)  = 0011 (Decimal 3)
Remainder (A) = 0010 (Decimal 2)
Verification  : 3 * 3 + 2 = 11`,
    explanationPoints: [
      'Trial Subtraction: Division relies on testing if the divisor fits into the current partial dividend.',
      'Restoring Penalty: If subtraction produces a negative partial remainder, a clock cycle is burned restoring A = A + M.',
      'Non-Restoring Optimization: If A is negative, in the next cycle we Shift Left and ADD M instead of subtracting, saving n restoration clock cycles.'
    ],
    examNote: 'Always check your division answer with: Dividend = Divisor * Quotient + Remainder before submitting your exam paper.',
    vivaTrap: 'Viva Trap: "Why is Non-Restoring division faster than Restoring division?" Answer: Non-Restoring division performs exactly 1 arithmetic operation per cycle (either addition or subtraction), eliminating the extra restore cycle when trial subtraction fails.'
  },
  {
    id: 'ca-long-12',
    qNumber: 'Q12',
    title: 'Memory Hierarchy Design: Registers, L1/L2/L3 Cache, Main RAM & Secondary Storage',
    marks: 5,
    category: 'classes',
    concept: 'Computer memory systems exploit the Principle of Locality (Temporal and Spatial) to create the illusion of an infinite memory space that operates at the speed of the fastest cache at the cost of the cheapest magnetic/flash storage.',
    requirements: [
      'Pyramidal hierarchy diagram with Access Time, Capacity, and Cost/bit metrics',
      'Explain Principle of Temporal Locality (loop variables) vs Spatial Locality (sequential arrays)',
      'Explain Write-Through vs Write-Back cache update policies',
      'Derive Average Memory Access Time (AMAT) formula: AMAT = Hit_Time + (Miss_Rate * Miss_Penalty)'
    ],
    code: `// Memory Hierarchy Metrics:
// Level       Access Time   Capacity       Technology
// Registers   < 0.5 ns      ~1 KB          Flip-Flops in CPU core
// L1 Cache    ~ 1 ns        32-64 KB       SRAM on-chip
// L2 Cache    ~ 4 ns        256 KB - 1 MB  SRAM on-chip
// L3 Cache    ~ 12 ns       16 - 64 MB     Shared SRAM on-chip
// Main RAM    ~ 60 ns       16 - 64 GB     Synchronous DRAM
// NVMe SSD    ~ 20,000 ns   512 GB - 2 TB  NAND Flash memory
// Magnetic HD ~ 10,000,000ns 4 - 16 TB     Rotating magnetic platters

// AMAT Calculation:
// Hit Time (L1) = 1 ns, Miss Rate = 5% (0.05), Miss Penalty (RAM access) = 60 ns
// AMAT = Hit Time + (Miss Rate * Miss Penalty)
// AMAT = 1 ns + (0.05 * 60 ns) = 1 + 3.0 = 4.0 ns!
// Without Cache: Every access would take 60 ns. Speedup = 60 / 4 = 15x faster!`,
    output: `Memory Pyramid: Registers -> L1/L2/L3 Cache -> Main DRAM -> SSD / Secondary Disk
Tradeoff: Moving UP increases speed and cost/bit; moving DOWN increases capacity
AMAT with 95% Hit Rate: 4.0 ns (vs 60 ns un-cached DRAM)`,
    explanationPoints: [
      'Temporal Locality: Data accessed recently is likely to be accessed again in the near future (e.g. loop counters, local variables). Kept in fast L1 cache.',
      'Spatial Locality: Data near recently accessed data is likely to be accessed soon (e.g. consecutive array elements, sequential instruction streams). Handled by fetching multi-byte blocks.',
      'Write-Through Policy: Every write to cache immediately updates Main Memory RAM. Simple, guarantees consistency, but wastes memory bus bandwidth.',
      'Write-Back Policy: Writes modify ONLY the cache line, marking a "Dirty Bit". The line is written back to RAM only when it is evicted. Far higher write performance.'
    ],
    examNote: 'Write down the AMAT formula in exams: AMAT = h * Tc + (1 - h) * Tm, where h is hit ratio, Tc is cache access time, and Tm is main memory access time.',
    vivaTrap: 'Viva Trap: "What is the Dirty Bit in cache memory?" Answer: A 1-bit flag attached to every cache line in a Write-Back cache. It is set to 1 when the CPU modifies that line. When the line is replaced, if Dirty Bit == 1, it must be written to RAM; if 0, it can be discarded immediately without memory writes.'
  },
  {
    id: 'ca-long-13',
    qNumber: 'Q13',
    title: 'Interrupt Subsystem: Vectored vs Non-Vectored & Priority Interrupt Controllers',
    marks: 5,
    category: 'classes',
    concept: 'Interrupts allow asynchronous external events to preempt the CPU. Priority Interrupt systems establish an unambiguous resolution hierarchy when multiple hardware devices simultaneously demand service.',
    requirements: [
      'Explain Daisy-Chaining Priority interrupt mechanism (serial hardware polling)',
      'Explain Parallel Priority Interrupt mechanism with Priority Encoder',
      'Explain Vectored vs Non-Vectored Interrupts',
      'Detail CPU interrupt acknowledgment cycle (save PC, disable interrupts, load vector address)'
    ],
    code: `// Daisy-Chain Priority Interrupt Scheme:
// CPU ----(PI)----> [Device 1] ----(PO/PI)----> [Device 2] ----(PO/PI)----> [Device 3]
// Device 1 has highest priority, Device 3 has lowest priority.
//
// Operation:
// 1. Devices assert common Interrupt Request (INT) line.
// 2. CPU completes current instruction and asserts Interrupt Acknowledge (INTA) = 1.
// 3. INTA arrives at Device 1's PI (Priority In) pin.
// 4. If Device 1 requested the interrupt:
//    - It intercepts the signal (does NOT pass it to PO).
//    - It places its unique 8-bit Interrupt Vector Address (VAD) onto the data bus.
// 5. If Device 1 did not request service:
//    - It passes the signal out via PO to Device 2's PI pin.
// 6. CPU reads VAD from data bus and jumps directly to that device's ISR!`,
    output: `Daisy-Chaining: Serial hardware propagation (O(N) delay for N devices)
Parallel Priority: 8-to-3 Priority Encoder (O(1) gate delay)
Vector Address: Direct hardware pointer to Interrupt Service Routine in RAM`,
    explanationPoints: [
      'Vectored Interrupt: The interrupting peripheral device supplies its own Interrupt Vector Address (VAD) onto the bus. The CPU jumps directly to that address without software polling.',
      'Non-Vectored Interrupt: The device has no vector capability. The CPU jumps to a single fixed hardwired address where a software polling routine queries devices one by one.',
      'Interrupt Register & Mask: In a parallel priority system, individual interrupt request bits can be dynamically enabled or masked (suppressed) by the operating system.',
      'Context Preservation: The CPU hardware automatically pushes PC and Status Register (Flags) onto the stack and clears Interrupt Enable (IEN = 0) before executing the ISR.'
    ],
    examNote: 'Draw the Daisy-Chaining diagram showing the serial PO -> PI cascade and common VAD data bus connection in exams.',
    vivaTrap: 'Viva Trap: "Why must the CPU disable interrupts (IEN = 0) immediately upon entering an interrupt service routine?" Answer: To prevent recursive interrupt nesting where the same device immediately interrupts its own ISR before the processor has saved the return state.'
  },
  {
    id: 'ca-long-14',
    qNumber: 'Q14',
    title: 'Asynchronous Data Transfer: Strobe Pulse Method vs Two-Wire Handshaking',
    marks: 5,
    category: 'classes',
    concept: 'Asynchronous data transfer coordinates data transmission between two independent units (Source and Destination) that do not share a common clock signal. Strobe and Handshaking provide synchronization protocols.',
    requirements: [
      'Describe Source-Initiated and Destination-Initiated Strobe methods',
      'Explain timing diagram and fatal limitation of Strobe (no receipt guarantee)',
      'Describe Two-Wire Handshaking: Data Bus, Data Valid, and Data Accepted signals',
      'Draw Handshaking Sequence flowchart demonstrating timeout resilience'
    ],
    code: `// Two-Wire Handshaking Protocol (Source-Initiated):
// Signals:
// 1. Data Bus (carries data word)
// 2. Data Valid (asserted by Source when data on bus is stable)
// 3. Data Accepted (asserted by Destination when data has been latched)

// Handshake Sequence:
// Source                     Destination
// -------------------------------------------------------------
// 1. Places data on bus
// 2. Asserts Data Valid ====>
//                            3. Latches data from bus
//                       <==== 4. Asserts Data Accepted
// 5. De-asserts Data Valid =>
//                            6. De-asserts Data Accepted
// 7. Ready for next word!`,
    output: `Strobe Method: 1 control wire (Unreliable - Source has zero knowledge if data was received)
Handshaking: 2 control wires (Fully reliable - Rigorous closed-loop confirmation)`,
    explanationPoints: [
      'Strobe Disadvantage: If the destination is slow, busy, or disconnected, data is lost permanently with zero error detection because the source blindly asserts strobe and removes data.',
      'Handshaking Closed-Loop: The source NEVER removes data from the bus until the destination explicitly acknowledges receipt by raising "Data Accepted".',
      'Fault Detection: If "Data Accepted" is not returned within a pre-configured timeout period, the CPU triggers a transmission timeout error.',
      'Double Handshake: Ensures both sides return to baseline before the next transfer begins, eliminating race conditions across variable-length transmission cables.'
    ],
    examNote: 'In exams, draw both timing diagrams: Strobe shows data bus with a single pulse; Handshake shows overlapping square waves of Data Valid and Data Accepted.',
    vivaTrap: 'Viva Trap: "What happens in handshaking if the destination cable is disconnected?" Answer: Data Valid stays high, Data Accepted never goes high, and the source triggers a hardware Timeout Error instead of blindly corrupting data.'
  },
  {
    id: 'ca-long-15',
    qNumber: 'Q15',
    title: 'Virtual Memory Address Translation: Paging, Page Tables & Translation Lookaside Buffer (TLB)',
    marks: 5,
    category: 'classes',
    concept: 'Virtual Memory provides each process with a contiguous private address space larger than physical DRAM. A Memory Management Unit (MMU) translates Virtual (Logical) Addresses into Physical Addresses via Page Tables and caches translations in a TLB.',
    requirements: [
      'Virtual Address breakdown: Virtual Page Number (VPN) and Page Offset (PO)',
      'Page Table Entry format (Frame Number, Valid/Invalid bit, Dirty bit, Protection bits)',
      'Role of Translation Lookaside Buffer (TLB) associative cache',
      'Effective Memory Access Time (EMAT) calculation with TLB hit ratio'
    ],
    code: `// Virtual Address Translation Parameters:
// Virtual Address Space = 4 GB = 2^32 bytes -> 32-bit virtual address
// Page Size             = 4 KB = 4096 bytes  -> 12-bit offset (PO)
// Virtual Page Number   = 32 - 12 = 20 bits (1,048,576 pages)
// Physical RAM          = 1 GB = 2^30 bytes -> 30-bit physical address
// Frame Number          = 30 - 12 = 18 bits

// EMAT Calculation:
// TLB Access Time = 1 ns, Main Memory Access Time = 50 ns
// Case 1: TLB Hit (Ratio = 98%):
// Time = TLB_time + Memory_time = 1 ns + 50 ns = 51 ns
// Case 2: TLB Miss (Ratio = 2%):
// Time = TLB_time + PageTable_Access (50ns) + Memory_Access (50ns) = 101 ns
// EMAT = (0.98 * 51) + (0.02 * 101) = 49.98 + 2.02 = 52.0 ns!
// (Without TLB, every memory read would require 2 RAM accesses = 100 ns!)`,
    output: `Virtual Address: [ Virtual Page Number (20 bits) ] [ Offset (12 bits) ]
Physical Address: [ Frame Number (18 bits) ] [ Offset (12 bits) ]
EMAT with 98% TLB Hit Ratio: 52.0 ns vs 100 ns (Nearly 2x speedup!)`,
    explanationPoints: [
      'Page Offset Unchanged: The low-order 12 bits (offset within the 4KB page) pass directly through to the physical address without modification.',
      'Valid/Invalid Bit: Set to 1 if the page resides in physical DRAM. If 0, accessing the page triggers a Page Fault hardware interrupt.',
      'TLB Associative Lookup: The TLB is an on-chip associative cache holding the most recent VPN-to-Frame mappings, resolving translations in 1 clock cycle.',
      'Multi-Level Page Tables: Modern 64-bit systems use 4-level page tables to avoid storing multi-gigabyte flat page tables in memory.'
    ],
    examNote: 'Write down the EMAT formula in exams: EMAT = (TLB_Hit_Ratio * (TLB_Time + Mem_Time)) + ((1 - TLB_Hit_Ratio) * (TLB_Time + 2 * Mem_Time)).',
    vivaTrap: 'Viva Trap: "Why is the page size always chosen as a power of 2 (e.g. 4096 bytes)?" Answer: A power of 2 allows splitting the address into page number and offset via simple bit-slicing (hardware wire routing) without requiring mathematical division or modulo ALUs.'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// PART C: 18 3-MARK THEORY QUESTIONS WITH COMPARISON TABLES & DIAGRAMS
// ─────────────────────────────────────────────────────────────────────────────
export const CA_THEORY_QUESTIONS: TheoryQuestion[] = [
  {
    id: 'ca-th-1',
    qNumber: 1,
    title: 'Von Neumann Architecture vs Harvard Architecture',
    marks: 3,
    category: 'Processor Design',
    definition: 'Von Neumann architecture uses a single unified memory and common bus for both instructions and data. Harvard architecture employs physically separate memories and buses for instructions and data.',
    usesOrRules: [
      { title: 'Bus Bottleneck', explanation: 'Von Neumann suffers from the "Von Neumann Bottleneck" because CPU cannot read instruction and data simultaneously.' },
      { title: 'Pipelining', explanation: 'Modern high-speed processors use Harvard-style separate L1 Instruction and Data caches to enable pipelined instruction and operand fetching.' }
    ],
    comparisonTable: {
      headers: ['Feature', 'Von Neumann Architecture', 'Harvard Architecture'],
      rows: [
        ['Memory Organization', 'Single unified memory for instructions & data', 'Physically separate Instruction and Data memories'],
        ['Bus Interconnect', 'Shared common bus for code and data', 'Dual independent buses (Instruction bus & Data bus)'],
        ['Simultaneous Access', 'Cannot fetch instruction and data at same time', 'Can fetch instruction and data in same clock cycle'],
        ['Hardware Complexity', 'Simpler design, lower silicon pin cost', 'More complex, higher pin and wire count'],
        ['Modern Usage', 'Main RAM memory and storage', 'CPU L1 Caches and DSP microcontrollers']
      ]
    },
    examTip: 'Cite DSP processors (Texas Instruments) or CPU L1 I-Cache/D-Cache as Harvard examples; standard desktop PC main RAM as Von Neumann.',
    diagram: `VON NEUMANN: [CPU] <=== Shared Bus ===> [Unified Memory: Code + Data]
HARVARD:     [CPU] <== Code Bus ==> [Instruction RAM]
                   <== Data Bus ==> [Data RAM]`
  },
  {
    id: 'ca-th-2',
    qNumber: 2,
    title: 'Spatial Locality vs Temporal Locality',
    marks: 3,
    category: 'Memory Systems',
    definition: 'Temporal Locality states that memory locations accessed recently are likely to be accessed again soon. Spatial Locality states that memory locations adjacent to recently accessed addresses are likely to be accessed soon.',
    usesOrRules: [
      { title: 'Temporal Example', explanation: 'Loop control variables, accumulator sums, stack pointers.' },
      { title: 'Spatial Example', explanation: 'Iterating through array elements, executing sequential code instructions.' }
    ],
    comparisonTable: {
      headers: ['Dimension', 'Temporal Locality', 'Spatial Locality'],
      rows: [
        ['Principle', 'Locality in TIME (recently used items reused)', 'Locality in SPACE (nearby memory items accessed)'],
        ['Exploited By', 'Retaining recent blocks in fast L1/L2 cache', 'Fetching multi-byte cache blocks / pre-fetching'],
        ['Code Pattern', 'Loops (for, while), subroutine calls', 'Sequential array iterations, linear instructions'],
        ['Cache Mechanism', 'LRU replacement keeps frequently used lines', 'Block sizes (e.g. 64 bytes) fetch neighbors']
      ]
    },
    examTip: 'State how cache takes advantage of both: Temporal locality keeps blocks in cache; Spatial locality uses wide cache lines (e.g. 64B) rather than 1-byte lines.',
    diagram: `Temporal:  Time t1: X  ---> Time t2: X  ---> Time t3: X (Same item repeatedly)
Spatial:   Address: [ X ] -> [ X+1 ] -> [ X+2 ] -> [ X+3 ] (Contiguous walk)`
  },
  {
    id: 'ca-th-3',
    qNumber: 3,
    title: 'Static RAM (SRAM) vs Dynamic RAM (DRAM)',
    marks: 3,
    category: 'Memory Systems',
    definition: 'SRAM stores each bit using a 6-transistor latch flip-flop without charge loss. DRAM stores each bit as an electric charge in a tiny capacitor with 1 transistor, requiring continuous refreshing.',
    usesOrRules: [
      { title: 'Speed', explanation: 'SRAM has nanosecond access times (ideal for on-chip cache). DRAM is slower (60 ns).' },
      { title: 'Density', explanation: 'DRAM has extreme packaging density and low cost per bit (ideal for main system RAM).' }
    ],
    comparisonTable: {
      headers: ['Parameter', 'Static RAM (SRAM)', 'Dynamic RAM (DRAM)'],
      rows: [
        ['Storage Cell', '6 Transistors (Bistable Flip-Flop)', '1 Transistor + 1 Capacitor'],
        ['Refresh Requirement', 'No refresh required as long as power is ON', 'Requires periodic refresh cycles (charge leaks)'],
        ['Speed', 'Extremely fast (~ 1 ns)', 'Slower (~ 50-70 ns)'],
        ['Density & Capacity', 'Low density, lower capacity (MBs)', 'Extremely high density, high capacity (GBs)'],
        ['Cost per Bit', 'High', 'Low'],
        ['Application', 'CPU L1, L2, L3 Caches', 'Main System Memory (DDR4 / DDR5)']
      ]
    },
    examTip: 'Always mention that DRAM capacitors leak charge within milliseconds, requiring a refresh controller to periodically read and restore cell voltages.',
    diagram: `SRAM: [T1-T6 Flip-Flop] -> Stable bit
DRAM: [Transistor] + [Capacitor --- charge leaks!] -> Needs Refresh`
  },
  {
    id: 'ca-th-4',
    qNumber: 4,
    title: 'Direct Addressing vs Indirect Addressing Modes',
    marks: 3,
    category: 'Addressing Modes',
    definition: 'In Direct Addressing, the instruction address field points directly to the operand in memory. In Indirect Addressing, the address field points to a memory location containing the effective address of the operand.',
    usesOrRules: [
      { title: 'Memory Access Count', explanation: 'Direct addressing requires 1 memory reference to read operand. Indirect addressing requires 2 memory references.' },
      { title: 'Use Case', explanation: 'Direct addressing is used for global variables. Indirect addressing is used for pointers and subroutine parameter passing.' }
    ],
    comparisonTable: {
      headers: ['Feature', 'Direct Addressing (I = 0)', 'Indirect Addressing (I = 1)'],
      rows: [
        ['Effective Address', 'EA = IR(0-11)', 'EA = M[IR(0-11)]'],
        ['Memory References', '1 memory read cycle for operand', '2 memory read cycles (1 for address, 1 for data)'],
        ['Execution Speed', 'Faster (1 clock cycle less)', 'Slower (extra memory cycle at T3)'],
        ['Programming Value', 'Simple fixed variable access', 'Essential for pointers, arrays, and subroutines'],
        ['Mano Mode Bit', 'Bit 15 = 0', 'Bit 15 = 1']
      ]
    },
    examTip: 'Draw the two-step pointer dereference diagram showing: Instruction -> Memory[Address] -> Operand.',
    diagram: `Direct:   [Opcode | 0x200] ----> M[0x200] = OPERAND
Indirect: [Opcode | 0x200] ----> M[0x200] = 0x500 ----> M[0x500] = OPERAND`
  },
  {
    id: 'ca-th-5',
    qNumber: 5,
    title: 'Memory-Mapped I/O vs Isolated (I/O-Mapped) I/O',
    marks: 3,
    category: 'Input/Output',
    definition: 'Memory-Mapped I/O shares the single physical address space between memory and I/O devices. Isolated I/O assigns separate address spaces and distinct CPU read/write control lines for memory and I/O.',
    usesOrRules: [
      { title: 'Instruction Set', explanation: 'Memory-Mapped I/O accesses device ports using standard memory instructions (MOV, ADD, STA). Isolated I/O requires dedicated IN and OUT instructions.' },
      { title: 'Address Space', explanation: 'Memory-Mapped consumes a slice of the CPU addressable memory range; Isolated preserves 100% of RAM address space.' }
    ],
    comparisonTable: {
      headers: ['Dimension', 'Memory-Mapped I/O', 'Isolated (I/O-Mapped) I/O'],
      rows: [
        ['Address Space', 'Single unified address space for RAM & I/O', 'Separate address spaces for RAM and I/O ports'],
        ['CPU Instructions', 'Standard memory instructions (LOAD, STORE)', 'Specialized instructions (IN, OUT)'],
        ['Control Bus Lines', 'Single MEMR and MEMW lines', 'Distinct MEMR/MEMW and IOR/IOW control lines'],
        ['RAM Capacity Impact', 'Reduces available memory address space', 'Zero reduction in RAM addressable capacity'],
        ['Supported Architectures', 'ARM, RISC-V, MIPS', 'Intel x86 (IN/OUT instructions)']
      ]
    },
    examTip: 'Intel x86 uses Isolated I/O (ports 0x0000 to 0xFFFF) via IN and OUT, but also supports Memory-Mapped I/O for PCIe peripherals.',
    diagram: `Memory-Mapped: [ RAM (0x0000..0xEFFF) | I/O Devices (0xF000..0xFFFF) ] (Unified)
Isolated:      [ RAM (0x0000..0xFFFF) ] AND [ I/O Ports (0x00..0xFF) ] (Separate)`
  },
  {
    id: 'ca-th-6',
    qNumber: 6,
    title: 'Structural vs Data vs Control Hazards in Pipelining',
    marks: 3,
    category: 'Pipelining',
    definition: 'Hazards are conditions in a pipeline that prevent the next instruction from executing in its designated clock cycle, introducing pipeline bubbles (stalls).',
    usesOrRules: [
      { title: 'Structural Hazard', explanation: 'Hardware resource conflict (e.g., simultaneous memory access).' },
      { title: 'Data Hazard', explanation: 'Operand dependency (e.g., instruction needs result not yet written).' },
      { title: 'Control Hazard', explanation: 'Branch/jump instruction altering instruction stream flow.' }
    ],
    comparisonTable: {
      headers: ['Hazard Type', 'Cause', 'Hardware Impact', 'Mitigation Technique'],
      rows: [
        ['Structural Hazard', 'Multiple stages demand same hardware unit', 'Hardware contention stall', 'Separate Harvard L1 caches, duplicated ALUs'],
        ['Data Hazard', 'Instruction depends on unwritten result (RAW)', 'Stall waiting for write-back', 'Operand Forwarding / Bypassing, reordering'],
        ['Control Hazard', 'Branch/Jump changes PC unexpectedly', 'Flushes pipeline stages', 'Branch Prediction, Branch Target Buffer (BTB)']
      ]
    },
    examTip: 'Operand Forwarding (Bypassing) routes the output of the EX stage directly to the ALU input of the next cycle without waiting for register file write-back.',
    diagram: `Structural: FI and FO both demand single Memory port!
Data:       ADD R1, R2, R3 -> SUB R4, R1, R5 (Needs R1 before write!)
Control:    JNZ Target (Instructions fetched behind branch might be wrong!)`
  },
  {
    id: 'ca-th-7',
    qNumber: 7,
    title: 'Write-Through vs Write-Back Cache Policies',
    marks: 3,
    category: 'Memory Systems',
    definition: 'Write-Through writes modified data simultaneously to both the cache and main RAM. Write-Back writes data only to the cache line, writing back to main RAM only when the line is evicted.',
    usesOrRules: [
      { title: 'Bus Traffic', explanation: 'Write-Through produces high bus traffic on every write. Write-Back minimizes bus traffic.' },
      { title: 'Dirty Bit', explanation: 'Write-Back requires tracking whether a line has been modified using a Dirty Bit flag.' }
    ],
    comparisonTable: {
      headers: ['Feature', 'Write-Through Policy', 'Write-Back Policy'],
      rows: [
        ['RAM Update Timing', 'Simultaneously on every write hit', 'Deferred until modified line is evicted'],
        ['Memory Bus Traffic', 'Very high (saturates bus on write loops)', 'Low (only written when displaced)'],
        ['Data Consistency', 'Main RAM is always 100% consistent', 'Main RAM is stale until write-back occurs'],
        ['Dirty Bit Required?', 'No', 'Yes (1 bit per cache line)'],
        ['Write Speed', 'Slower (bounded by write buffer / RAM)', 'Fastest (writes complete at SRAM speed)']
      ]
    },
    examTip: 'Always mention that Write-Through often uses a Write Buffer (FIFO queue) so the CPU does not stall while RAM absorbs the write.',
    diagram: `Write-Through: CPU Write -> [Cache] AND [RAM] (Immediate)
Write-Back:    CPU Write -> [Cache (Dirty=1)] ... Evict -> [RAM] (Deferred)`
  },
  {
    id: 'ca-th-8',
    qNumber: 8,
    title: 'Subroutine Call (BSA) vs Interrupt Service Routine (ISR)',
    marks: 3,
    category: 'Processor Control',
    definition: 'A Subroutine Call is initiated synchronously and intentionally by program software via an instruction (e.g. CALL / BSA). An Interrupt is initiated asynchronously by external hardware or internal exceptions.',
    usesOrRules: [
      { title: 'Initiation', explanation: 'Subroutine call is programmed into code; Interrupt can strike between any two arbitrary instructions.' },
      { title: 'State Saved', explanation: 'Subroutine saves PC; Interrupt saves PC PLUS Processor Status Word (Flags: Zero, Carry, Overflow, Sign).' }
    ],
    comparisonTable: {
      headers: ['Dimension', 'Subroutine Call (BSA)', 'Interrupt Service Routine (ISR)'],
      rows: [
        ['Initiating Agent', 'Software programmer (explicit CALL / BSA)', 'External hardware signal (INT) or CPU fault'],
        ['Timing', 'Synchronous (predictable program flow)', 'Asynchronous (unpredictable at any clock cycle)'],
        ['Context Saved', 'Program Counter (PC) only', 'Program Counter (PC) + Status Register Flags'],
        ['Return Instruction', 'RET / BUN (Indirect)', 'IRET (Restores flags and enables interrupts)'],
        ['Nesting Control', 'Controlled by software stack', 'Controlled by hardware Priority Interrupt Controller']
      ]
    },
    examTip: 'Examiners look for the fact that an ISR must restore the CPU flags (condition codes) so the interrupted application arithmetic is not altered.',
    diagram: `Subroutine: Main Code -> explicit CALL -> Routine -> RET -> Resumes Main
Interrupt:  Main Code -> [HARDWARE PIN FIRES] -> CPU forces ISR -> IRET -> Resumes`
  },
  {
    id: 'ca-th-9',
    qNumber: 9,
    title: 'Virtual Memory: Paging vs Segmentation',
    marks: 3,
    category: 'Memory Management',
    definition: 'Paging divides memory into fixed-size physical blocks (Pages and Frames). Segmentation divides memory into variable-size logical units matching program components (Code, Stack, Data, Heap).',
    usesOrRules: [
      { title: 'Fragmentation', explanation: 'Paging suffers from internal fragmentation; Segmentation suffers from external fragmentation.' },
      { title: 'User Visibility', explanation: 'Paging is transparent to the programmer; Segmentation is visible to the programmer/compiler.' }
    ],
    comparisonTable: {
      headers: ['Feature', 'Paging', 'Segmentation'],
      rows: [
        ['Block Size', 'Fixed size (e.g. strictly 4 KB)', 'Variable size (proportional to segment code)'],
        ['Fragmentation Type', 'Internal Fragmentation (in last page)', 'External Fragmentation (holes between segments)'],
        ['Programmer View', 'Invisible (handled 100% by OS and MMU)', 'Visible (logical division: code, data, stack)'],
        ['Address Structure', 'Single linear address: Page # + Offset', 'Two-dimensional address: Segment # + Offset'],
        ['Protection & Sharing', 'Difficult to protect logical functions', 'Easy (can set read/execute on Code segment)']
      ]
    },
    examTip: 'Modern operating systems combine both: Segmented Paging (segments are subdivided into 4KB pages to eliminate external fragmentation).',
    diagram: `PAGING:       [4KB] [4KB] [4KB] [4KB] (Fixed equal tiles)
SEGMENTATION: [Code: 64KB] [Data: 12KB] [Stack: 8KB] (Variable logical blocks)`
  },
  {
    id: 'ca-th-10',
    qNumber: 10,
    title: 'Synchronous Bus vs Asynchronous Bus Data Transfer',
    marks: 3,
    category: 'Bus Interconnect',
    definition: 'A Synchronous Bus synchronizes all bus transactions to a central master system clock. An Asynchronous Bus has no common clock; transfers are governed by handshaking control signals.',
    usesOrRules: [
      { title: 'Cable Length', explanation: 'Synchronous buses suffer from clock skew over long distances; asynchronous buses work reliably across arbitrary cable lengths.' },
      { title: 'Device Speed Mix', explanation: 'Synchronous buses run at the speed of the slowest connected unit; asynchronous buses adapt dynamically to device speed.' }
    ],
    comparisonTable: {
      headers: ['Criterion', 'Synchronous Bus', 'Asynchronous Bus'],
      rows: [
        ['Timing Reference', 'Shared system master clock line', 'Handshaking control signals (Req / Ack)'],
        ['Hardware Simplicity', 'Simpler interface logic', 'More complex handshake state machines'],
        ['Cable Length', 'Short distances only (clock skew limits)', 'Can span long cables and backplanes'],
        ['Device Speed Mixing', 'Slow devices stall bus clock cycle', 'Accommodates fast and slow devices seamlessly'],
        ['Modern Usage', 'CPU-to-RAM bus (DDR), PCIe', 'USB, SCSI, RS-232, I2C']
      ]
    },
    examTip: 'Clock Skew is the primary physical limit of synchronous buses: clock pulses arrive at different times across physical circuit board traces.',
    diagram: `Synchronous:  Clock |___|---|___|---| -> Data sampled on clock edge
Asynchronous: Req ====> Ack <==== (Handshake handshake handshake)`
  },
  {
    id: 'ca-th-11',
    qNumber: 11,
    title: 'Little-Endian vs Big-Endian Byte Ordering',
    marks: 3,
    category: 'Data Representation',
    definition: 'Endianness defines how multi-byte words are arranged in sequential memory byte addresses. Little-Endian stores the Least Significant Byte (LSB) at the lowest memory address. Big-Endian stores the Most Significant Byte (MSB) at the lowest memory address.',
    usesOrRules: [
      { title: '32-Bit Value Example', explanation: 'Value 0x12345678 stored at address 0x1000.' },
      { title: 'Networking', explanation: 'Internet TCP/IP protocols standardize on Big-Endian ("Network Byte Order"). x86 and ARM chips default to Little-Endian.' }
    ],
    comparisonTable: {
      headers: ['Address', 'Big-Endian (MSB First)', 'Little-Endian (LSB First)'],
      rows: [
        ['0x1000 (Base)', '0x12 (Most Significant Byte)', '0x78 (Least Significant Byte)'],
        ['0x1001', '0x34', '0x56'],
        ['0x1002', '0x56', '0x34'],
        ['0x1003', '0x78 (Least Significant Byte)', '0x12 (Most Significant Byte)'],
        ['Architectures', 'IBM Mainframes, TCP/IP, Motorola 68k', 'Intel x86, AMD, ARM (default mode)']
      ]
    },
    examTip: 'Memory mnemonic: Little Endian = Little end (LSB) stored at Little address.',
    diagram: `Value: 0x12345678
Big-Endian:    [0x1000: 12] [0x1001: 34] [0x1002: 56] [0x1003: 78]
Little-Endian: [0x1000: 78] [0x1001: 56] [0x1002: 34] [0x1003: 12]`
  },
  {
    id: 'ca-th-12',
    qNumber: 12,
    title: 'Microoperation Categories: Register Transfer, Arithmetic, Logic & Shift',
    marks: 3,
    category: 'Microoperations',
    definition: 'A microoperation is an elementary operations performed on information stored in one or more registers during a single clock pulse.',
    usesOrRules: [
      { title: 'Register Transfer', explanation: 'Copies binary data from one register to another without altering bits (R2 <- R1).' },
      { title: 'Arithmetic', explanation: 'Performs numeric math: addition, subtraction, increment, decrement (R1 <- R1 + R2).' },
      { title: 'Logic', explanation: 'Performs bitwise boolean operations: AND, OR, XOR, NOT (R1 <- R1 & R2).' },
      { title: 'Shift', explanation: 'Shifts register bits left or right (Logical, Circular, Arithmetic).' }
    ],
    comparisonTable: {
      headers: ['Microoperation Type', 'Symbolic RTL Example', 'Hardware Circuitry'],
      rows: [
        ['Register Transfer', 'AR <- PC, DR <- M[AR]', 'Bus lines, multiplexers, tri-state buffers'],
        ['Arithmetic', 'AC <- AC + DR, PC <- PC + 1', 'Parallel Full Adder, binary adder-subtractor'],
        ['Logic', 'AC <- AC & DR, AC <- ~AC', 'Bitwise logic gates (AND, OR, XOR, NOT)'],
        ['Shift', 'AC <- shl AC, AC <- ashr AC', 'Bidirectional shift register or barrel shifter']
      ]
    },
    examTip: 'Always distinguish between Arithmetic Shift Right (preserves sign bit) and Logical Shift Right (inserts 0 into MSB).',
    diagram: `Register Transfer: [PC] ===> [AR]
Arithmetic:        [AC] + [DR] ===> [Adder] ===> [AC]
Logic:             [AC] AND [DR] ===> [AND Gates] ===> [AC]
Shift:             [b3 | b2 | b1 | b0] ---> Shifted Right`
  },
  {
    id: 'ca-th-13',
    qNumber: 13,
    title: 'IEEE 754 Floating-Point Standard (Single Precision 32-bit Format)',
    marks: 3,
    category: 'Data Representation',
    definition: 'IEEE 754 Single Precision standard represents fractional real numbers in 32 bits: 1 Sign bit (s), 8 Biased Exponent bits (e), and 23 Fraction/Mantissa bits (f).',
    usesOrRules: [
      { title: 'Formula', explanation: 'Value = (-1)^s * (1.f) * 2^(e - 127).' },
      { title: 'Normalized Mantissa', explanation: 'The leading 1 before the decimal point is implicit (hidden bit), giving 24 bits of precision from 23 stored bits.' }
    ],
    comparisonTable: {
      headers: ['Field', 'Bit Positions', 'Width', 'Engineering Meaning'],
      rows: [
        ['Sign (s)', 'Bit 31', '1 bit', '0 = Positive (+), 1 = Negative (-)'],
        ['Biased Exponent (e)', 'Bits 30-23', '8 bits', 'Stores exponent with excess-127 bias (e = E + 127)'],
        ['Mantissa / Fraction (f)', 'Bits 22-0', '23 bits', 'Fractional part of normalized binary significand (1.f)']
      ]
    },
    examTip: 'Convert decimal -13.625 to IEEE 754: 13.625 = 1101.101 = 1.101101 * 2^3. Sign=1, Exp=3+127=130 (10000010), Mantissa=10110100000000000000000.',
    diagram: `[ Sign (1b) ] [ Biased Exponent (8b) ] [ Normalized Fraction / Mantissa (23b) ]
Bit 31        Bits 30-23               Bits 22-0`
  },
  {
    id: 'ca-th-14',
    qNumber: 14,
    title: 'Vectored Interrupts vs Non-Vectored Interrupts',
    marks: 3,
    category: 'Interrupts',
    definition: 'Vectored Interrupts supply the exact memory address of the ISR directly across the data bus from the peripheral hardware. Non-Vectored Interrupts jump to a single fixed hardwired memory address where a software polling loop determines who called.',
    usesOrRules: [
      { title: 'Latency', explanation: 'Vectored interrupts have minimal latency; non-vectored interrupts have high latency due to sequential polling.' },
      { title: 'Hardware Cost', explanation: 'Vectored requires address generation hardware on every peripheral; non-vectored requires minimal peripheral circuitry.' }
    ],
    comparisonTable: {
      headers: ['Feature', 'Vectored Interrupt', 'Non-Vectored Interrupt'],
      rows: [
        ['ISR Address Origin', 'Supplied by peripheral device via data bus', 'Pre-determined fixed hardwired CPU address'],
        ['Identifying Device', 'Immediate (hardware vector points to ISR)', 'Software polling routine checks device status flags'],
        ['Response Latency', 'Minimal (instant jump to dedicated ISR)', 'High (delay proportional to device count)'],
        ['Peripheral Complexity', 'Device must contain vector register hardware', 'Device only needs a simple interrupt request line'],
        ['Flexibility', 'High (easy to add/remap service routines)', 'Low (polling routine must be re-written)']
      ]
    },
    examTip: 'In the Mano Basic Computer, the interrupt is non-vectored: it always saves PC at M[0] and branches to M[1].',
    diagram: `Vectored:     Device -> Puts Address 0x0080 on Bus -> CPU Jumps to 0x0080
Non-Vectored: Device -> Asserts INT -> CPU Jumps to Fixed 0x0001 -> Polling Loop`
  },
  {
    id: 'ca-th-15',
    qNumber: 15,
    title: 'Pipelining Speedup Ratio & Efficiency Calculations',
    marks: 3,
    category: 'Pipelining',
    definition: 'Speedup ratio evaluates performance gains of a k-stage pipeline over non-pipelined sequential execution for n tasks.',
    usesOrRules: [
      { title: 'Formulas', explanation: 'Speedup S = (n * k) / (k + n - 1). Efficiency E = S / k. Throughput = n / ((k + n - 1) * Tau).' },
      { title: 'Asymptotic Limit', explanation: 'As task count n approaches infinity, speedup approaches stage count k and efficiency approaches 100%.' }
    ],
    comparisonTable: {
      headers: ['Metric', 'Mathematical Formula', 'Ideal Limit (n >> k)', 'Real-World Limit'],
      rows: [
        ['Speedup (S)', 'S = (n * k) / (k + n - 1)', 'S -> k (Equals number of stages)', 'S < k due to hazard stalls'],
        ['Efficiency (E)', 'E = S / k = n / (k + n - 1)', 'E -> 1.0 (100% hardware utilization)', 'E ~ 70-85% due to bubbles'],
        ['Clock Cycles Needed', 'Total Cycles = k + n - 1', 'Cycles ~ n (1 instruction per cycle)', 'Cycles > n due to branch penalty']
      ]
    },
    examTip: 'Given numerical: 5 stages (k=5), 100 tasks (n=100). Speedup S = (100 * 5) / (5 + 100 - 1) = 500 / 104 = 4.81x.',
    diagram: `Speedup Curve: S approaches k asymptotically as task count n increases.
S = k * [ n / (k + n - 1) ]`
  },
  {
    id: 'ca-th-16',
    qNumber: 16,
    title: 'Arithmetic Shift vs Logical Shift vs Circular Shift',
    marks: 3,
    category: 'Microoperations',
    definition: 'Logical shift inserts zeros into empty terminal bit positions. Circular shift recirculates displaced bits from one end back into the other. Arithmetic shift preserves the sign bit during right shifts for signed arithmetic.',
    usesOrRules: [
      { title: 'Multiplication & Division', explanation: 'Arithmetic Shift Left multiplies by 2; Arithmetic Shift Right divides by 2 while preserving sign.' },
      { title: 'Overflow Check', explanation: 'In Arithmetic Shift Left, overflow occurs if the sign bit changes.' }
    ],
    comparisonTable: {
      headers: ['Shift Type', 'Left Shift Action', 'Right Shift Action', 'Preserves Sign?'],
      rows: [
        ['Logical Shift', 'Inserts 0 into LSB; MSB discarded', 'Inserts 0 into MSB; LSB discarded', 'No (treats data as unsigned)'],
        ['Circular Shift (Rotate)', 'MSB rotates around into LSB', 'LSB rotates around into MSB', 'No (pure bit rotation)'],
        ['Arithmetic Shift', 'Inserts 0 into LSB (multiplies by 2)', 'MSB copies itself into MSB (divides by 2)', 'Yes (Preserves 2s complement sign)']
      ]
    },
    examTip: 'Arithmetic Shift Right (ashr) on 1111 0000 (-16) gives 1111 1000 (-8). The sign bit 1 is preserved.',
    diagram: `Logical Right:    0 ===> [b7 | b6 | b5 | b4 | b3 | b2 | b1 | b0] ===> Discard
Arithmetic Right: b7 ===> [b7 | b6 | b5 | b4 | b3 | b2 | b1 | b0] ===> Discard (Sign kept)
Circular Right:          [b7 | b6 | b5 | b4 | b3 | b2 | b1 | b0] ===> (Loops back to b7)`
  },
  {
    id: 'ca-th-17',
    qNumber: 17,
    title: 'Control Memory and Microprogram Sequencer',
    marks: 3,
    category: 'Processor Control',
    definition: 'Control Memory is a dedicated high-speed ROM within the CPU that stores microprograms. A Microprogram Sequencer determines the next microinstruction address to be fetched into the Control Address Register (CAR).',
    usesOrRules: [
      { title: 'Sequencing Capabilities', explanation: 'Increment CAR, conditional branch, subroutine call, and mapping machine opcode to microcode address.' },
      { title: 'Mapping Logic', explanation: 'Translates a 4-bit machine instruction opcode into a starting address in Control Memory.' }
    ],
    comparisonTable: {
      headers: ['Component', 'Primary Role', 'Input Sources', 'Output Target'],
      rows: [
        ['Control Address Register (CAR)', 'Holds address of active microinstruction', 'Sequencer multiplexer', 'Control Memory ROM'],
        ['Control Memory (ROM)', 'Stores permanent microcode firmware', 'Address from CAR', 'Microinstruction Register (MIR)'],
        ['Microprogram Sequencer', 'Computes next CAR address', 'Branch bits, Condition flags, Opcode', 'CAR input']
      ]
    },
    examTip: 'Draw the 4 multiplexer inputs feeding CAR: (1) CAR + 1 (Increment), (2) AD field (Jump/Branch), (3) SBN (Subroutine return), (4) MAP (Opcode mapping).',
    diagram: `[Opcode] -> [Mapping Logic] -\ 
[CAR + 1] -------------------> [Multiplexer] -> [CAR] -> [Control ROM] -> [Microinstruction]
[Branch Address AD] ---------/`
  },
  {
    id: 'ca-th-18',
    qNumber: 18,
    title: 'Instruction Pipelining Hazards: Branch Target Buffer (BTB) & Delayed Branching',
    marks: 3,
    category: 'Pipelining',
    definition: 'Branch instructions alter the sequential PC stream, causing control hazard pipeline stalls. Branch Target Buffer (BTB) and Delayed Branching eliminate or minimize branch penalties.',
    usesOrRules: [
      { title: 'BTB Hardware', explanation: 'A lookaside cache storing branch addresses and their predicted target addresses; allows fetching target instruction with zero stall cycles.' },
      { title: 'Delayed Branch', explanation: 'Compiler schedules an independent instruction into the "Delay Slot" immediately following the branch, which always executes regardless of whether branch is taken.' }
    ],
    comparisonTable: {
      headers: ['Feature', 'Branch Target Buffer (BTB)', 'Delayed Branching'],
      rows: [
        ['Implementation Level', 'Hardware associative cache inside CPU', 'Software compiler code scheduling'],
        ['Hardware Overhead', 'Requires dedicated on-chip cache memory', 'Zero hardware overhead'],
        ['Penalty Reduction', 'Zero cycle penalty on correct branch prediction', 'Fills 1 branch stall slot with useful work'],
        ['Architecture Usage', 'Modern high-performance x86 and ARM', 'Classic RISC (MIPS, SPARC)']
      ]
    },
    examTip: 'MIPS architecture is famous for its 1-cycle Delayed Branch slot: the instruction right after JUMP always executes before the jump occurs.',
    diagram: `Without BTB: Fetch Branch -> Stall -> Stall -> Decode Target -> Fetch Target (2-cycle loss)
With BTB:    Fetch Branch -> BTB predicts Target immediately -> Fetch Target at next cycle!`
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// PART D: EXAM STRATEGY, 6 FATAL MISTAKES, REVISION TABLE & 10 QUICK MCQS
// ─────────────────────────────────────────────────────────────────────────────
export const CA_EXAM_STRATEGY = [
  {
    part: 'Part A (Register Values & RTL Traces)',
    marks: '10 Marks',
    timeAllocation: '15 Minutes',
    strategy: 'Write down cycle-by-cycle register states (AR, PC, DR, AC, IR, SC). Show exact binary or hex bit representations and cite the active control signal.'
  },
  {
    part: 'Part B (5-Mark Hardware Architecture Implementations)',
    marks: '25 Marks',
    timeAllocation: '60 Minutes',
    strategy: 'Structure every 5-mark answer with: (1) Architectural Principle [1 mark], (2) Labeled Hardware Block Diagram / RTL Equations [2.5 marks], (3) Execution Numerical / Step Table [1 mark], (4) Examiner Viva Trap [0.5 mark].'
  },
  {
    part: 'Part C (3-Mark Comparative Theory)',
    marks: '25 Marks',
    timeAllocation: '35 Minutes',
    strategy: 'Never write continuous prose paragraphs for comparisons! Always draw a structured table with 4+ comparison rows plus an ASCII block/bus diagram.'
  },
  {
    part: 'Part D (Final Verification & Numerical Proofs)',
    marks: '10 Marks',
    timeAllocation: '10 Minutes',
    strategy: 'Check binary arithmetic: 2s complement sign bits in Booths multiplication, non-restoring remainder signs, and direct-mapped cache tag/index bit additions.'
  }
];

export const CA_FATAL_MISTAKES = [
  {
    mistake: 'Forgetting that AR and PC in the Mano Basic Computer are 12 bits, NOT 16 bits.',
    consequence: 'Examiners deduct marks for improper register bit-width diagrams.',
    remedy: 'Memory capacity is 4096 words = 2^12. Therefore AR and PC are strictly 12 bits. DR, AC, IR, and TR are 16 bits.'
  },
  {
    mistake: 'Using logical shift right instead of arithmetic shift right in Booths algorithm.',
    consequence: 'Negative multipliers lose their sign bit, corrupting the entire multiplication product.',
    remedy: 'In Arithmetic Shift Right (ashr), the MSB of A duplicates itself (preserves sign: 1 stays 1, 0 stays 0).'
  },
  {
    mistake: 'Confusing Direct-Mapped Cache Line Index with Byte Offset.',
    consequence: 'Incorrect address field bit splits and erroneous cache hit calculations.',
    remedy: 'Offset = log2(Block Size in bytes). Index = log2(Total Cache Lines). Tag = Total Address - Index - Offset.'
  },
  {
    mistake: 'Assuming pipeline speedup is always strictly equal to the number of stages (k).',
    consequence: 'Flawed theoretical analysis ignoring real-world hazards and clock skew.',
    remedy: 'Speedup S = (n * k) / (k + n - 1). It only approaches k as task count n approaches infinity, and is reduced by stalls.'
  },
  {
    mistake: 'Forgetting to increment PC during the fetch phase at Clock T1.',
    consequence: 'Instruction cycle trace gets stuck in an infinite loop on instruction 0.',
    remedy: 'Clock T1 microoperations: IR <- M[AR], PC <- PC + 1. PC increments concurrently during instruction fetch.'
  },
  {
    mistake: 'Claiming that Dijkstra can be applied to computer architecture bus routing with negative weights.',
    consequence: 'Examiner penalizes algorithmic knowledge.',
    remedy: 'State that Dijkstra fails on negative edge weights; Bellman-Ford must be used.'
  }
];

export const CA_REVISION_TABLE: McqRevisionItem[] = [
  { topic: 'Mano Memory Capacity', remember: '4096 words of 16 bits each (4K x 16); 12-bit address bus' },
  { topic: 'Common Bus Multiplexer', remember: '3-to-8 line multiplexer with select lines S2, S1, S0' },
  { topic: 'Fetch Phase Clocks', remember: 'T0 (AR <- PC) and T1 (IR <- M[AR], PC <- PC + 1)' },
  { topic: 'Decode Clock', remember: 'T2 (D0..D7 <- Decode IR(12-14), AR <- IR(0-11), I <- IR(15))' },
  { topic: 'Indirect Addressing Memory Read', remember: 'T3: AR <- M[AR] (Dereferences effective address)' },
  { topic: 'Booths Bit Action 10', remember: 'Subtract multiplicand: A <- A - M, then ashr' },
  { topic: 'Booths Bit Action 01', remember: 'Add multiplicand: A <- A + M, then ashr' },
  { topic: 'Booths Bit Action 00 & 11', remember: 'Shift only: Arithmetic Shift Right (ashr A, Q, Q-1)' },
  { topic: 'Pipeline Speedup Limit', remember: 'Speedup approaches stage count k as instruction count n -> infinity' },
  { topic: 'Cache Direct Mapping', remember: 'Line = (Block) % (Number_of_Lines); simple but has conflict misses' },
  { topic: 'Cache AMAT Formula', remember: 'AMAT = Hit_Time + (Miss_Rate * Miss_Penalty)' },
  { topic: 'Write-Back Cache', remember: 'Updates RAM only when dirty line is evicted; uses Dirty Bit' },
  { topic: 'DMA Transfer Mode', remember: 'Cycle Stealing transfers 1 word per stolen memory cycle' },
  { topic: 'RISC vs CISC', remember: 'RISC is Load/Store with hardwired control; CISC has microcode ROM' },
  { topic: 'Virtual Memory EMAT', remember: 'TLB Hit = 1 memory access; TLB Miss = 2 memory accesses' },
  { topic: 'IEEE 754 Single Precision', remember: '1 bit Sign, 8 bits Biased Exponent (bias 127), 23 bits Mantissa' }
];

export const CA_QUICK_MCQS: QuickMcq[] = [
  {
    question: 'How many bits are in the Program Counter (PC) of the Mano Basic Computer?',
    answer: '12 bits',
    explanation: 'The Basic Computer has 4096 words of memory, which requires log2(4096) = 12 address bits.'
  },
  {
    question: 'In the Basic Computer, what instruction is represented by the hexadecimal opcode 0x7800?',
    answer: 'CLA (Clear Accumulator: AC <- 0)',
    explanation: 'Opcode 0111 (Register reference, I=0), bit 11 is 1 (0x7800) corresponding to Clear Accumulator.'
  },
  {
    question: 'What arithmetic operation is performed in Booths algorithm when the multiplier bit pair Q0 Q-1 is 10?',
    answer: 'A <- A - M (Subtract Multiplicand from Accumulator)',
    explanation: 'The transition from 0 to 1 moving right-to-left represents the beginning of a run of 1s.'
  },
  {
    question: 'What is the theoretical maximum speedup of a 5-stage instruction pipeline?',
    answer: '5x',
    explanation: 'As the number of instructions n approaches infinity, speedup S approaches k = 5.'
  },
  {
    question: 'Which type of cache miss is completely unavoidable even in an infinite-capacity cache?',
    answer: 'Compulsory (Cold) Miss',
    explanation: 'The very first time a block of memory is accessed, it must be brought into cache from RAM.'
  },
  {
    question: 'In a 32-bit virtual memory system with 4 KB page size, how many bits are used for the Page Offset?',
    answer: '12 bits',
    explanation: 'Page size of 4 KB = 4096 bytes = 2^12 bytes, requiring 12 offset bits.'
  },
  {
    question: 'What is the function of the Dirty Bit in a Write-Back cache?',
    answer: 'Indicates whether the cache line has been modified by the CPU',
    explanation: 'If dirty bit is 1, the line must be written back to main RAM upon eviction; if 0, it can be overwritten.'
  },
  {
    question: 'Which register stores the return address during a subroutine call (BSA) in the Basic Computer?',
    answer: 'The first memory word of the subroutine itself (M[Subroutine_Address])',
    explanation: 'BSA saves PC into M[AR] and increments AR to point to the first executable instruction.'
  },
  {
    question: 'What happens to the sign bit during an Arithmetic Shift Right (ashr)?',
    answer: 'The sign bit is preserved (copied into the next bit position)',
    explanation: 'This ensures that negative 2s complement numbers remain negative when divided by 2.'
  },
  {
    question: 'Why does DMA improve high-speed I/O performance over Interrupt-Driven I/O?',
    answer: 'Transfers bulk data directly between peripheral and RAM without CPU instruction execution',
    explanation: 'The CPU only initializes the transfer and receives an interrupt when the entire block is complete.'
  }
];
