# MINDTRACE
### *Know what you know. Learn what you don't.*

An AI-powered adaptive learning platform designed around one central conviction:
> **"Education should adapt to the student, not force every student to adapt to the same system."**

---

## 🏛️ Design Concept & Academic Aesthetics

- **Visual Mood:** Editorial, research-inspired, modern academic aesthetic. Calm, structured, highly legible, and intellectually serious.
- **Color Palette:**
  - Deep Forest Green (`#173F35`) — Dominant brand color representing focus and academic rigor.
  - Warm Ivory (`#F7F5EF`) — Comfortable, paper-like background that prevents eye fatigue.
  - Soft White (`#FFFFFF`) — High-contrast container surface.
  - Muted Sage (`#DCE7DC`) — Subtle accents, satisfied prerequisites, and supporting badges.
  - Terracotta Accent (`#C96F4A`) — Controlled focal color highlighting misconceptions and urgent next steps.
  - Primary Text (`#202820`) & Secondary Text (`#626B63`).
- **Typography:**
  - Headings: **Manrope** (Google Fonts) with strong weight contrast.
  - Body: **DM Sans** (Google Fonts) calibrated for reading comfort (line-height 1.62).
  - Monospace: **JetBrains Mono** for code execution traces.
- **Layout:** Asymmetric, editorial spacing, 8px grid baseline, zero generic SaaS blue, zero decorative blobs or neon glows.

---

## 🚀 How to Run

Because the application is built using modern ES modules with zero heavy dependencies, you can start it immediately with Python:

```powershell
cd C:\Users\sahuk\.gemini\antigravity\scratch\mindtrace
python -m http.server 8080
```
Then open your browser at:
`http://localhost:8080`

Alternatively, you can run `.\start-server.ps1` in PowerShell.

---

## 🧩 Product Architecture

```
mindtrace/
├── index.html                   # Semantic entry point with accessibility & fonts
├── start-server.ps1             # Windows launch script
├── README.md                    # Platform documentation
├── src/
│   ├── app.js                   # Central reactive controller & event dispatcher
│   ├── config/
│   │   └── brand.js             # Brand configuration (name, taglines, palette)
│   ├── data/
│   │   └── curriculum.js        # Knowledge graphs, question banks & lessons
│   ├── services/
│   │   ├── masteryEngine.js     # Bayesian Knowledge Tracing & gap detection
│   │   ├── pathGenerator.js     # Prerequisite-aware path synthesizer
│   │   ├── tutorEngine.js       # Socratic conversational tutor (Local + Gemini API)
│   │   └── storage.js           # Versioned localStorage persistence & reset
│   ├── components/
│   │   ├── Navigation.js        # Responsive navbar & mobile drawer
│   │   ├── LandingPage.js       # Public marketing experience & live simulator
│   │   ├── OnboardingModal.js   # 5-step calibration & diagnostic setup
│   │   ├── AssessmentView.js    # Multi-format diagnostic testing & report
│   │   ├── DashboardView.js     # Student learning dashboard (7 tabs)
│   │   ├── LessonModal.js       # Interactive micro-lessons & practice drills
│   │   ├── Modals.js            # Learning science, privacy & terms modals
│   │   └── icons.js             # Lucide SVG icon library (never emoji)
│   └── styles/
│       └── main.css             # Complete design system & responsive styling
```

---

## 🌟 Key Features & Verification

1. **Public Marketing Website**:
   - Asymmetric Hero with genuine knowledge graph snapshot.
   - Editorial 3-part Problem section.
   - 4-Stage visual timeline (Assess -> Diagnose -> Personalize -> Adapt).
   - Live Interactive Adaptive Learning Simulator with 3 switchable concepts.
   - Educator Misconception Heatmap preview.
2. **5-Step Onboarding**:
   - Subject & topic selection (Computer Science, Math, Physics, English, Business, Custom).
   - Learning goal and confidence calibration.
3. **Adaptive Diagnostic Engine**:
   - Multi-format questions (Multiple choice, Code output prediction, True/False, Short answer).
   - Real-time concept mastery updates and distractor misconception identification.
4. **Personalized Learning Path**:
   - Prioritizes foundational prerequisite gaps before higher-order lessons.
   - Recalculates dynamically when lessons and practice drills are completed.
5. **Interactive Concept Knowledge Map**:
   - Interactive SVG topological graph with clickable nodes and Concept Inspector drawer.
6. **Socratic AI Tutor**:
   - Contextual dialogue with 5 quick action pills ("Explain more simply", "Show me an example", "Why was my answer incorrect?", "Give me a practice question", "Test me again").
   - Transparent engine indicator with optional Gemini API integration.
7. **Complete Persistence & Reset**:
   - Safe `localStorage` persistence under `MINDTRACE_STATE_V1` with full reset button.
