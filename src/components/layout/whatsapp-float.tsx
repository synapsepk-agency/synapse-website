import { SITE } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

export function WhatsAppFloat() {
  const { t } = useI18n();
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float group fixed end-4 bottom-24 z-30 flex size-14 items-center justify-center overflow-hidden rounded-full bg-[#1f6b32] text-sm font-medium text-white shadow-[0_12px_32px_rgb(0_0_0/0.28)] transition-[width,padding,gap,transform] duration-200 hover:w-auto hover:scale-[1.03] hover:justify-start hover:gap-2 hover:px-4 hover:pe-5 focus-visible:w-auto focus-visible:justify-start focus-visible:gap-2 focus-visible:px-4 focus-visible:pe-5 sm:end-6 sm:bottom-28"
      aria-label={t("wa.chat")}
    >
      <svg viewBox="0 0 24 24" className="size-6 shrink-0 fill-current" aria-hidden>
        <path d="M12 2.1A9.9 9.9 0 0 0 3.4 16.9L2 22l5.2-1.4A9.9 9.9 0 1 0 12 2.1Zm5.5 14.1c-.2.7-1.3 1.2-1.8 1.3-.5.1-1 .2-3.4-.7-2.9-1.1-4.7-3.9-4.9-4.1-.2-.2-1.4-1.9-1.4-3.6s.9-2.5 1.2-2.8c.3-.3.7-.4 1-.4h.8c.2 0 .5 0 .8.6.3.7 1 2.4 1.1 2.6.1.2.1.4 0 .6-.1.2-.2.4-.4.6l-.6.7c-.2.2-.4.4-.2.8.2.4 1 1.6 2.1 2.6 1.4 1.2 2.6 1.6 3 .1.3-.3.4-.6.6-.8.2-.2.4-.2.6-.1.2.1 1.7.8 2 .9.3.2.5.2.6.4.1.2.1.9-.2 1.6Z" />
      </svg>
      <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity] duration-200 group-hover:max-w-[9rem] group-hover:opacity-100 group-focus-visible:max-w-[9rem] group-focus-visible:opacity-100">
        {t("wa.chat")}
      </span>
    </a>
  );
}
