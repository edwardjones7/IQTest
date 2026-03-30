import { iqBandColor } from '../../utils/scoring.js';

export default function ScoreDisplay({ iq, percentile, band }) {
  const color = iqBandColor(iq);

  return (
    <div className="card text-center">
      <p className="text-sm font-semibold text-warm-400 uppercase tracking-widest mb-2">Your IQ Score</p>
      <div
        className="text-8xl font-extrabold leading-none mb-3 tabular-nums"
        style={{ color }}
      >
        {iq}
      </div>
      <div
        className="inline-block text-sm font-bold px-4 py-1.5 rounded-full mb-4"
        style={{ backgroundColor: `${color}18`, color }}
      >
        {band}
      </div>
      <div className="flex items-center justify-center gap-2 text-warm-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-sm">
          Scored higher than <strong className="text-warm-700">{percentile}%</strong> of the general population
        </span>
      </div>
    </div>
  );
}
