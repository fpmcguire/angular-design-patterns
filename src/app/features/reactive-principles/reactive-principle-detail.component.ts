import { Component, computed, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  REACTIVE_PRINCIPLES,
  ReactivePrinciple
} from './reactive-principles.data';

@Component({
  selector: 'app-reactive-principle-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reactive-principle-detail.component.html',
  styleUrls: ['./reactive-principle-detail.component.scss'],
})
export class ReactivePrincipleDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly principleSignal = signal<ReactivePrinciple | null>(null);
  readonly principle = computed(() => this.principleSignal());

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    const found = REACTIVE_PRINCIPLES.find(p => p.id === id) as ReactivePrinciple | undefined ?? null;
    this.principleSignal.set(found);
  }
}
