import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchitecturePageComponent } from './architecture-page.component';
import { ARCHITECTURE_EXAMPLES } from './architecture.data';

describe('ArchitecturePageComponent', () => {
  let component: ArchitecturePageComponent;
  let fixture: ComponentFixture<ArchitecturePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchitecturePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchitecturePageComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('onTocClick()', () => {
    it('should prevent default event behavior', () => {
      const event = new Event('click');
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      component.onTocClick(event, 'test-id');

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should scroll to element by id using scrollIntoView', () => {
      const mockElement = {
        scrollIntoView: vi.fn(),
      };

      const getElementByIdSpy = vi
        .spyOn(document, 'getElementById')
        .mockReturnValue(mockElement as any);
      const event = new Event('click');

      component.onTocClick(event, 'goals');

      expect(getElementByIdSpy).toHaveBeenCalledWith('goals');
      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });

    it('should handle scrolling to architecture section', () => {
      const mockElement = {
        scrollIntoView: vi.fn(),
      };

      vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as any);
      const event = new Event('click');

      component.onTocClick(event, 'architecture');

      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });

    it('should gracefully handle missing element', () => {
      vi.spyOn(document, 'getElementById').mockReturnValue(null);
      const event = new Event('click');

      expect(() => {
        component.onTocClick(event, 'nonexistent');
      }).not.toThrow();
    });
  });

  describe('code examples from data file', () => {
    it('should expose codeFolderLayout from ARCHITECTURE_EXAMPLES', () => {
      expect(component.codeFolderLayout).toBe(ARCHITECTURE_EXAMPLES.codeFolderLayout);
      expect(component.codeFolderLayout).toContain('app/');
      expect(component.codeFolderLayout).toContain('features/');
    });

    it('should expose codeFeatureStructure from ARCHITECTURE_EXAMPLES', () => {
      expect(component.codeFeatureStructure).toBe(ARCHITECTURE_EXAMPLES.codeFeatureStructure);
      expect(component.codeFeatureStructure).toContain('orders/');
      expect(component.codeFeatureStructure).toContain('auth/');
    });

    it('should expose codeFacade from ARCHITECTURE_EXAMPLES', () => {
      expect(component.codeFacade).toBe(ARCHITECTURE_EXAMPLES.codeFacade);
      expect(component.codeFacade).toContain('OrdersFacade');
    });

    it('should expose codeRepository from ARCHITECTURE_EXAMPLES', () => {
      expect(component.codeRepository).toBe(ARCHITECTURE_EXAMPLES.codeRepository);
      expect(component.codeRepository).toContain('OrdersRepository');
    });

    it('should expose codeRoutes from ARCHITECTURE_EXAMPLES', () => {
      expect(component.codeRoutes).toBe(ARCHITECTURE_EXAMPLES.codeRoutes);
      expect(component.codeRoutes).toContain('loadChildren');
    });

    it('should expose codeAuthInterceptor from ARCHITECTURE_EXAMPLES', () => {
      expect(component.codeAuthInterceptor).toBe(ARCHITECTURE_EXAMPLES.codeAuthInterceptor);
      expect(component.codeAuthInterceptor).toContain('authInterceptor');
    });

    it('should expose projectStructure from ARCHITECTURE_EXAMPLES', () => {
      expect(component.projectStructure).toBe(ARCHITECTURE_EXAMPLES.projectStructure);
      expect(component.projectStructure).toContain('angular-design-patterns/');
      expect(component.projectStructure).toContain('features/');
      expect(component.projectStructure).toContain('shared/');
    });
  });
});
