import { createFileRoute } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({
    meta: [
      { title: "Sign in, Synapse Marketing Agency" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function Login() {
  const { t } = useI18n();
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-16">
      <h1 className="font-display text-3xl font-semibold">{t("login.title")}</h1>
      <p className="mt-3 text-sm text-fg-muted">{t("login.body")}</p>
      <div className="mt-8 space-y-3">
        {authEnabled ? (
          GROK_PROVIDERS.map((p) => (
            <Button
              key={p.providerId}
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => signIn(p.providerId, { callbackURL: "/inbox" })}
            >
              Continue with {p.label}
            </Button>
          ))
        ) : (
          <p className="text-sm text-fg-subtle">{t("login.disabled")}</p>
        )}
      </div>
    </section>
  );
}
