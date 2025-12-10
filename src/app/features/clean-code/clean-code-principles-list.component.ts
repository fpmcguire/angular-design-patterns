import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CLEAN_CODE_PRINCIPLES, CleanCodeCategory } from './clean-code-principles.data';

@Component({
  selector: 'app-clean-code-principles-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './clean-code-principles-list.component.html',
  styleUrls: ['./clean-code-principles-list.component.scss'],
})

export class CleanCodePrinciplesListComponent {
  readonly principles = CLEAN_CODE_PRINCIPLES;
  readonly categories: CleanCodeCategory[] = Array.from(
    new Set(this.principles.map(p => p.category))
  ) as CleanCodeCategory[];

  private readonly selectedCategorySignal = signal<CleanCodeCategory | null>(null);
  readonly filtered = computed(() => {
    const cat = this.selectedCategorySignal();
    if (!cat) return this.principles;
    return this.principles.filter(p => p.category === cat);
  });

  get selectedCategory(): CleanCodeCategory | null {
    return this.selectedCategorySignal();
  }

  selectCategory(cat: CleanCodeCategory | null) {
    this.selectedCategorySignal.set(cat);
  }
}
