import { Component, computed, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FRONTEND_ARCH_PRINCIPLES,
  FrontendArchPrinciple
} from './frontend-architecture-principles.data';

@Component({
  selector: 'app-frontend-architecture-principle-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './frontend-architecture-principle-detail.component.html',
  styleUrls: ['./frontend-architecture-principle-detail.component.scss'],
})

export class FrontendArchitecturePrincipleDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly principleSignal = signal<FrontendArchPrinciple | null>(null);
  readonly principle = computed(() => this.principleSignal());

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    const found = FRONTEND_ARCH_PRINCIPLES.find(p => p.id === id) as FrontendArchPrinciple | undefined ?? null;
    this.principleSignal.set(found);
  }
}
