import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { CookieConsentService, type ConsentState } from './cookie-consent.service';

describe('CookieConsentService', () => {
  let service: CookieConsentService;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    service = new CookieConsentService();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('initial state', () => {
    it('should initialize with pending consent state', () => {
      expect(service.consentState()).toBe('pending');
    });

    it('should load previously accepted consent from localStorage', () => {
      localStorage.setItem('cookie-consent', 'accepted');
      const newService = new CookieConsentService();
      expect(newService.consentState()).toBe('accepted');
    });

    it('should load previously rejected consent from localStorage', () => {
      localStorage.setItem('cookie-consent', 'rejected');
      const newService = new CookieConsentService();
      expect(newService.consentState()).toBe('rejected');
    });
  });

  describe('accept() method', () => {
    it('should set consent state to accepted', () => {
      service.accept();
      expect(service.consentState()).toBe('accepted');
    });

    it('should persist accepted state to localStorage', () => {
      service.accept();
      expect(localStorage.getItem('cookie-consent')).toBe('accepted');
    });

    it('should change from pending to accepted', () => {
      expect(service.consentState()).toBe('pending');
      service.accept();
      expect(service.consentState()).toBe('accepted');
    });
  });

  describe('reject() method', () => {
    it('should set consent state to rejected', () => {
      service.reject();
      expect(service.consentState()).toBe('rejected');
    });

    it('should persist rejected state to localStorage', () => {
      service.reject();
      expect(localStorage.getItem('cookie-consent')).toBe('rejected');
    });

    it('should change from pending to rejected', () => {
      expect(service.consentState()).toBe('pending');
      service.reject();
      expect(service.consentState()).toBe('rejected');
    });
  });

  describe('state transitions', () => {
    it('should allow transitioning from pending to accepted', () => {
      expect(service.consentState()).toBe('pending');
      service.accept();
      expect(service.consentState()).toBe('accepted');
    });

    it('should allow transitioning from pending to rejected', () => {
      expect(service.consentState()).toBe('pending');
      service.reject();
      expect(service.consentState()).toBe('rejected');
    });

    it('should allow changing from rejected to accepted', () => {
      service.reject();
      expect(service.consentState()).toBe('rejected');
      service.accept();
      expect(service.consentState()).toBe('accepted');
    });

    it('should allow changing from accepted to rejected', () => {
      service.accept();
      expect(service.consentState()).toBe('accepted');
      service.reject();
      expect(service.consentState()).toBe('rejected');
    });
  });

  describe('localStorage persistence', () => {
    it('should maintain state after multiple round-trips', () => {
      const newService1 = new CookieConsentService();
      expect(newService1.consentState()).toBe('pending');

      newService1.accept();
      localStorage.setItem('cookie-consent', 'accepted');

      const newService2 = new CookieConsentService();
      expect(newService2.consentState()).toBe('accepted');
    });
  });
});
