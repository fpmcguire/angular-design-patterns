import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PatternDetailComponent } from './pattern-detail.component';

describe('PatternDetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatternDetailComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PatternDetailComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
