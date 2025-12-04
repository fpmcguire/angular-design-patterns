import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SolidPrinciplesListComponent } from './solid-principles-list.component';

describe('SolidPrinciplesListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolidPrinciplesListComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SolidPrinciplesListComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
