export type Action = { label: string; href: string };
export type ConversationTurn = { role: "user" | "ai"; text: string };
export type IntentResponse = { answer: string[]; actions: Action[] };
