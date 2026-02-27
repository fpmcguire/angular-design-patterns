import { Component } from '@angular/core';
import { PatternListComponent } from '../../shared/components/pattern-list/pattern-list.component';
import { CLASSIC_PATTERNS } from './classic-patterns.data';

@Component({
  selector: 'app-classic-patterns-list',
  standalone: true,
  imports: [PatternListComponent],
  host: { style: '--section-accent: #f97316' },
  template: `
    <app-pattern-list
      [items]="items"
      title="Classic Design Patterns (GoF)"
      intro="A catalog of classic object-oriented design patterns (Singleton, Factory, Strategy, etc.), shown with Angular & TypeScript examples."
      introExtra="Stars indicate common usage in Angular."
      routeBase="classic"
    />
  `,
})
export class ClassicPatternsListComponent {
  readonly items = CLASSIC_PATTERNS;
}
