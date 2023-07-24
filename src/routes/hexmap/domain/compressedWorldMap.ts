import {WorldElement} from "./worldElement";
import {FullWorldMap} from "./fullWorldMap";
import {TerrainType} from "./terrainType";

export class CompressedWorldMap {
    elements: WorldElement[] = [];
    private compressFactor: number = 1;
    private fullWorldMap: FullWorldMap = new FullWorldMap();

    of(fullWorldMap: FullWorldMap) {
        this.fullWorldMap = fullWorldMap;
        return this;
    }

    withCompressFactor(compressFactor: number) {
        this.compressFactor = compressFactor;

        return this;
    }

    compress() {
        const compressedWorldElements: WorldElement[] = [];
        let currentY = 0;
        let currentX = 0;
        for (let y = 0; y < this.fullWorldMap.getHeight(); y += this.compressFactor) {
            for (let x = 0; x < this.fullWorldMap.getWidth(); x += this.compressFactor) {
                let block = this.fullWorldMap.getBlock(x, y, this.compressFactor, this.compressFactor);
                let dominantTerrainType = block.getDominantTerrainType();

                let element = new WorldElement()
                    .withLocation(currentX, currentY)
                    .withTerrainType(dominantTerrainType);

                compressedWorldElements.push(element);
                currentX++;
            }
            currentX = 0;
            currentY++;
        }

        this.elements = compressedWorldElements
        return this;
    }
}