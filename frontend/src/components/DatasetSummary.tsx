import type { Dataset } from "../types";

interface DatasetSummaryProps {
  dataset: Dataset;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function DatasetSummary({ dataset }: DatasetSummaryProps) {
  const stats: [string, string][] = [
    ["rows", dataset.rows.toLocaleString()],
    ["cols", dataset.columns.toLocaleString()],
    ["size", formatFileSize(dataset.file_size)],
    ["uploaded", new Date(dataset.uploaded_at).toLocaleDateString()],
  ];

  return (
    <section className="reveal border border-line bg-card p-5" style={{ borderStyle: "dashed" }}>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="eyebrow mb-1">Dataset on file</p>
          <p className="font-display text-lg text-ink-900 truncate max-w-md">
            {dataset.original_filename}
          </p>
        </div>
        <dl className="flex gap-6 font-mono text-xs">
          {stats.map(([label, value]) => (
            <div key={label}>
              <dt className="text-ink-500 uppercase tracking-wide">{label}</dt>
              <dd className="text-ink-900 mt-0.5">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
