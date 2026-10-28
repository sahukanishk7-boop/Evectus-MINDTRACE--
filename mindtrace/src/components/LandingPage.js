/**
 * MINDTRACE PUBLIC LANDING PAGE
 * Research-inspired editorial layout presenting the product vision,
 * asymmetric hero visualization, 4-stage timeline, interactive adaptive simulator,
 * realistic dashboard preview, educator insights, and responsive conversion paths.
 */

import { BRAND_CONFIG } from '../config/brand.js';
import { Icons } from './icons.js';

export const LandingPage = {
  render() {
    return `
      <main id="main-content">
        <!-- ============================================================
             1. HERO SECTION (Asymmetric Layout)
             ============================================================ -->
        <section class="hero-section" aria-labelledby="hero-heading">
          <div class="container hero-grid">
            <div class="hero-copy">
              <span class="label-eyebrow">
                ${Icons.Target({ size: 14 })}
                ${BRAND_CONFIG.contextLabel}
              </span>
              <h1 id="hero-heading" class="hero-heading">
                Your learning gaps.<br />
                <span style="color: var(--color-terracotta);">Our next step.</span>
              </h1>
              <p class="hero-subtext">
                Most learning tools show you what to study. Mindtrace helps you understand what you already know, uncover what you're missing, and figure out exactly what to learn next.
              </p>
              <div class="hero-cta-group">
                <button class="btn btn-primary btn-lg" data-action="start-onboarding">
                  ${Icons.Sparkles({ size: 18 })}
                  <span>Find My Learning Gaps</span>
                </button>
                <a href="#how-it-works" class="btn btn-secondary btn-lg" data-action="scroll-to" data-target="how-it-works">
                  <span>Explore How It Works</span>
                  ${Icons.ArrowRight({ size: 16 })}
                </a>
              </div>
              <div style="display: flex; align-items: center; gap: 8px; font-size: 0.8125rem; color: var(--color-text-secondary);">
                ${Icons.CheckCircle({ size: 15, className: 'text-strong' })}
                <span>No account required to try the diagnostic assessment & interactive tutor</span>
              </div>
            </div>

            <!-- Right Column: Genuine Product Knowledge Map Snapshot -->
            <div class="hero-viz-card" aria-label="Live Concept Mapping Snapshot">
              <div class="hero-viz-header">
                <div style="display: flex; align-items: center; gap: 8px;">
                  ${Icons.Network({ size: 18 })}
                  <strong style="font-family: var(--font-heading); font-size: 0.9375rem;">Python Knowledge Trace</strong>
                </div>
                <span class="hero-viz-badge">DIAGNOSTIC CALIBRATED</span>
              </div>

              <div class="concept-graph-snapshot">
                <div class="node-item">
                  <div class="node-title-group">
                    <span class="node-bullet strong" title="Strong Understanding"></span>
                    <div>
                      <div style="font-weight: 600; font-size: 0.875rem;">Variables & Memory Binding</div>
                      <div style="font-size: 0.75rem; color: var(--color-text-secondary);">Prerequisite satisfied • 92% mastery</div>
                    </div>
                  </div>
                  <span class="badge badge-strong">Strong</span>
                </div>

                <div class="node-item">
                  <div class="node-title-group">
                    <span class="node-bullet strong" title="Strong Understanding"></span>
                    <div>
                      <div style="font-weight: 600; font-size: 0.875rem;">Data Types & Coercion</div>
                      <div style="font-size: 0.75rem; color: var(--color-text-secondary);">Prerequisite satisfied • 85% mastery</div>
                    </div>
                  </div>
                  <span class="badge badge-strong">Strong</span>
                </div>

                <div class="node-item">
                  <div class="node-title-group">
                    <span class="node-bullet developing" title="Developing"></span>
                    <div>
                      <div style="font-weight: 600; font-size: 0.875rem;">Conditional Branching (if/elif)</div>
                      <div style="font-size: 0.75rem; color: var(--color-text-secondary);">Needs boundary practice • 68% mastery</div>
                    </div>
                  </div>
                  <span class="badge badge-developing">Developing</span>
                </div>

                <div class="node-item" style="border-color: var(--color-terracotta); background: #fffcfb;">
                  <div class="node-title-group">
                    <span class="node-bullet attention" title="Knowledge Gap Flagged"></span>
                    <div>
                      <div style="font-weight: 600; font-size: 0.875rem; color: var(--color-terracotta-dark);">Loops & Half-Open Intervals</div>
                      <div style="font-size: 0.75rem; color: var(--color-text-secondary);">Off-by-one error identified in \`range\` bounds</div>
                    </div>
                  </div>
                  <span class="badge badge-attention">Needs Attention</span>
                </div>
              </div>

              <!-- Recommendation Panel -->
              <div class="hero-recommendation-box">
                <div style="color: var(--color-terracotta); flex-shrink: 0; margin-top: 2px;">
                  ${Icons.Sparkles({ size: 20 })}
                </div>
                <div>
                  <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-terracotta);">
                    Adaptive Recommendation
                  </div>
                  <div style="font-size: 0.875rem; font-weight: 600; color: var(--color-text-primary); margin: 2px 0;">
                    Review: Deconstruct Half-Open Range Boundaries
                  </div>
                  <p style="font-size: 0.8125rem; color: var(--color-text-secondary); line-height: 1.45;">
                    "Because you identified basic syntax but missed the upper stop boundary on Question 5, we prioritized a 4-minute targeted interval drill."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ============================================================
             2. PROBLEM SECTION (Editorial Varied Layout)
             ============================================================ -->
        <section class="problem-section" aria-labelledby="problem-heading">
          <div class="container">
            <span class="label-eyebrow">${Icons.AlertCircle({ size: 14 })} The Flaw in Uniform Education</span>
            <h2 id="problem-heading" class="section-heading" style="max-width: 680px;">
              Studying more isn't always the answer.
            </h2>
            <p class="text-secondary" style="max-width: 640px; margin-top: 0.5rem; font-size: 1.0625rem;">
              When learning breaks down, traditional systems prescribe repetition. But repeating material you already understand—while missing root misconceptions—wastes effort and creates invisible barriers.
            </p>

            <div class="problem-grid">
              <!-- Problem 1: Hidden knowledge gaps -->
              <div class="problem-card-1">
                <div class="problem-number">PROBLEM 01</div>
                <h3 class="card-heading" style="margin-bottom: 0.75rem;">Hidden Knowledge Gaps</h3>
                <p class="text-secondary" style="font-size: 0.9375rem; line-height: 1.6;">
                  "A student can finish an entire chapter without realizing that one misunderstood concept is affecting everything that follows."
                </p>
                <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px dashed var(--color-border); font-size: 0.8125rem; color: var(--color-text-muted);">
                  Root cause: Linear curriculums test retention at the end, rather than validating foundational mental models at the moment of failure.
                </div>
              </div>

              <!-- Problem 2: One-size-fits-all learning -->
              <div class="problem-card-2">
                <div class="problem-number">PROBLEM 02</div>
                <h3 class="card-heading" style="margin-bottom: 0.75rem; color: var(--color-ivory);">One-Size-Fits-All Learning</h3>
                <p style="font-size: 0.9375rem; line-height: 1.6; color: var(--color-ivory);">
                  "Standard lessons move at the same pace for everyone, even when students begin with different levels of understanding."
                </p>
                <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px dashed rgba(247, 245, 239, 0.25); font-size: 0.8125rem; color: var(--color-sage);">
                  Root cause: Classrooms and video courses assume uniform prior knowledge, forcing proficient students to wait while struggling students fall behind.
                </div>
              </div>

              <!-- Problem 3: Feedback that comes too late -->
              <div class="problem-card-3">
                <div>
                  <div class="problem-number">PROBLEM 03</div>
                  <h3 class="card-heading" style="margin-bottom: 0.5rem;">Feedback That Comes Too Late</h3>
                  <p class="text-secondary" style="font-size: 0.9375rem; line-height: 1.6;">
                    "A score tells students how they performed. It rarely tells them exactly what they misunderstood or what they should do next."
                  </p>
                </div>
                <div style="background: var(--color-ivory); padding: 1.25rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-terracotta);">
                  <div style="font-weight: 700; font-size: 0.875rem; color: var(--color-forest); margin-bottom: 4px;">
                    Mindtrace Causal Diagnosis
                  </div>
                  <p style="font-size: 0.875rem; color: var(--color-text-secondary); margin: 0;">
                    Instead of a 72% grade, Mindtrace isolates: <em>"You understand looping syntax, but confused the step parameter with the stop boundary. Here is the 3-minute remedy."</em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ============================================================
             3. HOW IT WORKS (4-Stage Staggered Timeline)
             ============================================================ -->
        <section id="how-it-works" class="how-it-works-section" aria-labelledby="how-it-works-heading">
          <div class="container">
            <span class="label-eyebrow">${Icons.Compass({ size: 14 })} The Adaptive Architecture</span>
            <h2 id="how-it-works-heading" class="section-heading">
              From uncertainty to understanding.
            </h2>
            <p class="text-secondary" style="max-width: 620px; margin-top: 0.5rem;">
              Our continuous Bayesian knowledge engine replaces arbitrary study lists with an active conceptual feedback loop.
            </p>

            <div class="timeline-staggered">
              <!-- Stage 01 -->
              <div class="timeline-step-card">
                <span class="timeline-step-num">STAGE 01</span>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 0.5rem;">
                  ${Icons.Target({ size: 18, className: 'text-terracotta' })}
                  <h3 style="font-size: 1.125rem;">Assess</h3>
                </div>
                <p class="text-secondary" style="font-size: 0.875rem; line-height: 1.55;">
                  The system asks targeted diagnostic questions to evaluate what you know before deciding what you should study. Multi-format queries probe syntax, reasoning, and application.
                </p>
              </div>

              <!-- Stage 02 -->
              <div class="timeline-step-card">
                <span class="timeline-step-num">STAGE 02</span>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 0.5rem;">
                  ${Icons.Network({ size: 18, className: 'text-terracotta' })}
                  <h3 style="font-size: 1.125rem;">Diagnose</h3>
                </div>
                <p class="text-secondary" style="font-size: 0.875rem; line-height: 1.55;">
                  It maps every response to individual concept nodes in a prerequisite graph, detecting weak foundations, missing prerequisites, and specific misconceptions.
                </p>
              </div>

              <!-- Stage 03 -->
              <div class="timeline-step-card">
                <span class="timeline-step-num">STAGE 03</span>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 0.5rem;">
                  ${Icons.Brain({ size: 18, className: 'text-terracotta' })}
                  <h3 style="font-size: 1.125rem;">Personalize</h3>
                </div>
                <p class="text-secondary" style="font-size: 0.875rem; line-height: 1.55;">
                  Your Socratic tutor generates targeted explanations, visual mental models, and focused practice exercises centered exclusively on the concepts you need most.
                </p>
              </div>

              <!-- Stage 04 -->
              <div class="timeline-step-card">
                <span class="timeline-step-num">STAGE 04</span>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 0.5rem;">
                  ${Icons.RotateCcw({ size: 18, className: 'text-terracotta' })}
                  <h3 style="font-size: 1.125rem;">Adapt</h3>
                </div>
                <p class="text-secondary" style="font-size: 0.875rem; line-height: 1.55;">
                  Your next activity updates as your comprehension improves. Mastered concepts rotate into spaced retention, while persistent friction areas receive deeper attention.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- ============================================================
             4. INTERACTIVE ADAPTIVE LEARNING DEMONSTRATION
             ============================================================ -->
        <section id="adaptive-demo" class="interactive-demo-section" aria-labelledby="demo-heading">
          <div class="container">
            <div style="display: flex; flex-direction: column; align-items: flex-start;">
              <span class="label-eyebrow">${Icons.Zap({ size: 14 })} Live Engine Simulation</span>
              <h2 id="demo-heading" class="section-heading">
                See how the system adapts.
              </h2>
              <p class="text-secondary" style="max-width: 660px; margin-top: 0.5rem;">
                Try answering this live diagnostic question. Observe how your selected response alters concept mastery estimates, isolates misconceptions, and adapts the system's immediate follow-up recommendation.
              </p>
            </div>

            <div class="demo-box" id="interactive-demo-box">
              <div class="demo-tabs" id="sim-tabs-container">
                <button class="demo-tab-btn active" data-action="sim-tab" data-concept="py-loops">Loops & Bounds</button>
                <button class="demo-tab-btn" data-action="sim-tab" data-concept="py-conditionals">Conditional Branching</button>
                <button class="demo-tab-btn" data-action="sim-tab" data-concept="py-variables">Variable Assignment</button>
              </div>

              <div class="demo-question-container" id="sim-dynamic-container">
                <!-- Question Column -->
                <div>
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
                    <span id="sim-topic-label" style="font-size: 0.8125rem; font-weight: 700; color: var(--color-forest); text-transform: uppercase;">
                      Diagnostic Question • Python Loops
                    </span>
                    <span id="sim-difficulty-badge" class="badge badge-developing">Difficulty: Intermediate</span>
                  </div>

                  <p id="sim-question-prompt" style="font-weight: 600; font-size: 1rem; margin-bottom: 0.5rem;">
                    Predict how many times the loop prints a value:
                  </p>

                  <pre class="code-block" id="sim-code-block">for i in range(2, 8, 2):
    print(i)</pre>

                  <div class="demo-options" id="demo-options-list">
                    <button class="demo-option-btn" data-action="sim-option" data-idx="0">
                      <strong>A.</strong>&nbsp; 3 times (values: 2, 4, 6)
                    </button>
                    <button class="demo-option-btn" data-action="sim-option" data-idx="1">
                      <strong>B.</strong>&nbsp; 4 times (values: 2, 4, 6, 8)
                    </button>
                    <button class="demo-option-btn" data-action="sim-option" data-idx="2">
                      <strong>C.</strong>&nbsp; 6 times (values: 2, 3, 4, 5, 6, 7)
                    </button>
                  </div>
                </div>

                <!-- Live Adaptive Engine State Column -->
                <div class="demo-feedback-panel" id="demo-feedback-panel">
                  <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--color-border); padding-bottom: 8px;">
                    <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-forest);">
                      Adaptive Model Response
                    </span>
                    <span id="demo-live-status-badge" class="badge badge-unassessed">Awaiting Answer</span>
                  </div>

                  <div id="demo-feedback-body" style="font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.55;">
                    Select an option on the left to watch the adaptive engine evaluate your response at the concept level in real time.
                  </div>

                  <div id="demo-recommendation-box" style="display: none; background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 12px;">
                    <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-terracotta); text-transform: uppercase; margin-bottom: 2px;">
                      Next Recommended Activity
                    </div>
                    <div id="demo-rec-title" style="font-weight: 600; font-size: 0.875rem; color: var(--color-forest);">
                      Targeted Interval Drill
                    </div>
                    <p id="demo-rec-desc" style="font-size: 0.8125rem; color: var(--color-text-secondary); margin-top: 4px; line-height: 1.4;">
                      Explaining the half-open interval rule [start, stop).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ============================================================
             5. PRODUCT PREVIEW SECTION (Realistic Student Dashboard)
             ============================================================ -->
        <section class="product-preview-section" aria-labelledby="preview-heading">
          <div class="container">
            <span class="label-eyebrow">${Icons.BarChart2({ size: 14 })} Complete Learning Environment</span>
            <h2 id="preview-heading" class="section-heading">
              Your next lesson has a reason.
            </h2>
            <p class="text-secondary" style="max-width: 620px; margin-top: 0.5rem;">
              No generic syllabus lists. Every recommendation is justified by diagnostic evidence and mapped against your learning goal.
            </p>
            <div class="demo-data-disclaimer">
              ${Icons.Info({ size: 14 })}
              <span>Interactive Demonstration Data • Live Student Session Below</span>
            </div>

            <!-- Dashboard Preview Frame -->
            <div class="card card-elevated" style="margin-top: 2rem; padding: 0; overflow: hidden; border-radius: var(--radius-lg);">
              <div style="background: var(--color-surface-elevated); padding: 12px 20px; border-bottom: 1px solid var(--color-border); display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="width: 10px; height: 10px; border-radius: 50%; background: #e07060;"></span>
                  <span style="width: 10px; height: 10px; border-radius: 50%; background: #e8b04a;"></span>
                  <span style="width: 10px; height: 10px; border-radius: 50%; background: #56a578;"></span>
                  <span style="font-size: 0.8125rem; font-family: var(--font-mono); color: var(--color-text-muted); margin-left: 8px;">
                    mindtrace.app/student/alex-rivera
                  </span>
                </div>
                <span class="badge badge-strong">Python Fundamentals</span>
              </div>

              <div style="padding: 1.75rem; background: var(--color-white); display: grid; grid-template-columns: 2fr 1.2fr; gap: 1.5rem;">
                <div>
                  <div style="font-size: 0.8125rem; font-weight: 700; color: var(--color-terracotta); text-transform: uppercase;">
                    Recommended Priority Activity
                  </div>
                  <h3 style="font-size: 1.25rem; margin: 4px 0 8px 0;">
                    Deconstruct Off-By-One Errors in Python Loops
                  </h3>
                  <p style="font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.55; margin-bottom: 1rem;">
                    Identified Gap: Stumbled on the upper boundary of <code>range(start, stop)</code> in Diagnostic Question 5. This 5-minute interactive lesson solidifies the mathematical half-open interval.
                  </p>
                  <div style="display: flex; gap: 10px; align-items: center;">
                    <button class="btn btn-primary btn-sm" data-action="nav-view" data-target="dashboard">
                      <span>Launch This Lesson</span>
                      ${Icons.ArrowRight({ size: 14 })}
                    </button>
                    <span style="font-size: 0.8125rem; color: var(--color-text-muted); font-family: var(--font-mono);">5 mins • Interactive Practice</span>
                  </div>
                </div>

                <div style="background: var(--color-ivory); border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 1.25rem;">
                  <div style="font-size: 0.8125rem; font-weight: 700; color: var(--color-forest); margin-bottom: 8px;">
                    Concept Mastery Calibration
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 8px;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.8125rem;">
                      <span>Variables & Types</span>
                      <strong style="color: var(--color-status-strong);">92% Strong</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 0.8125rem;">
                      <span>Conditionals</span>
                      <strong style="color: var(--color-status-developing);">68% Developing</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 0.8125rem;">
                      <span>Loops & Bounds</span>
                      <strong style="color: var(--color-terracotta);">42% Needs Attention</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 0.8125rem;">
                      <span>Functions</span>
                      <span style="color: var(--color-text-muted);">Unassessed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ============================================================
             6. FOR EDUCATORS
             ============================================================ -->
        <section id="for-educators" class="educators-section" aria-labelledby="educators-heading">
          <div class="container">
            <span class="label-eyebrow">${Icons.Award({ size: 14 })} Educational Research Extension</span>
            <h2 id="educators-heading" class="section-heading">
              Understand the learner, not just the score.
            </h2>
            <div class="educators-grid">
              <div>
                <p class="text-secondary" style="font-size: 1.0625rem; line-height: 1.65; margin-bottom: 1rem;">
                  Traditional gradebooks record whether a student got an answer right or wrong. They do not record <em>how</em> the student reasoned, or whether five students missed a question for five entirely distinct reasons.
                </p>
                <p class="text-secondary" style="font-size: 0.9375rem; line-height: 1.6;">
                  Mindtrace is built on Bayesian Knowledge Tracing and error-taxonomies. For educators and teaching assistants, this unlocks actionable cohort insights:
                </p>
                <ul style="list-style: none; margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9375rem;">
                  <li style="display: flex; gap: 10px; align-items: flex-start;">
                    ${Icons.CheckCircle({ size: 18, className: 'text-terracotta' })}
                    <span>Pinpoint exact misconceptions across cohorts before major exam milestones.</span>
                  </li>
                  <li style="display: flex; gap: 10px; align-items: flex-start;">
                    ${Icons.CheckCircle({ size: 18, className: 'text-terracotta' })}
                    <span>Differentiate prerequisite blockers from surface-level syntax errors.</span>
                  </li>
                  <li style="display: flex; gap: 10px; align-items: flex-start;">
                    ${Icons.CheckCircle({ size: 18, className: 'text-terracotta' })}
                    <span>Generate focused small-group interventions with tailored explanations.</span>
                  </li>
                </ul>
              </div>

              <div class="card" style="background: var(--color-white); border-radius: var(--radius-md); padding: var(--space-6);">
                <div style="font-family: var(--font-heading); font-weight: 700; font-size: 1rem; color: var(--color-forest); margin-bottom: 0.5rem;">
                  Misconception Heatmap Preview
                </div>
                <p style="font-size: 0.8125rem; color: var(--color-text-secondary); margin-bottom: 1rem;">
                  Cohort: Intro to Programming • 32 Students Sample
                </p>

                <div style="display: flex; flex-direction: column; gap: 10px; font-size: 0.8125rem;">
                  <div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                      <span>Range half-open boundary error [start, stop)</span>
                      <strong>64% of cohort</strong>
                    </div>
                    <div style="height: 6px; background: #eee; border-radius: 4px; overflow: hidden;">
                      <div style="width: 64%; height: 100%; background: var(--color-terracotta);"></div>
                    </div>
                  </div>

                  <div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                      <span>Confusing assignment (=) with equality (==)</span>
                      <strong>28% of cohort</strong>
                    </div>
                    <div style="height: 6px; background: #eee; border-radius: 4px; overflow: hidden;">
                      <div style="width: 28%; height: 100%; background: #d89640;"></div>
                    </div>
                  </div>

                  <div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                      <span>Print vs Return confusion</span>
                      <strong>41% of cohort</strong>
                    </div>
                    <div style="height: 6px; background: #eee; border-radius: 4px; overflow: hidden;">
                      <div style="width: 41%; height: 100%; background: var(--color-forest);"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ============================================================
             7. FINAL CALL TO ACTION
             ============================================================ -->
        <section class="final-cta-section" aria-labelledby="cta-heading">
          <div class="container" style="text-align: center; max-width: 780px;">
            <span class="label-eyebrow" style="background: rgba(247, 245, 239, 0.15); color: var(--color-ivory); border-color: rgba(247, 245, 239, 0.3);">
              ${Icons.Sparkles({ size: 14 })} Get Started In Minutes
            </span>
            <h2 id="cta-heading" class="hero-heading" style="color: var(--color-ivory); margin-top: 0.5rem; font-size: clamp(2.25rem, 4vw, 3.25rem);">
              Start with what you know.
            </h2>
            <p style="font-size: 1.125rem; color: #dbe5df; margin: 1rem auto 2rem auto; line-height: 1.6; max-width: 620px;">
              Take a short 5-minute diagnostic assessment and discover a more focused, adaptive way to learn.
            </p>
            <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
              <button class="btn btn-accent btn-lg" data-action="start-onboarding">
                ${Icons.Compass({ size: 18 })}
                <span>Build My Learning Path</span>
              </button>
              <button class="btn btn-secondary btn-lg" style="color: var(--color-ivory); border-color: rgba(247, 245, 239, 0.4);" data-action="nav-view" data-target="dashboard">
                <span>Open Student Dashboard</span>
              </button>
            </div>
          </div>
        </section>

        <!-- ============================================================
             8. FOOTER
             ============================================================ -->
        <footer class="footer" role="contentinfo">
          <div class="container">
            <div class="footer-grid">
              <div>
                <div class="brand-link" style="color: var(--color-ivory); margin-bottom: 0.75rem;">
                  <span class="brand-logo-icon" style="background: var(--color-ivory); color: var(--color-forest);">
                    ${Icons.Logo({ size: 18 })}
                  </span>
                  <span>${BRAND_CONFIG.name}</span>
                </div>
                <p style="font-size: 0.8125rem; line-height: 1.6; max-width: 300px; color: #a4b2a8;">
                  An AI tutor that maps your understanding, finds the gaps, and builds your next step around you.
                </p>
                <div style="font-size: 0.75rem; color: #7f8e83; margin-top: 1rem;">
                  v${BRAND_CONFIG.version} • Academic Research Edition
                </div>
              </div>

              <div>
                <strong style="color: var(--color-ivory); font-family: var(--font-heading); display: block; margin-bottom: 0.75rem;">
                  Product
                </strong>
                <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
                  <li><a href="#how-it-works" data-action="scroll-to" data-target="how-it-works">How It Works</a></li>
                  <li><a href="#adaptive-demo" data-action="scroll-to" data-target="adaptive-demo">Adaptive Demo</a></li>
                  <li><button style="background:none; border:none; color:#c4d1c8; cursor:pointer; font-size:0.875rem; padding:0;" data-action="nav-view" data-target="dashboard">Student Dashboard</button></li>
                  <li><button style="background:none; border:none; color:#c4d1c8; cursor:pointer; font-size:0.875rem; padding:0;" data-action="start-onboarding">Diagnostic Assessment</button></li>
                </ul>
              </div>

              <div>
                <strong style="color: var(--color-ivory); font-family: var(--font-heading); display: block; margin-bottom: 0.75rem;">
                  Pedagogy & Science
                </strong>
                <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
                  <li><a href="#learning-science" data-action="open-science-modal">Knowledge Tracing</a></li>
                  <li><a href="#learning-science" data-action="open-science-modal">Prerequisite Mapping</a></li>
                  <li><a href="#for-educators" data-action="scroll-to" data-target="for-educators">Educator Insights</a></li>
                  <li><a href="#learning-science" data-action="open-science-modal">Socratic Scaffolding</a></li>
                </ul>
              </div>

              <div>
                <strong style="color: var(--color-ivory); font-family: var(--font-heading); display: block; margin-bottom: 0.75rem;">
                  Platform
                </strong>
                <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
                  <li><button style="background:none; border:none; color:#c4d1c8; cursor:pointer; font-size:0.875rem; padding:0;" data-action="open-terms-modal">Privacy & Storage</button></li>
                  <li><button style="background:none; border:none; color:#c4d1c8; cursor:pointer; font-size:0.875rem; padding:0;" data-action="open-terms-modal">Terms of Academic Use</button></li>
                  <li><button style="background:none; border:none; color:#c4d1c8; cursor:pointer; font-size:0.875rem; padding:0;" data-action="open-contact-modal">Research Contact</button></li>
                  <li><button style="background:none; border:none; color:#c4d1c8; cursor:pointer; font-size:0.875rem; padding:0;" data-action="reset-demo">Reset Demo Session</button></li>
                </ul>
              </div>
            </div>

            <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; font-size: 0.75rem;">
              <span>&copy; ${new Date().getFullYear()} ${BRAND_CONFIG.name}. Built with research-backed adaptive learning principles.</span>
              <span style="font-family: var(--font-mono); color: #88988d;">Educational Technology Architecture</span>
            </div>
          </div>
        </footer>
      </main>
    `;
  }
};
