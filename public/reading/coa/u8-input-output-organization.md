### Unit-8 Input-Output Organization

**Computer Organization & Architecture (COA)**

- GTU # 3140707

### 

**Looping**

**Outline**

**Asynchronous Data Transfer**

**Modes Of Transfer**

**Priority Interrupt**

**DMA**

**Input-Output Processor (IOP)**

### Asynchronous Data Transfer

- Section - 1

### Asynchronous Data Transfer (cont.)

- Asynchronous data transfer between two independent units requires that control signals be transmitted between the communicating units to indicate the time at which data is being transmitted.
- Two ways of achieving
  - Strobe
  - Handshaking

### Strobe Method

- 1.1 Source initiated Strobe
- Source unit
- Destination unit
- Data Bus
- Strobe
- Valid Data
- Data
- Strobe
- 1.2 Destination initiated Strobe
- Source unit
- Destination unit
- Data Bus
- Strobe
- Valid Data
- Data
- Strobe

### 2.1 Source initiated Handshake

- Source unit
- Destination unit
- Data bus
- Data valid
- Valid Data
- Data bus
- Data accepted
- Data accepted
- Data valid
- Place data on bus.
- Enable data valid.
- Accept data from bus.
- Enable data accepted.
- Disable data valid.
- Invalidate data on bus.
- Disable data accepted.
- Ready to accept data (initial state).
- Source unit
- Destination unit

### 2.2 Destination initiated Handshake

- Source unit
- Destination unit
- Data bus
- Data valid
- Ready for data
- Ready for data
- Data valid
- Data bus
- Valid Data
- Place data on bus.
- Enable data valid.
- Ready to accept data.
- Enable Ready for data.
- Source unit
- Destination unit
- Accept data from bus.
- Disable Ready for data.
- Disable data valid.
- Invalid data on bus
- (initial state).

### Asynchronous Serial Transfer

- Rules for transmission
  - When a character is not being sent, the line is kept in the 1-state.
  - The initiation of a character transmission is detected from the start bit, which is always 0.
  - The character bits always follow the start bit.
  - After the last bit of the character is transmitted, a stop bit is detected when the line returns to the 1-state for at least one bit time.
- Start
- bit
- Stop
- bits
- Character bit

### Modes Of Transfer

- Section - 2

### Modes of Transfer

- Data transfer between the central computer and I/O devices may be handled in a variety of modes.
- Some modes use the CPU as an intermediate path; others transfer the data directly to and from the memory unit.
- Data transfer to and from peripherals may be handled in one of three possible modes:
  - Programmed I/O
  - Interrupt-initiated I/O
  - Direct memory access (DMA)

### Slide 11

- Programmed I/O
- CPU
- Interface
- Data register
- Status register
- F
- I/O
- device
- Data bus
- I/O bus
- Data valid
- Data accepted
- Address bus
- I/O read
- I/O write
- Read data register
- Check flag bit
- Read status register
- Transfer data to memory
- Continue with program
- Flag
- Operation complete?
- = 0
- = 1
- yes
- no

### Interrupt-initiated I/O

- An alternative to the CPU constantly monitoring the flag is to let the interface inform the computer when it is ready to transfer data.
- While the CPU is running a program, it does not check the flag.
- However, when the flag is set, the computer is momentarily interrupted from proceeding with current program and is informed of the fact that the flag has been set.
- The CPU deviates from what it is doing to take care of the input or output transfer.
- After the transfer is completed, the computer returns to the previous program to continue what it was doing before the interrupt.

### Priority Interrupt

- Section - 3

### Priority Interrupt (Daisy-Chaining Technique)

- Determines which interrupt is to be served first when two or more requests are made simultaneously
- Also determines which interrupts are permitted to interrupt the computer while another is being serviced.
- Higher priority interrupts can make requests while servicing a lower priority interrupt.
- Device 1
- PI
- PO
- Device 2
- PI
- PO
- Device 3
- PI
- PO
- CPU
- INT
- INTACK
- VAD 1
- VAD 2
- VAD 3
- Processor data bus
- Interrupt request
- Interrupt acknowledge
- To next
- device

### DMA (Direct Memory Access)

- Section - 4

### DMA (Direct Memory Access) (cont.)

- The transfer of data between a fast storage device such as magnetic disk and memory is often limited by the speed of the CPU.
- Removing the CPU from the path and letting the peripheral device manage the memory buses directly would improve the speed of transfer.
- This transfer technique is called direct memory access (DMA).
- During DMA, CPU is idle and has no control of the memory buses.
- A DMA controller takes over the buses to manage the transfer directly between the I/O device and memory.
- BR
- BG
- ABUS
- DBUS
- RD
- WR
- CPU
- Bus request
- Bus granted
- Address bus
- Data bus
- Read
- Write
- High-impedance (disabled) when BG is enabled

### DMA Controller

- DMA Controller
- DMA controller - Interface which allows I/O transfer directly between Memory and Device, freeing CPU for other tasks
- CPU initializes DMA Controller by sending memory address and the block size (number of words).
- BR
- BG
- DS
- RS
- RD
- WR
- Control logic
- Bus request
- Bus grant
- Read
- Write
- Interrupt
- Register select
- DMA Select
- Interrupt
- Data bus buffers
- Data bus
- Internal Bus
- Address bus buffers
- Address register
- Word count register
- Control register
- Address bus
- DMA Acknowledge
- DMA Request
- to I/O device

### Input-Output Processor (IOP)

- Section - 5

### Input-Output Processor (IOP) (cont.)

- Memory Unit
- Central Processing Unit (CPU)
- Input-Output Processor
- PD
- PD
- PD
- PD
- Peripheral Device
- Memory Bus
- I/O Bus

### CPU – IOP Communication

- Send instruction to test IOP path
- Transfer status word to memory location
- If status OK, send start I/O instruction to IOP
- Access memory for IOP program
- CPU continues with another program
- Conduct I/O transfers using DMA; prepare status report
- I/O transfer completed; interrupt CPU
- Request IOP status
- Transfer status word to memory location
- Check status word for correct transfer
- CPU operations
- IOP operations
- Continue
