export const offlineFootballFallback =
  "I’m FootyCoach’s offline assistant. I can explain football rules, positions, formations, tactics, skills, competitions, history, players, and clubs. Try asking about offside, a number 10, a 4-3-3, pressing, or the World Cup."

export const noGeminiMessage =
  "Gemini isn’t connected, so I’m using FootyCoach’s built-in football knowledge."

export const currentInformationFallback =
  "I don’t have live match or news data in the built-in knowledge. Gemini may be able to help if it is connected, but current scores, transfers, and injuries should be verified with a live source."

export function isLikelyCurrentQuestion(question: string) {
  return /\b(today|tonight|yesterday|tomorrow|latest|current|now|live|recent|transfer|transferred|injured|injury|score|scored|result|breaking)\b/i.test(question)
}
