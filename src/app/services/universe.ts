export class Universe {
    // Globals
    elapsedTicks = 0;
    elapsedSeconds = 0;

    energy = 0;
    heat = 0;

    particles = {};
    antiparticles = {};

    phase = 1; // pre/post big bang is 1/2

    // Photons
    photonCount = 0;
    energyPerPhoton = 0.5;

    // Machines - hash of machine name against a hash of machine properties
    machines = {};
    currentConstructionProject: string = null;

    // Research - hash of project name against science gained and complete status
    research = {};
    currentResearchProject: string = null;

    // Log
    logs = [//"...", "...", "...", "...", "...", "...",
            "Within the empty void, matter and energy spontaneously " +
            "flash into existence, only to decay almost instantly. "];

}
