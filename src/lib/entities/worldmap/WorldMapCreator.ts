import type {Planet} from "../celestialBody/Planet";
import {WorldMap} from "./WorldMap";
import {makeNoise2D} from "open-simplex-noise";
import {Dice} from "../../tables/Dice";

export class WorldMapCreator{

    static create(planet: Planet, dice?: Dice){
        if(!dice) {
            dice = new Dice();
        }
        let worldMap = new WorldMap();

        let width = 50;
        let height = 50;
        worldMap.seed = dice.roll(65536);
        worldMap.map = this.createMap(planet, width, height, worldMap.seed);

        planet.worldMap = worldMap;
        
        return worldMap;
    }


    private static createMap(planet: Planet, width: number, height: number, seed: number) {
        let map : number[][] = [];
        let noiseScale = 2.0;
        let elevationScale = 5;

        // Create Simplex noise generator
        const noise2D = makeNoise2D(seed);

        let edgeFade = 0.4; // Determines how quickly the land fades to water at the map edges. Lower values mean larger landmass

        for (let i = 0; i < width; i++) {
            map[i] = [];
            for (let j = 0; j < height; j++) {
                let nx = i / width * 2 - 1, ny = j / height * 2 - 1;

                let distanceToCenter = Math.sqrt(nx * nx + ny * ny);
                let islandFactor = Math.pow(Math.max(0, 1 - edgeFade * distanceToCenter), 2); // Calculate the island factor

                let elevation = noise2D(nx * noiseScale, ny * noiseScale);
                elevation = Math.abs(elevation);
                elevation = Math.floor(elevation * islandFactor * elevationScale);

                map[i][j] = elevation;
            }
        }

        return map;
    }

}