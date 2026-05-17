import { GEMINI_MODEL, SYSTEM_INSTRUCTION, GENERATION_CONFIG, VALID_HREFS } from "./agent-config";
import type { ConversationTurn, IntentResponse } from "./types";

export async function getAnswer(
  query: string,
  history: ConversationTurn[] = []
): Promise<IntentResponse> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing NEXT_PUBLIC_GEMINI_API_KEY");

  const historyPrefix =
    history.length > 0
      ? `[Conversation history]\n${history
          .map((t) => `${t.role === "user" ? "Visitor" : "Assistant"}: ${t.text}`)
          .join("\n")}\n\n[Current question] `
      : "";

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        contents: [{ parts: [{ text: historyPrefix + query }] }],
        generationConfig: {
          ...GENERATION_CONFIG,
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              answer: { type: "ARRAY", items: { type: "STRING" } },
              actions: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    label: { type: "STRING" },
                    href: { type: "STRING", enum: [...VALID_HREFS] },
                  },
                  required: ["label", "href"],
                },
              },
            },
            required: ["answer", "actions"],
          },
        },
      }),
    }
  );

  if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);

  const data = await res.json() as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini returned an empty response");

  return JSON.parse(text) as IntentResponse;
}
