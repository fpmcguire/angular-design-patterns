import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { describe, it, expect } from 'vitest';
import { GraspPatternDetailComponent } from './grasp-pattern-detail.component';
import { GRASP_PATTERNS } from './grasp-patterns.data';

describe('GraspPatternDetailComponent', () => {
  const firstItem = GRASP_PATTERNS[0];

  const setup = async (
    id: string | null,
  ): Promise<ComponentFixture<GraspPatternDetailComponent>> => {
    await TestBed.configureTestingModule({
      imports: [GraspPatternDetailComponent],
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

    return TestBed.createComponent(GraspPatternDetailComponent);
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
