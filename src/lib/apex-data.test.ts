import { describe, expect, it } from "vitest";
import { PLANS, buildProposalMessage, whatsappLink } from "./apex-data";

describe("APEX membership plans", () => {
  const price = (name: string) => PLANS.find((p) => p.name === name);

  it("Basic costs $29 per month", () => {
    expect(price("Basic")?.price).toBe("29");
    expect(price("Basic")?.period).toBe("/mo");
  });

  it("Pro costs $59 per month", () => {
    expect(price("Pro")?.price).toBe("59");
    expect(price("Pro")?.period).toBe("/mo");
  });

  it("VIP Performance costs $99 per month", () => {
    expect(price("VIP Performance")?.price).toBe("99");
    expect(price("VIP Performance")?.period).toBe("/mo");
  });
});

describe("WhatsApp request", () => {
  it("includes the chosen plan in the pre-filled message", () => {
    const msg = buildProposalMessage({
      name: "Ana",
      phone: "+1 555 010 2030",
      goal: "Muscle gain",
      plan: "VIP Performance",
    });
    expect(whatsappLink(msg)).toContain(encodeURIComponent("Plan of interest: VIP Performance"));
  });
});
