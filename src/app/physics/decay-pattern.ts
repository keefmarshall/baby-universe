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

  // ***** STRANGE QUARK *****

  // half life is roughly 1e-8

  "str-lep-e": new DecayPattern(["s"], "s ⟶ W⁻u ⟶ ue⁻ν̅<sub>e</sub>", ["u", "e⁻", "ν̅e"], 1e-8),
  "astr-lep-e": new DecayPattern(["s̅"], "s̅ ⟶ W⁺u̅ ⟶ u̅e⁺ν<sub>e</sub>", ["u̅", "e⁺", "νe"], 1e-8),

  "str-bar-ud": new DecayPattern(["s"], "s ⟶ W⁻u ⟶ uu̅d", ["u", "u̅", "d"], 1e-8),
  "astr-bar-ud": new DecayPattern(["s̅"], "s̅ ⟶ W⁺u̅ ⟶ u̅ud̅", ["u̅", "u", "d̅"], 1e-8),

  // ***** CHARM QUARK *****

  // half life is 1e-12, close to b

  "chm-lep-e": new DecayPattern(["c"], "c ⟶ W⁺s ⟶ se⁺ν<sub>e</sub>", ["s", "e⁺", "νe"], 1e-12),
  "chm-lep-μ": new DecayPattern(["c"], "c ⟶ W⁺s ⟶ sμ⁺ν<sub>μ</sub>", ["s", "μ⁺", "νμ"], 1e-12),
  "achm-lep-e": new DecayPattern(["c̅"], "c̅ ⟶ W⁻s̅ ⟶ s̅e⁻ν̅<sub>e</sub>", ["s̅", "e⁻", "ν̅e"], 1e-12),
  "achm-lep-μ": new DecayPattern(["c̅"], "c̅ ⟶ W⁻s̅ ⟶ s̅μ⁻ν̅<sub>μ</sub>", ["s̅", "μ⁻", "ν̅μ"], 1e-12),

  "chm-bar-ud": new DecayPattern(["c"], "c ⟶ W⁺s ⟶ sud̅", ["s", "u", "d̅"], 1e-12),
  "achm-bar-ud": new DecayPattern(["c̅"], "c̅ ⟶ W⁻s̅ ⟶ s̅u̅d", ["s̅", "u̅", "d"], 1e-12),


  // ***** BOTTOM QUARK *****

  // Half life is 1.2e-12
  "bot-lep-e": new DecayPattern(["b"], "b ⟶ W⁻c ⟶ ce⁻ν̅<sub>e</sub>", ["c", "e⁻", "ν̅e"], 1.2e-12),
  "bot-lep-μ": new DecayPattern(["b"], "b ⟶ W⁻c ⟶ cμ⁻ν̅<sub>μ</sub>", ["c", "μ⁻", "ν̅μ"], 1.2e-12),
  "bot-lep-τ": new DecayPattern(["b"], "b ⟶ W⁻c ⟶ cτ⁻ν̅<sub>τ</sub>", ["c", "τ⁻", "ν̅τ"], 1.2e-12),
  "abot-lep-e": new DecayPattern(["b̅"], "b̅ ⟶ W⁺c̅ ⟶ c̅e⁺ν<sub>e</sub>", ["c̅", "e⁺", "νe"], 1.2e-12),
  "abot-lep-μ": new DecayPattern(["b̅"], "b̅ ⟶ W⁺c̅ ⟶ c̅μ⁺ν<sub>μ</sub>", ["c̅", "μ⁺", "νμ"], 1.2e-12),
  "abot-lep-τ": new DecayPattern(["b̅"], "b̅ ⟶ W⁺c̅ ⟶ c̅τ⁺ν<sub>τ</sub>", ["c̅", "τ⁺", "ντ"], 1.2e-12),

  "bot-bar-ud": new DecayPattern(["b"], "b ⟶ W⁻c ⟶ cu̅d", ["c", "u̅", "d"], 1.2e-12),
  "bot-bar-cs": new DecayPattern(["b"], "b ⟶ W⁻c ⟶ cc̅s", ["c", "c̅", "s"], 1.2e-12),
  "abot-bar-ud": new DecayPattern(["b̅"], "b̅ ⟶ W⁺c̅ ⟶ c̅ud̅", ["c̅", "u", "d̅"], 1.2e-12),
  "abot-bar-cs": new DecayPattern(["b̅"], "b̅ ⟶ W⁺c̅ ⟶ c̅cs̅", ["c̅", "c", "s̅"], 1.2e-12),

  // ***** TOP QUARK *****

  // t half life is 5e-25. leptonic decay 0.3 of that in total
  "top-lep-e": new DecayPattern(["t"], "t ⟶ W⁺b ⟶ be⁺ν<sub>e</sub>", ["b", "e⁺", "νe"], 5e-25),
  "top-lep-μ": new DecayPattern(["t"], "t ⟶ W⁺b ⟶ bμ⁺ν<sub>μ</sub>", ["b", "μ⁺", "νμ"], 5e-25),
  "top-lep-τ": new DecayPattern(["t"], "t ⟶ W⁺b ⟶ bτ⁺ν<sub>τ</sub>", ["b", "τ⁺", "ντ"], 5e-25),
  "atop-lep-e": new DecayPattern(["t̅"], "t̅ ⟶ W⁻b̅ ⟶ b̅e⁻ν̅<sub>e</sub>", ["b̅", "e⁻", "ν̅e"], 5e-25),
  "atop-lep-μ": new DecayPattern(["t̅"], "t̅ ⟶ W⁻b̅ ⟶ b̅μ⁻ν̅<sub>μ</sub>", ["b̅", "μ⁻", "ν̅μ"], 5e-25),
  "atop-lep-τ": new DecayPattern(["t̅"], "t̅ ⟶ W⁻b̅ ⟶ b̅τ⁻ν̅<sub>τ</sub>", ["b̅", "τ⁻", "ν̅τ"], 5e-25),

  "top-bar-ud": new DecayPattern(["t"], "t ⟶ W⁺b ⟶ bud̅", ["b", "u", "d̅"], 5e-25),
  "top-bar-cs": new DecayPattern(["t"], "t ⟶ W⁺b ⟶ bcs̅", ["b", "c", "s̅"], 5e-25),
  "atop-bar-ud": new DecayPattern(["t̅"], "t̅ ⟶ W⁻b̅ ⟶ b̅u̅d", ["b̅", "u̅", "d"], 5e-25),
  "atop-bar-cs": new DecayPattern(["t̅"], "t̅ ⟶ W⁻b̅ ⟶ b̅c̅s", ["b̅", "c̅", "s"], 5e-25),

  /////////////////////////////////////////////////////////////////////////////
  // ** LEPTONS **
  /////////////////////////////////////////////////////////////////////////////

  // ***** MUON *****

  "mu-lep-e": new DecayPattern(["μ⁻"], "μ⁻ ⟶ W⁻ν<sub>μ</sub> ⟶ ν<sub>μ</sub>e⁻ν̅<sub>e</sub>", ["νμ", "e⁻", "ν̅e"], 2e-6),
  "amu-lep-e": new DecayPattern(["μ⁺"], "μ⁺ ⟶ W⁺ν̅<sub>μ</sub> ⟶ ν̅<sub>μ</sub>e⁺ν<sub>e</sub>", ["ν̅μ", "e⁺", "νe"], 2e-6),

  // ***** TAU *****

  // https://en.wikipedia.org/wiki/Tau_(particle)#Tau_decay
  // Lots of decay paths, ignoring the less probable ones.
  // half life is around 2e-13
  "tau-had-1": new DecayPattern(["τ⁻"], "τ⁻ ⟶ W⁻ν<sub>τ</sub> ⟶ ν<sub>τ</sub>π⁻π⁰", ["ντ", "π⁻", "π⁰"], 2e-13),
  "tau-had-2": new DecayPattern(["τ⁻"], "τ⁻ ⟶ W⁻ν<sub>τ</sub> ⟶ ν<sub>τ</sub>π⁻", ["ντ", "π⁻"], 2e-13),
  "tau-had-3": new DecayPattern(["τ⁻"], "τ⁻ ⟶ W⁻ν<sub>τ</sub> ⟶ ν<sub>τ</sub>π⁻π⁰π⁰", ["ντ", "π⁻", "π⁰", "π⁰"], 2e-13),
  "tau-had-4": new DecayPattern(["τ⁻"], "τ⁻ ⟶ W⁻ν<sub>τ</sub> ⟶ ν<sub>τ</sub>π⁻π⁻π⁺", ["ντ", "π⁻", "π⁻", "π⁺"], 2e-13),
  "atau-had-1": new DecayPattern(["τ⁺"], "τ⁺ ⟶ W⁺ν̅<sub>τ</sub> ⟶ ν̅<sub>τ</sub>π⁺π⁰", ["ν̅τ", "π⁺", "π⁰"], 2e-13),
  "atau-had-2": new DecayPattern(["τ⁺"], "τ⁺ ⟶ W⁺ν̅<sub>τ</sub> ⟶ ν̅<sub>τ</sub>π⁺", ["ν̅τ", "π⁺"], 2e-13),
  "atau-had-3": new DecayPattern(["τ⁺"], "τ⁺ ⟶ W⁺ν̅<sub>τ</sub> ⟶ ν̅<sub>τ</sub>π⁺π⁰π⁰", ["ν̅τ", "π⁺", "π⁰", "π⁰"], 2e-13),
  "atau-had-4": new DecayPattern(["τ⁺"], "τ⁺ ⟶ W⁺ν̅<sub>τ</sub> ⟶ ν̅<sub>τ</sub>π⁺π⁺π⁻", ["ν̅τ", "π⁺", "π⁺", "π⁻"], 2e-13),

  "tau-lep-e": new DecayPattern(["τ⁻"], "τ⁻ ⟶ W⁻ν<sub>τ</sub> ⟶ ν<sub>τ</sub>e⁻ν̅<sub>e</sub>", ["ντ", "e⁻", "ν̅e"], 2e-13),
  "tau-lep-μ": new DecayPattern(["τ⁻"], "τ⁻ ⟶ W⁻ν<sub>τ</sub> ⟶ ν<sub>τ</sub>μ⁻ν̅<sub>μ</sub>", ["ντ", "μ⁻", "ν̅μ"], 2e-13),
  "atau-lep-e": new DecayPattern(["τ⁺"], "τ⁺ ⟶ W⁺ν̅<sub>τ</sub> ⟶ ν̅<sub>τ</sub>e⁺ν<sub>e</sub>", ["ν̅τ", "e⁺", "νe"], 2e-13),
  "atau-lep-μ": new DecayPattern(["τ⁺"], "τ⁺ ⟶ W⁺ν̅<sub>τ</sub> ⟶ ν̅<sub>τ</sub>μ⁺ν<sub>μ</sub>", ["ν̅τ", "μ⁺", "νμ"], 2e-13),

};
