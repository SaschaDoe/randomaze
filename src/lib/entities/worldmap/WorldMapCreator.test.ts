import {describe, it, expect} from "vitest";
import {WorldMapCreator} from "./WorldMapCreator";
import {Planet} from "../celestialBody/Planet";

describe("WorldMapCreator", () => {
    it("should create a world map", () => {
        let planet = new Planet();

        let worldMap = WorldMapCreator.create(planet);

        expect(worldMap).toBeDefined();
    });
});