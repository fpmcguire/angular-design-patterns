import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GraspPatternDetailComponent } from './grasp-pattern-detail.component';

describe('GraspPatternDetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraspPatternDetailComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(GraspPatternDetailComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
