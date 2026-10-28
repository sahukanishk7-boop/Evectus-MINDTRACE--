/**
 * MINDTRACE INTERACTIVE LESSON & PRACTICE MODAL
 * Focused micro-learning environment with structured explanations,
 * code walk-throughs, mental models, and instant practice validation.
 */

import { Icons } from './icons.js';

export const LessonModal = {
  render(activity, exerciseResult = null) {
    if (!activity) return '';

    const lesson = activity.lesson || {
      title: activity.title,
      duration: activity.duration,
      objective: activity.objective,
      content: `<p>Concept review in progress.</p>`
    };

    const practiceQ = lesson.practiceExercise;

    return `
      <div id="lesson-modal-backdrop" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="lesson-modal-title">
        <div class="modal-dialog" style="max-width: 740px;">
          <!-- Modal Header -->
          <div class="modal-header">
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="label-eyebrow" style="margin: 0;">
                  ${activity.priority || 'Targeted Lesson'}
                </span>
                <span style="font-size: 0.8125rem; color: var(--color-text-muted); font-family: var(--font-mono);">
                  ${activity.duration}
                </span>
              </div>
              <h2 id="lesson-modal-title" style="font-size: 1.35rem; margin-top: 4px;">
                ${lesson.title}
              </h2>
            </div>
            <button class="btn btn-ghost btn-sm" data-action="close-lesson" aria-label="Close lesson">
              ${Icons.X({ size: 20 })}
            </button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            <!-- Learning Objective Pill -->
            <div style="background: var(--color-sage-light); border: 1px solid var(--color-sage-border); border-radius: var(--radius-sm); padding: 10px 14px; margin-bottom: 1.25rem; font-size: 0.875rem; color: var(--color-forest); display: flex; gap: 8px; align-items: flex-start;">
              ${Icons.Target({ size: 18, className: 'text-terracotta' })}
              <span><strong>Objective:</strong> ${lesson.objective}</span>
            </div>

            <!-- Core Lesson Educational Content -->
            <div class="lesson-content-body" style="font-size: 0.9375rem; line-height: 1.65; color: var(--color-text-primary);">
              ${lesson.content}
            </div>

            <!-- Practice Exercise for Immediate Check of Understanding -->
            ${practiceQ ? `
              <hr style="border: none; border-top: 1px solid var(--color-border); margin: 2rem 0 1.5rem 0;" />
              
              <div style="background: var(--color-ivory); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.5rem;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
                  <span style="font-size: 0.8125rem; font-weight: 700; color: var(--color-forest); text-transform: uppercase;">
                    Check Your Understanding
                  </span>
                  <span class="badge badge-developing">Practice Drill</span>
                </div>

                <p style="font-weight: 600; font-size: 0.9375rem; margin-bottom: 1rem; white-space: pre-line;">
                  ${practiceQ.question}
                </p>

                <div style="display: flex; flex-direction: column; gap: 0.5rem;" id="lesson-practice-options">
                  ${(practiceQ.options || []).map((opt, idx) => {
                    let btnClass = 'demo-option-btn';
                    if (exerciseResult) {
                      if (idx === practiceQ.correctIndex) {
                        btnClass += ' selected-correct';
                      } else if (exerciseResult.selectedIdx === idx) {
                        btnClass += ' selected-incorrect';
                      }
                    }

                    return `
                      <button class="${btnClass}" data-action="submit-lesson-exercise" data-idx="${idx}" ${exerciseResult ? 'disabled' : ''}>
                        <strong>${String.fromCharCode(65 + idx)}.</strong>&nbsp; ${opt}
                      </button>
                    `;
                  }).join('')}
                </div>

                ${exerciseResult ? `
                  <div style="margin-top: 1rem; padding: 12px; border-radius: var(--radius-sm); background: ${exerciseResult.isCorrect ? 'var(--color-status-strong-bg)' : 'var(--color-status-attention-bg)'}; border: 1px solid ${exerciseResult.isCorrect ? 'var(--color-status-strong-border)' : 'var(--color-status-attention-border)'};">
                    <div style="font-weight: 700; font-size: 0.875rem; color: ${exerciseResult.isCorrect ? 'var(--color-status-strong)' : 'var(--color-terracotta-dark)'}; margin-bottom: 4px;">
                      ${exerciseResult.isCorrect ? 'Correct! Concept Mastery Increased' : 'Review Explanation'}
                    </div>
                    <p style="font-size: 0.8125rem; color: var(--color-text-secondary); margin: 0; line-height: 1.45;">
                      ${practiceQ.explanation}
                    </p>
                  </div>
                ` : ''}
              </div>
            ` : ''}
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button class="btn btn-secondary btn-sm" data-action="close-lesson">
              <span>Back to Learning Path</span>
            </button>

            <button class="btn btn-primary btn-sm" data-action="complete-lesson-activity" data-activity-id="${activity.id}" ${activity.isCompleted ? 'disabled' : ''}>
              ${Icons.CheckCircle({ size: 16 })}
              <span>${activity.isCompleted ? 'Completed' : 'Mark Lesson Complete'}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }
};
