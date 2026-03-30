'use strict';

// Error function approximation (Abramowitz and Stegun)
function erf(x) {
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

// Standard normal CDF
function normalCDF(z) {
  return 0.5 * (1 + erf(z / Math.sqrt(2)));
}

// z-score given IQ
function iqToZ(iq, mean = 100, sd = 15) {
  return (iq - mean) / sd;
}

// IQ given z-score
function zToIQ(z, mean = 100, sd = 15) {
  return mean + z * sd;
}

// Clamp a value between min and max
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// IQ to percentile (1–99)
function iqToPercentile(iq) {
  const z = iqToZ(iq);
  const p = normalCDF(z) * 100;
  return clamp(Math.round(p), 1, 99);
}

// Weighted mean: [{value, weight}, ...]
function weightedMean(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  const weightedSum = items.reduce((sum, item) => sum + item.value * item.weight, 0);
  return totalWeight === 0 ? 0 : weightedSum / totalWeight;
}

module.exports = { erf, normalCDF, iqToZ, zToIQ, clamp, iqToPercentile, weightedMean };
