import { Component, inject, signal } from '@angular/core';
import { PatternListComponent } from '../../shared/components/pattern-list/pattern-list.component';
import { LazyLessonLoaderService } from '../../shared/services/lazy-lesson-loader.service';
import { PatternItem } from '../../shared/models/pattern-item.model';

@Component({
  selector: 'app-classic-patterns-list',
  standalone: true,
  imports: [PatternListComponent],
  host: { style: '--section-accent: #f97316' },
  template: `
    <app-pattern-list
      [items]="items()"
      title="Classic Design Patterns (GoF)"
      intro="A catalog of classic object-oriented design patterns (Singleton, Factory, Strategy, etc.), shown with Angular & TypeScript examples."
      introExtra="Stars indicate common usage in Angular."
      routeBase="classic"
    />
  `,
})
export class ClassicPatternsListComponent {
  private readonly loader = inject(LazyLessonLoaderService);
  readonly items = signal<PatternItem[]>([]);
  readonly isLoading = signal(false);

  constructor() {
    this.loadData();
  }

  private loadData() {
    this.isLoading.set(true);
    this.loader.loadLessons('classic-patterns').then(
      (data: PatternItem[]) => {
        this.items.set(data);
        this.isLoading.set(false);
      },
      (error: unknown) => {
        console.error('Failed to load classic patterns:', error);
        this.isLoading.set(false);
      },
    );
  }
}
