import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PatternsListComponent } from './patterns-list.component';

describe('PatternsListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatternsListComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PatternsListComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
