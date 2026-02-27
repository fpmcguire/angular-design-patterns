import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingStateService {
  private readonly _pending = signal(0);

  readonly isLoading = computed(() => this._pending() > 0);

  start(): void {
    this._pending.update(count => count + 1);
  }

  stop(): void {
    this._pending.update(count => Math.max(0, count - 1));
  }
}
