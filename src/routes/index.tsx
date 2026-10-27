import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/apex/Header";
import { Hero } from "@/components/apex/Hero";
import { Methodology } from "@/components/apex/Methodology";
import { Plans } from "@/components/apex/Plans";
import { About } from "@/components/apex/About";
import { Contact } from "@/components/apex/Contact";
import { Footer } from "@/components/apex/Footer";

const TITLE = "APEX · Lucas Silva Personal — Treino e consultoria fitness sob medida";
const DESCRIPTION =
  "Personal trainer e consultoria fitness com acompanhamento 100% personalizado, treinos eficientes e nutrição guiada para resultados reais. Online e presencial.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [selectedPlan, setSelectedPlan] = useState("");

  function handleSelectPlan(name: string) {
    setSelectedPlan(name);
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Methodology />
        <Plans onSelectPlan={handleSelectPlan} />
        <About />
        <Contact selectedPlan={selectedPlan} onPlanChange={setSelectedPlan} />
      </main>
      <Footer />
    </div>
  );
}
