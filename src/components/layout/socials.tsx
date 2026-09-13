import { Facebook, Instagram, Mail, Link2 } from "lucide-react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M14.5 3c.4 2.6 1.9 4.4 4.5 4.7v3c-1.6 0-3.1-.5-4.5-1.5v6.6c0 3.4-2.7 6.1-6.2 6.1S2 19.2 2 15.8 4.8 9.7 8.3 9.7c.4 0 .8 0 1.2.1v3.1c-.4-.1-.8-.2-1.2-.2-1.7 0-3.1 1.4-3.1 3.1s1.4 3.1 3.1 3.1 3.1-1.4 3.1-3.1V3h3.1Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2.1A9.9 9.9 0 0 0 3.4 16.9L2 22l5.2-1.4A9.9 9.9 0 1 0 12 2.1Zm5.5 14.1c-.2.7-1.3 1.2-1.8 1.3-.5.1-1 .2-3.4-.7-2.9-1.1-4.7-3.9-4.9-4.1-.2-.2-1.4-1.9-1.4-3.6s.9-2.5 1.2-2.8c.3-.3.7-.4 1-.4h.8c.2 0 .5 0 .8.6.3.7 1 2.4 1.1 2.6.1.2.1.4 0 .6-.1.2-.2.4-.4.6l-.6.7c-.2.2-.4.4-.2.8.2.4 1 1.6 2.1 2.6 1.4 1.2 2.6 1.6 3 .1.3-.3.4-.6.6-.8.2-.2.4-.2.6-.1.2.1 1.7.8 2 .9.3.2.5.2.6.4.1.2.1.9-.2 1.6Z" />
    </svg>
  );
}

const ITEMS = [
  { href: SITE.social.facebook, label: "Facebook", Icon: Facebook },
  { href: SITE.social.instagram, label: "Instagram", Icon: Instagram },
  { href: SITE.social.tiktok, label: "TikTok", Icon: TikTokIcon },
  { href: SITE.social.whatsapp, label: "WhatsApp", Icon: WhatsAppIcon },
  { href: SITE.social.email, label: "Email", Icon: Mail },
  { href: SITE.social.linktree, label: "Linktree", Icon: Link2 },
];

export function SocialRow({
  className,
  compact = false,
  tone = "default",
}: {
  className?: string;
  compact?: boolean;
  tone?: "default" | "on-black";
}) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {ITEMS.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={cn(
              "social-orb grid place-items-center rounded-full border transition-[color,border-color,transform] duration-200",
              compact ? "size-9" : "size-11",
              tone === "on-black"
                ? "border-white/22 text-white/70 hover:border-[#8fe24a] hover:text-[#8fe24a]"
                : "border-border text-fg-muted hover:border-accent hover:text-accent",
            )}
          >
            <Icon className={compact ? "size-3.5" : "size-4"} />
          </a>
        </li>
      ))}
    </ul>
  );
}
