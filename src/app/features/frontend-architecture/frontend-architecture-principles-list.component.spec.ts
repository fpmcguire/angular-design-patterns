import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FrontendArchitecturePrinciplesListComponent } from './frontend-architecture-principles-list.component';

describe('FrontendArchitecturePrinciplesListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontendArchitecturePrinciplesListComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FrontendArchitecturePrinciplesListComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
