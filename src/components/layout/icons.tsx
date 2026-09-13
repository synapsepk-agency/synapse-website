import type { SVGProps } from "react";
import {
  Megaphone,
  Monitor,
  Share2,
  Search,
  Palette,
  Compass,
  Video,
  ShoppingBag,
  UtensilsCrossed,
  Building2,
  HeartPulse,
  GraduationCap,
  Briefcase,
  MapPin,
  Rocket,
} from "lucide-react";
import type { SERVICES, INDUSTRIES } from "@/lib/content";

type IconName = (typeof SERVICES)[number]["icon"] | (typeof INDUSTRIES)[number]["icon"];

const MAP: Record<IconName, typeof Megaphone> = {
  megaphone: Megaphone,
  monitor: Monitor,
  share: Share2,
  search: Search,
  palette: Palette,
  compass: Compass,
  video: Video,
  shopping: ShoppingBag,
  utensils: UtensilsCrossed,
  building: Building2,
  heart: HeartPulse,
  graduation: GraduationCap,
  briefcase: Briefcase,
  map: MapPin,
  rocket: Rocket,
};

export function ServiceIcon({ name, className }: { name: IconName; className?: string }) {
  const Icon = MAP[name];
  return <Icon className={className} strokeWidth={1.6} />;
}

export function PlaneMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M21.5 3.2 2.8 11.4c-.7.3-.6 1.3.1 1.5l5.2 1.4 1.5 5.4c.2.7 1.2.8 1.5.1l3.5-7.7 6.2-7.7c.5-.6-.1-1.5-.8-1.2Z" />
    </svg>
  );
}
