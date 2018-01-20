export class NumberFormatter {

    // https://www.unc.edu/~rowlett/units/prefixes.html
    private readonly SI_PREFIXES = ["", "k", "M", "G", "T", "P", "E", "Z", "Y"];

    // https://simple.wikipedia.org/wiki/Names_for_large_numbers
    private readonly NUMERICAL = ["", "thousand", "million", "billion", "trillion", "quadrillion", 
        "quintillion", "sextillion", "septillion", "octillion", "nonillion",
        "decillion", "undecillion", "duodecillion", "tredecillion", "quattordecillion",
        "quindeciilion", "sexdecillion", "septendecillion", "octodecillion", "novemdecillion",
        "vigintillion"];

    private readonly TYPES = {
        "SI": this.SI_PREFIXES,
        "NUM": this.NUMERICAL
    };

    // adapted from https://stackoverflow.com/a/40724354
    abbreviateNumber(num: number, precision = 4, lowfixed = false, type = "SI", skipFirst = false, integer = false) {
        const prefixes = this.TYPES[type];

        if (!prefixes) {
            throw new Error("Unsupported prefix type: " + type);
        }

        // what tier? (determines SI prefix)
        let tier = Math.log10(Math.abs(num)) / 3 | 0;

        if (tier >= prefixes.length) {
            tier = prefixes.length - 1;
        }

        // Sometimes we don't want e.g. 1.1k, but 1,100.
        if (tier === 1 && skipFirst) {
            tier = 0;
        }

        // get prefix 
        const prefix = prefixes[tier];

        // get scale
        const scale = Math.pow(10, tier * 3);

        // scale the number
        const scaled = num / scale;

        if (lowfixed && precision > 2) {
            var abs = Math.abs(num);
            if (abs < 1 && abs >= 0.1) {
                precision = 1;
            }
            else if (abs >= 1 && abs < 10) {
                precision = 2;
            }
            else if (abs >= 10 && abs < 100) {
                precision = 3;
            }
        }

        // format number and add prefix as suffix
        //return scaled.toFixed(1) + prefix;
        let prec = scaled.toPrecision(precision);
        if (integer && tier === 0) {
            prec = scaled.toFixed(0);
        }
        
        return (scaled > 999 ? this.numberWithCommas(parseFloat(prec)) : prec) + " " + prefix;
    }

    // https://stackoverflow.com/a/2901298
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

}
