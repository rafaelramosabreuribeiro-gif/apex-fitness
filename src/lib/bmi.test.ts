import { describe, expect, it } from "vitest";
import { calculateBmi, getBmiCategory, imperialToMetric } from "./bmi";

describe("BMI calculator", () => {
  it("180 cm and 81 kg gives a BMI of 25", () => {
    expect(calculateBmi(180, 81)).toBe(25);
  });

  it("5 ft 9 in and 160 lb gives a BMI of 23.6", () => {
    const { heightCm, weightKg } = imperialToMetric(5, 9, 160);
    expect(calculateBmi(heightCm, weightKg)).toBe(23.6);
  });

  it("below 18.5 is Underweight", () => {
    expect(getBmiCategory(18.4).label).toBe("Underweight");
  });

  it("18.5 up to 24.9 is Healthy weight", () => {
    expect(getBmiCategory(18.5).label).toBe("Healthy weight");
    expect(getBmiCategory(24.9).label).toBe("Healthy weight");
  });

  it("25 up to 29.9 is Overweight", () => {
    expect(getBmiCategory(25).label).toBe("Overweight");
    expect(getBmiCategory(29.9).label).toBe("Overweight");
  });

  it("30 and above is Obesity", () => {
    expect(getBmiCategory(30).label).toBe("Obesity");
  });
});
