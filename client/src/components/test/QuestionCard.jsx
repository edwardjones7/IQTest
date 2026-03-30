import OptionButton from './OptionButton.jsx';
import { DOMAIN_LABELS, DOMAIN_COLORS } from '../../utils/scoring.js';

const DOMAIN_ICONS = {
  pattern:   '◈',
  verbal:    '◉',
  numerical: '◇',
  spatial:   '◎',
};

export default function QuestionCard({ question, selectedOption, onSelect, questionNumber }) {
  const domainColor = DOMAIN_COLORS[question.domain];
  const domainLabel = DOMAIN_LABELS[question.domain];
  const domainIcon = DOMAIN_ICONS[question.domain];

  return (
    <div className="card max-w-2xl mx-auto">
      {/* Domain badge */}
      <div className="flex items-center gap-2 mb-5">
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ backgroundColor: `${domainColor}18`, color: domainColor }}
        >
          {domainIcon} {domainLabel}
        </span>
        <span className="text-xs text-warm-400">Difficulty {question.difficulty}/5</span>
      </div>

      {/* Question prompt */}
      <p className="text-warm-900 font-medium text-lg leading-relaxed mb-6">
        {question.prompt}
      </p>

      {/* SVG display if present */}
      {question.svgData && (
        <div className="mb-6 p-4 bg-warm-50 rounded-2xl flex items-center justify-center border border-warm-100">
          <div
            className="max-w-full"
            dangerouslySetInnerHTML={{ __html: question.svgData }}
          />
        </div>
      )}

      {/* Options */}
      <div className="flex flex-col gap-3">
        {Object.entries(question.options).map(([key, text]) => (
          <OptionButton
            key={key}
            label={key}
            text={text}
            selected={selectedOption === key}
            onClick={() => onSelect(key)}
          />
        ))}
      </div>
    </div>
  );
}
