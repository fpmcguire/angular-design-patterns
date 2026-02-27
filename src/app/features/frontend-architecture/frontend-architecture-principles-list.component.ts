import { Component } from '@angular/core';
import { PatternListComponent } from '../../shared/components/pattern-list/pattern-list.component';
import { FRONTEND_ARCH_PRINCIPLES } from './frontend-architecture-principles.data';

@Component({
  selector: 'app-frontend-architecture-principles-list',
  standalone: true,
  imports: [PatternListComponent],
  host: { style: '--section-accent: #38bdf8' },
  template: `
    <app-pattern-list
      [items]="items"
      title="Frontend Architecture Principles"
      intro="Principles for structuring Angular frontends: data flow, state management, and clear feature boundaries."
      routeBase="frontend-architecture"
    />
  `,
})
export class FrontendArchitecturePrinciplesListComponent {
  readonly items = FRONTEND_ARCH_PRINCIPLES;
}
