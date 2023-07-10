import {describe} from "vitest";
import {FullWorldMap} from "./fullWorldMap";
import {TerrainType} from "./terrainType";
import {FakeTerrainTypeAssigner} from "./fakeTerrainTypeAssigner";

describe("FullWorldMap", () => {
    it("should have 1 elements given width height 1", () => {
        let worldMap = new FullWorldMap().withWidth(1).withHeight(1);
        worldMap.generate();
        expect(worldMap.elements.length).toEqual(1);
    });

    it("should have 4 elements given width height 2", () => {
        let worldMap = new FullWorldMap().withWidth(2).withHeight(2);
        worldMap.generate();
        expect(worldMap.elements.length).toEqual(4);
    });

    it("should have 4 elements with locations in 2 dim grid", () => {
        let worldMap = new FullWorldMap().withWidth(2).withHeight(2);
        worldMap.generate();
        expect(worldMap.elements[0].x).toEqual(0);
        expect(worldMap.elements[0].y).toEqual(0);
        expect(worldMap.elements[1].x).toEqual(1);
        expect(worldMap.elements[1].y).toEqual(0);
        expect(worldMap.elements[2].x).toEqual(0);
        expect(worldMap.elements[2].y).toEqual(1);
        expect(worldMap.elements[3].x).toEqual(1);
        expect(worldMap.elements[3].y).toEqual(1);
    });

    it("should have 1 water given assigner with only water", () => {
        let terrainTypeAssigner = new FakeTerrainTypeAssigner();
        let worldMap = new FullWorldMap()
            .withWidth(1).withHeight(1)
            .withTerrainTypeAssigner(terrainTypeAssigner);

        worldMap.generate();

        expect(worldMap.elements.length).toEqual(1);
        expect(worldMap.elements[0].terrainType).toEqual(TerrainType.Water);
    });

    it("should have 1 grass given assigner with only grass", () => {
        let terrainTypeAssigner = new FakeTerrainTypeAssigner()
            .withOnlyTerrainType(TerrainType.Grass);

        let worldMap = new FullWorldMap()
            .withWidth(1).withHeight(1)
            .withTerrainTypeAssigner(terrainTypeAssigner);

        worldMap.generate();

        expect(worldMap.elements.length).toEqual(1);
        expect(worldMap.elements[0].terrainType).toEqual(TerrainType.Grass);
    });

    it("should give block of given size", () => {
        let worldMap = new FullWorldMap().withWidth(3).withHeight(3);
        worldMap.generate();

        let block = worldMap.getBlock(0, 0, 2, 2);
        expect(block.getElements().length).toEqual(4);
    });

    it("should give block of too great size", () => {
        let worldMap = new FullWorldMap().withWidth(3).withHeight(3);
        worldMap.generate();

        let block = worldMap.getBlock(2, 2, 2, 2);
        expect(block.getElements().length).toEqual(1);
    });

});