import { WORK_ITEMS } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

function Mock({ kind }: { kind: (typeof WORK_ITEMS)[number]["kind"] }) {
  if (kind === "web" || kind === "land") {
    return (
      <div className="flex h-full flex-col bg-bg-elevated p-4">
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-fg/20" />
          <span className="size-2 rounded-full bg-fg/20" />
          <span className="size-2 rounded-full bg-fg/20" />
        </div>
        <div className="mt-4 h-3 w-24 rounded-full bg-accent/70" />
        <div className="mt-3 h-8 w-3/4 rounded bg-fg/15" />
        <div className="mt-2 h-3 w-full rounded bg-fg/10" />
        <div className="mt-1 h-3 w-5/6 rounded bg-fg/10" />
        <div className="mt-auto grid grid-cols-3 gap-2 pt-6">
          <div className="h-16 rounded bg-fg/8" />
          <div className="h-16 rounded bg-fg/8" />
          <div className="h-16 rounded bg-accent/20" />
        </div>
      </div>
    );
  }
  if (kind === "social") {
    return (
      <div className="grid h-full grid-cols-3 grid-rows-2 gap-2 bg-bg p-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`rounded ${i % 3 === 1 ? "bg-accent/30" : "bg-fg/10"}`} />
        ))}
      </div>
    );
  }
  if (kind === "brand") {
    return (
      <div className="flex h-full items-center justify-center gap-3 bg-bg p-6">
        <div className="size-16 rounded-full bg-accent" />
        <div>
          <div className="h-4 w-28 rounded bg-fg/80" />
          <div className="mt-2 flex gap-1.5">
            <span className="size-4 rounded-full bg-accent" />
            <span className="size-4 rounded-full bg-fg/50" />
            <span className="size-4 rounded-full bg-fg/20" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col justify-end bg-gradient-to-br from-bg-elevated to-bg p-5">
      <div className="h-2 w-16 rounded-full bg-accent" />
      <div className="mt-3 h-6 w-40 rounded bg-fg/20" />
      <div className="mt-6 h-10 w-28 rounded-lg bg-accent/80" />
    </div>
  );
}

export function WorkCard({ item }: { item: (typeof WORK_ITEMS)[number] }) {
  const { t } = useI18n();
  return (
    <article className="fill-card work-card overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-border)]">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
        <Mock kind={item.kind} />
        <span className="absolute start-3 top-3 rounded-full border border-border bg-bg/80 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wider text-accent uppercase backdrop-blur">
          {t("work.concept")}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold">{t(item.titleKey)}</h3>
        <p className="mt-2 text-sm text-fg-muted">{t(item.bodyKey)}</p>
      </div>
    </article>
  );
}
