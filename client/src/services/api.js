import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export async function fetchQuestions() {
  const { data } = await api.get('/questions');
  return data.questions;
}

export async function submitAnswers(answers) {
  const { data } = await api.post('/score', { answers });
  return data;
}
