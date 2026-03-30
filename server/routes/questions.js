'use strict';

const express = require('express');
const router = express.Router();
const questions = require('../data/questions.json');

// Strip correctAnswer before sending to client
const sanitizedQuestions = questions.map(({ correctAnswer, ...rest }) => rest);

router.get('/', (req, res) => {
  res.json({
    questions: sanitizedQuestions,
    total: sanitizedQuestions.length,
  });
});

module.exports = router;
