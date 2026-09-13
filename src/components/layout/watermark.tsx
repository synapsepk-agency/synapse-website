import { cn } from "@/lib/utils";

const POS = {
  right: "end-[-18%] top-1/2 w-[min(72vw,720px)] -translate-y-1/2",
  left: "start-[-20%] top-[12%] w-[min(60vw,560px)]",
  center: "left-1/2 top-1/2 w-[min(80vw,820px)] -translate-x-1/2 -translate-y-1/2",
  "bottom-right": "end-[-10%] bottom-[-18%] w-[min(55vw,540px)]",
} as const;

export function Watermark({
  position = "right",
  className,
}: {
  position?: keyof typeof POS;
  className?: string;
}) {
  const src = "/logo-mark.png";
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      className={cn("watermark-img", POS[position], className)}
    />
  );
}
