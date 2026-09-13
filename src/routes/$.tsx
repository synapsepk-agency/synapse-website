import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/$")({
  component: NotFound,
});

export function NotFound() {
  const { t } = useI18n();
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col justify-center px-4 py-20 text-center">
      <p className="font-display text-sm tracking-[0.3em] text-accent">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold">{t("notfound.title")}</h1>
      <p className="mt-3 text-fg-muted">{t("notfound.body")}</p>
      <Link to="/" className="mt-8 inline-flex justify-center">
        <Button>{t("notfound.home")}</Button>
      </Link>
    </section>
  );
}
