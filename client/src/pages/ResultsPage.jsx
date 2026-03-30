import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/layout/Header.jsx';
import ScoreDisplay from '../components/results/ScoreDisplay.jsx';
import DomainBarChart from '../components/results/DomainBarChart.jsx';
import PercentileGauge from '../components/results/PercentileGauge.jsx';
import NarrativePanel from '../components/results/NarrativePanel.jsx';
import SharePanel from '../components/results/SharePanel.jsx';

export default function ResultsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const results = state?.results;

  useEffect(() => {
    if (!results) navigate('/', { replace: true });
  }, [results, navigate]);

  if (!results) return null;

  const { composite, domains, narrative, meta } = results;

  return (
    <div className="min-h-screen bg-warm-50">
      <Header title="Your Results" subtitle="IQ Assessment Complete" />

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Test summary banner */}
        <div className="bg-warm-100 rounded-2xl px-5 py-3 flex flex-wrap gap-4 text-sm text-warm-600 mb-8 no-print">
          <span>Questions answered: <strong>{meta.totalQuestions}</strong></span>
          <span>Correct: <strong>{meta.totalCorrect}</strong></span>
          <span>Accuracy: <strong>{Math.round((meta.totalCorrect / meta.totalQuestions) * 100)}%</strong></span>
        </div>

        {/* Main score hero */}
        <div className="mb-6">
          <ScoreDisplay
            iq={composite.iq}
            percentile={composite.percentile}
            band={composite.band}
          />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <DomainBarChart domains={domains} />
          <PercentileGauge
            percentile={composite.percentile}
            band={composite.band}
            iq={composite.iq}
          />
        </div>

        {/* Narrative */}
        <div className="mb-6">
          <NarrativePanel narrative={narrative} />
        </div>

        {/* Domain detail cards */}
        <div className="card mb-6">
          <h3 className="font-bold text-warm-800 text-lg mb-1">Domain Breakdown</h3>
          <p className="text-sm text-warm-400 mb-5">Detailed scores per cognitive domain</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(domains).map(([domain, d]) => (
              <div key={domain} className="bg-warm-50 rounded-2xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-semibold text-warm-700 capitalize">{domain}</span>
                  <span className="text-xl font-extrabold text-warm-800">{d.iq}</span>
                </div>
                <div className="w-full bg-warm-200 rounded-full h-1.5 mb-2">
                  <div
                    className="bg-warm-500 h-1.5 rounded-full"
                    style={{ width: `${Math.round(d.rawAccuracy * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-warm-400">
                  <span>{d.questionsAnswered} questions</span>
                  <span>Accuracy: {Math.round(d.rawAccuracy * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Share / print */}
        <SharePanel
          iq={composite.iq}
          band={composite.band}
          percentile={composite.percentile}
        />

        {/* Print footer */}
        <div className="hidden print:block mt-8 text-center text-xs text-warm-400">
          IQ Assessment Report · Generated {new Date(meta.testDate).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
