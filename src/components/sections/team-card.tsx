import { TEAM } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function TeamCard({
  member,
  featured = false,
}: {
  member: (typeof TEAM)[number];
  featured?: boolean;
}) {
  const { t } = useI18n();
  const wide = featured || member.id === "meerak";
  return (
    <article id={member.id} className="group scroll-mt-28 overflow-hidden rounded-2xl border border-border bg-surface">
      <div className={cn("relative overflow-hidden", wide ? "aspect-[16/9]" : "aspect-[9/16]")}>
        <img
          src={member.photo}
          alt={`${member.name}, ${t(member.roleKey)}`}
          className={cn(
            "framed h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]",
            wide ? "object-[center_42%]" : "object-top",
          )}
          width={wide ? 1200 : 720}
          height={wide ? 675 : 1280}
          loading="lazy"
          decoding="async"
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent",
            wide ? "h-3/5" : "h-1/2",
          )}
        />
        <div className={cn("absolute inset-x-0 bottom-0", wide ? "p-6 sm:p-8" : "p-4 sm:p-5")}>
          <h3 className={cn("font-display font-semibold text-white", wide ? "text-2xl sm:text-4xl" : "text-lg sm:text-xl")}>
            {member.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-[#8FE24A]">{t(member.roleKey)}</p>
          <p
            className={cn(
              "mt-2 overflow-hidden text-sm text-white/80 opacity-0 transition-[max-height,opacity] duration-300 group-hover:opacity-100",
              wide ? "max-h-0 group-hover:max-h-20 sm:max-h-20 sm:opacity-100" : "max-h-0 group-hover:max-h-24",
            )}
          >
            {t(member.bioKey)}
          </p>
        </div>
      </div>
    </article>
  );
}
