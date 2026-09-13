import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { BrandLogo } from "./logo";

const HEADER_LINKS = [
  { to: "/", key: "home" as const },
  { to: "/services", key: "services" as const },
  { to: "/pricing", key: "pricing" as const },
  { to: "/about", key: "about" as const },
  { to: "/team", key: "team" as const },
  { to: "/blog", key: "blog" as const },
] as const;

export function Header() {
  const { t, lang, setLang } = useI18n();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastY = window.scrollY;
    const update = () => {
      const y = window.scrollY;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProgress(Math.min(1, y / max));
      if (window.matchMedia("(max-width: 1023px)").matches) {
        setHidden(false);
      } else if (y < 24) setHidden(false);
      else if (y > lastY + 4) setHidden(true);
      else if (y < lastY - 4) setHidden(false);
      lastY = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <header className={cn("site-header", hidden && "is-hidden")}>
      <div className="header-progress" style={{ transform: `scaleX(${progress})` }} />
      <div className="relative z-[410] mx-auto flex h-[4.35rem] max-w-7xl items-center gap-2 px-3 sm:h-[5.25rem] sm:px-5 lg:h-[5.75rem] lg:px-6">
        <BrandLogo
          size="lg"
          className="relative z-[411] -ms-1 shrink-0 [&_img]:h-[3.45rem] sm:[&_img]:h-[4.85rem] lg:[&_img]:h-[5.4rem]"
        />

        <nav className="header-desktop-nav hidden min-w-0 flex-1 items-center justify-center lg:flex" aria-label="Primary">
          <PageLinks pathname={pathname} t={t} />
        </nav>

        <div className="header-actions relative z-[500] ml-auto flex shrink-0 items-center gap-1">
          <div className="header-lang flex items-center rounded-full p-0.5 text-[0.7rem] font-semibold">
            <button
              type="button"
              onPointerDown={(e) => {
                e.stopPropagation();
                setLang("en");
              }}
              className={cn("rounded-full px-2 py-1.5", lang === "en" && "is-on")}
            >
              EN
            </button>
            <button
              type="button"
              onPointerDown={(e) => {
                e.stopPropagation();
                setLang("ur");
              }}
              className={cn("rounded-full px-2 py-1.5", lang === "ur" && "is-on")}
            >
              اردو
            </button>
          </div>
          <Link to="/contact" className="header-contact hidden lg:inline-flex">
            {t("nav.contact")}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <nav className="header-mobile-nav" aria-label="Mobile">
        <PageLinks pathname={pathname} t={t} />
        <Link to="/contact" className={cn("nav-link", pathname === "/contact" && "is-active")}>
          {t("nav.contact")}
        </Link>
      </nav>
    </header>
  );
}

function PageLinks({ pathname, t }: { pathname: string; t: (key: string) => string }) {
  return (
    <>
      {HEADER_LINKS.map((item) => {
        const active = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
        return (
          <Link key={item.to} to={item.to} className={cn("nav-link", active && "is-active")}>
            {t(`nav.${item.key}`)}
          </Link>
        );
      })}
    </>
  );
}