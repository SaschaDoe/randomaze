import {describe} from "vitest";
import {FullWorldMap} from "./fullWorldMap";
import type {WorldElement} from "./worldElement";
import {TerrainType} from "./terrainType";

class CompressedWorldMap {
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
        const fullWorldElements = this.fullWorldMap.elements; // Assuming getElements() gives all elements in the fullWorldMap
        const compressedWorldElements: WorldElement[] = [];

        for (let i = 0; i < fullWorldElements.length; i += this.compressFactor * this.compressFactor) {
            // Aggregate or perform any operation you need on the elements being compressed
            // For now, we just take the first element of each compressed block
            compressedWorldElements.push(fullWorldElements[i]);
        }

        this.elements = compressedWorldElements;
        return this;
    }
}

describe("CompressedWorldMap", () => {
   it("should have 1 elements given width height 1", () => {
       let fullWorldMap = new FullWorldMap().withWidth(1).withHeight(1);
         fullWorldMap.generate();
         let compressedWorldMap = new CompressedWorldMap().of(fullWorldMap).compress();
            expect(compressedWorldMap.elements.length).toEqual(1);
   });

    it("should have 4 elements given width height 2 and compress factor 1", () => {
        let fullWorldMap = new FullWorldMap().withWidth(2).withHeight(2);
        fullWorldMap.generate();
        let compressedWorldMap = new CompressedWorldMap()
            .of(fullWorldMap)
            .withCompressFactor(1)
            .compress();
        expect(compressedWorldMap.elements.length).toEqual(4);
    });

    it("should have 1 element given width height 2 and compress factor 2", () => {
        let fullWorldMap = new FullWorldMap().withWidth(2).withHeight(2);
        fullWorldMap.generate();
        let compressedWorldMap = new CompressedWorldMap()
            .of(fullWorldMap)
            .withCompressFactor(2)
            .compress();
        expect(compressedWorldMap.elements.length).toEqual(1);
    });

    it("should have 1 water given water width height 2 and compress factor 2", () => {
        let fullWorldMap = new FullWorldMap().withWidth(2).withHeight(2);
        fullWorldMap.generate();
        let compressedWorldMap = new CompressedWorldMap()
            .of(fullWorldMap)
            .withCompressFactor(2)
            .compress();
        expect(compressedWorldMap.elements[0].terrainType).toEqual(TerrainType.Water);
    });

    it("should have 1 water given 2 water width height 2 and compress factor 2", () => {
        let fullWorldMap = new FullWorldMap().withWidth(2).withHeight(2);
        //add mock for elements that should return 2x water worldElements 2x grass worldElements
        let compressedWorldMap = new CompressedWorldMap()
            .of(fullWorldMap)
            .withCompressFactor(2)
            .compress();
        expect(compressedWorldMap.elements[0].terrainType).toEqual(TerrainType.Water);
    });
});