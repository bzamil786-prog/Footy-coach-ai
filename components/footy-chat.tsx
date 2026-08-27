"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import { ArrowUp, Bot, Mic, Square, User } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@/components/ui/input-group"

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
}

const storageKey = "footycoach-gemini-api-key"
const invalidKeyMessage = "Invalid or expired Gemini API key"

export function FootyChat() {
  const [input, setInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [voiceError, setVoiceError] = useState("")
  const [chatError, setChatError] = useState("")
  const [isThinking, setIsThinking] = useState(false)
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

  async function submit(event: FormEvent) {
    event.preventDefault()
    const text = input.trim()
    if (!text || isThinking) return

    const apiKey = sessionStorage.getItem(storageKey)?.trim()
    if (!apiKey) {
      setChatError("Connect your Gemini API key in Settings to use FootyCoach AI.")
      return
    }

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", text }
    const conversation = [...messages, userMessage]
    setMessages(conversation)
    setInput("")
    setChatError("")
    setIsThinking(true)

    try {
      const response = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey,
          messages: conversation.map(({ role, text: content }) => ({ role, content })),
        }),
      })
      const responseBody = await response.text()
      let result: { message?: string; error?: string } = {}
      try {
        result = JSON.parse(responseBody) as typeof result
      } catch {
      }

      if (!response.ok || !result.message) {
        throw new Error(response.status === 401 ? invalidKeyMessage : result.error || "The coach could not answer right now.")
      }

      setMessages(current => [...current, { id: crypto.randomUUID(), role: "assistant", text: result.message! }])
    } catch (error) {
      setChatError(error instanceof Error && error.message === invalidKeyMessage ? invalidKeyMessage : "I couldn’t reach FootyCoach right now. Please try again in a moment.")
    } finally {
      setIsThinking(false)
    }
  }

  return (
    <section id="ask" className="bg-primary py-20 text-primary-foreground sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <div className="flex flex-col gap-5 lg:sticky lg:top-28"><p className="font-mono text-xs font-bold uppercase tracking-widest text-accent">Your turn</p><h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">Ask the question behind the question.</h2><p className="text-pretty leading-relaxed text-primary-foreground/70">Rules, formations, competitions, player roles—if it happens on a football pitch, FootyCoach can make it click.</p></div>
        <div className="overflow-hidden rounded-[2rem] bg-background text-foreground shadow-2xl">
          <div className="flex items-center gap-3 border-b border-border px-5 py-4"><span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground"><Bot aria-hidden="true" /></span><div><p className="font-bold">FootyCoach</p><p className="text-xs text-muted-foreground">Ready when you are</p></div></div>
          <div role="log" aria-live="polite" aria-busy={isThinking} className="flex min-h-[24rem] max-h-[34rem] flex-col gap-5 overflow-y-auto p-5 sm:p-7">
            {messages.length === 0 && <div className="my-auto flex flex-col items-center gap-3 text-center"><span className="flex size-14 items-center justify-center rounded-full bg-secondary"><Bot className="text-primary" aria-hidden="true" /></span><h3 className="text-xl font-bold">What are we figuring out?</h3><p className="max-w-sm text-sm leading-relaxed text-muted-foreground">Try “Explain offside like I&apos;m five” or ask about something happening in the match right now.</p></div>}
            {messages.map(message => <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}><span className={`flex size-8 shrink-0 items-center justify-center rounded-full ${message.role === "user" ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>{message.role === "user" ? <User aria-hidden="true" /> : <Bot aria-hidden="true" />}</span><div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === "user" ? "rounded-tr-sm bg-accent text-accent-foreground" : "rounded-tl-sm bg-secondary"}`}><p className="whitespace-pre-wrap">{message.text}</p></div></div>)}
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
