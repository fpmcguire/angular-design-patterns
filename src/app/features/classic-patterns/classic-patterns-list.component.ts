import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CLASSIC_PATTERNS, ClassicPattern, ClassicPatternCategory } from './classic-patterns.data';

@Component({
  selector: 'app-classic-patterns-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './classic-patterns-list.component.html',
  styleUrls: ['./classic-patterns-list.component.scss']
})

export class ClassicPatternsListComponent {
  readonly patterns = CLASSIC_PATTERNS;
  readonly categories: ClassicPatternCategory[] = Array.from(
    new Set(this.patterns.map(p => p.category))
  );

  private readonly selectedCategorySignal = signal<ClassicPatternCategory | null>(null);
  readonly filteredPatterns = computed<ClassicPattern[]>(() => {
    const cat = this.selectedCategorySignal();
    if (!cat) return this.patterns;
    return this.patterns.filter(p => p.category === cat);
  });

  get selectedCategory(): ClassicPatternCategory | null {
    return this.selectedCategorySignal();
  }

  selectCategory(cat: ClassicPatternCategory | null) {
    this.selectedCategorySignal.set(cat);
  }

  starsArray(rating: number): number[] {
    return Array.from({ length: rating }, (_, i) => i);
  }
}
