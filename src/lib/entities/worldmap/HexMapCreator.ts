import type { Planet } from "../celestialBody/Planet";

import { makeNoise2D } from "open-simplex-noise";
import { Dice } from "../../tables/Dice";
import {HexGrid, setFieldTerrain} from "./Hex";
import {WorldMap} from "./WorldMap";

export class HexMapCreator {
    private static DEFAULT_WIDTH = 50;
    private static DEFAULT_HEIGHT = 50;
    private static DEFAULT_NOISE_SCALE = 4.0;
    private static DEFAULT_ELEVATION_SCALE = 5;

    static create(planet: Planet,
                  dice = new Dice(),
                  width = HexMapCreator.DEFAULT_WIDTH,
                  height = HexMapCreator.DEFAULT_HEIGHT,
                  noiseScale = HexMapCreator.DEFAULT_NOISE_SCALE,
                  elevationScale = HexMapCreator.DEFAULT_ELEVATION_SCALE) {
        const worldMap = new WorldMap();

        worldMap.seed = dice.roll(65536);
        worldMap.hex = this.createMap(planet, width, height, worldMap.seed, noiseScale, elevationScale);

        planet.worldMap = worldMap;

        return worldMap;
    }

    // Make sure to add noiseScale and elevationScale parameters here too
    private static createMap(planet: Planet, width: number, height: number, seed: number, noiseScale: number, elevationScale: number) {
        const hexGrid: HexGrid = new HexGrid(width, height);
        const noise2D = makeNoise2D(seed);
        const continentNoise2D = makeNoise2D(seed + 1);

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                let elevation = this.calculateElevation(i, j, width, height, noise2D, continentNoise2D, noiseScale, elevationScale);
                setFieldTerrain(hexGrid, i, j, elevation);
            }
        }

        return hexGrid;
    }
/* TODO for islands
    private static calculateElevation(i: number, j: number, width: number, height: number, noise2D: (x: number, y: number) => number) {
        let nx = i / width * 2 - 1;
        let ny = j / height * 2 - 1;

        let distanceToCenter = Math.sqrt(nx * nx + ny * ny);
        let islandFactor = Math.pow(1 - Math.min(1, distanceToCenter), 0.8);

        let elevation = noise2D(nx * this.DEFAULT_NOISE_SCALE, ny * this.DEFAULT_NOISE_SCALE);
        elevation = (elevation + 1) / 2;
        elevation = Math.floor(elevation * islandFactor * this.DEFAULT_ELEVATION_SCALE);

        return elevation;
    }
    */

    private static calculateElevation(
        i: number, j: number,
        width: number, height: number,
        noise2D: (x: number, y: number) => number, continentNoise2D: (x: number, y: number) => number,
        noiseScale: number = this.DEFAULT_NOISE_SCALE, elevationScale: number = this.DEFAULT_ELEVATION_SCALE) {
        //make it more likely to have low elevation on right and left border
        let continentFactor = Math.pow(1 - Math.abs(i / width * 2 - 1), 0.5);

        let nx = i / width * 2 - 1;
        let ny = j / height * 2 - 1;

        let elevation = noise2D(nx * noiseScale, ny * noiseScale) * continentFactor;

        elevation = (elevation + 1) / 2;
        elevation = Math.floor(elevation * elevationScale);

        //When left or right border than elevation is 0
        if (i === 0 || i === width - 1) {
            elevation = 0;
        }

        //when top or bottom border than elevation is 1
        if (j === 0 || j === height - 1) {
            elevation = 3;
        }else if(j === 1 || j === height - 2){
            let isLand = Math.random() > 0.5;
            if(isLand){
                elevation = 3;
            }
        }

        return elevation;
    }







}
