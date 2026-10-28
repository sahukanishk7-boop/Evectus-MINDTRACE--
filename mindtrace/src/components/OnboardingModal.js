/**
 * MINDTRACE 5-STEP STUDENT ONBOARDING MODAL
 * Frictionless student calibration flow:
 * Step 1: Subject Selection (including Custom Topic)
 * Step 2: Topic Selection
 * Step 3: Learning Objective
 * Step 4: Self-Reported Confidence (with explicit non-judgmental note)
 * Step 5: Diagnostic Orientation & Launch
 */

import { CURRICULUM_DATA } from '../data/curriculum.js';
import { Icons } from './icons.js';

export const OnboardingModal = {
  render(state, currentStep = 1) {
    const { student } = state;
    const selectedSubject = CURRICULUM_DATA.subjects.find(s => s.id === student.selectedSubjectId) || CURRICULUM_DATA.subjects[0];
    const topics = selectedSubject.topics || [];
    const isCustom = student.selectedSubjectId === 'custom';

    return `
      <div id="onboarding-modal-backdrop" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
        <div class="modal-dialog">
          <!-- Modal Header -->
          <div class="modal-header">
            <div>
              <span class="label-eyebrow" style="margin-bottom: 4px;">
                Step ${currentStep} of 5 • Diagnostic Setup
              </span>
              <h2 id="onboarding-title" style="font-size: 1.25rem;">
                ${this.getStepTitle(currentStep)}
              </h2>
            </div>
            <button class="btn btn-ghost btn-sm" data-action="close-onboarding" aria-label="Close onboarding">
              ${Icons.X({ size: 20 })}
            </button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            ${this.renderStepContent(currentStep, student, selectedSubject, topics, isCustom)}
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            ${currentStep > 1 ? `
              <button class="btn btn-secondary btn-sm" data-action="onboarding-prev" data-step="${currentStep}">
                ${Icons.ChevronLeft({ size: 16 })}
                <span>Back</span>
              </button>
            ` : `
              <span style="font-size: 0.75rem; color: var(--color-text-muted);">
                Guest mode active • Progress saved locally
              </span>
            `}

            ${currentStep < 5 ? `
              <button class="btn btn-primary btn-sm" data-action="onboarding-next" data-step="${currentStep}">
                <span>Continue</span>
                ${Icons.ChevronRight({ size: 16 })}
              </button>
            ` : `
              <button class="btn btn-accent btn-sm" data-action="launch-diagnostic">
                ${Icons.Sparkles({ size: 16 })}
                <span>Begin Diagnostic Assessment</span>
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  },

  getStepTitle(step) {
    switch (step) {
      case 1: return 'Choose Your Field of Study';
      case 2: return 'Select or Enter Your Focus Topic';
      case 3: return 'What is Your Primary Learning Goal?';
      case 4: return 'Calibrate Your Initial Confidence';
      case 5: return 'Your Adaptive Diagnostic Assessment';
      default: return 'Student Calibration';
    }
  },

  renderStepContent(step, student, selectedSubject, topics, isCustom) {
    switch (step) {
      case 1:
        return `
          <p class="text-secondary" style="font-size: 0.9375rem; margin-bottom: 1rem;">
            Select the subject you want to master. Mindtrace builds a live prerequisite graph for your chosen domain.
          </p>
          <div class="selection-grid">
            ${CURRICULUM_DATA.subjects.map(s => `
              <div class="selection-card ${student.selectedSubjectId === s.id ? 'selected' : ''}" 
                   data-action="select-subject" data-id="${s.id}">
                <div style="font-weight: 700; color: var(--color-forest); font-size: 0.9375rem;">
                  ${s.name}
                </div>
                <div style="font-size: 0.75rem; color: var(--color-text-secondary); line-height: 1.4;">
                  ${s.topics.length} verified learning paths
                </div>
              </div>
            `).join('')}

            <div class="selection-card ${student.selectedSubjectId === 'custom' ? 'selected' : ''}"
                 data-action="select-subject" data-id="custom">
              <div style="font-weight: 700; color: var(--color-forest); font-size: 0.9375rem;">
                Custom Topic
              </div>
              <div style="font-size: 0.75rem; color: var(--color-text-secondary); line-height: 1.4;">
                Enter any bespoke subject or exam syllabus
              </div>
            </div>
          </div>
        `;

      case 2:
        if (isCustom) {
          return `
            <p class="text-secondary" style="font-size: 0.9375rem; margin-bottom: 0.75rem;">
              Enter the exact topic or skill you want to diagnose and learn:
            </p>
            <input type="text" id="custom-topic-input" class="text-input-field" 
                   placeholder="e.g. Linear Algebra, SQL Joins, Molecular Biology..." 
                   value="${student.customTopicText || ''}" />
            <p style="font-size: 0.8125rem; color: var(--color-text-muted); margin-top: 0.5rem;">
              The system will build an adaptive taxonomy and diagnostic sequence tailored to this custom skill.
            </p>
          `;
        }

        return `
          <p class="text-secondary" style="font-size: 0.9375rem; margin-bottom: 1rem;">
            Choose a curated topic within <strong>${selectedSubject.name}</strong>:
          </p>
          <div class="selection-grid">
            ${topics.map(t => `
              <div class="selection-card ${student.selectedTopicId === t.id ? 'selected' : ''}"
                   data-action="select-topic" data-id="${t.id}">
                <div style="font-weight: 700; color: var(--color-forest); font-size: 0.9375rem;">
                  ${t.name}
                </div>
                <div style="font-size: 0.75rem; color: var(--color-text-secondary); line-height: 1.4;">
                  ${t.description}
                </div>
                <div style="margin-top: 6px; font-size: 0.7rem; font-family: var(--font-mono); color: var(--color-terracotta);">
                  ${t.concepts ? t.concepts.length : 4} core concepts • ~${t.estimatedMinutes || 30}m
                </div>
              </div>
            `).join('')}
          </div>
        `;

      case 3:
        const goals = [
          { id: 'Understand the basics', label: 'Understand the basics', desc: 'Build an intuitive, rock-solid foundational mental model.' },
          { id: 'Prepare for an exam', label: 'Prepare for an exam', desc: 'Target high-frequency problem areas and eliminate tricky misconceptions.' },
          { id: 'Solve practical problems', label: 'Solve practical problems', desc: 'Focus on applied code output, real-world bug fixing, and syntax.' },
          { id: 'Strengthen weak concepts', label: 'Strengthen weak concepts', desc: 'Directly address areas where you have struggled in previous courses.' },
          { id: 'Learn a topic from scratch', label: 'Learn from scratch', desc: 'Structured step-by-step progression with zero assumed prior knowledge.' }
        ];

        return `
          <p class="text-secondary" style="font-size: 0.9375rem; margin-bottom: 1rem;">
            Your objective shapes how the learning path prioritizes foundational reviews versus applied challenges.
          </p>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${goals.map(g => `
              <div class="selection-card ${student.currentGoal === g.id ? 'selected' : ''}"
                   data-action="select-goal" data-id="${g.id}">
                <div style="font-weight: 700; color: var(--color-forest); font-size: 0.9375rem;">
                  ${g.label}
                </div>
                <div style="font-size: 0.8125rem; color: var(--color-text-secondary);">
                  ${g.desc}
                </div>
              </div>
            `).join('')}
          </div>
        `;

      case 4:
        const confidences = [
          { id: 'Completely new', label: 'Completely new', desc: 'I have never studied this topic before.' },
          { id: 'I know the basics', label: 'I know the basics', desc: 'I recognize keywords and simple examples.' },
          { id: 'I understand some parts', label: 'I understand some parts', desc: 'Comfortable with core rules, but hesitant on complex questions.' },
          { id: 'I know it but make mistakes', label: 'I know it but make mistakes', desc: 'I make subtle errors with boundaries, scope, or execution.' },
          { id: 'I want to test my knowledge', label: 'I want to test my knowledge', desc: 'Confident and seeking rigorous diagnostic challenge.' }
        ];

        return `
          <p class="text-secondary" style="font-size: 0.9375rem; margin-bottom: 0.5rem;">
            How comfortable are you with this topic?
          </p>
          <div style="background: var(--color-ivory); border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 10px 14px; margin-bottom: 1rem; font-size: 0.8125rem; color: var(--color-text-secondary); display: flex; gap: 8px; align-items: flex-start;">
            <div style="color: var(--color-forest); margin-top: 1px;">${Icons.Info({ size: 16 })}</div>
            <span><strong>Scientific calibration note:</strong> We use your self-reported rating only as an initial prior. Demonstrated responses on diagnostic questions will calibrate true mastery.</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${confidences.map(c => `
              <div class="selection-card ${student.confidenceLevel === c.id ? 'selected' : ''}"
                   data-action="select-confidence" data-id="${c.id}">
                <div style="font-weight: 700; color: var(--color-forest); font-size: 0.9375rem;">
                  ${c.label}
                </div>
                <div style="font-size: 0.8125rem; color: var(--color-text-secondary);">
                  ${c.desc}
                </div>
              </div>
            `).join('')}
          </div>
        `;

      case 5:
        return `
          <div style="text-align: center; padding: 1rem 0;">
            <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--color-forest); color: var(--color-ivory); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
              ${Icons.Target({ size: 28 })}
            </div>
            <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">
              Diagnostic Assessment Ready
            </h3>
            <p class="text-secondary" style="font-size: 0.9375rem; max-width: 480px; margin: 0 auto 1.5rem auto; line-height: 1.6;">
              You will answer <strong>6 short questions</strong> across key conceptual nodes.
            </p>

            <div style="background: var(--color-ivory); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.25rem; text-align: left; max-width: 480px; margin: 0 auto;">
              <div style="font-size: 0.8125rem; font-weight: 700; color: var(--color-forest); margin-bottom: 0.5rem;">
                What to keep in mind:
              </div>
              <ul style="font-size: 0.8125rem; color: var(--color-text-secondary); line-height: 1.6; padding-left: 1.25rem;">
                <li>These questions are intended to <strong>discover strengths and knowledge gaps</strong>, not simply assign a pass/fail score.</li>
                <li>Incorrect answers reveal specific misconceptions and help construct your custom learning path.</li>
                <li>You can take your time—there is no countdown penalty.</li>
              </ul>
            </div>
          </div>
        `;
    }
  }
};
