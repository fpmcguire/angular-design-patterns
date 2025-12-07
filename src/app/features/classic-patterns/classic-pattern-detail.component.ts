import { Component, computed, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CLASSIC_PATTERNS, ClassicPattern } from './classic-patterns.data';

@Component({
  selector: 'app-classic-pattern-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './classic-pattern-detail.component.html',
  styleUrls: ['./classic-pattern-detail.component.scss']
})

export class ClassicPatternDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly patternSignal = signal<ClassicPattern | null>(null);

  readonly pattern = computed(() => this.patternSignal());

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    const found = CLASSIC_PATTERNS.find(p => p.id === id) ?? null;
    this.patternSignal.set(found);
  }

  starsArray(rating: number): number[] {
    return Array.from({ length: rating }, (_, i) => i);
  }
}
