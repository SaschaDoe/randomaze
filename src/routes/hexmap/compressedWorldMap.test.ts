import {describe} from "vitest";
import {FullWorldMap} from "./fullWorldMap";
import {TerrainType} from "./terrainType";
import {CompressedWorldMap} from "./compressedWorldMap";
import type {TerrainTypeAssigner} from "./terrainTypeAssigner";
import {FakeTerrainTypeAssigner} from "./fakeTerrainTypeAssigner";

describe("CompressedWorldMap", () => {

    let fullWorldMap: FullWorldMap;
    let compressedWorldMap: CompressedWorldMap;
    let terrainTypeAssigner: TerrainTypeAssigner;

    beforeEach(() => {
        fullWorldMap = new FullWorldMap();
        compressedWorldMap = new CompressedWorldMap();
    });

    const testCompress = (expectedElements: number, expectedTerrain: TerrainType = TerrainType.Water) => {

        fullWorldMap.generate();

        compressedWorldMap.compress();

        expect(compressedWorldMap.elements.length).toEqual(expectedElements);
        if (expectedTerrain) {
            expect(compressedWorldMap.elements[0].terrainType).toEqual(expectedTerrain);
        }
    };

    it("should have 1 elements given width height 1", () => {
        fullWorldMap
            .withWidth(1).withHeight(1);

        compressedWorldMap.of(fullWorldMap).withCompressFactor(1);
        testCompress( 1);
    });

    it("should have 4 elements given width height 2 and compress factor 1", () => {
        fullWorldMap
            .withWidth(2).withHeight(2);

        compressedWorldMap.of(fullWorldMap).withCompressFactor(1);

        testCompress( 4);
    });

    it("should have 1 element given width height 2 and compress factor 2", () => {
        fullWorldMap
            .withWidth(2).withHeight(2);

        compressedWorldMap.of(fullWorldMap).withCompressFactor(2);

        testCompress(1);
    });

    it("should have 1 water given water width height 2 and compress factor 2", () => {
        fullWorldMap
            .withWidth(2).withHeight(2);

        compressedWorldMap.of(fullWorldMap).withCompressFactor(2);

        testCompress( 1, TerrainType.Water);
    });

    it("should have 1 water given 2 water width height 2 and compress factor 2", () => {
        fullWorldMap
            .withWidth(2).withHeight(2);

        compressedWorldMap.of(fullWorldMap).withCompressFactor(2);

        testCompress( 1, TerrainType.Water);
    });

    it("should have 1 grass given 3 grass width height 2 and compress factor 2", () => {
        fullWorldMap
            .withWidth(2).withHeight(2)
            .withTerrainTypeAssigner(new FakeTerrainTypeAssigner().withOnlyTerrainType(TerrainType.Grass));

        compressedWorldMap.of(fullWorldMap).withCompressFactor(2);

        testCompress(  1, TerrainType.Grass);
    });
});
