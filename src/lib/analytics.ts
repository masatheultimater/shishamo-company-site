/**
 * GTM Custom Event Tracking Utilities
 *
 * Type-safe wrappers around dataLayer.push() for custom event tracking.
 * All functions silently no-op if dataLayer is not available (SSR safe).
 *
 * Event naming follows GA4 snake_case convention.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

// --- Event Parameter Interfaces ---

export interface FormSubmitParams {
  form_type: 'contact' | 'quote';
}

export interface CTAClickParams {
  cta_location: string;
  cta_text: string;
  destination_url: string;
}

export interface ConversionParams {
  conversion_type: 'contact' | 'quote';
}

// --- Core Push Functions ---

function pushEvent(event: string, params: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...params });
  }
}

/**
 * Push event and navigate after GTM processes it.
 * Uses GTM's eventCallback to wait for tag processing before navigation.
 * Falls back to timeout if GTM is slow or unavailable.
 */
function pushEventAndNavigate(event: string, params: Record<string, unknown>, url: string): void {
  if (typeof window === 'undefined') return;

  let navigated = false;
  const navigate = () => {
    if (!navigated) {
      navigated = true;
      window.location.href = url;
    }
  };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event,
      ...params,
      eventCallback: navigate,
      eventTimeout: 1000,
    });
  }

  // Safety fallback in case eventCallback/eventTimeout don't fire
  setTimeout(navigate, 1200);
}

// --- Event Tracking Functions ---

export function trackFormSubmit(params: FormSubmitParams): void {
  pushEvent('form_submit', { ...params });
}

export function trackCTAClick(params: CTAClickParams, navigateTo?: string): void {
  if (navigateTo) {
    pushEventAndNavigate('cta_click', { ...params }, navigateTo);
  } else {
    pushEvent('cta_click', { ...params });
  }
}

export function trackConversion(params: ConversionParams): void {
  pushEvent('generate_lead', { ...params });
}

/**
 * Track scroll depth milestones (25%, 50%, 75%).
 * Each milestone fires only once per page load.
 */
export function initScrollTracking(): void {
  if (typeof window === 'undefined') return;

  const milestones = [25, 50, 75];
  const fired = new Set<number>();

  const check = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const pct = Math.round((scrollTop / docHeight) * 100);

    for (const m of milestones) {
      if (pct >= m && !fired.has(m)) {
        fired.add(m);
        pushEvent('scroll_milestone', {
          scroll_depth: m,
          page_path: window.location.pathname,
        });
      }
    }
  };

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => { check(); ticking = false; });
    }
  }, { passive: true });
}

export function trackProblemClick(problemText: string, targetUrl: string): void {
  pushEventAndNavigate('problem_card_click', {
    problem_text: problemText,
    problem_target: targetUrl,
  }, targetUrl);
}

export function trackCookieConsent(action: 'accept' | 'dismiss'): void {
  pushEvent('cookie_consent', { consent_action: action });
}
