import { Injectable } from '@angular/core';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  trackEvent(eventName: string, params: Record<string, unknown> = {}) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    } else {
      console.log('Gtag is not available');
    }
  }
}
