import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FrontendArchitecturePrincipleDetailComponent } from './frontend-architecture-principle-detail.component';

describe('FrontendArchitecturePrincipleDetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontendArchitecturePrincipleDetailComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FrontendArchitecturePrincipleDetailComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
