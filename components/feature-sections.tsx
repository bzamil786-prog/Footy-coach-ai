import { BookOpen, CircleHelp, Eye, MessageCircle, ShieldCheck, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const steps = [
  { icon: MessageCircle, title: "Ask a question", text: "Type it exactly how you&apos;d say it. No football vocabulary required." },
  { icon: Sparkles, title: "Get a clear answer", text: "We break it down with plain language, examples, and zero showing off." },
  { icon: Eye, title: "Learn as you watch", text: "Take your new knowledge straight back to the match and spot it in action." },
]

const examples = [
  { question: "Why is that offside?", answer: "The simple version: an attacker can&apos;t wait behind the defence for a pass. Timing matters." },
  { question: "What's a false nine?", answer: "A striker who drops into midfield, pulling defenders out and creating space for teammates." },
  { question: "How does the Champions League work?", answer: "Europe&apos;s top clubs compete through a league phase, then knockout rounds, to reach one final." },
]

const features = [
  [CircleHelp, "Beginner-first", "Answers start with what you need to know, not a history lecture."],
  [BookOpen, "Jargon translated", "Every technical term gets context and a useful, everyday example."],
  [ShieldCheck, "Always patient", "Ask twice, ask mid-match, ask the obvious. There are no silly questions here."],
]

export function FeatureSections() {
  return (
    <>
      <section id="how" className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 max-w-2xl"><p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">No homework required</p><h2 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">From confused to confident in three passes.</h2></div>
          <div className="grid gap-4 md:grid-cols-3">{steps.map(({ icon: Icon, title, text }) => <Card key={title} className="rounded-3xl shadow-none"><CardHeader><Icon className="size-8 text-primary" aria-hidden="true" /><CardTitle className="mt-5 text-xl">{title}</CardTitle></CardHeader><CardContent><p className="leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: text }} /></CardContent></Card>)}</div>
        </div>
      </section>
      <section id="examples" className="bg-secondary py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><h2 className="max-w-xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">Questions you were definitely not afraid to ask.</h2><p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">Tap into rules, positions, tactics, competitions, or that thing the commentator just shouted.</p></div>
          <div className="grid gap-5 lg:grid-cols-3">{examples.map((item, i) => <article key={item.question} className="flex min-h-64 flex-col justify-between rounded-3xl bg-card p-6 ring-1 ring-border"><p className="font-mono text-xs font-semibold text-muted-foreground">0{i + 1} / QUICK EXPLAINER</p><div><h3 className="text-2xl font-bold">{item.question}</h3><p className="mt-4 leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.answer }} /></div></article>)}</div>
        </div>
      </section>
      <section id="about" className="bg-background py-20 sm:py-28"><div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">Why we exist</p><h2 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">Football welcomes everyone. Its vocabulary doesn&apos;t.</h2></div><div className="flex flex-col gap-8"><p className="text-pretty text-xl leading-relaxed text-muted-foreground">Football can feel like everyone received a rulebook except you. FootyCoach AI fills in the gaps—kindly, quickly, and without making you feel late to the game.</p><div className="grid gap-4 sm:grid-cols-3">{features.map(([Icon, title, text]) => { const FeatureIcon = Icon as typeof CircleHelp; return <div key={title as string} className="rounded-2xl border border-border p-5"><FeatureIcon className="size-6 text-primary" aria-hidden="true" /><h3 className="mt-5 font-bold">{title as string}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text as string}</p></div> })}</div></div></div></section>
    </>
  )
}
