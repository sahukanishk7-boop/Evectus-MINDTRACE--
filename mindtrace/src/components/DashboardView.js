/**
 * MINDTRACE STUDENT LEARNING DASHBOARD
 * Responsive desktop sidebar & mobile navigation shell with 7 functional tabs:
 * 1. Overview (live metrics, gap alerts, next-step action)
 * 2. My Learning Path (dynamic prerequisite-ordered lessons)
 * 3. Knowledge Map (interactive SVG/HTML concept graph with click-to-inspect drawer)
 * 4. Assessments (diagnostic records & adaptive retakes)
 * 5. AI Tutor (contextual Socratic dialogue with suggested quick actions)
 * 6. Progress (honest analytics & conceptual mastery distribution)
 * 7. Settings (learning preferences, API key config, and data reset)
 */

import { Icons } from './icons.js';
import { MasteryEngine, MASTERY_STATES } from '../services/masteryEngine.js';

export const DashboardView = {
  render(state, currentTopic, learningPath, selectedConceptDetail = null) {
    const { student, dashboardTab = 'overview', masteryMap = {}, tutorMessages = [], preferences = {} } = state;
    const activeTab = dashboardTab;

    return `
      <div class="dashboard-layout">
        <!-- Desktop Sidebar -->
        <aside class="dashboard-sidebar" role="navigation" aria-label="Dashboard Navigation">
          <div style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--color-border); display: flex; align-items: center; gap: 10px;">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--color-forest); color: var(--color-ivory); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.875rem;">
              ${student.name.charAt(0)}
            </div>
            <div>
              <div style="font-weight: 700; font-size: 0.875rem; color: var(--color-forest); line-height: 1.2;">
                ${student.name}
              </div>
              <div style="font-size: 0.75rem; color: var(--color-text-secondary);">
                ${student.role || 'Guest Learner'}
              </div>
            </div>
          </div>

          <ul class="sidebar-nav">
            <li>
              <button class="sidebar-nav-btn ${activeTab === 'overview' ? 'active' : ''}" data-action="dash-tab" data-tab="overview">
                ${Icons.Layers({ size: 18 })}
                <span>Overview</span>
              </button>
            </li>
            <li>
              <button class="sidebar-nav-btn ${activeTab === 'path' ? 'active' : ''}" data-action="dash-tab" data-tab="path">
                ${Icons.Compass({ size: 18 })}
                <span>My Learning Path</span>
              </button>
            </li>
            <li>
              <button class="sidebar-nav-btn ${activeTab === 'map' ? 'active' : ''}" data-action="dash-tab" data-tab="map">
                ${Icons.Network({ size: 18 })}
                <span>Knowledge Map</span>
              </button>
            </li>
            <li>
              <button class="sidebar-nav-btn ${activeTab === 'assessments' ? 'active' : ''}" data-action="dash-tab" data-tab="assessments">
                ${Icons.Target({ size: 18 })}
                <span>Assessments</span>
              </button>
            </li>
            <li>
              <button class="sidebar-nav-btn ${activeTab === 'tutor' ? 'active' : ''}" data-action="dash-tab" data-tab="tutor">
                ${Icons.Brain({ size: 18 })}
                <span>AI Tutor</span>
              </button>
            </li>
            <li>
              <button class="sidebar-nav-btn ${activeTab === 'progress' ? 'active' : ''}" data-action="dash-tab" data-tab="progress">
                ${Icons.BarChart2({ size: 18 })}
                <span>Progress</span>
              </button>
            </li>
            <li>
              <button class="sidebar-nav-btn ${activeTab === 'settings' ? 'active' : ''}" data-action="dash-tab" data-tab="settings">
                ${Icons.Sliders({ size: 18 })}
                <span>Settings</span>
              </button>
            </li>
          </ul>

          <div style="margin-top: auto; padding: 1rem 1.25rem; border-top: 1px solid var(--color-border); font-size: 0.75rem; color: var(--color-text-muted);">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--color-forest);"></span>
              <strong>Active Topic:</strong>
            </div>
            <div style="font-weight: 600; color: var(--color-forest);">${currentTopic.name || 'Python'}</div>
            <button class="btn btn-ghost btn-sm" data-action="start-onboarding" style="padding: 2px 0; margin-top: 4px; font-size: 0.75rem; color: var(--color-terracotta);">
              Switch Subject / Topic &rarr;
            </button>
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="dashboard-content" role="main">
          <!-- Mobile Tab Bar Strip for small screens -->
          <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 1rem; border-bottom: 1px solid var(--color-border);" class="mobile-only">
            <button class="btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-secondary'} btn-sm" data-action="dash-tab" data-tab="overview">Overview</button>
            <button class="btn ${activeTab === 'path' ? 'btn-primary' : 'btn-secondary'} btn-sm" data-action="dash-tab" data-tab="path">Path</button>
            <button class="btn ${activeTab === 'map' ? 'btn-primary' : 'btn-secondary'} btn-sm" data-action="dash-tab" data-tab="map">Map</button>
            <button class="btn ${activeTab === 'tutor' ? 'btn-primary' : 'btn-secondary'} btn-sm" data-action="dash-tab" data-tab="tutor">Tutor</button>
            <button class="btn ${activeTab === 'progress' ? 'btn-primary' : 'btn-secondary'} btn-sm" data-action="dash-tab" data-tab="progress">Progress</button>
            <button class="btn ${activeTab === 'settings' ? 'btn-primary' : 'btn-secondary'} btn-sm" data-action="dash-tab" data-tab="settings">Settings</button>
          </div>

          ${this.renderTabContent(activeTab, state, currentTopic, learningPath, selectedConceptDetail)}
        </main>
      </div>
    `;
  },

  renderTabContent(tab, state, currentTopic, learningPath, selectedConceptDetail) {
    switch (tab) {
      case 'overview':
        return this.renderOverviewTab(state, currentTopic, learningPath);
      case 'path':
        return this.renderLearningPathTab(state, currentTopic, learningPath);
      case 'map':
        return this.renderKnowledgeMapTab(state, currentTopic, selectedConceptDetail);
      case 'assessments':
        return this.renderAssessmentsTab(state, currentTopic);
      case 'tutor':
        return this.renderTutorTab(state, currentTopic);
      case 'progress':
        return this.renderProgressTab(state, currentTopic);
      case 'settings':
        return this.renderSettingsTab(state);
      default:
        return this.renderOverviewTab(state, currentTopic, learningPath);
    }
  },

  /* -------------------------------------------------------------
     1. OVERVIEW TAB
     ------------------------------------------------------------- */
  renderOverviewTab(state, currentTopic, learningPath) {
    const { student, masteryMap = {}, hasCompletedDiagnostic } = state;
    const concepts = Object.values(masteryMap);
    const weakConcepts = concepts.filter(c => c.status === MASTERY_STATES.NEEDS_ATTENTION);
    const developingConcepts = concepts.filter(c => c.status === MASTERY_STATES.DEVELOPING);
    const strongConcepts = concepts.filter(c => c.status === MASTERY_STATES.STRONG);

    const nextActivity = learningPath.find(item => item.isCurrent) || learningPath[0];

    return `
      <div>
        <!-- Greeting Banner -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;">
          <div>
            <span class="label-eyebrow" style="margin-bottom: 6px;">
              ${student.currentGoal || 'Prepare for examination'}
            </span>
            <h1 class="page-heading" style="margin-bottom: 4px;">
              Welcome back, ${student.name.split(' ')[0]}.
            </h1>
            <p class="text-secondary" style="font-size: 0.9375rem;">
              Currently calibrating <strong>${currentTopic.name || 'Python Fundamentals'}</strong>.
            </p>
          </div>

          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary btn-sm" data-action="launch-diagnostic">
              ${Icons.RotateCcw({ size: 16 })}
              <span>${hasCompletedDiagnostic ? 'Retake Diagnostic' : 'Take Diagnostic'}</span>
            </button>
            <button class="btn btn-primary btn-sm" data-action="dash-tab" data-tab="tutor">
              ${Icons.Brain({ size: 16 })}
              <span>Ask Socratic Tutor</span>
            </button>
          </div>
        </div>

        <!-- Metric Stat Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
          <div class="card" style="padding: 1.25rem;">
            <div style="font-size: 0.75rem; color: var(--color-text-secondary); text-transform: uppercase; font-weight: 700;">
              Concepts Assessed
            </div>
            <div style="font-size: 1.875rem; font-weight: 800; color: var(--color-forest); font-family: var(--font-heading); margin-top: 4px;">
              ${concepts.filter(c => c.evidenceCount > 0).length} / ${concepts.length}
            </div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px;">
              ${hasCompletedDiagnostic ? 'Calibrated via diagnostic' : 'Baseline self-report prior'}
            </div>
          </div>

          <div class="card" style="padding: 1.25rem;">
            <div style="font-size: 0.75rem; color: var(--color-terracotta); text-transform: uppercase; font-weight: 700;">
              Knowledge Gaps
            </div>
            <div style="font-size: 1.875rem; font-weight: 800; color: var(--color-terracotta); font-family: var(--font-heading); margin-top: 4px;">
              ${weakConcepts.length}
            </div>
            <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-top: 4px;">
              ${weakConcepts.length > 0 ? 'Prioritized in your learning path' : 'No critical blockers detected'}
            </div>
          </div>

          <div class="card" style="padding: 1.25rem;">
            <div style="font-size: 0.75rem; color: var(--color-status-strong); text-transform: uppercase; font-weight: 700;">
              Mastered Concepts
            </div>
            <div style="font-size: 1.875rem; font-weight: 800; color: var(--color-status-strong); font-family: var(--font-heading); margin-top: 4px;">
              ${strongConcepts.length}
            </div>
            <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-top: 4px;">
              Demonstrated reliable accuracy
            </div>
          </div>
        </div>

        <!-- Recommended Next Action Hero Card -->
        ${nextActivity ? `
          <div class="card card-elevated" style="border-left: 4px solid var(--color-terracotta); margin-bottom: 2rem; background: #fffcfb;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
              <div style="max-width: 640px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                  <span class="label-eyebrow" style="margin: 0;">${nextActivity.priority || 'Next Step'}</span>
                  <span style="font-size: 0.8125rem; font-family: var(--font-mono); color: var(--color-text-muted);">
                    ${nextActivity.duration}
                  </span>
                </div>
                <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: var(--color-forest);">
                  ${nextActivity.title}
                </h3>
                <p style="font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.55; margin-bottom: 1rem;">
                  <strong>Why this lesson:</strong> ${nextActivity.reason}
                </p>
                <button class="btn btn-accent btn-sm" data-action="open-lesson" data-activity-id="${nextActivity.id}">
                  ${Icons.Sparkles({ size: 16 })}
                  <span>Start Targeted Lesson</span>
                </button>
              </div>

              <div style="background: var(--color-ivory); border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 1rem; min-width: 200px;">
                <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-forest); margin-bottom: 6px;">
                  Objective:
                </div>
                <div style="font-size: 0.8125rem; color: var(--color-text-secondary); line-height: 1.45;">
                  ${nextActivity.objective}
                </div>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Gaps Alert Box if Any -->
        ${weakConcepts.length > 0 ? `
          <div style="background: var(--color-status-attention-bg); border: 1px solid var(--color-status-attention-border); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 2rem;">
            <div style="display: flex; gap: 10px; align-items: flex-start;">
              <div style="color: var(--color-terracotta-dark); margin-top: 2px;">
                ${Icons.AlertTriangle({ size: 20 })}
              </div>
              <div style="flex: 1;">
                <strong style="color: var(--color-terracotta-dark); font-size: 0.9375rem;">
                  ${weakConcepts.length} Conceptual Gap${weakConcepts.length > 1 ? 's' : ''} Identified
                </strong>
                <p style="font-size: 0.8125rem; color: var(--color-text-secondary); margin: 4px 0 8px 0; line-height: 1.45;">
                  The diagnostic assessment detected misconceptions in <strong>${weakConcepts.map(c => c.name).join(', ')}</strong>. Targeted lessons have been placed at the top of your learning path.
                </p>
                <button class="btn btn-secondary btn-sm" data-action="dash-tab" data-tab="path" style="background: var(--color-white);">
                  <span>View Remediations in Learning Path</span>
                  ${Icons.ArrowRight({ size: 14 })}
                </button>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Quick Knowledge Overview List -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3 class="card-heading">Curriculum Mastery Trace</h3>
            <button class="btn btn-ghost btn-sm" data-action="dash-tab" data-tab="map">
              <span>View Interactive Graph</span>
              ${Icons.ChevronRight({ size: 16 })}
            </button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${concepts.map(concept => {
              const meta = MasteryEngine.getStatusMeta(concept.status);
              return `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; border-radius: var(--radius-sm); border: 1px solid var(--color-border); background: var(--color-ivory);">
                  <div>
                    <strong style="font-size: 0.875rem; color: var(--color-forest);">${concept.name}</strong>
                    <div style="font-size: 0.75rem; color: var(--color-text-secondary);">${concept.category} • ${concept.attempts.length} attempts</div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-family: var(--font-mono); font-size: 0.8125rem; font-weight: 700;">
                      ${concept.score || 0}%
                    </span>
                    <span class="badge ${meta.class}">${meta.label}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  },

  /* -------------------------------------------------------------
     2. MY LEARNING PATH TAB
     ------------------------------------------------------------- */
  renderLearningPathTab(state, currentTopic, learningPath) {
    return `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
          <div>
            <span class="label-eyebrow">Personalized Sequence</span>
            <h2 class="page-heading">My Learning Path</h2>
            <p class="text-secondary" style="font-size: 0.9375rem;">
              Generated from diagnostic evidence and ordered to eliminate prerequisite gaps first.
            </p>
          </div>
          <button class="btn btn-secondary btn-sm" data-action="recalculate-path">
            ${Icons.RotateCcw({ size: 16 })}
            <span>Recalculate Priorities</span>
          </button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${learningPath.map((item, index) => {
            const isCompleted = item.isCompleted;
            const isCurrent = item.isCurrent;
            const priorityClass = item.priorityType === 'urgent' ? 'badge-attention' : item.priorityType === 'medium' ? 'badge-developing' : 'badge-strong';

            return `
              <div class="path-item ${isCurrent ? 'active-item' : ''} ${isCompleted ? 'completed-item' : ''}">
                <div style="width: 32px; height: 32px; border-radius: 50%; background: ${isCompleted ? 'var(--color-status-strong-bg)' : isCurrent ? 'var(--color-terracotta-light)' : 'var(--color-ivory)'}; border: 1px solid ${isCompleted ? 'var(--color-status-strong-border)' : isCurrent ? 'var(--color-terracotta)' : 'var(--color-border)'}; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8125rem; color: ${isCompleted ? 'var(--color-status-strong)' : isCurrent ? 'var(--color-terracotta-dark)' : 'var(--color-text-secondary)'}; flex-shrink: 0; margin-top: 4px;">
                  ${isCompleted ? Icons.Check({ size: 16 }) : index + 1}
                </div>

                <div style="flex: 1;">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                    <span class="badge ${priorityClass}">${item.priority}</span>
                    <span style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--color-text-muted);">
                      ${item.duration}
                    </span>
                    ${isCompleted ? '<span class="badge badge-strong">Completed</span>' : ''}
                  </div>

                  <h3 style="font-size: 1.125rem; margin-bottom: 4px; color: var(--color-forest);">
                    ${item.title}
                  </h3>

                  <p style="font-size: 0.8125rem; color: var(--color-text-secondary); margin-bottom: 8px; line-height: 1.45;">
                    ${item.reason}
                  </p>

                  <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 10px;">
                    <strong>Objective:</strong> ${item.objective}
                  </div>

                  <div style="display: flex; gap: 8px;">
                    <button class="btn ${isCurrent ? 'btn-accent' : 'btn-secondary'} btn-sm" 
                            data-action="open-lesson" data-activity-id="${item.id}">
                      ${Icons.BookOpen({ size: 14 })}
                      <span>${isCompleted ? 'Review Lesson' : 'Open Lesson & Practice'}</span>
                    </button>
                    ${!isCompleted ? `
                      <button class="btn btn-ghost btn-sm" data-action="complete-lesson-activity" data-activity-id="${item.id}" title="Mark completed">
                        ${Icons.Check({ size: 14 })}
                        <span>Mark Done</span>
                      </button>
                    ` : ''}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  /* -------------------------------------------------------------
     3. KNOWLEDGE MAP TAB (Interactive Graph & Concept Drawer)
     ------------------------------------------------------------- */
  renderKnowledgeMapTab(state, currentTopic, selectedConceptDetail) {
    const { masteryMap = {} } = state;
    const concepts = currentTopic.concepts || [];

    return `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
          <div>
            <span class="label-eyebrow">Prerequisite Topology</span>
            <h2 class="page-heading">Concept Knowledge Map</h2>
            <p class="text-secondary" style="font-size: 0.9375rem;">
              Click any concept node to inspect its evidence score, diagnosed misconceptions, and prerequisite dependencies.
            </p>
          </div>
        </div>

        <div class="knowledge-map-container" style="margin-bottom: 1.5rem;">
          <!-- Filter / Legend bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; gap: 12px; font-size: 0.75rem;">
              <span style="display: flex; align-items: center; gap: 5px;">
                <span class="node-bullet strong"></span> Strong (>=80%)
              </span>
              <span style="display: flex; align-items: center; gap: 5px;">
                <span class="node-bullet developing"></span> Developing (50-79%)
              </span>
              <span style="display: flex; align-items: center; gap: 5px;">
                <span class="node-bullet attention"></span> Needs Attention (&lt;50%)
              </span>
            </div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted);">
              Graph represents cognitive dependencies
            </div>
          </div>

          <!-- Interactive SVG Knowledge Network -->
          <svg class="knowledge-graph-svg" viewBox="0 0 800 360" role="img" aria-label="Concept Prerequisite Graph">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#c4ccc6"/>
              </marker>
            </defs>

            <!-- Graph Edges / Dependency Links -->
            <line x1="140" y1="180" x2="280" y2="100" stroke="#ccd4cf" stroke-width="2" marker-end="url(#arrow)" />
            <line x1="280" y1="100" x2="440" y2="100" stroke="#ccd4cf" stroke-width="2" marker-end="url(#arrow)" />
            <line x1="440" y1="100" x2="600" y2="100" stroke="#ccd4cf" stroke-width="2" marker-end="url(#arrow)" />
            <line x1="440" y1="100" x2="440" y2="240" stroke="#ccd4cf" stroke-width="2" marker-end="url(#arrow)" />
            <line x1="440" y1="240" x2="600" y2="240" stroke="#ccd4cf" stroke-width="2" marker-end="url(#arrow)" />
            <line x1="600" y1="240" x2="720" y2="180" stroke="#ccd4cf" stroke-width="2" marker-end="url(#arrow)" />

            <!-- Node 1: Variables -->
            ${this.renderSvgNode('py-variables', 'Variables & Assign', 140, 180, masteryMap['py-variables'])}

            <!-- Node 2: Data Types -->
            ${this.renderSvgNode('py-data-types', 'Data Types', 280, 100, masteryMap['py-data-types'])}

            <!-- Node 3: Conditionals -->
            ${this.renderSvgNode('py-conditionals', 'Conditionals', 440, 100, masteryMap['py-conditionals'])}

            <!-- Node 4: Logical Operators -->
            ${this.renderSvgNode('py-logical-ops', 'Logical Ops', 600, 100, masteryMap['py-logical-ops'])}

            <!-- Node 5: Loops -->
            ${this.renderSvgNode('py-loops', 'Loops & Range', 440, 240, masteryMap['py-loops'])}

            <!-- Node 6: Functions -->
            ${this.renderSvgNode('py-functions', 'Functions & Return', 600, 240, masteryMap['py-functions'])}
          </svg>
        </div>

        <!-- Concept Inspector Panel (Opens when node is clicked or defaults to weakest) -->
        ${this.renderConceptInspector(selectedConceptDetail || masteryMap['py-loops'] || concepts[0])}
      </div>
    `;
  },

  renderSvgNode(conceptId, label, x, y, conceptState) {
    const status = conceptState ? conceptState.status : 'not_assessed';
    let fillColor = '#FFFFFF';
    let strokeColor = '#b8c0bb';
    let textColor = '#202820';

    if (status === 'strong') {
      strokeColor = '#194d38';
      fillColor = '#e2f2e7';
    } else if (status === 'developing') {
      strokeColor = '#78530a';
      fillColor = '#fef4dc';
    } else if (status === 'needs_attention') {
      strokeColor = '#C96F4A';
      fillColor = '#faece7';
    }

    return `
      <g class="concept-node-interactive" data-action="inspect-concept" data-concept-id="${conceptId}" transform="translate(${x}, ${y})">
        <rect x="-65" y="-24" width="130" height="48" rx="8" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2" />
        <text x="0" y="-3" font-family="'Manrope', sans-serif" font-weight="700" font-size="11" fill="${textColor}" text-anchor="middle">${label}</text>
        <text x="0" y="14" font-family="'JetBrains Mono', monospace" font-size="10" fill="#626B63" text-anchor="middle">${conceptState?.score || 50}% • ${status.replace('_', ' ')}</text>
      </g>
    `;
  },

  renderConceptInspector(concept) {
    if (!concept) return '';
    const meta = MasteryEngine.getStatusMeta(concept.status);

    return `
      <div class="card card-elevated" style="border-top: 3px solid ${meta.color};">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="label-eyebrow" style="margin: 0;">Concept Inspector</span>
              <span class="badge ${meta.class}">${meta.label}</span>
            </div>
            <h3 style="font-size: 1.35rem; color: var(--color-forest); margin-top: 4px;">
              ${concept.name}
            </h3>
          </div>

          <div style="text-align: right;">
            <div style="font-size: 1.5rem; font-weight: 800; font-family: var(--font-heading); color: ${meta.color};">
              ${concept.score || 0}%
            </div>
            <div style="font-size: 0.75rem; color: var(--color-text-secondary);">
              Calibrated Mastery Score
            </div>
          </div>
        </div>

        <div style="background: var(--color-ivory); border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 1rem; margin-bottom: 1rem;">
          <div style="font-size: 0.8125rem; font-weight: 700; color: var(--color-forest); margin-bottom: 4px;">
            Causal Diagnostic Explanation:
          </div>
          <p style="font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.5; margin: 0;">
            ${concept.causalExplanation || 'Awaiting diagnostic evaluation.'}
          </p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.8125rem;">
          <div>
            <strong>Prerequisites:</strong>
            <div style="color: var(--color-text-secondary); margin-top: 2px;">
              ${(concept.prerequisites || []).length > 0 ? concept.prerequisites.join(', ') : 'None (Foundation node)'}
            </div>
          </div>
          <div>
            <strong>Diagnostic Evidence Count:</strong>
            <div style="color: var(--color-text-secondary); margin-top: 2px;">
              ${concept.evidenceCount || 0} assessment attempts recorded
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /* -------------------------------------------------------------
     4. ASSESSMENTS TAB
     ------------------------------------------------------------- */
  renderAssessmentsTab(state, currentTopic) {
    const { hasCompletedDiagnostic, masteryMap = {} } = state;

    return `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
          <div>
            <span class="label-eyebrow">Diagnostic Suite</span>
            <h2 class="page-heading">Assessments & Calibration</h2>
            <p class="text-secondary" style="font-size: 0.9375rem;">
              Diagnostic checks continuously recalibrate your knowledge graph without penalizing mistakes.
            </p>
          </div>
          <button class="btn btn-accent btn-sm" data-action="launch-diagnostic">
            ${Icons.Sparkles({ size: 16 })}
            <span>${hasCompletedDiagnostic ? 'Start Reassessment' : 'Begin First Diagnostic'}</span>
          </button>
        </div>

        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 class="card-heading" style="margin-bottom: 0.5rem;">Diagnostic Battery 1 • ${currentTopic.name || 'Python Fundamentals'}</h3>
          <p style="font-size: 0.875rem; color: var(--color-text-secondary); margin-bottom: 1rem;">
            6 multi-format questions testing Variables, Data Types, Conditionals, Loops, and Functions.
          </p>

          <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; padding: 12px 16px; background: var(--color-ivory); border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
            <div style="font-size: 0.8125rem;">
              <strong>Status:</strong> ${hasCompletedDiagnostic ? '<span class="badge badge-strong">Completed</span>' : '<span class="badge badge-developing">Pending Calibration</span>'}
            </div>
            <div style="font-size: 0.8125rem;">
              <strong>Format:</strong> Multiple Choice, Code Output, Short Prediction
            </div>
            <div style="margin-left: auto;">
              <button class="btn btn-primary btn-sm" data-action="launch-diagnostic">
                <span>${hasCompletedDiagnostic ? 'Retake to Test Growth' : 'Start Assessment'}</span>
                ${Icons.ArrowRight({ size: 14 })}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /* -------------------------------------------------------------
     5. AI TUTOR TAB
     ------------------------------------------------------------- */
  renderTutorTab(state, currentTopic) {
    const { tutorMessages = [], preferences = {} } = state;
    const isGeminiConnected = preferences.apiKey && preferences.apiKey.trim().length > 5;

    return `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <span class="label-eyebrow">Socratic Companion</span>
            <h2 class="page-heading">Personal AI Tutor</h2>
            <p class="text-secondary" style="font-size: 0.9375rem;">
              Context-aware tutor that guides your thinking rather than giving away flat answers.
            </p>
          </div>
          <div style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--color-text-muted); background: var(--color-white); border: 1px solid var(--color-border); padding: 4px 10px; border-radius: var(--radius-full);">
            ${isGeminiConnected ? 'Connected to Gemini API' : 'Local Pedagogical Engine (Deterministic Demo)'}
          </div>
        </div>

        <div class="tutor-chat-shell">
          <div class="tutor-header">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 28px; height: 28px; border-radius: 50%; background: var(--color-forest); color: var(--color-ivory); display: flex; align-items: center; justify-content: center;">
                ${Icons.Brain({ size: 16 })}
              </div>
              <strong style="font-size: 0.875rem; color: var(--color-forest);">Mindtrace Socratic Tutor</strong>
            </div>
            <button class="btn btn-ghost btn-sm" data-action="clear-tutor-chat" title="Clear chat history" style="font-size: 0.75rem;">
              ${Icons.RotateCcw({ size: 14 })}
              <span>Clear History</span>
            </button>
          </div>

          <!-- Chat messages stream -->
          <div class="tutor-messages" id="tutor-messages-stream">
            ${tutorMessages.map(msg => `
              <div class="chat-bubble ${msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-tutor'}">
                <div style="white-space: pre-line;">${this.formatTutorMarkdown(msg.text)}</div>
                <div style="font-size: 0.65rem; color: ${msg.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted)'}; margin-top: 4px; text-align: right;">
                  ${new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Quick Action Pills -->
          <div class="tutor-quick-actions">
            <button class="btn btn-secondary btn-sm" data-action="send-tutor-quick" data-prompt="Explain more simply.">
              Explain more simply
            </button>
            <button class="btn btn-secondary btn-sm" data-action="send-tutor-quick" data-prompt="Show me an example.">
              Show me an example
            </button>
            <button class="btn btn-secondary btn-sm" data-action="send-tutor-quick" data-prompt="Why was my answer incorrect?">
              Why was my answer incorrect?
            </button>
            <button class="btn btn-secondary btn-sm" data-action="send-tutor-quick" data-prompt="Give me a practice question.">
              Give me a practice question
            </button>
            <button class="btn btn-secondary btn-sm" data-action="send-tutor-quick" data-prompt="Test me again.">
              Test me again
            </button>
          </div>

          <!-- Input bar -->
          <form class="tutor-input-box" id="tutor-chat-form">
            <input type="text" id="tutor-user-input" class="tutor-input" 
                   placeholder="Ask a question about your gaps or code..." 
                   autocomplete="off" />
            <button type="submit" class="btn btn-primary btn-sm" id="btn-send-tutor" style="padding: 10px 16px;">
              ${Icons.Send({ size: 16 })}
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    `;
  },

  formatTutorMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code style="background: rgba(0,0,0,0.06); padding: 2px 4px; border-radius: 4px; font-family: monospace;">$1</code>');
  },

  /* -------------------------------------------------------------
     6. PROGRESS TAB
     ------------------------------------------------------------- */
  renderProgressTab(state, currentTopic) {
    const { masteryMap = {}, completedActivityIds = [], hasCompletedDiagnostic } = state;
    const concepts = Object.values(masteryMap);
    const totalMastery = concepts.reduce((acc, c) => acc + (c.score || 0), 0);
    const avgMastery = concepts.length > 0 ? Math.round(totalMastery / concepts.length) : 0;

    return `
      <div>
        <div style="margin-bottom: 1.5rem;">
          <span class="label-eyebrow">Honest Analytics</span>
          <h2 class="page-heading">Demonstrated Progress</h2>
          <p class="text-secondary" style="font-size: 0.9375rem;">
            Real evidence-based telemetry. No fabricated metrics or inflated progress bars.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
          <div class="card">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-forest); text-transform: uppercase;">
              Average Topic Mastery
            </div>
            <div style="font-size: 2rem; font-weight: 800; color: var(--color-forest); font-family: var(--font-heading); margin-top: 4px;">
              ${avgMastery}%
            </div>
            <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-top: 4px;">
              Across ${concepts.length} evaluated concepts
            </div>
          </div>

          <div class="card">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-status-strong); text-transform: uppercase;">
              Completed Activities
            </div>
            <div style="font-size: 2rem; font-weight: 800; color: var(--color-status-strong); font-family: var(--font-heading); margin-top: 4px;">
              ${completedActivityIds.length}
            </div>
            <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-top: 4px;">
              Targeted lessons & drills finished
            </div>
          </div>

          <div class="card">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-terracotta); text-transform: uppercase;">
              Diagnostic Status
            </div>
            <div style="font-size: 1.25rem; font-weight: 700; color: var(--color-terracotta-dark); margin-top: 8px;">
              ${hasCompletedDiagnostic ? 'Calibrated' : 'Initial Prior'}
            </div>
            <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-top: 4px;">
              ${hasCompletedDiagnostic ? 'Full question evidence logged' : 'Diagnostic recommended'}
            </div>
          </div>
        </div>

        <div class="card">
          <h3 class="card-heading" style="margin-bottom: 1rem;">Concept Competency Distribution</h3>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${concepts.map(concept => {
              const score = concept.score || 0;
              const meta = MasteryEngine.getStatusMeta(concept.status);
              return `
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 0.875rem; margin-bottom: 4px;">
                    <strong>${concept.name}</strong>
                    <span style="font-weight: 700; color: ${meta.color};">${score}% (${meta.label})</span>
                  </div>
                  <div style="height: 8px; background: var(--color-border); border-radius: 4px; overflow: hidden;">
                    <div style="width: ${score}%; height: 100%; background: ${meta.color}; transition: width 0.4s ease;"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  },

  /* -------------------------------------------------------------
     7. SETTINGS TAB
     ------------------------------------------------------------- */
  renderSettingsTab(state) {
    const { student, preferences = {} } = state;

    return `
      <div>
        <div style="margin-bottom: 1.5rem;">
          <span class="label-eyebrow">Preferences & Session</span>
          <h2 class="page-heading">Settings</h2>
          <p class="text-secondary" style="font-size: 0.9375rem;">
            Customize your learning profile, explanation depth, and demonstration data.
          </p>
        </div>

        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 class="card-heading" style="margin-bottom: 1rem;">Learner Profile</h3>
          
          <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 480px;">
            <div>
              <label style="font-size: 0.8125rem; font-weight: 600; display: block; margin-bottom: 4px;">Display Name</label>
              <input type="text" id="settings-student-name" class="text-input-field" value="${student.name}" style="margin: 0;" />
            </div>

            <div>
              <label style="font-size: 0.8125rem; font-weight: 600; display: block; margin-bottom: 4px;">Preferred Explanation Style</label>
              <select id="settings-learning-style" class="text-input-field" style="margin: 0;">
                <option value="intuitive" ${preferences.learningStyle === 'intuitive' ? 'selected' : ''}>Intuitive & Visual (Mental models & analogies)</option>
                <option value="rigorous" ${preferences.learningStyle === 'rigorous' ? 'selected' : ''}>Academic & Rigorous (Formal semantics & specifications)</option>
                <option value="practical" ${preferences.learningStyle === 'practical' ? 'selected' : ''}>Step-by-step Practical (Applied code outputs & debugging)</option>
              </select>
            </div>

            <div>
              <label style="font-size: 0.8125rem; font-weight: 600; display: block; margin-bottom: 4px;">Optional Real AI Key (Gemini API)</label>
              <input type="password" id="settings-api-key" class="text-input-field" 
                     placeholder="Enter Gemini API key to query Live LLM..." 
                     value="${preferences.apiKey || ''}" style="margin: 0;" />
              <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px;">
                Keys remain strictly inside local browser memory. When empty, Mindtrace uses its built-in pedagogical engine.
              </div>
            </div>

            <button class="btn btn-primary btn-sm" data-action="save-settings" style="align-self: flex-start; margin-top: 0.5rem;">
              <span>Save Preferences</span>
            </button>
          </div>
        </div>

        <!-- Danger Zone: Reset Demo Data -->
        <div class="card" style="border-color: var(--color-status-attention-border); background: #fffdfd;">
          <h3 class="card-heading" style="color: var(--color-terracotta-dark); margin-bottom: 0.5rem;">
            Danger Zone • Demo State
          </h3>
          <p style="font-size: 0.875rem; color: var(--color-text-secondary); margin-bottom: 1rem;">
            Reset all concept calibrations, diagnostic answers, learning path progress, and tutor conversation back to initial defaults.
          </p>
          <button class="btn btn-accent btn-sm" data-action="reset-demo">
            ${Icons.RotateCcw({ size: 16 })}
            <span>Reset All Demonstration Data</span>
          </button>
        </div>
      </div>
    `;
  }
};
