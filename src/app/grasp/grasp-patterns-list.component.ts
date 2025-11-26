import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { GRASP_PATTERNS, GraspPattern, GraspCategory } from './grasp-patterns.data';

@Component({
  selector: 'app-grasp-patterns-list',
  standalone: true,
  imports: [RouterModule, NgFor],
  template: `
    <div class="patterns">
      <h2>GRASP Principles</h2>
      <p class="patterns__intro">
        General Responsibility Assignment Software Patterns (GRASP) shown with Angular services and components.
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

        <button
          *ngFor="let cat of categories"
          type="button"
          class="chip"
          [class.chip--active]="selectedCategory === cat"
          (click)="selectCategory(cat)"
        >
          {{ cat }}
        </button>
      </div>

      <div class="patterns__grid">
        <a
          *ngFor="let p of filtered()"
          class="pattern-card"
          [routerLink]="['/grasp', p.id]"
        >
          <h3>{{ p.name }}</h3>
          <p class="pattern-card__category">{{ p.category }}</p>
          <p class="pattern-card__description">{{ p.shortDescription }}</p>
        </a>
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
      background: #fbbf24;
      color: #78350f;
      border-color: #fbbf24;
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
      border-color: #fed7aa;
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
export class GraspPatternsListComponent {
  readonly patterns = GRASP_PATTERNS;
  readonly categories: GraspCategory[] = Array.from(
    new Set(this.patterns.map(p => p.category))
  );

  private readonly selectedCategorySignal = signal<GraspCategory | null>(null);
  readonly filtered = computed<GraspPattern[]>(() => {
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
