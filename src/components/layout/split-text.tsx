import { cn } from "@/lib/utils";

function splitLines(text: string) {
  const normalized = text.replace(/\u06d4/g, ".");
  const parts = normalized
    .split(".")
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length > 1) return parts;
  return [text];
}

export function SplitLines({
  text,
  className,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p";
}) {
  const lines = splitLines(text);
  return (
    <Tag className={cn("split-block", className)}>
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className="split-line">
          <span style={{ animationDelay: `${120 + i * 90}ms` }}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

export function SplitWords({
  text,
  className,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p";
}) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <Tag className={cn(className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="split-word">
          <span style={{ animationDelay: `${80 + i * 45}ms` }}>
            {word}
            {i < words.length - 1 ? "\u00a0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}

export function SplitChars({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const chars = Array.from(text);
  return (
    <span className={cn("inline-flex flex-wrap", className)} aria-label={text}>
      {chars.map((ch, i) =>
        ch === " " ? (
          <span key={`s-${i}`} className="w-[0.35em]" aria-hidden>
            {"\u00a0"}
          </span>
        ) : (
          <span key={`${ch}-${i}`} className="split-char" aria-hidden>
            <span style={{ animationDelay: `${60 + i * 28}ms` }}>{ch}</span>
          </span>
        ),
      )}
    </span>
  );
}
