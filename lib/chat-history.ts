export type ConversationTurn = {
  role: "user" | "assistant" | "model"
  content: string
  source?: "Built-in knowledge" | "Gemini AI" | "Demo Mode"
}

export type GeminiTurn = {
  role: "user" | "model"
  parts: [{ text: string }]
}

export function toGeminiContents(messages: ConversationTurn[], currentQuestion?: string): GeminiTurn[] {
  const turns: ConversationTurn[] = []
  for (const message of messages) {
    if (message.role !== "user" && message.source !== "Gemini AI") continue
    const content = message.content.trim()
    if (!content) continue
    const role = message.role === "user" ? "user" : "model"
    const previous = turns[turns.length - 1]
    if (previous?.role === role) {
      if (role === "model") previous.content = `${previous.content}\n\n${content}`
      continue
    }
    turns.push({ role, content })
  }

  const question = currentQuestion?.trim()
  if (question && turns[turns.length - 1]?.role !== "user") {
    turns.push({ role: "user", content: question })
  }

  return turns.slice(-20).map(turn => ({
    role: turn.role === "assistant" ? "model" : turn.role,
    parts: [{ text: turn.content }],
  })) as GeminiTurn[]
}
