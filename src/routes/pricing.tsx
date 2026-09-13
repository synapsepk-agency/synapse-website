import { createFileRoute, Link } from "@tanstack/react-router";
import { VIDEO_PACKAGES, WEB_PACKAGES, META_PACKAGES, SOCIAL_PACKAGES, SERVICES } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { FinalCta } from "@/components/layout/final-cta";
import { Watermark } from "@/components/layout/watermark";
import { Reveal } from "@/components/layout/reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () => ({
    meta: [
      { title: "Pricing, Synapse Marketing Agency" },
      {
        name: "description",
        content:
          "Meta Ads, social media, web development, SEO, brand identity, consultancy and video packages from Synapse Marketing Agency in Quetta.",
      },
    ],
  }),
});

type Pkg = {
  id: string;
  num: string;
  nameKey: "pricing.web.basic" | "pricing.web.growth" | "pricing.web.premium";
  price: string;
  popular: boolean;
  bestFor: { en: string; ur: string };
  features: { en: readonly string[]; ur: readonly string[] };
};

function PackageGrid({
  title,
  note,
  packages,
  cta,
}: {
  title: string;
  note?: string;
  packages: readonly Pkg[];
  cta: string;
}) {
  const { t, lang } = useI18n();
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <h2 className="font-display text-2xl font-semibold sm:text-3xl">{title}</h2>
      {note ? <p className="mt-3 max-w-3xl text-sm text-fg-subtle">{note}</p> : null}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {packages.map((pkg, i) => (
          <Reveal key={pkg.id} delay={i * 70} from="scale">
          <article
            className={cn(
              "price-card flex h-full flex-col rounded-2xl border bg-surface p-6",
              pkg.popular ? "border-accent" : "border-border",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-sm text-fg-subtle">{pkg.num}</span>
              {pkg.popular ? (
                <span className="rounded-full bg-accent px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-accent-fg uppercase">
                  {t("pricing.mostPopular")}
                </span>
              ) : null}
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold">{t(pkg.nameKey)}</h3>
            <p className="mt-3">
              <span className="text-2xl font-semibold text-accent">{pkg.price}</span>
            </p>
            <p className="mt-2 text-sm text-fg-subtle">{pkg.bestFor[lang]}</p>
            <ul className="mt-5 flex-1 space-y-2 text-sm text-fg-muted">
              {pkg.features[lang].map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="mt-6">
              <Button className="w-full" variant={pkg.popular ? "primary" : "secondary"}>
                {cta}
              </Button>
            </Link>
          </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function PricingPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <PageHero kicker={t("pricing.kicker")} title={t("pricing.title")} sub={t("pricing.sub")} bg="/page-bg/pricing-key.jpg" />

      <section className="relative overflow-hidden">
        <Watermark position="left" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t("pricing.videoTitle")}</h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {VIDEO_PACKAGES.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 70} from="scale">
              <article
                className={cn(
                  "price-card flex h-full flex-col rounded-2xl border bg-surface p-6 shadow-[var(--shadow-border)]",
                  pkg.popular ? "border-accent" : "border-border",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm text-fg-subtle">{pkg.num}</span>
                  {pkg.popular ? (
                    <span className="rounded-full bg-accent px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-accent-fg uppercase">
                      {t("pricing.mostPopular")}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{pkg.name[lang]}</h3>
                {pkg.reel ? (
                  <p className="mt-3 text-sm text-fg-muted">
                    <span className="text-2xl font-semibold text-fg">{pkg.reel}</span>
                    {t("pricing.perReel")}
                  </p>
                ) : null}
                <p className="mt-1">
                  <span className="text-2xl font-semibold text-accent">{pkg.month}</span>
                  <span className="text-sm text-fg-muted">{t("pricing.perMonth")}</span>
                </p>
                <p className="mt-2 text-sm text-fg-subtle">{pkg.cadence[lang]}</p>
                <ul className="mt-5 flex-1 space-y-2 text-sm text-fg-muted">
                  {pkg.features[lang].map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="mt-6">
                  <Button className="w-full" variant={pkg.popular ? "primary" : "secondary"}>
                    {t("services.getStarted")}
                  </Button>
                </Link>
              </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <PackageGrid
          title={t("pricing.metaTitle")}
          note={t("pricing.metaNote")}
          packages={META_PACKAGES}
          cta={t("pricing.ads.cta")}
        />
      </section>

      <section className="border-t border-border">
        <PackageGrid
          title={t("pricing.socialTitle")}
          packages={SOCIAL_PACKAGES}
          cta={t("pricing.social.cta")}
        />
      </section>

      <section className="border-t border-border">
        <PackageGrid
          title={t("pricing.webTitle")}
          note={t("pricing.web.note")}
          packages={WEB_PACKAGES}
          cta={t("pricing.web.cta")}
        />
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t("pricing.digitalTitle")}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.filter(
              (s) => s.id !== "video" && s.id !== "web-development" && s.id !== "meta-ads" && s.id !== "social-media",
            ).map((s, i) => (
              <Reveal key={s.id} delay={i * 70} from="scale">
              <article className="price-card h-full rounded-2xl border border-border bg-surface p-6">
                <p className="text-xs text-fg-subtle">{t("services.starting")}</p>
                <h3 className="mt-2 font-display text-xl font-semibold">{t(s.nameKey)}</h3>
                <p className="mt-2 text-2xl font-semibold text-accent">{t(s.priceKey)}</p>
                <p className="mt-3 text-sm text-fg-muted">{t(s.descKey)}</p>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="mt-5 inline-flex">
                  <Button variant="secondary" size="sm">
                    {t("services.getStarted")}
                  </Button>
                </Link>
              </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm text-fg-subtle">{t("pricing.note")}</p>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border">
        <Watermark position="center" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t("pricing.combineTitle")}</h2>
          <p className="mt-3 max-w-2xl text-fg-muted">{t("pricing.combineBody")}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["pricing.starter", "pricing.starterBody"],
              ["pricing.growth", "pricing.growthBody"],
              ["pricing.scale", "pricing.scaleBody"],
            ].map(([title, body], i) => (
              <Reveal key={title} delay={i * 70} from="scale">
              <article className="price-card h-full rounded-2xl border border-border bg-surface p-6">
                <p className="font-display text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-xl font-semibold">{t(title)}</h3>
                <p className="mt-3 text-sm text-fg-muted">{t(body)}</p>
              </article>
              </Reveal>
            ))}
          </div>
          <Link to="/contact" className="mt-8 inline-flex">
            <Button size="lg">{t("pricing.build")}</Button>
          </Link>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
