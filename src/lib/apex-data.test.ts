import { describe, expect, it } from "vitest";
import { PLANS, buildProposalMessage, whatsappLink } from "./apex-data";

describe("APEX plans", () => {
  it("Consultoria Online costs R$ 197 per month", () => {
    const online = PLANS.find((p) => p.name === "Consultoria Online");
    expect(online?.price).toBe("197");
    expect(online?.period).toBe("/mês");
  });
});

describe("WhatsApp proposal", () => {
  it("includes the chosen plan in the pre-filled message", () => {
    const msg = buildProposalMessage({
      nome: "Ana",
      whatsapp: "11988887777",
      objetivo: "Hipertrofia",
      plano: "Plano Presencial / VIP",
    });
    expect(whatsappLink(msg)).toContain(encodeURIComponent("Plano de interesse: Plano Presencial / VIP"));
  });
});
