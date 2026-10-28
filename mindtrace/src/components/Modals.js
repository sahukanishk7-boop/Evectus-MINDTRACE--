/**
 * MINDTRACE INFORMATIONAL MODALS
 * Accessible modals for Learning Science, Privacy & Terms, and Research Contact.
 */

import { Icons } from './icons.js';
import { BRAND_CONFIG } from '../config/brand.js';

export const Modals = {
  renderScienceModal() {
    return `
      <div id="info-modal-backdrop" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="science-modal-title">
        <div class="modal-dialog">
          <div class="modal-header">
            <div>
              <span class="label-eyebrow" style="margin-bottom: 4px;">Pedagogical Foundations</span>
              <h2 id="science-modal-title" style="font-size: 1.25rem;">
                The Science of Adaptive Learning
              </h2>
            </div>
            <button class="btn btn-ghost btn-sm" data-action="close-info-modal" aria-label="Close modal">
              ${Icons.X({ size: 20 })}
            </button>
          </div>

          <div class="modal-body" style="font-size: 0.9375rem; line-height: 1.65;">
            <p><strong>"Education should adapt to the student, not force every student to adapt to the same system."</strong></p>
            
            <h4 style="font-size: 1rem; color: var(--color-forest); margin: 1rem 0 0.25rem 0;">1. Bayesian Knowledge Tracing (BKT)</h4>
            <p class="text-secondary">
              Rather than assuming binary pass/fail comprehension, Mindtrace maintains an ongoing probability distribution over each conceptual node. Every correct response, subtle hesitation, or chosen distractor provides Bayesian evidence to update our estimate of student mastery.
            </p>

            <h4 style="font-size: 1rem; color: var(--color-forest); margin: 1rem 0 0.25rem 0;">2. Cognitive Load Theory & Prerequisite Graphs</h4>
            <p class="text-secondary">
              Concepts are not learned in isolation. Trying to teach loops to a student who has not solidified variable assignment overloads working memory. Our topological sorter ensures foundational prerequisite gaps are repaired before introducing higher-order constructs.
            </p>

            <h4 style="font-size: 1rem; color: var(--color-forest); margin: 1rem 0 0.25rem 0;">3. Formative Misconception Taxonomies</h4>
            <p class="text-secondary">
              A student who selects an incorrect option is rarely guessing randomly; they are usually executing a coherent but incorrect mental model. By cataloging distractors against specific error taxonomies, our Socratic tutor intervenes directly at the root of the confusion.
            </p>
          </div>

          <div class="modal-footer">
            <button class="btn btn-primary btn-sm" data-action="close-info-modal" style="margin-left: auto;">
              <span>Understood</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  renderPrivacyTermsModal() {
    return `
      <div id="info-modal-backdrop" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="terms-modal-title">
        <div class="modal-dialog">
          <div class="modal-header">
            <div>
              <span class="label-eyebrow" style="margin-bottom: 4px;">Platform Transparency</span>
              <h2 id="terms-modal-title" style="font-size: 1.25rem;">
                Privacy, Data & Guest Persistence
              </h2>
            </div>
            <button class="btn btn-ghost btn-sm" data-action="close-info-modal" aria-label="Close modal">
              ${Icons.X({ size: 20 })}
            </button>
          </div>

          <div class="modal-body" style="font-size: 0.9375rem; line-height: 1.65;">
            <p><strong>Zero Sensitive Data Requirement:</strong></p>
            <p class="text-secondary">
              Mindtrace is architected for academic privacy. For the interactive demonstration, all session telemetry, diagnostic attempts, and tutor messages are stored strictly in your browser's local storage (<code>localStorage</code>).
            </p>

            <h4 style="font-size: 1rem; color: var(--color-forest); margin: 1rem 0 0.25rem 0;">Data Portability & Reset</h4>
            <p class="text-secondary">
              No tracking cookies or third-party profiling scripts are loaded. You can reset or flush all stored demonstration data at any time from the Settings tab or the footer link.
            </p>

            <h4 style="font-size: 1rem; color: var(--color-forest); margin: 1rem 0 0.25rem 0;">Optional Real AI Integration</h4>
            <p class="text-secondary">
              If you provide an external Gemini API key in Settings, the key is kept in local memory and sent only directly to the Google Gemini API endpoint over HTTPS to power live answers.
            </p>
          </div>

          <div class="modal-footer">
            <button class="btn btn-primary btn-sm" data-action="close-info-modal" style="margin-left: auto;">
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  renderContactModal() {
    return `
      <div id="info-modal-backdrop" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
        <div class="modal-dialog">
          <div class="modal-header">
            <div>
              <span class="label-eyebrow" style="margin-bottom: 4px;">Educational Research Lab</span>
              <h2 id="contact-modal-title" style="font-size: 1.25rem;">
                Research Collaboration
              </h2>
            </div>
            <button class="btn btn-ghost btn-sm" data-action="close-info-modal" aria-label="Close modal">
              ${Icons.X({ size: 20 })}
            </button>
          </div>

          <div class="modal-body" style="font-size: 0.9375rem; line-height: 1.65;">
            <p>
              ${BRAND_CONFIG.name} is designed as an open reference architecture for research-backed adaptive learning.
            </p>
            <p class="text-secondary">
              If you are an educator, researcher in cognitive science, or developer interested in knowledge tracing algorithms, this prototype demonstrates how concept-level state models can replace standard linear curricula.
            </p>
            <div style="background: var(--color-ivory); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--color-border); margin-top: 1rem;">
              <strong>Academic Reference:</strong> Mindtrace Adaptive Knowledge Tracing System (AKTS) v${BRAND_CONFIG.version}
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-primary btn-sm" data-action="close-info-modal" style="margin-left: auto;">
              <span>Done</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }
};
