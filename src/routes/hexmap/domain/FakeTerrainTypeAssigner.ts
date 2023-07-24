import {TerrainType} from "./terrainType";
import type {WorldElement} from "./worldElement";
import {TerrainTypeAssigner} from "./terrainTypeAssigner";

export class FakeTerrainTypeAssigner extends TerrainTypeAssigner {
    private terrainType: TerrainType = TerrainType.Water;

    withOnlyTerrainType(terrainType: TerrainType) {
        this.terrainType = terrainType;
        return this;
    }

    assign(worldElement: WorldElement): TerrainType {
        return this.terrainType;
    }
}