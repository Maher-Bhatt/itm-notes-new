import type { Subject } from "./types";

export const probabilityStatsSubject: Subject = {
  id: "prob-stats",
  name: "Probability & Statistics",
  code: "PS",
  color: "280 65% 55%",
  icon: "📊",
  description: "Descriptive Statistics, Probability Rules, Conditional Probability, Bayes' Theorem",
  semester: 1,
  units: [
    {
      id: "ps-u1",
      title: "Unit 1: Statistics & Probability",
      description: "Mean, Median, Mode, Standard Deviation, Probability Rules, Bayes' Theorem",
      topics: [
        {
          id: "ps-t1",
          title: "Descriptive Statistics — Mean, Median, Mode, SD",
          simpleExplanation: "Statistics help us understand data by summarizing it with numbers. Mean is the average, Median is the middle value, Mode is the most common value, and Standard Deviation tells you how spread out the data is.",
          detailedExplanation: `**Measures of Central Tendency** tell you the 'center' of your data:

**Mean (Average):** Sum of all values ÷ Number of values
- Sensitive to outliers (extreme values pull the mean)

**Median:** The middle value when data is sorted
- Not affected by outliers — more robust than mean

**Mode:** The most frequently occurring value
- Can have multiple modes (bimodal, multimodal)

**Measures of Spread:**

**Range:** Max - Min (simplest measure)

**Variance (σ²):** Average of squared differences from the mean
σ² = Σ(xᵢ - x̄)² / n

**Standard Deviation (σ):** Square root of variance
σ = √(σ²)
- 68% of data falls within ±1σ of mean (normal distribution)
- 95% within ±2σ
- 99.7% within ±3σ`,
          examples: [
            { title: "Calculating All Statistics", problem: "Find Mean, Median, Mode, and SD for: 5, 7, 8, 8, 10, 12, 15", explanation: "Apply each formula step by step to the dataset.", code: `Dataset: 5, 7, 8, 8, 10, 12, 15 (already sorted)
n = 7

MEAN = (5+7+8+8+10+12+15) / 7 = 65/7 = 9.29

MEDIAN = Middle value of sorted data
Position = (7+1)/2 = 4th value
Median = 8

MODE = Most frequent value
8 appears twice, all others once
Mode = 8

STANDARD DEVIATION:
Differences from mean: -4.29, -2.29, -1.29, -1.29, 0.71, 2.71, 5.71
Squared: 18.40, 5.24, 1.66, 1.66, 0.50, 7.34, 32.60
Variance = 67.40/7 = 9.63
SD = √9.63 = 3.10`, output: `Mean = 9.29
Median = 8
Mode = 8
Standard Deviation = 3.10` },
            { title: "Impact of Outliers", problem: "Compare Mean vs Median with and without outliers.", explanation: "Outliers dramatically affect the mean but barely change the median.", code: `Dataset A: 10, 20, 30, 40, 50
Mean = 150/5 = 30
Median = 30 (middle value)

Dataset B: 10, 20, 30, 40, 500 (one outlier!)
Mean = 600/5 = 120 ← Pulled way up!
Median = 30 ← Unchanged!

Conclusion: Use Median when outliers exist.
Examples: Income data, house prices, test scores
with one student scoring 0.`, output: `Without outlier: Mean=30, Median=30
With outlier: Mean=120, Median=30
Median is more robust to outliers!` }
          ],
          keyPoints: [
            "Mean = Sum/Count — affected by outliers",
            "Median = Middle value — robust to outliers",
            "Mode = Most frequent value — can have multiple",
            "Standard Deviation measures data spread",
            "68-95-99.7 rule: data within 1σ, 2σ, 3σ of mean",
            "Variance = SD² — always positive"
          ],
          mcqs: [
            { question: "Which measure is NOT affected by outliers?", options: ["Mean", "Median", "Range", "Variance"], correctIndex: 1, explanation: "Median is the middle value when sorted — extreme outliers don't shift it." },
            { question: "Standard deviation is the _____ of variance.", options: ["Square", "Double", "Square root", "Reciprocal"], correctIndex: 2, explanation: "σ = √(σ²). Standard deviation is the square root of variance." },
            { question: "For dataset [3, 5, 5, 7, 9], what is the mode?", options: ["5", "7", "3", "6"], correctIndex: 0, explanation: "Mode is the most frequent value. 5 appears twice; all others once." },
            { question: "Mean of [10, 20, 30] is:", options: ["10", "20", "30", "60"], correctIndex: 1, explanation: "Mean = (10+20+30)/3 = 60/3 = 20." },
            { question: "In a normal distribution, about 95% of data falls within:", options: ["±1σ", "±2σ", "±3σ", "±0.5σ"], correctIndex: 1, explanation: "The 68-95-99.7 rule: about 95% of data lies within 2 standard deviations of the mean." }
          ]
        },
        {
          id: "ps-t2",
          title: "Probability — Basic Rules, Conditional, Bayes",
          simpleExplanation: "Probability measures how likely something is to happen, from 0 (impossible) to 1 (certain). Like when you flip a coin — heads has a probability of 0.5. Conditional probability asks 'what's the chance of A happening IF B already happened?'",
          detailedExplanation: `**P(Event) = Favourable outcomes / Total outcomes**

**Key Rules:**
- **Complement:** P(A') = 1 − P(A) — probability of NOT happening
- **Addition:** P(A∪B) = P(A) + P(B) − P(A∩B)
- **Mutually Exclusive:** P(A∩B)=0, so P(A∪B) = P(A) + P(B)
- **Multiplication (independent):** P(A∩B) = P(A) × P(B)

**Conditional Probability:**
P(A|B) = P(A∩B) / P(B)
"Probability of A given that B has occurred"

**Bayes' Theorem:**
Updates probability given new evidence:
P(A|B) = [P(B|A) × P(A)] / P(B)

Used in: spam filters, medical diagnosis, machine learning.`,
          examples: [
            { title: "Rolling Dice — Basic Probability", problem: "Calculate various probabilities with a standard die.", explanation: "A standard die has 6 equally likely outcomes: {1,2,3,4,5,6}.", code: `Total outcomes = 6

P(rolling 4)   = 1/6 ≈ 0.167
P(even)        = 3/6 = 0.5  (even: {2,4,6})
P(NOT 4)       = 1 - 1/6 = 5/6

P(even OR >4):
P(even) = 3/6, P(>4) = 2/6, P(even AND >4) = 1/6
= 3/6 + 2/6 - 1/6 = 4/6 = 2/3`, output: `P(4) = 0.167
P(even) = 0.5
P(not 4) = 0.833
P(even or >4) = 0.667` },
            { title: "Bayes' Theorem — Medical Test", problem: "A disease affects 1% of population. Test is 99% accurate. If you test positive, what's the actual chance you have the disease?", explanation: "Bayes' theorem shows that even with an accurate test, rare diseases give surprising results.", code: `Given:
P(Disease) = 0.01
P(Positive | Disease) = 0.99
P(Positive | No Disease) = 0.01 (false positive)

Bayes' Formula:
P(Disease | Positive) = P(Pos|Dis) × P(Dis) / P(Pos)

P(Positive) = P(Pos|Dis)×P(Dis) + P(Pos|NoDis)×P(NoDis)
= 0.99 × 0.01 + 0.01 × 0.99
= 0.0099 + 0.0099 = 0.0198

P(Disease | Positive) = 0.0099 / 0.0198 = 0.5`, output: `Answer: 50%!

Even with a 99% accurate test, a positive result
means only 50% chance of disease when it's rare (1%).
This is the "base rate fallacy" — prior probability matters!` }
          ],
          keyPoints: [
            "P(event) ranges from 0 (impossible) to 1 (certain)",
            "P(A') = 1 - P(A) — complement rule",
            "For independent events: P(A∩B) = P(A) × P(B)",
            "Conditional: P(A|B) = P(A∩B) / P(B)",
            "Bayes' Theorem: P(A|B) = P(B|A)×P(A) / P(B)",
            "Mutually exclusive events cannot occur simultaneously"
          ],
          mcqs: [
            { question: "P(A') (complement) equals:", options: ["P(A)", "1 + P(A)", "1 - P(A)", "0"], correctIndex: 2, explanation: "The complement rule: P(not A) = 1 - P(A)." },
            { question: "If A and B are mutually exclusive, P(A∪B) =", options: ["P(A)×P(B)", "P(A)+P(B)-P(A∩B)", "P(A)+P(B)", "P(A)/P(B)"], correctIndex: 2, explanation: "Mutually exclusive means P(A∩B)=0, so P(A∪B) = P(A)+P(B)." },
            { question: "P(rolling even on a die) is:", options: ["1/3", "1/2", "2/3", "1/6"], correctIndex: 1, explanation: "Even numbers: {2,4,6} = 3 out of 6. P = 3/6 = 1/2." },
            { question: "Bayes' theorem is used to:", options: ["Calculate mean", "Update probability with new evidence", "Find mode", "Calculate SD"], correctIndex: 1, explanation: "Bayes' theorem updates prior probability with new evidence to get posterior probability." },
            { question: "Two events are independent if:", options: ["P(A∩B)=0", "P(A∩B)=P(A)×P(B)", "P(A)=P(B)", "P(A|B)=0"], correctIndex: 1, explanation: "Independent events: knowing B happened doesn't change the probability of A." }
          ]
        }
      ]
    }
  ]
};

export const financialAccountingSubject: Subject = {
  id: "financial-accounting",
  name: "Financial Accounting",
  code: "FA",
  color: "25 95% 53%",
  icon: "₹",
  description: "Double-Entry Bookkeeping, Golden Rules of Accounting, Journal Entries",
  semester: 1,
  units: [
    {
      id: "fa-u1",
      title: "Unit 1: Accounting Fundamentals",
      description: "Double-entry system, golden rules, journal entries, ledger accounts",
      topics: [
        {
          id: "fa-t1",
          title: "Double-Entry Bookkeeping & Golden Rules",
          simpleExplanation: "Double-entry bookkeeping is the foundation of accounting. Every transaction affects at least two accounts — one is debited and one is credited. Think of it as balance: for every outflow, there's an inflow. The golden rules tell you which account to debit and which to credit.",
          detailedExplanation: `**Double-Entry System:**
Every transaction affects minimum two accounts. Total Debits ALWAYS equal Total Credits.

**Three Types of Accounts:**
1. **Real Account** — Tangible assets (Cash, Furniture, Building)
2. **Personal Account** — People/Organizations (Ram's A/c, Bank A/c)
3. **Nominal Account** — Income/Expenses (Salary, Rent, Interest)

**The Golden Rules:**
| Account Type | Debit | Credit |
|---|---|---|
| Real | What comes IN | What goes OUT |
| Personal | The RECEIVER | The GIVER |
| Nominal | Expenses & Losses | Income & Gains |

**DEAD CLIC mnemonic:**
- **D**ebits: **E**xpenses, **A**ssets, **D**ividends
- **C**redits: **L**iabilities, **I**ncome, **C**apital

**Journal Entry Format:**
Date | Particulars | Debit (Dr) | Credit (Cr)`,
          examples: [
            { title: "Basic Journal Entries", problem: "Record journal entries for common business transactions.", explanation: "Identify accounts involved, determine their type, apply golden rules to decide debit/credit.", code: `Transaction 1: Purchased furniture ₹10,000 in cash
Accounts: Furniture (Real) & Cash (Real)
Rule: Debit what comes IN, Credit what goes OUT

Entry:
  Furniture A/c    Dr  ₹10,000
    To Cash A/c              ₹10,000
  (Furniture purchased for cash)

Transaction 2: Received ₹5,000 as rent
Accounts: Cash (Real) & Rent Income (Nominal)
Rule: Debit what comes in / Credit income

Entry:
  Cash A/c         Dr  ₹5,000
    To Rent A/c              ₹5,000
  (Rent received in cash)

Transaction 3: Paid salary ₹15,000
Accounts: Salary (Nominal) & Cash (Real)

Entry:
  Salary A/c       Dr  ₹15,000
    To Cash A/c              ₹15,000
  (Salary paid to employees)`, output: `All entries balance: Total Dr = Total Cr
Furniture: Dr 10,000 = Cr 10,000
Rent: Dr 5,000 = Cr 5,000
Salary: Dr 15,000 = Cr 15,000` },
            { title: "Identifying Account Types", problem: "Classify accounts and apply the correct golden rule.", explanation: "First identify the account type (Real, Personal, Nominal), then apply the corresponding rule.", code: `Examples of each type:

REAL ACCOUNTS (tangible things):
  Cash, Building, Machinery, Land, Furniture
  Rule: Debit what comes IN, Credit what goes OUT

PERSONAL ACCOUNTS (people/entities):
  Ram's A/c, Bank A/c, Supplier A/c
  Rule: Debit the RECEIVER, Credit the GIVER

NOMINAL ACCOUNTS (income/expenses):
  Salary, Rent, Interest, Commission, Discount
  Rule: Debit Expenses/Losses, Credit Income/Gains

Quick Test:
  "Paid electricity bill ₹2,000"
  → Electricity (Nominal - expense) → DEBIT
  → Cash (Real - going out) → CREDIT

  "Received loan from bank ₹50,000"
  → Cash (Real - coming in) → DEBIT
  → Bank (Personal - giver) → CREDIT`, output: `Always ask:
1. What accounts are involved?
2. What TYPE is each account?
3. Apply the golden rule for that type.` }
          ],
          keyPoints: [
            "Double-entry: every transaction affects at least 2 accounts",
            "Total Debits ALWAYS equal Total Credits",
            "Real accounts: tangible assets — debit in, credit out",
            "Personal accounts: people/entities — debit receiver, credit giver",
            "Nominal accounts: income/expense — debit expenses, credit income",
            "DEAD CLIC: Debits = Expenses, Assets, Dividends; Credits = Liabilities, Income, Capital",
            "Journal entries record transactions in chronological order"
          ],
          mcqs: [
            { question: "Golden Rule for Nominal Account:", options: ["Debit receiver, Credit giver", "Debit what comes in", "Debit expenses/losses, Credit income/gains", "Debit assets"], correctIndex: 2, explanation: "Nominal accounts: Debit all expenses and losses, Credit all incomes and gains." },
            { question: "When furniture is bought for cash, Cash A/c is:", options: ["Debited", "Credited", "Not affected", "Closed"], correctIndex: 1, explanation: "Cash goes OUT (Real account rule: credit what goes out)." },
            { question: "In double-entry, total debits equal:", options: ["Total assets", "Total credits", "Total liabilities", "Zero"], correctIndex: 1, explanation: "The fundamental principle: total debits always equal total credits." },
            { question: "Cash A/c is which type?", options: ["Nominal", "Personal", "Real", "None"], correctIndex: 2, explanation: "Cash is a tangible asset — it's a Real account." },
            { question: "Salary A/c is which type?", options: ["Real", "Personal", "Nominal", "None"], correctIndex: 2, explanation: "Salary is an expense — it's a Nominal account." }
          ]
        }
      ]
    }
  ]
};
