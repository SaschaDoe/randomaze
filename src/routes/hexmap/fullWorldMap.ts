import {WorldElement} from "./worldElement";

export class FullWorldMap {
    private width = 0;
    private height = 0;
    public elements: WorldElement[] = [];

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

    generate() {
        for(let y = 0; y < this.height; y++){
            for(let x = 0; x < this.width; x++){
                this.elements.push(new WorldElement().withLocation(x,y));
            }
        }
    }

    getBlock(xStart: number, yStart: number, width: number, height: number) {
        const block: WorldElement[] = [];
        const xLimit = Math.min(this.width, xStart + width);
        const yLimit = Math.min(this.height, yStart + height);

        for(let y = yStart; y < yLimit; y++){
            for(let x = xStart; x < xLimit; x++){
                let element = this.elements.filter(element => element.x === x && element.y === y)[0];
                block.push(element);
            }
        }
        return block;
    }
}