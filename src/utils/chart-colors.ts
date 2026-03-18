import type { AssetType } from '../types';

/**
 * Color palette for chart segments, cycling if more segments than colors.
 * Colors are chosen for good contrast on both light and dark HA themes.
 */
const PALETTE = [
  '#4285f4', // blue
  '#ea4335', // red
  '#fbbc04', // yellow
  '#34a853', // green
  '#ff6d01', // orange
  '#46bdc6', // teal
  '#7b1fa2', // purple
  '#e91e63', // pink
  '#00acc1', // cyan
  '#8d6e63', // brown
];

const ASSET_TYPE_COLORS: Record<AssetType, string> = {
  security:    '#4285f4',
  crypto:      '#fbbc04',
  commodity:   '#ff6d01',
  cash:        '#34a853',
  real_estate: '#8d6e63',
  custom:      '#7b1fa2',
};

export function colorForAssetType(type: AssetType): string {
  return ASSET_TYPE_COLORS[type] ?? PALETTE[0];
}

export function colorAtIndex(index: number): string {
  return PALETTE[index % PALETTE.length];
}
