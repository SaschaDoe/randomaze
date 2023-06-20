export class SeededNoise {
    private seed: number;
    private MT: any[];
    private index: number;
    constructor(seed = 0) {
        this.seed = seed;
        this.MT = this.initGenerator(seed);
        this.index = 625;
    }

    initGenerator(seed) {
        const MT = new Array(624);
        MT[0] = seed >>> 0;
        for (let i = 1; i < 624; i++) {
            MT[i] = ((1812433253 * (MT[i - 1] ^ (MT[i - 1] >>> 30)) + i) >>> 0);
        }
        return MT;
    }

    generateNumbers() {
        for (let i = 0; i < 624; i++) {
            let y = (this.MT[i] & 0x80000000) >>> 0;
            y += (this.MT[(i + 1) % 624] & 0x7fffffff) >>> 0;
            this.MT[i] = this.MT[(i + 397) % 624] ^ (y >>> 1);
            if (y % 2 !== 0) {
                this.MT[i] = this.MT[i] ^ 0x9908b0df;
            }
        }
    }

    random() {
        if (this.index >= 624) {
            this.generateNumbers();
            this.index = 0;
        }
        let y = this.MT[this.index++];
        y = y ^ (y >>> 11);
        y = y ^ ((y << 7) & 0x9d2c5680);
        y = y ^ ((y << 15) & 0xefc60000);
        y = y ^ (y >>> 18);
        return y >>> 0;
    }

    noise(x, y, z) {
        // Use the seeded pseudorandom number generator to get a value
        const val = this.random() / 0xFFFFFFFF;
        return val * 2 - 1;
    }
}
