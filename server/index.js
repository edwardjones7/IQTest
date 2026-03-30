'use strict';

const express = require('express');
const cors = require('cors');

const questionsRouter = require('./routes/questions');
const scoreRouter = require('./routes/score');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }));
app.use(express.json());

app.use('/api/questions', questionsRouter);
app.use('/api/score', scoreRouter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`IQ Test server running on http://localhost:${PORT}`);
});
