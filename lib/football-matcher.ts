import { footballKnowledge, type FootballKnowledgeEntry } from "./football-knowledge"

const synonymGroups: Record<string, string[]> = {
  "striker": ["centre forward", "center forward", "number 9", "no 9"],
  "goalkeeper": ["keeper", "goalie"],
  "champions league": ["ucl", "cl", "european cup"],
  "premier league": ["prem", "epl"],
  "cristiano ronaldo": ["cr7", "ronaldo"],
  "lionel messi": ["leo messi", "messi"],
  "false 9": ["false nine"],
  "number 6": ["no 6", "holding midfielder"],
  "number 8": ["no 8", "box to box"],
  "number 10": ["no 10", "playmaker"],
  "4-3-3": ["433", "4 3 3", "four three three"],
  "4-4-2": ["442", "4 4 2", "four four two"],
  "4-2-3-1": ["4231", "4 2 3 1"],
  "3-5-2": ["352", "3 5 2"],
  "3-4-3": ["343", "3 4 3"],
  "5-3-2": ["532", "5 3 2"],
  "tiki-taka": ["tiki taka"],
  "gegenpressing": ["counterpressing", "counter press"],
}

const normalize = (value: string) => value
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9\s-]/g, " ")
  .replace(/\s+/g, " ")
  .trim()

const expandTerms = (term: string) => {
  const normalized = normalize(term)
  const aliases = synonymGroups[normalized] || []
  return [normalized, ...aliases.map(normalize)]
}

const containsPhrase = (question: string, phrase: string) => ` ${question} `.includes(` ${phrase} `)

export type MatchConfidence = "high" | "medium" | "none"

export type FootballMatch = {
  entry: FootballKnowledgeEntry
  score: number
  confidence: MatchConfidence
}

export function matchFootballQuestion(question: string): FootballMatch | null {
  const normalizedQuestion = normalize(question)
  if (!normalizedQuestion) return null

  let best: FootballMatch | null = null
  for (const candidate of footballKnowledge) {
    let score = 0
    let matched = false
    const phrases = [...(candidate.questionPatterns || []), ...candidate.keywords]
    for (const phrase of phrases) {
      for (const expanded of expandTerms(phrase)) {
        if (containsPhrase(normalizedQuestion, expanded)) {
          matched = true
          score += expanded.includes(" ") || expanded.includes("-") ? 3 : 2
          if (candidate.questionPatterns?.some(pattern => normalize(pattern) === expanded)) score += 2
          break
        }
      }
    }

    if (matched) score += Math.min(candidate.priority || 1, 3)
    if (matched && (!best || score > best.score)) {
      const confidence = score >= 7 ? "high" : score >= 3 ? "medium" : "none"
      best = { entry: candidate, score, confidence }
    }
  }

  return best && best.confidence !== "none" ? best : null
}

export function normalizeFootballQuestion(question: string) {
  return normalize(question)
}
