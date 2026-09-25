// Rich content for Probability & Statistics topics

export const psrRichContent: Record<string, string> = {

  /* ═══════════════════════════════════════════════════════════
     PS-T1: Descriptive Statistics — Deep Theory
     ═══════════════════════════════════════════════════════════ */
  "ps-t1": `
## Why Statistics Matters

Imagine you have exam scores for 500 students. Staring at 500 numbers tells you nothing. Statistics gives you tools to **summarize, visualize, and understand** data — turning chaos into clarity.

> **Analogy:** Statistics is like a magnifying glass for data. Raw numbers are blurry — statistics brings them into focus.

## Measures of Central Tendency

These answer the question: **"What is a typical value in this dataset?"**

### Mean (Arithmetic Average)

The most common measure. Sum all values, divide by count.

$$\\bar{x} = \\frac{\\sum_{i=1}^{n} x_i}{n} = \\frac{x_1 + x_2 + \\ldots + x_n}{n}$$

**Strengths:** Uses every data point. Good for symmetric distributions.

**Weakness:** Sensitive to outliers. One extreme value can pull the mean significantly.

\`\`\`r
# R code to calculate mean
scores <- c(72, 85, 90, 68, 95, 78, 82)
mean(scores)  # Output: 81.43
\`\`\`

### Median

The **middle value** when data is sorted. If n is even, average the two middle values.

$$\\tilde{x} = \\begin{cases} x_{(n+1)/2} & \\text{if n is odd} \\\\ \\frac{x_{n/2} + x_{n/2+1}}{2} & \\text{if n is even} \\end{cases}$$

**Why it matters:** The median is **robust to outliers**. If Bill Gates walks into a room of students, the mean income skyrockets but the median barely changes.

\`\`\`r
# R code to calculate median
scores <- c(72, 85, 90, 68, 95, 78, 82)
median(scores)  # Sort: 68,72,78,82,85,90,95 → Output: 82
\`\`\`

### Mode

The **most frequently occurring** value. A dataset can be:
- **Unimodal** — one mode
- **Bimodal** — two modes
- **Multimodal** — multiple modes
- **No mode** — all values appear equally often

## Measures of Dispersion (Spread)

Central tendency alone is incomplete. Two datasets can have the same mean but wildly different spreads:

- Dataset A: {49, 50, 51} → Mean = 50, very tight
- Dataset B: {0, 50, 100} → Mean = 50, very spread out

### Range

$$\\text{Range} = x_{\\max} - x_{\\min}$$

Simple but crude — uses only two values and is heavily affected by outliers.

### Variance

Measures the **average squared deviation** from the mean. Squaring ensures all deviations are positive and emphasizes larger deviations.

**Population Variance:**
$$\\sigma^2 = \\frac{\\sum_{i=1}^{N}(x_i - \\mu)^2}{N}$$

**Sample Variance (Bessel's correction):**
$$s^2 = \\frac{\\sum_{i=1}^{n}(x_i - \\bar{x})^2}{n - 1}$$

> **Why n-1?** When estimating from a sample, dividing by n underestimates the true variance. Dividing by n-1 corrects this bias. This is called **Bessel's correction**.

### Standard Deviation

The square root of variance — back in the **original units** of the data.

$$\\sigma = \\sqrt{\\sigma^2} \\qquad s = \\sqrt{s^2}$$

\`\`\`r
# R code for variance and standard deviation
data <- c(5, 7, 8, 8, 10, 12, 15)

var(data)   # Sample variance (uses n-1)
sd(data)    # Sample standard deviation
\`\`\`

## The Normal Distribution (Bell Curve)

The most important distribution in statistics. Many natural phenomena follow it: heights, test scores, measurement errors.

$$f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$$

Where $\\mu$ is the mean (center) and $\\sigma$ is the standard deviation (spread).

\`\`\`chart
chart:normal-distribution {"mean": 0, "stdDev": 1, "title": "Standard Normal Distribution (μ=0, σ=1)", "showSD": true}
\`\`\`

### The 68-95-99.7 Rule (Empirical Rule)

For any normal distribution:

| Range | Percentage of Data |
|-------|-------------------|
| $\\mu \\pm 1\\sigma$ | **68.27%** |
| $\\mu \\pm 2\\sigma$ | **95.45%** |
| $\\mu \\pm 3\\sigma$ | **99.73%** |

> **Exam tip:** If a dataset has mean 70 and SD 10, then 95% of values fall between 50 and 90.

### Z-Score (Standard Score)

Converts any normal distribution to the **standard normal** (mean=0, SD=1):

$$z = \\frac{x - \\mu}{\\sigma}$$

A z-score tells you **how many standard deviations** a value is from the mean.

\`\`\`r
# Calculate z-scores in R
scores <- c(72, 85, 90, 68, 95, 78, 82)
z_scores <- scale(scores)
print(z_scores)
\`\`\`

## Comparing Distributions

\`\`\`chart
chart:normal-distribution {"mean": 50, "stdDev": 5, "title": "Tight Distribution (σ=5) — Less variability", "showSD": false}
\`\`\`

\`\`\`chart
chart:normal-distribution {"mean": 50, "stdDev": 15, "title": "Wide Distribution (σ=15) — More variability", "showSD": false}
\`\`\`

Notice how a **smaller standard deviation** creates a taller, narrower curve (data is more concentrated), while a **larger standard deviation** creates a flatter, wider curve (data is more spread out).

## Frequency Distribution

A frequency distribution organizes data into classes/bins and counts how many values fall in each class.

\`\`\`chart
chart:bar {"data": [{"label": "50-59", "value": 3}, {"label": "60-69", "value": 8}, {"label": "70-79", "value": 15}, {"label": "80-89", "value": 12}, {"label": "90-100", "value": 7}], "title": "Exam Score Distribution (n=45)"}
\`\`\`

## Summary: When to Use What

| Measure | Best For | Limitation |
|---------|----------|-----------|
| Mean | Symmetric, no outliers | Pulled by extremes |
| Median | Skewed data, outliers present | Ignores actual values |
| Mode | Categorical data | May not exist or be unique |
| Range | Quick overview | Uses only 2 values |
| Variance | Mathematical calculations | Units are squared |
| Std Dev | Describing spread | Assumes near-normal data |
`,


  /* ═══════════════════════════════════════════════════════════
     PS-T2: Probability — Deep Theory
     ═══════════════════════════════════════════════════════════ */
  "ps-t2": `
## What Is Probability?

Probability is a **measure of uncertainty** — it tells you how likely an event is to happen, expressed as a number between 0 and 1.

$$0 \\leq P(A) \\leq 1$$

- $P(A) = 0$ → Impossible (rolling 7 on a standard die)
- $P(A) = 1$ → Certain (the sun rises tomorrow)
- $P(A) = 0.5$ → Equally likely (fair coin landing heads)

> **Analogy:** Probability is like a weather forecast. "70% chance of rain" means that out of 100 similar weather patterns, about 70 resulted in rain.

## Types of Probability

### Classical (Theoretical)

$$P(A) = \\frac{\\text{Number of favorable outcomes}}{\\text{Total number of equally likely outcomes}}$$

Assumes all outcomes are equally likely. Works for dice, cards, coins.

### Empirical (Experimental)

$$P(A) = \\frac{\\text{Number of times A occurred}}{\\text{Total number of trials}}$$

Based on actual observations. As trials increase, empirical probability approaches theoretical (Law of Large Numbers).

## Fundamental Rules

### Rule 1: Complement Rule

$$P(A') = 1 - P(A)$$

The probability of something NOT happening equals 1 minus the probability it happens.

> **Shortcut:** Sometimes it's easier to calculate what you DON'T want. "At least one head in 3 coin flips" = 1 - P(no heads) = $1 - (0.5)^3 = 0.875$

### Rule 2: Addition Rule

For any two events:

$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$

\`\`\`mermaid
graph LR
    subgraph Venn["Venn Diagram"]
        direction LR
        A["P(A)"]
        AB["P(A and B)"]
        B["P(B)"]
    end
\`\`\`

We subtract $P(A \\cap B)$ because it gets **counted twice** — once in P(A) and once in P(B).

**Special case — Mutually Exclusive Events:**
If A and B cannot happen simultaneously, $P(A \\cap B) = 0$:

$$P(A \\cup B) = P(A) + P(B)$$

### Rule 3: Multiplication Rule

For **independent events** (one doesn't affect the other):

$$P(A \\cap B) = P(A) \\times P(B)$$

For **dependent events:**

$$P(A \\cap B) = P(A) \\times P(B|A)$$

## Conditional Probability

The probability of A **given that B has already occurred**:

$$P(A|B) = \\frac{P(A \\cap B)}{P(B)}, \\quad P(B) > 0$$

> **Real-world example:** What's the probability a student passes the exam, **given** that they attended all classes? This is a conditional probability — the condition (attending classes) changes the sample space.

### Example: Drawing Cards

A card is drawn from a standard deck (52 cards). Given that it's a face card (J, Q, K), what's the probability it's a King?

$$P(\\text{King} | \\text{Face card}) = \\frac{P(\\text{King} \\cap \\text{Face card})}{P(\\text{Face card})} = \\frac{4/52}{12/52} = \\frac{4}{12} = \\frac{1}{3}$$

## Bayes' Theorem

The crown jewel of probability theory. It lets you **update** your beliefs when you get new evidence.

$$P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}$$

Where:
- $P(A)$ = **Prior probability** (what you believed before evidence)
- $P(B|A)$ = **Likelihood** (probability of evidence given your hypothesis)
- $P(B)$ = **Marginal probability** (overall probability of evidence)
- $P(A|B)$ = **Posterior probability** (updated belief after evidence)

### Total Probability (for the denominator)

$$P(B) = P(B|A) \\cdot P(A) + P(B|A') \\cdot P(A')$$

This is called the **Law of Total Probability** — it breaks P(B) into all possible scenarios.

### The Famous Medical Test Example

- Disease prevalence: $P(D) = 0.01$ (1% of population)
- Test sensitivity: $P(+|D) = 0.99$ (99% accurate for sick people)
- False positive rate: $P(+|D') = 0.01$ (1% false alarm)

**Question:** You test positive. What's the actual chance you're sick?

$$P(D|+) = \\frac{P(+|D) \\cdot P(D)}{P(+|D) \\cdot P(D) + P(+|D') \\cdot P(D')}$$

$$= \\frac{0.99 \\times 0.01}{0.99 \\times 0.01 + 0.01 \\times 0.99} = \\frac{0.0099}{0.0198} = 0.50$$

**Only 50%!** Despite a 99% accurate test, there's only a 50-50 chance you actually have the disease. This counterintuitive result is because the disease is so rare that false positives outnumber true positives.

> **This is the Base Rate Fallacy** — ignoring prior probability leads to wildly wrong conclusions. Bayes' theorem corrects for this.

\`\`\`r
# Bayes' theorem in R
prior <- 0.01          # P(Disease)
sensitivity <- 0.99    # P(+|Disease)
false_pos <- 0.01      # P(+|No Disease)

# P(+) = P(+|D)*P(D) + P(+|D')*P(D')
p_positive <- sensitivity * prior + false_pos * (1 - prior)

# P(D|+)
posterior <- (sensitivity * prior) / p_positive
cat("P(Disease | Positive test):", round(posterior, 4))
# Output: 0.5
\`\`\`

## Random Variables

A **random variable** assigns a numerical value to each outcome of a random experiment.

### Discrete Random Variables

Takes countable values (0, 1, 2, ...). Examples: number of heads in 10 flips, number of defective items.

**Probability Mass Function (PMF):**
$$P(X = x) = p(x), \\quad \\text{where } \\sum p(x) = 1$$

### Continuous Random Variables

Takes any value in an interval. Examples: height, weight, temperature.

**Probability Density Function (PDF):**
$$P(a \\leq X \\leq b) = \\int_a^b f(x) \\, dx, \\quad \\text{where } \\int_{-\\infty}^{\\infty} f(x) \\, dx = 1$$

## Binomial Distribution

Models the number of successes in $n$ independent trials, each with success probability $p$.

$$P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}$$

Where $\\binom{n}{k} = \\frac{n!}{k!(n-k)!}$

**Mean:** $\\mu = np$ \\quad **Variance:** $\\sigma^2 = np(1-p)$

\`\`\`chart
chart:bar {"data": [{"label": "0", "value": 1}, {"label": "1", "value": 5}, {"label": "2", "value": 12}, {"label": "3", "value": 17}, {"label": "4", "value": 15}, {"label": "5", "value": 10}, {"label": "6", "value": 5}, {"label": "7", "value": 2}, {"label": "8", "value": 0}], "title": "Binomial Distribution: n=8, p=0.4 — P(X=k) × 100"}
\`\`\`

\`\`\`r
# Binomial distribution in R
n <- 8
p <- 0.4

# P(X = 3)
dbinom(3, size = n, prob = p)

# P(X <= 3) — Cumulative
pbinom(3, size = n, prob = p)

# Generate random binomial values
rbinom(10, size = n, prob = p)
\`\`\`

## Key Formulas Summary

| Concept | Formula |
|---------|---------|
| Classical Probability | $P(A) = \\frac{\\text{favorable}}{\\text{total}}$ |
| Complement | $P(A') = 1 - P(A)$ |
| Addition | $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$ |
| Multiplication (independent) | $P(A \\cap B) = P(A) \\cdot P(B)$ |
| Conditional | $P(A|B) = \\frac{P(A \\cap B)}{P(B)}$ |
| Bayes' Theorem | $P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}$ |
| Binomial PMF | $P(X=k) = \\binom{n}{k} p^k(1-p)^{n-k}$ |
`,
};
