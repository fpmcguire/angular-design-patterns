import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatternDetailComponent } from '../../shared/components/pattern-detail/pattern-detail.component';
import { SOLID_PRINCIPLES } from './solid-principles.data';

@Component({
  selector: 'app-solid-principle-detail',
  standalone: true,
  imports: [PatternDetailComponent],
  host: { style: '--section-accent: #34d399' },
  template: `
    <app-pattern-detail
      [item]="item"
      backRoute="/solid"
      backLabel="S.O.L.I.D. Principles"
    />
  `,
})
export class SolidPrincipleDetailComponent {
  private readonly route = inject(ActivatedRoute);
  readonly item = SOLID_PRINCIPLES.find(p => p.id === this.route.snapshot.paramMap.get('id')) ?? null;
}
