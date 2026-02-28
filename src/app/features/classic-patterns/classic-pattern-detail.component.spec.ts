import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { describe, it, expect } from 'vitest';
import { ClassicPatternDetailComponent } from './classic-pattern-detail.component';
import { CLASSIC_PATTERNS } from './classic-patterns.data';

describe('ClassicPatternDetailComponent', () => {
  const firstItem = CLASSIC_PATTERNS[0];

  const setup = async (
    id: string | null,
  ): Promise<ComponentFixture<ClassicPatternDetailComponent>> => {
    await TestBed.configureTestingModule({
      imports: [ClassicPatternDetailComponent],
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

    return TestBed.createComponent(ClassicPatternDetailComponent);
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
