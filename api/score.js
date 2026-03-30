'use strict';

const questions = require('../server/data/questions.json');
const { computeScores } = require('../server/services/scoringEngine');
const { generateNarrative } = require('../server/services/narrativeEngine');

const questionMap = new Map(questions.map(q => [q.id, q]));

module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const { answers } = req.body;

  if (!Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: 'answers array is required' });
  }

  const answeredQuestions = [];
  for (const { questionId, selectedOption } of answers) {
    const question = questionMap.get(questionId);
    if (!question) continue;
    answeredQuestions.push({
      questionId,
      domain: question.domain,
      difficulty: question.difficulty,
      correct: question.correctAnswer === selectedOption,
    });
  }

  if (answeredQuestions.length === 0) {
    return res.status(400).json({ error: 'No valid answers found' });
  }

  const scores = computeScores(answeredQuestions);
  const narrative = generateNarrative(scores);
  res.json({ ...scores, narrative });
};
