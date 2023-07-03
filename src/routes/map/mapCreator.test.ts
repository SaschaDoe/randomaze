import {describe, expect, test} from "vitest";
import {MapCreator} from "./mapCreator";
import {FakeDice} from "../../lib/tables/FakeDice";
import {TerrainType} from "./terrainType";

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

    test("generateTerrain assigns correct terrain type based on height", () => {
        let terrain = mapCreator.generateTerrain(width, height);
        for(let field of terrain){
            if (field.h < 0.4) {
                expect(field.terrainType).toBe(TerrainType.Water);
            } else if (field.h < 0.75) {
                expect(field.terrainType).toBe(TerrainType.Grass);
            } else if (field.h < 0.9) {
                expect(field.terrainType).toBe(TerrainType.Plain);
            } else {
                expect(field.terrainType).toBe(TerrainType.Mountain);
            }
        }
    });

    test("generateTerrain ensures right and left borders are always water", () => {
        let terrain = mapCreator.generateTerrain(width, height, fakeDice);

        // Checking left border
        for(let y = 0; y < height; y++) {
            let field = terrain[y * width]; // accessing left border element
            expect(field.terrainType).toBe(TerrainType.Water);
        }

        // Checking right border
        for(let y = 0; y < height; y++) {
            let field = terrain[(y + 1) * width - 1]; // accessing right border element
            expect(field.terrainType).toBe(TerrainType.Water);
        }
    });

    test("edgeFunction returns valid sinusoidal output", () => {
        let val = mapCreator.edgeFunction(500); // middle of the range
        expect(val).toBeCloseTo(1);
    });
});
