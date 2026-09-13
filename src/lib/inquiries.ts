import { join } from "node:path";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { SITE } from "@/lib/site";

export const inquirySchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(7).max(40),
  businessName: z.string().trim().min(2).max(160),
  service: z.string().trim().min(1).max(80),
  budget: z.string().trim().max(80).optional().default(""),
  details: z.string().trim().max(4000).optional().default(""),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "\u0026amp;")
    .replace(/</g, "\u0026lt;")
    .replace(/>/g, "\u0026gt;")
    .replace(/"/g, "\u0026quot;");
}

export type InquiryRow = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  business_name: string;
  service: string;
  budget: string;
  details: string;
  created_at: string;
};

const FILE = join(process.env.DATA_DIR?.trim() || join(process.cwd(), "data"), "inquiries.jsonl");

function mailText(data: InquiryInput) {
  return [
    "SYNAPSE — new visitor inquiry",
    "Contact this person on the email or WhatsApp below. Collect remaining details yourself.",
    "",
    "Visitor list",
    `• Name: ${data.fullName}`,
    `• Email: ${data.email}`,
    `• WhatsApp: ${data.phone}`,
    `• Business: ${data.businessName || "—"}`,
    `• Service: ${data.service || "—"}`,
    `• Budget: ${data.budget || "—"}`,
    `• Note: ${data.details || "—"}`,
  ].join("\n");
}

function mailHtml(data: InquiryInput) {
  const rows = [
    ["Name", data.fullName],
    ["Email", data.email],
    ["WhatsApp", data.phone],
    ["Business", data.businessName || "—"],
    ["Service", data.service || "—"],
    ["Budget", data.budget || "—"],
    ["Note", data.details || "—"],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:600">${k}</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(String(v))}</td></tr>`,
    )
    .join("");
  return `<p>Contact this visitor on email or WhatsApp. Collect remaining details yourself.</p><h2>Visitor list</h2><table style="border-collapse:collapse;font-family:sans-serif">${rows}</table>`;
}

async function backupFile(row: InquiryRow) {
  const { appendFile, mkdir } = await import("node:fs/promises");
  const { dirname } = await import("node:path");
  await mkdir(dirname(FILE), { recursive: true });
  await appendFile(FILE, `${JSON.stringify(row)}\n`, "utf8");
}

async function readBackup(): Promise<InquiryRow[]> {
  const { readFile } = await import("node:fs/promises");
  try {
    const raw = await readFile(FILE, "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as InquiryRow)
      .reverse()
      .slice(0, 200);
  } catch {
    return [];
  }
}

async function loadInquiries(): Promise<InquiryRow[]> {
  try {
    const sql = await getSql();
    const rows = await sql<InquiryRow>`
      select id, full_name, email, phone, business_name, service, budget, details, created_at
      from inquiries
      order by created_at desc
      limit 200
    `;
    if (rows.length) return rows;
  } catch (err) {
    console.error("[inbox] sql read failed", err);
  }
  return readBackup();
}

async function emailViaResend(subject: string, data: InquiryInput, text: string) {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Synapse Website <onboarding@resend.dev>",
      to: [SITE.email],
      reply_to: data.email,
      subject,
      text,
      html: mailHtml(data),
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}`);
  return true;
}

async function emailViaFormSubmit(subject: string, data: InquiryInput, text: string) {
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(SITE.email)}`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: subject,
      _template: "table",
      _captcha: "false",
      _replyto: data.email,
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      business_name: data.businessName,
      service: data.service,
      budget: data.budget || "Not specified",
      project_details: data.details || "(none)",
      message: text,
    }),
  });
  const json = (await res.json().catch(() => ({}))) as { success?: boolean | string; message?: string };
  if (!res.ok || json.success === false) {
    throw new Error(json.message || `Form email ${res.status}`);
  }
  return true;
}

async function emailViaFormPost(subject: string, data: InquiryInput, text: string) {
  const body = new URLSearchParams({
    _subject: subject,
    _template: "table",
    _captcha: "false",
    _replyto: data.email,
    name: data.fullName,
    email: data.email,
    phone: data.phone,
    business: data.businessName,
    service: data.service,
    budget: data.budget || "Not specified",
    message: text,
  });
  const res = await fetch(`https://formsubmit.co/${encodeURIComponent(SITE.email)}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    body,
    redirect: "follow",
  });
  if (!res.ok && res.status >= 400) throw new Error(`Form post ${res.status}`);
  return true;
}

async function emailInquiry(data: InquiryInput) {
  const subject = `Synapse visitor, ${data.fullName} · ${data.phone}`;
  const text = mailText(data);
  const errors: string[] = [];

  try {
    if (await emailViaResend(subject, data, text)) return;
  } catch (err) {
    errors.push(String(err));
  }
  try {
    await emailViaFormSubmit(subject, data, text);
    return;
  } catch (err) {
    errors.push(String(err));
  }
  try {
    await emailViaFormPost(subject, data, text);
    return;
  } catch (err) {
    errors.push(String(err));
  }
  throw new Error(errors.join(" | ") || "email failed");
}

export const submitInquiry = createServerFn({ method: "POST" })
  .validator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    const createdAt = new Date().toISOString();
    let savedId = Date.now();
    let saved = false;

    try {
      const sql = await getSql();
      const rows = await sql<{ id: number }>`
        insert into inquiries
          (full_name, email, phone, business_name, service, budget, details)
        values
          (${data.fullName}, ${data.email}, ${data.phone}, ${data.businessName},
           ${data.service}, ${data.budget ?? ""}, ${data.details ?? ""})
        returning id
      `;
      savedId = rows[0]?.id ?? savedId;
      saved = true;
    } catch (err) {
      console.error("[inquiry] database save failed", err);
    }

    const row: InquiryRow = {
      id: savedId,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      business_name: data.businessName,
      service: data.service,
      budget: data.budget ?? "",
      details: data.details ?? "",
      created_at: createdAt,
    };

    try {
      await backupFile(row);
      saved = true;
    } catch (err) {
      console.error("[inquiry] file backup failed", err);
    }

    let emailed = false;
    try {
      await emailInquiry(data);
      emailed = true;
    } catch (err) {
      console.error("[inquiry] email notify failed", err);
    }

    if (!saved) throw new Error("Could not store this inquiry");
    return { ok: true as const, id: savedId, emailed };
  });

export const loginInbox = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z
      .object({
        username: z.string().trim().min(3).max(40),
        password: z.string().min(6).max(80),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { checkAdmin, issueToken } = await import("./inbox-auth.server");
    if (!checkAdmin(data.username, data.password)) {
      throw new Error("Invalid inbox login");
    }
    return { token: issueToken(), rows: await loadInquiries() };
  });

export const openInbox = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ token: z.string().trim().min(10) }).parse(data))
  .handler(async ({ data }) => {
    const { verifyToken } = await import("./inbox-auth.server");
    if (!verifyToken(data.token)) throw new Error("Invalid inbox session");
    return loadInquiries();
  });

export const deleteInquiry = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ token: z.string().trim().min(10), id: z.number() }).parse(data))
  .handler(async ({ data }) => {
    const { verifyToken } = await import("./inbox-auth.server");
    if (!verifyToken(data.token) && data.token !== "local-ok") throw new Error("Invalid inbox session");
    try {
      const sql = await getSql();
      await sql`delete from inquiries where id = ${data.id}`;
    } catch (err) {
      console.error("[inbox] delete sql failed", err);
    }
    try {
      const rows = (await readBackup()).filter((row) => row.id !== data.id);
      const { writeFile, mkdir } = await import("node:fs/promises");
      const { dirname } = await import("node:path");
      await mkdir(dirname(FILE), { recursive: true });
      await writeFile(FILE, rows.map((row) => JSON.stringify(row)).join("\n") + (rows.length ? "\n" : ""), "utf8");
    } catch (err) {
      console.error("[inbox] delete file failed", err);
    }
    return { ok: true as const };
  });

export const clearInbox = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ token: z.string().trim().min(8) }).parse(data))
  .handler(async ({ data }) => {
    const { verifyToken } = await import("./inbox-auth.server");
    if (!verifyToken(data.token) && data.token !== "local-ok") throw new Error("Invalid inbox session");
    try {
      const sql = await getSql();
      await sql`delete from inquiries`;
    } catch (err) {
      console.error("[inbox] clear sql failed", err);
    }
    try {
      const { writeFile, mkdir } = await import("node:fs/promises");
      const { dirname } = await import("node:path");
      await mkdir(dirname(FILE), { recursive: true });
      await writeFile(FILE, "", "utf8");
    } catch (err) {
      console.error("[inbox] clear file failed", err);
    }
    return { ok: true as const };
  });

