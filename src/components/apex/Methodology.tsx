import { Activity, ClipboardCheck, Salad, Smartphone } from "lucide-react";
import { METHOD_STEPS } from "@/lib/apex-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

const ICONS = [ClipboardCheck, Salad, Smartphone, Activity];

export function Methodology() {
  return (
    <section id="metodologia" className="relative overflow-hidden py-24 sm:py-32">
      <div className="glow-orb absolute -right-40 top-20 size-[520px] opacity-70" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Metodologia APEX"
          title={
            <>
              Um método. <span className="text-gradient-neon">Zero achismo.</span>
            </>
          }
          subtitle="Cada etapa é desenhada com base em dados, ciência e na sua rotina real. Você sabe exatamente o que fazer — e por quê."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {METHOD_STEPS.map((step, i) => {
            const Icon = ICONS[i] ?? Activity;
            return (
              <Reveal key={step.n} delay={i * 110} className="h-full">
                <TiltCard className="group h-full p-7">
                  <div className="depth-2 flex items-start justify-between">
                    <span className="grid size-14 place-items-center rounded-2xl border border-primary/30 bg-accent/50 text-primary transition-all duration-500 group-hover:bg-gradient-neon group-hover:text-primary-foreground group-hover:shadow-neon">
                      <Icon className="size-6" />
                    </span>
                    <span className="font-display text-5xl font-black text-foreground/10 transition-colors duration-500 group-hover:text-primary/40">
                      {step.n}
                    </span>
                  </div>
                  <h3 className="depth-1 mt-8 text-lg font-bold uppercase leading-tight">
                    {step.title}
                  </h3>
                  <p className="depth-1 mt-3 text-sm leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                  <div className="mt-6 h-px w-12 bg-gradient-neon transition-all duration-500 group-hover:w-full" />
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
