import { createFileRoute } from "@tanstack/react-router";
import { WHY } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/layout/final-cta";
import { Reveal } from "@/components/layout/reveal";
import { Watermark } from "@/components/layout/watermark";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: pageMeta(
      "About Us, Synapse Marketing Agency",
      "About Synapse Marketing Agency in Quetta. Our story, why choose Synapse, our vision and mission for digital growth in Pakistan.",
    ),
  }),
});

function AboutPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero kicker={t("about.kicker")} title={t("about.pageTitle")} sub={t("about.pageLead")} bg="/page-bg/about-key.jpg" />

      <section className="relative overflow-hidden">
        <Watermark position="right" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
          <Reveal from="left">
            <p className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-semibold tracking-[0.18em] text-fg-muted uppercase">
              <span className="text-accent">*</span>
              {t("about.storyTitle")}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-5xl">{t("about.storyTitle")}</h2>
          </Reveal>
          <Reveal from="right">
            <p className="text-base leading-relaxed text-fg-muted">{t("about.storyBody")}</p>
            <p className="mt-4 text-base leading-relaxed text-fg-muted">{t("about.body")}</p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-bg-elevated">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold tracking-[0.18em] text-fg-muted uppercase">
              <span className="text-accent">*</span>
              {t("about.whyTitle")}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-5xl">{t("about.whyTitle")}</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((item, i) => (
              <Reveal key={item.titleKey} delay={i * 80}>
                <article className="fill-card h-full rounded-2xl border border-border bg-surface p-6">
                  <p className="font-display text-sm text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 font-display text-xl font-semibold">{t(item.titleKey)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{t(item.bodyKey)}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 lg:py-20">
          <Reveal from="left">
            <article className="fill-card h-full rounded-[1.5rem] border border-border bg-surface p-8">
              <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">{t("about.visionTitle")}</p>
              <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">{t("about.visionTitle")}</h2>
              <p className="mt-4 leading-relaxed text-fg-muted">{t("about.vision")}</p>
            </article>
          </Reveal>
          <Reveal from="right" delay={80}>
            <article className="fill-card h-full rounded-[1.5rem] border border-border bg-surface p-8">
              <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">{t("about.missionTitle")}</p>
              <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">{t("about.missionTitle")}</h2>
              <p className="mt-4 leading-relaxed text-fg-muted">{t("about.mission")}</p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold">{t("about.create")}, {t("about.connect")}, {t("about.grow")}</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["about.create", "about.createBody"],
              ["about.connect", "about.connectBody"],
              ["about.grow", "about.growBody"],
            ].map(([title, body], i) => (
              <Reveal key={title} delay={i * 70}>
                <article className="fill-card h-full rounded-xl border border-border bg-surface p-5">
                  <h3 className="font-display text-sm tracking-[0.16em] text-accent uppercase">{t(title)}</h3>
                  <p className="mt-2 text-sm text-fg-muted">{t(body)}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
