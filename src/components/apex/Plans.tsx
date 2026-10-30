import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/lib/apex-data";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

export function Plans({ onSelectPlan }: { onSelectPlan: (planName: string) => void }) {
  return (
    <section id="plans" className="relative overflow-hidden py-24 sm:py-32">
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="glow-orb absolute left-1/2 top-1/3 size-[700px] -translate-x-1/2" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Membership <span className="text-gradient-neon">plans</span>
            </>
          }
          subtitle="Choose the level of coaching that fits your goals. Upgrade anytime as you progress."
        />

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 120} className="h-full">
              <TiltCard
                max={8}
                className={cn(
                  "flex h-full flex-col p-8",
                  plan.featured && "shadow-neon lg:-my-4 lg:py-12",
                )}
              >
                {plan.badge && (
                  <span
                    className={cn(
                      "depth-2 absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]",
                      plan.featured
                        ? "bg-gradient-neon text-primary-foreground shadow-neon"
                        : "border border-primary/40 bg-background text-primary",
                    )}
                  >
                    <Zap className="size-3" /> {plan.badge}
                  </span>
                )}
                <div className="depth-1">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    {plan.tagline}
                  </p>
                  <h3 className="mt-3 text-xl font-black uppercase leading-tight">{plan.name}</h3>
                </div>

                <div className="depth-2 mt-7 flex items-end gap-1">
                  <span className="self-start pt-1 text-2xl font-bold text-muted-foreground">$</span>
                  <span className="font-display text-6xl font-black leading-none">{plan.price}</span>
                  <span className="pb-2 text-sm font-semibold text-muted-foreground">
                    {plan.period}
                  </span>
                </div>

                <ul className="depth-1 mt-8 flex-1 space-y-3.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-primary">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      <span className="text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.featured ? "neon" : "glass"}
                  size="xl"
                  className="depth-2 mt-9 w-full"
                  onClick={() => onSelectPlan(plan.name)}
                >
                  Get {plan.name}
                </Button>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
