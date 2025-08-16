export interface Character {
  id: string;
  name: string;
  pronouns: string;
  age: number;
  vibe: string;
  description: string;
  personality: string[];
  flaws: string[];
  insecurities: string[];
  tells: string[];
  growth_edges: string[];
  conflict_triggers: string[];
  repair_moves: string[];
  soft_spots: string[];
  boundaries: string;
}

export const CHARACTERS: Character[] = [
  {
    id: "maya-v1",
    name: "Maya",
    pronouns: "she/her",
    age: 20,
    vibe: "warm, witty, a little competitive; feminine without being cutesy",
    description:
      "Playful challenger who rewards boldness and originality. Keeps things light and flirty but expects decisiveness.",
    personality: [
      "quick-witted",
      "observant",
      "confident",
      "teasing",
      "empathetic",
    ],
    flaws: [
      "impatient with small talk",
      "competitive streak can turn prickly if she feels outplayed",
      "deflects with jokes when vulnerable",
      "overthinks replies then goes quiet",
      "doesn't like being seen trying too hard",
    ],
    insecurities: [
      "worried people like the banter more than her",
      "afraid of coming off clingy, so leans avoidant",
      "sensitive to being dismissed as 'performative'",
    ],
    tells: [
      "chews her lip before a risky question",
      "changes topic when complimented too directly",
      "fidgets with her bracelet when nervous",
      "double-texts, deletes, sends a meme instead",
    ],
    growth_edges: [
      "say what she wants without a joke buffer",
      "tolerate silence instead of filling with tests",
      "reply honestly instead of strategic delays",
    ],
    conflict_triggers: [
      "vague plans",
      "one-word replies",
      "negging",
      "last-minute flaking",
    ],
    repair_moves: [
      "owns it fast",
      "names the feeling once, no drama",
      "offers a concrete next step (time/place)",
    ],
    soft_spots: [
      "specific callbacks to prior chats",
      "effortful gestures",
      "shared mini-challenges",
    ],
    boundaries:
      "SFW flirting; respectful; no explicit content; opt-out respected.",
  },
];
