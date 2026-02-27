import { Component } from '@angular/core';
import { PatternListComponent } from '../../shared/components/pattern-list/pattern-list.component';
import { GRASP_PATTERNS } from './grasp-patterns.data';

@Component({
  selector: 'app-grasp-patterns-list',
  standalone: true,
  imports: [PatternListComponent],
  host: { style: '--section-accent: #a78bfa' },
  template: `
    <app-pattern-list
      [items]="items"
      title="GRASP Principles"
      intro="General Responsibility Assignment Software Patterns (GRASP), shown with Angular services and components."
      routeBase="grasp"
    />
  `,
})
export class GraspPatternsListComponent {
  readonly items = GRASP_PATTERNS;
}
