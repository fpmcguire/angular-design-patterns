import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { describe, it, expect } from 'vitest';
import { ReactivePrincipleDetailComponent } from './reactive-principle-detail.component';
import { REACTIVE_PRINCIPLES } from './reactive-principles.data';

describe('ReactivePrincipleDetailComponent', () => {
  const firstItem = REACTIVE_PRINCIPLES[0];

  const setup = async (
    id: string | null,
  ): Promise<ComponentFixture<ReactivePrincipleDetailComponent>> => {
    await TestBed.configureTestingModule({
      imports: [ReactivePrincipleDetailComponent],
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

    return TestBed.createComponent(ReactivePrincipleDetailComponent);
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
