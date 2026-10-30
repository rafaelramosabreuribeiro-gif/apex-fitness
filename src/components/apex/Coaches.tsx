import { useEffect, useState } from "react";
import { BadgeCheck, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { COACHES, TESTIMONIALS } from "@/lib/apex-data";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = TESTIMONIALS.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % total), 5500);
    return () => clearInterval(id);
  }, [paused, total]);

  const go = (dir: number) => setActive((a) => (a + dir + total) % total);

  return (
    <div
      className="mt-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <SectionHeading
        eyebrow="Results"
        title={
          <>
            Member <span className="text-gradient-neon">success stories</span>
          </>
        }
        subtitle="Illustrative testimonials created for this portfolio demo."
      />

      <Reveal className="relative mt-14">
        <div className="overflow-hidden px-1 py-6">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className="w-full shrink-0 px-1 sm:px-4" aria-hidden={i !== active}>
                <TiltCard max={6} className="mx-auto max-w-3xl p-8 sm:p-12">
                  <Quote className="depth-1 size-10 text-primary" />
                  <p className="depth-1 mt-6 text-lg leading-relaxed text-foreground/90 sm:text-2xl">
                    “{t.quote}”
                  </p>
                  <div className="depth-2 mt-8 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="grid size-12 place-items-center rounded-full bg-gradient-neon font-display text-sm font-black text-primary-foreground">
                        {t.name.charAt(0)}
                      </span>
                      <div>
                        <p className="font-display text-sm font-bold uppercase">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex justify-end gap-0.5 text-primary">
                        {Array.from({ length: 5 }).map((_, k) => (
                          <Star key={k} className="size-4 fill-current" />
                        ))}
                      </div>
                      <p className="mt-1 font-display text-sm font-bold text-primary">{t.result}</p>
                    </div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous story"
            className="grid size-11 place-items-center rounded-full border border-border text-foreground transition-all hover:border-primary hover:text-primary hover:shadow-neon"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show story ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-500",
                  i === active ? "w-8 bg-primary shadow-neon" : "w-2 bg-muted-foreground/40",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next story"
            className="grid size-11 place-items-center rounded-full border border-border text-foreground transition-all hover:border-primary hover:text-primary hover:shadow-neon"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </Reveal>
    </div>
  );
}

export function Coaches() {
  return (
    <section id="coaches" className="relative overflow-hidden py-24 sm:py-32">
      <div className="glow-orb absolute -right-52 top-10 size-[600px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The team"
          title={
            <>
              Meet our <span className="text-gradient-neon">coaches</span>
            </>
          }
          subtitle="Certified specialists who combine sports science with real-world experience — and who genuinely care about your progress."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COACHES.map((c, i) => (
            <Reveal key={c.name} delay={i * 120} className="h-full">
              <TiltCard max={8} className="flex h-full flex-col p-2">
                <div className="relative">
                  <img
                    src={c.image}
                    alt={`Portrait of ${c.name}, ${c.role}`}
                    width={c.imageWidth}
                    height={c.imageHeight}
                    loading="lazy"
                    className="aspect-[4/5] w-full rounded-[1.25rem] object-cover"
                  />
                  <div className="depth-2 glass absolute bottom-4 left-4 right-4 rounded-2xl p-4">
                    <p className="font-display text-base font-black uppercase">{c.name}</p>
                    <p className="mt-0.5 text-xs font-semibold text-primary">{c.role}</p>
                  </div>
                </div>
                <div className="depth-1 flex-1 px-4 pb-5 pt-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Specialty · {c.specialty}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {c.credentials.map((cred) => (
                      <li key={cred} className="flex items-center gap-2 text-sm text-foreground/90">
                        <BadgeCheck className="size-4 shrink-0 text-primary" />
                        {cred}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Testimonials />
      </div>
    </section>
  );
}
