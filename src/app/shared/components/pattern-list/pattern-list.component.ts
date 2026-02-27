import { Component, computed, input, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatternItem } from '../../models/pattern-item.model';
import { starsArray } from '../../utils/stars.util';

@Component({
  selector: 'app-pattern-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './pattern-list.component.html',
  styleUrl: './pattern-list.component.scss',
})
export class PatternListComponent {
  // ── Required inputs ────────────────────────────────────────────────────────
  readonly items     = input.required<PatternItem[]>();
  readonly title     = input.required<string>();
  readonly intro     = input.required<string>();
  /** Base route segment, e.g. 'solid', 'classic'. Used in card [routerLink]. */
  readonly routeBase = input.required<string>();

  // ── Optional inputs ────────────────────────────────────────────────────────
  /** Second intro paragraph — used by Classic GoF for the star legend. */
  readonly introExtra = input<string>();

  // ── Derived state ──────────────────────────────────────────────────────────
  readonly categories = computed<string[]>(() =>
    Array.from(new Set(this.items().map(p => p.category)))
  );

  private readonly _selectedCategory = signal<string | null>(null);
  readonly selectedCategory = this._selectedCategory.asReadonly();

  readonly filteredItems = computed<PatternItem[]>(() => {
    const cat = this._selectedCategory();
    return cat ? this.items().filter(p => p.category === cat) : this.items();
  });

  // ── Event handlers ─────────────────────────────────────────────────────────
  selectCategory(cat: string | null): void {
    this._selectedCategory.set(cat);
  }

  // ── Utilities ──────────────────────────────────────────────────────────────
  readonly starsArray = starsArray;
}
