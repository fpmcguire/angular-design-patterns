import { Component } from '@angular/core';
import { PatternListComponent } from '../../shared/components/pattern-list/pattern-list.component';
import { PATTERNS } from './patterns.data';

@Component({
  selector: 'app-patterns-list',
  standalone: true,
  imports: [PatternListComponent],
  // Default --section-accent fallback (#60a5fa) is used — no override needed.
  template: `
    <app-pattern-list
      [items]="items"
      title="Angular Design Patterns"
      intro="Angular 21 catalog of common patterns (components, state, interaction, performance, API, and DI)."
      routeBase="patterns"
    />
  `,
})
export class PatternsListComponent {
  readonly items = PATTERNS;
}
