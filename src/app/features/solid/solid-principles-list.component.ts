import { Component, inject, signal } from '@angular/core';
import { PatternListComponent } from '../../shared/components/pattern-list/pattern-list.component';
import { LazyLessonLoaderService } from '../../shared/services/lazy-lesson-loader.service';
import { PatternItem } from '../../shared/models/pattern-item.model';

@Component({
  selector: 'app-solid-principles-list',
  standalone: true,
  imports: [PatternListComponent],
  host: { style: '--section-accent: #34d399' },
  template: `
    <app-pattern-list
      [items]="items()"
      title="S.O.L.I.D. Principles"
      intro="The five foundational object-oriented design principles, illustrated with Angular & TypeScript examples."
      routeBase="solid"
    />
  `,
})
export class SolidPrinciplesListComponent {
  private readonly loader = inject(LazyLessonLoaderService);
  readonly items = signal<PatternItem[]>([]);
  readonly isLoading = signal(false);

  constructor() {
    this.loadData();
  }

  private loadData() {
    this.isLoading.set(true);
    this.loader.loadLessons('solid').then(
      (data: PatternItem[]) => {
        this.items.set(data);
        this.isLoading.set(false);
      },
      (error: unknown) => {
        console.error('Failed to load SOLID principles:', error);
        this.isLoading.set(false);
      },
    );
  }
}
