import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchDialog } from "@/components/SearchDialog";
import { useTrackImpView } from "@/hooks/useTrackImpView";
import { Download, ChevronDown, ChevronUp, Code2, BookOpen } from "lucide-react";

// ── Assignment 2: Threading & Exception Handling ──────────────────────────────
const THREADING_QS = [
  {
    title: "Q1. User-defined functions for add & subtract using Threading module",
    desc: "Create 2 threads using threading.Thread AND by extending Thread class.",
    code: `import threading

# Method 1: Using threading.Thread
def add(a, b):
    print(f"Thread 1 (Add): {a} + {b} = {a + b}")

def subtract(a, b):
    print(f"Thread 2 (Subtract): {a} - {b} = {a - b}")

t1 = threading.Thread(target=add, args=(10, 5))
t2 = threading.Thread(target=subtract, args=(10, 5))
t1.start(); t2.start()
t1.join();  t2.join()

# Method 2: By extending Thread class
class AddThread(threading.Thread):
    def __init__(self, a, b):
        super().__init__()
        self.a = a; self.b = b
    def run(self):
        print(f"AddThread: {self.a} + {self.b} = {self.a + self.b}")

class SubtractThread(threading.Thread):
    def __init__(self, a, b):
        super().__init__()
        self.a = a; self.b = b
    def run(self):
        print(f"SubtractThread: {self.a} - {self.b} = {self.a - self.b}")

t3 = AddThread(20, 8)
t4 = SubtractThread(20, 8)
t3.start(); t4.start()
t3.join();  t4.join()`,
    output: `Thread 1 (Add): 10 + 5 = 15\nThread 2 (Subtract): 10 - 5 = 5\nAddThread: 20 + 8 = 28\nSubtractThread: 20 - 8 = 12`,
  },
  {
    title: "Q2. Thread 1 prints squares 1-5, Thread 2 prints cubes 1-5",
    desc: "Two threads running concurrently — order may vary.",
    code: `import threading

def print_squares():
    for i in range(1, 6):
        print(f"Thread 1 | Square of {i} = {i**2}")

def print_cubes():
    for i in range(1, 6):
        print(f"Thread 2 | Cube of {i} = {i**3}")

t1 = threading.Thread(target=print_squares)
t2 = threading.Thread(target=print_cubes)
t1.start(); t2.start()
t1.join();  t2.join()
print("Both threads finished.")`,
    output: `Thread 1 | Square of 1 = 1\nThread 2 | Cube of 1 = 1\nThread 1 | Square of 2 = 4\nThread 2 | Cube of 2 = 8\n... (order may vary)\nBoth threads finished.`,
    tip: "Thread execution order is non-deterministic — threads run concurrently.",
  },
  {
    title: "Q3. Two threads printing messages 3 times with 1 second delay",
    desc: "Demonstrates time.sleep() inside threads.",
    code: `import threading
import time

def thread_one():
    for i in range(3):
        print("Thread 1: I am learning Python")
        time.sleep(1)

def thread_two():
    for i in range(3):
        print("Thread 2: Multithreading is powerful")
        time.sleep(1)

t1 = threading.Thread(target=thread_one)
t2 = threading.Thread(target=thread_two)
t1.start(); t2.start()
t1.join();  t2.join()
print("All threads completed.")`,
    output: `Thread 1: I am learning Python\nThread 2: Multithreading is powerful\nThread 1: I am learning Python\nThread 2: Multithreading is powerful\nThread 1: I am learning Python\nThread 2: Multithreading is powerful\nAll threads completed.`,
  },
  {
    title: "Q4. Input 2 numbers and raise TypeError if not numerical",
    desc: "Uses try-except with manual TypeError raise.",
    code: `def get_numbers():
    try:
        a = input("Enter first number: ")
        b = input("Enter second number: ")
        if not a.replace('.','',1).lstrip('-').isdigit():
            raise TypeError(f"'{a}' is not a number!")
        if not b.replace('.','',1).lstrip('-').isdigit():
            raise TypeError(f"'{b}' is not a number!")
        a = float(a); b = float(b)
        print(f"Sum = {a + b}")
        print(f"Product = {a * b}")
    except TypeError as e:
        print(f"TypeError: {e}")

get_numbers()`,
    output: `# Valid: Sum = 15.0 | Product = 50.0\n# Invalid: TypeError: 'hello' is not a number!`,
  },
  {
    title: "Q5. Raise ValueError if user enters a negative number",
    code: `def check_positive():
    try:
        num = float(input("Enter a number: "))
        if num < 0:
            raise ValueError(f"Negative number not allowed! You entered: {num}")
        print(f"Valid number: {num}")
        print(f"Square root: {num ** 0.5:.4f}")
    except ValueError as e:
        print(f"ValueError: {e}")

check_positive()`,
    output: `# Negative: ValueError: Negative number not allowed! You entered: -5.0\n# Positive: Valid number: 16.0 | Square root: 4.0000`,
  },
  {
    title: "Q6. Raise exception if marks not between 0 and 100",
    desc: "Uses a custom exception class InvalidMarksError.",
    code: `class InvalidMarksError(Exception):
    pass

def check_marks():
    try:
        marks = float(input("Enter marks (0-100): "))
        if marks < 0 or marks > 100:
            raise InvalidMarksError(f"Marks must be between 0 and 100. Got: {marks}")
        print(f"Marks entered: {marks}")
        if marks >= 90: print("Grade: A+")
        elif marks >= 75: print("Grade: A")
        elif marks >= 60: print("Grade: B")
        else: print("Grade: C")
    except InvalidMarksError as e:
        print(f"Error: {e}")
    except ValueError:
        print("Error: Please enter a valid number!")

check_marks()`,
    output: `# 150 → Error: Marks must be between 0 and 100. Got: 150.0\n# 85  → Marks entered: 85.0 | Grade: A`,
    tip: "Custom exception: class InvalidMarksError(Exception): pass — that's all you need!",
  },
  {
    title: "Q7. Raise exception if password length < 8 characters",
    desc: "Custom WeakPasswordError exception.",
    code: `class WeakPasswordError(Exception):
    pass

def validate_password():
    try:
        password = input("Enter your password: ")
        if len(password) < 8:
            raise WeakPasswordError(
                f"Password too short! Length = {len(password)}, Minimum = 8 characters.")
        print("Password accepted! Strong password.")
        print(f"Password length: {len(password)} characters")
    except WeakPasswordError as e:
        print(f"WeakPasswordError: {e}")

validate_password()`,
    output: `# abc123 → WeakPasswordError: Password too short! Length = 6, Minimum = 8 characters.\n# securePass123 → Password accepted! Length: 13 characters`,
  },
  {
    title: "Q8. Raise exception if withdrawn amount > bank balance",
    desc: "InsufficientBalanceError inside a BankAccount class.",
    code: `class InsufficientBalanceError(Exception):
    pass

class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        print(f"Deposited Rs.{amount}. New balance: Rs.{self.balance}")

    def withdraw(self, amount):
        try:
            if amount > self.balance:
                raise InsufficientBalanceError(
                    f"Cannot withdraw Rs.{amount}. Available: Rs.{self.balance}")
            self.balance -= amount
            print(f"Withdrawn Rs.{amount}. Remaining: Rs.{self.balance}")
        except InsufficientBalanceError as e:
            print(f"Transaction Failed: {e}")

acc = BankAccount("Raj", 5000)
acc.deposit(1000)
acc.withdraw(2000)
acc.withdraw(8000)  # Raises exception`,
    output: `Deposited Rs.1000. New balance: Rs.6000\nWithdrawn Rs.2000. Remaining: Rs.4000\nTransaction Failed: Cannot withdraw Rs.8000. Available: Rs.4000`,
  },
  {
    title: "Q9. Ask user for age — try-except for ValueError",
    code: `def get_age():
    try:
        age = int(input("Enter your age: "))
        if age < 0 or age > 150:
            raise ValueError(f"Age {age} is not a realistic value!")
        print(f"Your age is {age}, input recorded successfully.")
        if age < 18: print("Status: Minor")
        elif age < 60: print("Status: Adult")
        else: print("Status: Senior Citizen")
    except ValueError as e:
        print(f"ValueError: {e}")
        print("Please enter a valid whole number for age.")

get_age()`,
    output: `# 20  → Your age is 20 | Status: Adult\n# "twenty" → ValueError: invalid literal for int()\n# -5  → ValueError: Age -5 is not a realistic value!`,
  },
  {
    title: "Q10. Open file data.txt — try-except for FileNotFoundError, close in finally",
    desc: "Classic file handling pattern with finally block.",
    code: `def read_file():
    fp = None
    try:
        fp = open("data.txt", "r")
        content = fp.read()
        print("File contents:")
        print("-" * 30)
        print(content)
        print("File read successfully!")
    except FileNotFoundError:
        print("Error: File 'data.txt' not found!")
    except PermissionError:
        print("Error: No permission to read the file!")
    finally:
        if fp:
            fp.close()
            print("File is closed properly.")  # always runs
        else:
            print("No file was opened.")

read_file()`,
    output: `# File exists: prints content + "File is closed properly."\n# Missing: "Error: File 'data.txt' not found!" + "No file was opened."`,
    tip: "finally block ALWAYS runs — whether exception occurred or not. Perfect for cleanup.",
  },
  {
    title: "Q11. Handle IndexError and AttributeError on list operations",
    code: `def list_operations():
    my_list = [10, 20, 30, 40, 50]
    print("List:", my_list)

    # Part (a): Handle IndexError
    try:
        index = int(input("Enter index to access: "))
        print(f"Element at index {index}: {my_list[index]}")
    except IndexError:
        print(f"IndexError: Index out of range! Valid: 0 to {len(my_list)-1}")

    # Part (b): Handle AttributeError
    try:
        operation = input("Enter operation (upper/lower): ")
        result = getattr(my_list, operation)()
        print(f"Result: {result}")
    except AttributeError:
        print(f"AttributeError: List has no attribute '{operation}'!")
        print("Lists support: append, pop, sort, reverse, etc.")

list_operations()`,
    output: `# Index 10 → IndexError: out of range! Valid: 0 to 4\n# "upper"  → AttributeError: List has no attribute 'upper'!`,
  },
];

// ── Assignment 3: Regular Expressions ────────────────────────────────────────
const REGEX_QS = [
  {
    title: "Q1. Extract all 4-digit numbers from a string",
    pattern: `r'\\b\\d{4}\\b'`,
    desc: "\\b ensures exactly 4 digits (word boundary prevents matching 5+ digit numbers).",
    code: `import re
text = "PIN 1234, year 2023, code 56789, ref 4321, zip 123"
pattern = r'\\b\\d{4}\\b'
result = re.findall(pattern, text)
print("4-digit numbers found:", result)`,
    output: `4-digit numbers found: ['1234', '2023', '4321']`,
  },
  {
    title: "Q2. Find all words with exactly 5 letters",
    pattern: `r'\\b[a-zA-Z]{5}\\b'`,
    desc: "\\b is word boundary, {5} means exactly 5 characters.",
    code: `import re
text = "Hello World Python is great and smart for daily tasks"
result = re.findall(r'\\b[a-zA-Z]{5}\\b', text)
print("5-letter words:", result)
print("Count:", len(result))`,
    output: `5-letter words: ['Hello', 'World', 'great', 'smart', 'daily', 'tasks']\nCount: 6`,
  },
  {
    title: "Q3. Find all words starting with capital letters",
    pattern: `r'\\b[A-Z][a-zA-Z]*\\b'`,
    desc: "Starts with capital [A-Z], followed by any number of letters.",
    code: `import re
text = "Alice and Bob went to Mumbai. They visited India Gate and Red Fort."
result = re.findall(r'\\b[A-Z][a-zA-Z]*\\b', text)
print("Capitalized words:", result)`,
    output: `Capitalized words: ['Alice', 'Bob', 'Mumbai', 'They', 'India', 'Gate', 'Red', 'Fort']`,
  },
  {
    title: "Q4. Match a string that starts with 'Hello'",
    pattern: `r'^Hello'`,
    desc: "re.match() checks only at the BEGINNING of the string. ^ anchors to start.",
    code: `import re
strings = ["Hello, how are you?", "Hello World!", "Say Hello to everyone", "hello world"]
pattern = r'^Hello'
for s in strings:
    result = re.match(pattern, s)
    print(f"{'MATCH' if result else 'NO MATCH'} | '{s}'")`,
    output: `MATCH    | 'Hello, how are you?'\nMATCH    | 'Hello World!'\nNO MATCH | 'Say Hello to everyone'\nNO MATCH | 'hello world'`,
    tip: "re.match() → only checks start. re.search() → checks anywhere.",
  },
  {
    title: "Q5. Match the first string that ends with 'world'",
    pattern: `r'world$'`,
    desc: "$ anchors to end of string. re.search() checks anywhere in string.",
    code: `import re
strings = ["Hello world", "Goodbye world", "This is a beautiful world", "world is round", "The World"]
pattern = r'world$'
for s in strings:
    result = re.search(pattern, s)
    print(f"{'ENDS WITH world' if result else 'DOES NOT END  '} | '{s}'")\n\nfor s in strings:
    if re.search(r'world$', s):
        print(f"First match: '{s}'"); break`,
    output: `ENDS WITH world | 'Hello world'\nENDS WITH world | 'Goodbye world'\nENDS WITH world | 'This is a beautiful world'\nDOES NOT END    | 'world is round'\nDOES NOT END    | 'The World'\nFirst match: 'Hello world'`,
  },
  {
    title: "Q6. Find all words ending with 'ing'",
    pattern: `r'\\b\\w+ing\\b'`,
    desc: "\\b word boundary + one or more word chars + literal 'ing'.",
    code: `import re
text = "I am learning Python programming. Swimming and running are amazing."
result = re.findall(r'\\b\\w+ing\\b', text)
print("Words ending with 'ing':", result)
print("Count:", len(result))`,
    output: `Words ending with 'ing': ['learning', 'programming', 'Swimming', 'running', 'amazing']\nCount: 5`,
  },
  {
    title: "Q7. Extract all hashtags from a string",
    pattern: `r'#\\w+'`,
    desc: "# symbol followed by one or more word characters (letters/digits/_).",
    code: `import re
text = "Loving #AI and #Python! Check out #MachineLearning. #100DaysOfCode"
hashtags = re.findall(r'#\\w+', text)
print("Hashtags found:", hashtags)
print("Total:", len(hashtags))
for i, tag in enumerate(hashtags, 1):
    print(f"  {i}. {tag}")`,
    output: `Hashtags found: ['#AI', '#Python', '#MachineLearning', '#100DaysOfCode']\nTotal: 4`,
  },
  {
    title: "Q8. Extract usernames starting with a letter followed by letters/digits",
    pattern: `r'@[a-zA-Z]\\w+'`,
    desc: "@ sign + must start with letter [a-zA-Z] + word chars. Rejects @123invalid.",
    code: `import re
text = "Mentioned @alice, @Bob123, @123invalid, @charlie_99 and @DataGuru."
usernames = re.findall(r'@[a-zA-Z]\\w+', text)
print("Valid usernames:", usernames)`,
    output: `Valid usernames: ['@alice', '@Bob123', '@charlie_99', '@DataGuru']`,
  },
  {
    title: "Q9. Find all dates in format DD-MM-YYYY",
    pattern: `r'\\b\\d{2}-\\d{2}-\\d{4}\\b'`,
    desc: "Two digits, hyphen, two digits, hyphen, four digits.",
    code: `import re
text = "Event on 21-04-2026, meeting on 01-01-2025. Invalid: 2026-04-21 or 5-5-2024."
dates = re.findall(r'\\b\\d{2}-\\d{2}-\\d{4}\\b', text)
print("Dates found:", dates)
for d in dates:
    parts = d.split('-')
    print(f"  {d} → Day={parts[0]}, Month={parts[1]}, Year={parts[2]}")`,
    output: `Dates found: ['21-04-2026', '01-01-2025']\n  21-04-2026 → Day=21, Month=04, Year=2026\n  01-01-2025 → Day=01, Month=01, Year=2025`,
  },
  {
    title: "Q10. Extract all prices from a string (e.g., $100, $49.99)",
    pattern: `r'\\$\\d+(?:\\.\\d{1,2})?'`,
    desc: "$ sign + digits + optional decimal point with 1-2 digits.",
    code: `import re
text = "Sale: $100, $250, $49.99, $0.50. Special: $75.00 and $5."
prices = re.findall(r'\\$\\d+(?:\\.\\d{1,2})?', text)
print("Prices found:", prices)
total = sum(float(p.replace('$','')) for p in prices)
print(f"Total: ${total:.2f}")`,
    output: `Prices found: ['$100', '$250', '$49.99', '$0.50', '$75.00', '$5']\nTotal: $480.49`,
  },
  {
    title: "Q11. Find all file names with .txt extension",
    pattern: `r'\\b\\w+\\.txt\\b'`,
    desc: "Word characters followed by literal .txt",
    code: `import re
text = "Files: notes.txt, report.pdf, data.txt, image.png, readme.txt, script.py"
txt_files = re.findall(r'\\b\\w+\\.txt\\b', text)
print(".txt files:", txt_files)
for f in txt_files:
    print(f"  File: {f:<20} | Name: {f.replace('.txt','')}")`,
    output: `.txt files: ['notes.txt', 'data.txt', 'readme.txt']\n  File: notes.txt  | Name: notes\n  ...`,
  },
  {
    title: "Q12. Replace all email domains with @example.com",
    pattern: `r'@[\\w.]+'`,
    desc: "Use re.sub() to replace. Pattern matches @ + word chars + dots.",
    code: `import re
text = "Contact alice@gmail.com or bob@yahoo.com. Help: help@company.org"
result = re.sub(r'@[\\w.]+', '@example.com', text)
print("Original:", text)
print("Replaced:", result)`,
    output: `Original: Contact alice@gmail.com or bob@yahoo.com. Help: help@company.org\nReplaced: Contact alice@example.com or bob@example.com. Help: help@example.com`,
    tip: "re.sub(pattern, replacement, string) — replaces ALL matches. Use count=1 for first only.",
  },
  {
    title: "Q13. Using re.compile() to find words starting with vowels",
    pattern: `r'\\b[aeiouAEIOU]\\w*'`,
    desc: "re.compile() pre-compiles a pattern for reuse — more efficient for multiple strings.",
    code: `import re
pattern = re.compile(r'\\b[aeiouAEIOU]\\w*', re.IGNORECASE)

texts = [
    "Alice and Bob are amazing engineers",
    "I enjoy eating apples and oranges",
]
for text in texts:
    words = pattern.findall(text)
    print(f"Text: {text}")
    print(f"Vowel-start words: {words} | Count: {len(words)}")
    print()`,
    output: `Text: Alice and Bob are amazing engineers\nVowel-start words: ['Alice', 'and', 'are', 'amazing', 'engineers'] | Count: 5\n\nText: I enjoy eating apples and oranges\nVowel-start words: ['I', 'enjoy', 'eating', 'apples', 'and', 'oranges'] | Count: 6`,
  },
  {
    title: "Q14. Demonstrate re.IGNORECASE, re.MULTILINE, and re.DOTALL flags",
    desc: "Three important flags that change matching behavior.",
    code: `import re

# 1. IGNORECASE — case insensitive
text = "Hello HELLO hello HeLLo"
result = re.compile(r'hello', re.IGNORECASE).findall(text)
print("IGNORECASE:", result)  # All 4 match

# 2. MULTILINE — ^ and $ match each line start/end
text2 = "Python is great\\nJava is powerful\\nPython is easy"
print("Without MULTILINE:", re.findall(r'^Python', text2))       # ['Python'] - only first
print("With MULTILINE:",    re.findall(r'^Python', text2, re.MULTILINE))  # ['Python','Python']

# 3. DOTALL — dot matches newline too
text3 = "Start of text\\nMiddle part\\nEnd of text"
print("Without DOTALL:", re.findall(r'Start.*End', text3))              # []
print("With DOTALL:",    re.findall(r'Start.*End', text3, re.DOTALL))   # ['Start...End']

# 4. Combining flags
text4 = "hello WORLD\\nGoodbye World"
result = re.findall(r'^hello.*world$', text4, re.IGNORECASE | re.MULTILINE)
print("Combined:", result)  # ['hello WORLD']`,
    output: `IGNORECASE: ['Hello', 'HELLO', 'hello', 'HeLLo']\nWithout MULTILINE: ['Python']\nWith MULTILINE: ['Python', 'Python']\nWithout DOTALL: []\nWith DOTALL: ['Start of text\\nMiddle part\\nEnd of text']\nCombined: ['hello WORLD']`,
    tip: "Combine flags with |  e.g. re.IGNORECASE | re.MULTILINE | re.DOTALL",
  },
];

// ── Collapsible Card ──────────────────────────────────────────────────────────
function QCard({ q, idx, showPattern }: { q: any; idx: number; showPattern?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="surface-elevated rounded overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors apple-press"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xs font-bold text-primary/60 tabular-nums shrink-0">
            {idx + 1}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold">{q.title}</p>
            {(q.desc || showPattern) && (
              <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                {showPattern && q.pattern ? `Pattern: ${q.pattern}` : q.desc}
              </p>
            )}
          </div>
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-border/50 pt-4 space-y-3">
          {q.desc && <p className="text-sm text-foreground/70 leading-relaxed">{q.desc}</p>}
          {showPattern && q.pattern && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground">Pattern:</span>
              <code className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-mono">{q.pattern}</code>
            </div>
          )}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Code</p>
            <pre className="bg-muted rounded p-3 text-xs overflow-x-auto text-foreground/90 font-mono leading-relaxed">
              {q.code}
            </pre>
          </div>
          {q.output && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Output</p>
              <pre className="bg-green-500/5 border border-green-500/20 rounded p-3 text-xs overflow-x-auto text-green-700 dark:text-green-400 font-mono leading-relaxed">
                {q.output}
              </pre>
            </div>
          )}
          {q.tip && (
            <div className="bg-primary/5 border border-primary/20 rounded p-3">
              <p className="text-xs text-primary font-medium">💡 {q.tip}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PythonImpQuestionsPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"threading" | "regex">("threading");

  useTrackImpView("python", "Python Programming");

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/auth");
  }, [user, loading, navigate]);

  if (loading || !user) return null;

  const PDF_URL = "/Python_Assignments_Complete.pdf";

  const tabs = [
    { id: "threading" as const, label: "Assignment 2", sub: "Threading & Exceptions", icon: BookOpen, count: THREADING_QS.length },
    { id: "regex" as const, label: "Assignment 3", sub: "Regular Expressions", icon: Code2, count: REGEX_QS.length },
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
              <span className="text-[11px] font-semibold bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 px-2 py-0.5 rounded-full">Assignment</span>
              <span className="text-[11px] text-muted-foreground">Due: 21/4/2026</span>
            </div>
            <h1 className="text-xl font-bold">Python Programming</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Threading, Exception Handling & Regular Expressions</p>
          </div>
          <a
            href={PDF_URL}
            download="Python_Assignments_Complete.pdf"
            className="apple-press inline-flex items-center gap-1.5 h-9 px-3 rounded text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity shrink-0"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">PDF</span>
          </a>
        </div>

        {/* Quick reference */}
        <div className="bg-muted/60 rounded p-3 mb-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">re Module Quick Reference</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            {[
              ["\\d", "Any digit 0-9"], ["\\w", "Word char (a-z,0-9,_)"],
              ["\\b", "Word boundary"], ["{n}", "Exactly n times"],
              ["findall()", "→ list of matches"], ["search()", "→ first match"],
              ["match()", "→ start only"], ["sub()", "→ replace"],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-[10px] font-bold text-primary font-mono">{k}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted rounded p-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-3 rounded text-left transition-colors apple-press ${
                activeTab === tab.id ? "bg-background shadow-sm" : "hover:bg-background/50"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <tab.icon className="h-3.5 w-3.5 text-muted-foreground" />
                <span className={`text-xs font-semibold ${activeTab === tab.id ? "text-foreground" : "text-muted-foreground"}`}>
                  {tab.label}
                </span>
                <span className="text-[10px] text-primary tabular-nums">{tab.count}</span>
              </div>
              <span className="text-[10px] text-muted-foreground/70 mt-0.5 hidden sm:block">{tab.sub}</span>
            </button>
          ))}
        </div>

        {/* Assignment 2: Threading */}
        {activeTab === "threading" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-full">
                Assignment 2 — 11 Questions
              </span>
            </div>
            {THREADING_QS.map((q, i) => (
              <QCard key={i} q={q} idx={i} />
            ))}
          </div>
        )}

        {/* Assignment 3: Regex */}
        {activeTab === "regex" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 px-2.5 py-1 rounded-full">
                Assignment 3 — 14 Questions
              </span>
            </div>
            {REGEX_QS.map((q, i) => (
              <QCard key={i} q={q} idx={i} showPattern />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
