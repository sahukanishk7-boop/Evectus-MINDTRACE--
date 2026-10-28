/**
 * MINDTRACE PERSONALIZED LEARNING PATH GENERATOR
 * Dynamically synthesizes an optimal, prerequisite-aware sequence of lessons
 * and practice drills based on student diagnostic gaps and stated learning objectives.
 */

import { MASTERY_STATES } from './masteryEngine.js';

export const PathGenerator = {
  /**
   * Generate an ordered list of learning steps tailored to student gaps and goal
   * @param {Object} topic - Current topic from curriculum
   * @param {Object} masteryMap - Current concept mastery records
   * @param {string} learningGoal - Stated student objective
   * @param {Array} completedActivityIds - IDs of already completed lessons
   */
  generatePath(topic, masteryMap, learningGoal = 'Understand the basics', completedActivityIds = []) {
    if (!topic || !topic.concepts) return [];

    const pathItems = [];
    const concepts = [...topic.concepts].sort((a, b) => a.order - b.order);

    // 1. Identify critical prerequisite gaps first
    const weakConcepts = concepts.filter(c => {
      const state = masteryMap[c.id];
      return state && (state.status === MASTERY_STATES.NEEDS_ATTENTION || state.confirmedGap);
    });

    const developingConcepts = concepts.filter(c => {
      const state = masteryMap[c.id];
      return state && state.status === MASTERY_STATES.DEVELOPING;
    });

    const unassessedConcepts = concepts.filter(c => {
      const state = masteryMap[c.id];
      return !state || state.status === MASTERY_STATES.NOT_ASSESSED;
    });

    const strongConcepts = concepts.filter(c => {
      const state = masteryMap[c.id];
      return state && state.status === MASTERY_STATES.STRONG;
    });

    // Priority Order 1: Foundation Gaps that block downstream learning
    weakConcepts.forEach(concept => {
      const isCompleted = completedActivityIds.includes(`act-${concept.id}`);
      const state = masteryMap[concept.id];
      pathItems.push({
        id: `act-${concept.id}`,
        conceptId: concept.id,
        conceptName: concept.name,
        title: concept.lesson?.title || `Mastering ${concept.name}`,
        duration: concept.lesson?.duration || '5 min lesson',
        objective: concept.lesson?.objective || `Eliminate misconception and rebuild ${concept.name}.`,
        priority: 'High Priority (Gap)',
        priorityType: 'urgent',
        reason: state?.causalExplanation || 'Identified as a critical knowledge gap during diagnostic assessment.',
        isCompleted,
        lesson: concept.lesson,
        category: concept.category
      });
    });

    // Priority Order 2: Developing Concepts that need reinforcement
    developingConcepts.forEach(concept => {
      const isCompleted = completedActivityIds.includes(`act-${concept.id}`);
      const state = masteryMap[concept.id];
      pathItems.push({
        id: `act-${concept.id}`,
        conceptId: concept.id,
        conceptName: concept.name,
        title: concept.lesson?.title || `Deepening ${concept.name}`,
        duration: concept.lesson?.duration || '6 min practice',
        objective: concept.lesson?.objective || `Strengthen fluency and boundary edge-cases in ${concept.name}.`,
        priority: 'Medium Priority',
        priorityType: 'medium',
        reason: `Mastery is developing (${state?.score || 50}%). Targeted practice will push understanding to strong.`,
        isCompleted,
        lesson: concept.lesson,
        category: concept.category
      });
    });

    // Priority Order 3: Unassessed or Advanced concepts once foundations are established
    unassessedConcepts.forEach(concept => {
      const isCompleted = completedActivityIds.includes(`act-${concept.id}`);
      pathItems.push({
        id: `act-${concept.id}`,
        conceptId: concept.id,
        conceptName: concept.name,
        title: concept.lesson?.title || `Explore ${concept.name}`,
        duration: concept.lesson?.duration || '7 min study',
        objective: concept.lesson?.objective || `Introduce core principles of ${concept.name}.`,
        priority: 'Next Concept',
        priorityType: 'normal',
        reason: 'Foundation ready. Move forward to expand your conceptual coverage.',
        isCompleted,
        lesson: concept.lesson,
        category: concept.category
      });
    });

    // Priority Order 4: Mastered concepts (placed at the bottom for quick review or reassessment)
    strongConcepts.forEach(concept => {
      const isCompleted = completedActivityIds.includes(`act-${concept.id}`);
      pathItems.push({
        id: `act-${concept.id}`,
        conceptId: concept.id,
        conceptName: concept.name,
        title: concept.lesson?.title || `Review ${concept.name}`,
        duration: '3 min quick drill',
        objective: `Maintain mastery and test tricky variations in ${concept.name}.`,
        priority: 'Mastered',
        priorityType: 'mastered',
        reason: `Solidified at ${masteryMap[concept.id]?.score || 85}%. Optional review available.`,
        isCompleted: true,
        lesson: concept.lesson,
        category: concept.category
      });
    });

    // Mark current active activity
    let foundFirstActive = false;
    return pathItems.map(item => {
      if (!item.isCompleted && !foundFirstActive) {
        foundFirstActive = true;
        return { ...item, isCurrent: true };
      }
      return { ...item, isCurrent: false };
    });
  }
};
