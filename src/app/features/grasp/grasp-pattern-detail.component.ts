import { Component, computed, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GRASP_PATTERNS, GraspPattern } from './grasp-patterns.data';

@Component({
  selector: 'app-grasp-pattern-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './grasp-pattern-detail.component.html',
  styleUrls: ['./grasp-pattern-detail.component.scss'],
})

export class GraspPatternDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly patternSignal = signal<GraspPattern | null>(null);
  readonly pattern = computed(() => this.patternSignal());

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    const found = GRASP_PATTERNS.find(p => p.id === id) as GraspPattern | null ?? null;
    this.patternSignal.set(found);
  }
}
