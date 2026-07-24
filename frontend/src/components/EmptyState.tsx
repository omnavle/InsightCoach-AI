interface EmptyStateProps {
  title: string;
  description: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="border border-line py-10 px-6 text-center" style={{ borderStyle: "dashed" }}>
      <p className="font-display text-lg text-ink-900">{title}</p>
      <p className="text-sm mt-1 max-w-sm mx-auto text-ink-500">{description}</p>
    </div>
  );
}
