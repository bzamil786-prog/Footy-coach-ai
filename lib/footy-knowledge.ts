export type KnowledgeEntry = {
  terms: string[]
  answer: string
}

// A free, offline football knowledge base. Each entry is matched by scoring
// how many of its terms appear in the user's question, so the most relevant
// answer wins even when several topics share vocabulary.
export const knowledge: KnowledgeEntry[] = [
  // ---------------------------------------------------------------- History
  {
    terms: ["history", "origin", "origins", "invent", "invented", "history of football", "who invented"],
    answer:
      "Ball games with feet go back thousands of years—China's cuju (from the Han dynasty, around 200 BC) is the earliest recorded, and the Romans played harpastum. But modern football was born in 19th-century England. Chaotic local 'mob football' games were slowly tamed in schools and clubs, until a set of shared written rules finally unified the sport in 1863.",
  },
  {
    terms: ["1863", "football association", "the fa", "cambridge rules", "codified", "first rules", "laws created"],
    answer:
      "On 26 October 1863, representatives of English clubs met at the Freemasons' Tavern in London and founded The Football Association (The FA)—the world's first governing body. They agreed the first standardized Laws of the Game, which crucially banned carrying the ball by hand. Clubs that wanted to keep handling split off and later formed rugby.",
  },
  {
    terms: ["cuju", "ancient", "roman", "harpastum", "medieval", "mob football"],
    answer:
      "Football's ancestors are ancient: China's cuju (around 200 BC) had players kicking a ball through a net, and the Romans played a rougher game called harpastum. In medieval England, 'mob football' pitted whole villages against each other with almost no rules. These games shaped the idea, but modern football only took form once written laws arrived in 1863.",
  },
  {
    terms: ["professional", "professionalism", "first league", "football league", "1888"],
    answer:
      "Football turned professional in England in 1885 after arguments over paying players, and in 1888 the world's first organized league—the Football League—kicked off with 12 clubs. League football spread quickly worldwide and became the weekly backbone of the sport.",
  },

  // ------------------------------------------------------------------- FIFA
  {
    terms: ["fifa", "fifa creation", "fifa founded", "1904", "who runs football", "world governing body"],
    answer:
      "FIFA (Fédération Internationale de Football Association) was founded on 21 May 1904 in Paris by seven nations: France, Belgium, Denmark, the Netherlands, Spain, Sweden, and Switzerland. It was created to govern international football and organize matches between national teams. Today FIFA has more than 200 member associations—more than the United Nations—and runs the World Cup.",
  },
  {
    terms: ["ifab", "law makers", "who makes the rules", "board"],
    answer:
      "The Laws of the Game aren't written by FIFA alone. They're maintained by the IFAB (International Football Association Board), founded in 1886. Its members are the four British associations plus FIFA, and any change to the Laws needs the board's approval.",
  },
  {
    terms: ["confederation", "uefa", "conmebol", "concacaf", "caf", "afc", "ofc"],
    answer:
      "FIFA is divided into six continental confederations: UEFA (Europe), CONMEBOL (South America), CONCACAF (North/Central America & Caribbean), CAF (Africa), AFC (Asia), and OFC (Oceania). Each runs its own competitions, like the UEFA Champions League and the Copa Libertadores.",
  },

  // -------------------------------------------------------------- World Cup
  {
    terms: ["world cup", "1930", "first world cup", "uruguay", "world cup history"],
    answer:
      "The first FIFA World Cup was held in Uruguay in 1930, and the hosts won it. Held every four years (paused for World War II), it's the biggest single-sport event on Earth. Brazil are the most successful nation with five titles, followed by Germany and Italy with four each. Argentina, the reigning champions, won in 2022.",
  },
  {
    terms: ["most world cups", "who won the most", "brazil titles", "pele world cups"],
    answer:
      "Brazil hold the record with five World Cups (1958, 1962, 1970, 1994, 2002). Germany and Italy have four each, Argentina and France have three and two respectively (with Argentina winning most recently in 2022), and Uruguay and England have won as well. Pelé is the only player to win it three times.",
  },
  {
    terms: ["euros", "european championship", "copa america", "champions league", "continental"],
    answer:
      "Beyond the World Cup, the biggest tournaments are the UEFA European Championship (the Euros) and South America's Copa América for national teams, and the UEFA Champions League—Europe's elite club competition—at club level. The Champions League final is watched by hundreds of millions worldwide.",
  },

  // ------------------------------------------------------------- Basic laws
  {
    terms: ["how to play", "aim of the game", "object of football", "basics", "how does football work"],
    answer:
      "Football is played by two teams of 11, who try to move a ball into the opposing goal—mostly using their feet, but any body part except the arms and hands (only the goalkeeper may handle it, and only in their own area). A match is 90 minutes split into two 45-minute halves, and the team with more goals wins.",
  },
  {
    terms: ["pitch", "field size", "dimensions", "goal size", "penalty area", "18 yard box"],
    answer:
      "A full-size pitch is roughly 100–110 m long and 64–75 m wide. Goals are 7.32 m (8 yards) wide and 2.44 m (8 feet) tall. The penalty area extends 16.5 m (18 yards) from the goal line—fouls by the defending team inside it lead to a penalty kick.",
  },
  {
    terms: ["match length", "how long", "90 minutes", "half time", "stoppage", "added time", "extra time"],
    answer:
      "A match lasts 90 minutes: two 45-minute halves with a 15-minute break. The referee adds 'stoppage time' at the end of each half for time lost. In knockouts still level after 90, teams play 30 minutes of extra time and, if needed, a penalty shootout.",
  },
  {
    terms: ["offside"],
    answer:
      "Offside stops attackers from waiting beside the goal. When a teammate plays the ball, an attacker is offside if they are nearer to the opponents' goal line than both the ball and the second-last opponent (usually the last defender), AND then get involved in play. Being level is onside, and you can't be offside from your own half, a throw-in, corner, or goal kick.",
  },
  {
    terms: ["penalty", "penalty kick", "spot kick"],
    answer:
      "A penalty kick is awarded when a defending player commits a direct-free-kick offence inside their own penalty area. One attacker shoots from the penalty spot (11 m out) with only the goalkeeper defending, who must stay on the line until the ball is kicked.",
  },
  {
    terms: ["penalty shootout", "shootout", "penalties decide"],
    answer:
      "If a knockout match is level after extra time, it's decided by a penalty shootout. Teams take five penalties each, alternating; whoever scores more wins. If still tied, it goes to sudden death, one kick each, until one team scores and the other misses.",
  },
  {
    terms: ["free kick", "freekick", "direct", "indirect"],
    answer:
      "A free kick restarts play after a foul. A direct free kick can be scored straight into the goal; an indirect free kick (shown by the referee raising an arm) must touch another player before a goal can count. Defenders must stand at least 9.15 m (10 yards) away.",
  },
  {
    terms: ["corner", "corner kick"],
    answer:
      "A corner is awarded when the defending team last touches the ball before it crosses their own goal line without a goal. The attacking team restarts from the nearest corner arc, often crossing into the box for a header.",
  },
  {
    terms: ["throw in", "throw-in", "thrown"],
    answer:
      "A throw-in restarts play when the ball fully crosses the sideline (touchline). A player throws it back in with both hands, from behind and over the head, keeping both feet on the ground. You can't score directly or be offside from a throw-in.",
  },
  {
    terms: ["goal kick"],
    answer:
      "A goal kick is given when the attacking team puts the ball over the goal line without scoring. The defending team restarts with a kick from inside their goal area; the ball is in play as soon as it's kicked and moves.",
  },
  {
    terms: ["yellow card", "red card", "card", "booking", "sent off"],
    answer:
      "A yellow card is a formal warning (a 'booking'). Two yellows in one match combine into a red. A straight red—for serious fouls, violent conduct, or denying a clear goal—sends the player off immediately, and their team plays the rest of the match a player short.",
  },
  {
    terms: ["handball", "hand ball"],
    answer:
      "Handball is deliberately playing the ball with the hand or arm, or making your body unnaturally bigger with the arm. It's not automatic—referees judge intent and arm position. In the penalty area it can mean a penalty; goalkeepers are exempt inside their own area.",
  },
  {
    terms: ["foul", "tackle", "dangerous play"],
    answer:
      "A foul is an unfair challenge—kicking, tripping, pushing, holding, or a reckless tackle. It gives the other team a free kick (or a penalty inside the box). Referees weigh the force and intent: careless is a free kick, reckless adds a yellow, and excessive force is a red.",
  },
  {
    terms: ["var", "video assistant", "video referee", "goal line technology"],
    answer:
      "VAR (Video Assistant Referee) reviews four match-changing situations: goals, penalties, straight red cards, and mistaken identity. It only steps in for 'clear and obvious' errors. Separately, goal-line technology instantly signals whether the whole ball crossed the line.",
  },

  // -------------------------------------------------------------- Positions
  {
    terms: ["goalkeeper", "goalie", "keeper"],
    answer:
      "The goalkeeper guards the goal and is the only player allowed to handle the ball—but only inside their own penalty area. They shot-stop, command the box on crosses, organize the defence, and increasingly start attacks by playing out with their feet.",
  },
  {
    terms: ["defender", "centre back", "center back", "fullback", "full-back", "wing back", "wing-back"],
    answer:
      "Defenders protect the goal by marking, tackling, blocking, and clearing danger. Centre-backs play centrally and win headers and duels; full-backs defend the wide areas and overlap to support attacks; wing-backs are even more attacking full-backs used in three-at-the-back systems.",
  },
  {
    terms: ["midfielder", "midfield", "playmaker", "defensive midfielder", "number 6", "number 10"],
    answer:
      "Midfielders link defence and attack. A defensive midfielder (the 'number 6') shields the back line and breaks up play; a central midfielder does a bit of everything; an attacking midfielder or playmaker (the 'number 10') creates chances and threads passes to the forwards.",
  },
  {
    terms: ["striker", "forward", "winger", "number 9", "false 9"],
    answer:
      "Forwards lead the attack. A central striker (the 'number 9') scores and holds up the ball; wingers stay wide to beat defenders and cross or cut inside to shoot; a 'false 9' drops into midfield to drag defenders out of position and create space.",
  },
  {
    terms: ["captain", "armband"],
    answer:
      "The captain wears the armband and is the on-field leader—the only player who may (politely) speak to the referee on certain matters. They motivate teammates, help set the tactical tone, and represent the team at the coin toss and trophy lifts.",
  },

  // ---------------------------------------------------------------- Tactics
  {
    terms: ["formation", "4-4-2", "4 4 2", "4-3-3", "3-5-2", "shape"],
    answer:
      "A formation describes how outfield players are arranged (the goalkeeper isn't counted). 4-4-2 is balanced with two banks of four; 4-3-3 favours wingers and pressing; 3-5-2 packs the midfield with wing-backs. Teams often shift shape between attacking and defending.",
  },
  {
    terms: ["pressing", "gegenpressing", "high press", "counter press"],
    answer:
      "Pressing means hunting the ball high up the pitch to win it back quickly and near the opponent's goal. 'Gegenpressing' (counter-pressing) is winning it back immediately after losing it, before the opponent can settle—famously used by coaches like Jürgen Klopp.",
  },
  {
    terms: ["tiki taka", "possession", "counter attack", "counter-attack", "park the bus", "catenaccio"],
    answer:
      "Styles vary widely: tiki-taka is patient short-passing possession (Barcelona, Spain); counter-attacking soaks up pressure then strikes fast on the break; 'parking the bus' is ultra-defensive; and catenaccio was Italy's classic disciplined, defence-first system.",
  },
  {
    terms: ["set piece", "set-piece", "dead ball"],
    answer:
      "Set pieces are restarts—corners, free kicks, throw-ins, and penalties—when teams use rehearsed routines. They matter hugely: a large share of goals come from set pieces because they let a team position tall players and deliver the ball into dangerous areas.",
  },

  // ----------------------------------------------------------------- Legends
  {
    terms: ["pele", "pelé", "maradona", "greatest ever", "goat", "best player ever"],
    answer:
      "The 'greatest ever' debate usually centres on Pelé (three World Cups with Brazil), Diego Maradona (who almost single-handedly won 1986 for Argentina), and in the modern era Lionel Messi and Cristiano Ronaldo. Each defined their generation—there's no single right answer.",
  },
  {
    terms: ["messi", "ronaldo", "cristiano", "ballon dor", "ballon d'or"],
    answer:
      "Lionel Messi and Cristiano Ronaldo dominated football for over 15 years, sharing most Ballon d'Or awards (given to the year's best player) between them. Messi finally won the World Cup with Argentina in 2022, while Ronaldo is one of the sport's all-time leading goalscorers.",
  },
]

const fallback =
  "I'm the free, built-in FootyCoach, and I know a lot about football—its history, FIFA's creation, the World Cup, the Laws of the Game, positions, and tactics. Try asking about the origins of football, how FIFA started, offside, formations, pressing, or a position like the goalkeeper or a number 10."

export function getCoachAnswer(question: string) {
  const normalized = question.toLowerCase()

  let best: KnowledgeEntry | null = null
  let bestScore = 0

  for (const entry of knowledge) {
    let score = 0
    for (const term of entry.terms) {
      if (normalized.includes(term)) {
        // Longer, more specific terms count for more.
        score += term.includes(" ") ? 3 : 1
      }
    }
    if (score > bestScore) {
      bestScore = score
      best = entry
    }
  }

  if (best) return `${best.answer}\n\nAsk me anything else about football—its history, rules, competitions, positions, or tactics.`
  return fallback
}
