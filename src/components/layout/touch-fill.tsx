import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const FILL = ".word-box, .price-card, .fill-card, .svc-block, .service-row";

export function TouchFill() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!window.matchMedia("(max-width: 1023px)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-touch");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" },
    );

    const nodes = document.querySelectorAll(FILL);
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
