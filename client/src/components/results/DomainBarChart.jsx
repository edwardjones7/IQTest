import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ReferenceLine, ResponsiveContainer,
} from 'recharts';
import { DOMAIN_LABELS, DOMAIN_COLORS, iqBandColor } from '../../utils/scoring.js';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { domain, iq, rawAccuracy } = payload[0].payload;
    return (
      <div className="bg-white border border-warm-100 rounded-xl shadow-card p-3 text-sm">
        <p className="font-semibold text-warm-800">{DOMAIN_LABELS[domain]}</p>
        <p className="text-warm-600">IQ: <strong>{iq}</strong></p>
        <p className="text-warm-500">Accuracy: {Math.round(rawAccuracy * 100)}%</p>
      </div>
    );
  }
  return null;
};

export default function DomainBarChart({ domains }) {
  const data = Object.entries(domains).map(([domain, d]) => ({
    domain,
    name: DOMAIN_LABELS[domain].split(' ')[0], // short label
    iq: d.iq,
    rawAccuracy: d.rawAccuracy,
  }));

  return (
    <div className="card">
      <h3 className="font-bold text-warm-800 text-lg mb-1">Domain Scores</h3>
      <p className="text-sm text-warm-400 mb-6">IQ score per cognitive domain (mean = 100)</p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: '#9a3412', fontSize: 12, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[60, 160]}
            tick={{ fill: '#c2410c', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#fff7ed' }} />
          <ReferenceLine y={100} stroke="#fdba74" strokeDasharray="4 4" label={{ value: 'Average', fill: '#fb923c', fontSize: 11, position: 'right' }} />
          <Bar dataKey="iq" radius={[8, 8, 0, 0]} maxBarSize={64}>
            {data.map((entry) => (
              <Cell key={entry.domain} fill={DOMAIN_COLORS[entry.domain]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-3 mt-4">
        {data.map(entry => (
          <div key={entry.domain} className="flex items-center gap-2 text-sm">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: DOMAIN_COLORS[entry.domain] }}
            />
            <span className="text-warm-600 truncate">{DOMAIN_LABELS[entry.domain]}</span>
            <span className="ml-auto font-bold" style={{ color: iqBandColor(entry.iq) }}>{entry.iq}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
