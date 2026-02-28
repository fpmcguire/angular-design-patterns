import { Component, inject, signal } from '@angular/core';
import { PatternListComponent } from '../../shared/components/pattern-list/pattern-list.component';
import { LazyLessonLoaderService } from '../../shared/services/lazy-lesson-loader.service';
import { PatternItem } from '../../shared/models/pattern-item.model';

@Component({
  selector: 'app-clean-code-principles-list',
  standalone: true,
  imports: [PatternListComponent],
  host: { style: '--section-accent: #fb7185' },
  template: `
    <app-pattern-list
      [items]="items()"
      title="Clean Code Principles"
      intro="Everyday principles for writing clear, maintainable Angular & TypeScript code (DRY, KISS, YAGNI, and more)."
      routeBase="clean-code"
    />
  `,
})
export class CleanCodePrinciplesListComponent {
  private readonly loader = inject(LazyLessonLoaderService);
  readonly items = signal<PatternItem[]>([]);
  readonly isLoading = signal(false);

  constructor() {
    this.loadData();
  }

  private loadData() {
    this.isLoading.set(true);
    this.loader.loadLessons('clean-code').then(
      (data: PatternItem[]) => {
        this.items.set(data);
        this.isLoading.set(false);
      },
      (error: unknown) => {
        console.error('Failed to load clean code principles:', error);
        this.isLoading.set(false);
      },
    );
  }
}
