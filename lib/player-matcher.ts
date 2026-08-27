import { calculateAge } from "./calculate-age"
import { formatPlayerProfile, playerProfiles } from "./player-knowledge"
import type { PlayerProfile } from "./player-types"

const normalize = (value: string) => value
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9\s]/g, " ")
  .replace(/\s+/g, " ")
  .trim()

const genericWords = new Set(["who", "is", "was", "tell", "me", "about", "what", "how", "old", "does", "did", "the", "player", "footballer", "profile", "career", "of"])

export type PlayerMatch = {
  profile: PlayerProfile
  score: number
  confidence: "high" | "medium"
}

function aliasesFor(profile: PlayerProfile) {
  return [profile.fullName, profile.knownAs, profile.id, ...profile.aliases, ...profile.keywords]
    .filter(Boolean)
    .map(normalize)
    .filter(alias => alias.length > 2)
}

export function matchPlayerQuestion(question: string): PlayerMatch | null {
  const normalizedQuestion = normalize(question)
  if (!normalizedQuestion) return null
  const questionWords = new Set(normalizedQuestion.split(" ").filter(word => !genericWords.has(word)))
  let best: PlayerMatch | null = null

  for (const profile of playerProfiles) {
    let score = 0
    for (const alias of aliasesFor(profile)) {
      if (` ${normalizedQuestion} `.includes(` ${alias} `)) {
        score = Math.max(score, alias.includes(" ") ? 8 : 5)
      }
    }
    const matchedKeywords = profile.keywords.map(normalize).filter(keyword => questionWords.has(keyword))
    score += Math.min(matchedKeywords.length, 2)
    if (score > 0 && (!best || score > best.score)) {
      best = { profile, score, confidence: score >= 7 ? "high" : "medium" }
    }
  }

  return best
}

export function playerAnswer(match: PlayerMatch) {
  const age = match.profile.dateOfBirth ? calculateAge(match.profile.dateOfBirth) : undefined
  return formatPlayerProfile(match.profile, age)
}

export function isPlayerFollowUp(question: string) {
  return /\b(he|she|they|his|her|their|him|them|that player|this player)\b/i.test(question)
}
