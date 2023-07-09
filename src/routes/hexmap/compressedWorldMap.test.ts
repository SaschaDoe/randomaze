import {describe} from "vitest";
import {FullWorldMap} from "./fullWorldMap";
import type {WorldElement} from "./worldElement";

class CompressedWorldMap {
    elements: WorldElement[] = [];
    of(fullWorldMap: FullWorldMap) {
        this.elements = fullWorldMap.elements;
        return this;
    }
}

describe("CompressedWorldMap", () => {
   it("should have 1 elements given width height 1", () => {
       let fullWorldMap = new FullWorldMap().withWidth(1).withHeight(1);
         fullWorldMap.generate();
         let compressedWorldMap = new CompressedWorldMap().of(fullWorldMap);
            expect(compressedWorldMap.elements.length).toEqual(1);
   });
});