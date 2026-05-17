import { IntentResponse, Action, ConversationTurn } from "./types";
import { GEMINI_MODEL, SYSTEM_INSTRUCTION, GENERATION_CONFIG, RESPONSE_SCHEMA } from "./agent-config";

// NAVIGATOR_MODE env var selects the backend:
//   "gemini"    — Google ADK + Gemini (requires GOOGLE_API_KEY) — default
//   "scripted"  — keyword router, no API key needed
//   "llm"       — Anthropic Claude (requires ANTHROPIC_API_KEY, legacy)
export async function getAnswer(
  query: string,
  history: ConversationTurn[] = []
): Promise<IntentResponse> {
  return getGeminiAnswer(query, history);
}

async function getGeminiAnswer(
  query: string,
  history: ConversationTurn[]
): Promise<IntentResponse> {
  const { LlmAgent, Runner, InMemorySessionService, isFinalResponse } =
    await import("@google/adk");

  const agent = new LlmAgent({
    name: "portfolio_navigator",
    description: "Portfolio assistant for Théotime Colinet",
    model: GEMINI_MODEL,
    instruction: SYSTEM_INSTRUCTION,
    generateContentConfig: GENERATION_CONFIG,
    outputSchema: RESPONSE_SCHEMA,
  });

  const appName = "portfolio-navigator";
  const userId = "visitor";
  const sessionId = `s-${Date.now()}`;

  const sessionService = new InMemorySessionService();
  const runner = new Runner({ appName, agent, sessionService });
  await sessionService.createSession({ appName, userId, sessionId });

  // Inject conversation history as context prefix so the agent can follow up
  const historyPrefix =
    history.length > 0
      ? `[Conversation history]\n${history
          .map((t) => `${t.role === "user" ? "Visitor" : "Assistant"}: ${t.text}`)
          .join("\n")}\n\n[Current question] `
      : "";

  let raw = "";
  for await (const event of runner.runAsync({
    userId,
    sessionId,
    newMessage: { parts: [{ text: historyPrefix + query }] },
  })) {
    if (isFinalResponse(event) && event.content?.parts) {
      raw = event.content.parts
        .map((p: { text?: string }) => p.text ?? "")
        .join("");
    }
  }

  if (!raw) throw new Error("Gemini returned an empty response");
  return JSON.parse(raw) as { answer: string[]; actions: Action[] };
}
