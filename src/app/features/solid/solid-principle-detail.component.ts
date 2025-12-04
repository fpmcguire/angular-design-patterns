import { Component, computed, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SOLID_PRINCIPLES, SolidPrinciple } from './solid-principles.data';

@Component({
  selector: 'app-solid-principle-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './solid-principle-detail.component.html',
  styleUrls: ['./solid-principle-detail.component.scss'],
})

export class SolidPrincipleDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly principleSignal = signal<SolidPrinciple | null>(null);
  readonly principle = computed(() => this.principleSignal());

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    const found = SOLID_PRINCIPLES.find(p => p.id === id) ?? null;
    this.principleSignal.set(found);
  }
}
