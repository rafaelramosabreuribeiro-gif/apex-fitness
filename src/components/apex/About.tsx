import { useEffect, useState } from "react";
import { Award, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import aboutImg from "@/assets/about-lucas.jpg";
import { QUALIFICATIONS, TESTIMONIALS } from "@/lib/apex-data";
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
      className="mt-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <SectionHeading
        eyebrow="Resultados"
        title={
          <>
            Quem treina com a APEX <span className="text-gradient-neon">evolui</span>
          </>
        }
        subtitle="Depoimentos ilustrativos para demonstração deste projeto de portfólio."
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
            aria-label="Depoimento anterior"
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
                aria-label={`Ver depoimento ${i + 1}`}
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
            aria-label="Próximo depoimento"
            className="grid size-11 place-items-center rounded-full border border-border text-foreground transition-all hover:border-primary hover:text-primary hover:shadow-neon"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </Reveal>
    </div>
  );
}

export function About() {
  return (
    <section id="sobre" className="relative overflow-hidden py-24 sm:py-32">
      <div className="glow-orb absolute -left-52 top-1/4 size-[600px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
            <TiltCard max={8} className="overflow-hidden p-2">
              <img
                src={aboutImg}
                alt="Retrato de Lucas Silva, personal trainer"
                width={912}
                height={1104}
                loading="lazy"
                className="aspect-[4/5] w-full rounded-[1.25rem] object-cover"
              />
              <div className="depth-2 glass absolute bottom-6 left-6 right-6 flex items-center gap-4 rounded-2xl p-4">
                <span className="grid size-12 place-items-center rounded-xl bg-gradient-neon text-primary-foreground">
                  <Award className="size-6" />
                </span>
                <div>
                  <p className="font-display text-sm font-bold uppercase">+10 anos de prática</p>
                  <p className="text-xs text-muted-foreground">Mais de 500 alunos transformados</p>
                </div>
              </div>
            </TiltCard>
            <div className="absolute -right-4 -top-4 -z-10 size-32 rounded-3xl border border-primary/40 animate-float" />
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Sobre"
              title={
                <>
                  Lucas Silva, <span className="text-gradient-neon">o treinador por trás da APEX</span>
                </>
              }
            />
            <Reveal delay={120}>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Comecei no esporte aos 15 anos e transformei a minha própria disciplina em
                profissão. Depois de uma década atendendo atletas amadores, executivos e pessoas
                que nunca tinham pisado numa academia, criei a APEX: um método direto, baseado em
                ciência e adaptado à vida real.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Meu compromisso é simples: você vai saber exatamente o que fazer em cada treino,
                cada refeição e cada semana — e vai ter alguém acompanhando de perto.
              </p>
            </Reveal>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {QUALIFICATIONS.map((q, i) => (
                <Reveal as="li" key={q} delay={200 + i * 80}>
                  <div className="glass neon-edge flex h-full items-center gap-3 rounded-2xl p-4 text-sm font-semibold">
                    <span className="size-2 shrink-0 rounded-full bg-primary shadow-neon" />
                    {q}
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        <Testimonials />
      </div>
    </section>
  );
}
