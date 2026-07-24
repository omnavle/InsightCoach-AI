interface LessonNavItem {
  id: string;
  number: string;
  title: string;
  unlocked: boolean;
}

interface LessonNavProps {
  items: LessonNavItem[];
}

export default function LessonNav({ items }: LessonNavProps) {
  return (
    <nav className="hidden md:block sticky top-8 self-start">
      <ol className="relative border-l border-line pl-0">
        {items.map((item) => (
          <li key={item.id} className="relative">
            <a
              href={item.unlocked ? `#${item.id}` : undefined}
              aria-disabled={!item.unlocked}
              className={`group flex items-baseline gap-3 py-3 pl-5 pr-6 -ml-px border-l-2 transition-colors ${
                item.unlocked
                  ? "border-transparent hover:border-pine-500 cursor-pointer"
                  : "border-transparent cursor-default opacity-35"
              }`}
            >
              <span className="font-mono text-xs text-pine-600 tabular-nums">{item.number}</span>
              <span
                className={`text-sm ${
                  item.unlocked ? "text-ink-900" : "text-ink-500"
                } group-hover:text-pine-600 transition-colors`}
              >
                {item.title}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
