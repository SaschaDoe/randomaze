import {createNoise2D} from "simplex-noise";
import {HexField} from "./hexField";
import {Dice} from "../../lib/tables/Dice";
import {TerrainType} from "./terrainType";

export class MapCreator {

    continentalFrequency = 300;
    baseLevel = 0.25;
    islandWeight = 2;
    randomIslandWeight = 0.008;

    baseTemperature = 0;
    private dice: Dice = new Dice();
    private temperatureVariance: number = 1;
    private desertFrequency: number = 200;

    generateTerrain(width: number = 1300, height: number = 600, dice?: Dice){
        if(dice){
            this.dice = dice;
        }

        let continentalSimplex = createNoise2D();
        let islandSimplex = createNoise2D();
        let desertSimplex = createNoise2D();

        let terrain = [];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let h = 0;
                let continentalHeight =
                    continentalSimplex(x / this.continentalFrequency, y / this.continentalFrequency)
                    + this.baseLevel;

                let randomMinusOrPlusOne = this.dice.rollRandom() < 0.5 ? -1 : 1;
                let islandHeight = this.islandWeight *
                    randomMinusOrPlusOne *
                    islandSimplex(x / 10, y / 10) * 0.1 + 0.1;

                let randomAltered = this.randomIslandWeight > Math.random();

                let edge = this.edgeFunction(x);

                h = edge * continentalHeight +  islandHeight;

                if(randomAltered && h < 0.1){
                    let randomAlteration = 0.3 * this.dice.rollRandom() + 0.6;
                    h += randomAlteration;
                }

                //make sure every field in the left and right border that is 2 fields away from the top and bottom border is a smaller h than 0.4
                if ((x < 2 || x > width - 3) && (y > 2 && y < height - 3 && h > 0.4)) {
                    h = Math.random() * 0.39;
                }

                let poleSize = 3;
                h = this.addPoles(y, height, poleSize, h);
                let temperature = this.getTemperature(y, height);
                let desertHeight = this.getDesertProbability(h, temperature, desertSimplex, x, y);

                let terrainType = this.getTerrainType(h, desertHeight, temperature);

                // Temperature decreases as you move away from the center of the map.
                // On the poles it should be -10 in the middle should be 30


                let hexField = new HexField(x, y, h, terrainType, temperature);
                terrain.push(hexField);
            }
        }
        return terrain;
    }


    private getDesertProbability(h: number, temperature: number, desertSimplex: (x: number, y: number) => number, x: number, y: number) {
        let desertHeight = 0;
        if (h > 0.4 && h < 0.75 && temperature > 0) {
            // should be around 0.5 and 2 depending on temperature
            let temperatureModifier = 1 + (temperature - 25) / 50;
            desertHeight = desertSimplex(x / (this.desertFrequency * temperatureModifier), y / (this.desertFrequency * temperatureModifier));
        }
        return desertHeight;
    }

    public getTemperature(y: number, height: number) {
        let middleTemperature = 25;
        let poleTemperature = -10;
        let baseRate = (middleTemperature - poleTemperature) / (height / 2);

        let tempDifference = Math.abs(y - height / 2) * baseRate;
        //south has greater steps than north
        if(y > height - 20){
            tempDifference += 3;
        }

        let variance = this.dice.rollRandom() * this.temperatureVariance;
        return middleTemperature - tempDifference - variance + this.baseTemperature;
    }

    private addPoles(y: number, height: number, poleSize: number, h: number) {
        //Steps nessary because y is not a linear function
        let steps = [1, 5, 15]
        let initialProbability = 1;
        for (let i = 0; i < poleSize; i++) {
            let step = steps[i];
            let probability = initialProbability * Math.pow(0.7, i);
            let random = this.dice.rollRandom();
            //south has greater steps than north
            if ((y <= step || y >= height - 5 - step) && h < 0.4 && random < probability) {
                h = this.dice.rollRandom() * 0.4 + 0.4;
                break;
            }
        }
        return h;
    }



    edgeFunction(x: number) {
        return Math.sin(Math.PI * x / 1000);
    }

    getTerrainType(h: number, dryness: number, temperature: number): TerrainType {
        if (h < 0.4) {
            return TerrainType.Water;
        } else if (h < 0.75) {
            if(temperature < -8){
                return TerrainType.Snow;
            }
            if(temperature < -5){
                return TerrainType.Tundra;
            }
            if(temperature > 10 && dryness < -0.4){
                return TerrainType.Djungle;
            }
            if(temperature > 10 && dryness > 0.5){
                return TerrainType.Desert;
            }
            if(temperature > 10){
                return TerrainType.Plains;
            }else{
                return TerrainType.Grass;
            }
        } else if (h < 0.9) {
            if(temperature < -8){
                return TerrainType.Snow;
            }
            return dryness > 0.5 ? TerrainType.Desert : TerrainType.Hills;
        } else {
            return TerrainType.Mountain;
        }
    }

    WithTemperatureVariance(temperatureVariance: number) {
        this.temperatureVariance = temperatureVariance;
        return this;
    }

    WithBaseTemperature(baseTemperature: number) {
        this.baseTemperature = baseTemperature;
        return this;
    }

    WithContinentalFrequency(continentalFrequency: number) {
        this.continentalFrequency = continentalFrequency;
        return this;
    }

    WithBaseLevel(baseLevel: number) {
        this.baseLevel = baseLevel;
        return this;
    }

    WithIslandWeight(islandWeight: number) {
        this.islandWeight = islandWeight;
        return this;
    }

    WithRandomIslandWeight(randomIslandWeight: number) {
        this.randomIslandWeight = randomIslandWeight;
        return this;
    }

    WithDesertFrequency(desertFrequency: number) {
        this.desertFrequency = desertFrequency;
        return this;
    }
}
