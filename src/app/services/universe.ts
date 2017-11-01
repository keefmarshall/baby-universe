export class Universe {
    // Globals
    elapsedTicks = 0;
    elapsedSeconds = 0;

    energy = 0;

    // Photons
    photonCount = 0;
    energyPerPhoton = 0.5;

    // Machines - hash of machine name against a hash of machine properties
    machines = {};

    // Research - hash of project name against science gained and complete status
    research = {};
    currentResearchProject: string = null;
}
