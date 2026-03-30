import { useState } from 'react';

const SECTIONS = [
  { key: 'overall',   label: 'Overall Assessment', icon: '◉' },
  { key: 'strengths', label: 'Cognitive Strengths',  icon: '▲' },
  { key: 'areas',     label: 'Areas for Growth',     icon: '◇' },
  { key: 'profile',   label: 'Profile Pattern',      icon: '◈' },
];

export default function NarrativePanel({ narrative }) {
  const [activeSection, setActiveSection] = useState('overall');

  return (
    <div className="card">
      <h3 className="font-bold text-warm-800 text-lg mb-1">In-Depth Analysis</h3>
      <p className="text-sm text-warm-400 mb-5">Detailed interpretation of your cognitive profile</p>

      {/* Section tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {SECTIONS.map(s => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSection === s.key
                ? 'bg-warm-500 text-white shadow-soft'
                : 'bg-warm-100 text-warm-600 hover:bg-warm-200'
            }`}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* Section content */}
      <div className="bg-warm-50 rounded-2xl p-5 min-h-32">
        {narrative[activeSection]
          ? narrative[activeSection].split('\n\n').map((para, i) => (
              <p key={i} className={`text-warm-700 leading-relaxed text-sm ${i > 0 ? 'mt-3' : ''}`}>
                {para}
              </p>
            ))
          : <p className="text-warm-400 text-sm">No data available for this section.</p>
        }
      </div>
    </div>
  );
}
