import type { ReactNode } from "react";

interface LessonSectionProps {
  number: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  visible: boolean;
}

export default function LessonSection({ number, title, subtitle, children, visible }: LessonSectionProps) {
  if (!visible) return null;

  return (
    <section className="reveal scroll-mt-10" id={`lesson-${number}`}>
      <div className="flex items-baseline gap-3 mb-1">
        <span className="font-mono text-sm text-pine-600">{number}</span>
        <h2 className="font-display text-xl text-ink-900">{title}</h2>
      </div>
      <p className="text-sm text-ink-500 mb-4 pl-8">{subtitle}</p>
      <div className="card">{children}</div>
    </section>
  );
}
