import { Component } from '@angular/core';
import { PatternListComponent } from '../../shared/components/pattern-list/pattern-list.component';
import { REACTIVE_PRINCIPLES } from './reactive-principles.data';

@Component({
  selector: 'app-reactive-principles-list',
  standalone: true,
  imports: [PatternListComponent],
  host: { style: '--section-accent: #4ade80' },
  template: `
    <app-pattern-list
      [items]="items"
      title="Reactive Principles"
      intro="Core ideas for building reactive Angular apps with RxJS: streams as the source of truth, composition with operators, and proper error & lifecycle handling."
      routeBase="reactive"
    />
  `,
})
export class ReactivePrinciplesListComponent {
  readonly items = REACTIVE_PRINCIPLES;
}
