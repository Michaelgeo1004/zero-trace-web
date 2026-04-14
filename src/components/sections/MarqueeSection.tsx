import { site } from "@/content/site";

export function MarqueeSection() {
  const items = [...site.marquee, ...site.marquee];

  return (
    <div className="mode-marquee overflow-hidden border-b py-3">
      <div className="flex w-max animate-marquee">
        {items.map((line, i) => (
          <span
            key={`${line}-${i}`}
            className="mode-muted mx-8 whitespace-nowrap text-sm font-medium uppercase tracking-widest"
          >
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}
