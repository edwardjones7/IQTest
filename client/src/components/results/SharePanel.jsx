import { useNavigate } from 'react-router-dom';

export default function SharePanel({ iq, band, percentile }) {
  const navigate = useNavigate();

  function handlePrint() {
    window.print();
  }

  function handleRetake() {
    navigate('/');
  }

  return (
    <div className="card no-print">
      <h3 className="font-bold text-warm-800 text-lg mb-1">Share Your Results</h3>
      <p className="text-sm text-warm-400 mb-5">Save or print your assessment report</p>

      <div className="bg-warm-50 rounded-2xl p-4 mb-5 text-center">
        <p className="text-warm-700 text-sm">
          "I scored <strong className="text-warm-800">{iq}</strong> on the IQ assessment —
          {' '}<strong className="text-warm-800">{band}</strong> ({percentile}th percentile)"
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={handlePrint} className="btn-primary flex-1 flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print / Save PDF
        </button>
        <button onClick={handleRetake} className="btn-secondary flex-1">
          Retake Test
        </button>
      </div>
    </div>
  );
}
