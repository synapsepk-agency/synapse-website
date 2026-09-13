import { useI18n } from "@/lib/i18n";

export function TrustMarquee() {
  const { t } = useI18n();
  const items = [
    t("marquee.strategy"),
    t("marquee.creativity"),
    t("marquee.technology"),
    t("marquee.performance"),
    t("marquee.growth"),
  ];
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border bg-bg-elevated">
      <div className="marquee-track flex w-max items-center gap-8 py-4 pr-8">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-sm tracking-[0.28em] text-fg-muted uppercase">{item}</span>
            <span className="size-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
