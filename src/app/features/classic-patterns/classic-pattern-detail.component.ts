import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatternDetailComponent } from '../../shared/components/pattern-detail/pattern-detail.component';
import { CLASSIC_PATTERNS } from './classic-patterns.data';

@Component({
  selector: 'app-classic-pattern-detail',
  standalone: true,
  imports: [PatternDetailComponent],
  host: { style: '--section-accent: #f97316' },
  template: `
    <app-pattern-detail
      [item]="item"
      backRoute="/classic"
      backLabel="Classic Design Patterns (GoF)"
      hint="Copy this into a standalone component, service, or module to experiment with the pattern."
      noExampleHint="Example snippet not yet added. You can contribute one via classic-patterns.json."
    />
  `,
})
export class ClassicPatternDetailComponent {
  private readonly route = inject(ActivatedRoute);
  readonly item = CLASSIC_PATTERNS.find(p => p.id === this.route.snapshot.paramMap.get('id')) ?? null;
}
