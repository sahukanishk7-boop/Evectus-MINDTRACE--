/**
 * MINDTRACE SVG Icon Library (Lucide style)
 * Zero external font/emoji dependencies, accessible and performant.
 */

function createSvg(content, { size = 20, className = '', strokeWidth = 2, viewBox = '0 0 24 24' } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon ${className}">${content}</svg>`;
}

export const Icons = {
  // Brand Logo Mark: Intersecting concept nodes / neural trace
  Logo: (opts = {}) => createSvg(`
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
    <path d="M12 3v6"/>
    <path d="M12 15v6"/>
    <path d="M4.93 4.93l4.24 4.24"/>
    <path d="M14.83 14.83l4.24 4.24"/>
    <circle cx="12" cy="3" r="1.5"/>
    <circle cx="12" cy="21" r="1.5"/>
    <circle cx="4.93" cy="4.93" r="1.5"/>
    <circle cx="19.07" cy="19.07" r="1.5"/>
  `, { size: 24, ...opts }),

  Brain: (opts = {}) => createSvg(`
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04"/>
  `, opts),

  Compass: (opts = {}) => createSvg(`
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  `, opts),

  Target: (opts = {}) => createSvg(`
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  `, opts),

  CheckCircle: (opts = {}) => createSvg(`
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  `, opts),

  AlertCircle: (opts = {}) => createSvg(`
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  `, opts),

  AlertTriangle: (opts = {}) => createSvg(`
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  `, opts),

  ArrowRight: (opts = {}) => createSvg(`
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  `, opts),

  ChevronRight: (opts = {}) => createSvg(`
    <polyline points="9 18 15 12 9 6"/>
  `, opts),

  ChevronLeft: (opts = {}) => createSvg(`
    <polyline points="15 18 9 12 15 6"/>
  `, opts),

  BookOpen: (opts = {}) => createSvg(`
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  `, opts),

  Layers: (opts = {}) => createSvg(`
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  `, opts),

  Network: (opts = {}) => createSvg(`
    <rect x="16" y="16" width="6" height="6" rx="1"/>
    <rect x="2" y="16" width="6" height="6" rx="1"/>
    <rect x="9" y="2" width="6" height="6" rx="1"/>
    <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/>
    <path d="M12 12V8"/>
  `, opts),

  Sparkles: (opts = {}) => createSvg(`
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/>
    <path d="M19 17v4"/>
    <path d="M3 5h4"/>
    <path d="M17 19h4"/>
  `, opts),

  RotateCcw: (opts = {}) => createSvg(`
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  `, opts),

  Sliders: (opts = {}) => createSvg(`
    <line x1="4" y1="21" x2="4" y2="14"/>
    <line x1="4" y1="10" x2="4" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12" y2="3"/>
    <line x1="20" y1="21" x2="20" y2="16"/>
    <line x1="20" y1="12" x2="20" y2="3"/>
    <line x1="1" y1="14" x2="7" y2="14"/>
    <line x1="9" y1="8" x2="15" y2="8"/>
    <line x1="17" y1="16" x2="23" y2="16"/>
  `, opts),

  Send: (opts = {}) => createSvg(`
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  `, opts),

  MessageSquare: (opts = {}) => createSvg(`
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  `, opts),

  TrendingUp: (opts = {}) => createSvg(`
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  `, opts),

  Award: (opts = {}) => createSvg(`
    <circle cx="12" cy="8" r="7"/>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
  `, opts),

  Menu: (opts = {}) => createSvg(`
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  `, opts),

  X: (opts = {}) => createSvg(`
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  `, opts),

  Check: (opts = {}) => createSvg(`
    <polyline points="20 6 9 17 4 12"/>
  `, opts),

  Info: (opts = {}) => createSvg(`
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  `, opts),

  HelpCircle: (opts = {}) => createSvg(`
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  `, opts),

  Code: (opts = {}) => createSvg(`
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  `, opts),

  Clock: (opts = {}) => createSvg(`
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 14 14"/>
  `, opts),

  User: (opts = {}) => createSvg(`
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  `, opts),

  Zap: (opts = {}) => createSvg(`
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  `, opts),

  BarChart2: (opts = {}) => createSvg(`
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  `, opts),

  FileText: (opts = {}) => createSvg(`
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  `, opts)
};
