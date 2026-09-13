export const SITE = {
  name: "Synapse Marketing Agency",
  shortName: "Synapse",
  tagline: "CREATE. CONNECT. GROW.",
  email: "synapseagency.pk@gmail.com",
  phone: "+92 330 3129882",
  phoneTel: "tel:+923303129882",
  whatsappNumber: "923303129882",
  whatsapp: "https://wa.me/923303129882",
  social: {
    facebook: "https://www.facebook.com/share/184AerGnKs/?mibextid=wwXIfr",
    instagram: "https://www.instagram.com/synapsemarketingagency",
    tiktok: "https://www.tiktok.com/@synapsemarketingagency",
    whatsapp: "https://wa.me/923303129882",
    email: "mailto:synapseagency.pk@gmail.com",
    linktree: "https://linktr.ee/synapsemarketingagency",
  },
  instagramHandle: "@synapsemarketingagency",
  tiktokHandle: "@synapsemarketingagency",
} as const;

export type InquiryFields = {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  service: string;
  budget?: string;
  details?: string;
};

export function inquiryWhatsAppText(data: InquiryFields) {
  return [
    "New Synapse website inquiry",
    "",
    `Name: ${data.fullName}`,
    `Business: ${data.businessName}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Service: ${data.service}`,
    `Budget: ${data.budget || "Not specified"}`,
    data.details ? `\nDetails:\n${data.details}` : "",
  ]
    .filter((line) => line !== "")
    .join("\n");
}

export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const NAV = [
  { to: "/", key: "home" as const },
  { to: "/about", key: "about" as const },
  { to: "/services", key: "services" as const },
  { to: "/pricing", key: "pricing" as const },
  { to: "/process", key: "process" as const },
  { to: "/team", key: "team" as const },
  { to: "/blog", key: "blog" as const },
  { to: "/contact", key: "contact" as const },
];

export const SERVICE_OPTIONS = [
  "meta-ads",
  "web-development",
  "social-media",
  "seo",
  "brand-identity",
  "consultancy",
  "video",
  "multiple",
] as const;

export const BUDGET_OPTIONS = [
  "under-25",
  "25-50",
  "50-100",
  "100-200",
  "200-plus",
  "not-sure",
] as const;
