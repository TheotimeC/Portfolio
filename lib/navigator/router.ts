import { INTENTS, Intent, IntentResponse } from "./intents";

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9 ]/g, " ");

const KEYWORD_MAP: Record<Intent, string[]> = {
  summary: [
    "summary", "summarize", "30 seconds", "portfolio", "explain", "overview",
    "who are you", "introduce", "about",
  ],
  "focus-areas": [
    "build", "work on", "ai systems", "speciali", "focus", "area", "do you do",
    "kind of",
  ],
  differentiator: [
    "different", "stand out", "unique", "special", "why you", "compared",
    "profile", "distinguish",
  ],
  "tech-stack": [
    "stack", "tech", "tools", "framework", "language", "technical", "python",
    "typescript", "anthropic", "claude",
  ],
  "challenge-idea": [
    "challenge", "critique", "feedback", "review my", "evaluate my",
    "stress test", "idea", "project idea",
  ],
  contact: [
    "contact", "reach", "email", "hire", "work together", "collaborate",
    "theotime", "connect",
  ],
  fallback: [],
};

export function resolveIntent(query: string): Intent {
  const q = normalize(query);
  for (const [intent, keywords] of Object.entries(KEYWORD_MAP) as [Intent, string[]][]) {
    if (intent === "fallback") continue;
    if (keywords.some((kw) => q.includes(normalize(kw)))) return intent;
  }
  return "fallback";
}

export function getScriptedResponse(query: string): IntentResponse {
  const intent = resolveIntent(query);
  return INTENTS[intent];
}
