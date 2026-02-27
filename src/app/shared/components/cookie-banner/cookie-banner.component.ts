import { Component, inject } from '@angular/core';
import { CookieConsentService } from '../../utils/cookie-consent.service';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  template: `
    @if (consent.consentState() === 'pending') {
      <div class="cookie-banner" role="dialog" aria-label="Cookie consent">
        <div class="cookie-banner__content">
          <p class="cookie-banner__text">
            <strong>Cookie Notice</strong><br />
            We use cookies and Google Analytics to improve your experience and analyze site traffic.
            Your IP will be anonymized. By clicking "Accept", you consent to our use of cookies.
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener"
              >Privacy Policy</a
            >
          </p>
          <div class="cookie-banner__actions">
            <button class="btn btn--reject" (click)="consent.reject()">Reject</button>
            <button class="btn btn--accept" (click)="consent.accept()">Accept</button>
          </div>
        </div>
      </div>
    }
  `,
  styleUrl: './cookie-banner.component.scss',
})
export class CookieBannerComponent {
  readonly consent = inject(CookieConsentService);
}
