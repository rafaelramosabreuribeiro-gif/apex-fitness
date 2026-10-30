// Demo content for the APEX Fitness & Performance landing page (portfolio project).
// WhatsApp number, email and social links are demonstration placeholders.
import aboutLucas from "@/assets/about-lucas.jpg";
import coachMaya from "@/assets/coach-maya.jpg";
import coachDaniel from "@/assets/coach-daniel.jpg";

export const BRAND = {
  name: "APEX",
  tagline: "Fitness & Performance",
  full: "APEX Fitness & Performance",
} as const;

export const WHATSAPP_NUMBER = "15550102030";
export const WHATSAPP_DISPLAY = "+1 (555) 010-2030";
export const CONTACT_EMAIL = "hello@apexfitness.com";

export function whatsappLink(message = "Hi APEX! I'd like to start my free trial.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export type ProposalRequest = {
  name: string;
  phone: string;
  goal: string;
  plan: string;
  message?: string | undefined;
};

export function buildProposalMessage(data: ProposalRequest) {
  const lines = [
    "Hi APEX! I'd like to start my free trial.",
    "",
    `Name: ${data.name}`,
    `Phone / WhatsApp: ${data.phone}`,
    `Goal: ${data.goal}`,
    `Plan of interest: ${data.plan}`,
  ];
  if (data.message?.trim()) lines.push(`Message: ${data.message.trim()}`);
  return lines.join("\n");
}

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Programs", href: "#programs" },
  { label: "Plans", href: "#plans" },
  { label: "BMI Calculator", href: "#bmi" },
  { label: "Contact", href: "#contact" },
] as const;

export const STATS = [
  { value: 1500, prefix: "", suffix: "+", label: "Active Members" },
  { value: 15, prefix: "", suffix: "+", label: "Certified Coaches" },
  { value: 98, prefix: "", suffix: "%", label: "Goal Success Rate" },
] as const;

export type Program = {
  id: string;
  title: string;
  text: string;
  goals: string[];
  intensity: string;
  /** 1 (low) to 3 (high), drives the intensity meter */
  level: 1 | 2 | 3;
};

export const PROGRAMS: Program[] = [
  {
    id: "personal",
    title: "Personal Training",
    text: "One-on-one sessions with a dedicated coach. Every rep, set and progression is built around your body, schedule and goals.",
    goals: ["Fully tailored", "Technique mastery", "Accountability"],
    intensity: "Adaptive",
    level: 2,
  },
  {
    id: "hypertrophy",
    title: "Hypertrophy & Strength",
    text: "Periodized lifting blocks focused on progressive overload to build lean muscle and raise your numbers on the big lifts.",
    goals: ["Muscle gain", "Max strength", "Body recomposition"],
    intensity: "High",
    level: 3,
  },
  {
    id: "fat-loss",
    title: "Fat Loss & Conditioning",
    text: "Metabolic circuits, HIIT and smart nutrition targets that burn fat while protecting the muscle you've worked for.",
    goals: ["Fat loss", "Endurance", "Heart health"],
    intensity: "High",
    level: 3,
  },
  {
    id: "cross",
    title: "Cross Training & Mobility",
    text: "Functional movement, kettlebells and mobility flows to move better, stay injury-free and perform in everyday life.",
    goals: ["Mobility", "Athleticism", "Injury prevention"],
    intensity: "Moderate",
    level: 2,
  },
];

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  features: string[];
  featured?: boolean;
  badge?: string;
};

export const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Build the habit",
    price: "29",
    period: "/mo",
    features: [
      "Full gym floor access",
      "Personalized workout plan in the app",
      "Monthly progress check-in",
      "Member community challenges",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Train with a coach",
    price: "59",
    period: "/mo",
    featured: true,
    badge: "Most popular",
    features: [
      "Everything in Basic",
      "Unlimited group classes",
      "Weekly coach check-ins",
      "Nutrition guide & macro targets",
      "Monthly body composition scan",
    ],
  },
  {
    id: "vip",
    name: "VIP Performance",
    tagline: "Elite, all-in coaching",
    price: "99",
    period: "/mo",
    badge: "Best results",
    features: [
      "Everything in Pro",
      "4 one-on-one sessions per month",
      "Custom nutrition plan",
      "Form & technique video reviews",
      "Priority booking & 24/7 coach chat",
    ],
  },
];

export const COACHES = [
  {
    name: "Lucas Silva",
    role: "Head Coach & Founder",
    specialty: "Personal Training",
    image: aboutLucas,
    imageWidth: 912,
    imageHeight: 1104,
    credentials: ["NSCA-CSCS Certified", "B.S. in Exercise Science", "10+ years coaching"],
  },
  {
    name: "Maya Torres",
    role: "Strength & Hypertrophy Coach",
    specialty: "Hypertrophy & Strength",
    image: coachMaya,
    imageWidth: 896,
    imageHeight: 1120,
    credentials: ["NASM Certified Personal Trainer", "USA Weightlifting Level 1", "Former competitive powerlifter"],
  },
  {
    name: "Daniel Brooks",
    role: "Conditioning & Mobility Coach",
    specialty: "Cross Training & Mobility",
    image: coachDaniel,
    imageWidth: 896,
    imageHeight: 1120,
    credentials: ["ACE Certified Personal Trainer", "FRC Mobility Specialist", "Precision Nutrition Level 1"],
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Pro Member",
    result: "-26 lb in 5 months",
    quote:
      "I'd never been able to stay consistent. The weekly check-ins changed everything — training is now just part of who I am.",
  },
  {
    name: "James R.",
    role: "VIP Performance",
    result: "+13 lb of lean muscle",
    quote:
      "The form reviews made a massive difference. I broke through a two-year plateau and I'm adding weight to the bar every week.",
  },
  {
    name: "Olivia K.",
    role: "Pro Member",
    result: "-9% body fat",
    quote:
      "More than a new body, I built real discipline. The coaches kept me accountable on the days I wanted to quit.",
  },
  {
    name: "Marcus T.",
    role: "VIP Performance",
    result: "Lower back pain gone",
    quote:
      "I travel constantly, and my coach adapts every session to hotel gyms. My back pain is gone and I feel stronger than ever.",
  },
] as const;
