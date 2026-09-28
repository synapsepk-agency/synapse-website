import { createFileRoute } from "@tanstack/react-router";
import { PricingBoards } from "@/components/sections/pricing-boards";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () => ({
    meta: [
      { title: "Pricing, Synapse Marketing Agency" },
      {
        name: "description",
        content:
          "Meta Ads, social media, web development, SEO, brand identity, consultancy and video packages from Synapse Marketing Agency in Quetta.",
      },
    ],
  }),
});

function PricingPage() {
  return <PricingBoards />;
}
