import * as Sentry from '@sentry/browser';

export function initSentry() {
  const dsn = import.meta.env.PUBLIC_SENTRY_DSN;
  if (!dsn) {
    return;
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    tracesSampleRate: 0,
  });
}

export { Sentry };
