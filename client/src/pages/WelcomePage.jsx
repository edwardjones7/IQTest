import { useNavigate } from 'react-router-dom';

const DOMAINS = [
  {
    icon: '◈',
    label: 'Pattern Recognition',
    desc: 'Identify rules in visual matrices and abstract sequences.',
    color: '#F97316',
  },
  {
    icon: '◉',
    label: 'Verbal Reasoning',
    desc: 'Analogies, logical deductions, and vocabulary challenges.',
    color: '#8B5CF6',
  },
  {
    icon: '◇',
    label: 'Numerical Reasoning',
    desc: 'Number series, sequences, and quantitative problem solving.',
    color: '#06B6D4',
  },
  {
    icon: '◎',
    label: 'Spatial Reasoning',
    desc: '3D visualization, mental rotation, and shape manipulation.',
    color: '#10B981',
  },
];

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-warm-50 flex flex-col items-center justify-center px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-10 max-w-xl">
        <div className="inline-flex items-center gap-2 bg-warm-100 text-warm-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wide">
          Adaptive IQ Assessment
        </div>
        <h1 className="text-5xl font-extrabold text-warm-900 mb-4 leading-tight">
          Measure Your<br />
          <span className="text-warm-500">Cognitive Ability</span>
        </h1>
        <p className="text-warm-500 text-lg leading-relaxed">
          A scientifically-designed adaptive test across four cognitive domains.
          Get a normed IQ score, percentile ranking, and in-depth analysis.
        </p>
      </div>

      {/* Domain cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full mb-10">
        {DOMAINS.map(d => (
          <div key={d.label} className="card flex items-start gap-4 p-5">
            <span
              className="text-2xl flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${d.color}18`, color: d.color }}
            >
              {d.icon}
            </span>
            <div>
              <p className="font-semibold text-warm-800 text-sm">{d.label}</p>
              <p className="text-warm-500 text-xs mt-0.5 leading-snug">{d.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Test info */}
      <div className="flex flex-wrap justify-center gap-6 text-sm text-warm-500 mb-10">
        <div className="flex items-center gap-2">
          <span className="text-warm-400">◉</span>
          <span>40 adaptive questions</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-warm-400">◉</span>
          <span>15–25 minutes</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-warm-400">◉</span>
          <span>Normed IQ score</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-warm-400">◉</span>
          <span>Detailed analysis</span>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <button
          onClick={() => navigate('/test')}
          className="btn-primary text-lg px-12 py-4"
        >
          Begin Assessment
        </button>
        <p className="text-xs text-warm-400 mt-3">
          No registration required · Results not stored
        </p>
      </div>
    </div>
  );
}
