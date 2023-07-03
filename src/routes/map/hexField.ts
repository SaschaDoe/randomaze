import type {TerrainType} from "./terrainType";

export class HexField {
    public x: number;
    public y: number;
    public h: number;
    public terrainType: TerrainType;
    constructor(x: number, y: number, h: number, terrainType: TerrainType) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.terrainType = terrainType;
    }
}