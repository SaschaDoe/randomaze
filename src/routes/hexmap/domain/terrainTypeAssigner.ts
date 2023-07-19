import type {WorldElement} from "./worldElement";
import {TerrainType} from "./terrainType";

export class TerrainTypeAssigner {

    getTerrainTypeAt(x: number, y: number) {
        return TerrainType.Water;
    }
}