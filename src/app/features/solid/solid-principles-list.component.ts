import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SOLID_PRINCIPLES, SolidPrinciple, SolidCategory } from './solid-principles.data';

@Component({
  selector: 'app-solid-principles-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './solid-principles-list.component.html',
  styleUrls: ['./solid-principles-list.component.scss'],
})

export class SolidPrinciplesListComponent {
  readonly principles = SOLID_PRINCIPLES;
  readonly categories: SolidCategory[] = Array.from(
    new Set(this.principles.map(p => p.category))
  );

  private readonly selectedCategorySignal = signal<SolidCategory | null>(null);
  readonly filtered = computed<SolidPrinciple[]>(() => {
    const cat = this.selectedCategorySignal();
    if (!cat) return this.principles;
    return this.principles.filter(p => p.category === cat);
  });

  get selectedCategory(): SolidCategory | null {
    return this.selectedCategorySignal();
  }

  selectCategory(cat: SolidCategory | null) {
    this.selectedCategorySignal.set(cat);
  }
}
