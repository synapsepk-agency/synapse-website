import { useRef, useState, type FormEvent } from "react";
import { SITE, SERVICE_OPTIONS, BUDGET_OPTIONS, inquiryWhatsAppText, type InquiryFields } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { submitInquiry } from "@/lib/inquiries";
import { stashInquiry } from "@/lib/inquiry-store";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";

function Req({ children }: { children: string }) {
  return (
    <>
      {children} <span className="text-accent">*</span>
    </>
  );
}

function payloadFrom(form: HTMLFormElement): InquiryFields {
  const fd = new FormData(form);
  return {
    fullName: String(fd.get("fullName") ?? "").trim(),
    email: String(fd.get("email") ?? "").trim(),
    phone: String(fd.get("phone") ?? "").trim(),
    businessName: String(fd.get("businessName") ?? "").trim(),
    service: String(fd.get("service") ?? "").trim(),
    budget: String(fd.get("budget") ?? "").trim(),
    details: String(fd.get("details") ?? "").trim(),
  };
}

function isValid(data: InquiryFields) {
  return (
    data.fullName.length >= 2 &&
    data.email.includes("@") &&
    data.phone.length >= 7 &&
    data.businessName.length >= 2 &&
    Boolean(data.service)
  );
}

async function sendInquiry(data: InquiryFields) {
  try {
    await Promise.allSettled([
      submitInquiry({ data }),
      fetch(`https://formsubmit.co/ajax/${encodeURIComponent(SITE.email)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Synapse visitor, ${data.fullName} · ${data.phone}`,
          _template: "table",
          _captcha: "false",
          _replyto: data.email,
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          business_name: data.businessName,
          service: data.service,
          budget: data.budget || "Not specified",
          message: inquiryWhatsAppText(data),
        }),
      }),
    ]);
  } catch {
    /* still show thank you */
  }
}

export function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
  const { t } = useI18n();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "err">("idle");
  const [formKey, setFormKey] = useState(0);

  function finish(data: InquiryFields) {
    stashInquiry(data);
    void sendInquiry(data);
    setFormKey((n) => n + 1);
    setStatus("idle");
  }

  function onClickSend() {
    const form = formRef.current;
    if (!form) return;
    const data = payloadFrom(form);
    if (!isValid(data)) {
      setStatus("err");
      return;
    }
    setStatus("sending");
    finish(data);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    onClickSend();
  }

  return (
    <form
      ref={formRef}
      key={formKey}
      onSubmit={onSubmit}
      action=""
      method="post"
      noValidate
      className="grid gap-4 rounded-2xl border border-border bg-surface p-6 sm:p-8"
    >
      <p className="text-sm text-fg-muted">{t("contact.destination")}</p>
      <p className="text-xs text-fg-subtle">{t("contact.requiredNote")}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">
            <Req>{t("contact.name")}</Req>
          </Label>
          <Input id="fullName" name="fullName" required autoComplete="name" minLength={2} />
        </div>
        <div>
          <Label htmlFor="email">
            <Req>{t("contact.email")}</Req>
          </Label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div>
          <Label htmlFor="phone">
            <Req>{t("contact.phone")}</Req>
          </Label>
          <Input id="phone" name="phone" type="tel" required autoComplete="tel" minLength={7} />
        </div>
        <div>
          <Label htmlFor="businessName">
            <Req>{t("contact.business")}</Req>
          </Label>
          <Input id="businessName" name="businessName" required minLength={2} />
        </div>
        <div>
          <Label htmlFor="service">
            <Req>{t("contact.service")}</Req>
          </Label>
          <Select id="service" name="service" required defaultValue="">
            <option value="" disabled>
              {t("contact.selectService")}
            </option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {t(`opt.${opt}`)}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="budget">{t("contact.budget")}</Label>
          <Select id="budget" name="budget" defaultValue="not-sure">
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {t(`opt.${opt}`)}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="details">{t("contact.details")}</Label>
        <Textarea id="details" name="details" rows={5} />
      </div>
      {status === "err" ? <p className="text-sm text-red-500">{t("contact.error")}</p> : null}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" size="lg" disabled={status === "sending"} onClick={onClickSend}>
          {status === "sending" ? t("contact.sending") : t("contact.send")}
        </Button>
      </div>
    </form>
  );
}
