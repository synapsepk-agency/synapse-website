import type { InquiryFields } from "@/lib/site";
import type { InquiryRow } from "@/lib/inquiries";

const KEY = "synapse-inquiries-v3";

export function stashInquiry(data: InquiryFields) {
  if (typeof window === "undefined") return;
  const row: InquiryRow = {
    id: Date.now(),
    full_name: data.fullName,
    email: data.email,
    phone: data.phone,
    business_name: data.businessName,
    service: data.service,
    budget: data.budget ?? "",
    details: data.details ?? "",
    created_at: new Date().toISOString(),
  };
  const rows = readStash();
  rows.unshift(row);
  try {
    localStorage.setItem(KEY, JSON.stringify(rows.slice(0, 200)));
  } catch {
    /* ignore */
  }
}

export function readStash(): InquiryRow[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as InquiryRow[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function removeStash(id: number) {
  const rows = readStash().filter((row) => row.id !== id);
  try {
    localStorage.setItem(KEY, JSON.stringify(rows));
  } catch {
    /* ignore */
  }
  return rows;
}

export function clearStash() {
  try {
    localStorage.removeItem(KEY);
    localStorage.removeItem("synapse-inquiries");
  } catch {
    /* ignore */
  }
}

export function mergeRows(server: InquiryRow[] | null | undefined): InquiryRow[] {
  const local = readStash();
  const seen = new Set<string>();
  const out: InquiryRow[] = [];
  for (const row of [...(server ?? []), ...local]) {
    const key = `${row.email}|${row.phone}|${row.created_at}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(row);
  }
  return out.sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));
}

