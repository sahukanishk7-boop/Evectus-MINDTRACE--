/**
 * MINDTRACE ADAPTIVE ASSESSMENT ENGINE COMPONENT
 * Multi-format diagnostic testing interface with live step progression,
 * concept mastery calibration, misconception tracing, and diagnostic summary reporting.
 */

import { Icons } from './icons.js';
import { MasteryEngine, MASTERY_STATES } from '../services/masteryEngine.js';

export const AssessmentView = {
  render(diagnosticQuestions, currentIndex = 0, userAnswers = {}, isCompleted = false, masteryMap = {}, topic = {}) {
    if (isCompleted) {
      return this.renderDiagnosticSummary(masteryMap, topic, userAnswers, diagnosticQuestions);
    }

    const question = diagnosticQuestions[currentIndex];
    if (!question) {
      return `<div class="assessment-container"><p>No questions available for this topic.</p></div>`;
    }

    const totalQuestions = diagnosticQuestions.length;
    const progressPercent = Math.round(((currentIndex) / totalQuestions) * 100);
    const existingAnswer = userAnswers[question.id];

    return `
      <main class="assessment-container" role="main" aria-labelledby="question-heading">
        <!-- Progress Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <button class="btn btn-ghost btn-sm" data-action="exit-assessment" style="padding: 4px 8px;">
            ${Icons.ChevronLeft({ size: 16 })}
            <span>Exit to Dashboard</span>
          </button>
          <span style="font-family: var(--font-mono); font-size: 0.8125rem; color: var(--color-text-secondary);">
            Question ${currentIndex + 1} of ${totalQuestions}
          </span>
        </div>

        <div class="assessment-progress-bar" role="progressbar" aria-valuenow="${progressPercent}" aria-valuemin="0" aria-valuemax="100">
          <div class="assessment-progress-fill" style="width: ${progressPercent}%;"></div>
        </div>

        <!-- Question Card -->
        <div class="question-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="label-eyebrow" style="margin: 0;">
                ${this.getCategoryLabel(question.type)}
              </span>
              <span style="font-size: 0.8125rem; color: var(--color-text-muted);">
                Concept: <strong>${this.getConceptName(question.conceptId, topic)}</strong>
              </span>
            </div>
            <span class="badge ${this.getDifficultyBadgeClass(question.difficulty)}">
              Difficulty ${question.difficulty}
            </span>
          </div>

          <h2 id="question-heading" style="font-size: 1.25rem; font-weight: 700; color: var(--color-forest); margin-bottom: 0.75rem;">
            ${question.title || 'Diagnostic Evaluation'}
          </h2>

          <p style="font-size: 1.0625rem; line-height: 1.6; color: var(--color-text-primary); margin-bottom: 1rem; white-space: pre-line;">
            ${question.prompt || question.question}
          </p>

          ${question.code ? `
            <pre class="code-block"><code>${this.escapeHtml(question.code)}</code></pre>
          ` : ''}

          <!-- Answer Inputs By Type -->
          <div style="margin-top: 1.5rem;">
            ${this.renderAnswerInput(question, existingAnswer)}
          </div>

          <!-- Bottom Action Buttons -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; padding-top: 1.25rem; border-top: 1px solid var(--color-border);">
            ${currentIndex > 0 ? `
              <button class="btn btn-secondary btn-sm" data-action="prev-assessment-question" data-index="${currentIndex}">
                ${Icons.ChevronLeft({ size: 16 })}
                <span>Previous</span>
              </button>
            ` : `<div></div>`}

            <button class="btn btn-primary btn-sm" id="btn-submit-assessment-step" 
                    data-action="next-assessment-question" data-index="${currentIndex}"
                    ${existingAnswer === undefined ? 'disabled' : ''}>
              <span>${currentIndex === totalQuestions - 1 ? 'Complete Diagnostic' : 'Submit & Next'}</span>
              ${Icons.ArrowRight({ size: 16 })}
            </button>
          </div>
        </div>
      </main>
    `;
  },

  renderAnswerInput(question, existingAnswer) {
    if (question.type === 'mcq' || question.type === 'tf' || question.type === 'code_output') {
      return `
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${(question.options || []).map((opt, idx) => {
            const isSelected = existingAnswer !== undefined && existingAnswer.selectedOptionIndex === idx;
            return `
              <button class="demo-option-btn ${isSelected ? 'selected-correct' : ''}" 
                      data-action="select-assessment-option" data-option-index="${idx}">
                <strong style="width: 24px; color: var(--color-forest);">${String.fromCharCode(65 + idx)}.</strong>
                <span style="flex: 1;">${this.escapeHtml(opt)}</span>
              </button>
            `;
          }).join('')}
        </div>
      `;
    }

    if (question.type === 'short_answer') {
      const currentVal = existingAnswer ? existingAnswer.userText : '';
      return `
        <div>
          <label for="short-answer-input" style="font-weight: 600; font-size: 0.875rem; color: var(--color-text-secondary); display: block;">
            Type your predicted output or numeric answer:
          </label>
          <input type="text" id="short-answer-input" class="text-input-field" 
                 placeholder="Enter answer (e.g. 6)..." 
                 value="${this.escapeHtml(currentVal || '')}" 
                 data-action="input-assessment-text" />
        </div>
      `;
    }

    return '';
  },

  renderDiagnosticSummary(masteryMap, topic, userAnswers, questions) {
    const conceptEntries = Object.values(masteryMap);
    const weakList = conceptEntries.filter(c => c.status === MASTERY_STATES.NEEDS_ATTENTION);
    const devList = conceptEntries.filter(c => c.status === MASTERY_STATES.DEVELOPING);
    const strongList = conceptEntries.filter(c => c.status === MASTERY_STATES.STRONG);

    // Calculate overall accuracy
    const answers = Object.values(userAnswers);
    const correctCount = answers.filter(a => a.isCorrect).length;
    const totalCount = questions.length;
    const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

    return `
      <main class="assessment-container" role="main">
        <div class="card card-elevated" style="padding: 2.5rem; text-align: center;">
          <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--color-forest); color: var(--color-ivory); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto;">
            ${Icons.Sparkles({ size: 32 })}
          </div>

          <span class="label-eyebrow">Diagnostic Complete</span>
          <h2 style="font-size: 2rem; margin: 0.25rem 0 0.75rem 0;">
            Knowledge Calibration Report
          </h2>
          <p class="text-secondary" style="max-width: 540px; margin: 0 auto 1.5rem auto; font-size: 1rem;">
            We evaluated your responses across <strong>${conceptEntries.length} core concepts</strong> in <strong>${topic.name || 'Python Fundamentals'}</strong>.
          </p>

          <!-- High-level Metric Pills -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem;">
            <div style="background: var(--color-ivory); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
              <div style="font-size: 1.5rem; font-weight: 800; color: var(--color-forest); font-family: var(--font-heading);">
                ${accuracy}%
              </div>
              <div style="font-size: 0.75rem; color: var(--color-text-secondary); text-transform: uppercase;">
                Diagnostic Accuracy
              </div>
            </div>

            <div style="background: var(--color-status-attention-bg); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--color-status-attention-border);">
              <div style="font-size: 1.5rem; font-weight: 800; color: var(--color-terracotta-dark); font-family: var(--font-heading);">
                ${weakList.length}
              </div>
              <div style="font-size: 0.75rem; color: var(--color-terracotta-dark); text-transform: uppercase;">
                Gaps Needing Attention
              </div>
            </div>

            <div style="background: var(--color-status-strong-bg); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--color-status-strong-border);">
              <div style="font-size: 1.5rem; font-weight: 800; color: var(--color-status-strong); font-family: var(--font-heading);">
                ${strongList.length}
              </div>
              <div style="font-size: 0.75rem; color: var(--color-status-strong); text-transform: uppercase;">
                Solidified Concepts
              </div>
            </div>
          </div>

          <!-- Concept Breakdown List -->
          <div style="text-align: left; margin-bottom: 2rem;">
            <h3 style="font-size: 1.125rem; margin-bottom: 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">
              Concept-Level Diagnosis
            </h3>

            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              ${conceptEntries.map(concept => {
                const meta = MasteryEngine.getStatusMeta(concept.status);
                return `
                  <div style="padding: 12px 16px; border-radius: var(--radius-sm); border: 1px solid var(--color-border); background: var(--color-ivory); display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <strong style="color: var(--color-forest); font-size: 0.9375rem;">${concept.name}</strong>
                      <span class="badge ${meta.class}">
                        ${meta.label} (${concept.score || 0}%)
                      </span>
                    </div>
                    <p style="font-size: 0.8125rem; color: var(--color-text-secondary); margin: 0; line-height: 1.45;">
                      ${concept.causalExplanation}
                    </p>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Action Button to generate path and view dashboard -->
          <button class="btn btn-accent btn-lg" data-action="transition-to-dashboard" style="width: 100%; max-width: 440px; margin: 0 auto;">
            ${Icons.Compass({ size: 18 })}
            <span>Build My Personalized Learning Path</span>
          </button>
        </div>
      </main>
    `;
  },

  getCategoryLabel(type) {
    switch (type) {
      case 'code_output': return 'Code Execution Trace';
      case 'short_answer': return 'Applied Prediction';
      case 'tf': return 'True or False';
      default: return 'Conceptual Multiple Choice';
    }
  },

  getConceptName(conceptId, topic) {
    if (!topic || !topic.concepts) return conceptId;
    const c = topic.concepts.find(item => item.id === conceptId);
    return c ? c.name : conceptId;
  },

  getDifficultyBadgeClass(difficulty) {
    if (difficulty >= 3) return 'badge-attention';
    if (difficulty === 2) return 'badge-developing';
    return 'badge-strong';
  },

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
};
