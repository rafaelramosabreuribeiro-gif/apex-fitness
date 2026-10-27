import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/apex-data";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6",
          scrolled ? "glass" : "border border-transparent",
        )}
      >
        <a href="#inicio" className="group flex items-center gap-3" aria-label="APEX — início">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-neon font-display text-sm font-black text-primary-foreground shadow-neon transition-transform duration-300 group-hover:rotate-6">
            A
          </span>
          <span className="leading-none">
            <span className="block font-display text-base font-black tracking-[0.2em]">APEX</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Lucas Silva Personal
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent/50 hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="neon" size="pill" className="hidden sm:inline-flex">
            <a href="#contato">Começar agora</a>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "glass mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl transition-all duration-500 lg:hidden",
          open ? "max-h-[420px] opacity-100" : "pointer-events-none max-h-0 border-transparent opacity-0",
        )}
      >
        <nav className="flex flex-col p-4" aria-label="Menu mobile">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 font-display text-sm font-semibold uppercase tracking-wider text-foreground transition-colors hover:bg-accent/50 hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <Button asChild variant="neon" size="xl" className="mt-3">
            <a href="#contato" onClick={() => setOpen(false)}>
              Começar agora
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
