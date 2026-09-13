import type { ReactNode } from "react";
import { LandingWave } from "./landing-wave";
import { cn } from "@/lib/utils";

export function PageHero({
  title,
  sub,
  children,
  bg,
}: {
  kicker?: string;
  title: string;
  sub?: string;
  children?: ReactNode;
  bg?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden border-b border-border", bg && "min-h-[18rem] sm:min-h-[22rem]")}>
      <LandingWave />
      {bg ? (
        <>
          <img
            src={bg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            width={1200}
            height={675}
            decoding="async"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/52 to-black/30" />
        </>
      ) : null}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <h1 className={cn("max-w-5xl font-display text-4xl font-semibold sm:text-6xl lg:text-7xl", bg && "text-white")}>
          {title}
        </h1>
        {sub ? (
          <p className={cn("mt-5 max-w-2xl text-base sm:text-lg", bg ? "text-white/80" : "text-fg-muted")}>{sub}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}