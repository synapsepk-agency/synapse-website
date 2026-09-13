import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { PageHero } from "@/components/layout/page-hero";
import { LegalDoc } from "@/components/layout/legal-doc";
import { TERMS_SECTIONS, TERMS_UPDATED } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: pageMeta(
      "Terms & Conditions, Synapse Marketing Agency",
      "Terms for using the Synapse Marketing Agency website and engaging our digital marketing, web development and videography services in Pakistan.",
    ),
  }),
});

function TermsPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero title={t("legal.termsTitle")} sub={t("legal.termsLead")} bg="/page-bg/terms-key.jpg?v=2" />
      <LegalDoc updated={TERMS_UPDATED} sections={TERMS_SECTIONS} />
      <p className="mx-auto max-w-3xl px-4 pb-16 text-sm text-fg-subtle sm:px-6">
        Related:{" "}
        <Link to="/privacy" className="text-accent hover:underline">
          {t("legal.privacyTitle")}
        </Link>
      </p>
    </>
  );
}
