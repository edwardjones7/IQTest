export default function Header({ title = 'IQ Assessment', subtitle }) {
  return (
    <header className="bg-white border-b border-warm-100 shadow-soft">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-warm-700 tracking-tight">{title}</h1>
          {subtitle && <p className="text-sm text-warm-400">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-warm-400 inline-block" />
          <span className="text-xs text-warm-400 font-medium">Adaptive Test</span>
        </div>
      </div>
    </header>
  );
}
