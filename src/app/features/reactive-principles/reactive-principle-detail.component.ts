import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatternDetailComponent } from '../../shared/components/pattern-detail/pattern-detail.component';
import { REACTIVE_PRINCIPLES } from './reactive-principles.data';

@Component({
  selector: 'app-reactive-principle-detail',
  standalone: true,
  imports: [PatternDetailComponent],
  host: { style: '--section-accent: #4ade80' },
  template: `
    <app-pattern-detail
      [item]="item"
      backRoute="/reactive"
      backLabel="Reactive Principles"
      hint="Try dropping this into a standalone component or service and wire it to a simple route to see the reactive behavior in action."
    />
  `,
})
export class ReactivePrincipleDetailComponent {
  private readonly route = inject(ActivatedRoute);
  readonly item = REACTIVE_PRINCIPLES.find(p => p.id === this.route.snapshot.paramMap.get('id')) ?? null;
}
