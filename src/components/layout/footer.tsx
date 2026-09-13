import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { SocialRow } from "./socials";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative bg-black text-[#f4f1ea]">
      <div className="footer-wave" aria-hidden>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0 58C180 118 380 12 560 48C740 84 880 8 1080 52C1220 82 1340 22 1440 56V120H0Z" />
        </svg>
      </div>
      <div className="relative overflow-hidden">
      <img
        src="/logo-mark.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute end-[-6%] bottom-[-10%] z-0 w-[min(55vw,460px)] opacity-[0.08] select-none"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-6 sm:px-6 lg:grid-cols-12 lg:pb-20">
        <div className="lg:col-span-4">
          <div className="inline-flex flex-col items-center text-center">
            <Link to="/" className="inline-block" aria-label="Synapse home">
              <img
                src="/logo-mark.png"
                alt="Synapse Marketing Agency"
                className="h-[6.5rem] w-auto sm:h-28 lg:h-[7.25rem]"
                width="400"
                height="226"
                decoding="async"
              />
            </Link>
            <p className="mt-1.5 font-display text-[0.62rem] font-semibold tracking-[0.34em] text-white/50 uppercase sm:text-[0.68rem]">
              {t("footer.tagline")}
            </p>
            <SocialRow compact tone="on-black" className="mt-3 justify-center" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-white/40 uppercase">
              {t("footer.company")}
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["/", "nav.home"],
                ["/about", "nav.about"],
                ["/services", "nav.services"],
                ["/team", "nav.team"],
                ["/blog", "nav.blog"],
                ["/pricing", "nav.pricing"],
                ["/contact", "nav.contact"],
              ].map(([to, key]) => (
                <li key={to}>
                  <Link to={to} className="text-white/70 transition-colors duration-150 hover:text-accent">
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-white/40 uppercase">
              {t("footer.services")}
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="text-white/70 transition-colors duration-150 hover:text-accent"
                  >
                    {t(s.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="text-xs font-semibold tracking-[0.18em] text-white/40 uppercase">
              {t("footer.contact")}
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={SITE.social.email} className="text-white/70 hover:text-accent">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={SITE.phoneTel} className="text-white/70 hover:text-accent">
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  {t("contact.whatsapp")}
                </a>
              </li>
              <li>
                <a href={SITE.social.linktree} target="_blank" rel="noreferrer" className="text-white/70 hover:text-accent">
                  {t("contact.linktree")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>{t("footer.rights")}</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white">
              {t("footer.privacy")}
            </Link>
            <Link to="/terms" className="hover:text-white">
              {t("footer.terms")}
            </Link>
            <Link to="/inbox" className="hover:text-white">
              {t("nav.inbox")}
            </Link>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
