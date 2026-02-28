import { Component, inject, signal } from '@angular/core';
import { PatternListComponent } from '../../shared/components/pattern-list/pattern-list.component';
import { LazyLessonLoaderService } from '../../shared/services/lazy-lesson-loader.service';
import { PatternItem } from '../../shared/models/pattern-item.model';

@Component({
  selector: 'app-patterns-list',
  standalone: true,
  imports: [PatternListComponent],
  // Default --section-accent fallback (#60a5fa) is used — no override needed.
  template: `
    <app-pattern-list
      [items]="items()"
      title="Angular Design Patterns"
      intro="Angular 21 catalog of common patterns (components, state, interaction, performance, API, and DI)."
      routeBase="patterns"
    />
  `,
})
export class PatternsListComponent {
  private readonly loader = inject(LazyLessonLoaderService);
  readonly items = signal<PatternItem[]>([]);
  readonly isLoading = signal(false);

  constructor() {
    this.loadPatterns();
  }

  private loadPatterns() {
    this.isLoading.set(true);
    this.loader.loadLessons('patterns').then(
      (data) => {
        this.items.set(data);
        this.isLoading.set(false);
      },
      (error) => {
        console.error('Failed to load patterns:', error);
        this.isLoading.set(false);
      },
    );
  }
}
