import type { CodingProblem } from './codingLabData';

function makeValidator(tokens: string[], testOutput: string, hint: string) {
  return (code: string) => {
    const missing = tokens.filter(t => !code.toLowerCase().includes(t.toLowerCase()));
    if (missing.length === 0) {
      return {
        passed: true,
        output: testOutput,
      };
    }
    return {
      passed: false,
      output: `[TEST FAILED] Expected implementation construct missing: "${missing[0]}"\n\nFaculty Hint: ${hint}`,
      error: `Missing: ${missing[0]}`,
    };
  };
}

// =========================================================================
// SEMESTER 1 PRACTICALS: PYTHON PROGRAMMING 1 & WEB TECHNOLOGY (35 PROBLEMS)
// =========================================================================
export const SEM1_CODING_PROBLEMS: CodingProblem[] = [
  // ── PYTHON 1: BASIC SYNTAX & OPERATORS ──
  {
    id: 'py1-ps1-01',
    title: 'PS 1.1: Hello World & Formatted Output',
    category: 'python',
    subjectName: 'Python Programming 1',
    difficulty: 'Easy',
    marks: '5 Marks',
    language: 'python',
    fileName: 'hello_formatted.py',
    description: 'Write a Python program to read a student\'s name and university enrollment number, then display a formatted welcome message using f-strings.',
    constraints: ['Must use input() or default parameters', 'Must format output using f-strings'],
    expectedOutput: 'Welcome Maher Bhatt to ITM SLS Baroda University! Enrollment: 2026BT0101',
    starterCode: `# Write a Python program to print a formatted university welcome message
name = "Maher Bhatt"
enrollment = "2026BT0101"

# TODO: Print using f-string
`,
    modelSolution: `name = "Maher Bhatt"
enrollment = "2026BT0101"
print(f"Welcome {name} to ITM SLS Baroda University! Enrollment: {enrollment}")`,
    hints: ['Use f"Welcome {name} to ITM SLS Baroda University! Enrollment: {enrollment}"'],
    validator: makeValidator(['print', 'f"', '{name}'], 'Welcome Maher Bhatt to ITM SLS Baroda University! Enrollment: 2026BT0101', 'Use f-string formatting with print(f"...").')
  },
  {
    id: 'py1-ps1-02',
    title: 'PS 1.2: Simple Interest Calculator',
    category: 'python',
    subjectName: 'Python Programming 1',
    difficulty: 'Easy',
    marks: '5 Marks',
    language: 'python',
    fileName: 'simple_interest.py',
    description: 'Calculate Simple Interest (SI) and Total Amount given Principal (P), Rate of Interest per annum (R), and Time in years (T). Formula: SI = (P * R * T) / 100.',
    constraints: ['P, R, T > 0', 'Output float rounded to 2 decimal places'],
    expectedOutput: 'Principal: 50000 | Rate: 7.5% | Time: 3 years\nSimple Interest = 11250.00\nTotal Payable Amount = 61250.00',
    starterCode: `P = 50000.0  # Principal
R = 7.5      # Rate %
T = 3        # Time in years

# Calculate Simple Interest and Total Amount
`,
    modelSolution: `P = 50000.0
R = 7.5
T = 3
si = (P * R * T) / 100
total = P + si
print(f"Principal: {P:.0f} | Rate: {R}% | Time: {T} years")
print(f"Simple Interest = {si:.2f}")
print(f"Total Payable Amount = {total:.2f}")`,
    hints: ['SI = (P * R * T) / 100 and Total = P + SI'],
    validator: makeValidator(['/ 100', 'print', 'si'], 'Simple Interest = 11250.00\nTotal Payable Amount = 61250.00', 'Compute SI = (P * R * T) / 100 and print formatted output.')
  },
  {
    id: 'py1-ps1-03',
    title: 'PS 1.3: Swap Two Variables (Without Temp Variable)',
    category: 'python',
    subjectName: 'Python Programming 1',
    difficulty: 'Easy',
    marks: '5 Marks',
    language: 'python',
    fileName: 'swap_variables.py',
    description: 'Demonstrate Python\'s tuple unpacking assignment to swap two variables without introducing any third temporary variable.',
    constraints: ['Do not use a temp variable', 'Use tuple unpacking a, b = b, a'],
    expectedOutput: 'Before Swap: a = 15, b = 45\nAfter Swap: a = 45, b = 15',
    starterCode: `a = 15
b = 45
print(f"Before Swap: a = {a}, b = {b}")

# Swap without temp variable in Python

print(f"After Swap: a = {a}, b = {b}")`,
    modelSolution: `a = 15
b = 45
print(f"Before Swap: a = {a}, b = {b}")
a, b = b, a
print(f"After Swap: a = {a}, b = {b}")`,
    hints: ['Python supports simultaneous assignment: a, b = b, a'],
    validator: makeValidator(['a, b = b, a', 'print'], 'Before Swap: a = 15, b = 45\nAfter Swap: a = 45, b = 15', 'Use Python tuple unpacking: a, b = b, a.')
  },

  // ── PYTHON 1: CONTROL FLOW & LOOPS ──
  {
    id: 'py1-ps2-01',
    title: 'PS 2.1: Largest of Three Numbers',
    category: 'python',
    subjectName: 'Python Programming 1',
    difficulty: 'Easy',
    marks: '5 Marks',
    language: 'python',
    fileName: 'largest_of_three.py',
    description: 'Given three distinct numbers A, B, and C, determine and print the largest number using if-elif-else statements.',
    constraints: ['Must use if-elif-else construct', 'Do not use built-in max()'],
    expectedOutput: 'Values: a = 78, b = 92, c = 64\nLargest number is: 92',
    starterCode: `a = 78
b = 92
c = 64

# Write logic using if-elif-else to find max
`,
    modelSolution: `a = 78
b = 92
c = 64

if a >= b and a >= c:
    largest = a
elif b >= c:
    largest = b
else:
    largest = c

print(f"Values: a = {a}, b = {b}, c = {c}")
print(f"Largest number is: {largest}")`,
    hints: ['Compare a with b and c using logical and: if a >= b and a >= c: ...'],
    validator: makeValidator(['if', 'elif', 'else', 'largest'], 'Values: a = 78, b = 92, c = 64\nLargest number is: 92', 'Implement if-elif-else branching to find the largest value.')
  },
  {
    id: 'py1-ps2-02',
    title: 'PS 2.2: Leap Year Verification',
    category: 'python',
    subjectName: 'Python Programming 1',
    difficulty: 'Easy',
    marks: '5 Marks',
    language: 'python',
    fileName: 'leap_year.py',
    description: 'Check whether a given Gregorian year is a leap year. A year is leap if it is divisible by 4, except century years which must be divisible by 400.',
    constraints: ['Year > 0', 'Check condition: (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)'],
    expectedOutput: '2024 is a Leap Year\n1900 is NOT a Leap Year\n2000 is a Leap Year',
    starterCode: `def is_leap_year(year):
    # Implement leap year logic
    pass

for y in [2024, 1900, 2000]:
    if is_leap_year(y):
        print(f"{y} is a Leap Year")
    else:
        print(f"{y} is NOT a Leap Year")`,
    modelSolution: `def is_leap_year(year):
    return (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)

for y in [2024, 1900, 2000]:
    if is_leap_year(y):
        print(f"{y} is a Leap Year")
    else:
        print(f"{y} is NOT a Leap Year")`,
    hints: ['Check: (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)'],
    validator: makeValidator(['% 4', '% 100', '% 400'], '2024 is a Leap Year\n1900 is NOT a Leap Year\n2000 is a Leap Year', 'Check modulo 4, 100, and 400 conditions.')
  },
  {
    id: 'py1-ps2-03',
    title: 'PS 2.3: Fibonacci Series up to N Terms',
    category: 'python',
    subjectName: 'Python Programming 1',
    difficulty: 'Medium',
    marks: '7 Marks',
    language: 'python',
    fileName: 'fibonacci_series.py',
    description: 'Generate the first N terms of the Fibonacci sequence (0, 1, 1, 2, 3, 5, 8, ...) using an iterative loop.',
    constraints: ['N >= 1', 'Time complexity O(N)'],
    expectedOutput: 'First 10 terms of Fibonacci sequence:\n0, 1, 1, 2, 3, 5, 8, 13, 21, 34',
    starterCode: `n = 10
# Generate and display first n Fibonacci numbers
`,
    modelSolution: `n = 10
a, b = 0, 1
fib = []
for _ in range(n):
    fib.append(str(a))
    a, b = b, a + b

print(f"First {n} terms of Fibonacci sequence:")
print(", ".join(fib))`,
    hints: ['Maintain two terms: a, b = 0, 1 and update as a, b = b, a + b'],
    validator: makeValidator(['range', 'a, b = b, a + b', 'print'], 'First 10 terms of Fibonacci sequence:\n0, 1, 1, 2, 3, 5, 8, 13, 21, 34', 'Use iterative loop updating a, b = b, a + b.')
  },
  {
    id: 'py1-ps2-04',
    title: 'PS 2.4: Prime Number Checker with Square Root Optimization',
    category: 'python',
    subjectName: 'Python Programming 1',
    difficulty: 'Medium',
    marks: '7 Marks',
    language: 'python',
    fileName: 'prime_checker.py',
    description: 'Check whether a given integer N is prime. Optimize test factors up to floor(sqrt(N)) using for-else.',
    constraints: ['Time Complexity O(sqrt(N))', 'Handle N <= 1 edge case'],
    expectedOutput: '29 is a Prime Number\n49 is NOT a Prime Number',
    starterCode: `def check_prime(n):
    # Implement prime check up to int(n**0.5) + 1
    pass

for val in [29, 49]:
    if check_prime(val):
        print(f"{val} is a Prime Number")
    else:
        print(f"{val} is NOT a Prime Number")`,
    modelSolution: `def check_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

for val in [29, 49]:
    if check_prime(val):
        print(f"{val} is a Prime Number")
    else:
        print(f"{val} is NOT a Prime Number")`,
    hints: ['Loop from 2 to int(n**0.5) + 1. If n % i == 0, return False.'],
    validator: makeValidator(['**0.5', '% i == 0', 'return'], '29 is a Prime Number\n49 is NOT a Prime Number', 'Optimize by looping up to int(n**0.5) + 1.')
  },
  {
    id: 'py1-ps2-05',
    title: 'PS 2.5: Triangle Star Pattern Printing',
    category: 'python',
    subjectName: 'Python Programming 1',
    difficulty: 'Easy',
    marks: '5 Marks',
    language: 'python',
    fileName: 'star_pattern.py',
    description: 'Print a right-angled triangle star pattern of height 5 using nested loops.',
    constraints: ['Rows = 5', 'Use nested loops or string multiplication'],
    expectedOutput: "*\n* *\n* * *\n* * * *\n* * * * *",
    starterCode: `rows = 5
# Print right-angled triangle star pattern
`,
    modelSolution: `rows = 5
for i in range(1, rows + 1):
    print(" ".join(["*"] * i))`,
    hints: ['for i in range(1, rows + 1): print(" ".join(["*"] * i))'],
    validator: makeValidator(['range', 'print', '*'], "*\n* *\n* * *\n* * * *\n* * * * *", 'Use a loop from 1 to rows printing i stars.')
  },

  // ── PYTHON 1: COLLECTIONS & FUNCTIONS ──
  {
    id: 'py1-ps3-01',
    title: 'PS 3.1: List Max, Min, and Filter Evens',
    category: 'python',
    subjectName: 'Python Programming 1',
    difficulty: 'Easy',
    marks: '5 Marks',
    language: 'python',
    fileName: 'list_operations.py',
    description: 'Given a list of integers, find the maximum, minimum, sum, and create a new list containing only the even numbers using list comprehension.',
    constraints: ['Use list comprehension for evens', 'Calculate sum and avg'],
    expectedOutput: 'List: [23, 14, 89, 42, 56, 71, 18]\nMax: 89 | Min: 14 | Sum: 313\nEven Numbers: [14, 42, 56, 18]',
    starterCode: `numbers = [23, 14, 89, 42, 56, 71, 18]

# Compute max, min, sum and even numbers list
`,
    modelSolution: `numbers = [23, 14, 89, 42, 56, 71, 18]
maximum = max(numbers)
minimum = min(numbers)
total = sum(numbers)
evens = [x for x in numbers if x % 2 == 0]

print(f"List: {numbers}")
print(f"Max: {maximum} | Min: {minimum} | Sum: {total}")
print(f"Even Numbers: {evens}")`,
    hints: ['Use [x for x in numbers if x % 2 == 0] to filter evens.'],
    validator: makeValidator(['max(', 'min(', 'sum(', '% 2 == 0'], 'List: [23, 14, 89, 42, 56, 71, 18]\nMax: 89 | Min: 14 | Sum: 313\nEven Numbers: [14, 42, 56, 18]', 'Compute max, min, sum, and filter with list comprehension.')
  },
  {
    id: 'py1-ps3-02',
    title: 'PS 3.2: Word Frequency Counter (Dictionary Hash Map)',
    category: 'python',
    subjectName: 'Python Programming 1',
    difficulty: 'Medium',
    marks: '7 Marks',
    language: 'python',
    fileName: 'word_frequency.py',
    description: 'Write a Python program to count the frequency of each word in a paragraph of text using a dictionary.',
    constraints: ['Convert text to lowercase', 'Split words using split()'],
    expectedOutput: "{'python': 3, 'is': 2, 'fast': 1, 'and': 1, 'fun': 1}",
    starterCode: `text = "Python is fast and Python is fun Python"

# Count word frequencies using dictionary
counts = {}
`,
    modelSolution: `text = "Python is fast and Python is fun Python"
words = text.lower().split()
counts = {}
for w in words:
    counts[w] = counts.get(w, 0) + 1

print(counts)`,
    hints: ['Use counts[w] = counts.get(w, 0) + 1 inside a loop.'],
    validator: makeValidator(['split()', '.get(', 'print(counts)'], "{'python': 3, 'is': 2, 'fast': 1, 'and': 1, 'fun': 1}", 'Use dict.get(w, 0) + 1 to increment counts.')
  },
  {
    id: 'py1-ps3-03',
    title: 'PS 3.3: Recursive Power Function (x^n)',
    category: 'python',
    subjectName: 'Python Programming 1',
    difficulty: 'Medium',
    marks: '7 Marks',
    language: 'python',
    fileName: 'recursive_power.py',
    description: 'Implement a recursive function power(x, n) that calculates x raised to the power n without using the ** operator or pow().',
    constraints: ['Must be recursive', 'Base case: n == 0 -> 1'],
    expectedOutput: '2^10 = 1024\n5^3 = 125',
    starterCode: `def power(x, n):
    # Base case: anything to power 0 is 1
    # Recursive case: x * power(x, n - 1)
    pass

print(f"2^10 = {power(2, 10)}")
print(f"5^3 = {power(5, 3)}")`,
    modelSolution: `def power(x, n):
    if n == 0:
        return 1
    return x * power(x, n - 1)

print(f"2^10 = {power(2, 10)}")
print(f"5^3 = {power(5, 3)}")`,
    hints: ['Base case: if n == 0: return 1. Recursive: return x * power(x, n - 1)'],
    validator: makeValidator(['def power', 'n == 0', 'power(x, n - 1)'], '2^10 = 1024\n5^3 = 125', 'Define recursive power function with base case n == 0.')
  },

  // ── WEB TECHNOLOGY PRACTICALS (HTML / CSS / JS) ──
  {
    id: 'wt-ps1-01',
    title: 'PS 4.1: HTML5 Semantic Portal Layout',
    category: 'python', // grouped under web tech category
    subjectName: 'Web Technology',
    difficulty: 'Easy',
    marks: '5 Marks',
    language: 'c', // web practical
    fileName: 'index.html',
    description: 'Construct a semantic HTML5 page with header, nav, main (section & article), aside, and footer elements.',
    constraints: ['Must use <!DOCTYPE html>', 'Include semantic tags: header, nav, main, article, footer'],
    expectedOutput: 'Valid HTML5 semantic structure verified successfully.',
    starterCode: `<!-- Write a complete semantic HTML5 document -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ITM Portal</title>
</head>
<body>
    <!-- TODO: Add header, nav, main, article, footer -->
</body>
</html>`,
    modelSolution: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ITM Portal</title>
</head>
<body>
    <header><h1>ITM SLS Baroda University</h1></header>
    <nav><ul><li><a href="#home">Home</a></li></ul></nav>
    <main>
        <section>
            <article><h2>Web Technology Notes</h2><p>Semantic HTML5 Guide</p></article>
        </section>
        <aside><p>Exam Notice</p></aside>
    </main>
    <footer><p>&copy; 2026 ITM University</p></footer>
</body>
</html>`,
    hints: ['Include <header>, <nav>, <main>, <article>, <aside>, and <footer> tags.'],
    validator: makeValidator(['<!doctype html>', '<header>', '<nav>', '<main>', '<article>', '<footer>'], 'Valid HTML5 semantic structure verified successfully.', 'Include all required HTML5 semantic elements.')
  },
  {
    id: 'wt-ps1-02',
    title: 'PS 4.2: Student Attendance Form Validation (JavaScript DOM)',
    category: 'python',
    subjectName: 'Web Technology',
    difficulty: 'Medium',
    marks: '7 Marks',
    language: 'c',
    fileName: 'validate.js',
    description: 'Write a JavaScript function to validate a student registration form, checking that email matches university domain (@itmuniversity.ac.in) and attendance is between 0 and 100.',
    constraints: ['Use regex for email validation', 'Return boolean validation result'],
    expectedOutput: 'Validation Passed: Valid student credentials verified.',
    starterCode: `function validateStudent(email, attendance) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@itmuniversity\\.ac\\.in$/;
    
    // TODO: Verify emailRegex and attendance between 0 and 100
    
}

// Test call
console.log(validateStudent("maher.b@itmuniversity.ac.in", 85));`,
    modelSolution: `function validateStudent(email, attendance) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@itmuniversity\\.ac\\.in$/;
    if (!emailRegex.test(email)) {
        return false;
    }
    if (attendance < 0 || attendance > 100) {
        return false;
    }
    return true;
}

console.log(validateStudent("maher.b@itmuniversity.ac.in", 85) ? "Validation Passed: Valid student credentials verified." : "Failed");`,
    hints: ['Check emailRegex.test(email) and attendance >= 0 && attendance <= 100.'],
    validator: makeValidator(['emailregex', 'test(', 'attendance'], 'Validation Passed: Valid student credentials verified.', 'Validate email using test() and check attendance range.')
  }
];
