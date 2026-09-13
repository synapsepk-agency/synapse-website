import { useState } from "react";
import { FAQ_IDS } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/layout/reveal";

export function FaqList() {
  const { t } = useI18n();
  const [open, setOpen] = useState<string | null>("1");
  return (
    <div className="divide-y divide-border">
      {FAQ_IDS.map((id, i) => {
        const isOpen = open === id;
        return (
          <Reveal key={id} delay={i * 70} from="right">
            <div>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-4 text-start sm:py-5"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : id)}
              >
                <span className="font-display text-[0.98rem] font-medium sm:text-lg">{t(`faq.q${id}`)}</span>
                <span
                  className="relative grid size-8 shrink-0 place-items-center rounded-md text-lg text-fg-muted"
                  aria-hidden
                >
                  <i className="absolute h-px w-3.5 bg-current" />
                  <i
                    className={cn(
                      "absolute h-3.5 w-px bg-current transition-transform duration-300 ease-out",
                      isOpen && "rotate-90 scale-y-0",
                    )}
                  />
                </span>
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="pb-5 text-sm leading-relaxed text-fg-muted">{t(`faq.a${id}`)}</p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export function FaqSection() {
  const { t } = useI18n();
  return (
    <section className="border-t border-border">
      <div className="mx-auto grid max-w-7xl items-start gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:py-20">
        <Reveal from="left">
          <div className="relative overflow-hidden rounded-[2rem]">
            <img
              src="/page-bg/faq.jpg"
              alt=""
              className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto lg:min-h-[34rem]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
            <div className="absolute end-5 top-5 grid size-14 place-items-center rounded-2xl bg-accent text-accent-fg anim-float">
              <span className="text-2xl" aria-hidden>
                +
              </span>
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold tracking-[0.18em] text-fg-muted uppercase">
              <span className="text-accent" aria-hidden>
                *
              </span>
              {t("faq.kicker")}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">{t("faq.title")}</h2>
          </Reveal>
          <div className="mt-6">
            <FaqList />
          </div>
        </div>
      </div>
    </section>
  );
}
