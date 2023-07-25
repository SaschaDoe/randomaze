import {WorldElement} from "./worldElement";
import {TerrainTypeAssigner} from "./terrainTypeAssigner";
import {WorldMapPart} from "./worldMapPart";

export class FullWorldMap {
    private width = 0;
    private height = 0;
    public elements: WorldElement[][] = [];
    private terrainTypeAssigner: TerrainTypeAssigner;

    constructor() {
        this.terrainTypeAssigner = new TerrainTypeAssigner().withSeed(100);
    }

    getWidth()  {
        return this.width;
    }

    getHeight()  {
        return this.height;
    }

    withWidth(width: number) {
        this.width = width;
        return this;
    }

    withHeight(height: number) {
        this.height = height;
        return this;
    }

    withTerrainTypeAssigner(terrainTypeAssigner: TerrainTypeAssigner) {
        if(!terrainTypeAssigner) throw new Error("terrainTypeAssigner is required");
        this.terrainTypeAssigner = terrainTypeAssigner;
        return this;
    }

    generate() {
        console.time("generation completed in");
        this.elements = new Array(this.height).fill(null).map(() => new Array(this.width).fill(null));
        for(let y = 0; y < this.height; y++){
            for(let x = 0; x < this.width; x++){
                this.elements[y][x] = new WorldElement()
                    .withLocation(x, y)
                    .withTerrainType(this.terrainTypeAssigner.getTerrainTypeAt(x, y));
            }
        }
        console.timeEnd("generation completed in");
        return this;
    }

    getBlock(xStart: number, yStart: number, width: number, height: number) {
        const block: WorldElement[] = [];
        const xLimit = Math.min(this.width, xStart + width);
        const yLimit = Math.min(this.height, yStart + height);

        for(let y = yStart; y < yLimit; y++){
            for(let x = xStart; x < xLimit; x++){
                block.push(this.elements[y][x]);
            }
        }

        return new WorldMapPart().withElements(block);
    }
}
