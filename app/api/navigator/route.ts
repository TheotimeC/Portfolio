import { NextRequest, NextResponse } from "next/server";
import { getAnswer } from "@/lib/navigator/llm";
import type { ConversationTurn } from "@/lib/navigator/types";

export async function POST(req: NextRequest) {
  try {
    const { query, history } = (await req.json()) as {
      query: string;
      history?: ConversationTurn[];
    };
    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }
    const result = await getAnswer(query.slice(0, 500), history ?? []);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[navigator]", message);
    return NextResponse.json(
      { error: process.env.NODE_ENV === "development" ? message : "Internal error" },
      { status: 500 }
    );
  }
}
