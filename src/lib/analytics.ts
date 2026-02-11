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

export interface BlogReadParams {
  blog_slug: string;
  blog_title: string;
  blog_category: string;
}

export function trackBlogRead(params: BlogReadParams): void {
  pushEvent('blog_read', { ...params, page_path: window.location.pathname });
}

/**
 * Track form abandonment when user starts filling but doesn't submit.
 * Fires once on visibilitychange=hidden if form was interacted with.
 */
export function initFormAbandonmentTracking(formId: string, formType: 'contact' | 'quote'): void {
  if (typeof window === 'undefined') return;

  const form = document.getElementById(formId) as HTMLFormElement | null;
  if (!form) return;

  let started = false;
  let lastField = '';
  let submitted = false;
  let tracked = false;

  form.addEventListener('focusin', (e) => {
    const target = e.target as HTMLElement;
    if (target.matches('input, select, textarea')) {
      started = true;
      lastField = (target as HTMLInputElement).name || target.id || '';
    }
  });

  form.addEventListener('submit', () => { submitted = true; });

  const trackAbandonment = () => {
    if (!started || submitted || tracked) return;
    tracked = true;

    let filled = 0;
    form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      'input:not([type="hidden"]):not([type="checkbox"]), select, textarea'
    ).forEach(el => { if (el.value.trim()) filled++; });

    pushEvent('form_abandonment', {
      form_type: formType,
      last_field: lastField,
      fields_filled: filled,
    });
  };

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') trackAbandonment();
  });
}

/**
 * Track engaged sessions (user stays on page for threshold duration).
 * Pauses timer when tab is hidden, resumes when visible.
 */
export function initEngagementTracking(thresholdMs: number = 60000): void {
  if (typeof window === 'undefined') return;

  let accumulated = 0;
  let segmentStart = Date.now();
  let fired = false;
  let timerId: ReturnType<typeof setTimeout> | null = null;

  const fire = () => {
    if (fired) return;
    fired = true;
    if (timerId) clearTimeout(timerId);
    pushEvent('engaged_session', {
      engagement_time: Math.round(thresholdMs / 1000),
      page_path: window.location.pathname,
    });
  };

  const schedule = () => {
    if (fired) return;
    const remaining = thresholdMs - accumulated;
    if (remaining <= 0) { fire(); return; }
    segmentStart = Date.now();
    timerId = setTimeout(fire, remaining);
  };

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      accumulated += Date.now() - segmentStart;
      if (timerId) { clearTimeout(timerId); timerId = null; }
    } else {
      schedule();
    }
  });

  schedule();
}
