import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { REACTIVE_PRINCIPLES, ReactiveCategory } from './reactive-principles.data';

@Component({
  selector: 'app-reactive-principles-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './reactive-principles-list.component.html',
  styleUrls: ['./reactive-principles-list.component.scss'],
})

export class ReactivePrinciplesListComponent {
  readonly principles = REACTIVE_PRINCIPLES;
  readonly categories = Array.from(
    new Set(this.principles.map(p => p.category))
  ) as ReactiveCategory[];

  private readonly selectedCategorySignal = signal<ReactiveCategory | null>(null);
  readonly filtered = computed(() => {
    const cat = this.selectedCategorySignal();
    if (!cat) return this.principles;
    return this.principles.filter(p => p.category === cat);
  });

  get selectedCategory(): ReactiveCategory | null {
    return this.selectedCategorySignal();
  }

  selectCategory(cat: ReactiveCategory | null) {
    this.selectedCategorySignal.set(cat);
  }
}
