export const PERSON = {
  name: "Théotime Colinet",
  title: "AI Engineer",
  subtitle: "Agentic Systems & LLM Infrastructure",
  tagline:
    "Building agentic AI systems that are observable, controllable, and useful beyond the demo.",
  supporting:
    "I build systems that reason, use tools, stream their progress, recover from failure, and can be evaluated, not chat wrappers around an API.",
  location: "Strasbourg · France",
  email: "theotime.colinet@gmail.com",
  github: "https://github.com/TheotimeC",
  linkedin: "https://www.linkedin.com/in/theotime-colinet/",
};

export type FocusArea = {
  index: string;
  title: string;
  description: string;
  icon: string;
  bullets: string[];
};

export const FOCUS_AREAS: FocusArea[] = [
  {
    index: "01",
    title: "Agentic systems",
    description:
      "Planners, tool routers, memory, and retries that actually finish the job.",
    icon: "Workflow",
    bullets: ["task decomposition", "tool choice", "failure recovery"],
  },
  {
    index: "02",
    title: "LLM infrastructure",
    description:
      "Streaming, caching, evaluation harnesses, and cost discipline.",
    icon: "Cpu",
    bullets: ["prompt caching", "structured output", "cost & latency budgets"],
  },
  {
    index: "03",
    title: "Evaluation & observability",
    description: "Traces, scores, regressions caught before users see them.",
    icon: "Activity",
    bullets: ["trace replay", "golden sets", "drift detection"],
  },
];

export type ProjectStatus = "In progress" | "Design phase" | "Prototype";
export type StatusVariant = "warn" | "info" | "ok";

export type Project = {
  index: string;
  title: string;
  description: string;
  willDemonstrate: string;
  status: ProjectStatus;
  statusVariant: StatusVariant;
};

export const PROJECTS: Project[] = [
  {
    index: "001",
    title: "Synthetic Society Simulator",
    description:
      "A multi-agent simulation of agent populations exchanging goals, memory, and reputation.",
    willDemonstrate:
      "Emergent coordination, observable inter-agent traces, evaluable group behavior.",
    status: "In progress",
    statusVariant: "warn",
  },
  {
    index: "002",
    title: "Agent Debugging Lab",
    description:
      "A trace inspector for failed agent runs — replay, diff, and rewind tool calls and memory writes.",
    willDemonstrate:
      "Time-travel debugging for LLM agents, regression catching, root-cause analysis on production runs.",
    status: "Design phase",
    statusVariant: "info",
  },
  {
    index: "003",
    title: "AI Security Playground",
    description:
      "An interactive lab for prompt injection, tool-confused-deputy, and guardrail bypass scenarios.",
    willDemonstrate:
      "Attack surface for tool-using agents, mitigations, eval harness for safety.",
    status: "Prototype",
    statusVariant: "ok",
  },
];

export const APPROACH_PRINCIPLES = [
  {
    index: "01",
    heading: "Build beyond the demo.",
    body: "A demo is the start of the work, not the end.",
  },
  {
    index: "02",
    heading: "Systems, not prompts.",
    body: "State, tools, memory, and recovery are first-class.",
  },
  {
    index: "03",
    heading: "Observability is design.",
    body: "If you can't see it, you can't fix it.",
  },
  {
    index: "04",
    heading: "Useful, testable, maintainable.",
    body: "Vibe testing is fun, but not reliable. Ship things that survive contact with users.",
  },
];
