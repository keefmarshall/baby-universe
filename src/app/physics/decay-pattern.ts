export class DecayPattern {
  public decayConstant;

  constructor(
    public inputs: string[],
    public description: string,
    public results: string[],
    public halflife: number
  ) {
    // We need to play fast and loose with the real halflife to
    // make the game actually playable and enjoyable.. this flattens
    // out the differences between e.g. top vs strange quark decays
    // into something visible within the game
    this.decayConstant = Math.log10(this.halflife) / -750;
  }
}


export const DECAY_PATTERNS: { [key: string]: DecayPattern } = {

  // ***** BOTTOM QUARK *****

  // Half life is 1e-12
  // roughly 12% for (each?) leptonic decay = 1.2e-13
  // leaving 32% for each baryonic: = 3.2e-13
  "bot-lep-e": new DecayPattern(["b"], "b ⟶ W⁻c ⟶ ce⁻ν̅<sub>e</sub>", ["c", "e⁻", "ν̅e"], 1.2e-13),
  "bot-lep-μ": new DecayPattern(["b"], "b ⟶ W⁻c ⟶ cμ⁻ν̅<sub>μ</sub>", ["c", "μ⁻", "ν̅μ"], 1.2e-13),
  "bot-lep-τ": new DecayPattern(["b"], "b ⟶ W⁻c ⟶ cτ⁻ν̅<sub>τ</sub>", ["c", "τ⁻", "ν̅τ"], 1.2e-13),
  "abot-lep-e": new DecayPattern(["b̅"], "b̅ ⟶ W⁺c̅ ⟶ c̅e⁺ν<sub>e</sub>", ["c̅", "e⁺", "νe"], 1.2e-13),
  "abot-lep-μ": new DecayPattern(["b̅"], "b̅ ⟶ W⁺c̅ ⟶ c̅μ⁺ν<sub>μ</sub>", ["c̅", "μ⁺", "νμ"], 1.2e-13),
  "abot-lep-τ": new DecayPattern(["b̅"], "b̅ ⟶ W⁺c̅ ⟶ c̅τ⁺ν<sub>τ</sub>", ["c̅", "τ⁺", "ντ"], 1.2e-13),

  "bot-bar-ud": new DecayPattern(["b"], "b ⟶ W⁻c ⟶ cu̅d", ["c", "u̅", "d"], 3.2e-13),
  "bot-bar-cs": new DecayPattern(["b"], "b ⟶ W⁻c ⟶ cc̅s", ["c", "c̅", "s"], 3.2e-13),
  "abot-bar-ud": new DecayPattern(["b̅"], "b̅ ⟶ W⁺c̅ ⟶ c̅ud̅", ["c̅", "u", "d̅"], 3.2e-13),
  "abot-bar-cs": new DecayPattern(["b̅"], "b̅ ⟶ W⁺c̅ ⟶ c̅cs̅", ["c̅", "c", "s̅"], 3.2e-13),

  // ***** TOP QUARK *****

  // t half life is 5e-25. leptonic decay 0.3 of that in total
  // = 5e-26 per leptonic decay pattern
  // = 1.75e-25 per baryonic decay pattern
  "top-lep-e": new DecayPattern(["t"], "t ⟶ W⁺b ⟶ be⁺ν<sub>e</sub>", ["b", "e⁺", "νe"], 5e-26),
  "top-lep-μ": new DecayPattern(["t"], "t ⟶ W⁺b ⟶ bμ⁺ν<sub>μ</sub>", ["b", "μ⁺", "νμ"], 5e-26),
  "top-lep-τ": new DecayPattern(["t"], "t ⟶ W⁺b ⟶ bτ⁺ν<sub>τ</sub>", ["b", "τ⁺", "ντ"], 5e-26),
  "atop-lep-e": new DecayPattern(["t̅"], "t̅ ⟶ W⁻b̅ ⟶ b̅e⁻ν̅<sub>e</sub>", ["b̅", "e⁻", "ν̅e"], 5e-26),
  "atop-lep-μ": new DecayPattern(["t̅"], "t̅ ⟶ W⁻b̅ ⟶ b̅μ⁻ν̅<sub>μ</sub>", ["b̅", "μ⁻", "ν̅μ"], 5e-26),
  "atop-lep-τ": new DecayPattern(["t̅"], "t̅ ⟶ W⁻b̅ ⟶ b̅τ⁻ν̅<sub>τ</sub>", ["b̅", "τ⁻", "ν̅τ"], 5e-26),

  "top-bar-ud": new DecayPattern(["t"], "t ⟶ W⁺b ⟶ bud̅", ["b", "u", "d̅"], 1.75e-25),
  "top-bar-cs": new DecayPattern(["t"], "t ⟶ W⁺b ⟶ bcs̅", ["b", "c", "s̅"], 1.75e-25),
  "atop-bar-ud": new DecayPattern(["t̅"], "t̅ ⟶ W⁻b̅ ⟶ b̅u̅d", ["b̅", "u̅", "d"], 1.75e-25),
  "atop-bar-cs": new DecayPattern(["t̅"], "t̅ ⟶ W⁻b̅ ⟶ b̅c̅s", ["b̅", "c̅", "s"], 1.75e-25),

};
