export type CareerEntry = {
  club: string
  from?: string
  to?: string
  appearances?: number
  goals?: number
  shirtNumbers?: number[]
  note?: string
}

export type Honour = {
  name: string
  year?: string
  note?: string
}

export type NotableMoment = {
  year?: string
  title: string
  description: string
}

export interface PlayerProfile {
  id: string
  fullName: string
  knownAs: string
  aliases: string[]
  dateOfBirth?: string
  birthplace?: string
  nationality?: string[]
  nationalTeams?: string[]
  status: "active" | "retired" | "deceased" | "unknown"
  positions: string[]
  preferredFoot?: "left" | "right" | "both" | "unknown"
  heightCm?: number
  currentClub?: string
  currentClubVerifiedAt?: string
  youthCareer?: CareerEntry[]
  seniorCareer?: CareerEntry[]
  internationalCareer?: CareerEntry[]
  majorHonours?: Honour[]
  individualAwards?: Honour[]
  playingStyle?: string
  strengths?: string[]
  tacticalRoles?: string[]
  earlyLife?: string
  careerSummary?: string
  legacy?: string
  notableMoments?: NotableMoment[]
  keywords: string[]
}
