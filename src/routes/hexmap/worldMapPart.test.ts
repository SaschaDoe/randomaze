import {describe} from "vitest";
import {WorldMapPart} from "./worldMapPart";
import {WorldElement} from "./worldElement";
import {TerrainType} from "./terrainType";

describe("worldMapPart", () => {
  it("should give 1 of water terrains given 1", () => {
      let waterWorldElement = new WorldElement().withTerrainType(TerrainType.Water);
      let worldMapPart = new WorldMapPart().withElements([waterWorldElement]);

      let waterCount = worldMapPart.count(TerrainType.Water);

      expect(waterCount).toEqual(1);
  });

    it("should give 0 of water terrains given 0", () => {
        let waterWorldElement = new WorldElement().withTerrainType(TerrainType.Grass);
        let worldMapPart = new WorldMapPart().withElements([waterWorldElement]);

        let waterCount = worldMapPart.count(TerrainType.Water);

        expect(waterCount).toEqual(0);
    });

    it("should give 0 of water terrains given 0", () => {
        let waterWorldElement = new WorldElement().withTerrainType(TerrainType.Grass);
        let worldMapPart = new WorldMapPart().withElements([waterWorldElement]);

        let waterCount = worldMapPart.count(TerrainType.Water);

        expect(waterCount).toEqual(0);
    });

    it("should dominant element water if only water", () => {
        let waterElement = new WorldElement().withTerrainType(TerrainType.Water);
        let worldMapPart = new WorldMapPart().withElements([waterElement]);

        let dominantTerrainType = worldMapPart.getDominantTerrainType();

        expect(dominantTerrainType).toEqual(TerrainType.Water);
    });

    it("should dominant element grass if only grass", () => {
        let waterElement = new WorldElement().withTerrainType(TerrainType.Grass);
        let worldMapPart = new WorldMapPart().withElements([waterElement]);

        let dominantTerrainType = worldMapPart.getDominantTerrainType();

        expect(dominantTerrainType).toEqual(TerrainType.Grass);
    });

    it("should dominant element water if only water and grass", () => {
        let waterElement = new WorldElement().withTerrainType(TerrainType.Water);
        let grassElement = new WorldElement().withTerrainType(TerrainType.Grass);
        let worldMapPart = new WorldMapPart().withElements([waterElement, grassElement]);

        let dominantTerrainType = worldMapPart.getDominantTerrainType();

        expect(dominantTerrainType).toEqual(TerrainType.Water);
    });

    it("should dominant element water if 2 grass and 2 water", () => {
        let waterElement = new WorldElement().withTerrainType(TerrainType.Water);
        let grassElement = new WorldElement().withTerrainType(TerrainType.Grass);
        let worldMapPart = new WorldMapPart().withElements([waterElement, grassElement, grassElement, waterElement]);

        let dominantTerrainType = worldMapPart.getDominantTerrainType();

        expect(dominantTerrainType).toEqual(TerrainType.Water);
    });
});