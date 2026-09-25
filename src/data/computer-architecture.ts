import { Subject } from './types';

export const computerArchitecture: Subject = {
  id: 'ca-101',
  name: 'Computer Architecture',
  code: 'CS401',
  color: 'bg-blue-500',
  icon: 'cpu',
  description: 'Comprehensive guide to Computer Architecture and Organization. Covers RTL, basic computer organization, microprogramming, CPU, arithmetic, and Memory/IO.',
  semester: 3,
  units: [
    {
      id: 'unit-1',
      title: 'Register Transfer & Micro-operations',
      description: 'Understanding Register Transfer Language and fundamental micro-operations in computer systems.',
      topics: [
        {
          id: 'rtl',
          title: 'Register Transfer Language (RTL)',
          simpleExplanation: 'RTL is a universal language used to describe how data moves between different storage areas (registers) inside a computer, similar to how a blueprint describes water flowing through pipes between tanks.',
          detailedExplanation: `
## Register Transfer Language (RTL)

In the design of computer systems, it is essential to have a precise way to describe the internal workings of the processor. Writing out "Transfer data from Register A to Register B" repeatedly is inefficient and lacks mathematical rigor. This is where **Register Transfer Language (RTL)** comes in. 

RTL is a symbolic, algebraic notation used to describe the micro-operations and data transfers among registers in a digital system. It provides a shorthand way to document the sequence of events that happen during clock cycles.

### Why do we need RTL?
Computers consist of numerous storage units called **Registers**. Data constantly moves between them to facilitate calculations, memory access, and logic operations. RTL serves as the standard notation for architects to design and document these pathways before building the actual hardware.

### Basic Elements and Symbols in RTL
1. **Letters and Numbers**: Registers are denoted by capital letters and sometimes numbers to indicate their function (e.g., \`R1\` for a general register, \`MAR\` for Memory Address Register, \`PC\` for Program Counter).
2. **Parentheses ()**: These denote a specific portion or bit-slice of a register. For example, \`R1(0-7)\` refers specifically to the lower 8 bits (byte) of the 16-bit register R1.
3. **Arrow (<-)**: Denotes the actual transfer of data. It points from the source register to the destination register.
4. **Comma (,)**: Separates two distinct micro-operations that are designed to occur simultaneously (in the exact same clock cycle).
5. **Colon (:)**: Denotes a control condition or timing signal. The operation that follows the colon only executes if the preceding condition evaluates to true (binary 1).

### The Anatomy of an RTL Statement
Consider this example:
\`\`\`text
P: R2 <- R1
\`\`\`
- **P** represents a control signal or timing variable (like a switch). It can be 0 or 1.
- **:** means 'if P is 1, then execute the following'.
- **R2 <- R1** means 'copy the entire content of register R1 into register R2'.

### Key Properties of Transfers
- **Non-destructive Read**: When we state \`R2 <- R1\`, the data in R1 is NOT deleted or removed. It is simply copied. R1 retains its original value after the clock cycle.
- **Destructive Write**: The previous data that existed in R2 is completely overwritten and permanently lost the moment the new data from R1 is loaded.

### Hardware Implementation
To translate an RTL statement like \`P: R2 <- R1\` into physical hardware, logic gates and flip-flops are used. The control signal \`P\` is electrically connected to the 'load' enable input of Register R2. When \`P=1\`, the next rising edge of the system clock pulse triggers R2 to latch onto the data currently presented on its input lines (which are wired from R1's output lines). If \`P=0\`, R2 ignores the input and retains its current state.
          `,
          shortNotes: 'RTL uses symbols (like R1 <- R2) to show data moving between registers. Source is untouched, destination is overwritten.',
          examples: [
            {
              title: 'Conditional Transfer',
              code: 'T1: MAR <- PC',
              explanation: 'If timing signal T1 is active (1), copy the Program Counter (PC) into the Memory Address Register (MAR).'
            },
            {
              title: 'Simultaneous Operations',
              code: 'T3: R1 <- R2, R2 <- R1',
              explanation: "Swapping data! If T3 is 1, R1 gets R2's data AND R2 gets R1's data at the exact same clock tick, relying on edge-triggered flip-flops."
            }
          ],
          keyPoints: [
            'RTL is a symbolic notation to describe register transfers.',
            'Arrow (<-) indicates the direction of data transfer.',
            'Data is copied, not moved (source remains unchanged).',
            'Control functions dictate WHEN a transfer happens (e.g., P: ).',
            'Multiple transfers can happen simultaneously separated by a comma.'
          ],
          mcqs: [
            {
              question: 'In RTL, what does the arrow (<-) signify?',
              options: ['Data deletion', 'Data transfer from source to destination', 'Comparison of registers', 'Addition'],
              correctAnswer: 1,
              explanation: 'The arrow shows the direction of data copying, from the right side (source) to the left side (destination).'
            },
            {
              question: 'What happens to the source register after a transfer like R2 <- R1?',
              options: ['It becomes zero', 'It is deleted', 'Its contents remain unchanged', 'It is moved to memory'],
              correctAnswer: 2,
              explanation: 'RTL transfers are copy operations; the source data is non-destructively read.'
            },
            {
              question: 'Which symbol is used to separate two simultaneous micro-operations?',
              options: ['Colon (:)', 'Semicolon (;)', 'Comma (,)', 'Plus (+)'],
              correctAnswer: 2,
              explanation: 'A comma is used in RTL to indicate that two operations occur in the same clock cycle.'
            }
          ]
        },
        {
          id: 'bus-memory-transfers',
          title: 'Bus and Memory Transfers',
          simpleExplanation: 'Instead of wiring every register to every other register, computers use a common highway called a "Bus" to share data. Memory transfers just mean reading from or writing to the main RAM.',
          detailedExplanation: `
## Bus and Memory Transfers

A modern CPU contains dozens of registers. If a hardware designer decided to connect every register directly to every other register using dedicated wires, the inside of the CPU would become an unmanageable, complex web of millions of wires. 

### The Common Bus System
To elegantly solve this wiring crisis, computer architectures implement a **Common Bus System**. 
A bus can be thought of as a public data highway. Instead of building private roads between every single house (register), everyone connects to the main highway.
- A bus consists of a set of common parallel lines (wires), one for each bit of a register (e.g., a 16-bit bus has 16 wires). 
- At any given nanosecond, only ONE register is permitted to place its data onto the bus.
- However, multiple destination registers can read that data off the bus simultaneously.

### Constructing a Bus System
There are two primary electronic methods to build a common bus inside a CPU:
1. **Using Multiplexers (MUX)**: A multiplexer acts like a digital train switch. If you have four registers (R0, R1, R2, R3) and you want a single bus, you use MUXes to select which register's bits are allowed onto the bus wires. The selection lines (S0, S1) are controlled by the CPU's control unit to determine the active source register.
2. **Using Three-State (Tri-State) Buffers**: A three-state buffer is a specialized logic gate. It has normal outputs (1 or 0), but crucially, it has a third state called **High Impedance (High-Z)**. High-Z means the output acts as if the wire is completely physically disconnected (an open circuit). By tying all register outputs to the bus via tri-state buffers, and only enabling the buffer of one register at a time, we ensure no short circuits occur and only one register drives the bus.

### Memory Transfers
Main memory (RAM) is a massive collection of storage locations, significantly slower than internal CPU registers. The CPU interacts with memory via two fundamental operations:
1. **Read Operation**: Transferring a word of data from Memory into a CPU Register.
2. **Write Operation**: Transferring a word of data from a CPU Register into Memory.

To specify EXACTLY which memory location we intend to access, we use an address. 

#### RTL Notation for Memory
In RTL, we use the symbol **M[Address]** to denote the memory word located at a specific address. Typically, a dedicated **Address Register (AR)** holds this address. Therefore, we write \`M[AR]\`.

- **Memory Read RTL**: \`DR <- M[AR]\`
  *(The CPU asserts the read control signal. Data from the memory location specified by the AR is placed on the data bus and copied into the Data Register DR).*
- **Memory Write RTL**: \`M[AR] <- R1\`
  *(The CPU asserts the write control signal. Data from Register R1 is placed on the bus and forcibly written into the memory location specified by the AR).*
          `,
          shortNotes: 'A bus is a shared data path reducing wiring. MUXes or Tri-state buffers control access. Memory transfers use AR (Address Register) to point to data: Read (DR <- M[AR]) and Write (M[AR] <- R1).',
          examples: [
            {
              title: 'Memory Read Operation',
              code: 'Read: DR <- M[AR]',
              explanation: 'Assume AR holds address 100. The CPU goes to RAM location 100, retrieves the binary value stored there, and saves it in DR.'
            },
            {
              title: 'Memory Write Operation',
              code: 'Write: M[AR] <- AC',
              explanation: 'Assume AR holds address 200 and AC holds the value 55. The CPU overwrites whatever is in RAM location 200 with the value 55.'
            }
          ],
          keyPoints: [
            'A bus dramatically reduces the number of wires needed for register connections.',
            'Only one source can put data on the bus at a time to prevent electrical shorts.',
            'Multiplexers or Three-state buffers are standard methods to construct buses.',
            'Memory Read: Transfer from memory to register.',
            'Memory Write: Transfer from register to memory.'
          ],
          mcqs: [
            {
              question: 'Why do we use a common bus system in CPU design?',
              options: ['To increase memory capacity', 'To reduce the number of interconnecting wires between registers', 'To make the system clock tick faster', 'To add more registers'],
              correctAnswer: 1,
              explanation: 'A common bus provides a shared data path, drastically reducing the physical wiring needed compared to connecting every register point-to-point.'
            },
            {
              question: 'Which logic component is commonly used to construct a bus system by selecting one of many inputs?',
              options: ['Decoders', 'Multiplexers', 'Adders', 'Flip-flops'],
              correctAnswer: 1,
              explanation: 'Multiplexers (MUX) act as selectors to choose one of many register outputs to place onto the common bus.'
            },
            {
              question: 'What does the third state (High-Z) in a tri-state buffer represent?',
              options: ['Logical 1', 'Logical 0', 'High voltage', 'High impedance (disconnected state)'],
              correctAnswer: 3,
              explanation: 'High-Z means high impedance, which electrically disconnects the output from the bus so it does not interfere with other signals.'
            }
          ]
        },
        {
          id: 'arithmetic-micro-ops',
          title: 'Arithmetic Micro-operations',
          simpleExplanation: 'These are the lowest-level math operations the CPU can perform directly on data inside registers, mainly adding two numbers, subtracting them, or just adding 1 (incrementing).',
          detailedExplanation: `
## Arithmetic Micro-operations

Micro-operations are the most fundamental, atomic operations performed on data stored in registers during a single clock cycle. When these operations involve mathematical calculations, they are appropriately termed **Arithmetic Micro-operations**.

The four fundamental arithmetic micro-operations are Addition, Subtraction, Increment (add 1), and Decrement (subtract 1). 
*Note: Multiplication and Division are generally NOT considered basic micro-operations in standard architectures. Instead, they are implemented sequentially using loops of addition/subtraction and shift operations.*

### 1. Addition
**RTL:** \`R3 <- R1 + R2\`
The contents of register R1 and register R2 are fed into a hardware circuit called an **Adder** (specifically, a parallel binary adder). The resulting sum is stored into register R3.

### 2. Subtraction
**RTL:** \`R3 <- R1 - R2\`
In computer hardware, dedicated "subtractor" circuits are rarely built because they waste silicon area. Instead, computers cleverly utilize the existing Adder circuit by using **2's Complement Addition**. 
To mathematically subtract R2 from R1, the computer actually performs: \`R1 + (2's complement of R2)\`.
- **1's complement** is achieved by simply flipping all the bits (represented by a bar over the register, or an apostrophe: R2'). This requires a simple NOT gate for each bit.
- **2's complement** is achieved by flipping the bits and adding a binary 1: \`(R2' + 1)\`.

Therefore, the RTL for subtraction is actually implemented in hardware as:
\`R3 <- R1 + R2' + 1\`

### 3. Increment
**RTL:** \`R1 <- R1 + 1\`
This operation simply adds 1 to the current value of the register. It is exceptionally common, particularly for the **Program Counter (PC)** which must constantly point to the next instruction in sequence. Hardware incrementers are simpler and faster than full adders, often built using half-adders.

### 4. Decrement
**RTL:** \`R1 <- R1 - 1\`
This subtracts 1 from the register. It is frequently used in counter registers to track iterations in loops (e.g., decrementing until it hits zero).

### The Arithmetic Logic Unit (ALU)
All these operations are physically carried out in a centralized component of the CPU known as the ALU. The ALU receives data inputs and control signals. The control signals tell the ALU exactly which operation (add, subtract, etc.) to perform on the inputs during the current clock cycle.
          `,
          shortNotes: 'Basic math in CPU. Add: R3 <- R1 + R2. Subtraction uses 2s complement: R3 <- R1 + R2\' + 1. Increment adds 1. Multiply/Divide are built from these, not basic micro-ops.',
          examples: [
            {
              title: 'Subtraction using 2s Complement',
              code: "R3 <- R1 + R2' + 1",
              explanation: "Assume R1 is 5 (0101) and R2 is 3 (0011). R2' is 1100. Adding 1 gives 1101 (which represents -3 in 2s comp). 0101 + 1101 = 10010. Discarding the carry out, we get 0010, which is 2! (5-3=2)"
            }
          ],
          keyPoints: [
            'Basic arithmetic micro-ops are limited to add, subtract, increment, and decrement.',
            'Subtraction is performed using 2s complement addition to save hardware.',
            'Multiplication and division are complex operations built from add/subtract and shift.',
            'Incrementing is vital for automatically advancing the Program Counter (PC).'
          ],
          mcqs: [
            {
              question: 'How is subtraction (R1 - R2) typically implemented in modern hardware?',
              options: ['By using R1 + R2', "By using R1 + R2' + 1", "By using R1' + R2 + 1", 'Using a dedicated analog subtraction chip'],
              correctIndex: 1,
              explanation: "Computers use 2s complement addition for subtraction. R2' is the 1s complement, and adding 1 converts it to 2s complement."
            },
            {
              question: 'Which of the following is NOT classified as a basic arithmetic micro-operation?',
              options: ['Increment', 'Addition', 'Division', 'Decrement'],
              correctAnswer: 2,
              explanation: 'Division is a complex sequential operation made up of multiple shifts and subtractions, it cannot be done in a single clock cycle like a basic micro-operation.'
            },
            {
              question: 'What does the apostrophe (R1\') represent in RTL notation?',
              options: ['Negative R1', 'R1 + 1', '1s complement of R1', 'Logical shift right'],
              correctAnswer: 2,
              explanation: 'An apostrophe (R1\') or a bar over the register denotes the 1s complement, meaning every bit is inverted.'
            }
          ]
        }
      ]
    },
    {
      id: 'unit-2',
      title: 'Basic Computer Organization',
      description: 'Architecture of a basic computer, instruction formats, specific registers, and the complete instruction cycle.',
      topics: [
        {
          id: 'instruction-codes',
          title: 'Instruction Codes',
          simpleExplanation: 'An instruction code is a string of binary 0s and 1s that tells the CPU exactly what action to take. It usually has two main parts: an operation code (what to do) and an address (where the target data is).',
          detailedExplanation: `
## Instruction Codes

At its core, a computer program is merely a sequence of instructions stored sequentially in memory. The CPU fetches these instructions one by one, interprets them, and executes them. But how does a piece of silicon understand what to do? It reads **Instruction Codes**.

An **instruction code** is a carefully formatted group of bits that commands the computer hardware to perform a very specific operation.

### Format of an Instruction
In a simplified basic computer architecture (like the one proposed by M. Morris Mano), an instruction word is 16 bits long and is divided into specific fields:
- **Mode Bit (1 bit)**: Bit index 15. Tells the CPU whether the address provided is a direct address or an indirect address.
- **Opcode (3 bits)**: Bit indices 12-14. This is the "Operation Code". It tells the CPU *what* specific action to perform (e.g., ADD, LOAD, STORE, AND).
- **Address (12 bits)**: Bit indices 0-11. This field tells the CPU *where* the data (operand) is located in memory.

### Opcode (Operation Code)
The opcode is the heart of the instruction. A 3-bit opcode allows for $2^3 = 8$ fundamental memory-reference operations. 
When the CPU reads an opcode, it routes these 3 bits into a decoder circuit. The decoder activates one specific control line out of eight, which then triggers the exact sequence of logic gates required to carry out that math or logic function.

### Direct vs Indirect Addressing (The Mode Bit)
The 12-bit address field points to data in memory. However, *how* it points depends entirely on the state of the Mode Bit (I).
- **Direct Address (I=0)**: The address field contains the ACTUAL memory address of the operand. (Analogy: "Go to locker 100 to get your package").
- **Indirect Address (I=1)**: The address field contains the address of an address. It is a pointer. (Analogy: "Go to locker 100, inside you will find a note that says 'Go to locker 250'. The actual package is in 250").

While indirect addressing is slightly slower because it mandates two separate trips to memory (one for the pointer, one for the data), it is an incredibly powerful feature. It allows programs to use pointers, which is the foundational concept behind arrays, dynamic memory allocation, and complex data structures.
          `,
          shortNotes: 'Instruction Code = Opcode (what operation to do) + Address (where data is). Mode bit I=0 is direct address, I=1 is indirect address (acts as a pointer).',
          examples: [
            {
              title: '16-bit Instruction breakdown',
              code: '0 001 000000001010',
              explanation: 'Bit 15 is 0 (Direct address). Opcode is 001 (Assume 001 means ADD). Address is 000000001010 (binary for 10). So, ADD the value located at memory address 10 to the accumulator.'
            }
          ],
          keyPoints: [
            'Instruction codes are binary strings commanding the CPU to execute a specific task.',
            'An opcode determines the exact operation (ADD, SUB, LOAD).',
            'The address field specifies the operand location in memory.',
            'The Mode bit distinguishes between direct and indirect addressing schemes.',
            'Indirect addressing uses pointers to access data, requiring two memory reads.'
          ],
          mcqs: [
            {
              question: 'In a basic 16-bit instruction format, what does the 15th bit typically represent?',
              options: ['Opcode', 'Operand', 'Addressing Mode (Direct/Indirect)', 'Parity bit'],
              correctAnswer: 2,
              explanation: 'The leftmost bit (bit 15) is usually the Mode bit (I), determining whether direct or indirect addressing is used.'
            },
            {
              question: 'If a memory instruction uses Indirect Addressing, how many memory accesses are required to fetch the actual operand?',
              options: ['Zero', 'One', 'Two', 'Three'],
              correctAnswer: 2,
              explanation: 'One access to read the effective address (pointer), and a second access to read the actual data at that effective address.'
            },
            {
              question: 'What is the primary purpose of the Opcode field?',
              options: ['To specify where data is stored', 'To specify what operation to perform', 'To store the computational result', 'To check for transmission errors'],
              correctAnswer: 1,
              explanation: 'Opcode stands for Operation Code, which instructs the Control Unit and ALU which operation (e.g., add, subtract, AND) to execute.'
            }
          ]
        },
        {
          id: 'computer-registers',
          title: 'Computer Registers (AC, DR, AR, PC, IR, TR)',
          simpleExplanation: 'Registers are tiny, ultra-fast memory boxes built directly inside the CPU chip. Each register has a very specific job, like holding the next instruction address or storing math results.',
          detailedExplanation: `
## Basic Computer Registers

To fetch, decode, and execute instructions efficiently, the CPU requires internal storage that is exponentially faster than external main RAM. These storage units are called **Registers**. In a basic computer organization model, there are several key registers, each engineered with a specific role.

### 1. Data Register (DR) - 16 bits
Holds the operand read from memory. If the CPU wants to add a number from memory, it first pulls that number across the bus and stores it in the DR. It acts as a buffer between memory and the ALU.

### 2. Accumulator (AC) - 16 bits
The most critical register for data manipulation. It is a general-purpose register tied directly to the ALU. When the ALU adds two numbers, one number is usually already residing in the AC, and the final computed sum is stored right back into the AC.

### 3. Instruction Register (IR) - 16 bits
Holds the actual instruction code that the CPU is currently trying to execute. Once an instruction is fetched from memory, it is dumped here. The control unit reads the IR to decode the opcode.

### 4. Program Counter (PC) - 12 bits
Holds the memory address of the **NEXT** instruction to be executed. After the CPU fetches an instruction, the PC automatically increments (\`PC <- PC + 1\`). It only has 12 bits because it holds an address, and in this basic architecture, memory has $2^{12} = 4096$ locations.

### 5. Address Register (AR) - 12 bits
Holds the address of the memory location that the CPU wants to read from or write to. Whenever the CPU accesses memory, it must place the target address into the AR first.

### 6. Temporary Register (TR) - 16 bits
Used internally by the CPU to hold intermediate results temporarily during complex calculations or multi-step operations. Application programmers cannot access this directly.

### 7. Input Register (INPR) / Output Register (OUTR) - 8 bits
Handle communication with external peripheral devices like keyboards and monitors. They are 8 bits wide because they typically handle standard ASCII characters one at a time.
          `,
          shortNotes: 'PC: stores address of next instruction. IR: stores current instruction. AR: stores memory address. DR: stores data from memory. AC: Accumulator for math results.',
          examples: [
            {
              title: 'Fetching an instruction sequence',
              code: 'AR <- PC\\nIR <- M[AR]\\nPC <- PC + 1',
              explanation: 'First, PC gives the instruction address to AR. Then memory at AR is loaded into IR. Finally, PC increments to point to the next instruction in sequence.'
            }
          ],
          keyPoints: [
            'Registers represent the fastest, smallest tier of memory inside the CPU.',
            'PC tracks the flow of the program by storing the next instruction address.',
            'AC is the main workspace for ALU mathematical operations.',
            'IR holds the instruction word while it is being decoded and executed.',
            'AR is strictly used to hold memory addresses for bus transfers.'
          ],
          mcqs: [
            {
              question: 'Which register keeps track of the next instruction to be executed by the CPU?',
              options: ['Instruction Register (IR)', 'Program Counter (PC)', 'Accumulator (AC)', 'Address Register (AR)'],
              correctAnswer: 1,
              explanation: 'The Program Counter (PC) stores the address of the next instruction and increments automatically during the fetch phase.'
            },
            {
              question: 'Why does the Address Register (AR) only have 12 bits while the Data Register (DR) has 16 bits?',
              options: ['To save power', 'Memory size is limited to 4096 words (2^12)', 'It was a design flaw', 'Data bits are larger than address bits'],
              correctAnswer: 1,
              explanation: 'In this basic computer model, 12 bits can uniquely address 4096 memory locations, which is the maximum memory size, while the data words themselves are 16-bit.'
            },
            {
              question: 'Where is the result of an arithmetic operation typically stored in a basic computer architecture?',
              options: ['Program Counter', 'Temporary Register', 'Accumulator (AC)', 'Instruction Register'],
              correctAnswer: 2,
              explanation: 'The Accumulator (AC) "accumulates" results from the ALU, serving as the primary destination for data manipulation.'
            }
          ]
        },
        {
          id: 'instruction-cycle',
          title: 'Instruction Cycle (Fetch, Decode, Execute)',
          simpleExplanation: 'The heartbeat of a computer! The CPU constantly loops through three main steps: fetch the instruction from memory, figure out what it means (decode), and then actually perform the action (execute).',
          detailedExplanation: `
## The Instruction Cycle

A program resides in memory as a long list of binary instructions. To run the program, the CPU must bring instructions into its internal registers and perform them. This continuous, repetitive process is known as the **Instruction Cycle**. 

The cycle is divided into three primary phases: Fetch, Decode, and Execute.

### 1. Fetch Phase
The CPU needs to grab the instruction from main memory.
- **T0:** \`AR <- PC\` (Copy the next instruction's address from the Program Counter to the Address Register).
- **T1:** \`IR <- M[AR], PC <- PC + 1\` (Read the memory at AR into the Instruction Register. Simultaneously, increment the PC to point to the next instruction).

*At this point, the CPU has the instruction safely secured in the IR.*

### 2. Decode Phase
The CPU needs to understand what the instruction means.
- **T2:** \`D0...D7 <- Decode IR(12-14), AR <- IR(0-11), I <- IR(15)\`
- The opcode (bits 12-14) is passed through a hardware 3-to-8 decoder. This activates exactly one of 8 specific lines (D0 to D7), telling the control unit which command this is.
- The address portion is passed to AR so it is ready if memory needs to be accessed.
- The Mode bit is passed to a flip-flop I to determine addressing mode.

### 3. Execute Phase (and Operand Fetch)
Before execution, if the instruction is a memory-reference instruction and I=1 (Indirect), the CPU must fetch the effective address.
- **T3:** \`AR <- M[AR]\` (Go to memory to get the real address of the data).

Now, the actual execution happens depending on the opcode.
For example, if it's an **ADD** command (assuming D1 is active):
- **T4:** \`DR <- M[AR]\` (Bring the data operand from memory to DR).
- **T5:** \`AC <- AC + DR, E <- Cout, SC <- 0\` (Add DR to AC, store any carry bit in E, and reset the Sequence Counter to 0).

### The Sequence Counter (SC)
The CPU uses a Sequence Counter to keep track of timing states (T0, T1, T2...). At the end of every Execute phase, the SC is cleared back to 0. This guarantees the CPU seamlessly loops back to T0 (Fetch) to start processing the next instruction.
          `,
          shortNotes: 'Fetch: Get instruction from memory (using PC). Decode: Understand the opcode using a decoder. Execute: Perform the math or data movement. SC resets to loop.',
          examples: [
            {
              title: 'Cycle for a simple ADD instruction',
              code: 'Fetch: AR<-PC, IR<-M[AR], PC++\\nDecode: Analyze Opcode\\nExecute: DR<-M[AR], AC<-AC+DR',
              explanation: 'The CPU fetches the ADD command, realizes it needs to perform addition, gets the data into DR, adds it to AC, and finishes.'
            }
          ],
          keyPoints: [
            'The Instruction Cycle consists of Fetch, Decode, and Execute phases.',
            'During Fetch, the PC provides the address, and the IR receives the fetched instruction.',
            'During Decode, the opcode is decoded to determine the operation type.',
            'Indirect addressing requires an extra memory read to find the effective address.',
            'The Sequence Counter resets to 0 after execution to restart the loop for the next instruction.'
          ],
          mcqs: [
            {
              question: 'During the Fetch phase, which register is used to supply the memory address?',
              options: ['Instruction Register (IR)', 'Program Counter (PC)', 'Accumulator (AC)', 'Data Register (DR)'],
              correctAnswer: 1,
              explanation: 'The PC holds the address of the next instruction and gives it to AR to access memory.'
            },
            {
              question: 'What happens to the Program Counter (PC) during the Fetch phase?',
              options: ['It is cleared to 0', 'It receives the instruction opcode', 'It is incremented by 1', 'It is moved to the Accumulator'],
              correctAnswer: 2,
              explanation: 'The PC is incremented so it is ready to point to the next instruction in the following cycle.'
            },
            {
              question: 'When is the Sequence Counter (SC) cleared to 0?',
              options: ['At the start of the Fetch phase', 'At the end of the Execute phase', 'During the Decode phase', 'Never'],
              correctAnswer: 1,
              explanation: 'Clearing SC to 0 resets the timing signals back to T0, restarting the fetch cycle for the next instruction.'
            }
          ]
        }
      ]
    },
    {
      id: 'unit-3',
      title: 'Microprogrammed Control',
      description: 'Understanding how Control Units are designed, Control Memory, and Microprogramming vs Hardwired approaches.',
      topics: [
        {
          id: 'control-memory',
          title: 'Control Memory',
          simpleExplanation: 'Instead of using complex, messy wiring (hardwired) to control the CPU, we can store the control signals as tiny programs (microprograms) inside a special, fast memory called Control Memory.',
          detailedExplanation: `
## Control Memory

The Control Unit is the brain within the brain. It is responsible for generating the exact sequence of electrical signals (like T0, T1, T2) that tell the ALU, registers, and memory what to do. There are two ways to build a Control Unit: Hardwired and Microprogrammed.

In a **Microprogrammed Control Unit**, the control signals are not generated by a complex web of logic gates. Instead, they are generated by reading "microinstructions" stored in a specialized memory called **Control Memory**.

### What is a Microinstruction?
A microinstruction is a highly specialized binary word. Each bit (or group of bits) in a microinstruction directly corresponds to a specific control signal in the CPU. 
When a microinstruction is read from Control Memory, its bits are used to open or close pathways (multiplexers, tri-state buffers) and trigger ALU operations.

### Microprogram
A sequence of microinstructions designed to execute one complete machine-level instruction (like ADD or LOAD) is called a **microprogram**. 

### Architecture of Control Memory
Control Memory is typically implemented as **ROM (Read-Only Memory)**. 
Why ROM? Because the microprograms define the fundamental behavior of the CPU (the instruction set architecture). They are programmed by the CPU manufacturer and should never be altered or erased by normal software. If you change the microprogram, you change how the CPU understands instructions!

### The Control Address Register (CAR)
Just like main memory uses the PC and AR, Control Memory has its own pointers. The **Control Address Register (CAR)** holds the address of the next microinstruction to be read from Control Memory.

### The Control Data Register (CDR)
When a microinstruction is read from Control Memory, it is placed into the **Control Data Register (CDR)** (also called the Pipeline Register). From here, the bits are fanned out to all the components of the CPU to execute the micro-operation.
          `,
          shortNotes: 'Control Memory stores microinstructions (control signals) in ROM. CAR holds the address for Control Memory. CDR holds the fetched microinstruction.',
          examples: [
            {
              title: 'Microinstruction bit mapping',
              code: 'Microinstruction: 1 0 0 1',
              explanation: 'Assume bit 1=Load AC, bit 2=Load DR, bit 3=Increment PC, bit 4=Read Memory. 1001 means "Load AC and Read Memory" simultaneously.'
            }
          ],
          keyPoints: [
            'Control Memory replaces complex logic gate wiring with stored microprograms.',
            'It is typically implemented as ROM, programmed by the manufacturer.',
            'A microinstruction is a binary word that dictates control signals.',
            'The CAR points to the next microinstruction in Control Memory.',
            'The CDR holds the microinstruction while it is executed.'
          ],
          mcqs: [
            {
              question: 'What type of memory is typically used for Control Memory?',
              options: ['RAM', 'ROM', 'Cache', 'Virtual Memory'],
              correctAnswer: 1,
              explanation: 'Control Memory uses ROM because microprograms define the CPU architecture and should not be modified by user software.'
            },
            {
              question: 'Which register holds the address of the next microinstruction to be fetched?',
              options: ['Program Counter (PC)', 'Instruction Register (IR)', 'Control Address Register (CAR)', 'Address Register (AR)'],
              correctAnswer: 2,
              explanation: 'The CAR acts like the PC, but specifically for Control Memory rather than main memory.'
            },
            {
              question: 'What is a sequence of microinstructions called?',
              options: ['A macro', 'A microprogram', 'An operating system', 'A compiler'],
              correctAnswer: 1,
              explanation: 'A sequence of microinstructions that executes a specific machine instruction is called a microprogram.'
            }
          ]
        },
        {
          id: 'address-sequencing',
          title: 'Address Sequencing',
          simpleExplanation: 'Address sequencing is the process of figuring out which microinstruction to read NEXT from the Control Memory. It involves mapping the machine instruction to a starting address in Control Memory.',
          detailedExplanation: `
## Address Sequencing

In a microprogrammed control unit, we must constantly fetch the *next* microinstruction from Control Memory. The process of determining the address of the next microinstruction is called **Address Sequencing**.

The Control Address Register (CAR) must be loaded with the correct address. Where does this address come from? It can come from four main sources:

### 1. Incrementing the CAR
Most of the time, microinstructions are executed in sequential order. So, the most common way to get the next address is simply to add 1 to the current address:
\`CAR <- CAR + 1\`

### 2. Unconditional and Conditional Branching
Sometimes, a microprogram needs to loop or skip ahead, just like regular code. 
- **Unconditional Branch**: The microinstruction explicitly provides an address and says, "Go here next."
- **Conditional Branch**: The microprogram checks a status bit (like the Carry flag or Sign flag). If the condition is true, it branches to a new address; if false, it just increments the CAR.

### 3. Mapping from the Instruction Register (IR)
When the CPU fetches a brand new machine instruction (like ADD) from main memory, it sits in the IR. How does the control unit know where the microprogram for ADD starts in Control Memory?
It uses a **Mapping Process**. 
A mapping logic circuit takes the opcode bits from the IR (e.g., 3 bits) and converts them into a Control Memory address (e.g., 7 bits). 
*Example Mapping Rule:* Append a 0 to the front and 000 to the back of the 3-bit opcode. 
Opcode \`101\` becomes \`0 101 000\`. This becomes the starting address in Control Memory for that specific instruction.

### 4. Subroutine Call and Return
Microprograms can have subroutines (reusable blocks of microcode, like a subroutine for calculating an effective address).
When a subroutine is called, the current CAR value is saved into a special register called the **Subroutine Register (SBR)**. When the subroutine finishes, the address is popped from the SBR back into the CAR to resume where it left off.
          `,
          shortNotes: 'Address sequencing determines the next CAR value. Methods: 1. Increment CAR. 2. Branch (conditional/unconditional). 3. Mapping from IR (finding start address). 4. Subroutine return (using SBR).',
          examples: [
            {
              title: 'Mapping Opcode to Address',
              code: 'Opcode: 110\\nMapping: 0 + Opcode + 00',
              explanation: 'If the mapping rule adds a 0 prefix and 00 suffix, opcode 110 becomes address 011000 in Control Memory.'
            }
          ],
          keyPoints: [
            'Address sequencing finds the next microinstruction address for the CAR.',
            'The CAR is usually incremented for sequential execution.',
            'Mapping translates the opcode in the IR to a starting address in Control Memory.',
            'Branching allows microprograms to make decisions based on status flags.',
            'The Subroutine Register (SBR) saves the return address during micro-subroutine calls.'
          ],
          mcqs: [
            {
              question: 'Which process converts a machine instruction opcode into a Control Memory address?',
              options: ['Branching', 'Incrementing', 'Mapping', 'Decoding'],
              correctAnswer: 2,
              explanation: 'Mapping logic translates the opcode into a starting address to locate the correct microprogram.'
            },
            {
              question: 'What is the function of the Subroutine Register (SBR) in address sequencing?',
              options: ['To hold data from main memory', 'To store the return address during a micro-subroutine call', 'To hold the opcode', 'To store ALU flags'],
              correctAnswer: 1,
              explanation: 'The SBR acts like a stack, saving the return address so the microprogram can resume after the subroutine.'
            },
            {
              question: 'If a microprogram condition is NOT met during a conditional branch, what happens to the CAR?',
              options: ['It resets to 0', 'It jumps to the branch address', 'It is incremented by 1', 'It crashes'],
              correctAnswer: 2,
              explanation: 'If the branch condition is false, the sequence simply continues to the next microinstruction by incrementing the CAR.'
            }
          ]
        },
        {
          id: 'hardwired-vs-microprogrammed',
          title: 'Hardwired vs Microprogrammed Control',
          simpleExplanation: 'Hardwired control uses physical wires and logic gates (fast but hard to change). Microprogrammed control uses a mini-program stored in ROM (slower but very easy to update and fix).',
          detailedExplanation: `
## Hardwired vs Microprogrammed Control

The Control Unit is responsible for generating timing and control signals. There are two completely different architectural philosophies for designing it.

### 1. Hardwired Control Unit
In a hardwired control unit, the control signals are generated by complex hardware logic circuits involving flip-flops, decoders, logic gates, and physical wiring.
- **How it works:** It acts as a giant state machine. Based on the current state (timing signal) and inputs (opcode), the logic gates instantly output the required control signals.
- **Speed:** It is incredibly fast because it is pure hardware. There is no memory fetching involved.
- **Flexibility:** It is completely inflexible. If there is a bug in the instruction set, or if you want to add a new instruction, you have to physically redesign and manufacture a new silicon chip.
- **Use Case:** Primarily used in RISC (Reduced Instruction Set Computer) architectures where instructions are simple and speed is paramount.

### 2. Microprogrammed Control Unit
In a microprogrammed control unit, control signals are generated by executing a hidden "microprogram" stored in a ROM (Control Memory).
- **How it works:** The CPU fetches a microinstruction from ROM, reads its bits, and routes them to act as control signals.
- **Speed:** It is slower than hardwired because reading from ROM takes time for every single micro-step.
- **Flexibility:** It is highly flexible. Adding a new complex instruction is as simple as writing a new microprogram and updating the ROM. No hardware redesign is needed!
- **Use Case:** Primarily used in CISC (Complex Instruction Set Computer) architectures where instructions are highly complex and varied.

### Summary Comparison Table
| Feature | Hardwired | Microprogrammed |
| :--- | :--- | :--- |
| **Design** | Hardware logic gates | Software microcode in ROM |
| **Speed** | Very fast | Slower (requires memory access) |
| **Flexibility**| Difficult to modify | Easy to modify/update |
| **Cost** | Cheaper for simple designs | Cheaper for complex designs |
| **Architecture**| RISC | CISC |
          `,
          shortNotes: 'Hardwired: logic gates, very fast, inflexible, RISC. Microprogrammed: ROM microcode, slower, highly flexible, easy to update, CISC.',
          examples: [
            {
              title: 'Adding a new instruction (e.g., MULTIPLY)',
              code: 'Hardwired: Redesign the chip.\\nMicroprogrammed: Burn a new sequence into the ROM.',
              explanation: 'To add a new feature, hardwired requires hardware engineering, while microprogrammed just requires writing microcode.'
            }
          ],
          keyPoints: [
            'Hardwired control uses physical logic gates to generate signals.',
            'Microprogrammed control uses microinstructions stored in Control Memory.',
            'Hardwired is significantly faster but extremely rigid.',
            'Microprogrammed is highly flexible and easier to debug or expand.',
            'RISC typically uses hardwired; CISC typically uses microprogrammed.'
          ],
          mcqs: [
            {
              question: 'Which control unit design is generally faster?',
              options: ['Microprogrammed', 'Hardwired', 'They are identical in speed', 'Virtual Control'],
              correctAnswer: 1,
              explanation: 'Hardwired is faster because signals are generated instantly through logic gates without needing to fetch from a memory unit.'
            },
            {
              question: 'If you need to add a new instruction to an existing CPU design, which approach makes it easier?',
              options: ['Hardwired', 'Microprogrammed', 'Both are equally difficult', 'Neither allows changes'],
              correctAnswer: 1,
              explanation: 'Microprogrammed control allows you to simply add a new microprogram to the ROM, without changing the physical logic circuits.'
            },
            {
              question: 'Which architecture typically employs Hardwired control?',
              options: ['CISC', 'RISC', 'Both', 'Neither'],
              correctAnswer: 1,
              explanation: 'RISC (Reduced Instruction Set Computer) relies on simple, fast instructions, making Hardwired control ideal.'
            }
          ]
        }
      ]
    },
    {
      id: 'unit-4',
      title: 'Central Processing Unit (CPU)',
      description: 'Diving deep into CPU architecture, stack organization, instruction formats, addressing modes, and RISC vs CISC.',
      topics: [
        {
          id: 'stack-organization',
          title: 'Stack Organization',
          simpleExplanation: 'A stack is a storage method that works like a stack of plates: Last In, First Out (LIFO). You can only add (Push) or remove (Pop) data from the very top.',
          detailedExplanation: `
## Stack Organization

A **Stack** is a specialized storage organization where data is stored and retrieved based on the **LIFO (Last In, First Out)** principle. Think of a stack of cafeteria plates: you add plates to the top, and when you need one, you take it from the top. The last plate you put down is the first one you pick up.

### The Stack Pointer (SP)
To manage a stack, the CPU uses a dedicated register called the **Stack Pointer (SP)**. The SP always holds the memory address (or register index) of the item currently at the "top" of the stack.

### Basic Stack Operations
1. **PUSH**: Adding a new item to the top of the stack.
2. **POP**: Removing the top item from the stack.

### Types of Stacks in a CPU
There are two ways to implement a stack in a computer:
**1. Register Stack**
The stack is a collection of finite hardware registers inside the CPU. 
- *Push Operation*: \`SP <- SP + 1, M[SP] <- Data\` (Increment SP to point to next empty space, then store data).
- *Pop Operation*: \`Data <- M[SP], SP <- SP - 1\` (Read data from current SP, then decrement SP to point to the new top).
- It is very fast, but limited in size. If you push too much, you get a **Stack Overflow**.

**2. Memory Stack**
The stack is just a designated portion of the main RAM. 
- The SP holds a memory address. 
- Usually, memory stacks grow *downwards* in memory (from high addresses to low addresses).
- *Push Operation*: \`SP <- SP - 1, M[SP] <- Data\` (Decrement address, store data).
- *Pop Operation*: \`Data <- M[SP], SP <- SP + 1\` (Read data, increment address).
- It is slower than a register stack but can be as large as the available RAM.

### Why do CPUs use Stacks?
- **Evaluating Arithmetic Expressions**: Stacks are perfect for evaluating complex math (Reverse Polish Notation / Postfix notation).
- **Subroutine Returns**: When a function is called, the CPU pushes the return address onto the stack. When the function ends, it pops the address to know where to go back to.
          `,
          shortNotes: 'Stack = LIFO (Last In, First Out). Managed by Stack Pointer (SP). PUSH adds data, POP removes data. Used for function calls and math evaluation.',
          examples: [
            {
              title: 'Evaluating Postfix math: 3 4 +',
              code: 'PUSH 3\\nPUSH 4\\nADD (pops 4, pops 3, adds them, PUSH 7)',
              explanation: 'When ADD is called, it automatically pops the top two numbers, adds them, and pushes the result back onto the stack.'
            }
          ],
          keyPoints: [
            'A stack operates on the LIFO (Last In, First Out) principle.',
            'The Stack Pointer (SP) keeps track of the top of the stack.',
            'PUSH adds an item; POP removes an item.',
            'Stacks can be implemented in CPU registers (fast, small) or main memory (slower, large).',
            'Crucial for handling subroutine/function calls and evaluating expressions.'
          ],
          mcqs: [
            {
              question: 'Which principle does a Stack data structure follow?',
              options: ['FIFO', 'LIFO', 'FILO', 'Random Access'],
              correctAnswer: 1,
              explanation: 'Stacks use Last In, First Out (LIFO). The last item pushed is the first one popped.'
            },
            {
              question: 'What register is exclusively used to keep track of the top of the stack?',
              options: ['Instruction Register (IR)', 'Program Counter (PC)', 'Stack Pointer (SP)', 'Accumulator (AC)'],
              correctAnswer: 2,
              explanation: 'The Stack Pointer (SP) holds the address or index of the top item on the stack.'
            },
            {
              question: 'If a memory stack grows downwards (from high to low addresses), what happens to the SP during a PUSH operation?',
              options: ['It is incremented', 'It is decremented', 'It remains unchanged', 'It is cleared to 0'],
              correctAnswer: 1,
              explanation: 'If it grows downwards, pushing a new item requires subtracting 1 from the SP to point to the next available lower address.'
            }
          ]
        },
        {
          id: 'addressing-modes',
          title: 'Addressing Modes',
          simpleExplanation: 'Addressing modes are the different ways an instruction can specify where to find its data. Sometimes the data is right there in the instruction, sometimes it points to a register, and sometimes it acts like a treasure map pointing to memory.',
          detailedExplanation: `
## Addressing Modes

When an instruction tells the CPU to perform an operation, it must also specify *where* the operands (data) are located. The method used to identify the location of an operand is called an **Addressing Mode**.

Different architectures support different addressing modes to provide flexibility for programmers and compilers. Here are the most important ones:

### 1. Implied Mode
The operand is specified implicitly in the definition of the instruction itself.
- *Example:* \`CMA\` (Complement Accumulator). The data is obviously in the Accumulator; no address is needed.

### 2. Immediate Mode
The operand is provided immediately in the instruction itself. Instead of an address field, the instruction holds the actual data value.
- *Example:* \`ADD #5\` (Add the number 5 to the accumulator). Used to initialize registers to constants.

### 3. Register Mode
The operand is located in a specific CPU register. The instruction provides the name/number of the register.
- *Example:* \`ADD R1\` (Add the contents of Register R1). Very fast because no memory access is required.

### 4. Direct Addressing Mode
The instruction contains the exact memory address of the operand.
- *Example:* \`LOAD 1000\` (Go to memory address 1000 and load the data).

### 5. Indirect Addressing Mode
The instruction contains the memory address of a pointer. The CPU goes to that address, finds another address, and then goes there to get the data.
- *Example:* \`LOAD (1000)\`. If address 1000 holds the value 2500, the CPU will load the data from address 2500.

### 6. Relative Addressing Mode
The operand's effective address is calculated by adding the address field to the **Program Counter (PC)**.
- *Effective Address = PC + Address part of instruction.*
- Highly used for short jumps and branches in code, making code relocatable in memory.

### 7. Indexed Addressing Mode
The effective address is calculated by adding the address field to a special **Index Register**.
- *Effective Address = Index Register + Address part.*
- Perfect for iterating through arrays. The address part points to the start of the array, and the index register holds the counter (i=0, 1, 2...).
          `,
          shortNotes: 'Immediate: data is in the instruction. Register: data is in a register. Direct: absolute memory address. Indirect: pointer to memory. Indexed: used for arrays (Base + Index). Relative: PC + offset.',
          examples: [
            {
              title: 'Indexed Mode for Arrays',
              code: 'LOAD 500(XR)',
              explanation: 'Assume Index Register (XR) holds 2. The CPU adds 500 + 2 = 502. It loads data from memory location 502. If XR increments, it loads 503 next.'
            }
          ],
          keyPoints: [
            'Addressing modes determine how the effective address of an operand is calculated.',
            'Immediate mode embeds the actual data in the instruction.',
            'Register mode is the fastest as it accesses internal CPU registers.',
            'Indirect mode uses pointers, requiring multiple memory accesses.',
            'Indexed mode is specifically designed to efficiently process arrays and loops.'
          ],
          mcqs: [
            {
              question: 'Which addressing mode contains the actual operand value within the instruction itself?',
              options: ['Direct', 'Immediate', 'Indirect', 'Register'],
              correctAnswer: 1,
              explanation: 'Immediate mode provides the data directly (e.g., ADD #5), so no memory address is needed.'
            },
            {
              question: 'Which addressing mode is most suitable for iterating through elements of an array?',
              options: ['Indexed addressing', 'Implied addressing', 'Immediate addressing', 'Direct addressing'],
              correctAnswer: 0,
              explanation: 'Indexed addressing adds an index register to a base address, making it perfect for looping through contiguous array elements.'
            },
            {
              question: 'In Relative Addressing mode, the effective address is calculated relative to which register?',
              options: ['Accumulator (AC)', 'Stack Pointer (SP)', 'Program Counter (PC)', 'Index Register (XR)'],
              correctAnswer: 2,
              explanation: 'Relative addressing adds an offset to the Program Counter (PC) to branch to nearby instructions.'
            }
          ]
        },
        {
          id: 'risc-vs-cisc',
          title: 'RISC vs CISC Architecture',
          simpleExplanation: 'RISC uses simple, fast instructions that do one thing. CISC uses complex, heavy instructions that can do many things at once. RISC focuses on software doing the work; CISC focuses on hardware doing the work.',
          detailedExplanation: `
## RISC vs CISC Architecture

When designing a CPU's instruction set, engineers historically had to choose between two fundamentally different design philosophies: **RISC** (Reduced Instruction Set Computer) and **CISC** (Complex Instruction Set Computer).

### 1. CISC (Complex Instruction Set Computer)
The goal of CISC is to make the programmer's life easier and keep assembly programs short. 
- **Philosophy:** Provide highly complex instructions that can perform multiple operations (like memory access, math, and storage) in a single command.
- **Hardware:** Because instructions are complex, the CPU hardware (Control Unit) must be very complex. It usually relies heavily on **Microprogrammed control**.
- **Memory:** Instructions vary in length (some are 8 bits, some are 64 bits). Memory accesses are allowed directly within math instructions.
- **Examples:** Intel x86 processors (used in most PCs and laptops).

### 2. RISC (Reduced Instruction Set Computer)
The goal of RISC is raw execution speed. 
- **Philosophy:** Keep instructions extremely simple. Every instruction should take exactly one clock cycle to execute. Complex tasks are broken down into multiple simple instructions.
- **Hardware:** The control unit is simple and usually **Hardwired**. This leaves more room on the silicon chip for a massive number of general-purpose registers.
- **Memory (Load/Store Architecture):** Math operations can ONLY happen between registers. You cannot add a number directly from memory. You must first LOAD it into a register, do the math, and STORE it back.
- **Examples:** ARM processors (used in almost all smartphones, Apple Silicon M1/M2 chips).

### Summary Comparison Table
| Feature | CISC | RISC |
| :--- | :--- | :--- |
| **Instruction Size** | Variable length | Fixed length (e.g., all are 32-bit) |
| **Execution Time** | Multiple clock cycles per instruction | One clock cycle per instruction |
| **Memory Access** | Allowed in most instructions | Restricted to LOAD and STORE only |
| **Registers** | Few general-purpose registers | Large number of registers |
| **Control Unit** | Microprogrammed (complex) | Hardwired (simple, fast) |
| **Code Size** | Smaller (less memory needed) | Larger (more instructions needed for same task) |

*Modern Note: Today, the lines are blurred. Intel x86 is outwardly CISC, but internally translates those complex instructions into RISC-like micro-ops to execute them faster!*
          `,
          shortNotes: 'CISC: Complex, multi-cycle instructions, microprogrammed, variable length, Intel x86. RISC: Simple, one-cycle instructions, hardwired, fixed length, load/store architecture, ARM.',
          examples: [
            {
              title: 'Multiplication Command',
              code: 'CISC: MULT A, B (one complex command)\\nRISC: LOAD R1, A\\nLOAD R2, B\\nPROD R3, R1, R2\\nSTORE R3, A',
              explanation: 'CISC does it all in one heavy instruction. RISC breaks it down into simple load, execute, and store steps.'
            }
          ],
          keyPoints: [
            'CISC aims to reduce the number of instructions per program.',
            'RISC aims to reduce the cycles per instruction (ideally 1 cycle per instruction).',
            'RISC uses a strict Load/Store architecture; math only happens on registers.',
            'CISC instructions have variable lengths, while RISC instructions are fixed-length.',
            'Smartphones rely on RISC (ARM) because it is highly power-efficient.'
          ],
          mcqs: [
            {
              question: 'Which architecture is characterized by having a Load/Store architecture where memory can only be accessed by specific instructions?',
              options: ['CISC', 'RISC', 'Both', 'Neither'],
              correctAnswer: 1,
              explanation: 'RISC architectures restrict memory access to only LOAD and STORE commands to keep execution pipelines fast and simple.'
            },
            {
              question: 'Which of the following processors is a classic example of CISC architecture?',
              options: ['ARM Cortex', 'Apple M1', 'Intel x86', 'MIPS'],
              correctAnswer: 2,
              explanation: 'Intel x86 processors have historically used CISC, featuring highly complex and variable-length instructions.'
            },
            {
              question: 'What is a primary advantage of RISC architecture over CISC?',
              options: ['Shorter assembly code programs', 'Most instructions execute in a single clock cycle', 'Does not require registers', 'Can perform math directly on memory addresses'],
              correctAnswer: 1,
              explanation: 'By keeping instructions simple, RISC CPUs can usually execute one instruction per clock cycle, allowing for highly efficient pipelining.'
            }
          ]
        }
      ]
    },
    {
      id: 'unit-5',
      title: 'Computer Arithmetic',
      description: 'How the CPU physically performs math, including multiplication algorithms and floating-point arithmetic.',
      topics: [
        {
          id: 'booth-multiplication',
          title: "Booth's Multiplication Algorithm",
          simpleExplanation: "Booth's Algorithm is a clever math trick used by computers to multiply signed (positive and negative) binary numbers quickly by looking for blocks of 1s and skipping unnecessary additions.",
          detailedExplanation: `
## Booth's Multiplication Algorithm

Multiplication in a CPU is not a single micro-operation. It is a sequence of additions and shifts. However, standard binary multiplication gets very complicated when dealing with **signed numbers** (negative numbers represented in 2's complement). 

**Booth's Algorithm** is a powerful hardware algorithm that allows direct multiplication of two signed 2's complement numbers without needing to convert them to positive numbers first.

### How it Works (The Concept)
Booth noticed a pattern in binary math. A string of 1s in the multiplier (e.g., \`00111000\`) requires multiple consecutive additions in standard multiplication. Booth's trick replaces these multiple additions with just one subtraction and one addition.
- He observed that \`0111\` (which is 7) can be rewritten as \`1000 - 0001\` (which is 8 - 1). 
- So instead of adding 3 times, we can subtract once and add once!

### The Algorithm Rules
Booth's algorithm looks at the multiplier bits in pairs, specifically the current bit ($Q_n$) and the previous bit ($Q_{n-1}$, which is initially assumed to be 0). Based on these two bits, the ALU takes action on the Accumulator (AC):

| $Q_n$ (Current bit) | $Q_{n-1}$ (Previous bit) | Operation performed on AC |
| :--- | :--- | :--- |
| **0** | **0** | **No arithmetic.** Just Arithmetic Shift Right (ASHR). |
| **0** | **1** | **Add** Multiplicand to AC. Then ASHR. |
| **1** | **0** | **Subtract** Multiplicand from AC. Then ASHR. |
| **1** | **1** | **No arithmetic.** Just Arithmetic Shift Right (ASHR). |

*Note: The shift is an Arithmetic Shift Right, meaning the sign bit is preserved.*

### Why is it better?
1. **Handles Negatives Flawlessly**: It naturally works with 2's complement negative numbers, outputting the correct signed result.
2. **Speed**: For multipliers with long strings of 1s or 0s (e.g., \`00011110\`), it performs fewer additions/subtractions compared to the standard shift-and-add method, saving processing time.
          `,
          shortNotes: 'Booth\'s algorithm multiplies signed 2s complement numbers. It looks at pairs of bits. 01 means ADD. 10 means SUBTRACT. 00 and 11 mean DO NOTHING. Always finishes with an Arithmetic Shift Right.',
          examples: [
            {
              title: 'Decoding Booth actions',
              code: 'Multiplier bits transition: 1 -> 0',
              explanation: 'When transitioning from 1 to 0, it means we reached the end of a string of 1s. The algorithm tells the ALU to SUBTRACT the multiplicand and shift.'
            }
          ],
          keyPoints: [
            'Booth\'s algorithm is used for multiplying signed 2s complement numbers.',
            'It works by scanning the multiplier bits in overlapping pairs.',
            'A 10 pair triggers a subtraction.',
            'A 01 pair triggers an addition.',
            '00 and 11 pairs trigger no math, only an Arithmetic Shift Right (saving time).',
            'It uses Arithmetic Shift Right to preserve the sign of the numbers.'
          ],
          mcqs: [
            {
              question: 'What is the primary advantage of Booth\'s Algorithm?',
              options: ['It divides numbers faster', 'It multiplies signed 2s complement numbers directly', 'It uses less memory', 'It doesn\'t require an ALU'],
              correctAnswer: 1,
              explanation: 'Booth\'s algorithm handles positive and negative numbers uniformly in 2s complement without needing pre-conversion.'
            },
            {
              question: 'In Booth\'s algorithm, what action is taken when the current bit is 1 and the previous bit is 0 (the 10 combination)?',
              options: ['Add multiplicand and shift', 'Subtract multiplicand and shift', 'Shift only', 'Stop execution'],
              correctAnswer: 1,
              explanation: 'A 10 transition signifies the start of a block of 1s, which dictates a subtraction of the multiplicand followed by a shift.'
            },
            {
              question: 'Which type of shift operation is used repeatedly in Booth\'s Algorithm?',
              options: ['Logical Shift Left', 'Circular Shift Right', 'Arithmetic Shift Right', 'Logical Shift Right'],
              correctAnswer: 2,
              explanation: 'Arithmetic Shift Right (ASHR) is used to ensure the sign bit of the partial product is preserved during shifts.'
            }
          ]
        },
        {
          id: 'floating-point',
          title: 'Floating Point Arithmetic (IEEE 754)',
          simpleExplanation: 'Floating-point is computer scientific notation. It allows computers to represent extremely huge numbers (like the number of atoms) or extremely tiny fractions, using a Sign, an Exponent, and a Mantissa.',
          detailedExplanation: `
## Floating Point Arithmetic

Integer arithmetic is exact but limited. An ordinary 32-bit integer can only store up to about 2 billion. But what if we need to store $1.5 \times 10^{30}$ or $0.000000005$? We use **Floating-Point Representation**, which is effectively scientific notation for computers.

The standard for floating-point math is **IEEE 754**.

### Anatomy of a Floating-Point Number
In a 32-bit (Single Precision) IEEE 754 format, the bits are divided into three parts:
1. **Sign bit (1 bit)**: Bit 31. \`0\` means positive, \`1\` means negative.
2. **Exponent (8 bits)**: Bits 23-30. Represents the power of 2. 
3. **Mantissa / Significand (23 bits)**: Bits 0-22. Represents the precision bits of the number.

### 1. The Normalized Mantissa
In scientific notation, we write $1.5 \times 10^3$, not $15 \times 10^2$. We "normalize" it so there is only one non-zero digit before the decimal. 
In binary, the only non-zero digit is \`1\`. Therefore, a normalized binary number always looks like: \`1.xxxxx \times 2^y\`. 
Because the leading digit is ALWAYS 1, the IEEE 754 standard **doesn't actually store it**. It is a "hidden" bit, giving us 24 bits of precision in only 23 bits of storage!

### 2. The Biased Exponent
Exponents can be negative (for tiny fractions) or positive (for huge numbers). Instead of using 2's complement for the exponent, IEEE 754 uses a **Bias**. 
For 32-bit, the bias is **127**. 
- If the actual exponent is 3, we store $3 + 127 = 130$ in binary.
- If the actual exponent is -2, we store $-2 + 127 = 125$ in binary.
This makes comparing floating-point numbers faster because the exponent behaves like a standard unsigned integer.

### Floating-Point Addition Challenges
You cannot just add two floating-point numbers directly if their exponents are different. (You can't add $1.5 \times 10^3$ to $2.0 \times 10^2$ directly).
**Steps for FP Addition:**
1. **Compare Exponents**: Find the difference between them.
2. **Align Mantissas**: Shift the mantissa of the smaller number to the right until the exponents match.
3. **Add/Subtract Mantissas**: Perform the math.
4. **Normalize the Result**: Shift the result so it has a single leading 1, and adjust the exponent accordingly.
          `,
          shortNotes: 'IEEE 754 32-bit: 1 Sign bit, 8 Exponent bits (Biased by 127), 23 Mantissa bits. The leading 1 in the mantissa is hidden to save space. To add FP numbers, you must align their exponents first.',
          examples: [
            {
              title: 'Biased Exponent Calculation',
              code: 'Actual exponent: 5\\nBias: 127',
              explanation: 'To store an exponent of 2^5, the computer calculates 5 + 127 = 132. It stores 132 (10000100) in the exponent field.'
            }
          ],
          keyPoints: [
            'Floating-point represents numbers in scientific notation to handle vast ranges.',
            'IEEE 754 Single Precision uses 32 bits: 1 Sign, 8 Exponent, 23 Mantissa.',
            'The mantissa has a "hidden" leading 1, granting extra precision.',
            'The exponent uses a bias of 127 instead of 2s complement.',
            'Before adding floating-point numbers, their exponents must be made equal.'
          ],
          mcqs: [
            {
              question: 'In the IEEE 754 single-precision format, how many bits are allocated for the Exponent?',
              options: ['1 bit', '8 bits', '23 bits', '32 bits'],
              correctAnswer: 1,
              explanation: '8 bits are used for the biased exponent, 23 for the mantissa, and 1 for the sign, totaling 32 bits.'
            },
            {
              question: 'What is the purpose of adding a bias (127) to the exponent?',
              options: ['To allow storage of negative exponents as positive integers', 'To increase the mantissa precision', 'To make the number positive', 'To avoid division by zero'],
              correctAnswer: 0,
              explanation: 'Biasing shifts the range of exponents so that both negative and positive exponents can be stored and compared easily as unsigned binary numbers.'
            },
            {
              question: 'What must be done before adding two floating-point numbers?',
              options: ['Multiply their mantissas', 'Align their mantissas by matching their exponents', 'Normalize them to 0', 'Add their biases'],
              correctAnswer: 1,
              explanation: 'Just like in scientific notation, you cannot add mantissas unless the numbers share the exact same power of 2 (exponent).'
            }
          ]
        },
        {
          id: 'cla-adder',
          title: 'Carry Lookahead Adder (CLA)',
          simpleExplanation: 'Normal adders are slow because they wait for the "carry" to ripple through from right to left. A Carry Lookahead Adder uses clever logic gates to predict the carry instantly, making addition incredibly fast.',
          detailedExplanation: `
## Carry Lookahead Adder (CLA)

Addition is the most frequently performed operation in a CPU. A standard parallel adder is called a **Ripple Carry Adder**. It links multiple full adders together. 
The problem? The third adder cannot compute its final result until it receives the carry bit from the second adder, which waits for the first. The carry bit "ripples" through the circuit. For a 32-bit number, waiting for 32 ripples is unacceptably slow.

To solve this, engineers invented the **Carry Lookahead Adder (CLA)**. It calculates the carry bits *in advance* based on the input signals, completely eliminating the ripple delay.

### The Concept of Generate and Propagate
The CLA introduces two new boolean concepts for every bit position $i$:
1. **Carry Generate ($G_i$)**: $G_i = A_i \cdot B_i$
   - A carry is "generated" at this stage if BOTH inputs A and B are 1. (Because 1+1 definitely produces a carry, regardless of previous stages).
2. **Carry Propagate ($P_i$)**: $P_i = A_i \oplus B_i$
   - A carry is "propagated" through this stage if AT LEAST ONE input is 1. (If one input is 1, and a carry comes in from behind, it will get passed along).

### The Lookahead Logic
Using G and P, the CLA hardware can calculate ANY carry bit $C_{i+1}$ instantly without waiting for the previous sum. 
The formula for the next carry is:
$C_{i+1} = G_i + (P_i \cdot C_i)$
*Translation: The next carry is 1 IF this stage generated a carry, OR IF this stage can propagate a carry AND a carry actually came in.*

If we expand this mathematically for $C_2$, $C_3$, $C_4$, we get equations that only depend on the very first initial carry ($C_0$) and the inputs A and B. 

### Implementation and Cost
The CLA uses a complex network of AND/OR gates to compute these formulas simultaneously. 
- **Advantage:** Speed. A 16-bit CLA adds numbers almost instantly compared to a ripple adder.
- **Disadvantage:** Complexity and Cost. The boolean equations get massively large for higher bits. Building a pure 32-bit CLA requires too many gates. Therefore, CPUs usually group them (e.g., building 4-bit CLA blocks and linking them together).
          `,
          shortNotes: 'Ripple adders are slow because the carry ripples. CLA uses Generate (G = AB) and Propagate (P = A XOR B) logic to calculate carries instantly without waiting. Fast but requires more hardware gates.',
          examples: [
            {
              title: 'Carry Generate Condition',
              code: 'A = 1, B = 1',
              explanation: 'Since 1+1 is 10 (in binary), a carry of 1 is definitely generated here, regardless of what came from the previous stage. So G = 1.'
            }
          ],
          keyPoints: [
            'Ripple Carry Adders suffer from delay because carries must propagate sequentially.',
            'Carry Lookahead Adders (CLA) compute carries in advance using logic gates.',
            'Carry Generate (G) occurs when both input bits are 1.',
            'Carry Propagate (P) occurs when one input bit is 1.',
            'CLA is significantly faster but requires much more complex hardware.'
          ],
          mcqs: [
            {
              question: 'What is the primary drawback of a Ripple Carry Adder?',
              options: ['It uses too much power', 'It cannot add negative numbers', 'It suffers from propagation delay due to rippling carries', 'It requires too many logic gates'],
              correctAnswer: 2,
              explanation: 'In a ripple carry adder, higher-order bits cannot be computed until the carry from lower-order bits has propagated through the circuit.'
            },
            {
              question: 'In a CLA, what does the Carry Generate (G) signal indicate?',
              options: ['The sum is 0', 'The previous stage produced a carry', 'The current stage inputs will absolutely produce a carry', 'The circuit has overheated'],
              correctAnswer: 2,
              explanation: 'G occurs when A and B are both 1. This guarantees a carry out, independent of the carry in.'
            },
            {
              question: 'How is the Carry Propagate (P) calculated for inputs A and B?',
              options: ['A AND B', 'A XOR B', 'A OR B', 'NOT A'],
              correctAnswer: 1,
              explanation: 'Propagate is typically calculated as A XOR B (or sometimes A OR B), meaning the stage will pass an incoming carry to the next stage.'
            }
          ]
        }
      ]
    },
    {
      id: 'unit-6',
      title: 'Memory & I/O Organization',
      description: 'Understanding the memory hierarchy, Cache mapping, Virtual Memory, and how the CPU talks to external devices.',
      topics: [
        {
          id: 'memory-hierarchy',
          title: 'Memory Hierarchy & Cache Memory',
          simpleExplanation: 'Fast memory is expensive and small. Slow memory is cheap and huge. The memory hierarchy puts small, fast Cache close to the CPU, and large, slow RAM further away, creating the illusion of memory that is both fast AND huge.',
          detailedExplanation: `
## Memory Hierarchy

No single type of memory can be extremely fast, infinitely large, and cheap at the same time. To balance cost, capacity, and performance, computers use a **Memory Hierarchy**.

**The Pyramid Structure (Top to Bottom):**
1. **CPU Registers:** Inside the CPU. Fastest, but only holds a few bytes.
2. **Cache Memory:** Built on or near the CPU chip. Very fast SRAM. Holds megabytes.
3. **Main Memory (RAM):** Slower DRAM. Holds gigabytes.
4. **Secondary Storage:** Magnetic disks (HDD) or SSDs. Slowest, but holds terabytes permanently.

### Cache Memory
Cache memory is the buffer between the blazing-fast CPU and the slower RAM. It relies on the **Locality of Reference** principle:
- **Spatial Locality:** If a CPU accesses a memory address, it will likely access nearby addresses soon (e.g., arrays).
- **Temporal Locality:** If a CPU accesses an address, it will likely access it again soon (e.g., loops).
When the CPU needs data, it checks the Cache first (Cache Hit). If not there (Cache Miss), it fetches a whole block from RAM into Cache.

### Cache Mapping Techniques
Main memory is huge, cache is small. How do we map RAM blocks into Cache lines? 

**1. Direct Mapping**
Every block in main memory has exactly *one* specific line in the cache where it can be stored. 
- *Formula:* \`Cache Line = Memory Block Number MOD Total Cache Lines\`
- *Pros:* Simple and fast to check.
- *Cons:* Thrashing. If two frequently used RAM blocks map to the exact same cache line, they will constantly kick each other out.

**2. Associative Mapping**
A main memory block can be stored in *ANY* available line in the cache. 
- *Pros:* Extremely flexible, no thrashing.
- *Cons:* The CPU must search every single tag in the cache simultaneously to find data, requiring massive, expensive comparator hardware.

**3. Set-Associative Mapping (The Compromise)**
The cache is divided into "sets" (e.g., a set containing 2 or 4 lines). A memory block maps to a specific *set*, but can be placed *anywhere* within that set.
- *Example:* In 4-way set-associative mapping, a memory block has 4 possible lines it can live in.
- This balances the simplicity of direct mapping with the flexibility of associative mapping, and is used in almost all modern CPUs.
          `,
          shortNotes: 'Memory Hierarchy: Registers -> Cache -> RAM -> Disk. Cache uses Locality of Reference. Direct mapping: 1 specific spot. Associative: anywhere. Set-Associative: anywhere within a specific set.',
          examples: [
            {
              title: 'Direct Mapping Conflict',
              code: 'RAM block 1 maps to Cache line 1.\\nRAM block 101 also maps to Cache line 1.',
              explanation: 'If a program constantly switches between reading block 1 and 101, the cache line will keep getting overwritten, destroying performance. This is called thrashing.'
            }
          ],
          keyPoints: [
            'Memory hierarchy balances speed, capacity, and cost.',
            'Cache memory exploits Spatial and Temporal locality to speed up CPU access.',
            'Direct mapping restricts a memory block to one specific cache line.',
            'Associative mapping allows a block to go anywhere in the cache.',
            'Set-associative mapping is a hybrid approach used in modern processors to reduce thrashing.'
          ],
          mcqs: [
            {
              question: 'Which principle suggests that if a memory location is accessed, nearby locations will be accessed soon?',
              options: ['Temporal Locality', 'Spatial Locality', 'Direct Mapping', 'Virtual Memory'],
              correctAnswer: 1,
              explanation: 'Spatial locality refers to the tendency of execution to involve memory addresses that are clustered together, like arrays.'
            },
            {
              question: 'In which cache mapping technique can a memory block be placed in ANY cache line?',
              options: ['Direct Mapping', 'Associative Mapping', 'Set-Associative Mapping', 'Virtual Mapping'],
              correctAnswer: 1,
              explanation: 'Associative mapping provides full flexibility by allowing any block to occupy any cache line, requiring complex search hardware.'
            },
            {
              question: 'What is a major disadvantage of Direct Mapping?',
              options: ['It is too slow to search', 'It is very complex to build', 'It suffers from thrashing if blocks map to the same line', 'It cannot hold data from main memory'],
              correctAnswer: 2,
              explanation: 'Since a memory block has only one valid location in cache, multiple active blocks competing for that same spot will cause continuous evictions (thrashing).'
            }
          ]
        },
        {
          id: 'virtual-memory',
          title: 'Virtual Memory & TLB',
          simpleExplanation: 'Virtual Memory tricks programs into thinking they have infinite RAM. When physical RAM is full, the OS secretly moves idle chunks of memory to the hard drive to free up space.',
          detailedExplanation: `
## Virtual Memory

Modern operating systems run dozens of large applications simultaneously. Physical RAM gets full quickly. **Virtual Memory** is an architectural concept that allows a computer to execute programs larger than the available physical RAM.

It separates the **Logical Addresses** (what the program sees) from the **Physical Addresses** (the actual silicon RAM chips). 
To the programmer, memory appears as one massive, continuous blank slate. Behind the scenes, the Memory Management Unit (MMU) translates these logical addresses into physical ones.

### Paging
Virtual memory is implemented using **Paging**. 
- The Logical memory is divided into fixed-size blocks called **Pages**.
- The Physical RAM is divided into blocks of the exact same size called **Page Frames**.
- The OS decides which Pages are loaded into which Frames. If RAM is full, the OS takes an idle Page and moves it to the hard disk (a process called Swapping or Paging Out).

### The Page Table
How does the CPU know which Page is in which Frame? It uses a **Page Table** stored in main memory. 
When a program requests a logical address, the CPU:
1. Splits the address into a Page Number and an Offset.
2. Looks up the Page Number in the Page Table.
3. Finds the corresponding Physical Frame Number.
4. Attaches the Offset to the Frame Number to get the final Physical Address.

### The TLB (Translation Lookaside Buffer)
There is a massive performance problem with Virtual Memory. To read one piece of data, the CPU must now access memory **TWICE**: once to read the Page Table, and once to read the actual data. This cuts CPU speed in half!

To solve this, hardware engineers added a specialized cache inside the MMU called the **TLB (Translation Lookaside Buffer)**.
- The TLB is a small, ultra-fast associative cache that stores the most recently used Page-to-Frame translations.
- When the CPU generates a logical address, it checks the TLB first.
- If it's a **TLB Hit**, it gets the physical address instantly. No double memory access!
- If it's a **TLB Miss**, it must do the slow Page Table lookup in RAM, but it will then copy that translation into the TLB for next time.
          `,
          shortNotes: 'Virtual memory separates logical addresses from physical ones using Paging. The OS maps Pages to Frames via a Page Table. TLB is a fast cache for the Page Table to prevent double memory accesses.',
          examples: [
            {
              title: 'Page Fault',
              code: 'CPU looks up Page 5 in Page Table. Valid bit is 0.',
              explanation: 'This means Page 5 is currently stored on the Hard Drive, not in RAM. This triggers a "Page Fault" interrupt. The OS pauses the program, fetches Page 5 from disk into RAM, updates the table, and resumes.'
            }
          ],
          keyPoints: [
            'Virtual memory allows execution of processes larger than physical RAM.',
            'Memory is divided into equal-sized Pages (logical) and Frames (physical).',
            'The Page Table acts as a map to translate logical addresses to physical addresses.',
            'A Page Fault occurs when the requested page is on the disk, not in RAM.',
            'The TLB is a hardware cache that speeds up address translation significantly.'
          ],
          mcqs: [
            {
              question: 'What is the purpose of the Page Table in Virtual Memory?',
              options: ['To store cache data', 'To translate logical page numbers to physical frame numbers', 'To format the hard drive', 'To execute microinstructions'],
              correctAnswer: 1,
              explanation: 'The Page Table holds the mapping information required by the MMU to convert virtual addresses into real physical RAM addresses.'
            },
            {
              question: 'What happens when a CPU requests a memory page that is currently located on the hard disk?',
              options: ['Cache hit', 'System crash', 'Page fault', 'TLB hit'],
              correctAnswer: 2,
              explanation: 'A page fault is an interrupt that tells the OS to halt the program temporarily and retrieve the required page from secondary storage.'
            },
            {
              question: 'Why is the TLB (Translation Lookaside Buffer) necessary?',
              options: ['To increase hard drive speed', 'To prevent the CPU from accessing main memory twice for every read/write', 'To cool down the CPU', 'To store floating point numbers'],
              correctAnswer: 1,
              explanation: 'Without a TLB, every memory reference requires one RAM access for the page table and another for the data. The TLB caches translations to eliminate the first access.'
            }
          ]
        },
        {
          id: 'io-interface',
          title: 'I/O Organization (Interrupts & DMA)',
          simpleExplanation: 'The CPU is billions of times faster than a keyboard or a hard drive. I/O organization is about how they communicate efficiently without the CPU wasting its time waiting for slow devices.',
          detailedExplanation: `
## I/O Organization

Peripherals (keyboards, printers, disks) operate electromechanically and are astronomically slower than the CPU. The I/O interface handles the data transfer between the CPU and these slow devices. There are three main methods for this communication:

### 1. Programmed I/O
In this method, the CPU is completely in charge of the I/O operation. 
- If the CPU wants to read from a keyboard, it requests data, and then enters a tight loop, constantly asking the keyboard, "Are you ready? Are you ready? Are you ready?"
- This is called **Polling**. 
- **Drawback:** It is a massive waste of CPU time. The fast CPU sits idle doing nothing but checking status flags.

### 2. Interrupt-Initiated I/O
To solve the polling problem, we use **Interrupts**.
- The CPU issues a command to the I/O device (e.g., "Read data") and then goes back to doing useful work (executing other programs).
- When the slow I/O device finally has the data ready, it sends an electrical signal over an **Interrupt Request Line**.
- The CPU detects the interrupt, pauses its current program, saves its state, jumps to an Interrupt Service Routine (ISR) to handle the data, and then resumes its original work.

#### Priority Interrupts
What if a mouse and a hard drive interrupt at the same time? We need priority.
- **Daisy Chaining:** A hardware method. All devices are connected in a serial line. The device closest to the CPU has the highest priority. If the CPU acknowledges the interrupt, the signal passes down the line until the requesting device intercepts it.
- **Parallel Priority:** Uses a Priority Encoder chip. All devices connect to this chip simultaneously. The chip mathematically determines the highest priority request and sends only that one to the CPU.

### 3. Direct Memory Access (DMA)
Interrupts are great for keyboards, but terrible for hard drives. If a hard drive transfers a 10MB file, it would interrupt the CPU millions of times!
For high-speed bulk transfers, we use a **DMA Controller**.
- The CPU tells the DMA controller: "Move 10MB of data from the disk to RAM starting at address X."
- The CPU then completely disconnects from the system bus.
- The DMA controller takes over the bus, acting as a mini-CPU. It manages the massive data transfer directly from the Disk into RAM, without involving the main CPU at all.
- When the transfer is finished, the DMA controller sends *one single interrupt* to tell the CPU it is done.
          `,
          shortNotes: 'Programmed I/O: CPU wastes time polling. Interrupt I/O: Device taps CPU on the shoulder when ready. Priority resolved by Daisy chain (serial) or Priority Encoder (parallel). DMA: Specialized chip handles massive data transfers directly to RAM, freeing the CPU.',
          examples: [
            {
              title: 'DMA in Action',
              code: 'Loading a video game level.',
              explanation: 'The CPU commands the DMA to load 2GB of textures from the SSD to RAM. While the DMA does this heavy lifting, the CPU uses that time to calculate game physics and AI.'
            }
          ],
          keyPoints: [
            'Programmed I/O relies on Polling, which wastes CPU cycles waiting on slow devices.',
            'Interrupt-driven I/O allows the CPU to work on other tasks until the device is ready.',
            'Daisy chaining establishes priority by physical proximity on a serial wire.',
            'DMA (Direct Memory Access) allows peripherals to write directly to RAM bypassing the CPU.',
            'DMA is essential for high-bandwidth devices like disks and network cards.'
          ],
          mcqs: [
            {
              question: 'Which I/O transfer method completely occupies the CPU by forcing it to repeatedly check a status bit?',
              options: ['Direct Memory Access', 'Interrupt-driven I/O', 'Programmed I/O (Polling)', 'Daisy Chaining'],
              correctAnswer: 2,
              explanation: 'In Programmed I/O, the CPU remains trapped in a polling loop waiting for the device, severely degrading performance.'
            },
            {
              question: 'What is the primary function of a DMA Controller?',
              options: ['To manage virtual memory', 'To allow high-speed data transfer between peripherals and memory without CPU intervention', 'To increase CPU clock speed', 'To execute microinstructions'],
              correctAnswer: 1,
              explanation: 'The DMA controller temporarily takes control of the system bus to stream data directly into RAM, freeing the CPU.'
            },
            {
              question: 'In a Daisy Chain priority system, how is the priority of a device determined?',
              options: ['By its software assigned ID', 'By the size of its data', 'By its physical electrical proximity to the CPU', 'By a parallel priority encoder chip'],
              correctAnswer: 2,
              explanation: 'Devices physically wired closer to the CPU on the daisy chain receive the acknowledge signal first, giving them higher priority.'
            }
          ]
        }
      ]
    }
  ]
};
