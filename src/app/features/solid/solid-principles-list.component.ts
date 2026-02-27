import { Component } from '@angular/core';
import { PatternListComponent } from '../../shared/components/pattern-list/pattern-list.component';
import { SOLID_PRINCIPLES } from './solid-principles.data';

@Component({
  selector: 'app-solid-principles-list',
  standalone: true,
  imports: [PatternListComponent],
  host: { style: '--section-accent: #34d399' },
  template: `
    <app-pattern-list
      [items]="items"
      title="S.O.L.I.D. Principles"
      intro="The five foundational object-oriented design principles, illustrated with Angular & TypeScript examples."
      routeBase="solid"
    />
  `,
})
export class SolidPrinciplesListComponent {
  readonly items = SOLID_PRINCIPLES;
}
