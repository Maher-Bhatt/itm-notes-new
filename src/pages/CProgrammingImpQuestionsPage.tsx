import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchDialog } from "@/components/SearchDialog";
import { Download, ChevronDown, ChevronUp, BookOpen, Code2, HelpCircle, CheckCircle2 } from "lucide-react";

// ── MCQ Data ────────────────────────────────────────────────────────────────
const MCQ_DATA = [
  { q: "In C, the name of an array represents:", options: ["Value of first element", "Address of first element", "Size of array", "Last element"], ans: 1, exp: "Array name acts as a constant pointer to its first element. arr == &arr[0]." },
  { q: "Which correctly declares a pointer?", options: ["int p;", "int *p;", "pointer p;", "*int p;"], ans: 1, exp: "The * before variable name indicates it's a pointer." },
  { q: "Which operator is used to get address?", options: ["*", "&", "#", "@"], ans: 1, exp: "& is the address-of operator. * is dereference. e.g., int *p = &a;" },
  { q: "Which mode opens a file for writing?", options: ['"r"', '"w"', '"a"', '"rw"'], ans: 1, exp: '"r"=read only, "w"=write (creates new/truncates existing), "a"=append.' },
  { q: "Two-dimensional array is also known as:", options: ["Vector", "Matrix", "Linked list", "Stack"], ans: 1, exp: "A 2D array has rows and columns exactly like a mathematical matrix. Accessed as arr[row][col]." },
  { q: "Strings in C are terminated by:", options: ["\\n", "\\0 (null character)", "EOF", "\\t"], ans: 1, exp: "The null character '\\0' (ASCII 0) marks the end of every string in C." },
  { q: "Operator to access structure members via pointer?", options: [".", "->", "::", "#"], ans: 1, exp: "Use -> with pointer: ptr->member. Use . (dot) with direct variable: var.member." },
  { q: "Structure containing pointer to itself is called?", options: ["Recursive structure", "Self-referential structure", "Dynamic structure", "Circular structure"], ans: 1, exp: "Used to build linked lists, trees, and graphs. e.g., struct Node { int data; struct Node *next; };" },
  { q: "Keyword to define a new data type?", options: ["define", "typedef", "newtype", "alias"], ans: 1, exp: "typedef creates an alias. e.g., typedef unsigned int uint;" },
  { q: "Function for formatted output in C?", options: ["print()", "printf()", "fprintf()", "output()"], ans: 1, exp: "printf() uses format specifiers: %d=int, %f=float, %s=string, %c=char." },
  { q: "int b=5; int *p=&b; *p=*p+10; printf(\"%d\",b); Output?", options: ["5", "15", "10", "Error"], ans: 1, exp: "*p dereferences p (which points to b), so *p+10 = 5+10 = 15, and b's value becomes 15." },
  { q: "Function to open a file in C?", options: ["open()", "fopen()", "fileopen()", "openfile()"], ans: 1, exp: "FILE *fp = fopen(\"file.txt\", \"r\"); Returns FILE* pointer. Returns NULL if failed." },
  { q: "int a=10; int *p=&a; printf(\"%d %d\",*p,p); Output?", options: ["10, 10", "10, address", "address, 10", "address, address"], ans: 1, exp: "*p dereferences p to get value 10. p alone gives the memory address." },
  { q: "What does fseek() do?", options: ["Reads file", "Writes file", "Moves file pointer", "Closes file"], ans: 2, exp: "fseek(fp, offset, SEEK_SET/SEEK_CUR/SEEK_END) moves file pointer to any position." },
  { q: "Function to read a character from a file?", options: ["getc()", "getchar()", "fgetc()", "readchar()"], ans: 2, exp: "fgetc(fp) reads one char from file. getchar() reads from stdin (keyboard)." },
];

// ── Important Questions Data ─────────────────────────────────────────────────
const IMP_QUESTIONS = [
  {
    unit: "Unit 4 – Pointer & Array",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    questions: [
      {
        title: "Meaning of 'int *ptr' | Use of & and * operators",
        marks: "3 & 5 Marks",
        answer3: `int *ptr declares a pointer variable 'ptr' that stores the address of an integer variable.\n\n& (Address-of operator): Returns the memory address of a variable.\n* (Dereference operator): Accesses the value at the address stored in the pointer.`,
        code3: `int a = 10;\nint *ptr = &a;  // ptr stores address of a\nprintf("%d", *ptr); // prints 10\n*ptr = 20;          // changes a's value to 20`,
        answer5: `A pointer is a variable that stores a memory address. The & operator gives the address. The * operator dereferences (accesses value at address).`,
        code5: `int a = 10, b = 20;\nint *p = &a;       // p points to a\nprintf("Address of a: %u\\n", p);\nprintf("Value of a: %d\\n", *p); // 10\n*p = 50;           // a becomes 50\np = &b;            // p now points to b\nprintf("b = %d\\n", *p); // 20`,
        tip: "Memory trick: & = 'address of', * = 'value at address'",
      },
      {
        title: "Program to Swap Two Numbers Using Pointer",
        marks: "3 & 5 Marks",
        answer3: `Swapping using pointers passes addresses (call by reference), so actual variables are changed.`,
        code3: `void swap(int *a, int *b) {\n  int temp = *a;\n  *a = *b;\n  *b = temp;\n}\nint main() {\n  int x=5, y=10;\n  swap(&x, &y);\n  printf("%d %d", x, y); // Output: 10 5\n}`,
        answer5: `Without pointers (call by value), only copies are swapped and the original variables are unchanged. With pointer arguments, actual memory is modified.`,
        code5: `#include <stdio.h>\nvoid swap(int *a, int *b) {\n  int temp;\n  temp = *a;  // temp = value at a\n  *a  = *b;  // value at a = value at b\n  *b  = temp; // value at b = temp\n}\nint main() {\n  int x = 5, y = 10;\n  printf("Before: x=%d, y=%d\\n", x, y); // 5, 10\n  swap(&x, &y);\n  printf("After:  x=%d, y=%d\\n", x, y); // 10, 5\n  return 0;\n}`,
      },
      {
        title: "Pointer Arithmetic",
        marks: "3 & 5 Marks",
        answer3: `Pointer arithmetic allows ++, --, +, - operations on pointers. Each increment moves the pointer by sizeof(data type) bytes, not by 1 byte.`,
        code3: `int a[]={10,20,30};\nint *p = a;\np++;  // moves 4 bytes (sizeof int)\nprintf("%d",*p); // 20`,
        answer5: `For int*, p++ moves 4 bytes. For char*, p++ moves 1 byte. For double*, p++ moves 8 bytes. Pointer arithmetic is always scaled by sizeof(data type).`,
        code5: `int arr[] = {10, 20, 30, 40, 50};\nint *p = arr;\nprintf("*p   = %d\\n", *p);    // 10\np++;\nprintf("p++  = %d\\n", *p);    // 20\np += 2;\nprintf("p+2  = %d\\n", *p);    // 40\np--;\nprintf("p--  = %d\\n", *p);    // 30\nint *q = &arr[4];\nprintf("q-p  = %ld\\n", q-p); // difference in elements`,
      },
      {
        title: "Array of Pointers & Pointer to Pointer (Double Pointer)",
        marks: "3 & 5 Marks",
        answer3: `An array of pointers: each element is a pointer. Syntax: int *ptr[5];\nDouble pointer: stores address of another pointer. Syntax: int **pp;`,
        code3: `// Double pointer\nint a=5; int *p=&a; int **pp=&p;\nprintf("%d", **pp); // prints 5`,
        answer5: `Double pointer chain: pp → p → a. Used for dynamic 2D arrays and modifying pointer values inside functions.`,
        code5: `int a = 100;\nint *p  = &a;   // p holds address of a\nint **pp = &p;  // pp holds address of p\nprintf("a   = %d\\n", a);    // 100\nprintf("*p  = %d\\n", *p);   // 100\nprintf("**pp= %d\\n", **pp); // 100`,
      },
      {
        title: "Strings and String Functions",
        marks: "3 & 5 Marks",
        answer3: `A string in C is an array of characters terminated by null character '\\0'. Key string functions (string.h): strlen(), strcpy(), strcat(), strcmp().`,
        code3: `char s1[30] = "Hello";\nprintf("Length: %d\\n", strlen(s1)); // 5`,
        answer5: `String functions reference:\nstrlen(s) → Length | strcpy(d,s) → Copy | strcat(d,s) → Concat | strcmp(s1,s2) → Compare (0=equal) | strupr(s) → Uppercase | strlwr(s) → Lowercase | strrev(s) → Reverse | strstr(s1,s2) → Find substring`,
        code5: `char s1[30] = "Hello", s2[30] = "World";\nprintf("Length: %d\\n", strlen(s1));     // 5\nstrcat(s1, " "); strcat(s1, s2);\nprintf("Concat: %s\\n", s1);             // Hello World\nprintf("Compare: %d\\n", strcmp("abc","abc")); // 0\nchar s3[30]; strcpy(s3, s2);\nprintf("Copy: %s\\n", s3);               // World\nstrupr(s3);\nprintf("Upper: %s\\n", s3);             // WORLD`,
      },
      {
        title: "Command Line Arguments",
        marks: "3 & 5 Marks",
        answer3: `Command line arguments allow passing input to a C program when executed from terminal. int main(int argc, char *argv[]) — argc=count, argv=string arguments.`,
        code3: `// Run: ./program Hello 42\n// argc=3, argv[0]="./program", argv[1]="Hello", argv[2]="42"`,
        answer5: `argv[0] is always the program name. All args are strings — use atoi() to convert numeric args.`,
        code5: `#include <stdio.h>\nint main(int argc, char *argv[]) {\n  printf("Number of arguments: %d\\n", argc);\n  for(int i=0; i<argc; i++)\n    printf("argv[%d] = %s\\n", i, argv[i]);\n  return 0;\n}\n// Run: ./program Hello 42\n// Output: Number of arguments: 3\n// argv[0]=./program  argv[1]=Hello  argv[2]=42`,
      },
    ],
  },
  {
    unit: "Unit 5 – Structure & Union",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    questions: [
      {
        title: "Structure – Definition, Syntax, and Example",
        marks: "3 & 5 Marks",
        answer3: `A structure is a user-defined data type that groups related variables of different data types under one name. Keyword: struct. Members accessed using dot (.) operator.`,
        code3: `struct Student { int roll; char name[20]; float marks; };\nstruct Student s1 = {1, "Raj", 85.5};\nprintf("%s scored %.1f", s1.name, s1.marks);`,
        answer5: `All members have separate memory. Size of struct = sum of all member sizes (may include padding for alignment).`,
        code5: `struct Student { int roll; char name[30]; float marks; };\nint main() {\n  struct Student s1;\n  s1.roll = 101;\n  strcpy(s1.name, "Amit");\n  s1.marks = 92.5;\n  printf("Roll : %d\\n", s1.roll);\n  printf("Name : %s\\n", s1.name);\n  printf("Marks: %.1f\\n", s1.marks);\n}`,
      },
      {
        title: "Difference between Structure and Union",
        marks: "3 & 5 Marks",
        answer3: `Structure: each member has SEPARATE memory. Size = sum of all members. All members usable at once.\nUnion: all members SHARE same memory. Size = largest member. Only one member usable at a time.`,
        code3: `struct S { int a; char b; float c; }; // ~9-12 bytes\nunion U { int a; char b; float c; };  // 4 bytes (largest)`,
        answer5: `Union saves memory — useful when only one field is active at a time. Changing one member corrupts others.`,
        code5: `union U { int a; char b; float c; };\nunion U u;\nu.a = 100;\nprintf("%d", u.a); // 100\nu.b = 'X';         // now char is active; a may be garbage\nprintf("%c", u.b); // X`,
      },
      {
        title: "Pointer to Structure",
        marks: "3 & 5 Marks",
        answer3: `A pointer to structure stores the address of a structure variable. Members accessed using -> (arrow) operator.`,
        code3: `struct Student s = {1, "Raj", 85};\nstruct Student *p = &s;\nprintf("%s", p->name);  // Raj\nprintf("%d", (*p).roll); // 1 (alternate)`,
        answer5: `Using pointer to structure allows efficient passing to functions (no copy overhead) and dynamic memory allocation.`,
        code5: `struct Employee { int id; char name[30]; float salary; };\nvoid display(struct Employee *e) {\n  printf("ID: %d\\n", e->id);\n  printf("Name: %s\\n", e->name);\n  printf("Salary: %.2f\\n", e->salary);\n}\nint main() {\n  struct Employee e1 = {101, "Priya", 45000.0};\n  struct Employee *ptr = &e1;\n  ptr->salary = 50000.0;\n  display(ptr);\n}`,
      },
      {
        title: "Self-Referential Structure (Linked List)",
        marks: "3 & 5 Marks",
        answer3: `A self-referential structure contains a pointer to its own type as a member. Foundation of linked lists, trees, and graphs.`,
        code3: `struct Node {\n  int data;\n  struct Node *next; // pointer to same type\n};`,
        answer5: `Each node holds data and a pointer to the next node. Last node's next = NULL.`,
        code5: `struct Node { int data; struct Node *next; };\nint main() {\n  struct Node *n1,*n2,*n3;\n  n1=(struct Node*)malloc(sizeof(struct Node));\n  n2=(struct Node*)malloc(sizeof(struct Node));\n  n3=(struct Node*)malloc(sizeof(struct Node));\n  n1->data=10; n1->next=n2;\n  n2->data=20; n2->next=n3;\n  n3->data=30; n3->next=NULL;\n  struct Node *p=n1;\n  while(p!=NULL){printf("%d -> ",p->data); p=p->next;}\n  printf("NULL\\n"); // 10 -> 20 -> 30 -> NULL\n}`,
      },
      {
        title: "typedef and Bit-fields",
        marks: "3 & 5 Marks",
        answer3: `typedef creates an alias for an existing data type, improving readability.\nBit-field specifies exact number of bits for a structure member, saving memory.`,
        code3: `typedef unsigned int uint;\ntypedef struct Student { int roll; char name[20]; } Stud;\nStud s1 = {1, "Raj"}; // no need to write 'struct'`,
        answer5: `Bit-fields useful for hardware registers and status flags. A 1-bit field stores only 0 or 1.`,
        code5: `struct Flags {\n  unsigned int bold   : 1; // 1 bit (0 or 1)\n  unsigned int italic : 1;\n  unsigned int size   : 5; // 5 bits (0-31)\n};\nstruct Flags f;\nf.bold=1; f.italic=0; f.size=12;\nprintf("Bold=%d, Size=%d\\n", f.bold, f.size);`,
      },
    ],
  },
  {
    unit: "Unit 6 – Input & Output",
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
    questions: [
      {
        title: "Standard I/O – Formatted vs Unformatted",
        marks: "3 & 5 Marks",
        answer3: `3 standard streams: stdin (keyboard), stdout (screen), stderr (errors).\nFormatted I/O: Uses format specifiers (%d, %f). Functions: printf(), scanf().\nUnformatted I/O: No format specifiers. Functions: getchar(), putchar(), gets(), puts().`,
        code3: `int a; scanf("%d", &a);  // formatted\nprintf("Value = %d\\n", a);\nchar c = getchar(); putchar(c); // unformatted`,
        answer5: `Function summary: printf()/scanf() → formatted | getchar()/putchar() → single char | gets()/puts() → whole line (includes spaces)`,
        code5: `int a; float b; char name[20];\nscanf("%d %f %s", &a, &b, name);\nprintf("Int=%d Float=%.2f Name=%s\\n", a, b, name);\n\nchar c = getchar();\nputchar(c);\n\nchar str[50];\ngets(str);  // reads entire line\nputs(str);  // prints + newline`,
      },
      {
        title: "Error Handling in File Operations",
        marks: "3 & 5 Marks",
        answer3: `fopen() returns NULL on failure. Use ferror() to check read/write errors and feof() to detect end of file. Always check return value of fopen()!`,
        code3: `FILE *fp = fopen("data.txt", "r");\nif(fp == NULL) {\n  perror("Error"); // prints OS error\n  exit(1);\n}`,
        answer5: `Functions: fopen() → NULL on error | feof(fp) → non-zero at end | ferror(fp) → non-zero on error | perror() → OS error message | clearerr() → reset flags | fclose() → close & free`,
        code5: `FILE *fp = fopen("data.txt", "r");\nif(fp==NULL){ perror("Cannot open"); exit(1); }\nchar ch;\nwhile(!feof(fp)) {\n  ch = fgetc(fp);\n  if(ferror(fp)) { printf("Read error!\\n"); clearerr(fp); break; }\n  putchar(ch);\n}\nfclose(fp);`,
      },
    ],
  },
  {
    unit: "Unit 7 – UNIX System Interface",
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    questions: [
      {
        title: "File Descriptor",
        marks: "3 & 5 Marks",
        answer3: `A file descriptor is a non-negative integer assigned by the OS to identify an open file or I/O resource.\nStandard: 0=stdin, 1=stdout, 2=stderr. User-opened files get 3, 4, 5...`,
        code3: `int fd = open("file.txt", O_RDONLY);\nif(fd == -1) { perror("Cannot open"); return 1; }\nprintf("fd = %d\\n", fd); // typically 3\nclose(fd);`,
        answer5: `Every I/O operation in UNIX uses file descriptors. open() returns lowest available integer. Use read()/write() with fd; use close() when done.`,
        code5: `#include <fcntl.h>\n#include <unistd.h>\nint main() {\n  int fd = open("file.txt", O_RDONLY);\n  if(fd==-1){ perror("Cannot open"); return 1; }\n  char buf[100];\n  int n = read(fd, buf, 99);\n  buf[n] = '\\0';\n  write(1, buf, n); // write to stdout (fd=1)\n  close(fd);\n}`,
      },
      {
        title: "Dynamic Memory Allocation – malloc, calloc, realloc, free",
        marks: "3 & 5 Marks",
        answer3: `malloc(size) – allocate (garbage values)\ncalloc(n,size) – allocate + zero initialize\nrealloc(ptr,size) – resize\nfree(ptr) – release memory`,
        code3: `int *p = (int*)malloc(5 * sizeof(int));\nif(p==NULL){ printf("Error!\\n"); exit(1); }\nfree(p); // MUST free!`,
        answer5: `Always check if malloc/calloc returns NULL. Always call free() to prevent memory leaks. realloc keeps old data.`,
        code5: `int n=5;\nint *m = (int*)malloc(n * sizeof(int));\nif(m==NULL){ exit(1); }\nfor(int i=0;i<n;i++) m[i]=i+1;\n\nint *c = (int*)calloc(n, sizeof(int)); // all zeros\n\nm = (int*)realloc(m, 10 * sizeof(int)); // resize\nfor(int i=5;i<10;i++) m[i]=i+1;\n\nfor(int i=0;i<10;i++) printf("%d ", m[i]);\nfree(m); free(c);`,
        tip: "Always check NULL. Always call free() to prevent memory leaks.",
      },
      {
        title: "lseek() – Random File Access",
        marks: "3 & 5 Marks",
        answer3: `lseek() moves the file position pointer to any location, enabling random access.\nSyntax: lseek(fd, offset, whence)\nwhence: SEEK_SET=from start, SEEK_CUR=from current, SEEK_END=from end`,
        code3: `lseek(fd, 0, SEEK_SET);  // go to beginning\nlseek(fd, 10, SEEK_CUR); // skip 10 bytes\nlseek(fd, -5, SEEK_END); // 5 bytes before end`,
        answer5: `lseek returns current position. Can be used to get file size: lseek(fd, 0, SEEK_END) returns total bytes.`,
        code5: `int fd = open("data.txt", O_RDWR);\nchar buf[10];\nlseek(fd, 0, SEEK_SET);   // go to beginning\nread(fd, buf, 5);\nlseek(fd, 10, SEEK_CUR);  // skip 10 bytes\nlong pos = lseek(fd, 0, SEEK_CUR); // get position\nprintf("Position: %ld\\n", pos);\nclose(fd);`,
      },
    ],
  },
  {
    unit: "Unit 8 – Standard Library",
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    questions: [
      {
        title: "string.h Library Functions",
        marks: "5 Marks",
        answer3: `string.h provides string manipulation. Key functions: strlen, strcpy, strcat, strcmp, strlwr, strupr, strrev, strstr, strchr, sprintf.`,
        code3: `#include <string.h>\nstrlen("Hello")  → 5\nstrcpy(d,"Hi")   → copies\nstrcat(s1,s2)    → appends\nstrcmp("a","a")  → 0 (equal)`,
        answer5: `sprintf(s, "%d", 42) formats into char array — useful for building strings. strstr returns pointer to found substring or NULL.`,
        code5: `// Full reference:\nstrlen(s)         // length\nstrcpy(dest, src) // copy\nstrcat(dest, src) // append\nstrcmp(s1, s2)    // compare: 0=equal, <0, >0\nstrlwr(s)         // lowercase\nstrupr(s)         // uppercase\nstrrev(s)         // reverse\nstrstr(s1,s2)     // find s2 in s1\nstrchr(s,'l')     // find char\nsprintf(s,"%d",42)// format into string`,
      },
      {
        title: "math.h and stdlib.h Libraries",
        marks: "5 Marks",
        answer3: `math.h: sqrt, pow, fabs, ceil, floor, sin, cos, log, exp. Compile with -lm flag.\nstdlib.h: malloc, calloc, free, atoi, atof, rand, srand, abs, exit, system.`,
        code3: `#include <math.h>\nsqrt(16)  → 4.0\npow(2,3)  → 8.0\nfabs(-5.5)→ 5.5\nceil(4.2) → 5.0`,
        answer5: `stdlib.h conversions: atoi("42")=42, atof("3.14")=3.14. Random: srand(time(NULL)) seeds rand(). exit(0)=normal termination.`,
        code5: `// math.h examples\nsqrt(16)     → 4.0\npow(2,3)     → 8.0\nfabs(-5.5)   → 5.5\nceil(4.2)    → 5.0\nfloor(4.9)   → 4.0\n\n// stdlib.h examples\natoi("42")   → 42\natof("3.14") → 3.14\nrand()%100   → 0..99\nsrand(time(NULL)); // seed\nabs(-5)      → 5`,
      },
      {
        title: "time.h and assert.h Libraries",
        marks: "3 & 5 Marks",
        answer3: `time.h: time(), ctime(), localtime(), clock() — get current time and measure execution.\nassert.h: assert(condition) — terminates if condition is false, used for debugging.`,
        code3: `time_t t = time(NULL);\nprintf("%s", ctime(&t)); // current time\n\nassert(b != 0); // crashes if b is 0`,
        answer5: `clock() measures CPU time. (end-start)/CLOCKS_PER_SEC = seconds elapsed. assert() disabled in release builds with #define NDEBUG.`,
        code5: `#include <time.h>\ntime_t t = time(NULL);\nprintf("Time: %s", ctime(&t));\nstruct tm *local = localtime(&t);\nprintf("Year: %d\\n", local->tm_year+1900);\n\nclock_t start = clock();\nfor(int i=0;i<1000000;i++); // work\nclock_t end = clock();\nprintf("Elapsed: %.4f s\\n", (double)(end-start)/CLOCKS_PER_SEC);\n\n// assert.h\n#include <assert.h>\nint divide(int a,int b){ assert(b!=0); return a/b; }`,
      },
    ],
  },
];

// ── Programs Data ─────────────────────────────────────────────────────────────
const PROGRAMS_DATA = [
  {
    title: "Count Lines, Words, and Characters in a String",
    marks: "5 Marks",
    description: "Reads a multi-line string (terminated by ~) and counts characters, words, and lines.",
    code: `#include <stdio.h>\nint main() {\n  char str[200];\n  int line, word, ch;\n  line = word = 1; // start at 1\n  ch = 0;\n  printf("Enter string terminated with ~ :\\n");\n  scanf("%[^~]", str); // read until ~\n  for(int i=0; str[i]!='\\0'; i++) {\n    if(str[i]=='\\n')  { line++; word++; }\n    else if(str[i]==' ' || str[i]=='\\t') { word++; }\n    else { ch++; }\n  }\n  printf("\\nCharacter counts = %d\\n", ch);\n  printf("Word counts      = %d\\n", word);\n  printf("Line counts      = %d\\n", line);\n  return 0;\n}`,
    tip: "Start line=word=1 because we count separators. Newline ends one line AND one word.",
  },
  {
    title: "Print Value and Address Using Pointer",
    marks: "3 Marks",
    description: "Demonstrates printing values and addresses for int, float, and char using pointers.",
    code: `#include <stdio.h>\nint main() {\n  int a = 10;\n  float f = 3.14;\n  char c = 'X';\n  int *p1 = &a; float *p2 = &f; char *p3 = &c;\n  printf("int   - Value: %d,    Address: %u\\n", *p1, p1);\n  printf("float - Value: %.2f,  Address: %u\\n", *p2, p2);\n  printf("char  - Value: %c,    Address: %u\\n", *p3, p3);\n  return 0;\n}`,
  },
  {
    title: "Function Returning Pointer",
    marks: "5 Marks",
    description: "Returns pointer to largest element in array.",
    code: `#include <stdio.h>\n#include <stdlib.h>\nint* findMax(int *arr, int n) {\n  int *max = arr;\n  for(int i=1; i<n; i++)\n    if(arr[i] > *max) max = &arr[i];\n  return max;\n}\nint main() {\n  int arr[] = {3, 7, 1, 9, 4, 8, 2};\n  int *result = findMax(arr, 7);\n  printf("Maximum value = %d\\n", *result); // 9\n  printf("At address    = %u\\n", result);\n  return 0;\n}`,
    tip: "NEVER return a pointer to a local variable — it is destroyed when the function returns!",
  },
  {
    title: "Pointer Arithmetic – Traversal of Array",
    marks: "3 Marks",
    description: "Shows address and value of each element using pointer arithmetic.",
    code: `#include <stdio.h>\nint main() {\n  int arr[] = {10,20,30,40,50};\n  int *p = arr;\n  printf("Using pointer arithmetic:\\n");\n  for(int i=0; i<5; i++)\n    printf("arr[%d] = %d (addr=%u)\\n", i, *(p+i), (p+i));\n  return 0;\n}`,
  },
  {
    title: "Dynamic Memory – Student Records with malloc",
    marks: "5 Marks",
    description: "Dynamically allocates memory for n students using malloc.",
    code: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\nstruct Student { int roll; char name[30]; float marks; };\nint main() {\n  int n;\n  printf("Enter number of students: ");\n  scanf("%d", &n);\n  struct Student *s = (struct Student*)malloc(n * sizeof(struct Student));\n  if(s==NULL){ printf("Memory allocation failed!\\n"); exit(1); }\n  for(int i=0; i<n; i++) {\n    printf("Roll: "); scanf("%d", &s[i].roll);\n    printf("Name: "); scanf("%s", s[i].name);\n    printf("Marks:"); scanf("%f", &s[i].marks);\n  }\n  printf("\\n%-5s %-15s %-6s\\n", "Roll", "Name", "Marks");\n  for(int i=0; i<n; i++)\n    printf("%-5d %-15s %.1f\\n", s[i].roll, s[i].name, s[i].marks);\n  free(s);\n  return 0;\n}`,
  },
  {
    title: "3×3 Matrix Multiplication",
    marks: "5 Marks",
    description: "Takes two 3×3 matrices as input and multiplies them.",
    code: `#include <stdio.h>\nint main() {\n  int a[3][3],b[3][3],c[3][3],i,j,k;\n  printf("Enter 9 elements of A:\\n");\n  for(i=0;i<3;i++) for(j=0;j<3;j++) scanf("%d",&a[i][j]);\n  printf("Enter 9 elements of B:\\n");\n  for(i=0;i<3;i++) for(j=0;j<3;j++) scanf("%d",&b[i][j]);\n  for(i=0;i<3;i++){\n    for(j=0;j<3;j++){\n      c[i][j]=0;\n      for(k=0;k<3;k++) c[i][j]+=a[i][k]*b[k][j];\n    }\n  }\n  printf("Result Matrix C:\\n");\n  for(i=0;i<3;i++){\n    for(j=0;j<3;j++) printf("%6d",c[i][j]);\n    printf("\\n");\n  }\n  return 0;\n}`,
  },
];

// ── Collapsible Question Card ─────────────────────────────────────────────────
function QuestionCard({ q, idx }: { q: (typeof IMP_QUESTIONS)[0]["questions"][0]; idx: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="surface-elevated rounded overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors apple-press"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xs font-bold text-primary/60 tabular-nums shrink-0">Q{idx + 1}</span>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{q.title}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{q.marks}</p>
          </div>
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-border/50 space-y-4 pt-4">
          {q.answer3 && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">3-Mark Answer</p>
              <p className="text-sm text-foreground/80 whitespace-pre-line leading-relaxed">{q.answer3}</p>
              {q.code3 && (
                <pre className="mt-2 bg-muted rounded p-3 text-xs overflow-x-auto text-foreground/90 font-mono leading-relaxed">
                  {q.code3}
                </pre>
              )}
            </div>
          )}
          {q.answer5 && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">5-Mark Answer</p>
              <p className="text-sm text-foreground/80 whitespace-pre-line leading-relaxed">{q.answer5}</p>
              {q.code5 && (
                <pre className="mt-2 bg-muted rounded p-3 text-xs overflow-x-auto text-foreground/90 font-mono leading-relaxed">
                  {q.code5}
                </pre>
              )}
            </div>
          )}
          {q.tip && (
            <div className="bg-primary/5 border border-primary/20 rounded p-3">
              <p className="text-xs text-primary font-medium">💡 Tip: {q.tip}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Program Card ──────────────────────────────────────────────────────────────
function ProgramCard({ p, idx }: { p: (typeof PROGRAMS_DATA)[0]; idx: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="surface-elevated rounded overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors apple-press"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xs font-bold text-primary/60 tabular-nums shrink-0">P{idx + 1}</span>
          <div className="min-w-0">
            <p className="text-sm font-semibold">{p.title}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{p.description}</p>
          </div>
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-border/50 pt-4">
          <pre className="bg-muted rounded p-3 text-xs overflow-x-auto text-foreground/90 font-mono leading-relaxed">
            {p.code}
          </pre>
          {p.tip && (
            <div className="bg-primary/5 border border-primary/20 rounded p-3 mt-3">
              <p className="text-xs text-primary font-medium">💡 {p.tip}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── MCQ Component ─────────────────────────────────────────────────────────────
function MCQCard({ mcq, idx }: { mcq: (typeof MCQ_DATA)[0]; idx: number }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="surface-elevated rounded p-4">
      <p className="text-sm font-medium mb-3">
        <span className="text-primary/60 font-bold mr-2">Q{idx + 1}.</span>
        {mcq.q}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {mcq.options.map((opt, i) => {
          const isSelected = selected === i;
          const showResult = selected !== null;
          const isCorrect = i === mcq.ans;
          let cls = "rounded p-2.5 text-xs text-left transition-colors border ";
          if (!showResult) cls += "border-border hover:border-primary/40 hover:bg-secondary cursor-pointer";
          else if (isCorrect) cls += "border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400";
          else if (isSelected) cls += "border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-400";
          else cls += "border-border opacity-50";

          return (
            <button key={i} disabled={showResult} className={cls} onClick={() => setSelected(i)}>
              <span className="font-semibold mr-1.5">{String.fromCharCode(65 + i)}.</span>
              {opt}
              {showResult && isCorrect && <CheckCircle2 className="inline h-3 w-3 ml-1" />}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div className="mt-3 bg-muted rounded p-2.5">
          <p className="text-xs text-muted-foreground">{mcq.exp}</p>
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function CProgrammingImpQuestionsPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"mcq" | "questions" | "programs">("mcq");

  const PDF_URL = "/CET_C_Programming_Study_Guide.pdf";

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/auth");
  }, [user, loading, navigate]);

  if (loading || !user) return null;

  const tabs = [
    { id: "mcq" as const, label: "MCQs", icon: HelpCircle, count: MCQ_DATA.length },
    { id: "questions" as const, label: "Questions", icon: BookOpen, count: IMP_QUESTIONS.reduce((a, u) => a + u.questions.length, 0) },
    { id: "programs" as const, label: "Programs", icon: Code2, count: PROGRAMS_DATA.length },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <Header onSearchOpen={() => setSearchOpen(true)} showBack backTo="/imp-questions" />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">CET Exam</span>
              <span className="text-[11px] text-muted-foreground">Units 4–8</span>
            </div>
            <h1 className="text-xl font-bold">Programming in C</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Complete study guide — MCQs, theory, and programs</p>
          </div>
          <a
            href={PDF_URL}
            download="CET_C_Programming_Study_Guide.pdf"
            className="apple-press inline-flex items-center gap-1.5 h-9 px-3 rounded text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity shrink-0"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">PDF</span>
          </a>
        </div>

        {/* Quick Tips */}
        <div className="bg-muted/60 rounded p-3 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          {[
            ["3-mark", "Def + Syntax + Example"],
            ["5-mark", "Def + Program + Output"],
            ["Pointers", "& = address, * = value"],
            ["malloc", "Always check NULL + free()"],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="text-[10px] font-bold text-primary">{k}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{v}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted rounded p-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 h-8 rounded text-xs font-medium transition-colors apple-press ${
                activeTab === tab.id ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
              <span className={`text-[10px] tabular-nums ${activeTab === tab.id ? "text-primary" : "text-muted-foreground/60"}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* MCQ Tab */}
        {activeTab === "mcq" && (
          <div className="space-y-3">
            {MCQ_DATA.map((mcq, i) => (
              <MCQCard key={i} mcq={mcq} idx={i} />
            ))}
          </div>
        )}

        {/* Questions Tab */}
        {activeTab === "questions" && (
          <div className="space-y-6">
            {IMP_QUESTIONS.map((unit) => (
              <section key={unit.unit}>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-3 ${unit.color}`}>
                  {unit.unit}
                </div>
                <div className="space-y-2">
                  {unit.questions.map((q, idx) => (
                    <QuestionCard key={idx} q={q} idx={idx} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Programs Tab */}
        {activeTab === "programs" && (
          <div className="space-y-3">
            {PROGRAMS_DATA.map((p, i) => (
              <ProgramCard key={i} p={p} idx={i} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
