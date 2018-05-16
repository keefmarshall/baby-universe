export class DecayPattern {
  constructor(
    public inputs: string[],
    public description: string,
    public results: string[]
  ) { }
}


export const DECAY_PATTERNS: { [key: string]: DecayPattern } = {
  "top-lept-e": new DecayPattern(["t"], "t ⟶ W⁺b ⟶ be⁺ν<sub>e</sub>", ["b", "e⁺", "νe"]),
  "top-lept-μ": new DecayPattern(["t"], "t ⟶ W⁺b ⟶ bμ⁺ν<sub>μ</sub>", ["b", "μ⁺", "νμ"]),
  "top-lept-τ": new DecayPattern(["t"], "t ⟶ W⁺b ⟶ bτ⁺ν<sub>τ</sub>", ["b", "τ⁺", "ντ"]),
  "atop-lept-e": new DecayPattern(["t̅"], "t̅ ⟶ W⁻b̅ ⟶ b̅e⁻ν̅<sub>e</sub>", ["b̅", "e⁻", "ν̅e"]),
  "atop-lept-μ": new DecayPattern(["t̅"], "t̅ ⟶ W⁻b̅ ⟶ b̅μ⁻ν̅<sub>μ</sub>", ["b̅", "μ⁻", "ν̅μ"]),
  "atop-lept-τ": new DecayPattern(["t̅"], "t̅ ⟶ W⁻b̅ ⟶ b̅τ⁻ν̅<sub>τ</sub>", ["b̅", "τ⁻", "ν̅τ"]),
};
