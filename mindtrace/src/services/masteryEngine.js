/**
 * MINDTRACE ADAPTIVE KNOWLEDGE TRACING & MASTERY ENGINE
 * Transparent Bayesian-inspired knowledge modeling that updates concept mastery
 * based on question difficulty, misconception tags, prerequisite graphs, and accumulated evidence.
 */

export const MASTERY_STATES = {
  NOT_ASSESSED: 'not_assessed',
  NEEDS_ATTENTION: 'needs_attention',
  DEVELOPING: 'developing',
  STRONG: 'strong'
};

export const MasteryEngine = {
  /**
   * Determine categorical status from numeric mastery score (0-100) and evidence
   */
  getStatus(score, evidenceCount = 0) {
    if (evidenceCount === 0 || score === null || score === undefined) {
      return MASTERY_STATES.NOT_ASSESSED;
    }
    if (score >= 80) return MASTERY_STATES.STRONG;
    if (score >= 50) return MASTERY_STATES.DEVELOPING;
    return MASTERY_STATES.NEEDS_ATTENTION;
  },

  /**
   * Get human-friendly label and color styling tokens for a mastery status
   */
  getStatusMeta(status) {
    switch (status) {
      case MASTERY_STATES.STRONG:
        return { label: 'Strong Understanding', class: 'badge-strong', color: '#194d38' };
      case MASTERY_STATES.DEVELOPING:
        return { label: 'Developing Understanding', class: 'badge-developing', color: '#78530a' };
      case MASTERY_STATES.NEEDS_ATTENTION:
        return { label: 'Needs Attention', class: 'badge-attention', color: '#963820' };
      default:
        return { label: 'Not Assessed', class: 'badge-unassessed', color: '#48524a' };
    }
  },

  /**
   * Initialize a fresh mastery map for all concepts in a topic
   */
  initializeMasteryMap(concepts, initialConfidenceScore = 50) {
    const map = {};
    concepts.forEach(concept => {
      map[concept.id] = {
        conceptId: concept.id,
        name: concept.name,
        category: concept.category,
        prerequisites: concept.prerequisites || [],
        score: initialConfidenceScore, // baseline prior
        evidenceCount: 0,
        status: MASTERY_STATES.NOT_ASSESSED,
        confirmedGap: false,
        possibleGap: false,
        misconceptionsLogged: [],
        attempts: [],
        lastUpdated: null,
        causalExplanation: 'Awaiting initial diagnostic evaluation.'
      };
    });
    return map;
  },

  /**
   * Update mastery for a concept following an answer attempt
   */
  processAttempt(currentConceptState, {
    isCorrect,
    difficulty = 2,
    questionTitle = '',
    misconceptionIdentified = null,
    isPractice = false
  }) {
    const state = { ...currentConceptState };
    const prevScore = state.score !== null ? state.score : 50;
    const evidence = (state.evidenceCount || 0) + 1;
    
    // Weight calculation: Higher difficulty questions give greater positive gains;
    // Lower difficulty mistakes inflict stronger penalty because fundamentals were missed.
    const difficultyFactor = difficulty === 1 ? 0.8 : difficulty === 2 ? 1.0 : 1.25;
    
    // Damping factor: Early evidence shifts the score more; established scores resist wild swings
    const damping = Math.max(0.35, 1 / Math.sqrt(evidence));

    let delta = 0;
    if (isCorrect) {
      // Correct answer increases mastery
      const gain = 22 * difficultyFactor * damping;
      delta = isPractice ? gain * 1.2 : gain;
      state.confirmedGap = false;
      // If previously had a possible gap, reduce concern
      state.possibleGap = false;
    } else {
      // Incorrect answer decreases mastery
      const lossMultiplier = difficulty === 1 ? 1.3 : 1.0;
      const penalty = 26 * lossMultiplier * damping;
      delta = -penalty;
      
      if (misconceptionIdentified) {
        state.misconceptionsLogged.push(misconceptionIdentified);
      }
      
      if (evidence >= 2 && delta < 0) {
        state.confirmedGap = true;
      } else {
        state.possibleGap = true;
      }
    }

    const newScore = Math.max(8, Math.min(96, Math.round(prevScore + delta)));
    state.score = newScore;
    state.evidenceCount = evidence;
    state.status = this.getStatus(newScore, evidence);
    state.lastUpdated = new Date().toISOString();

    state.attempts.push({
      timestamp: new Date().toISOString(),
      isCorrect,
      difficulty,
      questionTitle,
      delta: Math.round(delta),
      scoreAfter: newScore
    });

    // Formulate transparent, causal diagnostic explanation
    state.causalExplanation = this.generateExplanation(state, isCorrect, misconceptionIdentified);

    return state;
  },

  /**
   * Generate human-readable explanation of why this concept stands in its current state
   */
  generateExplanation(conceptState, lastCorrect, misconception) {
    const { name, score, status, evidenceCount, misconceptionsLogged } = conceptState;
    
    if (evidenceCount === 0) {
      return `${name} has not yet been evaluated by diagnostic assessment.`;
    }

    if (status === MASTERY_STATES.STRONG) {
      return `${name} demonstrates solid comprehension (${score}%). Demonstrated ability to trace execution flow and apply rules reliably.`;
    }

    if (misconception) {
      return `${name} needs attention because of an identified misconception: "${misconception}". Targeted review will rebuild this mental model.`;
    }

    if (misconceptionsLogged.length > 0) {
      return `${name} exhibits recurring friction with ${misconceptionsLogged[misconceptionsLogged.length - 1]}.`;
    }

    if (status === MASTERY_STATES.NEEDS_ATTENTION) {
      return `${name} is currently flagged as a knowledge gap (${score}%). Fundamental boundary conditions or syntax rules were missed during evaluation.`;
    }

    return `${name} is developing (${score}%). Baseline mechanics are recognized, but deeper application requires reinforcing practice.`;
  },

  /**
   * Check prerequisite gaps across the knowledge graph
   */
  detectPrerequisiteGaps(masteryMap) {
    const issues = [];
    
    Object.values(masteryMap).forEach(concept => {
      if (concept.status === MASTERY_STATES.NEEDS_ATTENTION || concept.status === MASTERY_STATES.DEVELOPING) {
        // Inspect prerequisites
        const missingPrereqs = (concept.prerequisites || []).filter(preId => {
          const preConcept = masteryMap[preId];
          return preConcept && preConcept.status !== MASTERY_STATES.STRONG;
        });

        if (missingPrereqs.length > 0) {
          const prereqNames = missingPrereqs.map(pId => masteryMap[pId]?.name || pId).join(', ');
          issues.push({
            blockedConceptId: concept.conceptId,
            blockedConceptName: concept.name,
            missingPrerequisites: missingPrereqs,
            explanation: `${concept.name} may be difficult to solidify until prerequisite foundation (${prereqNames}) is fully mastered.`
          });
        }
      }
    });

    return issues;
  }
};
