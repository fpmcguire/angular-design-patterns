import { Injectable, signal } from '@angular/core';
import { PatternItem } from '../models/pattern-item.model';
import { PATTERNS } from '../../features/patterns/patterns.data';
import { SOLID_PRINCIPLES } from '../../features/solid/solid-principles.data';
import { GRASP_PATTERNS } from '../../features/grasp/grasp-patterns.data';
import { CLASSIC_PATTERNS } from '../../features/classic-patterns/classic-patterns.data';
import { REACTIVE_PRINCIPLES } from '../../features/reactive-principles/reactive-principles.data';
import { CLEAN_CODE_PRINCIPLES } from '../../features/clean-code/clean-code-principles.data';
import { FRONTEND_ARCH_PRINCIPLES } from '../../features/frontend-architecture/frontend-architecture-principles.data';

/**
 * Lazy Lesson Loader Service
 *
 * Provides a facade for lazy-loading lesson data with caching.
 * Uses static imports from .data files which are bundled separately by tree-shaking
 * only when explicitly imported by components that need them.
 *
 * Benefits:
 * - Smaller initial bundle (unused lessons aren't loaded)
 * - Caching prevents re-fetching after first load
 * - Type-safe with PatternItem[]
 */
@Injectable({
  providedIn: 'root',
})
export class LazyLessonLoaderService {
  private readonly cache = new Map<string, PatternItem[]>();
  private readonly loading = signal<Map<string, boolean>>(new Map());

  private readonly dataMap = {
    patterns: PATTERNS,
    architecture: [], // Architecture uses different data structure
    'clean-code': CLEAN_CODE_PRINCIPLES,
    'frontend-architecture': FRONTEND_ARCH_PRINCIPLES,
    grasp: GRASP_PATTERNS,
    'reactive-principles': REACTIVE_PRINCIPLES,
    solid: SOLID_PRINCIPLES,
    'classic-patterns': CLASSIC_PATTERNS,
  };

  async loadLessons(
    feature:
      | 'patterns'
      | 'architecture'
      | 'clean-code'
      | 'frontend-architecture'
      | 'grasp'
      | 'reactive-principles'
      | 'solid'
      | 'classic-patterns',
  ): Promise<PatternItem[]> {
    // Return from cache if already loaded
    if (this.cache.has(feature)) {
      return this.cache.get(feature)!;
    }

    // Mark as loading
    this.loading.update((map) => new Map(map).set(feature, true));

    try {
      // Simulate async operation for consistency
      await new Promise((resolve) => setTimeout(resolve, 0));

      const data = this.dataMap[feature as keyof typeof this.dataMap] as PatternItem[];
      this.cache.set(feature, data);
      return data;
    } finally {
      this.loading.update((map) => {
        const newMap = new Map(map);
        newMap.delete(feature);
        return newMap;
      });
    }
  }

  isLoading(feature: string): boolean {
    return this.loading().has(feature);
  }
}
