import { toGeminiContents } from "../../lib/chat-history"

const systemPrompt =
  "You are FootyCoach AI, an expert educational assistant focused on association football/soccer.\n\nYou understand football rules, tactics, formations, positions, players, clubs, leagues, competitions, managers, stadiums, football history, famous matches, terminology, skills, training concepts and general football culture.\n\nExplain answers clearly and naturally.\n\nFor beginners, use simple explanations.\nFor tactical questions, give deeper explanations when useful.\n\nYou may answer normal greetings and conversational messages, but your main expertise is football.\n\nNever invent current scores, current transfers, injuries or breaking news if you are unsure.\n\nIf a question requires information newer than your reliable knowledge, clearly say that the information may have changed.\n\nKeep answers useful and usually concise unless the user asks for detail."

type ChatMessage = {
  role: "user" | "assistant"
  content: string
  source?: "Built-in knowledge" | "Gemini AI" | "Demo Mode"
}

export default async function handler(request: Request) {
  if (request.method !== "POST") {
    return Response.json({ error: "Only POST requests are supported." }, { status: 405 })
  }

  try {
    const body = (await request.json()) as { apiKey?: string; messages?: ChatMessage[]; topicHint?: string }
    const apiKey = body.apiKey?.trim()
    const messages = body.messages?.filter(message =>
      (message.role === "user" || message.role === "assistant") && typeof message.content === "string",
    )

    if (!apiKey) {
      return Response.json({ error: "Connect your Gemini API key in Settings to use FootyCoach AI." }, { status: 400 })
    }

    if (!messages?.length) {
      return Response.json({ error: "Please ask a football question." }, { status: 400 })
    }

    const contents = toGeminiContents(messages.slice(-20))
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: contents.map((message, index) => ({
          ...message,
          parts: [{ text: body.topicHint && index === contents.length - 1 ? `Detected topic: ${body.topicHint}\n\n${message.parts[0].text}` : message.parts[0].text }],
        })),
      }),
    })

    const responseBody = await response.text()
    let result: {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
      error?: { status?: string; message?: string }
    } = {}

    try {
      result = JSON.parse(responseBody) as typeof result
    } catch {
    }

    const upstreamError = result.error?.message?.toLowerCase() || ""
    if (response.status === 401 || response.status === 403 || upstreamError.includes("api key")) {
      return Response.json({ error: "Invalid or expired Gemini API key" }, { status: 401 })
    }

    if (!response.ok) {
      return Response.json({ error: "The football coach is unavailable right now." }, { status: 502 })
    }

    const message = result.candidates?.[0]?.content?.parts?.map(part => part.text || "").join("").trim()

    if (!message) {
      return Response.json({ error: "FootyCoach did not return an answer." }, { status: 502 })
    }

    return Response.json({ message })
  } catch {
    return Response.json({ error: "The football coach is unavailable right now." }, { status: 500 })
  }
}