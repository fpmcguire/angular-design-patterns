import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatternDetailComponent } from '../../shared/components/pattern-detail/pattern-detail.component';
import { FRONTEND_ARCH_PRINCIPLES } from './frontend-architecture-principles.data';

@Component({
  selector: 'app-frontend-architecture-principle-detail',
  standalone: true,
  imports: [PatternDetailComponent],
  host: { style: '--section-accent: #38bdf8' },
  template: `
    <app-pattern-detail
      [item]="item"
      backRoute="/frontend-architecture"
      backLabel="Frontend Architecture Principles"
    />
  `,
})
export class FrontendArchitecturePrincipleDetailComponent {
  private readonly route = inject(ActivatedRoute);
  readonly item = FRONTEND_ARCH_PRINCIPLES.find(p => p.id === this.route.snapshot.paramMap.get('id')) ?? null;
}
