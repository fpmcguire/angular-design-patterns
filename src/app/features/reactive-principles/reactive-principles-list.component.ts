import { Component, inject, signal } from '@angular/core';
import { PatternListComponent } from '../../shared/components/pattern-list/pattern-list.component';
import { LazyLessonLoaderService } from '../../shared/services/lazy-lesson-loader.service';
import { PatternItem } from '../../shared/models/pattern-item.model';

@Component({
  selector: 'app-reactive-principles-list',
  standalone: true,
  imports: [PatternListComponent],
  host: { style: '--section-accent: #4ade80' },
  template: `
    <app-pattern-list
      [items]="items()"
      title="Reactive Principles"
      intro="Core ideas for building reactive Angular apps with RxJS: streams as the source of truth, composition with operators, and proper error & lifecycle handling."
      routeBase="reactive"
    />
  `,
})
export class ReactivePrinciplesListComponent {
  private readonly loader = inject(LazyLessonLoaderService);
  readonly items = signal<PatternItem[]>([]);
  readonly isLoading = signal(false);

  constructor() {
    this.loadData();
  }

  private loadData() {
    this.isLoading.set(true);
    this.loader.loadLessons('reactive-principles').then(
      (data: PatternItem[]) => {
        this.items.set(data);
        this.isLoading.set(false);
      },
      (error: unknown) => {
        console.error('Failed to load reactive principles:', error);
        this.isLoading.set(false);
      },
    );
  }
}
