import {createNoise2D} from "simplex-noise";
import {HexField} from "./hexField";
import {Dice} from "../../lib/tables/Dice";
import {TerrainType} from "./terrainType";

export class MapCreator {

    continentalFrequency = 300;
    baseLevel = 0.25;
    islandWeight = 2;
    randomIslandWeight = 0.008;

    generateTerrain(width: number = 1300, height: number = 600, dice?: Dice) {
        if(!dice){
            dice = new Dice();
        }
        let continentalSimplex = createNoise2D();
        let islandSimplex = createNoise2D();

        let terrain = [];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let h = 0;
                let continentalHeight =
                    continentalSimplex(x / this.continentalFrequency, y / this.continentalFrequency)
                    + this.baseLevel;

                let randomMinusOrPlusOne = dice.rollRandom() < 0.5 ? -1 : 1;
                let islandHeight = this.islandWeight *
                    randomMinusOrPlusOne *
                    islandSimplex(x / 10, y / 10) * 0.1 + 0.1;

                let randomAltered = this.randomIslandWeight > Math.random();

                let edge = this.edgeFunction(x);

                h = edge * continentalHeight +  islandHeight;

                if(randomAltered && h < 0.1){
                    let randomAlteration = 0.3 * dice?.rollRandom() + 0.6;
                    h += randomAlteration;
                }

                //make sure every field in the left and right border that is 2 fields away from the top and bottom border is a smaller h than 0.4
                if ((x < 2 || x > width - 3) && (y > 2 && y < height - 3 && h > 0.4)) {
                    h = Math.random() * 0.39;
                }

                let terrainType = this.getTerrainType(h);
                let hexField = new HexField(x, y, h, terrainType);
                terrain.push(hexField);
            }
        }
        return terrain;
    }

    edgeFunction(x: number) {
        return Math.sin(Math.PI * x / 1000);
    }

    getTerrainType(h: number): TerrainType {
        if (h < 0.4) {
            return TerrainType.Water;
        } else if (h < 0.75) {
            return TerrainType.Grass;
        } else if (h < 0.9) {
            return TerrainType.Plain;
        } else {
            return TerrainType.Mountain;
        }
    }
}
