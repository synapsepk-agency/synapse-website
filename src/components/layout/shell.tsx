import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Header, ShareHeader } from "./header";
import { Footer, ShareFooter } from "./footer";
import { WhatsAppFloat } from "./whatsapp-float";
import { Chatbot } from "./chatbot";
import { TouchFill } from "./touch-fill";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const share = pathname === "/packages";
  return (
    <div className="flex min-h-dvh max-w-full flex-col overflow-x-clip bg-bg text-fg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>
      <TouchFill />
      {share ? <ShareHeader /> : <Header />}
      <main id="main" className="flex-1">
        {children}
      </main>
      {share ? <ShareFooter /> : <Footer />}
      {share ? null : <Chatbot />}
      <WhatsAppFloat />
    </div>
  );
}
