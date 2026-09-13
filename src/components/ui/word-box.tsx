import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function WordBox({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      className={cn("word-box", on && "is-on", className)}
      aria-pressed={on}
      onClick={() => setOn((v) => !v)}
      {...props}
    >
      <span className="word-box-label">{children}</span>
    </button>
  );
}
