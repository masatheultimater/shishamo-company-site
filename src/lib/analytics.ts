/**
 * GTM Custom Event Tracking Utilities
 *
 * Type-safe wrappers around dataLayer.push() for custom event tracking.
 * All functions silently no-op if dataLayer is not available.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function pushEvent(event: string, params: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...params });
  }
}

export function trackFormSubmit(formType: 'contact' | 'quote'): void {
  pushEvent('form_submit', { form_type: formType });
}

export function trackServiceClick(serviceId: string, serviceName: string): void {
  pushEvent('service_view', {
    service_id: serviceId,
    service_name: serviceName,
  });
}

export function trackCTAClick(location: string): void {
  pushEvent('cta_click', { location });
}
