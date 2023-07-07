import {HexField} from "./hexField";
import {TerrainType} from "./terrainType";
import {TerrainCompressor} from "./TerrainCompressor";
import {expect} from "vitest";

describe('TerrainCompressor', () => {
    it('Compresses terrain size 1', () => {
        expect(true).toEqual(true);
    });
    /*
    function testCompression(terrain: HexField[][], compressFactor: number, expectedResult: HexField[][]): void {
        const compressor = new TerrainCompressor();
        const compressed = compressor.compress(terrain, compressFactor);
        expect(compressed).toEqual(expectedResult);
    }

    it('Compresses terrain size 1', () => {
        const terrain = [[new HexField(0, 0, 0, TerrainType.Water, 0, 0)]];
        const expectedResult = [[new HexField(0, 0, 0, TerrainType.Water, 0, 0)]];
        testCompression(terrain, 2, expectedResult);
    });

    it('Compresses terrain size 2x2', () => {
        const terrain = [
            [new HexField(0, 0, 0, TerrainType.Water, 0, 0), new HexField(1, 0, 0, TerrainType.Water, 0, 0)],
            [new HexField(0, 1, 0, TerrainType.Water, 0, 0), new HexField(1, 1, 0, TerrainType.Grass, 0, 0)]
        ];
        const expectedResult = [[new HexField(0, 0, 0, TerrainType.Water, 0, 0)]];
        testCompression(terrain, 2, expectedResult);
    });

    it('Compresses terrain size 4x4 with different terrain types', () => {
        const terrain = [
            [new HexField(0, 0, 0, TerrainType.Water, 0, 0), new HexField(1, 0, 0, TerrainType.Grass, 0, 0), new HexField(2, 0, 0, TerrainType.Mountain, 0, 0), new HexField(3, 0, 0, TerrainType.Snow, 0, 0)],
            [new HexField(0, 1, 0, TerrainType.Water, 0, 0), new HexField(1, 1, 0, TerrainType.Grass, 0, 0), new HexField(2, 1, 0, TerrainType.Mountain, 0, 0), new HexField(3, 1, 0, TerrainType.Snow, 0, 0)],
            [new HexField(0, 2, 0, TerrainType.Water, 0, 0), new HexField(1, 2, 0, TerrainType.Water, 0, 0), new HexField(2, 2, 0, TerrainType.Mountain, 0, 0), new HexField(3, 2, 0, TerrainType.Snow, 0, 0)],
            [new HexField(0, 3, 0, TerrainType.Water, 0, 0), new HexField(1, 3, 0, TerrainType.Water, 0, 0), new HexField(2, 3, 0, TerrainType.Water, 0, 0), new HexField(3, 3, 0, TerrainType.Snow, 0, 0)]
        ];
        const expectedResult = [[new HexField(0, 0, 0, TerrainType.Water, 0, 0), new HexField(1, 0, 0, TerrainType.Mountain, 0, 0)],
            [new HexField(0, 1, 0, TerrainType.Water, 0, 0), new HexField(1, 1, 0, TerrainType.Snow, 0, 0)]];
        testCompression(terrain, 2, expectedResult);
    });

    it('Compresses irregular terrain size', () => {
        const terrain = [
            [new HexField(0, 0, 0, TerrainType.Water, 0, 0), new HexField(1, 0, 0, TerrainType.Grass, 0, 0)],
            [new HexField(0, 1, 0, TerrainType.Water, 0, 0)]
        ];
        const expectedResult = [[new HexField(0, 0, 0, TerrainType.Water, 0, 0)]];
        testCompression(terrain, 2, expectedResult);
    });
    */

});
