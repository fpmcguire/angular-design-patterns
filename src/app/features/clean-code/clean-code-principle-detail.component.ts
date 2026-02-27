import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatternDetailComponent } from '../../shared/components/pattern-detail/pattern-detail.component';
import { CLEAN_CODE_PRINCIPLES } from './clean-code-principles.data';

@Component({
  selector: 'app-clean-code-principle-detail',
  standalone: true,
  imports: [PatternDetailComponent],
  host: { style: '--section-accent: #fb7185' },
  template: `
    <app-pattern-detail
      [item]="item"
      backRoute="/clean-code"
      backLabel="Clean Code Principles"
    />
  `,
})
export class CleanCodePrincipleDetailComponent {
  private readonly route = inject(ActivatedRoute);
  readonly item = CLEAN_CODE_PRINCIPLES.find(p => p.id === this.route.snapshot.paramMap.get('id')) ?? null;
}
