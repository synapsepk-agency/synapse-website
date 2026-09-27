import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { PricingBoards } from "@/components/sections/pricing-boards";

export const Route = createFileRoute("/packages")({
  component: PackagesPage,
  head: () => ({
    meta: pageMeta(
      "Packages & pricing, Synapse Marketing Agency",
      "Synapse package rates for web development, reels, Meta Ads, social media, SEO and branding in Quetta.",
    ),
  }),
});

function PackagesPage() {
  return <PricingBoards share />;
}
