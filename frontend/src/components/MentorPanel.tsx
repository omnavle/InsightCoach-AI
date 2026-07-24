import type { DatasetOverview } from "../types";

interface MentorPanelProps {
  overview: DatasetOverview;
}

export default function MentorPanel({ overview }: MentorPanelProps) {
  return (
    <div>
      <dl className="grid grid-cols-3 gap-4 mb-6 font-mono text-xs">
        <div>
          <dt className="text-ink-500 uppercase tracking-wide">shape</dt>
          <dd className="text-ink-900 mt-0.5">
            {overview.shape.rows} × {overview.shape.columns}
          </dd>
        </div>
        <div>
          <dt className="text-ink-500 uppercase tracking-wide">duplicates</dt>
          <dd className="text-ink-900 mt-0.5">{overview.duplicate_rows}</dd>
        </div>
        <div>
          <dt className="text-ink-500 uppercase tracking-wide">cols w/ gaps</dt>
          <dd className="text-ink-900 mt-0.5">
            {overview.columns.filter((c) => c.missing_values > 0).length}
          </dd>
        </div>
      </dl>

      <div className="overflow-x-auto mb-6 border border-line">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="font-mono text-xs uppercase tracking-wide text-ink-500 border-b border-line">
              <th className="py-2 px-3">Column</th>
              <th className="py-2 px-3">Type</th>
              <th className="py-2 px-3">Missing</th>
              <th className="py-2 px-3">Unique</th>
            </tr>
          </thead>
          <tbody>
            {overview.columns.map((col, i) => (
              <tr key={col.name} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                <td className="py-2 px-3 font-medium text-ink-900">{col.name}</td>
                <td className="py-2 px-3 font-mono text-xs text-ink-500">{col.dtype}</td>
                <td className="py-2 px-3 font-mono text-xs text-ink-500">{col.missing_values}</td>
                <td className="py-2 px-3 font-mono text-xs text-ink-500">{col.unique_values}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-l-2 border-pine-500 pl-4">
        <p className="eyebrow mb-2">Reading the data</p>
        <p className="text-sm leading-relaxed text-ink-700 whitespace-pre-line">
          {overview.ai_summary}
        </p>
      </div>
    </div>
  );
}
