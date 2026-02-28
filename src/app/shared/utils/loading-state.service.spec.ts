import { describe, it, expect, beforeEach } from 'vitest';
import { LoadingStateService } from './loading-state.service';

describe('LoadingStateService', () => {
  let service: LoadingStateService;

  beforeEach(() => {
    service = new LoadingStateService();
  });

  describe('initial state', () => {
    it('should have isLoading=false initially', () => {
      expect(service.isLoading()).toBe(false);
    });
  });

  describe('start() method', () => {
    it('should set isLoading to true when start called', () => {
      service.start();
      expect(service.isLoading()).toBe(true);
    });

    it('should handle multiple concurrent starts', () => {
      service.start();
      service.start();
      expect(service.isLoading()).toBe(true);
    });
  });

  describe('stop() method', () => {
    it('should set isLoading to false after matching start/stop', () => {
      service.start();
      expect(service.isLoading()).toBe(true);
      service.stop();
      expect(service.isLoading()).toBe(false);
    });

    it('should handle multiple concurrent operations', () => {
      service.start();
      service.start();
      service.stop();
      expect(service.isLoading()).toBe(true);
      service.stop();
      expect(service.isLoading()).toBe(false);
    });

    it('should not go below 0 on extra stop calls', () => {
      service.stop();
      service.stop();
      expect(service.isLoading()).toBe(false);
    });
  });

  describe('loading state transitions', () => {
    it('should track multiple loading operations correctly', () => {
      // Op 1 starts
      service.start();
      expect(service.isLoading()).toBe(true);

      // Op 2 starts
      service.start();
      expect(service.isLoading()).toBe(true);

      // Op 1 completes
      service.stop();
      expect(service.isLoading()).toBe(true);

      // Op 2 completes
      service.stop();
      expect(service.isLoading()).toBe(false);
    });

    it('should remain false if no operations are pending', () => {
      expect(service.isLoading()).toBe(false);
      service.stop();
      expect(service.isLoading()).toBe(false);
    });
  });
});
