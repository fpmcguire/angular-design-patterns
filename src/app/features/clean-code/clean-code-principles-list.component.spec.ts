import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CleanCodePrinciplesListComponent } from './clean-code-principles-list.component';

describe('CleanCodePrinciplesListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CleanCodePrinciplesListComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CleanCodePrinciplesListComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
