"use client"

import { useEffect, useState } from "react"
import { Check, Eye, EyeOff, KeyRound, Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const storageKey = "footycoach-gemini-api-key"

export function GeminiSettings() {
  const [open, setOpen] = useState(false)
  const [apiKey, setApiKey] = useState("")
  const [showKey, setShowKey] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  function closeModal() {
    setOpen(false)
  }

  useEffect(() => {
    const storedKey = sessionStorage.getItem(storageKey)
    if (storedKey) {
      setApiKey(storedKey)
      setIsConnected(true)
    }
  }, [])

  useEffect(() => {
    if (!open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeModal()
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open])

  function saveKey() {
    const trimmedKey = apiKey.trim()
    if (!trimmedKey) {
      sessionStorage.removeItem(storageKey)
      setApiKey("")
      setIsConnected(false)
      return
    }

    sessionStorage.setItem(storageKey, trimmedKey)
    setApiKey(trimmedKey)
    setIsConnected(true)
    closeModal()
  }

  function removeKey() {
    sessionStorage.removeItem(storageKey)
    setApiKey("")
    setIsConnected(false)
  }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label="Open Gemini settings"
        title="Gemini settings"
      >
        <Settings />
      </Button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-foreground/40 p-4 backdrop-blur-sm sm:p-6"
          role="presentation"
          onPointerDown={event => {
            if (event.target === event.currentTarget) closeModal()
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="gemini-settings-title"
            className="relative max-h-[85dvh] w-[min(92vw,560px)] overflow-y-auto rounded-3xl bg-background text-foreground shadow-2xl"
            onPointerDown={event => event.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 bg-background p-6 sm:p-8">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">Settings</p>
                <h2 id="gemini-settings-title" className="mt-2 text-2xl font-bold">Connect Gemini</h2>
              </div>
              <Button type="button" variant="ghost" size="icon" onClick={closeModal} aria-label="Close Gemini settings" className="shrink-0">
                <X />
              </Button>
            </div>
            <div className="flex flex-col gap-4 px-6 pb-6 sm:px-8 sm:pb-8">
              <label htmlFor="gemini-api-key" className="text-sm font-semibold">Gemini API Key</label>
              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="gemini-api-key"
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={event => {
                    setApiKey(event.target.value)
                    setIsConnected(false)
                  }}
                  placeholder="Paste your Gemini API key"
                  autoComplete="off"
                  className="h-10 pl-10 pr-11"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setShowKey(current => !current)}
                  aria-label={showKey ? "Hide Gemini API key" : "Show Gemini API key"}
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                >
                  {showKey ? <EyeOff /> : <Eye />}
                </Button>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">Your key stays in this browser session and is sent only when you ask FootyCoach a question.</p>
              {isConnected && <p className="flex items-center gap-2 text-sm font-semibold text-primary" role="status"><Check className="size-4" aria-hidden="true" />Gemini connected</p>}
              <div className="mt-2 flex flex-wrap justify-between gap-3">
                <Button type="button" variant="destructive" onClick={removeKey} disabled={!apiKey}>Remove key</Button>
                <Button type="button" onClick={saveKey}>Save</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
