/**
 * Regression tests for card editor schema bugs:
 * - All expandable sections must have flatten:true so nested values propagate
 * - portfolio_id must NOT be in the static schema (it's a dynamic picker)
 * - show_chart must be in the Performance section
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

  it('includes show_chart in the Performance section', () => {
    const perf = schema.find(
      (s) => s.type === 'expandable' && (s as { title?: string }).title === 'Performance',
    ) as SchemaItem & { title?: string };
    expect(perf).toBeDefined();
    const names = perf!.schema!.map((s) => s.name);
    expect(names).toContain('show_chart');
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
