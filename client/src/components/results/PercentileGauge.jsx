import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { iqBandColor } from '../../utils/scoring.js';

export default function PercentileGauge({ percentile, band, iq }) {
  const color = iqBandColor(iq);
  const data = [{ value: percentile, fill: color }];

  return (
    <div className="card flex flex-col items-center">
      <h3 className="font-bold text-warm-800 text-lg mb-1 self-start">Percentile Rank</h3>
      <p className="text-sm text-warm-400 mb-4 self-start">Where you stand vs. the general population</p>
      <div className="relative w-48 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="100%"
            startAngle={90}
            endAngle={-270}
            data={data}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar
              background={{ fill: '#ffedd5' }}
              dataKey="value"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-4xl font-extrabold" style={{ color }}>
            {percentile}
            <span className="text-xl">th</span>
          </span>
          <span className="text-xs text-warm-400 font-medium mt-0.5">percentile</span>
        </div>
      </div>
      <p className="text-sm text-warm-600 text-center mt-4 max-w-xs">
        You scored higher than <strong className="text-warm-800">{percentile}%</strong> of people.
        Classification: <strong style={{ color }}>{band}</strong>.
      </p>
      <div className="w-full mt-5 flex flex-col gap-1.5">
        {[
          { label: 'Top 2%', min: 98 },
          { label: 'Top 10%', min: 90 },
          { label: 'Top 25%', min: 75 },
          { label: 'Average', min: 25 },
          { label: 'Bottom 25%', min: 0 },
        ].map(tier => (
          <div key={tier.label} className="flex items-center gap-2 text-xs">
            <div
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: percentile >= tier.min ? color : '#fed7aa',
              }}
            />
            <span className={percentile >= tier.min ? 'text-warm-700 font-medium' : 'text-warm-300'}>
              {tier.label}
            </span>
            {tier.min > 0 && (
              <span className="text-warm-200">≥ {tier.min}th percentile</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
