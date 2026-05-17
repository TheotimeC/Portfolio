export type Action = { label: string; href: string };

export type Intent =
  | "summary"
  | "focus-areas"
  | "differentiator"
  | "tech-stack"
  | "challenge-idea"
  | "contact"
  | "fallback";

export type IntentResponse = {
  answer: string[];
  actions: Action[];
};

export const INTENTS: Record<Intent, IntentResponse> = {
  summary: {
    answer: [
      "Théotime is a Gen AI Engineer specialising in agentic systems and LLM infrastructure.",
      "He builds systems that reason, use tools, recover from failure, and can be evaluated end-to-end.",
      "His work spans multi-agent orchestration, prompt-cached LLM pipelines, and observability tooling.",
      "The portfolio is itself a running example: a live agent-runtime preview, a scripted intent router with an LLM adapter hook, and placeholder labs for future projects.",
    ],
    actions: [
      { label: "What I build", href: "#focus" },
      { label: "Future labs", href: "#projects" },
      { label: "Engineering approach", href: "#approach" },
      { label: "Contact", href: "#contact" },
    ],
  },

  "focus-areas": {
    answer: [
      "Three tightly-coupled focus areas:",
      "1 · Agentic systems — task decomposition, tool routing, memory, and failure recovery.",
      "2 · LLM infrastructure — streaming, prompt caching, structured output, and cost discipline.",
      "3 · Evaluation & observability — trace replay, golden sets, drift detection.",
      "These aren't separate specialties — they're the same system seen from three angles.",
    ],
    actions: [
      { label: "See focus areas", href: "#focus" },
      { label: "Future labs", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
  },

  differentiator: {
    answer: [
      "Most AI engineers can wrap an API and call it a product.",
      "What's different here: thinking in systems — state, tools, memory, eval, and recovery are first-class.",
      "Every project ships with observability from day one, not added after a failure.",
      "The goal is AI that's useful, testable, and maintainable — not impressive in a demo.",
    ],
    actions: [
      { label: "Engineering approach", href: "#approach" },
      { label: "What I build", href: "#focus" },
      { label: "Contact", href: "#contact" },
    ],
  },

  "tech-stack": {
    answer: [
      "Primary stack: Python for agent and infra work, TypeScript/Next.js for interfaces.",
      "LLM layer: Anthropic (Claude) as the primary provider — full API, streaming, prompt caching.",
      "Orchestration: custom planners, LangGraph-aware design, tool-use patterns.",
      "Eval: custom harnesses, structured traces, regression sets.",
      "This site: Next.js 15, Tailwind v4, Framer Motion, a scripted intent router with a one-env-var LLM swap.",
    ],
    actions: [
      { label: "What I build", href: "#focus" },
      { label: "Future labs", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
  },

  "challenge-idea": {
    answer: [
      "Good. Let's stress-test it.",
      "The most common failure mode I see in AI projects: the demo works, the system doesn't.",
      "Before we discuss what the agent will do — what happens when a tool fails mid-run?",
      "How does the system tell you something went wrong? How does it recover?",
      "If the answer is 'it retries once and throws an error' — that's where to start building.",
    ],
    actions: [
      { label: "Discuss with Théotime", href: "#contact" },
      { label: "Engineering approach", href: "#approach" },
    ],
  },

  contact: {
    answer: [
      "The best way to reach Théotime is by email: theotime.colinet@gmail.com",
      "He's open to roles, collaborations, and hard problems in agentic AI.",
      "GitHub and LinkedIn are linked in the contact section below.",
    ],
    actions: [
      { label: "Go to contact", href: "#contact" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/theotime-colinet/" },
      { label: "GitHub", href: "https://github.com/TheotimeC" },
    ],
  },

  fallback: {
    answer: [
      "That query doesn't match a scripted answer — but here's what's likely useful:",
    ],
    actions: [
      { label: "What I build", href: "#focus" },
      { label: "Future labs", href: "#projects" },
      { label: "Engineering approach", href: "#approach" },
      { label: "Contact", href: "#contact" },
    ],
  },
};
