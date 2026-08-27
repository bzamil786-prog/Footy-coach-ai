"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import { ArrowUp, Bot, Mic, Square, User } from "lucide-react"
import { DemoMode } from "@/components/demo-mode"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@/components/ui/input-group"
import { currentInformationFallback, isLikelyCurrentQuestion, noGeminiMessage, offlineFootballFallback } from "@/lib/football-fallback"
import { matchFootballQuestion } from "@/lib/football-matcher"
import { isPlayerFollowUp, matchPlayerQuestion, playerAnswer } from "@/lib/player-matcher"

type SpeechRecognitionResultEvent = Event & {
  results: {
    [index: number]: { [index: number]: { transcript: string } }
    length: number
  }
}

type SpeechRecognitionErrorEvent = Event & { error: string }

type SpeechRecognitionInstance = EventTarget & {
  lang: string
  continuous: boolean
  interimResults: boolean
  start: () => void
  stop: () => void
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  text: string
  source?: "Built-in knowledge" | "Gemini AI" | "Demo Mode"
}

const storageKey = "footycoach-gemini-api-key"
const invalidKeyMessage = "Invalid or expired Gemini API key"
const greetingAnswer = "Hello! I’m FootyCoach. Ask me about football rules, positions, formations, tactics, players, clubs, competitions, or history."

export function FootyChat() {
  const [input, setInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [voiceError, setVoiceError] = useState("")
  const [chatError, setChatError] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [demoEnabled, setDemoEnabled] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)

  useEffect(() => () => recognitionRef.current?.stop(), [])

  function toggleVoiceInput() {
    if (isListening) {
      recognitionRef.current?.stop()
      return
    }

    const speechWindow = window as typeof window & {
      SpeechRecognition?: SpeechRecognitionConstructor
      webkitSpeechRecognition?: SpeechRecognitionConstructor
    }
    const Recognition = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition

    if (!Recognition) {
      setVoiceError("Voice input isn’t supported in this browser. Try Chrome, Edge, or Safari.")
      return
    }

    setVoiceError("")
    const recognition = new Recognition()
    recognition.lang = navigator.language || "en-GB"
    recognition.continuous = false
    recognition.interimResults = false
    recognition.onresult = event => {
      const transcript = event.results[0]?.[0]?.transcript?.trim()
      if (transcript) setInput(current => [current.trim(), transcript].filter(Boolean).join(" "))
    }
    recognition.onerror = event => {
      if (event.error !== "aborted") {
        setVoiceError(event.error === "not-allowed" ? "Microphone access was denied. Allow it in your browser settings and try again." : "I couldn’t hear that clearly. Please try again.")
      }
      setIsListening(false)
    }
    recognition.onend = () => setIsListening(false)
    recognitionRef.current = recognition
    setIsListening(true)
    recognition.start()
  }

  async function askQuestion(question: string, demo = false) {
    const text = question.trim()
    if (!text || isThinking) return

    const localMatch = matchFootballQuestion(text)
    const playerMatch = matchPlayerQuestion(text) || (isPlayerFollowUp(text)
      ? [...messages].reverse().map(message => matchPlayerQuestion(message.text)).find(Boolean) || null
      : null)
    const isGreeting = /^(hello|hi|hey|good morning|good afternoon|good evening)\b/i.test(text)
    const apiKey = sessionStorage.getItem(storageKey)?.trim()
    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", text }
    const conversation = [...messages, userMessage]
    setMessages(conversation)
    setInput("")
    setChatError("")
    setIsThinking(true)

    if (demo || isGreeting || (playerMatch && !isLikelyCurrentQuestion(text)) || (localMatch?.confidence === "high" && !isLikelyCurrentQuestion(text))) {
      const answer = isGreeting ? greetingAnswer : `${playerMatch ? playerAnswer(playerMatch) : localMatch?.entry.answer || offlineFootballFallback}${demo ? "\n\nTry asking me another football question." : ""}`
      const source = demo ? "Demo Mode" : "Built-in knowledge"
      if (demo) await new Promise(resolve => window.setTimeout(resolve, 350))
      setMessages(current => [...current, { id: crypto.randomUUID(), role: "assistant", text: answer, source }])
      setIsThinking(false)
      return
    }

    if (!apiKey) {
      const answer = isLikelyCurrentQuestion(text) ? currentInformationFallback : playerMatch ? playerAnswer(playerMatch) : localMatch?.entry.answer || offlineFootballFallback
      setMessages(current => [...current, { id: crypto.randomUUID(), role: "assistant", text: `${noGeminiMessage}\n\n${answer}`, source: "Built-in knowledge" }])
      setIsThinking(false)
      return
    }

    try {
      const response = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey,
          topicHint: playerMatch ? `PLAYER: ${playerMatch.profile.knownAs}` : localMatch ? `${localMatch.entry.category}: ${localMatch.entry.id}` : undefined,
          messages: conversation.map(({ role, text: content }) => ({ role, content })),
        }),
      })
      const responseBody = await response.text()
      let result: { message?: string; error?: string } = {}
      try {
        result = JSON.parse(responseBody) as typeof result
      } catch {
      }

      if (!response.ok || !result.message) throw new Error(response.status === 401 ? invalidKeyMessage : result.error || "The coach could not answer right now.")
      setMessages(current => [...current, { id: crypto.randomUUID(), role: "assistant", text: result.message!, source: "Gemini AI" }])
    } catch (error) {
      const answer = isLikelyCurrentQuestion(text) ? currentInformationFallback : playerMatch ? playerAnswer(playerMatch) : localMatch?.entry.answer || offlineFootballFallback
      const prefix = error instanceof Error && error.message === invalidKeyMessage ? noGeminiMessage : "Gemini is unavailable, so I’m using FootyCoach’s built-in football knowledge."
      setMessages(current => [...current, { id: crypto.randomUUID(), role: "assistant", text: `${prefix}\n\n${answer}`, source: "Built-in knowledge" }])
    } finally {
      setIsThinking(false)
    }
  }

  async function submit(event: FormEvent) {
    event.preventDefault()
    const text = input.trim()
    await askQuestion(text)
  }

  return (
    <section id="ask" className="bg-primary py-20 text-primary-foreground sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <div className="flex flex-col gap-5 lg:sticky lg:top-28"><p className="font-mono text-xs font-bold uppercase tracking-widest text-accent">Your turn</p><h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">Ask the question behind the question.</h2><p className="text-pretty leading-relaxed text-primary-foreground/70">Rules, formations, competitions, player roles—if it happens on a football pitch, FootyCoach can make it click.</p></div>
        <div className="overflow-hidden rounded-[2rem] bg-background text-foreground shadow-2xl">
          <div className="flex items-center gap-3 border-b border-border px-5 py-4"><span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground"><Bot aria-hidden="true" /></span><div><p className="font-bold">FootyCoach</p><p className="text-xs text-muted-foreground">Ready when you are</p></div></div>
          <DemoMode enabled={demoEnabled} onToggle={() => setDemoEnabled(current => !current)} onQuestion={question => void askQuestion(question, true)} />
          <div role="log" aria-live="polite" aria-busy={isThinking} className="flex min-h-[24rem] max-h-[34rem] flex-col gap-5 overflow-y-auto p-5 sm:p-7">
            {messages.length === 0 && <div className="my-auto flex flex-col items-center gap-3 text-center"><span className="flex size-14 items-center justify-center rounded-full bg-secondary"><Bot className="text-primary" aria-hidden="true" /></span><h3 className="text-xl font-bold">What are we figuring out?</h3><p className="max-w-sm text-sm leading-relaxed text-muted-foreground">Try “Explain offside like I&apos;m five” or ask about something happening in the match right now.</p></div>}
            {messages.map(message => <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}><span className={`flex size-8 shrink-0 items-center justify-center rounded-full ${message.role === "user" ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>{message.role === "user" ? <User aria-hidden="true" /> : <Bot aria-hidden="true" />}</span><div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === "user" ? "rounded-tr-sm bg-accent text-accent-foreground" : "rounded-tl-sm bg-secondary"}`}><p className="whitespace-pre-wrap">{message.text}</p>{message.role === "assistant" && message.source && <span className="mt-2 block text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">{message.source}</span>}</div></div>)}
            {isThinking && <div className="flex gap-3"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Bot aria-hidden="true" /></span><div className="rounded-2xl rounded-tl-sm bg-secondary px-4 py-3 text-sm text-muted-foreground">FootyCoach is thinking…</div></div>}
          </div>
          <form onSubmit={submit} className="border-t border-border p-4 sm:p-5">
            <InputGroup className="min-h-24 rounded-2xl bg-secondary">
              <InputGroupTextarea value={input} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); event.currentTarget.form?.requestSubmit() } }} placeholder={isListening ? "Listening…" : "Ask anything about football…"} aria-label="Your football question" />
              <InputGroupAddon align="block-end" className="justify-between">
                <div className="flex items-center gap-2">
                  <InputGroupButton type="button" size="icon-sm" variant={isListening ? "secondary" : "ghost"} onClick={toggleVoiceInput} aria-label={isListening ? "Stop voice input" : "Start voice input"} aria-pressed={isListening}>
                    {isListening ? <Square /> : <Mic />}
                  </InputGroupButton>
                  <span className="text-xs text-muted-foreground" aria-live="polite">{isListening ? "Listening… tap to stop" : "Tap to speak"}</span>
                </div>
                <InputGroupButton type="submit" size="icon-sm" variant="default" disabled={!input.trim() || isThinking} aria-label="Send question"><ArrowUp /></InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            {voiceError && <p role="alert" className="px-2 pt-2 text-sm text-destructive">{voiceError}</p>}
            {chatError && <p role="alert" className="px-2 pt-2 text-sm text-destructive">{chatError}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
