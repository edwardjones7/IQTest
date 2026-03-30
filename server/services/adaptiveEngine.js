'use strict';

const START_DIFFICULTY = 3;
const MIN_DIFFICULTY = 1;
const MAX_DIFFICULTY = 5;
const CONSECUTIVE_CORRECT_TO_LEVEL_UP = 2;

/**
 * Compute difficulty adjustments given a sequence of results per domain.
 * Used server-side for validation/logging only.
 * @param {Array} answers - [{domain, difficulty, correct}, ...] in order
 * @returns {object} domainState per domain
 */
function replayAdaptive(answers) {
  const domainState = {};
  const domains = ['pattern', 'verbal', 'numerical', 'spatial'];

  for (const domain of domains) {
    domainState[domain] = {
      currentDifficulty: START_DIFFICULTY,
      consecutiveCorrect: 0,
      questionsAnswered: 0,
    };
  }

  for (const answer of answers) {
    const state = domainState[answer.domain];
    if (!state) continue;

    state.questionsAnswered++;

    if (answer.correct) {
      state.consecutiveCorrect++;
      if (state.consecutiveCorrect >= CONSECUTIVE_CORRECT_TO_LEVEL_UP) {
        state.currentDifficulty = Math.min(MAX_DIFFICULTY, state.currentDifficulty + 1);
        state.consecutiveCorrect = 0;
      }
    } else {
      state.currentDifficulty = Math.max(MIN_DIFFICULTY, state.currentDifficulty - 1);
      state.consecutiveCorrect = 0;
    }
  }

  return domainState;
}

/**
 * Select the next question for a domain given current difficulty and already-answered IDs.
 * @param {Array} allQuestions - full question bank
 * @param {string} domain
 * @param {number} currentDifficulty
 * @param {Set} answeredIds
 * @returns {object|null} next question or null if none available
 */
function selectNextQuestion(allQuestions, domain, currentDifficulty, answeredIds) {
  let candidates = allQuestions.filter(
    q => q.domain === domain &&
         q.difficulty === currentDifficulty &&
         !answeredIds.has(q.id)
  );

  if (candidates.length === 0) {
    candidates = allQuestions.filter(
      q => q.domain === domain &&
           Math.abs(q.difficulty - currentDifficulty) <= 1 &&
           !answeredIds.has(q.id)
    );
  }

  if (candidates.length === 0) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

module.exports = { replayAdaptive, selectNextQuestion };
