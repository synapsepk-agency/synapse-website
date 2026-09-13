import { useRef, useState, type FormEvent } from "react";
import { SITE } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { HELLO, SUGGESTIONS, createSession, replyTo, type ChatSession, type ChatTurn } from "@/lib/chatbot";
import { cn } from "@/lib/utils";

export function Chatbot() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [turns, setTurns] = useState<ChatTurn[]>([{ role: "bot", text: lang === "ur" ? HELLO.ur : HELLO.en }]);
  const [chips, setChips] = useState<string[]>([...SUGGESTIONS[lang === "ur" ? "ur" : "en"]]);
  const sessionRef = useRef<ChatSession>(createSession());
  const listRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number>(0);

  function scroll() {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }

  function newChat() {
    window.clearTimeout(timerRef.current);
    sessionRef.current = createSession();
    setBusy(false);
    setInput("");
    setTurns([{ role: "bot", text: lang === "ur" ? HELLO.ur : HELLO.en }]);
    setChips([...SUGGESTIONS[lang === "ur" ? "ur" : "en"]]);
  }

  function ask(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    if (/^whatsapp$/i.test(q) || q === "واٹس ایپ") {
      window.open(SITE.whatsapp, "_blank", "noopener,noreferrer");
    }
    setInput("");
    setBusy(true);
    setTurns((prev) => [...prev, { role: "user", text: q }, { role: "typing", text: "…" }]);
    requestAnimationFrame(scroll);
    timerRef.current = window.setTimeout(() => {
      const answer = replyTo(q, lang, sessionRef.current);
      setChips(answer.chips);
      setTurns((prev) => {
        const next = prev.filter((m) => m.role !== "typing");
        next.push({ role: "bot", text: answer.text });
        return next;
      });
      setBusy(false);
      requestAnimationFrame(scroll);
    }, 180);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    ask(input);
  }

  return (
    <div className="chatbot">
      <div className={cn("chatbot-panel", open && "is-open")} role="dialog" aria-hidden={!open} aria-label={t("bot.title")}>
        <div className="chatbot-head">
          <p className="font-display text-sm font-semibold">{t("bot.title")}</p>
          <p className="text-[0.7rem] text-black/70">{t("bot.sub")}</p>
          <div className="chatbot-head-actions">
            <button type="button" className="chatbot-new" onClick={newChat}>
              {t("bot.new")}
            </button>
            <button type="button" className="chatbot-x" onClick={() => setOpen(false)} aria-label={t("nav.close")}>
              ×
            </button>
          </div>
        </div>
        <div ref={listRef} className="chatbot-log">
          {turns.map((turn, i) => (
            <p
              key={`${turn.role}-${i}`}
              className={cn("chatbot-bubble", turn.role === "user" && "is-user", turn.role === "typing" && "is-typing")}
            >
              {turn.text}
            </p>
          ))}
        </div>
        <div className="chatbot-chips">
          {chips.map((s) => (
            <button key={s} type="button" onClick={() => ask(s)} disabled={busy}>
              {s}
            </button>
          ))}
        </div>
        <form onSubmit={onSubmit} className="chatbot-form">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("bot.placeholder")}
            aria-label={t("bot.placeholder")}
            disabled={busy}
          />
          <button type="submit" disabled={busy}>
            {t("bot.send")}
          </button>
        </form>
      </div>
      <button
        type="button"
        className="group flex size-14 items-center justify-center overflow-hidden rounded-full border-2 border-accent bg-[#0a0a0a] text-sm font-medium text-accent shadow-[0_12px_32px_rgb(0_0_0/0.35)] transition-[width,padding,gap,transform] duration-200 hover:w-auto hover:scale-[1.03] hover:justify-start hover:gap-2 hover:px-4 hover:pe-5 focus-visible:w-auto focus-visible:justify-start focus-visible:gap-2 focus-visible:px-4 focus-visible:pe-5"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={t("bot.chat")}
      >
        <svg viewBox="0 0 24 24" className="size-7 shrink-0" aria-hidden>
          <circle cx="12" cy="3" r="1.35" fill="currentColor" />
          <rect x="11.15" y="4.1" width="1.7" height="2.2" rx="0.6" fill="currentColor" />
          <rect x="3.4" y="6.6" width="17.2" height="13" rx="4.4" fill="currentColor" />
          <circle cx="9" cy="13.1" r="1.55" fill="#0a0a0a" />
          <circle cx="15" cy="13.1" r="1.55" fill="#0a0a0a" />
        </svg>
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity] duration-200 group-hover:max-w-[9rem] group-hover:opacity-100 group-focus-visible:max-w-[9rem] group-focus-visible:opacity-100">
          {t("bot.chat")}
        </span>
      </button>
    </div>
  );
}
