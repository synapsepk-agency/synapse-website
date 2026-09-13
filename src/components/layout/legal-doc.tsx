import type { LegalSection } from "@/lib/legal";

export function LegalDoc({ updated, sections }: { updated: string; sections: LegalSection[] }) {
  return (
    <article className="legal-doc mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm text-fg-subtle">Last Updated: {updated}</p>
      <div className="mt-10 space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-xl font-semibold text-fg sm:text-2xl">{section.title}</h2>
            <div className="mt-4 space-y-3 text-[0.98rem] leading-relaxed text-fg-muted">
              {section.blocks.map((block, i) => {
                if (block.type === "p") return <p key={i}>{block.text}</p>;
                if (block.type === "h")
                  return (
                    <h3 key={i} className="pt-2 font-display text-base font-semibold text-fg">
                      {block.text}
                    </h3>
                  );
                return (
                  <ul key={i} className="list-disc space-y-1.5 ps-5">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
