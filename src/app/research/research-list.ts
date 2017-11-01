import { LightEngineering } from "app/research/light-engineering";
import { LightMechanics } from "app/research/light-mechanics";

export class ResearchList {
    public static projects = {
        'Light Mechanics': new LightMechanics(),
        'Light Engineering': new LightEngineering()
    };
}
