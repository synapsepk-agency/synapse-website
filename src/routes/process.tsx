import { createFileRoute } from "@tanstack/react-router";
import { PROCESS_STEPS } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/layout/final-cta";
import { Reveal } from "@/components/layout/reveal";

export const Route = createFileRoute("/process")({
  component: ProcessPage,
  head: () => ({
    meta: [
      { title: "Our Process, Synapse Marketing Agency" },
      {
        name: "description",
        content: "Discover, strategize, create, launch and grow, how Synapse works with businesses.",
      },
    ],
  }),
});

function ProcessPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero kicker={t("process.kicker")} title={t("process.title")} sub={t("process.sub")} bg="/page-bg/process-key.jpg" />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <ol className="relative border-s border-border ms-3">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 80}>
              <li className="fill-card mb-12 ms-8 rounded-2xl border border-border bg-surface p-5 last:mb-0">
                <span className="absolute -start-3 mt-1 size-6 rounded-full border border-accent bg-bg" />
                <p className="font-display text-sm text-accent">{step.num}</p>
                <h2 className="mt-1 font-display text-2xl font-semibold">{t(step.titleKey)}</h2>
                <p className="mt-2 text-fg-muted">{t(step.bodyKey)}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>
      <FinalCta />
    </>
  );
}
