export default function Header() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-6 flex items-end justify-between">
        <div>
          <p className="eyebrow mb-1">Learn any dataset before building a model.</p>
          <h1 className="font-display text-2xl text-ink-900">InsightCoach AI</h1>
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-xs text-ink-500 hover:text-pine-600 transition-colors"
        >
          source →
        </a>
      </div>
    </header>
  );
}
