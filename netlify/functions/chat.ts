const systemPrompt =
  "You are FootyCoach AI, a friendly football/soccer expert. Answer questions about football players, teams, leagues, competitions, rules, tactics, formations, positions, history and training. Explain answers clearly and simply. Stay focused on football. If you do not know a current fact, say that you are unsure rather than inventing information."

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

export default async function handler(request: Request) {
  if (request.method !== "POST") {
    return Response.json({ error: "Only POST requests are supported." }, { status: 405 })
  }

  try {
    const body = (await request.json()) as { apiKey?: string; messages?: ChatMessage[] }
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

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: messages.slice(-20).map(message => ({
          role: message.role === "assistant" ? "model" : "user",
          parts: [{ text: message.content }],
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