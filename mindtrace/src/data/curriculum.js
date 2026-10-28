/**
 * MINDTRACE CURRICULUM & KNOWLEDGE GRAPH DATA
 * Rich, structured educational content with concept dependency trees,
 * multi-format diagnostic questions, misconception mappings, and interactive lessons.
 */

export const CURRICULUM_DATA = {
  subjects: [
    {
      id: 'cs',
      name: 'Computer Science',
      description: 'Foundations of computation, algorithms, data structures, and programming semantics.',
      topics: [
        {
          id: 'py-fundamentals',
          name: 'Python Fundamentals',
          description: 'Core syntax, variables, control flow, loops, and functional abstraction.',
          level: 'Beginner to Intermediate',
          estimatedMinutes: 35,
          concepts: [
            {
              id: 'py-variables',
              name: 'Variables and Assignment',
              category: 'Foundation',
              prerequisites: [],
              order: 1,
              description: 'Names bound to values in memory. Understanding variable reassignment vs equality.',
              misconceptions: [
                'Confusing assignment operator (=) with mathematical equality (==).',
                'Believing assigning a variable copies values permanently like an algebraic equation.'
              ],
              lesson: {
                title: 'Variables as Memory Tags, Not Equations',
                duration: '4 min read + check',
                objective: 'Understand how Python assigns values to names and how memory references update.',
                content: `
                  <p>In mathematics, <code>x = x + 1</code> is impossible. In Python, however, the single equals sign <code>=</code> is an <strong>assignment operator</strong>, not an assertion of balance.</p>
                  <p>Think of a variable as a sticky note placed on a box in memory. When you execute:</p>
                  <pre class="code-block">x = 5\nx = x + 1</pre>
                  <p>Python first evaluates the right side (<code>5 + 1</code> which is <code>6</code>), and then moves the sticky note <code>x</code> to point to <code>6</code>.</p>
                  <div class="demo-feedback-panel" style="margin-top: 1rem; border-left: 3px solid var(--color-forest);">
                    <strong>Mental Model Rule:</strong> Always evaluate the right-hand side expression completely before modifying the variable named on the left.
                  </div>
                `,
                practiceQuestion: {
                  id: 'pr-var-1',
                  type: 'mcq',
                  question: 'What is the value of `b` after this sequence?\n\na = 10\nb = a\na = 20',
                  options: ['10', '20', '30', 'None'],
                  correctIndex: 0,
                  conceptId: 'py-variables',
                  explanation: 'When `b = a` ran, `a` was 10, so `b` was bound to 10. Modifying `a` later does not alter `b`.'
                }
              }
            },
            {
              id: 'py-data-types',
              name: 'Data Types and Coercion',
              category: 'Foundation',
              prerequisites: ['py-variables'],
              order: 2,
              description: 'Integers, floats, strings, booleans, and type conversion behavior.',
              misconceptions: [
                'Believing `"5" + "5"` evaluates to 10 instead of string concatenation "55".',
                'Assuming boolean True/False can be written in lowercase (true/false) in Python.'
              ],
              lesson: {
                title: 'Types Determine Operator Behavior',
                duration: '5 min read + check',
                objective: 'Recognize how Python treats numeric arithmetic versus string concatenation.',
                content: `
                  <p>In Python, the <code>+</code> operator changes its behavior depending on the operands' data types.</p>
                  <p>For numbers: <code>5 + 5</code> yields <code>10</code>. But for strings enclosed in quotes, <code>"5" + "5"</code> performs <em>concatenation</em>, producing <code>"55"</code>.</p>
                  <pre class="code-block">age = "24"\nnext_year = int(age) + 1  # Result: 25</pre>
                  <p>Always check if your inputs come from user input (like <code>input()</code>), as they arrive as strings!</p>
                `,
                practiceQuestion: {
                  id: 'pr-dt-1',
                  type: 'mcq',
                  question: 'What is the output of `type(3.0)` in Python?',
                  options: ['<class \'int\'>', '<class \'float\'>', '<class \'number\'>', '<class \'decimal\'>'],
                  correctIndex: 1,
                  conceptId: 'py-data-types',
                  explanation: 'Any number with a decimal point is represented as a `float` in Python.'
                }
              }
            },
            {
              id: 'py-conditionals',
              name: 'Conditional Statements',
              category: 'Control Flow',
              prerequisites: ['py-variables', 'py-data-types'],
              order: 3,
              description: 'Branching logic using if, elif, else, and boolean expressions.',
              misconceptions: [
                'Thinking every `elif` block executes if its condition is true, rather than only the first match.',
                'Using `=` instead of `==` in if statement comparisons.'
              ],
              lesson: {
                title: 'Decision Branching: Mutually Exclusive Paths',
                duration: '6 min read + check',
                objective: 'Trace conditional execution flows through if-elif-else ladders.',
                content: `
                  <p>An <code>if / elif / else</code> construct evaluates conditions top-to-bottom. The <strong>first condition that evaluates to True executes</strong>, and Python immediately skips the rest of the ladder.</p>
                  <pre class="code-block">score = 85\nif score >= 80:\n    grade = "B"\nelif score >= 90:  # This will NEVER run for score=95!\n    grade = "A"</pre>
                  <p>Order matters! More specific or stricter conditions must come before broader ones.</p>
                `,
                practiceQuestion: {
                  id: 'pr-cond-1',
                  type: 'mcq',
                  question: 'If `x = 15`, which branch executes in:\nif x > 20: print("A")\nelif x > 10: print("B")\nelif x > 5: print("C")',
                  options: ['A', 'B', 'C', 'Both B and C'],
                  correctIndex: 1,
                  conceptId: 'py-conditionals',
                  explanation: 'Since `15 > 10` is True, "B" is printed and subsequent `elif` branches are skipped.'
                }
              }
            },
            {
              id: 'py-logical-ops',
              name: 'Logical Operators and Precedence',
              category: 'Control Flow',
              prerequisites: ['py-conditionals'],
              order: 4,
              description: 'Combining booleans with and, or, not, and short-circuit evaluation.',
              misconceptions: [
                'Writing `if x == 1 or 2:` expecting it to test if x is 1 or x is 2.',
                'Misunderstanding that `and` has higher precedence than `or`.'
              ],
              lesson: {
                title: 'Truth Tables and the "x == 1 or 2" Trap',
                duration: '5 min read + check',
                objective: 'Correctly formulate compound boolean conditions and avoid truthiness traps.',
                content: `
                  <p>A classic beginner pitfall is writing:</p>
                  <pre class="code-block"># BUGGY:\nif role == "admin" or "moderator":</pre>
                  <p>In Python, non-empty strings are <em>truthy</em>. The expression evaluates as <code>(role == "admin") or ("moderator")</code>. Because <code>"moderator"</code> is always True, this if statement ALWAYS executes!</p>
                  <p>The correct form is: <code>if role == "admin" or role == "moderator":</code> or <code>if role in ("admin", "moderator"):</code></p>
                `,
                practiceQuestion: {
                  id: 'pr-log-1',
                  type: 'mcq',
                  question: 'What does `bool("False")` evaluate to in Python?',
                  options: ['False', 'True', 'Error', 'None'],
                  correctIndex: 1,
                  conceptId: 'py-logical-ops',
                  explanation: 'Any non-empty string in Python evaluates to True in a boolean context, even if the text spells "False".'
                }
              }
            },
            {
              id: 'py-loops',
              name: 'Loops and Range Bounds',
              category: 'Iteration',
              prerequisites: ['py-conditionals'],
              order: 5,
              description: 'Iterating with for and while loops, understanding range(start, stop, step) bounds.',
              misconceptions: [
                'Believing `range(1, 5)` includes the number 5 (off-by-one error).',
                'Accidentally writing infinite while loops by omitting loop counter updates.'
              ],
              lesson: {
                title: 'The Half-Open Interval of Python Range',
                duration: '6 min read + check',
                objective: 'Master range indexing and loop termination conditions.',
                content: `
                  <p>Python's <code>range(start, stop)</code> uses a <strong>half-open interval</strong>: <code>[start, stop)</code>.</p>
                  <p>This means it starts at <code>start</code> and stops <em>just before</em> reaching <code>stop</code>:</p>
                  <pre class="code-block">for i in range(1, 5):\n    print(i, end=" ") # Prints: 1 2 3 4 (NOT 5!)</pre>
                  <p>Why? Because <code>stop - start</code> equals the exact number of iterations (<code>5 - 1 = 4</code> iterations). Memorizing this formula avoids off-by-one errors.</p>
                `,
                practiceQuestion: {
                  id: 'pr-loop-1',
                  type: 'mcq',
                  question: 'How many times does this loop execute?\n\nfor i in range(2, 8, 2): print(i)',
                  options: ['3 times', '4 times', '6 times', '7 times'],
                  correctIndex: 0,
                  conceptId: 'py-loops',
                  explanation: 'The values produced are 2, 4, 6. The loop executes exactly 3 times before hitting the boundary 8.'
                }
              }
            },
            {
              id: 'py-functions',
              name: 'Functions and Return Values',
              category: 'Abstraction',
              prerequisites: ['py-loops', 'py-variables'],
              order: 6,
              description: 'Function definition, parameters, local scope, and return vs print distinction.',
              misconceptions: [
                'Confusing `return` with `print()`, assuming printing a value saves it to a caller variable.',
                'Assuming local variables inside a function are accessible globally.'
              ],
              lesson: {
                title: 'Return Hands a Value Back; Print Only Displays It',
                duration: '6 min read + check',
                objective: 'Differentiate between displaying output to the screen and returning values for computation.',
                content: `
                  <p><code>print()</code> is like shouting a number out loud so someone across the room can hear it. <code>return</code> is like handing the paper with the number to the caller.</p>
                  <pre class="code-block">def add_one(x):\n    print(x + 1)\n\nresult = add_one(5)\nprint(result) # Prints None!</pre>
                  <p>Because <code>add_one</code> did not use <code>return</code>, <code>result</code> receives Python\'s default return value: <code>None</code>.</p>
                `,
                practiceQuestion: {
                  id: 'pr-fn-1',
                  type: 'mcq',
                  question: 'What is the return value of a function that does not include a `return` statement?',
                  options: ['0', 'False', 'None', 'Error'],
                  correctIndex: 2,
                  conceptId: 'py-functions',
                  explanation: 'Python functions without an explicit `return` statement automatically return `None`.'
                }
              }
            }
          ],
          diagnosticQuestions: [
            {
              id: 'q-py-1',
              conceptId: 'py-variables',
              type: 'code_output',
              difficulty: 1,
              title: 'Variable Reassignment Trace',
              prompt: 'Predict the final value printed by this code:',
              code: 'x = 8\ny = x\nx = 12\nprint(y)',
              options: ['8', '12', '20', 'Error: unassigned pointer'],
              correctIndex: 0,
              correctAnswerText: '8',
              explanation: 'When `y = x` executed, `x` held 8. The subsequent assignment `x = 12` updated `x`, leaving `y` bound to 8.',
              misconceptionIfChosen: {
                1: 'Believing variables share an ongoing link like a spreadsheet formula.'
              }
            },
            {
              id: 'q-py-2',
              conceptId: 'py-data-types',
              type: 'mcq',
              difficulty: 1,
              title: 'String and Integer Addition',
              prompt: 'What is the result of evaluating `"3" + "4"` in Python?',
              options: ['7', '"34"', '12', 'TypeError: cannot add strings'],
              correctIndex: 1,
              explanation: 'In Python, the `+` operator concatenates strings. Because both operands are strings, the result is `"34"`.',
              misconceptionIfChosen: {
                0: 'Assuming strings containing digits are implicitly coerced to integers during addition.'
              }
            },
            {
              id: 'q-py-3',
              conceptId: 'py-conditionals',
              type: 'code_output',
              difficulty: 2,
              title: 'Conditional Branch Execution',
              prompt: 'What does this snippet print?',
              code: 'val = 25\nif val > 10:\n    print("Tier 1")\nelif val > 20:\n    print("Tier 2")\nelse:\n    print("Tier 3")',
              options: ['Tier 1', 'Tier 2', 'Tier 1\nTier 2', 'Tier 3'],
              correctIndex: 0,
              correctAnswerText: 'Tier 1',
              explanation: 'The first condition `val > 10` is True, so "Tier 1" is printed and the remaining `elif` branches are ignored.',
              misconceptionIfChosen: {
                1: 'Assuming the code picks the "most accurate" branch rather than the first true condition.',
                2: 'Believing multiple branches in an if-elif ladder can execute simultaneously.'
              }
            },
            {
              id: 'q-py-4',
              conceptId: 'py-logical-ops',
              type: 'tf',
              difficulty: 2,
              title: 'Boolean Evaluation of Non-Empty Strings',
              prompt: 'In Python, does the expression `("apple" == "banana" or "cherry")` evaluate to True in a conditional?',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'Yes. `"apple" == "banana"` is False, but the right operand is `"cherry"`. Any non-empty string is truthy, so the whole expression evaluates to True.',
              misconceptionIfChosen: {
                1: 'Assuming "cherry" is checked for equality against "apple".'
              }
            },
            {
              id: 'q-py-5',
              conceptId: 'py-loops',
              type: 'code_output',
              difficulty: 2,
              title: 'Predict Loop Output',
              prompt: 'What sequence of numbers is printed by this loop?',
              code: 'for i in range(1, 6, 2):\n    print(i, end=" ")',
              options: ['1 3 5', '1 3 5 7', '1 2 3 4 5', '2 4 6'],
              correctIndex: 0,
              correctAnswerText: '1 3 5',
              explanation: 'The loop starts at 1, steps by 2, and stops before reaching 6. The numbers are 1, 3, and 5.',
              misconceptionIfChosen: {
                2: 'Assuming the third argument (step) was ignored.',
                1: 'Believing the stop bound is inclusive.'
              }
            },
            {
              id: 'q-py-6',
              conceptId: 'py-functions',
              type: 'mcq',
              difficulty: 2,
              title: 'Return Value vs Print',
              prompt: 'Consider this function definition:\n\ndef calculate(a, b):\n    total = a + b\n    print(total)\n\nans = calculate(3, 4)\nWhat is the value stored in `ans`?',
              options: ['7', 'None', '0', 'undefined'],
              correctIndex: 1,
              explanation: 'The function prints `7` to the console, but lacks a `return` statement. In Python, such functions implicitly return `None`.',
              misconceptionIfChosen: {
                0: 'Confusing displaying an output with returning a value to the caller variable.'
              }
            },
            {
              id: 'q-py-7',
              conceptId: 'py-loops',
              type: 'short_answer',
              difficulty: 3,
              title: 'Loop Iteration Count',
              prompt: 'How many times does the print statement execute in this code?\n\nfor x in range(3):\n    for y in range(2):\n        print(x, y)',
              correctAnswers: ['6', 'six'],
              explanation: 'The outer loop runs 3 times (x = 0, 1, 2) and for each step, the inner loop runs 2 times (y = 0, 1). Total iterations = 3 * 2 = 6.'
            }
          ]
        },
        {
          id: 'py-oop',
          name: 'Object-Oriented Programming',
          description: 'Classes, instance attributes, self parameter, inheritance, and encapsulation.',
          level: 'Intermediate',
          estimatedMinutes: 45,
          concepts: [
            {
              id: 'py-classes-objects',
              name: 'Classes and Instances',
              category: 'OOP',
              prerequisites: ['py-functions'],
              order: 1,
              description: 'Blueprints vs concrete objects in memory.'
            },
            {
              id: 'py-self-param',
              name: 'The self Parameter',
              category: 'OOP',
              prerequisites: ['py-classes-objects'],
              order: 2,
              description: 'Explicit instance reference binding in method invocations.'
            }
          ],
          diagnosticQuestions: [
            {
              id: 'q-oop-1',
              conceptId: 'py-classes-objects',
              type: 'mcq',
              difficulty: 1,
              title: 'Class Blueprint Concept',
              prompt: 'What is the role of `__init__` in a Python class?',
              options: ['It destroys the object', 'It initializes new instance attributes upon creation', 'It imports external libraries', 'It runs only when an error occurs'],
              correctIndex: 1,
              explanation: '`__init__` is the constructor method in Python called automatically when a new instance is instantiated.'
            }
          ]
        }
      ]
    },
    {
      id: 'math',
      name: 'Mathematics',
      description: 'Algebraic structures, functions, calculus, probability, and linear algebra.',
      topics: [
        {
          id: 'math-algebra',
          name: 'Algebra & Functions',
          description: 'Linear equations, quadratic forms, function transformations, and domain/range.',
          level: 'Intermediate',
          estimatedMinutes: 40,
          concepts: [
            {
              id: 'math-linear-eq',
              name: 'Linear Equations & Slopes',
              category: 'Algebra',
              prerequisites: [],
              order: 1,
              description: 'Rate of change, slope-intercept form (y = mx + b), and intersection points.'
            },
            {
              id: 'math-quadratics',
              name: 'Quadratic Equations & Roots',
              category: 'Algebra',
              prerequisites: ['math-linear-eq'],
              order: 2,
              description: 'Factoring, quadratic formula, vertex form, and discriminant behavior.'
            }
          ],
          diagnosticQuestions: [
            {
              id: 'q-math-1',
              conceptId: 'math-linear-eq',
              type: 'mcq',
              difficulty: 1,
              title: 'Slope of a Line',
              prompt: 'What is the slope of the line represented by the equation 3x + 2y = 12?',
              options: ['3', '-3/2', '3/2', '6'],
              correctIndex: 1,
              explanation: 'Rearranging into y = mx + b form: 2y = -3x + 12 => y = (-3/2)x + 6. The slope m is -3/2.'
            }
          ]
        },
        {
          id: 'math-calculus',
          name: 'Calculus: Derivatives & Rates',
          description: 'Limits, instantaneous rates of change, power rule, and chain rule.',
          level: 'Advanced',
          estimatedMinutes: 50,
          concepts: [
            {
              id: 'math-limits',
              name: 'Limits and Continuity',
              category: 'Calculus',
              prerequisites: [],
              order: 1,
              description: 'Approaching values, indeterminate forms, and continuous functions.'
            },
            {
              id: 'math-power-rule',
              name: 'Power Rule for Derivatives',
              category: 'Calculus',
              prerequisites: ['math-limits'],
              order: 2,
              description: 'Differentiating polynomial terms f\'(x) = n*x^(n-1).'
            }
          ],
          diagnosticQuestions: [
            {
              id: 'q-calc-1',
              conceptId: 'math-power-rule',
              type: 'mcq',
              difficulty: 2,
              title: 'Derivative of Polynomial',
              prompt: 'What is the first derivative of f(x) = 4x^3 - 5x + 7?',
              options: ['12x^2 - 5', '12x^3 - 5', '7x^2 - 5', '12x^2 + 7'],
              correctIndex: 0,
              explanation: 'By the power rule: d/dx(4x^3) = 12x^2, d/dx(-5x) = -5, and d/dx(7) = 0.'
            }
          ]
        }
      ]
    },
    {
      id: 'physics',
      name: 'Physics',
      description: 'Classical mechanics, Newtonian dynamics, conservation laws, and thermodynamics.',
      topics: [
        {
          id: 'phys-mechanics',
          name: 'Mechanics & Kinematics',
          description: 'Velocity, acceleration, Newton\'s laws of motion, and energy conservation.',
          level: 'Beginner to Intermediate',
          estimatedMinutes: 35,
          concepts: [
            {
              id: 'phys-kinematics',
              name: 'Constant Acceleration Equations',
              category: 'Mechanics',
              prerequisites: [],
              order: 1,
              description: 'Displacement, initial velocity, time, and acceleration relationships.'
            }
          ],
          diagnosticQuestions: [
            {
              id: 'q-phys-1',
              conceptId: 'phys-kinematics',
              type: 'mcq',
              difficulty: 1,
              title: 'Newton\'s Second Law',
              prompt: 'If a constant net force of 20 N is applied to a mass of 4 kg, what is the acceleration?',
              options: ['5 m/s²', '80 m/s²', '16 m/s²', '0.2 m/s²'],
              correctIndex: 0,
              explanation: 'F = m * a => a = F / m = 20 N / 4 kg = 5 m/s².'
            }
          ]
        }
      ]
    },
    {
      id: 'english',
      name: 'English & Rhetoric',
      description: 'Critical reading, textual analysis, rhetorical strategies, and compositional structure.',
      topics: [
        {
          id: 'eng-reading',
          name: 'Reading Comprehension & Critical Analysis',
          description: 'Inference, authorial intent, structural argumentation, and evidence evaluation.',
          level: 'All Levels',
          estimatedMinutes: 30,
          concepts: [
            {
              id: 'eng-inference',
              name: 'Inference and Evidence',
              category: 'Rhetoric',
              prerequisites: [],
              order: 1,
              description: 'Drawing substantiated conclusions not directly stated in the text.'
            }
          ],
          diagnosticQuestions: [
            {
              id: 'q-eng-1',
              conceptId: 'eng-inference',
              type: 'mcq',
              difficulty: 1,
              title: 'Primary Inference',
              prompt: 'An author repeatedly highlights the cost of space exploration alongside underfunded local schools. What is the author\'s implicit premise?',
              options: ['Space exploration has no value', 'Resource allocation reflects societal priorities that deserve scrutiny', 'Schools do not need modern equipment', 'Governments should ban space agencies'],
              correctIndex: 1,
              explanation: 'The juxtaposition invites the reader to compare expenditure priorities rather than asserting an extreme ban.'
            }
          ]
        }
      ]
    },
    {
      id: 'business',
      name: 'Business Studies',
      description: 'Microeconomics, market structures, financial statements, and organizational strategy.',
      topics: [
        {
          id: 'bus-economics',
          name: 'Market Dynamics & Supply-Demand',
          description: 'Price elasticity, equilibrium, opportunity cost, and competitive models.',
          level: 'Beginner',
          estimatedMinutes: 35,
          concepts: [
            {
              id: 'bus-elasticity',
              name: 'Price Elasticity of Demand',
              category: 'Microeconomics',
              prerequisites: [],
              order: 1,
              description: 'Responsiveness of quantity demanded to changes in unit price.'
            }
          ],
          diagnosticQuestions: [
            {
              id: 'q-bus-1',
              conceptId: 'bus-elasticity',
              type: 'mcq',
              difficulty: 1,
              title: 'Inelastic Goods',
              prompt: 'Which of the following goods is most likely to exhibit inelastic demand?',
              options: ['Designer watches', 'Life-saving prescription medication', 'Restaurant dining', 'Movie tickets'],
              correctIndex: 1,
              explanation: 'Essential goods with few substitutes (like critical medicine) have inelastic demand because consumers must buy them regardless of price increases.'
            }
          ]
        }
      ]
    }
  ]
};
