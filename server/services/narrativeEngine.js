'use strict';

const DOMAIN_LABELS = {
  pattern:   'Pattern Recognition',
  verbal:    'Verbal Reasoning',
  numerical: 'Numerical Reasoning',
  spatial:   'Spatial Reasoning',
};

const OVERALL_NARRATIVES = {
  'Exceptionally Superior': (iq, pct) =>
    `Your composite IQ of ${iq} places you in the ${pct}th percentile, reflecting Exceptionally Superior cognitive ability. This level of intellectual performance is exceptionally rare, occurring in fewer than 1 in 300 individuals. Your results demonstrate outstanding capacity across multiple dimensions of reasoning, placing you among the highest-performing individuals in the general population.`,
  'Very Superior': (iq, pct) =>
    `Your composite IQ of ${iq} places you in the ${pct}th percentile, reflecting Very Superior cognitive ability. Fewer than 2% of individuals score at this level. Your performance demonstrates exceptional reasoning skills, strong working memory capacity, and highly developed pattern recognition and logical analysis.`,
  'Superior': (iq, pct) =>
    `Your composite IQ of ${iq} places you in the ${pct}th percentile, reflecting Superior cognitive ability. This places you in approximately the top 10% of the general population. You demonstrated strong analytical reasoning, efficient problem-solving, and an ability to handle novel and complex cognitive challenges.`,
  'High Average': (iq, pct) =>
    `Your composite IQ of ${iq} places you in the ${pct}th percentile, reflecting High Average cognitive ability. You performed noticeably above the general population average, demonstrating solid reasoning skills and an ability to work through moderately complex problems with consistency.`,
  'Average': (iq, pct) =>
    `Your composite IQ of ${iq} places you in the ${pct}th percentile, reflecting Average cognitive ability. This is the most common range in the general population, representing solid baseline reasoning across multiple domains. Your performance was consistent and reliable across the various question types.`,
  'Low Average': (iq, pct) =>
    `Your composite IQ of ${iq} places you in the ${pct}th percentile, reflecting Low Average cognitive ability. While your score falls somewhat below the general population mean, cognitive abilities are highly malleable and can be developed with targeted practice across the domains assessed here.`,
  'Borderline': (iq, pct) =>
    `Your composite IQ of ${iq} places you in the ${pct}th percentile. Your performance suggests some challenges with complex reasoning tasks, though focused practice across the domains assessed can lead to meaningful improvement over time.`,
  'Extremely Below Average': (iq, pct) =>
    `Your composite IQ of ${iq} places you in the ${pct}th percentile. Your current performance on this assessment falls below the average range. It is important to note that this test measures specific types of reasoning that can improve significantly with practice and learning.`,
};

function getDomainInsight(domain, iq) {
  if (iq >= 130) return `${DOMAIN_LABELS[domain]} (${iq}) — Exceptional strength. You perform in the top tier on these tasks.`;
  if (iq >= 120) return `${DOMAIN_LABELS[domain]} (${iq}) — Notable strength. You consistently handle complex ${getDomainDesc(domain)} challenges.`;
  if (iq >= 110) return `${DOMAIN_LABELS[domain]} (${iq}) — Solid performance above the population average.`;
  if (iq >= 90)  return `${DOMAIN_LABELS[domain]} (${iq}) — Average range performance. A reliable baseline with room for development.`;
  if (iq >= 80)  return `${DOMAIN_LABELS[domain]} (${iq}) — Below average range. Targeted practice in ${getDomainDesc(domain)} may yield gains.`;
  return `${DOMAIN_LABELS[domain]} (${iq}) — An area for meaningful development. Consistent practice in ${getDomainDesc(domain)} is recommended.`;
}

function getDomainDesc(domain) {
  const descs = {
    pattern:   'visual-abstract reasoning and matrix problem solving',
    verbal:    'language, analogical reasoning, and logical deduction',
    numerical: 'quantitative reasoning and mathematical problem solving',
    spatial:   '3D visualization and mental rotation tasks',
  };
  return descs[domain] || domain;
}

function getProfilePattern(domainResults) {
  const iqValues = Object.values(domainResults).map(d => d.iq);
  const max = Math.max(...iqValues);
  const min = Math.min(...iqValues);
  const spread = max - min;

  const domainEntries = Object.entries(domainResults);
  const strongest = domainEntries.reduce((a, b) => (a[1].iq > b[1].iq ? a : b));
  const weakest = domainEntries.reduce((a, b) => (a[1].iq < b[1].iq ? a : b));

  if (spread <= 10) {
    return `Your cognitive profile is highly uniform, with domain scores spanning only ${spread} IQ points. This consistency suggests balanced development across verbal, numerical, visual-abstract, and spatial reasoning — a hallmark of well-rounded general intelligence.`;
  }
  if (spread <= 20) {
    return `Your profile shows moderate variation across domains (${spread}-point spread). ${DOMAIN_LABELS[strongest[0]]} is your strongest area (${strongest[1].iq}), while ${DOMAIN_LABELS[weakest[0]]} (${weakest[1].iq}) represents your relative area for growth. This degree of variation is common and suggests a cognitive profile with distinct strengths.`;
  }
  return `Your profile shows significant variation across domains (${spread}-point spread), with ${DOMAIN_LABELS[strongest[0]]} as a clear strength (${strongest[1].iq}) and ${DOMAIN_LABELS[weakest[0]]} as the most divergent area (${weakest[1].iq}). Such profiles often indicate specialized cognitive development, which is common in people with focused intellectual or professional backgrounds.`;
}

/**
 * Generate a narrative report from score results.
 * @param {object} scores - Output from scoringEngine.computeScores()
 * @returns {object} { overall, strengths, areas, profile }
 */
function generateNarrative(scores) {
  const { composite, domains } = scores;
  const { iq, percentile, band } = composite;

  const overallFn = OVERALL_NARRATIVES[band] || OVERALL_NARRATIVES['Average'];
  const overall = overallFn(iq, percentile);

  const domainEntries = Object.entries(domains)
    .filter(([, d]) => d.questionsAnswered > 0)
    .sort((a, b) => b[1].iq - a[1].iq);

  const topDomains = domainEntries.slice(0, 2);
  const bottomDomains = [...domainEntries].reverse().slice(0, 2);

  const strengthLines = topDomains.map(([domain, d]) => getDomainInsight(domain, d.iq));
  const areaLines = bottomDomains.map(([domain, d]) => getDomainInsight(domain, d.iq));

  const strengths = `Your strongest cognitive areas in this assessment were:\n\n${strengthLines.join('\n\n')}`;
  const areas = `The following domains represent opportunities for continued development:\n\n${areaLines.join('\n\n')}`;
  const profile = getProfilePattern(domains);

  return { overall, strengths, areas, profile };
}

module.exports = { generateNarrative };
