### Unit-7 Computer Arithmetic

### 

**Looping**

**Outline**

**Addition and Subtraction**

**Multiplication Algorithms (Booth Multiplication Algorithm)**

**Decimal Arithmetic Unit**

### Addition and Subtraction

- Section - 1

### Addition and Subtraction (cont.)

| Operation | Add Magnitudes | Subtract Magnitudes |  |  |
|---|---|---|---|---|
|  |  | When A > B | When A < B | When A = B |
| (+A) + (+B) | + (A + B) |  |  |  |
| (+A) + (-B) |  | + (A - B) | - (B - A) | + (A - B) |
| (-A) + (+B) |  | - (A - B) | + (B - A) | + (A - B) |
| (-A) + (-B) | - (A + B) |  |  |  |
| (+A) - (+B) |  | + (A - B) | - (B - A) | + (A - B) |
| (+A) - (-B) | + (A + B) |  |  |  |
| (-A) - (+B) | - (A + B) |  |  |  |
| (-A) - (-B) |  | - (A - B) | + (B - A) | + (A - B) |

### Flowchart for Addition & Subtraction

- Subtract operation
- Add operation
- Minuend in A
- Subtrahend in B
- Augend in A
- Addend in B
- As⊕Bs
- As⊕Bs
- EA ← A+B’+1
- AVF ← 0
- EA ← A+B
- E
- AVF ← E
- A ← A’
- A
- A ← A+1
- As ← As’
- As ← 0
- END
- (result is in A and As)
- = 0
- = 1
- = 1
- = 0
- As = Bs
- As = Bs
- As ≠ Bs
- As ≠ Bs
- = 0
- = 1
- A < B
- A ≥ B
- ≠ 0
- = 0
- As = Sign bit of A
- Bs = Sign bit of B
- AVF = add overflow flip-flop
- E = Carry

### Multiplication Algorithms (Booth Multiplication Algorithm)

- Section - 2

### Multiplication

- Traditional way of binary multiplication

**10111**

**10011**

**x**

**x**

**10111**

**10111**

**00000**

**00000**

**10111**

**110110101**

**437**

- Multiply operation
- = 1
- = 0
- SC
- = 0
- ≠ 0
- Multiplicand in B Multiplier in Q
- END
- (PRODUCT is in AQ)

### Perform 23 x 19

| Multiplicand B = 10111 | E | A | Q | SC |
|---|---|---|---|---|
| Multiplier in Q | 0 | 00000 | 10011 | 101 |
| Qn = 1; add B |  | 10111 |  |  |
| First partial product | 0 | 10111 |  |  |
| Shift right EAQ | 0 | 01011 | 11001 | 100 |
| Qn = 1; add B |  | 10111 |  |  |
| Second partial product | 1 | 00010 |  |  |
| Shift right EAQ | 0 | 10001 | 01100 | 011 |
| Qn = 0; shift right EAQ | 0 | 01000 | 10110 | 010 |
| Qn = 0; shift right EAQ | 0 | 00100 | 01011 | 001 |
| Qn = 1; add B |  | 10111 |  |  |
| Fifth partial product | 0 | 11011 |  |  |
| Shift right EAQ | 0 | 01101 | 10101 | 000 |
| Final product in AQ = 0110110101 |  |  |  |  |

### Multiply (-9) x (-13) using Booth Algorithm

### Booth Multiplication Algorithm

- Multiply operation
- = 01
- = 10
- SC
- = 0
- ≠ 0
- Multiplicand in BR Multiplier in QR
- END
- = 00
- = 11

### Decimal Arithmetic Unit

- Section - 3

### BCD Adder

- Two BCD digits are applied to 4-bit binary adder which produce result ranging from 0 to 19 i.e. 9 + 9 + 1 = 19
- Output sum of two decimal numbers must be represented in BCD.
- Problem is to find rule by which binary number is to be converted to correct BCD

**1001**

**0111**

**+**

**+**

**196**

- Both groups generate carry

**1001**

**1001**

**0011**

**0000**

**+0110**

**+0110**

**1001**

**0110**

- Add 0110 to each
- If codes are illegal or carry is generated in the group then we add 0110 to that particular group

### BCD Adder (cont.)

| Binary Sum |  |  |  |  | BCD Sum |  |  |  |  |  |
|---|---|---|---|---|---|---|---|---|---|---|
| K | Z8 | Z4 | Z2 | Z1 | C | S8 | S4 | S2 | S1 | Decimal |
| 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 1 | 1 |
| 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 1 | 0 | 2 |
| 0 | 0 | 0 | 1 | 1 | 0 | 0 | 0 | 1 | 1 | 3 |
| 0 | 0 | 1 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 4 |
| 0 | 0 | 1 | 0 | 1 | 0 | 0 | 1 | 0 | 1 | 5 |
| 0 | 0 | 1 | 1 | 0 | 0 | 0 | 1 | 1 | 0 | 6 |
| 0 | 0 | 1 | 1 | 1 | 0 | 0 | 1 | 1 | 1 | 7 |
| 0 | 1 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 8 |
| 0 | 1 | 0 | 0 | 1 | 0 | 1 | 0 | 0 | 1 | 9 |

| Binary Sum |  |  |  |  | BCD Sum |  |  |  |  |  |
|---|---|---|---|---|---|---|---|---|---|---|
| K | Z8 | Z4 | Z2 | Z1 | C | S8 | S4 | S2 | S1 | Decimal |
| 0 | 1 | 0 | 1 | 0 | 1 | 0 | 0 | 0 | 0 | 10 |
| 0 | 1 | 0 | 1 | 1 | 1 | 0 | 0 | 0 | 1 | 11 |
| 0 | 1 | 1 | 0 | 0 | 1 | 0 | 0 | 1 | 0 | 12 |
| 0 | 1 | 1 | 0 | 1 | 1 | 0 | 0 | 1 | 1 | 13 |
| 0 | 1 | 1 | 1 | 0 | 1 | 0 | 1 | 0 | 0 | 14 |
| 0 | 1 | 1 | 1 | 1 | 1 | 0 | 1 | 0 | 1 | 15 |
| 1 | 0 | 0 | 0 | 0 | 1 | 0 | 1 | 1 | 0 | 16 |
| 1 | 0 | 0 | 0 | 1 | 1 | 0 | 1 | 1 | 1 | 17 |
| 1 | 0 | 0 | 1 | 0 | 1 | 1 | 0 | 0 | 0 | 18 |
| 1 | 0 | 0 | 1 | 1 | 1 | 1 | 0 | 0 | 1 | 19 |

### BCD Adder (cont.)

- Correction from binary to BCD is needed in following conditions
  - K = 1
  - Z8 and Z4 or Z8 and Z2 must have 1
- 4-bit binary adder

**Z8 Z4 Z2 Z1**

**K**

- 4-bit binary adder
- Addend
- Augend
- Carry out
- Output carry

**S8 S4 S2 S1**

- Carry in
