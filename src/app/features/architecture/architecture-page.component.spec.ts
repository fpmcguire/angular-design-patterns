import { TestBed } from '@angular/core/testing';
import { ArchitecturePageComponent } from './architecture-page.component';

describe('ArchitecturePageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchitecturePageComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ArchitecturePageComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
