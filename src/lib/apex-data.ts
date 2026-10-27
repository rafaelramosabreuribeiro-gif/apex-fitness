// Demo content for the APEX landing page (portfolio project).
// WhatsApp number is a demonstration placeholder.
export const WHATSAPP_NUMBER = "5511999999999";

export function whatsappLink(message = "Olá Lucas! Quero começar minha transformação com a APEX.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export type ProposalRequest = {
  nome: string;
  whatsapp: string;
  objetivo: string;
  plano: string;
  mensagem?: string;
};

export function buildProposalMessage(data: ProposalRequest) {
  const lines = [
    "Olá Lucas! Gostaria de solicitar uma proposta APEX.",
    "",
    `Nome: ${data.nome}`,
    `WhatsApp: ${data.whatsapp}`,
    `Objetivo: ${data.objetivo}`,
    `Plano de interesse: ${data.plano}`,
  ];
  if (data.mensagem?.trim()) lines.push(`Mensagem: ${data.mensagem.trim()}`);
  return lines.join("\n");
}

export const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Metodologia", href: "#metodologia" },
  { label: "Planos", href: "#planos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
] as const;

export const STATS = [
  { value: 500, prefix: "+", suffix: "", label: "Alunos" },
  { value: 98, prefix: "", suffix: "%", label: "de Satisfação" },
  { value: 10, prefix: "+", suffix: " anos", label: "de Experiência" },
  { value: 24, prefix: "", suffix: "/7", label: "Suporte no App" },
] as const;

export const METHOD_STEPS = [
  {
    n: "01",
    title: "Avaliação Individualizada",
    text: "Anamnese completa, composição corporal, mobilidade e histórico. Seu ponto de partida mapeado com precisão.",
  },
  {
    n: "02",
    title: "Planos Nutricionais Adaptados",
    text: "Estratégia alimentar flexível, alinhada à sua rotina e ao seu objetivo — sem dietas impossíveis.",
  },
  {
    n: "03",
    title: "Acompanhamento Semanal via App",
    text: "Check-ins semanais, métricas de evolução e ajustes de carga direto no aplicativo.",
  },
  {
    n: "04",
    title: "Correção de Postura e Execução",
    text: "Análise de vídeos e feedback técnico para treinar com segurança e máxima eficiência.",
  },
] as const;

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
    id: "online",
    name: "Consultoria Online",
    tagline: "Treine de onde estiver",
    price: "197",
    period: "/mês",
    features: [
      "Treino personalizado via app",
      "Suporte semanal por chat",
      "Ajustes mensais do programa",
      "Guia nutricional",
    ],
  },
  {
    id: "vip",
    name: "Plano Presencial / VIP",
    tagline: "Atendimento lado a lado",
    price: "597",
    period: "/mês",
    featured: true,
    badge: "Mais procurado",
    features: [
      "Atendimento individual na academia",
      "Consultoria online inclusa",
      "Correção de execução em tempo real",
      "Plano nutricional adaptado",
      "Prioridade na agenda",
    ],
  },
  {
    id: "semestral",
    name: "Semestral de Transformação",
    tagline: "6 meses para virar a chave",
    price: "167",
    period: "/mês · 6x",
    badge: "Melhor custo",
    features: [
      "Acompanhamento completo por 6 meses",
      "Plano de hábitos e rotina",
      "Reavaliações bimestrais",
      "Nutrição guiada e periodizada",
      "Grupo exclusivo de alunos",
    ],
  },
];

export const TESTIMONIALS = [
  {
    name: "Mariana C.",
    role: "Consultoria Online",
    result: "-12 kg em 5 meses",
    quote:
      "Nunca tinha conseguido manter constância. O acompanhamento semanal mudou tudo — hoje treinar é parte da minha rotina.",
  },
  {
    name: "Rafael M.",
    role: "Plano VIP",
    result: "+6 kg de massa magra",
    quote:
      "A correção de execução fez uma diferença absurda. Saí da estagnação e voltei a evoluir carga toda semana.",
  },
  {
    name: "Juliana P.",
    role: "Semestral",
    result: "-9% de gordura corporal",
    quote:
      "Mais do que o corpo, ganhei disciplina. O plano de hábitos foi o que eu precisava para não desistir.",
  },
  {
    name: "Thiago R.",
    role: "Consultoria Online",
    result: "Fim das dores lombares",
    quote:
      "Treino em casa e no hotel quando viajo. O Lucas adapta tudo e as dores nas costas sumiram.",
  },
] as const;

export const QUALIFICATIONS = [
  "CREF ativo · Bacharel em Educação Física",
  "Pós-graduação em Fisiologia do Exercício",
  "Especialista em Hipertrofia e Emagrecimento",
  "Certificação em Nutrição Esportiva",
] as const;
