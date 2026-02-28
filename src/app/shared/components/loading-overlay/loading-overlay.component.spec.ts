import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingOverlayComponent } from './loading-overlay.component';

describe('LoadingOverlayComponent', () => {
  let component: LoadingOverlayComponent;
  let fixture: ComponentFixture<LoadingOverlayComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingOverlayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingOverlayComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  describe('visibility', () => {
    it('should not display overlay when open=false', () => {
      fixture.componentRef.setInput('open', false);
      fixture.detectChanges();

      const overlay = compiled.querySelector('.overlay');
      expect(overlay).toBeNull();
    });

    it('should display overlay when open=true', () => {
      fixture.componentRef.setInput('open', true);
      fixture.detectChanges();

      const overlay = compiled.querySelector('.overlay');
      expect(overlay).toBeTruthy();
    });
  });

  describe('title and message display', () => {
    it('should display default title when open', () => {
      fixture.componentRef.setInput('open', true);
      fixture.detectChanges();

      const title = compiled.querySelector('.title');
      expect(title?.textContent).toBe('Loading');
    });

    it('should display custom title', () => {
      fixture.componentRef.setInput('open', true);
      fixture.componentRef.setInput('title', 'Saving...');
      fixture.detectChanges();

      const title = compiled.querySelector('.title');
      expect(title?.textContent).toBe('Saving...');
    });

    it('should display message when provided', () => {
      fixture.componentRef.setInput('open', true);
      fixture.componentRef.setInput('title', 'Loading');
      fixture.componentRef.setInput('message', 'Please wait');
      fixture.detectChanges();

      const message = compiled.querySelector('.message');
      expect(message?.textContent).toBe('Please wait');
    });

    it('should not display message element when message is null', () => {
      fixture.componentRef.setInput('open', true);
      fixture.componentRef.setInput('message', null);
      fixture.detectChanges();

      const message = compiled.querySelector('.message');
      expect(message).toBeNull();
    });
  });

  describe('computed ariaLabel', () => {
    it('should compute ariaLabel with title only when message is null', () => {
      fixture.componentRef.setInput('open', true);
      fixture.componentRef.setInput('title', 'Processing');
      fixture.componentRef.setInput('message', null);
      fixture.detectChanges();

      expect(component.ariaLabel()).toBe('Processing');
    });

    it('should compute ariaLabel combining title and message', () => {
      fixture.componentRef.setInput('open', true);
      fixture.componentRef.setInput('title', 'Processing');
      fixture.componentRef.setInput('message', 'Step 2 of 3');
      fixture.detectChanges();

      expect(component.ariaLabel()).toBe('Processing: Step 2 of 3');
    });

    it('should update ariaLabel when inputs change', () => {
      fixture.componentRef.setInput('open', true);
      fixture.componentRef.setInput('title', 'Loading');
      fixture.detectChanges();
      expect(component.ariaLabel()).toBe('Loading');

      fixture.componentRef.setInput('message', 'Fetching data...');
      fixture.detectChanges();
      expect(component.ariaLabel()).toBe('Loading: Fetching data...');
    });
  });

  describe('accessibility', () => {
    it('should have dialog role when open', () => {
      fixture.componentRef.setInput('open', true);
      fixture.detectChanges();

      const overlay = compiled.querySelector('.overlay');
      expect(overlay?.getAttribute('role')).toBe('dialog');
    });

    it('should have aria-modal=true when open', () => {
      fixture.componentRef.setInput('open', true);
      fixture.detectChanges();

      const overlay = compiled.querySelector('.overlay');
      expect(overlay?.getAttribute('aria-modal')).toBe('true');
    });

    it('should have aria-label set to ariaLabel value', () => {
      fixture.componentRef.setInput('open', true);
      fixture.componentRef.setInput('title', 'Processing');
      fixture.componentRef.setInput('message', 'Step 1');
      fixture.detectChanges();

      const overlay = compiled.querySelector('.overlay');
      expect(overlay?.getAttribute('aria-label')).toBe('Processing: Step 1');
    });

    it('should have aria-hidden=true on spinner', () => {
      fixture.componentRef.setInput('open', true);
      fixture.detectChanges();

      const spinner = compiled.querySelector('.spinner');
      expect(spinner?.getAttribute('aria-hidden')).toBe('true');
    });
  });
});
