/**
 * MINDTRACE MAIN APPLICATION CONTROLLER
 * Reactive state coordinator, view router, and event dispatcher.
 */

import { BRAND_CONFIG } from './config/brand.js';
import { CURRICULUM_DATA } from './data/curriculum.js';
import { MasteryEngine } from './services/masteryEngine.js';
import { PathGenerator } from './services/pathGenerator.js';
import { TutorEngine } from './services/tutorEngine.js';
import { StorageService } from './services/storage.js';

import { Navigation } from './components/Navigation.js';
import { LandingPage } from './components/LandingPage.js';
import { OnboardingModal } from './components/OnboardingModal.js';
import { AssessmentView } from './components/AssessmentView.js';
import { DashboardView } from './components/DashboardView.js';
import { LessonModal } from './components/LessonModal.js';
import { Modals } from './components/Modals.js';

class MindtraceApp {
  constructor() {
    this.state = StorageService.loadState();
    
    // UI Transient state
    this.ui = {
      isOnboardingOpen: false,
      onboardingStep: 1,
      isLessonOpen: false,
      activeLessonActivity: null,
      lessonExerciseResult: null,
      infoModalType: null, // 'science' | 'privacy' | 'contact'
      selectedConceptId: null,
      
      // Assessment Transient state
      assessmentIndex: 0,
      assessmentAnswers: {},
      isAssessmentFinished: false,

      // Interactive Simulator Transient state
      simActiveConcept: 'py-loops',
      simSelectedIdx: null
    };

    this.init();
  }

  init() {
    this.bindGlobalEvents();
    this.render();
  }

  getCurrentSubject() {
    return CURRICULUM_DATA.subjects.find(s => s.id === this.state.student.selectedSubjectId) || CURRICULUM_DATA.subjects[0];
  }

  getCurrentTopic() {
    const subject = this.getCurrentSubject();
    if (this.state.student.selectedSubjectId === 'custom' && this.state.student.customTopicText) {
      return {
        id: 'custom-topic',
        name: this.state.student.customTopicText,
        description: 'Custom topic learning path',
        concepts: CURRICULUM_DATA.subjects[0].topics[0].concepts,
        diagnosticQuestions: CURRICULUM_DATA.subjects[0].topics[0].diagnosticQuestions
      };
    }
    return subject.topics.find(t => t.id === this.state.student.selectedTopicId) || subject.topics[0];
  }

  getLearningPath() {
    const topic = this.getCurrentTopic();
    return PathGenerator.generatePath(
      topic,
      this.state.masteryMap,
      this.state.student.currentGoal,
      this.state.completedActivityIds
    );
  }

  save() {
    StorageService.saveState(this.state);
  }

  render() {
    const root = document.getElementById('app');
    if (!root) return;

    const currentTopic = this.getCurrentTopic();
    const learningPath = this.getLearningPath();
    const activeView = this.state.activeView;

    let viewHtml = '';
    if (activeView === 'landing') {
      viewHtml = LandingPage.render();
    } else if (activeView === 'assessment') {
      viewHtml = AssessmentView.render(
        currentTopic.diagnosticQuestions || [],
        this.ui.assessmentIndex,
        this.ui.assessmentAnswers,
        this.ui.isAssessmentFinished,
        this.state.masteryMap,
        currentTopic
      );
    } else if (activeView === 'dashboard') {
      const selectedConcept = this.ui.selectedConceptId 
        ? this.state.masteryMap[this.ui.selectedConceptId] 
        : null;
      viewHtml = DashboardView.render(this.state, currentTopic, learningPath, selectedConcept);
    }

    // Modal layers
    let modalHtml = '';
    if (this.ui.isOnboardingOpen) {
      modalHtml += OnboardingModal.render(this.state, this.ui.onboardingStep);
    }
    if (this.ui.isLessonOpen && this.ui.activeLessonActivity) {
      modalHtml += LessonModal.render(this.ui.activeLessonActivity, this.ui.lessonExerciseResult);
    }
    if (this.ui.infoModalType === 'science') {
      modalHtml += Modals.renderScienceModal();
    } else if (this.ui.infoModalType === 'privacy') {
      modalHtml += Modals.renderPrivacyTermsModal();
    } else if (this.ui.infoModalType === 'contact') {
      modalHtml += Modals.renderContactModal();
    }

    root.innerHTML = `
      ${Navigation.render(activeView, this.state.student.name)}
      ${viewHtml}
      ${modalHtml}
    `;

    this.postRender();
  }

  postRender() {
    // Scroll tutor messages to bottom if in tutor tab
    const msgStream = document.getElementById('tutor-messages-stream');
    if (msgStream) {
      msgStream.scrollTop = msgStream.scrollHeight;
    }
  }

  bindGlobalEvents() {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-action]');
      if (!target) return;

      const action = target.getAttribute('data-action');
      this.handleAction(action, target, e);
    });

    // Form submit for Tutor Chat
    document.addEventListener('submit', (e) => {
      if (e.target && e.target.id === 'tutor-chat-form') {
        e.preventDefault();
        const input = document.getElementById('tutor-user-input');
        if (input && input.value.trim()) {
          this.sendTutorMessage(input.value.trim());
          input.value = '';
        }
      }
    });

    // Short answer text input for Assessment
    document.addEventListener('input', (e) => {
      if (e.target && e.target.id === 'short-answer-input') {
        const val = e.target.value.trim();
        const currentQ = this.getCurrentTopic().diagnosticQuestions[this.ui.assessmentIndex];
        if (currentQ) {
          const isCorrect = (currentQ.correctAnswers || []).some(ans => ans.toLowerCase() === val.toLowerCase());
          this.ui.assessmentAnswers[currentQ.id] = {
            userText: val,
            isCorrect
          };
          const submitBtn = document.getElementById('btn-submit-assessment-step');
          if (submitBtn) {
            submitBtn.disabled = val.length === 0;
          }
        }
      }
    });
  }

  async handleAction(action, target, event) {
    switch (action) {
      // ---------------- NAVIGATION & VIEWS ----------------
      case 'nav-view': {
        const view = target.getAttribute('data-target');
        this.state.activeView = view;
        this.save();
        this.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      }

      case 'scroll-to': {
        event.preventDefault();
        const targetId = target.getAttribute('data-target');
        if (this.state.activeView !== 'landing') {
          this.state.activeView = 'landing';
          this.save();
          this.render();
        }
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
        break;
      }

      case 'toggle-mobile-menu': {
        const drawer = document.getElementById('mobile-nav-drawer');
        if (drawer) drawer.classList.toggle('open');
        break;
      }

      case 'close-mobile-menu': {
        const drawer = document.getElementById('mobile-nav-drawer');
        if (drawer) drawer.classList.remove('open');
        break;
      }

      case 'mobile-link': {
        event.preventDefault();
        const targetId = target.getAttribute('data-target');
        const drawer = document.getElementById('mobile-nav-drawer');
        if (drawer) drawer.classList.remove('open');
        if (this.state.activeView !== 'landing') {
          this.state.activeView = 'landing';
          this.save();
          this.render();
        }
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
        break;
      }

      case 'mobile-view': {
        const view = target.getAttribute('data-target');
        const drawer = document.getElementById('mobile-nav-drawer');
        if (drawer) drawer.classList.remove('open');
        this.state.activeView = view;
        this.save();
        this.render();
        break;
      }

      case 'mobile-science': {
        const drawer = document.getElementById('mobile-nav-drawer');
        if (drawer) drawer.classList.remove('open');
        this.ui.infoModalType = 'science';
        this.render();
        break;
      }

      // ---------------- ONBOARDING ----------------
      case 'start-onboarding': {
        this.ui.isOnboardingOpen = true;
        this.ui.onboardingStep = 1;
        const drawer = document.getElementById('mobile-nav-drawer');
        if (drawer) drawer.classList.remove('open');
        this.render();
        break;
      }

      case 'close-onboarding': {
        this.ui.isOnboardingOpen = false;
        this.render();
        break;
      }

      case 'onboarding-next': {
        const currentStep = parseInt(target.getAttribute('data-step'), 10);
        // If on step 2 and custom topic, read input
        if (currentStep === 2 && this.state.student.selectedSubjectId === 'custom') {
          const customInput = document.getElementById('custom-topic-input');
          if (customInput && customInput.value.trim()) {
            this.state.student.customTopicText = customInput.value.trim();
          }
        }
        this.ui.onboardingStep = Math.min(5, currentStep + 1);
        this.save();
        this.render();
        break;
      }

      case 'onboarding-prev': {
        const currentStep = parseInt(target.getAttribute('data-step'), 10);
        this.ui.onboardingStep = Math.max(1, currentStep - 1);
        this.render();
        break;
      }

      case 'select-subject': {
        const subjectId = target.getAttribute('data-id');
        this.state.student.selectedSubjectId = subjectId;
        if (subjectId !== 'custom') {
          const subject = CURRICULUM_DATA.subjects.find(s => s.id === subjectId);
          if (subject && subject.topics.length > 0) {
            this.state.student.selectedTopicId = subject.topics[0].id;
          }
        }
        this.save();
        this.render();
        break;
      }

      case 'select-topic': {
        const topicId = target.getAttribute('data-id');
        this.state.student.selectedTopicId = topicId;
        // Reinitialize mastery map for chosen topic
        const topic = this.getCurrentTopic();
        this.state.masteryMap = MasteryEngine.initializeMasteryMap(topic.concepts || []);
        this.save();
        this.render();
        break;
      }

      case 'select-goal': {
        this.state.student.currentGoal = target.getAttribute('data-id');
        this.save();
        this.render();
        break;
      }

      case 'select-confidence': {
        this.state.student.confidenceLevel = target.getAttribute('data-id');
        this.save();
        this.render();
        break;
      }

      case 'launch-diagnostic': {
        this.ui.isOnboardingOpen = false;
        this.ui.assessmentIndex = 0;
        this.ui.assessmentAnswers = {};
        this.ui.isAssessmentFinished = false;
        this.state.activeView = 'assessment';
        this.save();
        this.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      }

      // ---------------- DIAGNOSTIC ASSESSMENT ----------------
      case 'exit-assessment': {
        this.state.activeView = 'dashboard';
        this.save();
        this.render();
        break;
      }

      case 'select-assessment-option': {
        const optIdx = parseInt(target.getAttribute('data-option-index'), 10);
        const currentQ = this.getCurrentTopic().diagnosticQuestions[this.ui.assessmentIndex];
        if (currentQ) {
          const isCorrect = optIdx === currentQ.correctIndex;
          const misconception = !isCorrect && currentQ.misconceptionIfChosen 
            ? currentQ.misconceptionIfChosen[optIdx] 
            : null;

          this.ui.assessmentAnswers[currentQ.id] = {
            selectedOptionIndex: optIdx,
            isCorrect,
            misconception
          };

          // Enable next button
          const submitBtn = document.getElementById('btn-submit-assessment-step');
          if (submitBtn) submitBtn.disabled = false;

          this.render();
        }
        break;
      }

      case 'next-assessment-question': {
        const currIdx = parseInt(target.getAttribute('data-index'), 10);
        const questions = this.getCurrentTopic().diagnosticQuestions;
        const currentQ = questions[currIdx];

        // Process answer through MasteryEngine
        const record = this.ui.assessmentAnswers[currentQ.id];
        if (record && this.state.masteryMap[currentQ.conceptId]) {
          const updatedConcept = MasteryEngine.processAttempt(
            this.state.masteryMap[currentQ.conceptId],
            {
              isCorrect: record.isCorrect,
              difficulty: currentQ.difficulty,
              questionTitle: currentQ.title,
              misconceptionIdentified: record.misconception,
              isPractice: false
            }
          );
          this.state.masteryMap[currentQ.conceptId] = updatedConcept;
        }

        if (currIdx < questions.length - 1) {
          this.ui.assessmentIndex = currIdx + 1;
        } else {
          // Completed diagnostic
          this.ui.isAssessmentFinished = true;
          this.state.hasCompletedDiagnostic = true;
        }

        this.save();
        this.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      }

      case 'prev-assessment-question': {
        const currIdx = parseInt(target.getAttribute('data-index'), 10);
        if (currIdx > 0) {
          this.ui.assessmentIndex = currIdx - 1;
          this.render();
        }
        break;
      }

      case 'transition-to-dashboard': {
        this.state.activeView = 'dashboard';
        this.state.dashboardTab = 'overview';
        this.save();
        this.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      }

      // ---------------- DASHBOARD ----------------
      case 'dash-tab': {
        const tab = target.getAttribute('data-tab');
        this.state.dashboardTab = tab;
        this.save();
        this.render();
        break;
      }

      case 'inspect-concept': {
        const conceptId = target.getAttribute('data-concept-id');
        this.ui.selectedConceptId = conceptId;
        this.render();
        break;
      }

      case 'recalculate-path': {
        // Force refresh of learning path
        this.render();
        break;
      }

      // ---------------- INTERACTIVE ADAPTIVE SIMULATOR (LANDING) ----------------
      case 'sim-tab': {
        const concept = target.getAttribute('data-concept');
        this.ui.simActiveConcept = concept;
        this.ui.simSelectedIdx = null;
        this.renderSimQuestions();
        break;
      }

      case 'sim-option': {
        const idx = parseInt(target.getAttribute('data-idx'), 10);
        this.ui.simSelectedIdx = idx;
        this.handleSimOptionClick(idx);
        break;
      }
      case 'open-lesson': {
        const actId = target.getAttribute('data-activity-id');
        const path = this.getLearningPath();
        const activity = path.find(item => item.id === actId);
        if (activity) {
          this.ui.isLessonOpen = true;
          this.ui.activeLessonActivity = activity;
          this.ui.lessonExerciseResult = null;
          this.render();
        }
        break;
      }

      case 'close-lesson': {
        this.ui.isLessonOpen = false;
        this.ui.activeLessonActivity = null;
        this.ui.lessonExerciseResult = null;
        this.render();
        break;
      }

      case 'submit-lesson-exercise': {
        const idx = parseInt(target.getAttribute('data-idx'), 10);
        const activity = this.ui.activeLessonActivity;
        if (activity && activity.lesson && activity.lesson.practiceExercise) {
          const practiceQ = activity.lesson.practiceExercise;
          const isCorrect = idx === practiceQ.correctIndex;
          this.ui.lessonExerciseResult = {
            selectedIdx: idx,
            isCorrect
          };

          // Update concept mastery with positive practice reinforcement!
          if (this.state.masteryMap[activity.conceptId]) {
            const updated = MasteryEngine.processAttempt(
              this.state.masteryMap[activity.conceptId],
              {
                isCorrect,
                difficulty: 2,
                questionTitle: `Practice: ${practiceQ.question.substring(0, 30)}...`,
                isPractice: true
              }
            );
            this.state.masteryMap[activity.conceptId] = updated;
            this.save();
          }

          this.render();
        }
        break;
      }

      case 'complete-lesson-activity': {
        const actId = target.getAttribute('data-activity-id');
        if (!this.state.completedActivityIds.includes(actId)) {
          this.state.completedActivityIds.push(actId);
        }
        this.ui.isLessonOpen = false;
        this.ui.activeLessonActivity = null;
        this.ui.lessonExerciseResult = null;
        this.save();
        this.render();
        break;
      }

      // ---------------- AI TUTOR ----------------
      case 'send-tutor-quick': {
        const prompt = target.getAttribute('data-prompt');
        this.sendTutorMessage(prompt);
        break;
      }

      case 'clear-tutor-chat': {
        this.state.tutorMessages = [
          {
            id: 'msg-reset',
            sender: 'tutor',
            text: 'History cleared. How can I guide your conceptual understanding next?',
            timestamp: new Date().toISOString()
          }
        ];
        this.save();
        this.render();
        break;
      }

      // ---------------- SETTINGS & RESET ----------------
      case 'save-settings': {
        const nameInput = document.getElementById('settings-student-name');
        const styleInput = document.getElementById('settings-learning-style');
        const apiKeyInput = document.getElementById('settings-api-key');

        if (nameInput) this.state.student.name = nameInput.value.trim() || 'Student Learner';
        if (styleInput) this.state.preferences.learningStyle = styleInput.value;
        if (apiKeyInput) this.state.preferences.apiKey = apiKeyInput.value.trim();

        this.save();
        alert('Preferences saved successfully.');
        this.render();
        break;
      }

      case 'reset-demo': {
        const confirmReset = window.confirm('Reset all demonstration session data? This will clear your calibrated mastery and diagnostic responses.');
        if (confirmReset) {
          this.state = StorageService.resetState();
          this.ui = {
            isOnboardingOpen: false,
            onboardingStep: 1,
            isLessonOpen: false,
            activeLessonActivity: null,
            lessonExerciseResult: null,
            infoModalType: null,
            selectedConceptId: null,
            assessmentIndex: 0,
            assessmentAnswers: {},
            isAssessmentFinished: false,
            simActiveConcept: 'py-loops',
            simSelectedIdx: null
          };
          this.render();
        }
        break;
      }

      // ---------------- MODALS ----------------
      case 'open-science-modal': {
        this.ui.infoModalType = 'science';
        this.render();
        break;
      }

      case 'open-terms-modal': {
        this.ui.infoModalType = 'privacy';
        this.render();
        break;
      }

      case 'open-contact-modal': {
        this.ui.infoModalType = 'contact';
        this.render();
        break;
      }

      case 'close-info-modal': {
        this.ui.infoModalType = null;
        this.render();
        break;
      }
    }
  }

  renderSimQuestions() {
    const tabs = document.querySelectorAll('.demo-tab-btn');
    tabs.forEach(btn => {
      const c = btn.getAttribute('data-concept');
      if (c === this.ui.simActiveConcept) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const topicLabel = document.getElementById('sim-topic-label');
    const promptEl = document.getElementById('sim-question-prompt');
    const codeEl = document.getElementById('sim-code-block');
    const optionsContainer = document.getElementById('demo-options-list');
    const badgeEl = document.getElementById('demo-live-status-badge');
    const feedbackBody = document.getElementById('demo-feedback-body');
    const recBox = document.getElementById('demo-recommendation-box');

    if (!topicLabel || !promptEl || !codeEl || !optionsContainer) return;

    if (badgeEl) {
      badgeEl.className = 'badge badge-unassessed';
      badgeEl.textContent = 'Awaiting Answer';
    }
    if (feedbackBody) {
      feedbackBody.textContent = 'Select an option on the left to watch the adaptive engine evaluate your response at the concept level in real time.';
    }
    if (recBox) {
      recBox.style.display = 'none';
    }

    if (this.ui.simActiveConcept === 'py-loops') {
      topicLabel.textContent = 'Diagnostic Question • Python Loops';
      promptEl.textContent = 'Predict how many times the loop prints a value:';
      codeEl.textContent = `for i in range(2, 8, 2):\n    print(i)`;
      optionsContainer.innerHTML = `
        <button class="demo-option-btn" data-action="sim-option" data-idx="0">
          <strong>A.</strong>&nbsp; 3 times (values: 2, 4, 6)
        </button>
        <button class="demo-option-btn" data-action="sim-option" data-idx="1">
          <strong>B.</strong>&nbsp; 4 times (values: 2, 4, 6, 8)
        </button>
        <button class="demo-option-btn" data-action="sim-option" data-idx="2">
          <strong>C.</strong>&nbsp; 6 times (values: 2, 3, 4, 5, 6, 7)
        </button>
      `;
    } else if (this.ui.simActiveConcept === 'py-conditionals') {
      topicLabel.textContent = 'Diagnostic Question • Conditional Logic';
      promptEl.textContent = 'Which output will be printed by this ladder?';
      codeEl.textContent = `val = 15\nif val > 20:\n    print("A")\nelif val > 10:\n    print("B")\nelif val > 5:\n    print("C")`;
      optionsContainer.innerHTML = `
        <button class="demo-option-btn" data-action="sim-option" data-idx="0">
          <strong>A.</strong>&nbsp; B
        </button>
        <button class="demo-option-btn" data-action="sim-option" data-idx="1">
          <strong>B.</strong>&nbsp; Both B and C
        </button>
        <button class="demo-option-btn" data-action="sim-option" data-idx="2">
          <strong>C.</strong>&nbsp; C
        </button>
      `;
    } else if (this.ui.simActiveConcept === 'py-variables') {
      topicLabel.textContent = 'Diagnostic Question • Variable Binding';
      promptEl.textContent = 'What is the final printed value of y?';
      codeEl.textContent = `x = 10\ny = x\nx = 20\nprint(y)`;
      optionsContainer.innerHTML = `
        <button class="demo-option-btn" data-action="sim-option" data-idx="0">
          <strong>A.</strong>&nbsp; 10
        </button>
        <button class="demo-option-btn" data-action="sim-option" data-idx="1">
          <strong>B.</strong>&nbsp; 20
        </button>
        <button class="demo-option-btn" data-action="sim-option" data-idx="2">
          <strong>C.</strong>&nbsp; None
        </button>
      `;
    }
  }

  handleSimOptionClick(idx) {
    const badgeEl = document.getElementById('demo-live-status-badge');
    const feedbackBody = document.getElementById('demo-feedback-body');
    const recBox = document.getElementById('demo-recommendation-box');
    const recTitle = document.getElementById('demo-rec-title');
    const recDesc = document.getElementById('demo-rec-desc');
    const options = document.querySelectorAll('.demo-option-btn');

    options.forEach((btn, i) => {
      btn.classList.remove('selected-correct', 'selected-incorrect');
      if (i === idx) {
        if (idx === 0) {
          btn.classList.add('selected-correct');
        } else {
          btn.classList.add('selected-incorrect');
        }
      }
    });

    if (this.ui.simActiveConcept === 'py-loops') {
      if (idx === 0) {
        badgeEl.className = 'badge badge-strong';
        badgeEl.textContent = 'Demonstrated Understanding (84%)';
        feedbackBody.innerHTML = `<strong>Correct:</strong> You correctly identified that <code>range(2, 8, 2)</code> produces [2, 4, 6]. The boundary <code>8</code> is excluded because Python ranges are half-open intervals <code>[start, stop)</code>. Concept estimate updated from 50% to <strong>84%</strong>.`;
        if (recBox) {
          recBox.style.display = 'block';
          recTitle.textContent = 'Challenge Drill: Nested Loop Complexity';
          recDesc.textContent = 'Because loop boundaries are firm, test two-dimensional matrix traversals.';
        }
      } else if (idx === 1) {
        badgeEl.className = 'badge badge-attention';
        badgeEl.textContent = 'Misconception Flagged (38%)';
        feedbackBody.innerHTML = `<strong>Identified Misconception:</strong> You assumed the upper stop bound <code>8</code> was inclusive. In Python, ranges stop strictly <em>before</em> reaching the stop value. Mastery estimate lowered to <strong>38%</strong>.`;
        if (recBox) {
          recBox.style.display = 'block';
          recTitle.textContent = 'Remedial Lesson: The Half-Open Range Boundary';
          recDesc.textContent = 'Targeted 4-minute visual drill illustrating why stop - start = iterations.';
        }
      } else {
        badgeEl.className = 'badge badge-attention';
        badgeEl.textContent = 'Misconception Flagged (32%)';
        feedbackBody.innerHTML = `<strong>Identified Misconception:</strong> You counted consecutive integers, overlooking the step argument <code>2</code>. Mastery estimate lowered to <strong>32%</strong>.`;
        if (recBox) {
          recBox.style.display = 'block';
          recTitle.textContent = 'Remedial Lesson: Step Arguments in Range Iteration';
          recDesc.textContent = 'Step-by-step trace of index increments across iterative jumps.';
        }
      }
    } else if (this.ui.simActiveConcept === 'py-conditionals') {
      if (idx === 0) {
        badgeEl.className = 'badge badge-strong';
        badgeEl.textContent = 'Demonstrated Understanding (88%)';
        feedbackBody.innerHTML = `<strong>Correct:</strong> The first condition <code>val > 10</code> evaluates to True, so "B" prints and the ladder terminates. Mastery increased to <strong>88%</strong>.`;
        if (recBox) {
          recBox.style.display = 'block';
          recTitle.textContent = 'Next Step: Logical Operators (and/or precedence)';
          recDesc.textContent = 'Moving forward to compound conditional expressions.';
        }
      } else {
        badgeEl.className = 'badge badge-attention';
        badgeEl.textContent = 'Misconception Flagged (40%)';
        feedbackBody.innerHTML = `<strong>Identified Misconception:</strong> In Python, <code>if-elif</code> statements are mutually exclusive. Only the <em>first</em> matching condition executes. Remaining branches are skipped.`;
        if (recBox) {
          recBox.style.display = 'block';
          recTitle.textContent = 'Targeted Lesson: Control Flow Termination in Branching';
          recDesc.textContent = 'Tracing the single execution branch contract of if-elif ladders.';
        }
      }
    } else if (this.ui.simActiveConcept === 'py-variables') {
      if (idx === 0) {
        badgeEl.className = 'badge badge-strong';
        badgeEl.textContent = 'Demonstrated Understanding (90%)';
        feedbackBody.innerHTML = `<strong>Correct:</strong> When <code>y = x</code> was executed, <code>y</code> was assigned value 10. Reassigning <code>x = 20</code> does not affect <code>y</code>.`;
        if (recBox) {
          recBox.style.display = 'block';
          recTitle.textContent = 'Next Step: Mutable vs Immutable References';
          recDesc.textContent = 'Exploring how lists and objects behave under assignment.';
        }
      } else {
        badgeEl.className = 'badge badge-attention';
        badgeEl.textContent = 'Misconception Flagged (45%)';
        feedbackBody.innerHTML = `<strong>Identified Misconception:</strong> Thinking variables create permanent formulaic links like spreadsheet cells. In Python, assignment takes a snapshot of the evaluated value.`;
        if (recBox) {
          recBox.style.display = 'block';
          recTitle.textContent = 'Targeted Lesson: Memory Binding vs Mathematical Equations';
          recDesc.textContent = 'Visual box-and-pointer diagram of Python assignment semantics.';
        }
      }
    }
  }

  async sendTutorMessage(userText) {
    // Append user message
    this.state.tutorMessages.push({
      id: `msg-u-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toISOString()
    });
    this.save();
    this.render();

    // Query TutorEngine
    const response = await TutorEngine.getResponse(userText, {
      topic: this.getCurrentTopic(),
      masteryMap: this.state.masteryMap,
      userPreferences: this.state.preferences,
      apiKey: this.state.preferences.apiKey
    });

    this.state.tutorMessages.push({
      id: `msg-t-${Date.now()}`,
      sender: 'tutor',
      text: response.text,
      timestamp: new Date().toISOString()
    });
    this.save();
    this.render();
  }
}

// Global bootstrap
document.addEventListener('DOMContentLoaded', () => {
  window.app = new MindtraceApp();
});
