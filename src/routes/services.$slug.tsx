import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SERVICES } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCta } from "@/components/layout/final-cta";

export const Route = createFileRoute("/services/$slug")({
  component: ServiceDetail,
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.service ? "Service" : "Services"}, Synapse Marketing Agency`,
      },
    ],
  }),
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const { t } = useI18n();
  return (
    <>
      <PageHero
        kicker={t("nav.services")}
        title={t(service.nameKey)}
        sub={t(service.longKey)}
        bg="/page-bg/services-key.jpg"
      >
        <p className="mt-5 text-sm tracking-wide text-white/70 uppercase">{t("services.starting")}</p>
        <p className="mt-1 text-2xl font-semibold text-[#8FE24A]">{t(service.priceKey)}</p>
        <Link to="/contact" className="mt-8 inline-flex">
          <Button size="lg">{service.cta === "book" ? t("services.book") : t("services.getStarted")}</Button>
        </Link>
      </PageHero>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <ul className="space-y-2 text-fg">
          {service.features.map((f) => (
            <li key={f} className="flex gap-3">
              <span className="mt-2 size-1.5 rounded-full bg-accent" />
              {t(f)}
            </li>
          ))}
        </ul>
        {service.note === "ad" ? <p className="mt-6 text-sm text-fg-subtle">{t("services.adSpendNote")}</p> : null}
        {service.note === "host" ? <p className="mt-6 text-sm text-fg-subtle">{t("services.hostingNote")}</p> : null}
      </section>
      <FinalCta />
    </>
  );
}
