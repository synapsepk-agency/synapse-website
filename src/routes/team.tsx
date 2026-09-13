import { createFileRoute, Link } from "@tanstack/react-router";
import { TEAM } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { PageHero } from "@/components/layout/page-hero";
import { TeamCard } from "@/components/sections/team-card";
import { FinalCta } from "@/components/layout/final-cta";
import { Reveal } from "@/components/layout/reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/team")({
  component: TeamPage,
  head: () => ({
    meta: [
      { title: "Our Team, Synapse Marketing Agency" },
      {
        name: "description",
        content:
          "Meet the Synapse team: Meerak Baloch, Soaima Tahir, Muzammil Mehmood, Tahir Majeed, Muqaddas Saba and Shahzor Ahmed.",
      },
    ],
  }),
});

function TeamPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero kicker={t("team.kicker")} title={t("team.pageTitle")} sub={t("team.lead")} bg="/page-bg/team-key.jpg" />

      <section className="border-b border-border bg-bg-elevated">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <Reveal from="left">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold tracking-[0.18em] text-fg-muted uppercase">
              <span className="text-accent">*</span>
              {t("team.kicker")}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-5xl">{t("team.title")}</h2>
          </Reveal>
          <Reveal from="right">
            <p className="text-base leading-relaxed text-fg-muted">{t("team.intro")}</p>
            <Link to="/contact" className="mt-6 inline-flex">
              <Button variant="dark">
                {t("team.title")}
                <span aria-hidden>→</span>
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="space-y-4">
            <Reveal>
              <TeamCard member={TEAM[0]!} featured />
            </Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {TEAM.slice(1).map((m, i) => (
                <Reveal key={m.id} delay={i * 70}>
                  <TeamCard member={m} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
