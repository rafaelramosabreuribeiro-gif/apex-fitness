import { useState, type FormEvent } from "react";
import { ArrowRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROGRAMS } from "@/lib/apex-data";
import {
  BMI_CATEGORIES,
  bmiScalePosition,
  calculateBmi,
  getBmiCategory,
  imperialToMetric,
  type BmiCategory,
} from "@/lib/bmi";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

type Units = "metric" | "imperial";

const fieldClass =
  "w-full rounded-2xl border border-input bg-background/60 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-primary focus:shadow-neon";
const labelClass =
  "mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground";

const CATEGORY_COLOR: Record<BmiCategory["id"], string> = {
  underweight: "bg-chart-3",
  healthy: "bg-primary",
  overweight: "bg-chart-4",
  obese: "bg-destructive",
};

// Share of the 15–40 gauge each category occupies
const SEGMENT_WIDTH: Record<BmiCategory["id"], string> = {
  underweight: "14%",
  healthy: "26%",
  overweight: "20%",
  obese: "40%",
};

function toNumber(v: FormDataEntryValue | null) {
  const n = Number(String(v ?? "").replace(",", "."));
  return Number.isFinite(n) ? n : NaN;
}

export function BmiCalculator() {
  const [units, setUnits] = useState<Units>("metric");
  const [error, setError] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    let heightCm: number;
    let weightKg: number;

    if (units === "metric") {
      heightCm = toNumber(f.get("heightCm"));
      weightKg = toNumber(f.get("weightKg"));
    } else {
      const feet = toNumber(f.get("feet"));
      const inches = toNumber(f.get("inches") || "0");
      const pounds = toNumber(f.get("pounds"));
      ({ heightCm, weightKg } = imperialToMetric(feet, inches, pounds));
    }

    if (!(heightCm >= 100 && heightCm <= 250)) {
      setBmi(null);
      setError(
        units === "metric"
          ? "Enter a height between 100 and 250 cm."
          : "Enter a height between 3 ft 4 in and 8 ft 2 in.",
      );
      return;
    }
    if (!(weightKg >= 30 && weightKg <= 300)) {
      setBmi(null);
      setError(
        units === "metric"
          ? "Enter a weight between 30 and 300 kg."
          : "Enter a weight between 66 and 660 lb.",
      );
      return;
    }
    setError("");
    setBmi(calculateBmi(heightCm, weightKg));
  }

  const category = bmi !== null ? getBmiCategory(bmi) : null;
  const program = category ? PROGRAMS.find((p) => p.id === category.programId) : null;

  return (
    <section id="bmi" className="relative overflow-hidden py-24 sm:py-32">
      <div className="glow-orb absolute -left-52 top-1/4 size-[560px] opacity-80" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="BMI Calculator"
          title={
            <>
              Know your <span className="text-gradient-neon">starting point</span>
            </>
          }
          subtitle="Check your Body Mass Index in seconds and get a program recommendation from our coaches."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal className="h-full">
            <TiltCard max={5} className="h-full p-6 sm:p-10">
              <form onSubmit={handleSubmit} noValidate className="depth-1 flex h-full flex-col">
                <div
                  role="radiogroup"
                  aria-label="Units"
                  className="grid grid-cols-2 gap-1 rounded-full border border-border bg-background/60 p-1"
                >
                  {(["metric", "imperial"] as const).map((u) => (
                    <button
                      key={u}
                      type="button"
                      role="radio"
                      aria-checked={units === u}
                      onClick={() => {
                        setUnits(u);
                        setError("");
                        setBmi(null);
                      }}
                      className={cn(
                        "rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-[0.18em] transition-all",
                        units === u
                          ? "bg-gradient-neon text-primary-foreground shadow-neon"
                          : "text-muted-foreground hover:text-primary",
                      )}
                    >
                      {u === "metric" ? "Metric (cm, kg)" : "Imperial (ft, lb)"}
                    </button>
                  ))}
                </div>

                <div className="mt-8 grid flex-1 content-start gap-5">
                  {units === "metric" ? (
                    <>
                      <div>
                        <label htmlFor="heightCm" className={labelClass}>
                          Height (cm)
                        </label>
                        <input id="heightCm" name="heightCm" inputMode="decimal" placeholder="e.g. 178" className={fieldClass} />
                      </div>
                      <div>
                        <label htmlFor="weightKg" className={labelClass}>
                          Weight (kg)
                        </label>
                        <input id="weightKg" name="weightKg" inputMode="decimal" placeholder="e.g. 75" className={fieldClass} />
                      </div>
                    </>
                  ) : (
                    <>
                      <fieldset>
                        <legend className={labelClass}>Height</legend>
                        <div className="grid grid-cols-2 gap-3">
                          <input name="feet" aria-label="Height in feet" inputMode="numeric" placeholder="ft (e.g. 5)" className={fieldClass} />
                          <input name="inches" aria-label="Height in inches" inputMode="numeric" placeholder="in (e.g. 10)" className={fieldClass} />
                        </div>
                      </fieldset>
                      <div>
                        <label htmlFor="pounds" className={labelClass}>
                          Weight (lb)
                        </label>
                        <input id="pounds" name="pounds" inputMode="decimal" placeholder="e.g. 165" className={fieldClass} />
                      </div>
                    </>
                  )}
                  {error && (
                    <p role="alert" className="text-sm text-destructive">
                      {error}
                    </p>
                  )}
                </div>

                <Button type="submit" variant="neon" size="xl" className="mt-8 w-full">
                  <Calculator /> Calculate BMI
                </Button>
              </form>
            </TiltCard>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <TiltCard max={5} className="flex h-full flex-col p-6 sm:p-10" aria-live="polite">
              <p className="depth-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Your result
              </p>

              {bmi !== null && category ? (
                <div className="depth-1 mt-4 flex flex-1 flex-col">
                  <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
                    <span className="font-display text-7xl font-black leading-none text-glow">
                      {bmi.toFixed(1)}
                    </span>
                    <span
                      className={cn(
                        "mb-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground",
                        CATEGORY_COLOR[category.id],
                      )}
                    >
                      {category.label}
                    </span>
                  </div>
                  <p className="mt-5 text-base leading-relaxed text-foreground/90">
                    {category.message}
                  </p>

                  <div className="mt-8">
                    <div className="relative flex h-3 overflow-hidden rounded-full">
                      {BMI_CATEGORIES.map((c) => (
                        <span
                          key={c.id}
                          className={cn(CATEGORY_COLOR[c.id], c.id !== category.id && "opacity-35")}
                          style={{ width: SEGMENT_WIDTH[c.id] }}
                        />
                      ))}
                    </div>
                    <div className="relative h-4">
                      <span
                        className="absolute top-0 size-0 -translate-x-1/2 border-x-[7px] border-b-[9px] border-x-transparent border-b-foreground transition-all duration-700"
                        style={{ left: `${bmiScalePosition(bmi)}%` }}
                        aria-hidden
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      <span>15</span>
                      <span>18.5</span>
                      <span>25</span>
                      <span>30</span>
                      <span>40</span>
                    </div>
                  </div>

                  {program && (
                    <div className="mt-auto pt-8">
                      <div className="glass flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                            Recommended program
                          </p>
                          <p className="mt-1 font-display text-sm font-bold uppercase">{program.title}</p>
                        </div>
                        <Button asChild variant="neon" size="pill">
                          <a href="#contact">
                            Start Free Trial <ArrowRight />
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="depth-1 mt-4 flex flex-1 flex-col">
                  <p className="text-base text-muted-foreground">
                    Enter your height and weight, then tap “Calculate BMI” to see where you stand.
                  </p>
                  <ul className="mt-8 grid gap-3">
                    {BMI_CATEGORIES.map((c) => (
                      <li key={c.id} className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm">
                        <span className="flex items-center gap-3 font-semibold">
                          <span className={cn("size-2.5 rounded-full", CATEGORY_COLOR[c.id])} />
                          {c.label}
                        </span>
                        <span className="text-muted-foreground">{c.range}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="depth-1 mt-6 text-xs leading-relaxed text-muted-foreground">
                BMI is a general screening tool for adults and doesn't account for muscle mass.
                It is not medical advice.
              </p>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
