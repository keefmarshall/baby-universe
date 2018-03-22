import { UUID } from 'angular2-uuid';

export class Universe {
    id = UUID.UUID();

    // Globals
    elapsedTicks = 0;
    elapsedSeconds = 0;

    energy = 0;
    heat = 0;

    particles = {};
    antiparticles = {};

    phase = 0.5; // pre/post big bang is 1/2, interstitials on .5

    // Photons
    photonCount = 0;
    energyPerPhoton = 0.5;

    // Machines - hash of machine name against a hash of machine properties
    machines = {};
    currentConstructionProject: string = null;
    currentConstructionWork: number = 0;

    // Research - hash of project name against science gained and complete status
    research = {};
    currentResearchProject: string = null;

    // Log
    logs = ["Within the empty void, matter and energy spontaneously " +
            "flash into existence, only to decay almost instantly. "];
    newLogs = 0;

    release = 0.320;

    supervisorMessageSeen = false;
    phase2MessageSeen = false;

    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    // PHASE TWO

    contrivances: { [key: string]: any } = {};
}
