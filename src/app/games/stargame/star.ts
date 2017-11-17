export class Star {
    type: string;
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
    difficulty = Math.random() / 4 + .3; // .3 -> .55
    points = 3;
}

export class DownQuarkStar extends Star {
    type = "down quark";
    difficulty = Math.random() / 4 + .3; // .3 -> .55
    points = 4;
    radiusFactor = 1.1;
}

export class StrangeQuarkStar extends Star {
    type = "strange quark";
    difficulty = Math.random() / 4 + .2; // .2 -> .45
    points = 5;
    radiusFactor = 1.5;
}

export class CharmQuarkStar extends Star {
    type = "charm quark";
    difficulty = Math.random() / 4 + .2; // .2 -> .45
    points = 6;
    radiusFactor = 1.5;
}
