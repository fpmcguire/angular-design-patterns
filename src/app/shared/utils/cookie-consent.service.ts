import { Injectable, signal } from '@angular/core';

export type ConsentState = 'pending' | 'accepted' | 'rejected';

interface WindowWithAnalytics extends Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}

declare const window: WindowWithAnalytics;

@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  private readonly STORAGE_KEY = 'cookie-consent';

  readonly consentState = signal<ConsentState>(this.loadConsent());

  private loadConsent(): ConsentState {
    if (typeof localStorage === 'undefined') {
      return 'pending';
    }
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return (stored as ConsentState) || 'pending';
  }

  accept(): void {
    this.consentState.set('accepted');
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, 'accepted');
    }
    this.loadAnalytics();
  }

  reject(): void {
    this.consentState.set('rejected');
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, 'rejected');
    }
  }

  private loadAnalytics(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-MD06T4XGJJ';
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    }
    gtag('js', new Date());
    gtag('config', 'G-MD06T4XGJJ', {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure',
    });

    window.gtag = gtag;
  }

  initializeIfConsented(): void {
    if (this.consentState() === 'accepted') {
      this.loadAnalytics();
    }
  }
}
