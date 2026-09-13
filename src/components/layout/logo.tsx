import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  size = "md",
  onAccent = false,
  onDark: _onDark = false,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  onAccent?: boolean;
  onDark?: boolean;
}) {
  const src = onAccent ? "/logo-mark-dark.png" : "/logo-mark.png";
  const h = size === "sm" ? "h-10" : size === "lg" ? "h-[5.25rem]" : "h-14";
  return (
    <Link to="/" className={cn("inline-flex items-center gap-2", className)} aria-label="Synapse home">
      <img src={src} alt="Synapse Marketing Agency" className={cn(h, "w-auto")} width="220" height="52" decoding="async" fetchPriority="high" />
    </Link>
  );
}