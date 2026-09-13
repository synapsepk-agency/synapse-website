import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { SplitWords } from "@/components/layout/split-text";
import { LandingWave } from "@/components/layout/landing-wave";

const FACTS = ["hero.f1", "hero.f2", "hero.f3", "hero.f4", "hero.f5", "hero.f6", "hero.f7", "hero.f8"] as const;

export function Hero() {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.loop = false;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("playsinline", "true");
    v.setAttribute("webkit-playsinline", "true");

    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const want = mobile ? "/logo-video-720.mp4" : "/logo-video.mp4";
    const now = v.getAttribute("src") || v.currentSrc || "";
    const on720 = now.includes("logo-video-720");
    if ((mobile && !on720) || (!mobile && on720)) {
      v.src = want;
      v.load();
    }

    const play = () => {
      v.muted = true;
      v.play().catch(() => undefined);
    };

    play();
    v.addEventListener("loadeddata", play);
    v.addEventListener("canplay", play);
    const unlock = () => play();
    document.addEventListener("touchstart", unlock, { once: true, passive: true });
    document.addEventListener("click", unlock, { once: true });

    let seen = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        const on = Boolean(entry?.isIntersecting && (entry.intersectionRatio ?? 0) > 0.02);
        if (on) {
          if (seen && v.paused) {
            try {
              v.currentTime = 0;
            } catch {
              /* ignore */
            }
          }
          seen = true;
          play();
        } else if (seen && !on) {
          v.pause();
        }
      },
      { threshold: [0, 0.02, 0.2] },
    );
    io.observe(v);

    return () => {
      io.disconnect();
      v.removeEventListener("loadeddata", play);
      v.removeEventListener("canplay", play);
      document.removeEventListener("touchstart", unlock);
      document.removeEventListener("click", unlock);
    };
  }, []);

  return (
    <section className="hero-block relative isolate overflow-hidden">
      <LandingWave />

      <div className="relative w-full">
        <video
          ref={videoRef}
          className="hero-logo-video block aspect-video h-auto w-full object-cover object-center"
          src="/logo-video.mp4"
          muted
          autoPlay
          playsInline
          poster="/hero-poster.jpg"
          preload="metadata"
          width={1920}
          height={1080}
          aria-label="Synapse logo"
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start px-4 pb-14 pt-6 sm:px-6 sm:pb-16">
        <h1 className="max-w-3xl">
          <SplitWords
            text={t("hero.title")}
            className="font-display text-xl font-bold leading-snug tracking-[-0.03em] sm:text-2xl lg:text-[1.75rem]"
          />
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-fg-muted sm:text-[0.95rem]">{t("hero.kicker")}</p>

        <ul className="mt-8 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((key) => (
            <li key={key} className="flex items-start gap-2 text-sm text-fg">
              <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-accent text-[0.65rem] font-bold text-accent-fg">
                ✓
              </span>
              {t(key)}
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link to="/contact">
            <Button>{t("hero.cta")}</Button>
          </Link>
          <a href={SITE.whatsapp} target="_blank" rel="noreferrer">
            <Button variant="secondary">{t("nav.letsTalk")}</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
