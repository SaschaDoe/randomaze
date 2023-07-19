import {HexField} from "./hexField";
import {TerrainType} from "../hexmap/domain/terrainType";

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

    compress(compressFactor: number) {
        let compressedHexMap = new HexMap();
        //TODO
        return compressedHexMap;
    }

    withHexFields(hexFields: HexField[][]) {
        for(let i = 0; i < hexFields.length; i++) {
            for (let j = 0; j < hexFields[i].length; j++) {
                let hexField = hexFields[i][j];
                hexField.x = i;
                hexField.y = j;

            }
        }
        this.hexesAsArray = hexFields.map((hexField) => hexField).flat();
        return this;
    }
}