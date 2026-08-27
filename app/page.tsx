import { FootyChat } from "@/components/footy-chat"
import { SiteHeader } from "@/components/site-header"
import { FeatureSections } from "@/components/feature-sections"

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <section className="overflow-hidden border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl flex-col justify-center gap-12 px-5 py-16 md:px-8 lg:grid lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-20 lg:py-24">
          <div className="flex flex-col items-start gap-7">
            <p className="rounded-full bg-accent px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent-foreground">
              Your friendly guide to the beautiful game
            </p>
            <div className="flex flex-col gap-5">
              <h1 className="max-w-3xl text-balance font-sans text-5xl font-bold leading-[0.96] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
                Football,<br />explained simply.
              </h1>
              <p className="max-w-xl text-pretty text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
                Ask the questions everyone else seems to know. Get clear, judgment-free answers while you watch, learn, and fall in love with the game.
              </p>
            </div>
            <a href="#ask" className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              Ask FootyCoach
              <span aria-hidden="true" className="ml-2">→</span>
            </a>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="aspect-[4/5] rounded-[2.5rem] border-2 border-primary-foreground/60 p-5 sm:aspect-square">
              <div className="relative flex size-full flex-col items-center justify-center rounded-[1.75rem] border border-primary-foreground/45">
                <div className="absolute inset-y-0 left-1/2 border-l border-primary-foreground/45" />
                <div className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-foreground/45" />
                <div className="absolute inset-x-0 top-0 mx-auto h-20 w-40 border-x border-b border-primary-foreground/45" />
                <div className="absolute inset-x-0 bottom-0 mx-auto h-20 w-40 border-x border-t border-primary-foreground/45" />
                <div className="relative z-10 max-w-[15rem] -rotate-3 rounded-3xl bg-background p-5 text-foreground shadow-2xl sm:max-w-xs sm:p-7">
                  <p className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">Live question</p>
                  <p className="mt-3 text-balance text-xl font-bold sm:text-2xl">“Wait… why was that offside?”</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Imagine an invisible line across the pitch. An attacker can&apos;t be beyond both the ball and the second-last defender when the pass is played.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FeatureSections />
      <FootyChat />
      <footer className="border-t border-border bg-foreground text-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 text-sm md:flex-row md:items-center md:justify-between md:px-8">
          <p className="font-bold">FootyCoach AI</p>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-5 text-background/70">
            <a href="#how" className="hover:text-background">How it works</a><a href="#about" className="hover:text-background">About</a><a href="mailto:hello@footycoach.ai" className="hover:text-background">Contact</a>
          </nav>
          <p className="text-background/55">Made for fans, not pundits.</p>
        </div>
      </footer>
    </main>
  )
}
