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
    public readonly hexSize: number;
    private readonly spacing: number;

    constructor(ctx: CanvasRenderingContext2D, hexSize: number = 64, spacing: number = 0) {
        this.ctx = ctx;
        this.hexSize = hexSize;
        this.spacing = spacing;
    }

    getCanvasWidth(columns: number): number {
        const horizDist = this.hexSize + this.spacing+(1/3)*this.hexSize+11;
        return columns * horizDist + this.hexSize/2; // Add an extra half hexSize to accommodate the staggered rows
    }

    getCanvasHeight(rows: number): number {
        const vertDist = (1/2)* this.hexSize + this.spacing;
        return rows * vertDist + this.hexSize; // Add an extra hexSize to accommodate the top and bottom rows
    }

    drawHexMap(rows: number, columns: number, imgSrc: string): Hex[] {
        const img = new Image();
        let hexes : Hex[] = [];
        img.onload = () => {
            const horizDist = this.hexSize + this.spacing + (1/3) * this.hexSize + 10;
            const vertDist = (1/2) * this.hexSize + this.spacing;
            let counter = 0;
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < columns; j++) {
                    const x = j * horizDist + ((i % 2 === 0) ? 0 : horizDist / 2);
                    const y = i * vertDist + 20;

                    this.ctx.drawImage(img, x, y, this.hexSize, this.hexSize);

                    hexes.push(new Hex(counter, x, y, this.hexSize, this.hexSize, i, j))
                    counter++;
                }
            }
        };
        img.src = imgSrc;

        return hexes;
    }

}