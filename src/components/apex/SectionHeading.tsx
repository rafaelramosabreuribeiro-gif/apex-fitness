import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-accent/40 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
        <span className="size-1.5 rounded-full bg-primary animate-pulse-glow" />
        {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl font-black uppercase leading-[1.05] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base text-muted-foreground sm:text-lg">{subtitle}</p>
      )}
    </Reveal>
  );
}
