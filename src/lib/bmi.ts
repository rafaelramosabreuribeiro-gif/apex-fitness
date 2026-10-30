// Body Mass Index helpers (WHO adult categories). Pure functions, no UI.

export type BmiCategoryId = "underweight" | "healthy" | "overweight" | "obese";

export type BmiCategory = {
  id: BmiCategoryId;
  label: string;
  range: string;
  message: string;
  /** Program id from PROGRAMS recommended for this result */
  programId: string;
};

export const BMI_CATEGORIES: BmiCategory[] = [
  {
    id: "underweight",
    label: "Underweight",
    range: "Below 18.5",
    message:
      "You're below the healthy range. A strength-focused plan with the right nutrition will help you build quality mass.",
    programId: "hypertrophy",
  },
  {
    id: "healthy",
    label: "Healthy weight",
    range: "18.5 – 24.9",
    message:
      "Great — you're in the healthy range. Now let's level up your strength, mobility and performance.",
    programId: "cross",
  },
  {
    id: "overweight",
    label: "Overweight",
    range: "25 – 29.9",
    message:
      "You're slightly above the healthy range. A structured fat-loss and conditioning plan will get you there.",
    programId: "fat-loss",
  },
  {
    id: "obese",
    label: "Obesity",
    range: "30 and above",
    message:
      "You're above the healthy range. Guided one-on-one coaching is the safest, most sustainable way to start.",
    programId: "personal",
  },
];

export function calculateBmi(heightCm: number, weightKg: number) {
  const m = heightCm / 100;
  return Math.round((weightKg / (m * m)) * 10) / 10;
}

export function imperialToMetric(feet: number, inches: number, pounds: number) {
  return {
    heightCm: (feet * 12 + inches) * 2.54,
    weightKg: pounds * 0.45359237,
  };
}

export function getBmiCategory(bmi: number): BmiCategory {
  const [under, healthy, over, obese] = BMI_CATEGORIES as [
    BmiCategory,
    BmiCategory,
    BmiCategory,
    BmiCategory,
  ];
  if (bmi < 18.5) return under;
  if (bmi < 25) return healthy;
  if (bmi < 30) return over;
  return obese;
}

/** Position (0–100%) of a BMI value on a 15–40 scale, for the result gauge. */
export function bmiScalePosition(bmi: number) {
  return Math.min(100, Math.max(0, ((bmi - 15) / 25) * 100));
}
