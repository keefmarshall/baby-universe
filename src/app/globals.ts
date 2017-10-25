export class Globals {
    static secondsPerTick = 0.1;

    static round(number, precision) {
        const factor = Math.pow(10, precision);
        const tempNumber = number * factor;
        const roundedTempNumber = Math.round(tempNumber);
        return roundedTempNumber / factor;
    };
}
