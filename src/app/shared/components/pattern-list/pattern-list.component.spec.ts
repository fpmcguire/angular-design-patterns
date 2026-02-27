import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PatternListComponent } from './pattern-list.component';
import { PatternItem } from '../../models/pattern-item.model';

describe('PatternListComponent', () => {
  let component: PatternListComponent;
  let fixture: ComponentFixture<PatternListComponent>;
  let compiled: HTMLElement;

  const mockPatterns: PatternItem[] = [
    {
      id: 'pattern1',
      name: 'Smart Components',
      shortDescription: 'Components that manage state',
      description: 'Full description for smart components',
      category: 'Component Patterns',
      rating: 4,
    },
    {
      id: 'pattern2',
      name: 'Presentational Components',
      shortDescription: 'Pure display components',
      description: 'Full description for presentational components',
      category: 'Component Patterns',
      rating: 5,
    },
    {
      id: 'pattern3',
      name: 'Signal Store',
      shortDescription: 'Reactive state management',
      description: 'Full description for signal store',
      category: 'State Management',
      rating: 3,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatternListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PatternListComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;

    // Set required inputs
    fixture.componentRef.setInput('items', mockPatterns);
    fixture.componentRef.setInput('title', 'Test Patterns');
    fixture.componentRef.setInput('intro', 'Test introduction text');
    fixture.componentRef.setInput('routeBase', 'test-patterns');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title and intro', () => {
    const title = compiled.querySelector('[data-testid="patterns-title"]');
    const intro = compiled.querySelector('[data-testid="patterns-intro"]');

    expect(title?.textContent).toBe('Test Patterns');
    expect(intro?.textContent).toBe('Test introduction text');
  });

  it('should display all patterns initially', () => {
    const cards = compiled.querySelectorAll('[data-testid="pattern-card"]');
    expect(cards.length).toBe(3);
  });

  it('should display pattern card details correctly', () => {
    const firstCard = compiled.querySelector('[data-testid="pattern-card"]');
    const title = firstCard?.querySelector('[data-testid="pattern-card-title"]');
    const category = firstCard?.querySelector('[data-testid="pattern-card-category"]');
    const description = firstCard?.querySelector('[data-testid="pattern-card-description"]');

    expect(title?.textContent).toBe('Smart Components');
    expect(category?.textContent?.trim()).toContain('Component Patterns');
    expect(description?.textContent).toBe('Components that manage state');
  });

  it('should display stars for rated patterns', () => {
    const firstCard = compiled.querySelector('[data-testid="pattern-card"]');
    const stars = firstCard?.querySelector('[data-testid="pattern-card-stars"]');

    expect(stars).toBeTruthy();
    expect(stars?.querySelectorAll('span').length).toBe(4);
  });

  it('should show category filters when multiple categories exist', () => {
    const filters = compiled.querySelector('[data-testid="patterns-filters"]');
    expect(filters).toBeTruthy();

    const allButton = compiled.querySelector('[data-testid="patterns-filter-all-button"]');
    expect(allButton).toBeTruthy();
  });

  it('should filter patterns by category when filter button clicked', () => {
    // Initially show all 3 patterns
    let cards = compiled.querySelectorAll('[data-testid="pattern-card"]');
    expect(cards.length).toBe(3);

    // Filter to Component Patterns category (2 items)
    component.selectCategory('Component Patterns');
    fixture.detectChanges();

    cards = compiled.querySelectorAll('[data-testid="pattern-card"]');
    expect(cards.length).toBe(2);

    const titles = Array.from(cards).map(
      (card) => card.querySelector('[data-testid="pattern-card-title"]')?.textContent,
    );
    expect(titles).toContain('Smart Components');
    expect(titles).toContain('Presentational Components');
    expect(titles).not.toContain('Signal Store');
  });

  it('should show all patterns when "All" filter clicked after filtering', () => {
    // Filter to one category
    component.selectCategory('State Management');
    fixture.detectChanges();

    let cards = compiled.querySelectorAll('[data-testid="pattern-card"]');
    expect(cards.length).toBe(1);

    // Click "All" to reset
    component.selectCategory(null);
    fixture.detectChanges();

    cards = compiled.querySelectorAll('[data-testid="pattern-card"]');
    expect(cards.length).toBe(3);
  });

  it('should compute unique categories correctly', () => {
    const categories = component.categories();
    expect(categories.length).toBe(2);
    expect(categories).toContain('Component Patterns');
    expect(categories).toContain('State Management');
  });

  it('should update selectedCategory signal when selectCategory called', () => {
    expect(component.selectedCategory()).toBeNull();

    component.selectCategory('Component Patterns');
    expect(component.selectedCategory()).toBe('Component Patterns');

    component.selectCategory(null);
    expect(component.selectedCategory()).toBeNull();
  });
});
