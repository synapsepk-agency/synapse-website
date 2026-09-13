import { Link } from "@tanstack/react-router";
import { SERVICES } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export function ServiceRows({ limit }: { limit?: number }) {
  const { t } = useI18n();
  const list = limit ? SERVICES.slice(0, limit) : SERVICES;
  return (
    <ul className="mt-6 border-y border-border">
      {list.map((s) => (
        <li key={s.id} className="border-b border-border last:border-b-0">
          <Link
            to="/services/$slug"
            params={{ slug: s.slug }}
            className="service-row group grid grid-cols-[auto_1fr_auto] items-center gap-3 py-3.5 sm:grid-cols-[3rem_1fr_auto] sm:gap-5 sm:py-4"
          >
            <span className="font-display text-xs text-fg-subtle">{s.num}</span>
            <span className="min-w-0">
              <span className="block font-display text-base font-semibold sm:text-xl">{t(s.nameKey)}</span>
              <span className="mt-0.5 hidden max-w-xl text-xs text-fg-muted md:block">{t(s.descKey)}</span>
            </span>
            <span className="flex items-center gap-4">
              <span className="hidden text-right text-sm font-medium text-accent sm:block">{t(s.priceKey)}</span>
              <span className="service-row-arrow" aria-hidden>
                →
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
