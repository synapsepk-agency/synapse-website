import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { ServiceIcon } from "@/components/layout/icons";
import { cn } from "@/lib/utils";

export function ServiceCard({
  service,
  featured = false,
}: {
  service: (typeof SERVICES)[number];
  featured?: boolean;
}) {
  const { t } = useI18n();
  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      className={cn(
        "fill-card group relative flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-border)]",
        featured && "sm:p-8",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-display text-sm text-fg-subtle">{service.num}</span>
        <span className="grid size-10 place-items-center rounded-lg border border-border text-accent transition-[border-color] duration-200 group-hover:border-accent">
          <ServiceIcon name={service.icon} className="size-4" />
        </span>
      </div>
      <h3 className="mt-6 font-display text-xl font-semibold">{t(service.nameKey)}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{t(service.descKey)}</p>
      <p className="mt-5 text-xs font-medium tracking-wide text-fg-subtle uppercase">{t("services.starting")}</p>
      <p className="mt-1 text-lg font-semibold text-accent">{t(service.priceKey)}</p>
      <ul className="mt-4 space-y-1.5 text-sm text-fg-muted">
        {service.features.map((f) => (
          <li key={f} className="flex gap-2">
            <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
            {t(f)}
          </li>
        ))}
      </ul>
      {service.note === "ad" ? (
        <p className="mt-3 text-xs text-fg-subtle">{t("services.adSpendNote")}</p>
      ) : null}
      {service.note === "host" ? (
        <p className="mt-3 text-xs text-fg-subtle">{t("services.hostingNote")}</p>
      ) : null}
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-fg transition-[gap,color] duration-200 group-hover:gap-2 group-hover:text-accent">
        {service.cta === "book" ? t("services.book") : t("services.getStarted")}
        <ArrowUpRight className="size-4 rtl:-scale-x-100" />
      </span>
    </Link>
  );
}
