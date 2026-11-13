### Unit-1 Computer Data Representation & Register Transfer and Micro-operations

**Computer Organization & Architecture (COA)**

### 

**Looping**

**Outline**

**Basic computer data types & Complements**

**Fixed point & Floating point representation**

**Register transfer language**

**Bus and Memory transfers (Three-State Bus Buffers, Memory Transfer)**

**Arithmetic Micro-operations**

**Logic Micro-operations**

**Shift Micro-operations**

**Arithmetic logical shift unit**

### Basic computer data types & Complements

- Section - 1

### Basic Computer Data Types & Complements

- Decimal Number System
  - Radix(r) = 10, Number range = 0 - 9
- Binary Number System
  - Radix(r) = 2, Number range = 0 - 1
- Octal Number System
  - Radix(r) = 8, Number range = 0 - 7
- Hexadecimal Number System
  - Radix(r) = 16, Number range = 0 - 9 & A - F
- (r-1)’s complement
  - 9’s complement
  - 1’s complement
  - 7’s complement
  - 15’s complement
- r’s complement
  - 10’s complement
  - 2’s complement
  - 8’s complement
  - 16’s complement

**Basic Computer Data Types**

**Complements**

### Fixed point & Floating point representation

- Section - 2

### Fixed point representation

- Integer Representation
  - Signed-magnitude representation
  - 1’s complement representation
  - 2’s complement representation
- Arithmetic Addition
  - Using 1’s complement
  - Using 2’s complement
- Arithmetic Subtraction
  - Using 1’s complement
  - Using 2’s complement
- Example: Represent (-14)
  - Signed-magnitude representation : 1 0001110
  - 1’s complement representation : 1 1110001
  - 2’s complement representation : 1 1110010

| + 6 | 00000110 |
|---|---|
| + 13 | 00001101 |
| + 19 | 00010011 |

| + 6 | 00000110 |
|---|---|
| - 13 | 11110011 |
| - 7 | 11111001 |

**Note: negative number must initially be in 2’s complement**

### Floating point representation

- Two parts
  - Mantissa – Represents signed fixed-point number
  - Exponent – Represents position of the decimal point
- For example, the decimal number +6132.789 is represented in floating-point with a fraction and an exponent as follows:
- The value of the exponent indicates that the actual position of the decimal point is four positions to the right of the indicated decimal point in the fraction.
- Floating-point is always interpreted to represent a number in the following form: m X re

**Here, m stands for mantissa, e stands for exponent, r means radix**

**Fraction**

**+0.6132789**

**Exponent**

**+04**

### Floating point representation (cont.)

- Normalization
  - A floating point number is said to be normalized if the most significant digit of the mantissa is nonzero.
  - For example, the decimal number 350 is normalized but 00035 is not.
- ANSI 32-bit floating point byte format
- S = Sign of Mantissa, E = Exponent bits, M = Mantissa bits
- Example, 13 = 1101 = 0.1101 x 24
- = 00000100 .11010000 00000000 00000000

**Byte 1**

**SEEEEEEE**

**Byte 2**

**.MMMMMMMM**

**Byte 3**

**Byte 4**

**MMMMMMMM**

**MMMMMMMM**

### Register transfer language

- Section - 3

### Register

- Computer Registers are designated by capital letters.
- For example,
  - MAR – Memory Address Register
  - PC – Program Counter
  - IR – Instruction Register
  - R1 – Processor Register

| 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
|---|---|---|---|---|---|---|---|

| PC (H) | PC (L) |
|---|---|

**Register R**

**Showing individual bits**

**Numbering of bits**

**Divided into two parts**

### Register Transfer Language

- Information transfer from one register to another is designated in symbolic form by means of a replacement operator is known as Register Transfer.
- The statement
- denotes a transfer of the content of register 𝑅1 into register 𝑅2.

| 1 | 1 | 0 | 1 |
|---|---|---|---|

| 1 | 1 | 0 | 1 |
|---|---|---|---|

**R1**

**R2**

- The symbolic notation used to describe the microoperation transfers among registers is called a register transfer language.

The term "register transfer" implies the availability of hardware logic circuits that can perform a stated microoperation and transfer the result of the operation to the same or another register.

A register transfer language is a system for expressing in symbolic form the microoperation sequences among the registers of a digital module.

### Register Transfer with Control Function

- Control
- circuit
- Load
- P
- Clock
- n
- t
- t+1
- Load
- Transfer occurs here

### Bus and Memory transfers

- Section - 4

### Common Bus System for 4 registers

- A typical digital computer has many registers, and paths must be provided to transfer information from one register to another.
- The number of wires will be excessive if separate lines are used between each register and all other registers in the system.
- A more efficient scheme for transferring information between registers in a multiple-register configuration is a common bus system.
- A bus structure consists of a set of common lines, one for each bit of a register, through which binary information is transferred one at a time.
- One way of constructing a common bus system is with multiplexers.
- The multiplexers select the source register whose binary information is then placed on the bus.
- 3 2 1 0
- 3 2 1 0
- 3 2 1 0
- Register A
- Register B
- Register C

### Common Bus System for 4 registers (cont.)

- 4 x 1
- MUX 3
- 3 2 1 0
- 3 2 1 0
- 4 x 1
- MUX 2
- 3 2 1 0
- 3 2 1 0
- 4 x 1
- MUX 1
- 3 2 1 0
- 3 2 1 0
- 4 x 1
- MUX 0
- 3 2 1 0
- 3 2 1 0
- S1
- S0
- 4-line common bus
- D2
- D1
- D0
- C2
- C1
- C0
- B2
- B1
- B0
- A2
- A1
- A0
- Register A
- Register B
- Register C
- Register D
- D2
- D1
- D0
- C2
- C1
- C0
- B2
- B1
- B0
- A2
- A1
- A0
- A2
- A1
- A0
- A3

### Common Bus System for 4 registers (cont.)

- The construction of a bus system for four registers is explained earlier.
- Each register has four bits, numbered 0 through 3.
- The bus consists of four 4 x 1 multiplexers each having four data inputs, 0 through 3, and two selection inputs, S1 and S0.
- The diagram shows that the bits in the same significant position in each register are connected to the data inputs of one multiplexer to form one line of the bus.
- The two selection lines S1 and S0 are connected to the selection inputs of all four multiplexers.
- The selection lines choose the four bits of register and transfer them into the four-line common bus.
- When S1S0 = 00, the 0 data inputs of all four multiplexers are selected and applied to the outputs that form the bus.
- This causes the bus lines to receive the content of register A since the outputs of this register are connected to the 0 data inputs of the multiplexers.

### Common Bus System for 4 registers (cont.)

- Table shows the register that is selected by the bus for each of the four possible binary values of the selection lines.
- In general, a bus system will multiplex k registers of n bits each to produce an n-line common bus.
- The number of multiplexers needed to construct the bus is equal to n, the number of bits in each register.
- The size of each multiplexer must be k x 1 since it multiplexes k data lines.
- For example, a common bus for eight registers of 16 bits requires
- Multiplexers - 16 of (8 x 1)
- Select Lines - 3

| S1 | S0 | Register Selected |
|---|---|---|
| 0 | 0 | A |
| 0 | 1 | B |
| 1 | 0 | C |
| 1 | 1 | D |

### Tri-state Buffer (3 state Buffer)

- A three-state gate is a digital circuit that exhibits three states.
- Two of the states are signals equivalent to logic 1 and 0 as in a conventional gate.
- The third state is high impedance state which behaves like an open circuit, which means that the output is disconnected and does not have logic significance.
- The control input determines the output state. When the control input C is equal to 1, the output is enabled and the gate behaves like any conventional buffer, with the output equal to the normal input.
- When the control input C is 0, the output is disabled and the gate goes to a high-impedance state, regardless of the value in the normal input.
- Normal Input A
- Control Input C
- Output Y = A if C =1
- High-impedance if C = 0

### Common Bus System using Decoder and Tri-state Buffer

- 2 x 4
- Decoder
- S1
- S0
- E
- Select
- Enable
- A0
- B0
- C0
- D0
- Bus line for bit 0
- C0

### Common Bus System using Decoder and Tri-state Buffer (cont.)

- The construction of a bus system with three-state buffers is demonstrated in previous figure.
- The outputs of four buffers are connected together to form a single bus line.
- The control inputs to the buffers determine which of the four normal inputs will communicate with the bus line.
- The connected buffers must be controlled so that only one three-state buffer has access to the bus line while all other buffers are maintained in a high impedance state.
- One way to ensure that no more than one control input is active at any given time is to use a decoder, as shown in the figure: Bus line with three state-buffers.
- When the enable input of the decoder is 0, all of its four outputs are 0, and the bus line is in a high-impedance state because all four buffers are disabled.
- When the enable input is active, one of the three-state buffers will be active, depending on the binary value in the select inputs of the decoder.

### Arithmetic Micro-operations

- Section - 5

### Arithmetic Microoperations

- Arithmetic microoperations perform arithmetic operations on numeric data stored in registers.

**Add Microoperation**

**Subtract Microoperation**

| Symbolic Designation | Description |
|---|---|

### 4-bit Binary Adder

- The digital circuit that generates the arithmetic sum of two binary numbers of any length is called a binary adder.
- Example

**+**

**R1**

**R2**

**C**

**Sum**

**FA**

**FA**

**FA**

**FA**

**A0**

**B0**

**A1**

**B1**

**A2**

**B2**

**A3**

**B3**

**C0**

**S0**

**S1**

**S2**

**S3**

**C1**

**C2**

**C3**

**C4**

**A**

**B**

### Slide 24

- The binary adder is constructed with full-adder circuits connected in cascade, with the output carry from one full-adder connected to the input carry of the next full-adder.
- The figure shows the interconnections of four full-adders (FA) to provide a 4-bit binary adder.
- The augends bits of A and the addend bits of B are designated by subscript numbers from right to left, with subscript 0 denoting the low-order bit.

**The carries are connected in a chain through the full-adders.**

**The input carry to the binary adder is C0 and the output carry is C4.**

**The S outputs of the full-adders generate the required sum bits.**

**An n-bit binary adder requires n full-adders.**

- The output carry from each full-adder is connected to the input carry of the next-high-order full-adder.
- The n data bits for the A inputs come from one register (such as R1), and the n data bits for the B inputs come from another register (such as R2). The sum can be transferred to a third register or to one of the source registers (R1 or R2), replacing its previous content.

### 4-bit Binary Adder-Subtractor

**FA**

**FA**

**FA**

**FA**

**A0**

**B0**

**A1**

**B1**

**A2**

**B2**

**A3**

**B3**

**C0**

**S0**

**S1**

**S2**

**S3**

**C1**

**C2**

**C3**

**C4**

**M**

**B0**

**B1**

**B2**

**B3**

**B0’**

**B1’**

**B2’**

**B3’**

**When M = 0, we have**

**C0 = 0 & B ⊕ 0 = B**

**When M = 1, we have**

**C0 = 1 & B ⊕ 1 = B’**

**when M = 0 the circuit is an Adder**

**when M = 1 the circuit becomes a Subtractor**

### 4-bit Binary Incrementer

- The increment microoperation adds one to a number in a register.

**+**

**R1**

**C**

**Sum**

**x**

**y**

**C**

**S**

**HA**

**x**

**y**

**C**

**S**

**HA**

**x**

**y**

**C**

**S**

**HA**

**x**

**y**

**C**

**S**

**HA**

**A0**

**A1**

**A2**

**A3**

**S0**

**S1**

**S2**

**S3**

**C4**

### 4-bit Arithmetic Circuit

- The arithmetic micro operations can be implemented in one composite arithmetic circuit.
- The basic component of an arithmetic circuit is the parallel adder.
- By controlling the data inputs to the adder, it is possible to obtain different types of arithmetic operations.
- The output of binary adder is calculated from arithmetic sum.
- 𝑫=𝑨+𝒀+𝑪𝒊𝒏

**Decrement using 2’s complement**

**-**

**+**

**2’s complement**

**Discard carry**

### 4-bit Arithmetic Circuit (cont.)

- Decremented content of A
- S1 S0 0 1 2 3
- 4 x 1
- MUX
- S1 S0 0 1 2 3
- 4 x 1
- MUX
- S1 S0 0 1 2 3
- 4 x 1
- MUX
- S1 S0 0 1 2 3
- 4 x 1
- MUX

**C0**

**C1**

**X0**

**Y0**

**FA**

**C1**

**C2**

**X1**

**Y1**

**FA**

**C2**

**C3**

**X2**

**Y2**

**FA**

**C3**

**C4**

**X3**

**Y3**

**FA**

**D0**

**D1**

**D2**

**D3**

**Cout**

**Cin**

**S1**

**S0**

**A0**

**A1**

**A2**

**A3**

**B1**

**B2**

**B3**

**B0**

### 4-bit Arithmetic Circuit (cont.)

- Hardware implementation consists of:
- 4 full-adder circuits that constitute the 4-bit adder and four multiplexers for choosing different operations.
- There are two 4-bit inputs A and B.
- The four inputs from A go directly to the X inputs of the binary adder. Each of the four inputs from B is connected to the data inputs of the multiplexers. The multiplexer’s data inputs also receive the complement of B.
- The other two data inputs are connected to logic-0 and logic-1.
  - Logic-0 is a fixed voltage value (0 volts for TTL integrated circuits)
  - Logic-1 signal can be generated through an inverter whose input is 0.
- The four multiplexers are controlled by two selection inputs, S1 and S0.
- The input carry Cin goes to the carry input of the FA in the least significant position. The other carries are connected from one stage to the next.
- 4-bit output D0…D3

### 4-bit Arithmetic Circuit (cont.)

### 4-bit Arithmetic Circuit (cont.)

- Arithmetic Circuit Function

| S1 | S0 | Cin | Y | D = A + Y + Cin | Microoperation |
|---|---|---|---|---|---|

| 0 | 0 | 0 | B | D = A + B | Add |
|---|---|---|---|---|---|

| 0 | 0 | 1 | B | D = A + B + 1 | Add with carry |
|---|---|---|---|---|---|

| 0 | 1 | 0 | B’ | D = A + B’ | Subtract with borrow |
|---|---|---|---|---|---|

| 0 | 1 | 1 | B’ | D = A + B’ + 1 | Subtract |
|---|---|---|---|---|---|

| 1 | 0 | 0 | 0 | D = A | Transfer |
|---|---|---|---|---|---|

| 1 | 0 | 1 | 0 | D = A + 1 | Increment A |
|---|---|---|---|---|---|

| 1 | 1 | 0 | 1 | D = A – 1 | Decrement A |
|---|---|---|---|---|---|

| 1 | 1 | 1 | 1 | D = A | Transfer A |
|---|---|---|---|---|---|

### Logic Micro-operations

- Section - 6

### Logic Microoperations

- Logic micro operations specify binary operations for strings of bits stored in registers.
- These operations consider each bit of the register separately and treat them as binary variables.
- Example

**R1**

**R2**

**R1 after P = 1**

### Logic Microoperations (cont.)

| Boolean Function | Microoperation | Name |
|---|---|---|

| Boolean Function | Microoperation | Name |
|---|---|---|

### Hardware Implementation of Logic Circuit

**4 x 1**

**MUX**

**Ai**

**Bi**

**S1**

**S0**

**Ei**

### Applications of Logic Microoperations

- Selective Set Operation
- The selective-set operation sets to 1 the bits in register A where there are corresponding 1's in register B.
- It does not affect bit positions that have 0's in B.
- The OR microoperation can be used to selectively set bits of a register.

**A before**

**A after**

**B (logic operand)**

### Applications of Logic Microoperations (cont.)

- Selective Complement Operation
- The selective-complement operation complements bits in register A where there are corresponding 1's in register B.
- It does not affect bit positions that have 0's in B.
- The exclusive - OR microoperation can be used to selectively set bits of a register.

**A before**

**B (logic operand)**

**A after**

### Applications of Logic Microoperations (cont.)

- Selective Clear Operation
- The selective-clear operation clears to 0 the bits in register A only where there are corresponding 1's in register B.
- It does not affect bit positions that have 0's in B.
- The corresponding logic microoperation is A ← A ∧ B’.

**A before**

**B (logic operand)**

**A after**

### Applications of Logic Microoperations (cont.)

- Mask Operation
- The mask operation is similar to the selective-clear operation except that the bits of register A are cleared only where there are corresponding 0’s in register B.
- The mask operation is an AND microoperation.

**A before**

**B (logic operand)**

**A after**

### Applications of Logic Microoperations (cont.)

- Insert Operation
- The insert operation inserts a new value into a group of bits.
- This is done by first masking and then inserting them with required value.
- The mask operation is an AND microoperation and the insert operation is an OR microoperation.

**A**

**B**

**A**

**B**

**Mask**

**Insert**

**A**

**A**

### Applications of Logic Microoperations (cont.)

- Clear Operation
- The clear operation compares the words in register A and register B and produces an all 0’s result if the two numbers are equal.
- This operation is achieved by an exclusive-OR microoperation.

**A**

**B**

**A ← A ⊕ B**

### Shift Micro-operations

- Section - 7

### Shift Microoperations

- Shift microoperations are used for serial transfer of data.
- Used in conjunction with arithmetic, logic and other data processing operations.
- The content of the register can be shifted to the left or the right.
- The first flip-flop receives its binary information from the serial input.
- The information transferred through the serial input determines the type of shift.

### Types of Shift

- Logical Shift
- A logical shift is one that transfers 0 through the serial input.

| 1 | 1 | 0 | 1 |
|---|---|---|---|

**R1**

**R1**

**shl - logical shift left**

| 1 | 1 | 0 | 1 |
|---|---|---|---|

**R1**

**R1**

**shr - logical shift right**

| 1 |
|---|

| 0 |
|---|

| 1 |
|---|

| 0 |
|---|

| 0 |
|---|

| 1 |
|---|

| 1 |
|---|

| 0 |
|---|

### Types of Shift (cont.)

- Circular Shift
- A circular shift (also known as a rotate operation) circulates the bits of the register around the two ends without loss of information.
- This is accomplished by connecting the serial output of the shift register to its serial input.

| 1 | 1 | 0 | 1 |
|---|---|---|---|

**R1**

**R1**

**cil - circular shift left**

| 1 | 1 | 0 | 1 |
|---|---|---|---|

**R1**

**R1**

**cir - circular shift right**

| 1 |
|---|

| 0 |
|---|

| 1 |
|---|

| 1 |
|---|

| 1 |
|---|

| 1 |
|---|

| 1 |
|---|

| 0 |
|---|

### Types of Shift (cont.)

- Arithmetic Shift
- An arithmetic shift is a micro-operation that shifts a signed binary number to the left or right.
- An arithmetic shift-left multiplies a signed binary number by 2.
- An arithmetic shift-right divides the number by 2.

| 1 | 1 | 0 | 1 |
|---|---|---|---|

**R1**

**R1**

**ashl - arithmetic shift left**

| 1 | 1 | 0 | 1 |
|---|---|---|---|

**R1**

**R1**

**ashr - arithmetic shift right**

| 1 |
|---|

| 0 |
|---|

| 1 |
|---|

| 0 |
|---|

| 1 |
|---|

| 1 |
|---|

| 1 |
|---|

| 0 |
|---|

### 4 - bit Combinational Circuit Shifter

- S
- MUX
- S
- MUX
- S
- MUX
- S
- MUX

**A0**

**A1**

**A2**

**A3**

**H0**

**H1**

**H2**

**H3**

**Select**

- 0 – Shift right
- 1 – Shift left

**IR**

**IL**

| S | H0 | H1 | H2 | H3 |
|---|---|---|---|---|
| 0 | IR | A0 | A1 | A2 |
| 1 | A1 | A2 | A3 | IL |

### 4 - bit Combinational Circuit Shifter (cont.)

- The 4-bit shifter has four data inputs, A0 through A3 and four data outputs, H0 through H3.
- There are two serial inputs, one for shift left (IL) and the other for shift right (IL).
- When the selection input S = 0, the input data are shifted right (down in the diagram).
- When S = 1, the input data are shifted left (up in the diagram).
- The two serial inputs can be controlled by another multiplexer to provide the three possible types of shifts.

### Arithmetic logical shift unit

- Section - 8

### 4 - bit Arithmetic Logic Shift Unit

- Instead of having individual registers performing the micro operations directly, computer systems employ a number of storage registers connected to a common operational unit called an arithmetic logic unit, abbreviated ALU.
- To perform a microoperation, the contents of specified registers are placed in the inputs of the common ALU.
- The ALU performs an operation and the result of the operation is then transferred to a destination register.
- The arithmetic, logic, and shift circuits introduced in previous sections can be combined into one ALU with common selection variables.

### 4 - bit Arithmetic Logic Shift Unit (cont.)

- 4 x 1
- MUX
- One stage of arithmetic circuit
- One stage of logic circuit

**S2**

**S3**

**S1**

**S0**

**Ai**

**Bi**

**Ai-1**

**Ai+1**

**Ci**

**Ci +1**

**Di**

**Ei**

**Fi**

**shr**

**shl**

- Select

### 4 - bit Arithmetic Logic Shift Unit (cont.)

| S3 | S2 | S1 | S0 | Cin | Operation | Function |
|---|---|---|---|---|---|---|

| 0 | 0 | 0 | 0 | 0 | F = A | Transfer A |
|---|---|---|---|---|---|---|

| 0 | 0 | 0 | 0 | 1 | F = A + 1 | Increment A |
|---|---|---|---|---|---|---|

| 0 | 0 | 0 | 1 | 0 | F = A + B | Addition |
|---|---|---|---|---|---|---|

| 0 | 0 | 0 | 1 | 1 | F = A + B + 1 | Add with carry |
|---|---|---|---|---|---|---|

| 0 | 0 | 1 | 0 | 0 | F = A + B’ | Subtract with borrow |
|---|---|---|---|---|---|---|

| 0 | 0 | 1 | 0 | 1 | F = A + B’ + 1 | Subtraction |
|---|---|---|---|---|---|---|

| 0 | 0 | 1 | 1 | 0 | F = A – 1 | Decrement |
|---|---|---|---|---|---|---|

| S3 | S2 | S1 | S0 | Cin | Operation | Function |
|---|---|---|---|---|---|---|

| 0 | 0 | 1 | 1 | 1 | F = A | Transfer A |
|---|---|---|---|---|---|---|

| 0 | 1 | 1 | 0 | x | F = A ⊕B | XOR |
|---|---|---|---|---|---|---|

| 0 | 1 | 1 | 1 | x | F = A’ | Complement A |
|---|---|---|---|---|---|---|

| 1 | 0 | x | x | x | F = shr A | Shift right A into F |
|---|---|---|---|---|---|---|

| 1 | 1 | x | x | x | F = shl A | Shift left A into F |
|---|---|---|---|---|---|---|
