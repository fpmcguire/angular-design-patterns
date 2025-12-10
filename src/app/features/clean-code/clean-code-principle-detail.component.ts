import { Component, computed, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CLEAN_CODE_PRINCIPLES, CleanCodePrinciple } from './clean-code-principles.data';

@Component({
  selector: 'app-clean-code-principle-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './clean-code-principle-detail.component.html',
  styleUrls: ['./clean-code-principle-detail.component.scss'],
})

export class CleanCodePrincipleDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly principleSignal = signal<CleanCodePrinciple | null>(null);
  readonly principle = computed(() => this.principleSignal());

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    const found = CLEAN_CODE_PRINCIPLES.find(p => p.id === id) as CleanCodePrinciple | undefined ?? null;
    this.principleSignal.set(found);
  }
}
