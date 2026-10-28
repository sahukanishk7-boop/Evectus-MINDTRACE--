/**
 * MINDTRACE SOCRATIC AI TUTOR ENGINE
 * Context-aware pedagogical conversational tutor.
 * Supports both high-fidelity offline Socratic engine and pluggable real AI API integration.
 */

export const TutorEngine = {
  /**
   * Generate an intelligent, context-aware tutor response
   * @param {string} userMessage - Prompt or quick action sent by the student
   * @param {Object} context - { topic, masteryMap, activeLesson, userPreferences, recentMistakes, apiKey }
   */
  async getResponse(userMessage, context = {}) {
    const { topic, masteryMap = {}, activeLesson, userPreferences = {}, apiKey } = context;
    const cleanMsg = (userMessage || '').trim().toLowerCase();

    // If real API key is configured in user settings, attempt to query external provider
    if (apiKey && apiKey.trim().length > 5) {
      try {
        return await this.queryExternalAI(userMessage, context);
      } catch (err) {
        console.warn('External AI call failed, falling back to local pedagogical engine:', err);
        // Fall through to local pedagogical engine with notice
      }
    }

    // High quality local Socratic response engine
    return this.generateLocalSocraticResponse(cleanMsg, context);
  },

  /**
   * Local pedagogical rule & context-based Socratic synthesis
   */
  generateLocalSocraticResponse(cleanMsg, context) {
    const { topic, masteryMap = {}, activeLesson } = context;
    const currentTopicName = topic?.name || 'Python Fundamentals';

    // Find weakest concept to provide targeted assistance
    const weakConcept = Object.values(masteryMap).find(c => c.status === 'needs_attention') ||
                        Object.values(masteryMap).find(c => c.status === 'developing');

    // Quick Action 1: "Explain more simply"
    if (cleanMsg.includes('more simply') || cleanMsg.includes('simple') || cleanMsg.includes('eli5')) {
      if (activeLesson) {
        return {
          source: 'local-pedagogical',
          text: `Let's strip away all the technical jargon for **${activeLesson.title}**:\n\nImagine you are packing boxes with labels. When you write a label, it only tells you where to find the box later. You aren't creating a magical clone of the box; you're just pointing a finger at it.\n\nDoes thinking about it as a labeled box in a warehouse feel clearer, or would you like to see how it moves step by step?`,
          suggestions: ['Show me a code example', 'Give me a quick question', 'Why was my answer incorrect?']
        };
      }
      return {
        source: 'local-pedagogical',
        text: `Here is the simplest way to think about **${weakConcept?.name || currentTopicName}**:\n\nIn computer science, instructions execute strictly one line at a time from top to bottom unless a control flow statement specifically tells the interpreter to jump or repeat.\n\nWhat specific part feels murky right now?`,
        suggestions: ['Show me an example', 'Test me again', 'Explain loops']
      };
    }

    // Quick Action 2: "Show me an example" / code sample
    if (cleanMsg.includes('example') || cleanMsg.includes('code example') || cleanMsg.includes('snippet')) {
      if (weakConcept?.conceptId === 'py-loops' || cleanMsg.includes('loop')) {
        return {
          source: 'local-pedagogical',
          text: `Here is a clear, minimal example of a Python loop counting even numbers:\n\n\`\`\`python\n# Notice the step parameter: range(start, stop, step)\nfor num in range(2, 9, 2):\n    print(f"Current even number: {num}")\n\`\`\`\n\n**Output:**\n\`\`\`text\nCurrent even number: 2\nCurrent even number: 4\nCurrent even number: 6\nCurrent even number: 8\n\`\`\`\n\nNotice how \`9\` is never printed because \`range\` stops strictly before reaching the upper boundary. Try predicting: what would happen if the step was changed to 3?`,
          suggestions: ['Explain more simply', 'Give me a practice question', 'Test me again']
        };
      }
      return {
        source: 'local-pedagogical',
        text: `Here is a practical example demonstrating variable assignment and mutation:\n\n\`\`\`python\nbank_balance = 100\ndeposit = 50\nbank_balance = bank_balance + deposit\nprint(bank_balance)  # 150\n\`\`\`\n\nNotice that \`bank_balance\` only updates because we explicitly reassigned it to the evaluated total on the right-hand side.`,
        suggestions: ['Give me a practice question', 'Explain more simply', 'Why was my answer incorrect?']
      };
    }

    // Quick Action 3: "Why was my answer incorrect?"
    if (cleanMsg.includes('incorrect') || cleanMsg.includes('wrong') || cleanMsg.includes('mistake') || cleanMsg.includes('why')) {
      if (weakConcept && weakConcept.misconceptionsLogged && weakConcept.misconceptionsLogged.length > 0) {
        const misconception = weakConcept.misconceptionsLogged[weakConcept.misconceptionsLogged.length - 1];
        return {
          source: 'local-pedagogical',
          text: `In your recent diagnostic assessment on **${weakConcept.name}**, your answer suggested: *"${misconception}"*.\n\nThis is one of the most common stumbling blocks! The key distinction is that Python evaluates conditions and assignments mechanically without assuming human context. Would you like a targeted micro-drill to permanently clear this up?`,
          suggestions: ['Yes, give me a practice question', 'Explain more simply', 'Show me an example']
        };
      }
      return {
        source: 'local-pedagogical',
        text: `When answers fall short in programming assessments, it is rarely a memory failure; it is usually a mismatch between your mental model and how the language evaluates expressions.\n\nTell me which question felt surprising, and we can step through the execution frame together line by line.`,
        suggestions: ['Show me an example', 'Test me again', 'Explain more simply']
      };
    }

    // Quick Action 4: "Give me a practice question" / "Test me again"
    if (cleanMsg.includes('practice question') || cleanMsg.includes('test me') || cleanMsg.includes('quiz')) {
      return {
        source: 'local-pedagogical',
        text: `Here is a quick check to test your understanding:\n\n\`\`\`python\nx = 10\nif x % 2 == 0:\n    y = "Even"\nelse:\n    y = "Odd"\nprint(y)\n\`\`\`\n\nWhat will be printed to the screen? Reply with your answer or your reasoning!`,
        suggestions: ['Even', 'Odd', 'Explain how % works']
      };
    }

    // Default intelligent conversational response
    return {
      source: 'local-pedagogical',
      text: `I'm analyzing your progress in **${currentTopicName}**. Based on your diagnostic profile, your strongest area is foundation syntax, while **${weakConcept?.name || 'Loops & Conditionals'}** would benefit from targeted review.\n\nHow can I help you right now? We can explore an intuitive mental model, walk through code examples, or practice targeted questions.`,
      suggestions: [
        'Explain more simply',
        'Show me an example',
        'Give me a practice question',
        'Why was my answer incorrect?'
      ]
    };
  },

  /**
   * External AI Provider stub (Gemini / standard LLM endpoint)
   */
  async queryExternalAI(prompt, context) {
    // If configured with Gemini API Key
    const apiKey = context.apiKey;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const systemPrompt = `You are Mindtrace Socratic AI Tutor. You are helping a student in ${context.topic?.name || 'computer science'}.
Current student mastery state: ${JSON.stringify(context.masteryMap || {})}.
Student's preferred learning style: ${context.userPreferences?.style || 'Intuitive'}.
Always be encouraging, pedagogical, Socratic, concise, and academic. Never simply give direct answers; guide with questions and mental models.`;

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nStudent question: ${prompt}` }]
        }
      ]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';

    return {
      source: 'gemini-live',
      text: candidateText,
      suggestions: ['Explain more simply', 'Show me an example', 'Give me a practice question']
    };
  }
};
