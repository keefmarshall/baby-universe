export class Star {
    type: string;
    code: string;
    captured = false;

    difficulty: number;
    points: number;
    pointiness: number = 0.8 - (Math.random() * 0.3);
    colour: string = this.randomColour();
    radiusFactor: number = 1.0;

    randomColour(): string {
        let colour = "DeepSkyBlue";
        switch (Math.round(Math.random() * 3)) {
            case 0: 
                colour = "DeepSkyBlue";
                break;
            case 1:
                colour = "LawnGreen";
                break;
            case 2:
                colour = "OrangeRed";
                break;
        }

        return colour;
    }
}

export class UpQuarkStar extends Star {
    type = "up quark";
    code = "u";
    difficulty = Math.random() / 3 + .45; // .45 -> .78
    points = 3;
    pointiness = 0.7 - (Math.random() * 0.25);
}

export class DownQuarkStar extends Star {
    type = "down quark";
    code = "d";
    difficulty = Math.random() / 4 + .45; // .45 -> .70
    points = 4;
    radiusFactor = 1.1;
}

export class StrangeQuarkStar extends Star {
    type = "strange quark";
    code = "s";
    difficulty = Math.random() / 3 + .3; // .3 -> .63
    points = 5;
    radiusFactor = 1.5;
}

export class CharmQuarkStar extends Star {
    type = "charm quark";
    code = "c";
    difficulty = Math.random() / 4 + .3; // .3 -> .55
    points = 6;
    radiusFactor = 1.6; // more points seems to make it harder to catch
}

// In reality top quarks are orders of magnitude more massive than the others
// but we're a bit limited here by the relative sizes in the detector!
export class TopQuarkStar extends Star {
    type = "top quark";
    code = "t";
    difficulty = Math.random() / 4 + .15; // .15 -> .40
    points = 8;
    radiusFactor = 2.5;
}

export class BottomQuarkStar extends Star {
    type = "bottom quark";
    code = "b";
    difficulty = Math.random() / 4 + .2; // .2 -> .45
    points = 7;
    radiusFactor = 2;
}
