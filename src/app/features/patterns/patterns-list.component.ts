import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PATTERNS, Pattern, PatternCategory } from './patterns.data';

@Component({
  selector: 'app-patterns-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './patterns-list.component.html',
  styleUrls: ['./patterns-list.component.scss'],
})

export class PatternsListComponent {
  readonly patterns = PATTERNS;
  readonly categories: PatternCategory[] = Array.from(
    new Set(PATTERNS.map(p => p.category))
  );

  private readonly selectedCategorySignal = signal<PatternCategory | null>(null);
  readonly filteredPatterns = computed<Pattern[]>(() => {
    const cat = this.selectedCategorySignal();
    if (!cat) return this.patterns;
    return this.patterns.filter(p => p.category === cat);
  });

  get selectedCategory(): PatternCategory | null {
    return this.selectedCategorySignal();
  }

  selectCategory(cat: PatternCategory | null) {
    this.selectedCategorySignal.set(cat);
  }
}
