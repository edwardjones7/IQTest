'use strict';

const questions = require('../server/data/questions.json');
const sanitized = questions.map(({ correctAnswer, ...rest }) => rest);

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ questions: sanitized, total: sanitized.length });
};
