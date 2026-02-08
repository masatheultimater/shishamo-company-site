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

export interface ServiceViewParams {
  service_id: string;
  service_name: string;
}

export interface ServiceClickParams {
  service_id: string;
  service_name: string;
  click_location: 'service_index' | 'service_detail' | 'homepage';
}

export interface CTAClickParams {
  cta_location: string;
  cta_text: string;
  destination_url: string;
}

export interface ConversionParams {
  conversion_type: 'contact' | 'quote';
}

// --- Core Push Function ---

function pushEvent(event: string, params: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...params });
  }
}

// --- Event Tracking Functions ---

export function trackFormSubmit(params: FormSubmitParams): void {
  pushEvent('form_submit', { ...params });
}

export function trackServiceView(params: ServiceViewParams): void {
  pushEvent('service_view', { ...params });
}

export function trackServiceClick(params: ServiceClickParams): void {
  pushEvent('service_click', { ...params });
}

export function trackCTAClick(params: CTAClickParams): void {
  pushEvent('cta_click', { ...params });
}

export function trackConversion(params: ConversionParams): void {
  pushEvent('generate_lead', { ...params });
}
