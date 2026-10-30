import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-trainer.jpg";
import { Button } from "@/components/ui/button";
import { STATS } from "@/lib/apex-data";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";

function CountUp({ to, prefix, suffix }: { to: number; prefix: string; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1600;
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {prefix}
      {n.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax glow following the mouse for 3D depth
  function handleMove(e: PointerEvent<HTMLElement>) {
    const el = sectionRef.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", `${((e.clientX - r.left) / r.width - 0.5) * 2}`);
    el.style.setProperty("--py", `${((e.clientY - r.top) / r.height - 0.5) * 2}`);
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      onPointerMove={handleMove}
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28"
    >
      {/* Background image + depth layers */}
      <div className="absolute inset-0 -z-20">
        <img
          src={heroImg}
          alt="APEX coach training in a gym lit with neon green lights"
          width={1600}
          height={1008}
          className="h-full w-full object-cover object-[70%_center] opacity-90 transition-transform duration-700 ease-out"
          style={{
            transform:
              "scale(1.08) translate3d(calc(var(--px, 0) * -14px), calc(var(--py, 0) * -10px), 0)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/40" />
      </div>
      <div className="bg-grid absolute inset-0 -z-10" />
      <div
        className="glow-orb absolute -left-40 top-10 -z-10 size-[620px] animate-pulse-glow"
        style={{ transform: "translate3d(calc(var(--px, 0) * 30px), calc(var(--py, 0) * 30px), 0)" }}
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-accent/40 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur sm:text-[11px] sm:tracking-[0.25em]">
              <span className="size-1.5 shrink-0 rounded-full bg-primary animate-pulse-glow" />
              APEX Fitness — High Performance Training
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 text-[2.5rem] font-black uppercase leading-[0.98] sm:text-6xl lg:text-7xl">
              Transform your body and{" "}
              <span className="text-gradient-neon text-glow">mind</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              Customized workouts, high-performance coaching, and a result-driven environment
              built to break your limits.
            </p>
          </Reveal>
          <Reveal delay={300} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="neon" size="xl">
              <a href="#programs">
                Explore Programs <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="#plans">Join Now</a>
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-2 pb-10 sm:gap-4 lg:max-w-4xl lg:pb-14">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={400 + i * 90}>
              <TiltCard className="h-full px-3 py-4 sm:px-6 sm:py-6" max={14}>
                <div className="depth-1 font-display text-2xl font-black text-primary sm:text-4xl">
                  <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="depth-1 mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:text-xs sm:tracking-[0.18em]">
                  {s.label}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
