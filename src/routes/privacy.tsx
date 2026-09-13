import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { PageHero } from "@/components/layout/page-hero";
import { LegalDoc } from "@/components/layout/legal-doc";
import { PRIVACY_SECTIONS, PRIVACY_UPDATED } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: pageMeta(
      "Privacy Policy, Synapse Marketing Agency",
      "How Synapse Marketing Agency in Quetta collects, uses and protects information when you visit our website or enquire about digital marketing and web development.",
    ),
  }),
});

function PrivacyPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero title={t("legal.privacyTitle")} sub={t("legal.privacyLead")} bg="/page-bg/privacy-key.jpg?v=2" />
      <LegalDoc updated={PRIVACY_UPDATED} sections={PRIVACY_SECTIONS} />
    </>
  );
}
