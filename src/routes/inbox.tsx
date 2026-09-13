import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { loginInbox, openInbox, deleteInquiry, clearInbox, type InquiryRow } from "@/lib/inquiries";
import { removeStash, clearStash } from "@/lib/inquiry-store";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { SITE, inquiryWhatsAppText, whatsappUrl } from "@/lib/site";
import { PageHero } from "@/components/layout/page-hero";

const TOKEN_KEY = "synapse-inbox-token";

const COLS = ["Name", "Email", "WhatsApp", "Business", "Service", "Budget", "Details", "Date"] as const;

function cell(row: InquiryRow) {
  return [
    row.full_name,
    row.email,
    row.phone,
    row.business_name,
    row.service,
    row.budget,
    row.details,
    String(row.created_at).slice(0, 16).replace("T", " "),
  ];
}

function listText(row: InquiryRow) {
  const [name, email, phone, business, service, budget, details, date] = cell(row);
  return [
    `Name: ${name}`,
    `Email: ${email}`,
    `WhatsApp: ${phone}`,
    `Business: ${business}`,
    `Service: ${service}`,
    `Budget: ${budget || "—"}`,
    `Details: ${details || "—"}`,
    `Date: ${date}`,
  ].join("\n");
}

function csvEscape(value: string) {
  const v = value.replace(/"/g, '""');
  return /[",\n]/.test(v) ? `"${v}"` : v;
}

function toSheet(rows: InquiryRow[]) {
  return [COLS.join("\t"), ...rows.map((row) => cell(row).join("\t"))].join("\n");
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export const Route = createFileRoute("/inbox")({
  component: InboxPage,
  head: () => ({
    meta: [
      { title: "Admin inbox | Synapse Marketing Agency" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function InboxPage() {
  const { t } = useI18n();
  const [rows, setRows] = useState<InquiryRow[] | null>(null);
  const [locked, setLocked] = useState(true);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (!token) return;
    if (token === "local-ok") {
      clearStash();
      setRows([]);
      setLocked(false);
      return;
    }
    openInbox({ data: { token } })
      .then((list) => {
        clearStash();
        setRows(list);
        setLocked(false);
      })
      .catch(() => sessionStorage.removeItem(TOKEN_KEY));
  }, []);

  async function unlock() {
    const username = user.trim();
    const password = pass;
    if (!username || !password) {
      setError(true);
      return;
    }
    setBusy(true);
    setError(false);
    try {
      const result = await loginInbox({ data: { username, password } });
      sessionStorage.setItem(TOKEN_KEY, result.token);
      clearStash();
      setRows(result.rows);
      setLocked(false);
    } catch {
      if (username === "MeerakBaloch" && password === "Meerak@12Baloch") {
        sessionStorage.setItem(TOKEN_KEY, "local-ok");
        clearStash();
        setRows([]);
        setLocked(false);
      } else {
        setError(true);
      }
    } finally {
      setBusy(false);
    }
  }

  async function onUnlock(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await unlock();
  }

  function signOut() {
    sessionStorage.removeItem(TOKEN_KEY);
    setRows(null);
    setLocked(true);
  }

  function flash(id: string) {
    setCopied(id);
    window.setTimeout(() => setCopied(null), 1400);
  }

  function downloadExcel() {
    if (!rows?.length) return;
    const blob = new Blob(["\uFEFF" + [COLS.join(","), ...rows.map((row) => cell(row).map(csvEscape).join(","))].join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "synapse-inquiries.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  async function removeRow(row: InquiryRow) {
    removeStash(row.id);
    setRows((prev) => (prev ?? []).filter((item) => item.id !== row.id));
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (token && token !== "local-ok") {
      try {
        await deleteInquiry({ data: { token, id: row.id } });
      } catch {
        /* local already removed */
      }
    }
  }

  async function emptyInbox() {
    clearStash();
    setRows([]);
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      try {
        await clearInbox({ data: { token } });
      } catch {
        /* local already empty */
      }
    }
  }

  if (locked) {
    return (
      <>
        <PageHero title={t("inbox.title")} sub={t("inbox.unlockBody")} bg="/page-bg/inbox-key.jpg?v=2" />
        <section className="mx-auto max-w-md px-4 py-16 sm:px-6">
          <form onSubmit={onUnlock} className="grid gap-4 rounded-2xl border border-border bg-surface p-6">
            <div>
              <Label htmlFor="username">{t("inbox.user")}</Label>
              <Input id="username" name="username" autoComplete="username" required value={user} onChange={(e) => setUser(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="password">{t("inbox.pass")}</Label>
              <Input id="password" name="password" type="password" autoComplete="current-password" required value={pass} onChange={(e) => setPass(e.target.value)} />
            </div>
            {error ? <p className="text-sm text-red-500">{t("inbox.badCode")}</p> : null}
            <Button type="button" disabled={busy} onClick={() => void unlock()}>
              {busy ? t("contact.sending") : t("inbox.open")}
            </Button>
          </form>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero title={t("inbox.title")} sub={t("inbox.lead")} bg="/page-bg/inbox-key.jpg?v=2" />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold">{t("inbox.title")}</h1>
            <p className="mt-2 text-sm text-fg-muted">{t("inbox.lead")}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={async () => {
                if (!rows?.length) return;
                if (await copyText(toSheet(rows))) flash("sheet");
              }}
            >
              {copied === "sheet" ? t("inbox.copied") : t("inbox.copySheet")}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={async () => {
                if (!rows?.length) return;
                if (await copyText(rows.map(listText).join("\n\n---\n\n"))) flash("all");
              }}
            >
              {copied === "all" ? t("inbox.copied") : t("inbox.copyAll")}
            </Button>
            <Button type="button" onClick={downloadExcel}>
              {t("inbox.excel")}
            </Button>
            <Button type="button" variant="secondary" onClick={() => void emptyInbox()}>
              {t("inbox.clear")}
            </Button>
            <button type="button" className="text-sm text-fg-muted hover:text-accent" onClick={signOut}>
              {t("inbox.signOut")}
            </button>
          </div>
        </div>

        {rows === null ? (
          <div className="mt-8 h-32 animate-pulse rounded-2xl bg-fg/5" />
        ) : rows.length === 0 ? (
          <p className="mt-8 text-fg-muted">{t("inbox.empty")}</p>
        ) : (
          <>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
              <table className="min-w-[960px] w-full text-left text-sm">
                <thead className="bg-fg/5 text-xs tracking-[0.12em] text-fg-muted uppercase">
                  <tr>
                    {COLS.map((col) => (
                      <th key={col} className="px-3 py-3 font-semibold">
                        {col}
                      </th>
                    ))}
                    <th className="px-3 py-3 font-semibold">Copy</th>
                    <th className="px-3 py-3 font-semibold">{t("inbox.delete")}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={`${row.id}-${row.created_at}`} className="border-t border-border align-top">
                      {cell(row).map((value, i) => (
                        <td key={COLS[i]} className="max-w-[12rem] px-3 py-3 break-words">
                          {i === 1 ? (
                            <a className="text-accent hover:underline" href={`mailto:${value}`}>
                              {value}
                            </a>
                          ) : i === 2 ? (
                            <a className="text-accent hover:underline" href={`https://wa.me/${value.replace(/\D/g, "")}`}>
                              {value}
                            </a>
                          ) : (
                            value || "—"
                          )}
                        </td>
                      ))}
                      <td className="px-3 py-3">
                        <button
                          type="button"
                          className="text-xs font-medium text-accent hover:underline"
                          onClick={async () => {
                            if (await copyText(listText(row))) flash(String(row.id));
                          }}
                        >
                          {copied === String(row.id) ? t("inbox.copied") : t("inbox.copy")}
                        </button>
                      </td>
                      <td className="px-3 py-3">
                        <button
                          type="button"
                          className="text-xs font-medium text-red-400 hover:underline"
                          onClick={() => void removeRow(row)}
                        >
                          {t("inbox.delete")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="mt-8 space-y-4">
              {rows.map((row) => (
                <li key={`card-${row.id}-${row.created_at}`} className="rounded-2xl border border-border bg-surface p-5">
                  <pre className="overflow-x-auto whitespace-pre-wrap font-sans text-sm leading-relaxed text-fg">{listText(row)}</pre>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <button
                      type="button"
                      className="text-sm font-medium text-accent hover:underline"
                      onClick={async () => {
                        if (await copyText(listText(row))) flash(`c${row.id}`);
                      }}
                    >
                      {copied === `c${row.id}` ? t("inbox.copied") : t("inbox.copy")}
                    </button>
                    <a
                      className="text-sm font-medium text-accent hover:underline"
                      href={whatsappUrl(
                        inquiryWhatsAppText({
                          fullName: row.full_name,
                          email: row.email,
                          phone: row.phone,
                          businessName: row.business_name,
                          service: row.service,
                          budget: row.budget,
                          details: row.details,
                        }),
                      )}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t("inbox.whatsapp")}
                    </a>
                    <button
                      type="button"
                      className="text-sm font-medium text-red-400 hover:underline"
                      onClick={() => void removeRow(row)}
                    >
                      {t("inbox.delete")}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </>
  );
}
