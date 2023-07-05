import type {TerrainType} from "./terrainType";

export class HexField {
    public x: number;
    public y: number;
    public h: number;
    public terrainType: TerrainType;
    public temperature: number;
    constructor(x: number, y: number, h: number, terrainType: TerrainType, temperature: number) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.temperature = temperature;
        this.terrainType = terrainType;
    }
}