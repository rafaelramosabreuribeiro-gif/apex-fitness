import { Dumbbell, Flame, Move, UserRound, type LucideIcon } from "lucide-react";
import { PROGRAMS } from "@/lib/apex-data";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

const ICONS: Record<string, LucideIcon> = {
  personal: UserRound,
  hypertrophy: Dumbbell,
  "fat-loss": Flame,
  cross: Move,
};

export function Programs() {
  return (
    <section id="programs" className="relative overflow-hidden py-24 sm:py-32">
      <div className="glow-orb absolute -right-40 top-20 size-[520px] opacity-70" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Programs"
          title={
            <>
              Our training <span className="text-gradient-neon">programs</span>
            </>
          }
          subtitle="Science-backed programs for every goal and level. Pick your focus — our coaches handle the plan, the progression and the accountability."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROGRAMS.map((program, i) => {
            const Icon = ICONS[program.id] ?? Dumbbell;
            return (
              <Reveal key={program.id} delay={i * 110} className="h-full">
                <TiltCard className="group flex h-full flex-col p-7">
                  <div className="depth-2 flex items-start justify-between">
                    <span className="grid size-14 place-items-center rounded-2xl border border-primary/30 bg-accent/50 text-primary transition-all duration-500 group-hover:bg-gradient-neon group-hover:text-primary-foreground group-hover:shadow-neon">
                      <Icon className="size-6" />
                    </span>
                    <span className="font-display text-5xl font-black text-foreground/10 transition-colors duration-500 group-hover:text-primary/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="depth-1 mt-8 text-lg font-bold uppercase leading-tight">
                    {program.title}
                  </h3>
                  <p className="depth-1 mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {program.text}
                  </p>

                  <div className="depth-1 mt-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      Target goals
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {program.goals.map((g) => (
                        <li
                          key={g}
                          className="rounded-full border border-primary/25 bg-accent/40 px-2.5 py-1 text-[11px] font-semibold text-foreground/90"
                        >
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="depth-1 mt-5 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      Intensity
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="flex gap-1" aria-hidden>
                        {[1, 2, 3].map((n) => (
                          <span
                            key={n}
                            className={cn(
                              "h-2 w-5 rounded-full",
                              n <= program.level ? "bg-primary shadow-neon" : "bg-muted",
                            )}
                          />
                        ))}
                      </span>
                      <span className="text-xs font-bold uppercase text-primary">
                        {program.intensity}
                      </span>
                    </span>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
