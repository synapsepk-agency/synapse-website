import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { PageHero } from "@/components/layout/page-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { SocialRow } from "@/components/layout/socials";
import { Watermark } from "@/components/layout/watermark";
import { Button } from "@/components/ui/button";
import { pageMeta } from "@/lib/seo";
import { Reveal } from "@/components/layout/reveal";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: pageMeta(
      "Contact, Synapse Marketing Agency",
      "Start a project with Synapse. Inquiries go to synapseagency.pk@gmail.com. Chat on WhatsApp or visit linktr.ee/synapsemarketingagency.",
    ),
  }),
});

function ContactPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero kicker={t("contact.kicker")} title={t("contact.title")} sub={t("contact.sub")} bg="/page-bg/contact-key.jpg" />
      <section className="relative overflow-hidden">
        <Watermark position="right" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-5">
            <Reveal from="left" className="lg:col-span-2">
              <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">{t("footer.contact")}</p>
              <a href={SITE.social.email} className="mt-4 block font-display text-lg text-fg hover:text-accent">
                {SITE.email}
              </a>
              <a href={SITE.phoneTel} className="mt-2 block font-display text-lg text-fg hover:text-accent">
                {SITE.phone}
              </a>
              <p className="mt-3 text-sm text-fg-muted">{t("contact.inboxHint")}</p>
              <div className="mt-6 flex flex-col items-start gap-3">
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
                  <Button>{t("contact.whatsapp")}</Button>
                </a>
                <a href={SITE.social.email}>
                  <Button variant="secondary">{SITE.email}</Button>
                </a>
                <a href={SITE.social.linktree} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary">Linktree, {t("contact.linktree")}</Button>
                </a>
              </div>
              <SocialRow className="mt-8" />
            </Reveal>
            <Reveal from="right" className="lg:col-span-3">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
