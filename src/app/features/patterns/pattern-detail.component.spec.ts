import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { describe, it, expect } from 'vitest';
import { PatternsDetailPageComponent } from './pattern-detail.component';
import { PATTERNS } from './patterns.data';

describe('PatternsDetailPageComponent', () => {
  const firstItem = PATTERNS[0];

  const setup = async (
    id: string | null,
  ): Promise<ComponentFixture<PatternsDetailPageComponent>> => {
    await TestBed.configureTestingModule({
      imports: [PatternsDetailPageComponent],
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

    return TestBed.createComponent(PatternsDetailPageComponent);
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
