import { Component, DestroyRef, inject } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { LoadingOverlayComponent } from './shared/components/loading-overlay/loading-overlay.component';
import { CookieBannerComponent } from './shared/components/cookie-banner/cookie-banner.component';
import { LoadingStateService } from './shared/utils/loading-state.service';
import { CookieConsentService } from './shared/utils/cookie-consent.service';

interface WindowWithAnalytics extends Window {
  gtag?: (...args: unknown[]) => void;
}

declare const window: WindowWithAnalytics;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoadingOverlayComponent,
    CookieBannerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly loadingState = inject(LoadingStateService);
  private readonly cookieConsent = inject(CookieConsentService);

  readonly isLoading = this.loadingState.isLoading;

  constructor() {
    // Initialize analytics if user previously consented
    if (environment.analyticsEnabled) {
      this.cookieConsent.initializeIfConsented();

      // Track page views only if gtag is loaded (user consented)
      this.router.events
        .pipe(
          filter((e): e is NavigationEnd => e instanceof NavigationEnd),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe((e) => {
          if (typeof window.gtag === 'function') {
            window.gtag('config', 'G-MD06T4XGJJ', { page_path: e.url });
          }
        });
    }
  }
}
