import { Component, computed, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PATTERNS, Pattern } from './patterns.data';

@Component({
  selector: 'app-pattern-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pattern-detail.component.html',
  styleUrls: ['./pattern-detail.component.scss']
})

export class PatternDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly patternSignal = signal<Pattern | null>(null);

  readonly pattern = computed(() => this.patternSignal());

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    const found = PATTERNS.find(p => p.id === id) ?? null;
    this.patternSignal.set(found);
  }
}
