abstract class Planet {
    baseDryness = 0;
    waterLevel = 0.4;
    baseLevel = 0.25;
    baseTemperature = 0;
    desertFrequency = 200;
    continentalFrequency = 300;
    islandWeight = 2;
    randomIslandWeight = 0.008;
    currentPlanetType = 'earthlike';
    [key: string]: any;


    protected constructor(variance: number) {
        this.applyVariance(variance);
    }

    private applyVariance(variance: number) {
        for (let key of Object.keys(this)) {
            if (typeof this[key] === "number") {
                let min = this[key] - (this[key] * (variance/100));
                let max = this[key] + (this[key] * (variance/100));
                this[key] = Math.random() * (max - min) + min;
            }
        }
    }
}

 export class OceanPlanet extends Planet {
    constructor(variance: number) {
        super(variance);
        this.baseDryness = -1;
        this.waterLevel = 0.4;
        this.baseLevel = -0.3;
        this.baseTemperature = 20;
        this.desertFrequency = 800;
        this.continentalFrequency = 0;
        this.islandWeight = 5;
        this.randomIslandWeight = 0.05;
        this.currentPlanetType = 'ocean';
    }
}

export class EarthLikePlanet extends Planet {
    constructor(variance: number) {
        super(variance);
        this.baseDryness = 0;
        this.waterLevel = 0.4;
        this.baseLevel = 0.25;
        this.baseTemperature = 0;
        this.desertFrequency = 200;
        this.continentalFrequency = 300;
        this.islandWeight = 2;
        this.randomIslandWeight = 0.008;
        this.currentPlanetType = 'earthlike';
    }
}

export class DesertPlanet extends Planet {
    constructor(variance: number) {
        super(variance);
        this.baseDryness = 0.9;
        this.waterLevel = 0.0;
        this.baseLevel = 0.4;
        this.baseTemperature = 30;
        this.desertFrequency = 500;
        this.continentalFrequency = 300;
        this.islandWeight = 1.5;
        this.randomIslandWeight = 0.005;
        this.currentPlanetType = 'desert';
    }
}

export class IcePlanet extends Planet {
    constructor(variance: number) {
        super(variance);
        this.baseDryness = 0;
        this.waterLevel = 0.1;
        this.baseLevel = 0.25;
        this.baseTemperature = -25;
        this.desertFrequency = 600;
        this.continentalFrequency = 200;
        this.islandWeight = 2;
        this.randomIslandWeight = 0.008;
        this.currentPlanetType = 'ice';
    }
}

export class JunglePlanet extends Planet {
    constructor(variance: number) {
        super(variance);
        this.baseDryness = -1;
        this.waterLevel = 0.4;
        this.baseLevel = 0.25;
        this.baseTemperature = 40;
        this.desertFrequency = 300;
        this.continentalFrequency = 300;
        this.islandWeight = 3;
        this.randomIslandWeight = 0.015;
        this.currentPlanetType = 'jungle';
    }
}

export class LavaPlanet extends Planet {
    constructor(variance: number) {
        super(variance);
        this.baseDryness = 1;
        this.waterLevel = -0.1;
        this.baseLevel = 0.25;
        this.baseTemperature = 100;
        this.desertFrequency = 300;
        this.continentalFrequency = 300;
        this.islandWeight = 3;
        this.randomIslandWeight = 0.015;
        this.currentPlanetType = 'lava';
    }
}
export class RockyPlanet extends Planet {
    constructor(variance: number) {
        super(variance);
        this.baseDryness = 1;
        this.waterLevel = -0.1;
        this.baseLevel = 0.6;
        this.baseTemperature = 90;
        this.desertFrequency = 0;
        this.continentalFrequency = 300;
        this.islandWeight = 3;
        this.randomIslandWeight = 0.015;
        this.currentPlanetType = 'rocky';
    }
}
