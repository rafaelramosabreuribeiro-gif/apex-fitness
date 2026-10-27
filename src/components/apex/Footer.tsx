import { Instagram, Mail, MapPin, MessageCircle, Youtube } from "lucide-react";
import { NAV_LINKS, whatsappLink } from "@/lib/apex-data";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="overflow-hidden border-b border-border py-5">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-2xl font-black uppercase text-foreground/10 sm:text-4xl">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-10" aria-hidden={k === 1}>
              <span>Disciplina</span>
              <span className="text-primary/40">✦</span>
              <span>Constância</span>
              <span className="text-primary/40">✦</span>
              <span>Resultado</span>
              <span className="text-primary/40">✦</span>
              <span>APEX</span>
              <span className="text-primary/40">✦</span>
              <span>Sem achismo</span>
              <span className="text-primary/40">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-neon font-display font-black text-primary-foreground shadow-neon">
              A
            </span>
            <div className="leading-none">
              <p className="font-display text-lg font-black tracking-[0.2em]">APEX</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Lucas Silva Personal
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Personal trainer e consultoria fitness com acompanhamento 100% personalizado, online e
            presencial.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Instagram, label: "Instagram", href: "#" },
              { Icon: Youtube, label: "YouTube", href: "#" },
              { Icon: MessageCircle, label: "WhatsApp", href: whatsappLink() },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="grid size-11 place-items-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary hover:text-primary hover:shadow-neon"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Navegação
          </p>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Contato
          </p>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <MessageCircle className="size-4 text-primary" /> (11) 99999-9999
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-primary" /> contato@apexpersonal.com.br
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" /> São Paulo · SP
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-center text-xs text-muted-foreground sm:flex-row sm:px-8 sm:text-left">
          <p>© {new Date().getFullYear()} APEX · Lucas Silva Personal. Todos os direitos reservados.</p>
          <p className="rounded-full border border-primary/30 bg-accent/40 px-3 py-1 font-semibold text-primary">
            Projeto demonstrativo de portfólio
          </p>
        </div>
      </div>
    </footer>
  );
}
