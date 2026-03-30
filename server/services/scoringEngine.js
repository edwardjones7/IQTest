'use strict';

const { clamp, iqToPercentile, weightedMean } = require('../utils/iqMath');

const DOMAIN_WEIGHTS = {
  pattern:   1.2,
  numerical: 1.1,
  verbal:    1.0,
  spatial:   0.9,
};

const IQ_MIN = 40;
const IQ_MAX = 160;
const DIFFICULTY_EXPONENT = 1.4;
const BASELINE_DIFFICULTY = 3.0;
const DIFFICULTY_CORRECTION_FACTOR = 0.08;

const IQ_BANDS = [
  { min: 145, label: 'Exceptionally Superior' },
  { min: 130, label: 'Very Superior' },
  { min: 120, label: 'Superior' },
  { min: 110, label: 'High Average' },
  { min: 90,  label: 'Average' },
  { min: 80,  label: 'Low Average' },
  { min: 70,  label: 'Borderline' },
  { min: 0,   label: 'Extremely Below Average' },
];

function getIQBand(iq) {
  for (const band of IQ_BANDS) {
    if (iq >= band.min) return band.label;
  }
  return 'Extremely Below Average';
}

/**
 * Score a single domain from answered questions.
 * @param {Array} domainAnswers - [{difficulty, correct}, ...]
 * @returns {object} { rawAccuracy, adjustedScore, iq, avgDifficulty, questionsAnswered }
 */
function scoreDomain(domainAnswers) {
  if (domainAnswers.length === 0) {
    return { rawAccuracy: 0, adjustedScore: 0, iq: 70, avgDifficulty: 3, questionsAnswered: 0 };
  }

  const totalWeight = domainAnswers.reduce((sum, q) => sum + Math.pow(q.difficulty, DIFFICULTY_EXPONENT), 0);
  const earnedWeight = domainAnswers.reduce((sum, q) => {
    return sum + (q.correct ? Math.pow(q.difficulty, DIFFICULTY_EXPONENT) : 0);
  }, 0);

  const rawAccuracy = totalWeight > 0 ? earnedWeight / totalWeight : 0;
  const rawScore = rawAccuracy * 100;

  const avgDifficulty = domainAnswers.reduce((sum, q) => sum + q.difficulty, 0) / domainAnswers.length;
  const correction = 1 + (avgDifficulty - BASELINE_DIFFICULTY) * DIFFICULTY_CORRECTION_FACTOR;
  const adjustedScore = clamp(rawScore * correction, 0, 100);

  // Map adjusted score (0–100) to IQ scale
  // We use a direct linear mapping: 0 → IQ_MIN, 50 → 100, 100 → IQ_MAX
  // With the z-score formula: z = (adjusted - 50) / 15, iq = 100 + z*15
  const z = (adjustedScore - 50) / 15;
  const iq = clamp(Math.round(100 + z * 15), IQ_MIN, IQ_MAX);

  return {
    rawAccuracy: Math.round(rawAccuracy * 100) / 100,
    adjustedScore: Math.round(adjustedScore * 10) / 10,
    iq,
    avgDifficulty: Math.round(avgDifficulty * 10) / 10,
    questionsAnswered: domainAnswers.length,
  };
}

/**
 * Compute full IQ results from all answers.
 * @param {Array} answeredQuestions - [{questionId, domain, difficulty, correct}, ...]
 * @returns {object} Full score object
 */
function computeScores(answeredQuestions) {
  const domains = ['pattern', 'verbal', 'numerical', 'spatial'];
  const domainResults = {};

  for (const domain of domains) {
    const domainAnswers = answeredQuestions
      .filter(q => q.domain === domain)
      .map(q => ({ difficulty: q.difficulty, correct: q.correct }));
    domainResults[domain] = scoreDomain(domainAnswers);
  }

  // Compute composite IQ as weighted mean of domain IQs
  const domainIQItems = domains
    .filter(d => domainResults[d].questionsAnswered > 0)
    .map(d => ({ value: domainResults[d].iq, weight: DOMAIN_WEIGHTS[d] }));

  const compositeIQ = domainIQItems.length > 0
    ? clamp(Math.round(weightedMean(domainIQItems)), IQ_MIN, IQ_MAX)
    : 100;

  const percentile = iqToPercentile(compositeIQ);
  const band = getIQBand(compositeIQ);

  const totalCorrect = answeredQuestions.filter(q => q.correct).length;

  return {
    composite: { iq: compositeIQ, percentile, band },
    domains: domainResults,
    meta: {
      totalQuestions: answeredQuestions.length,
      totalCorrect,
      testDate: new Date().toISOString(),
    },
  };
}

module.exports = { computeScores, getIQBand, scoreDomain };
