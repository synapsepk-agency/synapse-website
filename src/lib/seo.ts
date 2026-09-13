export function pageMeta(title: string, description: string) {
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/og.jpg" },
    { property: "og:locale", content: "en_PK" },
    { property: "og:site_name", content: "Synapse Marketing Agency" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: "/og.jpg" },
    { name: "twitter:image:alt", content: "Synapse Marketing Agency" },
  ];
}

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Synapse Marketing Agency",
  alternateName: "Synapse",
  slogan: "CREATE. CONNECT. GROW.",
  url: "/",
  email: "synapseagency.pk@gmail.com",
  telephone: "+923303129882",
  image: "/logo.jpg",
  logo: "/logo-mark.png",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Quetta",
    addressRegion: "Balochistan",
    addressCountry: "PK",
  },
  areaServed: [
    { "@type": "City", name: "Quetta" },
    { "@type": "AdministrativeArea", name: "Balochistan" },
    { "@type": "Country", name: "Pakistan" },
  ],
  knowsLanguage: ["en", "ur"],
  sameAs: [
    "https://www.facebook.com/share/184AerGnKs/?mibextid=wwXIfr",
    "https://www.instagram.com/synapsemarketingagency",
    "https://www.tiktok.com/@synapsemarketingagency",
    "https://linktr.ee/synapsemarketingagency",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Synapse services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Meta Ads" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Management" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand Identity" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reel Production" } },
    ],
  },
};
