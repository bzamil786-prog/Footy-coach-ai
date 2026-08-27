"use client"

import { useState } from "react"
import { Play, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const demoQuestions = [
  "What is the offside rule?",
  "Explain a 4-3-3 formation.",
  "What does a false 9 do?",
  "Why do teams use a high press?",
  "Who is Lionel Messi?",
  "What is the Champions League?",
]

type DemoModeProps = {
  enabled: boolean
  onToggle: () => void
  onQuestion: (question: string) => void
}

export function DemoMode({ enabled, onToggle, onQuestion }: DemoModeProps) {
  const [running, setRunning] = useState(false)

  function runDemo() {
    setRunning(true)
    onQuestion("What does a false 9 do?")
    window.setTimeout(() => setRunning(false), 350)
  }

  return (
    <div className="border-b border-border bg-secondary/70 px-5 py-4 sm:px-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" aria-hidden="true" />
          <span className="text-sm font-bold">Demo Mode</span>
        </div>
        <Button type="button" variant={enabled ? "default" : "outline"} size="sm" onClick={onToggle} aria-pressed={enabled}>
          {enabled ? "AI Fest Demo Mode" : "Turn on"}
        </Button>
      </div>
      {enabled && (
        <div className="mt-4 flex flex-col gap-3">
          <div className="rounded-xl border border-border bg-background p-3 text-xs text-muted-foreground">
            <p className="font-bold text-foreground">How FootyCoach Works</p>
            <p className="mt-2">1. Understands your question</p>
            <p>2. Detects football topics</p>
            <p>3. Checks built-in knowledge</p>
            <p>4. Uses Gemini for complex questions</p>
            <p>5. Keeps conversation context</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {demoQuestions.map(question => (
              <button key={question} type="button" className="rounded-xl border border-border bg-background px-3 py-2 text-left text-xs font-semibold transition-colors hover:border-primary hover:text-primary" onClick={() => onQuestion(question)}>
                {question}
              </button>
            ))}
          </div>
          <Button type="button" variant="secondary" size="sm" className="self-start" onClick={runDemo} disabled={running}>
            <Play />
            Run FootyCoach Demo
          </Button>
        </div>
      )}
    </div>
  )
}
