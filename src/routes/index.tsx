import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/apex/Header";
import { Hero } from "@/components/apex/Hero";
import { Programs } from "@/components/apex/Programs";
import { Plans } from "@/components/apex/Plans";
import { BmiCalculator } from "@/components/apex/BmiCalculator";
import { Coaches } from "@/components/apex/Coaches";
import { Contact } from "@/components/apex/Contact";
import { Footer } from "@/components/apex/Footer";

const TITLE = "APEX Fitness & Performance — High Performance Training & Coaching";
const DESCRIPTION =
  "Customized workouts, certified coaches and membership plans from $29/mo. Personal training, strength, fat loss and mobility programs plus a free BMI calculator.";

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
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Programs />
        <Plans onSelectPlan={handleSelectPlan} />
        <BmiCalculator />
        <Coaches />
        <Contact selectedPlan={selectedPlan} onPlanChange={setSelectedPlan} />
      </main>
      <Footer />
    </div>
  );
}
