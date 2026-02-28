import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { describe, it, expect } from 'vitest';
import { FrontendArchitecturePrincipleDetailComponent } from './frontend-architecture-principle-detail.component';
import { FRONTEND_ARCH_PRINCIPLES } from './frontend-architecture-principles.data';

describe('FrontendArchitecturePrincipleDetailComponent', () => {
  const firstItem = FRONTEND_ARCH_PRINCIPLES[0];

  const setup = async (
    id: string | null,
  ): Promise<ComponentFixture<FrontendArchitecturePrincipleDetailComponent>> => {
    await TestBed.configureTestingModule({
      imports: [FrontendArchitecturePrincipleDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? id : null),
              },
            },
          },
        },
      ],
    }).compileComponents();

    return TestBed.createComponent(FrontendArchitecturePrincipleDetailComponent);
  };

  it('resolves item from route id', async () => {
    const fixture = await setup(firstItem.id);
    const component = fixture.componentInstance;

    expect(component.item).toEqual(firstItem);
  });

  it('returns null when route id is unknown', async () => {
    const fixture = await setup('missing-id');
    const component = fixture.componentInstance;

    expect(component.item).toBeNull();
  });
});
