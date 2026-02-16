import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

type WebVitalMetric = {
  name: string;
  value: number;
  id: string;
  rating: 'good' | 'needs-improvement' | 'poor';
};

const sendToGTM = (metric: WebVitalMetric): void => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'web_vitals',
    web_vital_name: metric.name,
    web_vital_value: Math.round(
      metric.name === 'CLS' ? metric.value * 1000 : metric.value
    ),
    web_vital_id: metric.id,
    web_vital_rating: metric.rating,
  });
};

export const initWebVitals = (): void => {
  onCLS(sendToGTM);
  onINP(sendToGTM);
  onLCP(sendToGTM);
  onFCP(sendToGTM);
  onTTFB(sendToGTM);
};
