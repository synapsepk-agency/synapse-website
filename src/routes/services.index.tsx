import { createFileRoute } from "@tanstack/react-router";
import { SERVICES } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { PageHero } from "@/components/layout/page-hero";
import { ServiceCard } from "@/components/sections/service-card";
import { FinalCta } from "@/components/layout/final-cta";
import { Watermark } from "@/components/layout/watermark";
import { Reveal } from "@/components/layout/reveal";

export const Route = createFileRoute("/services/")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services, Synapse Marketing Agency" },
      {
        name: "description",
        content:
          "Meta Ads, web development, social media, SEO, brand identity, consultancy and video production from Synapse Marketing Agency.",
      },
    ],
  }),
});

function ServicesPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero kicker={t("services.kicker")} title={t("services.title")} sub={t("services.pageLead")} bg="/page-bg/services-key.jpg" />
      <section className="relative overflow-hidden">
        <Watermark position="left" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={i * 50} from="scale">
                <ServiceCard service={s} featured />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
