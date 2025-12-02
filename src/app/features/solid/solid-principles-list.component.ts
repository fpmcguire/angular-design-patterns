import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SOLID_PRINCIPLES, SolidPrinciple, SolidCategory } from './solid-principles.data';

@Component({
  selector: 'app-solid-principles-list',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="patterns">
      <h2>S.O.L.I.D. Principles</h2>
      <p class="patterns__intro">
        The five foundational object-oriented design principles (S.O.L.I.D.), illustrated with Angular & TypeScript examples.
      </p>

      <div class="patterns__filters">
        <button
          type="button"
          class="chip"
          [class.chip--active]="selectedCategory === null"
          (click)="selectCategory(null)"
        >
          All
        </button>

        @for (cat of categories; track cat) {
          <button
            type="button"
            class="chip"
            [class.chip--active]="selectedCategory === cat"
            (click)="selectCategory(cat)"
          >
            {{ cat }}
          </button>
        }
      </div>

      <div class="patterns__grid">
        @for (p of filtered(); track p.id) {
          <a
            class="pattern-card"
            [routerLink]="['/solid', p.id]"
          >
            <h3>{{ p.name }}</h3>
            <p class="pattern-card__category">({{ p.letter }}) {{ p.category }}</p>
            <p class="pattern-card__description">{{ p.shortDescription }}</p>
          </a>
        }
      </div>
    </div>
  `,
  styles: [`
    .patterns h2 {
      margin-top: 0;
      font-size: 1.4rem;
    }
    .patterns__intro {
      margin: 0.4rem 0 1rem;
      color: #4b5563;
      max-width: 46rem;
    }
    .patterns__filters {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 1rem;
    }
    .chip {
      border: 1px solid #d1d5db;
      border-radius: 999px;
      padding: 0.25rem 0.8rem;
      font-size: 0.8rem;
      background: #f9fafb;
      cursor: pointer;
      color: #374151;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
    }
    .chip--active {
      background: #34d399;
      color: #064e3b;
      border-color: #34d399;
      font-weight: 600;
    }
    .patterns__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 0.75rem;
    }
    .pattern-card {
      display: block;
      padding: 0.9rem 1rem;
      border-radius: 0.75rem;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      box-shadow: 0 1px 2px rgba(15,23,42,0.04);
      text-decoration: none;
      color: inherit;
      transition: transform 0.07s ease, box-shadow 0.07s ease, border-color 0.07s ease;
    }
    .pattern-card:hover {
      transform: translateY(-1px);
      border-color: #bbf7d0;
      box-shadow: 0 6px 16px rgba(15,23,42,0.12);
    }
    .pattern-card h3 {
      margin: 0 0 0.3rem;
      font-size: 1rem;
    }
    .pattern-card__category {
      margin: 0;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #9ca3af;
    }
    .pattern-card__description {
      margin: 0.35rem 0 0;
      font-size: 0.86rem;
      color: #4b5563;
    }
  `]
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
