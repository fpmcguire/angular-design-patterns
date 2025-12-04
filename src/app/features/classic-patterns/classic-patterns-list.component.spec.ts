import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ClassicPatternsListComponent } from './classic-patterns-list.component';

describe('ClassicPatternsListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassicPatternsListComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ClassicPatternsListComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
