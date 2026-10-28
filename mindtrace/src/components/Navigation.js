/**
 * MINDTRACE NAVIGATION BAR COMPONENT
 * Responsive header with brand identity, desktop links, guest mode badge,
 * primary CTA, and accessible mobile drawer.
 */

import { BRAND_CONFIG } from '../config/brand.js';
import { Icons } from './icons.js';

export const Navigation = {
  render(activeView = 'landing', studentName = 'Guest Learner') {
    return `
      <header class="navbar" role="banner">
        <div class="container navbar-inner">
          <a href="#landing" class="brand-link" data-action="nav-view" data-target="landing" aria-label="${BRAND_CONFIG.name} Home">
            <span class="brand-logo-icon">
              ${Icons.Logo({ size: 20 })}
            </span>
            <span>${BRAND_CONFIG.name}</span>
          </a>

          <nav class="nav-links" aria-label="Main Navigation">
            <a href="#how-it-works" class="nav-link" data-action="scroll-to" data-target="how-it-works">How It Works</a>
            <a href="#learning-science" class="nav-link" data-action="open-science-modal">Learning Science</a>
            <a href="#adaptive-demo" class="nav-link" data-action="scroll-to" data-target="adaptive-demo">Adaptive Demo</a>
            <a href="#for-educators" class="nav-link" data-action="scroll-to" data-target="for-educators">For Educators</a>
            <button class="nav-link ${activeView === 'dashboard' ? 'active' : ''}" style="background:none; border:none; cursor:pointer;" data-action="nav-view" data-target="dashboard">
              Student Dashboard
            </button>
          </nav>

          <div class="nav-actions">
            <button class="btn btn-secondary btn-sm" data-action="nav-view" data-target="dashboard" title="Switch to Student Dashboard">
              ${Icons.User({ size: 16 })}
              <span class="desktop-only">${studentName.split(' ')[0]}</span>
            </button>

            <button class="btn btn-primary btn-sm" data-action="start-onboarding">
              ${Icons.Sparkles({ size: 16 })}
              <span>Start Learning</span>
            </button>

            <button class="mobile-menu-btn" data-action="toggle-mobile-menu" aria-label="Toggle Navigation Menu">
              ${Icons.Menu({ size: 20 })}
            </button>
          </div>
        </div>
      </header>

      <!-- Mobile Navigation Drawer -->
      <div id="mobile-nav-drawer" class="mobile-nav-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
        <div class="mobile-nav-sheet">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border); padding-bottom: 1rem;">
            <div class="brand-link">
              <span class="brand-logo-icon">${Icons.Logo({ size: 18 })}</span>
              <span>${BRAND_CONFIG.name}</span>
            </div>
            <button class="btn btn-ghost btn-sm" data-action="close-mobile-menu" aria-label="Close menu">
              ${Icons.X({ size: 20 })}
            </button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1rem;">
            <a href="#how-it-works" class="nav-link" data-action="mobile-link" data-target="how-it-works">How It Works</a>
            <a href="#adaptive-demo" class="nav-link" data-action="mobile-link" data-target="adaptive-demo">Adaptive Demo</a>
            <a href="#for-educators" class="nav-link" data-action="mobile-link" data-target="for-educators">For Educators</a>
            <a href="#learning-science" class="nav-link" data-action="mobile-science">Learning Science</a>
            <hr style="border: none; border-top: 1px solid var(--color-border); margin: 0.5rem 0;" />
            <button class="btn btn-secondary" data-action="mobile-view" data-target="dashboard" style="width: 100%; justify-content: flex-start;">
              ${Icons.Layers({ size: 18 })}
              <span>Student Dashboard</span>
            </button>
            <button class="btn btn-primary" data-action="start-onboarding" style="width: 100%; justify-content: center; margin-top: 0.5rem;">
              ${Icons.Sparkles({ size: 18 })}
              <span>Find My Learning Gaps</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }
};
