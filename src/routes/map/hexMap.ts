import {HexField} from "./hexField";

export class HexMap{
    private width: number = 1;
    private height: number = 1;
    public hexesAsArray: HexField[] = [];

    withWidth(width: number): HexMap {
        this.width = width;
        return this;
    }

    withHeight(height: number): HexMap {
        this.height = height;
        return this;
    }

    generate() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++){
                let hexField = new HexField(x, y, 0, 0, 0, 0);
                this.hexesAsArray.push(hexField);
            }
        }
    }
}