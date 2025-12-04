import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GraspPatternsListComponent } from './grasp-patterns-list.component';

describe('GraspPatternsListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraspPatternsListComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(GraspPatternsListComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
