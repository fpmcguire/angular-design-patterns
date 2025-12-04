import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CleanCodePrincipleDetailComponent } from './clean-code-principle-detail.component';

describe('CleanCodePrincipleDetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CleanCodePrincipleDetailComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CleanCodePrincipleDetailComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
