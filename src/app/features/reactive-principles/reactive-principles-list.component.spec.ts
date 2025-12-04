import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ReactivePrinciplesListComponent } from './reactive-principles-list.component';

describe('ReactivePrinciplesListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactivePrinciplesListComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ReactivePrinciplesListComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
