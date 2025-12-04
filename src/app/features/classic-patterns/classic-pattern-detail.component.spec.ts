import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ClassicPatternDetailComponent } from './classic-pattern-detail.component';

describe('ClassicPatternDetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassicPatternDetailComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ClassicPatternDetailComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
