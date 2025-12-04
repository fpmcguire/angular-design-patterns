import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FRONTEND_ARCH_PRINCIPLES,
  FrontendArchPrinciple,
  FrontendArchCategory
} from './frontend-architecture-principles.data';

@Component({
  selector: 'app-frontend-architecture-principles-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './frontend-architecture-principles-list.component.html',
  styleUrls: ['./frontend-architecture-principles-list.component.scss'],
})

export class FrontendArchitecturePrinciplesListComponent {
  readonly principles = FRONTEND_ARCH_PRINCIPLES;
  readonly categories: FrontendArchCategory[] = Array.from(
    new Set(this.principles.map(p => p.category))
  );

  private readonly selectedCategorySignal = signal<FrontendArchCategory | null>(null);
  readonly filtered = computed<FrontendArchPrinciple[]>(() => {
    const cat = this.selectedCategorySignal();
    if (!cat) return this.principles;
    return this.principles.filter(p => p.category === cat);
  });

  get selectedCategory(): FrontendArchCategory | null {
    return this.selectedCategorySignal();
  }

  selectCategory(cat: FrontendArchCategory | null) {
    this.selectedCategorySignal.set(cat);
  }
}
