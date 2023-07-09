import {describe, expect} from "vitest";
import {HexMap} from "./hexMap";
import {HexField} from "./hexField";
import {TerrainType} from "../hexmap/terrainType";

describe("HexMap", () => {
    it("should have one hexField given 1 width and 1 height", () => {
        let hexMap = new HexMap().withWidth(1).withHeight(1);
        hexMap.generate();
        expect(hexMap.hexesAsArray.length).toEqual(1);
    });

    it("should have 4 hexField2 given 2 width and 2 height", () => {
        let hexMap = new HexMap().withWidth(2).withHeight(2);
        hexMap.generate();
        expect(hexMap.hexesAsArray.length).toEqual(4);
        expect(hexMap.hexesAsArray[0].x).toEqual(0);
        expect(hexMap.hexesAsArray[0].y).toEqual(0);
        expect(hexMap.hexesAsArray[1].x).toEqual(1);
        expect(hexMap.hexesAsArray[1].y).toEqual(0);
        expect(hexMap.hexesAsArray[2].x).toEqual(0);
        expect(hexMap.hexesAsArray[2].y).toEqual(1);
        expect(hexMap.hexesAsArray[3].x).toEqual(1);
        expect(hexMap.hexesAsArray[3].y).toEqual(1);
    });

    it("should have 1 hexField2 given 2 width and 2 height and compress factor of 2", () => {
        let hexField = new HexField(0, 0, 0, 0, 0, 0);
        let hexFields = [[hexField, hexField], [hexField, hexField]];
        let hexMap = new HexMap().withHexFields(hexFields);;

        let compressedHexMap = hexMap.compress(2);
        expect(compressedHexMap.hexesAsArray.length).toEqual(1);
        expect(compressedHexMap.hexesAsArray[0].terrainType).toEqual(TerrainType.Water);
    });

    it("should have 1 hexField2 with grass given all grass", () => {
        let hexField = new HexField(0, 0, 0, TerrainType.Grass, 0, 0);
        let hexFields = [[hexField, hexField], [hexField, hexField]];
        let hexMap = new HexMap().withHexFields(hexFields);;

        let compressedHexMap = hexMap.compress(2);
        expect(compressedHexMap.hexesAsArray.length).toEqual(1);
        expect(compressedHexMap.hexesAsArray[0].terrainType).toEqual(TerrainType.Grass);
    });

    it("should have 1 hexField2 with water given half grass half water", () => {
        let waterHex = new HexField(0, 0, 0, TerrainType.Water, 0, 0);
        let grassHex = new HexField(0, 0, 0, TerrainType.Grass, 0, 0);
        let hexFields = [[waterHex, waterHex], [grassHex, grassHex]];
        let hexMap = new HexMap().withHexFields(hexFields);;

        let compressedHexMap = hexMap.compress(2);
        expect(compressedHexMap.hexesAsArray.length).toEqual(1);
        expect(compressedHexMap.hexesAsArray[0].terrainType).toEqual(TerrainType.Water);
    });

    it("should have 4 hexField given 16 fields", () => {
        let waterHex = new HexField(0, 0, 0, TerrainType.Water, 0, 0);
        let grassHex = new HexField(0, 0, 0, TerrainType.Grass, 0, 0);
        let hexFields = [
            [waterHex, waterHex, waterHex, waterHex],
            [waterHex, waterHex, waterHex, waterHex],
            [waterHex, waterHex, grassHex, grassHex],
            [waterHex, waterHex, grassHex, grassHex],];
        let hexMap = new HexMap().withHexFields(hexFields);

        let compressedHexMap = hexMap.compress(2);
        expect(compressedHexMap.hexesAsArray.length).toEqual(4);
        expect(compressedHexMap.hexesAsArray[0].terrainType).toEqual(TerrainType.Water);
        expect(compressedHexMap.hexesAsArray[1].terrainType).toEqual(TerrainType.Water);
        expect(compressedHexMap.hexesAsArray[2].terrainType).toEqual(TerrainType.Water);
        expect(compressedHexMap.hexesAsArray[3].terrainType).toEqual(TerrainType.Grass);
    });
});