export default function ProgressBar({ current, total, domains }) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-warm-500 mb-2">
        <span>Question {current} of {total}</span>
        <span>{percent}% complete</span>
      </div>
      <div className="w-full bg-warm-100 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-warm-500 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      {domains && (
        <div className="flex gap-4 mt-3 flex-wrap">
          {Object.entries(domains).map(([domain, state]) => (
            <div key={domain} className="flex items-center gap-1.5 text-xs text-warm-500">
              <span className="font-medium capitalize">{domain}</span>
              <span className="text-warm-300">·</span>
              <span>{state.questionsAnswered}/10</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
