import type {TerrainType} from "../domain/terrainType";
import type {WorldElement} from "../domain/worldElement";

export class Hex {

    id = 0;
    x = 0;
    y = 0;
    width = 0;
    height = 0
    j = 0;
    i = 0;

    constructor(id: number, x: number, y: number, width: number, height: number, i: number, j: number) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.j = j;
        this.i = i;
    }
}

export default class CanvasHexmapRenderer {
    private ctx: CanvasRenderingContext2D;
    public hexSize: number;
    private readonly spacing: number;

    constructor(ctx: CanvasRenderingContext2D, hexSize: number = 64, spacing: number = 0) {
        this.ctx = ctx;
        this.hexSize = hexSize;
        this.spacing = spacing;
    }

    withHexSize(hexSize: number) {
        this.hexSize = hexSize;
        return this;
    }

    getCanvasWidth(columns: number): number {
        const horizDist = this.hexSize + this.spacing+(1/3)*this.hexSize+11;
        return columns * horizDist + this.hexSize/2; // Add an extra half hexSize to accommodate the staggered rows
    }

    getCanvasHeight(rows: number): number {
        const vertDist = (1/2)* this.hexSize + this.spacing;
        return rows * vertDist + this.hexSize; // Add an extra hexSize to accommodate the top and bottom rows
    }
    drawHexMapFrom(worldElements: WorldElement[], images: Record<TerrainType, HTMLImageElement>): Hex[] {
        let hexes : Hex[] = [];
        const horizDist = this.hexSize + this.spacing + (1/3) * this.hexSize + 10;
        const vertDist = (1/2) * this.hexSize + this.spacing;
        let counter = 0;
        for (let worldElement of worldElements) {
            const {x, y, terrainType} = worldElement;
            const img = images[terrainType];
            const posX = x * horizDist + ((y % 2 === 0) ? 0 : horizDist / 2);
            const posY = y * vertDist + 20;

            this.ctx.drawImage(img, posX, posY, this.hexSize, this.hexSize);

            hexes.push(new Hex(counter, posX, posY, this.hexSize, this.hexSize, x, y));
            counter++;
        }
        return hexes;
    }

}