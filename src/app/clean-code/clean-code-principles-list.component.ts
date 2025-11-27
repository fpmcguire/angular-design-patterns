import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CLEAN_CODE_PRINCIPLES, CleanCodePrinciple, CleanCodeCategory } from './clean-code-principles.data';

@Component({
  selector: 'app-clean-code-principles-list',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="patterns">
      <h2>Clean Code Principles</h2>
      <p class="patterns__intro">
        Everyday principles for writing clear, maintainable Angular & TypeScript code (DRY, KISS, YAGNI, and more).
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
            [routerLink]="['/clean-code', p.id]"
          >
            <h3>{{ p.name }}</h3>
            <p class="pattern-card__category">{{ p.category }}</p>
            <p class="pattern-card__description">{{ p.shortDescription }}</p>
          </a>
        }
      </div>
    </div>
  `,
  styles: [`
    .patterns h2 { margin-top: 0; font-size: 1.4rem; }
    .patterns__intro { margin: .4rem 0 1rem; color: #4b5563; max-width: 46rem; }
    .patterns__filters { display: flex; flex-wrap: wrap; gap: .4rem; margin-bottom: 1rem; }
    .chip {
      border: 1px solid #d1d5db; border-radius: 999px;
      padding: .25rem .8rem; font-size: .8rem;
      background: #f9fafb; cursor: pointer; color: #374151;
      transition: background .15s, color .15s, border-color .15s;
    }
    .chip--active { background: #a855f7; color: #f9fafb; border-color: #a855f7; font-weight: 600; }
    .patterns__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: .75rem; }
    .pattern-card {
      display: block; padding: .9rem 1rem; border-radius: .75rem;
      background: #fff; border: 1px solid #e5e7eb;
      box-shadow: 0 1px 2px rgba(15,23,42,.04);
      text-decoration: none; color: inherit;
      transition: transform .07s, box-shadow .07s, border-color .07s;
    }
    .pattern-card:hover {
      transform: translateY(-1px);
      border-color: #e9d5ff;
      box-shadow: 0 6px 16px rgba(15,23,42,.12);
    }
    .pattern-card h3 { margin: 0 0 .3rem; font-size: 1rem; }
    .pattern-card__category {
      margin: 0; font-size: .75rem; text-transform: uppercase;
      letter-spacing: .05em; color: #9ca3af;
    }
    .pattern-card__description { margin: .35rem 0 0; font-size: .86rem; color: #4b5563; }
  `]
})
export class CleanCodePrinciplesListComponent {
  readonly principles = CLEAN_CODE_PRINCIPLES;
  readonly categories: CleanCodeCategory[] = Array.from(
    new Set(this.principles.map(p => p.category))
  );

  private readonly selectedCategorySignal = signal<CleanCodeCategory | null>(null);
  readonly filtered = computed<CleanCodePrinciple[]>(() => {
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
