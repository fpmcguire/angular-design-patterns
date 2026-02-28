import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { describe, it, expect } from 'vitest';
import { CleanCodePrincipleDetailComponent } from './clean-code-principle-detail.component';
import { CLEAN_CODE_PRINCIPLES } from './clean-code-principles.data';

describe('CleanCodePrincipleDetailComponent', () => {
  const firstItem = CLEAN_CODE_PRINCIPLES[0];

  const setup = async (
    id: string | null,
  ): Promise<ComponentFixture<CleanCodePrincipleDetailComponent>> => {
    await TestBed.configureTestingModule({
      imports: [CleanCodePrincipleDetailComponent],
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

    return TestBed.createComponent(CleanCodePrincipleDetailComponent);
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
