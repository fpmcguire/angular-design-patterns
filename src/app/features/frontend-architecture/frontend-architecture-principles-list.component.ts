import { Component, inject, signal } from '@angular/core';
import { PatternListComponent } from '../../shared/components/pattern-list/pattern-list.component';
import { LazyLessonLoaderService } from '../../shared/services/lazy-lesson-loader.service';
import { PatternItem } from '../../shared/models/pattern-item.model';

@Component({
  selector: 'app-frontend-architecture-principles-list',
  standalone: true,
  imports: [PatternListComponent],
  host: { style: '--section-accent: #38bdf8' },
  template: `
    <app-pattern-list
      [items]="items()"
      title="Frontend Architecture Principles"
      intro="Principles for structuring Angular frontends: data flow, state management, and clear feature boundaries."
      routeBase="frontend-architecture"
    />
  `,
})
export class FrontendArchitecturePrinciplesListComponent {
  private readonly loader = inject(LazyLessonLoaderService);
  readonly items = signal<PatternItem[]>([]);
  readonly isLoading = signal(false);

  constructor() {
    this.loadData();
  }

  private loadData() {
    this.isLoading.set(true);
    this.loader.loadLessons('frontend-architecture').then(
      (data: PatternItem[]) => {
        this.items.set(data);
        this.isLoading.set(false);
      },
      (error: unknown) => {
        console.error('Failed to load frontend architecture principles:', error);
        this.isLoading.set(false);
      },
    );
  }
}
