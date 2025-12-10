import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GRASP_PATTERNS, GraspCategory } from './grasp-patterns.data';

@Component({
  selector: 'app-grasp-patterns-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './grasp-patterns-list.component.html',
  styleUrls: ['./grasp-patterns-list.component.scss'],
})

export class GraspPatternsListComponent {
  readonly patterns = GRASP_PATTERNS;
  readonly categories: GraspCategory[] = Array.from(
    new Set(this.patterns.map(p => p.category))
  ) as GraspCategory[];

  private readonly selectedCategorySignal = signal<GraspCategory | null>(null);
  readonly filtered = computed(() => {
    const cat = this.selectedCategorySignal();
    if (!cat) return this.patterns;
    return this.patterns.filter(p => p.category === cat);
  });

  get selectedCategory(): GraspCategory | null {
    return this.selectedCategorySignal();
  }

  selectCategory(cat: GraspCategory | null) {
    this.selectedCategorySignal.set(cat);
  }
}
