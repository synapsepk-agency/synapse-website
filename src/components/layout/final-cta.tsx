import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";
import { SplitWords } from "./split-text";

export function FinalCta() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden border-t border-border">
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
        <Reveal>
          <SplitWords
            as="h2"
            text={t("cta.title")}
            className="max-w-3xl font-display text-2xl font-semibold sm:text-4xl"
          />
          <p className="mt-4 max-w-xl text-sm text-fg-muted">{t("cta.body")}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link to="/contact">
              <Button size="lg">{t("cta.primary")}</Button>
            </Link>
            <a href={SITE.whatsapp} target="_blank" rel="noreferrer">
              <Button size="lg" variant="secondary">
                {t("cta.secondary")}
              </Button>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
