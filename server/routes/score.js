'use strict';

const express = require('express');
const router = express.Router();
const questions = require('../data/questions.json');
const { computeScores } = require('../services/scoringEngine');
const { generateNarrative } = require('../services/narrativeEngine');

// Build a lookup map for fast access
const questionMap = new Map(questions.map(q => [q.id, q]));

router.post('/', (req, res) => {
  const { answers } = req.body;

  if (!Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: 'answers array is required' });
  }

  const answeredQuestions = [];

  for (const answer of answers) {
    const { questionId, selectedOption } = answer;
    const question = questionMap.get(questionId);

    if (!question) continue; // Skip unknown question IDs

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
});

module.exports = router;
