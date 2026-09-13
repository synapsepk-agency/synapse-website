import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";

function Count({ to, suffix, start }: { to: number; suffix: string; start: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setN(to);
      return;
    }
    const t0 = performance.now();
    const dur = 900;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to]);
  return (
    <span className="font-display text-3xl font-semibold tabular-nums sm:text-4xl">
      {n.toString().padStart(2, "0")}
      {suffix}
    </span>
  );
}

export function Stats() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const items = [
    { to: 6, suffix: "", label: t("stats.services") },
    { to: 1, suffix: "", label: t("stats.strategy") },
    { to: 360, suffix: "°", label: t("stats.approach") },
    { to: 24, suffix: "/7", label: t("stats.presence") },
  ];

  return (
    <section className="border-b border-border" ref={ref}>
      <div className="mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="border-t border-border px-5 py-7 sm:border-t-0 sm:border-e sm:px-6 last:border-e-0">
            <Count to={item.to} suffix={item.suffix} start={on} />
            <p className="mt-2 text-xs tracking-wide text-fg-muted">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
