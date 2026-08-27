"use client"

import { useState } from "react"
import { Settings } from "lucide-react"
import { buttonVariants, Button } from "@/components/ui/button"
import { GeminiSettings } from "@/components/gemini-settings"

export function SiteHeader() {
  const [geminiOpen, setGeminiOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#" className="flex items-center gap-3 font-bold tracking-tight" aria-label="FootyCoach AI home">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground" aria-hidden="true">FC</span>
          <span>FootyCoach AI</span>
        </a>
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#examples" className="hover:text-foreground">Examples</a>
          <a href="#about" className="hover:text-foreground">About</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setGeminiOpen(true)}
            aria-label="Open Gemini settings"
            title="Gemini settings"
          >
            <Settings />
          </Button>
          <GeminiSettings open={geminiOpen} onClose={() => setGeminiOpen(false)} />
          <a href="#ask" className={buttonVariants({ className: "rounded-full" })}>Start chatting</a>
        </div>
      </div>
    </header>
  )
}
