import type {Planet} from "../celestialBody/Planet";
import {WorldMap} from "./WorldMap";
import {makeNoise2D} from "open-simplex-noise";
import {Dice} from "../../tables/Dice";

export class WorldMapCreator {
    private static DEFAULT_WIDTH = 50;
    private static DEFAULT_HEIGHT = 50;
    private static DEFAULT_NOISE_SCALE = 3.0;
    private static DEFAULT_ELEVATION_SCALE = 7;

    static create(planet: Planet, dice = new Dice(), width = WorldMapCreator.DEFAULT_WIDTH, height = WorldMapCreator.DEFAULT_HEIGHT) {
        const worldMap = new WorldMap();

        worldMap.seed = dice.roll(65536);
        worldMap.map = this.createMap(planet, width, height, worldMap.seed);

        planet.worldMap = worldMap;

        return worldMap;
    }

    private static createMap(planet: Planet, width: number, height: number, seed: number) {
        const map: number[][] = [];
        const noise2D = makeNoise2D(seed);

        for (let i = 0; i < width; i++) {
            map[i] = [];
            for (let j = 0; j < height; j++) {
                map[i][j] = this.calculateElevation(i, j, width, height, noise2D);
            }
        }

        return map;
    }

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
}
