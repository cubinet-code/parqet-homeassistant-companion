/**
 * Regression tests for card editor schema bugs:
 * - All expandable sections must have flatten:true so nested values propagate
 * - portfolio_id must NOT be in the static schema (it's a dynamic picker)
 * - show_chart must NOT be in the schema (feature not implemented)
 */
import { describe, it, expect } from 'vitest';
import { ParqetCompanionCard } from './parqet-card';

type SchemaItem = {
  name?: string;
  type?: string;
  flatten?: boolean;
  schema?: SchemaItem[];
};

describe('ParqetCompanionCard.getConfigForm()', () => {
  const schema = ParqetCompanionCard.getConfigForm() as SchemaItem[];

  it('does not include portfolio_id (handled by dynamic picker)', () => {
    const allNames = schema.map((s) => s.name).filter(Boolean);
    expect(allNames).not.toContain('portfolio_id');
  });

  it('does not include show_chart (feature not implemented)', () => {
    function collectNames(items: SchemaItem[]): string[] {
      return items.flatMap((s) => [
        ...(s.name ? [s.name] : []),
        ...(s.schema ? collectNames(s.schema) : []),
      ]);
    }
    expect(collectNames(schema)).not.toContain('show_chart');
  });

  it('all expandable sections have flatten:true', () => {
    const expandable = schema.filter((s) => s.type === 'expandable');
    expect(expandable.length).toBeGreaterThan(0);
    for (const section of expandable) {
      expect(section.flatten, `section "${section.type}" missing flatten:true`).toBe(true);
    }
  });

  it('includes expected top-level fields: data_source', () => {
    const topLevel = schema.filter((s) => !s.type).map((s) => s.name);
    expect(topLevel).toContain('data_source');
  });

  it('expandable sections cover layout, performance, holdings, activities, display, advanced', () => {
    const expandable = ParqetCompanionCard.getConfigForm() as Array<{ type?: string; title?: string }>;
    const titles = expandable.filter((s) => s.type === 'expandable').map((s) => s.title?.toLowerCase());
    expect(titles).toContain('layout');
    expect(titles).toContain('performance');
    expect(titles).toContain('holdings');
    expect(titles).toContain('activities');
    expect(titles).toContain('display');
    expect(titles).toContain('advanced');
  });
});
