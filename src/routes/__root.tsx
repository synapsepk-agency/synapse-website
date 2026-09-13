import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { ThemeProvider } from "@/lib/theme";
import { LanguageProvider } from "@/lib/i18n";
import { SiteShell } from "@/components/layout/shell";
import { jsonLd, pageMeta } from "@/lib/seo";
import appCss from "../styles.css?url";
const THEME_BOOT = `(function(){try{var l=localStorage.getItem("synapse-lang");var d=document.documentElement;d.classList.remove("light");d.classList.add("dark");d.style.colorScheme="dark";try{localStorage.setItem("synapse-theme-v2","dark");}catch(e){}if(l==="ur"){d.lang="ur";d.dir="rtl";}else{d.lang="en";d.dir="ltr";}}catch(e){document.documentElement.classList.add("dark");document.documentElement.style.colorScheme="dark";}try{var f=document.createElement("link");f.rel="stylesheet";f.href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Plus+Jakarta+Sans:wght@700&display=swap";f.media="print";f.onload=function(){f.media="all"};document.head.appendChild(f);}catch(e){}})();`;
const JSON_LD = JSON.stringify(jsonLd);

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0A0A0A" },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Synapse Marketing Agency" },
      { name: "geo.region", content: "PK-BA" },
      { name: "geo.placename", content: "Quetta" },
      {
        name: "keywords",
        content:
          "Digital Marketing Agency Balochistan, Digital Marketing Agency Quetta, Meta Ads Agency Balochistan, Web Development Quetta, SEO Agency Balochistan",
      },
      ...pageMeta(
        "Synapse Marketing Agency, Digital Marketing Agency Balochistan",
        "Synapse Marketing Agency in Quetta, Balochistan. Digital marketing, web development, Meta Ads, SEO, social media and brand identity.",
      ),
    ],
    links: [
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png?v=s6" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon-192.png?v=s6" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png?v=s6" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" className="dark antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
        <HeadContent />
      </head>
      <body className="bg-bg text-fg">
        <PreviewHostBridge />
        <AuthProvider>
          <ThemeProvider>
            <LanguageProvider>
              <SiteShell>
                <Outlet />
              </SiteShell>
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
