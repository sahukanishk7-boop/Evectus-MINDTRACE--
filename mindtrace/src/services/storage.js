/**
 * MINDTRACE LOCAL PERSISTENCE & STATE SERVICE
 * Robust schema-versioned client-side persistence with guest session management and reset support.
 */

import { CURRICULUM_DATA } from '../data/curriculum.js';
import { MasteryEngine } from './masteryEngine.js';

const STORAGE_KEY = 'MINDTRACE_STATE_V1';

export const StorageService = {
  /**
   * Produce the default fresh guest state
   */
  getDefaultState() {
    const defaultSubject = CURRICULUM_DATA.subjects[0];
    const defaultTopic = defaultSubject.topics[0];
    const initialMastery = MasteryEngine.initializeMasteryMap(defaultTopic.concepts);

    return {
      version: '1.0.0',
      activeView: 'landing', // 'landing' | 'assessment' | 'dashboard'
      dashboardTab: 'overview', // 'overview' | 'path' | 'map' | 'assessments' | 'tutor' | 'progress' | 'settings'
      
      // Student Profile
      student: {
        id: 'guest_learner_01',
        name: 'Alex Rivera',
        role: 'Student Learner',
        currentGoal: 'Prepare for an examination',
        confidenceLevel: 'I understand some parts',
        selectedSubjectId: defaultSubject.id,
        selectedTopicId: defaultTopic.id,
        customTopicText: ''
      },

      // Learning State
      masteryMap: initialMastery,
      completedActivityIds: [],
      assessmentAttempts: [],
      hasCompletedDiagnostic: false,

      // Tutor state
      tutorMessages: [
        {
          id: 'msg-init-1',
          sender: 'tutor',
          text: 'Welcome to **Mindtrace**. I am your personal Socratic tutor. As you complete diagnostic checks and practice exercises, I map your conceptual strengths and help you bridge gaps step-by-step.\n\nTake the diagnostic assessment whenever you are ready, or ask me any question about your topic!',
          timestamp: new Date().toISOString()
        }
      ],

      // User Preferences
      preferences: {
        learningStyle: 'intuitive', // 'intuitive' | 'rigorous' | 'practical'
        dailyTargetMinutes: 25,
        reducedMotion: false,
        apiKey: '' // Optional user-provided API key for Gemini / external AI
      }
    };
  },

  /**
   * Load state from localStorage with graceful fallback
   */
  loadState() {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (!serialized) {
        return this.getDefaultState();
      }
      const parsed = JSON.parse(serialized);
      // Migration / schema check
      if (parsed.version !== '1.0.0') {
        console.warn('Mindtrace: State version mismatch, reinitializing state.');
        return this.getDefaultState();
      }
      return parsed;
    } catch (err) {
      console.error('Failed to load state from localStorage:', err);
      return this.getDefaultState();
    }
  },

  /**
   * Save current state to localStorage
   */
  saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.error('Failed to persist state to localStorage:', err);
    }
  },

  /**
   * Clear all persisted data and reload initial fresh state
   */
  resetState() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Failed to reset localStorage:', err);
    }
    return this.getDefaultState();
  }
};
