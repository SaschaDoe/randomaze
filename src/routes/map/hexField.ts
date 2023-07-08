import type {TerrainType} from "../worldmap/hex/terrainType";

export class HexField {
    public x: number;
    public y: number;
    public h: number;
    public terrainType: TerrainType;
    public temperature: number;
    public dryness: number;
    constructor(x: number, y: number, h: number, terrainType: TerrainType, temperature: number, dryness: number) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.temperature = temperature;
        this.terrainType = terrainType;
        this.dryness = dryness;
    }

    public getNeighbors(x: number, y: number, width: number, height: number, terrain: HexField[]): HexField[] {
        let neighbors: HexField[] = [];
        let dx: number[] = [-1, 0, 1, 1, 0, -1];
        let dy: number[] = [-1, -1, 0, 1, 1, 0];

        for (let i = 0; i < 6; i++) {
            let nx = x + dx[i];
            let ny = y + dy[i];

            // Adjust for map wraparound on the x-axis
            if (nx < 0) nx += width;
            if (nx >= width) nx -= width;

            // Ignore out-of-bounds y-coordinates
            if (ny < 0 || ny >= height) continue;

            let index = ny * width + nx;
            neighbors.push(terrain[index]);
        }

        return neighbors;
    }





}
