import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { PatternDetailComponent } from './pattern-detail.component';
import type { PatternItem } from '../../models/pattern-item.model';

describe('PatternDetailComponent', () => {
  let component: PatternDetailComponent;
  let fixture: ComponentFixture<PatternDetailComponent>;
  let compiled: HTMLElement;

  const mockItem: PatternItem = {
    id: 'test-pattern',
    name: 'Test Pattern',
    shortDescription: 'A test description',
    description: 'Full description for test pattern',
    category: 'Testing',
    rating: 4,
    exampleTs: 'export const example = "test";',
    exampleHtml: '<p>Test</p>',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatternDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: new Map() } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PatternDetailComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  describe('rendering when item exists', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('item', mockItem);
      fixture.componentRef.setInput('backRoute', '/patterns');
      fixture.componentRef.setInput('backLabel', 'Patterns');
      fixture.detectChanges();
    });

    it('should display pattern detail container', () => {
      const container = compiled.querySelector('[data-testid="pattern-detail-container"]');
      expect(container).toBeTruthy();
    });

    it('should display back link', () => {
      const backLink = compiled.querySelector('[data-testid="pattern-detail-back-link"]');
      expect(backLink).toBeTruthy();
      expect(backLink?.getAttribute('href')).toBe('/patterns');
    });

    it('should display pattern title', () => {
      const title = compiled.querySelector('[data-testid="pattern-detail-title"]');
      expect(title?.textContent).toContain('Test Pattern');
    });

    it('should display pattern description', () => {
      const description = compiled.querySelector('.detail-description');
      expect(description?.textContent).toContain('Full description for test pattern');
    });

    it('should display star rating when available', () => {
      const stars = compiled.querySelector('.stars');
      expect(stars).toBeTruthy();
      const starElements = stars?.querySelectorAll('span');
      expect(starElements?.length).toBe(4);
    });

    it('should display examples section when examples exist', () => {
      const examplesSection = compiled.querySelector('.detail-examples');
      expect(examplesSection).toBeTruthy();
      expect(examplesSection?.textContent).toContain('Angular / TypeScript Example');
    });

    it('should display TypeScript example when provided', () => {
      const tsLabel = compiled.querySelector('.code-block__label');
      expect(tsLabel?.textContent).toContain('TypeScript');
    });
  });

  describe('rendering when item is null', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('item', null);
      fixture.componentRef.setInput('backRoute', '/patterns');
      fixture.componentRef.setInput('backLabel', 'Patterns');
      fixture.detectChanges();
    });

    it('should not display detail container', () => {
      const container = compiled.querySelector('[data-testid="pattern-detail-container"]');
      expect(container).toBeNull();
    });

    it('should not display back link when item is null', () => {
      const backLink = compiled.querySelector('[data-testid="pattern-detail-back-link"]');
      expect(backLink).toBeNull();
    });

    it('should display not found message', () => {
      const notFound = compiled.textContent;
      expect(notFound).toContain('Entry not found');
    });
  });

  describe('with optional inputs', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('item', mockItem);
      fixture.componentRef.setInput('backRoute', '/patterns');
      fixture.componentRef.setInput('backLabel', 'Patterns');
    });

    it('should display hint when provided', () => {
      fixture.componentRef.setInput('hint', 'This is a helpful tip');
      fixture.detectChanges();

      const hint = compiled.querySelector('.hint');
      expect(hint?.textContent).toContain('This is a helpful tip');
    });

    it('should display noExampleHint when no examples provided', () => {
      const itemWithoutExamples = { ...mockItem, exampleTs: undefined, exampleHtml: undefined };
      fixture.componentRef.setInput('item', itemWithoutExamples);
      fixture.componentRef.setInput('noExampleHint', 'No examples available yet');
      fixture.detectChanges();

      const noExampleHint = compiled.querySelector('.hint');
      expect(noExampleHint?.textContent).toContain('No examples available yet');
    });
  });

  describe('accessibility', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('item', mockItem);
      fixture.componentRef.setInput('backRoute', '/patterns');
      fixture.componentRef.setInput('backLabel', 'Patterns');
      fixture.detectChanges();
    });

    it('should have proper heading hierarchy', () => {
      const title = compiled.querySelector('[data-testid="pattern-detail-title"]');
      expect(title?.tagName.toLowerCase()).toBe('h2');
    });

    it('should have semantic structure for details', () => {
      const header = compiled.querySelector('.detail-header');
      expect(header).toBeTruthy();

      const description = compiled.querySelector('.detail-description');
      expect(description).toBeTruthy();

      const examples = compiled.querySelector('.detail-examples');
      expect(examples).toBeTruthy();
    });
  });

  describe('input binding', () => {
    it('should accept required inputs', () => {
      fixture.componentRef.setInput('item', mockItem);
      fixture.componentRef.setInput('backRoute', '/patterns');
      fixture.componentRef.setInput('backLabel', 'Patterns');
      fixture.detectChanges();

      expect(component.item()).toBe(mockItem);
      expect(component.backRoute()).toBe('/patterns');
      expect(component.backLabel()).toBe('Patterns');
    });

    it('should accept optional inputs', () => {
      fixture.componentRef.setInput('item', mockItem);
      fixture.componentRef.setInput('backRoute', '/patterns');
      fixture.componentRef.setInput('backLabel', 'Patterns');
      fixture.componentRef.setInput('hint', 'Test hint');
      fixture.componentRef.setInput('noExampleHint', 'Test no example');
      fixture.detectChanges();

      expect(component.hint()).toBe('Test hint');
      expect(component.noExampleHint()).toBe('Test no example');
    });
  });
});
