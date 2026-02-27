import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatternDetailComponent } from '../../shared/components/pattern-detail/pattern-detail.component';
import { PATTERNS } from './patterns.data';

@Component({
  standalone: true,
  imports: [PatternDetailComponent],
  template: `
    <app-pattern-detail
      [item]="item"
      backRoute="/patterns"
      backLabel="Angular Design Patterns"
      hint="Copy this snippet into a standalone component, directive, or service to experiment with the pattern in isolation."
      noExampleHint="Example snippet not yet added. You can contribute one via patterns.json."
    />
  `,
})
export class PatternsDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  readonly item = PATTERNS.find(p => p.id === this.route.snapshot.paramMap.get('id')) ?? null;
}
