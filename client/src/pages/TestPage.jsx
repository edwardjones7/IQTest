import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuestions, submitAnswers } from '../services/api.js';
import { useTestEngine } from '../hooks/useTestEngine.js';
import { useTimer } from '../hooks/useTimer.js';
import Header from '../components/layout/Header.jsx';
import ProgressBar from '../components/layout/ProgressBar.jsx';
import QuestionCard from '../components/test/QuestionCard.jsx';
import Timer from '../components/test/Timer.jsx';

export default function TestPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const engine = useTestEngine(questions || []);
  const timer = useTimer();

  // Load questions and start the engine
  useEffect(() => {
    fetchQuestions()
      .then(qs => setQuestions(qs))
      .catch(() => setLoadError('Failed to load questions. Is the server running?'));
  }, []);

  useEffect(() => {
    if (questions && questions.length > 0 && !engine.initialized) {
      engine.start();
    }
  }, [questions, engine.initialized]); // eslint-disable-line

  // Submit all answers when test is complete
  useEffect(() => {
    if (engine.isComplete && engine.answers.length > 0 && !submitting) {
      setSubmitting(true);
      submitAnswers(engine.getSubmittableAnswers())
        .then(results => {
          navigate('/results', { state: { results } });
        })
        .catch(() => {
          setLoadError('Failed to submit answers. Please try again.');
          setSubmitting(false);
        });
    }
  }, [engine.isComplete]); // eslint-disable-line

  function handleSelect(option) {
    setSelectedOption(option);
  }

  function handleNext() {
    if (!selectedOption) return;
    engine.submitAnswer(selectedOption);
    setSelectedOption(null);
  }

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card max-w-md text-center">
          <p className="text-warm-700 font-medium mb-4">{loadError}</p>
          <button onClick={() => window.location.reload()} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!questions || !engine.initialized || !engine.currentQuestion) {
    if (submitting || engine.isComplete) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-warm-300 border-t-warm-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-warm-600 font-medium">Calculating your results...</p>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-warm-300 border-t-warm-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-warm-600 font-medium">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-warm-50">
      <Header
        title="IQ Assessment"
        subtitle={`Question ${engine.totalAnswered + 1} of ${engine.totalQuestions}`}
      />

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        {/* Progress + timer row */}
        <div className="flex items-start justify-between mb-6 gap-4">
          <div className="flex-1">
            <ProgressBar
              current={engine.totalAnswered}
              total={engine.totalQuestions}
              domains={engine.domainStates}
            />
          </div>
          <Timer formatted={timer.formatted} />
        </div>

        {/* Question card */}
        <QuestionCard
          question={engine.currentQuestion}
          selectedOption={selectedOption}
          onSelect={handleSelect}
          questionNumber={engine.totalAnswered + 1}
        />

        {/* Next button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`btn-primary px-10 transition-opacity ${!selectedOption ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            {engine.totalAnswered + 1 === engine.totalQuestions ? 'Finish Test' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
}
