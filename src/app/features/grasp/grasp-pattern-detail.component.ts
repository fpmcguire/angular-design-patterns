import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatternDetailComponent } from '../../shared/components/pattern-detail/pattern-detail.component';
import { GRASP_PATTERNS } from './grasp-patterns.data';

@Component({
  selector: 'app-grasp-pattern-detail',
  standalone: true,
  imports: [PatternDetailComponent],
  host: { style: '--section-accent: #a78bfa' },
  template: `
    <app-pattern-detail
      [item]="item"
      backRoute="/grasp"
      backLabel="GRASP Principles"
    />
  `,
})
export class GraspPatternDetailComponent {
  private readonly route = inject(ActivatedRoute);
  readonly item = GRASP_PATTERNS.find(p => p.id === this.route.snapshot.paramMap.get('id')) ?? null;
}
