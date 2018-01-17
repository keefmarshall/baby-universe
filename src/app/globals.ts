export class Globals {
    static secondsPerTick = 0.1;

    static readonly boltzmann = 8.617e-11; // MeV per K (8.617e-5eV/K)

    static round(number, precision = 10) {
        const factor = Math.pow(10, precision);
        const tempNumber = number * factor;
        const roundedTempNumber = Math.round(tempNumber);
        return roundedTempNumber / factor;
    };

    static geometricProgressionSum(start, end, r): number {
        // sum of ar^k for k = m -> n
        // a(r^m - r^(n+1)) / 1 - r

        // assume a is '1' for now:
        return (Math.pow(r, start) - Math.pow(r, end + 1))/ (1 - r);
    }

}
