import { IntentResponse, Action } from "./intents";
import { getScriptedResponse } from "./router";

export async function getAnswer(query: string): Promise<IntentResponse> {
  const mode = process.env.NAVIGATOR_MODE ?? "scripted";
  if (mode === "llm") return getLLMAnswer(query);
  return getScriptedResponse(query);
}

async function getLLMAnswer(query: string): Promise<IntentResponse> {
  // Activate by setting NAVIGATOR_MODE=llm + ANTHROPIC_API_KEY in .env.local
  const Anthropic = (await import("@anthropic-ai/sdk")).default;
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const systemPrompt = `You are a portfolio assistant for Théotime Colinet, Gen AI Engineer.
Respond to visitor questions about his work, skills, and projects.
Always return a JSON object with:
  - "answer": string[] (3-5 short sentences, one per element)
  - "actions": Array<{label: string, href: string}> (2-4 navigation actions)

Allowed hrefs: #focus, #projects, #approach, #contact, or absolute URLs for github/linkedin.

Bio context:
- Specialises in agentic systems, LLM infrastructure, evaluation & observability
- Builds systems that reason, use tools, recover from failure, and can be evaluated
- Stack: Python, TypeScript, Next.js, Anthropic Claude, custom eval harnesses
- Paris-based, open to remote roles
- Email: theotime.colinet@gmail.com
- GitHub: https://github.com/TheotimeC
- LinkedIn: https://www.linkedin.com/in/theotime-colinet/

Tone: clear, confident, technical but accessible. No hype, no buzzwords.`;

  const message = await client.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 512,
    system: [
      {
        type: "text" as const,
        text: systemPrompt,
        cache_control: { type: "ephemeral" as const },
      },
    ],
    messages: [{ role: "user" as const, content: query }],
  });

  try {
    const raw = message.content[0].type === "text" ? message.content[0].text : "{}";
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON");
    const parsed = JSON.parse(jsonMatch[0]) as { answer: string[]; actions: Action[] };
    return parsed;
  } catch {
    return getScriptedResponse(query);
  }
}
