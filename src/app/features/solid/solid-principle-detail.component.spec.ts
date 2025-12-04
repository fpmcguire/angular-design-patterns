import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SolidPrincipleDetailComponent } from './solid-principle-detail.component';

describe('SolidPrincipleDetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolidPrincipleDetailComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SolidPrincipleDetailComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
