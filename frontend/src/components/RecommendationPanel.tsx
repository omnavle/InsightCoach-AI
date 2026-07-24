import type { MLRecommendation } from "../types";

interface RecommendationPanelProps {
  recommendation: MLRecommendation;
}

function NoteList({ title, items }: { title: string; items: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="mb-5">
      <p className="eyebrow mb-2">{title}</p>
      <ul className="space-y-1.5 text-sm text-ink-700">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="font-mono text-ink-400">–</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RecommendationPanel({ recommendation }: RecommendationPanelProps) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-2">
        <span className="font-mono text-xs uppercase tracking-wide text-ink-500">Problem type</span>
        <span className="border border-pine-500 text-pine-600 px-2 py-0.5 text-sm font-medium">
          {recommendation.ml_problem}
        </span>
      </div>
      <p className="text-sm text-ink-700 mb-6 leading-relaxed border-l-2 border-pine-500 pl-4">
        {recommendation.explanation}
      </p>

      <NoteList title="Suggested algorithms" items={recommendation.suggested_algorithms} />
      <NoteList title="Data cleaning steps" items={recommendation.data_cleaning_steps} />
      <NoteList title="Feature engineering ideas" items={recommendation.feature_engineering_ideas} />
      <NoteList title="Missing value handling" items={recommendation.missing_value_handling} />
      <NoteList title="Encoding techniques" items={recommendation.encoding_techniques} />
      <NoteList title="Feature scaling" items={recommendation.feature_scaling} />
    </div>
  );
}
