// =============================================================================
// PatternItem — canonical domain model for every catalog entry across all
// feature sections. Framework-specific fields (letter, rating) are optional
// so a single generic component can render any section without casting.
// =============================================================================

export interface PatternItem {
  /** URL-safe unique identifier — used as the route :id parameter. */
  id: string;
  /** Display name shown in cards and detail headers. */
  name: string;
  /** Category string used for filter chips. */
  category: string;
  /** One-line summary shown on the list card. */
  shortDescription: string;
  /** Full description paragraph shown on the detail page. */
  description: string;
  /** TypeScript / Angular code snippet (joined from JSON string[]). */
  exampleTs?: string;
  /** HTML template snippet (joined from JSON string[]). */
  exampleHtml?: string;
  // ── Section-specific optional fields ──────────────────────────────────────
  /** SOLID only — single letter abbreviation: S | O | L | I | D */
  letter?: string;
  /** Classic GoF only — Angular relevance rating 1–5. */
  rating?: 1 | 2 | 3 | 4 | 5;
}
