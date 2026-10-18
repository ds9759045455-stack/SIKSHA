// Comprehensive Notes Repository developed by Shiv.org
// Based on actual BCA Semester 3 & CS Curricula provided by the community

export const initialNotes = [
  {
    id: 'bca-315',
    code: 'BCA 315',
    title: 'Numerical & Statistical Techniques',
    subtitle: 'Comprehensive Study Notes: Unit 1 & Unit 2',
    category: 'Mathematics',
    semester: 'Semester III',
    author: {
      name: 'Shiv.org Academic Board',
      role: 'Core Faculty & Contributor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 4.9,
      reviews: 1420
    },
    duration: '18h 9m',
    totalLessons: 16,
    progress: 68,
    status: 'Active',
    tags: ['Algebraic Equations', 'Bisection', 'Newton-Raphson', 'Interpolation', 'Finite Differences'],
    colorGradient: 'from-fuchsia-600/30 via-pink-500/20 to-purple-800/30',
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80',
    description: 'Master numerical root finding methods (Bisection, Regula-Falsi, Newton-Raphson with quadratic convergence proof) and interpolation techniques (Newton Forward/Backward, Lagrange, and Divided Differences).',
    quickSummary: 'Unit 1 covers algebraic & transcendental equations with iterative root finding. Unit 2 covers finite difference operators and polynomial interpolation.',
    units: [
      {
        unitId: 'unit-1',
        title: 'Unit 1: Solution of Algebraic and Transcendental Equations',
        duration: '48 min',
        lessonsCount: 5,
        topics: [
          {
            id: 'bca315-1.1',
            title: '1.1 Fundamental Concepts & Intermediate Value Theorem',
            duration: '10 min',
            readTime: '6 min read',
            summary: 'Distinction between Algebraic and Transcendental equations, Bolzano\'s Intermediate Value Theorem for root location.',
            content: `### 1.1 Fundamental Concepts
An equation of the form $f(x) = 0$ is said to be:
1. **Algebraic equation**: If $f(x)$ is purely a polynomial in $x$, e.g., $f(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x + a_0 = 0$.
2. **Transcendental equation**: If $f(x)$ involves non-algebraic functions such as trigonometric, logarithmic, or exponential functions, e.g., $f(x) = x e^x - 1 = 0$ or $f(x) = \\cos x - x = 0$.

A number $\\alpha$ is called a **root or zero** of $f(x) = 0$ if $f(\\alpha) = 0$.

---

### Intermediate Value Theorem (Bolzano's Theorem)
If a continuous function $f(x)$ on an interval $[a, b]$ satisfies:
$$f(a) \\cdot f(b) < 0$$
then there exists **at least one real root** $\\alpha \\in (a, b)$ such that $f(\\alpha) = 0$.`
          },
          {
            id: 'bca315-1.2',
            title: '1.2 Bisection Method (Bolzano\'s Method)',
            duration: '14 min',
            readTime: '8 min read',
            summary: 'Iterative bracketing by interval halving, step-by-step algorithm, convergence formula, and Solved Example 1.',
            content: `### 1.2 Bisection Method (Bolzano's Method)

#### Principle
The Bisection method is an iterative bracketing technique based on repeated halving of an interval containing a sign change.

#### Algorithm
1. Find an initial interval $[a_0, b_0]$ such that $f(a_0) \\cdot f(b_0) < 0$.
2. Compute the midpoint:
$$x_k = \\frac{a_k + b_k}{2}$$
3. Evaluate $f(x_k)$:
   - If $f(x_k) = 0$, $x_k$ is the exact root. Stop.
   - If $f(a_k) \\cdot f(x_k) < 0$, the root lies in $[a_k, x_k]$. Set $a_{k+1} = a_k, b_{k+1} = x_k$.
   - If $f(a_k) \\cdot f(x_k) > 0$, the root lies in $[x_k, b_k]$. Set $a_{k+1} = x_k, b_{k+1} = b_k$.
4. Repeat until $|b_k - a_k| < \\epsilon$ or $|f(x_k)| < \\epsilon$.

#### Convergence Analysis
- The length of the interval after $n$ iterations is:
$$\\Delta_n = \\frac{b_0 - a_0}{2^n}$$
- To achieve an absolute error tolerance $\\epsilon$, the required number of iterations is:
$$n \\ge \\frac{\\ln(b_0 - a_0) - \\ln(\\epsilon)}{\\ln 2} = \\log_2 \\left(\\frac{b_0 - a_0}{\\epsilon}\\right)$$
- **Order of Convergence**: Linear ($p = 1$).
- **Advantages**: Guaranteed to converge if $f(x)$ is continuous on $[a, b]$.
- **Disadvantages**: Convergence is slow compared to higher-order methods.

---

#### Solved Example 1
**Problem**: Find a root of $f(x) = x^3 - 4x - 9 = 0$ correct to 2 decimal places using Bisection method.

**Solution**:
- $f(2) = 2^3 - 4(2) - 9 = 8 - 8 - 9 = -9 < 0$
- $f(3) = 3^3 - 4(3) - 9 = 27 - 12 - 9 = +6 > 0$
- Since $f(2) \\cdot f(3) < 0$, a root lies in $[2, 3]$.

| Iteration ($k$) | $a$ | $b$ | $x_k = \\frac{a+b}{2}$ | $f(x_k)$ | Next Interval |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 2.0000 | 3.0000 | 2.5000 | $(2.5)^3 - 4(2.5) - 9 = -3.375$ | [2.5, 3.0] |
| 2 | 2.5000 | 3.0000 | 2.7500 | $(2.75)^3 - 4(2.75) - 9 = +0.7969$ | [2.5, 2.75] |
| 3 | 2.5000 | 2.7500 | 2.6250 | $(2.625)^3 - 4(2.625) - 9 = -1.4121$ | [2.625, 2.75] |
| 4 | 2.6250 | 2.7500 | 2.6875 | $(2.6875)^3 - 4(2.6875) - 9 = -0.3391$ | [2.6875, 2.75] |
| 5 | 2.6875 | 2.7500 | 2.7188 | $(2.7188)^3 - 4(2.7188) - 9 = +0.2209$ | [2.6875, 2.7188] |
| 6 | 2.6875 | 2.7188 | 2.7032 | $(2.7032)^3 - 4(2.7032) - 9 = -0.0611$ | [2.7032, 2.7188] |
| 7 | 2.7032 | 2.7188 | 2.7110 | $(2.7110)^3 - 4(2.7110) - 9 = +0.0795$ | [2.7032, 2.7110] |

**Conclusion**: The approximate root is **$x \\approx 2.71$**.`
          },
          {
            id: 'bca315-1.3',
            title: '1.3 Regula-Falsi Method (False Position)',
            duration: '12 min',
            readTime: '7 min read',
            summary: 'Secant straight chord interpolation formula, derivation, algorithm, and Solved Example 2.',
            content: `### 1.3 Regula-Falsi Method (Method of False Position)

#### Principle
Instead of taking the arithmetic midpoint, Regula-Falsi connects $(a, f(a))$ and $(b, f(b))$ by a straight chord and takes the point of intersection of the chord with the $x$-axis as the next approximation.

#### Derivation of the Iteration Formula
The equation of the secant line passing through $A(a, f(a))$ and $B(b, f(b))$ is:
$$y - f(a) = \\frac{f(b) - f(a)}{b - a}(x - a)$$

Setting $y = 0$ to find root $x_1$:
$$x_1 = a - \\frac{(b - a) f(a)}{f(b) - f(a)} = \\frac{a f(b) - b f(a)}{f(b) - f(a)}$$

#### General Iteration Formula
$$x_{k+1} = \\frac{a_k f(b_k) - b_k f(a_k)}{f(b_k) - f(a_k)}$$

#### Solved Example 2
**Problem**: Find root of $f(x) = x^3 - 2x - 5 = 0$ in $[2, 3]$ using Regula-Falsi up to 3 iterations.
- $f(2) = 2^3 - 2(2) - 5 = -1 < 0$
- $f(3) = 3^3 - 2(3) - 5 = +16 > 0$

**Iteration 1**:
$$x_1 = \\frac{2(16) - 3(-1)}{16 - (-1)} = \\frac{35}{17} \\approx 2.0588$$
$f(2.0588) = -0.3912 < 0$. Set $a_1 = 2.0588, b_1 = 3$.

**Iteration 2**:
$$x_2 = \\frac{2.0588(16) - 3(-0.3912)}{16 - (-0.3912)} = \\frac{34.1144}{16.3912} \\approx 2.0813$$
$f(2.0813) = -0.1468 < 0$. Set $a_2 = 2.0813, b_2 = 3$.

**Iteration 3**:
$$x_3 = \\frac{2.0813(16) - 3(-0.1468)}{16 - (-0.1468)} = \\frac{33.7412}{16.1468} \\approx 2.0896$$
**Result**: After 3 iterations, $x \\approx 2.0896$.`
          },
          {
            id: 'bca315-1.4',
            title: '1.4 Newton-Raphson Method & Quadratic Proof',
            duration: '16 min',
            readTime: '9 min read',
            summary: 'Geometric tangent line, Taylor expansion derivation, full proof of Order 2 convergence, failure criteria, and trigonometric solved example.',
            content: `### 1.4 Newton-Raphson Method

#### Principle and Geometric Interpretation
The Newton-Raphson method approximates the root by replacing the graph of $y = f(x)$ with its tangent line at an initial estimate $x_0$, then finding the $x$-intercept of that tangent.

#### Iterative Formula
$$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$$

---

### Derivation of Quadratic Convergence (Order $p = 2$)
Let $\\alpha$ be the exact root so that $f(\\alpha) = 0$. Let $e_n = x_n - \\alpha$ be the error at step $n$, meaning $x_n = \\alpha + e_n$.
Substituting into the formula:
$$e_{n+1} + \\alpha = \\alpha + e_n - \\frac{f(\\alpha + e_n)}{f'(\\alpha + e_n)}$$
Expanding using Taylor's Theorem:
$$f(\\alpha + e_n) = f(\\alpha) + e_n f'(\\alpha) + \\frac{e_n^2}{2} f''(\\alpha) + \\dots$$
Since $f(\\alpha) = 0$:
$$e_{n+1} = e_n - \\frac{e_n f'(\\alpha) + \\frac{e_n^2}{2} f''(\\alpha)}{f'(\\alpha) [1 + e_n \\frac{f''(\\alpha)}{f'(\\alpha)}]}$$

Using binomial expansion $(1+z)^{-1} \\approx 1 - z$:
$$e_{n+1} \\approx \\frac{f''(\\alpha)}{2 f'(\\alpha)} e_n^2$$
$$|e_{n+1}| \\le C |e_n|^2 \\quad \\text{where } C = \\left| \\frac{f''(\\alpha)}{2 f'(\\alpha)} \\right|$$

> **Key takeaway**: The number of correct decimal places roughly doubles with each iteration!

#### Failure Cases to Remember
1. $f'(x_n) = 0$: Tangent line becomes parallel to the $x$-axis (division by zero).
2. Inflection points / Cycle oscillations: The sequence may oscillate between two values ($x_{n+2} = x_n$).
3. Divergence: If initial guess $x_0$ is chosen too far from root.`
          },
          {
            id: 'bca315-1.5',
            title: '1.5 Comparison Table of Root-Finding Methods',
            duration: '6 min',
            readTime: '4 min read',
            summary: 'Comprehensive exam summary comparing Bisection, Regula-Falsi, and Newton-Raphson across all metrics.',
            content: `### 1.5 Comparison of Root-Finding Methods

| Parameter | Bisection Method | Regula-Falsi Method | Newton-Raphson Method |
| :--- | :--- | :--- | :--- |
| **Type** | Bracketing (Closed) | Bracketing (Closed) | Open Method |
| **Guaranteed Convergence?** | Yes (if $f(a)f(b) < 0$) | Yes (if $f(a)f(b) < 0$) | No (depends on initial guess $x_0$) |
| **Order of Convergence** | $1$ (Linear) | $1$ (Linear) | $2$ (Quadratic) |
| **Evaluation per step** | $1$ function call | $1$ function call | $1$ function + $1$ derivative |
| **Speed** | Slowest | Moderate | Fastest |
| **Applicability** | Simple, robust | Continuous curves | Differentiable functions ($f' \\ne 0$) |`
          }
        ]
      },
      {
        unitId: 'unit-2',
        title: 'Unit 2: Interpolation & Finite Differences',
        duration: '52 min',
        lessonsCount: 4,
        topics: [
          {
            id: 'bca315-2.1',
            title: '2.1 & 2.2 Finite Difference Operators & Properties',
            duration: '14 min',
            readTime: '8 min read',
            summary: 'Forward Δ, Backward ∇, Shift E, Differential D operators, key proofs, and Fundamental Theorem.',
            content: `### 2.2 Finite Difference Operators & Their Properties
Assume equispaced nodes: $x_i = x_0 + i h$ for $i = 0, 1, \\dots, n$, where $h$ is constant step length.

1. **Forward Difference Operator ($\\Delta$)**:
   $$\\Delta f(x) = f(x + h) - f(x) \\implies \\Delta y_i = y_{i+1} - y_i$$
2. **Backward Difference Operator ($\\nabla$)**:
   $$\\nabla f(x) = f(x) - f(x - h) \\implies \\nabla y_i = y_i - y_{i-1}$$
3. **Shift Operator ($E$)**:
   $$E f(x) = f(x + h) \\implies E y_i = y_{i+1}$$
   $$E^n y_i = y_{i+n}$$
4. **Key Operator Relationships**:
   - $\\Delta = E - 1$
   - $\\nabla = 1 - E^{-1}$
   - $\\Delta = E \\nabla = \\nabla E$
   - $E = e^{hD} \\implies hD = \\ln(1 + \\Delta) = \\Delta - \\frac{\\Delta^2}{2} + \\frac{\\Delta^3}{3} - \\dots$

#### Fundamental Theorem of Finite Differences
The $n$-th difference of a polynomial of degree $n$ is constant:
$$\\Delta^n (a_n x^n + \\dots + a_0) = a_n n! h^n = \\text{Constant}$$
All higher differences ($n+1$ and beyond) are zero: $\\Delta^{n+1} P_n(x) = 0$.`
          },
          {
            id: 'bca315-2.4',
            title: '2.4 Newton\'s Forward & Backward Difference Formulas',
            duration: '16 min',
            readTime: '10 min read',
            summary: 'Derivation for equal intervals, Solved Example 4 on town population estimation for 1955 and 1988.',
            content: `### 2.4 Interpolation with Equal Intervals

#### A. Newton’s Forward Difference Interpolation Formula
Used when interpolating values of $y$ near the **beginning** of tabular values.
Let $x = x_0 + u h$, where $u = \\frac{x - x_0}{h}$:
$$y(x) = y_0 + u \\Delta y_0 + \\frac{u(u-1)}{2!} \\Delta^2 y_0 + \\frac{u(u-1)(u-2)}{3!} \\Delta^3 y_0 + \\dots$$

#### B. Newton’s Backward Difference Interpolation Formula
Used when interpolating values of $y$ near the **end** of tabular values.
Let $x = x_n + v h$, where $v = \\frac{x - x_n}{h}$:
$$y(x) = y_n + v \\nabla y_n + \\frac{v(v+1)}{2!} \\nabla^2 y_n + \\frac{v(v+1)(v+2)}{3!} \\nabla^3 y_n + \\dots$$

---

#### Solved Example 4 (Town Population in Thousands)
| Year ($x$) | 1951 | 1961 | 1971 | 1981 | 1991 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Population ($y$)** | 15 | 20 | 27 | 39 | 52 |

- For $x = 1955$ (Near start, $h = 10, u = \\frac{1955-1951}{10} = 0.4$):
  Result: **$y(1955) \\approx 17.1184$ thousand (17,118 people)**.
- For $x = 1988$ (Near end, $v = \\frac{1988-1991}{10} = -0.3$):
  Result: **$y(1988) \\approx 48.215$ thousand (48,215 people)**.`
          },
          {
            id: 'bca315-2.6',
            title: '2.6 Lagrange\'s Interpolation Formula (Unequal Intervals)',
            duration: '12 min',
            readTime: '7 min read',
            summary: 'Formulation, basis polynomials, advantages, and Solved Example 5.',
            content: `### 2.6 Lagrange’s Interpolation Formula
When step sizes $h_i = x_{i+1} - x_i$ are unequal, finite differences cannot be applied directly.

#### Formulation
$$P_n(x) = \\sum_{i=0}^n L_i(x) y_i$$
where basis polynomial:
$$L_i(x) = \\prod_{j \\ne i} \\frac{x - x_j}{x_i - x_j}$$

#### Solved Example 5
Given points $(5, 12), (6, 13), (9, 14), (11, 16)$, find $y(10)$:
- $L_0(10) = 1/6 \\implies T_0 = 2$
- $L_1(10) = -1/3 \\implies T_1 = -4.3333$
- $L_2(10) = 5/6 \\implies T_2 = 11.6667$
- $L_3(10) = 1/3 \\implies T_3 = 5.3333$
**Sum**: $y(10) = 2 - 4.3333 + 11.6667 + 5.3333 = \\mathbf{14.6667}$.`
          },
          {
            id: 'bca315-2.7',
            title: '2.7 Newton\'s Divided Difference & Quick Reference',
            duration: '10 min',
            readTime: '6 min read',
            summary: 'Divided difference definitions, symmetry, linearity, derivative relation, and Quick Reference Summary.',
            content: `### 2.7 Newton\'s Divided Difference Formula
$$f[x_0, x_1] = \\frac{f(x_1) - f(x_0)}{x_1 - x_0}$$
$$f[x_0, x_1, x_2] = \\frac{f[x_1, x_2] - f[x_0, x_1]}{x_2 - x_0}$$

#### Quick Reference Cheat Sheet for Exams
\`\`\`text
┌────────────────────────────────────────────────────────────────────────┐
│                              ROOT-FINDING                              │
├──────────────────────┬──────────────────────┬──────────────────────────┤
│ Bisection            │ Regula-Falsi         │ Newton-Raphson           │
│ x = (a + b) / 2      │ x = (af(b)-bf(a))/   │ x_{n+1} = x_n - f/f'     │
│ Order: 1 (Slow)      │     (f(b)-f(a))      │ Order: 2 (Quadratic)     │
│ Guaranteed root      │ Guaranteed root      │ Fails if f'(x) = 0       │
└──────────────────────┴──────────────────────┴──────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│                             INTERPOLATION                              │
├────────────────────────────────────────┬───────────────────────────────┤
│ EQUAL INTERVALS (Step = h)             │ UNEQUAL INTERVALS             │
├────────────────────────────────────────┼───────────────────────────────┤
│ Near Start: Newton's Forward           │ Lagrange's Formula:           │
│ u = (x - x_0)/h                        │ y = Σ L_i(x) * y_i            │
│ y = y_0 + u Δy_0 + u(u-1)/2! Δ²y_0 +… │ (Best for inverse interp.)    │
├────────────────────────────────────────┼───────────────────────────────┤
│ Near End: Newton's Backward            │ Newton's Divided Difference:  │
│ v = (x - x_n)/h                        │ y = f[x_0] + (x-x_0)f[x_0,x_1]│
│ y = y_n + v ∇y_n + v(v+1)/2! ∇²y_n +… │ + (x-x_0)(x-x_1)f[x_0,x_1,x_2│
└────────────────────────────────────────┴───────────────────────────────┘
\`\`\``
          }
        ]
      }
    ]
  },
  {
    id: 'bca-302',
    code: 'BCA 302',
    title: 'Data Structures & Algorithms',
    subtitle: 'Complete Exam Revision Notes: Unit 1 & Unit 2',
    category: 'Computer Science',
    semester: 'Semester III',
    author: {
      name: 'Daniel Reed',
      role: 'Senior DSA Fellow • Shiv.org',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      rating: 4.9,
      reviews: 2100
    },
    duration: '22h 15m',
    totalLessons: 14,
    progress: 85,
    status: 'Completed',
    tags: ['Arrays', 'Stack (LIFO)', 'Queue (FIFO)', 'Circular Queue', 'Big-O', 'Algorithms in C'],
    colorGradient: 'from-violet-600/30 via-indigo-500/20 to-purple-900/30',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    description: 'Complete revision of Arrays, Stacks, Queues, Asymptotic Notations (O, Ω, Θ), Top-Down vs Bottom-Up designs, and core C implementations with time/space complexities.',
    quickSummary: 'Essential DSA fundamentals with ready-to-run C code snippets, algorithmic flow, and exam scoring checklists.',
    units: [
      {
        unitId: 'dsa-unit-1',
        title: 'Unit 1: Introduction to Data Structures & Algorithm Analysis',
        duration: '35 min',
        lessonsCount: 4,
        topics: [
          {
            id: 'bca302-1.1',
            title: 'Definition, Goals & Classification',
            duration: '10 min',
            readTime: '6 min read',
            summary: 'Data structures taxonomy: Primitive vs Non-Primitive, Linear (Array, Stack, Queue, List) vs Non-Linear (Tree, Graph).',
            content: `### Unit I: Introduction to Data Structures & Algorithm Analysis

#### 1. Definition of Data Structure
A Data Structure is a specialized format for organizing, storing, accessing, and manipulating data in a computer’s memory efficiently. It specifies:
- The mathematical or logical relationship among data elements.
- The set of operations (e.g., insertion, deletion, searching) that can be applied to them.
- The memory representation of data items.

**Primary Goals**:
- **Time Efficiency**: Minimize execution time of algorithms.
- **Space Efficiency**: Minimize memory utilization.

---

#### 2. Classification of Data Structures
\`\`\`text
                  Data Structures
                         |
        -----------------------------------
        |                                 |
Primitive Data Structures       Non-Primitive Data Structures
(int, float, char, pointer)               |
                               -------------------------
                               |                       |
                        Linear Structures      Non-Linear Structures
                     (Array, Stack, Queue)         (Tree, Graph)
\`\`\`

- **Primitive Data Structures**: Fundamental data types provided directly by programming languages and supported at the hardware/CPU level (int, float, char, double, pointers).
- **Non-Primitive Data Structures**: Sophisticated structures constructed by combining primitives.
- **Linear**: Elements arranged in sequential sequence with unique predecessor and successor.
- **Non-Linear**: Hierarchical or interconnected multi-level format.`
          },
          {
            id: 'bca302-1.2',
            title: 'Top-Down vs Bottom-Up & Asymptotic Notations',
            duration: '12 min',
            readTime: '7 min read',
            summary: 'Decomposition vs Composition, Frequency Count, Big-O (Worst), Omega (Best), Theta (Tight Average).',
            content: `### Algorithm Design Strategies & Complexity

#### Top-Down vs. Bottom-Up Design
| Feature | Top-Down Design (Decomposition) | Bottom-Up Design (Composition) |
| :--- | :--- | :--- |
| **Core Concept** | Complex problem broken down recursively into smaller sub-problems until trivial. | Basic sub-components are solved first and combined together to formulate solution. |
| **Strategy** | "Divide and Conquer" / Stepwise Refinement. | Dynamic Programming / Inductive Synthesis. |
| **Flow** | High-level architectural view down to low-level details. | Primitive building blocks upward to high-level architecture. |
| **Exam Example** | Merge Sort / Quick Sort. | Fibonacci with memoization / Matrix Chain Multiplication. |

---

#### Asymptotic Notations
- **Big-O Notation ($O$)**: Denotes upper bound (worst-case scenario).
  $$f(n) = O(g(n)) \\implies f(n) \\le c \\cdot g(n) \\quad \\forall n \\ge n_0$$
- **Omega Notation ($\\Omega$)**: Denotes lower bound (best-case scenario).
  $$f(n) = \\Omega(g(n)) \\implies f(n) \\ge c \\cdot g(n) \\quad \\forall n \\ge n_0$$
- **Theta Notation ($\\Theta$)**: Denotes tight bound (exact asymptotic rate).
  $$c_1 \\cdot g(n) \\le f(n) \\le c_2 \\cdot g(n)$$`
          }
        ]
      },
      {
        unitId: 'dsa-unit-2',
        title: 'Unit 2: Linear Data Structures — Array, Stack & Queue',
        duration: '50 min',
        lessonsCount: 5,
        topics: [
          {
            id: 'bca302-2.1',
            title: 'Array Operations with C Code & Complexities',
            duration: '18 min',
            readTime: '12 min read',
            summary: 'Traversal O(N), Insertion O(N), Deletion O(N), Update O(1), Linear Search O(N), Binary Search O(log N).',
            content: `### Core Array Operations & C Programs

#### 1. Array Insertion Algorithm & C Implementation
\`\`\`c
#include <stdio.h>
int main() {
    int arr[10] = {10, 20, 30, 40, 50};
    int n = 5, item = 25, pos = 2, i;

    // Shift elements to the right
    for (i = n - 1; i >= pos; i--) {
        arr[i + 1] = arr[i];
    }
    arr[pos] = item;
    n++;

    printf("Array after insertion: ");
    for (i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}
\`\`\`
*Time Complexity*: Worst: $O(N)$ (shifting elements) | Best: $O(1)$ (insert at end)

---

#### 2. Binary Search in C ($O(\\log N)$)
\`\`\`c
#include <stdio.h>
int main() {
    int arr[5] = {10, 20, 30, 40, 50}; // Pre-sorted array prerequisite
    int n = 5, target = 40;
    int low = 0, high = n - 1, mid;

    while (low <= high) {
        mid = (low + high) / 2;
        if (arr[mid] == target) {
            printf("Found %d at index %d\\n", target, mid);
            return 0;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    printf("Not found\\n");
    return 0;
}
\`\`\``
          },
          {
            id: 'bca302-2.2',
            title: 'Stack Operations (LIFO) & Applications',
            duration: '14 min',
            readTime: '8 min read',
            summary: 'Push, Pop, Stack Overflow/Underflow, Infix to Postfix conversion, and Recursion management.',
            content: `### Stacks (Last-In, First-Out)

#### Clean Stack Push Operation
\`\`\`c
void push(int item) {
    if (top >= MAX_SIZE - 1) {
        printf("Stack Overflow! Cannot push %d\\n", item);
        return;
    }
    top++;
    stack[top] = item;
}
\`\`\`

#### Real-World & Computational Applications of Stack
1. **Expression Evaluation & Conversion**: Parsing infix to postfix and evaluating arithmetic strings.
2. **Function Call Management & Recursion**: Preserves activation records and return addresses in the system runtime stack.
3. **Undo/Redo Operations**: Maintains state history in text editors.
4. **Syntax Analysis & Bracket Matching**: Verifies balanced delimiters (parentheses, braces) in compilers.
5. **Backtracking**: Maze navigation and DFS graph traversals.`
          },
          {
            id: 'bca302-2.3',
            title: 'Queue (FIFO) & Circular Queue Modulo Math',
            duration: '12 min',
            readTime: '7 min read',
            summary: 'Linear vs Circular Queue, Priority Queue, Deque, and circular step formula Rear = (Rear + 1) % MaxSize.',
            content: `### Queues & Exam Essentials

| Queue Type | Working Principle | Key Advantage | Exam Formulas & Conditions |
| :--- | :--- | :--- | :--- |
| **Linear Queue** | Strict single-direction progression. | Simple to implement. | Overflow: \`Rear == MaxSize - 1\`<br>Underflow: \`Front == -1\` |
| **Circular Queue** | End connects back to start in a continuous circle. | Eliminates memory wastage caused by unused front slots. | **Circular Step**: \`Rear = (Rear + 1) % MaxSize\`<br>**Overflow**: \`(Rear + 1) % MaxSize == Front\` |
| **Priority Queue** | Elements processed by assigned priority. | Ideal for OS interrupts and CPU scheduling. | Ascending: Smallest served first.<br>Descending: Largest served first. |
| **Double-Ended (Deque)** | Insertion/deletion at both ends (Front & Rear). | Combines Stack and Queue functionality. | Input-Restricted vs Output-Restricted. |

---

#### Exam Scoring Checklist & Common Pitfalls
- **Binary Search Pre-condition**: State clearly that *"Binary Search strictly requires the array elements to be pre-sorted."*
- **Circular Queue Formula**: Always write $\\text{Rear} = (\\text{Rear} + 1) \\% \\text{MaxSize}$ to score full step marks.
- **Safety Checks**: In code problems, always write explicit checks for Overflow before insertion and Underflow before deletion.`
          }
        ]
      }
    ]
  },
  {
    id: 'bca-dcn',
    code: 'BCA 303',
    title: 'Data Communication & Networks (DCN)',
    subtitle: 'Comprehensive Study & Examination Preparation Notes',
    category: 'Networking',
    semester: 'Semester III',
    author: {
      name: 'Prof. Alistair Vance',
      role: 'Network Architect • Shiv.org Contributor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 4.8,
      reviews: 1890
    },
    duration: '20h 30m',
    totalLessons: 18,
    progress: 42,
    status: 'Incomplete',
    tags: ['OSI 7 Layers', 'TCP/IP', 'CRC Modulo-2', 'CSMA/CD', 'IPv4 & CIDR Subnetting', 'Exam Questions'],
    colorGradient: 'from-rose-600/30 via-fuchsia-500/20 to-purple-800/30',
    coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80',
    description: 'In-depth networking study guide: 7-layer OSI vs TCP/IP models, transmission media, CRC polynomial division, CSMA/CD minimum frame size, IPv4/IPv6 subnetting, and Top 5 exam questions.',
    quickSummary: 'From physical media to application protocols, featuring step-by-step CRC calculations and subnetting formulas.',
    units: [
      {
        unitId: 'dcn-unit-1',
        title: 'Unit 1 & 2: Fundamentals, OSI Model & Physical Layer',
        duration: '40 min',
        lessonsCount: 3,
        topics: [
          {
            id: 'dcn-1.1',
            title: 'OSI 7-Layer Model vs TCP/IP Suite',
            duration: '15 min',
            readTime: '9 min read',
            summary: '7-Layer OSI hierarchy, PDUs at each tier, functions, and direct architectural comparison with TCP/IP.',
            content: `### 1.4 The OSI 7-Layer Reference Model & PDUs

\`\`\`text
+--------------------------------------------------------+
| 7. Application Layer  (HTTP, DNS, FTP, SMTP)           | -> PDU: Message / Data
+--------------------------------------------------------+
| 6. Presentation Layer (Translation, Encryption, SSL)   | -> PDU: Data
+--------------------------------------------------------+
| 5. Session Layer      (Dialog Control, Checkpoints)    | -> PDU: Data
+--------------------------------------------------------+
| 4. Transport Layer    (End-to-End, TCP/UDP, Ports)     | -> PDU: Segment
+--------------------------------------------------------+
| 3. Network Layer      (Routing, Logical IPv4/IPv6)     | -> PDU: Packet
+--------------------------------------------------------+
| 2. Data Link Layer    (Framing, MAC Addr, CRC)         | -> PDU: Frame
+--------------------------------------------------------+
| 1. Physical Layer     (Bit Transmission, Signaling)    | -> PDU: Bit
+--------------------------------------------------------+
\`\`\`

#### OSI vs. TCP/IP Protocol Suite
- **OSI**: 7 Layers, theoretical model developed before implementation, strict separation of Session & Presentation layers.
- **TCP/IP**: 4 Layers (Application, Transport, Internet, Network Access), protocols developed first, Session/Presentation merged into Application.`
          },
          {
            id: 'dcn-1.2',
            title: 'Transmission Media & Channel Capacity Theorems',
            duration: '14 min',
            readTime: '8 min read',
            summary: 'UTP vs STP, Fiber Optic Single Mode vs Multi-Mode, Nyquist & Shannon Capacity Theorems.',
            content: `### Physical Layer & Transmission Media

#### Channel Capacity Theorems
1. **Nyquist Bit Rate (Noiseless Channel)**:
   $$\\text{Bit Rate} = 2 \\cdot B \\cdot \\log_2(L)$$
   (where $B$ is bandwidth in Hz, $L$ is number of signal levels).
2. **Shannon Capacity Theorem (Noisy Channel)**:
   $$C = B \\cdot \\log_2(1 + \\text{SNR})$$
   (where $\\text{SNR} = \\text{Signal Power} / \\text{Noise Power}$).

#### Guided Transmission Media
- **Twisted Pair Cable**: UTP (Cat 5e/Cat 6, 100m reach, cheap) vs STP (Shielded, metal foil, high noise immunity).
- **Coaxial Cable**: Solid core, dielectric insulator, braided shield, used in cable TV and legacy bus Ethernet.
- **Optical Fiber Cable**: Transmits light pulses using **Total Internal Reflection**.
  - *Single-Mode Fiber (SMF)*: Core ~9 microns, laser source, ultra-low attenuation, 10-100 km long-haul.
  - *Multi-Mode Fiber (MMF)*: Core 50-62.5 microns, LED source, higher dispersion, campus backbones.`
          }
        ]
      },
      {
        unitId: 'dcn-unit-3',
        title: 'Unit 3 & 4: Data Link, MAC, Routing & Top 5 Exam Questions',
        duration: '45 min',
        lessonsCount: 3,
        topics: [
          {
            id: 'dcn-3.1',
            title: 'Error Detection: CRC Modulo-2 Division',
            duration: '16 min',
            readTime: '10 min read',
            summary: 'Complete numerical derivation of Cyclic Redundancy Check with generator polynomial G(X) = X^4 + X + 1.',
            content: `### Cyclic Redundancy Check (CRC) Numerical

#### Problem Statement
Given data word \`1010000\` and generator polynomial $G(X) = X^4 + X + 1$, compute the transmitted codeword.

#### Step-by-Step Solution:
1. **Convert $G(X)$ to binary**:
   $$G(X) = 1 \\cdot X^4 + 0 \\cdot X^3 + 0 \\cdot X^2 + 1 \\cdot X^1 + 1 \\cdot X^0 = \\mathbf{10011}$$
   Degree of generator $r = 4$.
2. **Append $r = 4$ zeros to data word**:
   $$\\text{Dividend} = 10100000000$$
3. **Perform Binary Modulo-2 XOR Division**:
   - Divide $10100000000$ by $10011$ using bitwise XOR.
   - The 4-bit remainder obtained is $R = \\mathbf{0110}$.
4. **Form the Transmitted Codeword**:
   Replace appended zeros with the 4-bit remainder:
   $$\\text{Transmitted Frame} = \\mathbf{10100000110}$$
5. **Receiver Verification**:
   Receiver divides $10100000110$ by $10011$. Zero remainder confirms no transmission errors occurred!`
          },
          {
            id: 'dcn-3.2',
            title: 'CSMA/CD & Minimum Frame Length Constraint',
            duration: '12 min',
            readTime: '7 min read',
            summary: 'Carrier Sense Multiple Access with Collision Detection, jamming signal, and formula T_frame >= 2 * T_prop.',
            content: `### CSMA/CD Protocol (IEEE 802.3 Ethernet)

#### Working Principle
- **Carrier Sense**: "Listen Before Talk". Senses channel state before transmitting.
- **Multiple Access**: Multiple stations share common broadcast medium.
- **Collision Detection**: Station listens while transmitting. If power spikes above threshold, collision is detected.
- Transmission stops immediately, a 32-bit **jamming signal** is sent, and exponential backoff begins.

#### Why Minimum Frame Size is Mandatory in Ethernet
To ensure a sender detects any collision before it finishes transmitting:
$$T_{\\text{frame}} \\ge 2 \\cdot T_{\\text{prop}}$$
$$\\frac{\\text{Frame Length}}{\\text{Bandwidth}} \\ge 2 \\cdot \\frac{\\text{Distance}}{\\text{Propagation Speed}}$$
$$\\text{Minimum Frame Length} \\ge 2 \\times \\text{Bandwidth} \\times T_{\\text{prop}}$$

> If the frame is too short, the sender would complete transmission and consider it successful before the collision echo signal returns!`
          },
          {
            id: 'dcn-3.3',
            title: 'Top 5 High-Probability DCN Exam Questions',
            duration: '15 min',
            readTime: '9 min read',
            summary: 'Curated scoring pointers for the 5 most frequently asked questions in university DCN exams.',
            content: `### Top 5 High-Probability Questions for DCN

1. **Question 1**: Describe the 7 layers of OSI model with functions, protocols, and PDUs.
   - *Key Scoring*: Draw 7-tier diagram, specify Bits -> Frames -> Packets -> Segments -> Data.
2. **Question 2**: Compare Guided Media (Twisted pair, Coaxial, Fiber Optic) based on bandwidth, attenuation, noise immunity.
   - *Key Scoring*: Mention Total Internal Reflection ($n_1 > n_2$) and core diameter.
3. **Question 3**: What is CRC? Calculate transmitted codeword for $G(X) = X^4 + X + 1$.
   - *Key Scoring*: Show clean XOR division and state generator degree $r = 4$.
4. **Question 4**: Explain CSMA/CD protocol. Why is minimum frame size mandatory?
   - *Key Scoring*: State $T_{\\text{frame}} \\ge 2 \\cdot T_{\\text{prop}}$.
5. **Question 5**: Compare IPv4 vs IPv6. Explain CIDR subnetting with an example.
   - *Key Scoring*: Explain 32-bit vs 128-bit, CIDR $/26$ giving $2^6 = 64$ total IPs and 62 usable hosts.`
          }
        ]
      }
    ]
  },
  {
    id: 'bca-dbms',
    code: 'BCA 304',
    title: 'Database Management Systems (DBMS)',
    subtitle: 'Comprehensive Study & Examination Preparation Notes',
    category: 'Databases',
    semester: 'Semester III',
    author: {
      name: 'Dr. Elena Rostova',
      role: 'Database Systems Lead • Shiv.org',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      rating: 4.9,
      reviews: 1650
    },
    duration: '24h 45m',
    totalLessons: 20,
    progress: 75,
    status: 'Active',
    tags: ['ANSI/SPARC 3-Schema', 'ER Modeling', 'Relational Algebra', 'SQL DDL/DML', 'Normalization 1NF-BCNF', 'ACID Transactions'],
    colorGradient: 'from-amber-600/30 via-pink-600/20 to-purple-900/30',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    description: 'In-depth DBMS notes: 3-tier ANSI/SPARC architecture, ER modeling, Relational Algebra, SQL classification, Normalization from 1NF to BCNF, ACID transactions, 2-Phase Locking, and WAL recovery.',
    quickSummary: 'Essential database concepts with schema architectures, normal form decomposition, and exam scoring checklists.',
    units: [
      {
        unitId: 'dbms-unit-1',
        title: 'Unit 1 & 2: Architecture, Data Independence & ER Model',
        duration: '45 min',
        lessonsCount: 3,
        topics: [
          {
            id: 'dbms-1.1',
            title: '3-Schema ANSI/SPARC Architecture & Data Independence',
            duration: '15 min',
            readTime: '9 min read',
            summary: 'External, Conceptual, and Internal levels; Physical vs Logical Data Independence.',
            content: `### 1.2 Three-Schema Architecture (ANSI/SPARC)

\`\`\`text
+--------------------------------------------------------+
|           External View 1 ... External View N          |
+--------------------------------------------------------+
                           ^
                           | (Logical Data Independence)
                           v
+--------------------------------------------------------+
|                   Conceptual Schema                    |
+--------------------------------------------------------+
                           ^
                           | (Physical Data Independence)
                           v
+--------------------------------------------------------+
|                    Internal Schema                     |
+--------------------------------------------------------+
                           |
                           v
                  [ Physical Database ]
\`\`\`

#### Data Independence
1. **Physical Data Independence**: The capacity to alter the internal schema (reorganizing B+ trees, indexing, storage volume) without modifying the conceptual schema.
2. **Logical Data Independence**: The capacity to alter conceptual schema (adding attributes, splitting tables) without modifying external views or application programs.
> Note: Logical data independence is significantly harder to achieve because application queries depend directly on logical entities.`
          },
          {
            id: 'dbms-1.2',
            title: 'ER Modeling: Entities, Attributes & Cardinalities',
            duration: '14 min',
            readTime: '8 min read',
            summary: 'Simple, Composite, Multi-valued, Derived attributes; Strong vs Weak entity sets; Extended ER features.',
            content: `### Entity-Relationship (ER) Model Concepts

#### Types of Attributes
- **Simple (Atomic)**: Cannot be divided further (e.g., Age, Roll_No).
- **Composite**: Subdivided into components (e.g., Name $\\to$ First_Name, Last_Name).
- **Multi-Valued**: Can hold multiple values (e.g., Phone_Number, Email) $\\to$ depicted with a double oval.
- **Derived**: Dynamically computed from stored attributes (e.g., Age derived from Date_of_Birth) $\\to$ dashed oval.

#### Strong vs. Weak Entity Sets
- **Strong Entity Set**: Possesses a primary key sufficient to uniquely identify records. Represented by single rectangle.
- **Weak Entity Set**: Lacks sufficient attributes for primary key; existence depends on identifying owner strong entity.
  - Represented by double rectangle.
  - Associated via identifying relationship (double diamond).
  - Primary Key = Primary Key of owner + Discriminator (partial key underlined with dashed line).`
          }
        ]
      },
      {
        unitId: 'dbms-unit-3',
        title: 'Unit 3 & 4: Relational Model, SQL & Normalization (1NF - BCNF)',
        duration: '55 min',
        lessonsCount: 4,
        topics: [
          {
            id: 'dbms-3.1',
            title: 'Relational Keys & SQL Command Classification',
            duration: '16 min',
            readTime: '10 min read',
            summary: 'Super, Candidate, Primary, Foreign keys; DDL, DML, DCL, TCL classifications with syntax.',
            content: `### Relational Keys & SQL

#### Relational Keys Hierarchy
$$\\text{Super Key} \\ge \\text{Candidate Key} \\ge \\text{Primary Key}$$
- **Super Key**: Set of attributes that collectively identify a tuple uniquely.
- **Candidate Key**: Minimal super key containing no redundant attributes.
- **Primary Key**: Selected candidate key; strictly non-null.
- **Foreign Key**: Attribute referencing primary key of another relation, establishing referential integrity.

#### SQL Command Classification
- **DDL (Data Definition)**: \`CREATE\`, \`ALTER\`, \`DROP\`, \`TRUNCATE\`
- **DML (Data Manipulation)**: \`SELECT\`, \`INSERT\`, \`UPDATE\`, \`DELETE\`
- **DCL (Data Control)**: \`GRANT\`, \`REVOKE\`
- **TCL (Transaction Control)**: \`COMMIT\`, \`ROLLBACK\`, \`SAVEPOINT\``
          },
          {
            id: 'dbms-4.1',
            title: 'Normalization Rules: 1NF, 2NF, 3NF, BCNF',
            duration: '20 min',
            readTime: '12 min read',
            summary: 'Detailed decomposition rules, functional dependencies, Armstrong\'s Axioms, and anomaly resolution.',
            content: `### Database Normalization (1NF to BCNF)

| Normal Form | Resolves / Eliminates | Main Rule / Formal Condition |
| :--- | :--- | :--- |
| **1NF** | Multi-valued & composite attributes | Attribute values must be atomic (indivisible). No repeating groups. |
| **2NF** | Partial dependencies | Must be in 1NF. Every non-prime attribute must depend fully on candidate key. |
| **3NF** | Transitive dependencies | Must be in 2NF. For every non-trivial $X \\to Y$: either $X$ is a super key OR $Y$ is a prime attribute. |
| **BCNF** | Anomalies from overlapping candidate keys | Stricter version of 3NF. For every non-trivial $X \\to Y$, $X$ must strictly be a super key. |`
          },
          {
            id: 'dbms-5.1',
            title: 'ACID Properties, 2PL & WAL Recovery',
            duration: '18 min',
            readTime: '10 min read',
            summary: 'Atomicity, Consistency, Isolation, Durability; 5-state transition diagram; Two-Phase Locking; Write-Ahead Logging.',
            content: `### Transactions, Concurrency & Recovery

#### ACID Properties
- **Atomicity**: All-or-nothing execution.
- **Consistency**: Preserves database invariants from one valid state to another.
- **Isolation**: Intermediate uncommitted states remain invisible to other transactions.
- **Durability**: Committed updates survive any system or hardware crash.

#### Two-Phase Locking (2PL) Protocol
1. **Growing Phase**: Transaction acquires locks; cannot release any lock.
2. **Shrinking Phase**: Transaction releases locks; cannot acquire any new lock.
- **Strict 2PL**: Holds all exclusive locks until commit or abort, eliminating cascading aborts.`
          }
        ]
      }
    ]
  }
];

export const sampleSchedule = [
  {
    id: 'sch-1',
    noteId: 'bca-dcn',
    title: 'DCN: OSI 7-Layer Architecture & Protocol Stack',
    subtitle: 'High Priority Exam Topic',
    duration: '42 min',
    time: '11:30 AM',
    progress: 67,
    completed: true,
    lessons: 4,
    icon: 'Rocket',
    category: 'Networking',
    color: 'from-pink-500/25 to-purple-600/30'
  },
  {
    id: 'sch-2',
    noteId: 'bca-dbms',
    title: 'DBMS: Normalization 1NF to BCNF Proofs',
    subtitle: 'Functional Dependencies & Anomalies',
    duration: '56 min',
    time: '02:30 PM',
    progress: 42,
    completed: false,
    lessons: 8,
    icon: 'Lock',
    category: 'Databases',
    color: 'from-purple-500/25 to-indigo-600/30'
  },
  {
    id: 'sch-3',
    noteId: 'bca-302',
    title: 'Data Structures: Circular Queue Modulo Arithmetic',
    subtitle: 'Arrays & Pointer Memory Management',
    duration: '18 min',
    time: '05:30 PM',
    progress: 17,
    completed: false,
    lessons: 2,
    icon: 'Edit3',
    category: 'Computer Science',
    color: 'from-fuchsia-500/25 to-pink-600/30'
  },
  {
    id: 'sch-4',
    noteId: 'bca-315',
    title: 'Numerical Tech: Newton-Raphson Quadratic Convergence',
    subtitle: 'Taylor Series Expansion & Proof',
    duration: '30 min',
    time: '08:00 PM',
    progress: 90,
    completed: true,
    lessons: 3,
    icon: 'Flame',
    category: 'Mathematics',
    color: 'from-amber-500/25 to-rose-600/30'
  }
];
