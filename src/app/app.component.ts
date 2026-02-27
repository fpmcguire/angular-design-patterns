import { Component, DestroyRef, inject } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { LoadingOverlayComponent } from './shared/components/loading-overlay/loading-overlay.component';
import { LoadingStateService } from './shared/utils/loading-state.service';

declare function gtag(...args: unknown[]): void;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent, SidebarComponent, LoadingOverlayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly router    = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly loadingState = inject(LoadingStateService);

  readonly isLoading = this.loadingState.isLoading;

  constructor() {
    if (environment.analyticsEnabled) {
      this.router.events.pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      ).subscribe(e => {
        gtag('config', 'G-MD06T4XGJJ', { page_path: e.url });
      });
    }
  }
}
