import { createFileRoute, Link } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { TEAM, WHY, PROCESS_STEPS, INDUSTRIES, SERVICES } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/layout/reveal";
import { ServiceIcon } from "@/components/layout/icons";
import { Hero } from "@/components/sections/hero";
import { TeamCard } from "@/components/sections/team-card";
import { FaqSection } from "@/components/sections/faq";
import { FinalCta } from "@/components/layout/final-cta";
import { WordBox } from "@/components/ui/word-box";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: pageMeta(
      "Synapse Marketing Agency, Digital Marketing Agency Balochistan",
      "Synapse Marketing Agency in Quetta, Balochistan. Digital marketing, web development, Meta Ads, SEO, social media and brand identity.",
    ),
  }),
});

function Home() {
  const { t } = useI18n();
  return (
    <>
      <Hero />

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">{t("services.kicker")}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{t("services.title")}</h2>
            <p className="mt-3 max-w-3xl text-sm text-fg-muted sm:text-base">{t("services.sub")}</p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {SERVICES.map((s) => (
              <article key={s.id} className="svc-block h-full">
                  <p className="text-xs font-semibold text-accent">{s.num}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold sm:text-2xl">{t(s.nameKey)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">{t(s.descKey)}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.features.slice(0, 3).map((f) => (
                      <li key={f}>
                        <WordBox className="px-2.5 py-1 text-[0.7rem]">{t(f)}</WordBox>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="mt-5 inline-flex text-sm font-medium text-accent hover:underline"
                  >
                    {t("services.getStarted")} →
                  </Link>
                </article>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/services">
              <Button variant="secondary">{t("services.viewAll")}</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-bg-elevated">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t("partner.title")}</h2>
            <p className="mt-2 max-w-xl text-sm text-fg-muted">{t("partner.body")}</p>
          </Reveal>
          <Reveal from="right">
            <Link to="/contact">
              <Button>{t("nav.contact")}</Button>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">{t("apart.kicker")}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{t("apart.title")}</h2>
            <p className="mt-3 max-w-3xl text-sm text-fg-muted">{t("apart.body")}</p>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {WHY.slice(0, 4).map((item, i) => (
              <Reveal key={item.titleKey} delay={i * 50}>
                <article className="fill-card h-full rounded-2xl border border-border bg-surface p-6">
                  <p className="font-display text-sm text-accent">{String(i + 1).padStart(2, "0")}.</p>
                  <h3 className="mt-2 font-display text-xl font-semibold">{t(item.titleKey)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{t(item.bodyKey)}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">{t("process.kicker")}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{t("process.title")}</h2>
            <p className="mt-3 text-sm text-fg-muted">{t("process.sub")}</p>
          </Reveal>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 50}>
                <li className="fill-card rounded-2xl border border-border bg-surface p-5">
                  <p className="font-display text-2xl text-accent">{step.num}</p>
                  <h3 className="mt-3 font-display text-lg font-semibold">{t(step.titleKey)}</h3>
                  <p className="mt-2 text-sm text-fg-muted">{t(step.bodyKey)}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">{t("industries.kicker")}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold">{t("industries.title")}</h2>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.key} delay={i * 40} from="scale">
                <WordBox>
                  <ServiceIcon name={ind.icon} className="size-3.5" />
                  {t(ind.key)}
                </WordBox>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">{t("team.kicker")}</p>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{t("team.title")}</h2>
            </div>
            <Link to="/team" className="hidden sm:inline-flex">
              <Button variant="ghost">{t("team.view")}</Button>
            </Link>
          </div>
          <div className="mt-8 space-y-3">
            <Reveal from="scale">
              <TeamCard member={TEAM[0]!} featured />
            </Reveal>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {TEAM.slice(1).map((m, i) => (
                <Reveal key={m.id} delay={i * 60} from="scale">
                  <TeamCard member={m} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FaqSection />
      <FinalCta />
    </>
  );
}
