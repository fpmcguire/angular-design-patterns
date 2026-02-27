import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  standalone: true,
  template: `
    @if (open()) {
      <div class="overlay" role="dialog" aria-modal="true" [attr.aria-label]="ariaLabel()">
        <div class="panel">
          <span class="spinner" aria-hidden="true">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </span>
          <div class="text">
            <span class="title">{{ title() }}</span>
            @if (message()) {
              <span class="message">{{ message() }}</span>
            }
          </div>
        </div>
      </div>
    }
  `,
  styleUrl: './loading-overlay.component.scss',
})
export class LoadingOverlayComponent {
  readonly open = input(false);
  readonly title = input('Loading');
  readonly message = input<string | null>(null);

  readonly ariaLabel = computed(() => {
    const msg = this.message();
    return msg ? `${this.title()}: ${msg}` : this.title();
  });
}
