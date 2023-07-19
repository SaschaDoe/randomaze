import {describe, expect, test} from "vitest";
import {MapCreator} from "./mapCreator";
import {FakeDice} from "../../lib/tables/FakeDice";
import {TerrainType} from "../hexmap/domain/terrainType";

describe("MapCreator", () => {
    let mapCreator: MapCreator;
    let width: number;
    let height: number;
    let fakeDice: FakeDice;

    beforeEach(() => {
        mapCreator = new MapCreator();
        fakeDice = new FakeDice().withRollResult(0.5);
        width = 150;
        height = 150;
    });

    test("generateTerrain returns the correct size of terrain", () => {
        let terrain = mapCreator.generateTerrain(width, height, fakeDice);
        expect(terrain.length).toBe(width * height);
    });

    test("generateTerrain generates terrain where all h properties are valid numbers", () => {
        let terrain = mapCreator.generateTerrain(width, height, fakeDice);
        for(let field of terrain){
            expect(isNaN(field.h)).toBe(false);
        }
    });

    test("generateTerrain generates terrain where h property is within -2 to 2 range", () => {
        let terrain = mapCreator.generateTerrain(width, height, fakeDice);
        for(let field of terrain){
            expect(field.h).toBeGreaterThanOrEqual(-2);
            expect(field.h).toBeLessThanOrEqual(2);
        }
    });

    test("edgeFunction returns valid sinusoidal output", () => {
        let val = mapCreator.edgeFunction(500); // middle of the range
        expect(val).toBeCloseTo(1);
    });

    test("generateTerrain ensures top and bottom poleSize rows have increased height", () => {
        let terrain = mapCreator.generateTerrain(width, height, fakeDice);
        let poleSize = 3;
        let minimumHeight = 0.4;

        // Checking top poleSize rows
        for(let y = 0; y < poleSize; y++) {
            for(let x = 0; x < width; x++) {
                let field = terrain[y * width + x]; // accessing element at (x, y)
                expect(field.h).toBeGreaterThanOrEqual(minimumHeight);
            }
        }

        // Checking bottom poleSize rows
        for(let y = height - poleSize; y < height; y++) {
            for(let x = 0; x < width; x++) {
                let field = terrain[y * width + x]; // accessing element at (x, y)
                expect(field.h).toBeGreaterThanOrEqual(minimumHeight);
            }
        }
    });

});

describe('MapCreator', () => {
    let mapCreator: MapCreator;

    beforeEach(() => {
        mapCreator = new MapCreator().WithTemperatureVariance(0);
    });

    describe('getTemperature', () => {

        test('returns -10 at the top pole', () => {

            const height = 600;
            const y = 0; // top pole
            const temperature = mapCreator.getTemperature(y, height);
            expect(temperature).lessThan(-7);
        });

        test('returns -10 at the bottom pole', () => {
            const height = 600;
            const y = height; // bottom pole
            const temperature = mapCreator.getTemperature(y, height);
            expect(temperature).lessThan(-7);
        });
    });
});

