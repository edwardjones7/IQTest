export const DOMAIN_LABELS = {
  pattern:   'Pattern Recognition',
  verbal:    'Verbal Reasoning',
  numerical: 'Numerical Reasoning',
  spatial:   'Spatial Reasoning',
};

export const DOMAIN_COLORS = {
  pattern:   '#F97316',
  verbal:    '#8B5CF6',
  numerical: '#06B6D4',
  spatial:   '#10B981',
};

export function iqBandColor(iq) {
  if (iq >= 130) return '#059669'; // emerald
  if (iq >= 120) return '#10B981'; // green
  if (iq >= 110) return '#22C55E'; // light green
  if (iq >= 90)  return '#F59E0B'; // amber
  if (iq >= 80)  return '#F97316'; // orange
  return '#EF4444';                // red
}

export function percentileLabel(pct) {
  if (pct >= 99) return 'Top 1%';
  if (pct >= 95) return `Top 5%`;
  if (pct >= 90) return `Top 10%`;
  if (pct >= 75) return `Top 25%`;
  if (pct >= 50) return `Above Average`;
  if (pct >= 25) return `Below Average`;
  return `Bottom ${pct}%`;
}

export function formatAccuracy(rawAccuracy) {
  return `${Math.round(rawAccuracy * 100)}%`;
}
