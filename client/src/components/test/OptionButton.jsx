export default function OptionButton({ label, text, selected, onClick, disabled }) {
  const base = 'w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-150 flex items-start gap-3 font-medium';
  const state = selected
    ? 'border-warm-500 bg-warm-50 text-warm-800 shadow-soft'
    : disabled
    ? 'border-warm-100 bg-warm-50 text-warm-300 cursor-not-allowed'
    : 'border-warm-200 bg-white text-warm-800 hover:border-warm-400 hover:bg-warm-50 cursor-pointer';

  return (
    <button
      className={`${base} ${state}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={`flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center text-sm font-bold transition-colors ${
        selected ? 'bg-warm-500 text-white' : 'bg-warm-100 text-warm-600'
      }`}>
        {label}
      </span>
      <span className="pt-0.5 leading-snug">{text}</span>
    </button>
  );
}
