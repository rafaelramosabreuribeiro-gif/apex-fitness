import { useState, type FormEvent } from "react";
import { MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { PLANS, buildProposalMessage, whatsappLink } from "@/lib/apex-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

const OBJETIVOS = ["Emagrecimento", "Hipertrofia", "Condicionamento", "Saúde e qualidade de vida"];

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(80),
  whatsapp: z
    .string()
    .trim()
    .regex(/^[\d\s()+-]{10,20}$/, "Informe um WhatsApp válido com DDD"),
  objetivo: z.string().min(1, "Escolha um objetivo"),
  plano: z.string().min(1, "Escolha um plano"),
  mensagem: z.string().max(500).optional(),
});

const fieldClass =
  "w-full rounded-2xl border border-input bg-background/60 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-primary focus:shadow-neon";

export function Contact({
  selectedPlan,
  onPlanChange,
}: {
  selectedPlan: string;
  onPlanChange: (v: string) => void;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      nome: form.get("nome"),
      whatsapp: form.get("whatsapp"),
      objetivo: form.get("objetivo"),
      plano: form.get("plano"),
      mensagem: form.get("mensagem") || undefined,
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[String(i.path[0])] = i.message;
      });
      setErrors(errs);
      toast.error("Confira os campos destacados.");
      return;
    }
    setErrors({});
    toast.success("Proposta pronta! Abrindo o WhatsApp…");
    window.open(whatsappLink(buildProposalMessage(parsed.data)), "_blank", "noopener,noreferrer");
    e.currentTarget.reset();
  }

  return (
    <section id="contato" className="relative overflow-hidden py-24 sm:py-32">
      <div className="bg-grid absolute inset-0 opacity-50" />
      <div className="glow-orb absolute -right-40 bottom-0 size-[640px]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Avaliação gratuita"
            title={
              <>
                Pronto para <span className="text-gradient-neon">começar agora?</span>
              </>
            }
            subtitle="Preencha o formulário e receba uma proposta personalizada em até 24h. Prefere conversar direto? Chama no WhatsApp."
          />
          <Reveal delay={150} className="mt-9">
            <Button asChild variant="whatsapp" size="xl">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle /> Chamar no WhatsApp
              </a>
            </Button>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <TiltCard max={5} className="p-6 sm:p-10">
            <form onSubmit={handleSubmit} noValidate className="depth-1 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="nome" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Nome
                </label>
                <input id="nome" name="nome" placeholder="Seu nome completo" className={fieldClass} />
                {errors.nome && <p className="mt-1.5 text-xs text-destructive">{errors.nome}</p>}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="whatsapp" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  WhatsApp
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  inputMode="tel"
                  placeholder="(11) 99999-9999"
                  className={fieldClass}
                />
                {errors.whatsapp && (
                  <p className="mt-1.5 text-xs text-destructive">{errors.whatsapp}</p>
                )}
              </div>
              <div>
                <label htmlFor="objetivo" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Objetivo
                </label>
                <select id="objetivo" name="objetivo" defaultValue="" className={fieldClass}>
                  <option value="" disabled>
                    Selecione
                  </option>
                  {OBJETIVOS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                {errors.objetivo && (
                  <p className="mt-1.5 text-xs text-destructive">{errors.objetivo}</p>
                )}
              </div>
              <div>
                <label htmlFor="plano" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Plano
                </label>
                <select
                  id="plano"
                  name="plano"
                  value={selectedPlan}
                  onChange={(e) => onPlanChange(e.target.value)}
                  className={fieldClass}
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  {PLANS.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                  <option value="Ainda não sei">Ainda não sei</option>
                </select>
                {errors.plano && <p className="mt-1.5 text-xs text-destructive">{errors.plano}</p>}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="mensagem" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Mensagem (opcional)
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={3}
                  placeholder="Conte um pouco sobre sua rotina e histórico de treino"
                  className={fieldClass}
                />
              </div>
              <Button type="submit" variant="neon" size="xl" className="mt-2 sm:col-span-2">
                Solicitar proposta <Send />
              </Button>
            </form>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
