export class Universe {
    // Globals
    elapsedTicks = 0;
    elapsedSeconds = 0;

    energy = 0;
    heat = 0;

    phase = 1; // pre/post big bang is 1/2

    // Photons
    photonCount = 0;
    energyPerPhoton = 0.5;

    // Machines - hash of machine name against a hash of machine properties
    machines = {};

    // Research - hash of project name against science gained and complete status
    research = {};
    currentResearchProject: string = null;
}
