import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ReactivePrincipleDetailComponent } from './reactive-principle-detail.component';

describe('ReactivePrincipleDetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactivePrincipleDetailComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ReactivePrincipleDetailComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
