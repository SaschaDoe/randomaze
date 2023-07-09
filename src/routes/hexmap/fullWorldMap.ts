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
}