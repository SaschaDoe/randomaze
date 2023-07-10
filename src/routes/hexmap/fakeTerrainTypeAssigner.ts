import {TerrainTypeAssigner} from "./terrainTypeAssigner";
import {TerrainType} from "./terrainType";
import type {WorldElement} from "./worldElement";

export class FakeTerrainTypeAssigner extends TerrainTypeAssigner {
    private terrainType: TerrainType = TerrainType.Water;

    withOnlyTerrainType(terrainType: TerrainType): TerrainTypeAssigner {
        this.terrainType = terrainType;
        return this;
    }

    getTerrainTypeAt(x: number, y: number) {
        return this.terrainType;
    }


}