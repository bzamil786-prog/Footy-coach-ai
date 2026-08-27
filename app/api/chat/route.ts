import { convertToModelMessages, createUIMessageStreamResponse, streamText, toUIMessageStream, type UIMessage } from "ai"

export const maxDuration = 30

export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } = await request.json()
  const result = streamText({
    model: "openai/gpt-5-mini",
    instructions: "You are FootyCoach AI, a warm and patient football (soccer) teacher. Explain rules, terms, positions, tactics, and competitions in plain language. Assume the learner may be brand new, never condescend, define jargon immediately, and use short practical match examples. Keep most answers concise but offer to go deeper when useful. Clarify whether the user means association football if their wording could refer to another sport.",
    messages: await convertToModelMessages(messages),
  })
  return createUIMessageStreamResponse({ stream: toUIMessageStream({ stream: result.stream }) })
}
