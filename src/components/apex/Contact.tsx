import { useState, type FormEvent } from "react";
import { MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { PLANS, buildProposalMessage, whatsappLink } from "@/lib/apex-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

const GOALS = [
  "Fat loss",
  "Muscle gain",
  "Strength & performance",
  "Conditioning & mobility",
  "Overall health",
];

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[\d\s()+-]{7,20}$/, "Enter a valid phone number, including country code"),
  goal: z.string().min(1, "Choose a goal"),
  plan: z.string().min(1, "Choose a plan"),
  message: z.string().max(500).optional(),
});

type FieldName = keyof z.infer<typeof schema>;

const fieldClass =
  "w-full rounded-2xl border border-input bg-background/60 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-primary focus:shadow-neon";
const labelClass =
  "mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground";

export function Contact({
  selectedPlan,
  onPlanChange,
}: {
  selectedPlan: string;
  onPlanChange: (v: string) => void;
}) {
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: form.get("name") ?? "",
      phone: form.get("phone") ?? "",
      goal: form.get("goal") ?? "",
      plan: form.get("plan") ?? "",
      message: form.get("message") || undefined,
    });
    if (!parsed.success) {
      const errs: Partial<Record<FieldName, string>> = {};
      parsed.error.issues.forEach((i) => {
        errs[i.path[0] as FieldName] = i.message;
      });
      setErrors(errs);
      toast.error("Please check the highlighted fields.");
      return;
    }
    setErrors({});
    toast.success("You're all set! Opening WhatsApp…");
    window.open(whatsappLink(buildProposalMessage(parsed.data)), "_blank", "noopener,noreferrer");
    e.currentTarget.reset();
    onPlanChange("");
  }

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div className="bg-grid absolute inset-0 opacity-50" />
      <div className="glow-orb absolute -right-40 bottom-0 size-[560px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Free trial"
            title={
              <>
                Ready to start <span className="text-gradient-neon">your journey?</span>
              </>
            }
            subtitle="Fill out the form and a coach will reach out within 24 hours to schedule your free trial. Prefer to chat right away? Message us on WhatsApp."
          />
          <Reveal delay={150} className="mt-9">
            <Button asChild variant="whatsapp" size="xl">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle /> Chat on WhatsApp
              </a>
            </Button>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <TiltCard max={5} className="p-6 sm:p-10">
            <form onSubmit={handleSubmit} noValidate className="depth-1 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className={labelClass}>
                  Name
                </label>
                <input id="name" name="name" autoComplete="name" placeholder="Your full name" className={fieldClass} />
                {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone" className={labelClass}>
                  Phone / WhatsApp
                </label>
                <input
                  id="phone"
                  name="phone"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+1 (555) 010-2030"
                  className={fieldClass}
                />
                {errors.phone && <p className="mt-1.5 text-xs text-destructive">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="goal" className={labelClass}>
                  Goal
                </label>
                <select id="goal" name="goal" defaultValue="" className={fieldClass}>
                  <option value="" disabled>
                    Select
                  </option>
                  {GOALS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                {errors.goal && <p className="mt-1.5 text-xs text-destructive">{errors.goal}</p>}
              </div>
              <div>
                <label htmlFor="plan" className={labelClass}>
                  Plan
                </label>
                <select
                  id="plan"
                  name="plan"
                  value={selectedPlan}
                  onChange={(e) => onPlanChange(e.target.value)}
                  className={fieldClass}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {PLANS.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} (${p.price}
                      {p.period})
                    </option>
                  ))}
                  <option value="Not sure yet">Not sure yet</option>
                </select>
                {errors.plan && <p className="mt-1.5 text-xs text-destructive">{errors.plan}</p>}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className={labelClass}>
                  Message (optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Tell us a bit about your routine and training history"
                  className={fieldClass}
                />
              </div>
              <Button type="submit" variant="neon" size="xl" className="mt-2 sm:col-span-2">
                Claim My Free Trial <Send />
              </Button>
            </form>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
