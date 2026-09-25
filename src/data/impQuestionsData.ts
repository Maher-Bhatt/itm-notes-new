export interface ImpQuestion {
  id: string;
  unit: string;
  marks: '3 Marks' | '5 Marks' | '7 Marks' | 'General';
  question: string;
  answer: string;
  diagram?: string;
  code?: string;
  examTip?: string;
  trap?: string;
  devBrain?: string;
  keyPoints?: string[];
}

export interface CheatSheetSection {
  title: string;
  content: string;
}

export interface SubjectImpData {
  subjectId: string;
  subjectName: string;
  code: string;
  semester: number;
  badge: string;
  badgeColor: string;
  summary: string;
  totalMarks?: number;
  cheatSheet: CheatSheetSection[];
  questions: ImpQuestion[];
}

export const SUBJECT_IMP_DATA: Record<string, SubjectImpData> = {
  'ca-101': {
    subjectId: 'ca-101',
    subjectName: 'Computer Architecture',
    code: 'CS401',
    semester: 3,
    badge: 'MST Exam · 46 Qs',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    summary: 'Complete model answers for all 46 questions from the official MST question bank (218 marks total), categorized into 3-mark, 5-mark, and 7-mark sections with complete diagrams and 2-page last-night cheat sheet.',
    totalMarks: 218,
    cheatSheet: [
      {
        title: 'Basic Computer Opcodes (MRI: I=0 / I=1)',
        content: `| Symbol | Opcode (bits 14-12) | Hex (I=0) | Hex (I=1) | Operation (Execution RTL) |
| :--- | :--- | :--- | :--- | :--- |
| **AND** | 000 | 0xxx | 8xxx | \`AC <- AC AND M[AR]\` |
| **ADD** | 001 | 1xxx | 9xxx | \`AC <- AC + M[AR], E <- Cout\` |
| **LDA** | 010 | 2xxx | Axxx | \`AC <- M[AR]\` |
| **STA** | 011 | 3xxx | Bxxx | \`M[AR] <- AC\` |
| **BUN** | 100 | 4xxx | Cxxx | \`PC <- AR\` (Unconditional Branch) |
| **BSA** | 101 | 5xxx | Dxxx | \`M[AR] <- PC, PC <- AR + 1\` (Subroutine Call) |
| **ISZ** | 110 | 6xxx | Exxx | \`M[AR] <- M[AR] + 1; if(M[AR]==0) PC <- PC + 1\` |`
      },
      {
        title: 'Register-Reference & I/O Instructions Hex Codes',
        content: `**Register-Reference (Opcode = 111, I = 0):**
- **CLA (7800)**: Clear AC (\`AC <- 0\`)
- **CLE (7400)**: Clear E (\`E <- 0\`)
- **CMA (7200)**: Complement AC (\`AC <- AC'\`)
- **CME (7100)**: Complement E (\`E <- E'\`)
- **CIR (7080)**: Circulate Right AC & E
- **CIL (7040)**: Circulate Left AC & E
- **INC (7020)**: Increment AC (\`AC <- AC + 1\`)
- **SPA (7010)**: Skip next instruction if AC positive (\`AC(15) == 0\`)
- **SNA (7008)**: Skip next if AC negative (\`AC(15) == 1\`)
- **SZA (7004)**: Skip next if AC zero (\`AC == 0\`)
- **SZE (7002)**: Skip next if E is 0
- **HLT (7001)**: Halt computer (\`S <- 0\`)

**Input-Output Instructions (Opcode = 111, I = 1):**
- **INP (F800)**: Input character (\`AC(0-7) <- INPR, FGI <- 0\`)
- **OUT (F400)**: Output character (\`OUTR <- AC(0-7), FGO <- 0\`)
- **SKI (F200)**: Skip if input flag is 1 (\`if (FGI == 1) PC <- PC + 1\`)
- **SKO (F100)**: Skip if output flag is 1 (\`if (FGO == 1) PC <- PC + 1\`)
- **ION (F080)**: Interrupt Enable On (\`IEN <- 1\`)
- **IOF (F040)**: Interrupt Enable Off (\`IEN <- 0\`)`
      },
      {
        title: 'Fetch, Decode & Interrupt Cycle RTL (Memorize Verbatim)',
        content: `**Fetch & Decode Cycle (Driven by SC timing signals T0, T1, T2):**
\`\`\`text
T0: AR <- PC
T1: IR <- M[AR], PC <- PC + 1
T2: D0...D7 <- Decode IR(12-14), AR <- IR(0-11), I <- IR(15)
T3 (Indirect): If (D7' * I) then AR <- M[AR]
\`\`\`

**Interrupt Cycle (Hardware signal R = 1 when IEN * (FGI + FGO) = 1):**
\`\`\`text
RT0: AR <- 0, TR <- PC
RT1: M[AR] <- TR, PC <- 0
RT2: PC <- PC + 1, IEN <- 0, R <- 0, SC <- 0
\`\`\`
*Location 0 holds return address; Location 1 jumps to ISR; returns via \`BUN 0 I\`.*`
      },
      {
        title: 'Addressing Modes One-Line Effective Address (EA) Formulas',
        content: `1. **Immediate**: No EA. Operand is part of instruction.
2. **Direct**: \`EA = Address field\` (1 memory access).
3. **Indirect**: \`EA = M[Address field]\` (2 memory accesses).
4. **Register**: Operand is in register (0 memory accesses).
5. **Register Indirect**: \`EA = [Register]\` (1 memory access).
6. **Autoincrement / Decrement**: \`EA = [Register]\`, then \`Register <- Register +/- 1\`.
7. **Relative Addressing**: \`EA = PC + Displacement\` (Used for branches and relocatable code).
8. **Indexed Addressing**: \`EA = Index Register (XR) + Displacement\` (Used for arrays).
9. **Base Register Addressing**: \`EA = Base Register + Displacement\` (Used for OS relocation).`
      },
      {
        title: 'Formulas & Rules (Register Windows, Pipeline Speedup)',
        content: `**Overlapped Register Windows (RISC):**
- Window Size = \`L + 2C + G\` (L = Local, C = Common/Overlap, G = Global)
- Total Register File Size = \`(L + C) * W + G\` (W = Number of windows)
- Example: If G=10, L=10, C=6, W=4 -> Window = 10 + 12 + 10 = 32; Total = (10+6)*4 + 10 = 74 registers.

**Pipeline Speedup:**
- \`S = (n * tn) / ((k + n - 1) * tp)\`
- Where: k = stages, n = tasks, tp = clock cycle, tn = non-pipelined time (\`k * tp\`).
- As n -> infinity, Maximum Speedup \`S -> k\`.

**2's Complement Subtraction (A - B):**
1. Take 1's complement of B (invert bits).
2. Add 1 to get 2's complement (-B).
3. Add A + (-B).
4. Discard end carry. If carry = 1, result is positive (no borrow). If carry = 0, result is negative.`
      }
    ],
    questions: [
      // Section A: 3-Mark Questions (Q1 to Q18)
      {
        id: 'ca-q1',
        unit: 'Unit 1: Register Transfer & Micro-operations',
        marks: '3 Marks',
        question: 'Q1: Define Register Transfer Language (RTL). Explain any two RTL statements with examples.',
        answer: `**Definition:**
Register Transfer Language (RTL) is a symbolic notation used to describe precisely and briefly the micro-operations of a digital computer system, specifying how data transfers between registers and under what control conditions.

**Two RTL Statements with Examples:**
1. **Simple Transfer (\`R2 <- R1\`):**
   The contents of register R1 are copied into register R2 at the next active clock pulse. This is a non-destructive read (R1 retains its value) and destructive write (R2 is overwritten).
2. **Conditional Transfer (\`P: R2 <- R1\`):**
   The transfer occurs only if control variable P evaluates to binary 1. In hardware, control condition P is wired to the **LOAD** input of register R2.

*Other forms:*
- Simultaneous Swap: \`T: R1 <- R2, R2 <- R1\` (works simultaneously due to edge-triggered flip-flops).
- Memory Read: \`DR <- M[AR]\`.`,
        examTip: 'Always mention that RTL transfers are copy operations (R1 is not emptied) and that P drives the LOAD input.',
        devBrain: 'RTL is just assignment statements in code: P: R2 <- R1 is literally \`if (P) { R2 = R1; }\`.'
      },
      {
        id: 'ca-q2',
        unit: 'Unit 1: Register Transfer & Micro-operations',
        marks: '3 Marks',
        question: 'Q2: Differentiate between register transfer, arithmetic micro-operation, and logic micro-operation with one example each.',
        answer: `| Comparison Parameter | Register Transfer | Arithmetic Micro-operation | Logic Micro-operation |
| :--- | :--- | :--- | :--- |
| **Definition** | Moves data from one register to another without modifying the bit values. | Performs mathematical calculations (addition, subtraction, etc.) on numeric data. | Performs bitwise Boolean operations on individual bit positions independently. |
| **Hardware Used** | Common Bus, Multiplexers, Tri-state buffers, Load lines. | Binary Parallel Adder, Adder-Subtractor, Up/Down Counter. | Logic gates (AND, OR, XOR, NOT) with 4x1 multiplexers. |
| **Bit Interaction** | Bits are merely shifted/copied without interaction. | Carry propagates from bit to bit (ripple carry). | No carry between bit positions; each bit computed separately. |
| **Example** | \`R2 <- R1\` | \`R3 <- R1 + R2\` or \`R1 <- R1 + 1\` | \`R3 <- R1 XOR R2\` or \`R1 <- R1'\` |`
      },
      {
        id: 'ca-q3',
        unit: 'Unit 1: Register Transfer & Micro-operations',
        marks: '3 Marks',
        question: 'Q3: A 4-bit register contains 1011. Find the result after: (a) Logical left shift (b) Logical right shift (c) Arithmetic right shift.',
        answer: `Given initial register content: **1011** (MSB = 1, LSB = 1)

| Shift Type | Exact Operational Rule | Step-by-step Transition | Final 4-Bit Result |
| :--- | :--- | :--- | :--- |
| **(a) Logical Left Shift (\`shl\`)** | Every bit moves one place left. MSB (1) is discarded; 0 enters the LSB. | \`1011 -> [011] + 0\` | **0110** |
| **(b) Logical Right Shift (\`shr\`)** | Every bit moves one place right. LSB (1) is discarded; 0 enters the MSB. | \`1011 -> 0 + [101]\` | **0101** |
| **(c) Arithmetic Right Shift (\`ashr\`)** | Every bit moves right. LSB (1) discarded; **Sign bit (MSB=1) is preserved and duplicated**. | \`1011 -> 1 + [101]\` | **1101** |

**Crucial Exam Observation:**
In (b), logical shift turned a negative signed number into positive (1011 was -5, became +5).
In (c), arithmetic shift preserved the negative sign (1011 was -5, became 1101 which is -3 in 2's complement, correctly representing integer division by 2: floor(-5/2) = -3).`,
        examTip: 'State the numerical values before and after to fetch full bonus marks from the examiner!'
      },
      {
        id: 'ca-q4',
        unit: 'Unit 1: Register Transfer & Micro-operations',
        marks: '3 Marks',
        question: 'Q4: Perform 10110110 AND 01101101 and 10110110 XOR 01101101. Show the results.',
        answer: `Given:
- Input A = \`1011 0110\`
- Input B = \`0110 1101\`

| Bit Position | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Result |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **A** | 1 | 0 | 1 | 1 | 0 | 1 | 1 | 0 | — |
| **B** | 0 | 1 | 1 | 0 | 1 | 1 | 0 | 1 | — |
| **A AND B** | 0 | 0 | 1 | 0 | 0 | 1 | 0 | 0 | **00100100** |
| **A XOR B** | 1 | 1 | 0 | 1 | 1 | 0 | 1 | 1 | **11011011** |

- **AND Result:** \`00100100\` (Bit is 1 only when both A and B are 1). Used for **masking/clearing bits**.
- **XOR Result:** \`11011011\` (Bit is 1 when bits differ). Used for **selective complement / parity checking**.`
      },
      {
        id: 'ca-q5',
        unit: 'Unit 2: Basic Computer Organization',
        marks: '3 Marks',
        question: 'Q5: Explain the functions of AR, PC, IR, DR, and AC in a basic computer.',
        answer: `| Register Symbol | Name | Bit Length | Primary Architectural Function |
| :--- | :--- | :---: | :--- |
| **AR** | Address Register | 12 bits | Holds the memory address (0 to 4095) for read/write operations. Memory address bus is wired directly to AR. |
| **PC** | Program Counter | 12 bits | Holds the address of the next instruction to be fetched from memory. Automatically incremented (\`PC <- PC + 1\`) during fetch. |
| **IR** | Instruction Register | 16 bits | Holds the 16-bit instruction code just read from memory. Opcode (bits 14-12) feeds the control decoder. |
| **DR** | Data Register | 16 bits | Holds the 16-bit operand read from memory or data to be written; serves as one input of the ALU. |
| **AC** | Accumulator | 16 bits | The general-purpose CPU processing register. Serves as the second operand to the ALU and stores all calculation results. |`
      },
      {
        id: 'ca-q6',
        unit: 'Unit 2: Basic Computer Organization',
        marks: '3 Marks',
        question: 'Q6: Explain the three major phases of an instruction cycle.',
        answer: `The instruction cycle is the fundamental loop executed continuously by the control unit:

1. **Fetch Phase:**
   The instruction whose address is in the Program Counter (PC) is fetched from memory and loaded into the Instruction Register (IR). Concurrently, PC is incremented:
   \`\`\`text
   T0: AR <- PC
   T1: IR <- M[AR], PC <- PC + 1
   \`\`\`
2. **Decode Phase:**
   The 3-bit opcode in IR(14-12) is decoded by a 3x8 decoder into signals D0 through D7. Address bits IR(0-11) are transferred to AR, and the mode bit IR(15) is latched into flip-flop I:
   \`\`\`text
   T2: D0...D7 <- Decode IR(12-14), AR <- IR(0-11), I <- IR(15)
   \`\`\`
3. **Execute Phase:**
   If the instruction is indirect (\`D7' * I = 1\`), effective address is read at T3 (\`AR <- M[AR]\`). The micro-operations corresponding to the instruction are then executed at T4, T5, T6. At the conclusion, Sequence Counter SC is cleared to 0 (\`SC <- 0\`) to initiate the next fetch.`
      },
      {
        id: 'ca-q7',
        unit: 'Unit 2: Basic Computer Organization',
        marks: '3 Marks',
        question: 'Q7: Explain memory-reference instructions with any three suitable examples.',
        answer: `A Memory-Reference Instruction (MRI) uses a 12-bit address field to specify an operand residing in memory. Bits 14-12 contain opcode 000 through 110, and bit 15 (I) indicates direct (\`I=0\`) or indirect (\`I=1\`) addressing.

**Three Representative Examples:**
1. **LDA (Load to AC - Opcode 010):**
   Reads a 16-bit word from memory location AR into DR, then copies DR into AC:
   - RTL: \`D2T4: DR <- M[AR]\` followed by \`D2T5: AC <- DR, SC <- 0\`
   - Hex code with I=0: \`2xxx\`
2. **STA (Store AC to Memory - Opcode 011):**
   Writes the contents of AC into memory at location AR:
   - RTL: \`D3T4: M[AR] <- AC, SC <- 0\`
   - Hex code with I=0: \`3xxx\`
3. **ADD (Add to AC - Opcode 001):**
   Reads operand into DR, adds it to AC, and places carry-out into flip-flop E:
   - RTL: \`D1T4: DR <- M[AR]\` followed by \`D1T5: AC <- AC + DR, E <- Cout, SC <- 0\`
   - Hex code with I=0: \`1xxx\``
      },
      {
        id: 'ca-q8',
        unit: 'Unit 2 & Unit 5: Interrupts',
        marks: '3 Marks',
        question: 'Q8: Differentiate between hardware interrupt and software interrupt.',
        answer: `| Feature | Hardware Interrupt | Software Interrupt |
| :--- | :--- | :--- |
| **Origin / Trigger** | Initiated by external electrical signal from I/O device, timer, or power monitor. | Initiated intentionally by executing a program instruction (e.g., \`INT 21h\` or \`syscall\`). |
| **Timing Nature** | **Asynchronous** — can occur at any unexpected clock cycle independent of instruction stream. | **Synchronous** — occurs at fixed, deterministic execution points in code. |
| **Purpose** | Service high-speed or slow asynchronous peripherals (printer ready, keystroke, packet arrival). | Request Operating System kernel services, system calls, or switch from user to supervisor mode. |
| **Maskability** | Can be masked/disabled by clearing Interrupt Enable (\`IEN <- 0\`). | Non-maskable; execution of the instruction directly invokes the trap handler. |`
      },
      {
        id: 'ca-q9',
        unit: 'Unit 3: Programming the Basic Computer',
        marks: '3 Marks',
        question: 'Q9: Differentiate between machine language and assembly language.',
        answer: `| Parameter | Machine Language | Assembly Language |
| :--- | :--- | :--- |
| **Representation** | Raw binary bits (\`0010 0000 0000 0100\`) or hexadecimal digits (\`2004h\`). | Mnemonic opcodes and symbolic labels (\`LDA SUB\`, \`ADD NBR\`). |
| **Human Readability** | Extremely difficult for humans to read, write, or debug. | High readability; uses recognizable English-like mnemonics. |
| **Translation** | Directly executable by CPU hardware without any translation. | Requires a software translator called an **Assembler** to generate binary. |
| **Address Handling** | Programmer must manually compute and hardcode absolute physical addresses. | Programmer uses symbolic labels (\`LOOP,\`, \`SUM\`); assembler calculates addresses. |
| **Error Proneness** | Very high probability of bit transposition and address mistakes. | Much lower error rate; assembler catches syntax and undefined symbols. |`
      },
      {
        id: 'ca-q10',
        unit: 'Unit 3: Programming the Basic Computer',
        marks: '3 Marks',
        question: 'Q10: What is a subroutine? Explain its two major advantages in assembly language programming.',
        answer: `**Definition:**
A subroutine is a self-contained sequence of instructions designed to perform a specific, frequently needed task. The main program branches to the subroutine using a call instruction (\`BSA SUB\`), executes the task, and returns back to the instruction immediately following the call (\`BUN SUB I\`).

**Two Major Advantages:**
1. **Code Reusability and Memory Conservation:**
   Instead of repeating the same 20 instructions at five different locations in memory, the code is written once. Each caller simply executes a 1-word \`BSA\` call, drastically saving precious memory.
2. **Modularity and Maintainability:**
   Large complex systems are decomposed into small, isolated, independently testable functional blocks. Debugging is simplified, and optimizing a subroutine automatically improves the entire program.`
      },
      {
        id: 'ca-q11',
        unit: 'Unit 4: Microprogrammed Control',
        marks: '3 Marks',
        question: 'Q11: What is control memory? Why is it required in a microprogrammed control unit?',
        answer: `**What is Control Memory?**
Control Memory is a dedicated high-speed read-only storage unit (usually ROM) situated inside the CPU control unit that stores the microprogram—the collection of control words (microinstructions) that dictate the micro-operations of the processor.

**Why is it Required?**
1. **Elimination of Complex Random Logic:** In hardwired control, hundreds of logic gates, decoders, and flip-flops must be custom-wired. Control memory replaces this messy hardware with a clean lookup table.
2. **Design Flexibility:** Adding a new machine instruction or fixing an architectural bug requires only updating words in control memory (firmware update), requiring zero physical rewiring.
3. **Systematic Sequencing:** It allows microinstructions to execute sequentially or branch based on processor condition flags using a simple Control Address Register (CAR).`
      },
      {
        id: 'ca-q12',
        unit: 'Unit 4: Microprogrammed Control',
        marks: '3 Marks',
        question: 'Q12: Explain the functions of CAR and control memory in a microprogrammed control unit.',
        answer: `| Component | Full Name | Primary Architectural Function |
| :--- | :--- | :--- |
| **CAR** | Control Address Register | Functions as the **Program Counter of the microprogram**. It holds the 7-bit address of the next microinstruction to be read from control memory. It is updated by the sequencer via increment, branch, opcode mapping, or subroutine return. |
| **Control Memory** | Microprogram ROM | High-speed ROM (typically 128 words x 20 bits) storing the microroutines. Given the address held in CAR, it outputs the 20-bit microinstruction into the Control Data Register. |

**Interaction Cycle:**
\`CAR provides Address -> Control Memory outputs Microinstruction -> Datapath executes Micro-operations & Sequencer calculates next CAR value.\``
      },
      {
        id: 'ca-q13',
        unit: 'Unit 4: Microprogrammed Control',
        marks: '3 Marks',
        question: 'Q13: Differentiate between hardwired and microprogrammed control in any three points.',
        answer: `| Characteristic | Hardwired Control Unit | Microprogrammed Control Unit |
| :--- | :--- | :--- |
| **Hardware Implementation** | Built physically with logic gates, multiplexers, decoders, and flip-flops. | Built with Control Memory (ROM), Control Address Register (CAR), and Sequencer. |
| **Speed** | **Extremely Fast** — signals propagate at gate-delay speeds with no memory reads. | **Slower** — each micro-operation step requires a memory read access to control ROM. |
| **Flexibility / Modification** | **Inflexible** — any change requires physical circuit redesign and PCB rewiring. | **Highly Flexible** — modifications only require rewriting the microprogram code in ROM. |
| **Typical Usage** | RISC processors (ARM, MIPS, RISC-V) where instruction simplicity and speed are paramount. | CISC processors (x86, IBM Mainframes) with complex multi-step instructions. |`
      },
      {
        id: 'ca-q14',
        unit: 'Unit 5: Central Processing Unit',
        marks: '3 Marks',
        question: 'Q14: Define effective address. Find the effective address if R1 = 500 and the displacement is 250 in indexed addressing.',
        answer: `**Definition:**
The **Effective Address (EA)** is the actual physical address in main memory where the desired operand resides, computed after applying the specific addressing mode calculation on the instruction's address field.

**Numerical Solution:**
- Given: Index Register \`R1 = 500\`
- Address field / Displacement = \`250\`
- Addressing Mode: **Indexed Addressing**

$$\\text{Effective Address (EA)} = \\text{Displacement} + \\text{Content of Index Register}$$
$$\\text{EA} = 250 + 500 = 750$$

**Final Answer:**
The Effective Address is **750**. The CPU accesses memory word \`M[750]\` to retrieve the operand.`
      },
      {
        id: 'ca-q15',
        unit: 'Unit 5: Central Processing Unit',
        marks: '3 Marks',
        question: 'Q15: Explain immediate, direct and indirect addressing modes with examples.',
        answer: `Assume memory contents: \`M[300] = 1350\`, \`M[1350] = 45\`, and instruction address field is **300**.

| Mode | Definition | Effective Address (EA) | Value Loaded into AC | Memory Accesses |
| :--- | :--- | :---: | :---: | :---: |
| **Immediate** | The address field contains the operand itself; no memory lookup. | None | **300** | 0 |
| **Direct** | The address field contains the physical address of operand. | \`EA = 300\` | \`M[300] = 1350\` | 1 |
| **Indirect** | The address field points to a memory word that contains the address of the operand. | \`EA = M[300] = 1350\` | \`M[1350] = 45\` | 2 |

*Code Analogy:*
- Immediate: \`x = 300\` (literal constant)
- Direct: \`x = var\` (read variable)
- Indirect: \`x = *ptr\` (dereference pointer)`
      },
      {
        id: 'ca-q16',
        unit: 'Unit 5: Central Processing Unit',
        marks: '3 Marks',
        question: 'Q16: Differentiate between register stack and memory stack.',
        answer: `| Basis | Register Stack | Memory Stack |
| :--- | :--- | :--- |
| **Physical Location** | Built from a fixed collection of high-speed CPU registers (e.g., 64 registers). | Allocated in a reserved partition of main computer memory (RAM). |
| **Access Speed** | **Ultra Fast** — zero memory bus accesses; works at processor clock speed. | **Slower** — each PUSH/POP requires a full RAM read/write bus cycle. |
| **Capacity** | Fixed and strictly limited by CPU silicon area (e.g., 64 words). | Vast and dynamically resizable, bounded only by overall system RAM. |
| **Stack Growth** | Stack Pointer (SP) **increments** on PUSH (\`SP <- SP + 1\`). | Stack Pointer (SP) **decrements** on PUSH (\`SP <- SP - 1\`). |
| **Status Flags** | Hardware FULL and EMTY 1-bit flags detect overflow/underflow. | Memory limit registers (\`Stack Limit\`) checked by OS to prevent overflow. |`
      },
      {
        id: 'ca-q17',
        unit: 'Unit 5: Central Processing Unit',
        marks: '3 Marks',
        question: 'Q17: Explain zero-address and one-address instruction formats with examples.',
        answer: `| Format | Operand Specification | How X = A + B is Evaluated | Hardware Architecture |
| :--- | :--- | :--- | :--- |
| **Zero-Address** | Uses **no address field** in arithmetic opcodes. Operands are implicitly retrieved from the **Top of Stack (TOS)**. | \`\`\`text\nPUSH A\nPUSH B\nADD\nPOP X\n\`\`\` | Stack-organized computer |
| **One-Address** | Uses **one address field**. The second operand and destination are implicitly the **Accumulator (AC)**. | \`\`\`text\nLOAD A    ; AC <- M[A]\nADD B     ; AC <- AC + M[B]\nSTORE X   ; M[X] <- AC\n\`\`\` | Accumulator-based computer |`
      },
      {
        id: 'ca-q18',
        unit: 'Unit 5: Central Processing Unit',
        marks: '3 Marks',
        question: 'Q18: State any three important differences between RISC and CISC architectures.',
        answer: `| Basis of Comparison | RISC (Reduced Instruction Set Computer) | CISC (Complex Instruction Set Computer) |
| :--- | :--- | :--- |
| **Instruction Set & Format** | Small set of simple, fixed-length instructions (e.g., all 32-bit); easy to decode. | Large set (100–300) of complex, variable-length instructions; multi-byte decoding. |
| **Memory Access** | **Strictly LOAD and STORE only**. All arithmetic is register-to-register. | Many arithmetic instructions can manipulate memory operands directly (e.g., \`ADD [BX], AX\`). |
| **Execution Cycle** | Single-cycle instruction execution facilitated by pipelining. | Multi-cycle instruction execution; microprogrammed control unit. |
| **Commercial Examples** | ARM (Apple Silicon, Android phones), MIPS, RISC-V. | Intel x86 (Core i3/i5/i7/i9), AMD Ryzen. |`
      },

      // Section B: 5-Mark Questions (Selected crucial ones)
      {
        id: 'ca-q19',
        unit: 'Unit 1: Register Transfer & Micro-operations',
        marks: '5 Marks',
        question: 'Q19: Explain Register Transfer Language and common bus system with a suitable diagram and RTL examples.',
        answer: `### 1. Register Transfer Language (RTL)
RTL is a symbolic formalism used to specify the microscopic operations occurring within CPU registers during clock cycles.
- Capital letters designate registers (\`AR, PC, DR, AC, R1\`).
- Left-pointing arrow (\`<-\`) signifies transfer of information.
- A colon (\`:\`) designates a control precondition: \`P: R2 <- R1\` indicates that if control variable \`P = 1\`, the contents of R1 are loaded into R2 on the next clock pulse.
- Commas designate concurrency: \`T: R1 <- R2, R2 <- R1\` represents simultaneous register swap.

### 2. Common Bus System (Using 4x1 Multiplexers)
To prevent quadratic wiring explosion ($n(n-1)$ point-to-point connections), all registers connect to a shared data highway called the **Common Bus**.

\`\`\`text
   +--------+      +--------+      +--------+      +--------+
   |   R0   |      |   R1   |      |   R2   |      |   R3   | (4 registers)
   +----+---+      +----+---+      +----+---+      +----+---+
        |               |               |               |
     [Line 0]        [Line 1]        [Line 2]        [Line 3]
        |               |               |               |
        +---------------+-------+-------+---------------+
                                |
                   +--------------------------+
                   |  4x1 Multiplexers (4 MUX)|  <-- Select lines S1, S0
                   +------------+-------------+
                                |
                         [ 4-Bit Bus Lines ]
                                |
             +------------------+------------------+
             |                  |                  |
           LD(R0)             LD(R1)             LD(R2) ...
\`\`\`

**Function of Select Lines ($S_1, S_0$):**
| $S_1$ | $S_0$ | Register Selected to Drive Bus |
| :---: | :---: | :--- |
| 0 | 0 | **R0** drives the bus |
| 0 | 1 | **R1** drives the bus |
| 1 | 0 | **R2** drives the bus |
| 1 | 1 | **R3** drives the bus |

**Two-Step Transfer Execution:**
1. **Bus Read:** Select lines $S_1 S_0$ place the source register's contents onto the bus wires.
2. **Bus Write:** The destination register's **LD (Load)** control line is asserted high ($1$), latching the bus data on the clock edge.`,
        examTip: 'State the multiplexer sizing rule: For n registers of k bits each, you require k multiplexers of size n x 1, with log2(n) select lines.'
      },
      {
        id: 'ca-q21',
        unit: 'Unit 1: Register Transfer & Micro-operations',
        marks: '5 Marks',
        question: "Q21: Given R1 = 10110101 and R2 = 00111011, perform: (a) R1 + R2 (b) R1 - R2 using 2's complement (c) R1 AND R2 (d) R1 XOR R2.",
        answer: `Given:
- \`R1 = 1011 0101\` (Decimal unsigned: 181; Signed 2's comp: -75)
- \`R2 = 0011 1011\` (Decimal unsigned: 59; Signed 2's comp: +59)

---

### (a) Addition: R1 + R2
\`\`\`text
    Carry:   0 1 1 1   0 1 1 1
       R1:   1 0 1 1   0 1 0 1  (181)
     + R2:   0 0 1 1   1 0 1 1  ( 59)
   ---------------------------
      Sum:   1 1 1 1   0 0 0 0  (240 in decimal)
\`\`\`
- **Result:** \`1111 0000\`
- **End Carry:** \`0\`

---

### (b) Subtraction: R1 - R2 using 2's Complement
To calculate $R1 - R2 = R1 + (-R2)$:
1. Find 1's complement of R2 (\`0011 1011\`):
   \`1's complement = 1100 0100\`
2. Add 1 to get 2's complement:
   \`2's complement (-R2) = 1100 0101\`
3. Add R1 and (-R2):
\`\`\`text
    Carry: 1 1 1 1 1   0 1 0 1
       R1:   1 0 1 1   0 1 0 1  (181)
   + (-R2):  1 1 0 0   0 1 0 1  (-59)
   ---------------------------
    Carry: 1 | 0 1 1 1   1 0 1 0
\`\`\`
4. Discard the end carry:
   - **Result:** \`0111 1010\` (Decimal: 122; $181 - 59 = 122$ ✓)
   - **End Carry = 1:** Signifies that no borrow occurred and the result is positive.

---

### (c) Bitwise Logic: R1 AND R2 and (d) R1 XOR R2
| Bit Position | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | Binary Value |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **R1** | 1 | 0 | 1 | 1 | 0 | 1 | 0 | 1 | \`10110101\` |
| **R2** | 0 | 0 | 1 | 1 | 1 | 0 | 1 | 1 | \`00111011\` |
| **R1 AND R2** | 0 | 0 | 1 | 1 | 0 | 0 | 0 | 1 | **\`00110001\`** |
| **R1 XOR R2** | 1 | 0 | 0 | 0 | 1 | 1 | 1 | 0 | **\`10001110\`** |`,
        examTip: 'Always mention that in unsigned subtraction, End Carry = 1 means No Borrow (A >= B).'
      },
      {
        id: 'ca-q23',
        unit: 'Unit 2: Basic Computer Organization',
        marks: '5 Marks',
        question: 'Q23: Explain the complete fetch and decode cycle of a basic computer with timing diagrams and RTL.',
        answer: `### Complete Fetch & Decode Cycle
Every instruction cycle begins with the Fetch and Decode routines, controlled by the 4-bit Sequence Counter (SC) generating timing signals $T_0, T_1, T_2$. These states execute only when interrupt flip-flop $R = 0$ ($R' T_0, R' T_1, R' T_2$).

\`\`\`text
           +---------------------------------------------+
           | T0: AR <- PC                                |
           +----------------------+----------------------+
                                  |
           +----------------------v----------------------+
           | T1: IR <- M[AR], PC <- PC + 1               |
           +----------------------+----------------------+
                                  |
           +----------------------v----------------------+
           | T2: D0...D7 <- Decode IR(12-14),            |
           |     AR <- IR(0-11), I <- IR(15)             |
           +----------------------+----------------------+
                                  |
                     +------------v------------+
                     | Is D7 = 0? (MRI vs Non) |
                     +------------+------------+
                        /                    \\
               (Yes: MRI)                    (No: Reg/IO)
                  /                                \\
         +-------v-------+                 +--------v--------+
         | Check I bit   |                 | Check I bit     |
         | I=1: AR<-M[AR]|                 | I=0: Reg-Ref    |
         | I=0: Nothing  |                 | I=1: I/O-Ref    |
         +---------------+                 +-----------------+
\`\`\`

### Detailed RTL Micro-operations:
1. **Timing State $T_0$:**
   $$\\mathbf{R\' T_0: AR \\leftarrow PC}$$
   - **Bus Action:** $S_2 S_1 S_0 = 010$ (puts PC onto common bus).
   - **Register Action:** \`LD(AR) = 1\`. AR now holds the exact memory address of instruction.

2. **Timing State $T_1$:**
   $$\\mathbf{R\' T_1: IR \\leftarrow M[AR], \\; PC \\leftarrow PC + 1}$$
   - **Bus Action:** $S_2 S_1 S_0 = 111$ (Memory read). \`Read = 1\`, \`LD(IR) = 1\`.
   - **Counter Action:** \`INR(PC) = 1\`. PC is incremented to point to next instruction.

3. **Timing State $T_2$:**
   $$\\mathbf{R\' T_2: D_0 \\dots D_7 \\leftarrow \\text{Decode } IR(12-14), \\; AR \\leftarrow IR(0-11), \\; I \\leftarrow IR(15)}$$
   - 3x8 Decoder converts 3 opcode bits into one active-high signal $D_0$ through $D_7$.
   - Lower 12 bits transferred to AR in anticipation of operand fetching.
   - Bit 15 loaded into mode flip-flop I.

4. **Timing State $T_3$ (Indirect Evaluation):**
   - If Memory-Reference and Indirect ($D_7' I = 1$):
     $$\\mathbf{D_7\' I T_3: AR \\leftarrow M[AR]}$$
   - If Memory-Reference and Direct ($D_7' I' = 1$): No action; AR already holds effective address.`
      },

      // Section C: 7-Mark Questions
      {
        id: 'ca-q35',
        unit: 'Unit 1 & Unit 5: Computer Arithmetic & CPU',
        marks: '7 Marks',
        question: "Q35: Given R1 = 10101101 and R2 = 01010111, perform: (a) R3 <- R1 + R2 (b) R4 <- R1 - R2 using 2's complement (c) R5 <- R1 AND R2 (d) Logical left shift of R1 by 2 positions (e) Arithmetic right shift of R2 by 2 positions. Identify the type of micro-operation in each case.",
        answer: `Given:
- \`R1 = 1010 1101\` (Unsigned: 173; Signed: -83)
- \`R2 = 0101 0111\` (Unsigned: 87; Signed: +87)

---

### (a) Addition: \`R3 <- R1 + R2\` (Arithmetic Micro-operation)
\`\`\`text
    Carry: 1 1 1 1   1 1 1 1
       R1:   1 0 1 0   1 1 0 1  (173)
     + R2:   0 1 0 1   0 1 1 1  ( 87)
   ---------------------------
      Sum: 1 | 0 0 0 0   0 1 0 0  (260)
\`\`\`
- **R3 (8 bits):** \`0000 0100\`
- **Carry-out ($C_{out} / E$):** \`1\`

---

### (b) Subtraction: \`R4 <- R1 - R2\` via 2's Complement (Arithmetic Micro-operation)
1. 1's complement of R2 (\`0101 0111\`) = \`1010 1000\`
2. 2's complement of R2 (-R2) = \`1010 1001\`
3. Add R1 + (-R2):
\`\`\`text
    Carry: 1 0 0 0   1 1 0 1
       R1:   1 0 1 0   1 1 0 1  (173)
   + (-R2):  1 0 1 0   1 0 0 1  (-87)
   ---------------------------
   Carry:  1 | 0 1 0 1   0 1 1 0
\`\`\`
- Discard end carry: **R4 = \`0101 0110\`** (Decimal: 86; $173 - 87 = 86$ ✓).

---

### (c) Bitwise Logic: \`R5 <- R1 AND R2\` (Logic Micro-operation)
\`\`\`text
     R1: 1 0 1 0   1 1 0 1
     R2: 0 1 0 1   0 1 1 1
   -----------------------
     R5: 0 0 0 0   0 1 0 1  -> 00000101
\`\`\`

---

### (d) Logical Left Shift of R1 by 2 positions (\`shl 2\`) (Shift Micro-operation)
- Original: \`1010 1101\`
- Shift 1: \`0101 1010\`
- Shift 2: \`1011 0100\`
- **Result:** \`1011 0100\` (Leftmost two bits '10' discarded; two '00's enter LSB).

---

### (e) Arithmetic Right Shift of R2 by 2 positions (\`ashr 2\`) (Shift Micro-operation)
- Original R2: \`0101 0111\` (Sign bit MSB = 0)
- Shift 1: \`0010 1011\` (Sign bit 0 copied)
- Shift 2: \`0001 0101\` (Sign bit 0 copied)
- **Result:** \`0001 0101\` (Rightmost two bits '11' discarded; sign bit 0 replicated twice).

---

### Summary Table:
| Part | Operation | Result | Micro-operation Category |
| :---: | :--- | :---: | :--- |
| **(a)** | $R_3 \leftarrow R_1 + R_2$ | \`0000 0100\` (Carry=1) | Arithmetic Micro-operation |
| **(b)** | $R_4 \leftarrow R_1 - R_2$ | \`0101 0110\` | Arithmetic Micro-operation |
| **(c)** | $R_5 \leftarrow R_1 \wedge R_2$ | \`0000 0101\` | Logic Micro-operation |
| **(d)** | \`shl 2\` of $R_1$ | \`1011 0100\` | Shift Micro-operation |
| **(e)** | \`ashr 2\` of $R_2$ | \`0001 0101\` | Shift Micro-operation |`
      },
      {
        id: 'ca-q40',
        unit: 'Unit 3: Programming the Basic Computer',
        marks: '7 Marks',
        question: 'Q40: Write an assembly language program/algorithm to add N numbers stored in consecutive memory locations. Explain initialization, memory addressing, loop counter, accumulation, loop termination and result storage.',
        answer: `### Assembly Program to Add 100 Numbers
The basic computer has no dedicated loop instruction. Therefore, loops are synthesized using:
- **ISZ** (Increment and Skip if Zero) as the loop counter.
- **BUN** (Branch Unconditional) to jump back to the start of the loop.
- **Indirect Addressing** (\`ADD PTR I\`) to walk linearly through the array pointer.

\`\`\`assembly
        ORG 100         / Origin of program is location (hex) 100
        LDA ADS         / Load start address of array (150)
        STA PTR         / Store into pointer variable PTR
        LDA NBR         / Load constant -100 into AC
        STA CTR         / Initialize loop counter CTR with -100
        CLA             / Clear AC (Accumulator = 0 running sum)
LOP,    ADD PTR I       / Add number pointed to by PTR (Indirect Addressing!)
        ISZ PTR         / Increment pointer to point to next array element
        ISZ CTR         / Increment counter; skip next instruction if CTR becomes 0
        BUN LOP         / Counter not zero: repeat loop!
        STA SUM         / Loop finished: store calculated total into SUM
        HLT             / Halt computer

ADS,    HEX 150         / Address of first element of 100 numbers
PTR,    HEX 0           / Pointer variable (stores memory address)
NBR,    DEC -100        / Negative loop count constant (-100)
CTR,    HEX 0           / Counter variable
SUM,    HEX 0           / Variable where final sum is saved

        ORG 150         / Array data begins at hex 150
        DEC 75          / First number
        DEC 23          / Second number
        ...
        END             / End of assembly program
\`\`\`

### Detailed Breakdown of Sections:
1. **Initialization (lines 100–104):**
   Sets up pointers and counters. Pointer \`PTR\` is loaded with base address \`150\`. Counter \`CTR\` is initialized with negative count \`-100\`. AC is cleared to zero (\`CLA\`).
2. **Memory Addressing (\`ADD PTR I\`):**
   Uses bit 15 = 1 (Indirect mode). The CPU reads \`PTR\`, uses its value as an address, and accesses that array slot in memory.
3. **Loop Counter & Step (\`ISZ PTR\` & \`ISZ CTR\`):**
   \`ISZ PTR\` advances the pointer to the next word. \`ISZ CTR\` increments the negative counter towards zero (e.g., -100, -99, ... -1, 0).
4. **Loop Termination:**
   When \`CTR\` reaches 0, \`ISZ CTR\` skips the next instruction (\`BUN LOP\`), dropping execution straight into \`STA SUM\`.
5. **Result Storage:**
   \`STA SUM\` writes the accumulated total from AC into variable \`SUM\`.`
      },
      {
        id: 'ca-q42',
        unit: 'Unit 5: Central Processing Unit',
        marks: '7 Marks',
        question: 'Q42: Explain General Register Organization with a suitable diagram. Show the sequence of control operations required to execute R3 <- R1 + R2. Clearly identify source registers, destination register, bus and ALU operations.',
        answer: `### General Register Organization
In a modern CPU datapath, multiple general-purpose registers ($R_1$ to $R_7$) are interconnected via two multiplexers to an Arithmetic Logic Unit (ALU), with results written back via a 3x8 destination decoder.

\`\`\`text
   +--------------------------------------------------------------+
   |                        Output Bus                            |
   +-----+--------+--------+--------+--------+--------+--------+--+
         |        |        |        |        |        |        |
         v        v        v        v        v        v        v
      +----+   +----+   +----+   +----+   +----+   +----+   +----+
      | R1 |   | R2 |   | R3 |   | R4 |   | R5 |   | R6 |   | R7 |
      +--+-+   +--+-+   +--+-+   +--+-+   +--+-+   +--+-+   +--+-+
         |        |        |        |        |        |        |
         +--------+--------+--------+--------+--------+--------+
         |                                                     |
         v                                                     v
   +-----------+                                         +-----------+
   |   MUX A   | (Select SELA)                           |   MUX B   | (Select SELB)
   +-----+-----+                                         +-----+-----+
         |                                                     |
     [ A Bus ]                                             [ B Bus ]
         |                                                     |
         +-----------------------+   +-------------------------+
                                 |   |
                                 v   v
                             +-----------+
                             |    ALU    |  <-- Operation Select (OPR)
                             +-----+-----+
                                   |
                             +-----v-----+
                             |  Decoder  |  <-- Destination Select (SELD)
                             +-----------+
\`\`\`

### 14-Bit Control Word Format:
$$\\mathbf{\\text{Control Word} = \\text{SELA (3 bits)} \\; | \\; \\text{SELB (3 bits)} \\; | \\; \\text{SELD (3 bits)} \\; | \\; \\text{OPR (5 bits)}}$$

### Executing $R_3 \leftarrow R_1 + R_2$:
| Step | Field | Binary Value | Function |
| :---: | :--- | :---: | :--- |
| **1** | **SELA** | \`001\` | MUX A selects register $R_1$ to drive the internal **A Bus**. |
| **2** | **SELB** | \`010\` | MUX B selects register $R_2$ to drive the internal **B Bus**. |
| **3** | **OPR** | \`00010\` | ALU executes the **ADD** operation ($A + B$) and presents sum on output bus. |
| **4** | **SELD** | \`011\` | 3x8 Decoder enables the **Load line of $R_3$**, latching the sum at clock edge. |

**Final Encoded 14-bit Control Word:**
$$\\mathbf{001 \\; 010 \\; 011 \\; 00010}$$
*All four operations occur simultaneously within one single clock pulse!*`
      },
      {
        id: 'ca-q44',
        unit: 'Unit 5: Central Processing Unit',
        marks: '7 Marks',
        question: 'Q44: Explain zero-address, one-address, two-address and three-address instruction formats with suitable examples. Then explain how X = (A + B) * (C - D) could be evaluated using different instruction formats.',
        answer: `### Evaluation of $X = (A + B) \\times (C - D)$

#### 1. Three-Address Instructions (Register-to-Register / Memory)
*Format: \`OP Dest, Src1, Src2\`*
\`\`\`assembly
ADD R1, A, B        ; R1 <- M[A] + M[B]
SUB R2, C, D        ; R2 <- M[C] - M[D]
MUL X,  R1, R2      ; M[X] <- R1 * R2
\`\`\`
- **Instruction Count:** 3 (Shortest program, but longest bit-width per instruction).

#### 2. Two-Address Instructions
*Format: \`OP Dest, Src\` (Destination is overwritten)*
\`\`\`assembly
MOV R1, A           ; R1 <- M[A]
ADD R1, B           ; R1 <- R1 + M[B]
MOV R2, C           ; R2 <- M[C]
SUB R2, D           ; R2 <- R2 - M[D]
MUL R1, R2          ; R1 <- R1 * R2
MOV X,  R1          ; M[X] <- R1
\`\`\`
- **Instruction Count:** 6.

#### 3. One-Address Instructions (Accumulator Architecture)
*Format: \`OP Address\` (Implicit AC)*
\`\`\`assembly
LOAD A              ; AC <- M[A]
ADD  B              ; AC <- AC + M[B]
STORE T             ; M[T] <- AC (T is temp memory variable)
LOAD C              ; AC <- M[C]
SUB  D              ; AC <- AC - M[D]
MUL  T              ; AC <- AC * M[T]
STORE X             ; M[X] <- AC
\`\`\`
- **Instruction Count:** 7.

#### 4. Zero-Address Instructions (Stack Architecture / RPN)
*First convert to Postfix (RPN): \`A B + C D - *\`*
\`\`\`assembly
PUSH A              ; TOS <- A
PUSH B              ; TOS <- B
ADD                 ; TOS <- (A + B)
PUSH C              ; TOS <- C
PUSH D              ; TOS <- D
SUB                 ; TOS <- (C - D)
MUL                 ; TOS <- (A + B) * (C - D)
POP  X              ; M[X] <- TOS
\`\`\`
- **Instruction Count:** 8.`
      }
    ]
  },

  // ── DATA STRUCTURES & ALGORITHMS ──────────────────────────────────────────
  'sem3-dsa': {
    subjectId: 'sem3-dsa',
    subjectName: 'Data Structures and Algorithms (DSA)',
    code: 'DSA301',
    semester: 3,
    badge: 'Exam Bank · All 6 Units',
    badgeColor: 'bg-green-500/10 text-green-600 dark:text-green-400',
    summary: 'Comprehensive exam question bank covering Complexity Analysis, Linked Lists, Stacks, Queues, Binary Search Trees, AVL rotations, Graphs (Dijkstra, Kruskal, Prim), and Hashing with complete C implementations.',
    cheatSheet: [
      {
        title: 'Time & Space Complexities Master Table',
        content: `| Algorithm / Data Structure | Best Time | Average Time | Worst Time | Worst Space |
| :--- | :---: | :---: | :---: | :---: |
| **Array Access / Update** | $O(1)$ | $O(1)$ | $O(1)$ | $O(1)$ |
| **Singly Linked List Search** | $O(1)$ | $O(n)$ | $O(n)$ | $O(1)$ |
| **Singly Linked List Insert (Head)** | $O(1)$ | $O(1)$ | $O(1)$ | $O(1)$ |
| **Stack (Push / Pop)** | $O(1)$ | $O(1)$ | $O(1)$ | $O(1)$ |
| **Queue (Enqueue / Dequeue)** | $O(1)$ | $O(1)$ | $O(1)$ | $O(1)$ |
| **Binary Search Tree (BST)** | $O(\\log n)$ | $O(\\log n)$ | $O(n)$ (Skewed) | $O(n)$ |
| **AVL Tree (Self-balancing)** | $O(\\log n)$ | $O(\\log n)$ | $O(\\log n)$ | $O(n)$ |
| **Linear Search** | $O(1)$ | $O(n)$ | $O(n)$ | $O(1)$ |
| **Binary Search** | $O(1)$ | $O(\\log n)$ | $O(\\log n)$ | $O(1)$ |
| **Bubble / Insertion / Selection Sort** | $O(n)$ / $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ |
| **Merge Sort** | $O(n \\log n)$ | $O(n \\log n)$ | $O(n \\log n)$ | $O(n)$ |
| **Quick Sort** | $O(n \\log n)$ | $O(n \\log n)$ | $O(n^2)$ | $O(\\log n)$ |`
      },
      {
        title: 'AVL Tree Rotations Cheat Sheet',
        content: `**Balance Factor (BF)** = $\\text{Height}(Left) - \\text{Height}(Right) \\in \\{-1, 0, +1\\}$

- **LL Imbalance (Left-Left):** Node has BF = +2, left child has BF = +1. **Fix: Single Right Rotation at Node.**
- **RR Imbalance (Right-Right):** Node has BF = -2, right child has BF = -1. **Fix: Single Left Rotation at Node.**
- **LR Imbalance (Left-Right):** Node has BF = +2, left child has BF = -1. **Fix: Left Rotate child, then Right Rotate node.**
- **RL Imbalance (Right-Left):** Node has BF = -2, right child has BF = +1. **Fix: Right Rotate child, then Left Rotate node.**`
      }
    ],
    questions: [
      {
        id: 'dsa-q1',
        unit: 'Unit 1: Introduction to Data Structures & Complexity',
        marks: '3 Marks',
        question: 'Differentiate between Linear and Non-Linear Data Structures with examples.',
        answer: `| Criteria | Linear Data Structure | Non-Linear Data Structure |
| :--- | :--- | :--- |
| **Arrangement** | Elements form a sequential single-level sequence (one after another). | Elements are arranged hierarchically or interconnected in multi-level structures. |
| **Traversal** | Single run can visit all elements sequentially. | Requires complex tree/graph traversal techniques (BFS, DFS, Inorder). |
| **Memory Allocation** | Typically contiguous (Arrays) or linear pointer-linked (Linked Lists). | Non-contiguous memory with multiple branch pointers. |
| **Examples** | Arrays, Linked Lists, Stacks, Queues. | Binary Trees, AVL Trees, Heaps, Graphs. |`
      },
      {
        id: 'dsa-q2',
        unit: 'Unit 3: Stacks & Queues',
        marks: '5 Marks',
        question: 'Explain the Infix to Postfix conversion algorithm using a Stack with a full trace of (A + B) * C - D / E.',
        answer: `### Algorithm Rules:
1. Print operands immediately as they arrive.
2. If symbol is \`(\`, push onto stack.
3. If symbol is \`)\`, pop and print operators until \`(\` is popped.
4. If operator arrives, pop operators from stack that have **greater than or equal precedence**, then push the incoming operator.
5. At the end of input, pop and print all remaining stack operators.

### Expression Trace: \`( A + B ) * C - D / E\`
| Token | Action | Stack (Bottom -> Top) | Postfix Output |
| :---: | :--- | :--- | :--- |
| **(** | Push \`(\` | \`(\` | — |
| **A** | Print operand | \`(\` | \`A\` |
| **+** | Push \`+\` | \`( +\` | \`A\` |
| **B** | Print operand | \`( +\` | \`A B\` |
| **)** | Pop until \`(\` | *(empty)* | \`A B +\` |
| ***** | Push \`*\` | \`*\` | \`A B +\` |
| **C** | Print operand | \`*\` | \`A B + C\` |
| **-** | Pop \`*\` (higher prec), Push \`-\` | \`-\` | \`A B + C *\` |
| **D** | Print operand | \`-\` | \`A B + C * D\` |
| **/** | Push \`/\` (higher prec than \`-\`) | \`- /\` | \`A B + C * D\` |
| **E** | Print operand | \`- /\` | \`A B + C * D E\` |
| **End** | Pop all remaining | *(empty)* | \`A B + C * D E / -\` |

**Final Postfix Result:** \`A B + C * D E / -\``
      },
      {
        id: 'dsa-q3',
        unit: 'Unit 4: Trees',
        marks: '7 Marks',
        question: 'Write C functions to implement Binary Search Tree (BST) Insertion and Inorder Traversal. Explain why Inorder traversal of a BST always yields sorted order.',
        answer: `### C Implementation of BST Insert and Inorder:
\`\`\`c
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *left, *right;
};

struct Node* createNode(int value) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = value;
    newNode->left = newNode->right = NULL;
    return newNode;
}

struct Node* insert(struct Node* root, int value) {
    if (root == NULL) return createNode(value);
    if (value < root->data)
        root->left = insert(root->left, value);
    else if (value > root->data)
        root->right = insert(root->right, value);
    return root;
}

void inorder(struct Node* root) {
    if (root != NULL) {
        inorder(root->left);       // 1. Visit Left Subtree (< root)
        printf("%d ", root->data); // 2. Visit Root Node
        inorder(root->right);      // 3. Visit Right Subtree (> root)
    }
}
\`\`\`

### Why BST Inorder is Always Sorted:
By the mathematical definition of a Binary Search Tree:
$$\\text{All elements in Left Subtree} < \\text{Root} < \\text{All elements in Right Subtree}$$
Since Inorder traversal visits recursively: **Left Subtree $\\rightarrow$ Root $\\rightarrow$ Right Subtree**, it visits all values strictly from smallest to largest in monotonically ascending order.`
      },
      {
        id: 'dsa-q4',
        unit: 'Unit 5: Graphs',
        marks: '7 Marks',
        question: "Explain Dijkstra's Single Source Shortest Path Algorithm with step-by-step pseudo-code and analysis. Why does it fail on negative edge weights?",
        answer: `### Dijkstra's Algorithm Overview:
Dijkstra's algorithm finds the shortest path from a source vertex $S$ to all other vertices in a weighted graph with non-negative edge weights using a Greedy strategy.

### Pseudo-code:
\`\`\`text
1. Set dist[v] = infinity for all vertices v, and dist[source] = 0.
2. Initialize an empty set of visited vertices S = {}.
3. While S does not contain all vertices:
     a. Pick vertex u not in S with the minimum dist[u].
     b. Add u to S (mark visited).
     c. For each unvisited neighbor v of u:
          if dist[u] + weight(u, v) < dist[v]:
              dist[v] = dist[u] + weight(u, v)
\`\`\`

### Why Dijkstra Fails on Negative Edge Weights:
Dijkstra is based on a greedy assumption: once a vertex is marked "visited", its computed distance is assumed to be optimal and will **never be reduced further**. 
With negative weights, a longer path with a large negative edge downstream could yield a smaller overall distance, which Dijkstra will never re-evaluate once the node is closed. For graphs with negative weights, **Bellman-Ford Algorithm** ($O(V \\cdot E)$) must be used instead.`
      }
    ]
  },

  // ── DATABASE MANAGEMENT SYSTEMS ───────────────────────────────────────────
  'sem3-dbms': {
    subjectId: 'sem3-dbms',
    subjectName: 'Database Management Systems (DBMS)',
    code: 'DBMS302',
    semester: 3,
    badge: 'Exam Bank · All 5 Units',
    badgeColor: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
    summary: 'Essential university questions covering 3-Tier Architecture, ER Diagrams, Relational Algebra, SQL Joins & Subqueries, Functional Dependencies & Normalization (1NF to BCNF), and ACID Transactions.',
    cheatSheet: [
      {
        title: 'Normalization Rules Quick Reference',
        content: `| Normal Form | Requirement | Eliminates |
| :--- | :--- | :--- |
| **1NF** | All attribute values must be **atomic** (single-valued). No repeating groups. | Multi-valued attributes |
| **2NF** | In 1NF + **No Partial Dependency** (every non-key attribute fully dependent on primary key). | Partial functional dependencies |
| **3NF** | In 2NF + **No Transitive Dependency** ($X \\rightarrow Y$, if non-key derives non-key). | Transitive dependencies |
| **BCNF** | In 3NF + For every functional dependency $X \\rightarrow Y$, **$X$ must be a Super Key**. | Anomalies caused by overlapping candidate keys |`
      },
      {
        title: 'ACID Properties in One Table',
        content: `| Property | Meaning | Enforced By |
| :--- | :--- | :--- |
| **Atomicity** | All operations in the transaction succeed, or the entire transaction is rolled back ("All or Nothing"). | Transaction / Recovery Manager (Undo Log) |
| **Consistency** | The database remains in a valid state before and after transaction execution. | Application Logic + Database Constraints |
| **Isolation** | Concurrent transactions execute without interfering with each other. | Concurrency Control Manager (Locking / 2PL) |
| **Durability** | Once committed, changes survive system crashes and power failures permanently. | Recovery Manager (Redo Log / WAL) |`
      }
    ],
    questions: [
      {
        id: 'dbms-q1',
        unit: 'Unit 1: Introduction & Architecture',
        marks: '5 Marks',
        question: 'Explain 3-Tier Database Architecture with a diagram. What is the significance of Physical and Logical Data Independence?',
        answer: `### 3-Level ANSI/SPARC Architecture:
\`\`\`text
   [ User 1 View ]     [ User 2 View ]     [ User 3 View ]  <-- External Level
          \\                   |                   /
    +---------------------------------------------------+
    |         Logical / External Mapping                |
    +---------------------------------------------------+
    |           Conceptual / Logical Schema             |  <-- Community view (Tables, keys)
    +---------------------------------------------------+
    |         Physical / Conceptual Mapping             |
    +---------------------------------------------------+
    |                 Internal Schema                   |  <-- Storage structures, indexes, B-trees
    +---------------------------------------------------+
                              |
                     [ Physical Storage ]
\`\`\`

### Data Independence:
1. **Logical Data Independence:**
   The ability to modify the **Conceptual Schema** (e.g., adding an attribute or splitting a table) without requiring changes to the **External Schema** or user applications.
2. **Physical Data Independence:**
   The ability to alter the **Internal Schema** (e.g., changing storage from HDD to SSD, altering index types from B-Tree to Hash) without modifying the Conceptual Schema or user queries.`
      },
      {
        id: 'dbms-q2',
        unit: 'Unit 3: Normalization',
        marks: '7 Marks',
        question: 'Given relation R(A, B, C, D, E) with Functional Dependencies F = { A -> B, B -> C, C -> D, D -> E }. Find candidate keys, determine the highest normal form, and decompose into BCNF.',
        answer: `### 1. Finding Candidate Key:
Compute attribute closure of $A$:
$$A^+ = \\{A\\} \\xrightarrow{A \\rightarrow B} \\{A, B\\} \\xrightarrow{B \\rightarrow C} \\{A, B, C\\} \\xrightarrow{C \\rightarrow D} \\{A, B, C, D\\} \\xrightarrow{D \\rightarrow E} \\{A, B, C, D, E\\}$$
Since $A^+$ contains all attributes of $R$, **$A$ is the sole Candidate Key**.

### 2. Checking Normal Forms:
- **1NF:** Satisfied (attributes are atomic).
- **2NF:** All attributes are fully dependent on the whole candidate key $A$ (no partial keys). Satisfied!
- **3NF Check:** Condition: for $X \\rightarrow Y$, either $X$ is super key or $Y$ is prime.
  In $B \\rightarrow C$: $B$ is NOT a super key, and $C$ is not prime. **3NF is violated!**
- Hence, the highest normal form is **2NF**.

### 3. Decomposition into BCNF (Lossless & Dependency Preserving):
We isolate violating dependencies:
1. From $A \\rightarrow B$: create $R_1(A, B)$ with key $A$.
2. From $B \\rightarrow C$: create $R_2(B, C)$ with key $B$.
3. From $C \\rightarrow D$: create $R_3(C, D)$ with key $C$.
4. From $D \\rightarrow E$: create $R_4(D, E)$ with key $D$.

**Final BCNF Relations:** $R_1(A, B)$, $R_2(B, C)$, $R_3(C, D)$, $R_4(D, E)$ — all in BCNF, lossless join, and dependency preserving.`
      }
    ]
  },

  // ── OBJECT ORIENTED PROGRAMMING — JAVA ────────────────────────────────────
  'sem3-java': {
    subjectId: 'sem3-java',
    subjectName: 'Object Oriented Programming — Java',
    code: 'JAVA303',
    semester: 3,
    badge: 'Exam Bank · All 6 Units',
    badgeColor: 'bg-red-500/10 text-red-600 dark:text-red-400',
    summary: 'Core university exam questions on JDK vs JRE vs JVM, Polymorphism & Dynamic Method Dispatch, Abstract Classes vs Interfaces, Exception Handling, Multithreading lifecycle & Synchronization, and Collections framework.',
    cheatSheet: [
      {
        title: 'Abstract Class vs Interface (Java 8+)',
        content: `| Feature | Abstract Class | Interface |
| :--- | :--- | :--- |
| **Keyword** | \`abstract class Name\` | \`interface Name\` |
| **Inheritance** | Single class inheritance (\`extends\`). | Multiple inheritance supported (\`implements\`). |
| **Methods** | Can have abstract, concrete, final, and static methods. | Abstract methods, plus \`default\` and \`static\` methods (Java 8+). |
| **Variables** | Can have instance, final, static, private, public variables. | Variables are implicitly \`public static final\` constants. |
| **Constructors** | Has constructors (called via \`super()\`). | **No constructors** whatsoever. |`
      }
    ],
    questions: [
      {
        id: 'java-q1',
        unit: 'Unit 2: Four Pillars of OOP',
        marks: '5 Marks',
        question: 'Explain Dynamic Method Dispatch (Runtime Polymorphism) in Java with a working code example.',
        answer: `### Definition:
**Dynamic Method Dispatch** is the mechanism by which a call to an overridden method is resolved at runtime rather than compile-time. It enables Java to support runtime polymorphism.

### Principle:
A superclass reference variable can refer to a subclass object. When an overridden method is invoked through the superclass reference, Java determines which version of the method to execute based upon the **actual object type** being referred to at runtime.

### Working Code Example:
\`\`\`java
class Animal {
    void makeSound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Dog barks: Woof Woof!");
    }
}

class Cat extends Animal {
    @Override
    void makeSound() {
        System.out.println("Cat meows: Meow!");
    }
}

public class TestPolymorphism {
    public static void main(String[] args) {
        Animal ref; // Superclass reference variable
        
        ref = new Dog(); // Refers to Dog object
        ref.makeSound(); // Outputs: Dog barks: Woof Woof!
        
        ref = new Cat(); // Refers to Cat object
        ref.makeSound(); // Outputs: Cat meows: Meow!
    }
}
\`\`\``
      },
      {
        id: 'java-q2',
        unit: 'Unit 4: Multithreading',
        marks: '7 Marks',
        question: 'Explain the Thread Lifecycle in Java with a state transition diagram. Differentiate between extending Thread class vs implementing Runnable interface.',
        answer: `### Thread Lifecycle States:
1. **New:** Thread created using \`new Thread()\` but \`start()\` not yet called.
2. **Runnable:** After \`start()\` is called. The thread is ready or actively executing under the OS thread scheduler.
3. **Blocked / Waiting:** Thread paused waiting for a monitor lock or waiting indefinitely for notification (\`wait()\`, \`join()\`).
4. **Timed Waiting:** Sleeping for a specified duration (\`Thread.sleep(1000)\`).
5. **Terminated / Dead:** Execution of \`run()\` completed.

### Thread vs Runnable Comparison:
| Criteria | Extending \`Thread\` Class | Implementing \`Runnable\` Interface |
| :--- | :--- | :--- |
| **Inheritance Flexibility** | Consumes single class inheritance; subclass cannot extend any other class. | **Preferred:** Class can implement \`Runnable\` and still extend another domain class. |
| **Object Sharing** | Each thread creates a unique object instance. | Multiple threads can share the exact same \`Runnable\` target instance. |
| **Design Pattern** | Tightly couples task code with thread execution mechanism. | Decouples the work task from thread execution (ideal for Executor thread pools). |`
      }
    ]
  },

  // ── COANMP (NUMERICAL METHODS) ────────────────────────────────────────────
  'sem3-coanmp': {
    subjectId: 'sem3-coanmp',
    subjectName: 'Computer Oriented Numerical Methods with Python',
    code: 'COANMP',
    semester: 3,
    badge: 'Exam Bank · All 6 Units',
    badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
    summary: 'Comprehensive numerical exam questions covering Root Finding (Bisection, Newton-Raphson), Interpolation, Numerical Integration (Trapezoidal, Simpson 1/3 & 3/8), Linear Systems (Gauss, Seidel), and ODEs (Euler, RK4) with Python code.',
    cheatSheet: [
      {
        title: 'Essential Numerical Formulas Sheet',
        content: `**1. Newton-Raphson Formula:**
$$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$$
*Condition: $f'(x_n) \\neq 0$. Order of convergence = 2 (Quadratic).*

**2. Trapezoidal Rule:**
$$\\int_{a}^{b} f(x)dx = \\frac{h}{2} \\left[ (y_0 + y_n) + 2(y_1 + y_2 + \\dots + y_{n-1}) \\right]$$

**3. Simpson\\'s 1/3 Rule ($n$ must be even):**
$$\\int_{a}^{b} f(x)dx = \\frac{h}{3} \\left[ (y_0 + y_n) + 4(\\text{odd terms}) + 2(\\text{even terms}) \\right]$$

**4. Runge-Kutta 4th Order (RK4):**
$$k_1 = h \\cdot f(x_n, y_n)$$
$$k_2 = h \\cdot f\\left(x_n + \\frac{h}{2}, y_n + \\frac{k_1}{2}\\right)$$
$$k_3 = h \\cdot f\\left(x_n + \\frac{h}{2}, y_n + \\frac{k_2}{2}\\right)$$
$$k_4 = h \\cdot f(x_n + h, y_n + k_3)$$
$$y_{n+1} = y_n + \\frac{1}{6}(k_1 + 2k_2 + 2k_3 + k_4)$$`
      }
    ],
    questions: [
      {
        id: 'coanmp-q1',
        unit: 'Unit 2: Roots of Equations',
        marks: '7 Marks',
        question: 'Derive the Newton-Raphson formula using Taylor Series. Find the real root of x^3 - 2x - 5 = 0 correct to 3 decimal places starting with x0 = 2.',
        answer: `### 1. Derivation from Taylor Series:
Let $x_0$ be an initial approximation to the root of $f(x) = 0$, and let $h$ be the small correction such that $f(x_0 + h) = 0$.
Expanding $f(x_0 + h)$ by Taylor series around $x_0$:
$$f(x_0 + h) = f(x_0) + h f'(x_0) + \\frac{h^2}{2!} f''(x_0) + \\dots = 0$$
Neglecting second and higher order powers of $h$:
$$f(x_0) + h f'(x_0) \\approx 0 \\implies h = -\\frac{f(x_0)}{f'(x_0)}$$
Setting the next approximation $x_1 = x_0 + h$:
$$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$$

### 2. Numerical Solution for $f(x) = x^3 - 2x - 5 = 0$:
- $f'(x) = 3x^2 - 2$
- Initial guess $x_0 = 2$:
  - $f(2) = 2^3 - 2(2) - 5 = 8 - 4 - 5 = -1$
  - $f'(2) = 3(2^2) - 2 = 12 - 2 = 10$

**Iteration 1:**
$$x_1 = 2 - \\frac{-1}{10} = 2 + 0.1 = 2.1$$
- $f(2.1) = (2.1)^3 - 2(2.1) - 5 = 9.261 - 4.2 - 5 = 0.061$
- $f'(2.1) = 3(2.1)^2 - 2 = 13.23 - 2 = 11.23$

**Iteration 2:**
$$x_2 = 2.1 - \\frac{0.061}{11.23} = 2.1 - 0.00543 = 2.09457$$
- $f(2.09457) = (2.09457)^3 - 2(2.09457) - 5 \\approx 0.00018$
- $f'(2.09457) = 3(2.09457)^2 - 2 \\approx 11.1616$

**Iteration 3:**
$$x_3 = 2.09457 - \\frac{0.00018}{11.1616} \\approx 2.09455$$

**Final Answer:**
The root correct to 3 decimal places is **2.095**.`
      }
    ]
  }
};
