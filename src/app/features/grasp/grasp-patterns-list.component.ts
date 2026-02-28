import { Component, inject, signal } from '@angular/core';
import { PatternListComponent } from '../../shared/components/pattern-list/pattern-list.component';
import { LazyLessonLoaderService } from '../../shared/services/lazy-lesson-loader.service';
import { PatternItem } from '../../shared/models/pattern-item.model';

@Component({
  selector: 'app-grasp-patterns-list',
  standalone: true,
  imports: [PatternListComponent],
  host: { style: '--section-accent: #a78bfa' },
  template: `
    <app-pattern-list
      [items]="items()"
      title="GRASP Principles"
      intro="General Responsibility Assignment Software Patterns (GRASP), shown with Angular services and components."
      routeBase="grasp"
    />
  `,
})
export class GraspPatternsListComponent {
  private readonly loader = inject(LazyLessonLoaderService);
  readonly items = signal<PatternItem[]>([]);
  readonly isLoading = signal(false);

  constructor() {
    this.loadData();
  }

  private loadData() {
    this.isLoading.set(true);
    this.loader.loadLessons('grasp').then(
      (data: PatternItem[]) => {
        this.items.set(data);
        this.isLoading.set(false);
      },
      (error: unknown) => {
        console.error('Failed to load GRASP patterns:', error);
        this.isLoading.set(false);
      },
    );
  }
}
