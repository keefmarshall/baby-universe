export class Particle {
  constructor(
    public code: string, // e.g. 'n' for neutron, "νμ" for muon-neutrino etc
    public displayCode: string, // e.g. ν<sub>μ</sub> - can contain HTML
    public name: string, // e.g. "muon neutrino"
    public matter: boolean, // false is anti-matter
    public antiparticleCode: string // e.g. "b̅" for bottom quark
  ) { }
}

export const ALL_PARTICLES: { [key: string]: Particle } = {
  // QUARKS
  'u': new Particle("u", "u", "up quark", true, "u̅"),
  'u̅': new Particle("u̅", "u̅", "up antiquark", false, "u"),
  'd': new Particle("d", "d", "down quark", true, "d̅"),
  'd̅': new Particle("d̅", "d̅", "down antiquark", false, "d"),
  's': new Particle("s", "s", "strange quark", true, "s̅"),
  's̅': new Particle("s̅", "s̅", "strange antiquark", false, "s"),
  'c': new Particle("c", "c", "charm quark", true, "c̅"),
  'c̅': new Particle("c̅", "c̅", "charm antiquark", false, "c"),
  'b': new Particle("b", "b", "bottom quark", false, "b̅"),
  'b̅': new Particle("b̅", "b̅", "bottom antiquark", false, "b"),
  't': new Particle("t", "t", "top quark", true, "t̅"),
  't̅': new Particle("t̅", "t̅", "top antiquark", false, "t"),

  // LEPTONS
  'e⁻': new Particle("e⁻", "e⁻", "electron", true, "e⁺"),
  'e⁺': new Particle("e⁺", "e⁺", "positron", false, "e⁻"),
  'μ⁻': new Particle("μ⁻", "μ⁻", "muon", true, "μ⁺"),
  'μ⁺': new Particle("μ⁺", "μ⁺", "antimuon", false, "μ⁻"),
  'τ⁻': new Particle("τ⁻", "τ⁻", "tau lepton", true, "τ⁺"),
  'τ⁺': new Particle("τ⁺", "τ⁺", "antitau", false, "τ⁻"),

  // NEUTRINOS
  'νe': new Particle("νe", "ν<sub>e</sub>", "electron neutrino", true, "ν̅e"),
  'ν̅e': new Particle("ν̅e", "ν̅<sub>e</sub>", "electron antineutrino", false, "νe"),
  'νμ': new Particle("νμ", "ν<sub>μ</sub>", "muon neutrino", true, "ν̅μ"),
  'ν̅μ': new Particle("ν̅μ", "ν̅<sub>μ</sub>", "muon antineutrino", false, "νμ"),
  'ντ': new Particle("ντ", "ν<sub>τ</sub>", "tau neutrino", true, "ν̅τ"),
  'ν̅τ': new Particle("ν̅τ", "ν̅<sub>τ</sub>", "tau antineutrino", false, "ντ"),

  // BOSONS
  // These never actually stay around long enough so not going to count them
  'g': new Particle("g", "g", "gluon", false, "g"),

  // MESONS
  // NB I know they're not strictly matter/antimatter, developer's licence..
  'π⁺': new Particle("π⁺", "π⁺", "pion", false, "π⁻"),
  'π⁻': new Particle("π⁻", "π⁻", "antipion", true, "π⁺"),
  'K⁺': new Particle("K⁺", "K⁺", "kaon", false, "K⁻"),
  'K⁻': new Particle("K⁻", "K⁻", "antikaon", true, "K⁺"),

  // BARYONS
  'p': new Particle("p", "p", "proton", false, "p̅"),
  'p̅': new Particle("p̅", "p̅", "antiproton", false, "p"),
  'n': new Particle("n", "n", "neutron", true, "n̅"),
  'n̅': new Particle("n̅", "n̅", "antineutron", false, "n"),

}

//     "tt̅ -> W⁺W⁻bb̅ -> "
